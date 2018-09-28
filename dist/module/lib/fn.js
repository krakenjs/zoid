import { replaceObject } from 'belter/src';

export function serializeFunctions(obj) {
    return replaceObject(obj, function (item) {
        if (typeof item === 'function') {
            return {
                __type__: '__function__'
            };
        }
        return item;
    });
}

export function deserializeFunctions(obj, handler) {
    return replaceObject(obj, function (item, key, fullKey) {
        if (item && item.__type__ === '__function__') {
            return function deserializedFunctionWrapper() {
                return handler({ key: key, fullKey: fullKey, self: this, args: arguments });
            };
        }
        return item;
    });
}

export function getCurrentScriptDir() {
    // eslint-disable-next-line no-console
    console.warn('Do not use zoid.getCurrentScriptDir() in production -- browser support is limited');

    // eslint-disable-next-line compat/compat
    if (document.currentScript) {
        // eslint-disable-next-line compat/compat
        return document.currentScript.src.split('/').slice(0, -1).join('/');
    }

    return '.';
}