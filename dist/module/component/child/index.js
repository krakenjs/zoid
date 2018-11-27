var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint max-lines: 0 */

import { isSameDomain, matchDomain, getDomain } from 'cross-domain-utils/src';
import { markWindowKnown, deserializeMessage } from 'post-robot/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { extend, onDimensionsChange, trackDimensions, dimensionsMatchViewport, cycle, getElement, noop, waitForDocumentReady } from 'belter/src';

import { getParentComponentWindow as _getParentComponentWindow, getComponentMeta, getParentDomain } from '../window';
import { globalFor } from '../../lib';
import { CONTEXT_TYPES, CLOSE_REASONS, INITIAL_PROPS } from '../../constants';


import { normalizeChildProps } from './props';

/*  Child Component
    ---------------

    This is the portion of code which runs inside the frame or popup window containing the component's implementation.

    When the component author calls myComponent.attach(), it creates a new instance of ChildComponent, which is then
    responsible for managing the state and messaging back up to the parent, and providing props for the component to
    utilize.
*/

export var ChildComponent = function () {
    function ChildComponent(component) {
        var _this = this;

        _classCallCheck(this, ChildComponent);

        ZalgoPromise['try'](function () {
            if (window.xchild || window.xprops) {
                throw _this.component.createError('Can not attach multiple components to the same window');
            }

            var parentDomain = getParentDomain();
            var parentComponentWindow = _this.getParentComponentWindow();

            _this.parentExports = deserializeMessage(parentComponentWindow, parentDomain, getComponentMeta().exports);

            _this.component = component;
            _this.onPropHandlers = [];

            window.xchild = _this.component.xchild = _this;
            _this.setProps(_this.getInitialProps(), getParentDomain());

            _this.checkParentDomain();

            markWindowKnown(parentComponentWindow);

            _this.watchForClose();
            _this.listenForResize();
            _this.watchForResize();

            return _this.parentExports.init(_this.buildExports());
        })['catch'](function (err) {
            _this.error(err);
        });
    }

    ChildComponent.prototype.listenForResize = function listenForResize() {
        var _this2 = this;

        if (this.component.listenForResize) {
            this.parentExports.trigger.fireAndForget('resize');
            window.addEventListener('resize', function () {
                _this2.parentExports.trigger.fireAndForget('resize');
            });
        }
    };

    ChildComponent.prototype.checkParentDomain = function checkParentDomain() {
        if (!matchDomain(this.component.allowedParentDomains, getParentDomain())) {
            throw new Error('Can not be rendered by domain: ' + getParentDomain());
        }
    };

    ChildComponent.prototype.onProps = function onProps(handler) {
        this.onPropHandlers.push(handler);
    };

    ChildComponent.prototype.getParentComponentWindow = function getParentComponentWindow() {
        return _getParentComponentWindow();
    };

    ChildComponent.prototype.getInitialProps = function getInitialProps() {
        var componentMeta = getComponentMeta();

        var props = componentMeta.props;
        var parentComponentWindow = _getParentComponentWindow();

        if (props.type === INITIAL_PROPS.RAW) {
            props = props.value;
        } else if (props.type === INITIAL_PROPS.UID) {

            if (!isSameDomain(parentComponentWindow)) {

                if (window.location.protocol === 'file:') {
                    throw new Error('Can not get props from file:// domain');
                }

                throw new Error('Parent component window is on a different domain - expected ' + getDomain() + ' - can not retrieve props');
            }

            var global = globalFor(parentComponentWindow);

            if (!global) {
                throw new Error('Can not find global for parent component - can not retrieve props');
            }

            props = global.props[componentMeta.uid];
        } else {
            throw new Error('Unrecognized props type: ' + props.type);
        }

        if (!props) {
            throw new Error('Initial props not found');
        }

        return deserializeMessage(parentComponentWindow, getParentDomain(), props);
    };

    ChildComponent.prototype.setProps = function setProps(props, origin) {
        var required = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        // $FlowFixMe
        this.props = this.props || {};
        var normalizedProps = normalizeChildProps(this.component, props, origin, required);
        extend(this.props, normalizedProps);

        for (var _i2 = 0, _onPropHandlers2 = this.onPropHandlers, _length2 = _onPropHandlers2 == null ? 0 : _onPropHandlers2.length; _i2 < _length2; _i2++) {
            var handler = _onPropHandlers2[_i2];
            handler.call(this, this.props);
        }

        window.xprops = this.component.xprops = this.props;
    };

    ChildComponent.prototype.watchForClose = function watchForClose() {
        var _this3 = this;

        window.addEventListener('unload', function () {
            return _this3.parentExports.checkClose.fireAndForget();
        });
    };

    ChildComponent.prototype.enableAutoResize = function enableAutoResize() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$width = _ref.width,
            width = _ref$width === undefined ? true : _ref$width,
            _ref$height = _ref.height,
            height = _ref$height === undefined ? true : _ref$height;

        this.autoResize = { width: width, height: height };
        this.watchForResize();
    };

    ChildComponent.prototype.getAutoResize = function getAutoResize() {

        var width = false;
        var height = false;

        var autoResize = this.autoResize || this.component.autoResize;

        if ((typeof autoResize === 'undefined' ? 'undefined' : _typeof(autoResize)) === 'object') {
            width = Boolean(autoResize.width);
            height = Boolean(autoResize.height);
        } else if (autoResize) {
            width = true;
            height = true;
        }

        var element = void 0;

        if (autoResize.element) {
            element = getElement(autoResize.element);
        } else if (window.navigator.userAgent.match(/MSIE (9|10)\./)) {
            element = document.body;
        } else {
            element = document.documentElement;
        }

        // $FlowFixMe
        return { width: width, height: height, element: element };
    };

    ChildComponent.prototype.watchForResize = function watchForResize() {
        var _this4 = this;

        var _getAutoResize = this.getAutoResize(),
            width = _getAutoResize.width,
            height = _getAutoResize.height,
            element = _getAutoResize.element;

        if (!width && !height) {
            return;
        }

        if (getComponentMeta().context === CONTEXT_TYPES.POPUP) {
            return;
        }

        if (this.watchingForResize) {
            return;
        }

        this.watchingForResize = true;

        return ZalgoPromise['try'](function () {
            return waitForDocumentReady();
        }).then(function () {

            // $FlowFixMe
            if (!dimensionsMatchViewport(element, { width: width, height: height })) {
                // $FlowFixMe
                return _this4.resizeToElement(element, { width: width, height: height });
            }
        }).then(function () {

            return cycle(function () {
                return onDimensionsChange(element, { width: width, height: height }).then(function () {
                    // $FlowFixMe
                    return _this4.resizeToElement(element, { width: width, height: height });
                });
            });
        });
    };

    ChildComponent.prototype.buildExports = function buildExports() {

        var self = this;

        return {
            updateProps: function updateProps(props) {
                var _this5 = this;

                return ZalgoPromise['try'](function () {
                    return self.setProps(props, _this5.origin, false);
                });
            },
            close: function close() {
                return ZalgoPromise['try'](function () {
                    return self.destroy();
                });
            }
        };
    };

    ChildComponent.prototype.resize = function resize(width, height) {
        return this.parentExports.resize(width, height);
    };

    ChildComponent.prototype.resizeToElement = function resizeToElement(el, _ref2) {
        var _this6 = this;

        var width = _ref2.width,
            height = _ref2.height;


        var history = [];

        var resize = function resize() {
            return ZalgoPromise['try'](function () {

                // $FlowFixMe
                var tracker = trackDimensions(el, { width: width, height: height });

                var _tracker$check = tracker.check(),
                    dimensions = _tracker$check.dimensions;

                for (var _i4 = 0, _length4 = history == null ? 0 : history.length; _i4 < _length4; _i4++) {
                    var size = history[_i4];

                    var widthMatch = !width || size.width === dimensions.width;
                    var heightMatch = !height || size.height === dimensions.height;

                    if (widthMatch && heightMatch) {
                        return;
                    }
                }

                history.push({ width: dimensions.width, height: dimensions.height });

                return _this6.resize(width ? dimensions.width : null, height ? dimensions.height : null).then(function () {

                    if (tracker.check().changed) {
                        return resize();
                    }
                });
            });
        };

        return resize();
    };

    ChildComponent.prototype.hide = function hide() {
        return this.parentExports.hide();
    };

    ChildComponent.prototype.show = function show() {
        return this.parentExports.show();
    };

    ChildComponent.prototype.userClose = function userClose() {
        return this.close(CLOSE_REASONS.USER_CLOSED);
    };

    ChildComponent.prototype.close = function close() {
        var reason = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : CLOSE_REASONS.CHILD_CALL;

        return this.parentExports.close(reason);
    };

    ChildComponent.prototype.destroy = function destroy() {
        return ZalgoPromise['try'](function () {
            window.close();
        });
    };

    ChildComponent.prototype.focus = function focus() {
        window.focus();
    };

    ChildComponent.prototype.error = function error(err) {
        var _this7 = this;

        // eslint-disable-next-line promise/no-promise-in-callback
        return this.parentExports.error(err).then(noop)['finally'](function () {
            return _this7.destroy();
        }).then(function () {
            throw err;
        });
    };

    return ChildComponent;
}();