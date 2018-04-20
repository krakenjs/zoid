/* @flow */

import { getOpener, getTop, getParent, getNthParentFromTop, getAllFramesInWindow, getAncestor, getDomain, type CrossDomainWindowType } from 'cross-domain-utils/src';
import base32 from 'hi-base32';
import { memoize, uniqueID, globalFor } from '../lib';
import { XCOMPONENT, WINDOW_REFERENCES } from '../constants';


function normalize(str : string) : string {
    return str.replace(/^[^a-z0-9A-Z]+|[^a-z0-9A-Z]+$/g, '').replace(/[^a-z0-9A-Z]+/g, '_');
}


/*  Build Child Window Name
    -----------------------

    Build a name for our child window. This should identify the following things to the child:

    - That the window was created by, and is owned by xcomponent
    - The name of the child's parent. This is so the child can identify which window created it, even when we do a
      renderTo, in which case the true parent may actually be a sibling frame in the window hierarchy

    We base64 encode the window name so IE doesn't die when it encounters any characters that it doesn't like.
*/

export function buildChildWindowName(name : string, version : string, options : Object = {}) : string {

    options.id = uniqueID();
    options.domain = getDomain(window);

    let encodedName = normalize(name);
    let encodedVersion = normalize(version);
    let encodedOptions = base32.encode(JSON.stringify(options)).replace(/\=/g, '').toLowerCase();

    if (!encodedName) {
        throw new Error(`Invalid name: ${name} - must contain alphanumeric characters`);
    }

    if (!encodedVersion) {
        throw new Error(`Invalid version: ${version} - must contain alphanumeric characters`);
    }

    return [
        XCOMPONENT,
        encodedName,
        encodedVersion,
        encodedOptions,
        ''
    ].join('__');
}

export let isXComponentWindow = memoize(() => {
    if (!window.name) {
        return false;
    }

    let [ xcomp ] = window.name.split('__');

    if (xcomp !== XCOMPONENT) {
        return false;
    }

    return true;
});

/*  Parse Window Name
    -----------------

    The inverse of buildChildWindowName. Base64 decodes and json parses the window name to get the original props
    passed down, including the parent name. Only accepts window names built by xcomponent
*/

export let getComponentMeta = memoize(() => {

    if (!window.name) {
        throw new Error(`Can not get component meta without window name`);
    }

    let [ xcomp, name, version, encodedOptions ] = window.name.split('__');

    if (xcomp !== XCOMPONENT) {
        throw new Error(`Window not rendered by xcomponent - got ${ xcomp }`);
    }

    let componentMeta;

    try {
        componentMeta = JSON.parse(base32.decode(encodedOptions.toUpperCase()));
    } catch (err) {
        throw new Error(`Can not decode component-meta`);
    }

    componentMeta.name = name;
    componentMeta.version = version.replace(/_/g, '.');

    return componentMeta;
});

export function getParentDomain() : string {
    return getComponentMeta().domain; // How does this work for renderTo..?
}

function getWindowByRef({ ref, uid, distance } : { ref : string, uid : string, distance : number }) : CrossDomainWindowType {

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
        throw new Error(`Can not get parent component window - window not rendered by xcomponent`);
    }

    return getWindowByRef(componentMeta.componentParent);
});


export let getParentRenderWindow = memoize(() => {

    let componentMeta = getComponentMeta();

    if (!componentMeta) {
        throw new Error(`Can not get parent component window - window not rendered by xcomponent`);
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
