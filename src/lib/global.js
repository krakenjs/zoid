
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

export let global = globalFor(window);
