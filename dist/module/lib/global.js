'use strict';

exports.__esModule = true;
exports.global = undefined;
exports.globalFor = globalFor;
exports.localGlobal = localGlobal;

var _src = require('cross-domain-utils/src');

var _constants = require('../constants');

function globalFor(win) {

    if (!(0, _src.isSameDomain)(win)) {
        return;
    }

    if (!win[_constants.__ZOID__]) {
        win[_constants.__ZOID__] = {};
    }

    return win[_constants.__ZOID__];
}

function localGlobal() {
    var global = globalFor(window);

    if (!global) {
        throw new Error('Could not get local global');
    }

    return global;
}

var global = exports.global = localGlobal();