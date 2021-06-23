/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { once, noop, type EventEmitterType } from 'belter/src';
import { isWindow, type CrossDomainWindowType, isWindowClosed, isSameDomain } from 'cross-domain-utils/src';
import { ProxyWindow, toProxyWindow } from 'post-robot/src';

import { PROP_SERIALIZATION } from '../constants';

export type EventHandlerType<T> = (T) => void | ZalgoPromise<void>;

export type timeoutPropType = number;
export type windowPropType = CrossDomainWindowType | ProxyWindow;
export type cspNoncePropType = string;
export type uidPropType = string;
export type closePropType = () => ZalgoPromise<void>;
export type focusPropType = () => ZalgoPromise<void>;
export type showPropType = () => ZalgoPromise<void>;
export type exportPropType<X> = (X) => ZalgoPromise<void>;
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
export type onPropsPropType<P> = ((PropsType<P>) => void) => void; // eslint-disable-line no-use-before-define

// eslint-disable-next-line flowtype/require-exact-type
export type PropsInputType<P> = {
    timeout? : timeoutPropType,
    window? : windowPropType,
    cspNonce? : cspNoncePropType,

    onDisplay? : onDisplayPropType,
    onRendered? : onRenderedPropType,
    onRender? : onRenderPropType,
    onClose? : onClosePropType,
    onDestroy? : onDestroyPropType,
    onResize? : onResizePropType,
    onFocus? : onFocusPropType,
    onError? : onErrorPropType,
    onProps? : onPropsPropType<P>
} & P;

// eslint-disable-next-line flowtype/require-exact-type
export type PropsType<P> = {
    timeout? : timeoutPropType,
    window? : ?windowPropType,
    close? : ?closePropType,
    focus? : ?focusPropType,
    resize? : ?resizePropType,
    uid : uidPropType,
    cspNonce? : ?cspNoncePropType,

    onDisplay : onDisplayPropType,
    onRendered : onRenderedPropType,
    onRender : onRenderPropType,
    onClose : onClosePropType,
    onDestroy : onDestroyPropType,
    onResize : onResizePropType,
    onFocus : onFocusPropType,
    onError : onErrorPropType,
    onProps : onPropsPropType<P>
} & P;

type PropDefinitionType<T, P, S : string, X> = {|
    type : S,
    alias? : string,
    value? : ({|
        props : P,
        state : Object,
        close : () => ZalgoPromise<void>,
        focus : () => ZalgoPromise<void>,
        onError : (mixed) => ZalgoPromise<void>,
        event : EventEmitterType
    |}) => ?T,
    default? : ({|
        props : P,
        state : Object,
        close : () => ZalgoPromise<void>,
        focus : () => ZalgoPromise<void>,
        onError : (mixed) => ZalgoPromise<void>,
        event : EventEmitterType
    |}) => ?T,
    decorate? : ({|
        value : T,
        props : PropsType<P>,
        state : Object,
        close : () => ZalgoPromise<void>,
        focus : () => ZalgoPromise<void>,
        onError : (mixed) => ZalgoPromise<void>,
        event : EventEmitterType
    |}) => T,
    childDecorate? : ({|
        value : ?T,
        uid : string,
        close : () => ZalgoPromise<void>,
        focus : () => ZalgoPromise<void>,
        onError : (mixed) => ZalgoPromise<void>,
        onProps : ((PropsType<P>) => void) => void,
        resize : ({| width : ?number, height : ?number |}) => ZalgoPromise<void>,
        getParentDomain : () => string,
        getParent : () => CrossDomainWindowType,
        show : () => ZalgoPromise<void>,
        hide : () => ZalgoPromise<void>,
        export : (X) => ZalgoPromise<void>
    |}) => ?T,
    required? : boolean,
    queryParam? : boolean | string | ({| value : T |}) => (string | ZalgoPromise<string>),
    queryValue? : ({| value : T |}) => (ZalgoPromise<string> | string),
    sendToChild? : boolean,
    allowDelegate? : boolean,
    validate? : ({| value : T, props : PropsInputType<P> |}) => void,
    sameDomain? : boolean,
    serialization? : $Values<typeof PROP_SERIALIZATION>
|};

export type BooleanPropDefinitionType<T : boolean, P, X> = PropDefinitionType<T, P, 'boolean', X>;
export type StringPropDefinitionType<T : string, P, X> = PropDefinitionType<T, P, 'string', X>;
export type NumberPropDefinitionType<T : number, P, X> = PropDefinitionType<T, P, 'number', X>;
export type FunctionPropDefinitionType<T : Function, P, X> = PropDefinitionType<T, P, 'function', X>;
export type ArrayPropDefinitionType<T : Array<*> | $ReadOnlyArray<*>, P, X> = PropDefinitionType<T, P, 'array', X>; // eslint-disable-line flowtype/no-mutable-array
export type ObjectPropDefinitionType<T : Object, P, X> = PropDefinitionType<T, P, 'object', X>;

export type MixedPropDefinitionType<P, X> = BooleanPropDefinitionType<*, P, X> | StringPropDefinitionType<*, P, X> | NumberPropDefinitionType<*, P, X> | FunctionPropDefinitionType<*, P, X> | ObjectPropDefinitionType<*, P, X> | ArrayPropDefinitionType<*, P, X>;

export type UserPropsDefinitionType<P, X> = {
    [string] : MixedPropDefinitionType<P, X>
};

export type BuiltInPropsDefinitionType<P, X> = {|
    timeout : NumberPropDefinitionType<timeoutPropType, P, X>,
    window : ObjectPropDefinitionType<windowPropType, P, X>,
    close : FunctionPropDefinitionType<closePropType, P, X>,
    focus : FunctionPropDefinitionType<focusPropType, P, X>,
    resize : FunctionPropDefinitionType<resizePropType, P, X>,
    uid : StringPropDefinitionType<uidPropType, P, X>,
    cspNonce : StringPropDefinitionType<cspNoncePropType, P, X>,
    getParent : FunctionPropDefinitionType<getParentPropType, P, X>,
    getParentDomain : FunctionPropDefinitionType<getParentDomainPropType, P, X>,
    hide : FunctionPropDefinitionType<hidePropType, P, X>,
    show : FunctionPropDefinitionType<showPropType, P, X>,
    export : FunctionPropDefinitionType<exportPropType<X>, P, X>,

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
const decorateOnce = ({ value }) => once(value);

export function getBuiltInProps<P, X>() : BuiltInPropsDefinitionType<P, X> {
    return {
        window: {
            type:          'object',
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
            type:        'number',
            required:    false,
            sendToChild: false
        },

        close: {
            type:          'function',
            required:      false,
            sendToChild:   false,
            childDecorate: ({ close }) => close
        },

        focus: {
            type:          'function',
            required:      false,
            sendToChild:   false,
            childDecorate: ({ focus }) => focus
        },

        resize: {
            type:          'function',
            required:      false,
            sendToChild:   false,
            childDecorate: ({ resize }) => resize
        },

        uid: {
            type:          'string',
            required:      false,
            sendToChild:   false,
            childDecorate: ({ uid }) => uid
        },

        cspNonce: {
            type:     'string',
            required: false
        },

        getParent: {
            type:          'function',
            required:      false,
            sendToChild:   false,
            childDecorate: ({ getParent }) => getParent
        },

        getParentDomain: {
            type:          'function',
            required:      false,
            sendToChild:   false,
            childDecorate: ({ getParentDomain }) => getParentDomain
        },

        show: {
            type:          'function',
            required:      false,
            sendToChild:   false,
            childDecorate: ({ show }) => show
        },

        hide: {
            type:          'function',
            required:      false,
            sendToChild:   false,
            childDecorate: ({ hide }) => hide
        },

        export: {
            type:          'function',
            required:      false,
            sendToChild:   false,
            childDecorate: ({ 'export': xport }) => xport
        },

        onDisplay: {
            type:          'function',
            required:      false,
            sendToChild:   false,
            allowDelegate: true,
            default:       defaultNoop,
            decorate:      decorateOnce
        },

        onRendered: {
            type:        'function',
            required:    false,
            sendToChild: false,
            default:     defaultNoop,
            decorate:    decorateOnce
        },

        onRender: {
            type:        'function',
            required:    false,
            sendToChild: false,
            default:     defaultNoop,
            decorate:    decorateOnce
        },

        onClose: {
            type:          'function',
            required:      false,
            sendToChild:   false,
            allowDelegate: true,
            default:       defaultNoop,
            decorate:      decorateOnce
        },

        onDestroy: {
            type:          'function',
            required:      false,
            sendToChild:   false,
            allowDelegate: true,
            default:       defaultNoop,
            decorate:      decorateOnce
        },

        onResize: {
            type:          'function',
            required:      false,
            sendToChild:   false,
            allowDelegate: true,
            default:       defaultNoop
        },

        onFocus: {
            type:          'function',
            required:      false,
            sendToChild:   false,
            allowDelegate: true,
            default:       defaultNoop
        },

        onError: {
            type:          'function',
            required:      false,
            sendToChild:   false,
            childDecorate: ({ onError }) => onError
        },

        onProps: {
            type:          'function',
            required:      false,
            sendToChild:   false,
            default:       defaultNoop,
            childDecorate: ({ onProps }) => onProps
        }
    };
}
