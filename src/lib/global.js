/* @flow */

import { isSameDomain, type CrossDomainWindowType } from 'cross-domain-utils/src';

import { __ZOID__ } from '../constants';

export function globalFor(win : CrossDomainWindowType) : ?Object {

    if (!isSameDomain(win)) {
        return;
    }

    if (!win[__ZOID__]) {
        win[__ZOID__] = {};
    }

    return win[__ZOID__];
}
