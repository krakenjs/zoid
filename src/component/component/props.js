/* @flow */

import { type ZalgoPromise } from 'zalgo-promise/src';

import { uniqueID } from '../../lib';

export type EventHandlerType = () => ?ZalgoPromise<void>;

export type BuiltInPropsType = {
    env : string,
    uid : string,
    url? : string,
    version? : string,
    timeout? : number,
    logLevel : string,

    onDisplay : EventHandlerType,
    onEnter : EventHandlerType,
    onRender : EventHandlerType,
    onClose : (string) => ?ZalgoPromise<void>,
    onTimeout : EventHandlerType,
    onError? : EventHandlerType
};

export type PropsType = {
    env? : string,
    uid? : string,
    url? : string,
    version? : string,
    timeout? : number,
    logLevel? : string,

    onDisplay? : EventHandlerType,
    onEnter? : EventHandlerType,
    onRender? : EventHandlerType,
    onClose? : (string) => ?ZalgoPromise<void>,
    onTimeout? : EventHandlerType,
    onError? : EventHandlerType
};

export type PropTypeEnum = string | boolean | number | Object | Function;

export type PropStringType   = 'string';
export type PropBooleanType  = 'boolean';
export type PropNumberType   = 'number';
export type PropObjectType   = 'object';
export type PropFunctionType = 'function';

export type PropDefinitionTypeEnum = PropStringType | PropBooleanType | PropNumberType | PropObjectType | PropFunctionType;

export type PropDefinitionType<T : PropTypeEnum, P, S : PropDefinitionTypeEnum> = {
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
    decorate? : (T, PropsType & P) => ?(ZalgoPromise<T> | T),
    def? : (P) => ?T
};

type BooleanPropDefinitionType<P> = PropDefinitionType<boolean, P, PropBooleanType>;
type StringPropDefinitionType<P> = PropDefinitionType<string, P, PropStringType>;
type NumberPropDefinitionType<P> = PropDefinitionType<number, P, PropNumberType>;
type FunctionPropDefinitionType<P> = PropDefinitionType<Function, P, PropFunctionType>;
type ObjectPropDefinitionType<P> = PropDefinitionType<Object, P, PropObjectType>;

export type UserPropsDefinitionType<P> = {
    [string] : (BooleanPropDefinitionType<P> | StringPropDefinitionType<P> | NumberPropDefinitionType<P> | FunctionPropDefinitionType<P> | ObjectPropDefinitionType<P>)
};

export type BuiltInPropsDefinitionType<P> = {
    env : PropDefinitionType<string, P, PropStringType>,
    uid : PropDefinitionType<string, P, PropStringType>,
    url : PropDefinitionType<string, P, PropStringType>,
    version : PropDefinitionType<string, P, PropStringType>,
    timeout : PropDefinitionType<number, P, PropNumberType>,
    logLevel : PropDefinitionType<string, P, PropStringType>,

    onDisplay : PropDefinitionType<EventHandlerType, P, PropFunctionType>,
    onEnter : PropDefinitionType<EventHandlerType, P, PropFunctionType>,
    onRender : PropDefinitionType<EventHandlerType, P, PropFunctionType>,
    onClose : PropDefinitionType<(string) => ?ZalgoPromise<void>, P, PropFunctionType>,
    onTimeout : PropDefinitionType<EventHandlerType, P, PropFunctionType>,
    onError : PropDefinitionType<EventHandlerType, P, PropFunctionType>
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
            type: 'string',
            required: false,
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
            type: 'string',
            required: false,
            queryParam: true,
            def() : string {
                return this.defaultLogLevel;
            }
        },

        // A custom url to use to render the component

        url: {
            type: 'string',
            required: false,
            promise: true,
            sendToChild: false
        },

        version: {
            type: 'string',
            required: false,
            queryParam: true
        },

        // A millisecond timeout before onTimeout is called

        timeout: {
            type: 'number',
            required: false,
            sendToChild: false
        },

        onDisplay: {
            type: 'function',
            required: false,
            noop: true,
            promisify: true,
            memoize: true,
            sendToChild: false
        },

        onEnter: {
            type: 'function',
            required: false,
            noop: true,
            promisify: true,
            sendToChild: false
        },

        // When we get an INIT message from the child

        onRender: {
            type: 'function',
            required: false,
            noop: true,
            promisify: true,
            sendToChild: false
        },

        // When the user closes the component.

        onClose: {
            type: 'function',
            required: false,
            noop: true,
            once: true,
            promisify: true,
            sendToChild: false
        },

        // When we time-out before getting an INIT message from the child. Defaults to onError if no handler passed.

        onTimeout: {
            type: 'function',
            required: false,
            memoize: true,
            promisify: true,
            sendToChild: false,
            def() : (() => void) {
                return function(err : mixed) : void {
                    if (this.props.onError) {
                        return this.props.onError(err);
                    }
                    throw err;
                };
            }
        },

        // When the component ePperiences an error

        onError: {
            type: 'function',
            required: false,
            promisify: true,
            sendToChild: true,
            once: true
        }
    };
}
