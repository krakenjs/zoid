
import postRobot from 'post-robot/dist/post-robot';
import { urlEncode, popup, noop, isClick } from '../util';
import { CONSTANTS } from '../constants';

export class ParentComponent {

    constructor(component, options) {
        this.validate(options);

        this.listeners = [];

        this.component = component;
        this.setProps(options.props);

        this.onEnter = options.onEnter || noop;
        this.onExit = options.onExit || noop;
        this.onClose = options.onClose || noop;
        this.onError = options.onError || noop;

        this.dimensions = options.dimensions || {};

        this.timeout = options.timeout;
    }

    setProps(props) {
        this.validateProps(props);
        this.props = props;
        this.normalizedProps = this.normalizeProps(this.props);
        this.queryString = this.propsToQuery(this.normalizedProps);
        this.url = `${this.component.url}?${this.queryString}`;
    }

    validate(options) {
        if (options.timeout && !(typeof options.timeout === 'number')) {
            throw new Error(`Expected options.timeout to be a number: ${options.timeout}`);
        }
    }

    validateProps(props) {

        for (let key of Object.keys(this.component.props)) {
            let prop = this.component.props[key]

            if (prop.required !== false && !props.hasOwnProperty(key)) {
                throw new Error(`Prop is required: ${key}`);
            }

            let value = props[key];

            if (prop.type === 'function') {

                if (!(value instanceof Function)) {
                    throw new Error(`Prop is not of type string: ${key}`);
                }

            } else if (prop.type === 'string') {

                if (value === null || value === undefined) {
                    value = '';
                }

                if (typeof value !== 'string') {
                    throw new Error(`Prop is not of type string: ${key}`);
                }

            } else if (prop.type === 'object') {

                try {
                    JSON.stringify(value);
                } catch (err) {
                    throw new Error(`Unable to serialize prop: ${key}`);
                }
            }
        }
    }

    normalizeProps(props) {

        props = props || {};
        let result = {};

        for (let key of Object.keys(this.component.props)) {

            let prop = this.component.props[key]
            let value = props[key];

            if (prop.type === 'boolean') {
                result[key] = Boolean(value);

            } else if (prop.type === 'function') {
                continue;

            } else if (prop.type === 'string') {
                result[key] = value || '';

            } else if (prop.type === 'object') {
                result[key] = JSON.stringify(value);
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
            } else if (typeof value === 'object') {
                result = JSON.stringify(value);
            }

            return `${urlEncode(key)}=${urlEncode(result)}`;

        }).filter(Boolean).join('&');
    }

    renderIframe(id) {

        let element;

        if (id instanceof window.Element) {
            element = id;
        } else if (typeof id === 'string') {
            element = document.getElementById(id);
        } else if (!id) {
            element = window.document.body;
        }

        if (!(element instanceof window.Element)) {
            throw new Error(`Invalid element: ${id}`);
        }

        this.iframe = document.createElement('iframe');

        this.iframe.src = this.url;
        this.iframe.height = 500;
        this.iframe.width = 500;

        element.appendChild(this.iframe);

        this.window = this.iframe.contentWindow;
        this.listen();
    }

    renderPopup() {

        if (!isClick()) {
            throw new Error('Can not open popup outside of click event');
        }

        this.popup = popup(`${this.component.url}?${this.queryString}`, {
            width: 500,
            height: 500,
        });

        this.window = this.popup;
        this.listen();
    }

    listen(win) {

        let childListeners = this.childListeners();

        for (let listenerName of Object.keys(childListeners)) {
            this.addListener(postRobot.on(listenerName, { window: this.window }, data => {
                return childListeners[listenerName].call(this, data);
            }));
        }

        if (this.timeout) {
            setTimeout(() => {
                if (!this.entered) {
                    this.destroy(new Error(`Loading component ${this.component.tag} at ${this.url} timed out after ${this.timeout} milliseconds`));
                }
            }, this.timeout);
        }
    }

    childListeners() {
        return {
           [ CONSTANTS.POST_MESSAGE.INIT ]: function(data) {

               this.onEnter.call(this);
               this.entered = true;

               return {
                   props: this.normalizedProps
               };
           },

           [ CONSTANTS.POST_MESSAGE.CLOSE ]: function(data) {

               this.cleanup();
           },

           [ CONSTANTS.POST_MESSAGE.FOCUS ]: function(data) {

               this.focus();
           },

           [ CONSTANTS.POST_MESSAGE.REDIRECT ]: function(data) {
               this.cleanup();
               window.location = data.url;
           },

           [ CONSTANTS.POST_MESSAGE.PROP_CALLBACK ]: function(data) {

               return this.props[data.key].apply(null, data.args);
           }
       }
    }

    addListener(listener) {
        this.listeners.push(listener);
        return listener;
    }

    close() {
        postRobot.send(this.window, CONSTANTS.POST_MESSAGE.CLOSE).then(data => {
            this.cleanup();
        }).catch(err => {
            console.warn('Error sending close message to child', err.stack || err.toString());
            this.cleanup();
        });
    }

    focus() {
        if (this.popup) {
            this.popup.focus();
        }
    }

    destroy(err) {
        this.cleanup();
        this.onError.call(this, err);
    }

    cleanup() {

        if (this.popup) {
            this.popup.close();
        } else if (this.iframe) {
            this.iframe.parentNode.removeChild(this.iframe);
        }

        for (let listener of this.listeners) {
            listener.cancel();
        }
    }

}