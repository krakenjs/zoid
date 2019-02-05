/* @flow */

import { isSameDomain, type CrossDomainWindowType } from 'cross-domain-utils/src';

export function globalFor(win : CrossDomainWindowType) : Object {

    if (!isSameDomain(win)) {
        throw new Error(`Can not get global for window on different domain`);
    }

    if (!win[__ZOID__.__GLOBAL_KEY__]) {
        win[__ZOID__.__GLOBAL_KEY__] = {};
    }

    return win[__ZOID__.__GLOBAL_KEY__];
}
