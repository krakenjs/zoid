var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint max-lines: 0 */

import { isSameDomain, matchDomain, getDomain, getOpener, getTop, getParent, getNthParentFromTop, getAncestor, getAllFramesInWindow } from 'cross-domain-utils/src';
import { markWindowKnown, deserializeMessage } from 'post-robot/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { extend, onDimensionsChange, trackDimensions, dimensionsMatchViewport, cycle, getElement, noop, waitForDocumentReady } from 'belter/src';

import { parseChildWindowName } from '../window';
import { globalFor } from '../../lib';
import { CONTEXT_TYPES, CLOSE_REASONS, INITIAL_PROPS, WINDOW_REFERENCES } from '../../constants';


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

            _this.component = component;
            _this.onPropHandlers = [];

            var _parseChildWindowName = parseChildWindowName(),
                parent = _parseChildWindowName.parent,
                domain = _parseChildWindowName.domain,
                exports = _parseChildWindowName.exports,
                context = _parseChildWindowName.context,
                props = _parseChildWindowName.props;

            _this.context = context;
            _this.parentComponentWindow = _this.getWindowByRef(parent);
            _this.parentExports = deserializeMessage(_this.parentComponentWindow, domain, exports);

            _this.checkParentDomain(domain);

            window.xchild = _this.component.xchild = _this;
            var initialProps = _this.getPropsByRef(_this.parentComponentWindow, domain, props);
            _this.setProps(initialProps, domain);
            markWindowKnown(_this.parentComponentWindow);

            _this.watchForClose();
            _this.listenForResize();
            _this.watchForResize(context);

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

    ChildComponent.prototype.checkParentDomain = function checkParentDomain(domain) {
        if (!matchDomain(this.component.allowedParentDomains, domain)) {
            throw new Error('Can not be rendered by domain: ' + domain);
        }
    };

    ChildComponent.prototype.onProps = function onProps(handler) {
        this.onPropHandlers.push(handler);
    };

    ChildComponent.prototype.getPropsByRef = function getPropsByRef(parentComponentWindow, domain, _ref) {
        var type = _ref.type,
            value = _ref.value,
            uid = _ref.uid;

        var props = void 0;

        if (type === INITIAL_PROPS.RAW) {
            props = value;
        } else if (type === INITIAL_PROPS.UID) {

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

            props = global.props[uid];
        }

        if (!props) {
            throw new Error('Initial props not found');
        }

        return deserializeMessage(parentComponentWindow, domain, props);
    };

    ChildComponent.prototype.getWindowByRef = function getWindowByRef(ref) {
        var type = ref.type;

        var result = void 0;

        if (type === WINDOW_REFERENCES.OPENER) {
            result = getOpener(window);
        } else if (type === WINDOW_REFERENCES.TOP) {
            result = getTop(window);
        } else if (type === WINDOW_REFERENCES.PARENT) {
            // $FlowFixMe
            var distance = ref.distance;


            if (distance) {
                result = getNthParentFromTop(window, distance);
            } else {
                result = getParent(window);
            }
        }

        if (type === WINDOW_REFERENCES.GLOBAL) {
            // $FlowFixMe
            var uid = ref.uid;

            var ancestor = getAncestor(window);

            if (ancestor) {
                for (var _i2 = 0, _getAllFramesInWindow2 = getAllFramesInWindow(ancestor), _length2 = _getAllFramesInWindow2 == null ? 0 : _getAllFramesInWindow2.length; _i2 < _length2; _i2++) {
                    var frame = _getAllFramesInWindow2[_i2];
                    var global = globalFor(frame);

                    if (global && global.windows && global.windows[uid]) {
                        result = global.windows[uid];
                        break;
                    }
                }
            }
        }

        if (!result) {
            throw new Error('Unable to find ' + type + ' window');
        }

        return result;
    };

    ChildComponent.prototype.setProps = function setProps(props, origin) {
        var required = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        // $FlowFixMe
        this.props = this.props || {};
        var normalizedProps = normalizeChildProps(this.parentComponentWindow, this.component, props, origin, required);
        extend(this.props, normalizedProps);

        for (var _i4 = 0, _onPropHandlers2 = this.onPropHandlers, _length4 = _onPropHandlers2 == null ? 0 : _onPropHandlers2.length; _i4 < _length4; _i4++) {
            var handler = _onPropHandlers2[_i4];
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
        var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref2$width = _ref2.width,
            width = _ref2$width === undefined ? true : _ref2$width,
            _ref2$height = _ref2.height,
            height = _ref2$height === undefined ? true : _ref2$height;

        this.autoResize = { width: width, height: height };
        this.watchForResize(this.context);
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

    ChildComponent.prototype.watchForResize = function watchForResize(context) {
        var _this4 = this;

        var _getAutoResize = this.getAutoResize(),
            width = _getAutoResize.width,
            height = _getAutoResize.height,
            element = _getAutoResize.element;

        if (!width && !height) {
            return;
        }

        if (context === CONTEXT_TYPES.POPUP) {
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

    ChildComponent.prototype.resizeToElement = function resizeToElement(el, _ref3) {
        var _this6 = this;

        var width = _ref3.width,
            height = _ref3.height;


        var history = [];

        var resize = function resize() {
            return ZalgoPromise['try'](function () {

                // $FlowFixMe
                var tracker = trackDimensions(el, { width: width, height: height });

                var _tracker$check = tracker.check(),
                    dimensions = _tracker$check.dimensions;

                for (var _i6 = 0, _length6 = history == null ? 0 : history.length; _i6 < _length6; _i6++) {
                    var size = history[_i6];

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
        return ZalgoPromise['try'](function () {
            if (_this7.parentExports.error) {
                return _this7.parentExports.error(err);
            }
        })['catch'](noop).then(function () {
            throw err;
        });
    };

    return ChildComponent;
}();