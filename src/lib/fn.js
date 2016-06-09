
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

    let called = false;
    let result;

    return function() {

        if (!called) {
            called = true;
            result = method.apply(this, arguments);
        }

        return result;
    };
}