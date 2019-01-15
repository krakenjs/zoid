/* @flow */
/* eslint max-lines: 0 */

import { send, bridge, serializeMessage, ProxyWindow } from 'post-robot/src';
import { isSameDomain, matchDomain, getDomainFromUrl, isBlankDomain,
    onCloseWindow, getDomain, type CrossDomainWindowType, getDistanceFromTop, isTop, normalizeMockUrl, assertSameDomain } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { addEventListener, uniqueID, elementReady, writeElementToWindow,
    noop, onResize, extend, extendUrl, memoized, appendChild, cleanup, type CleanupType,
    once, stringifyError, destroyElement, isDefined, createElement, getElementSafe } from 'belter/src';

import { POST_MESSAGE, CONTEXT, CLASS,
    INITIAL_PROPS, WINDOW_REFERENCES } from '../constants';
import type { Component, onErrorPropType } from '../component';
import { global, buildChildWindowName, getProxyElement, type ProxyElement } from '../lib';
import type { PropsInputType, PropsType } from '../component/props';
import type { ChildExportsType } from '../child';
import type { DimensionsType } from '../types';

import { RENDER_DRIVERS, type ContextDriverType } from './drivers';
import { propsToQuery, normalizeProps } from './props';

global.props = global.props || {};
global.windows = global.windows || {};

export type RenderOptionsType<P> = {|
    uid : string,
    props : PropsInputType<P>,
    tag : string,
    context : string,
    outlet : HTMLElement,
    close : (?string) => ZalgoPromise<void>,
    focus : () => ZalgoPromise<ProxyWindow>,
    doc : Document,
    container? : HTMLElement,
    dimensions : DimensionsType,
    state : Object
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
    {| type : typeof WINDOW_REFERENCES.TOP |} |
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
    updateProps : PropsInputType<P> => ZalgoPromise<void>
|};

export class ParentComponent<P> {

    component : Component<P>
    driver : ContextDriverType
    clean : CleanupType

    initPromise : ZalgoPromise<ParentComponent<P>>
    
    props : PropsType<P>
    state : StateType
    child : ?ChildExportsType<P>

    proxyWin : ?ProxyWindow
    proxyOutlet : ?ProxyElement

    constructor(component : Component<P>, props : PropsInputType<P>) {
        try {
            this.initPromise = new ZalgoPromise();
            this.clean = cleanup(this);
            this.state = {};

            this.component = component;
    
            this.setProps(props);
            this.component.registerActiveComponent(this);
            this.clean.register(() => this.component.destroyActiveComponent(this));

        } catch (err) {
            this.onError(err, props.onError).catch(noop);
            throw err;
        }
    }

    render(target : CrossDomainWindowType, container : string | HTMLElement, context : $Values<typeof CONTEXT>) : ZalgoPromise<void> {
        return ZalgoPromise.try(() => {
            this.component.log(`render`);

            this.driver = RENDER_DRIVERS[context];
            const uid = `${ this.component.tag }-${ uniqueID() }`;
            const domain = this.getDomain();
            const initialDomain = this.getInitialDomain();
            
            this.component.checkAllowRender(target, domain, container);

            if (target !== window) {
                this.delegate(context, target);
            }

            const tasks = {};

            tasks.init = this.initPromise;
            tasks.buildUrl = this.buildUrl();
            tasks.onRender = this.props.onRender();
            this.watchForUnload();

            tasks.getProxyContainer = this.getProxyContainer(container);

            tasks.renderContainer = tasks.getProxyContainer.then(proxyContainer => {
                return this.renderContainer(proxyContainer, { context, uid });
            });

            tasks.open = this.driver.renderedIntoContainer
                ? tasks.renderContainer.then(proxyOutlet => this.open(proxyOutlet))
                : this.open();

            tasks.buildWindowName = tasks.open.then(({ proxyWin }) => {
                return this.buildWindowName({ proxyWin, initialDomain, domain, target, context, uid });
            });

            tasks.setWindowName =  ZalgoPromise.all([ tasks.open, tasks.buildWindowName ]).then(([ { proxyWin }, windowName ]) => {
                return proxyWin.setName(windowName);
            });

            tasks.watchForClose = tasks.open.then(({ proxyWin }) => {
                return this.watchForClose(proxyWin);
            });

            tasks.prerender = ZalgoPromise.all([ tasks.open, tasks.renderContainer ]).then(([ { proxyWin }, proxyOutlet ]) => {
                return this.prerender(proxyWin, proxyOutlet, { context, uid });
            });

            tasks.onDisplay = tasks.prerender.then(() => {
                return this.props.onDisplay();
            });

            tasks.openBridge = tasks.open.then(({ proxyWin }) => {
                return this.openBridge(proxyWin, initialDomain, context);
            });

            tasks.loadUrl = ZalgoPromise.all([ tasks.open, tasks.buildUrl, tasks.setWindowName ]).then(([ { proxyWin }, url ]) => {
                return proxyWin.setLocation(url);
            });

            tasks.switchPrerender = ZalgoPromise.all([ tasks.open, tasks.prerender, tasks.init ]).then(([ { proxyFrame }, { proxyPrerenderFrame } ]) => {
                return this.switchPrerender({ proxyFrame, proxyPrerenderFrame });
            });

            tasks.runTimeout = tasks.loadUrl.then(() => {
                return this.runTimeout();
            });

            tasks.onRender = tasks.init.then(() => {
                return this.props.onRendered();
            });

            return ZalgoPromise.hash(tasks);
            
        }).catch(err => {
            return ZalgoPromise.all([
                this.onError(err),
                this.destroy(err)
            ]);
        }).then(noop);
    }

    getProxyContainer(container : string | HTMLElement) : ZalgoPromise<ProxyElement> {
        return ZalgoPromise.try(() => {
            return elementReady(container);
        }).then(containerElement => {
            return getProxyElement(containerElement);
        });
    }

    buildWindowName({ proxyWin, initialDomain, domain, target, uid, context } : { proxyWin : ProxyWindow, initialDomain : string, domain : string | RegExp, target : CrossDomainWindowType, context : $Values<typeof CONTEXT>, uid : string }) : string {
        return buildChildWindowName(this.component.name, this.buildChildPayload({ proxyWin, initialDomain, domain, target, context, uid }));
    }

    getPropsRef(proxyWin : ProxyWindow, target : CrossDomainWindowType, domain : string | RegExp, uid : string) : PropRef {
        const value = serializeMessage(proxyWin, domain, this.getPropsForChild(domain));

        const propRef = isSameDomain(target)
            ? { type: INITIAL_PROPS.RAW, value }
            : { type: INITIAL_PROPS.UID, uid };

        if (propRef.type === INITIAL_PROPS.UID) {
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

    getHelpers() : ParentHelpers<P> {
        return {
            state:       this.state,
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
    
    open(proxyElement? : ProxyElement) : ZalgoPromise<{ proxyWin : ProxyWindow, proxyFrame? : ProxyElement }> {
        return ZalgoPromise.try(() => {
            this.component.log(`open`);

            const windowProp = this.props.window;

            if (windowProp) {
                this.clean.register(() => windowProp.close());
                // $FlowFixMe
                return {
                    proxyWin: ProxyWindow.toProxyWindow(windowProp)
                };
            }

            return this.driver.open.call(this, proxyElement);

        }).then(({ proxyWin, proxyFrame }) => {
            this.proxyWin = proxyWin;

            return { proxyWin, proxyFrame };
        });
    }

    focus() : ZalgoPromise<void> {
        return ZalgoPromise.try(() => {
            if (this.proxyWin) {
                return this.proxyWin.focus().then(noop);
            }
        });
    }

    switchPrerender({ proxyFrame, proxyPrerenderFrame } : { proxyFrame : ?ProxyElement, proxyPrerenderFrame : ?ProxyElement }) : ZalgoPromise<void> {
        return ZalgoPromise.try(() => {
            if (this.driver.switchPrerender) {
                if (this.props.window) {
                    return;
                }

                if (!proxyFrame || !proxyPrerenderFrame) {
                    throw new Error(`Expected to have both proxy frame and proxy prerender frame to switch`);
                }

                return this.driver.switchPrerender.call(this, { proxyFrame, proxyPrerenderFrame });
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
                focus:     () => this.focus(),
                close:     () => this.close(),
                onError:   (err) => this.onError(err)
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
            global.windows[uid] = window;
            this.clean.register(() => {
                delete global.windows[uid];
            });
    
            return { type: WINDOW_REFERENCES.GLOBAL, uid };
        }

        if (context === CONTEXT.POPUP) {
            return { type: WINDOW_REFERENCES.OPENER };
        }

        if (isTop(window)) {
            return { type: WINDOW_REFERENCES.TOP };
        }

        return { type: WINDOW_REFERENCES.PARENT, distance: getDistanceFromTop(window) };
    }

    watchForClose(proxyWin : ProxyWindow) : ZalgoPromise<void> {
        return proxyWin.awaitWindow().then(win => {
            const closeWindowListener = onCloseWindow(win, () => {
                this.component.log(`detect_close_child`);

                return ZalgoPromise.all([
                    this.props.onClose(),
                    this.destroy(new Error(`Window close detected`))
                ]);
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
                return this.initPromise.timeout(timeout, new Error(`Loading component timed out after ${ timeout } milliseconds`)).then(noop);
            }
        });
    }

    initChild(child : ChildExportsType<P>) : ZalgoPromise<void> {
        return ZalgoPromise.try(() => {
            this.clean.set('child', child);
            this.initPromise.resolve(this);
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

    @memoized
    close() : ZalgoPromise<void> {
        return ZalgoPromise.try(() => {
            this.component.log(`close`);
            return this.props.onClose();

        }).then(() => {
            if (this.child && this.driver.callChildToClose) {
                this.child.close.fireAndForget().catch(noop);
            }

            return this.destroy(new Error(`Window closed`));
        });
    }

    prerender(proxyWin : ProxyWindow, proxyElement : ProxyElement, { context, uid } : { context : $Values<typeof CONTEXT>, uid : string }) : ZalgoPromise<{ proxyPrerenderWin : ProxyWindow, proxyPrerenderFrame : ?ProxyElement }> {
        return ZalgoPromise.try(() => {
            return this.driver.openPrerender.call(this, proxyWin, proxyElement);
            
        }).then(({ proxyPrerenderWin, proxyPrerenderFrame }) => {
            return proxyPrerenderWin.awaitWindow().then(prerenderWindow => {

                if (!isSameDomain(prerenderWindow) || !isBlankDomain(prerenderWindow)) {
                    return { proxyPrerenderWin, proxyPrerenderFrame };
                }

                prerenderWindow = assertSameDomain(prerenderWindow);
        
                const doc = prerenderWindow.document;
                const el = this.renderTemplate(this.component.prerenderTemplate, { context, uid, document: doc });
    
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
    
                return { proxyPrerenderWin, proxyPrerenderFrame };
            });
        });
    }

    renderTemplate(renderer : (RenderOptionsType<P>) => HTMLElement, { context, uid, container, document, outlet } : { context : $Values<typeof CONTEXT>, uid : string, container? : HTMLElement, document? : Document, outlet? : HTMLElement }) : HTMLElement {
        // $FlowFixMe
        return renderer.call(this, {
            container,
            outlet,
            context,
            uid,
            focus:      () => this.focus(),
            close:      () => this.close(),
            state:      this.state,
            props:      this.props,
            tag:        this.component.tag,
            doc:        document,
            dimensions: this.component.dimensions
        });
    }

    renderContainer(proxyContainer : ProxyElement, { context, uid } : { context : $Values<typeof CONTEXT>, uid : string }) : ZalgoPromise<ProxyElement> {
        return ZalgoPromise.try(() => {
            return proxyContainer.getElement();

        }).then(element => {
            return elementReady(element);

        }).then(container => {
            const outlet = createElement('div', {
                class: [ CLASS.OUTLET ]
            });

            const innerContainer = this.renderTemplate(this.component.containerTemplate, { context, uid, container, outlet });
            appendChild(container, innerContainer);

            this.clean.register(() => destroyElement(outlet));
            this.clean.register(() => destroyElement(innerContainer));

            this.proxyOutlet = getProxyElement(outlet);
            return this.proxyOutlet;
        });
    }

    destroy(err? : mixed = new Error(`Component destroyed before render complete`)) : ZalgoPromise<void> {
        return ZalgoPromise.try(() => {
            this.component.log(`destroy`);
            this.initPromise.asyncReject(err);
            return this.clean.all();
        });
    }

    onError(err : mixed, onError? : onErrorPropType) : ZalgoPromise<void> {
        // eslint-disable-next-line promise/no-promise-in-callback
        return ZalgoPromise.try(() => {
            this.initPromise.asyncReject(err);

            if (!onError && this.props && this.props.onError) {
                onError = this.props.onError;
            }
    
            if (onError) {
                return onError(err);
            }

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
