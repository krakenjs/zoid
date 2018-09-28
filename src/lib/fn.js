/* @flow */

import { replaceObject } from 'belter/src';

export function serializeFunctions<T : Object | Array<mixed>>(obj : T) : T {
    return replaceObject(obj, item => {
        if (typeof item === 'function') {
            return {
                __type__: '__function__'
            };
        }
        return item;
    });
}

export function deserializeFunctions<T : Object | Array<mixed>>(obj : T, handler : Function) : T {
    return replaceObject(obj, (item, key, fullKey) => {
        if (item && item.__type__ === '__function__') {
            return function deserializedFunctionWrapper() : mixed {
                return handler({ key, fullKey, self: this, args: arguments });
            };
        }
        return item;
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
