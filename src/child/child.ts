/* eslint max-lines: 0 */
import type { CrossDomainWindowType } from 'cross-domain-utils/src';
import {
    isSameDomain,
    matchDomain,
    getDomain,
    getOpener,
    getNthParentFromTop,
    getAncestor,
    getAllFramesInWindow,
    onCloseWindow
} from 'cross-domain-utils/src';
import type { CrossDomainFunctionType } from 'post-robot/src';
import { markWindowKnown, deserializeMessage } from 'post-robot/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { extend, onResize, elementReady, assertExists, noop } from 'belter/src';

import { getGlobal } from '../lib';
import { CONTEXT, INITIAL_PROPS, WINDOW_REFERENCES } from '../constants';
import type { NormalizedComponentOptionsType } from '../component';
import type { PropsType } from '../component/props';
import type { WindowRef, PropRef, ParentExportsType } from '../parent';
import type { StringMatcherType } from '../types';

import { normalizeChildProps } from './props';
import { getChildPayload } from './window';

export type ChildExportsType<P> = {
    updateProps: CrossDomainFunctionType<[PropsType<P>], void>
    close: CrossDomainFunctionType<[], void>
}
export type ChildHelpers<P, X> = {
    uid: string
    close: () => ZalgoPromise<void>
    focus: () => ZalgoPromise<void>
    resize: (arg0: {
        width: number | null | undefined
        height: number | null | undefined
    }) => ZalgoPromise<void>
    onError: (arg0: unknown) => ZalgoPromise<void>
    onProps: (arg0: (arg0: PropsType<P>) => void) => void
    getParent: () => CrossDomainWindowType
    getParentDomain: () => string
    show: () => ZalgoPromise<void>
    hide: () => ZalgoPromise<void>
    export: (arg0: X) => ZalgoPromise<void>
}

function getParentComponentWindow(ref: WindowRef): CrossDomainWindowType {
    const { type } = ref;

    if (type === WINDOW_REFERENCES.OPENER) {
        return assertExists('opener', getOpener(window));
    } else if (
        type === WINDOW_REFERENCES.PARENT &&
        typeof ref.distance === 'number'
    ) {
        return assertExists('parent', getNthParentFromTop(window, ref.distance));
    } else if (
        type === WINDOW_REFERENCES.GLOBAL &&
        ref.uid &&
        typeof ref.uid === 'string'
    ) {
        const { uid } = ref;
        const ancestor = getAncestor(window);

        if (!ancestor) {
            throw new Error(`Can not find ancestor window`);
        }

        for (const frame of getAllFramesInWindow(ancestor)) {
            if (isSameDomain(frame)) {
                const global = getGlobal(frame);

                if (global && global.windows && global.windows[uid]) {
                    return global.windows[uid];
                }
            }
        }
    }

    throw new Error(`Unable to find ${ type } parent component window`);
}

function checkParentDomain(
    allowedParentDomains: StringMatcherType,
    domain: string
) {
    if (!matchDomain(allowedParentDomains, domain)) {
        throw new Error(`Can not be rendered by domain: ${ domain }`);
    }
}

function focus(): ZalgoPromise<void> {
    return ZalgoPromise.try(() => {
        window.focus();
    });
}

function destroy(): ZalgoPromise<void> {
    return ZalgoPromise.try(() => {
        window.close();
    });
}

function getPropsByRef<P>(
    parentComponentWindow: CrossDomainWindowType,
    domain: string,
    { type, value, uid }: PropRef
): PropsType<P> {
    let props;

    if (type === INITIAL_PROPS.RAW) {
        props = value;
    } else if (type === INITIAL_PROPS.UID) {
        if (!isSameDomain(parentComponentWindow)) {
            throw new Error(
                `Parent component window is on a different domain - expected ${ getDomain() } - can not retrieve props`
            );
        }

        const global = getGlobal(parentComponentWindow);
        props = assertExists('props', global && global.props[uid]);
    }

    if (!props) {
        throw new Error(`Could not find props`);
    }

    return deserializeMessage(parentComponentWindow, domain, props);
}

export type ChildComponent<P> = {
    getProps: () => PropsType<P>
    init: () => ZalgoPromise<void>
}
export function childComponent<P, X>(
    options: NormalizedComponentOptionsType<P, X>
): ChildComponent<P> {
    const { propsDef, autoResize, allowedParentDomains } = options;
    const onPropHandlers = [];
    const childPayload = getChildPayload();
    let props: PropsType<P>;

    if (!childPayload) {
        throw new Error(`No child payload found`);
    }

    if (childPayload.version !== __ZOID__.__VERSION__) {
        throw new Error(
            `Parent window has zoid version ${ childPayload.version }, child window has version ${ __ZOID__.__VERSION__ }`
        );
    }

    const {
        uid,
        parent: parentRef,
        parentDomain,
        exports: parentExports,
        context,
        props: propsRef
    } = childPayload;
    const parentComponentWindow = getParentComponentWindow(parentRef);
    const parent: ParentExportsType<P, X> = deserializeMessage(
        parentComponentWindow,
        parentDomain,
        parentExports
    );
    const { show, hide, close } = parent;

    const getParent = () => parentComponentWindow;

    const getParentDomain = () => parentDomain;

    const onProps = (handler: (...args: Array<any>) => any) => {
        onPropHandlers.push(handler);
    };

    const onError = (err: unknown): ZalgoPromise<void> => {
        return ZalgoPromise.try(() => {
            if (parent && parent.onError) {
                return parent.onError(err);
            } else {
                throw err;
            }
        });
    };

    const resize = ({
        width,
        height
    }: {
        width: number | null | undefined
        height: number | null | undefined
    }): ZalgoPromise<void> => {
        return parent.resize.fireAndForget({
            width,
            height
        });
    };

    const xport = (xports: X): ZalgoPromise<void> => {
        return parent.export(xports);
    };

    const getHelpers = (): ChildHelpers<P, X> => {
        return {
            show,
            hide,
            close,
            focus,
            onError,
            resize,
            onProps,
            getParent,
            getParentDomain,
            uid,
            export: xport
        };
    };

    const watchForClose = () => {
        window.addEventListener('beforeunload', () => {
            parent.checkClose.fireAndForget();
        });
        window.addEventListener('unload', () => {
            parent.checkClose.fireAndForget();
        });
        onCloseWindow(parentComponentWindow, () => {
            destroy();
        });
    };

    const setProps = (
        newProps: PropsType<P>,
        origin: string,
        isUpdate = false
    ) => {
        const helpers = getHelpers();
        const normalizedProps = normalizeChildProps(
            parentComponentWindow,
            propsDef,
            newProps,
            origin,
            helpers,
            isUpdate
        );

        if (props) {
            extend(props, normalizedProps);
        } else {
            props = normalizedProps;
        }

        for (const handler of onPropHandlers) {
            handler(props);
        }
    };

    const getAutoResize = (): ZalgoPromise<{
        width: boolean
        height: boolean
        element: HTMLElement | null | undefined
    }> => {
        const {
            width = false,
            height = false,
            element: elementRef = 'body'
        } = autoResize;
        return elementReady(elementRef)
            .catch(noop)
            .then(element => {
                return {
                    width,
                    height,
                    element
                };
            });
    };

    const watchForResize = (): ZalgoPromise<void> | null | undefined => {
        return getAutoResize().then(({ width, height, element }) => {
            if (!element || (!width && !height) || context === CONTEXT.POPUP) {
                return;
            }

            onResize(
                element,
                ({ width: newWidth, height: newHeight }) => {
                    resize({
                        width: width ? newWidth : undefined,
                        height:height ? newHeight : undefined
                    });
                },
                {
                    width,
                    height
                }
            );
        });
    };

    const updateProps = (newProps: PropsType<P>): ZalgoPromise<void> => {
        return ZalgoPromise.try(() => setProps(newProps, parentDomain, true));
    };

    const init = () => {
        return ZalgoPromise.try(() => {
            checkParentDomain(allowedParentDomains, parentDomain);
            markWindowKnown(parentComponentWindow);
            watchForClose();
            return parent.init({
                updateProps,
                close: destroy
            });
        })
            .then(() => {
                return watchForResize();
            })
            .catch(err => {
                onError(err);
            });
    };

    const getProps = () => {
        if (props) {
            return props;
        }

        setProps(
            getPropsByRef(parentComponentWindow, parentDomain, propsRef),
            parentDomain
        );
        return props;
    };

    return {
        init,
        getProps
    };
}
