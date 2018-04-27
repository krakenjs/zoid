'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ChildComponent = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _client = require('beaver-logger/client');

var _src = require('cross-domain-utils/src');

var _src2 = require('post-robot/src');

var _src3 = require('zalgo-promise/src');

var _base = require('../base');

var _window = require('../window');

var _lib = require('../../lib');

var _constants = require('../../constants');

var _error = require('../../error');

var _props = require('./props');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
/* eslint max-lines: 0 */

/*  Child Component
    ---------------

    This is the portion of code which runs inside the frame or popup window containing the component's implementation.

    When the component author calls myComponent.attach(), it creates a new instance of ChildComponent, which is then
    responsible for managing the state and messaging back up to the parent, and providing props for the component to
    utilize.
*/

var ChildComponent = exports.ChildComponent = function (_BaseComponent) {
    _inherits(ChildComponent, _BaseComponent);

    function ChildComponent(component) {
        _classCallCheck(this, ChildComponent);

        var _this = _possibleConstructorReturn(this, (ChildComponent.__proto__ || Object.getPrototypeOf(ChildComponent)).call(this));

        _this.component = component;

        if (!_this.hasValidParentDomain()) {
            _this.error(new _error.RenderError('Can not be rendered by domain: ' + _this.getParentDomain()));
            return _possibleConstructorReturn(_this);
        }

        _this.component.log('construct_child');

        // The child can specify some default props if none are passed from the parent. This often makes integrations
        // a little more seamless, as applicaiton code can call props.foo() without worrying about whether the parent
        // has provided them or not, and fall-back to some default behavior.

        _this.onPropHandlers = [];

        _this.component.xchild = _this;
        _this.setProps(_this.getInitialProps(), (0, _window.getParentDomain)());

        // update logLevel with prop.logLevel to override defaultLogLevel configured when creating component

        if (_this.props.logLevel) {
            (0, _lib.setLogLevel)(_this.props.logLevel);
        }

        _this.component.log('init_child');

        _this.setWindows();

        _this.listenForResize();

        // Send an init message to our parent. This gives us an initial set of data to use that we can use to function.
        //
        // For example:
        //
        // - What context are we
        // - What props has the parent specified

        _this.onInit = _this.sendToParent(_constants.POST_MESSAGE.INIT, {

            exports: _this.exports()

        }).then(function (_ref) {
            var origin = _ref.origin,
                data = _ref.data;


            _this.context = data.context;
            _this.setProps(data.props, origin);

            _this.watchForResize();

            return _this;
        })['catch'](function (err) {

            _this.error(err);
            throw err;
        });
        return _this;
    }

    _createClass(ChildComponent, [{
        key: 'listenForResize',
        value: function listenForResize() {
            var _this2 = this;

            this.sendToParent(_constants.POST_MESSAGE.ONRESIZE, {}, { fireAndForget: true });
            window.addEventListener('resize', function () {
                _this2.sendToParent(_constants.POST_MESSAGE.ONRESIZE, {}, { fireAndForget: true });
            });
        }
    }, {
        key: 'hasValidParentDomain',
        value: function hasValidParentDomain() {
            return (0, _src.matchDomain)(this.component.allowedParentDomains, this.getParentDomain());
        }
    }, {
        key: 'init',
        value: function init() {
            return this.onInit;
        }
    }, {
        key: 'getParentDomain',
        value: function getParentDomain() {
            return (0, _window.getParentDomain)();
        }
    }, {
        key: 'onProps',
        value: function onProps(handler) {
            this.onPropHandlers.push(handler);
        }
    }, {
        key: 'getParentComponentWindow',
        value: function getParentComponentWindow() {
            return (0, _window.getParentComponentWindow)();
        }
    }, {
        key: 'getParentRenderWindow',
        value: function getParentRenderWindow() {
            return (0, _window.getParentRenderWindow)();
        }
    }, {
        key: 'getInitialProps',
        value: function getInitialProps() {
            var _this3 = this;

            var componentMeta = (0, _window.getComponentMeta)();

            var props = componentMeta.props;

            if (props.type === _constants.INITIAL_PROPS.RAW) {
                props = props.value;
            } else if (props.type === _constants.INITIAL_PROPS.UID) {

                var parentComponentWindow = (0, _window.getParentComponentWindow)();

                if (!(0, _src.isSameDomain)(parentComponentWindow)) {

                    if (window.location.protocol === 'file:') {
                        throw new Error('Can not get props from file:// domain');
                    }

                    throw new Error('Parent component window is on a different domain - expected ' + (0, _src.getDomain)() + ' - can not retrieve props');
                }

                var global = (0, _lib.globalFor)(parentComponentWindow);

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

            return (0, _lib.deserializeFunctions)(props, function (_ref2) {
                var fullKey = _ref2.fullKey,
                    self = _ref2.self,
                    args = _ref2.args;

                return _this3.onInit.then(function () {
                    var func = (0, _lib.get)(_this3.props, fullKey);

                    if (typeof func !== 'function') {
                        throw new TypeError('Expected ' + (typeof func === 'undefined' ? 'undefined' : _typeof(func)) + ' to be function');
                    }

                    return func.apply(self, args);
                });
            });
        }
    }, {
        key: 'setProps',
        value: function setProps(props, origin) {
            var required = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

            // $FlowFixMe
            this.props = this.props || {};
            var normalizedProps = (0, _props.normalizeChildProps)(this.component, props, origin, required);
            (0, _lib.extend)(this.props, normalizedProps);
            window.xprops = this.props;
            this.component.xprops = this.props;
            for (var _iterator = this.onPropHandlers, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                var _ref3;

                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref3 = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref3 = _i.value;
                }

                var handler = _ref3;

                handler.call(this, this.props);
            }
        }

        /*  Send to Parent
            --------------
             Send a post message to our parent window.
        */

    }, {
        key: 'sendToParent',
        value: function sendToParent(name) {
            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            var parentWindow = (0, _window.getParentComponentWindow)();

            if (!parentWindow) {
                throw new Error('Can not find parent component window to message');
            }

            this.component.log('send_to_parent_' + name);

            return (0, _src2.send)(parentWindow, name, data, _extends({ domain: (0, _window.getParentDomain)() }, options));
        }

        /*  Set Windows
            -----------
             Determine the parent window, and the parent component window. Note -- these may be different, if we were
            rendered using renderTo.
        */

    }, {
        key: 'setWindows',
        value: function setWindows() {

            // Ensure we do not try to .attach() multiple times for the same component on the same page

            if (window.__activeXComponent__) {
                throw this.component.createError('Can not attach multiple components to the same window');
            }

            window.__activeXComponent__ = this;

            // Get the direct parent window

            if (!(0, _window.getParentComponentWindow)()) {
                throw this.component.createError('Can not find parent window');
            }

            var componentMeta = (0, _window.getComponentMeta)();

            if (componentMeta.tag !== this.component.tag) {
                throw this.component.createError('Parent is ' + componentMeta.tag + ' - can not attach ' + this.component.tag);
            }

            // Note -- getting references to other windows is probably one of the hardest things to do. There's basically
            // only a few ways of doing it:
            //
            // - The window is a direct parent, in which case you can use window.parent or window.opener
            // - The window is an iframe owned by you or one of your parents, in which case you can use window.frames
            // - The window sent you a post-message, in which case you can use event.source
            //
            // If we didn't rely on winProps.parent here from the window name, we'd have to relay all of our messages through
            // our actual parent. Which is no fun at all, and pretty error prone even with the help of post-robot. So this
            // is the lesser of two evils until browsers give us something like getWindowByName(...)

            // If the parent window closes, we need to close ourselves. There's no point continuing to run our component
            // if there's no parent to message to.

            this.watchForClose();
        }
    }, {
        key: 'watchForClose',
        value: function watchForClose() {
            var _this4 = this;

            window.addEventListener('unload', function () {
                return _this4.checkClose();
            });
        }
    }, {
        key: 'enableAutoResize',
        value: function enableAutoResize() {
            var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                _ref4$width = _ref4.width,
                width = _ref4$width === undefined ? true : _ref4$width,
                _ref4$height = _ref4.height,
                height = _ref4$height === undefined ? true : _ref4$height;

            this.autoResize = { width: width, height: height };
            this.watchForResize();
        }
    }, {
        key: 'getAutoResize',
        value: function getAutoResize() {

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
                element = (0, _lib.getElement)(autoResize.element);
            } else if (window.navigator.userAgent.match(/MSIE (9|10)\./)) {
                element = document.body;
            } else {
                element = document.documentElement;
            }

            // $FlowFixMe
            return { width: width, height: height, element: element };
        }
    }, {
        key: 'watchForResize',
        value: function watchForResize() {
            var _this5 = this;

            var _getAutoResize = this.getAutoResize(),
                width = _getAutoResize.width,
                height = _getAutoResize.height,
                element = _getAutoResize.element;

            if (!width && !height) {
                return;
            }

            if (this.context === _constants.CONTEXT_TYPES.POPUP) {
                return;
            }

            if (this.watchingForResize) {
                return;
            }

            this.watchingForResize = true;

            return _src3.ZalgoPromise['try'](function () {

                return _lib.documentReady;
            }).then(function () {

                // $FlowFixMe
                if (!(0, _lib.dimensionsMatchViewport)(element, { width: width, height: height })) {
                    // $FlowFixMe
                    return _this5.resizeToElement(element, { width: width, height: height });
                }
            }).then(function () {

                return (0, _lib.cycle)(function () {
                    return (0, _lib.onDimensionsChange)(element, { width: width, height: height }).then(function () {
                        // $FlowFixMe
                        return _this5.resizeToElement(element, { width: width, height: height });
                    });
                });
            });
        }
    }, {
        key: 'exports',
        value: function exports() {

            var self = this;

            return {
                updateProps: function updateProps(props) {
                    var _this6 = this;

                    return _src3.ZalgoPromise['try'](function () {
                        return self.setProps(props, _this6.origin, false);
                    });
                },
                close: function close() {
                    return _src3.ZalgoPromise['try'](function () {
                        return self.destroy();
                    });
                }
            };
        }

        /*  Resize
            ------
             Resize the child window. Must be done on a user action like a click if we're in a popup
        */

    }, {
        key: 'resize',
        value: function resize(width, height) {
            var _this7 = this;

            return _src3.ZalgoPromise.resolve().then(function () {

                _this7.component.log('resize', { width: (0, _lib.stringify)(width), height: (0, _lib.stringify)(height) });

                if (_this7.context === _constants.CONTEXT_TYPES.POPUP) {
                    return;
                }

                return _this7.sendToParent(_constants.POST_MESSAGE.RESIZE, { width: width, height: height }).then(_lib.noop);
            });
        }
    }, {
        key: 'resizeToElement',
        value: function resizeToElement(el, _ref5) {
            var _this8 = this;

            var width = _ref5.width,
                height = _ref5.height;


            var history = [];

            var resize = function resize() {
                return _src3.ZalgoPromise['try'](function () {

                    // $FlowFixMe
                    var tracker = (0, _lib.trackDimensions)(el, { width: width, height: height });

                    var _tracker$check = tracker.check(),
                        dimensions = _tracker$check.dimensions;

                    for (var _iterator2 = history, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                        var _ref6;

                        if (_isArray2) {
                            if (_i2 >= _iterator2.length) break;
                            _ref6 = _iterator2[_i2++];
                        } else {
                            _i2 = _iterator2.next();
                            if (_i2.done) break;
                            _ref6 = _i2.value;
                        }

                        var size = _ref6;


                        var widthMatch = !width || size.width === dimensions.width;
                        var heightMatch = !height || size.height === dimensions.height;

                        if (widthMatch && heightMatch) {
                            return;
                        }
                    }

                    history.push({ width: dimensions.width, height: dimensions.height });

                    return _this8.resize(width ? dimensions.width : null, height ? dimensions.height : null).then(function () {

                        if (tracker.check().changed) {
                            return resize();
                        }
                    });
                });
            };

            return resize();
        }

        /*  Hide
            ----
             Hide the window and any parent template
        */

    }, {
        key: 'hide',
        value: function hide() {
            return this.sendToParent(_constants.POST_MESSAGE.HIDE).then(_lib.noop);
        }
    }, {
        key: 'show',
        value: function show() {
            return this.sendToParent(_constants.POST_MESSAGE.SHOW).then(_lib.noop);
        }
    }, {
        key: 'userClose',
        value: function userClose() {
            return this.close(_constants.CLOSE_REASONS.USER_CLOSED);
        }

        /*  Close
            -----
             Close the child window
        */

    }, {
        key: 'close',
        value: function close() {
            var reason = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants.CLOSE_REASONS.CHILD_CALL;


            this.component.log('close_child');

            // Ask our parent window to close us

            this.sendToParent(_constants.POST_MESSAGE.CLOSE, { reason: reason });
        }
    }, {
        key: 'checkClose',
        value: function checkClose() {
            this.sendToParent(_constants.POST_MESSAGE.CHECK_CLOSE, {}, { fireAndForget: true });
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            return (0, _client.flush)().then(function () {
                window.close();
            });
        }

        /*  Focus
            -----
             Focus the child window. Must be done on a user action like a click
        */

    }, {
        key: 'focus',
        value: function focus() {
            this.component.log('focus');

            window.focus();
        }

        /*  Error
            -----
             Send an error back to the parent
        */

    }, {
        key: 'error',
        value: function error(err) {

            var stringifiedError = (0, _lib.stringifyError)(err);

            this.component.logError('error', { error: stringifiedError });

            return this.sendToParent(_constants.POST_MESSAGE.ERROR, {
                error: stringifiedError
            }).then(_lib.noop);
        }
    }]);

    return ChildComponent;
}(_base.BaseComponent);

if (__XCOMPONENT__.__CHILD_WINDOW_ENFORCE_LOG_LEVEL__) {

    if ((0, _window.isXComponentWindow)() && window.console) {
        var _loop = function _loop() {
            if (_isArray3) {
                if (_i3 >= _iterator3.length) return 'break';
                _ref7 = _iterator3[_i3++];
            } else {
                _i3 = _iterator3.next();
                if (_i3.done) return 'break';
                _ref7 = _i3.value;
            }

            var level = _ref7;


            try {

                var original = window.console[level];

                if (!original || !original.apply) {
                    return 'continue';
                }

                window.console[level] = function consoleLevel() {
                    try {
                        var logLevel = window.LOG_LEVEL;

                        if (!logLevel || _client.logLevels.indexOf(logLevel) === -1) {
                            return original.apply(this, arguments);
                        }

                        if (_client.logLevels.indexOf(level) > _client.logLevels.indexOf(logLevel)) {
                            return;
                        }

                        return original.apply(this, arguments);
                    } catch (err2) {// eslint-disable-line unicorn/catch-error-name
                        // pass
                    }
                };

                if (level === 'info') {
                    window.console.log = window.console[level];
                }
            } catch (err) {
                // pass
            }
        };

        _loop2: for (var _iterator3 = _client.logLevels, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
            var _ref7;

            var _ret = _loop();

            switch (_ret) {
                case 'break':
                    break _loop2;

                case 'continue':
                    continue;}
        }
    }
}