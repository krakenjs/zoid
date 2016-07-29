
import $logger from 'beaver-logger/client';
import postRobot from 'post-robot/src';

import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';
import { BaseComponent } from '../base';
import { buildChildWindowName, isXComponentWindow } from '../window';
import { getParentWindow, noop, onCloseWindow, addEventListener, getParentNode, createElement, uniqueID, stringifyWithFunctions, capitalizeFirstLetter, hijackButton, addEventToClass, template, isWindowClosed, extend } from '../../lib';
import { POST_MESSAGE, CONTEXT_TYPES, CONTEXT_TYPES_LIST, MAX_Z_INDEX, CLASS_NAMES, EVENT_NAMES, CLOSE_REASONS } from '../../constants';
import { RENDER_DRIVERS } from './drivers';
import { validate, validateProps } from './validate';
import { propsToQuery } from './props';
import { normalizeParentProps } from './props';

let activeComponents = [];

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

        this.id = uniqueID();

        // Ensure the component is not loaded twice on the same page, if it is a singleton

        if (component.singleton && activeComponents.some(comp => comp.component === component)) {
            throw new Error(`${component.tag} is a singleton, and an only be instantiated once`);
        }

        activeComponents.push(this);

        this.registerForCleanup(() => {
            activeComponents.splice(activeComponents.indexOf(this), 1);
        });


        // Options passed during renderToParent. We would not ordinarily expect a user to pass these, since we depend on
        // them only when we're trying to render from a sibling to a sibling

        this.childWindowName = options.childWindowName || buildChildWindowName(this.component.name, {
            tag: this.component.tag,
            parent: window.name
        });

        this.setProps(options.props || {});

        this.component.log(`construct_parent`);


        // Set up promise for init

        this.onInit = new Promise();
    }


    /*  Set Props
        ---------

        Normalize props and generate the url we'll use to render the component
    */

    setProps(props) {
        validateProps(this.component, props);
        this.props = normalizeParentProps(this.component, this, props);
    }


    /*  Build Url
        ---------

        We build the props we're passed into the initial url. This means the component server-side can start rendering
        itself based on whatever props the merchant provides.
    */

    buildUrl() {
        return propsToQuery(this.component.props, this.props).then(queryString => {

            let url;

            if (this.props.url) {
                url = this.props.url;
            } else if (this.props.env) {
                url = this.component.envUrls[this.props.env];
            } else {
                url = this.component.url;
            }

            if (queryString) {

                let base;
                let query;
                let hash;

                [ base, hash ]  = url.split('#');
                [ base, query ] = base.split('?');

                if (query) {
                    query = `${query}&${queryString}`;
                } else {
                    query = queryString;
                }

                url = base;

                if (query) {
                    url = `${url}?${query}`;
                }

                if (hash) {
                    url = `${url}#${hash}`;
                }

                return url;
            }

            return url;
        });
    }


    /*  Update Props
        ------------

        Send new props down to the child
    */

    updateProps(props) {
        return Promise.resolve().then(() => {

            let oldProps = stringifyWithFunctions(this.props);

            this.setProps({
                ...this.props,
                ...props
            });

            if (!this.initialPropsSent) {
                return;
            }

            return this.onInit.then(() => {

                // Only send down the new props if they do not match the old, and if we have already sent down initial props

                if (oldProps !== stringifyWithFunctions(this.props)) {
                    this.component.log('parent_update_props');

                    return this.childExports.updateProps(this.props);
                }
            });
        });
    }


    /*  Get Render Context
        ------------------

        Determine the ideal context to render to, if unspecified by the user
    */

    getRenderContext(el, context) {

        if (el) {
            if (context && context !== CONTEXT_TYPES.IFRAME) {
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

    validateRender() {

        if (this.window) {
            throw new Error(`[${this.component.tag}] Can not render: component is already rendered`);
        }
    }


    /*  Render
        ------

        Kick off the actual rendering of the component:

        - open the popup/iframe
        - load the url into it
        - set up listeners
    */

    render(element, context) {
        return Promise.resolve().then(() => {
            context = this.getRenderContext(element, context);

            this.component.log(`render_${context}`, { context, element });

            this.preRender(element, context);

            return this.buildUrl();

        }).then(url => {

            this.loadUrl(context, url);
            this.runTimeout();

            return this.onInit;

        }).catch(err => {

            this.destroy();
            throw err;
        });
    }


    /*  Open
        ----

        Open a new window in the desired context
    */

    open(element, context) {

        context = this.getRenderContext(element, context);

        this.component.log(`open_${context}`, { element, windowName: this.childWindowName });

        RENDER_DRIVERS[context].open.call(this, element);
    }



    /*  Pre Open
        --------

        Pre-pen a new window in the desired context
    */

    preRender(element, context) {

        this.validateRender();
        context = this.getRenderContext(element, context);

        RENDER_DRIVERS[context].render.call(this, element);
        this.setForCleanup('context', context);

        this.createParentTemplate(context);

        this.open(element, context);

        this.watchForClose();
        this.createComponentTemplate();

        this.listen(this.window);
    }


    /*  Render to Parent
        ----------------

        Instruct the parent window to render our component for us -- so, for example, we can have a button component
        which opens a lightbox on the parent page, with a full template. Or, we could use this to render an iframe based
        modal on top of our existing iframe component, without having to expand out the size of our current iframe.
    */

    renderToParent(element, context, options = {}) {
        return Promise.resolve().then(() => {
            this.validateRender();

            context = this.getRenderContext(element, context);

            let parentWindow = getParentWindow();

            if (!parentWindow) {
                throw new Error(`[${this.component.tag}] Can not render to parent - no parent exists`);
            }

            if (!isXComponentWindow()) {
                throw new Error(`[${this.component.tag}] Can not render to parent - not in a child component window`);
            }

            this.component.log(`render_${context}_to_parent`, { element, context });

            // Set a new childWindowName to let it know it's going to be a sibling, not a direct child

            this.childWindowName = buildChildWindowName(this.component.name, {
                tag: this.component.tag,
                parent: window.name,
                sibling: 1
            });

            this.setForCleanup('context', context);

            // Do any specific stuff needed for particular contexts. For example -- for popups, we have no choice but to
            // open them from the child, since we depend on there being a click event to avoid the popup blocker.

            if (RENDER_DRIVERS[context].renderToParent) {
                RENDER_DRIVERS[context].renderToParent.call(this, element);
            }

            // Message the parent to instruct them on what to render and how. Since post-robot supports sending functions
            // across, we can pretty much just send all of our props over too without any problems

            return postRobot.sendToParent(POST_MESSAGE.RENDER, {

                // <3 ES6
                ...options,

                tag: this.component.tag,
                context,
                element,

                options: {
                    renderedToParent: true,
                    childWindowName: this.childWindowName,
                    props: this.props
                },

                overrides: {

                }

            }).then(data => {

                extend(this, data.overrides);

                // Luckily we're allowed to access any frames created by our parent window, so we can get a handle on the child component window.

                if (!this.window) {
                    this.setForCleanup('window', parentWindow.frames[this.childWindowName]);
                }

                return this;
            });
        });
    }

    /*  Watch For Close
        ---------------

        Watch for the child window closing, so we can cleanup.
        Also watch for this window changing location, so we can close the component.
    */

    watchForClose() {

        this.closeWindowListener = onCloseWindow(this.window, () => {
            this.component.log(`detect_close_child`);
            this.props.onClose(CLOSE_REASONS.CLOSE_DETECTED).finally(() => {
                this.destroy();
            });
        });

        // Our child has no way of knowing if we navigated off the page. So we have to listen for beforeunload
        // and close the child manually if that happens.

        this.unloadListener = addEventListener(window, 'beforeunload', () => {
            this.component.log(`navigate_away`);
            $logger.flush();

            if (this.context === CONTEXT_TYPES.POPUP) {
                this.destroy();
            }
        });

        this.registerForCleanup(() => {

            if (this.closeWindowListener) {
                this.closeWindowListener.cancel();
                delete this.closeWindowListener;
            }

            if (this.unloadListener) {
                this.unloadListener.cancel();
                delete this.unloadListener;
            }
        });
    }


    /*  Load Url
        --------

        Load url into the child window. This is separated out because it's quite common for us to have situations
        where opening the child window and loading the url happen at different points.
    */

    loadUrl(context, url) {
        this.component.log(`load_url`);
        postRobot.linkUrl(this.childWindowName, this.window, url);
        return RENDER_DRIVERS[context].loadUrl.call(this, url);
    }


    /*  Hijack Button
        -------------

        In this case, we don't actually know the final url for the component. The parent page might have a link or a form
        which points directly to our component url, or indirectly via a 302.

        So here, we listen for a click on the button or link, and hijack the target window. That way, we can be responsible
        for opening the window, listening for messages, etc. while the parent page is responsible only for generating the url
        to redirect to.

        This is necessary because in these cases, there's no way to accurately ascertain the url we're going to before
        we're redirected there -- so we let the parent redirect, but handle everything else involving the lifecycle of
        the component.

        This is a pretty esoteric case -- so if you need it, cool, otherwise you don't need to spend too much time
        worrying about it.
    */

    hijackButton(button, element, context) {

        this.component.log(`hijack_button`, { element });

        return new Promise((resolve, reject) => {

            hijackButton(button, (event, targetElement) => {
                this.renderHijack(targetElement, element, context).then(resolve, reject);
            });
        });
    }


    /*  Render Hijack
        -------------

        Do a normal render, with the exception that we don't load the url into the child since our hijacked link or button will do that for us
    */

    renderHijack(targetElement, element, context) {
        return Promise.resolve().then(() => {
            context = this.getRenderContext(element, context);

            this.component.log(`render_hijack_${context}`);

            targetElement.target = this.childWindowName;
            this.preRender(element, context);

            this.runTimeout();
            return this.onInit;

        }).catch(err => {

            this.destroy();
            throw err;
        });
    }


    /*  Hijack Submit Parent Form
        -------------------------

        This takes the 'hijack' case a little further, and allows hijacking to work even when the button is actually
        in a child component. So if the parent window has a form, and inside that form is a component, and inside that
        component is a button, this can be used to submit the parent form using the child button and hijack the resulting
        url into an xcomponent.

        This is, again, an esoteric case within an esoteric case -- so probably only consider using it if you're sure you want to.
    */

    hijackSubmitParentForm(element, context) {

        context = this.getRenderContext(element, context);

        this.component.log(`hijack_submit_parent_form_${context}`);

        return this.renderToParent(element, context, {
            hijackSubmitParentForm: true
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

                    this.setForCleanup('initialPropsSent', true);

                    // Let the child know what its context is, and what its initial props are.

                    return {
                        context: this.context,
                        props: this.props
                    };
                });
            },


            // The child has requested that we close it. Since lightboxes and iframes can't close themselves, we need
            // this logic to exist in the parent window

            [ POST_MESSAGE.CLOSE ](source, data) {
                this.close(data.reason);
            },

            // We got a request to render from the child (renderToParent)

            [ POST_MESSAGE.RENDER ](source, data) {

                let component = this.component.getByTag(data.tag);
                let instance  = component.parent(data.options);

                extend(instance, data.overrides);

                this.registerForCleanup(() => {
                    instance.destroy();
                });

                return Promise.resolve().then(() => {

                    if (data.hijackSubmitParentForm) {

                        let form = getParentNode(this.iframe, 'form');

                        // Open the window and do everything except load the url

                        let promise = instance.renderHijack(form, data.element, data.context);

                        // Submit the form to load the url into the new window

                        form.submit();

                        return promise;

                    } else {

                        return instance.render(data.element, data.context);
                    }
                }).then(() => {

                    return {
                        overrides: {
                            childExports: instance.childExports,
                            close: reason => instance.close(reason)
                        }
                    };
                });
            },


            // Iframes can't resize themselves, so they need the parent to take care of it for them.

            [ POST_MESSAGE.RESIZE ](source, data) {

                if (this.context === CONTEXT_TYPES.POPUP) {
                    return;
                }

                return this.resize(data.width, data.height);
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
        return RENDER_DRIVERS[this.context].resize.call(this, width, height);
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

    close(reason = CLOSE_REASONS.PARENT_CALL) {

        if (this.closePromise) {
            return this.closePromise;
        }

        this.component.log(`close`);

        if (this.closeWindowListener) {
            this.closeWindowListener.cancel();
        }

        if (this.unloadListener) {
            this.unloadListener.cancel();
        }

        if (this.parentTemplate) {
            this.parentTemplate.className += ` ${CLASS_NAMES.CLOSING}`;

            if (this.component.autocloseParentTemplate) {
                this.parentTemplate.className += ` ${CLASS_NAMES.AUTOCLOSE}`;
            }
        }

        let closePromise = this.props.onClose(reason).then(() => {

            return new Promise(resolve => {

                if (this.component.closeDelay && this.context !== CONTEXT_TYPES.POPUP) {
                    setTimeout(resolve, this.component.closeDelay);
                } else {
                    resolve();
                }

            }).then(() => {

                if (this.childExports && !isWindowClosed(this.window)) {
                    this.childExports.close().catch(noop);
                }

                this.destroy();
            });
        });

        this.setForCleanup('closePromise', closePromise);

        return closePromise;
    }


    /*  Focus
        -----

        Focus the child component window
    */

    focus() {

        this.component.log(`focus`);

        if (this.window) {
            this.window.focus();
        }
    }


    /*  Create Component Template
        -------------------------

        Creates an initial template and stylesheet which are loaded into the child window, to be displayed before the url is loaded
    */

    createComponentTemplate() {

        let componentTemplate = this.component.componentTemplate instanceof Function ? this.component.componentTemplate() : this.component.componentTemplate;

        let html = template(componentTemplate, {
            id: `${CLASS_NAMES.XCOMPONENT}-${this.id}`,
            CLASS: CLASS_NAMES
        });

        try {
            this.window.document.open();
            this.window.document.write(html);
            this.window.document.close();
        } catch (err) {
            try {
                this.window.location = `javascript: document.open(); document.write(JSON.stringify(html)); document.close();`;
            } catch (err2) {
                // pass
            }
        }
    }


    /*  Create Parent Template
        ----------------------

        Create a template and stylesheet for the parent template behind the popup/lightbox
    */

    createParentTemplate(context) {

        if (!RENDER_DRIVERS[context].parentTemplate) {
            return;
        }

        let parentTemplate = this.component.parentTemplate instanceof Function ? this.component.parentTemplate() : this.component.parentTemplate;

        this.parentTemplate = createElement('div', {

            html: template(parentTemplate, {
                id: `${CLASS_NAMES.XCOMPONENT}-${this.id}`,
                CLASS: CLASS_NAMES
            }),

            attributes: {
                id: `${CLASS_NAMES.XCOMPONENT}-${this.id}`
            },

            class: [
                CLASS_NAMES.XCOMPONENT,
                `${CLASS_NAMES.XCOMPONENT}-${this.context}`
            ],

            style: {
                zIndex: MAX_Z_INDEX - 1
            }

        }, document.body);

        addEventToClass(this.parentTemplate, CLASS_NAMES.FOCUS, EVENT_NAMES.CLICK, event =>  this.focus());
        addEventToClass(this.parentTemplate, CLASS_NAMES.CLOSE, EVENT_NAMES.CLICK, event => this.close(CLOSE_REASONS.TEMPLATE_BUTTON));

        this.registerForCleanup(() => {
            if (this.component.autocloseParentTemplate && this.parentTemplate) {
                this.closeParentTemplate();
            }
        });
    }


    closeParentTemplate() {
        if (this.parentTemplate) {
            document.body.removeChild(this.parentTemplate);
            delete this.parentTemplate;
        }
    }


    /*  Destroy
        -------

        Close the component and clean up any listeners and state
    */

    destroy() {
        if (this.hasCleanupTasks()) {
            this.component.log(`destroy`);
            this.cleanup();
        }
    }


    /*  Error
        -----

        Handle an error
    */

    error(err) {
        this.component.logError(`error`, { error: err.stack || err.toString() });
        this.onInit.reject(err);
        return this.props.onError(err);
    }
}


/*  Generate Render Methods
    -----------------------

    Autogenerate methods like renderIframe, renderPopupToParent, hijackButtonToLightbox
*/

for (let context of CONTEXT_TYPES_LIST) {

    let contextName = capitalizeFirstLetter(context);

    ParentComponent.prototype[`render${contextName}`] = function(element) {
        return this.render(element, context);
    };

    ParentComponent.prototype[`render${contextName}ToParent`] = function(element) {
        return this.renderToParent(element, context);
    };

    ParentComponent.prototype[`hijackButtonTo${contextName}`] = function(button, element) {
        return this.hijackButton(button, element, context);
    };
}