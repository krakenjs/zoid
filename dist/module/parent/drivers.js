"use strict";

exports.__esModule = true;
exports.RENDER_DRIVERS = void 0;

var _src = require("zalgo-promise/src");

var _src2 = require("post-robot/src");

var _src3 = require("cross-domain-utils/src");

var _src4 = require("belter/src");

var _constants = require("../constants");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/*  Render Drivers
    --------------

    There are various differences in how we treat:

    - Opening frames and windows
    - Rendering up to the parent
    - Resizing
    - etc.

    based on the context we're rendering to.

    These render drivers split this functionality out in a driver pattern, so our component code doesn't bunch up into a
    series of if-popup-then-else-if-iframe code.
*/
const RENDER_DRIVERS = {}; // Iframe context is rendered inline on the page, without any kind of parent template. It's the one context that is designed
// to feel like a native element on the page.

exports.RENDER_DRIVERS = RENDER_DRIVERS;
RENDER_DRIVERS[_constants.CONTEXT.IFRAME] = {
  renderedIntoContainer: true,
  callChildToClose: false,

  open() {
    const frame = (0, _src4.iframe)({
      attributes: _extends({
        title: this.component.name
      }, this.component.attributes.iframe),
      class: [_constants.CLASS.COMPONENT_FRAME, _constants.CLASS.INVISIBLE]
    }, this.element);
    this.clean.set('iframe', frame);
    return (0, _src4.awaitFrameWindow)(frame).then(win => {
      const detectClose = () => {
        return this.close();
      };

      const iframeWatcher = (0, _src4.watchElementForClose)(frame, detectClose);
      const elementWatcher = (0, _src4.watchElementForClose)(this.element, detectClose);
      this.clean.register(() => {
        iframeWatcher.cancel();
        elementWatcher.cancel();
        (0, _src2.cleanUpWindow)(win);
        (0, _src4.destroyElement)(frame);
      });
      return _src2.ProxyWindow.toProxyWindow(win);
    });
  },

  openPrerender() {
    const prerenderIframe = (0, _src4.iframe)({
      attributes: _extends({
        name: `__zoid_prerender_frame__${this.component.name}_${(0, _src4.uniqueID)()}__`
      }, this.component.attributes.iframe),
      class: [_constants.CLASS.PRERENDER_FRAME, _constants.CLASS.VISIBLE]
    }, this.element);
    this.clean.set('prerenderIframe', prerenderIframe);
    return (0, _src4.awaitFrameWindow)(prerenderIframe).then(prerenderFrameWindow => {
      this.clean.register(() => (0, _src4.destroyElement)(prerenderIframe));
      return (0, _src3.assertSameDomain)(prerenderFrameWindow);
    });
  },

  switchPrerender() {
    (0, _src4.addClass)(this.prerenderIframe, _constants.CLASS.INVISIBLE);
    (0, _src4.removeClass)(this.prerenderIframe, _constants.CLASS.VISIBLE);

    if (this.iframe) {
      (0, _src4.addClass)(this.iframe, _constants.CLASS.VISIBLE);
      (0, _src4.removeClass)(this.iframe, _constants.CLASS.INVISIBLE);
    }

    setTimeout(() => (0, _src4.destroyElement)(this.prerenderIframe), 1);
  },

  delegate: ['renderContainer', 'prerender', 'resize', 'openPrerender', 'switchPrerender', 'open'],

  resize({
    width,
    height
  }) {
    if (typeof width === 'number') {
      this.element.style.width = (0, _src4.toCSS)(width);
    }

    if (typeof height === 'number') {
      this.element.style.height = (0, _src4.toCSS)(height);
    }
  }

};

if (__ZOID__.__POPUP_SUPPORT__) {
  RENDER_DRIVERS[_constants.CONTEXT.POPUP] = {
    renderedIntoContainer: false,
    callChildToClose: true,

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
        return _src2.ProxyWindow.toProxyWindow(win);
      });
    },

    openPrerender(win) {
      return _src.ZalgoPromise.try(() => {
        if ((0, _src3.isSameDomain)(win)) {
          return (0, _src3.assertSameDomain)(win);
        }
      });
    },

    delegate: ['renderContainer']
  };
}