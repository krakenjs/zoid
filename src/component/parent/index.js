
import * as $logger from 'beaver-logger/client';
import { send, bridge } from 'post-robot/src';
import { isSameDomain, isWindowClosed, isTop, isSameTopWindow, getDistanceFromTop, onCloseWindow } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import { BaseComponent } from '../base';
import { buildChildWindowName, getParentDomain, getParentComponentWindow } from '../window';
import { addEventListener, uniqueID, elementReady, writeElementToWindow,
         noop, showAndAnimate, animateAndHide, showElement, hideElement,
         addClass, extend, serializeFunctions, extendUrl, jsxDom,
         setOverflow, elementStoppedMoving, getElement, memoized, appendChild,
         promise, getDomain, global, writeToWindow, setLogLevel, once,
         getElementName, prefetchPage, getDOMElement, awaitFrameLoad } from '../../lib';

import { POST_MESSAGE, CONTEXT_TYPES, CLASS_NAMES, ANIMATION_NAMES, CLOSE_REASONS, XCOMPONENT, DELEGATE, INITIAL_PROPS, WINDOW_REFERENCES, EVENTS } from '../../constants';
import { RENDER_DRIVERS } from './drivers';
import { validate, validateProps } from './validate';
import { propsToQuery } from './props';
import { normalizeProps } from './props';
import { matchDomain } from 'cross-domain-utils/src';
import { RenderError } from '../../error';

let activeComponents = [];

global.props = global.props || {};
global.windows = global.windows || {};


/*  Parent Component
    ----------------

    This manages the state of the component on the parent window side - i.e. the window the component is being rendered into.

    It handles opening the necessary windows/iframes, launching the component's url, and listening for messages back from the component.
*/

export class ParentComponent extends BaseComponent {

    constructor(component, context, options = {}) {
        super(component, options);

        this.component = component;

        validate(component, options);
        this.validateParentDomain();

        this.context = context;
        this.setProps(options.props || {});

        // update logLevel with prop.logLevel to override defaultLogLevel configured when creating component
        setLogLevel(this.props.logLevel);

        this.childWindowName = this.buildChildWindowName({ renderTo: window });

        this.registerActiveComponent();

        // Options passed during renderTo. We would not ordinarily expect a user to pass these, since we depend on
        // them only when we're trying to render from a sibling to a sibling

        this.component.log(`construct_parent`);

        this.watchForUnload();

        this.onInit = new ZalgoPromise();

        this.clean.register(() => {
            this.onInit = new ZalgoPromise();
        });

        this.onInit.catch(err => {
            return this.error(err);
        });
    }

    @promise
    render(element, loadUrl = true) {
        return this.tryInit(() => {

            this.component.log(`render_${this.context}`, { context: this.context, element, loadUrl });

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

            if (loadUrl) {
                tasks.buildUrl = this.buildUrl();
            }

            tasks.showContainer = tasks.openContainer.then(() => {
                return this.showContainer();
            });

            let immediateUrl;

            if (loadUrl && this.component.sacrificialComponentTemplate) {
                tasks.buildUrl.then(url => {
                    immediateUrl = url;
                });
            }

            tasks.open = this.driver.openOnClick
                ? this.open(element)
                : tasks.openContainer.then(() => {
                    return this.open(element, immediateUrl);
                });

            tasks.listen = ZalgoPromise.all([ tasks.getDomain, tasks.open ]).then(([ domain ]) => {
                this.listen(this.window, domain);
            });

            tasks.watchForClose = tasks.open.then(() => {
                return this.watchForClose();
            });

            tasks.linkDomain = ZalgoPromise.all([ tasks.getDomain, tasks.open ]).then(([ domain ]) => {
                if (bridge) {
                    return bridge.linkUrl(this.window, domain);
                }
            });

            if (!this.html) {
                tasks.createComponentTemplate = tasks.open.then(() => {
                    return this.createComponentTemplate();
                });

                tasks.showComponent = tasks.createComponentTemplate.then(() => {
                    return this.showComponent();
                });
            }

            tasks.openBridge = tasks.open.then(() => {
                return this.openBridge(this.context);
            });

            if (this.html) {
                tasks.loadHTML = tasks.open.then(() => {
                    return this.loadHTML();
                });

            } else if (loadUrl) {
                tasks.loadUrl = ZalgoPromise.all([
                    tasks.buildUrl,
                    tasks.open,
                    tasks.linkDomain,
                    tasks.listen,
                    tasks.open,
                    tasks.openBridge,
                    tasks.createComponentTemplate
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
        });
    }

    @memoized
    getOutlet() {
        this.outlet = document.createElement('div');
        addClass(this.outlet, CLASS_NAMES.OUTLET);
        return this.outlet;
    }

    validateParentDomain() {
        let domain = getDomain();
        if (!matchDomain(this.component.allowedParentDomains, domain)) {
            throw new RenderError(`Can not be rendered by domain: ${domain}`);
        }
    }

    renderTo(win, element) {
        return this.tryInit(() => {

            if (win === window) {
                return this.render(element);
            }

            if (!isSameTopWindow(window, win)) {
                throw new Error(`Can only renderTo an adjacent frame`);
            }

            if (element && typeof element !== 'string') {
                throw new Error(`Element passed to renderTo must be a string selector, got ${typeof element} ${element}`);
            }

            this.checkAllowRenderTo(win);

            this.component.log(`render_${this.context}_to_win`, { element, context: this.context });

            this.childWindowName = this.buildChildWindowName({ renderTo: win });

            this.delegate(win, this.context);

            return this.render(element, this.context);
        });
    }

    @memoized
    @promise
    prefetch() {
        this.html = this.buildUrl().then(url => {
            return prefetchPage(url).then(html => {

                let host = `${url.split('/').slice(0, 3).join('/')}`;
                let uri = `/${url.split('/').slice(3).join('/')}`;

                return `
                    <base href="${host}">

                    ${html}

                    <script>
                        if (window.history && window.history.pushState) {
                            window.history.pushState({}, '', '${uri}');
                        }
                    </script>
                `;
            });
        });
    }

    @memoized
    @promise
    loadHTML() {
        return this.html.then(html => {
            return writeToWindow(this.window, html);
        });
    }

    checkAllowRenderTo(win) {

        if (!win) {
            throw this.component.error(`Must pass window to renderTo`);
        }

        if (isSameDomain(win)) {
            return;
        }

        let origin = getDomain();
        let domain = this.component.getDomain(null, this.props);

        if (!domain) {
            throw new Error(`Could not determine domain to allow remote render`);
        }

        if (domain === origin) {
            return;
        }

        throw new Error(`Can not render remotely to ${domain} - can only render to ${origin}`);
    }

    registerActiveComponent() {
        activeComponents.push(this);

        this.clean.register(() => {
            activeComponents.splice(activeComponents.indexOf(this), 1);
        });
    }


    getComponentParentRef(renderToWindow = window) {

        if (this.context === CONTEXT_TYPES.POPUP) {
            return { ref: WINDOW_REFERENCES.OPENER };
        }

        if (renderToWindow === window) {

            if (isTop(window)) {
                return { ref: WINDOW_REFERENCES.TOP };
            }

            return { ref: WINDOW_REFERENCES.PARENT, distance: getDistanceFromTop(window) };
        }

        let uid = uniqueID();
        global.windows[uid] = window;

        this.clean.register(() => {
            delete global.windows[uid];
        });

        return { ref: WINDOW_REFERENCES.GLOBAL, uid };
    }

    getRenderParentRef(renderToWindow = window) {

        if (renderToWindow === window) {
            return this.getComponentParentRef(renderToWindow);
        }

        let uid = uniqueID();
        global.windows[uid] = renderToWindow;

        this.clean.register(() => {
            delete global.windows[uid];
        });

        return { ref: WINDOW_REFERENCES.GLOBAL, uid };
    }

    buildChildWindowName({ renderTo = window } = {}) {

        let sameDomain = isSameDomain(renderTo);

        let uid    = uniqueID();
        let tag    = this.component.tag;
        let sProps = serializeFunctions(this.getPropsForChild());

        let componentParent = this.getComponentParentRef(renderTo);
        let renderParent    = this.getRenderParentRef(renderTo);

        let secureProps = !sameDomain;

        let props = secureProps
            ? { type: INITIAL_PROPS.UID, uid }
            : { type: INITIAL_PROPS.RAW, value: sProps };

        if (props.type === INITIAL_PROPS.UID) {
            global.props[uid] = sProps;

            this.clean.register(() => {
                delete global.props[uid];
            });
        }

        return buildChildWindowName(this.component.name, this.component.version, { uid, tag, componentParent, renderParent, props });
    }


    /*  Send to Parent
        --------------

        Send a post message to our parent window.
    */

    sendToParent(name, data) {
        let parentWindow = getParentComponentWindow();

        if (!parentWindow) {
            throw new Error(`Can not find parent component window to message`);
        }

        this.component.log(`send_to_parent_${name}`);

        return send(getParentComponentWindow(), name, data, { domain: getParentDomain() });
    }


    /*  Set Props
        ---------

        Normalize props and generate the url we'll use to render the component
    */

    setProps(props = {}, required = true) {
        this.props = this.props || {};
        props.version = this.component.version;
        validateProps(this.component, props, required);
        if (this.component.validate) {
            this.component.validate(this.component, props);
        }
        extend(this.props, normalizeProps(this.component, this, props));
    }


    /*  Build Url
        ---------

        We build the props we're passed into the initial url. This means the component server-side can start rendering
        itself based on whatever props the merchant provides.
    */

    @memoized
    @promise
    buildUrl() {

        return ZalgoPromise.hash({
            url:   this.props.url,
            query: propsToQuery(this.component.props, this.props)

        }).then(({ url, query }) => {

            // Do not extend the url if it is for a different domain

            if (url && !this.component.getValidDomain(url)) {
                return url;
            }

            return ZalgoPromise.try(() => {

                return url || this.component.getUrl(this.props.env, this.props);

            }).then(finalUrl => {

                query[XCOMPONENT] = '1';
                return extendUrl(finalUrl, { query });
            });
        });
    }



    @promise
    getDomain() {
        return ZalgoPromise.try(() => {
            return this.props.url;

        }).then(url => {

            let domain = this.component.getDomain(url, this.props);

            if (domain) {
                return domain;
            }

            if (this.component.buildUrl) {
                return ZalgoPromise.try(() => this.component.buildUrl(this.props)).then(builtUrl => {
                    return this.component.getDomain(builtUrl, this.props);
                });
            }

        }).then(domain => {

            if (!domain) {
                throw new Error(`Could not determine domain`);
            }

            return domain;
        });
    }

    getPropsForChild() {

        let result = {};

        for (let key of Object.keys(this.props)) {
            let prop = this.component.props[key];

            if (!prop || prop.sendToChild !== false) {
                result[key] = this.props[key];
            }
        }

        return result;
    }


    /*  Update Props
        ------------

        Send new props down to the child
    */

    @promise
    updateProps(props = {}) {
        this.setProps(props, false);

        return this.onInit.then(() => {
            return this.childExports.updateProps(this.getPropsForChild());
        });
    }


    @promise
    openBridge() {

        if (!bridge) {
            return;
        }

        let bridgeUrl = this.component.getBridgeUrl(this.props.env);

        if (!bridgeUrl) {
            return;
        }

        let bridgeDomain = this.component.getBridgeDomain(this.props.env);

        if (!bridgeDomain) {
            throw new Error(`Can not determine domain for bridge`);
        }

        if (bridge.needsBridge({ win: this.window, domain: bridgeDomain })) {
            return bridge.openBridge(bridgeUrl, bridgeDomain);
        }
    }



    /*  Open
        ----

        Open a new window in the desired context
    */

    @memoized
    @promise
    open(element, url) {

        this.component.log(`open_${this.context}`, { element: getElementName(element), windowName: this.childWindowName });

        if (url) {
            this.urlLoaded = true;
        }

        return this.driver.open.call(this, element, url);
    }

    get driver() {

        if (!this.context) {
            throw new Error('Context not set');
        }

        return RENDER_DRIVERS[this.context];
    }

    elementReady(element) {
        return elementReady(element).then(noop);
    }



    delegate(win) {

        this.component.log(`delegate_${this.context}`);

        let props = {
            uid:        this.props.uid,
            dimensions: this.props.dimensions,
            onClose:    this.props.onClose,
            onDisplay:  this.props.onDisplay
        };

        for (let propName of Object.keys(this.component.props)) {
            let prop = this.component.props[propName];

            if (prop.allowDelegate) {
                props[propName] = this.props[propName];
            }
        }

        let delegate = send(win, `${POST_MESSAGE.DELEGATE}_${this.component.name}`, {

            context: this.context,
            env: this.props.env,

            options: {

                context: this.context,

                childWindowName: this.childWindowName,

                props,

                overrides: {
                    focus:                () => this.focus(),
                    userClose:            () => this.userClose(),
                    getDomain:            () => this.getDomain(),

                    error: (err) => this.error(err),
                    on: (eventName, handler) => this.on(eventName, handler)
                }
            }

        }).then(({ data }) => {

            this.clean.register(data.destroy);
            return data;

        }).catch(err => {

            throw new Error(`Unable to delegate rendering. Possibly the component is not loaded in the target window.\n\n${err.stack}`);
        });

        let overrides = this.driver.delegateOverrides;

        for (let key of Object.keys(overrides)) {
            let val = overrides[key];

            if (val === DELEGATE.CALL_ORIGINAL) {
                continue;
            }

            let original = this[key];

            this[key] = function() {
                return delegate.then(data => {

                    let override = data.overrides[key];

                    if (val === DELEGATE.CALL_DELEGATE) {
                        return override.apply(this, arguments);
                    }

                    if (val instanceof Function) {
                        return val(original, override).apply(this, arguments);
                    }

                    throw new Error(`Expected delgate to be CALL_ORIGINAL, CALL_DELEGATE, or factory method`);
                });
            };
        }
    }

    getInitialDimensions(el) {

        if (this.component.getInitialDimensions) {
            return this.component.getInitialDimensions(this.props, el);
        }

        if (this.component.dimensions) {
            return this.component.dimensions;
        }

        return {};
    }

    /*  Watch For Close
        ---------------

        Watch for the child window closing, so we can cleanup.
        Also watch for this window changing location, so we can close the component.
    */

    watchForClose() {
        let closeWindowListener = onCloseWindow(this.window, () => {
            this.component.log(`detect_close_child`);

            if (this.driver.errorOnCloseDuringInit) {
                this.onInit.reject(new Error(`Detected close during init`));
            }

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
            $logger.flush();
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

    @promise
    loadUrl(url) {
        if (this.urlLoaded) {
            return;
        }

        this.component.log(`load_url`);

        if (window.location.href.split('#')[0] === url.split('#')[0]) {
            url = extendUrl(url, {
                query: {
                    [ uniqueID() ]: '1'
                }
            });
        }

        return this.driver.loadUrl.call(this, url);
    }


    hijack(targetElement) {
        targetElement.target = this.childWindowName;
    }

    /*  Run Timeout
        -----------

        Set a timeout on the initial render, and call this.props.onTimeout if we don't get an init call in time.
    */

    runTimeout() {

        if (this.props.timeout) {
            this.timeout = setTimeout(() => {

                this.component.log(`timed_out`, { timeout: this.props.timeout });

                let error = this.component.error(`Loading component timed out after ${this.props.timeout} milliseconds`);

                this.onInit.reject(error);
                this.props.onTimeout(error);

            }, this.props.timeout);

            this.clean.register(() => {
                clearTimeout(this.timeout);
                delete this.timeout;
            });
        }
    }


    /*  Listeners
        ---------

        Post-robot listeners to the child component window
    */

    listeners() {
        return {

            // The child rendered, and the component called .attach()
            // We have no way to know when the child has set up its listeners for the first time, so we have to listen
            // for this message to be sure so we can continue doing anything from the parent

            [ POST_MESSAGE.INIT ](source, data) {

                this.childExports = data.exports;

                this.onInit.resolve(this);

                if (this.timeout) {
                    clearTimeout(this.timeout);
                }

                return {
                    props: this.getPropsForChild(),
                    context: this.context
                };
            },


            // The child has requested that we close it. Since iframes can't close themselves, we need
            // this logic to exist in the parent window

            [ POST_MESSAGE.CLOSE ](source, data) {
                this.close(data.reason);
            },

            [ POST_MESSAGE.CHECK_CLOSE ](source, data) {
                this.checkClose();
            },

            // Iframes can't resize themselves, so they need the parent to take care of it for them.

            [ POST_MESSAGE.RESIZE ](source, data) {

                if (this.driver.allowResize) {
                    return this.resize(data.width, data.height);
                }
            },


            [ POST_MESSAGE.HIDE ](source, data) {
                this.hide();
            },

            [ POST_MESSAGE.SHOW ](source, data) {
                this.show();
            },


            // The child encountered an error

            [ POST_MESSAGE.ERROR ](source, data) {
                this.error(new Error(data.error));
            }
        };
    }


    /*  Resize
        ------

        Resize the child component window
    */

    @promise
    resize(width, height, { waitForTransition = true } = {}) {
        this.component.log(`resize`, { height, width });
        this.driver.resize.call(this, width, height);

        if (!waitForTransition) {
            return;
        }

        if (this.element || this.iframe) {

            let overflow;

            if (this.element) {
                overflow = setOverflow(this.element, 'hidden');
            }

            return elementStoppedMoving(this.element || this.iframe).then(() => {

                if (overflow) {
                    overflow.reset();
                }
            });
        }
    }


    /*  Hide
        ----

        Hide the component and any parent template
    */

    hide() {

        if (this.container) {
            hideElement(this.container);
        }

        return this.driver.hide.call(this);
    }

    show() {

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


    userClose() {
        return this.close(CLOSE_REASONS.USER_CLOSED);
    }



    /*  Close
        -----

        Close the child component
    */

    @memoized
    close(reason = CLOSE_REASONS.PARENT_CALL) {
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
    closeContainer(reason = CLOSE_REASONS.PARENT_CALL) {
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
    @promise
    destroyContainer() {
        this.clean.run('destroyContainerEvents');
        this.clean.run('destroyContainerTemplate');
    }


    @memoized
    closeComponent(reason = CLOSE_REASONS.PARENT_CALL) {

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
    @promise
    showContainer() {
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
    @promise
    showComponent() {
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
    @promise
    hideContainer() {
        if (this.container) {
            return animateAndHide(this.container, ANIMATION_NAMES.HIDE_CONTAINER, this.clean.register);
        }
    }

    @memoized
    @promise
    hideComponent() {
        if (this.element) {
            return animateAndHide(this.element, ANIMATION_NAMES.HIDE_COMPONENT, this.clean.register);
        }
    }


    /*  Focus
        -----

        Focus the child component window
    */

    focus() {

        if (this.window) {

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
    @promise
    createComponentTemplate() {

        if (!this.component.componentTemplate) {
            return;
        }

        return ZalgoPromise.try(() => {

            let frame = this.sacrificialIframe || this.iframe;

            if (frame) {
                return awaitFrameLoad(frame);
            }

        }).then(() => {

            let win = this.componentTemplateWindow || this.window;

            if (!isSameDomain(win)) {
                return;
            }

            let html = this.renderTemplate(this.component.componentTemplate, {
                jsxDom: jsxDom.bind(win.document),
                htmlDom: text => getDOMElement(text, win.document),
                document: win.document
            });

            let el = getDOMElement(html, win.document);

            writeElementToWindow(win, el);
        });
    }


    /*  Create Parent Template
        ----------------------

        Create a template and stylesheet for the parent template behind the element
    */

    renderTemplate(renderer, options = {}) {
        return renderer.call(this, {
            id:        `${CLASS_NAMES.XCOMPONENT}-${this.component.tag}-${this.props.uid}`,
            props:     renderer.__xdomain__ ? null : this.props,
            tag:       this.component.tag,
            context:   this.context,
            outlet:    this.getOutlet(),
            CLASS:     CLASS_NAMES,
            ANIMATION: ANIMATION_NAMES,
            CONTEXT:   CONTEXT_TYPES,
            EVENT:     EVENTS,
            actions: {
                close: () => this.userClose(),
                focus: () => this.focus()
            },
            on: (eventName, handler) => this.on(eventName, handler),
            jsxDom,
            htmlDom: getDOMElement,
            document,
            ...options
        });
    }

    @memoized
    @promise
    openContainer(element) {

        let el;

        if (element) {
            el = getElement(element);

            if (!el) {
                throw new Error(`Could not find element: ${element}`);
            }
        } else {
            el = document.body;
        }

        if (!this.component.containerTemplate) {
            if (this.driver.renderedIntoContainerTemplate) {
                throw new Error(`containerTemplate needed to render ${this.context}`);
            }

            return;
        }

        let containerWidth = el.offsetWidth;
        let containerHeight = el.offsetHeight;

        let html = this.renderTemplate(this.component.containerTemplate, {
            dimensions: {
                width: containerWidth,
                height: containerHeight
            }
        });

        this.container = getDOMElement(html);
        hideElement(this.container);
        appendChild(el, this.container);

        if (this.driver.renderedIntoContainerTemplate) {
            this.element = this.getOutlet();

            let { width, height } = this.getInitialDimensions(el) || {};
            if (width || height) {
                this.resize(width, height, { waitForTransition: false });
            }

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
    }

    cancelContainerEvents() {
        this.clean.run('destroyContainerEvents');
    }


    /*  Destroy
        -------

        Close the component and clean up any listeners and state
    */

    destroy() {
        return ZalgoPromise.try(() => {
            if (this.clean.hasTasks()) {
                this.component.log(`destroy`);
                $logger.flush();
                return this.clean.all();
            }
        });
    }


    tryInit(method) {
        return ZalgoPromise.try(method).catch(err => {

            this.onInit.reject(err);
            throw err;

        }).then(() => {

            return this.onInit;
        });
    }


    /*  Error
        -----

        Handle an error
    */

    @promise
    error(err) {
        this.handledErrors = this.handledErrors || [];

        if (this.handledErrors.indexOf(err) !== -1) {
            return;
        }

        this.handledErrors.push(err);

        return ZalgoPromise.try(() => {
            this.onInit.reject(err);

            return this.destroy();

        }).then(() => {

            if (this.props.onError) {
                return this.props.onError(err);
            }

        }).catch(errErr => {

            throw new Error(`An error was encountered while handling error:\n\n ${err.stack}\n\n${errErr.stack}`);

        }).then(() => {

            if (!this.props.onError) {
                throw err;
            }
        });
    }
}

export function destroyAll() {
    let results = [];

    while (activeComponents.length) {
        results.push(activeComponents[0].destroy());
    }

    return ZalgoPromise.all(results);
}
