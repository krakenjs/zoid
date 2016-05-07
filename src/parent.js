
import postRobot from 'post-robot/dist/post-robot';
import { urlEncode } from './util';

export class ParentComponent {

    constructor(component, options) {
        this.component = component;
        this.options = options || {};
        this.validate();
    }

    validate() {
        // pass
    }

    normalizeProps(props) {

        props = props || {};
        let result = {};

        for (let key of Object.keys(this.component.options.props)) {

            let prop = this.component.options.props[key]

            if (!prop) {
                throw new Error(`Invalid prop: ${key}`);
            }

            if (prop.required !== false && !props.hasOwnProperty(key)) {
                throw new Error(`Prop is required: ${key}`);
            }

            let value = props[key];

            if (prop.type === 'boolean') {

                result[key] = Boolean(value);

            } else if (prop.type === 'function') {

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

                result[key] = value;

            } else if (prop.type === 'object') {

                try {
                    result[key] = JSON.stringify(value);
                } catch (err) {
                    throw new Error(`Unable to serialize prop: ${key}`);
                }
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

    renderInto(element) {

        let props = this.options.props;
        let normalizedProps = this.normalizeProps(props);
        let queryString = this.propsToQuery(normalizedProps);

        //let dimensions = this.options.dimensions || this.component.options.dimensions || {};

        this.iframe = document.createElement('iframe');

        this.iframe.src = `${this.component.options.url}?${queryString}`;
        this.iframe.height = 500;
        this.iframe.width = 500;

        postRobot.listen({

            name: 'xcomponent_init',
            window: this.iframe.contentWindow,

            handler(err, data) {
                if (err) {
                    return;
                }

                this.id = data.id;

                return {
                    props: normalizedProps
                };
            }
        });

        postRobot.listen({

            name: 'xcomponent_prop_function',
            window: this.iframe.contentWindow,

            handler(err, data) {
                if (err) {
                    return;
                }

                setTimeout(() => {
                    props[data.key].apply(null, data.args);
                });
            }
        });

        element.appendChild(this.iframe);
    }

    renderIntoId(elementId) {
        let el = document.getElementById(elementId);
        if (!el) {
            throw new Error(`Element not found with id: ${elementId}`);
        }
        return this.renderInto(el);
    }

}