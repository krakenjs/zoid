'use strict';

exports.__esModule = true;
exports.denodeify = denodeify;
exports.promisify = promisify;
exports.delay = delay;
exports.cycle = cycle;

var _src = require('zalgo-promise/src');

/*  DeNodeify
    ---------

    Turns a method from a function which accepts a callback, into a function which returns a promise.
*/

function denodeify(method) {

    return function denodeifyWrapper() {

        var self = this;
        var args = Array.prototype.slice.call(arguments);

        if (args.length >= method.length) {
            return _src.ZalgoPromise.resolve(method.apply(self, args));
        }

        return new _src.ZalgoPromise(function (resolve, reject) {
            args.push(function (err, result) {

                if (err && !(err instanceof Error)) {
                    throw new Error('Passed non-Error object in callback: [ ' + err + ' ] -- callbacks should either be called with callback(new Error(...)) or callback(null, result).');
                }

                return err ? reject(err) : resolve(result);
            });
            method.apply(self, args);
        });
    };
}

function promisify(method) {
    return function promisifyWRapper() {
        var _this = this,
            _arguments = arguments;

        return _src.ZalgoPromise['try'](function () {
            return method.apply(_this, _arguments);
        });
    };
}

function delay() {
    var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    return new _src.ZalgoPromise(function (resolve) {
        setTimeout(resolve, time);
    });
}

function cycle(method) {
    return _src.ZalgoPromise['try'](method).then(function () {
        return cycle(method);
    });
}