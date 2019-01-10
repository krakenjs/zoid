"use strict";

exports.__esModule = true;
exports.getInternalProps = getInternalProps;

var _src = require("zalgo-promise/src");

var _src2 = require("belter/src");

var _src3 = require("cross-domain-utils/src");

var _window = require("post-robot/src/serialize/window");

var _constants = require("../constants");

function getInternalProps() {
  return {
    window: {
      type: 'object',
      sendToChild: false,
      required: false,
      allowDelegate: true,

      validate({
        value
      }) {
        if (!(0, _src3.isWindow)(value) && !_window.ProxyWindow.isProxyWindow(value)) {
          throw new Error(`Expected Window or ProxyWindow`);
        }
      },

      decorate({
        value
      }) {
        return _window.ProxyWindow.toProxyWindow(value);
      }

    },
    timeout: {
      type: 'number',
      required: false,
      sendToChild: false
    },
    close: {
      type: 'function',
      required: false,
      sendToChild: false,
      childDecorate: ({
        close
      }) => {
        return close;
      }
    },
    focus: {
      type: 'function',
      required: false,
      sendToChild: false,
      childDecorate: ({
        focus
      }) => {
        return focus;
      }
    },
    resize: {
      type: 'function',
      required: false,
      sendToChild: false,
      childDecorate: ({
        resize
      }) => {
        return resize;
      }
    },
    onDisplay: {
      type: 'function',
      required: false,
      sendToChild: false,
      allowDelegate: true,
      default: () => _src2.noop,
      decorate: ({
        value
      }) => (0, _src2.once)(value)
    },
    onRendered: {
      type: 'function',
      required: false,
      sendToChild: false,
      default: () => _src2.noop,
      decorate: ({
        value
      }) => (0, _src2.once)(value)
    },
    onRender: {
      type: 'function',
      required: false,
      sendToChild: false,
      default: () => _src2.noop,
      decorate: ({
        value
      }) => (0, _src2.once)(value)
    },
    onClose: {
      type: 'function',
      required: false,
      sendToChild: false,
      allowDelegate: true,
      default: () => _src2.noop,
      decorate: ({
        value
      }) => (0, _src2.once)(value)
    },
    onError: {
      type: 'function',
      required: false,
      sendToChild: false,
      childDecorate: ({
        onError
      }) => {
        return function childOnError(err) {
          return onError(err);
        };
      }
    },
    onChange: {
      type: 'function',
      required: false,
      sendToChild: false,
      childDecorate: ({
        onPropsChange
      }) => {
        return onPropsChange;
      }
    }
  };
}