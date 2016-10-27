
import { logger } from '../../lib';
import postRobot from 'post-robot/src';
import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';

import { BaseComponent } from '../base';
import { buildChildWindowName, isXComponentWindow, getParentDomain, getParentComponentWindow } from '../window';
import { onCloseWindow, addEventListener, createElement, uniqueID, elementReady, noop, showAndAnimate, animateAndHide, hideElement,
         capitalizeFirstLetter, addEventToClass, template, isWindowClosed, extend, delay, replaceObject, extendUrl, getDomainFromUrl } from '../../lib';
import { POST_MESSAGE, CONTEXT_TYPES, CONTEXT_TYPES_LIST, CLASS_NAMES, ANIMATION_NAMES, EVENT_NAMES, CLOSE_REASONS, XCOMPONENT, DELEGATE, INITIAL_PROPS, WINDOW_REFERENCES } from '../../constants';
import { RENDER_DRIVERS } from './drivers';
import { validate, validateProps } from './validate';
import { propsToQuery } from './props';
import { normalizeParentProps } from './props';

let activeComponents = [];

function memoize(target, name, descriptor) {
    let method = descriptor.value;

    descriptor.value = function() {

        this.__memoized__ = this.__memoized__ || {};

        if (!this.__memoized__.hasOwnProperty(name)) {
            this.__memoized__[name] = method.apply(this, arguments);
        }

        return this.__memoized__[name];
    };
}

function promise(target, name, descriptor) {
    let method = descriptor.value;

    descriptor.value = function() {
        return Promise.try(() => {
            return method.apply(this, arguments);
        });
    };
}


/*  Parent Component
    ----------------

    This manages the state of the component on the parent window side - i.e. the window the component is being rendered into.

    It handles opening the necessary windows/iframes, launching the component's url, and listening for messages back from the component.
*/

export class ParentComponent extends BaseComponent {

    constructor(component, options = {}) {
        super(component, options);
        validate(component, options);

        this.component = component;

        // Ensure the component is not loaded twice on the same page, if it is a singleton

        if (component.singleton && activeComponents.some(comp => comp.component === component)) {
            throw new Error(`${component.tag} is a singleton, and an only be instantiated once`);
        }

        this.registerActiveComponent();

        this.setProps(options.props || {});


        // Options passed during renderToParent. We would not ordinarily expect a user to pass these, since we depend on
        // them only when we're trying to render from a sibling to a sibling

        this.childWindowName = this.buildChildWindowName(WINDOW_REFERENCES.DIRECT_PARENT);

        this.component.log(`construct_parent`);

        this.onInit = new Promise();

        this.clean.register(() => {
            this.onInit = new Promise();
        });

        this.onInit.catch(err => {
            return this.error(err);
        });
    }


    registerActiveComponent() {
        activeComponents.push(this);

        this.clean.register(() => {
            activeComponents.splice(activeComponents.indexOf(this), 1);
        });
    }


    buildChildWindowName(parent, options = {}) {

        let tag = this.component.tag;

        let props = replaceObject(this.getPropsForChild(), (value, key, fullKey) => {
            if (value instanceof Function) {
                return {
                    __type__: '__function__'
                };
            }
        });

        if (options.secureProps) {

            window.__xcomponent__ = window.__xcomponent__ || {};
            window.__xcomponent__.props = window.__xcomponent__.props || {};

            let uid = uniqueID();

            window.__xcomponent__.props[uid] = props;

            props = {
                type: INITIAL_PROPS.UID,
                value: uid
            };

        } else {

            props = {
                type: INITIAL_PROPS.RAW,
                value: props
            };
        }

        return buildChildWindowName(this.component.name, this.component.version, { tag, parent, props });
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

        return postRobot.send(getParentComponentWindow(), name, data, { domain: getParentDomain() });
    }


    /*  Set Props
        ---------

        Normalize props and generate the url we'll use to render the component
    */

    setProps(props = {}, required = true) {
        this.props = this.props || {};
        props.version = this.component.version;
        validateProps(this.component, props, required);
        if (this.component.validateProps) {
            this.component.validateProps(this.component, props, required);
        }
        extend(this.props, normalizeParentProps(this.component, this, props, required));
    }


    /*  Build Url
        ---------

        We build the props we're passed into the initial url. This means the component server-side can start rendering
        itself based on whatever props the merchant provides.
    */

    buildUrl() {

        return propsToQuery(this.component.props, this.props).then(queryProps => {

            queryProps[XCOMPONENT] = '1';

            return Promise.try(() => {

                if (this.props.url) {
                    return this.props.url;
                }

            }).then(url => {

                if (!url) {
                    if (this.props.env && this.component.envUrls) {
                        url = this.component.envUrls[this.props.env];
                    } else if (this.component.defaultEnv && this.component.envUrls) {
                        url = this.component.envUrls[this.component.defaultEnv];
                    } else if (this.component.buildUrl) {
                        url = this.component.buildUrl(this);
                    } else {
                        url = this.component.url;
                    }
                }

                return extendUrl(url, { query: queryProps });
            });
        });
    }


    @promise
    getDomain() {

        if (this.component.domain) {
            return this.component.domain;
        }

        if (this.component.domains && this.props.env && this.component.domains[this.props.env]) {
            return this.component.domains[this.props.env];
        }

        if (this.props.url) {
            return Promise.try(() => {
                return this.props.url;
            }).then(url => {
                return getDomainFromUrl(url);
            });
        }

        if (this.component.envUrls && this.props.env && this.component.envUrls[this.props.env]) {
            return getDomainFromUrl(this.component.envUrls[this.props.env]);
        }

        if (this.component.envUrls && this.component.defaultEnv && this.component.envUrls[this.component.defaultEnv]) {
            return getDomainFromUrl(this.component.envUrls[this.component.defaultEnv]);
        }

        if (this.component.buildUrl) {
            return getDomainFromUrl(this.component.buildUrl(this));
        }

        if (this.component.url) {
            return getDomainFromUrl(this.component.url);
        }

        throw new Error(`Can not determine domain for component`);
    }


    getPropsForChild(props) {

        props = props || this.props;

        let result = {};

        for (let key of Object.keys(props)) {
            if (this.component.props[key].sendToChild !== false) {
                result[key] = props[key];
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
        let changed = false;

        for (let key of Object.keys(props)) {
            if (props[key] !== this.props[key]) {
                changed = true;
                break;
            }
        }

        if (!changed) {
            return;
        }

        this.setProps(props, false);

        return this.onInit.then(() => {
            return this.childExports.updateProps(this.getPropsForChild(props));
        });
    }


    /*  Get Render Context
        ------------------

        Determine the ideal context to render to, if unspecified by the user
    */

    getRenderContext(el, context) {

        if (el) {
            if (context && !RENDER_DRIVERS[context].requiresElement) {
                throw new Error(`[${this.component.tag}] ${context} context can not be rendered into element`);
            }

            context = CONTEXT_TYPES.IFRAME;
        }

        if (context) {
            if (!this.component.contexts[context]) {
                throw new Error(`[${this.component.tag}] ${context} context not allowed by component`);
            }

            return context;
        }

        if (this.component.defaultContext) {
            return this.component.defaultContext;
        }

        for (let renderContext of [ CONTEXT_TYPES.LIGHTBOX, CONTEXT_TYPES.POPUP ]) {
            if (this.component.contexts[renderContext]) {
                return renderContext;
            }
        }

        throw new Error(`[${this.component.tag}] No context options available for render`);
    }


    /*  Validate Render
        ---------------

        Ensure there is no reason we can't render
    */

    validateRender(element, context) {

        context = this.getRenderContext(element, context);

        if (this.window) {
            throw new Error(`[${this.component.tag}] Can not render: component is already rendered`);
        }

        if (RENDER_DRIVERS[context].requiresElement && !element) {
            throw new Error(`[${this.component.tag}] Must specify element to render to iframe`);
        }

        return context;
    }


    /*  Render
        ------

        Kick off the actual rendering of the component:

        - open the popup/iframe
        - load the url into it
        - set up listeners
    */

    render(element, context) {
        return this.tryInit(() => {
            context = this.validateRender(element, context);

            this.component.log(`render_${context}`, { context, element });

            return this.preRender(element, context);
        });
    }


    openBridge(context) {
        return RENDER_DRIVERS[context].openBridge.call(this);
    }



    /*  Open
        ----

        Open a new window in the desired context
    */

    @memoize
    @promise
    open(element, context) {
        this.component.log(`open_${context}`, { element, windowName: this.childWindowName });

        RENDER_DRIVERS[context].open.call(this, element);
    }

    get driver() {

        if (!this.context) {
            throw new Error('Context not set');
        }

        return RENDER_DRIVERS[this.context];
    }

    /*  Pre Render
        ----------

        Pre-render a new window in the desired context
    */

    @promise
    preRender(element, context, options = {}) {
        this.clean.set('context', this.getRenderContext(element, context));

        let tasks = {
            openContainer: this.openContainer(this.context),
            openBridge:    this.openBridge(this.context),
            getDomain:     this.getDomain()
        };

        tasks.elementReady = Promise.try(() => {
            if (element) {
                return elementReady(element);
            } else {
                return tasks.openContainer;
            }
        });

        if (this.driver.openOnClick) {
            tasks.open = this.open(element, this.context);
        } else {
            tasks.open = tasks.elementReady.then(() => {
                return this.open(element, this.context);
            });
        }

        tasks.showContainer = tasks.openContainer.then(() => {
            return this.showContainer();
        });

        tasks.createComponentTemplate = tasks.open.then(() => {
            return this.createComponentTemplate();
        });

        tasks.showComponent = tasks.createComponentTemplate.then(() => {
            return this.showComponent();
        });

        tasks.linkUrl = Promise.all([ tasks.getDomain, tasks.open ]).then(([ domain ]) => {
            return postRobot.linkUrl(this.window, domain);
        });

        tasks.listen = Promise.all([ tasks.getDomain, tasks.open ]).then(([ domain ]) => {
            return this.listen(this.window, domain);
        });

        tasks.watchForClose = tasks.open.then(() => {
            return this.watchForClose();
        });

        if (options.loadUrl !== false) {

            tasks.buildUrl = this.buildUrl();

            tasks.loadUrl = Promise.all([ tasks.buildUrl, tasks.createComponentTemplate ]).then(([ url ]) => {
                return this.loadUrl(this.context, url);
            });

            tasks.runTimeout = tasks.loadUrl.then(() => {
                debugger; // eslint-disable-line
                return this.runTimeout();
            });

        } else {

            tasks.runTimeout = Promise.try(() => {
                return this.runTimeout();
            });
        }

        return Promise.hash(tasks);
    }



    validateRenderToParent(element, context) {
        context = this.getRenderContext(element, context);

        let parentWindow = getParentComponentWindow();

        if (!parentWindow) {
            throw new Error(`[${this.component.tag}] Can not render to parent - no parent exists`);
        }

        if (!isXComponentWindow()) {
            throw new Error(`[${this.component.tag}] Can not render to parent - not in a child component window`);
        }

        return context;
    }


    delegate(win, context) {

        this.delegateWindow = win;

        this.component.log(`delegate_${context}`);

        this.childWindowName = this.buildChildWindowName(window.name, { secureProps: true });

        let delegate = postRobot.send(win, `${POST_MESSAGE.DELEGATE}_${this.component.name}`, {

            context,

            options: {

                context,

                childWindowName: this.childWindowName,

                props: {
                    uid:        this.props.uid,
                    dimensions: this.props.dimensions,
                    onClose:    this.props.onClose
                },

                overrides: {
                    focus:             () => this.focus(),
                    userClose:         () => this.userClose(),
                    getDomain:         () => this.getDomain(),
                    getParentTemplate: () => this.getParentTemplate()
                }
            }

        }).then(({ data }) => {

            this.clean.register(data.destroy);
            return data;

        }).catch(err => {

            throw new Error(`Unable to delegate rendering. Possibly the component is not loaded in the target window.\n\n${err.stack}`);
        });

        let overrides = RENDER_DRIVERS[context].renderToParentOverrides;

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


    /*  Render to Parent
        ----------------

        Instruct the parent window to render our component for us -- so, for example, we can have a button component
        which opens a lightbox on the parent page, with a full template. Or, we could use this to render an iframe based
        modal on top of our existing iframe component, without having to expand out the size of our current iframe.
    */

    renderToParent(element, context, options = {}) {
        return this.tryInit(() => {
            context = this.validateRenderToParent(element, context);

            this.component.log(`render_${context}_to_parent`, { element, context });

            this.delegate(getParentComponentWindow(), context);

            return this.render(element, context);
        });
    }


    renderTo(win, element, context, options = {}) {
        return this.tryInit(() => {
            context = this.validateRenderToParent(element, context);

            this.component.log(`render_${context}_to_win`, { element, context });

            this.delegate(win, context);

            return this.render(element, context);
        });
    }

    /*  Watch For Close
        ---------------

        Watch for the child window closing, so we can cleanup.
        Also watch for this window changing location, so we can close the component.
    */

    watchForClose() {

        let closeWindowListener = onCloseWindow(this.window, () => {
            this.component.log(`detect_close_child`);

            return Promise.try(() => {
                return this.props.onClose(CLOSE_REASONS.CLOSE_DETECTED);
            }).finally(() => {
                return this.destroy();
            });
        });

        this.clean.register('destroyCloseWindowListener', closeWindowListener.cancel);

        // Our child has no way of knowing if we navigated off the page. So we have to listen for beforeunload
        // and close the child manually if that happens.

        let unloadWindowListener = addEventListener(window, 'beforeunload', () => {
            this.component.log(`navigate_away`);
            logger.flush();

            closeWindowListener.cancel();

            if (RENDER_DRIVERS[this.context].destroyOnUnload) {
                return this.destroyComponent();
            }
        });

        this.clean.register('destroyUnloadWindowListener', unloadWindowListener.cancel);
    }


    /*  Load Url
        --------

        Load url into the child window. This is separated out because it's quite common for us to have situations
        where opening the child window and loading the url happen at different points.
    */

    @promise
    loadUrl(context, url) {
        this.component.log(`load_url`);

        if (window.location.href.split('#')[0] === url.split('#')[0]) {
            url = extendUrl(url, {
                query: {
                    [ uniqueID() ]: '1'
                }
            });
        }

        return RENDER_DRIVERS[context].loadUrl.call(this, url);
    }


    /*  Render Hijack
        -------------

        Do a normal render, with the exception that we don't load the url into the child since our hijacked link or button will do that for us
    */

    renderHijack(targetElement, element, context) {
        return this.tryInit(() => {
            context =  this.validateRender(element, context);

            this.component.log(`render_hijack_${context}`);

            targetElement.target = this.childWindowName;

            return this.preRender(element, context, { loadUrl: false });
        });
    }


    /*  Run Timeout
        -----------

        Set a timeout on the initial render, and call this.props.onTimeout if we don't get an init call in time.
    */

    runTimeout() {

        if (this.props.timeout) {
            setTimeout(() => {

                // If this.onInit has been previously resolved, this won't have any effect.

                let error = new Error(`[${this.component.tag}] Loading component ${this.component.tag} timed out after ${this.props.timeout} milliseconds`);

                this.onInit.reject(error).catch(err => {
                    return this.props.onTimeout(err).finally(() => {
                        this.component.log(`timed_out`, { timeout: this.props.timeout });
                    });
                });

            }, this.props.timeout);
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
                return this.props.onEnter().then(() => {

                    // Let the child know what its context is, and what its initial props are.

                    logger.flush();

                    return {
                        props: this.getPropsForChild(),
                        context: this.context
                    };
                });
            },


            // The child has requested that we close it. Since lightboxes and iframes can't close themselves, we need
            // this logic to exist in the parent window

            [ POST_MESSAGE.CLOSE ](source, data) {
                this.close(data.reason);
            },

            // Iframes can't resize themselves, so they need the parent to take care of it for them.

            [ POST_MESSAGE.RESIZE ](source, data) {

                if (RENDER_DRIVERS[this.context].allowResize && this.component.autoResize) {
                    return this.resize(data.width, data.height);
                }
            },


            // The child encountered an error

            [ POST_MESSAGE.HIDE ](source, data) {
                this.hide();
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

    resize(width, height) {
        this.component.log(`resize`, { height, width });
        RENDER_DRIVERS[this.context].resize.call(this, width, height);

        if (this.component.resizeDelay) {
            return delay(this.component.resizeDelay);
        }
    }


    /*  Restyle
        -------

        Restyle the child component window
    */

    restyle() {
        return RENDER_DRIVERS[this.context].restyle.call(this);
    }


    /*  Hide
        ----

        Hide the component and any parent template
    */

    hide() {

        if (this.parentTemplate) {
            this.parentTemplate.style.display = 'none';
        }

        return RENDER_DRIVERS[this.context].hide.call(this);
    }


    userClose() {
        return this.close(CLOSE_REASONS.USER_CLOSED);
    }



    /*  Close
        -----

        Close the child component
    */

    @memoize
    close(reason = CLOSE_REASONS.PARENT_CALL) {
        return Promise.try(() => {

            this.component.log(`close`, { reason });

            return this.props.onClose(reason);

        }).then(() => {

            return Promise.all([
                this.closeComponent(),
                this.closeContainer()
            ]);

        }).then(() => {

            return this.destroy();
        });
    }


    @memoize
    closeContainer(reason = CLOSE_REASONS.PARENT_CALL) {
        return Promise.try(() => {

            return this.props.onClose(reason);

        }).then(() => {

            return Promise.all([
                this.closeComponent(reason),
                this.hideContainer()
            ]);

        }).then(() => {

            return this.destroyContainer();
        });
    }


    @memoize
    @promise
    destroyContainer() {
        this.clean.run('destroyContainerEvents');
        this.clean.run('destroyParentTemplate');
    }


    @memoize
    closeComponent(reason = CLOSE_REASONS.PARENT_CALL) {

        this.clean.run('destroyCloseWindowListener');
        this.clean.run('destroyUnloadWindowListener');

        let win = this.window;

        return Promise.try(() => {

            return this.cancelContainerEvents();

        }).then(() => {

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
        this.clean.run('destroyCloseWindowListener');
        this.clean.run('destroyContainerEvents');
        this.clean.run('destroyWindow');
    }

    @memoize
    @promise
    showContainer() {
        if (this.parentTemplate) {
            this.parentTemplate.classList.add(CLASS_NAMES.SHOW_CONTAINER);
            return showAndAnimate(this.parentTemplate, ANIMATION_NAMES.SHOW_CONTAINER);
        }
    }

    @memoize
    @promise
    showComponent() {
        if (this.elementTemplate) {
            this.elementTemplate.classList.add(CLASS_NAMES.SHOW_COMPONENT);
            showAndAnimate(this.elementTemplate, ANIMATION_NAMES.SHOW_COMPONENT);
        }
    }

    @memoize
    @promise
    hideContainer() {
        if (this.parentTemplate) {

            this.parentTemplate.classList.add(CLASS_NAMES.HIDE_CONTAINER);
            this.parentTemplate.classList.add(CLASS_NAMES.LOADING);

            return animateAndHide(this.parentTemplate, ANIMATION_NAMES.HIDE_CONTAINER);
        }
    }

    @memoize
    @promise
    hideComponent() {

        if (this.parentTemplate) {
            this.parentTemplate.classList.add(CLASS_NAMES.LOADING);
        }

        if (this.elementTemplate) {

            this.elementTemplate.classList.add(CLASS_NAMES.HIDE_COMPONENT);
            this.parentTemplate.classList.add(CLASS_NAMES.LOADING);

            if (this.elementTemplate) {
                return animateAndHide(this.elementTemplate, ANIMATION_NAMES.HIDE_COMPONENT);
            }
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

    @memoize
    createComponentTemplate() {

        let componentTemplate = this.component.componentTemplate instanceof Function ? this.component.componentTemplate() : this.component.componentTemplate;

        let html = template(componentTemplate, {
            id: `${CLASS_NAMES.XCOMPONENT}-${this.props.uid}`,
            CLASS: CLASS_NAMES,
            ANIMATION: ANIMATION_NAMES
        });

        try {
            this.window.document.open();
            this.window.document.write(html);
            this.window.document.close();
        } catch (err) {
            try {
                this.window.location = `javascript: document.open(); document.write(${JSON.stringify(html)}); document.close();`;
            } catch (err2) {
                // pass
            }
        }
    }


    @promise
    getParentTemplate() {
        return this.component.parentTemplate;
    }


    /*  Create Parent Template
        ----------------------

        Create a template and stylesheet for the parent template behind the popup/lightbox
    */

    @memoize
    @promise
    openContainer(context) {
        return Promise.try(() => {

            if (!RENDER_DRIVERS[context].parentTemplate) {
                return;
            }

            return this.getParentTemplate();

        }).then(parentTemplate => {

            if (!parentTemplate) {
                return;
            }

            if (window.top !== window) {
                // throw new Error(`Can only render parent template to top level window`);
            }

            this.parentTemplate = createElement('div', {

                html: template(parentTemplate, {
                    id: `${CLASS_NAMES.XCOMPONENT}-${this.props.uid}`,
                    CLASS: CLASS_NAMES,
                    ANIMATION: ANIMATION_NAMES
                }),

                attributes: {
                    id: `${CLASS_NAMES.XCOMPONENT}-${this.props.uid}`
                },

                class: [
                    CLASS_NAMES.XCOMPONENT,
                    `${CLASS_NAMES.XCOMPONENT}-${this.context}`
                ]

            });

            hideElement(this.parentTemplate);

            document.body.appendChild(this.parentTemplate);

            if (this.driver.renderedIntoParentTemplate) {
                this.elementTemplate = this.parentTemplate.getElementsByClassName(CLASS_NAMES.ELEMENT)[0];

                if (!this.elementTemplate) {
                    throw new Error('Could not find element to render component into');
                }

                hideElement(this.elementTemplate);
            }

            let eventHandlers = [];

            if (RENDER_DRIVERS[context].focusable) {
                eventHandlers.push(addEventToClass(this.parentTemplate, CLASS_NAMES.FOCUS, EVENT_NAMES.CLICK, event =>  this.focus()));
            }

            eventHandlers.push(addEventToClass(this.parentTemplate, CLASS_NAMES.CLOSE, EVENT_NAMES.CLICK, event => this.userClose()));

            this.clean.register('destroyContainerEvents', () => {
                for (let eventHandler of eventHandlers) {
                    eventHandler.cancel();
                }
            });

            this.clean.register('destroyParentTemplate', () => {
                document.body.removeChild(this.parentTemplate);
                delete this.parentTemplate;
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

    destroy() {
        return Promise.try(() => {
            if (this.clean.hasTasks()) {
                this.component.log(`destroy`);
                logger.flush();
                return this.clean.all();
            }
        });
    }


    tryInit(method) {
        return Promise.try(method).catch(err => {

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

    error(err) {
        return Promise.try(() => {

            this.component.logError(`error`, { error: err.stack || err.toString() });
            this.onInit.reject(err);
            return this.props.onError(err);

        }).then(() => {

            return this.props.onError(err);

        }).then(() => {

            return this.destroy();

        }).catch(err2 => {

            throw new Error(`An error was encountered while handling error:\n\n ${err.stack}\n\n${err2.stack}`);

        }).then(() => {

            throw err;
        });
    }
}


/*  Generate Render Methods
    -----------------------

    Autogenerate methods like renderIframe, renderPopupToParent
*/

for (let context of CONTEXT_TYPES_LIST) {

    let contextName = capitalizeFirstLetter(context);

    ParentComponent.prototype[`render${contextName}`] = function(element) {
        return this.render(element, context);
    };

    ParentComponent.prototype[`render${contextName}ToParent`] = function(element) {
        return this.renderToParent(element, context);
    };
}

export function destroyAll() {
    let results = [];

    while (activeComponents.length) {
        results.push(activeComponents[0].destroy());
    }

    return Promise.all(results);
}
