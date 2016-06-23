
import { noop, denodeify, once, memoize, urlEncode } from '../lib';

/*  Normalize Prop
    --------------

    Turn prop into normalized value, using defaults, function options, etc.
*/

export function normalizeProp(component, instance, props, key) {

    let prop = component.props[key];
    let value = props[key];

    let hasProp = props.hasOwnProperty(key) && value !== null && value !== undefined && value !== '';

    // Substitute in provided default. If prop.def is a function, we call it to get the default.

    if (!hasProp && prop.def) {
        value = (prop.def instanceof Function && prop.type !== 'function') ? prop.def() : prop.def;
    }

    if (prop.type === 'boolean') {
        return Boolean(value);

    } else if (prop.type === 'function') {

        if (!value) {

            // If prop.noop is set, make the function a noop

            if (!value && prop.noop) {
                value = noop;
            }

        } else {

            // If prop.denodeify is set, denodeify the function (accepts callback -> returns promise)

            if (prop.denodeify) {
                value = denodeify(value);
            }

            // If prop.once is set, ensure the function can only be called once

            if (prop.once) {
                value = once(value);
            }

            // If prop.memoize is set, ensure the function is memoized (first return value is cached and returned for any future calls)

            if (prop.memoize) {
                value = memoize(value);
            }

            value = value.bind(instance);
        }

        return value;

    } else if (prop.type === 'string') {
        return value || '';

    } else if (prop.type === 'object') {
        return value;

    } else if (prop.type === 'number') {
        return parseInt(value || 0, 10);
    }
}


/*  Normalize Props
    ---------------

    Turn props into normalized values, using defaults, function options, etc.
*/

export function normalizeProps(component, instance, props) {

    props = props || {};
    let result = {};

    for (let key of Object.keys(component.props)) {
        result[key] = normalizeProp(component, instance, props, key);
    }

    return result;
}


/*  Props to Query
    --------------

    Turn props into an initial query string to open the component with

    string -> string
    bool   -> 1
    object -> json
    number -> string
*/

export function propsToQuery(propsDef, props) {

    return Object.keys(props).map(key => {

        let value = props[key];

        if (!value) {
            return;
        }

        if (propsDef[key].queryParam === false) {
            return;
        }

        let result;

        if (typeof value === 'boolean') {
            result = '1';
        } else if (typeof value === 'string') {
            result = value.toString();
        } else if (typeof value === 'function') {
            return;
        } else if (typeof value === 'object') {
            result = JSON.stringify(value);
        } else if (typeof value === 'number') {
            result = value.toString();
        }

        return `${urlEncode(key)}=${urlEncode(result)}`;

    }).filter(Boolean).join('&');
}