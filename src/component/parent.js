
import postRobot from 'post-robot/src';
import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';
import { BaseComponent } from './base';
import { urlEncode, popup, noop, extend, pop, getElement, getParentWindow, once, iframe, onCloseWindow, getParentNode, denodeify } from '../util';
import { CONSTANTS, CONTEXT_TYPES, MAX_Z_INDEX } from '../constants';
import { PopupOpenError } from '../error';

let activeComponents = [];

let RENDER_DRIVERS = {

    [ CONTEXT_TYPES.IFRAME ]: {

        render(element) {

            if (!this.component.contexts[CONTEXT_TYPES.IFRAME]) {
                throw new Error(`Invalid context: ${CONTEXT_TYPES.IFRAME}`);
            }

            if (this.window) {
                throw new Error(`[${this.component.tag}] Component is already rendered`);
            }

            this.openIframe(element);
            this.listen(this.window);
            this.loadUrl(this.url);
            this.runTimeout();

            return this;
        },

        open(element) {

            if (this.window) {
                throw new Error(`[${this.component.tag}] Component is already rendered`);
            }

            this.iframe = iframe(element, null, {
                name: this.childWindowName,
                width: this.component.dimensions.width,
                height: this.component.dimensions.height
            });

            this.context = CONSTANTS.CONTEXT.IFRAME;
            this.window = this.iframe.contentWindow;

            this.watchForClose();

            return this;
        },

        renderToParent(el) {

            if (this.window) {
                throw new Error(`[${this.component.tag}] Component is already rendered`);
            }

            return this.renderToParent(el, CONTEXT_TYPES.IFRAME);
        }
    },

    [ CONTEXT_TYPES.POPUP ]: {

        render() {

            if (!this.component.contexts[CONTEXT_TYPES.POPUP]) {
                throw new Error(`Invalid context: ${CONTEXT_TYPES.POPUP}`);
            }

            if (this.window) {
                throw new Error(`[${this.component.tag}] Component is already rendered`);
            }

            this.openPopup();
            this.listen(this.window);
            this.loadUrl(this.url);
            this.runTimeout();

            this.createOverlay();

            return this;
        },

        open() {

            if (this.window) {
                throw new Error(`[${this.component.tag}] Component is already rendered`);
            }

            let pos = this.getPosition();

            this.popup = popup('about:blank', {
                name: this.childWindowName,
                width: this.component.dimensions.width,
                height: this.component.dimensions.height,
                top: pos.y,
                left: pos.x
            });

            if (!this.popup || this.popup.closed || typeof this.popup.closed === 'undefined') {
                throw new PopupOpenError(`[${this.component.tag}] Can not open popup window - blocked`);
            }

            this.context = CONSTANTS.CONTEXT.POPUP;
            this.window = this.popup;

            this.watchForClose();

            return this;
        },

        renderToParent() {

            if (this.window) {
                throw new Error(`[${this.component.tag}] Component is already rendered`);
            }

            this.childWindowName = this.getChildWindowName({ proxy: true });

            this.openPopup();

            return this.renderToParent(null, CONTEXT_TYPES.POPUP);
        }
    },

    [ CONTEXT_TYPES.LIGHTBOX ]: {

        render() {

            if (!this.component.contexts[CONTEXT_TYPES.LIGHTBOX]) {
                throw new Error(`Invalid context: ${CONTEXT_TYPES.LIGHTBOX}`);
            }

            this.openLightbox();
            this.listen(this.window);
            this.loadUrl(this.url);
            this.runTimeout();

            this.createOverlay();

            return this;
        },

        open() {

            this.openIframe(document.body);

            let pos = this.getPosition();

            this.iframe.style.zIndex = MAX_Z_INDEX;
            this.iframe.style.position = 'absolute';
            this.iframe.style.left = pos.x;
            this.iframe.style.top = pos.y;
            this.iframe.style.borderRadius = '10px';

            return this;
        },

        renderToParent() {

            if (this.window) {
                throw new Error(`[${this.component.tag}] Component is already rendered`);
            }

            return this.renderToParent(null, CONTEXT_TYPES.LIGHTBOX);
        }
    }
};


export class ParentComponent extends BaseComponent {

    constructor(component, options = {}) {
        super(component, options);

        this.component = component;

        this.validate(options);

        this.screenWidth = options.screenWidth || window.outerWidth;
        this.screenHeight = options.screenHeight || window.outerHeight;

        if (component.singleton && activeComponents.some(comp => comp.component === component)) {
            throw new Error(`${component.tag} is a singleton, and an only be instantiated once`);
        }

        this.parentWindow = getParentWindow();

        this.childWindowName = options.childWindowName || this.getChildWindowName();

        activeComponents.push(this);

        options.props = options.props || {};
        this.setProps(options.props);

        this.onEnter   = options.onEnter || noop;
        this.onExit    = once(options.onExit    || noop);
        this.onClose   = once(options.onClose   || options.onError || noop);
        this.onError   = once(options.onError   || noop);
        this.onTimeout = once(options.onTimeout || options.onError || noop);

        this.timeout = options.timeout;
    }

    setProps(props) {
        this.validateProps(props);
        this.props = this.normalizeProps(props);
        this.queryString = this.propsToQuery(this.props);
        this.url = this.component.url;
        if (this.queryString) {
            this.url = `${ this.url }${ this.component.url.indexOf('?') === -1 ? '?' : '&' }${ this.queryString }`;
        }
    }

    updateProps(props) {
        return Promise.resolve().then(() => {

            let oldProps = JSON.stringify(this.props);

            let newProps = {};
            extend(newProps, this.props);
            extend(newProps, props);

            this.setProps(newProps);

            if (this.window && oldProps !== JSON.stringify(this.props)) {
                return postRobot.send(this.window, CONSTANTS.POST_MESSAGE.PROPS, {
                    props: this.props
                });
            }
        });
    }

    validate(options) {

        if (options.timeout && !(typeof options.timeout === 'number')) {
            throw new Error(`[${this.component.tag}] Expected options.timeout to be a number: ${options.timeout}`);
        }

        if (options.container && !this.component.context.iframe) {
            throw new Error(`[${this.component.tag}] Can not render to a container: does not support iframe mode`);
        }
    }

    validateProps(props) {

        for (let key of Object.keys(this.component.props)) {

            let prop = this.component.props[key];
            let value = props[key];

            let hasProp = props.hasOwnProperty(key) && value !== null && value !== undefined && value !== '';

            if (!hasProp) {

                if (prop.required !== false) {
                    throw new Error(`[${this.component.tag}] Prop is required: ${key}`);
                }

                continue;
            }

            if (prop.type === 'function') {

                if (!(value instanceof Function)) {
                    throw new Error(`[${this.component.tag}] Prop is not of type function: ${key}`);
                }

            } else if (prop.type === 'string') {

                if (typeof value !== 'string') {
                    throw new Error(`[${this.component.tag}] Prop is not of type string: ${key}`);
                }

            } else if (prop.type === 'object') {

                try {
                    JSON.stringify(value);
                } catch (err) {
                    throw new Error(`[${this.component.tag}] Unable to serialize prop: ${key}`);
                }

            } else if (prop.type === 'number') {

                if (isNaN(parseInt(value, 10))) {
                    throw new Error(`[${this.component.tag}] Prop is not a number: ${key}`);
                }
            }
        }
    }

    normalizeProps(props) {

        props = props || {};
        let result = {};

        for (let key of Object.keys(this.component.props)) {

            let prop = this.component.props[key];
            let value = props[key];

            let hasProp = props.hasOwnProperty(key) && value !== null && value !== undefined && value !== '';

            if (!hasProp && prop.def) {
                value = (prop.def instanceof Function && prop.type !== 'function') ? prop.def() : prop.def;
            }

            if (prop.type === 'boolean') {
                result[key] = Boolean(value);

            } else if (prop.type === 'function') {

                if (!value) {

                    if (prop.noop) {
                        value = noop;
                    }

                } else {

                    if (prop.denodeify) {
                        value = denodeify(value);
                    }

                    if (prop.once) {
                        value = once(value);
                    }
                }

                result[key] = value;

            } else if (prop.type === 'string') {
                result[key] = value || '';

            } else if (prop.type === 'object') {
                result[key] = JSON.stringify(value);

            } else if (prop.type === 'number') {
                result[key] = parseInt(value || 0, 10);
            }
        }

        return result;
    }

    propsToQuery(props) {

        return Object.keys(props).map(key => {

            let value = props[key];

            if (!value) {
                return '';
            }

            let result;

            if (typeof value === 'boolean') {
                result = '1';
            } else if (typeof value === 'string') {
                result = value;
            } else if (typeof value === 'function') {
                return;
            } else if (typeof value === 'object') {
                result = JSON.stringify(value);
            }

            return `${urlEncode(key)}=${urlEncode(result)}`;

        }).filter(Boolean).join('&');
    }

    getPosition() {

        let pos = {};
        let dimensions = this.component.dimensions;

        if (typeof dimensions.x === 'number') {
            pos.x = dimensions.x;
        } else {
            let width = this.screenWidth;

            if (width <= dimensions.width) {
                pos.x = 0;
            } else {
                pos.x = Math.floor((width / 2) - (dimensions.width / 2));
            }
        }

        if (typeof dimensions.y === 'number') {
            pos.y = dimensions.y;
        } else {

            let height = this.screenHeight;

            if (height <= dimensions.height) {
                pos.y = 0;
            } else {
                pos.y = Math.floor((height / 2) - (dimensions.height / 2));
            }
        }

        return pos;
    }

    getRenderContext(el) {

        if (el && this.component.contexts[CONTEXT_TYPES.IFRAME]) {
            return CONTEXT_TYPES.IFRAME;
        }

        if (this.component.defaultContext) {

            if (this.component.defaultContext === CONTEXT_TYPES.LIGHTBOX) {
                return CONTEXT_TYPES.LIGHTBOX;
            }

            if (this.component.defaultContext === CONTEXT_TYPES.POPUP) {
                return CONTEXT_TYPES.POPUP;
            }
        }

        if (this.component.contexts[CONTEXT_TYPES.LIGHTBOX]) {
            return CONTEXT_TYPES.LIGHTBOX;

        }

        if (this.component.contexts[CONTEXT_TYPES.POPUP]) {
            return CONTEXT_TYPES.POPUP;
        }
    }





    render(element, renderContext) {

        renderContext = renderContext || this.getRenderContext(element);

        for (let context of [ renderContext, CONTEXT_TYPES.POPUP, CONTEXT_TYPES.IFRAME, CONTEXT_TYPES.LIGHTBOX ]) {

            if (!context) {
                continue;
            }

            try {
                return RENDER_DRIVERS[context].render.call(this, element);
            } catch (err) {

                if (err instanceof PopupOpenError) {
                    continue;
                }

                throw err;
            }
        }

        throw new Error(`[${this.component.tag}] No context options available for render`);
    }

    renderToParent(element, renderContext) {

        renderContext = renderContext || this.getRenderContext(element);

        if (!this.component.contexts[renderContext]) {
            throw new Error(`Invalid context: ${renderContext}`);
        }

        if (!this.parentWindow) {
            throw new Error(`[${this.component.tag}] Can not render to parent - no parent exists`);
        }

        if (!window.name) {
            throw new Error(`[${this.component.tag}] Can not render to parent - not in a child component window`);
        }

        return postRobot.sendToParent(CONSTANTS.POST_MESSAGE.RENDER, {
            tag: this.component.tag,
            context: renderContext,
            element: element,
            options: {
                props:                     this.props,
                childWindowName:           this.childWindowName,
                parentComponentWindowName: window.name,
                screenWidth:               this.screenWidth,
                screenHeight:              this.screenHeight
            }

        }).then(data => {

            if (!this.window) {
                this.window = this.parentWindow.frames[this.childWindowName];
            }

            this.listen(this.window);
        });
    }

    renderIframe(element) {
        return this.render(element, CONTEXT_TYPES.IFRAME);
    }

    openIframe(element) {
        return RENDER_DRIVERS[CONTEXT_TYPES.IFRAME].open.call(this, element);
    }

    renderIframeToParent(element) {
        return RENDER_DRIVERS[CONTEXT_TYPES.IFRAME].renderToParent.call(this, element);
    }

    renderLightbox() {
        return this.render(null, CONTEXT_TYPES.LIGHTBOX);
    }

    openLightbox() {
        return RENDER_DRIVERS[CONTEXT_TYPES.LIGHTBOX].open.call(this);
    }

    renderLightboxToParent() {
        return RENDER_DRIVERS[CONTEXT_TYPES.LIGHTBOX].renderToParent.call(this);
    }

    renderPopup() {
        return this.render(null, CONTEXT_TYPES.POPUP);
    }

    openPopup() {
        return RENDER_DRIVERS[CONTEXT_TYPES.POPUP].open.call(this);
    }

    renderPopupToParent() {
        return RENDER_DRIVERS[CONTEXT_TYPES.POPUP].renderToParent.call(this);
    }















    watchForClose() {

        onCloseWindow(this.window, () => {
            this.onClose(new Error(`[${this.component.tag}] ${this.context} was closed`));
            this.destroy();
        });

        window.addEventListener('beforeunload', () => {
            if (this.popup) {
                this.popup.close();
            }
        });
    }

    loadUrl(url) {

        if (this.popup) {
            this.popup.location = url;
        } else if (this.iframe) {
            this.iframe.src = url;
        }
    }

    hijackToPopup(el) {
        return this.hijack(el, CONTEXT_TYPES.POPUP);
    }

    hijackToLightbox(el) {
        return this.hijack(el, CONTEXT_TYPES.LIGHTBOX);
    }

    hijack(el, context = CONTEXT_TYPES.LIGHTBOX) {
        el = getElement(el);

        let isButton = el.tagName.toLowerCase() === 'button' || (el.tagName.toLowerCase() === 'input' && el.type === 'submit');
        let form;

        if (isButton) {
            form = getParentNode(el, 'form');
        }

        el.addEventListener('click', event => {

            if (this.window) {
                event.preventDefault();
                throw new Error(`[${this.component.tag}] Component is already rendered`);
            }

            RENDER_DRIVERS[context].open.call(this);

            if (isButton && form) {
                form.target = this.childWindowName;
            } else {
                el.target = this.childWindowName;
            }

            this.listen(this.window);
        });

        return this;
    }

    runTimeout() {

        if (this.timeout) {
            setTimeout(() => {
                if (!this.entered) {
                    this.onTimeout.call(this, new Error(`[${this.component.tag}] Loading component ${this.component.tag} at ${this.url} timed out after ${this.timeout} milliseconds`));
                    this.destroy();
                }
            }, this.timeout);
        }
    }

    listeners() {
        return {
            [ CONSTANTS.POST_MESSAGE.INIT ](source, data) {
                this.onEnter.call(this);
                this.entered = true;

                return {
                    context: this.context,
                    props: this.props
                };
            },

            [ CONSTANTS.POST_MESSAGE.CLOSE ](source, data) {
                this.destroy();
            },

            [ CONSTANTS.POST_MESSAGE.RESIZE ](source, data) {

                if (this.context === CONSTANTS.CONTEXT.POPUP) {
                    throw new Error(`[${this.component.tag}] Can not resize popup from parent`);
                }

                return this.resize(data.width, data.height);
            },

            [ CONSTANTS.POST_MESSAGE.RENDER ](source, data) {
                let component = this.component.getByTag(data.tag);
                component.init(data.options).render(data.element, data.context);
            },

            [ CONSTANTS.POST_MESSAGE.ERROR ](source, data) {
                this.destroy();
                this.onError(new Error(data.error));
            }
        };
    }

    close() {
        return postRobot.send(this.window, CONSTANTS.POST_MESSAGE.CLOSE).catch(err => {
            console.warn('Error sending close message to child', err.stack || err.toString());
            this.destroy();
        });
    }

    focus() {
        if (this.popup) {
            this.popup.focus();
        }
        return this;
    }

    resize(height, width) {
        return Promise.resolve().then(() => {

            if (this.context === CONSTANTS.CONTEXT.POPUP) {
                return postRobot.send(this.popup, CONSTANTS.POST_MESSAGE.RESIZE, {
                    height,
                    width
                });

            } else if (this.context === CONSTANTS.CONTEXT.IFRAME) {

                this.iframe.height = height;
                this.iframe.width = width;
            }
        });
    }

    createOverlay() {

        this.overlay = document.createElement('div');
        this.overlay.style.zIndex = MAX_Z_INDEX - 1;
        this.overlay.innerHTML = this.component.overlayTemplate;
        this.overlay.className = `xcomponent-overlay xcomponent-${this.context}`;

        this.overlayStyle = document.createElement('style');
        this.overlayStyle.setAttribute('type', 'text/css');
        if (this.overlayStyle.styleSheet) {
            this.overlayStyle.styleSheet.cssText = this.component.overlayStyle;
        } else {
            this.overlayStyle.appendChild(document.createTextNode(this.component.overlayStyle));
        }

        document.body.appendChild(this.overlay);
        document.head.appendChild(this.overlayStyle);

        this.overlay.addEventListener('click', event => {
            event.preventDefault();
            event.stopPropagation();
            this.focus();
        });

        Array.prototype.slice.call(this.overlay.getElementsByClassName('xcomponent-close')).forEach(el => {
            el.addEventListener('click', event => {
                event.preventDefault();
                event.stopPropagation();
                this.close();
            });
        });
    }

    destroy() {

        if (this.popup) {
            this.popup.close();
        } else if (this.iframe && this.iframe.parentNode) {
            this.iframe.parentNode.removeChild(this.iframe);
        }

        delete this.window;
        delete this.popup;
        delete this.iframe;

        this.cleanupListeners();

        if (this.overlay) {
            document.body.removeChild(this.overlay);
            delete this.overlay;
        }

        if (this.overlayStyle) {
            document.head.removeChild(this.overlayStyle);
            delete this.overlayStyle;
        }
    }

}

export const internalProps = {

    onEnter: {
        type: 'function',
        required: false
    },

    onExit: {
        type: 'function',
        required: false
    },

    onClose: {
        type: 'function',
        required: false
    },

    onError: {
        type: 'function',
        required: false
    },

    timeout: {
        type: 'number',
        required: false
    }
};

ParentComponent.fromProps = function fromProps(component, props) {

    return new ParentComponent(component, {

        props,

        onEnter: pop(props, 'onEnter'),
        onExit: pop(props, 'onExit'),
        onClose: pop(props, 'onClose'),
        onError: pop(props, 'onError'),

        timeout: parseInt(pop(props, 'timeout', 0), 10)
    });
};