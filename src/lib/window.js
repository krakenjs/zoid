/* @flow */

import { memoize, stringifyError, base64encode, base64decode } from 'belter/src';

import { ZOID } from '../constants';
import type { ChildPayload } from '../parent';

export function buildChildWindowName(name : string, childPayload : ChildPayload) : string {
    return `__${ ZOID }__${ name }__${ base64encode(JSON.stringify(childPayload)) }__`;
}

export const parseChildWindowName = memoize(() : ChildPayload => {
    if (!window.name) {
        throw new Error(`No window name`);
    }

    const [ , zoidcomp, name, encodedPayload ] = window.name.split('__');

    if (zoidcomp !== ZOID) {
        throw new Error(`Window not rendered by zoid - got ${ zoidcomp }`);
    }

    if (!name) {
        throw new Error(`Expected component name`);
    }

    if (!encodedPayload) {
        throw new Error(`Expected encoded payload`);
    }

    try {
        return JSON.parse(base64decode(encodedPayload));
    } catch (err) {
        throw new Error(`Can not decode window name payload: ${ encodedPayload }: ${ stringifyError(err) }`);
    }
});

export const isZoidComponentWindow = memoize(() => {
    try {
        parseChildWindowName();
    } catch (err) {
        return false;
    }

    return true;
});
