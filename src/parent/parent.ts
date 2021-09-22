import { $Values } from 'utility-types';

/* eslint max-lines: 0 */
import type { CrossDomainFunctionType } from 'post-robot/src';
import {
    send,
    bridge,
    serializeMessage,
    ProxyWindow,
    toProxyWindow,
    cleanUpWindow
} from 'post-robot/src';
import type { CrossDomainWindowType } from 'cross-domain-utils/src';
import {
    isSameDomain,
    matchDomain,
    getDomainFromUrl,
    isBlankDomain,
    getDomain,
    getDistanceFromTop,
    normalizeMockUrl,
    assertSameDomain,
    closeWindow,
    onCloseWindow,
    isWindowClosed,
    isSameTopWindow
} from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import type { EventEmitterType } from 'belter/src';
import {
    addEventListener,
    uniqueID,
    elementReady,
    writeElementToWindow,
    eventEmitter,
    noop,
    onResize,
    extendUrl,
    appendChild,
    cleanup,
    base64encode,
    isRegex,
    once,
    stringifyError,
    destroyElement,
    getElementSafe,
    showElement,
    hideElement,
    iframe,
    memoize,
    isElementClosed,
    awaitFrameWindow,
    popup,
    normalizeDimension,
    watchElementForClose,
    isShadowElement,
    insertShadowSlot
} from 'belter/src';

import {
    ZOID,
    POST_MESSAGE,
    CONTEXT,
    EVENT,
    METHOD,
    INITIAL_PROPS,
    WINDOW_REFERENCES
} from '../constants';
import type { ProxyObject } from '../lib';
import { getGlobal, getProxyObject } from '../lib';
import type { PropsInputType, PropsType } from '../component/props';
import type { ChildExportsType } from '../child';
import type { CssDimensionsType } from '../types';
import type { NormalizedComponentOptionsType, AttributesType } from '../component';

import { serializeProps, extendProps } from './props';

export type RenderOptionsType<P> = {
    uid: string
    props: PropsType<P>
    tag: string
    context: $Values<typeof CONTEXT>
    close: (arg0: string | null | undefined) => ZalgoPromise<void>
    focus: () => ZalgoPromise<void>
    doc: Document
    container?: HTMLElement
    dimensions: CssDimensionsType
    state: Record<string, any>
    event: EventEmitterType
    frame: HTMLIFrameElement | null | undefined
    prerenderFrame: HTMLIFrameElement | null | undefined
}
export type ParentExportsType<P, X> = {
    init: (arg0: ChildExportsType<P>) => ZalgoPromise<void>
    close: () => ZalgoPromise<void>
    checkClose: CrossDomainFunctionType<[], boolean>
    resize: CrossDomainFunctionType<
        [
            {
                width?: number | null | undefined
                height?: number | null | undefined
            },
        ],
        void
    >
    onError: (arg0: unknown) => ZalgoPromise<void>
    show: () => ZalgoPromise<void>
    hide: () => ZalgoPromise<void>
    export: (arg0: X) => ZalgoPromise<void>
}
export type PropRef = {
    type: typeof INITIAL_PROPS.RAW
    uid?: string
    value?: string
}
export type WindowRef =
    | {
          type: typeof WINDOW_REFERENCES.OPENER
      }
    | {
          type: typeof WINDOW_REFERENCES.PARENT
          distance: number
      }
    | {
          type: typeof WINDOW_REFERENCES.GLOBAL
          uid: string
      }
export type ChildPayload = {
    uid: string
    tag: string
    version: string
    context: $Values<typeof CONTEXT>
    parentDomain: string
    childDomain: string
    parent: WindowRef
    props: PropRef
    exports: string
}
export type StateType = Record<string, any>
export type ParentHelpers<P> = {
    state: StateType
    close: () => ZalgoPromise<void>
    focus: () => ZalgoPromise<void>
    resize: (arg0: {
        width: number | null | undefined
        height: number | null | undefined
    }) => ZalgoPromise<void>
    onError: (arg0: unknown) => ZalgoPromise<void>
    updateProps: (arg0: PropsInputType<P>) => ZalgoPromise<void>
    event: EventEmitterType
    show: () => ZalgoPromise<void>
    hide: () => ZalgoPromise<void>
}

function getDefaultProps<P>(): PropsType<P> {
    // $FlowFixMe
    return {};
}

type InternalState = {
    visible: boolean
}
type Rerender = () => ZalgoPromise<void>
type RenderContainerOptions = {
    context: $Values<typeof CONTEXT>
    uid: string
    proxyFrame: ProxyObject<HTMLIFrameElement> | null | undefined
    proxyPrerenderFrame: ProxyObject<HTMLIFrameElement> | null | undefined
    rerender: Rerender
}
type ResolveInitPromise = () => ZalgoPromise<void>
type RejectInitPromise = (arg0: unknown) => ZalgoPromise<void>
type GetProxyContainer = (
    container: string | HTMLElement,
) => ZalgoPromise<ProxyObject<HTMLElement>>
type Show = () => ZalgoPromise<void>
type Hide = () => ZalgoPromise<void>
type Close = () => ZalgoPromise<void>
type OnError = (arg0: unknown) => ZalgoPromise<void>
type RenderContainer = (
    proxyContainer: ProxyObject<HTMLElement>,
    arg1: RenderContainerOptions,
) => ZalgoPromise<ProxyObject<HTMLElement> | null | undefined>
type SetProxyWin = (arg0: ProxyWindow) => ZalgoPromise<void>
type GetProxyWindow = () => ZalgoPromise<ProxyWindow>
type OpenFrame = (
    context: $Values<typeof CONTEXT>,
    arg1: {
        windowName: string
    },
) => ZalgoPromise<ProxyObject<HTMLIFrameElement> | null | undefined>
type OpenPrerenderFrame = (
    context: $Values<typeof CONTEXT>,
) => ZalgoPromise<ProxyObject<HTMLIFrameElement> | null | undefined>
type Prerender = (
    proxyPrerenderWin: ProxyWindow,
    arg1: {
        context: $Values<typeof CONTEXT>
        uid: string
    },
) => ZalgoPromise<void>
type Open = (
    context: $Values<typeof CONTEXT>,
    arg1: {
        proxyWin: ProxyWindow
        proxyFrame: ProxyObject<HTMLIFrameElement> | null | undefined
        windowName: string
    },
) => ZalgoPromise<ProxyWindow>
type OpenPrerender = (
    context: $Values<typeof CONTEXT>,
    proxyWin: ProxyWindow,
    proxyPrerenderFrame: ProxyObject<HTMLIFrameElement> | null | undefined,
) => ZalgoPromise<ProxyWindow>
type WatchForUnload = () => ZalgoPromise<void>
type GetInternalState = () => ZalgoPromise<InternalState>
type SetInternalState = (arg0: InternalState) => ZalgoPromise<InternalState>
type ParentDelegateOverrides<P> = {
    props: PropsType<P>
    event: EventEmitterType
    close: Close
    onError: OnError
    getProxyContainer: GetProxyContainer
    show: Show
    hide: Hide
    renderContainer: RenderContainer
    getProxyWindow: GetProxyWindow
    setProxyWin: SetProxyWin
    openFrame: OpenFrame
    openPrerenderFrame: OpenPrerenderFrame
    prerender: Prerender
    open: Open
    openPrerender: OpenPrerender
    watchForUnload: WatchForUnload
    getInternalState: GetInternalState
    setInternalState: SetInternalState
    resolveInitPromise: ResolveInitPromise
    rejectInitPromise: RejectInitPromise
}
type DelegateOverrides = {
    getProxyContainer: GetProxyContainer
    show: Show
    hide: Hide
    renderContainer: RenderContainer
    getProxyWindow: GetProxyWindow
    setProxyWin: SetProxyWin
    openFrame: OpenFrame
    openPrerenderFrame: OpenPrerenderFrame
    prerender: Prerender
    open: Open
    openPrerender: OpenPrerender
    watchForUnload: WatchForUnload
}
type RenderOptions = {
    target: CrossDomainWindowType
    container: string | HTMLElement
    context: $Values<typeof CONTEXT>
    rerender: Rerender
}
type ParentComponent<P, X> = {
    init: () => void
    render: (arg0: RenderOptions) => ZalgoPromise<void>
    setProps: (newProps: PropsInputType<P>, isUpdate?: boolean) => void
    destroy: (err?: unknown) => ZalgoPromise<void>
    getHelpers: () => ParentHelpers<P>
    getDelegateOverrides: () => ZalgoPromise<DelegateOverrides>
    getExports: () => X
}

const getDefaultOverrides = <P>(): ParentDelegateOverrides<P> => {
    // $FlowFixMe
    return {};
};

type ParentOptions<P, X> = {
    options: NormalizedComponentOptionsType<P, X>
    overrides?: ParentDelegateOverrides<P>
    parentWin?: CrossDomainWindowType
}
export function parentComponent<P, X>({
    options,
    overrides = getDefaultOverrides(),
    parentWin = window
}: ParentOptions<P, X>): ParentComponent<P, X> {
    const {
        propsDef,
        containerTemplate,
        prerenderTemplate,
        tag,
        name,
        attributes,
        dimensions,
        autoResize,
        url,
        domain: domainMatch,
        validate,
        exports: xports
    } = options;
    const initPromise = new ZalgoPromise();
    const handledErrors = [];
    const clean = cleanup();
    const state = {};
    let internalState = {
        visible: true
    };
    const event = overrides.event ? overrides.event : eventEmitter();
    const props: PropsType<P> = overrides.props
        ? overrides.props
        : getDefaultProps();
    let currentProxyWin: ProxyWindow | null | undefined;
    let currentProxyContainer: ProxyObject<HTMLElement> | null | undefined;
    let childComponent: ChildExportsType<P> | null | undefined;
    const onErrorOverride: OnError | null | undefined = overrides.onError;
    let getProxyContainerOverride: GetProxyContainer | null | undefined =
        overrides.getProxyContainer;
    let showOverride: Show | null | undefined = overrides.show;
    let hideOverride: Hide | null | undefined = overrides.hide;
    const closeOverride: Close | null | undefined = overrides.close;
    let renderContainerOverride: RenderContainer | null | undefined =
        overrides.renderContainer;
    let getProxyWindowOverride: GetProxyWindow | null | undefined =
        overrides.getProxyWindow;
    let setProxyWinOverride: SetProxyWin | null | undefined =
        overrides.setProxyWin;
    let openFrameOverride: OpenFrame | null | undefined = overrides.openFrame;
    let openPrerenderFrameOverride: OpenPrerenderFrame | null | undefined =
        overrides.openPrerenderFrame;
    let prerenderOverride: Prerender | null | undefined = overrides.prerender;
    let openOverride: Open | null | undefined = overrides.open;
    let openPrerenderOverride: OpenPrerender | null | undefined =
        overrides.openPrerender;
    let watchForUnloadOverride: WatchForUnload | null | undefined =
        overrides.watchForUnload;
    const getInternalStateOverride: GetInternalState | null | undefined =
        overrides.getInternalState;
    const setInternalStateOverride: SetInternalState | null | undefined =
        overrides.setInternalState;

    const resolveInitPromise = () => {
        return ZalgoPromise.try(() => {
            if (overrides.resolveInitPromise) {
                return overrides.resolveInitPromise();
            }

            return initPromise.resolve();
        });
    };

    const rejectInitPromise = (err: unknown) => {
        return ZalgoPromise.try(() => {
            if (overrides.rejectInitPromise) {
                return overrides.rejectInitPromise(err);
            }

            return initPromise.reject(err);
        });
    };

    const getPropsForChild = (
        domain: string | RegExp
    ): ZalgoPromise<PropsType<P>> => {
        const result = {};

        for (const key of Object.keys(props)) {
            const prop = propsDef[key];

            if (prop && prop.sendToChild === false) {
                continue;
            }

            if (
                prop &&
                prop.sameDomain &&
                !matchDomain(domain, getDomain(window))
            ) {
                continue;
            }

            result[key] = props[key];
        }

        // $FlowFixMe
        return ZalgoPromise.hash(result);
    };

    const setupEvents = () => {
        event.on(EVENT.RENDER, () => props.onRender());
        event.on(EVENT.DISPLAY, () => props.onDisplay());
        event.on(EVENT.RENDERED, () => props.onRendered());
        event.on(EVENT.CLOSE, () => props.onClose());
        event.on(EVENT.DESTROY, () => props.onDestroy());
        event.on(EVENT.RESIZE, () => props.onResize());
        event.on(EVENT.FOCUS, () => props.onFocus());
        event.on(EVENT.PROPS, newProps => props.onProps(newProps));
        event.on(EVENT.ERROR, err => {
            if (props && props.onError) {
                return props.onError(err);
            } else {
                return rejectInitPromise(err).then(() => {
                    setTimeout(() => {
                        throw err;
                    }, 1);
                });
            }
        });
        clean.register(event.reset);
    };

    const getInternalState = () => {
        return ZalgoPromise.try(() => {
            if (getInternalStateOverride) {
                return getInternalStateOverride();
            }

            return internalState;
        });
    };

    const setInternalState = newInternalState => {
        return ZalgoPromise.try(() => {
            if (setInternalStateOverride) {
                return setInternalStateOverride(newInternalState);
            }

            internalState = { ...internalState, ...newInternalState };
            return internalState;
        });
    };

    const getProxyWindow = (): ZalgoPromise<ProxyWindow> => {
        if (getProxyWindowOverride) {
            return getProxyWindowOverride();
        }

        return ZalgoPromise.try(() => {
            const windowProp = props.window;

            if (windowProp) {
                const proxyWin = toProxyWindow(windowProp);
                clean.register(() => windowProp.close());
                return proxyWin;
            }

            return new ProxyWindow({
                send
            });
        });
    };

    const getProxyContainer: GetProxyContainer = (
        container: string | HTMLElement
    ): ZalgoPromise<ProxyObject<HTMLElement>> => {
        if (getProxyContainerOverride) {
            return getProxyContainerOverride(container);
        }

        return ZalgoPromise.try(() => {
            return elementReady(container);
        }).then(containerElement => {
            if (isShadowElement(containerElement)) {
                containerElement = insertShadowSlot(containerElement);
            }

            return getProxyObject(containerElement);
        });
    };

    const getPropsRef = (
        proxyWin: ProxyWindow,
        childDomain: string,
        domain: string | RegExp,
        uid: string
    ): ZalgoPromise<PropRef> => {
        return getPropsForChild(domain).then(childProps => {
            const value = serializeMessage(proxyWin, domain, childProps);
            const propRef =
                childDomain === getDomain()
                    ? {
                        type: INITIAL_PROPS.UID,
                        uid
                    }
                    : {
                        type: INITIAL_PROPS.RAW,
                        value
                    };

            if (propRef.type === INITIAL_PROPS.UID) {
                const global = getGlobal(window);
                global.props = global.props || {};
                global.props[uid] = value;
                clean.register(() => {
                    delete global.props[uid];
                });
            }

            return propRef;
        });
    };

    const setProxyWin = (proxyWin: ProxyWindow): ZalgoPromise<void> => {
        if (setProxyWinOverride) {
            return setProxyWinOverride(proxyWin);
        }

        return ZalgoPromise.try(() => {
            currentProxyWin = proxyWin;
        });
    };

    const show = (): ZalgoPromise<void> => {
        if (showOverride) {
            return showOverride();
        }

        return ZalgoPromise.hash({
            setState: setInternalState({
                visible: true
            }),
            showElement: currentProxyContainer
                ? currentProxyContainer.get().then(showElement)
                : null
        }).then(noop);
    };

    const hide = (): ZalgoPromise<void> => {
        if (hideOverride) {
            return hideOverride();
        }

        return ZalgoPromise.hash({
            setState: setInternalState({
                visible: false
            }),
            showElement: currentProxyContainer
                ? currentProxyContainer.get().then(hideElement)
                : null
        }).then(noop);
    };

    const getUrl = (): string => {
        if (typeof url === 'function') {
            return url({
                props
            });
        }

        return url;
    };

    const getAttributes = (): AttributesType => {
        if (typeof attributes === 'function') {
            return attributes({
                props
            });
        }

        return attributes;
    };

    const buildQuery = (): ZalgoPromise<Record<string, string | boolean>> => {
        return serializeProps(propsDef, props, METHOD.GET);
    };

    const buildBody = (): ZalgoPromise<Record<string, string | boolean>> => {
        return serializeProps(propsDef, props, METHOD.POST);
    };

    const buildUrl = (): ZalgoPromise<string> => {
        return buildQuery().then(query => {
            return extendUrl(normalizeMockUrl(getUrl()), {
                query
            });
        });
    };

    const getChildDomain = (): string => {
        if (domainMatch && typeof domainMatch === 'string') {
            return domainMatch;
        }

        return getDomainFromUrl(getUrl());
    };

    const getDomainMatcher = (): string | RegExp => {
        if (domainMatch && isRegex(domainMatch)) {
            return domainMatch;
        }

        return getChildDomain();
    };

    const openFrame = (
        context: $Values<typeof CONTEXT>,
        {
            windowName
        }: {
            windowName: string
        }
    ): ZalgoPromise<ProxyObject<HTMLIFrameElement> | null | undefined> => {
        if (openFrameOverride) {
            return openFrameOverride(context, {
                windowName
            });
        }

        return ZalgoPromise.try(() => {
            if (context === CONTEXT.IFRAME && __ZOID__.__IFRAME_SUPPORT__) {
                // $FlowFixMe
                const attrs = {
                    name: windowName,
                    title:name,
                    ...getAttributes().iframe
                };
                return getProxyObject(
                    iframe({
                        attributes: attrs
                    })
                );
            }
        });
    };

    const openPrerenderFrame = (
        context: $Values<typeof CONTEXT>
    ): ZalgoPromise<ProxyObject<HTMLIFrameElement> | null | undefined> => {
        if (openPrerenderFrameOverride) {
            return openPrerenderFrameOverride(context);
        }

        return ZalgoPromise.try(() => {
            if (context === CONTEXT.IFRAME && __ZOID__.__IFRAME_SUPPORT__) {
                // $FlowFixMe
                const attrs = {
                    name: `__${ ZOID }_prerender_frame__${ name }_${ uniqueID() }__`,
                    title:`prerender__${ name }`,
                    ...getAttributes().iframe
                };
                return getProxyObject(
                    iframe({
                        attributes: attrs
                    })
                );
            }
        });
    };

    const openPrerender = (
        context: $Values<typeof CONTEXT>,
        proxyWin: ProxyWindow,
        proxyPrerenderFrame: ProxyObject<HTMLIFrameElement> | null | undefined
    ): ZalgoPromise<ProxyWindow> => {
        if (openPrerenderOverride) {
            return openPrerenderOverride(context, proxyWin, proxyPrerenderFrame);
        }

        return ZalgoPromise.try(() => {
            if (context === CONTEXT.IFRAME && __ZOID__.__IFRAME_SUPPORT__) {
                if (!proxyPrerenderFrame) {
                    throw new Error(`Expected proxy frame to be passed`);
                }

                return proxyPrerenderFrame.get().then(prerenderFrame => {
                    clean.register(() => destroyElement(prerenderFrame));
                    return awaitFrameWindow(prerenderFrame)
                        .then(prerenderFrameWindow => {
                            return assertSameDomain(prerenderFrameWindow);
                        })
                        .then(win => {
                            return toProxyWindow(win);
                        });
                });
            } else if (
                context === CONTEXT.POPUP &&
                __ZOID__.__POPUP_SUPPORT__
            ) {
                return proxyWin;
            } else {
                throw new Error(`No render context available for ${ context }`);
            }
        });
    };

    const focus = (): ZalgoPromise<void> => {
        return ZalgoPromise.try(() => {
            if (currentProxyWin) {
                return ZalgoPromise.all([
                    event.trigger(EVENT.FOCUS),
                    currentProxyWin.focus()
                ]).then(noop);
            }
        });
    };

    const getWindowRef = (
        target: CrossDomainWindowType,
        domain: string,
        uid: string,
        context: $Values<typeof CONTEXT>
    ): WindowRef => {
        if (domain === getDomain(window)) {
            const global = getGlobal(window);
            global.windows = global.windows || {};
            global.windows[uid] = window;
            clean.register(() => {
                delete global.windows[uid];
            });
            return {
                type: WINDOW_REFERENCES.GLOBAL,
                uid
            };
        }

        if (context === CONTEXT.POPUP) {
            return {
                type: WINDOW_REFERENCES.OPENER
            };
        }

        return {
            type:    WINDOW_REFERENCES.PARENT,
            distance:getDistanceFromTop(window)
        };
    };

    const runTimeout = (): ZalgoPromise<void> => {
        return ZalgoPromise.try(() => {
            const timeout = props.timeout;

            if (timeout) {
                return initPromise.timeout(
                    timeout,
                    new Error(
                        `Loading component timed out after ${ timeout } milliseconds`
                    )
                );
            }
        });
    };

    const initChild = (
        childExports: ChildExportsType<P>
    ): ZalgoPromise<void> => {
        return ZalgoPromise.try(() => {
            childComponent = childExports;
            resolveInitPromise();
            clean.register(() => childExports.close.fireAndForget().catch(noop));
        });
    };

    const resize = ({
        width,
        height
    }: {
        width?: number | null | undefined
        height?: number | null | undefined
    }): ZalgoPromise<void> => {
        return ZalgoPromise.try(() => {
            event.trigger(EVENT.RESIZE, {
                width,
                height
            });
        });
    };

    const destroy = (err: unknown): ZalgoPromise<void> => {
        // eslint-disable-next-line promise/no-promise-in-callback
        return ZalgoPromise.try(() => {
            return event.trigger(EVENT.DESTROY);
        })
            .catch(noop)
            .then(() => {
                return clean.all(err);
            })
            .then(() => {
                initPromise.asyncReject(err || new Error('Component destroyed'));
            });
    };

    const close = memoize(
        (err?: unknown): ZalgoPromise<void> => {
            return ZalgoPromise.try(() => {
                if (closeOverride) {
                    // $FlowFixMe
                    const source = closeOverride.__source__;

                    if (isWindowClosed(source)) {
                        return;
                    }

                    return closeOverride();
                }

                return ZalgoPromise.try(() => {
                    return event.trigger(EVENT.CLOSE);
                }).then(() => {
                    return destroy(err || new Error(`Component closed`));
                });
            });
        }
    );

    const open = (
        context: $Values<typeof CONTEXT>,
        {
            proxyWin,
            proxyFrame,
            windowName
        }: {
            proxyWin: ProxyWindow
            proxyFrame: ProxyObject<HTMLIFrameElement> | null | undefined
            windowName: string
        }
    ): ZalgoPromise<ProxyWindow> => {
        if (openOverride) {
            return openOverride(context, {
                proxyWin,
                proxyFrame,
                windowName
            });
        }

        return ZalgoPromise.try(() => {
            if (context === CONTEXT.IFRAME && __ZOID__.__IFRAME_SUPPORT__) {
                if (!proxyFrame) {
                    throw new Error(`Expected proxy frame to be passed`);
                }

                return proxyFrame.get().then(frame => {
                    return awaitFrameWindow(frame).then(win => {
                        clean.register(() => destroyElement(frame));
                        clean.register(() => cleanUpWindow(win));
                        return win;
                    });
                });
            } else if (
                context === CONTEXT.POPUP &&
                __ZOID__.__POPUP_SUPPORT__
            ) {
                let { width, height } = dimensions;
                width = normalizeDimension(width, window.outerWidth);
                height = normalizeDimension(height, window.outerWidth);
                // $FlowFixMe
                const attrs = {
                    name: windowName,
                    width,
                    height,
                    ...getAttributes().popup
                };
                const win = popup('', attrs);
                clean.register(() => closeWindow(win));
                clean.register(() => cleanUpWindow(win));
                return win;
            } else {
                throw new Error(`No render context available for ${ context }`);
            }
        }).then(win => {
            proxyWin.setWindow(win, {
                send
            });
            return proxyWin.setName(windowName).then(() => {
                return proxyWin;
            });
        });
    };

    const watchForUnload = () => {
        return ZalgoPromise.try(() => {
            const unloadWindowListener = addEventListener(
                window,
                'unload',
                once(() => {
                    destroy(new Error(`Window navigated away`));
                })
            );
            const closeParentWindowListener = onCloseWindow(
                parentWin,
                destroy,
                3000
            );
            clean.register(closeParentWindowListener.cancel);
            clean.register(unloadWindowListener.cancel);

            if (watchForUnloadOverride) {
                return watchForUnloadOverride();
            }
        });
    };

    const watchForClose = (
        proxyWin: ProxyWindow,
        context: $Values<typeof CONTEXT>
    ): ZalgoPromise<void> => {
        let cancelled = false;
        clean.register(() => {
            cancelled = true;
        });
        return ZalgoPromise.delay(2000)
            .then(() => {
                return proxyWin.isClosed();
            })
            .then(isClosed => {
                if (!cancelled) {
                    if (isClosed) {
                        return close(new Error(`Detected ${ context } close`));
                    } else {
                        return watchForClose(proxyWin, context);
                    }
                }
            });
    };

    const checkWindowClose = (proxyWin: ProxyWindow): ZalgoPromise<boolean> => {
        let closed = false;
        return proxyWin
            .isClosed()
            .then(isClosed => {
                if (isClosed) {
                    closed = true;
                    return close(new Error(`Detected component window close`));
                }

                return ZalgoPromise.delay(200)
                    .then(() => proxyWin.isClosed())
                    .then(secondIsClosed => {
                        if (secondIsClosed) {
                            closed = true;
                            return close(
                                new Error(`Detected component window close`)
                            );
                        }
                    });
            })
            .then(() => {
                return closed;
            });
    };

    const onError = (err: unknown): ZalgoPromise<void> => {
        if (onErrorOverride) {
            return onErrorOverride(err);
        }

        return ZalgoPromise.try(() => {
            if (handledErrors.indexOf(err) !== -1) {
                return;
            }

            handledErrors.push(err);
            initPromise.asyncReject(err);
            return event.trigger(EVENT.ERROR, err);
        });
    };

    const exportsPromise: ZalgoPromise<X> = new ZalgoPromise();

    const getExports = (): X => {
        return xports({
            getExports: () => exportsPromise
        });
    };

    const resolveExports = (actualExports: X): ZalgoPromise<void> => {
        return ZalgoPromise.try(() => {
            exportsPromise.resolve(actualExports);
        });
    };

    initChild.onError = onError;

    const buildParentExports = (win: ProxyWindow): ParentExportsType<P, X> => {
        const checkClose = () => checkWindowClose(win);

        return {
            init:  initChild,
            close,
            checkClose,
            resize,
            onError,
            show,
            hide,
            export:resolveExports
        };
    };

    const buildChildPayload = ({
        proxyWin,
        childDomain,
        domain,
        target = window,
        context,
        uid
    }: {
        proxyWin: ProxyWindow
        childDomain: string
        domain: string | RegExp
        target: CrossDomainWindowType
        context: $Values<typeof CONTEXT>
        uid: string
    } = {}): ZalgoPromise<ChildPayload> => {
        return getPropsRef(proxyWin, childDomain, domain, uid).then(
            propsRef => {
                return {
                    uid,
                    context,
                    tag,
                    version:     __ZOID__.__VERSION__,
                    childDomain,
                    parentDomain:getDomain(window),
                    parent:      getWindowRef(target, childDomain, uid, context),
                    props:       propsRef,
                    exports:     serializeMessage(
                        proxyWin,
                        domain,
                        buildParentExports(proxyWin)
                    )
                };
            }
        );
    };

    const buildWindowName = ({
        proxyWin,
        childDomain,
        domain,
        target,
        uid,
        context
    }: {
        proxyWin: ProxyWindow
        childDomain: string
        domain: string | RegExp
        target: CrossDomainWindowType
        context: $Values<typeof CONTEXT>
        uid: string
    }): ZalgoPromise<string> => {
        return buildChildPayload({
            proxyWin,
            childDomain,
            domain,
            target,
            context,
            uid
        }).then(childPayload => {
            return `__${ ZOID }__${ name }__${ base64encode(
                JSON.stringify(childPayload)
            ) }__`;
        });
    };

    const renderTemplate = (
        renderer: (
            arg0: RenderOptionsType<P>,
        ) => HTMLElement | null | undefined,
        {
            context,
            uid,
            container,
            doc,
            frame,
            prerenderFrame
        }: {
            context: $Values<typeof CONTEXT>
            uid: string
            container?: HTMLElement
            doc: Document
            frame?: HTMLIFrameElement | null | undefined
            prerenderFrame?: HTMLIFrameElement | null | undefined
        }
    ): HTMLElement | null | undefined => {
        return renderer({
            container,
            context,
            uid,
            doc,
            frame,
            prerenderFrame,
            focus,
            close,
            state,
            props,
            tag,
            dimensions,
            event
        });
    };

    const prerender = (
        proxyPrerenderWin: ProxyWindow,
        {
            context,
            uid
        }: {
            context: $Values<typeof CONTEXT>
            uid: string
        }
    ): ZalgoPromise<void> => {
        if (prerenderOverride) {
            return prerenderOverride(proxyPrerenderWin, {
                context,
                uid
            });
        }

        return ZalgoPromise.try(() => {
            if (!prerenderTemplate) {
                return;
            }

            let prerenderWindow = proxyPrerenderWin.getWindow();

            if (
                !prerenderWindow ||
                !isSameDomain(prerenderWindow) ||
                !isBlankDomain(prerenderWindow)
            ) {
                return;
            }

            prerenderWindow = assertSameDomain(prerenderWindow);
            const doc = prerenderWindow.document;
            const el = renderTemplate(prerenderTemplate, {
                context,
                uid,
                doc
            });

            if (!el) {
                return;
            }

            if (el.ownerDocument !== doc) {
                throw new Error(
                    `Expected prerender template to have been created with document from child window`
                );
            }

            writeElementToWindow(prerenderWindow, el);
            let { width = false, height = false, element = 'body' } = autoResize;
            element = getElementSafe(element, doc);

            if (element && (width || height)) {
                const prerenderResizeListener = onResize(
                    element,
                    ({ width: newWidth, height: newHeight }) => {
                        resize({
                            width: width ? newWidth : undefined,
                            height:height ? newHeight : undefined
                        });
                    },
                    {
                        width,
                        height,
                        win: prerenderWindow
                    }
                );
                event.on(EVENT.RENDERED, prerenderResizeListener.cancel);
            }
        });
    };

    const renderContainer: RenderContainer = (
        proxyContainer: ProxyObject<HTMLElement>,
        {
            proxyFrame,
            proxyPrerenderFrame,
            context,
            uid,
            rerender
        }: RenderContainerOptions
    ): ZalgoPromise<ProxyObject<HTMLElement> | null | undefined> => {
        if (renderContainerOverride) {
            return renderContainerOverride(proxyContainer, {
                proxyFrame,
                proxyPrerenderFrame,
                context,
                uid,
                rerender
            });
        }

        return ZalgoPromise.hash({
            container:     proxyContainer.get(),
            // $FlowFixMe
            frame:         proxyFrame ? proxyFrame.get() : null,
            // $FlowFixMe
            prerenderFrame:proxyPrerenderFrame
                ? proxyPrerenderFrame.get()
                : null,
            internalState: getInternalState()
        }).then(
            ({ container, frame, prerenderFrame, internalState: { visible } }) => {
                const innerContainer = renderTemplate(containerTemplate, {
                    context,
                    uid,
                    container,
                    frame,
                    prerenderFrame,
                    doc: document
                });

                if (innerContainer) {
                    if (!visible) {
                        hideElement(innerContainer);
                    }

                    appendChild(container, innerContainer);
                    const containerWatcher = watchElementForClose(
                        innerContainer,
                        () => {
                            const removeError = new Error(
                                `Detected container element removed from DOM`
                            );
                            return ZalgoPromise.delay(1).then(() => {
                                if (isElementClosed(innerContainer)) {
                                    close(removeError);
                                } else {
                                    clean.all(removeError);
                                    return rerender().then(
                                        resolveInitPromise,
                                        rejectInitPromise
                                    );
                                }
                            });
                        }
                    );
                    clean.register(() => containerWatcher.cancel());
                    clean.register(() => destroyElement(innerContainer));
                    currentProxyContainer = getProxyObject(innerContainer);
                    return currentProxyContainer;
                }
            }
        );
    };

    const getBridgeUrl = (): string | null | undefined => {
        if (typeof options.bridgeUrl === 'function') {
            return options.bridgeUrl({
                props
            });
        }

        return options.bridgeUrl;
    };

    const openBridge = (
        proxyWin: ProxyWindow,
        domain: string,
        context: $Values<typeof CONTEXT>
    ):
        | ZalgoPromise<CrossDomainWindowType | null | undefined>
        | null
        | undefined => {
        if (__POST_ROBOT__.__IE_POPUP_SUPPORT__) {
            return ZalgoPromise.try(() => {
                return proxyWin.awaitWindow();
            }).then(win => {
                if (
                    !bridge ||
                    !bridge.needsBridge({
                        win,
                        domain
                    }) ||
                    bridge.hasBridge(domain, domain)
                ) {
                    return;
                }

                const bridgeUrl = getBridgeUrl();

                if (!bridgeUrl) {
                    throw new Error(`Bridge needed to render ${ context }`);
                }

                const bridgeDomain = getDomainFromUrl(bridgeUrl);
                bridge.linkUrl(win, domain);
                return bridge.openBridge(
                    normalizeMockUrl(bridgeUrl),
                    bridgeDomain
                );
            });
        }
    };

    const getHelpers = (): ParentHelpers<P> => {
        return {
            state,
            event,
            close,
            focus,
            resize,
            // eslint-disable-next-line no-use-before-define
            onError,
            updateProps,
            show,
            hide
        };
    };

    const setProps = (
        newProps: PropsInputType<P>,
        isUpdate = false
    ) => {
        if (__DEBUG__ && validate) {
            validate({
                props: newProps
            });
        }

        const helpers = getHelpers();
        extendProps(propsDef, props, newProps, helpers, isUpdate);
    };

    const updateProps = (newProps: PropsInputType<P>): ZalgoPromise<void> => {
        setProps(newProps, true);
        return initPromise.then(() => {
            const child = childComponent;
            const proxyWin = currentProxyWin;

            if (!child || !proxyWin) {
                return;
            }

            return getPropsForChild(getDomainMatcher()).then(childProps => {
                return child.updateProps(childProps).catch(err => {
                    return checkWindowClose(proxyWin).then(closed => {
                        if (!closed) {
                            throw err;
                        }
                    });
                });
            });
        });
    };

    const delegate = (
        context: $Values<typeof CONTEXT>,
        target: CrossDomainWindowType
    ): ZalgoPromise<DelegateOverrides> => {
        const delegateProps = {};

        for (const propName of Object.keys(props)) {
            const propDef = propsDef[propName];

            if (propDef && propDef.allowDelegate) {
                delegateProps[propName] = props[propName];
            }
        }

        const childOverridesPromise = send(
            target,
            `${ POST_MESSAGE.DELEGATE }_${ name }`,
            {
                overrides: {
                    props: delegateProps,
                    event,
                    close,
                    onError,
                    getInternalState,
                    setInternalState,
                    resolveInitPromise,
                    rejectInitPromise
                }
            }
        )
            .then(({ data: { parent } }) => {
                const parentComp: ParentComponent<P, X> = parent;
                clean.register(err => {
                    if (!isWindowClosed(target)) {
                        return parentComp.destroy(err);
                    }
                });
                return parentComp.getDelegateOverrides();
            })
            .catch(err => {
                throw new Error(
                    `Unable to delegate rendering. Possibly the component is not loaded in the target window.\n\n${ stringifyError(
                        err
                    ) }`
                );
            });

        getProxyContainerOverride = (...args) =>
            childOverridesPromise.then(childOverrides =>
                childOverrides.getProxyContainer(...args));

        renderContainerOverride = (...args) =>
            childOverridesPromise.then(childOverrides =>
                childOverrides.renderContainer(...args));

        showOverride = (...args) =>
            childOverridesPromise.then(childOverrides =>
                childOverrides.show(...args));

        hideOverride = (...args) =>
            childOverridesPromise.then(childOverrides =>
                childOverrides.hide(...args));

        watchForUnloadOverride = (...args) =>
            childOverridesPromise.then(childOverrides =>
                childOverrides.watchForUnload(...args));

        if (context === CONTEXT.IFRAME && __ZOID__.__IFRAME_SUPPORT__) {
            getProxyWindowOverride = (...args) =>
                childOverridesPromise.then(childOverrides =>
                    childOverrides.getProxyWindow(...args));

            openFrameOverride = (...args) =>
                childOverridesPromise.then(childOverrides =>
                    childOverrides.openFrame(...args));

            openPrerenderFrameOverride = (...args) =>
                childOverridesPromise.then(childOverrides =>
                    childOverrides.openPrerenderFrame(...args));

            prerenderOverride = (...args) =>
                childOverridesPromise.then(childOverrides =>
                    childOverrides.prerender(...args));

            openOverride = (...args) =>
                childOverridesPromise.then(childOverrides =>
                    childOverrides.open(...args));

            openPrerenderOverride = (...args) =>
                childOverridesPromise.then(childOverrides =>
                    childOverrides.openPrerender(...args));
        } else if (context === CONTEXT.POPUP && __ZOID__.__POPUP_SUPPORT__) {
            setProxyWinOverride = (...args) =>
                childOverridesPromise.then(childOverrides =>
                    childOverrides.setProxyWin(...args));
        }

        return childOverridesPromise;
    };

    const getDelegateOverrides = (): ZalgoPromise<DelegateOverrides> => {
        return ZalgoPromise.try(() => {
            return {
                getProxyContainer,
                show,
                hide,
                renderContainer,
                getProxyWindow,
                watchForUnload,
                openFrame,
                openPrerenderFrame,
                prerender,
                open,
                openPrerender,
                setProxyWin
            };
        });
    };

    const checkAllowRender = (
        target: CrossDomainWindowType,
        domain: string | RegExp,
        container: string | HTMLElement
    ) => {
        if (target === window) {
            return;
        }

        if (!isSameTopWindow(window, target)) {
            throw new Error(`Can only renderTo an adjacent frame`);
        }

        const origin = getDomain();

        if (!matchDomain(domain, origin) && !isSameDomain(target)) {
            throw new Error(
                `Can not render remotely to ${ domain.toString() } - can only render to ${ origin }`
            );
        }

        if (container && typeof container !== 'string') {
            throw new Error(
                `Container passed to renderTo must be a string selector, got ${ typeof container } }`
            );
        }
    };

    const init = () => {
        setupEvents();
    };

    const render = ({
        target,
        container,
        context,
        rerender
    }: RenderOptions): ZalgoPromise<void> => {
        return ZalgoPromise.try(() => {
            const uid = `${ ZOID }-${ tag }-${ uniqueID() }`;
            const domain = getDomainMatcher();
            const childDomain = getChildDomain();
            checkAllowRender(target, domain, container);
            const delegatePromise = ZalgoPromise.try(() => {
                if (target !== window) {
                    return delegate(context, target);
                }
            });
            const windowProp = props.window;
            const watchForUnloadPromise = watchForUnload();
            const buildUrlPromise = buildUrl();
            const buildBodyPromise = buildBody();
            const onRenderPromise = event.trigger(EVENT.RENDER);
            const getProxyContainerPromise = getProxyContainer(container);
            const getProxyWindowPromise = getProxyWindow();
            const buildWindowNamePromise = getProxyWindowPromise.then(
                proxyWin => {
                    return buildWindowName({
                        proxyWin,
                        childDomain,
                        domain,
                        target,
                        context,
                        uid
                    });
                }
            );
            const openFramePromise = buildWindowNamePromise.then(windowName =>
                openFrame(context, {
                    windowName
                }));
            const openPrerenderFramePromise = openPrerenderFrame(context);
            const renderContainerPromise = ZalgoPromise.hash({
                proxyContainer:     getProxyContainerPromise,
                proxyFrame:         openFramePromise,
                proxyPrerenderFrame:openPrerenderFramePromise
            })
                .then(({ proxyContainer, proxyFrame, proxyPrerenderFrame }) => {
                    return renderContainer(proxyContainer, {
                        context,
                        uid,
                        proxyFrame,
                        proxyPrerenderFrame,
                        rerender
                    });
                })
                .then(proxyContainer => {
                    return proxyContainer;
                });
            const openPromise = ZalgoPromise.hash({
                windowName:buildWindowNamePromise,
                proxyFrame:openFramePromise,
                proxyWin:  getProxyWindowPromise
            }).then(({ windowName, proxyWin, proxyFrame }) => {
                return windowProp
                    ? proxyWin
                    : open(context, {
                        windowName,
                        proxyWin,
                        proxyFrame
                    });
            });
            const openPrerenderPromise = ZalgoPromise.hash({
                proxyWin:           openPromise,
                proxyPrerenderFrame:openPrerenderFramePromise
            }).then(({ proxyWin, proxyPrerenderFrame }) => {
                return openPrerender(context, proxyWin, proxyPrerenderFrame);
            });
            const setStatePromise = openPromise.then(proxyWin => {
                currentProxyWin = proxyWin;
                return setProxyWin(proxyWin);
            });
            const prerenderPromise = ZalgoPromise.hash({
                proxyPrerenderWin:openPrerenderPromise,
                state:            setStatePromise
            }).then(({ proxyPrerenderWin }) => {
                return prerender(proxyPrerenderWin, {
                    context,
                    uid
                });
            });
            const setWindowNamePromise = ZalgoPromise.hash({
                proxyWin:  openPromise,
                windowName:buildWindowNamePromise
            }).then(({ proxyWin, windowName }) => {
                if (windowProp) {
                    return proxyWin.setName(windowName);
                }
            });
            const getMethodPromise = ZalgoPromise.hash({
                body: buildBodyPromise
            }).then(({ body }) => {
                if (options.method) {
                    return options.method;
                }

                if (Object.keys(body).length) {
                    return METHOD.POST;
                }

                return METHOD.GET;
            });
            const loadUrlPromise = ZalgoPromise.hash({
                proxyWin:  openPromise,
                windowUrl: buildUrlPromise,
                body:      buildBodyPromise,
                method:    getMethodPromise,
                windowName:setWindowNamePromise,
                prerender: prerenderPromise
            }).then(({ proxyWin, windowUrl, body, method }) => {
                return proxyWin.setLocation(windowUrl, {
                    method,
                    body
                });
            });
            const watchForClosePromise = openPromise.then(proxyWin => {
                watchForClose(proxyWin, context);
            });
            const onDisplayPromise = ZalgoPromise.hash({
                container:renderContainerPromise,
                prerender:prerenderPromise
            }).then(() => {
                return event.trigger(EVENT.DISPLAY);
            });
            const openBridgePromise = openPromise.then(proxyWin => {
                return openBridge(proxyWin, childDomain, context);
            });
            const runTimeoutPromise = loadUrlPromise.then(() => {
                return runTimeout();
            });
            const onRenderedPromise = initPromise.then(() => {
                return event.trigger(EVENT.RENDERED);
            });
            return ZalgoPromise.hash({
                initPromise,
                buildUrlPromise,
                onRenderPromise,
                getProxyContainerPromise,
                openFramePromise,
                openPrerenderFramePromise,
                renderContainerPromise,
                openPromise,
                openPrerenderPromise,
                setStatePromise,
                prerenderPromise,
                loadUrlPromise,
                buildWindowNamePromise,
                setWindowNamePromise,
                watchForClosePromise,
                onDisplayPromise,
                openBridgePromise,
                runTimeoutPromise,
                onRenderedPromise,
                delegatePromise,
                watchForUnloadPromise
            });
        })
            .catch(err => {
                return ZalgoPromise.all([ onError(err), destroy(err) ]).then(
                    () => {
                        throw err;
                    },
                    () => {
                        throw err;
                    }
                );
            })
            .then(noop);
    };

    return {
        init,
        render,
        destroy,
        setProps,
        getHelpers,
        getDelegateOverrides,
        getExports
    };
}
