
import { ZalgoPromise } from 'zalgo-promise/src'; 


/*  DeNodeify
    ---------

    Turns a method from a function which accepts a callback, into a function which returns a promise.
*/

export function denodeify(method) {

    return function() {

        let self = this;
        let args = Array.prototype.slice.call(arguments);

        if (args.length >= method.length) {
            return ZalgoPromise.resolve(method.apply(self, args));
        }

        return new ZalgoPromise((resolve, reject) => {
            args.push((err, result) => {

                if (err && !(err instanceof Error)) {
                    throw new Error(`Passed non-Error object in callback: [ ${err} ] -- callbacks should either be called with callback(new Error(...)) or callback(null, result).`);
                }

                return err ? reject(err) : resolve(result);
            });
            return method.apply(self, args);
        });
    };
}

export function promisify(method) {
    let prom = ZalgoPromise.resolve();

    return function() {
        return prom.then(() => {
            return method.apply(this, arguments);
        });
    };
}

export function getter(method, { name = 'property', timeout = 10000 } = {}) {

    return function() {
        return new ZalgoPromise((resolve, reject) => {
            let result = method.call(this, resolve, reject);

            if (result && typeof result.then === 'function') {
                return result.then(resolve, reject);
            }

            if (result !== undefined) {
                return resolve(result);
            }

            setTimeout(() => {
                reject(`Timed out waiting ${timeout}ms for ${name} getter`);
            }, timeout);
        });
    };
}

export function delay(time = 1) {
    return new ZalgoPromise(resolve => {
        setTimeout(resolve, time);
    });
}

export function cycle(method) {
    return ZalgoPromise.try(method).then(() => cycle(method));
}
