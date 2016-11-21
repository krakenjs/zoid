
import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';
import { validateProp } from './validate';
import { noop, denodeify, once, memoize, promisify, getter } from '../../lib';
import { PROP_DEFER_TO_URL, CLOSE_REASONS } from '../../constants';


/*  Normalize Prop
    --------------

    Turn prop into normalized value, using defaults, function options, etc.
*/

export function normalizeProp(component, instance, props, key, value) {

    let prop = component.props[key];

    let hasProp = props.hasOwnProperty(key) && value !== null && value !== undefined && value !== '';

    if (!hasProp && prop.def) {
        value = (prop.def instanceof Function) ? prop.def.call(component, props) : prop.def;
    }

    if (!value && prop.alias && props[prop.alias]) {
        value = props[prop.alias];
    }

    if (prop.decorate) {
        value = prop.decorate(value);
    }

    if (value === PROP_DEFER_TO_URL) {
        return value;
    }

    if (prop.getter) {
        if (!value) {
            return;
        }

        let result = getter((value instanceof Function ? value : () => value).bind(instance));

        if (prop.memoize) {
            result = memoize(result);
        }

        return result;
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

    for (let key of Object.keys(component.props)) {
        if (required || props.hasOwnProperty(key)) {
            result[key] = normalizeProp(component, instance, props, key, props[key]);
        }
    }

    return result;
}



function dotify(obj, prefix = '', newobj = {}) {
    prefix = prefix ? `${prefix}.` : prefix;
    for (let key in obj) {
        if (obj[key] && typeof obj[key] === 'object') {
            newobj = dotify(obj[key], `${prefix}${key}`, newobj);
        } else {
            newobj[`${prefix}${key}`] = obj[key];
        }
    }
    return newobj;
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

    return Promise.all(Object.keys(props).map(key => {

        let prop = propsDef[key];
        let queryParam = key;

        if (typeof prop.queryParam === 'string') {
            queryParam = prop.queryParam;
        }

        return Promise.resolve().then(() => {

            let value = props[key];

            if (!value) {
                return;
            }

            if (!prop.queryParam) {
                return;
            }

            if (value === PROP_DEFER_TO_URL) {
                return;
            }

            if (prop.getter) {
                return value.call().then(result => {
                    validateProp(prop, key, result);
                    return result;
                });
            }

            return value;

        }).then(value => {

            if (!value) {
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



export function normalizeParentProps(component, instance, props, required = true) {
    props = normalizeProps(component, instance, props, required);

    for (let key of Object.keys(props)) {
        let value = props[key];

        if (value) {
            let prop = component.props[key];

            if (prop.autoClose) {
                props[key] = function() {
                    instance.component.log(`autoclose`, { prop: key });

                    let result = Promise.resolve(value.apply(this, arguments));

                    return Promise.all([

                        result,
                        instance.close(CLOSE_REASONS.AUTOCLOSE)

                    ]).then(() => result);
                };
            }
        }
    }

    return props;
}