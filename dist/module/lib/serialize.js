"use strict";

exports.__esModule = true;
exports.getProxyElement = getProxyElement;

var _src = require("zalgo-promise/src");

var _src2 = require("belter/src");

function getProxyElement(element) {
  return {
    resize({
      width,
      height
    }) {
      if (typeof width === 'number') {
        element.style.width = (0, _src2.toCSS)(width);
      }

      if (typeof height === 'number') {
        element.style.height = (0, _src2.toCSS)(height);
      }
    },

    getElement() {
      return _src.ZalgoPromise.try(() => {
        if (this.source && this.source !== window) {
          throw new Error(`Can not call getElement from a remote window`);
        }

        return element;
      });
    }

  };
}