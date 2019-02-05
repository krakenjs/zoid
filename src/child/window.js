/* @flow */

import { inlineMemoize, stringifyError, base64decode } from 'belter/src';

import { ZOID } from '../constants';
import type { ChildPayload } from '../parent';

function parseChildWindowName(windowName : string) : ChildPayload {
    return inlineMemoize(parseChildWindowName, () => {
        if (!windowName) {
            throw new Error(`No window name`);
        }
    
        const [ , zoidcomp, name, encodedPayload ] = windowName.split('__');
    
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
    }, [ windowName ]);
}

export function getChildPayload() : ?ChildPayload {
    try {
        return parseChildWindowName(window.name);
    } catch (err) {
        // pass
    }
}
