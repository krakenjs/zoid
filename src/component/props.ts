import { $Values } from 'utility-types';
import { ZalgoPromise } from 'zalgo-promise/src';
import type { EventEmitterType } from 'belter/src';
import { once, noop } from 'belter/src';
import type { CrossDomainWindowType } from 'cross-domain-utils/src';
import { isWindow, isWindowClosed, isSameDomain } from 'cross-domain-utils/src';
import { ProxyWindow, toProxyWindow } from 'post-robot/src';

import { PROP_SERIALIZATION, PROP_TYPE } from '../constants';

export type EventHandlerType<T> = (arg0: T) => void | ZalgoPromise<void>
export type timeoutPropType = number
export type windowPropType = CrossDomainWindowType | ProxyWindow
export type cspNoncePropType = string
export type uidPropType = string
export type closePropType = () => ZalgoPromise<void>
export type focusPropType = () => ZalgoPromise<void>
export type showPropType = () => ZalgoPromise<void>
export type exportPropType<X> = (arg0: X) => ZalgoPromise<void>
export type hidePropType = () => ZalgoPromise<void>
export type resizePropType = (arg0: {
    width: number | null | undefined
    height: number | null | undefined
}) => ZalgoPromise<void>
export type getParentPropType = () => CrossDomainWindowType
export type getParentDomainPropType = () => string
export type onDisplayPropType = EventHandlerType<void>
export type onRenderedPropType = EventHandlerType<void>
export type onRenderPropType = EventHandlerType<void>
export type onClosePropType = EventHandlerType<void>
export type onDestroyPropType = EventHandlerType<void>
export type onResizePropType = EventHandlerType<void>
export type onFocusPropType = EventHandlerType<void>
export type onErrorPropType = EventHandlerType<unknown>
export type onPropsPropType<P> = (arg0: (arg0: PropsType<P>) => void) => void // eslint-disable-line no-use-before-define

export type PropsInputType<P> = P & {
    timeout?: timeoutPropType
    window?: windowPropType
    cspNonce?: cspNoncePropType | null | undefined
    onDisplay?: onDisplayPropType
    onRendered?: onRenderedPropType
    onRender?: onRenderPropType
    onClose?: onClosePropType
    onDestroy?: onDestroyPropType
    onResize?: onResizePropType
    onFocus?: onFocusPropType
    onError?: onErrorPropType
    onProps?: onPropsPropType<P>
}
export type PropsType<P> = P & {
    timeout?: timeoutPropType
    window?: windowPropType | null | undefined
    close?: closePropType | null | undefined
    focus?: focusPropType | null | undefined
    resize?: resizePropType | null | undefined
    uid: uidPropType
    cspNonce?: cspNoncePropType | null | undefined
    onDisplay: onDisplayPropType
    onRendered: onRenderedPropType
    onRender: onRenderPropType
    onClose: onClosePropType
    onDestroy: onDestroyPropType
    onResize: onResizePropType
    onFocus: onFocusPropType
    onError: onErrorPropType
    onProps: onPropsPropType<P>
}
export type PropDefinitionType<T, P, S extends $Values<typeof PROP_TYPE>, X> = {
    type: S
    alias?: string
    value?: (arg0: {
        props: P
        state: Record<string, any>
        close: () => ZalgoPromise<void>
        focus: () => ZalgoPromise<void>
        onError: (arg0: unknown) => ZalgoPromise<void>
        event: EventEmitterType
    }) => T | null | undefined
    default?: (arg0: {
        props: P
        state: Record<string, any>
        close: () => ZalgoPromise<void>
        focus: () => ZalgoPromise<void>
        onError: (arg0: unknown) => ZalgoPromise<void>
        event: EventEmitterType
    }) => T | null | undefined
    decorate?: (arg0: {
        value: T
        props: PropsType<P>
        state: Record<string, any>
        close: () => ZalgoPromise<void>
        focus: () => ZalgoPromise<void>
        onError: (arg0: unknown) => ZalgoPromise<void>
        event: EventEmitterType
    }) => T
    childDecorate?: (arg0: {
        value: T | null | undefined
        uid: string
        close: () => ZalgoPromise<void>
        focus: () => ZalgoPromise<void>
        onError: (arg0: unknown) => ZalgoPromise<void>
        onProps: (arg0: (arg0: PropsType<P>) => void) => void
        resize: (arg0: {
            width: number | null | undefined
            height: number | null | undefined
        }) => ZalgoPromise<void>
        getParentDomain: () => string
        getParent: () => CrossDomainWindowType
        show: () => ZalgoPromise<void>
        hide: () => ZalgoPromise<void>
        export: (arg0: X) => ZalgoPromise<void>
    }) => T | null | undefined
    required?: boolean
    queryParam?:
        | boolean
        | string
        | ((arg0: {value: T}) => string | ZalgoPromise<string>)
    bodyParam?:
        | boolean
        | string
        | ((arg0: {value: T}) => string | ZalgoPromise<string>)
    // eslint-disable-next-line no-undef
    queryValue?: <R>(arg0: {value: T}) => ZalgoPromise<R> | R | string
    // eslint-disable-next-line no-undef
    bodyValue?: <R>(arg0: {value: T}) => ZalgoPromise<R> | R | string
    sendToChild?: boolean
    allowDelegate?: boolean
    validate?: (arg0: {value: T; props: PropsType<P>}) => void
    sameDomain?: boolean
    serialization?: $Values<typeof PROP_SERIALIZATION>
}
export type BooleanPropDefinitionType<
    T extends boolean,
    P,
    X
> = PropDefinitionType<T, P, 'boolean', X>
export type StringPropDefinitionType<
    T extends string,
    P,
    X
> = PropDefinitionType<T, P, 'string', X>
export type NumberPropDefinitionType<
    T extends number,
    P,
    X
> = PropDefinitionType<T, P, 'number', X>
export type FunctionPropDefinitionType<
    T extends (...args: Array<any>) => any,
    P,
    X
> = PropDefinitionType<T, P, 'function', X>
export type ArrayPropDefinitionType<
    T extends Array<any> | ReadonlyArray<any>,
    P,
    X
> = PropDefinitionType<T, P, 'array', X> // eslint-disable-line flowtype/no-mutable-array

export type ObjectPropDefinitionType<
    T extends Record<string, any>,
    P,
    X
> = PropDefinitionType<T, P, 'object', X>
export type MixedPropDefinitionType<P, X> =
    | BooleanPropDefinitionType<any, P, X>
    | StringPropDefinitionType<any, P, X>
    | NumberPropDefinitionType<any, P, X>
    | FunctionPropDefinitionType<any, P, X>
    | ObjectPropDefinitionType<any, P, X>
    | ArrayPropDefinitionType<any, P, X>
export type UserPropsDefinitionType<P, X> = Record<
    string,
    MixedPropDefinitionType<P, X>
>
export type BuiltInPropsDefinitionType<P, X> = {
    timeout: NumberPropDefinitionType<timeoutPropType, P, X>
    window: ObjectPropDefinitionType<windowPropType, P, X>
    close: FunctionPropDefinitionType<closePropType, P, X>
    focus: FunctionPropDefinitionType<focusPropType, P, X>
    resize: FunctionPropDefinitionType<resizePropType, P, X>
    uid: StringPropDefinitionType<uidPropType, P, X>
    cspNonce: StringPropDefinitionType<cspNoncePropType, P, X>
    getParent: FunctionPropDefinitionType<getParentPropType, P, X>
    getParentDomain: FunctionPropDefinitionType<getParentDomainPropType, P, X>
    hide: FunctionPropDefinitionType<hidePropType, P, X>
    show: FunctionPropDefinitionType<showPropType, P, X>
    export: FunctionPropDefinitionType<exportPropType<X>, P, X>
    onDisplay: FunctionPropDefinitionType<onDisplayPropType, P, X>
    onRendered: FunctionPropDefinitionType<onRenderedPropType, P, X>
    onRender: FunctionPropDefinitionType<onRenderPropType, P, X>
    onClose: FunctionPropDefinitionType<onClosePropType, P, X>
    onDestroy: FunctionPropDefinitionType<onDestroyPropType, P, X>
    onResize: FunctionPropDefinitionType<onClosePropType, P, X>
    onFocus: FunctionPropDefinitionType<onFocusPropType, P, X>
    onError: FunctionPropDefinitionType<onErrorPropType, P, X>
    onProps: FunctionPropDefinitionType<onPropsPropType<P>, P, X>
}
export type PropsDefinitionType<P, X> = BuiltInPropsDefinitionType<P, X> & {
    [key: string]: MixedPropDefinitionType<P, X>
}

const defaultNoop = () => noop;

// eslint-disable-next-line flowtype/require-exact-type
const decorateOnce = <F extends (...args: Array<any>) => any>({
    value
}: {
    value: F
}): F => once(value);

export function getBuiltInProps<P, X>(): BuiltInPropsDefinitionType<P, X> {
    return {
        window: {
            type:         'object',
            sendToChild:  false,
            required:     false,
            allowDelegate:true,
            validate:     ({ value }) => {
                if (!isWindow(value) && !ProxyWindow.isProxyWindow(value)) {
                    throw new Error(`Expected Window or ProxyWindow`);
                }

                if (isWindow(value)) {
                    // $FlowFixMe
                    if (isWindowClosed(value)) {
                        throw new Error(`Window is closed`);
                    }

                    // $FlowFixMe
                    if (!isSameDomain(value)) {
                        throw new Error(`Window is not same domain`);
                    }
                }
            },
            decorate: ({ value }) => {
                return toProxyWindow(value);
            }
        },
        timeout: {
            type:       'number',
            required:   false,
            sendToChild:false
        },
        close: {
            type:         'function',
            required:     false,
            sendToChild:  false,
            childDecorate:({ close }) => close
        },
        focus: {
            type:         'function',
            required:     false,
            sendToChild:  false,
            childDecorate:({ focus }) => focus
        },
        resize: {
            type:         'function',
            required:     false,
            sendToChild:  false,
            childDecorate:({ resize }) => resize
        },
        uid: {
            type:         'string',
            required:     false,
            sendToChild:  false,
            childDecorate:({ uid }) => uid
        },
        cspNonce: {
            type:    'string',
            required:false
        },
        getParent: {
            type:         'function',
            required:     false,
            sendToChild:  false,
            childDecorate:({ getParent }) => getParent
        },
        getParentDomain: {
            type:         'function',
            required:     false,
            sendToChild:  false,
            childDecorate:({ getParentDomain }) => getParentDomain
        },
        show: {
            type:         'function',
            required:     false,
            sendToChild:  false,
            childDecorate:({ show }) => show
        },
        hide: {
            type:         'function',
            required:     false,
            sendToChild:  false,
            childDecorate:({ hide }) => hide
        },
        export: {
            type:         'function',
            required:     false,
            sendToChild:  false,
            childDecorate:({ export: xport }) => xport
        },
        onDisplay: {
            type:         'function',
            required:     false,
            sendToChild:  false,
            allowDelegate:true,
            default:      defaultNoop,
            decorate:     decorateOnce
        },
        onRendered: {
            type:       'function',
            required:   false,
            sendToChild:false,
            default:    defaultNoop,
            decorate:   decorateOnce
        },
        onRender: {
            type:       'function',
            required:   false,
            sendToChild:false,
            default:    defaultNoop,
            decorate:   decorateOnce
        },
        onClose: {
            type:         'function',
            required:     false,
            sendToChild:  false,
            allowDelegate:true,
            default:      defaultNoop,
            decorate:     decorateOnce
        },
        onDestroy: {
            type:         'function',
            required:     false,
            sendToChild:  false,
            allowDelegate:true,
            default:      defaultNoop,
            decorate:     decorateOnce
        },
        onResize: {
            type:         'function',
            required:     false,
            sendToChild:  false,
            allowDelegate:true,
            default:      defaultNoop
        },
        onFocus: {
            type:         'function',
            required:     false,
            sendToChild:  false,
            allowDelegate:true,
            default:      defaultNoop
        },
        onError: {
            type:         'function',
            required:     false,
            sendToChild:  false,
            childDecorate:({ onError }) => onError
        },
        onProps: {
            type:         'function',
            required:     false,
            sendToChild:  false,
            default:      defaultNoop,
            childDecorate:({ onProps }) => onProps
        }
    };
}
type PropCallback<P, X, R> = ((
    arg0: string,
    arg1: BooleanPropDefinitionType<boolean, P, X>,
    arg2: boolean,
) => R) &
    ((
        arg0: string,
        arg1: StringPropDefinitionType<string, P, X>,
        arg2: string,
    ) => R) &
    ((
        arg0: string,
        arg1: NumberPropDefinitionType<number, P, X>,
        arg2: number,
    ) => R) &
    ((
        arg0: string,
        arg1: FunctionPropDefinitionType<(...args: Array<any>) => any, P, X>,
        arg2: (...args: Array<any>) => any,
    ) => R) &
    ((
        arg0: string,
        arg1: ArrayPropDefinitionType<
            ReadonlyArray<any> | ReadonlyArray<any>,
            P,
            X
        >,
        arg2: ReadonlyArray<any> | ReadonlyArray<any>,
    ) => R) &
    ((
        arg0: string,
        arg1: ObjectPropDefinitionType<Record<string, any>, P, X>,
        arg2: Record<string, any>,
    ) => R)
export function eachProp<P, X>(
    props: PropsType<P>,
    propsDef: PropsDefinitionType<P, X>,
    handler: PropCallback<P, X, void>
) {
    for (const key of Object.keys(props)) {
        const propDef = propsDef[key];
        const value = props[key];

        if (!propDef) {
            continue;
        }

        // $FlowFixMe[incompatible-call]
        handler(key, propDef, value);
    }
}
export function mapProps<P, X, T>(
    props: PropsType<P>,
    propsDef: PropsDefinitionType<P, X>,
    handler: PropCallback<P, X, T>
): ReadonlyArray<T> {
    const results = [];
    eachProp(props, propsDef, (key, propDef, value) => {
        // $FlowFixMe[incompatible-call]
        const result = handler(key, propDef, value);
        results.push(result);
    });
    return results;
}
