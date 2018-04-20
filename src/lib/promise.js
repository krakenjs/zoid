/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';


/*  DeNodeify
    ---------

    Turns a method from a function which accepts a callback, into a function which returns a promise.
*/

export function denodeify<T>(method : (...args : Array<mixed>) => T) : (...args : Array<mixed>) => ZalgoPromise<T> {

    return function denodeifyWrapper() : ZalgoPromise<T> {

        let self = this;
        let args = Array.prototype.slice.call(arguments);

        if (args.length >= method.length) {
            return ZalgoPromise.resolve(method.apply(self, args));
        }

        return new ZalgoPromise((resolve, reject) => {
            args.push((err, result) => {

                if (err && !(err instanceof Error)) {
                    throw new Error(`Passed non-Error object in callback: [ ${ err } ] -- callbacks should either be called with callback(new Error(...)) or callback(null, result).`);
                }

                return err ? reject(err) : resolve(result);
            });
            method.apply(self, args);
        });
    };
}

export function promisify<T>(method : (...args : Array<mixed>) => T | ZalgoPromise<T>) : (...args : Array<mixed>) => ZalgoPromise<T> {
    return function promisifyWRapper() : ZalgoPromise<T> {
        return ZalgoPromise.try(() => {
            return method.apply(this, arguments);
        });
    };
}

export function delay(time : number = 1) : ZalgoPromise<void> {
    return new ZalgoPromise(resolve => {
        setTimeout(resolve, time);
    });
}

export function cycle(method : Function) : ZalgoPromise<void> {
    return ZalgoPromise.try(method).then(() => cycle(method));
}
