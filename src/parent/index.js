/* @flow */
/* eslint max-lines: 0 */

import { send, bridge, serializeMessage, ProxyWindow, toProxyWindow } from 'post-robot/src';
import { isSameDomain, matchDomain, getDomainFromUrl, isBlankDomain,
    onCloseWindow, getDomain, type CrossDomainWindowType,
    getDistanceFromTop, normalizeMockUrl, assertSameDomain } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { addEventListener, uniqueID, elementReady, writeElementToWindow, eventEmitter, type EventEmitterType,
    noop, onResize, extend, extendUrl, appendChild, cleanup, type CleanupType, base64encode,
    once, stringifyError, destroyElement, isDefined, getElementSafe } from 'belter/src';

import { ZOID, POST_MESSAGE, CONTEXT, EVENT,
    INITIAL_PROPS, WINDOW_REFERENCES } from '../constants';
import type { Component, onErrorPropType } from '../component';
import { globalFor, getProxyElement, type ProxyElement } from '../lib';
import type { PropsInputType, PropsType } from '../component/props';
import type { ChildExportsType } from '../child';
import type { DimensionsType } from '../types';

import { RENDER_DRIVERS, type ContextDriverType } from './drivers';
import { propsToQuery, normalizeProps } from './props';

export type RenderOptionsType<P> = {|
    uid : string,
    props : PropsInputType<P>,
    tag : string,
    context : string,
    close : (?string) => ZalgoPromise<void>,
    focus : () => ZalgoPromise<ProxyWindow>,
    doc : Document,
    container? : HTMLElement,
    dimensions : DimensionsType,
    state : Object,
    event : EventEmitterType,
    frame : ?HTMLIFrameElement,
    prerenderFrame : ?HTMLIFrameElement
|};

export type ParentExportsType<P> = {|
    init : (ChildExportsType<P>) => ZalgoPromise<void>,
    close : () => ZalgoPromise<void>,
    checkClose : () => ZalgoPromise<void>,
    resize : ({ width? : ?number, height? : ?number }) => ZalgoPromise<void>,
    onError : (mixed) => ZalgoPromise<void>
|};

export type PropRef =
    {| type : typeof INITIAL_PROPS.RAW, uid? : string, value? : string |};

export type WindowRef =
    {| type : typeof WINDOW_REFERENCES.OPENER |} |
    {| type : typeof WINDOW_REFERENCES.PARENT, distance : number |} |
    {| type : typeof WINDOW_REFERENCES.GLOBAL, uid : string |};

export type ChildPayload = {|
    uid : string,
    tag : string,
    context : $Values<typeof CONTEXT>,
    domain : string,
    parent : WindowRef,
    props : PropRef,
    exports : string
|};

export type StateType = Object;

export type ParentHelpers<P> = {|
    state : StateType,
    close : () => ZalgoPromise<void>,
    focus : () => ZalgoPromise<void>,
    resize : ({ width : ?number, height : ?number }) => ZalgoPromise<void>,
    onError : (mixed) => ZalgoPromise<void>,
    updateProps : PropsInputType<P> => ZalgoPromise<void>,
    event : EventEmitterType
|};

export class ParentComponent<P> {

    component : Component<P>
    driver : ContextDriverType
    clean : CleanupType
    event : EventEmitterType

    initPromise : ZalgoPromise<void>
    
    props : PropsType<P>
    state : StateType
    child : ?ChildExportsType<P>

    proxyWin : ?ProxyWindow
    proxyContainer : ?ProxyElement<HTMLElement>

    constructor(component : Component<P>, props : PropsInputType<P>) {
        try {
            this.initPromise = new ZalgoPromise();

            this.clean = cleanup(this);
            this.state = {};

            this.component = component;
    
            this.setupEvents(props.onError);
            this.setProps(props);
            this.component.registerActiveComponent(this);
            this.clean.register(() => this.component.destroyActiveComponent(this));
            this.watchForUnload();

        } catch (err) {
            this.onError(err).catch(noop);
            throw err;
        }
    }

    setupEvents(onError : ?onErrorPropType) {
        this.event = eventEmitter();
        
        this.event.on(EVENT.RENDER,   () => this.props.onRender());
        this.event.on(EVENT.DISPLAY,  () => this.props.onDisplay());
        this.event.on(EVENT.RENDERED, () => this.props.onRendered());
        this.event.on(EVENT.CLOSE,    () => this.props.onClose());
        this.event.on(EVENT.PROPS,    (props) => this.props.onProps(props));

        this.event.on(EVENT.ERROR, err => {
            if (this.props && this.props.onError) {
                return this.props.onError(err);
            } else if (onError) {
                return onError(err);
            } else {
                throw err;
            }
        });
    }

    render(target : CrossDomainWindowType, container : string | HTMLElement, context : $Values<typeof CONTEXT>) : ZalgoPromise<void> {
        return ZalgoPromise.try(() => {
            this.component.log(`render`);

            this.driver = RENDER_DRIVERS[context];
            const uid = `${ ZOID }-${ this.component.tag }-${ uniqueID() }`;
            const domain = this.getDomain();
            const initialDomain = this.getInitialDomain();
            
            this.component.checkAllowRender(target, domain, container);

            if (target !== window) {
                this.delegate(context, target);
            }

            const tasks = {};

            tasks.init = this.initPromise;
            tasks.buildUrl = this.buildUrl();
            tasks.onRender = this.event.trigger(EVENT.RENDER);

            tasks.getProxyContainer = this.getProxyContainer(container);

            tasks.openFrame = this.openFrame();
            tasks.openPrerenderFrame = this.openPrerenderFrame();

            tasks.renderContainer = ZalgoPromise.all([ tasks.getProxyContainer, tasks.openFrame, tasks.openPrerenderFrame ]).then(([ proxyContainer, proxyFrame, proxyPrerenderFrame ]) => {
                return this.renderContainer(proxyContainer, { context, uid, proxyFrame, proxyPrerenderFrame });
            });

            tasks.open = this.driver.openOnClick
                ? this.open()
                : tasks.openFrame.then(proxyFrame => this.open(proxyFrame));

            tasks.openPrerender = ZalgoPromise.all([ tasks.open, tasks.openPrerenderFrame ]).then(([ proxyWin, proxyPrerenderFrame ]) => {
                return this.openPrerender(proxyWin, proxyPrerenderFrame);
            });

            tasks.setState = ZalgoPromise.all([
                tasks.open.then(proxyWin => {
                    this.proxyWin = proxyWin;
                    return this.setProxyWin(proxyWin);
                }),
                tasks.renderContainer.then(proxyContainer => {
                    this.proxyContainer = proxyContainer;
                })
            ]);
            
            tasks.prerender = ZalgoPromise.all([ tasks.openPrerender, tasks.setState ]).then(([ proxyPrerenderWin ]) => {
                return this.prerender(proxyPrerenderWin, { context, uid });
            });

            tasks.loadUrl = ZalgoPromise.all([ tasks.open, tasks.buildUrl, tasks.setWindowName, tasks.prerender ]).then(([ proxyWin, url ]) => {
                return proxyWin.setLocation(url);
            });

            tasks.buildWindowName = tasks.open.then(proxyWin => {
                return this.buildWindowName({ proxyWin, initialDomain, domain, target, context, uid });
            });

            tasks.setWindowName =  ZalgoPromise.all([ tasks.open, tasks.buildWindowName ]).then(([ proxyWin, windowName ]) => {
                return proxyWin.setName(windowName);
            });

            tasks.watchForClose = tasks.open.then(proxyWin => {
                return this.watchForClose(proxyWin);
            });

            tasks.onDisplay = tasks.prerender.then(() => {
                return this.event.trigger(EVENT.DISPLAY);
            });

            tasks.openBridge = tasks.open.then(proxyWin => {
                return this.openBridge(proxyWin, initialDomain, context);
            });

            tasks.runTimeout = tasks.loadUrl.then(() => {
                return this.runTimeout();
            });

            tasks.onRender = tasks.init.then(() => {
                return this.event.trigger(EVENT.RENDERED);
            });

            return ZalgoPromise.hash(tasks);
            
        }).catch(err => {
            return ZalgoPromise.all([
                this.onError(err),
                this.destroy(err)
            ]);
        }).then(noop);
    }

    getProxyContainer(container : string | HTMLElement) : ZalgoPromise<ProxyElement<HTMLElement>> {
        return ZalgoPromise.try(() => {
            return elementReady(container);
        }).then(containerElement => {
            return getProxyElement(containerElement);
        });
    }

    buildWindowName({ proxyWin, initialDomain, domain, target, uid, context } : { proxyWin : ProxyWindow, initialDomain : string, domain : string | RegExp, target : CrossDomainWindowType, context : $Values<typeof CONTEXT>, uid : string }) : string {
        const childPayload = this.buildChildPayload({ proxyWin, initialDomain, domain, target, context, uid });
        return `__${ ZOID }__${ this.component.name }__${ base64encode(JSON.stringify(childPayload)) }__`;
    }

    getPropsRef(proxyWin : ProxyWindow, target : CrossDomainWindowType, domain : string | RegExp, uid : string) : PropRef {
        const value = serializeMessage(proxyWin, domain, this.getPropsForChild(domain));

        const propRef = isSameDomain(target)
            ? { type: INITIAL_PROPS.RAW, value }
            : { type: INITIAL_PROPS.UID, uid };

        if (propRef.type === INITIAL_PROPS.UID) {
            const global = globalFor(window);
            global.props = global.props || {};
            global.props[uid] = value;

            this.clean.register(() => {
                delete global.props[uid];
            });
        }

        return propRef;
    }

    buildChildPayload({ proxyWin, initialDomain, domain, target = window, context, uid } : { proxyWin : ProxyWindow, initialDomain : string, domain : string | RegExp, target : CrossDomainWindowType, context : $Values<typeof CONTEXT>, uid : string } = {}) : ChildPayload {
        return {
            uid,
            context,
            domain:  getDomain(window),
            tag:     this.component.tag,
            parent:  this.getWindowRef(target, initialDomain, uid, context),
            props:   this.getPropsRef(proxyWin, target, domain, uid),
            exports: serializeMessage(proxyWin, domain, this.buildParentExports(proxyWin))
        };
    }

    setProxyWin(proxyWin : ProxyWindow) : ZalgoPromise<void> {
        return ZalgoPromise.try(() => {
            this.proxyWin = proxyWin;
        });
    }

    getHelpers() : ParentHelpers<P> {
        return {
            state:       this.state,
            event:       this.event,
            close:       () => this.close(),
            focus:       () => this.focus(),
            resize:      ({ width, height }) => this.resize({ width, height }),
            onError:     (err) => this.onError(err),
            updateProps: (props) => this.updateProps(props)
        };
    }

    setProps(props : PropsInputType<P>, isUpdate : boolean = false) {
        if (this.component.validate) {
            this.component.validate({ props });
        }

        const helpers = this.getHelpers();

        // $FlowFixMe
        this.props = this.props || {};
        extend(this.props, normalizeProps(this.component, this, props, helpers, isUpdate));

        for (const key of this.component.getPropNames()) {
            const propDef = this.component.getPropDefinition(key);
            if (propDef.required !== false && !isDefined(this.props[key])) {
                throw new Error(`Expected prop "${ key }" to be defined`);
            }
        }
    }

    buildUrl() : ZalgoPromise<string> {
        return propsToQuery({ ...this.component.props, ...this.component.builtinProps }, this.props).then(query => {
            return extendUrl(normalizeMockUrl(this.component.getUrl(this.props)), { query });
        });
    }

    getDomain() : string | RegExp {
        return this.component.getDomain(this.props);
    }

    getInitialDomain() : string {
        return this.component.getInitialDomain(this.props);
    }

    getPropsForChild(domain : string | RegExp) : (PropsType<P>) {
        const result = {};

        for (const key of Object.keys(this.props)) {
            const prop = this.component.getPropDefinition(key);

            if (prop && prop.sendToChild === false) {
                continue;
            }

            if (prop && prop.sameDomain && !matchDomain(domain, getDomain(window))) {
                continue;
            }

            // $FlowFixMe
            result[key] = this.props[key];
        }

        // $FlowFixMe
        return result;
    }

    updateProps(props : PropsInputType<P>) : ZalgoPromise<void> {
        this.setProps(props, true);

        return this.initPromise.then(() => {
            if (this.child) {
                return this.child.updateProps(this.getPropsForChild(this.getDomain()));
            }
        });
    }

    openFrame() : ZalgoPromise<?ProxyElement<HTMLIFrameElement>> {
        return ZalgoPromise.try(() => {
            if (this.driver.openFrame) {
                return this.driver.openFrame.call(this);
            }
        });
    }

    openPrerenderFrame() : ZalgoPromise<?ProxyElement<HTMLIFrameElement>> {
        return ZalgoPromise.try(() => {
            if (this.driver.openPrerenderFrame) {
                return this.driver.openPrerenderFrame.call(this);
            }
        });
    }
    
    open(proxyFrame : ?ProxyElement<HTMLIFrameElement>) : ZalgoPromise<ProxyWindow> {
        return ZalgoPromise.try(() => {
            this.component.log(`open`);

            const windowProp = this.props.window;

            if (windowProp) {
                this.clean.register(() => windowProp.close());
                return toProxyWindow(windowProp);
            }

            return this.driver.open.call(this, proxyFrame);

        }).then(proxyWin => {
            this.proxyWin = proxyWin;
            return proxyWin;
        });
    }

    openPrerender(proxyWin : ProxyWindow, proxyPrerenderFrame : ?ProxyElement<HTMLIFrameElement>) : ZalgoPromise<ProxyWindow> {
        return ZalgoPromise.try(() => {
            return this.driver.openPrerender.call(this, proxyWin, proxyPrerenderFrame);
        });
    }

    focus() : ZalgoPromise<void> {
        return ZalgoPromise.try(() => {
            if (this.proxyWin) {
                return this.proxyWin.focus().then(noop);
            }
        });
    }

    delegate(context : $Values<typeof CONTEXT>, target : CrossDomainWindowType) {
        this.component.log(`delegate`);

        const props = {};
        for (const propName of this.component.getPropNames()) {
            if (this.component.getPropDefinition(propName).allowDelegate) {
                props[propName] = this.props[propName];
            }
        }

        const overridesPromise = send(target, `${ POST_MESSAGE.DELEGATE }_${ this.component.name }`, {
            context,
            props,
            overrides: {
                event:   this.event,
                close:   () => this.close(),
                onError: (err) => this.onError(err)
            }

        }).then(({ data }) => {
            this.clean.register(data.destroy);
            return data.overrides;

        }).catch(err => {
            throw new Error(`Unable to delegate rendering. Possibly the component is not loaded in the target window.\n\n${ stringifyError(err) }`);
        });

        for (const key of this.driver.delegate) {
            // $FlowFixMe
            this[key] = function overriddenFunction() : ZalgoPromise<mixed> {
                return overridesPromise.then(overrides => {
                    return overrides[key].apply(this, arguments);
                });
            };
        }
    }

    getWindowRef(target : CrossDomainWindowType, domain : string, uid : string, context : $Values<typeof CONTEXT>) : WindowRef {
        
        if (domain === getDomain(window)) {
            const global = globalFor(window);
            global.windows = global.windows || {};
            global.windows[uid] = window;
            this.clean.register(() => {
                delete global.windows[uid];
            });
    
            return { type: WINDOW_REFERENCES.GLOBAL, uid };
        }

        if (context === CONTEXT.POPUP) {
            return { type: WINDOW_REFERENCES.OPENER };
        }

        return { type: WINDOW_REFERENCES.PARENT, distance: getDistanceFromTop(window) };
    }

    watchForClose(proxyWin : ProxyWindow) : ZalgoPromise<void> {
        return proxyWin.awaitWindow().then(win => {
            const closeWindowListener = onCloseWindow(win, () => {
                this.component.log(`detect_close_child`);
                return this.close();
            }, 2000);

            this.clean.register(closeWindowListener.cancel);
        });
    }

    watchForUnload() {
        const unloadWindowListener = addEventListener(window, 'unload', once(() => {
            this.component.log(`navigate_away`);
            this.destroy(new Error(`Window navigated away`));
        }));

        this.clean.register(unloadWindowListener.cancel);
    }

    runTimeout() : ZalgoPromise<void> {
        return ZalgoPromise.try(() => {
            const timeout = this.props.timeout;

            if (timeout) {
                return this.initPromise.timeout(timeout, new Error(`Loading component timed out after ${ timeout } milliseconds`));
            }
        });
    }

    initChild(child : ChildExportsType<P>) : ZalgoPromise<void> {
        return ZalgoPromise.try(() => {
            this.clean.set('child', child);
            this.initPromise.resolve();
        });
    }

    buildParentExports(win : ProxyWindow) : ParentExportsType<P> {
        const onError    = (err) => this.onError(err);
        const init       = (child) => this.initChild(child);
        const close      = () => this.close();
        const checkClose = () => this.checkClose(win);
        const resize     = ({ width, height }) => this.resize({ width, height });

        init.onError = onError;

        return { init, close, checkClose, resize, onError };
    }

    resize({ width, height } : { width? : ?number, height? : ?number }) : ZalgoPromise<void> {
        return ZalgoPromise.try(() => {
            if (this.driver.resize) {
                return this.driver.resize.call(this, { width, height });
            }
        });
    }

    checkClose(win : ProxyWindow) : ZalgoPromise<void> {
        return win.isClosed().then(closed => {
            if (closed) {
                return this.close();
            }

            return ZalgoPromise.delay(200)
                .then(() => win.isClosed())
                .then(secondClosed => {
                    if (secondClosed) {
                        return this.close();
                    }
                });
        });
    }

    close() : ZalgoPromise<void> {
        return ZalgoPromise.try(() => {
            this.component.log(`close`);
            return this.event.trigger(EVENT.CLOSE);

        }).then(() => {
            if (this.child) {
                this.child.close.fireAndForget().catch(noop);
            }

            return this.destroy(new Error(`Window closed`));
        });
    }

    prerender(proxyPrerenderWin : ProxyWindow, { context, uid } : { context : $Values<typeof CONTEXT>, uid : string }) : ZalgoPromise<void> {
        return ZalgoPromise.try(() => {
            let prerenderWindow = proxyPrerenderWin.getWindow();

            if (!prerenderWindow || !isSameDomain(prerenderWindow) || !isBlankDomain(prerenderWindow)) {
                return;
            }

            prerenderWindow = assertSameDomain(prerenderWindow);
    
            const doc = prerenderWindow.document;
            const el = this.renderTemplate(this.component.prerenderTemplate, { context, uid, doc });

            if (!el) {
                return;
            }

            if (el.ownerDocument !== doc) {
                throw new Error(`Expected prerender template to have been created with document from child window`);
            }

            writeElementToWindow(prerenderWindow, el);

            let { width = false, height = false, element = 'body' } = this.component.autoResize || {};
            element = getElementSafe(element, doc);
            
            if (element && (width || height)) {
                onResize(element, ({ width: newWidth, height: newHeight }) => {
                    this.resize({
                        width:  width ? newWidth : undefined,
                        height: height ? newHeight : undefined
                    });
                }, { width, height, win: prerenderWindow });
            }
        });
    }

    renderTemplate(renderer : (RenderOptionsType<P>) => ?HTMLElement, { context, uid, container, doc, frame, prerenderFrame } : { context : $Values<typeof CONTEXT>, uid : string, container? : HTMLElement, doc : Document, frame? : ?HTMLIFrameElement, prerenderFrame? : ?HTMLIFrameElement }) : ?HTMLElement {
        // $FlowFixMe
        return renderer.call(this, {
            container,
            context,
            uid,
            doc,
            frame,
            prerenderFrame,
            focus:      () => this.focus(),
            close:      () => this.close(),
            state:      this.state,
            props:      this.props,
            tag:        this.component.tag,
            dimensions: this.component.dimensions,
            event:      this.event
        });
    }

    renderContainer(proxyContainer : ProxyElement<HTMLElement>, { proxyFrame, proxyPrerenderFrame, context, uid } : { context : $Values<typeof CONTEXT>, uid : string, proxyFrame : ?ProxyElement<HTMLIFrameElement>, proxyPrerenderFrame : ?ProxyElement<HTMLIFrameElement> }) : ZalgoPromise<?ProxyElement<HTMLElement>> {
        return ZalgoPromise.all([
            proxyContainer.getElement().then(elementReady),
            // $FlowFixMe
            proxyFrame ? proxyFrame.getElement() : null,
            // $FlowFixMe
            proxyPrerenderFrame ? proxyPrerenderFrame.getElement() : null
        ]).then(([ container, frame, prerenderFrame ]) => {
            const innerContainer = this.renderTemplate(this.component.containerTemplate, { context, uid, container, frame, prerenderFrame, doc: document });
            if (innerContainer) {
                appendChild(container, innerContainer);
                this.clean.register(() => destroyElement(innerContainer));
                this.proxyContainer = getProxyElement(innerContainer);
                return this.proxyContainer;
            }
        });
    }

    destroy(err : mixed = new Error(`Component destroyed before render complete`)) : ZalgoPromise<void> {
        return ZalgoPromise.try(() => {
            this.component.log(`destroy`);
            this.initPromise.asyncReject(err);
            return this.clean.all();
        });
    }

    onError(err : mixed) : ZalgoPromise<void> {
        // eslint-disable-next-line promise/no-promise-in-callback
        return ZalgoPromise.try(() => {
            this.initPromise.asyncReject(err);
            return this.event.trigger(EVENT.ERROR, err);

        }).then(() => {
            return this.initPromise;
            
        }).then(() => {
            throw err;
        });
    }

    openBridge(proxyWin : ProxyWindow, domain : string, context : $Values<typeof CONTEXT>) : ?ZalgoPromise<?CrossDomainWindowType> {
        if (__POST_ROBOT__.__IE_POPUP_SUPPORT__) {
            return ZalgoPromise.try(() => {
                return proxyWin.awaitWindow();
                
            }).then(win => {
                if (!bridge || !bridge.needsBridge({ win, domain }) || bridge.hasBridge(domain, domain)) {
                    return;
                }

                const bridgeUrl = this.component.getBridgeUrl();

                if (!bridgeUrl) {
                    throw new Error(`Bridge needed to render ${ context }`);
                }

                const bridgeDomain = getDomainFromUrl(bridgeUrl);
                bridge.linkUrl(win, domain);
                return bridge.openBridge(normalizeMockUrl(bridgeUrl), bridgeDomain);
            });
        }
    }
}
