/* @flow */

import { getObjectID, replaceObject } from './util';


/*  Noop
    ----

    Do nothing, zilch, nada, zip
*/

export function noop() {
    // pass
}


/*  Once
    ----

    Create a wrapper function which only allows the inner function to run once, otherwise is a noop
*/

export function once<T, A : mixed>(method : (...args : Array<A>) => T) : (...args : Array<A>) => T {

    let called = false;
    let result;

    // eslint-disable-next-line no-unused-vars
    return function onceWrapper(...args : Array<A>) : T {
        if (called) {
            return result;
        }

        called = true;
        result = method.apply(this, arguments);
        return result;
    };
}


/*  Memoize
    -------

    Create a wrapper function which caches the result of the first call, then for subsequent calls returns the cached value
*/

export function memoize<T, A : mixed>(method : (...args : Array<A>) => T) : (...args : Array<A>) => T {

    let results = {};

    // eslint-disable-next-line no-unused-vars
    return function memoizeWrapper(...args : Array<A>) : T {

        let cacheKey;

        try {
            cacheKey = JSON.stringify(Array.prototype.slice.call(arguments), (key, val) => {

                if (typeof val === 'function') {
                    return `zoid:memoize[${ getObjectID(val) }]`;
                }

                return val;
            });

        } catch (err) {
            throw new Error('Arguments not serializable -- can not be used to memoize');
        }

        if (!results.hasOwnProperty(cacheKey)) {
            results[cacheKey] = method.apply(this, arguments);
        }

        return results[cacheKey];
    };
}

export function debounce<T>(method : (...args : Array<mixed>) => T, time : number = 100) : (...args : Array<mixed>) => void {

    let timeout;

    return function debounceWrapper() {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            return method.apply(this, arguments);
        }, time);
    };
}

export function serializeFunctions<T : Object | Array<mixed>>(obj : T) : T {
    return replaceObject(obj, {
        'function': () => {
            return {
                __type__: '__function__'
            };
        }
    });
}

export function deserializeFunctions<T : Object | Array<mixed>>(obj : T, handler : Function) : T {
    return replaceObject(obj, {
        'object': (value, key, fullKey) => {
            if (value && value.__type__ === '__function__') {
                return function deserializedFunctionWrapper() : mixed {
                    return handler({ key, fullKey, self: this, args: arguments });
                };
            }
        }
    });
}
