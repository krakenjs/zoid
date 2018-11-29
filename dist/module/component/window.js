import { memoize, stringifyError, base64encode, base64decode } from 'belter/src';

import { normalizeString } from '../lib';
import { ZOID } from '../constants';

export function buildChildWindowName(name, childPayload) {
    var normalizedName = normalizeString(name);
    var encodedPayload = base64encode(JSON.stringify(childPayload));

    return '__' + ZOID + '__' + normalizedName + '__' + encodedPayload + '__';
}

export var parseChildWindowName = memoize(function () {
    if (!window.name) {
        throw new Error('No window name');
    }

    var _window$name$split = window.name.split('__'),
        zoidcomp = _window$name$split[1],
        name = _window$name$split[2],
        encodedPayload = _window$name$split[3];

    if (zoidcomp !== ZOID) {
        throw new Error('Window not rendered by zoid - got ' + zoidcomp);
    }

    if (!name) {
        throw new Error('Expected component name');
    }

    if (!encodedPayload) {
        throw new Error('Expected encoded payload');
    }

    try {
        return JSON.parse(base64decode(encodedPayload));
    } catch (err) {
        throw new Error('Can not decode window name payload: ' + encodedPayload + ': ' + stringifyError(err));
    }
});

export var isZoidComponentWindow = memoize(function () {
    try {
        parseChildWindowName();
    } catch (err) {
        return false;
    }

    return true;
});