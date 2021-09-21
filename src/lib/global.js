/* @flow */

import { isSameDomain, type CrossDomainWindowType } from 'cross-domain-utils/src';
import { getCurrentScriptUID } from 'belter/src';

export function getGlobalKey() : string {
    if (__ZOID__.__SCRIPT_NAMESPACE__) {
        return `${ __ZOID__.__GLOBAL_KEY__ }_${ getCurrentScriptUID() }`;
    } else {
        return __ZOID__.__GLOBAL_KEY__;
    }
}

export function getGlobal<T>(win : CrossDomainWindowType) : T {
    const globalKey = getGlobalKey();

    if (!isSameDomain(win)) {
        throw new Error(`Can not get global for window on different domain`);
    }

    if (!win[globalKey]) {
        win[globalKey] = {};
    }

    return win[globalKey];
}

export function tryGlobal<T, R>(win : CrossDomainWindowType, handler : (T) => R) : ?R {
    try {
        return handler(getGlobal(win));
    } catch (err) {
        // pass
    }
}

export function destroyGlobal() {
    const globalKey = getGlobalKey();
    delete window[globalKey];
}
