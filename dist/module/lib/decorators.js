'use strict';

exports.__esModule = true;
exports.memoized = memoized;
exports.promise = promise;

var _src = require('zalgo-promise/src');

function memoized(target, name, descriptor) {
    var method = descriptor.value;

    descriptor.value = function memoizedFunction() {

        this.__memoized__ = this.__memoized__ || {};

        if (!this.__memoized__.hasOwnProperty(name)) {
            this.__memoized__[name] = method.apply(this, arguments);
        }

        return this.__memoized__[name];
    };

    descriptor.value.displayName = name + ':memoized';
}

function promise(target, name, descriptor) {
    var method = descriptor.value;

    descriptor.value = function promisifiedFunction() {
        return _src.ZalgoPromise['try'](method, this, arguments);
    };

    descriptor.value.displayName = name + ':promisified';
}