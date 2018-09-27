/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { uniqueID, once, memoize, noop, promisify } from 'belter/src';

import { type DimensionsType } from '../../types';

import type { Component } from './index';

type PropDefinitionType<T, P, S : string> = {|
    type : S,
    alias? : string,
    value? : () => ?T,
    required? : boolean,
    queryParam? : boolean | string | (T) => (string | ZalgoPromise<string>),
    queryValue? : (T) => (ZalgoPromise<mixed> | mixed),
    sendToChild? : boolean,
    allowDelegate? : boolean,
    validate? : (T, PropsType & P) => void,
    decorate? : (T, PropsType & P) => (T | void),
    def? : (P, Component<P>) => ? T,
    sameDomain? : boolean,
    serialization? : 'json' | 'dotify',
    childDecorate? : (T) => ?T
|};

export type BooleanPropDefinitionType<T : boolean, P> = PropDefinitionType<T, P, 'boolean'>;
export type StringPropDefinitionType<T : string, P> = PropDefinitionType<T, P, 'string'>;
export type NumberPropDefinitionType<T : number, P> = PropDefinitionType<T, P, 'number'>;
export type FunctionPropDefinitionType<T : Function, P> = PropDefinitionType<T, P, 'function'>;
export type ArrayPropDefinitionType<T : Array<*>, P> = PropDefinitionType<T, P, 'array'>;
export type ObjectPropDefinitionType<T : Object, P> = PropDefinitionType<T, P, 'object'>;

export type MixedPropDefinitionType<P> = BooleanPropDefinitionType<*, P> | StringPropDefinitionType<*, P> | NumberPropDefinitionType<*, P> | FunctionPropDefinitionType<*, P> | ObjectPropDefinitionType<*, P> | ArrayPropDefinitionType<*, P>;

export type UserPropsDefinitionType<P> = {
    [string] : MixedPropDefinitionType<P>
};

export type EventHandlerType<T> = (T) => void | ZalgoPromise<void>;

type envPropType = string;
type uidPropType = string;
type urlPropType = string;
type timeoutPropType = number;
type dimensionsPropType = DimensionsType;

type onDisplayPropType = EventHandlerType<void>;
type onEnterPropType = EventHandlerType<void>;
type onRenderPropType = EventHandlerType<void>;
type onClosePropType = EventHandlerType<string>;
type onTimeoutPropType = EventHandlerType<Error>;
type onErrorPropType = EventHandlerType<mixed>;

export type BuiltInPropsType = {
    env : envPropType,
    uid : uidPropType,
    timeout? : timeoutPropType,
    dimensions? : dimensionsPropType,

    onDisplay : onDisplayPropType,
    onEnter : onEnterPropType,
    onRender : onRenderPropType,
    onClose : onClosePropType,
    onTimeout : onTimeoutPropType,
    onError? : onErrorPropType
};

export type PropsType = {
    env? : envPropType,
    uid? : uidPropType,
    url? : urlPropType,
    timeout? : timeoutPropType,
    dimensions? : dimensionsPropType,

    onDisplay? : onDisplayPropType,
    onEnter? : onEnterPropType,
    onRender? : onRenderPropType,
    onClose? : onClosePropType,
    onTimeout? : onTimeoutPropType,
    onError? : onErrorPropType
};

export type BuiltInPropsDefinitionType<P> = {
    env : StringPropDefinitionType<envPropType, P>,
    uid : StringPropDefinitionType<uidPropType, P>,
    timeout : NumberPropDefinitionType<timeoutPropType, P>,
    dimensions : ObjectPropDefinitionType<dimensionsPropType, P>,

    onDisplay : FunctionPropDefinitionType<onDisplayPropType, P>,
    onEnter : FunctionPropDefinitionType<onEnterPropType, P>,
    onRender : FunctionPropDefinitionType<onRenderPropType, P>,
    onClose : FunctionPropDefinitionType<onClosePropType, P>,
    onTimeout : FunctionPropDefinitionType<onTimeoutPropType, P>,
    onError : FunctionPropDefinitionType<onErrorPropType, P>
};

/*  Internal Props
    --------------

    We define and use certain props by default, for configuration and events that are used at the framework level.
    These follow the same format as regular props, and are classed as reserved words that may not be overriden by users.
*/

export function getInternalProps<P>() : BuiltInPropsDefinitionType<P> {
    return {

        // The desired env in which the component is being rendered. Used to determine the correct url

        env: {
            type:       'string',
            queryParam: true,
            required:   false,
            def(props, component) : ?string {
                return component.defaultEnv;
            }
        },

        uid: {
            type: 'string',
            def() : string {
                return uniqueID();
            },
            queryParam: true
        },

        dimensions: {
            type:     'object',
            required: false
        },

        // A millisecond timeout before onTimeout is called

        timeout: {
            type:        'number',
            required:    false,
            sendToChild: false
        },

        onDisplay: {
            type:        'function',
            required:    false,
            sendToChild: false,

            def() : Function {
                return noop;
            },

            decorate(onDisplay : Function) : Function {
                return memoize(promisify(onDisplay));
            }
        },

        onEnter: {
            type:        'function',
            required:    false,
            sendToChild: false,

            def() : Function {
                return noop;
            },

            decorate(onEnter : Function) : Function {
                return promisify(onEnter);
            }
        },

        // When we get an INIT message from the child

        onRender: {
            type:        'function',
            required:    false,
            sendToChild: false,

            def() : Function {
                return noop;
            },

            decorate(onRender : Function) : Function {
                return promisify(onRender);
            }
        },

        // When the user closes the component.

        onClose: {
            type:        'function',
            required:    false,
            sendToChild: false,

            def() : Function {
                return noop;
            },

            decorate(onClose : Function) : Function {
                return once(promisify(onClose));
            }
        },

        // When we time-out before getting an INIT message from the child. Defaults to onError if no handler passed.

        onTimeout: {
            type:        'function',
            required:    false,
            sendToChild: false,
            def() : Function {
                return function onTimeout(err : mixed) : void {
                    return this.props.onError(err);
                };
            },
            decorate(onTimeout : Function) : Function {
                return memoize(promisify(onTimeout));
            }
        },

        // When the component experiences an error

        onError: {
            type:        'function',
            required:    false,
            sendToChild: true,
            def() : (() => void) {
                return function onError(err : mixed) {
                    setTimeout(() => {
                        throw err;
                    });
                };
            },

            decorate(onError : Function) : Function {
                return once(promisify(onError));
            }
        }
    };
}
