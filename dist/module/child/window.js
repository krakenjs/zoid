"use strict";

exports.__esModule = true;
exports.getChildPayload = getChildPayload;

var _src = require("belter/src");

var _constants = require("../constants");

function parseChildWindowName(windowName) {
  return (0, _src.inlineMemoize)(parseChildWindowName, () => {
    if (!windowName) {
      throw new Error(`No window name`);
    }

    const [, zoidcomp, name, encodedPayload] = windowName.split('__');

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
  }, [windowName]);
}

function getChildPayload() {
  try {
    return parseChildWindowName(window.name);
  } catch (err) {// pass
  }
}