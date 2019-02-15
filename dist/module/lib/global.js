"use strict";

exports.__esModule = true;
exports.getGlobal = getGlobal;
exports.destroyGlobal = destroyGlobal;

var _src = require("cross-domain-utils/src");

function getGlobal(win = window) {
  if (!(0, _src.isSameDomain)(win)) {
    throw new Error(`Can not get global for window on different domain`);
  }

  if (!win[__ZOID__.__GLOBAL_KEY__]) {
    win[__ZOID__.__GLOBAL_KEY__] = {};
  }

  return win[__ZOID__.__GLOBAL_KEY__];
}

function destroyGlobal() {
  delete window[__ZOID__.__GLOBAL_KEY__];
}