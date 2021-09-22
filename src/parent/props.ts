import { $Values } from 'utility-types';
import { ZalgoPromise } from 'zalgo-promise/src';
import { dotify, isDefined, extend, base64encode } from 'belter/src';

import type {
    PropsInputType,
    PropsType,
    PropsDefinitionType
} from '../component/props';
import { eachProp, mapProps } from '../component/props';
import { PROP_SERIALIZATION, METHOD } from '../constants';

import type { ParentHelpers } from './index';

function getDefaultInputProps<P>(): P {
    // $FlowFixMe[incompatible-type]
    const defaultInputProps: P = {};
    return defaultInputProps;
}

export function extendProps<P, X>(
    propsDef: PropsDefinitionType<P, X>,
    props: PropsType<P>,
    inputProps: PropsInputType<P>,
    helpers: ParentHelpers<P>,
    isUpdate = false
) {
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
            value = propDef.value({
                props,
                state,
                close,
                focus,
                event,
                onError
            });
        }

        if (!isDefined(value) && propDef.default) {
            value = propDef.default({
                props,
                state,
                close,
                focus,
                event,
                onError
            });
        }

        if (isDefined(value)) {
            if (
                propDef.type === 'array'
                    ? !Array.isArray(value)
                    : typeof value !== propDef.type
            ) {
                throw new TypeError(
                    `Prop is not of type ${ propDef.type }: ${ key }`
                );
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
            propDef.validate({
                value,
                props
            });
        }

        if (isDefined(value) && propDef.decorate) {
            // $FlowFixMe[incompatible-call]
            const decoratedValue = propDef.decorate({
                value,
                props,
                state,
                close,
                focus,
                event,
                onError
            });
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
export function serializeProps<P, X>(
    propsDef: PropsDefinitionType<P, X>,
    props: PropsType<P>,
    method: $Values<typeof METHOD>
): ZalgoPromise<Record<string, string | boolean>> {
    const params = {};
    return ZalgoPromise.all(
        mapProps(props, propsDef, (key, propDef, value) => {
            return ZalgoPromise.resolve().then(() => {
                if (value === null || typeof value === 'undefined') {
                    return;
                }

                const getParam = {
                    [METHOD.GET]: propDef.queryParam,
                    [METHOD.POST]:propDef.bodyParam
                }[method];
                const getValue = {
                    [METHOD.GET]: propDef.queryValue,
                    [METHOD.POST]:propDef.bodyValue
                }[method];

                if (!getParam) {
                    return;
                }

                return ZalgoPromise.hash({
                    finalParam: ZalgoPromise.try(() => {
                        if (typeof getParam === 'function') {
                            // $FlowFixMe[incompatible-call]
                            return getParam({
                                value
                            });
                        } else if (typeof getParam === 'string') {
                            return getParam;
                        } else {
                            return key;
                        }
                    }),
                    finalValue: ZalgoPromise.try(() => {
                        if (
                            typeof getValue === 'function' &&
                            isDefined(value)
                        ) {
                            // $FlowFixMe[incompatible-call]
                            // $FlowFixMe[incompatible-return]
                            return getValue({
                                value
                            });
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
                    } else if (
                        typeof finalValue === 'object' &&
                        finalValue !== null
                    ) {
                        if (propDef.serialization === PROP_SERIALIZATION.JSON) {
                            result = JSON.stringify(finalValue);
                        } else if (
                            propDef.serialization === PROP_SERIALIZATION.BASE64
                        ) {
                            result = base64encode(JSON.stringify(finalValue));
                        } else if (
                            propDef.serialization ===
                                PROP_SERIALIZATION.DOTIFY ||
                            !propDef.serialization
                        ) {
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
        })
    ).then(() => {
        return params;
    });
}
