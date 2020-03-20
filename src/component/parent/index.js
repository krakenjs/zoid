/* @flow */
/* eslint max-lines: 0 */

import { flush } from 'beaver-logger/client';
import { send, bridge } from 'post-robot/src';
import { isSameDomain, isWindowClosed, isTop, isSameTopWindow, matchDomain, getDistanceFromTop, onCloseWindow, getDomain, assertSameDomain, type CrossDomainWindowType, type SameDomainWindowType } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { getElementSafe, onResize, isShadowElement, insertShadowSlot } from 'belter/src';

import { BaseComponent } from '../base';
import { buildChildWindowName, getParentDomain, getParentComponentWindow } from '../window';
import { addEventListener, uniqueID, elementReady, writeElementToWindow,
    noop, showAndAnimate, animateAndHide, showElement, hideElement,
    addClass, extend, serializeFunctions, extendUrl, jsxDom,
    getElement, memoized, appendChild,
    global, writeToWindow, setLogLevel, once,
    prefetchPage, awaitFrameLoad, stringify, stringifyError } from '../../lib';
import { POST_MESSAGE, CONTEXT_TYPES, CLASS_NAMES, ANIMATION_NAMES, CLOSE_REASONS, DELEGATE, INITIAL_PROPS, WINDOW_REFERENCES, EVENTS, DEFAULT_DIMENSIONS } from '../../constants';
import { RenderError } from '../../error';
import type { Component } from '../component';
import type { PropsType, BuiltInPropsType } from '../component/props';
import type { ChildExportsType } from '../child';
import type { CancelableType, Jsx, DimensionsType, ElementRefType } from '../../types';

import { RENDER_DRIVERS, type ContextDriverType } from './drivers';
import { validateProps } from './validate';
import { propsToQuery, normalizeProps } from './props';

global.props = global.props || {};
global.windows = global.windows || {};

export type RenderOptionsType = {
    id : string,
    props : PropsType,
    tag : string,
    context : string,
    outlet : HTMLElement,
    CLASS : typeof CLASS_NAMES,
    ANIMATION : typeof ANIMATION_NAMES,
    CONTEXT : typeof CONTEXT_TYPES,
    EVENT : typeof EVENTS,
    actions : {
        close : (string) => ZalgoPromise<void>,
        focus : () => ZalgoPromise<void>
    },
    on : (string, () => void) => CancelableType,
    jsxDom : Jsx<HTMLElement>,
    document : Document,
    container : HTMLElement,
    dimensions : DimensionsType
};


/*  Parent Component
    ----------------

    This manages the state of the component on the parent window side - i.e. the window the component is being rendered into.

    It handles opening the necessary windows/iframes, launching the component's url, and listening for messages back from the component.
*/

export class ParentComponent<P> extends BaseComponent<P> {

    html : ?ZalgoPromise<string>
    context : string
    props : BuiltInPropsType & P
    childWindowName : string
    onInit : ZalgoPromise<ParentComponent<P>>
    window : CrossDomainWindowType
    handledErrors : Array<mixed>

    container : HTMLElement
    element : HTMLElement
    outlet : HTMLElement;
    iframe : HTMLIFrameElement

    prerenderIframe : HTMLIFrameElement
    prerenderWindow : SameDomainWindowType

    childExports : ?ChildExportsType<P>
    timeout : ?TimeoutID // eslint-disable-line no-undef

    constructor(component : Component<P>, context : string, { props } : { props : (PropsType & P) }) {
        super();

        this.component = component;

        this.validateParentDomain();

        this.context = context;

        try {
            this.setProps(props);
        } catch (err) {
            if (props.onError) {
                props.onError(err);
            }
            throw err;
        }

        if (this.props.logLevel) {
            setLogLevel(this.props.logLevel);
        }

        this.childWindowName = this.buildChildWindowName({ renderTo: window });

        this.registerActiveComponent();

        // Options passed during renderTo. We would not ordinarily expect a user to pass these, since we depend on
        // them only when we're trying to render from a sibling to a sibling

        this.component.log(`construct_parent`);

        this.watchForUnload();

        this.onInit = new ZalgoPromise();

        this.onInit.catch(err => {
            return this.error(err);
        });
    }

    render(element : ElementRefType, loadUrl : boolean = true) : ZalgoPromise<ParentComponent<P>> {
        return this.tryInit(() => {

            this.component.log(`render_${ this.context }`, { context: this.context, element, loadUrl: stringify(loadUrl) });

            let tasks = {};

            tasks.onRender = this.props.onRender();

            tasks.getDomain = this.getDomain();

            tasks.elementReady = ZalgoPromise.try(() => {
                if (element) {
                    return this.elementReady(element);
                }
            });

            tasks.openContainer = tasks.elementReady.then(() => {
                return this.openContainer(element);
            });

            tasks.showContainer = tasks.openContainer.then(() => {
                return this.showContainer();
            });

            tasks.openPrerender = tasks.openContainer.then(() => {
                return this.openPrerender();
            });

            tasks.switchPrerender = ZalgoPromise.all([ tasks.openPrerender, this.onInit ]).then(() => {
                return this.switchPrerender();
            });

            // $FlowFixMe
            tasks.open = this.driver.openOnClick
                ? this.open()
                : tasks.openContainer.then(() => this.open());

            tasks.listen = ZalgoPromise.hash({ domain: tasks.getDomain, open: tasks.open }).then(({ domain }) => {
                this.listen(this.window, domain);
            });

            tasks.watchForClose = tasks.open.then(() => {
                return this.watchForClose();
            });

            tasks.linkDomain = ZalgoPromise.all([ tasks.getDomain, tasks.open ]).then(([ domain ]) => {
                if (bridge && typeof domain === 'string') {
                    return bridge.linkUrl(this.window, domain);
                }
            });

            if (!this.html) {
                tasks.createPrerenderTemplate = tasks.openPrerender.then(() => {
                    return this.createPrerenderTemplate();
                });

                tasks.showComponent = tasks.createPrerenderTemplate.then(() => {
                    return this.showComponent();
                });
            }

            tasks.openBridge = ZalgoPromise.all([ tasks.getDomain, tasks.open ]).then(([ domain ]) => {
                return this.openBridge(typeof domain === 'string' ? domain : null);
            });

            if (this.html) {
                tasks.loadHTML = tasks.open.then(() => {
                    return this.loadHTML();
                });

            } else if (loadUrl) {
                tasks.buildUrl = this.buildUrl();

                tasks.loadUrl = ZalgoPromise.all([
                    tasks.buildUrl,
                    tasks.open,
                    tasks.linkDomain,
                    tasks.listen,
                    tasks.open,
                    tasks.openBridge,
                    tasks.createPrerenderTemplate
                ]).then(([ url ]) => {
                    return this.loadUrl(url);
                });

                tasks.runTimeout = tasks.loadUrl.then(() => {
                    return this.runTimeout();
                });
            }

            return ZalgoPromise.hash(tasks);

        }).then(() => {
            return this.props.onEnter();
        }).then(() => {
            return this;
        });
    }

    @memoized
    getOutlet() : HTMLElement {
        let outlet = document.createElement('div');
        addClass(outlet, CLASS_NAMES.OUTLET);
        return outlet;
    }

    validateParentDomain() {
        let domain = getDomain();
        if (!matchDomain(this.component.allowedParentDomains, domain)) {
            throw new RenderError(`Can not be rendered by domain: ${ domain }`);
        }
    }

    renderTo(win : CrossDomainWindowType, element : ?string) : ZalgoPromise<ParentComponent<P>> {
        return this.tryInit(() => {

            if (win === window) {
                return this.render(element);
            }

            if (!isSameTopWindow(window, win)) {
                throw new Error(`Can only renderTo an adjacent frame`);
            }

            if (element && typeof element !== 'string') {
                throw new Error(`Element passed to renderTo must be a string selector, got ${ typeof element } ${ element }`);
            }

            this.checkAllowRenderTo(win);

            this.component.log(`render_${ this.context }_to_win`, { element: stringify(element), context: this.context });

            this.childWindowName = this.buildChildWindowName({ renderTo: win });

            this.delegate(win);

            return this.render(element);
        });
    }

    @memoized
    prefetch() : ZalgoPromise<void> {
        return ZalgoPromise.try(() => {
            this.html = this.buildUrl().then(url => {
                return prefetchPage(url).then(html => {

                    let host = `${ url.split('/').slice(0, 3).join('/') }`;
                    let uri = `/${ url.split('/').slice(3).join('/') }`;

                    return `
                        <base href="${ host }">

                        ${ html }

                        <script>
                            if (window.history && window.history.pushState) {
                                window.history.pushState({}, '', '${ uri }');
                            }
                        </script>
                    `;
                });
            });
        });
    }

    @memoized
    loadHTML() : ZalgoPromise<void> {
        return ZalgoPromise.try(() => {
            if (!this.html) {
                throw new Error(`Html not prefetched`);
            }

            return this.html.then(html => {
                // $FlowFixMe
                return writeToWindow(this.window, html);
            });
        });
    }

    checkAllowRenderTo(win : CrossDomainWindowType) {

        if (!win) {
            throw this.component.createError(`Must pass window to renderTo`);
        }

        if (isSameDomain(win)) {
            return;
        }

        let origin = getDomain();
        let domain = this.component.getDomain(null, this.props.env);

        if (!domain) {
            throw new Error(`Could not determine domain to allow remote render`);
        }

        if (matchDomain(domain, origin)) {
            return;
        }

        throw new Error(`Can not render remotely to ${ domain.toString() } - can only render to ${ origin }`);
    }

    registerActiveComponent() {
        ParentComponent.activeComponents.push(this);

        this.clean.register(() => {
            ParentComponent.activeComponents.splice(ParentComponent.activeComponents.indexOf(this), 1);
        });
    }


    getComponentParentRef() : { ref : string, uid? : string, distance? : number } {
        let domain = this.component.getDomain(null, this.props.env);

        if (domain === getDomain(window)) {
            let uid = uniqueID();
            global.windows = global.windows || {};
            global.windows[uid] = window;
            this.clean.register(() => {
                delete global.windows[uid];
            });

            return { ref: WINDOW_REFERENCES.GLOBAL, uid };
        }

        if (this.context === CONTEXT_TYPES.POPUP) {
            return { ref: WINDOW_REFERENCES.OPENER };
        }

        if (isTop(window)) {
            return { ref: WINDOW_REFERENCES.TOP };
        }

        return { ref: WINDOW_REFERENCES.PARENT, distance: getDistanceFromTop(window) };
    }

    getRenderParentRef(renderToWindow : CrossDomainWindowType = window) : { ref : string, uid? : string, distance? : number } {

        if (renderToWindow === window) {
            return this.getComponentParentRef();
        }

        let uid = uniqueID();
        global.windows[uid] = renderToWindow;

        this.clean.register(() => {
            delete global.windows[uid];
        });

        return { ref: WINDOW_REFERENCES.GLOBAL, uid };
    }

    buildChildWindowName({ renderTo = window } : { renderTo : CrossDomainWindowType } = {}) : string {

        let childDomain = this.component.getDomain(null, this.props.env);
        let sameDomain = isSameDomain(renderTo);

        let uid    = uniqueID();
        let tag    = this.component.tag;
        let sProps = serializeFunctions(this.getPropsForChild());

        let componentParent = this.getComponentParentRef();
        let renderParent    = this.getRenderParentRef(renderTo);

        let secureProps = !sameDomain && !this.component.unsafeRenderTo;

        let props = secureProps
            ? { type: INITIAL_PROPS.UID, uid }
            : { type: INITIAL_PROPS.RAW, value: sProps };

        if (props.type === INITIAL_PROPS.UID) {
            global.props[uid] = JSON.stringify(sProps);

            this.clean.register(() => {
                delete global.props[uid];
            });
        }

        return buildChildWindowName(this.component.name, this.component.version, { uid, tag, componentParent, renderParent, props, childDomain });
    }


    /*  Send to Parent
        --------------

        Send a post message to our parent window.
    */

    sendToParent(name : string, data : Object) : ZalgoPromise<{ origin : string, source : CrossDomainWindowType, data : Object }> {
        let parentWindow = getParentComponentWindow();

        if (!parentWindow) {
            throw new Error(`Can not find parent component window to message`);
        }

        this.component.log(`send_to_parent_${ name }`);

        return send(getParentComponentWindow(), name, data, { domain: getParentDomain() });
    }


    /*  Set Props
        ---------

        Normalize props and generate the url we'll use to render the component
    */

    setProps(props : (PropsType & P), required : boolean = true) {

        validateProps(this.component, props, required);
        if (this.component.validate) {
            this.component.validate(this.component, props);
        }

        // $FlowFixMe
        this.props = this.props || {};

        extend(this.props, normalizeProps(this.component, this, props));
    }


    /*  Build Url
        ---------

        We build the props we're passed into the initial url. This means the component server-side can start rendering
        itself based on whatever props the merchant provides.
    */

    @memoized
    buildUrl() : ZalgoPromise<string> {

        let propUrl : (string | void) = this.props.url;

        return ZalgoPromise.all([

            propUrl,
            // $FlowFixMe
            propsToQuery({ ...this.component.props, ...this.component.builtinProps }, this.props)

        ]).then(([ url, query ]) => {

            // Do not extend the url if it is for a different domain

            if (url && !this.component.getValidDomain(url)) {
                return url;
            }

            return ZalgoPromise.try(() => {

                return url || this.component.getUrl(this.props.env, this.props);

            }).then(finalUrl => {

                query.xcomponent = '1';
                return extendUrl(finalUrl, { query });
            });
        });
    }


    getDomain() : ZalgoPromise<string | RegExp> {
        return ZalgoPromise.try(() => {
            return this.props.url;

        }).then(url => {

            let domain = this.component.getDomain(url, this.props.env);

            if (domain) {
                return domain;
            }

            if (this.component.buildUrl) {
                return ZalgoPromise.try(() => this.component.buildUrl(this.props)).then(builtUrl => {
                    return this.component.getDomain(builtUrl, this.props.env);
                });
            }

        }).then(domain => {

            if (!domain) {
                throw new Error(`Could not determine domain`);
            }

            return domain;
        });
    }

    getPropsForChild() : (BuiltInPropsType & P) {

        let result = {};

        for (let key of Object.keys(this.props)) {
            let prop = this.component.getProp(key);

            if (!prop || prop.sendToChild !== false) {
                result[key] = this.props[key];
            }
        }

        // $FlowFixMe
        return result;
    }


    /*  Update Props
        ------------

        Send new props down to the child
    */

    updateProps(props : (PropsType & P)) : ZalgoPromise<void> {
        this.setProps(props, false);

        return this.onInit.then(() => {
            if (this.childExports) {
                return this.childExports.updateProps(this.getPropsForChild());
            } else {
                throw new Error(`Child exports were not available`);
            }
        });
    }


    openBridge(domain : ?string) : ZalgoPromise<?CrossDomainWindowType> {
        return ZalgoPromise.try(() => {
            if (!bridge || !this.driver.needsBridge) {
                return;
            }

            let needsBridgeParams : Object = { win: this.window };
            if (domain) {
                needsBridgeParams.domain = domain;
            }

            let needsBridge = bridge.needsBridge(needsBridgeParams);

            let bridgeUrl = this.component.getBridgeUrl(this.props.env);

            if (!bridgeUrl) {

                if (needsBridge && domain && !bridge.hasBridge(domain, domain)) {
                    throw new Error(`Bridge url needed to render ${ this.context }`);
                }

                return;
            }

            bridgeUrl = extendUrl(bridgeUrl, { query: { version: this.component.version } });

            let bridgeDomain = this.component.getBridgeDomain(this.props.env);

            if (!bridgeDomain) {
                throw new Error(`Can not determine domain for bridge`);
            }

            if (needsBridge) {
                return bridge.openBridge(bridgeUrl, bridgeDomain).then(result => {
                    if (result) {
                        return result;
                    }
                });
            }
        });
    }


    /*  Open
        ----

        Open a new window in the desired context
    */

    @memoized
    open() : ZalgoPromise<void> {
        return ZalgoPromise.try(() => {
            this.component.log(`open_${ this.context }`, { windowName: this.childWindowName });
            if (this.props.win) {
                this.clean.set('window', this.props.win);
                assertSameDomain(this.window).name = this.childWindowName;
                return;
            }
            return this.driver.open.call(this);
        });
    }

    @memoized
    openPrerender() : ZalgoPromise<void> {
        return ZalgoPromise.try(() => {
            if (this.component.prerenderTemplate) {
                return this.driver.openPrerender.call(this);
            }
        });
    }

    @memoized
    switchPrerender() : ZalgoPromise<void> {
        return ZalgoPromise.try(() => {
            if (this.prerenderWindow && this.driver.switchPrerender) {
                return this.driver.switchPrerender.call(this);
            }
        });
    }

    get driver() : ContextDriverType {

        if (!this.context) {
            throw new Error('Context not set');
        }

        return RENDER_DRIVERS[this.context];
    }

    elementReady(element : ElementRefType) : ZalgoPromise<void> {
        return elementReady(element).then(noop);
    }


    delegate(win : CrossDomainWindowType) {

        this.component.log(`delegate_${ this.context }`);

        let props = {
            uid:        this.props.uid,
            dimensions: this.props.dimensions,
            onClose:    this.props.onClose,
            onDisplay:  this.props.onDisplay
        };

        for (let propName of this.component.getPropNames()) {
            let prop = this.component.getProp(propName);

            if (prop.allowDelegate) {
                props[propName] = this.props[propName];
            }
        }

        let delegate = send(win, `${ POST_MESSAGE.DELEGATE }_${ this.component.name }`, {

            context: this.context,
            env:     this.props.env,

            options: {

                context: this.context,

                childWindowName: this.childWindowName,
                isWindowClosed:  () => isWindowClosed(this.window),

                props,

                overrides: {
                    focus:                () => this.focus(),
                    userClose:            () => this.userClose(),
                    getDomain:            () => this.getDomain(),

                    error: (err) => this.error(err),
                    on:    (eventName, handler) => this.on(eventName, handler)
                }
            }

        }).then(({ data }) => {

            this.clean.register(data.destroy);
            return data;

        }).catch(err => {

            throw new Error(`Unable to delegate rendering. Possibly the component is not loaded in the target window.\n\n${ stringifyError(err) }`);
        });

        let overrides = this.driver.delegateOverrides;

        for (let key of Object.keys(overrides)) {
            let val = overrides[key];

            if (val === DELEGATE.CALL_ORIGINAL) {
                continue;
            }

            // $FlowFixMe
            let original = this[key];

            // $FlowFixMe
            this[key] = function overridenFunction() : ZalgoPromise<mixed> {
                return delegate.then(data => {

                    let override = data.overrides[key];

                    if (val === DELEGATE.CALL_DELEGATE) {
                        return override.apply(this, arguments);
                    }

                    if (typeof val === 'function') {
                        return val(original, override).apply(this, arguments);
                    }

                    throw new Error(`Expected delgate to be CALL_ORIGINAL, CALL_DELEGATE, or factory method`);
                });
            };
        }
    }

    /*  Watch For Close
        ---------------

        Watch for the child window closing, so we can cleanup.
        Also watch for this window changing location, so we can close the component.
    */

    watchForClose() {
        let closeWindowListener = onCloseWindow(this.window, () => {
            this.component.log(`detect_close_child`);

            return ZalgoPromise.try(() => {
                return this.props.onClose(CLOSE_REASONS.CLOSE_DETECTED);
            }).finally(() => {
                return this.destroy();
            });
        }, 3000);

        this.clean.register('destroyCloseWindowListener', closeWindowListener.cancel);
    }

    watchForUnload() {

        // Our child has no way of knowing if we navigated off the page. So we have to listen for unload
        // and close the child manually if that happens.

        let onunload = once(() => {
            this.component.log(`navigate_away`);
            flush();
            this.destroyComponent();
        });

        let unloadWindowListener = addEventListener(window, 'unload', onunload);

        this.clean.register('destroyUnloadWindowListener', unloadWindowListener.cancel);
    }


    /*  Load Url
        --------

        Load url into the child window. This is separated out because it's quite common for us to have situations
        where opening the child window and loading the url happen at different points.
    */

    loadUrl(url : string) : ZalgoPromise<void> {
        return ZalgoPromise.try(() => {
            this.component.log(`load_url`);

            if (window.location.href.split('#')[0] === url.split('#')[0]) {
                url = extendUrl(url, {
                    query: {
                        [ uniqueID() ]: '1'
                    }
                });
            }

            return this.driver.loadUrl.call(this, url);
        });
    }


    hijack(targetElement : HTMLFormElement | HTMLAnchorElement) {
        targetElement.target = this.childWindowName;
    }

    /*  Run Timeout
        -----------

        Set a timeout on the initial render, and call this.props.onTimeout if we don't get an init call in time.
    */

    runTimeout() {
        let timeout = this.props.timeout;

        if (timeout) {
            let id = this.timeout = setTimeout(() => {

                this.component.log(`timed_out`, { timeout: timeout.toString() });

                let error = this.component.createError(`Loading component timed out after ${ timeout } milliseconds`);

                this.onInit.reject(error);
                this.props.onTimeout(error);

            }, timeout);

            this.clean.register(() => {
                clearTimeout(id);
                delete this.timeout;
            });
        }
    }


    /*  Listeners
        ---------

        Post-robot listeners to the child component window
    */

    listeners() : { [string] : (CrossDomainWindowType, Object) => mixed } {
        return {

            // The child rendered, and the component called .attach()
            // We have no way to know when the child has set up its listeners for the first time, so we have to listen
            // for this message to be sure so we can continue doing anything from the parent

            [ POST_MESSAGE.INIT ](source : CrossDomainWindowType, data : Object) : { props : BuiltInPropsType & P, context : string } {

                this.childExports = data.exports;

                this.onInit.resolve(this);

                if (this.timeout) {
                    clearTimeout(this.timeout);
                }

                return {
                    props:   this.getPropsForChild(),
                    context: this.context
                };
            },


            // The child has requested that we close it. Since iframes can't close themselves, we need
            // this logic to exist in the parent window

            [ POST_MESSAGE.CLOSE ](source : CrossDomainWindowType, data : Object) {
                this.close(data.reason);
            },

            [ POST_MESSAGE.CHECK_CLOSE ]() {
                this.checkClose();
            },

            // Iframes can't resize themselves, so they need the parent to take care of it for them.

            [ POST_MESSAGE.RESIZE ](source : CrossDomainWindowType, data : Object) : ZalgoPromise<void> {
                return ZalgoPromise.try(() => {
                    if (this.driver.allowResize) {
                        return this.resize(data.width, data.height);
                    }
                });
            },

            [ POST_MESSAGE.HIDE ]() {
                this.hide();
            },

            [ POST_MESSAGE.SHOW ]() {
                this.show();
            },


            // The child encountered an error

            [ POST_MESSAGE.ERROR ](source : CrossDomainWindowType, data : Object) {
                this.error(new Error(data.error));
            }
        };
    }


    /*  Resize
        ------

        Resize the child component window
    */

    resize(width : ?(number | string), height : ?(number | string)) : ZalgoPromise<void> {
        return ZalgoPromise.try(() => {
            this.component.log(`resize`, { height: stringify(height), width: stringify(width) });
            this.driver.resize.call(this, width, height);
            if (this.props.onResize) {
                this.props.onResize();
            }
        });
    }


    /*  Hide
        ----

        Hide the component and any parent template
    */

    hide() : void {

        if (this.container) {
            hideElement(this.container);
        }

        return this.driver.hide.call(this);
    }

    show() : void {

        if (this.container) {
            showElement(this.container);
        }

        return this.driver.show.call(this);
    }


    checkClose() {
        let closeWindowListener = onCloseWindow(this.window, () => {
            this.userClose();
        }, 50, 500);

        this.clean.register(closeWindowListener.cancel);
    }


    userClose() : ZalgoPromise<void> {
        return this.close(CLOSE_REASONS.USER_CLOSED);
    }


    /*  Close
        -----

        Close the child component
    */

    @memoized
    close(reason : string = CLOSE_REASONS.PARENT_CALL) : ZalgoPromise<void> {
        return ZalgoPromise.try(() => {

            this.component.log(`close`, { reason });

            this.event.triggerOnce(EVENTS.CLOSE);
            return this.props.onClose(reason);

        }).then(() => {

            return ZalgoPromise.all([
                this.closeComponent(),
                this.closeContainer()
            ]);

        }).then(() => {

            return this.destroy();
        });
    }


    @memoized
    closeContainer(reason : string = CLOSE_REASONS.PARENT_CALL) : ZalgoPromise<void> {
        return ZalgoPromise.try(() => {

            this.event.triggerOnce(EVENTS.CLOSE);
            return this.props.onClose(reason);

        }).then(() => {

            return ZalgoPromise.all([
                this.closeComponent(reason),
                this.hideContainer()
            ]);

        }).then(() => {

            return this.destroyContainer();
        });
    }


    @memoized
    destroyContainer() : ZalgoPromise<void> {
        return ZalgoPromise.try(() => {
            this.clean.run('destroyContainerEvents');
            this.clean.run('destroyContainerTemplate');
        });
    }


    @memoized
    closeComponent(reason : string = CLOSE_REASONS.PARENT_CALL) : ZalgoPromise<void> {

        let win = this.window;

        return ZalgoPromise.try(() => {

            return this.cancelContainerEvents();

        }).then(() => {

            this.event.triggerOnce(EVENTS.CLOSE);
            return this.props.onClose(reason);

        }).then(() => {

            return this.hideComponent();

        }).then(() => {

            return this.destroyComponent();

        }).then(() => {

            // IE in metro mode -- child window needs to close itself, or close will hang

            if (this.childExports && this.context === CONTEXT_TYPES.POPUP && !isWindowClosed(win)) {
                this.childExports.close().catch(noop);
            }
        });
    }

    destroyComponent() {
        this.clean.run('destroyUnloadWindowListener');
        this.clean.run('destroyCloseWindowListener');
        this.clean.run('destroyContainerEvents');
        this.clean.run('destroyWindow');
    }

    @memoized
    showContainer() : ZalgoPromise<void> {
        return ZalgoPromise.try(() => {
            if (this.props.onDisplay) {
                return this.props.onDisplay();
            }
        }).then(() => {
            if (this.container) {
                return showAndAnimate(this.container, ANIMATION_NAMES.SHOW_CONTAINER, this.clean.register);
            }
        });
    }

    @memoized
    showComponent() : ZalgoPromise<void> {
        return ZalgoPromise.try(() => {
            if (this.props.onDisplay) {
                return this.props.onDisplay();
            }
        }).then(() => {
            if (this.element) {
                return showAndAnimate(this.element, ANIMATION_NAMES.SHOW_COMPONENT, this.clean.register);
            }
        });
    }

    @memoized
    hideContainer() : ZalgoPromise<void> {
        return ZalgoPromise.try(() => {
            if (this.container) {
                return animateAndHide(this.container, ANIMATION_NAMES.HIDE_CONTAINER, this.clean.register);
            } else {
                return ZalgoPromise.resolve();
            }
        });
    }

    @memoized
    hideComponent() : ZalgoPromise<void> {
        return ZalgoPromise.try(() => {
            if (this.element) {
                return animateAndHide(this.element, ANIMATION_NAMES.HIDE_COMPONENT, this.clean.register);
            } else {
                return ZalgoPromise.resolve();
            }
        });
    }


    /*  Focus
        -----

        Focus the child component window
    */

    focus() {

        if (this.window && !isWindowClosed(this.window)) {
            this.component.log(`focus`);
            this.window.focus();

        } else {

            throw new Error(`No window to focus`);
        }
    }


    /*  Create Component Template
        -------------------------

        Creates an initial template and stylesheet which are loaded into the child window, to be displayed before the url is loaded
    */

    @memoized
    createPrerenderTemplate() : ZalgoPromise<void> {
        return ZalgoPromise.try(() => {
            if (!this.component.prerenderTemplate) {
                return ZalgoPromise.resolve();
            }

            return ZalgoPromise.try(() => {

                if (this.prerenderIframe) {
                    return awaitFrameLoad(this.prerenderIframe).then(() => this.prerenderWindow);
                } else {
                    return this.prerenderWindow;
                }

            }).then(win => {

                let doc;

                try {
                    doc = win.document;
                } catch (err) {
                    return;
                }

                let el;

                try {
                    el = this.renderTemplate(this.component.prerenderTemplate, {
                        jsxDom:   jsxDom.bind(doc),
                        document: doc
                    });
                } catch (err) {
                    this.component.logError('preprender_error', { err: err.stack ? err.stack : err.toString() });
                    console.error(err.stack ? err.stack : err); // eslint-disable-line no-console
                    return;
                }

                try {
                    writeElementToWindow(win, el);
                } catch (err) {
                    this.component.logError('preprender_error', { err: err.stack ? err.stack : err.toString() });
                    console.error(err.stack ? err.stack : err); // eslint-disable-line no-console
                }

                let { width = false, height = false, element = 'body' } = (typeof this.component.autoResize === 'object' && this.component.autoResize !== null)
                    ? this.component.autoResize
                    : {};

                element = getElementSafe(element, doc);

                if (element && (width || height)) {
                    onResize(element, ({ width: newWidth, height: newHeight }) => {
                        this.resize(width ? newWidth : undefined, height ? newHeight : undefined);
                    }, { width, height, win });
                }
            });
        });
    }


    /*  Create Parent Template
        ----------------------

        Create a template and stylesheet for the parent template behind the element
    */

    renderTemplate(renderer : (RenderOptionsType) => HTMLElement, options : Object = {}) : HTMLElement {

        let {
            width  = `${ DEFAULT_DIMENSIONS.WIDTH }px`,
            height = `${ DEFAULT_DIMENSIONS.HEIGHT }px`
        } = (this.component.dimensions || {});

        return renderer.call(this, {
            id:        `${ CLASS_NAMES.ZOID }-${ this.component.tag }-${ this.props.uid }`,
            props:     renderer.__xdomain__ ? null : this.props,
            tag:       this.component.tag,
            context:   this.context,
            outlet:    this.getOutlet(),
            CLASS:     CLASS_NAMES,
            ANIMATION: ANIMATION_NAMES,
            CONTEXT:   CONTEXT_TYPES,
            EVENT:     EVENTS,
            actions:   {
                close: () => this.userClose(),
                focus: () => this.focus()
            },
            on:         (eventName, handler) => this.on(eventName, handler),
            jsxDom,
            document,
            dimensions: { width, height },
            ...options
        });
    }

    @memoized
    openContainer(element : ?HTMLElement) : ZalgoPromise<void> {
        return ZalgoPromise.try(() => {
            let el;

            if (element) {
                el = getElement(element);
            } else {
                el = document.body;
            }

            if (!el) {
                throw new Error(`Could not find element to open container into`);
            }

            if (isShadowElement(el)) {
                el = insertShadowSlot(el);
            }

            if (!this.component.containerTemplate) {
                if (this.driver.renderedIntoContainerTemplate) {
                    throw new Error(`containerTemplate needed to render ${ this.context }`);
                }

                return;
            }

            let container = this.renderTemplate(this.component.containerTemplate, {
                container: el
            });

            this.container = container;
            hideElement(this.container);
            appendChild(el, this.container);

            if (this.driver.renderedIntoContainerTemplate) {
                this.element = this.getOutlet();
                hideElement(this.element);

                if (!this.element) {
                    throw new Error('Could not find element to render component into');
                }

                hideElement(this.element);
            }

            this.clean.register('destroyContainerTemplate', () => {

                if (this.container && this.container.parentNode) {
                    this.container.parentNode.removeChild(this.container);
                }

                delete this.container;
            });
        });
    }

    cancelContainerEvents() {
        this.clean.run('destroyContainerEvents');
    }


    /*  Destroy
        -------

        Close the component and clean up any listeners and state
    */

    destroy() : ZalgoPromise<void> {
        return ZalgoPromise.try(() => {
            if (this.clean.hasTasks()) {
                this.component.log(`destroy`);
                flush();
                return this.clean.all();
            }
        }).then(() => {
            if (this.props && this.props.onDestroy) {
                return this.props.onDestroy();
            }
        });
    }


    tryInit(method : () => mixed) : ZalgoPromise<ParentComponent<P>> {
        return ZalgoPromise.try(method).catch(err => {
            this.onInit.reject(err);
        }).then(() => {
            return this.onInit;
        });
    }


    /*  Error
        -----

        Handle an error
    */

    error(err : mixed) : ZalgoPromise<void> {
        // eslint-disable-next-line promise/no-promise-in-callback
        return ZalgoPromise.try(() => {

            this.handledErrors = this.handledErrors || [];

            if (this.handledErrors.indexOf(err) !== -1) {
                // $FlowFixMe
                return;
            }

            this.handledErrors.push(err);

            this.onInit.reject(err);

            return this.destroy();

        }).then(() => {

            if (this.props.onError) {
                return this.props.onError(err);
            }

        }).catch(errErr => { // eslint-disable-line unicorn/catch-error-name

            throw new Error(`An error was encountered while handling error:\n\n ${ stringifyError(err) }\n\n${ stringifyError(errErr) }`);

        }).then(() => {

            if (!this.props.onError) {
                throw err;
            }
        });
    }

    static activeComponents : Array<ParentComponent<*>> = []

    static destroyAll() : ZalgoPromise<void> {
        let results = [];

        while (ParentComponent.activeComponents.length) {
            results.push(ParentComponent.activeComponents[0].destroy());
        }

        return ZalgoPromise.all(results).then(noop);
    }
}
