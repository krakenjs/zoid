/* @flow */
/* eslint max-lines: 0 */

import { send, bridge, ProxyWindow, toProxyWindow, type CrossDomainFunctionType, cleanUpWindow } from 'post-robot/src';
import { isSameDomain, matchDomain, getDomainFromUrl, isBlankDomain, getAncestor, getDomain, type CrossDomainWindowType,
    getDistanceFromTop, normalizeMockUrl, assertSameDomain, closeWindow, onCloseWindow, isWindowClosed, isSameTopWindow,
    type DomainMatcher } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { addEventListener, uniqueID, elementReady, writeElementToWindow, eventEmitter, type EventEmitterType,
    noop, onResize, extendUrl, appendChild, cleanup,
    once, stringifyError, destroyElement, getElementSafe, showElement, hideElement, iframe, memoize, isElementClosed,
    awaitFrameWindow, popup, normalizeDimension, watchElementForClose, isShadowElement, insertShadowSlot, extend } from 'belter/src';

import { ZOID, POST_MESSAGE, CONTEXT, EVENT, METHOD,
    WINDOW_REFERENCE, DEFAULT_DIMENSIONS } from '../constants';
import { getGlobal, getProxyObject, crossDomainSerialize, buildChildWindowName, type ProxyObject } from '../lib';
import type { PropsInputType, PropsType } from '../component/props';
import type { ChildExportsType } from '../child';
import type { CssDimensionsType, ContainerReferenceType } from '../types';
import type { NormalizedComponentOptionsType, AttributesType } from '../component';

import { serializeProps, extendProps } from './props';

export type RenderOptionsType<P> = {|
    uid : string,
    props : PropsType<P>,
    tag : string,
    context : $Values<typeof CONTEXT>,
    close : (?string) => ZalgoPromise<void>,
    focus : () => ZalgoPromise<void>,
    doc : Document,
    container? : HTMLElement,
    dimensions : CssDimensionsType,
    state : Object,
    event : EventEmitterType,
    frame : ?HTMLIFrameElement,
    prerenderFrame : ?HTMLIFrameElement
|};

export type ParentExportsType<P, X> = {|
    init : (ChildExportsType<P>) => ZalgoPromise<void>,
    close : () => ZalgoPromise<void>,
    checkClose : CrossDomainFunctionType<[], boolean>,
    resize : CrossDomainFunctionType<[{| width? : ?number, height? : ?number |}], void>,
    onError : (mixed) => ZalgoPromise<void>,
    show : () => ZalgoPromise<void>,
    hide : () => ZalgoPromise<void>,
    export : (X) => ZalgoPromise<void>
|};

export type WindowRef =
    {| type : typeof WINDOW_REFERENCE.OPENER |} |
    {| type : typeof WINDOW_REFERENCE.PARENT, distance : number |} |
    {| type : typeof WINDOW_REFERENCE.GLOBAL, uid : string |} |
    {| type : typeof WINDOW_REFERENCE.NAME, name : string |};

export type InitialChildPayload<P, X> = {|
    uid : string,
    tag : string,
    version : string,
    context : $Values<typeof CONTEXT>,
    childDomainMatch : DomainMatcher,
    props : PropsType<P>,
    exports : ParentExportsType<P, X>
|};

export type InitialChildPayloadMetadata = {|
    windowRef : WindowRef
|};

export type StateType = Object;

export type ParentHelpers<P> = {|
    state : StateType,
    close : () => ZalgoPromise<void>,
    focus : () => ZalgoPromise<void>,
    resize : ({| width : ?number, height : ?number |}) => ZalgoPromise<void>,
    onError : (mixed) => ZalgoPromise<void>,
    updateProps : PropsInputType<P> => ZalgoPromise<void>,
    event : EventEmitterType,
    show : () => ZalgoPromise<void>,
    hide : () => ZalgoPromise<void>
|};

function getDefaultProps<P>() : PropsType<P> {
    // $FlowFixMe
    return {};
}

type InternalState = {|
    visible : boolean
|};

type Rerender = () => ZalgoPromise<void>;

type RenderContainerOptions = {|
    context : $Values<typeof CONTEXT>,
    proxyFrame : ?ProxyObject<HTMLIFrameElement>,
    proxyPrerenderFrame : ?ProxyObject<HTMLIFrameElement>,
    rerender : Rerender
|};

type ResolveInitPromise = () => ZalgoPromise<void>;
type RejectInitPromise = (mixed) => ZalgoPromise<void>;
type GetProxyContainer = (container : ContainerReferenceType) => ZalgoPromise<ProxyObject<HTMLElement>>;
type Show = () => ZalgoPromise<void>;
type Hide = () => ZalgoPromise<void>;
type Close = () => ZalgoPromise<void>;
type OnError = (mixed) => ZalgoPromise<void>;
type RenderContainer = (proxyContainer : ProxyObject<HTMLElement>, RenderContainerOptions) => ZalgoPromise<?ProxyObject<HTMLElement>>;
type SetProxyWin = (ProxyWindow) => ZalgoPromise<void>;
type GetProxyWindow = () => ZalgoPromise<ProxyWindow>;
type OpenFrame = (context : $Values<typeof CONTEXT>, {| windowName : string |}) => ZalgoPromise<?ProxyObject<HTMLIFrameElement>>;
type OpenPrerenderFrame = (context : $Values<typeof CONTEXT>) => ZalgoPromise<?ProxyObject<HTMLIFrameElement>>;
type Prerender = (proxyPrerenderWin : ProxyWindow, {| context : $Values<typeof CONTEXT>|}) => ZalgoPromise<void>;
type Open = (context : $Values<typeof CONTEXT>, {| proxyWin : ProxyWindow, proxyFrame : ?ProxyObject<HTMLIFrameElement>, windowName : string |}) => ZalgoPromise<ProxyWindow>;
type OpenPrerender = (context : $Values<typeof CONTEXT>, proxyWin : ProxyWindow, proxyPrerenderFrame : ?ProxyObject<HTMLIFrameElement>) => ZalgoPromise<ProxyWindow>;
type WatchForUnload = () => ZalgoPromise<void>;
type GetInternalState = () => ZalgoPromise<InternalState>;
type SetInternalState = (InternalState) => ZalgoPromise<InternalState>;

type ParentDelegateOverrides<P> = {|
    props : PropsType<P>,
    event : EventEmitterType,
    close : Close,
    onError : OnError,
    getProxyContainer : GetProxyContainer,
    show : Show,
    hide : Hide,
    renderContainer : RenderContainer,
    getProxyWindow : GetProxyWindow,
    setProxyWin : SetProxyWin,
    openFrame : OpenFrame,
    openPrerenderFrame : OpenPrerenderFrame,
    prerender : Prerender,
    open : Open,
    openPrerender : OpenPrerender,
    watchForUnload : WatchForUnload,
    getInternalState : GetInternalState,
    setInternalState : SetInternalState,
    resolveInitPromise : ResolveInitPromise,
    rejectInitPromise : RejectInitPromise
|};

type DelegateOverrides = {|
    getProxyContainer : GetProxyContainer,
    show : Show,
    hide : Hide,
    renderContainer : RenderContainer,
    getProxyWindow : GetProxyWindow,
    setProxyWin : SetProxyWin,
    openFrame : OpenFrame,
    openPrerenderFrame : OpenPrerenderFrame,
    prerender : Prerender,
    open : Open,
    openPrerender : OpenPrerender,
    watchForUnload : WatchForUnload
|};

type RenderOptions = {|
    target : CrossDomainWindowType,
    container : ContainerReferenceType,
    context : $Values<typeof CONTEXT>,
    rerender : Rerender
|};

type ParentComponent<P, X> = {|
    init : () => void,
    render : (RenderOptions) => ZalgoPromise<void>,
    getProps : () => PropsType<P>,
    setProps : (newProps : PropsInputType<P>, isUpdate? : boolean) => void,
    export : (X) => ZalgoPromise<void>,
    destroy : (err? : mixed) => ZalgoPromise<void>,
    getHelpers : () => ParentHelpers<P>,
    getDelegateOverrides : () => ZalgoPromise<DelegateOverrides>,
    getExports : () => X
|};

const getDefaultOverrides = <P>() : ParentDelegateOverrides<P> => {
    // $FlowFixMe
    return {};
};

type ParentOptions<P, X, C> = {|
    uid : string,
    options : NormalizedComponentOptionsType<P, X, C>,
    overrides? : ParentDelegateOverrides<P>,
    parentWin? : CrossDomainWindowType
|};

export function parentComponent<P, X, C>({ uid, options, overrides = getDefaultOverrides(), parentWin = window } : ParentOptions<P, X, C>) : ParentComponent<P, X> {
    const { propsDef, containerTemplate, prerenderTemplate, tag, name, attributes, dimensions, autoResize, url, domain: domainMatch, validate, exports: xports } = options;

    const initPromise = new ZalgoPromise();
    const handledErrors = [];
    const clean = cleanup();
    const state = {};
    const inputProps = {};
    let internalState = {
        visible: true
    };
    const event = overrides.event ? overrides.event : eventEmitter();
    const props : PropsType<P> = overrides.props ? overrides.props : getDefaultProps();

    let currentProxyWin : ?ProxyWindow;
    let currentProxyContainer : ?ProxyObject<HTMLElement>;
    let childComponent : ?ChildExportsType<P>;
    let currentChildDomain : ?string;
    let currentContainer : HTMLElement | void;

    const onErrorOverride : ?OnError = overrides.onError;
    let getProxyContainerOverride : ?GetProxyContainer = overrides.getProxyContainer;
    let showOverride : ?Show = overrides.show;
    let hideOverride : ?Hide = overrides.hide;
    const closeOverride : ?Close = overrides.close;
    let renderContainerOverride : ?RenderContainer = overrides.renderContainer;
    let getProxyWindowOverride : ?GetProxyWindow = overrides.getProxyWindow;
    let setProxyWinOverride : ?SetProxyWin = overrides.setProxyWin;
    let openFrameOverride : ?OpenFrame = overrides.openFrame;
    let openPrerenderFrameOverride : ?OpenPrerenderFrame = overrides.openPrerenderFrame;
    let prerenderOverride : ?Prerender = overrides.prerender;
    let openOverride : ?Open = overrides.open;
    let openPrerenderOverride : ?OpenPrerender = overrides.openPrerender;
    let watchForUnloadOverride : ?WatchForUnload = overrides.watchForUnload;
    const getInternalStateOverride : ?GetInternalState = overrides.getInternalState;
    const setInternalStateOverride : ?SetInternalState = overrides.setInternalState;

    const getDimensions = () : CssDimensionsType => {
        if (typeof dimensions === 'function') {
            return dimensions({ props });
        }
        return dimensions;
    };

    const resolveInitPromise = () => {
        return ZalgoPromise.try(() => {
            if (overrides.resolveInitPromise) {
                return overrides.resolveInitPromise();
            }

            return initPromise.resolve();
        });
    };

    const rejectInitPromise = (err : mixed) => {
        return ZalgoPromise.try(() => {
            if (overrides.rejectInitPromise) {
                return overrides.rejectInitPromise(err);
            }

            return initPromise.reject(err);
        });
    };

    const getPropsForChild = (initialChildDomain : string) : ZalgoPromise<PropsType<P>> => {
        const result = {};

        for (const key of Object.keys(props)) {
            const prop = propsDef[key];

            if (prop && prop.sendToChild === false) {
                continue;
            }

            if (prop && prop.sameDomain && !matchDomain(initialChildDomain, getDomain(window))) {
                continue;
            }
            
            result[key] = props[key];
        }

        // $FlowFixMe
        return ZalgoPromise.hash(result);
    };

    const setupEvents = () => {
        event.on(EVENT.RENDER,   () => props.onRender());
        event.on(EVENT.DISPLAY,  () => props.onDisplay());
        event.on(EVENT.RENDERED, () => props.onRendered());
        event.on(EVENT.CLOSE,    () => props.onClose());
        event.on(EVENT.DESTROY,  () => props.onDestroy());
        event.on(EVENT.RESIZE,   () => props.onResize());
        event.on(EVENT.FOCUS,    () => props.onFocus());
        event.on(EVENT.PROPS,    (newProps) => props.onProps(newProps));
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

    const setInternalState = (newInternalState)  => {
        return ZalgoPromise.try(() => {
            if (setInternalStateOverride) {
                return setInternalStateOverride(newInternalState);
            }

            internalState = { ...internalState, ...newInternalState };
            return internalState;
        });
    };

    const getProxyWindow = () : ZalgoPromise<ProxyWindow> => {
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

            return new ProxyWindow({ send });
        });
    };

    const setProxyWin = (proxyWin : ProxyWindow) : ZalgoPromise<void> => {
        if (setProxyWinOverride) {
            return setProxyWinOverride(proxyWin);
        }

        return ZalgoPromise.try(() => {
            currentProxyWin = proxyWin;
        });
    };

    const show = () : ZalgoPromise<void> => {
        if (showOverride) {
            return showOverride();
        }

        return ZalgoPromise.hash({
            setState:    setInternalState({ visible: true }),
            showElement: currentProxyContainer ? currentProxyContainer.get().then(showElement) : null
        }).then(noop);
    };

    const hide = () : ZalgoPromise<void> => {
        if (hideOverride) {
            return hideOverride();
        }

        return ZalgoPromise.hash({
            setState:    setInternalState({ visible: false }),
            showElement: currentProxyContainer ? currentProxyContainer.get().then(hideElement) : null
        }).then(noop);
    };

    const getUrl = () : string => {
        if (typeof url === 'function') {
            return url({ props });
        }

        return url;
    };

    const getAttributes = () : AttributesType => {
        if (typeof attributes === 'function') {
            return attributes({ props });
        }

        return attributes;
    };

    const buildQuery = () : ZalgoPromise<{| [string] : string | boolean |}> => {
        return serializeProps(propsDef, props, METHOD.GET);
    };

    const buildBody = () : ZalgoPromise<{| [string] : string | boolean |}> => {
        return serializeProps(propsDef, props, METHOD.POST);
    };

    const buildUrl = () : ZalgoPromise<string> => {
        return buildQuery().then(query => {
            return extendUrl(normalizeMockUrl(getUrl()), { query });
        });
    };

    const getInitialChildDomain = () : string => {
        return getDomainFromUrl(getUrl());
    };

    const getDomainMatcher = () : DomainMatcher => {
        if (domainMatch) {
            return domainMatch;
        }

        return getInitialChildDomain();
    };

    const openFrame = (context : $Values<typeof CONTEXT>, { windowName } : {| windowName : string |}) : ZalgoPromise<?ProxyObject<HTMLIFrameElement>> => {
        if (openFrameOverride) {
            return openFrameOverride(context, { windowName });
        }
        
        return ZalgoPromise.try(() => {
            if (context === CONTEXT.IFRAME && __ZOID__.__IFRAME_SUPPORT__) {

                // $FlowFixMe
                const attrs = {
                    name:  windowName,
                    title: name,
                    ...getAttributes().iframe
                };

                return getProxyObject(iframe({ attributes: attrs }));
            }
        });
    };

    const openPrerenderFrame = (context : $Values<typeof CONTEXT>) : ZalgoPromise<?ProxyObject<HTMLIFrameElement>> => {
        if (openPrerenderFrameOverride) {
            return openPrerenderFrameOverride(context);
        }

        return ZalgoPromise.try(() => {
            if (context === CONTEXT.IFRAME && __ZOID__.__IFRAME_SUPPORT__) {
                // $FlowFixMe
                const attrs = {
                    name:  `__${ ZOID }_prerender_frame__${ name }_${ uniqueID() }__`,
                    title: `prerender__${ name }`,
                    ...getAttributes().iframe
                };
                return getProxyObject(iframe({
                    attributes: attrs
                }));
            }
        });
    };
    
    const openPrerender = (context : $Values<typeof CONTEXT>, proxyWin : ProxyWindow, proxyPrerenderFrame : ?ProxyObject<HTMLIFrameElement>) : ZalgoPromise<ProxyWindow> => {
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
        
                    return awaitFrameWindow(prerenderFrame).then(prerenderFrameWindow => {
                        return assertSameDomain(prerenderFrameWindow);
                    }).then(win => {
                        return toProxyWindow(win);
                    });
                });
            } else if (context === CONTEXT.POPUP && __ZOID__.__POPUP_SUPPORT__) {
                return proxyWin;
            } else {
                throw new Error(`No render context available for ${ context }`);
            }
        });
    };

    const focus = () : ZalgoPromise<void> => {
        return ZalgoPromise.try(() => {
            if (currentProxyWin) {
                return ZalgoPromise.all([
                    event.trigger(EVENT.FOCUS),
                    currentProxyWin.focus()
                ]).then(noop);
            }
        });
    };

    const getCurrentWindowReferenceUID = () : string => {
        const global = getGlobal(window);
        global.windows = global.windows || {};
        global.windows[uid] = window;
        clean.register(() => {
            delete global.windows[uid];
        });
        return uid;
    };

    const getWindowRef = (target : CrossDomainWindowType, initialChildDomain : string, context : $Values<typeof CONTEXT>, proxyWin : ProxyWindow) : WindowRef => {
        if (initialChildDomain === getDomain(window)) {
            return { type: WINDOW_REFERENCE.GLOBAL, uid: getCurrentWindowReferenceUID() };
        }

        if (target !== window) {
            throw new Error(`Can not construct cross-domain window reference for different target window`);
        }

        if (props.window) {
            const actualComponentWindow = proxyWin.getWindow();
            if (!actualComponentWindow) {
                throw new Error(`Can not construct cross-domain window reference for lazy window prop`);
            }

            if (getAncestor(actualComponentWindow) !== window) {
                throw new Error(`Can not construct cross-domain window reference for window prop with different ancestor`);
            }
        }

        if (context === CONTEXT.POPUP) {
            return { type: WINDOW_REFERENCE.OPENER };
        } else if (context === CONTEXT.IFRAME) {
            return { type: WINDOW_REFERENCE.PARENT, distance: getDistanceFromTop(window) };
        }

        throw new Error(`Can not construct window reference for child`);
    };

    const runTimeout = () : ZalgoPromise<void> => {
        return ZalgoPromise.try(() => {
            const timeout = props.timeout;

            if (timeout) {
                return initPromise.timeout(timeout, new Error(`Loading component timed out after ${ timeout } milliseconds`));
            }
        });
    };

    const initChild = (childDomain : string, childExports : ChildExportsType<P>) : ZalgoPromise<void> => {
        return ZalgoPromise.try(() => {
            currentChildDomain = childDomain;
            childComponent = childExports;
            resolveInitPromise();
            clean.register(() => childExports.close.fireAndForget().catch(noop));
        });
    };

    const resize = ({ width, height } : {| width? : ?number, height? : ?number |}) : ZalgoPromise<void> => {
        return ZalgoPromise.try(() => {
            event.trigger(EVENT.RESIZE, { width, height });
        });
    };

    const destroy = (err : mixed) : ZalgoPromise<void> => {
        // eslint-disable-next-line promise/no-promise-in-callback
        return ZalgoPromise.try(() => {
            return event.trigger(EVENT.DESTROY);
        }).catch(noop).then(() => {
            return clean.all(err);
        }).then(() => {
            initPromise.asyncReject(err || new Error('Component destroyed'));
        });
    };

    const close = memoize((err? : mixed) : ZalgoPromise<void> => {
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
    });

    const open = (context : $Values<typeof CONTEXT>, { proxyWin, proxyFrame, windowName } : {| proxyWin : ProxyWindow, proxyFrame : ?ProxyObject<HTMLIFrameElement>, windowName : string |}) : ZalgoPromise<ProxyWindow> => {
        if (openOverride) {
            return openOverride(context,  { proxyWin, proxyFrame, windowName });
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
            } else if (context === CONTEXT.POPUP && __ZOID__.__POPUP_SUPPORT__) {
                let { width = DEFAULT_DIMENSIONS.WIDTH, height = DEFAULT_DIMENSIONS.HEIGHT } = getDimensions();

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
            proxyWin.setWindow(win, { send });
            return proxyWin.setName(windowName).then(() => {
                return proxyWin;
            });
        });
    };

    const watchForUnload = () => {
        return ZalgoPromise.try(() => {
            const unloadWindowListener = addEventListener(window, 'unload', once(() => {
                destroy(new Error(`Window navigated away`));
            }));
    
            const closeParentWindowListener = onCloseWindow(parentWin, destroy, 3000);
            clean.register(closeParentWindowListener.cancel);
            clean.register(unloadWindowListener.cancel);

            if (watchForUnloadOverride) {
                return watchForUnloadOverride();
            }
        });
    };

    const watchForClose = (proxyWin : ProxyWindow, context : $Values<typeof CONTEXT>) : ZalgoPromise<void> => {
        let cancelled = false;

        clean.register(() => {
            cancelled = true;
        });

        return ZalgoPromise.delay(2000).then(() => {
            return proxyWin.isClosed();
        }).then(isClosed => {
            if (!cancelled) {
                if (isClosed) {
                    return close(new Error(`Detected ${ context } close`));
                } else {
                    return watchForClose(proxyWin, context);
                }
            }
        });
    };

    const checkWindowClose = (proxyWin : ProxyWindow) : ZalgoPromise<boolean> => {
        let closed = false;
        
        return proxyWin.isClosed().then(isClosed => {
            if (isClosed) {
                closed = true;
                return close(new Error(`Detected component window close`));
            }

            return ZalgoPromise.delay(200)
                .then(() => proxyWin.isClosed())
                .then(secondIsClosed => {
                    if (secondIsClosed) {
                        closed = true;
                        return close(new Error(`Detected component window close`));
                    }
                });
        }).then(() => {
            return closed;
        });
    };

    const onError = (err : mixed) : ZalgoPromise<void> => {
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

    const exportsPromise : ZalgoPromise<X> = new ZalgoPromise();

    const getExports = () : X => {
        return xports({
            getExports: () => exportsPromise
        });
    };

    const xport = (actualExports : X) : ZalgoPromise<void> => {
        return ZalgoPromise.try(() => {
            exportsPromise.resolve(actualExports);
        });
    };

    initChild.onError = onError;

    const buildParentExports = (win : ProxyWindow) : ParentExportsType<P, X> => {
        const checkClose = () => checkWindowClose(win);
        function init(childExports : ChildExportsType<P>) : ZalgoPromise<void> {
            return initChild(this.origin, childExports);
        }
        return { init, close, checkClose, resize, onError, show, hide, export: xport };
    };

    const buildInitialChildPayload = ({ proxyWin, initialChildDomain, childDomainMatch, context } : {| proxyWin : ProxyWindow, initialChildDomain : string, childDomainMatch : DomainMatcher, context : $Values<typeof CONTEXT>|} = {}) : ZalgoPromise<InitialChildPayload<P, X>> => {
        return getPropsForChild(initialChildDomain).then(childProps => {
            return {
                uid,
                context,
                tag,
                childDomainMatch,
                version:      __ZOID__.__VERSION__,
                props:        childProps,
                exports:      buildParentExports(proxyWin)
            };
        });
    };

    const buildSerializedChildPayload = ({ proxyWin, initialChildDomain, childDomainMatch, target = window, context } : {| proxyWin : ProxyWindow, initialChildDomain : string, childDomainMatch : DomainMatcher, target : CrossDomainWindowType, context : $Values<typeof CONTEXT>|} = {}) : ZalgoPromise<string> => {
        return buildInitialChildPayload({ proxyWin, initialChildDomain, childDomainMatch, context }).then(childPayload => {
            const { serializedData, cleanReference } = crossDomainSerialize({
                data:     childPayload,
                metaData: {
                    windowRef: getWindowRef(target, initialChildDomain, context, proxyWin)
                },
                sender: {
                    domain: getDomain(window)
                },
                receiver: {
                    win:    proxyWin,
                    domain: childDomainMatch
                },
                passByReference: initialChildDomain === getDomain()
            });

            clean.register(cleanReference);
            return serializedData;
        });
    };

    const buildWindowName = ({ proxyWin, initialChildDomain, childDomainMatch, target, context } : {| proxyWin : ProxyWindow, initialChildDomain : string, childDomainMatch : DomainMatcher, target : CrossDomainWindowType, context : $Values<typeof CONTEXT>|}) : ZalgoPromise<string> => {
        return buildSerializedChildPayload({ proxyWin, initialChildDomain, childDomainMatch, target, context }).then(serializedPayload => {
            return buildChildWindowName({ name, serializedPayload });
        });
    };

    const renderTemplate = (renderer : (RenderOptionsType<P>) => ?HTMLElement, { context, container, doc, frame, prerenderFrame } : {| context : $Values<typeof CONTEXT>, container? : HTMLElement, doc : Document, frame? : ?HTMLIFrameElement, prerenderFrame? : ?HTMLIFrameElement |}) : ?HTMLElement => {
        
        return renderer({
            uid, container, context, doc, frame, prerenderFrame,
            focus, close, state, props, tag, dimensions: getDimensions(), event
        });
    };

    const prerender = (proxyPrerenderWin : ProxyWindow, { context } : {| context : $Values<typeof CONTEXT>|}) : ZalgoPromise<void> => {
        if (prerenderOverride) {
            return prerenderOverride(proxyPrerenderWin, { context });
        }
                                                                                                                                                                                                                                    
        return ZalgoPromise.try(() => {
            if (!prerenderTemplate) {
                return;
            }

            let prerenderWindow = proxyPrerenderWin.getWindow();

            if (!prerenderWindow || !isSameDomain(prerenderWindow) || !isBlankDomain(prerenderWindow)) {
                return;
            }

            prerenderWindow = assertSameDomain(prerenderWindow);
    
            const doc = prerenderWindow.document;
            const el = renderTemplate(prerenderTemplate, { context, doc });

            if (!el) {
                return;
            }

            if (el.ownerDocument !== doc) {
                throw new Error(`Expected prerender template to have been created with document from child window`);
            }

            writeElementToWindow(prerenderWindow, el);

            let { width = false, height = false, element = 'body' } = autoResize;
            element = getElementSafe(element, doc);
            
            if (element && (width || height)) {
                const prerenderResizeListener = onResize(element, ({ width: newWidth, height: newHeight }) => {
                    resize({
                        width:  width ? newWidth : undefined,
                        height: height ? newHeight : undefined
                    });
                }, { width, height, win: prerenderWindow });

                event.on(EVENT.RENDERED, prerenderResizeListener.cancel);
            }
        });
    };
    const renderContainer : RenderContainer = (proxyContainer : ProxyObject<HTMLElement>, { proxyFrame, proxyPrerenderFrame, context, rerender } : RenderContainerOptions) : ZalgoPromise<?ProxyObject<HTMLElement>> => {

        if (renderContainerOverride) {
            return renderContainerOverride(proxyContainer, { proxyFrame, proxyPrerenderFrame, context, rerender });
        }

        return ZalgoPromise.hash({
            container:      proxyContainer.get(),
            // $FlowFixMe
            frame:          proxyFrame ? proxyFrame.get() : null,
            // $FlowFixMe
            prerenderFrame: proxyPrerenderFrame ? proxyPrerenderFrame.get() : null,
            internalState:  getInternalState()
        }).then(({ container, frame, prerenderFrame, internalState: { visible } }) => {
            const innerContainer = renderTemplate(containerTemplate, { context, container, frame, prerenderFrame, doc: document });
            if (innerContainer) {
                if (!visible) {
                    hideElement(innerContainer);
                }
                appendChild(container, innerContainer);
                const containerWatcher = watchElementForClose(innerContainer, () => {
                    const removeError = new Error(`Detected container element removed from DOM`);
                    return ZalgoPromise.delay(1).then(() => {
                        if (isElementClosed(innerContainer)) {
                            close(removeError);
                        } else {
                            clean.all(removeError);
                            return rerender().then(resolveInitPromise, rejectInitPromise);
                        }
                    });
                });
                
                clean.register(() => containerWatcher.cancel());
                clean.register(() => destroyElement(innerContainer));
                currentProxyContainer = getProxyObject(innerContainer);
                return currentProxyContainer;
            }
        });
    };

    const getBridgeUrl = () : ?string => {
        if (typeof options.bridgeUrl === 'function') {
            return options.bridgeUrl({ props });
        }

        return options.bridgeUrl;
    };

    const openBridge = (proxyWin : ProxyWindow, initialChildDomain : string, context : $Values<typeof CONTEXT>) : ?ZalgoPromise<?CrossDomainWindowType> => {
        if (__POST_ROBOT__.__IE_POPUP_SUPPORT__) {
            return ZalgoPromise.try(() => {
                return proxyWin.awaitWindow();
                
            }).then(win => {
                if (!bridge || !bridge.needsBridge({ win, domain: initialChildDomain }) || bridge.hasBridge(initialChildDomain, initialChildDomain)) {
                    return;
                }

                const bridgeUrl = getBridgeUrl();

                if (!bridgeUrl) {
                    throw new Error(`Bridge needed to render ${ context }`);
                }

                const bridgeDomain = getDomainFromUrl(bridgeUrl);
                bridge.linkUrl(win, initialChildDomain);
                return bridge.openBridge(normalizeMockUrl(bridgeUrl), bridgeDomain);
            });
        }
    };

    const getHelpers = () : ParentHelpers<P> => {
        return {
            state, event, close, focus, resize,
            // eslint-disable-next-line no-use-before-define
            onError, updateProps, show, hide
        };
    };

    const getProps = () => props;

    const getDefaultPropsInput = () : PropsInputType<P> => {
        // $FlowFixMe
        return {};
    };

    const setProps = (newInputProps : PropsInputType<P> = getDefaultPropsInput()) => {
        if (__DEBUG__ && validate) {
            validate({ props: newInputProps });
        }

        const container = currentContainer;
        const helpers = getHelpers();
        extend(inputProps, newInputProps);

        // $FlowFixMe
        extendProps(propsDef, props, inputProps, helpers, container);
    };

    const updateProps = (newProps : PropsInputType<P>) : ZalgoPromise<void> => {
        setProps(newProps);

        return initPromise.then(() => {
            const child = childComponent;
            const proxyWin = currentProxyWin;
            const childDomain = currentChildDomain;
            
            if (!child || !proxyWin || !childDomain) {
                return;
            }

            return getPropsForChild(childDomain).then(childProps => {
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

    const getProxyContainer : GetProxyContainer = (container : ContainerReferenceType) : ZalgoPromise<ProxyObject<HTMLElement>> => {
        if (getProxyContainerOverride) {
            return getProxyContainerOverride(container);
        }

        return ZalgoPromise.try(() => {
            return elementReady(container);
        }).then(containerElement => {
            if (isShadowElement(containerElement)) {
                containerElement = insertShadowSlot(containerElement);
            }

            currentContainer = containerElement;
            return getProxyObject(containerElement);
        });
    };

    const delegate = (context : $Values<typeof CONTEXT>, target : CrossDomainWindowType) : ZalgoPromise<DelegateOverrides> => {
        const delegateProps = {};
        for (const propName of Object.keys(props)) {
            const propDef = propsDef[propName];
            if (propDef && propDef.allowDelegate) {
                delegateProps[propName] = props[propName];
            }
        }

        const childOverridesPromise = send(target, `${ POST_MESSAGE.DELEGATE }_${ name }`, {
            uid,
            overrides: {
                props: delegateProps, event, close, onError, getInternalState,
                setInternalState, resolveInitPromise, rejectInitPromise
            }
        }).then(({ data: { parent } }) => {
            const parentComp : ParentComponent<P, X> = parent;

            clean.register(err => {
                if (!isWindowClosed(target)) {
                    return parentComp.destroy(err);
                }
            });
            return parentComp.getDelegateOverrides();

        }).catch(err => {
            throw new Error(`Unable to delegate rendering. Possibly the component is not loaded in the target window.\n\n${ stringifyError(err) }`);
        });

        getProxyContainerOverride = (...args) => childOverridesPromise.then(childOverrides => childOverrides.getProxyContainer(...args));
        renderContainerOverride = (...args) => childOverridesPromise.then(childOverrides => childOverrides.renderContainer(...args));
        showOverride = (...args) => childOverridesPromise.then(childOverrides => childOverrides.show(...args));
        hideOverride = (...args) => childOverridesPromise.then(childOverrides => childOverrides.hide(...args));
        watchForUnloadOverride = (...args) => childOverridesPromise.then(childOverrides => childOverrides.watchForUnload(...args));

        if (context === CONTEXT.IFRAME && __ZOID__.__IFRAME_SUPPORT__) {
            getProxyWindowOverride = (...args) => childOverridesPromise.then(childOverrides => childOverrides.getProxyWindow(...args));
            openFrameOverride = (...args) => childOverridesPromise.then(childOverrides => childOverrides.openFrame(...args));
            openPrerenderFrameOverride = (...args) => childOverridesPromise.then(childOverrides => childOverrides.openPrerenderFrame(...args));
            prerenderOverride = (...args) => childOverridesPromise.then(childOverrides => childOverrides.prerender(...args));
            openOverride = (...args) => childOverridesPromise.then(childOverrides => childOverrides.open(...args));
            openPrerenderOverride = (...args) => childOverridesPromise.then(childOverrides => childOverrides.openPrerender(...args));
        } else if (context === CONTEXT.POPUP && __ZOID__.__POPUP_SUPPORT__) {
            setProxyWinOverride = (...args) => childOverridesPromise.then(childOverrides => childOverrides.setProxyWin(...args));
        }

        return childOverridesPromise;
    };

    const getDelegateOverrides = () : ZalgoPromise<DelegateOverrides> => {
        return ZalgoPromise.try(() => {
            return {
                getProxyContainer, show, hide, renderContainer, getProxyWindow, watchForUnload,
                openFrame, openPrerenderFrame, prerender, open, openPrerender, setProxyWin
            };
        });
    };

    const checkAllowRender = (target : CrossDomainWindowType, childDomainMatch : DomainMatcher, container : ContainerReferenceType) => {
        if (target === window) {
            return;
        }

        if (!isSameTopWindow(window, target)) {
            throw new Error(`Can only renderTo an adjacent frame`);
        }

        const origin = getDomain();

        if (!matchDomain(childDomainMatch, origin) && !isSameDomain(target)) {
            throw new Error(`Can not render remotely to ${ childDomainMatch.toString() } - can only render to ${ origin }`);
        }

        if (container && typeof container !== 'string') {
            throw new Error(`Container passed to renderTo must be a string selector, got ${ typeof container } }`);
        }
    };

    const init = () => {
        setupEvents();
    };

    const render = ({ target, container, context, rerender } : RenderOptions) : ZalgoPromise<void> => {
        return ZalgoPromise.try(() => {
            const initialChildDomain = getInitialChildDomain();
            const childDomainMatch = getDomainMatcher();
            
            checkAllowRender(target, childDomainMatch, container);

            const delegatePromise = ZalgoPromise.try(() => {
                if (target !== window) {
                    return delegate(context, target);
                }
            });

            const windowProp = props.window;

            const watchForUnloadPromise = watchForUnload();
            
            const buildBodyPromise = buildBody();
            const onRenderPromise = event.trigger(EVENT.RENDER);

            const getProxyContainerPromise = getProxyContainer(container);
            const getProxyWindowPromise = getProxyWindow();

            const finalSetPropsPromise = getProxyContainerPromise.then(() => {
                return setProps();
            });

            const buildUrlPromise = finalSetPropsPromise.then(() => {
                return buildUrl();
            });

            const buildWindowNamePromise = getProxyWindowPromise.then(proxyWin => {
                return buildWindowName({ proxyWin, initialChildDomain, childDomainMatch, target, context });
            });

            const openFramePromise = buildWindowNamePromise.then(windowName => openFrame(context, { windowName }));
            const openPrerenderFramePromise = openPrerenderFrame(context);

            const renderContainerPromise = ZalgoPromise.hash({ proxyContainer: getProxyContainerPromise, proxyFrame: openFramePromise, proxyPrerenderFrame: openPrerenderFramePromise }).then(({ proxyContainer, proxyFrame, proxyPrerenderFrame }) => {
                return renderContainer(proxyContainer, { context, proxyFrame, proxyPrerenderFrame, rerender });
            }).then(proxyContainer => {
                return proxyContainer;
            });

            const openPromise = ZalgoPromise.hash({ windowName: buildWindowNamePromise, proxyFrame: openFramePromise, proxyWin: getProxyWindowPromise }).then(({ windowName, proxyWin, proxyFrame }) => {
                return windowProp
                    ? proxyWin
                    : open(context, { windowName, proxyWin, proxyFrame });
            });

            const openPrerenderPromise = ZalgoPromise.hash({ proxyWin: openPromise, proxyPrerenderFrame: openPrerenderFramePromise }).then(({ proxyWin, proxyPrerenderFrame }) => {
                return openPrerender(context, proxyWin, proxyPrerenderFrame);
            });

            const setStatePromise = openPromise.then(proxyWin => {
                currentProxyWin = proxyWin;
                return setProxyWin(proxyWin);
            });
            
            const prerenderPromise = ZalgoPromise.hash({ proxyPrerenderWin: openPrerenderPromise, state: setStatePromise }).then(({ proxyPrerenderWin }) => {
                return prerender(proxyPrerenderWin, { context });
            });

            const setWindowNamePromise =  ZalgoPromise.hash({ proxyWin: openPromise, windowName: buildWindowNamePromise }).then(({ proxyWin, windowName }) => {
                if (windowProp) {
                    return proxyWin.setName(windowName);
                }
            });

            const getMethodPromise = ZalgoPromise.hash({ body: buildBodyPromise }).then(({ body }) => {
                if (options.method) {
                    return options.method;
                }

                if (Object.keys(body).length) {
                    return METHOD.POST;
                }

                return METHOD.GET;
            });


            const loadUrlPromise = ZalgoPromise.hash({ proxyWin: openPromise, windowUrl: buildUrlPromise, body: buildBodyPromise, method: getMethodPromise, windowName: setWindowNamePromise, prerender: prerenderPromise }).then(({ proxyWin, windowUrl, body, method }) => {
                return proxyWin.setLocation(windowUrl, { method, body });
            });

            const watchForClosePromise = openPromise.then(proxyWin => {
                watchForClose(proxyWin, context);
            });

            const onDisplayPromise = ZalgoPromise.hash({ container: renderContainerPromise, prerender: prerenderPromise }).then(() => {
                return event.trigger(EVENT.DISPLAY);
            });

            const openBridgePromise = openPromise.then(proxyWin => {
                return openBridge(proxyWin, initialChildDomain, context);
            });

            const runTimeoutPromise = loadUrlPromise.then(() => {
                return runTimeout();
            });

            const onRenderedPromise = initPromise.then(() => {
                return event.trigger(EVENT.RENDERED);
            });

            return ZalgoPromise.hash({
                initPromise, buildUrlPromise, onRenderPromise, getProxyContainerPromise, openFramePromise, openPrerenderFramePromise, renderContainerPromise, openPromise,
                openPrerenderPromise, setStatePromise, prerenderPromise, loadUrlPromise, buildWindowNamePromise, setWindowNamePromise, watchForClosePromise, onDisplayPromise,
                openBridgePromise, runTimeoutPromise, onRenderedPromise, delegatePromise, watchForUnloadPromise, finalSetPropsPromise
            });
            
        }).catch(err => {
            return ZalgoPromise.all([
                onError(err),
                destroy(err)
            ]).then(() => {
                throw err;
            }, () => {
                throw err;
            });
        }).then(noop);
    };

    return {
        init,
        render,
        destroy,
        getProps,
        setProps,
        export: xport,
        getHelpers,
        getDelegateOverrides,
        getExports
    };
}
