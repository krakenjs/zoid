'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getParentRenderWindow = exports.getParentComponentWindow = exports.getComponentMeta = exports.isXComponentWindow = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.buildChildWindowName = buildChildWindowName;
exports.getParentDomain = getParentDomain;
exports.getPosition = getPosition;

var _src = require('cross-domain-utils/src');

var _hiBase = require('hi-base32');

var _hiBase2 = _interopRequireDefault(_hiBase);

var _lib = require('../lib');

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function normalize(str) {
    return str.replace(/^[^a-z0-9A-Z]+|[^a-z0-9A-Z]+$/g, '').replace(/[^a-z0-9A-Z]+/g, '_');
}

function encode(str) {
    return _hiBase2['default'].encode(str).replace(/\=/g, '').toLowerCase(); // eslint-disable-line no-useless-escape
}

function decode(str) {
    return _hiBase2['default'].decode(str.toUpperCase());
}

/*  Build Child Window Name
    -----------------------

    Build a name for our child window. This should identify the following things to the child:

    - That the window was created by, and is owned by xcomponent
    - The name of the child's parent. This is so the child can identify which window created it, even when we do a
      renderTo, in which case the true parent may actually be a sibling frame in the window hierarchy

    We base64 encode the window name so IE doesn't die when it encounters any characters that it doesn't like.
*/

function buildChildWindowName(name, version) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


    options.id = (0, _lib.uniqueID)();
    options.domain = (0, _src.getDomain)(window);

    var encodedName = normalize(name);
    var encodedVersion = normalize(version);
    var encodedOptions = encode(JSON.stringify(options));

    if (!encodedName) {
        throw new Error('Invalid name: ' + name + ' - must contain alphanumeric characters');
    }

    if (!encodedVersion) {
        throw new Error('Invalid version: ' + version + ' - must contain alphanumeric characters');
    }

    return [_constants.XCOMPONENT, encodedName, encodedVersion, encodedOptions, ''].join('__');
}

var isXComponentWindow = exports.isXComponentWindow = (0, _lib.memoize)(function () {
    if (!window.name) {
        return false;
    }

    var _window$name$split = window.name.split('__'),
        _window$name$split2 = _slicedToArray(_window$name$split, 1),
        xcomp = _window$name$split2[0];

    if (xcomp !== _constants.XCOMPONENT) {
        return false;
    }

    return true;
});

/*  Parse Window Name
    -----------------

    The inverse of buildChildWindowName. Base64 decodes and json parses the window name to get the original props
    passed down, including the parent name. Only accepts window names built by xcomponent
*/

var getComponentMeta = exports.getComponentMeta = (0, _lib.memoize)(function () {

    if (!window.name) {
        throw new Error('Can not get component meta without window name');
    }

    var _window$name$split3 = window.name.split('__'),
        _window$name$split4 = _slicedToArray(_window$name$split3, 4),
        xcomp = _window$name$split4[0],
        name = _window$name$split4[1],
        version = _window$name$split4[2],
        encodedOptions = _window$name$split4[3];

    if (xcomp !== _constants.XCOMPONENT) {
        throw new Error('Window not rendered by xcomponent - got ' + xcomp);
    }

    var componentMeta = void 0;

    try {
        componentMeta = JSON.parse(decode(encodedOptions));
    } catch (err) {
        throw new Error('Can not decode component-meta: ' + encodedOptions + ' ' + (0, _lib.stringifyError)(err));
    }

    componentMeta.name = name;
    componentMeta.version = version.replace(/_/g, '.');

    return componentMeta;
});

function getParentDomain() {
    return getComponentMeta().domain; // How does this work for renderTo..?
}

function getWindowByRef(_ref) {
    var ref = _ref.ref,
        uid = _ref.uid,
        distance = _ref.distance;


    var result = void 0;

    if (ref === _constants.WINDOW_REFERENCES.OPENER) {
        result = (0, _src.getOpener)(window);
    } else if (ref === _constants.WINDOW_REFERENCES.TOP) {
        result = (0, _src.getTop)(window);
    } else if (ref === _constants.WINDOW_REFERENCES.PARENT) {

        if (distance) {
            result = (0, _src.getNthParentFromTop)(window, distance);
        } else {
            result = (0, _src.getParent)(window);
        }
    }

    if (ref === _constants.WINDOW_REFERENCES.GLOBAL) {
        var ancestor = (0, _src.getAncestor)(window);

        if (ancestor) {
            for (var _iterator = (0, _src.getAllFramesInWindow)(ancestor), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                var _ref2;

                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref2 = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref2 = _i.value;
                }

                var frame = _ref2;

                var global = (0, _lib.globalFor)(frame);

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

var getParentComponentWindow = exports.getParentComponentWindow = (0, _lib.memoize)(function () {

    var componentMeta = getComponentMeta();

    if (!componentMeta) {
        throw new Error('Can not get parent component window - window not rendered by xcomponent');
    }

    return getWindowByRef(componentMeta.componentParent);
});

var getParentRenderWindow = exports.getParentRenderWindow = (0, _lib.memoize)(function () {

    var componentMeta = getComponentMeta();

    if (!componentMeta) {
        throw new Error('Can not get parent component window - window not rendered by xcomponent');
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

function getPosition(_ref3) {
    var width = _ref3.width,
        height = _ref3.height;


    var x = 0;
    var y = 0;

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

    return { x: x, y: y };
}