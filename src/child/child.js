/* @flow */
/* eslint max-lines: 0 */

import { isSameDomain, matchDomain, getAllFramesInWindow, type CrossDomainWindowType,
    onCloseWindow, assertSameDomain } from 'cross-domain-utils/src';
import { markWindowKnown, type CrossDomainFunctionType } from 'post-robot/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { extend, onResize, elementReady, noop } from 'belter/src';

import { getGlobal, tryGlobal, getInitialParentPayload, updateChildWindowNameWithRef } from '../lib';
import { CONTEXT } from '../constants';
import type { NormalizedComponentOptionsType, getSiblingsPropType } from '../component';
import type { PropsType, ChildPropsType } from '../component/props';
import type { StringMatcherType } from '../types';

import { normalizeChildProps } from './props';

export type ChildExportsType<P> = {|
    updateProps : CrossDomainFunctionType<[ PropsType<P> ], void>,
    close : CrossDomainFunctionType<[], void>
|};

export type ChildHelpers<P, X> = {|
    uid : string,
    tag : string,
    close : () => ZalgoPromise<void>,
    focus : () => ZalgoPromise<void>,
    resize : ({| width : ?number, height : ?number |}) => ZalgoPromise<void>,
    onError : (mixed) => ZalgoPromise<void>,
    onProps : ((PropsType<P>) => void) => {| cancel : () => void |},
    getParent : () => CrossDomainWindowType,
    getParentDomain : () => string,
    show : () => ZalgoPromise<void>,
    hide : () => ZalgoPromise<void>,
    export : (X) => ZalgoPromise<void>,
    getSiblings : getSiblingsPropType
|};

function checkParentDomain(allowedParentDomains : StringMatcherType, domain : string) {
    if (!matchDomain(allowedParentDomains, domain)) {
        throw new Error(`Can not be rendered by domain: ${ domain }`);
    }
}

function focus() : ZalgoPromise<void> {
    return ZalgoPromise.try(() => {
        window.focus();
    });
}

function destroy() : ZalgoPromise<void> {
    return ZalgoPromise.try(() => {
        window.close();
    });
}

export type ChildComponent<P, X> = {|
    getProps : () => ChildPropsType<P, X>,
    init : () => ZalgoPromise<void>
|};

export function childComponent<P, X, C>(options : NormalizedComponentOptionsType<P, X, C>) : ChildComponent<P, X> {
    const { tag, propsDef, autoResize, allowedParentDomains } = options;

    const onPropHandlers = [];

    const { parent, payload } = getInitialParentPayload();
    const { win: parentComponentWindow, domain: parentDomain } = parent;

    let props : ChildPropsType<P, X>;
    const exportsPromise = new ZalgoPromise();

    const { version, uid, exports: parentExports, context, props: initialProps } = payload;

    if (version !== __ZOID__.__VERSION__) {
        throw new Error(`Parent window has zoid version ${ version }, child window has version ${ __ZOID__.__VERSION__ }`);
    }

    const { show, hide, close, onError, checkClose, export: parentExport, resize: parentResize, init: parentInit } = parentExports;

    const getParent = () => parentComponentWindow;
    const getParentDomain = () => parentDomain;
    
    const onProps = (handler : Function) => {
        onPropHandlers.push(handler);
        return {
            cancel: () => {
                onPropHandlers.splice(onPropHandlers.indexOf(handler), 1);
            }
        };
    };

    const resize = ({ width, height } : {| width : ?number, height : ?number |}) : ZalgoPromise<void> => {
        return parentResize.fireAndForget({ width, height });
    };

    const xport = (xports : X) : ZalgoPromise<void> => {
        exportsPromise.resolve(xports);
        return parentExport(xports);
    };

    const getSiblings = ({ anyParent } = {}) => {
        const result = [];
        const currentParent = props.parent;

        if (typeof anyParent === 'undefined') {
            anyParent = !currentParent;
        }

        if (!anyParent && !currentParent) {
            throw new Error(`No parent found for ${ tag } child`);
        }

        for (const win of getAllFramesInWindow(window)) {
            if (!isSameDomain(win)) {
                continue;
            }

            const xprops : ChildPropsType<mixed, mixed> = assertSameDomain(win).xprops;

            if (!xprops || getParent() !== xprops.getParent()) {
                continue;
            }

            const winParent = xprops.parent;

            if (!anyParent && currentParent) {
                if (!winParent || winParent.uid !== currentParent.uid) {
                    continue;
                }
            }

            const xports = tryGlobal(win, global => global.exports);

            result.push({
                props:   xprops,
                exports: xports
            });
        }

        return result;
    };

    const getHelpers = () : ChildHelpers<P, X> => {
        return {
            tag, show, hide, close, focus, onError, resize, getSiblings,
            onProps, getParent, getParentDomain, uid, export: xport
        };
    };

    const watchForClose = () => {
        window.addEventListener('beforeunload', () => {
            checkClose.fireAndForget();
        });

        window.addEventListener('unload', () => {
            checkClose.fireAndForget();
        });

        onCloseWindow(parentComponentWindow, () => {
            destroy();
        });
    };

    const setProps = (newProps : PropsType<P>, origin : string, isUpdate : boolean = false) => {
        const helpers = getHelpers();
        const normalizedProps = normalizeChildProps(parentComponentWindow, propsDef, newProps, origin, helpers, isUpdate);

        if (props) {
            extend(props, normalizedProps);
        } else {
            props = normalizedProps;
        }

        for (const handler of onPropHandlers) {
            handler(props);
        }
    };
    
    const getAutoResize = () : ZalgoPromise<{| width : boolean, height : boolean, element : ?HTMLElement |}> => {
        const { width = false, height = false, element: elementRef = 'body' } = autoResize;
        return elementReady(elementRef).catch(noop).then(element => {
            return { width, height, element };
        });
    };

    const watchForResize = () : ?ZalgoPromise<void> => {
        return getAutoResize().then(({ width, height, element }) => {
            if (!element || (!width && !height) || context === CONTEXT.POPUP) {
                return;
            }

            onResize(element, ({ width: newWidth, height: newHeight }) => {
                resize({
                    width:  width ? newWidth : undefined,
                    height: height ? newHeight : undefined
                });
            }, { width, height });
        });
    };

    const updateProps = (newProps : (PropsType<P>)) : ZalgoPromise<void> => {
        return ZalgoPromise.try(() => setProps(newProps, parentDomain, true));
    };

    const init = () => {
        return ZalgoPromise.try(() => {
            if (isSameDomain(parentComponentWindow)) {
                updateChildWindowNameWithRef({
                    componentName: options.name,
                    parentComponentWindow
                });
            }

            getGlobal(window).exports = options.exports({
                getExports: () => exportsPromise
            });

            checkParentDomain(allowedParentDomains, parentDomain);
            markWindowKnown(parentComponentWindow);
            watchForClose();

            return parentInit({ updateProps, close: destroy });
    
        }).then(() => {
            return watchForResize();
    
        }).catch(err => {
            onError(err);
        });
    };

    const getProps = () => {
        if (props) {
            return props;
        } else {
            setProps(initialProps, parentDomain);
            return props;
        }
    };

    return {
        init,
        getProps
    };
}
