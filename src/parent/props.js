/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { dotify, isDefined, base64encode, noop } from 'belter/src';

import { eachProp, mapProps, type PropsInputType, type PropsType, type PropsDefinitionType } from '../component/props';
import { PROP_SERIALIZATION, METHOD, PROP_TYPE } from '../constants';

import type { ParentHelpers } from './index';

export function extendProps<P, X>(propsDef : PropsDefinitionType<P, X>, existingProps : PropsType<P>, inputProps : PropsInputType<P>, helpers : ParentHelpers<P>, container : HTMLElement | void) {
    const { state, close, focus, event, onError } = helpers;

    // $FlowFixMe
    eachProp(inputProps, propsDef, (key, propDef, val) => {
        let valueDetermined = false;
        let value = val;

        const getDerivedValue = () => {
            if (!propDef) {
                return value;
            }

            const alias = propDef.alias;
            if (alias && !isDefined(val) && isDefined(inputProps[alias])) {
                value = inputProps[alias];
            }
    
            if (propDef.value) {
                value = propDef.value({ props: existingProps, state, close, focus, event, onError, container });
            }
    
            if (propDef.default && !isDefined(value) && !isDefined(inputProps[key])) {
                value = propDef.default({ props: existingProps, state, close, focus, event, onError, container });
            }

            if (isDefined(value)) {
                if (propDef.type === PROP_TYPE.ARRAY ? !Array.isArray(value) : (typeof value !== propDef.type)) {
                    throw new TypeError(`Prop is not of type ${ propDef.type }: ${ key }`);
                }
            } else {
                if (propDef.required !== false && !isDefined(inputProps[key])) {
                    throw new Error(`Expected prop "${ key }" to be defined`);
                }
            }
    
            if (__DEBUG__ && isDefined(value) && propDef.validate) {
                // $FlowFixMe
                propDef.validate({ value, props: inputProps });
            }

            if (isDefined(value) && propDef.decorate) {
                // $FlowFixMe
                value = propDef.decorate({ value, props: existingProps, state, close, focus, event, onError, container });
            }

            return value;
        };

        const getter = () => {
            if (valueDetermined) {
                return value;
            }

            valueDetermined = true;
            return getDerivedValue();
        };

        Object.defineProperty(existingProps, key, {
            configurable: true,
            enumerable:   true,
            get:          getter
        });
    });

    // $FlowFixMe
    eachProp(existingProps, propsDef, noop);
}

export function serializeProps<P, X>(propsDef : PropsDefinitionType<P, X>, props : (PropsType<P>), method : $Values<typeof METHOD>) : ZalgoPromise<{ [string] : string | boolean }> {

    const params = {};

    return ZalgoPromise.all(mapProps(props, propsDef, (key, propDef, value) => {
        return ZalgoPromise.resolve().then(() => {

            if (value === null || typeof value === 'undefined' || !propDef) {
                return;
            }

            const getParam = {
                [ METHOD.GET ]:  propDef.queryParam,
                [ METHOD.POST ]: propDef.bodyParam
            }[method];

            const getValue = {
                [ METHOD.GET ]:  propDef.queryValue,
                [ METHOD.POST ]: propDef.bodyValue
            }[method];
            
            if (!getParam) {
                return;
            }

            return ZalgoPromise.hash({

                finalParam: ZalgoPromise.try(() => {
                    if (typeof getParam === 'function') {
                        // $FlowFixMe[incompatible-call]
                        return getParam({ value });
                    } else if (typeof getParam === 'string') {
                        return getParam;
                    } else {
                        return key;
                    }
                }),
    
                finalValue: ZalgoPromise.try(() => {
                    if (typeof getValue === 'function' && isDefined(value)) {
                        // $FlowFixMe[incompatible-call]
                        // $FlowFixMe[incompatible-return]
                        return getValue({ value });
                    } else {
                        // $FlowFixMe[incompatible-return]
                        return value;
                    }
                })

            }).then(({ finalParam, finalValue }) => {

                let result;

                if (typeof finalValue === 'boolean') {
                    result = finalValue.toString();
                } else if (typeof finalValue === 'string') {
                    result = finalValue.toString();
                } else if (typeof finalValue === 'object' && finalValue !== null) {

                    if (propDef.serialization === PROP_SERIALIZATION.JSON) {
                        result = JSON.stringify(finalValue);
                    } else if (propDef.serialization === PROP_SERIALIZATION.BASE64) {
                        result = base64encode(JSON.stringify(finalValue));
                    } else if (propDef.serialization === PROP_SERIALIZATION.DOTIFY || !propDef.serialization) {
                        result = dotify(finalValue, key);

                        for (const dotkey of Object.keys(result)) {
                            params[dotkey] = result[dotkey];
                        }

                        return;
                    }

                } else if (typeof finalValue === 'number') {
                    result = finalValue.toString();
                }

                params[finalParam] = result;
            });
        });

    })).then(() => {
        return params;
    });
}
