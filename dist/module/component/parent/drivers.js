'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RENDER_DRIVERS = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _src = require('zalgo-promise/src');

var _src2 = require('post-robot/src');

var _src3 = require('cross-domain-utils/src');

var _lib = require('../../lib');

var _constants = require('../../constants');

var _window = require('../window');

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

var RENDER_DRIVERS = exports.RENDER_DRIVERS = {};

// Iframe context is rendered inline on the page, without any kind of parent template. It's the one context that is designed
// to feel like a native element on the page.

RENDER_DRIVERS[_constants.CONTEXT_TYPES.IFRAME] = {

    focusable: false,
    renderedIntoContainerTemplate: true,
    allowResize: true,
    openOnClick: false,
    needsBridge: false,

    open: function open(url) {
        var _this = this;

        var attributes = this.component.attributes.iframe || {};

        this.iframe = (0, _lib.iframe)({
            url: url,
            attributes: _extends({
                name: this.childWindowName,
                title: this.component.name,
                scrolling: this.component.scrolling ? 'yes' : 'no'
            }, attributes),
            'class': [_constants.CLASS_NAMES.COMPONENT_FRAME, _constants.CLASS_NAMES.INVISIBLE]
        }, this.element);

        return (0, _lib.awaitFrameWindow)(this.iframe).then(function (frameWindow) {

            _this.window = frameWindow;

            var detectClose = function detectClose() {
                return _src.ZalgoPromise['try'](function () {
                    return _this.props.onClose(_constants.CLOSE_REASONS.CLOSE_DETECTED);
                })['finally'](function () {
                    return _this.destroy();
                });
            };

            var iframeWatcher = (0, _lib.watchElementForClose)(_this.iframe, detectClose);
            var elementWatcher = (0, _lib.watchElementForClose)(_this.element, detectClose);

            _this.clean.register('destroyWindow', function () {

                iframeWatcher.cancel();
                elementWatcher.cancel();

                (0, _src2.cleanUpWindow)(_this.window);

                delete _this.window;

                if (_this.iframe) {
                    (0, _lib.destroyElement)(_this.iframe);
                    delete _this.iframe;
                }
            });
        });
    },
    openPrerender: function openPrerender() {
        var _this2 = this;

        var attributes = this.component.attributes.iframe || {};

        this.prerenderIframe = (0, _lib.iframe)({
            attributes: _extends({
                name: '__prerender__' + this.childWindowName,
                scrolling: this.component.scrolling ? 'yes' : 'no'
            }, attributes),
            'class': [_constants.CLASS_NAMES.PRERENDER_FRAME, _constants.CLASS_NAMES.VISIBLE]
        }, this.element);

        return (0, _lib.awaitFrameWindow)(this.prerenderIframe).then(function (prerenderFrameWindow) {

            _this2.prerenderWindow = prerenderFrameWindow;

            _this2.clean.register('destroyPrerender', function () {

                if (_this2.prerenderIframe) {
                    (0, _lib.destroyElement)(_this2.prerenderIframe);
                    delete _this2.prerenderIframe;
                }
            });
        });
    },
    switchPrerender: function switchPrerender() {
        var _this3 = this;

        (0, _lib.addClass)(this.prerenderIframe, _constants.CLASS_NAMES.INVISIBLE);
        (0, _lib.removeClass)(this.prerenderIframe, _constants.CLASS_NAMES.VISIBLE);

        (0, _lib.addClass)(this.iframe, _constants.CLASS_NAMES.VISIBLE);
        (0, _lib.removeClass)(this.iframe, _constants.CLASS_NAMES.INVISIBLE);

        setTimeout(function () {
            if (_this3.prerenderIframe) {
                (0, _lib.destroyElement)(_this3.prerenderIframe);
            }
        }, 1000);
    },


    delegateOverrides: {

        openContainer: _constants.DELEGATE.CALL_DELEGATE,
        destroyComponent: _constants.DELEGATE.CALL_DELEGATE,
        destroyContainer: _constants.DELEGATE.CALL_DELEGATE,
        cancelContainerEvents: _constants.DELEGATE.CALL_DELEGATE,
        createPrerenderTemplate: _constants.DELEGATE.CALL_DELEGATE,
        elementReady: _constants.DELEGATE.CALL_DELEGATE,
        showContainer: _constants.DELEGATE.CALL_DELEGATE,
        showComponent: _constants.DELEGATE.CALL_DELEGATE,
        hideContainer: _constants.DELEGATE.CALL_DELEGATE,
        hideComponent: _constants.DELEGATE.CALL_DELEGATE,
        hide: _constants.DELEGATE.CALL_DELEGATE,
        show: _constants.DELEGATE.CALL_DELEGATE,
        resize: _constants.DELEGATE.CALL_DELEGATE,
        loadUrl: _constants.DELEGATE.CALL_DELEGATE,
        hijackSubmit: _constants.DELEGATE.CALL_DELEGATE,
        openPrerender: _constants.DELEGATE.CALL_DELEGATE,
        switchPrerender: _constants.DELEGATE.CALL_DELEGATE,

        renderTemplate: _constants.DELEGATE.CALL_ORIGINAL,
        openContainerFrame: _constants.DELEGATE.CALL_ORIGINAL,
        getOutlet: _constants.DELEGATE.CALL_ORIGINAL,

        open: function open(original, override) {
            return function overrideOpen() {
                var _this4 = this;

                return override.apply(this, arguments).then(function () {
                    _this4.clean.set('window', (0, _src3.findFrameByName)((0, _window.getParentComponentWindow)(), _this4.childWindowName));

                    if (!_this4.window) {
                        throw new Error('Unable to find parent component iframe window');
                    }
                });
            };
        }
    },

    resize: function resize(width, height) {

        if (width) {
            this.container.style.width = (0, _lib.toCSS)(width);
            this.element.style.width = (0, _lib.toCSS)(width);
        }

        if (height) {
            this.container.style.height = (0, _lib.toCSS)(height);
            this.element.style.height = (0, _lib.toCSS)(height);
        }
    },
    show: function show() {
        (0, _lib.showElement)(this.element);
    },
    hide: function hide() {
        (0, _lib.hideElement)(this.element);
    },
    loadUrl: function loadUrl(url) {
        this.iframe.setAttribute('src', url);
    }
};

if (__XCOMPONENT__.__POPUP_SUPPORT__) {

    // Popup context opens up a centered popup window on the page.

    RENDER_DRIVERS[_constants.CONTEXT_TYPES.POPUP] = {

        focusable: true,
        renderedIntoContainerTemplate: false,
        allowResize: false,
        openOnClick: true,
        needsBridge: true,

        open: function open() {
            var _this5 = this;

            var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

            return _src.ZalgoPromise['try'](function () {
                var _ref = _this5.component.dimensions || {},
                    _ref$width = _ref.width,
                    width = _ref$width === undefined ? _constants.DEFAULT_DIMENSIONS.WIDTH : _ref$width,
                    _ref$height = _ref.height,
                    height = _ref$height === undefined ? _constants.DEFAULT_DIMENSIONS.HEIGHT : _ref$height;

                width = (0, _lib.normalizeDimension)(width, window.outerWidth);
                height = (0, _lib.normalizeDimension)(height, window.outerWidth);

                var _getPosition = (0, _window.getPosition)({ width: width, height: height }),
                    x = _getPosition.x,
                    y = _getPosition.y;

                var attributes = _this5.component.attributes.popup || {};

                _this5.window = (0, _lib.popup)(url || '', _extends({
                    name: _this5.childWindowName,
                    width: width,
                    height: height,
                    top: y,
                    left: x,
                    status: 1,
                    toolbar: 0,
                    menubar: 0,
                    resizable: 1,
                    scrollbars: 1
                }, attributes));

                _this5.prerenderWindow = _this5.window;

                _this5.clean.register('destroyWindow', function () {
                    if (_this5.window) {
                        _this5.window.close();
                        (0, _src2.cleanUpWindow)(_this5.window);
                        delete _this5.window;
                        delete _this5.prerenderWindow;
                    }
                });

                _this5.resize(width, height);
            });
        },
        openPrerender: function openPrerender() {
            return _src.ZalgoPromise['try'](_lib.noop);
        },
        resize: function resize() {
            // pass
        },
        hide: function hide() {
            throw new Error('Can not hide popup');
        },
        show: function show() {
            throw new Error('Can not show popup');
        },


        delegateOverrides: {

            openContainer: _constants.DELEGATE.CALL_DELEGATE,
            destroyContainer: _constants.DELEGATE.CALL_DELEGATE,

            elementReady: _constants.DELEGATE.CALL_DELEGATE,

            showContainer: _constants.DELEGATE.CALL_DELEGATE,
            showComponent: _constants.DELEGATE.CALL_DELEGATE,
            hideContainer: _constants.DELEGATE.CALL_DELEGATE,
            hideComponent: _constants.DELEGATE.CALL_DELEGATE,

            hide: _constants.DELEGATE.CALL_DELEGATE,
            show: _constants.DELEGATE.CALL_DELEGATE,

            cancelContainerEvents: _constants.DELEGATE.CALL_DELEGATE,

            open: _constants.DELEGATE.CALL_ORIGINAL,
            loadUrl: _constants.DELEGATE.CALL_ORIGINAL,
            createPrerenderTemplate: _constants.DELEGATE.CALL_ORIGINAL,
            destroyComponent: _constants.DELEGATE.CALL_ORIGINAL,
            resize: _constants.DELEGATE.CALL_ORIGINAL,
            renderTemplate: _constants.DELEGATE.CALL_ORIGINAL,
            openContainerFrame: _constants.DELEGATE.CALL_ORIGINAL,
            getOutlet: _constants.DELEGATE.CALL_ORIGINAL
        },

        loadUrl: function loadUrl(url) {

            if ((0, _src3.isSameDomain)(this.window)) {
                try {
                    if (this.window.location && this.window.location.replace) {
                        this.window.location.replace(url);
                        return;
                    }
                } catch (err) {
                    // pass
                }
            }

            this.window.location = url;
        }
    };
}