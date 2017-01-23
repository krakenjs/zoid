
import { getObjectID } from './util';


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

export function once(method) {
    let called = false;

    return function () {
        if (!called) {
            called = true;
            return method.apply(this, arguments);
        }
    };
}


/*  Memoize
    -------

    Create a wrapper function which caches the result of the first call, then for subsequent calls returns the cached value
*/

export function memoize(method) {

    let results = {};

    return function() {

        let cacheKey;

        try {
            cacheKey = JSON.stringify(Array.prototype.slice.call(arguments), (key, val) => {

                if (typeof val === 'function') {
                    return `xcomponent:memoize[${getObjectID(val)}]`;
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

export function debounce(method, time = 100) {

    let timeout;

    return function() {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            return method.apply(this, arguments);
        }, time);
    };
}
