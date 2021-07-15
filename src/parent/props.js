/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { dotify, isDefined, extend, base64encode } from 'belter/src';

import { eachProp, mapProps, type PropsInputType, type PropsType, type PropsDefinitionType } from '../component/props';
import { PROP_SERIALIZATION } from '../constants';

import type { ParentHelpers } from './index';

function getDefaultInputProps<P>() : P {
    // $FlowFixMe[incompatible-type]
    const defaultInputProps : P = {};
    return defaultInputProps;
}

export function extendProps<P, X>(propsDef : PropsDefinitionType<P, X>, props : PropsType<P>, inputProps : PropsInputType<P>, helpers : ParentHelpers<P>, isUpdate : boolean = false) {

    inputProps = inputProps || getDefaultInputProps();
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

    eachProp(props, propsDef, (key, propDef, value) => {
        if (!propDef) {
            return;
        }

        if (__DEBUG__ && isDefined(value) && propDef.validate) {
            // $FlowFixMe[incompatible-call]
            // $FlowFixMe[incompatible-exact]
            propDef.validate({ value, props });
        }

        if (isDefined(value) && propDef.decorate) {
            // $FlowFixMe[incompatible-call]
            const decoratedValue = propDef.decorate({ value, props, state, close, focus, event, onError });
            // $FlowFixMe[incompatible-type]
            props[key] = decoratedValue;
        }
    });

    for (const key of Object.keys(propsDef)) {
        const propDef = propsDef[key];
        // $FlowFixMe
        const propVal = props[key];
        if (propDef.required !== false && !isDefined(propVal)) {
            throw new Error(`Expected prop "${ key }" to be defined`);
        }
    }
}

export function propsToQuery<P, X>(propsDef : PropsDefinitionType<P, X>, props : (PropsType<P>)) : ZalgoPromise<{ [string] : string | boolean }> {

    const params = {};

    return ZalgoPromise.all(mapProps(props, propsDef, (key, propDef, value) => {
        return ZalgoPromise.resolve().then(() => {

            if (value === null || typeof value === 'undefined') {
                return;
            }

            if (!propDef.queryParam) {
                return;
            }

            return ZalgoPromise.hash({

                queryParam: ZalgoPromise.try(() => {
                    if (typeof propDef.queryParam === 'function') {
                        // $FlowFixMe[incompatible-call]
                        return propDef.queryParam({ value });
                    } else if (typeof propDef.queryParam === 'string') {
                        return propDef.queryParam;
                    } else {
                        return key;
                    }
                }),
    
                queryValue: ZalgoPromise.try(() => {
                    if (typeof propDef.queryValue === 'function' && isDefined(value)) {
                        // $FlowFixMe[incompatible-call]
                        // $FlowFixMe[incompatible-return]
                        return propDef.queryValue({ value });
                    } else {
                        // $FlowFixMe[incompatible-return]
                        return value;
                    }
                })

            }).then(({ queryParam, queryValue }) => {

                let result;

                if (typeof queryValue === 'boolean') {
                    result = queryValue.toString();
                } else if (typeof queryValue === 'string') {
                    result = queryValue.toString();
                } else if (typeof queryValue === 'object' && queryValue !== null) {

                    if (propDef.serialization === PROP_SERIALIZATION.JSON) {
                        result = JSON.stringify(queryValue);
                    } else if (propDef.serialization === PROP_SERIALIZATION.BASE64) {
                        result = base64encode(JSON.stringify(queryValue));
                    } else if (propDef.serialization === PROP_SERIALIZATION.DOTIFY || !propDef.serialization) {
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
