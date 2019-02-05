"use strict";

exports.__esModule = true;
exports.globalFor = globalFor;

var _src = require("cross-domain-utils/src");

function globalFor(win) {
  if (!(0, _src.isSameDomain)(win)) {
    throw new Error(`Can not get global for window on different domain`);
  }

  if (!win[__ZOID__.__GLOBAL_KEY__]) {
    win[__ZOID__.__GLOBAL_KEY__] = {};
  }

  return win[__ZOID__.__GLOBAL_KEY__];
}