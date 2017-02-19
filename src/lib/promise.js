
import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';


/*  DeNodeify
    ---------

    Turns a method from a function which accepts a callback, into a function which returns a promise.
*/

export function denodeify(method) {

    return function() {

        let self = this;
        let args = Array.prototype.slice.call(arguments);

        if (args.length >= method.length) {
            return Promise.resolve(method.apply(self, args));
        }

        return new Promise((resolve, reject) => {
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
    let prom = Promise.resolve();

    return function() {
        return prom.then(() => {
            return method.apply(this, arguments);
        });
    };
}

export function getter(method) {

    return function() {
        return new Promise((resolve, reject) => {
            let result = method.call(this, resolve, reject);

            if (result && result.then instanceof Function) {
                return result.then(resolve, reject);
            }

            if (method.length === 0 || result !== undefined) {
                return resolve(result);
            }
        });
    };
}

export function delay(time) {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
}

export function cycle(method) {
    return Promise.try(method).then(() => cycle(method));
}