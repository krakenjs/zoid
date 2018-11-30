/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { dotify, isDefined } from 'belter/src';

import type { Component } from '../component';
import type { BuiltInPropsDefinitionType, PropsType, BuiltInPropsType, MixedPropDefinitionType } from '../component/props';
import { PROP_SERIALIZATION } from '../../constants';

import type { ParentComponent } from './index';

/*  Normalize Props
    ---------------

    Turn props into normalized values, using defaults, function options, etc.
*/

export function normalizeProps<P>(component : Component<P>, instance : ParentComponent<P>, props : (PropsType & P), isUpdate : boolean = false) : (BuiltInPropsType & P) { // eslint-disable-line complexity

    let result = {};
    props = props || {};

    let propNames = isUpdate ? [] : component.getPropNames();

    // $FlowFixMe
    for (let key of Object.keys(props)) {
        if (propNames.indexOf(key) === -1) {
            propNames.push(key);
        }
    }

    for (let key of propNames) {
        let propDef = component.getProp(key);
        let value = props[key];

        if (!propDef) {
            result[key] = value;
            continue;
        }

        if (!isDefined(value) && propDef.alias) {
            value = props[propDef.alias];
        }

        if (propDef.value) {
            value = propDef.value();
        }

        if (!isDefined(value) && propDef.def) {
            value = propDef.def(props, component);
        }

        if (isDefined(value)) {
            if (propDef.type === 'array' ? !Array.isArray(value) : (typeof value !== propDef.type)) {
                throw new TypeError(`Prop is not of type ${ propDef.type }: ${ key }`);
            }
        } else if (propDef.required !== false) {
            throw new Error(`Expected prop ${ key } to be passed`);
        }

        result[key] = value;
    }

    for (let key of Object.keys(result)) {
        let propDef = component.getProp(key);
        let value = result[key];

        if (!propDef) {
            continue;
        }

        if (isDefined(value) && propDef.validate) {
            // $FlowFixMe
            propDef.validate(value, result);
        }

        if (propDef.decorate) {
            // $FlowFixMe
            result[key] = propDef.decorate(value, result);
        }

        if (result[key] && propDef.type === 'function') {
            result[key] = result[key].bind(instance);
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

export function propsToQuery<P>(propsDef : BuiltInPropsDefinitionType<P>, props : (BuiltInPropsType & P)) : ZalgoPromise<{ [string] : string }> {

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

            if (value === null || typeof value === 'undefined') {
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
                    result = queryValue.toString();
                } else if (typeof queryValue === 'string') {
                    result = queryValue.toString();
                } else if (typeof queryValue === 'function') {
                    return;
                } else if (typeof queryValue === 'object' && queryValue !== null) {

                    if (prop.serialization === PROP_SERIALIZATION.JSON) {
                        result = JSON.stringify(queryValue);
                    } else if (prop.serialization === PROP_SERIALIZATION.BASE64) {
                        result = btoa(JSON.stringify(queryValue));
                    } else if (prop.serialization === PROP_SERIALIZATION.DOTIFY || !prop.serialization) {
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
        return params;
    });
}
