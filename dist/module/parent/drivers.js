"use strict";

exports.__esModule = true;
exports.RENDER_DRIVERS = void 0;

var _src = require("zalgo-promise/src");

var _src2 = require("post-robot/src");

var _src3 = require("cross-domain-utils/src");

var _src4 = require("belter/src");

var _constants = require("../constants");

var _lib = require("../lib");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const RENDER_DRIVERS = {};
exports.RENDER_DRIVERS = RENDER_DRIVERS;
RENDER_DRIVERS[_constants.CONTEXT.IFRAME] = {
  openOnClick: false,

  openFrame() {
    return (0, _lib.getProxyElement)((0, _src4.iframe)({
      attributes: _extends({
        title: this.component.name
      }, this.component.attributes.iframe)
    }));
  },

  open(proxyFrame) {
    if (!proxyFrame) {
      throw new Error(`Expected proxy frame to be passed`);
    }

    return proxyFrame.getElement().then(frame => {
      return (0, _src4.awaitFrameWindow)(frame).then(win => {
        const frameWatcher = (0, _src4.watchElementForClose)(frame, () => this.close());
        this.clean.register(() => frameWatcher.cancel());
        this.clean.register(() => (0, _src4.destroyElement)(frame));
        this.clean.register(() => (0, _src2.cleanUpWindow)(win));
        return (0, _src2.toProxyWindow)(win);
      });
    });
  },

  openPrerenderFrame() {
    return (0, _lib.getProxyElement)((0, _src4.iframe)({
      attributes: _extends({
        name: `__zoid_prerender_frame__${this.component.name}_${(0, _src4.uniqueID)()}__`,
        title: `prerender__${this.component.name}`
      }, this.component.attributes.iframe)
    }));
  },

  openPrerender(proxyWin, proxyPrerenderFrame) {
    if (!proxyPrerenderFrame) {
      throw new Error(`Expected proxy frame to be passed`);
    }

    return proxyPrerenderFrame.getElement().then(prerenderFrame => {
      this.clean.register(() => (0, _src4.destroyElement)(prerenderFrame));
      return (0, _src4.awaitFrameWindow)(prerenderFrame).then(prerenderFrameWindow => {
        return (0, _src3.assertSameDomain)(prerenderFrameWindow);
      }).then(win => {
        return (0, _src2.toProxyWindow)(win);
      });
    });
  },

  delegate: ['getProxyContainer', 'renderContainer', 'openFrame', 'openPrerenderFrame', 'prerender', 'open', 'openPrerender'],

  resize({
    width,
    height
  }) {
    if (this.proxyContainer) {
      this.proxyContainer.resize({
        width,
        height
      });
    }
  }

};

if (__ZOID__.__POPUP_SUPPORT__) {
  RENDER_DRIVERS[_constants.CONTEXT.POPUP] = {
    openOnClick: true,

    open() {
      return _src.ZalgoPromise.try(() => {
        let {
          width,
          height
        } = this.component.dimensions;
        width = (0, _src4.normalizeDimension)(width, window.outerWidth);
        height = (0, _src4.normalizeDimension)(height, window.outerWidth);
        const win = (0, _src4.popup)('', _extends({
          width,
          height
        }, this.component.attributes.popup));
        this.clean.register(() => {
          win.close();
          (0, _src2.cleanUpWindow)(win);
        });
        return (0, _src2.toProxyWindow)(win);
      });
    },

    openPrerender(proxyWin) {
      return _src.ZalgoPromise.try(() => {
        return proxyWin;
      });
    },

    delegate: ['getProxyContainer', 'renderContainer', 'setProxyWin']
  };
}