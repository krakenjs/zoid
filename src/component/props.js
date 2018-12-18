/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { once, noop } from 'belter/src';
import { isWindow, type CrossDomainWindowType } from 'cross-domain-utils/src';
import { ProxyWindow } from 'post-robot/src/serialize/window';

import { PROP_SERIALIZATION } from '../constants';

export type EventHandlerType<T> = (T) => void | ZalgoPromise<void>;

export type timeoutPropType = number;
export type windowPropType = CrossDomainWindowType | ProxyWindow;
export type closePropType = () => ZalgoPromise<void>;
export type focusPropType = () => ZalgoPromise<void>;
export type resizePropType = ({ width : ?number, height : ?number }) => ZalgoPromise<void>;

export type onDisplayPropType = EventHandlerType<void>;
export type onRenderedPropType = EventHandlerType<void>;
export type onRenderPropType = EventHandlerType<void>;
export type onClosePropType = EventHandlerType<void>;
export type onErrorPropType = EventHandlerType<mixed>;
export type onChangePropType<P> = ((PropsType<P>) => void) => void; // eslint-disable-line no-use-before-define

export type PropsInputType<P> = {
    timeout? : timeoutPropType,
    window? : windowPropType,

    onDisplay? : onDisplayPropType,
    onRendered? : onRenderedPropType,
    onRender? : onRenderPropType,
    onClose? : onClosePropType,
    onError? : onErrorPropType
} & P;

export type PropsType<P> = {|
    timeout? : timeoutPropType,
    window? : ?windowPropType,
    close? : ?closePropType,
    focus? : ?focusPropType,
    resize? : ?resizePropType,

    onDisplay : onDisplayPropType,
    onRendered : onRenderedPropType,
    onRender : onRenderPropType,
    onClose : onClosePropType,
    onError : onErrorPropType,
    onChange : onChangePropType<P>
|} & P;

type PropDefinitionType<T, P, S : string> = {|
    type : S,
    alias? : string,
    value? : ({ props : P, state : Object, close : () => ZalgoPromise<void>, focus : () => ZalgoPromise<void>, onError : (mixed) => ZalgoPromise<void> }) => ?T,
    required? : boolean,
    queryParam? : boolean | string | ({ value : T }) => (string | ZalgoPromise<string>),
    queryValue? : ({ value : T }) => (ZalgoPromise<mixed> | mixed),
    sendToChild? : boolean,
    allowDelegate? : boolean,
    validate? : ({ value : T, props : PropsInputType<P> }) => void,
    decorate? : ({ value : T, props : PropsType<P>, state : Object, close : () => ZalgoPromise<void>, focus : () => ZalgoPromise<void>, onError : (mixed) => ZalgoPromise<void> }) => T,
    default? : ({ props : P, state : Object }) => ?T,
    sameDomain? : boolean,
    serialization? : $Values<typeof PROP_SERIALIZATION>,
    childDecorate? : ({ value : T, close : () => ZalgoPromise<void>, focus : () => ZalgoPromise<void>, onError : (mixed) => ZalgoPromise<void>, onPropsChange : ((PropsType<P>) => void) => void, resize : ({ width : ?number, height : ?number }) => ZalgoPromise<void> }) => ?T
|};

export type BooleanPropDefinitionType<T : boolean, P> = PropDefinitionType<T, P, 'boolean'>;
export type StringPropDefinitionType<T : string, P> = PropDefinitionType<T, P, 'string'>;
export type NumberPropDefinitionType<T : number, P> = PropDefinitionType<T, P, 'number'>;
export type FunctionPropDefinitionType<T : Function, P> = PropDefinitionType<T, P, 'function'>;
export type ArrayPropDefinitionType<T : Array<*>, P> = PropDefinitionType<T, P, 'array'>; // eslint-disable-line flowtype/no-mutable-array
export type ObjectPropDefinitionType<T : Object, P> = PropDefinitionType<T, P, 'object'>;

export type MixedPropDefinitionType<P> = BooleanPropDefinitionType<*, P> | StringPropDefinitionType<*, P> | NumberPropDefinitionType<*, P> | FunctionPropDefinitionType<*, P> | ObjectPropDefinitionType<*, P> | ArrayPropDefinitionType<*, P>;

export type UserPropsDefinitionType<P> = {
    [string] : MixedPropDefinitionType<P>
};

// eslint-disable-next-line flowtype/require-exact-type
export type BuiltInPropsDefinitionType<P> = {
    timeout : NumberPropDefinitionType<timeoutPropType, P>,
    window : ObjectPropDefinitionType<windowPropType, P>,
    close : FunctionPropDefinitionType<closePropType, P>,
    focus : FunctionPropDefinitionType<focusPropType, P>,
    resize : FunctionPropDefinitionType<resizePropType, P>,

    onDisplay : FunctionPropDefinitionType<onDisplayPropType, P>,
    onRendered : FunctionPropDefinitionType<onRenderedPropType, P>,
    onRender : FunctionPropDefinitionType<onRenderPropType, P>,
    onClose : FunctionPropDefinitionType<onClosePropType, P>,
    onError : FunctionPropDefinitionType<onErrorPropType, P>,
    onChange : FunctionPropDefinitionType<onChangePropType<P>, P>
};

export function getInternalProps<P>() : BuiltInPropsDefinitionType<P> {
    return {
        window: {
            type:          'object',
            sendToChild:   false,
            required:      false,
            allowDelegate: true,
            validate({ value } : { value : CrossDomainWindowType | ProxyWindow }) {
                if (!isWindow(value) && !ProxyWindow.isProxyWindow(value)) {
                    throw new Error(`Expected Window or ProxyWindow`);
                }
            },
            decorate({ value } : { value : CrossDomainWindowType | ProxyWindow }) : ProxyWindow {
                return ProxyWindow.toProxyWindow(value);
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
            childDecorate: ({ close }) => {
                return close;
            }
        },

        focus: {
            type:          'function',
            required:      false,
            sendToChild:   false,
            childDecorate: ({ focus }) => {
                return focus;
            }
        },

        resize: {
            type:          'function',
            required:      false,
            sendToChild:   false,
            childDecorate: ({ resize }) => {
                return resize;
            }
        },

        onDisplay: {
            type:          'function',
            required:      false,
            sendToChild:   false,
            allowDelegate: true,
            default:       () => noop,
            decorate:      ({ value }) => once(value)
        },

        onRendered: {
            type:        'function',
            required:    false,
            sendToChild: false,
            default:     () => noop,
            decorate:    ({ value }) => once(value)
        },

        onRender: {
            type:        'function',
            required:    false,
            sendToChild: false,
            default:     () => noop,
            decorate:    ({ value }) => once(value)
        },

        onClose: {
            type:          'function',
            required:      false,
            sendToChild:   false,
            allowDelegate: true,
            default:       () => noop,
            decorate:      ({ value }) => once(value)
        },

        onError: {
            type:          'function',
            required:      false,
            sendToChild:   false,
            childDecorate: ({ onError }) => {
                return function childOnError(err : mixed) : ZalgoPromise<void> {
                    return onError(err);
                };
            }
        },

        onChange: {
            type:          'function',
            required:      false,
            sendToChild:   false,
            childDecorate: ({ onPropsChange }) => {
                return onPropsChange;
            }
        }
    };
}
