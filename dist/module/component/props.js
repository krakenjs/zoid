"use strict";

exports.__esModule = true;
exports.getBuiltInProps = getBuiltInProps;

var _src = require("zalgo-promise/src");

var _src2 = require("belter/src");

var _src3 = require("cross-domain-utils/src");

var _src4 = require("post-robot/src");

var _constants = require("../constants");

const defaultNoop = () => _src2.noop;

const decorateOnce = ({
  value
}) => (0, _src2.once)(value);

function getBuiltInProps() {
  return {
    window: {
      type: 'object',
      sendToChild: false,
      required: false,
      allowDelegate: true,

      validate({
        value
      }) {
        if (!(0, _src3.isWindow)(value) && !_src4.ProxyWindow.isProxyWindow(value)) {
          throw new Error(`Expected Window or ProxyWindow`);
        }
      },

      decorate({
        value
      }) {
        return (0, _src4.toProxyWindow)(value);
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
      }) => close
    },
    focus: {
      type: 'function',
      required: false,
      sendToChild: false,
      childDecorate: ({
        focus
      }) => focus
    },
    resize: {
      type: 'function',
      required: false,
      sendToChild: false,
      childDecorate: ({
        resize
      }) => resize
    },
    onDisplay: {
      type: 'function',
      required: false,
      sendToChild: false,
      allowDelegate: true,
      default: defaultNoop,
      decorate: decorateOnce
    },
    onRendered: {
      type: 'function',
      required: false,
      sendToChild: false,
      default: defaultNoop,
      decorate: decorateOnce
    },
    onRender: {
      type: 'function',
      required: false,
      sendToChild: false,
      default: defaultNoop,
      decorate: decorateOnce
    },
    onClose: {
      type: 'function',
      required: false,
      sendToChild: false,
      allowDelegate: true,
      default: defaultNoop,
      decorate: decorateOnce
    },
    onError: {
      type: 'function',
      required: false,
      sendToChild: false,
      childDecorate: ({
        onError
      }) => onError
    },
    onProps: {
      type: 'function',
      required: false,
      sendToChild: false,
      default: defaultNoop,
      childDecorate: ({
        onProps
      }) => onProps
    }
  };
}