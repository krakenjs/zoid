
import postRobot from 'post-robot/src';
import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';
import { BaseComponent } from '../base';
import { buildChildWindowName } from '../window';
import { getParentWindow, onCloseWindow, addEventListener, getParentNode, createElement, uniqueID, stringifyWithFunctions, capitalizeFirstLetter, hijackButton, addEventToClass, template } from '../../lib';
import { POST_MESSAGE, CONTEXT_TYPES, MAX_Z_INDEX, CLASS_NAMES, EVENT_NAMES } from '../../constants';
import { RENDER_DRIVERS } from './drivers';
import { validate, validateProps } from './validate';
import { propsToQuery, normalizeProps } from './props';

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

        this.setProps(options.props || {});


        // Options passed during renderToParent. We would not ordinarily expect a user to pass these, since we depend on
        // them only when we're trying to render from a sibling to a sibling

        this.childWindowName = options.childWindowName || buildChildWindowName({
            parent: window.name,
            id: this.id,
            tag: this.component.tag
        });

        // Set up promise for init

        this.onInit = new Promise();
    }


    /*  Set Props
        ---------

        Normalize props and generate the url we'll use to render the component
    */

    setProps(props) {
        validateProps(this.component, props);
        this.props = normalizeProps(this.component, this, props);
    }


    /*  Build Url
        ---------

        We build the props we're passed into the initial url. This means the component server-side can start rendering
        itself based on whatever props the merchant provides.
    */

    buildUrl() {

        let url;

        if (this.props.url) {
            url = this.props.url;
        } else if (this.props.env) {
            url = this.component.envUrls[this.props.env];
        } else {
            url = this.component.url;
        }

        let queryString = propsToQuery(this.component.props, this.props);

        if (queryString) {
            url = `${ url }${ url.indexOf('?') === -1 ? '?' : '&' }${ queryString }`;
        }

        return url;
    }


    /*  Update Props
        ------------

        Send new props down to the child
    */

    updateProps(props) {
        validateProps(this.component, props);

        // Wait for init to complete successfully

        return this.onInit.then(() => {

            let oldProps = stringifyWithFunctions(this.props);

            let newProps = {
                ...this.props,
                ...props
            };

            this.setProps(newProps);

            // Only send down the new props if they do not match the old

            if (this.window && oldProps !== stringifyWithFunctions(this.props)) {
                return postRobot.send(this.window, POST_MESSAGE.PROPS, {
                    props: this.props
                });
            }
        });
    }


    /*  Get Render Context
        ------------------

        Determine the ideal context to render to, if unspecified by the user
    */

    getRenderContext(el) {

        if (el) {
            if (!this.component.contexts[CONTEXT_TYPES.IFRAME]) {
                throw new Error(`[${this.component.tag}] Iframe context not allowed`);
            }

            return CONTEXT_TYPES.IFRAME;
        }

        if (this.component.defaultContext) {
            return this.component.defaultContext;
        }

        for (let context of [ CONTEXT_TYPES.LIGHTBOX, CONTEXT_TYPES.POPUP ]) {
            if (this.component.contexts[context]) {
                return context;
            }
        }

        throw new Error(`[${this.component.tag}] No context options available for render`);
    }


    /*  Validate Render
        ---------------

        Ensure there is no reason we can't render
    */

    validateRender(context) {

        if (this.window) {
            throw new Error(`[${this.component.tag}] Can not render: component is already rendered`);
        }

        if (context && !this.component.contexts[context]) {
            throw new Error(`Invalid context: ${context}`);
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

            this.validateRender(context);

            context = context || this.getRenderContext(element);

            if (RENDER_DRIVERS[context].render) {
                RENDER_DRIVERS[context].render.call(this, element);
            }

            this.setForCleanup('context', context);

            if (RENDER_DRIVERS[context].overlay) {
                this.createParentTemplate();
            }

            this.open(element, context);
            this.listen(this.window);
            this.loadUrl(this.buildUrl());
            this.runTimeout();

            this.watchForClose();

            return this.onInit;
        });
    }


    /*  Open
        ----

        Open a new window in the desired context
    */

    open(element, context) {

        RENDER_DRIVERS[context].open.call(this, element);

        this.watchForClose();
        this.createComponentTemplate();
    }


    /*  Render to Parent
        ----------------

        Instruct the parent window to render our component for us -- so, for example, we can have a button component
        which opens a lightbox on the parent page, with a full overlay. Or, we could use this to render an iframe based
        modal on top of our existing iframe component, without having to expand out the size of our current iframe.
    */

    renderToParent(element, context, options = {}) {
        return Promise.resolve().then(() => {

            this.validateRender(context);

            context = context || this.getRenderContext(element);

            if (!getParentWindow()) {
                throw new Error(`[${this.component.tag}] Can not render to parent - no parent exists`);
            }

            if (!window.name) {
                throw new Error(`[${this.component.tag}] Can not render to parent - not in a child component window`);
            }

            // Set a new childWindowName to let it know it's going to be a sibling, not a direct child

            this.childWindowName = buildChildWindowName({
                id: this.id,
                parent: window.name,
                sibling: true,
                tag: this.component.tag
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
                    props: this.props,

                    childWindowName: this.childWindowName
                }

            }).then(data => {

                // Luckily we're allowed to access any frames created by our parent window, so we can get a handle on the child component window.

                if (!this.window) {
                    this.setForCleanup('window', getParentWindow().frames[this.childWindowName]);
                }

                // We don't want to proxy all of our messages through the parent window. Instead we'll just listen directly for
                // messages on the sibling window, since we have a handle on it.

                this.listen(this.window);

                this.watchForClose();

                return this.onInit;
            });
        });
    }

    /*  Watch For Close
        ---------------

        Watch for the child window closing, so we can cleanup.
        Also watch for this window changing location, so we can close the component.
    */

    watchForClose() {

        let closeWindowListener = onCloseWindow(this.window, () => {
            this.props.onClose();
            this.destroy();
        });

        // Our child has no way of knowing if we navigated off the page. So we have to listen for beforeunload
        // and close the child manually if that happens.

        let unloadListener = addEventListener(window, 'beforeunload', () => {
            if (this.context === CONTEXT_TYPES.POPUP) {
                this.window.close();
            }
        });

        this.registerForCleanup(() => {
            closeWindowListener.cancel();
            unloadListener.cancel();
        });
    }


    /*  Load Url
        --------

        Load url into the child window. This is separated out because it's quite common for us to have situations
        where opening the child window and loading the url happen at different points.
    */

    loadUrl(url) {
        return RENDER_DRIVERS[this.context].loadUrl.call(this, url);
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

    hijackButton(element, context = CONTEXT_TYPES.LIGHTBOX) {

        hijackButton(element, (event, targetElement) => {

            if (this.window) {
                event.preventDefault();
                throw new Error(`[${this.component.tag}] Component is already rendered`);
            }

            // Open the window to render into

            this.renderHijack(targetElement, context);
        });

        return this;
    }


    /*  Render Hijack
        -------------

        Do a normal render, with the exception that we don't load the url into the child since our hijacked link or button will do that for us
    */

    renderHijack(el, context = CONTEXT_TYPES.LIGHTBOX) {
        return Promise.resolve().then(() => {

            this.validateRender(context);

            this.setForCleanup('context', context);

            // Point the element to open in our child window

            el.target = this.childWindowName;

            if (RENDER_DRIVERS[context].overlay) {
                this.createParentTemplate();
            }

            // Immediately open the window, but don't try to set the url -- this will be done by the browser using the form action or link href

            this.open(null, context);

            // Do everything else the same way -- listen for events, render the overlay, etc.

            this.listen(this.window);
            this.runTimeout();

            return this.onInit;
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

    hijackSubmitParentForm() {
        return this.renderToParent(null, CONTEXT_TYPES.POPUP, {
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
                    this.props.onTimeout(err);
                    this.destroy();
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
                this.props.onEnter();
                this.onInit.resolve(this);

                // Let the child know what its context is, and what its initial props are.

                return {
                    context: this.context,
                    props: this.props
                };
            },


            // The child has requested that we close it. Since lightboxes and iframes can't close themselves, we need
            // this logic to exist in the parent window

            [ POST_MESSAGE.CLOSE ](source, data) {

                this.close();
            },

            // We got a request to render from the child (renderToParent)

            [ POST_MESSAGE.RENDER ](source, data) {

                let component = this.component.getByTag(data.tag);
                let instance  = component.parent(data.options);

                // In the case where we're submitting the parent form using hijackSubmitParentForm

                if (data.hijackSubmitParentForm) {

                    let form = getParentNode(this.iframe, 'form');

                    // Open the window and do everything except load the url

                    instance.renderHijack(form, data.context);

                    // Submit the form to load the url into the new window

                    form.submit();
                }

                // Otherwise we're just doing a normal render on behalf of the child

                else {
                    instance.render(data.element, data.context);
                }
            },


            // Iframes can't resize themselves, so they need the parent to take care of it for them.

            [ POST_MESSAGE.RESIZE ](source, data) {

                if (this.context === CONTEXT_TYPES.POPUP) {
                    return;
                }

                return this.resize(data.width, data.height);
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

    resize(height, width) {
        if (this.iframe) {
            this.iframe.height = height;
            this.iframe.width = width;
        }
    }


    /*  Close
        -----

        Close the child component
    */

    close() {

        // We send a post message to the child to close. This has two effects:
        // 1. We let the child do any cleanup it needs to do
        // 2. We let the child message its actual parent to close it, which we can't do here if it's a renderToParent

        this.props.onClose();

        return postRobot.send(this.window, POST_MESSAGE.CLOSE).catch(err => {

            // If we get an error, log it as a warning, but don't error out

            console.warn(`Error sending message to child`, err.stack || err.toString());

        }).then(() => {

            // Whatever happens, we'll destroy the child window

            this.destroy();
        });
    }


    /*  Focus
        -----

        Focus the child component window
    */

    focus() {
        if (this.window) {
            this.window.focus();
        }
        return this;
    }


    /*  Create Component Template
        -------------------------

        Creates an initial template and stylesheet which are loaded into the child window, to be displayed before the url is loaded
    */

    createComponentTemplate() {

        createElement('body', {
            html: template(this.component.componentTemplate, {
                id: `${CLASS_NAMES.XCOMPONENT}-${this.id}`,
                CLASS: CLASS_NAMES
            }),
            class: [ CLASS_NAMES.XCOMPONENT ]
        }, this.window.document.body);
    }


    /*  Create Parent Template
        ----------------------

        Create a template and stylesheet for the overlay behind the popup/lightbox
    */

    createParentTemplate() {

        this.parentTemplate = createElement('div', {

            html: template(this.component.parentTemplate, {
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
        addEventToClass(this.parentTemplate, CLASS_NAMES.CLOSE, EVENT_NAMES.CLICK, event => this.close());

        this.registerForCleanup(() => {
            document.body.removeChild(this.parentTemplate);
            delete this.parentTemplate;
        });
    }


    /*  Destroy
        -------

        Close the component and clean up any listeners and state
    */

    destroy() {
        this.cleanup();
    }


    /*  Error
        -----

        Handle an error
    */

    error(err) {
        this.onInit.reject(err);
        this.props.onError(err);
        this.destroy();
    }
}


/*  Generate Render Methods
    -----------------------

    Autogenerate methods like renderIframe, renderPopupToParent, hijackButtonToLightbox
*/

[ CONTEXT_TYPES.IFRAME, CONTEXT_TYPES.LIGHTBOX, CONTEXT_TYPES.POPUP ].forEach(context => {

    let contextName = capitalizeFirstLetter(context);

    ParentComponent.prototype[`render${contextName}`] = function(element) {
        return this.render(element, context);
    };

    ParentComponent.prototype[`render${contextName}ToParent`] = function(element) {
        return this.renderToParent(element, context);
    };

    ParentComponent.prototype[`hijackButtonTo${contextName}`] = function(element) {
        return this.hijackButton(element, context);
    };
});