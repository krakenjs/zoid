/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { dotify, isDefined, extend } from 'belter/src';

import type { Component } from '../component';
import type { BuiltInPropsDefinitionType, PropsInputType, PropsType, MixedPropDefinitionType } from '../component/props';
import { PROP_SERIALIZATION } from '../constants';

import type { ParentHelpers } from './index';

/*  Normalize Props
    ---------------

    Turn props into normalized values, using defaults, function options, etc.
*/

export function extendProps<P>(component : Component<P>, props : PropsType<P>, inputProps : PropsInputType<P>, helpers : ParentHelpers<P>, isUpdate : boolean = false) { // eslint-disable-line complexity

    // $FlowFixMe
    inputProps = inputProps || {};
    extend(props, inputProps);

    const propNames = isUpdate ? [] : [ ...component.getPropNames() ];

    // $FlowFixMe
    for (const key of Object.keys(inputProps)) {
        if (propNames.indexOf(key) === -1) {
            propNames.push(key);
        }
    }

    const aliases = [];

    const { state, close, focus, onError } = helpers;

    for (const key of propNames) {
        const propDef = component.getPropDefinition(key);
        // $FlowFixMe
        let value = inputProps[key];

        if (!propDef) {
            continue;
        }

        const alias = propDef.alias;
        if (alias) {
            if (!isDefined(value) && isDefined(inputProps[alias])) {
                value = inputProps[alias];
            }
            aliases.push(alias);
        }

        if (propDef.value) {
            value = propDef.value({ props, state, close, focus, onError });
        }

        if (!isDefined(value) && propDef.default) {
            value = propDef.default({ props, state, close, focus, onError });
        }

        if (isDefined(value)) {
            if (propDef.type === 'array' ? !Array.isArray(value) : (typeof value !== propDef.type)) {
                throw new TypeError(`Prop is not of type ${ propDef.type }: ${ key }`);
            }
        }
        
        // $FlowFixMe
        props[key] = value;
    }

    for (const alias of aliases) {
        // $FlowFixMe
        delete props[alias];
    }

    // $FlowFixMe
    for (const key of Object.keys(props)) {
        const propDef = component.getPropDefinition(key);
        // $FlowFixMe
        const value = props[key];

        if (!propDef) {
            continue;
        }

        if (isDefined(value) && propDef.validate) {
            // $FlowFixMe
            propDef.validate({ value, props });
        }

        if (isDefined(value) && propDef.decorate) {
            // $FlowFixMe
            props[key] = propDef.decorate({ value, props, state, close, focus, onError });
        }
    }

    for (const key of component.getPropNames()) {
        const propDef = component.getPropDefinition(key);
        if (propDef.required !== false && !isDefined(props[key])) {
            throw new Error(`Expected prop "${ key }" to be defined`);
        }
    }
}

// $FlowFixMe
function getQueryParam<T, P>(prop : MixedPropDefinitionType<P>, key : string, value : T) : ZalgoPromise<string> {
    return ZalgoPromise.try(() => {
        if (typeof prop.queryParam === 'function') {
            return prop.queryParam({ value });
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
        if (typeof prop.queryValue === 'function' && isDefined(value)) {
            return prop.queryValue({ value });
        } else {
            return value;
        }
    });
}

export function propsToQuery<P>(propsDef : BuiltInPropsDefinitionType<P>, props : (PropsType<P>)) : ZalgoPromise<{ [string] : string }> {

    const params = {};

    return ZalgoPromise.all(Object.keys(props).map(key => {

        const prop = propsDef[key];

        if (!prop) {
            return; // eslint-disable-line array-callback-return
        }

        return ZalgoPromise.resolve().then(() => {

            const value = props[key];

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
                } else if (typeof queryValue === 'object' && queryValue !== null) {

                    if (prop.serialization === PROP_SERIALIZATION.JSON) {
                        result = JSON.stringify(queryValue);
                    } else if (prop.serialization === PROP_SERIALIZATION.BASE64) {
                        result = btoa(JSON.stringify(queryValue));
                    } else if (prop.serialization === PROP_SERIALIZATION.DOTIFY || !prop.serialization) {
                        result = dotify(queryValue, key);

                        for (const dotkey of Object.keys(result)) {
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
