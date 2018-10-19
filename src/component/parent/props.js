/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';

import { noop, denodeify, once, memoize, promisify, dotify } from '../../lib';
import type { Component } from '../component';
import type { BuiltInPropsDefinitionType, PropsType, BuiltInPropsType, MixedPropDefinitionType } from '../component/props';

import type { ParentComponent } from './index';

function isDefined(value : ?mixed) : boolean {
    return value !== null && value !== undefined && value !== '';
}


/*  Normalize Prop
    --------------

    Turn prop into normalized value, using defaults, function options, etc.
*/

// $FlowFixMe
export function normalizeProp<P, T>(component : Component<P>, instance : ParentComponent<P>, props : (PropsType & P), key : string, value : ?T) : ?(ZalgoPromise<T> | T) { // eslint-disable-line complexity

    let prop = component.getProp(key);

    let resultValue;

    if (prop.value) {
        resultValue = prop.value;
    } else if (prop.def && (!props.hasOwnProperty(key) || !isDefined(value))) {
        resultValue = prop.def.call(component, props);
    } else {
        resultValue = value;
    }

    if (!resultValue && prop.alias && props[prop.alias]) {
        resultValue = props[prop.alias];
    }

    let decorated = false;

    if (prop.decorate && resultValue !== null && resultValue !== undefined) {
        resultValue = prop.decorate.call(instance, resultValue, props);
        decorated = true;
    }

    let type = prop.type;

    if (type === 'boolean') {
        // $FlowFixMe
        resultValue = Boolean(resultValue);

    } else if (type === 'function') {

        if (!resultValue && prop.noop) {
            // $FlowFixMe
            resultValue = noop;

            if (!decorated && prop.decorate) {
                // $FlowFixMe
                resultValue = prop.decorate.call(instance, noop, props);
            }
        }

        if (resultValue && typeof resultValue === 'function') {

            resultValue = resultValue.bind(instance);

            // If prop.denodeify is set, denodeify the function (accepts callback -> returns promise)

            if (prop.denodeify) {
                // $FlowFixMe
                resultValue = denodeify(resultValue);
            }

            if (prop.promisify) {
                // $FlowFixMe
                resultValue = promisify(resultValue);
            }

            // Wrap the function in order to log when it is called

            let original = resultValue;
            // $FlowFixMe
            resultValue = function() : mixed {
                component.log(`call_prop_${ key }`);
                return original.apply(this, arguments);
            };

            // If prop.once is set, ensure the function can only be called once

            if (prop.once) {
                // $FlowFixMe
                resultValue = once(resultValue);
            }

            // If prop.memoize is set, ensure the function is memoized (first return resultValue is cached and returned for any future calls)

            if (prop.memoize) {
                // $FlowFixMe
                resultValue = memoize(resultValue);
            }
        }

    } else if (type === 'string') {
        // pass

    } else if (type === 'object') {
        // pass

    } else if (type === 'number') {
        if (resultValue !== undefined) {
            // $FlowFixMe
            resultValue = parseInt(resultValue, 10);
        }
    }

    // $FlowFixMe
    return resultValue;
}


/*  Normalize Props
    ---------------

    Turn props into normalized values, using defaults, function options, etc.
*/

export function normalizeProps<P>(component : Component<P>, instance : ParentComponent<P>, props : (PropsType & P)) : (BuiltInPropsType & P) {

    let result = {};

    // $FlowFixMe
    props = props || {};

    for (let key of Object.keys(props)) {
        if (component.getPropNames().indexOf(key) !== -1) {
            // $FlowFixMe
            result[key] = normalizeProp(component, instance, props, key, props[key]);
        } else {
            result[key] = props[key];
        }
    }

    for (let key of component.getPropNames()) {
        if (!props.hasOwnProperty(key) && (!instance.props || !instance.props.hasOwnProperty(key))) {

            // $FlowFixMe
            let normalizedProp = normalizeProp(component, instance, props, key, props[key]);

            if (normalizedProp !== undefined) {
                result[key] = normalizedProp;
            }
        }
    }

    // $FlowFixMe
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

// $FlowFixMe
function getQueryParam<T, P>(prop : MixedPropDefinitionType<P>, key : string, value : T) : ZalgoPromise<string> {
    return ZalgoPromise.try(() => {
        if (typeof prop.queryParam === 'function') {
            return prop.queryParam(value);
        } else if (typeof prop.queryParam === 'string') {
            return prop.queryParam;
        } else {
            return key;
        }
    });
}

// $FlowFixMe
function getQueryValue<T, P>(prop : MixedPropDefinitionType<P>, key : string, value : T) : ZalgoPromise<mixed> {
    return ZalgoPromise.try(() => {
        if (typeof prop.queryValue === 'function') {
            return prop.queryValue(value);
        } else {
            return value;
        }
    });
}

export function propsToQuery<P>(propsDef : BuiltInPropsDefinitionType<P>, props : (BuiltInPropsType & P)) : { [string] : string } {

    let params = {};

    return ZalgoPromise.all(Object.keys(props).map(key => {

        let prop = propsDef[key];

        if (!prop) {
            return; // eslint-disable-line array-callback-return
        }

        return ZalgoPromise.resolve().then(() => {

            let value = props[key];

            if (!value) {
                return;
            }

            if (!prop.queryParam) {
                return;
            }

            return value;

        }).then(value => {

            if (!value) {
                return;
            }

            return ZalgoPromise.all([
                // $FlowFixMe
                getQueryParam(prop, key, value),
                // $FlowFixMe
                getQueryValue(prop, key, value)
            ]).then(([ queryParam, queryValue ]) => {

                let result;

                if (typeof queryValue === 'boolean') {
                    result = '1';
                } else if (typeof queryValue === 'string') {
                    result = queryValue.toString();
                } else if (typeof queryValue === 'function') {
                    return;
                } else if (typeof queryValue === 'object' && queryValue !== null) {

                    if (prop.serialization === 'json') {
                        result = JSON.stringify(queryValue);
                    } else {
                        result = dotify(queryValue, key);

                        for (let dotkey of Object.keys(result)) {
                            params[dotkey] = result[dotkey];
                        }

                        return;
                    }

                } else if (typeof queryValue === 'number') {
                    result = queryValue.toString();
                }

                params[queryParam] = result;
            });
        });

    })).then(() => {
        Object.keys(params).forEach(key => {
            params[key] = escape(params[key]);
        });
        return params;
    });
}
