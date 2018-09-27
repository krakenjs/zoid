/* @flow */

import { replaceObject } from 'belter/src';

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

export function getCurrentScriptDir() : string {
    // eslint-disable-next-line no-console
    console.warn(`Do not use zoid.getCurrentScriptDir() in production -- browser support is limited`);

    // eslint-disable-next-line compat/compat
    if (document.currentScript) {
        // eslint-disable-next-line compat/compat
        return document.currentScript.src.split('/').slice(0, -1).join('/');
    }

    return '.';
}
