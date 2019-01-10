"use strict";

exports.__esModule = true;
exports.buildChildWindowName = buildChildWindowName;
exports.isZoidComponentWindow = exports.parseChildWindowName = void 0;

var _src = require("belter/src");

var _constants = require("../constants");

function buildChildWindowName(name, childPayload) {
  return `__${_constants.ZOID}__${name}__${(0, _src.base64encode)(JSON.stringify(childPayload))}__`;
}

const parseChildWindowName = (0, _src.memoize)(() => {
  if (!window.name) {
    throw new Error(`No window name`);
  }

  const [, zoidcomp, name, encodedPayload] = window.name.split('__');

  if (zoidcomp !== _constants.ZOID) {
    throw new Error(`Window not rendered by zoid - got ${zoidcomp}`);
  }

  if (!name) {
    throw new Error(`Expected component name`);
  }

  if (!encodedPayload) {
    throw new Error(`Expected encoded payload`);
  }

  try {
    return JSON.parse((0, _src.base64decode)(encodedPayload));
  } catch (err) {
    throw new Error(`Can not decode window name payload: ${encodedPayload}: ${(0, _src.stringifyError)(err)}`);
  }
});
exports.parseChildWindowName = parseChildWindowName;
const isZoidComponentWindow = (0, _src.memoize)(() => {
  try {
    parseChildWindowName();
  } catch (err) {
    return false;
  }

  return true;
});
exports.isZoidComponentWindow = isZoidComponentWindow;