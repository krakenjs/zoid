/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';

export function memoized<T : mixed>(target : Object, name : string, descriptor : Object) {
    let method = descriptor.value;

    descriptor.value = function memoizedFunction() : T {

        this.__memoized__ = this.__memoized__ || {};

        if (!this.__memoized__.hasOwnProperty(name)) {
            this.__memoized__[name] = method.apply(this, arguments);
        }

        return this.__memoized__[name];
    };

    descriptor.value.displayName = `${ name }:memoized`;
}

export function promise<T : mixed>(target : Object, name : string, descriptor : Object) {
    let method = descriptor.value;

    descriptor.value = function promisifiedFunction() : ZalgoPromise<T> {
        return ZalgoPromise.try(method, this, arguments);
    };

    descriptor.value.displayName = `${ name }:promisified`;
}
