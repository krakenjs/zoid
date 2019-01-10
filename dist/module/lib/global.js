"use strict";

exports.__esModule = true;
exports.globalFor = globalFor;
exports.localGlobal = localGlobal;
exports.global = void 0;

var _src = require("cross-domain-utils/src");

var _constants = require("../constants");

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
  const global = globalFor(window);

  if (!global) {
    throw new Error(`Could not get local global`);
  }

  return global;
}

const global = localGlobal();
exports.global = global;