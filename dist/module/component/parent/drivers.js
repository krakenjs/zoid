var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import { ZalgoPromise } from 'zalgo-promise/src';
import { cleanUpWindow, ProxyWindow } from 'post-robot/src';
import { assertSameDomain, isSameDomain } from 'cross-domain-utils/src';
import { iframe, popup, toCSS, showElement, hideElement, destroyElement, normalizeDimension, watchElementForClose, awaitFrameWindow, awaitFrameLoad, addClass, removeClass, uniqueID } from 'belter/src';

import { CONTEXT, DELEGATE, CLOSE_REASONS, CLASS_NAMES } from '../../constants';

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

export var RENDER_DRIVERS = {};

// Iframe context is rendered inline on the page, without any kind of parent template. It's the one context that is designed
// to feel like a native element on the page.

RENDER_DRIVERS[CONTEXT.IFRAME] = {

    renderedIntoContainer: true,
    callChildToClose: false,

    open: function open() {
        var _this = this;

        var attributes = this.component.attributes.iframe || {};

        var frame = iframe({
            attributes: _extends({
                title: this.component.name
            }, attributes),
            'class': [CLASS_NAMES.COMPONENT_FRAME, CLASS_NAMES.INVISIBLE]
        }, this.element);

        this.clean.set('iframe', frame);

        return awaitFrameWindow(frame).then(function (win) {

            var detectClose = function detectClose() {
                return ZalgoPromise['try'](function () {
                    return _this.props.onClose(CLOSE_REASONS.CLOSE_DETECTED);
                })['finally'](function () {
                    return _this.destroy();
                });
            };

            var iframeWatcher = watchElementForClose(frame, detectClose);
            var elementWatcher = watchElementForClose(_this.element, detectClose);

            _this.clean.register('destroyWindow', function () {
                iframeWatcher.cancel();
                elementWatcher.cancel();
                cleanUpWindow(win);
                destroyElement(frame);
            });

            return ProxyWindow.toProxyWindow(win);
        });
    },
    openPrerender: function openPrerender() {
        var _this2 = this;

        var attributes = this.component.attributes.iframe || {};

        var prerenderIframe = iframe({
            attributes: _extends({
                name: '__zoid_prerender_frame__' + this.component.name + '_' + uniqueID() + '__'
            }, attributes),
            'class': [CLASS_NAMES.PRERENDER_FRAME, CLASS_NAMES.VISIBLE]
        }, this.element);

        this.clean.set('prerenderIframe', prerenderIframe);

        return awaitFrameLoad(prerenderIframe).then(function () {
            var prerenderFrameWindow = prerenderIframe.contentWindow;

            _this2.clean.register('destroyPrerender', function () {
                destroyElement(prerenderIframe);
            });

            return assertSameDomain(prerenderFrameWindow);
        });
    },
    switchPrerender: function switchPrerender() {
        var _this3 = this;

        addClass(this.prerenderIframe, CLASS_NAMES.INVISIBLE);
        removeClass(this.prerenderIframe, CLASS_NAMES.VISIBLE);

        addClass(this.iframe, CLASS_NAMES.VISIBLE);
        removeClass(this.iframe, CLASS_NAMES.INVISIBLE);

        setTimeout(function () {
            if (_this3.prerenderIframe) {
                destroyElement(_this3.prerenderIframe);
            }
        }, 1000);
    },


    delegateOverrides: {
        openContainer: DELEGATE.CALL_DELEGATE,
        destroyComponent: DELEGATE.CALL_DELEGATE,
        destroyContainer: DELEGATE.CALL_DELEGATE,
        cancelContainerEvents: DELEGATE.CALL_DELEGATE,
        prerender: DELEGATE.CALL_DELEGATE,
        elementReady: DELEGATE.CALL_DELEGATE,
        showContainer: DELEGATE.CALL_DELEGATE,
        showComponent: DELEGATE.CALL_DELEGATE,
        hideContainer: DELEGATE.CALL_DELEGATE,
        hideComponent: DELEGATE.CALL_DELEGATE,
        hide: DELEGATE.CALL_DELEGATE,
        show: DELEGATE.CALL_DELEGATE,
        resize: DELEGATE.CALL_DELEGATE,
        loadUrl: DELEGATE.CALL_DELEGATE,
        openPrerender: DELEGATE.CALL_DELEGATE,
        switchPrerender: DELEGATE.CALL_DELEGATE,
        setWindowName: DELEGATE.CALL_DELEGATE,
        open: DELEGATE.CALL_DELEGATE
    },

    resize: function resize(_ref) {
        var width = _ref.width,
            height = _ref.height;


        if (width) {
            this.container.style.width = toCSS(width);
            this.element.style.width = toCSS(width);
        }

        if (height) {
            this.container.style.height = toCSS(height);
            this.element.style.height = toCSS(height);
        }
    },
    show: function show() {
        showElement(this.element);
    },
    hide: function hide() {
        hideElement(this.element);
    }
};

if (__ZOID__.__POPUP_SUPPORT__) {

    // Popup context opens up a centered popup window on the page.

    RENDER_DRIVERS[CONTEXT.POPUP] = {

        renderedIntoContainer: false,
        callChildToClose: true,

        open: function open() {
            var _this4 = this;

            return ZalgoPromise['try'](function () {
                var _component$dimensions = _this4.component.dimensions,
                    width = _component$dimensions.width,
                    height = _component$dimensions.height;


                width = normalizeDimension(width, window.outerWidth);
                height = normalizeDimension(height, window.outerWidth);

                var attributes = _this4.component.attributes.popup || {};
                var win = popup('', _extends({ width: width, height: height }, attributes));

                _this4.clean.register('destroyWindow', function () {
                    win.close();
                    cleanUpWindow(win);
                });

                return ProxyWindow.toProxyWindow(win);
            });
        },
        openPrerender: function openPrerender(win) {
            return ZalgoPromise['try'](function () {
                if (isSameDomain(win)) {
                    return assertSameDomain(win);
                }
            });
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

            openContainer: DELEGATE.CALL_DELEGATE,
            destroyContainer: DELEGATE.CALL_DELEGATE,

            elementReady: DELEGATE.CALL_DELEGATE,

            showContainer: DELEGATE.CALL_DELEGATE,
            showComponent: DELEGATE.CALL_DELEGATE,
            hideContainer: DELEGATE.CALL_DELEGATE,
            hideComponent: DELEGATE.CALL_DELEGATE,

            hide: DELEGATE.CALL_DELEGATE,
            show: DELEGATE.CALL_DELEGATE,

            cancelContainerEvents: DELEGATE.CALL_DELEGATE
        }
    };
}