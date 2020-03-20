/* @flow */

import { type ZalgoPromise } from 'zalgo-promise/src';
import type { SameDomainWindowType } from 'cross-domain-utils/src';

import { uniqueID } from '../../lib';
import { type DimensionsType } from '../../types';

type PropDefinitionType<T, P, S : string> = {
    type : S,
    alias? : string,
    value? : T,
    required? : boolean,
    noop? : boolean,
    once? : boolean,
    memoize? : boolean,
    promisify? : boolean,
    queryParam? : boolean | string | (T) => (string | ZalgoPromise<string>),
    queryValue? : (T) => (ZalgoPromise<mixed> | mixed),
    sendToChild? : boolean,
    allowDelegate? : boolean,
    validate? : (T, PropsType & P) => void,
    decorate? : (T, PropsType & P) => (void | ZalgoPromise<T> | T),
    def? : (P) => ?T,
    sameDomain? : boolean,
    serialization? : 'json' | 'dotify',
    childDecorate? : (T) => ?T,
    denodeify? : boolean
};

export type BooleanPropDefinitionType<T : boolean, P> = PropDefinitionType<T, P, 'boolean'>;
export type StringPropDefinitionType<T : string, P> = PropDefinitionType<T, P, 'string'>;
export type NumberPropDefinitionType<T : number, P> = PropDefinitionType<T, P, 'number'>;
export type FunctionPropDefinitionType<T : Function, P> = PropDefinitionType<T, P, 'function'>;
export type ObjectPropDefinitionType<T : Object, P> = PropDefinitionType<T, P, 'object'>;

export type MixedPropDefinitionType<P> = BooleanPropDefinitionType<*, P> | StringPropDefinitionType<*, P> | NumberPropDefinitionType<*, P> | FunctionPropDefinitionType<*, P> | ObjectPropDefinitionType<*, P>;

export type UserPropsDefinitionType<P> = {
    [string] : MixedPropDefinitionType<P>
};

export type EventHandlerType<T> = (T) => void | ZalgoPromise<void>;

type envPropType = string;
type uidPropType = string;
type urlPropType = string;
type versionPropType = string;
type timeoutPropType = number;
type logLevelPropType = string;
type dimensionsPropType = DimensionsType;
type winPropType = SameDomainWindowType;

type onDisplayPropType = EventHandlerType<void>;
type onEnterPropType = EventHandlerType<void>;
type onRenderPropType = EventHandlerType<void>;
type onClosePropType = EventHandlerType<string>;
type onDestroyPropType = EventHandlerType<void>;
type onResizePropType = EventHandlerType<void>;
type onTimeoutPropType = EventHandlerType<Error>;
type onErrorPropType = EventHandlerType<mixed>;

export type BuiltInPropsType = {
    env : envPropType,
    uid : uidPropType,
    url? : urlPropType,
    version? : versionPropType,
    timeout? : timeoutPropType,
    logLevel : logLevelPropType,
    dimensions? : dimensionsPropType,
    win? : winPropType,

    onDisplay : onDisplayPropType,
    onEnter : onEnterPropType,
    onRender : onRenderPropType,
    onClose : onClosePropType,
    onDestroy : onDestroyPropType,
    onResize : onResizePropType,
    onTimeout : onTimeoutPropType,
    onError? : onErrorPropType
};

export type PropsType = {
    env? : envPropType,
    uid? : uidPropType,
    url? : urlPropType,
    version? : versionPropType,
    timeout? : timeoutPropType,
    logLevel? : logLevelPropType,
    dimensions? : dimensionsPropType,
    win? : winPropType,

    onDisplay? : onDisplayPropType,
    onEnter? : onEnterPropType,
    onRender? : onRenderPropType,
    onClose? : onClosePropType,
    onDestroy? : onDestroyPropType,
    onResize? : onResizePropType,
    onTimeout? : onTimeoutPropType,
    onError? : onErrorPropType
};

export type BuiltInPropsDefinitionType<P> = {
    env : StringPropDefinitionType<envPropType, P>,
    uid : StringPropDefinitionType<uidPropType, P>,
    url : StringPropDefinitionType<urlPropType, P>,
    version : StringPropDefinitionType<versionPropType, P>,
    timeout : NumberPropDefinitionType<timeoutPropType, P>,
    logLevel : StringPropDefinitionType<logLevelPropType, P>,
    dimensions : ObjectPropDefinitionType<dimensionsPropType, P>,
    win : ObjectPropDefinitionType<winPropType, P>,

    onDisplay : FunctionPropDefinitionType<onDisplayPropType, P>,
    onEnter : FunctionPropDefinitionType<onEnterPropType, P>,
    onRender : FunctionPropDefinitionType<onRenderPropType, P>,
    onClose : FunctionPropDefinitionType<onClosePropType, P>,
    onDestroy : FunctionPropDefinitionType<onDestroyPropType, P>,
    onResize : FunctionPropDefinitionType<onResizePropType, P>,
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
            required:   false,
            queryParam: true,
            def() : string {
                return this.defaultEnv;
            }
        },

        uid: {
            type: 'string',
            def() : string {
                return uniqueID();
            },
            queryParam: true
        },

        logLevel: {
            type:       'string',
            required:   false,
            queryParam: true,
            def() : string {
                return this.defaultLogLevel;
            }
        },

        // A custom url to use to render the component

        url: {
            type:        'string',
            required:    false,
            promise:     true,
            sendToChild: false
        },

        win: {
            type:        'object',
            required:    false,
            sendToChild: false
        },

        dimensions: {
            type:     'object',
            required: false
        },

        version: {
            type:       'string',
            required:   false,
            queryParam: true,
            def() : string {
                return this.version;
            }
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
            noop:        true,
            promisify:   true,
            memoize:     true,
            sendToChild: false
        },

        onEnter: {
            type:        'function',
            required:    false,
            noop:        true,
            promisify:   true,
            sendToChild: false
        },

        // When we get an INIT message from the child

        onRender: {
            type:        'function',
            required:    false,
            noop:        true,
            promisify:   true,
            sendToChild: false
        },

        // When the user closes the component.

        onClose: {
            type:        'function',
            required:    false,
            noop:        true,
            once:        true,
            promisify:   true,
            sendToChild: false
        },

        onDestroy: {
            type:        'function',
            required:    false,
            noop:        true,
            once:        true,
            promisify:   true,
            sendToChild: false
        },

        onResize: {
            type:        'function',
            required:    false,
            noop:        true,
            sendToChild: false
        },

        // When we time-out before getting an INIT message from the child. Defaults to onError if no handler passed.

        onTimeout: {
            type:        'function',
            required:    false,
            memoize:     true,
            promisify:   true,
            sendToChild: false,
            def() : (() => void) {
                return function onTimeout(err : mixed) : void {
                    if (this.props.onError) {
                        return this.props.onError(err);
                    }
                    throw err;
                };
            }
        },

        // When the component experiences an error

        onError: {
            type:        'function',
            required:    false,
            promisify:   true,
            sendToChild: true,
            once:        true,
            def() : (() => void) {
                return function onError(err : mixed) {
                    setTimeout(() => {
                        throw err;
                    });
                };
            }
        }
    };
}
