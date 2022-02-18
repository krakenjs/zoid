/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { once, noop, type EventEmitterType } from 'belter/src';
import { isWindow, type CrossDomainWindowType, isWindowClosed, isSameDomain } from 'cross-domain-utils/src';
import { ProxyWindow, toProxyWindow } from 'post-robot/src';

import type { CssDimensionsType } from '../types';
import { PROP_SERIALIZATION, PROP_TYPE } from '../constants';

export type EventHandlerType<T> = (T) => void | ZalgoPromise<void>;
export type Sibling = {|
    props : mixed,
    exports : mixed
|};

export type timeoutPropType = number;
export type windowPropType = CrossDomainWindowType | ProxyWindow;
export type cspNoncePropType = string;
export type uidPropType = string;
export type tagPropType = string;
export type closePropType = () => ZalgoPromise<void>;
export type focusPropType = () => ZalgoPromise<void>;
export type showPropType = () => ZalgoPromise<void>;
export type exportPropType<X> = (X) => ZalgoPromise<void>;
export type getSiblingsPropType = (opts? : {| anyParent? : boolean |}) => $ReadOnlyArray<Sibling>;
export type hidePropType = () => ZalgoPromise<void>;
export type resizePropType = ({| width : ?number, height : ?number |}) => ZalgoPromise<void>;
export type getParentPropType = () => CrossDomainWindowType;
export type getParentDomainPropType = () => string;

export type onDisplayPropType = EventHandlerType<void>;
export type onRenderedPropType = EventHandlerType<void>;
export type onRenderPropType = EventHandlerType<void>;
export type onClosePropType = EventHandlerType<void>;
export type onDestroyPropType = EventHandlerType<void>;
export type onResizePropType = EventHandlerType<void>;
export type onFocusPropType = EventHandlerType<void>;
export type onErrorPropType = EventHandlerType<mixed>;
export type onPropsPropType<P> = ((PropsType<P>) => void) => {| cancel : () => void |}; // eslint-disable-line no-use-before-define

export type ParentPropType<P, X> = {|
    uid : string,
    // eslint-disable-next-line no-use-before-define
    props : PropsType<P>,
    export : exportPropType<X>
|};

export type PropsInputType<P> = {|
    parent? : ParentPropType<mixed, mixed>,
    
    timeout? : timeoutPropType,
    window? : windowPropType,
    cspNonce? : ?cspNoncePropType,

    onDisplay? : onDisplayPropType,
    onRendered? : onRenderedPropType,
    onRender? : onRenderPropType,
    onClose? : onClosePropType,
    onDestroy? : onDestroyPropType,
    onResize? : onResizePropType,
    onFocus? : onFocusPropType,
    onError? : onErrorPropType,
    onProps? : onPropsPropType<P>,

    ...P
|};

export type PropsType<P> = {|
    timeout? : timeoutPropType,
    window? : ?windowPropType,
    cspNonce? : ?cspNoncePropType,
    dimensions : CssDimensionsType,

    onDisplay : onDisplayPropType,
    onRendered : onRenderedPropType,
    onRender : onRenderPropType,
    onClose : onClosePropType,
    onDestroy : onDestroyPropType,
    onResize : onResizePropType,
    onFocus : onFocusPropType,
    onError : onErrorPropType,
    onProps : onPropsPropType<P>,
    
    ...P
|};

type onErrorChildPropType = (mixed) => ZalgoPromise<void>;

export type ChildPropsType<P, X> = {|
    ...PropsType<P>,

    parent? : ParentPropType<mixed, mixed>,
    uid : uidPropType,
    tag : tagPropType,
    close : closePropType,
    focus : focusPropType,
    show : showPropType,
    hide : hidePropType,
    export : exportPropType<X>,
    getParent : getParentPropType,
    getParentDomain : getParentDomainPropType,
    resize : resizePropType,
    onError : onErrorChildPropType,
    onProps : onPropsPropType<P>,
    getSiblings : getSiblingsPropType
|};

export type PropDefinitionType<T, P, S : $Values<typeof PROP_TYPE>, X> = {|
    type : S,
    alias? : string,
    value? : ({|
        props : P,
        state : Object,
        close : () => ZalgoPromise<void>,
        focus : () => ZalgoPromise<void>,
        onError : (mixed) => ZalgoPromise<void>,
        container : HTMLElement | void,
        event : EventEmitterType
    |}) => ?T,
    default? : ({|
        props : P,
        state : Object,
        close : () => ZalgoPromise<void>,
        focus : () => ZalgoPromise<void>,
        onError : (mixed) => ZalgoPromise<void>,
        container : HTMLElement | void,
        event : EventEmitterType
    |}) => ?T,
    decorate? : ({|
        value : T,
        props : PropsType<P>,
        state : Object,
        close : () => ZalgoPromise<void>,
        focus : () => ZalgoPromise<void>,
        onError : (mixed) => ZalgoPromise<void>,
        container : HTMLElement | void,
        event : EventEmitterType
    |}) => T,
    childDecorate? : ({|
        value : ?T,
        uid : uidPropType,
        tag : tagPropType,
        close : closePropType,
        focus : focusPropType,
        onError : onErrorPropType,
        onProps : onPropsPropType<P>,
        resize : resizePropType,
        getParentDomain : getParentDomainPropType,
        getParent : getParentPropType,
        show : showPropType,
        hide : hidePropType,
        export : exportPropType<X>,
        getSiblings : getSiblingsPropType
    |}) => ?T,
    required? : boolean,
    queryParam? : boolean | string | ({| value : T |}) => (string | ZalgoPromise<string>),
    bodyParam? : boolean | string | ({| value : T |}) => (string | ZalgoPromise<string>),
    // eslint-disable-next-line no-undef
    queryValue? : <R>({| value : T |}) => (ZalgoPromise<R> | R | string),
    // eslint-disable-next-line no-undef
    bodyValue? : <R>({| value : T |}) => (ZalgoPromise<R> | R | string),
    sendToChild? : boolean,
    allowDelegate? : boolean,
    validate? : ({| value : T, props : PropsType<P> |}) => void,
    sameDomain? : boolean,
    serialization? : $Values<typeof PROP_SERIALIZATION>
|};

export type BOOLEAN_DEFINITION_TYPE = typeof PROP_TYPE.BOOLEAN;
export type STRING_DEFINITION_TYPE = typeof PROP_TYPE.STRING;
export type NUMBER_DEFINITION_TYPE = typeof PROP_TYPE.NUMBER;
export type FUNCTION_DEFINITION_TYPE = typeof PROP_TYPE.FUNCTION;
export type ARRAY_DEFINITION_TYPE = typeof PROP_TYPE.ARRAY;
export type OBJECT_DEFINITION_TYPE = typeof PROP_TYPE.OBJECT;

export type DEFINITION_TYPE =
        BOOLEAN_DEFINITION_TYPE | STRING_DEFINITION_TYPE | NUMBER_DEFINITION_TYPE |
        FUNCTION_DEFINITION_TYPE | ARRAY_DEFINITION_TYPE | OBJECT_DEFINITION_TYPE;


export type BooleanPropDefinitionType<T : boolean, P, X> = PropDefinitionType<T, P, BOOLEAN_DEFINITION_TYPE, X>;
export type StringPropDefinitionType<T : string, P, X> = PropDefinitionType<T, P, STRING_DEFINITION_TYPE, X>;
export type NumberPropDefinitionType<T : number, P, X> = PropDefinitionType<T, P, NUMBER_DEFINITION_TYPE, X>;
export type FunctionPropDefinitionType<T : Function, P, X> = PropDefinitionType<T, P, FUNCTION_DEFINITION_TYPE, X>;
export type ArrayPropDefinitionType<T : Array<*> | $ReadOnlyArray<*>, P, X> = PropDefinitionType<T, P, ARRAY_DEFINITION_TYPE, X>; // eslint-disable-line flowtype/no-mutable-array
export type ObjectPropDefinitionType<T : Object, P, X> = PropDefinitionType<T, P, OBJECT_DEFINITION_TYPE, X>;

export type MixedPropDefinitionType<P, X> =
    BooleanPropDefinitionType<*, P, X> |
    StringPropDefinitionType<*, P, X> |
    NumberPropDefinitionType<*, P, X> |
    FunctionPropDefinitionType<*, P, X> |
    ObjectPropDefinitionType<*, P, X> |
    ArrayPropDefinitionType<*, P, X>;

export type UserPropsDefinitionType<P, X> = {|
    [string] : MixedPropDefinitionType<P, X>
|};

export type BuiltInPropsDefinitionType<P, X> = {|
    timeout : NumberPropDefinitionType<timeoutPropType, P, X>,
    window : ObjectPropDefinitionType<windowPropType, P, X>,
    close : FunctionPropDefinitionType<closePropType, P, X>,
    focus : FunctionPropDefinitionType<focusPropType, P, X>,
    resize : FunctionPropDefinitionType<resizePropType, P, X>,
    uid : StringPropDefinitionType<uidPropType, P, X>,
    tag : StringPropDefinitionType<tagPropType, P, X>,
    cspNonce : StringPropDefinitionType<cspNoncePropType, P, X>,
    getParent : FunctionPropDefinitionType<getParentPropType, P, X>,
    getParentDomain : FunctionPropDefinitionType<getParentDomainPropType, P, X>,
    hide : FunctionPropDefinitionType<hidePropType, P, X>,
    show : FunctionPropDefinitionType<showPropType, P, X>,
    export : FunctionPropDefinitionType<exportPropType<X>, P, X>,
    getSiblings : FunctionPropDefinitionType<getSiblingsPropType, P, X>,

    onDisplay : FunctionPropDefinitionType<onDisplayPropType, P, X>,
    onRendered : FunctionPropDefinitionType<onRenderedPropType, P, X>,
    onRender : FunctionPropDefinitionType<onRenderPropType, P, X>,
    onClose : FunctionPropDefinitionType<onClosePropType, P, X>,
    onDestroy : FunctionPropDefinitionType<onDestroyPropType, P, X>,
    onResize : FunctionPropDefinitionType<onClosePropType, P, X>,
    onFocus : FunctionPropDefinitionType<onFocusPropType, P, X>,
    onError : FunctionPropDefinitionType<onErrorPropType, P, X>,
    onProps : FunctionPropDefinitionType<onPropsPropType<P>, P, X>
|};

export type PropsDefinitionType<P, X> = {|
    ...BuiltInPropsDefinitionType<P, X>,
    [ string ] : MixedPropDefinitionType<P, X>
|};

const defaultNoop = () => noop;
// eslint-disable-next-line flowtype/require-exact-type
const decorateOnce = <F : Function>({ value } : { value : F }) : F => once(value);

export function getBuiltInProps<P, X>() : BuiltInPropsDefinitionType<P, X> {
    return {
        window: {
            type:          PROP_TYPE.OBJECT,
            sendToChild:   false,
            required:      false,
            allowDelegate: true,
            validate:      ({ value }) => {
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
            type:        PROP_TYPE.NUMBER,
            required:    false,
            sendToChild: false
        },

        cspNonce: {
            type:     PROP_TYPE.STRING,
            required: false
        },

        onDisplay: {
            type:          PROP_TYPE.FUNCTION,
            required:      false,
            sendToChild:   false,
            allowDelegate: true,
            default:       defaultNoop,
            decorate:      decorateOnce
        },

        onRendered: {
            type:        PROP_TYPE.FUNCTION,
            required:    false,
            sendToChild: false,
            default:     defaultNoop,
            decorate:    decorateOnce
        },

        onRender: {
            type:        PROP_TYPE.FUNCTION,
            required:    false,
            sendToChild: false,
            default:     defaultNoop,
            decorate:    decorateOnce
        },

        onClose: {
            type:          PROP_TYPE.FUNCTION,
            required:      false,
            sendToChild:   false,
            allowDelegate: true,
            default:       defaultNoop,
            decorate:      decorateOnce
        },

        onDestroy: {
            type:          PROP_TYPE.FUNCTION,
            required:      false,
            sendToChild:   false,
            allowDelegate: true,
            default:       defaultNoop,
            decorate:      decorateOnce
        },

        onResize: {
            type:          PROP_TYPE.FUNCTION,
            required:      false,
            sendToChild:   false,
            allowDelegate: true,
            default:       defaultNoop
        },

        onFocus: {
            type:          PROP_TYPE.FUNCTION,
            required:      false,
            sendToChild:   false,
            allowDelegate: true,
            default:       defaultNoop
        },

        close: {
            type:          PROP_TYPE.FUNCTION,
            required:      false,
            sendToChild:   false,
            childDecorate: ({ close }) => close
        },

        focus: {
            type:          PROP_TYPE.FUNCTION,
            required:      false,
            sendToChild:   false,
            childDecorate: ({ focus }) => focus
        },

        resize: {
            type:          PROP_TYPE.FUNCTION,
            required:      false,
            sendToChild:   false,
            childDecorate: ({ resize }) => resize
        },

        uid: {
            type:          PROP_TYPE.STRING,
            required:      false,
            sendToChild:   false,
            childDecorate: ({ uid }) => uid
        },

        tag: {
            type:          PROP_TYPE.STRING,
            required:      false,
            sendToChild:   false,
            childDecorate: ({ tag }) => tag
        },

        getParent: {
            type:          PROP_TYPE.FUNCTION,
            required:      false,
            sendToChild:   false,
            childDecorate: ({ getParent }) => getParent
        },

        getParentDomain: {
            type:          PROP_TYPE.FUNCTION,
            required:      false,
            sendToChild:   false,
            childDecorate: ({ getParentDomain }) => getParentDomain
        },

        show: {
            type:          PROP_TYPE.FUNCTION,
            required:      false,
            sendToChild:   false,
            childDecorate: ({ show }) => show
        },

        hide: {
            type:          PROP_TYPE.FUNCTION,
            required:      false,
            sendToChild:   false,
            childDecorate: ({ hide }) => hide
        },

        export: {
            type:          PROP_TYPE.FUNCTION,
            required:      false,
            sendToChild:   false,
            childDecorate: ({ 'export': xport }) => xport
        },

        onError: {
            type:          PROP_TYPE.FUNCTION,
            required:      false,
            sendToChild:   false,
            childDecorate: ({ onError }) => onError
        },

        onProps: {
            type:          PROP_TYPE.FUNCTION,
            required:      false,
            sendToChild:   false,
            childDecorate: ({ onProps }) => onProps
        },

        getSiblings: {
            type:          PROP_TYPE.FUNCTION,
            required:      false,
            sendToChild:   false,
            childDecorate: ({ getSiblings }) => getSiblings
        }
    };
}

type PropCallback<P, X, R> =
    ((string, BooleanPropDefinitionType<boolean, P, X> | void, boolean) => R) &
    ((string, StringPropDefinitionType<string, P, X> | void, string) => R) &
    ((string, NumberPropDefinitionType<number, P, X> | void, number) => R) &
    ((string, FunctionPropDefinitionType<Function, P, X> | void, Function) => R) &
    ((string, ArrayPropDefinitionType<$ReadOnlyArray<*> | $ReadOnlyArray<*>, P, X>  | void, $ReadOnlyArray<*> | $ReadOnlyArray<*>) => R) &
    ((string, ObjectPropDefinitionType<Object, P, X>  | void, Object) => R);

export function eachProp<P, X>(props : PropsType<P>, propsDef : PropsDefinitionType<P, X>, handler : PropCallback<P, X, void>) {
    // $FlowFixMe[cannot-spread-indexer]
    for (const key of Object.keys({ ...props, ...propsDef })) {
        const propDef = propsDef[key];
        const value = props[key];

        // $FlowFixMe[incompatible-call]
        handler(key, propDef, value);
    }
}

export function mapProps<P, X, T>(props : PropsType<P>, propsDef : PropsDefinitionType<P, X>, handler : PropCallback<P, X, T>) : $ReadOnlyArray<T> {
    const results = [];

    eachProp(props, propsDef, (key, propDef, value) => {
        // $FlowFixMe[incompatible-call]
        const result = handler(key, propDef, value);
        results.push(result);
    });
    return results;
}
