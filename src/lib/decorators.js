
import { ZalgoPromise } from 'zalgo-promise'; 

export function memoized(target, name, descriptor) {
    let method = descriptor.value;

    descriptor.value = function() {

        this.__memoized__ = this.__memoized__ || {};

        if (!this.__memoized__.hasOwnProperty(name)) {
            this.__memoized__[name] = method.apply(this, arguments);
        }

        return this.__memoized__[name];
    };
}

export function promise(target, name, descriptor) {
    let method = descriptor.value;

    descriptor.value = function() {
        return ZalgoPromise.try(() => {
            return method.apply(this, arguments);
        });
    };
}