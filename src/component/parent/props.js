
import { ZalgoPromise } from 'zalgo-promise'; 
import { validateProp } from './validate';
import { noop, denodeify, once, memoize, promisify, getter, dotify } from '../../lib';

function isDefined(value) {
    return value !== null && value !== undefined && value !== '';
}

function getDefault(component, prop, props) {

    if (prop.def) {
        return (prop.def instanceof Function) ? prop.def.call(component, props) : prop.def;
    }
}


/*  Normalize Prop
    --------------

    Turn prop into normalized value, using defaults, function options, etc.
*/

export function normalizeProp(component, instance, props, key, value) {

    let prop = component.props[key];

    if (prop.value) {
        value = prop.value;
    } else if (!props.hasOwnProperty(key) || !isDefined(value)) {
        value = getDefault(component, prop, props);
    }

    if (!value && prop.alias && props[prop.alias]) {
        value = props[prop.alias];
    }

    if (prop.decorate) {
        if (isDefined(value) || !prop.required) {
            value = prop.decorate(value, props);
        }
    }

    if (prop.getter) {

        if (!value) {
            return;
        }

        if (value instanceof Function) {
            value = value.bind(instance);
        } else {
            let val = value;
            value = () => val || ZalgoPromise.resolve(val);
        }

        value = getter(value, { name: key, timeout: prop.timeout });

        let _value = value;

        value = function() {
            component.log(`call_getter_${key}`);

            return _value.apply(this, arguments).then(result => {
                component.log(`return_getter_${key}`);
                validateProp(prop, key, result, props);
                return result;
            });
        };

        if (prop.memoize) {
            let val = memoize(value);
            value = () => val();
        }

        return value;
    }

    if (prop.type === 'boolean') {

        value = Boolean(value);

    } else if (prop.type === 'function') {

        if (!value) {

            // If prop.noop is set, make the function a noop

            if (!value && prop.noop) {
                value = noop;

                if (prop.denodeify) {
                    value = denodeify(value);
                }

                if (prop.promisify) {
                    value = promisify(value);
                }
            }

        } else {

            value = value.bind(instance);

            // If prop.denodeify is set, denodeify the function (accepts callback -> returns promise)

            if (prop.denodeify) {
                value = denodeify(value);
            }

            if (prop.promisify) {
                value = promisify(value);
            }

            // Wrap the function in order to log when it is called

            let original = value;
            value = function() {
                component.log(`call_prop_${key}`);
                return original.apply(this, arguments);
            };

            // If prop.once is set, ensure the function can only be called once

            if (prop.once) {
                value = once(value);
            }

            // If prop.memoize is set, ensure the function is memoized (first return value is cached and returned for any future calls)

            if (prop.memoize) {
                value = memoize(value);
            }
        }

    } else if (prop.type === 'string') {
        // pass

    } else if (prop.type === 'object') {
        // pass

    } else if (prop.type === 'number') {
        if (value !== undefined) {
            value = parseInt(value, 10);
        }
    }

    return value;
}


/*  Normalize Props
    ---------------

    Turn props into normalized values, using defaults, function options, etc.
*/

export function normalizeProps(component, instance, props, required = true) {

    props = props || {};
    let result = {};

    for (let key of Object.keys(props)) {
        if (component.props.hasOwnProperty(key)) {
            result[key] = normalizeProp(component, instance, props, key, props[key]);
        } else {
            result[key] = props[key];
        }
    }

    for (let key of Object.keys(component.props)) {
        if (!props.hasOwnProperty(key)) {

            let normalizedProp = normalizeProp(component, instance, props, key, props[key]);

            if (normalizedProp !== undefined) {
                result[key] = normalizedProp;
            }
        }
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

    let params = {};

    return ZalgoPromise.all(Object.keys(props).map(key => {

        let prop = propsDef[key];

        if (!prop) {
            return;
        }

        let queryParam = key;

        if (typeof prop.queryParam === 'string') {
            queryParam = prop.queryParam;
        }

        return ZalgoPromise.resolve().then(() => {

            let value = props[key];

            if (!value) {
                return;
            }

            if (!prop.queryParam) {
                return;
            }

            if (prop.getter) {
                return value.call().then(result => {
                    return result;
                });
            }

            return value;

        }).then(value => {

            if (!value) {
                return;
            }

            if (typeof prop.queryParam === 'function') {
                queryParam = prop.queryParam(value);
            }

            let result;

            if (typeof value === 'boolean') {
                result = '1';
            } else if (typeof value === 'string') {
                result = value.toString();
            } else if (typeof value === 'function') {
                return;
            } else if (typeof value === 'object') {

                if (prop.serialization === 'json') {
                    result = JSON.stringify(value);
                } else {
                    result = dotify(value, key);

                    for (let dotkey in result) {
                        params[dotkey] = result[dotkey];
                    }

                    return;
                }

            } else if (typeof value === 'number') {
                result = value.toString();
            }

            params[queryParam] = result;
        });

    })).then(() => {
        return params;
    });
}
