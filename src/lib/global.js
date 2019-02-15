/* @flow */

import { isSameDomain, type CrossDomainWindowType } from 'cross-domain-utils/src';

export function getGlobal(win? : CrossDomainWindowType = window) : Object {

    if (!isSameDomain(win)) {
        throw new Error(`Can not get global for window on different domain`);
    }

    if (!win[__ZOID__.__GLOBAL_KEY__]) {
        win[__ZOID__.__GLOBAL_KEY__] = {};
    }

    return win[__ZOID__.__GLOBAL_KEY__];
}

export function destroyGlobal() {
    delete window[__ZOID__.__GLOBAL_KEY__];
}
