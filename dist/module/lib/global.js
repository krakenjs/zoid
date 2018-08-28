import { isSameDomain } from 'cross-domain-utils/src';

import { __XCOMPONENT__ } from '../constants';

export function globalFor(win) {

    if (!isSameDomain(win)) {
        return;
    }

    if (!win[__XCOMPONENT__]) {
        win[__XCOMPONENT__] = {};
    }

    return win[__XCOMPONENT__];
}

export function localGlobal() {
    var global = globalFor(window);

    if (!global) {
        throw new Error('Could not get local global');
    }

    return global;
}

export var global = localGlobal();