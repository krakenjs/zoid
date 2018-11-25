/* @flow */

import { getOpener, getTop, getParent, getNthParentFromTop, getAllFramesInWindow, getAncestor, type CrossDomainWindowType } from 'cross-domain-utils/src';
import { memoize, stringifyError, base64encode, base64decode } from 'belter/src';

import { globalFor } from '../lib';
import { WINDOW_REFERENCES, ZOID, INITIAL_PROPS, CONTEXT_TYPES } from '../constants';
import type { DimensionsType, PositionType } from '../types';

function normalize(str : string) : string {
    return str.replace(/^[^a-z0-9A-Z]+|[^a-z0-9A-Z]+$/g, '').replace(/[^a-z0-9A-Z]+/g, '_');
}

export type WindowRef = {
    ref : string,
    uid? : string,
    distance? : number
};

/*  Build Child Window Name
    -----------------------

    Build a name for our child window. This should identify the following things to the child:

    - That the window was created by, and is owned by zoid
    - The name of the child's parent. This is so the child can identify which window created it, even when we do a
      renderTo, in which case the true parent may actually be a sibling frame in the window hierarchy

    We base64 encode the window name so IE doesn't die when it encounters any characters that it doesn't like.
*/

type PropsType = {
    type : typeof INITIAL_PROPS.RAW,
    value : string
} | {
    type : typeof INITIAL_PROPS.UID,
    uid : string
};

type ChildWindowNameOptions = {
    uid : string,
    tag : string,
    context : $Values<typeof CONTEXT_TYPES>,
    componentParent : WindowRef,
    renderParent : WindowRef,
    props : PropsType,
    exports : string,
    id : string,
    domain : string
};

export function buildChildWindowName(name : string, options : ChildWindowNameOptions) : string {

    let encodedName = normalize(name);
    let encodedOptions = base64encode(JSON.stringify(options));

    if (!encodedName) {
        throw new Error(`Invalid name: ${ name } - must contain alphanumeric characters`);
    }

    return [
        ZOID,
        encodedName,
        encodedOptions,
        ''
    ].join('__');
}

export let isZoidComponentWindow = memoize(() => {
    if (!window.name) {
        return false;
    }

    let [ zoidcomp ] = window.name.split('__');

    if (zoidcomp !== ZOID) {
        return false;
    }

    return true;
});

/*  Parse Window Name
    -----------------

    The inverse of buildChildWindowName. Base64 decodes and json parses the window name to get the original props
    passed down, including the parent name. Only accepts window names built by zoid
*/

export let getComponentMeta = memoize(() : ChildWindowNameOptions => {

    if (!window.name) {
        throw new Error(`Can not get component meta without window name`);
    }

    let [ zoidcomp, name, encodedOptions ] = window.name.split('__');

    if (zoidcomp !== ZOID) {
        throw new Error(`Window not rendered by zoid - got ${ zoidcomp }`);
    }

    let componentMeta;

    try {
        componentMeta = JSON.parse(base64decode(encodedOptions));
    } catch (err) {
        throw new Error(`Can not decode component-meta: ${ encodedOptions } ${ stringifyError(err) }`);
    }

    componentMeta.name = name;

    return componentMeta;
});

export function getParentDomain() : string {
    return getComponentMeta().domain; // How does this work for renderTo..?
}

function getWindowByRef({ ref, uid, distance } : WindowRef) : CrossDomainWindowType {

    let result;

    if (ref === WINDOW_REFERENCES.OPENER) {
        result = getOpener(window);

    } else if (ref === WINDOW_REFERENCES.TOP) {
        result = getTop(window);

    } else if (ref === WINDOW_REFERENCES.PARENT) {

        if (distance) {
            result = getNthParentFromTop(window, distance);
        } else {
            result = getParent(window);
        }
    }

    if (ref === WINDOW_REFERENCES.GLOBAL) {
        let ancestor = getAncestor(window);

        if (ancestor) {
            for (let frame of getAllFramesInWindow(ancestor)) {
                let global = globalFor(frame);

                if (global && global.windows && global.windows[uid]) {
                    result = global.windows[uid];
                    break;
                }
            }
        }
    }

    if (!result) {
        throw new Error(`Unable to find window by ref`);
    }

    return result;
}

/*  Get Parent Component Window
    ---------------------------

    Get the parent component window, which may be different from the actual parent window
*/

export let getParentComponentWindow = memoize(() => {

    let componentMeta = getComponentMeta();

    if (!componentMeta) {
        throw new Error(`Can not get parent component window - window not rendered by zoid`);
    }

    return getWindowByRef(componentMeta.componentParent);
});


export let getParentRenderWindow = memoize(() => {

    let componentMeta = getComponentMeta();

    if (!componentMeta) {
        throw new Error(`Can not get parent component window - window not rendered by zoid`);
    }

    return getWindowByRef(componentMeta.renderParent);
});


/*  Get Position
    ------------

    Calculate the position for the popup

    This is either
    - Specified by the user
    - The center of the screen

    I'd love to do this with pure css, but alas... popup windows :(
*/

export function getPosition({ width, height } : DimensionsType) : PositionType {

    let x = 0;
    let y = 0;

    if (width) {
        if (window.outerWidth) {
            x = Math.round((window.outerWidth - width) / 2) + window.screenX;
        } else if (window.screen.width) {
            x = Math.round((window.screen.width - width) / 2);
        }
    }

    if (height) {
        if (window.outerHeight) {
            y = Math.round((window.outerHeight - height) / 2) + window.screenY;
        } else if (window.screen.height) {
            y = Math.round((window.screen.height - height) / 2);
        }
    }

    return { x, y };
}
