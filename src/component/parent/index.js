
import { logger } from '../../lib';
import postRobot from 'post-robot/src';
import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';

import { BaseComponent } from '../base';
import { buildChildWindowName, isXComponentWindow, getParentDomain, getParentComponentWindow } from '../window';
import { onCloseWindow, addEventListener, createElement, uniqueID, elementReady, noop, showAndAnimate, animateAndHide, hideElement, addClass,
         addEventToClass, template, extend, delay, replaceObject, extendUrl, getDomainFromUrl, iframe, setOverflow, elementStoppedMoving } from '../../lib';
import { POST_MESSAGE, CONTEXT_TYPES, CLASS_NAMES, ANIMATION_NAMES, EVENT_NAMES, CLOSE_REASONS, XCOMPONENT, DELEGATE, INITIAL_PROPS, WINDOW_REFERENCES } from '../../constants';
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

    constructor(component, context, options = {}) {
        super(component, options);
        validate(component, options);

        this.component = component;
        this.context = context;
        this.setProps(options.props || {});

        this.childWindowName = this.buildChildWindowName();

        // Ensure the component is not loaded twice on the same page, if it is a singleton

        if (component.singleton && activeComponents.some(comp => comp.component === component)) {
            throw new Error(`${component.tag} is a singleton, and an only be instantiated once`);
        }

        this.registerActiveComponent();

        // Options passed during renderToParent. We would not ordinarily expect a user to pass these, since we depend on
        // them only when we're trying to render from a sibling to a sibling

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

        parent = parent || (this.context === CONTEXT_TYPES.LIGHTBOX ? WINDOW_REFERENCES.PARENT_PARENT : WINDOW_REFERENCES.DIRECT_PARENT);

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
        return Promise.try(() => {

            if (this.component.domain) {
                return this.component.domain;
            }

            if (this.component.domains && this.props.env && this.component.domains[this.props.env]) {
                return this.component.domains[this.props.env];
            }

            return this.props.url;

        }).then(propUrl => {

            if (propUrl) {
                return getDomainFromUrl(propUrl);
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
        });
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


    @promise
    openBridge() {

        let bridgeUrl = this.component.bridgeUrl;

        if (!bridgeUrl && this.component.bridgeUrls && this.props.env) {
            bridgeUrl = this.component.bridgeUrls[this.props.env];
        }

        if (!bridgeUrl) {
            return;
        }

        if (postRobot.needsBridge({ window: this.window, domain: getDomainFromUrl(bridgeUrl) })) {
            return postRobot.openBridge(bridgeUrl);
        }
    }



    /*  Open
        ----

        Open a new window in the desired context
    */

    @memoize
    @promise
    open(element) {
        this.component.log(`open_${this.context}`, { element, windowName: this.childWindowName });

        this.driver.open.call(this, element);
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

    /*  Pre Render
        ----------

        Pre-render a new window in the desired context
    */

    @promise
    render(element, loadUrl = true) {
        return this.tryInit(() => {

            this.component.log(`render_${this.context}`, { context: this.context, element, loadUrl });

            let tasks = {
                openContainer: this.openContainer(this.context),
                getDomain:     this.getDomain()
            };

            tasks.elementReady = Promise.try(() => {
                if (element) {
                    return this.elementReady(element);
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

            tasks.openBridge = tasks.open.then(() => {
                return this.openBridge(this.context);
            });

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

            if (loadUrl) {

                tasks.buildUrl = this.buildUrl();

                tasks.loadUrl = Promise.all([ tasks.buildUrl, tasks.openBridge, tasks.createComponentTemplate ]).then(([ url ]) => {
                    return this.loadUrl(url);
                });

                tasks.runTimeout = tasks.loadUrl.then(() => {
                    return this.runTimeout();
                });

            } else {

                tasks.runTimeout = Promise.try(() => {
                    return this.runTimeout();
                });
            }

            return Promise.hash(tasks);
        });
    }



    validateRenderToParent(element) {

        let parentWindow = getParentComponentWindow();

        if (!parentWindow) {
            throw new Error(`[${this.component.tag}] Can not render to parent - no parent exists`);
        }

        if (!isXComponentWindow()) {
            throw new Error(`[${this.component.tag}] Can not render to parent - not in a child component window`);
        }
    }


    delegate(win) {

        this.delegateWindow = win;

        this.component.log(`delegate_${this.context}`);

        this.childWindowName = this.buildChildWindowName(window.name, { secureProps: true });

        let delegate = postRobot.send(win, `${POST_MESSAGE.DELEGATE}_${this.component.name}`, {

            context: this.context,

            options: {

                context: this.context,

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

        let overrides = this.driver.renderToParentOverrides;

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


    renderTo(win, element, context, options = {}) {
        return this.tryInit(() => {
            this.context = this.context || this.component.getRenderContext(element, context);

            this.validateRenderToParent(element, this.context);

            this.component.log(`render_${this.context}_to_win`, { element, context: this.context });

            this.delegate(win, this.context);

            return this.render(element, this.context);
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

            if (this.driver.destroyOnUnload) {
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
    loadUrl(url) {
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

                if (this.driver.allowResize && this.component.autoResize) {
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

    @promise
    resize(width, height) {
        this.component.log(`resize`, { height, width });
        this.driver.resize.call(this, width, height);

        if (this.elementTemplate || this.iframe) {

            let overflow;

            if (this.elementTemplate) {
                overflow = setOverflow(this.elementTemplate, 'hidden');
            }

            return elementStoppedMoving(this.elementTemplate || this.iframe).then(() => {

                if (overflow) {
                    overflow.reset();
                }
            });
        }
    }


    /*  Restyle
        -------

        Restyle the child component window
    */

    restyle() {
        return this.driver.restyle.call(this);
    }


    /*  Hide
        ----

        Hide the component and any parent template
    */

    hide() {

        if (this.parentTemplate) {
            this.parentTemplate.style.display = 'none';
        }

        return this.driver.hide.call(this);
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

            if (this.childExports && this.context === CONTEXT_TYPES.POPUP && !postRobot.winutil.isWindowClosed(win)) {
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
            addClass(this.parentTemplate, CLASS_NAMES.SHOW_CONTAINER);
            return showAndAnimate(this.parentTemplate, ANIMATION_NAMES.SHOW_CONTAINER);
        }
    }

    @memoize
    @promise
    showComponent() {
        if (this.elementTemplate) {
            addClass(this.elementTemplate, CLASS_NAMES.SHOW_COMPONENT);
            showAndAnimate(this.elementTemplate, ANIMATION_NAMES.SHOW_COMPONENT);
        }
    }

    @memoize
    @promise
    hideContainer() {
        if (this.parentTemplate) {

            addClass(this.parentTemplate, CLASS_NAMES.HIDE_CONTAINER);
            addClass(this.parentTemplate, CLASS_NAMES.LOADING);

            return animateAndHide(this.parentTemplate, ANIMATION_NAMES.HIDE_CONTAINER);
        }
    }

    @memoize
    @promise
    hideComponent() {

        if (this.parentTemplate) {
            addClass(this.parentTemplate, CLASS_NAMES.LOADING);
        }

        if (this.elementTemplate) {

            addClass(this.elementTemplate, CLASS_NAMES.HIDE_COMPONENT);
            addClass(this.parentTemplate, CLASS_NAMES.LOADING);

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
    openContainer() {
        return Promise.try(() => {

            if (!this.driver.parentTemplate) {
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

            this.parentTemplateFrame = iframe(null, {
                name: `__lightbox_container__${uniqueID()}__`,
                scrolling: 'no'
            }, document.body);

            this.parentTemplateFrame.style.display = 'block';
            this.parentTemplateFrame.style.position = 'fixed';
            this.parentTemplateFrame.style.top = '0';
            this.parentTemplateFrame.style.left = '0';
            this.parentTemplateFrame.style.width = '100%';
            this.parentTemplateFrame.style.height = '100%';
            this.parentTemplateFrame.style.zIndex = '2147483647';

            this.parentTemplateFrame.contentWindow.document.open();
            this.parentTemplateFrame.contentWindow.document.write(`<body></body>`);
            this.parentTemplateFrame.contentWindow.document.close();

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

            this.parentTemplateFrame.contentWindow.document.body.appendChild(this.parentTemplate);

            if (this.driver.renderedIntoParentTemplate) {
                this.elementTemplate = this.parentTemplate.getElementsByClassName(CLASS_NAMES.ELEMENT)[0];

                if (!this.elementTemplate) {
                    throw new Error('Could not find element to render component into');
                }

                hideElement(this.elementTemplate);
            }

            let eventHandlers = [];

            if (this.driver.focusable) {
                eventHandlers.push(addEventToClass(this.parentTemplate, CLASS_NAMES.FOCUS, EVENT_NAMES.CLICK, event => this.focus()));
            }

            eventHandlers.push(addEventToClass(this.parentTemplate, CLASS_NAMES.CLOSE, EVENT_NAMES.CLICK, event => this.userClose()));

            this.clean.register('destroyContainerEvents', () => {
                for (let eventHandler of eventHandlers) {
                    eventHandler.cancel();
                }
            });

            // let overflow = setOverflow(document.documentElement, 'hidden');

            this.clean.register('destroyParentTemplate', () => {

                document.body.removeChild(this.parentTemplateFrame);

                delete this.parentTemplateFrame;
                delete this.parentTemplate;

                // overflow.reset();
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

export function destroyAll() {
    let results = [];

    while (activeComponents.length) {
        results.push(activeComponents[0].destroy());
    }

    return Promise.all(results);
}
