/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { dotify, isDefined, extend } from 'belter/src';

import type { PropsInputType, PropsType, PropsDefinitionType, MixedPropDefinitionType } from '../component/props';
import { PROP_SERIALIZATION } from '../constants';

import type { ParentHelpers } from './index';

/*  Normalize Props
    ---------------

    Turn props into normalized values, using defaults, function options, etc.
*/

export function extendProps<P>(propsDef : PropsDefinitionType<P>, props : PropsType<P>, inputProps : PropsInputType<P>, helpers : ParentHelpers<P>, isUpdate : boolean = false) { // eslint-disable-line complexity

    // $FlowFixMe
    inputProps = inputProps || {};
    extend(props, inputProps);

    const propNames = isUpdate ? [] : [ ...Object.keys(propsDef) ];

    for (const key of Object.keys(inputProps)) {
        if (propNames.indexOf(key) === -1) {
            propNames.push(key);
        }
    }

    const aliases = [];

    const { state, close, focus, event, onError } = helpers;

    for (const key of propNames) {
        const propDef = propsDef[key];

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
            value = propDef.value({ props, state, close, focus, event, onError });
        }

        if (!isDefined(value) && propDef.default) {
            value = propDef.default({ props, state, close, focus, event, onError });
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
        delete props[alias];
    }

    // $FlowFixMe
    for (const key of Object.keys(props)) {
        const propDef = propsDef[key];
        const value = props[key];

        if (!propDef) {
            continue;
        }

        if (__DEBUG__ && isDefined(value) && propDef.validate) {
            propDef.validate({ value, props });
        }

        if (isDefined(value) && propDef.decorate) {
            props[key] = propDef.decorate({ value, props, state, close, focus, event, onError });
        }
    }

    for (const key of Object.keys(propsDef)) {
        const propDef = propsDef[key];
        // $FlowFixMe
        const propVal = props[key];
        if (propDef.required !== false && !isDefined(propVal)) {
            throw new Error(`Expected prop "${ key }" to be defined`);
        }
    }
}

// $FlowFixMe
function getQueryParam<P>(prop : MixedPropDefinitionType<P>, key : string, value : string) : ZalgoPromise<string> {
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
function getQueryValue<P>(prop : MixedPropDefinitionType<P>, key : string, value : string) : ZalgoPromise<string> {
    return ZalgoPromise.try(() => {
        if (typeof prop.queryValue === 'function' && isDefined(value)) {
            return prop.queryValue({ value });
        } else {
            return value;
        }
    });
}

export function propsToQuery<P>(propsDef : PropsDefinitionType<P>, props : (PropsType<P>)) : ZalgoPromise<{ [string] : string }> {

    const params = {};

    // $FlowFixMe
    const keys = Object.keys(props);
    
    return ZalgoPromise.all(keys.map(key => {

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
                getQueryParam(prop, key, value),
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
