import { replaceObject } from 'belter/src';

export function serializeFunctions(obj) {
    return replaceObject(obj, {
        'function': function _function() {
            return {
                __type__: '__function__'
            };
        }
    });
}

export function deserializeFunctions(obj, handler) {
    return replaceObject(obj, {
        'object': function object(value, key, fullKey) {
            if (value && value.__type__ === '__function__') {
                return function deserializedFunctionWrapper() {
                    return handler({ key: key, fullKey: fullKey, self: this, args: arguments });
                };
            }
        }
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