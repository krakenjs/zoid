
export function noop() {
    // pass
}

export function once(method) {
    let called = false;

    return function () {
        if (!called) {
            called = true;
            return method.apply(this, arguments);
        }
    };
}

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