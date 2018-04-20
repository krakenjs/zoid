'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CONSTANTS = exports.postRobot = exports.getCurrentScriptDir = undefined;
exports.create = create;
exports.getByTag = getByTag;

var _lib = require('./lib');

Object.defineProperty(exports, 'getCurrentScriptDir', {
    enumerable: true,
    get: function get() {
        return _lib.getCurrentScriptDir;
    }
});
exports.destroyAll = destroyAll;

var _error = require('./error');

Object.keys(_error).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _error[key];
        }
    });
});

require('zalgo-promise/src');

var _src = require('post-robot/src');

var _postRobot = _interopRequireWildcard(_src);

var _component = require('./component');

var _parent = require('./component/parent');

var _constants = require('./constants');

var _CONSTANTS = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

// eslint-disable-next-line import/no-namespace
function create(options) {
    return new _component.Component(options);
}
// eslint-disable-next-line import/no-namespace


function getByTag(tag) {
    return _component.Component.getByTag(tag);
}

function destroyAll() {
    return _parent.ParentComponent.destroyAll();
}
var postRobot = exports.postRobot = _postRobot;

var CONSTANTS = exports.CONSTANTS = _CONSTANTS;