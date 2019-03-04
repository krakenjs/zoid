"use strict";

exports.__esModule = true;
exports.getProxyObject = getProxyObject;

var _src = require("zalgo-promise/src");

function getProxyObject(obj) {
  return {
    get() {
      return _src.ZalgoPromise.try(() => {
        if (this.source && this.source !== window) {
          throw new Error(`Can not call get on proxy object from a remote window`);
        }

        return obj;
      });
    }

  };
}