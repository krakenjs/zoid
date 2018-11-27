import { getOpener, getTop, getParent, getNthParentFromTop, getAllFramesInWindow, getAncestor } from 'cross-domain-utils/src';
import { memoize, stringifyError, base64encode, base64decode } from 'belter/src';

import { globalFor } from '../lib';
import { WINDOW_REFERENCES, ZOID, INITIAL_PROPS, CONTEXT_TYPES } from '../constants';

function normalize(str) {
    return str.replace(/^[^a-z0-9A-Z]+|[^a-z0-9A-Z]+$/g, '').replace(/[^a-z0-9A-Z]+/g, '_');
}

/*  Build Child Window Name
    -----------------------

    Build a name for our child window. This should identify the following things to the child:

    - That the window was created by, and is owned by zoid
    - The name of the child's parent. This is so the child can identify which window created it, even when we do a
      renderTo, in which case the true parent may actually be a sibling frame in the window hierarchy

    We base64 encode the window name so IE doesn't die when it encounters any characters that it doesn't like.
*/

export function buildChildWindowName(name, options) {

    var encodedName = normalize(name);
    var encodedOptions = base64encode(JSON.stringify(options));

    if (!encodedName) {
        throw new Error('Invalid name: ' + name + ' - must contain alphanumeric characters');
    }

    return [ZOID, encodedName, encodedOptions, ''].join('__');
}

export var isZoidComponentWindow = memoize(function () {
    if (!window.name) {
        return false;
    }

    var _window$name$split = window.name.split('__'),
        zoidcomp = _window$name$split[0];

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

export var getComponentMeta = memoize(function () {

    if (!window.name) {
        throw new Error('Can not get component meta without window name');
    }

    var _window$name$split2 = window.name.split('__'),
        zoidcomp = _window$name$split2[0],
        name = _window$name$split2[1],
        encodedOptions = _window$name$split2[2];

    if (zoidcomp !== ZOID) {
        throw new Error('Window not rendered by zoid - got ' + zoidcomp);
    }

    var componentMeta = void 0;

    try {
        componentMeta = JSON.parse(base64decode(encodedOptions));
    } catch (err) {
        throw new Error('Can not decode component-meta: ' + encodedOptions + ' ' + stringifyError(err));
    }

    componentMeta.name = name;

    return componentMeta;
});

export function getParentDomain() {
    return getComponentMeta().domain;
}

function getWindowByRef(_ref) {
    var ref = _ref.ref,
        uid = _ref.uid,
        distance = _ref.distance;


    var result = void 0;

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
        var ancestor = getAncestor(window);

        if (ancestor) {
            for (var _i2 = 0, _getAllFramesInWindow2 = getAllFramesInWindow(ancestor), _length2 = _getAllFramesInWindow2 == null ? 0 : _getAllFramesInWindow2.length; _i2 < _length2; _i2++) {
                var frame = _getAllFramesInWindow2[_i2];
                var global = globalFor(frame);

                if (global && global.windows && global.windows[uid]) {
                    result = global.windows[uid];
                    break;
                }
            }
        }
    }

    if (!result) {
        throw new Error('Unable to find window by ref');
    }

    return result;
}

/*  Get Parent Component Window
    ---------------------------

    Get the parent component window, which may be different from the actual parent window
*/

export var getParentComponentWindow = memoize(function () {

    var componentMeta = getComponentMeta();

    if (!componentMeta) {
        throw new Error('Can not get parent component window - window not rendered by zoid');
    }

    return getWindowByRef(componentMeta.componentParent);
});