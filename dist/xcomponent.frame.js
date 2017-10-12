!function(root, factory) {
    "object" == typeof exports && "object" == typeof module ? module.exports = factory() : "function" == typeof define && define.amd ? define("xcomponent", [], factory) : "object" == typeof exports ? exports.xcomponent = factory() : root.xcomponent = factory();
}(this, function() {
    return function(modules) {
        function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) return installedModules[moduleId].exports;
            var module = installedModules[moduleId] = {
                i: moduleId,
                l: !1,
                exports: {}
            };
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            module.l = !0;
            return module.exports;
        }
        var installedModules = {};
        __webpack_require__.m = modules;
        __webpack_require__.c = installedModules;
        __webpack_require__.i = function(value) {
            return value;
        };
        __webpack_require__.d = function(exports, name, getter) {
            __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
                configurable: !1,
                enumerable: !0,
                get: getter
            });
        };
        __webpack_require__.n = function(module) {
            var getter = module && module.__esModule ? function() {
                return module.default;
            } : function() {
                return module;
            };
            __webpack_require__.d(getter, "a", getter);
            return getter;
        };
        __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        };
        __webpack_require__.p = "";
        return __webpack_require__(__webpack_require__.s = 74);
    }([ function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function getActualDomain(win) {
            var location = win.location;
            if (!location) throw new Error("Can not read window location");
            var protocol = location.protocol;
            if (!protocol) throw new Error("Can not read window protocol");
            if (protocol === CONSTANTS.FILE_PROTOCOL) return "file://";
            var host = location.host;
            if (!host) throw new Error("Can not read window host");
            return protocol + "//" + host;
        }
        function getDomain(win) {
            win = win || window;
            var domain = getActualDomain(win);
            return domain && win.mockDomain && 0 === win.mockDomain.indexOf(CONSTANTS.MOCK_PROTOCOL) ? win.mockDomain : domain;
        }
        function isBlankDomain(win) {
            try {
                if (!win.location.href) return !0;
                if ("about:blank" === win.location.href) return !0;
            } catch (err) {}
            return !1;
        }
        function isActuallySameDomain(win) {
            try {
                var desc = Object.getOwnPropertyDescriptor(win, "location");
                if (desc && !1 === desc.enumerable) return !1;
            } catch (err) {}
            try {
                if (isBlankDomain(win)) return !0;
                if (getActualDomain(win) === getActualDomain(window)) return !0;
            } catch (err) {}
            return !1;
        }
        function isSameDomain(win) {
            if (!isActuallySameDomain(win)) return !1;
            try {
                if (isBlankDomain(win)) return !0;
                if (getDomain(window) === getDomain(win)) return !0;
            } catch (err) {}
            return !1;
        }
        function getParent(win) {
            if (win) try {
                if (win.parent && win.parent !== win) return win.parent;
            } catch (err) {
                return;
            }
        }
        function getOpener(win) {
            if (win && !getParent(win)) try {
                return win.opener;
            } catch (err) {
                return;
            }
        }
        function getParents(win) {
            var result = [];
            try {
                for (;win.parent !== win; ) {
                    result.push(win.parent);
                    win = win.parent;
                }
            } catch (err) {}
            return result;
        }
        function isAncestorParent(parent, child) {
            if (!parent || !child) return !1;
            var childParent = getParent(child);
            return childParent ? childParent === parent : -1 !== getParents(child).indexOf(parent);
        }
        function getFrames(win) {
            var result = [], frames = void 0;
            try {
                frames = win.frames;
            } catch (err) {
                frames = win;
            }
            var len = void 0;
            try {
                len = frames.length;
            } catch (err) {}
            if (0 === len) return result;
            if (len) {
                for (var i = 0; i < len; i++) {
                    var frame = void 0;
                    try {
                        frame = frames[i];
                    } catch (err) {
                        continue;
                    }
                    result.push(frame);
                }
                return result;
            }
            for (var _i = 0; _i < 100; _i++) {
                var _frame = void 0;
                try {
                    _frame = frames[_i];
                } catch (err) {
                    return result;
                }
                if (!_frame) return result;
                result.push(_frame);
            }
            return result;
        }
        function getAllChildFrames(win) {
            for (var result = [], _iterator = getFrames(win), _isArray = Array.isArray(_iterator), _i2 = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                var _ref;
                if (_isArray) {
                    if (_i2 >= _iterator.length) break;
                    _ref = _iterator[_i2++];
                } else {
                    _i2 = _iterator.next();
                    if (_i2.done) break;
                    _ref = _i2.value;
                }
                var frame = _ref;
                result.push(frame);
                for (var _iterator2 = getAllChildFrames(frame), _isArray2 = Array.isArray(_iterator2), _i3 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                    var _ref2;
                    if (_isArray2) {
                        if (_i3 >= _iterator2.length) break;
                        _ref2 = _iterator2[_i3++];
                    } else {
                        _i3 = _iterator2.next();
                        if (_i3.done) break;
                        _ref2 = _i3.value;
                    }
                    var childFrame = _ref2;
                    result.push(childFrame);
                }
            }
            return result;
        }
        function getTop(win) {
            if (win) {
                try {
                    if (win.top) return win.top;
                } catch (err) {}
                if (getParent(win) === win) return win;
                try {
                    if (isAncestorParent(window, win) && window.top) return window.top;
                } catch (err) {}
                try {
                    if (isAncestorParent(win, window) && window.top) return window.top;
                } catch (err) {}
                for (var _iterator3 = getAllChildFrames(win), _isArray3 = Array.isArray(_iterator3), _i4 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                    var _ref3;
                    if (_isArray3) {
                        if (_i4 >= _iterator3.length) break;
                        _ref3 = _iterator3[_i4++];
                    } else {
                        _i4 = _iterator3.next();
                        if (_i4.done) break;
                        _ref3 = _i4.value;
                    }
                    var frame = _ref3;
                    try {
                        if (frame.top) return frame.top;
                    } catch (err) {}
                    if (getParent(frame) === frame) return frame;
                }
            }
        }
        function getAllFramesInWindow(win) {
            var top = getTop(win);
            return getAllChildFrames(top).concat(top);
        }
        function isTop(win) {
            return win === getTop(win);
        }
        function isFrameWindowClosed(frame) {
            if (!frame.contentWindow) return !0;
            if (!frame.parentNode) return !0;
            var doc = frame.ownerDocument;
            return !(!doc || !doc.body || doc.body.contains(frame));
        }
        function safeIndexOf(collection, item) {
            for (var i = 0; i < collection.length; i++) try {
                if (collection[i] === item) return i;
            } catch (err) {}
            return -1;
        }
        function isWindowClosed(win) {
            var allowMock = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
            try {
                if (win === window) return !1;
            } catch (err) {
                return !0;
            }
            try {
                if (!win) return !0;
            } catch (err) {
                return !0;
            }
            try {
                if (win.closed) return !0;
            } catch (err) {
                return !err || err.message !== IE_WIN_ACCESS_ERROR;
            }
            if (allowMock && isSameDomain(win)) try {
                if (win.mockclosed) return !0;
            } catch (err) {}
            try {
                if (!win.parent || !win.top) return !0;
            } catch (err) {}
            try {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__.a)(win === win);
            } catch (err) {
                return !0;
            }
            var iframeIndex = safeIndexOf(iframeWindows, win);
            if (-1 !== iframeIndex) {
                var frame = iframeFrames[iframeIndex];
                if (frame && isFrameWindowClosed(frame)) return !0;
            }
            return !1;
        }
        function cleanIframes() {
            for (var i = 0; i < iframeFrames.length; i++) if (isFrameWindowClosed(iframeFrames[i])) {
                iframeFrames.splice(i, 1);
                iframeWindows.splice(i, 1);
            }
            for (var _i5 = 0; _i5 < iframeWindows.length; _i5++) if (isWindowClosed(iframeWindows[_i5])) {
                iframeFrames.splice(_i5, 1);
                iframeWindows.splice(_i5, 1);
            }
        }
        function linkFrameWindow(frame) {
            cleanIframes();
            if (frame && frame.contentWindow) try {
                iframeWindows.push(frame.contentWindow);
                iframeFrames.push(frame);
            } catch (err) {}
        }
        function getFrameByName(win, name) {
            for (var winFrames = getFrames(win), _iterator4 = winFrames, _isArray4 = Array.isArray(_iterator4), _i6 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator](); ;) {
                var _ref4;
                if (_isArray4) {
                    if (_i6 >= _iterator4.length) break;
                    _ref4 = _iterator4[_i6++];
                } else {
                    _i6 = _iterator4.next();
                    if (_i6.done) break;
                    _ref4 = _i6.value;
                }
                var childFrame = _ref4;
                try {
                    if (isSameDomain(childFrame) && childFrame.name === name && -1 !== winFrames.indexOf(childFrame)) return childFrame;
                } catch (err) {}
            }
            try {
                if (-1 !== winFrames.indexOf(win.frames[name])) return win.frames[name];
            } catch (err) {}
            try {
                if (-1 !== winFrames.indexOf(win[name])) return win[name];
            } catch (err) {}
        }
        function findChildFrameByName(win, name) {
            var frame = getFrameByName(win, name);
            if (frame) return frame;
            for (var _iterator5 = getFrames(win), _isArray5 = Array.isArray(_iterator5), _i7 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator](); ;) {
                var _ref5;
                if (_isArray5) {
                    if (_i7 >= _iterator5.length) break;
                    _ref5 = _iterator5[_i7++];
                } else {
                    _i7 = _iterator5.next();
                    if (_i7.done) break;
                    _ref5 = _i7.value;
                }
                var childFrame = _ref5, namedFrame = findChildFrameByName(childFrame, name);
                if (namedFrame) return namedFrame;
            }
        }
        function findFrameByName(win, name) {
            var frame = void 0;
            frame = getFrameByName(win, name);
            return frame || findChildFrameByName(getTop(win) || win, name);
        }
        function getAncestor(win) {
            win = win || window;
            var opener = getOpener(win);
            if (opener) return opener;
            var parent = getParent(win);
            return parent || void 0;
        }
        function isAncestor(parent, child) {
            var actualParent = getAncestor(child);
            if (actualParent) return actualParent === parent;
            if (child === parent) return !1;
            if (getTop(child) === child) return !1;
            for (var _iterator7 = getFrames(parent), _isArray7 = Array.isArray(_iterator7), _i9 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator](); ;) {
                var _ref7;
                if (_isArray7) {
                    if (_i9 >= _iterator7.length) break;
                    _ref7 = _iterator7[_i9++];
                } else {
                    _i9 = _iterator7.next();
                    if (_i9.done) break;
                    _ref7 = _i9.value;
                }
                if (_ref7 === child) return !0;
            }
            return !1;
        }
        function isPopup() {
            return Boolean(getOpener(window));
        }
        function isIframe() {
            return Boolean(getParent(window));
        }
        function anyMatch(collection1, collection2) {
            for (var _iterator8 = collection1, _isArray8 = Array.isArray(_iterator8), _i10 = 0, _iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator](); ;) {
                var _ref8;
                if (_isArray8) {
                    if (_i10 >= _iterator8.length) break;
                    _ref8 = _iterator8[_i10++];
                } else {
                    _i10 = _iterator8.next();
                    if (_i10.done) break;
                    _ref8 = _i10.value;
                }
                for (var item1 = _ref8, _iterator9 = collection2, _isArray9 = Array.isArray(_iterator9), _i11 = 0, _iterator9 = _isArray9 ? _iterator9 : _iterator9[Symbol.iterator](); ;) {
                    var _ref9;
                    if (_isArray9) {
                        if (_i11 >= _iterator9.length) break;
                        _ref9 = _iterator9[_i11++];
                    } else {
                        _i11 = _iterator9.next();
                        if (_i11.done) break;
                        _ref9 = _i11.value;
                    }
                    if (item1 === _ref9) return !0;
                }
            }
            return !1;
        }
        function getDistanceFromTop() {
            for (var win = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window, distance = 0, parent = win; parent; ) {
                parent = getParent(parent);
                parent && (distance += 1);
            }
            return distance;
        }
        function getNthParent(win) {
            for (var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1, parent = win, i = 0; i < n; i++) {
                if (!parent) return;
                parent = getParent(parent);
            }
            return parent;
        }
        function getNthParentFromTop(win) {
            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
            return getNthParent(win, getDistanceFromTop(win) - n);
        }
        function isSameTopWindow(win1, win2) {
            var top1 = getTop(win1) || win1, top2 = getTop(win2) || win2;
            try {
                if (top1 && top2) return top1 === top2;
            } catch (err) {}
            var allFrames1 = getAllFramesInWindow(win1), allFrames2 = getAllFramesInWindow(win2);
            if (anyMatch(allFrames1, allFrames2)) return !0;
            var opener1 = getOpener(top1), opener2 = getOpener(top2);
            return (!opener1 || !anyMatch(getAllFramesInWindow(opener1), allFrames2)) && (opener2 && anyMatch(getAllFramesInWindow(opener2), allFrames1), 
            !1);
        }
        function matchDomain(pattern, origin) {
            if ("string" == typeof pattern) {
                if ("string" == typeof origin) return pattern === CONSTANTS.WILDCARD || origin === pattern;
                if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__.b)(origin)) return !1;
                if (Array.isArray(origin)) return !1;
            }
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__.b)(pattern) ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__.b)(origin) ? pattern.toString() === origin.toString() : !Array.isArray(origin) && Boolean(origin.match(pattern)) : !!Array.isArray(pattern) && (Array.isArray(origin) ? JSON.stringify(pattern) === JSON.stringify(origin) : !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__.b)(origin) && pattern.some(function(subpattern) {
                return matchDomain(subpattern, origin);
            }));
        }
        function getDomainFromUrl(url) {
            var domain = void 0;
            if (!url.match(/^(https?|mock|file):\/\//)) return getDomain();
            domain = url;
            domain = domain.split("/").slice(0, 3).join("/");
            return domain;
        }
        function onCloseWindow(win, callback) {
            var delay = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1e3, maxtime = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1 / 0, timeout = void 0;
            !function check() {
                if (isWindowClosed(win)) {
                    timeout && clearTimeout(timeout);
                    return callback();
                }
                if (maxtime <= 0) clearTimeout(timeout); else {
                    maxtime -= delay;
                    timeout = setTimeout(check, delay);
                }
            }();
            return {
                cancel: function() {
                    timeout && clearTimeout(timeout);
                }
            };
        }
        function isWindow(obj) {
            try {
                if (obj === window) return !0;
            } catch (err) {
                if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
            }
            try {
                if ("[object Window]" === Object.prototype.toString.call(obj)) return !0;
            } catch (err) {
                if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
            }
            try {
                if (window.Window && obj instanceof window.Window) return !0;
            } catch (err) {
                if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
            }
            try {
                if (obj && obj.self === obj) return !0;
            } catch (err) {
                if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
            }
            try {
                if (obj && obj.parent === obj) return !0;
            } catch (err) {
                if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
            }
            try {
                if (obj && obj.top === obj) return !0;
            } catch (err) {
                if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
            }
            try {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__.a)(obj === obj);
            } catch (err) {
                return !0;
            }
            try {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__.a)(obj && obj.__cross_domain_utils_window_check__);
            } catch (err) {
                return !0;
            }
            return !1;
        }
        __webpack_exports__.k = getActualDomain;
        __webpack_exports__.i = getDomain;
        __webpack_exports__.j = isActuallySameDomain;
        __webpack_exports__.a = isSameDomain;
        __webpack_exports__.u = getParent;
        __webpack_exports__.r = getOpener;
        __webpack_exports__.s = getTop;
        __webpack_exports__.v = getAllFramesInWindow;
        __webpack_exports__.n = isTop;
        __webpack_exports__.c = isWindowClosed;
        __webpack_exports__.d = linkFrameWindow;
        __webpack_exports__.q = findFrameByName;
        __webpack_exports__.e = getAncestor;
        __webpack_exports__.l = isAncestor;
        __webpack_exports__.g = isPopup;
        __webpack_exports__.h = isIframe;
        __webpack_exports__.o = getDistanceFromTop;
        __webpack_exports__.t = getNthParentFromTop;
        __webpack_exports__.m = isSameTopWindow;
        __webpack_exports__.f = matchDomain;
        __webpack_exports__.w = getDomainFromUrl;
        __webpack_exports__.p = onCloseWindow;
        __webpack_exports__.b = isWindow;
        var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(41), CONSTANTS = {
            MOCK_PROTOCOL: "mock:",
            FILE_PROTOCOL: "file:",
            WILDCARD: "*"
        }, IE_WIN_ACCESS_ERROR = "Call was rejected by callee.\r\n", iframeWindows = [], iframeFrames = [];
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var __WEBPACK_IMPORTED_MODULE_0__promise__ = __webpack_require__(56);
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return __WEBPACK_IMPORTED_MODULE_0__promise__.a;
        });
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !call || "object" != typeof call && "function" != typeof call ? self : call;
        }
        function _inherits(subClass, superClass) {
            if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            });
            superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
        }
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return Component;
        });
        var _class, __WEBPACK_IMPORTED_MODULE_0_post_robot_src__ = __webpack_require__(8), __WEBPACK_IMPORTED_MODULE_1_zalgo_promise_src__ = __webpack_require__(1), __WEBPACK_IMPORTED_MODULE_2_cross_domain_utils_src__ = __webpack_require__(0), __WEBPACK_IMPORTED_MODULE_3__base__ = __webpack_require__(20), __WEBPACK_IMPORTED_MODULE_4__child__ = __webpack_require__(25), __WEBPACK_IMPORTED_MODULE_5__parent__ = __webpack_require__(10), __WEBPACK_IMPORTED_MODULE_6__delegate__ = __webpack_require__(63), __WEBPACK_IMPORTED_MODULE_7__props__ = __webpack_require__(12), __WEBPACK_IMPORTED_MODULE_8__window__ = __webpack_require__(21), __WEBPACK_IMPORTED_MODULE_9__constants__ = __webpack_require__(5), __WEBPACK_IMPORTED_MODULE_10__validate__ = __webpack_require__(62), __WEBPACK_IMPORTED_MODULE_11__templates__ = __webpack_require__(61), __WEBPACK_IMPORTED_MODULE_12__drivers__ = __webpack_require__(70), __WEBPACK_IMPORTED_MODULE_13__lib__ = __webpack_require__(3), _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        }, _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1;
                    descriptor.configurable = !0;
                    "value" in descriptor && (descriptor.writable = !0);
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                protoProps && defineProperties(Constructor.prototype, protoProps);
                staticProps && defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }(), Component = (_class = function(_BaseComponent) {
            function Component(options) {
                _classCallCheck(this, Component);
                var _this = _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).call(this));
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__validate__.a)(options);
                _this.addProp(options, "tag");
                _this.addProp(options, "defaultLogLevel", "info");
                _this.addProp(options, "allowedParentDomains", __WEBPACK_IMPORTED_MODULE_9__constants__.WILDCARD);
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_13__lib__.d)(_this.defaultLogLevel);
                if (Component.components[_this.tag]) throw new Error("Can not register multiple components with the same tag");
                _this.addProp(options, "name", _this.tag.replace(/-/g, "_"));
                _this.builtinProps = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__props__.a)();
                _this.props = options.props || {};
                options.props || (_this.looseProps = !0);
                _this.addProp(options, "dimensions");
                _this.addProp(options, "scrolling");
                _this.addProp(options, "version", "latest");
                _this.addProp(options, "defaultEnv");
                _this.addProp(options, "buildUrl");
                _this.addProp(options, "url");
                _this.addProp(options, "domain");
                _this.addProp(options, "bridgeUrl");
                _this.addProp(options, "bridgeDomain");
                _this.addProp(options, "contexts", {
                    iframe: !0,
                    popup: !1
                });
                _this.addProp(options, "defaultContext");
                _this.addProp(options, "autoResize", !1);
                _this.addProp(options, "containerTemplate", __WEBPACK_IMPORTED_MODULE_11__templates__.a);
                _this.addProp(options, "prerenderTemplate", __WEBPACK_IMPORTED_MODULE_11__templates__.b);
                _this.addProp(options, "validate");
                Component.components[_this.tag] = _this;
                _this.registerDrivers();
                _this.registerChild();
                _this.listenDelegate();
                return _this;
            }
            _inherits(Component, _BaseComponent);
            _createClass(Component, [ {
                key: "getPropNames",
                value: function() {
                    for (var props = Object.keys(this.props), _iterator = Object.keys(this.builtinProps), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                        var _ref;
                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref = _iterator[_i++];
                        } else {
                            _i = _iterator.next();
                            if (_i.done) break;
                            _ref = _i.value;
                        }
                        var key = _ref;
                        -1 === props.indexOf(key) && props.push(key);
                    }
                    return props;
                }
            }, {
                key: "getProp",
                value: function(name) {
                    return this.props[name] || this.builtinProps[name];
                }
            }, {
                key: "registerDrivers",
                value: function() {
                    this.driverCache = {};
                    for (var _iterator2 = Object.keys(__WEBPACK_IMPORTED_MODULE_12__drivers__), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                        var _ref2;
                        if (_isArray2) {
                            if (_i2 >= _iterator2.length) break;
                            _ref2 = _iterator2[_i2++];
                        } else {
                            _i2 = _iterator2.next();
                            if (_i2.done) break;
                            _ref2 = _i2.value;
                        }
                        var driverName = _ref2;
                        if (0 !== driverName.indexOf("_")) {
                            var driver = __WEBPACK_IMPORTED_MODULE_12__drivers__[driverName], glob = driver.global();
                            glob && this.driver(driverName, glob);
                        }
                    }
                }
            }, {
                key: "driver",
                value: function(name, dep) {
                    if (!__WEBPACK_IMPORTED_MODULE_12__drivers__[name]) throw new Error("Could not find driver for framework: " + name);
                    this.driverCache[name] || (this.driverCache[name] = __WEBPACK_IMPORTED_MODULE_12__drivers__[name].register(this, dep));
                    return this.driverCache[name];
                }
            }, {
                key: "registerChild",
                value: function() {
                    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__window__.f)()) {
                        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__window__.e)().tag === this.tag) {
                            window.xchild = new __WEBPACK_IMPORTED_MODULE_4__child__.a(this);
                            window.xprops = window.xchild.props;
                        }
                    }
                }
            }, {
                key: "listenDelegate",
                value: function() {
                    var _this2 = this;
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_post_robot_src__.on)(__WEBPACK_IMPORTED_MODULE_9__constants__.POST_MESSAGE.DELEGATE + "_" + this.name, function(_ref3) {
                        var source = _ref3.source, origin = _ref3.origin, data = _ref3.data, domain = _this2.getDomain(null, data.env || _this2.defaultEnv);
                        if (!domain) throw new Error("Could not determine domain to allow remote render");
                        if (domain !== origin) throw new Error("Can not render from " + origin + " - expected " + domain);
                        var delegate = _this2.delegate(source, data.options);
                        return {
                            overrides: delegate.getOverrides(data.context),
                            destroy: function() {
                                return delegate.destroy();
                            }
                        };
                    });
                }
            }, {
                key: "getValidDomain",
                value: function(url) {
                    if (url) {
                        var domain = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_cross_domain_utils_src__.w)(url);
                        if ("string" == typeof this.domain && domain === this.domain) return domain;
                        if (this.domain && "object" === _typeof(this.domain)) for (var _iterator3 = Object.keys(this.domain), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                            var _ref4;
                            if (_isArray3) {
                                if (_i3 >= _iterator3.length) break;
                                _ref4 = _iterator3[_i3++];
                            } else {
                                _i3 = _iterator3.next();
                                if (_i3.done) break;
                                _ref4 = _i3.value;
                            }
                            var env = _ref4;
                            if ("test" !== env && domain === this.domain[env]) return domain;
                        }
                    }
                }
            }, {
                key: "getDomain",
                value: function(url, env) {
                    var domain = this.getForEnv(this.domain, env);
                    if (domain) return domain;
                    domain = this.getValidDomain(url);
                    if (domain) return domain;
                    var envUrl = this.getForEnv(this.url, env);
                    return envUrl ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_cross_domain_utils_src__.w)(envUrl) : url ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_cross_domain_utils_src__.w)(url) : void 0;
                }
            }, {
                key: "getBridgeUrl",
                value: function(env) {
                    return this.getForEnv(this.bridgeUrl, env);
                }
            }, {
                key: "getForEnv",
                value: function(item, env) {
                    if (item) {
                        if ("string" == typeof item) return item;
                        env || (env = this.defaultEnv);
                        if (env) return env && "object" === (void 0 === item ? "undefined" : _typeof(item)) && item[env] ? item[env] : void 0;
                    }
                }
            }, {
                key: "getBridgeDomain",
                value: function(env) {
                    var bridgeDomain = this.getForEnv(this.bridgeDomain, env);
                    if (bridgeDomain) return bridgeDomain;
                    var bridgeUrl = this.getBridgeUrl(env);
                    return bridgeUrl ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_cross_domain_utils_src__.w)(bridgeUrl) : void 0;
                }
            }, {
                key: "getUrl",
                value: function(env, props) {
                    var url = this.getForEnv(this.url, env);
                    return url || (this.buildUrl ? this.buildUrl(props) : void 0);
                }
            }, {
                key: "isXComponent",
                value: function() {
                    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__window__.f)();
                }
            }, {
                key: "isChild",
                value: function() {
                    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__window__.f)() && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__window__.e)().tag === this.tag;
                }
            }, {
                key: "createError",
                value: function(message, tag) {
                    return new Error("[" + (tag || this.tag) + "] " + message);
                }
            }, {
                key: "init",
                value: function(props, context, element) {
                    context = this.getRenderContext(element);
                    return new __WEBPACK_IMPORTED_MODULE_5__parent__.a(this, context, {
                        props: props
                    });
                }
            }, {
                key: "delegate",
                value: function(source, options) {
                    return new __WEBPACK_IMPORTED_MODULE_6__delegate__.a(this, source, options);
                }
            }, {
                key: "validateRenderContext",
                value: function(context) {
                    if (!this.contexts[context]) throw new Error("[" + this.tag + "] Can not render to " + context);
                }
            }, {
                key: "getRenderContext",
                value: function(element) {
                    if (element) {
                        this.validateRenderContext(__WEBPACK_IMPORTED_MODULE_9__constants__.CONTEXT_TYPES.IFRAME);
                        return __WEBPACK_IMPORTED_MODULE_9__constants__.CONTEXT_TYPES.IFRAME;
                    }
                    if (this.defaultContext) return this.defaultContext;
                    if (this.contexts[__WEBPACK_IMPORTED_MODULE_9__constants__.CONTEXT_TYPES.IFRAME]) return __WEBPACK_IMPORTED_MODULE_9__constants__.CONTEXT_TYPES.IFRAME;
                    if (this.contexts[__WEBPACK_IMPORTED_MODULE_9__constants__.CONTEXT_TYPES.POPUP]) return __WEBPACK_IMPORTED_MODULE_9__constants__.CONTEXT_TYPES.POPUP;
                    throw new Error("[" + this.tag + "] No context options available for render");
                }
            }, {
                key: "render",
                value: function(props, element) {
                    var _this3 = this;
                    return __WEBPACK_IMPORTED_MODULE_1_zalgo_promise_src__.a.try(function() {
                        return new __WEBPACK_IMPORTED_MODULE_5__parent__.a(_this3, _this3.getRenderContext(element), {
                            props: props
                        }).render(element || document.body);
                    });
                }
            }, {
                key: "renderIframe",
                value: function(props) {
                    var _this4 = this, element = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : document.body;
                    return __WEBPACK_IMPORTED_MODULE_1_zalgo_promise_src__.a.try(function() {
                        if (!element) throw new Error("Expected element to be passed");
                        _this4.validateRenderContext(__WEBPACK_IMPORTED_MODULE_9__constants__.CONTEXT_TYPES.IFRAME);
                        return new __WEBPACK_IMPORTED_MODULE_5__parent__.a(_this4, __WEBPACK_IMPORTED_MODULE_9__constants__.CONTEXT_TYPES.IFRAME, {
                            props: props
                        }).render(element);
                    });
                }
            }, {
                key: "renderPopup",
                value: function(props) {
                    var _this5 = this;
                    return __WEBPACK_IMPORTED_MODULE_1_zalgo_promise_src__.a.try(function() {
                        _this5.validateRenderContext(__WEBPACK_IMPORTED_MODULE_9__constants__.CONTEXT_TYPES.POPUP);
                        return new __WEBPACK_IMPORTED_MODULE_5__parent__.a(_this5, __WEBPACK_IMPORTED_MODULE_9__constants__.CONTEXT_TYPES.POPUP, {
                            props: props
                        }).render();
                    });
                }
            }, {
                key: "renderTo",
                value: function(win, props, element) {
                    var _this6 = this;
                    return __WEBPACK_IMPORTED_MODULE_1_zalgo_promise_src__.a.try(function() {
                        return new __WEBPACK_IMPORTED_MODULE_5__parent__.a(_this6, _this6.getRenderContext(element), {
                            props: props
                        }).renderTo(win, element);
                    });
                }
            }, {
                key: "renderIframeTo",
                value: function(win, props, element) {
                    var _this7 = this;
                    return __WEBPACK_IMPORTED_MODULE_1_zalgo_promise_src__.a.try(function() {
                        _this7.validateRenderContext(__WEBPACK_IMPORTED_MODULE_9__constants__.CONTEXT_TYPES.IFRAME);
                        return new __WEBPACK_IMPORTED_MODULE_5__parent__.a(_this7, __WEBPACK_IMPORTED_MODULE_9__constants__.CONTEXT_TYPES.IFRAME, {
                            props: props
                        }).renderTo(win, element);
                    });
                }
            }, {
                key: "renderPopupTo",
                value: function(win, props) {
                    var _this8 = this;
                    return __WEBPACK_IMPORTED_MODULE_1_zalgo_promise_src__.a.try(function() {
                        _this8.validateRenderContext(__WEBPACK_IMPORTED_MODULE_9__constants__.CONTEXT_TYPES.POPUP);
                        return new __WEBPACK_IMPORTED_MODULE_5__parent__.a(_this8, __WEBPACK_IMPORTED_MODULE_9__constants__.CONTEXT_TYPES.POPUP, {
                            props: props
                        }).renderTo(win);
                    });
                }
            }, {
                key: "prerender",
                value: function(props, element) {
                    var instance = new __WEBPACK_IMPORTED_MODULE_5__parent__.a(this, this.getRenderContext(element), {
                        props: props
                    });
                    instance.prefetch();
                    return {
                        render: function(innerProps, innerElement) {
                            innerProps && instance.updateProps(innerProps);
                            return instance.render(innerElement);
                        },
                        renderTo: function(win, innerProps, innerElement) {
                            innerProps && instance.updateProps(innerProps);
                            return instance.renderTo(win, innerElement);
                        },
                        get html() {
                            return instance.html;
                        },
                        set html(value) {
                            instance.html = value;
                        }
                    };
                }
            }, {
                key: "log",
                value: function(event) {
                    var payload = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_13__lib__.X)(this.name, event, payload);
                }
            }, {
                key: "logWarning",
                value: function(event, payload) {
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_13__lib__.Y)(this.name, event, payload);
                }
            }, {
                key: "logError",
                value: function(event, payload) {
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_13__lib__.Z)(this.name, event, payload);
                }
            } ], [ {
                key: "getByTag",
                value: function(tag) {
                    return Component.components[tag];
                }
            } ]);
            return Component;
        }(__WEBPACK_IMPORTED_MODULE_3__base__.a), function(target, property, decorators, descriptor, context) {
            var desc = {};
            Object.keys(descriptor).forEach(function(key) {
                desc[key] = descriptor[key];
            });
            desc.enumerable = !!desc.enumerable;
            desc.configurable = !!desc.configurable;
            ("value" in desc || desc.initializer) && (desc.writable = !0);
            desc = decorators.slice().reverse().reduce(function(desc, decorator) {
                return decorator(target, property, desc) || desc;
            }, desc);
            if (context && void 0 !== desc.initializer) {
                desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
                desc.initializer = void 0;
            }
            if (void 0 === desc.initializer) {
                Object.defineProperty(target, property, desc);
                desc = null;
            }
            return desc;
        }(_class.prototype, "getPropNames", [ __WEBPACK_IMPORTED_MODULE_13__lib__.N ], Object.getOwnPropertyDescriptor(_class.prototype, "getPropNames"), _class.prototype), 
        _class);
        Component.components = {};
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var __WEBPACK_IMPORTED_MODULE_0__dom__ = __webpack_require__(77);
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return __WEBPACK_IMPORTED_MODULE_0__dom__.a;
        });
        __webpack_require__.d(__webpack_exports__, "f", function() {
            return __WEBPACK_IMPORTED_MODULE_0__dom__.b;
        });
        __webpack_require__.d(__webpack_exports__, "g", function() {
            return __WEBPACK_IMPORTED_MODULE_0__dom__.c;
        });
        __webpack_require__.d(__webpack_exports__, "h", function() {
            return __WEBPACK_IMPORTED_MODULE_0__dom__.d;
        });
        __webpack_require__.d(__webpack_exports__, "l", function() {
            return __WEBPACK_IMPORTED_MODULE_0__dom__.e;
        });
        __webpack_require__.d(__webpack_exports__, "m", function() {
            return __WEBPACK_IMPORTED_MODULE_0__dom__.f;
        });
        __webpack_require__.d(__webpack_exports__, "q", function() {
            return __WEBPACK_IMPORTED_MODULE_0__dom__.g;
        });
        __webpack_require__.d(__webpack_exports__, "r", function() {
            return __WEBPACK_IMPORTED_MODULE_0__dom__.h;
        });
        __webpack_require__.d(__webpack_exports__, "s", function() {
            return __WEBPACK_IMPORTED_MODULE_0__dom__.i;
        });
        __webpack_require__.d(__webpack_exports__, "t", function() {
            return __WEBPACK_IMPORTED_MODULE_0__dom__.j;
        });
        __webpack_require__.d(__webpack_exports__, "u", function() {
            return __WEBPACK_IMPORTED_MODULE_0__dom__.k;
        });
        __webpack_require__.d(__webpack_exports__, "v", function() {
            return __WEBPACK_IMPORTED_MODULE_0__dom__.l;
        });
        __webpack_require__.d(__webpack_exports__, "w", function() {
            return __WEBPACK_IMPORTED_MODULE_0__dom__.m;
        });
        __webpack_require__.d(__webpack_exports__, "x", function() {
            return __WEBPACK_IMPORTED_MODULE_0__dom__.n;
        });
        __webpack_require__.d(__webpack_exports__, "y", function() {
            return __WEBPACK_IMPORTED_MODULE_0__dom__.o;
        });
        __webpack_require__.d(__webpack_exports__, "z", function() {
            return __WEBPACK_IMPORTED_MODULE_0__dom__.p;
        });
        __webpack_require__.d(__webpack_exports__, "A", function() {
            return __WEBPACK_IMPORTED_MODULE_0__dom__.q;
        });
        __webpack_require__.d(__webpack_exports__, "B", function() {
            return __WEBPACK_IMPORTED_MODULE_0__dom__.r;
        });
        __webpack_require__.d(__webpack_exports__, "F", function() {
            return __WEBPACK_IMPORTED_MODULE_0__dom__.s;
        });
        __webpack_require__.d(__webpack_exports__, "G", function() {
            return __WEBPACK_IMPORTED_MODULE_0__dom__.t;
        });
        __webpack_require__.d(__webpack_exports__, "H", function() {
            return __WEBPACK_IMPORTED_MODULE_0__dom__.u;
        });
        __webpack_require__.d(__webpack_exports__, "I", function() {
            return __WEBPACK_IMPORTED_MODULE_0__dom__.v;
        });
        __webpack_require__.d(__webpack_exports__, "J", function() {
            return __WEBPACK_IMPORTED_MODULE_0__dom__.w;
        });
        __webpack_require__.d(__webpack_exports__, "S", function() {
            return __WEBPACK_IMPORTED_MODULE_0__dom__.x;
        });
        __webpack_require__.d(__webpack_exports__, "T", function() {
            return __WEBPACK_IMPORTED_MODULE_0__dom__.y;
        });
        __webpack_require__.d(__webpack_exports__, "V", function() {
            return __WEBPACK_IMPORTED_MODULE_0__dom__.z;
        });
        __webpack_require__.d(__webpack_exports__, "W", function() {
            return __WEBPACK_IMPORTED_MODULE_0__dom__.A;
        });
        var __WEBPACK_IMPORTED_MODULE_1__fn__ = __webpack_require__(35);
        __webpack_require__.d(__webpack_exports__, "j", function() {
            return __WEBPACK_IMPORTED_MODULE_1__fn__.d;
        });
        __webpack_require__.d(__webpack_exports__, "n", function() {
            return __WEBPACK_IMPORTED_MODULE_1__fn__.e;
        });
        __webpack_require__.d(__webpack_exports__, "p", function() {
            return __WEBPACK_IMPORTED_MODULE_1__fn__.c;
        });
        __webpack_require__.d(__webpack_exports__, "N", function() {
            return __WEBPACK_IMPORTED_MODULE_1__fn__.a;
        });
        __webpack_require__.d(__webpack_exports__, "Q", function() {
            return __WEBPACK_IMPORTED_MODULE_1__fn__.f;
        });
        var __WEBPACK_IMPORTED_MODULE_2__promise__ = __webpack_require__(80);
        __webpack_require__.d(__webpack_exports__, "L", function() {
            return __WEBPACK_IMPORTED_MODULE_2__promise__.a;
        });
        __webpack_require__.d(__webpack_exports__, "M", function() {
            return __WEBPACK_IMPORTED_MODULE_2__promise__.b;
        });
        __webpack_require__.d(__webpack_exports__, "U", function() {
            return __WEBPACK_IMPORTED_MODULE_2__promise__.c;
        });
        var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__(26);
        __webpack_require__.d(__webpack_exports__, "b", function() {
            return __WEBPACK_IMPORTED_MODULE_3__util__.a;
        });
        __webpack_require__.d(__webpack_exports__, "e", function() {
            return __WEBPACK_IMPORTED_MODULE_3__util__.d;
        });
        __webpack_require__.d(__webpack_exports__, "i", function() {
            return __WEBPACK_IMPORTED_MODULE_3__util__.i;
        });
        __webpack_require__.d(__webpack_exports__, "k", function() {
            return __WEBPACK_IMPORTED_MODULE_3__util__.e;
        });
        __webpack_require__.d(__webpack_exports__, "o", function() {
            return __WEBPACK_IMPORTED_MODULE_3__util__.j;
        });
        __webpack_require__.d(__webpack_exports__, "D", function() {
            return __WEBPACK_IMPORTED_MODULE_3__util__.k;
        });
        __webpack_require__.d(__webpack_exports__, "E", function() {
            return __WEBPACK_IMPORTED_MODULE_3__util__.l;
        });
        __webpack_require__.d(__webpack_exports__, "O", function() {
            return __WEBPACK_IMPORTED_MODULE_3__util__.m;
        });
        __webpack_require__.d(__webpack_exports__, "R", function() {
            return __WEBPACK_IMPORTED_MODULE_3__util__.n;
        });
        __webpack_require__.d(__webpack_exports__, "_0", function() {
            return __WEBPACK_IMPORTED_MODULE_3__util__.c;
        });
        __webpack_require__.d(__webpack_exports__, "_1", function() {
            return __WEBPACK_IMPORTED_MODULE_3__util__.o;
        });
        var __WEBPACK_IMPORTED_MODULE_4__css__ = __webpack_require__(75);
        __webpack_require__.d(__webpack_exports__, "K", function() {
            return __WEBPACK_IMPORTED_MODULE_4__css__.a;
        });
        __webpack_require__.d(__webpack_exports__, "_2", function() {
            return __WEBPACK_IMPORTED_MODULE_4__css__.b;
        });
        __webpack_require__.d(__webpack_exports__, "_3", function() {
            return __WEBPACK_IMPORTED_MODULE_4__css__.c;
        });
        var __WEBPACK_IMPORTED_MODULE_5__decorators__ = __webpack_require__(76);
        __webpack_require__.d(__webpack_exports__, "C", function() {
            return __WEBPACK_IMPORTED_MODULE_5__decorators__.a;
        });
        var __WEBPACK_IMPORTED_MODULE_6__logger__ = __webpack_require__(79);
        __webpack_require__.d(__webpack_exports__, "d", function() {
            return __WEBPACK_IMPORTED_MODULE_6__logger__.a;
        });
        __webpack_require__.d(__webpack_exports__, "X", function() {
            return __WEBPACK_IMPORTED_MODULE_6__logger__.b;
        });
        __webpack_require__.d(__webpack_exports__, "Y", function() {
            return __WEBPACK_IMPORTED_MODULE_6__logger__.c;
        });
        __webpack_require__.d(__webpack_exports__, "Z", function() {
            return __WEBPACK_IMPORTED_MODULE_6__logger__.d;
        });
        var __WEBPACK_IMPORTED_MODULE_7__global__ = __webpack_require__(78);
        __webpack_require__.d(__webpack_exports__, "c", function() {
            return __WEBPACK_IMPORTED_MODULE_7__global__.a;
        });
        __webpack_require__.d(__webpack_exports__, "P", function() {
            return __WEBPACK_IMPORTED_MODULE_7__global__.b;
        });
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(44);
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return __WEBPACK_IMPORTED_MODULE_0__config__.a;
        });
        var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__(30);
        __webpack_require__.d(__webpack_exports__, "b", function() {
            return __WEBPACK_IMPORTED_MODULE_1__constants__.a;
        });
        __webpack_require__.d(__webpack_exports__, "c", function() {
            return __WEBPACK_IMPORTED_MODULE_1__constants__.b;
        });
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        Object.defineProperty(__webpack_exports__, "__esModule", {
            value: !0
        });
        __webpack_require__.d(__webpack_exports__, "XCOMPONENT", function() {
            return XCOMPONENT;
        });
        __webpack_require__.d(__webpack_exports__, "__XCOMPONENT__", function() {
            return __XCOMPONENT__;
        });
        __webpack_require__.d(__webpack_exports__, "POST_MESSAGE", function() {
            return POST_MESSAGE;
        });
        __webpack_require__.d(__webpack_exports__, "PROP_TYPES", function() {
            return PROP_TYPES;
        });
        __webpack_require__.d(__webpack_exports__, "INITIAL_PROPS", function() {
            return INITIAL_PROPS;
        });
        __webpack_require__.d(__webpack_exports__, "WINDOW_REFERENCES", function() {
            return WINDOW_REFERENCES;
        });
        __webpack_require__.d(__webpack_exports__, "PROP_TYPES_LIST", function() {
            return PROP_TYPES_LIST;
        });
        __webpack_require__.d(__webpack_exports__, "CONTEXT_TYPES", function() {
            return CONTEXT_TYPES;
        });
        __webpack_require__.d(__webpack_exports__, "CLASS_NAMES", function() {
            return CLASS_NAMES;
        });
        __webpack_require__.d(__webpack_exports__, "EVENTS", function() {
            return EVENTS;
        });
        __webpack_require__.d(__webpack_exports__, "ATTRIBUTES", function() {
            return ATTRIBUTES;
        });
        __webpack_require__.d(__webpack_exports__, "ANIMATION_NAMES", function() {
            return ANIMATION_NAMES;
        });
        __webpack_require__.d(__webpack_exports__, "EVENT_NAMES", function() {
            return EVENT_NAMES;
        });
        __webpack_require__.d(__webpack_exports__, "CLOSE_REASONS", function() {
            return CLOSE_REASONS;
        });
        __webpack_require__.d(__webpack_exports__, "CONTEXT_TYPES_LIST", function() {
            return CONTEXT_TYPES_LIST;
        });
        __webpack_require__.d(__webpack_exports__, "DELEGATE", function() {
            return DELEGATE;
        });
        __webpack_require__.d(__webpack_exports__, "WILDCARD", function() {
            return WILDCARD;
        });
        __webpack_require__.d(__webpack_exports__, "DEFAULT_DIMENSIONS", function() {
            return DEFAULT_DIMENSIONS;
        });
        var __WEBPACK_IMPORTED_MODULE_0__lib__ = __webpack_require__(3), XCOMPONENT = "xcomponent", __XCOMPONENT__ = "__" + XCOMPONENT + "__", POST_MESSAGE = {
            INIT: XCOMPONENT + "_init",
            PROPS: XCOMPONENT + "_props",
            PROP_CALLBACK: XCOMPONENT + "_prop_callback",
            CLOSE: XCOMPONENT + "_close",
            CHECK_CLOSE: XCOMPONENT + "_check_close",
            REDIRECT: XCOMPONENT + "_redirect",
            RESIZE: XCOMPONENT + "_resize",
            ONRESIZE: XCOMPONENT + "_onresize",
            DELEGATE: XCOMPONENT + "_delegate",
            ERROR: XCOMPONENT + "_error",
            HIDE: XCOMPONENT + "_hide",
            SHOW: XCOMPONENT + "_show"
        }, PROP_TYPES = {
            STRING: "string",
            OBJECT: "object",
            FUNCTION: "function",
            BOOLEAN: "boolean",
            NUMBER: "number"
        }, INITIAL_PROPS = {
            RAW: "raw",
            UID: "uid"
        }, WINDOW_REFERENCES = {
            OPENER: "opener",
            TOP: "top",
            PARENT: "parent",
            GLOBAL: "global"
        }, PROP_TYPES_LIST = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lib__.b)(PROP_TYPES), CONTEXT_TYPES = {
            IFRAME: "iframe",
            POPUP: "popup"
        }, CLASS_NAMES = {
            XCOMPONENT: "" + XCOMPONENT,
            OUTLET: XCOMPONENT + "-outlet",
            COMPONENT_FRAME: XCOMPONENT + "-component-frame",
            PRERENDER_FRAME: XCOMPONENT + "-prerender-frame",
            VISIBLE: XCOMPONENT + "-visible",
            INVISIBLE: XCOMPONENT + "-invisible"
        }, EVENTS = {
            CLOSE: XCOMPONENT + "-close"
        }, ATTRIBUTES = {
            IFRAME_PLACEHOLDER: "data-xcomponent-" + XCOMPONENT + "-placeholder"
        }, ANIMATION_NAMES = {
            SHOW_CONTAINER: XCOMPONENT + "-show-container",
            SHOW_COMPONENT: XCOMPONENT + "-show-component",
            HIDE_CONTAINER: XCOMPONENT + "-hide-container",
            HIDE_COMPONENT: XCOMPONENT + "-hide-component"
        }, EVENT_NAMES = {
            CLICK: "click"
        }, CLOSE_REASONS = {
            PARENT_CALL: "parent_call",
            CHILD_CALL: "child_call",
            CLOSE_DETECTED: "close_detected",
            USER_CLOSED: "user_closed",
            PARENT_CLOSE_DETECTED: "parent_close_detected"
        }, CONTEXT_TYPES_LIST = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lib__.b)(CONTEXT_TYPES), DELEGATE = {
            CALL_ORIGINAL: "call_original",
            CALL_DELEGATE: "call_delegate"
        }, WILDCARD = "*", DEFAULT_DIMENSIONS = {
            WIDTH: 300,
            HEIGHT: 150
        };
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var __WEBPACK_IMPORTED_MODULE_0__interface__ = __webpack_require__(29);
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.WeakMap;
        });
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return global;
        });
        var __WEBPACK_IMPORTED_MODULE_0__conf__ = __webpack_require__(4), global = window[__WEBPACK_IMPORTED_MODULE_0__conf__.b.WINDOW_PROPS.POSTROBOT] = window[__WEBPACK_IMPORTED_MODULE_0__conf__.b.WINDOW_PROPS.POSTROBOT] || {};
        global.registerSelf = function() {};
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        Object.defineProperty(__webpack_exports__, "__esModule", {
            value: !0
        });
        var __WEBPACK_IMPORTED_MODULE_0__interface__ = __webpack_require__(18);
        __webpack_require__.d(__webpack_exports__, "cleanUpWindow", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.cleanUpWindow;
        });
        __webpack_require__.d(__webpack_exports__, "init", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.init;
        });
        __webpack_require__.d(__webpack_exports__, "Promise", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.Promise;
        });
        __webpack_require__.d(__webpack_exports__, "parent", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.parent;
        });
        __webpack_require__.d(__webpack_exports__, "bridge", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.bridge;
        });
        __webpack_require__.d(__webpack_exports__, "send", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.send;
        });
        __webpack_require__.d(__webpack_exports__, "request", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.request;
        });
        __webpack_require__.d(__webpack_exports__, "sendToParent", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.sendToParent;
        });
        __webpack_require__.d(__webpack_exports__, "client", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.client;
        });
        __webpack_require__.d(__webpack_exports__, "on", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.on;
        });
        __webpack_require__.d(__webpack_exports__, "listen", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.listen;
        });
        __webpack_require__.d(__webpack_exports__, "once", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.once;
        });
        __webpack_require__.d(__webpack_exports__, "listener", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.listener;
        });
        __webpack_require__.d(__webpack_exports__, "CONFIG", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.CONFIG;
        });
        __webpack_require__.d(__webpack_exports__, "CONSTANTS", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.CONSTANTS;
        });
        __webpack_require__.d(__webpack_exports__, "disable", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.disable;
        });
        __webpack_exports__.default = __WEBPACK_IMPORTED_MODULE_0__interface__;
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(19);
        __webpack_require__.d(__webpack_exports__, "c", function() {
            return __WEBPACK_IMPORTED_MODULE_0__util__.a;
        });
        __webpack_require__.d(__webpack_exports__, "d", function() {
            return __WEBPACK_IMPORTED_MODULE_0__util__.f;
        });
        __webpack_require__.d(__webpack_exports__, "e", function() {
            return __WEBPACK_IMPORTED_MODULE_0__util__.d;
        });
        __webpack_require__.d(__webpack_exports__, "h", function() {
            return __WEBPACK_IMPORTED_MODULE_0__util__.c;
        });
        __webpack_require__.d(__webpack_exports__, "i", function() {
            return __WEBPACK_IMPORTED_MODULE_0__util__.b;
        });
        __webpack_require__.d(__webpack_exports__, "j", function() {
            return __WEBPACK_IMPORTED_MODULE_0__util__.h;
        });
        __webpack_require__.d(__webpack_exports__, "l", function() {
            return __WEBPACK_IMPORTED_MODULE_0__util__.i;
        });
        __webpack_require__.d(__webpack_exports__, "m", function() {
            return __WEBPACK_IMPORTED_MODULE_0__util__.j;
        });
        __webpack_require__.d(__webpack_exports__, "n", function() {
            return __WEBPACK_IMPORTED_MODULE_0__util__.e;
        });
        __webpack_require__.d(__webpack_exports__, "o", function() {
            return __WEBPACK_IMPORTED_MODULE_0__util__.k;
        });
        var __WEBPACK_IMPORTED_MODULE_1__log__ = __webpack_require__(24);
        __webpack_require__.d(__webpack_exports__, "g", function() {
            return __WEBPACK_IMPORTED_MODULE_1__log__.a;
        });
        var __WEBPACK_IMPORTED_MODULE_2__serialize__ = __webpack_require__(49);
        __webpack_require__.d(__webpack_exports__, "b", function() {
            return __WEBPACK_IMPORTED_MODULE_2__serialize__.a;
        });
        __webpack_require__.d(__webpack_exports__, "f", function() {
            return __WEBPACK_IMPORTED_MODULE_2__serialize__.b;
        });
        __webpack_require__.d(__webpack_exports__, "k", function() {
            return __WEBPACK_IMPORTED_MODULE_2__serialize__.c;
        });
        var __WEBPACK_IMPORTED_MODULE_3__ready__ = __webpack_require__(48);
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return __WEBPACK_IMPORTED_MODULE_3__ready__.a;
        });
        __webpack_require__.d(__webpack_exports__, "p", function() {
            return __WEBPACK_IMPORTED_MODULE_3__ready__.b;
        });
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function _defineProperty(obj, key, value) {
            key in obj ? Object.defineProperty(obj, key, {
                value: value,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : obj[key] = value;
            return obj;
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !call || "object" != typeof call && "function" != typeof call ? self : call;
        }
        function _inherits(subClass, superClass) {
            if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            });
            superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
        }
        function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
            var desc = {};
            Object.keys(descriptor).forEach(function(key) {
                desc[key] = descriptor[key];
            });
            desc.enumerable = !!desc.enumerable;
            desc.configurable = !!desc.configurable;
            ("value" in desc || desc.initializer) && (desc.writable = !0);
            desc = decorators.slice().reverse().reduce(function(desc, decorator) {
                return decorator(target, property, desc) || desc;
            }, desc);
            if (context && void 0 !== desc.initializer) {
                desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
                desc.initializer = void 0;
            }
            if (void 0 === desc.initializer) {
                Object.defineProperty(target, property, desc);
                desc = null;
            }
            return desc;
        }
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return ParentComponent;
        });
        var _class, __WEBPACK_IMPORTED_MODULE_0_beaver_logger_client__ = __webpack_require__(23), __WEBPACK_IMPORTED_MODULE_1_post_robot_src__ = __webpack_require__(8), __WEBPACK_IMPORTED_MODULE_2_cross_domain_utils_src__ = __webpack_require__(0), __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__ = __webpack_require__(1), __WEBPACK_IMPORTED_MODULE_4__base__ = __webpack_require__(20), __WEBPACK_IMPORTED_MODULE_5__window__ = __webpack_require__(21), __WEBPACK_IMPORTED_MODULE_6__lib__ = __webpack_require__(3), __WEBPACK_IMPORTED_MODULE_7__constants__ = __webpack_require__(5), __WEBPACK_IMPORTED_MODULE_8__drivers__ = __webpack_require__(33), __WEBPACK_IMPORTED_MODULE_9__validate__ = __webpack_require__(65), __WEBPACK_IMPORTED_MODULE_10__props__ = __webpack_require__(34), __WEBPACK_IMPORTED_MODULE_11__error__ = __webpack_require__(14), _extends = (__webpack_require__(2), 
        __webpack_require__(12), __webpack_require__(25), Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        }), _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        }, _slicedToArray = function() {
            function sliceIterator(arr, i) {
                var _arr = [], _n = !0, _d = !1, _e = void 0;
                try {
                    for (var _s, _i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done); _n = !0) {
                        _arr.push(_s.value);
                        if (i && _arr.length === i) break;
                    }
                } catch (err) {
                    _d = !0;
                    _e = err;
                } finally {
                    try {
                        !_n && _i.return && _i.return();
                    } finally {
                        if (_d) throw _e;
                    }
                }
                return _arr;
            }
            return function(arr, i) {
                if (Array.isArray(arr)) return arr;
                if (Symbol.iterator in Object(arr)) return sliceIterator(arr, i);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
        }(), _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1;
                    descriptor.configurable = !0;
                    "value" in descriptor && (descriptor.writable = !0);
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                protoProps && defineProperties(Constructor.prototype, protoProps);
                staticProps && defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        __WEBPACK_IMPORTED_MODULE_6__lib__.c.props = __WEBPACK_IMPORTED_MODULE_6__lib__.c.props || {};
        __WEBPACK_IMPORTED_MODULE_6__lib__.c.windows = __WEBPACK_IMPORTED_MODULE_6__lib__.c.windows || {};
        var ParentComponent = (_class = function(_BaseComponent) {
            function ParentComponent(component, context, _ref) {
                var props = _ref.props;
                _classCallCheck(this, ParentComponent);
                var _this = _possibleConstructorReturn(this, (ParentComponent.__proto__ || Object.getPrototypeOf(ParentComponent)).call(this));
                _this.component = component;
                _this.validateParentDomain();
                _this.context = context;
                _this.setProps(props);
                _this.props.logLevel && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.d)(_this.props.logLevel);
                _this.childWindowName = _this.buildChildWindowName({
                    renderTo: window
                });
                _this.registerActiveComponent();
                _this.component.log("construct_parent");
                _this.watchForUnload();
                _this.onInit = new __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__.a();
                _this.clean.register(function() {
                    _this.onInit = new __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__.a();
                });
                _this.onInit.catch(function(err) {
                    return _this.error(err);
                });
                return _this;
            }
            _inherits(ParentComponent, _BaseComponent);
            _createClass(ParentComponent, [ {
                key: "render",
                value: function(element) {
                    var _this2 = this, loadUrl = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                    return this.tryInit(function() {
                        _this2.component.log("render_" + _this2.context, {
                            context: _this2.context,
                            element: element,
                            loadUrl: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.e)(loadUrl)
                        });
                        var tasks = {};
                        tasks.onRender = _this2.props.onRender();
                        tasks.getDomain = _this2.getDomain();
                        tasks.elementReady = __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__.a.try(function() {
                            if (element) return _this2.elementReady(element);
                        });
                        tasks.openContainer = tasks.elementReady.then(function() {
                            return _this2.openContainer(element);
                        });
                        tasks.showContainer = tasks.openContainer.then(function() {
                            return _this2.showContainer();
                        });
                        tasks.openPrerender = tasks.openContainer.then(function() {
                            return _this2.openPrerender();
                        });
                        tasks.switchPrerender = __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__.a.all([ tasks.openPrerender, _this2.onInit ]).then(function() {
                            return _this2.switchPrerender();
                        });
                        tasks.open = _this2.driver.openOnClick ? _this2.open() : tasks.openContainer.then(function() {
                            return _this2.open();
                        });
                        tasks.listen = __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__.a.all([ tasks.getDomain, tasks.open ]).then(function(_ref2) {
                            var _ref3 = _slicedToArray(_ref2, 1), domain = _ref3[0];
                            _this2.listen(_this2.window, domain);
                        });
                        tasks.watchForClose = tasks.open.then(function() {
                            return _this2.watchForClose();
                        });
                        tasks.linkDomain = __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__.a.all([ tasks.getDomain, tasks.open ]).then(function(_ref4) {
                            var _ref5 = _slicedToArray(_ref4, 1), domain = _ref5[0];
                            if (__WEBPACK_IMPORTED_MODULE_1_post_robot_src__.bridge) return __WEBPACK_IMPORTED_MODULE_1_post_robot_src__.bridge.linkUrl(_this2.window, domain);
                        });
                        if (!_this2.html) {
                            tasks.createPrerenderTemplate = tasks.openPrerender.then(function() {
                                return _this2.createPrerenderTemplate();
                            });
                            tasks.showComponent = tasks.createPrerenderTemplate.then(function() {
                                return _this2.showComponent();
                            });
                        }
                        tasks.openBridge = tasks.open.then(function() {
                            return _this2.openBridge();
                        });
                        if (_this2.html) tasks.loadHTML = tasks.open.then(function() {
                            return _this2.loadHTML();
                        }); else if (loadUrl) {
                            tasks.buildUrl = _this2.buildUrl();
                            tasks.loadUrl = __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__.a.all([ tasks.buildUrl, tasks.open, tasks.linkDomain, tasks.listen, tasks.open, tasks.openBridge, tasks.createPrerenderTemplate ]).then(function(_ref6) {
                                var _ref7 = _slicedToArray(_ref6, 1), url = _ref7[0];
                                return _this2.loadUrl(url);
                            });
                            tasks.runTimeout = tasks.loadUrl.then(function() {
                                return _this2.runTimeout();
                            });
                        }
                        return __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__.a.hash(tasks);
                    }).then(function() {
                        return _this2.props.onEnter();
                    });
                }
            }, {
                key: "getOutlet",
                value: function() {
                    this.outlet = document.createElement("div");
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.f)(this.outlet, __WEBPACK_IMPORTED_MODULE_7__constants__.CLASS_NAMES.OUTLET);
                    return this.outlet;
                }
            }, {
                key: "validateParentDomain",
                value: function() {
                    var domain = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_cross_domain_utils_src__.i)();
                    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_cross_domain_utils_src__.f)(this.component.allowedParentDomains, domain)) throw new __WEBPACK_IMPORTED_MODULE_11__error__.c("Can not be rendered by domain: " + domain);
                }
            }, {
                key: "renderTo",
                value: function(win, element) {
                    var _this3 = this;
                    return this.tryInit(function() {
                        if (win === window) return _this3.render(element);
                        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_cross_domain_utils_src__.m)(window, win)) throw new Error("Can only renderTo an adjacent frame");
                        if (element && "string" != typeof element) throw new Error("Element passed to renderTo must be a string selector, got " + (void 0 === element ? "undefined" : _typeof(element)) + " " + element);
                        _this3.checkAllowRenderTo(win);
                        _this3.component.log("render_" + _this3.context + "_to_win", {
                            element: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.e)(element),
                            context: _this3.context
                        });
                        _this3.childWindowName = _this3.buildChildWindowName({
                            renderTo: win
                        });
                        _this3.delegate(win);
                        return _this3.render(element);
                    });
                }
            }, {
                key: "prefetch",
                value: function() {
                    var _this4 = this;
                    return __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__.a.try(function() {
                        _this4.html = _this4.buildUrl().then(function(url) {
                            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.g)(url).then(function(html) {
                                return '\n                        <base href="' + url.split("/").slice(0, 3).join("/") + '">\n\n                        ' + html + "\n\n                        <script>\n                            if (window.history && window.history.pushState) {\n                                window.history.pushState({}, '', '/" + url.split("/").slice(3).join("/") + "');\n                            }\n                        <\/script>\n                    ";
                            });
                        });
                    });
                }
            }, {
                key: "loadHTML",
                value: function() {
                    var _this5 = this;
                    return __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__.a.try(function() {
                        if (!_this5.html) throw new Error("Html not prefetched");
                        return _this5.html.then(function(html) {
                            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.h)(_this5.window, html);
                        });
                    });
                }
            }, {
                key: "checkAllowRenderTo",
                value: function(win) {
                    if (!win) throw this.component.createError("Must pass window to renderTo");
                    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_cross_domain_utils_src__.a)(win)) {
                        var origin = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_cross_domain_utils_src__.i)(), domain = this.component.getDomain(null, this.props.env);
                        if (!domain) throw new Error("Could not determine domain to allow remote render");
                        if (domain !== origin) throw new Error("Can not render remotely to " + domain + " - can only render to " + origin);
                    }
                }
            }, {
                key: "registerActiveComponent",
                value: function() {
                    var _this6 = this;
                    ParentComponent.activeComponents.push(this);
                    this.clean.register(function() {
                        ParentComponent.activeComponents.splice(ParentComponent.activeComponents.indexOf(_this6), 1);
                    });
                }
            }, {
                key: "getComponentParentRef",
                value: function() {
                    var renderToWindow = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window;
                    if (this.context === __WEBPACK_IMPORTED_MODULE_7__constants__.CONTEXT_TYPES.POPUP) return {
                        ref: __WEBPACK_IMPORTED_MODULE_7__constants__.WINDOW_REFERENCES.OPENER
                    };
                    if (renderToWindow === window) return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_cross_domain_utils_src__.n)(window) ? {
                        ref: __WEBPACK_IMPORTED_MODULE_7__constants__.WINDOW_REFERENCES.TOP
                    } : {
                        ref: __WEBPACK_IMPORTED_MODULE_7__constants__.WINDOW_REFERENCES.PARENT,
                        distance: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_cross_domain_utils_src__.o)(window)
                    };
                    var uid = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.i)();
                    __WEBPACK_IMPORTED_MODULE_6__lib__.c.windows[uid] = window;
                    this.clean.register(function() {
                        delete __WEBPACK_IMPORTED_MODULE_6__lib__.c.windows[uid];
                    });
                    return {
                        ref: __WEBPACK_IMPORTED_MODULE_7__constants__.WINDOW_REFERENCES.GLOBAL,
                        uid: uid
                    };
                }
            }, {
                key: "getRenderParentRef",
                value: function() {
                    var renderToWindow = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window;
                    if (renderToWindow === window) return this.getComponentParentRef(renderToWindow);
                    var uid = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.i)();
                    __WEBPACK_IMPORTED_MODULE_6__lib__.c.windows[uid] = renderToWindow;
                    this.clean.register(function() {
                        delete __WEBPACK_IMPORTED_MODULE_6__lib__.c.windows[uid];
                    });
                    return {
                        ref: __WEBPACK_IMPORTED_MODULE_7__constants__.WINDOW_REFERENCES.GLOBAL,
                        uid: uid
                    };
                }
            }, {
                key: "buildChildWindowName",
                value: function() {
                    var _ref8 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, _ref8$renderTo = _ref8.renderTo, renderTo = void 0 === _ref8$renderTo ? window : _ref8$renderTo, sameDomain = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_cross_domain_utils_src__.a)(renderTo), uid = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.i)(), tag = this.component.tag, sProps = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.j)(this.getPropsForChild()), componentParent = this.getComponentParentRef(renderTo), renderParent = this.getRenderParentRef(renderTo), secureProps = !sameDomain, props = secureProps ? {
                        type: __WEBPACK_IMPORTED_MODULE_7__constants__.INITIAL_PROPS.UID,
                        uid: uid
                    } : {
                        type: __WEBPACK_IMPORTED_MODULE_7__constants__.INITIAL_PROPS.RAW,
                        value: sProps
                    };
                    if (props.type === __WEBPACK_IMPORTED_MODULE_7__constants__.INITIAL_PROPS.UID) {
                        __WEBPACK_IMPORTED_MODULE_6__lib__.c.props[uid] = sProps;
                        this.clean.register(function() {
                            delete __WEBPACK_IMPORTED_MODULE_6__lib__.c.props[uid];
                        });
                    }
                    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__window__.a)(this.component.name, this.component.version, {
                        uid: uid,
                        tag: tag,
                        componentParent: componentParent,
                        renderParent: renderParent,
                        props: props
                    });
                }
            }, {
                key: "sendToParent",
                value: function(name, data) {
                    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__window__.b)()) throw new Error("Can not find parent component window to message");
                    this.component.log("send_to_parent_" + name);
                    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_post_robot_src__.send)(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__window__.b)(), name, data, {
                        domain: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__window__.c)()
                    });
                }
            }, {
                key: "setProps",
                value: function(props) {
                    var required = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__validate__.a)(this.component, props, required);
                    this.component.validate && this.component.validate(this.component, props);
                    this.props = this.props || {};
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.k)(this.props, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__props__.a)(this.component, this, props));
                }
            }, {
                key: "buildUrl",
                value: function() {
                    var _this7 = this;
                    return __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__.a.all([ this.props.url, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__props__.b)(_extends({}, this.component.props, this.component.builtinProps), this.props) ]).then(function(_ref9) {
                        var _ref10 = _slicedToArray(_ref9, 2), url = _ref10[0], query = _ref10[1];
                        return url && !_this7.component.getValidDomain(url) ? url : __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__.a.try(function() {
                            return url || _this7.component.getUrl(_this7.props.env, _this7.props);
                        }).then(function(finalUrl) {
                            query[__WEBPACK_IMPORTED_MODULE_7__constants__.XCOMPONENT] = "1";
                            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.l)(finalUrl, {
                                query: query
                            });
                        });
                    });
                }
            }, {
                key: "getDomain",
                value: function() {
                    var _this8 = this;
                    return __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__.a.try(function() {
                        return _this8.props.url;
                    }).then(function(url) {
                        var domain = _this8.component.getDomain(url, _this8.props.env);
                        return domain || (_this8.component.buildUrl ? __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__.a.try(function() {
                            return _this8.component.buildUrl(_this8.props);
                        }).then(function(builtUrl) {
                            return _this8.component.getDomain(builtUrl, _this8.props.env);
                        }) : void 0);
                    }).then(function(domain) {
                        if (!domain) throw new Error("Could not determine domain");
                        return domain;
                    });
                }
            }, {
                key: "getPropsForChild",
                value: function() {
                    for (var result = {}, _iterator = Object.keys(this.props), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                        var _ref11;
                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref11 = _iterator[_i++];
                        } else {
                            _i = _iterator.next();
                            if (_i.done) break;
                            _ref11 = _i.value;
                        }
                        var key = _ref11, prop = this.component.getProp(key);
                        prop && !1 === prop.sendToChild || (result[key] = this.props[key]);
                    }
                    return result;
                }
            }, {
                key: "updateProps",
                value: function(props) {
                    var _this9 = this;
                    this.setProps(props, !1);
                    return this.onInit.then(function() {
                        if (_this9.childExports) return _this9.childExports.updateProps(_this9.getPropsForChild());
                        throw new Error("Child exports were not available");
                    });
                }
            }, {
                key: "openBridge",
                value: function() {
                    var _this10 = this;
                    return __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__.a.try(function() {
                        if (__WEBPACK_IMPORTED_MODULE_1_post_robot_src__.bridge) {
                            var bridgeUrl = _this10.component.getBridgeUrl(_this10.props.env);
                            if (bridgeUrl) {
                                var bridgeDomain = _this10.component.getBridgeDomain(_this10.props.env);
                                if (!bridgeDomain) throw new Error("Can not determine domain for bridge");
                                return __WEBPACK_IMPORTED_MODULE_1_post_robot_src__.bridge.needsBridge({
                                    win: _this10.window,
                                    domain: bridgeDomain
                                }) ? __WEBPACK_IMPORTED_MODULE_1_post_robot_src__.bridge.openBridge(bridgeUrl, bridgeDomain) : void 0;
                            }
                        }
                    });
                }
            }, {
                key: "open",
                value: function() {
                    var _this11 = this;
                    return __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__.a.try(function() {
                        _this11.component.log("open_" + _this11.context, {
                            windowName: _this11.childWindowName
                        });
                        return _this11.driver.open.call(_this11);
                    });
                }
            }, {
                key: "openPrerender",
                value: function() {
                    var _this12 = this;
                    return __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__.a.try(function() {
                        if (_this12.component.prerenderTemplate) return _this12.driver.openPrerender.call(_this12);
                    });
                }
            }, {
                key: "switchPrerender",
                value: function() {
                    var _this13 = this;
                    return __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__.a.try(function() {
                        if (_this13.prerenderWindow && _this13.driver.switchPrerender) return _this13.driver.switchPrerender.call(_this13);
                    });
                }
            }, {
                key: "elementReady",
                value: function(element) {
                    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.m)(element).then(__WEBPACK_IMPORTED_MODULE_6__lib__.n);
                }
            }, {
                key: "delegate",
                value: function(win) {
                    var _this14 = this;
                    this.component.log("delegate_" + this.context);
                    for (var props = {
                        uid: this.props.uid,
                        dimensions: this.props.dimensions,
                        onClose: this.props.onClose,
                        onDisplay: this.props.onDisplay
                    }, _iterator2 = this.component.getPropNames(), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                        var _ref12;
                        if (_isArray2) {
                            if (_i2 >= _iterator2.length) break;
                            _ref12 = _iterator2[_i2++];
                        } else {
                            _i2 = _iterator2.next();
                            if (_i2.done) break;
                            _ref12 = _i2.value;
                        }
                        var propName = _ref12;
                        this.component.getProp(propName).allowDelegate && (props[propName] = this.props[propName]);
                    }
                    var delegate = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_post_robot_src__.send)(win, __WEBPACK_IMPORTED_MODULE_7__constants__.POST_MESSAGE.DELEGATE + "_" + this.component.name, {
                        context: this.context,
                        env: this.props.env,
                        options: {
                            context: this.context,
                            childWindowName: this.childWindowName,
                            props: props,
                            overrides: {
                                focus: function() {
                                    return _this14.focus();
                                },
                                userClose: function() {
                                    return _this14.userClose();
                                },
                                getDomain: function() {
                                    return _this14.getDomain();
                                },
                                error: function(err) {
                                    return _this14.error(err);
                                },
                                on: function(eventName, handler) {
                                    return _this14.on(eventName, handler);
                                }
                            }
                        }
                    }).then(function(_ref13) {
                        var data = _ref13.data;
                        _this14.clean.register(data.destroy);
                        return data;
                    }).catch(function(err) {
                        throw new Error("Unable to delegate rendering. Possibly the component is not loaded in the target window.\n\n" + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.o)(err));
                    }), overrides = this.driver.delegateOverrides;
                    _loop2: for (var _iterator3 = Object.keys(overrides), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                        var _ref14, _ret = function() {
                            if (_isArray3) {
                                if (_i3 >= _iterator3.length) return "break";
                                _ref14 = _iterator3[_i3++];
                            } else {
                                _i3 = _iterator3.next();
                                if (_i3.done) return "break";
                                _ref14 = _i3.value;
                            }
                            var key = _ref14, val = overrides[key];
                            if (val === __WEBPACK_IMPORTED_MODULE_7__constants__.DELEGATE.CALL_ORIGINAL) return "continue";
                            var original = _this14[key];
                            _this14[key] = function() {
                                var _this15 = this, _arguments = arguments;
                                return delegate.then(function(data) {
                                    var override = data.overrides[key];
                                    if (val === __WEBPACK_IMPORTED_MODULE_7__constants__.DELEGATE.CALL_DELEGATE) return override.apply(_this15, _arguments);
                                    if (val instanceof Function) return val(original, override).apply(_this15, _arguments);
                                    throw new Error("Expected delgate to be CALL_ORIGINAL, CALL_DELEGATE, or factory method");
                                });
                            };
                        }();
                        switch (_ret) {
                          case "break":
                            break _loop2;

                          case "continue":
                            continue;
                        }
                    }
                }
            }, {
                key: "watchForClose",
                value: function() {
                    var _this16 = this, closeWindowListener = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_cross_domain_utils_src__.p)(this.window, function() {
                        _this16.component.log("detect_close_child");
                        return __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__.a.try(function() {
                            return _this16.props.onClose(__WEBPACK_IMPORTED_MODULE_7__constants__.CLOSE_REASONS.CLOSE_DETECTED);
                        }).finally(function() {
                            return _this16.destroy();
                        });
                    }, 3e3);
                    this.clean.register("destroyCloseWindowListener", closeWindowListener.cancel);
                }
            }, {
                key: "watchForUnload",
                value: function() {
                    var _this17 = this, onunload = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.p)(function() {
                        _this17.component.log("navigate_away");
                        __WEBPACK_IMPORTED_MODULE_0_beaver_logger_client__.f();
                        _this17.destroyComponent();
                    }), unloadWindowListener = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.q)(window, "unload", onunload);
                    this.clean.register("destroyUnloadWindowListener", unloadWindowListener.cancel);
                }
            }, {
                key: "loadUrl",
                value: function(url) {
                    var _this18 = this;
                    return __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__.a.try(function() {
                        _this18.component.log("load_url");
                        window.location.href.split("#")[0] === url.split("#")[0] && (url = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.l)(url, {
                            query: _defineProperty({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.i)(), "1")
                        }));
                        return _this18.driver.loadUrl.call(_this18, url);
                    });
                }
            }, {
                key: "hijack",
                value: function(targetElement) {
                    targetElement.target = this.childWindowName;
                }
            }, {
                key: "runTimeout",
                value: function() {
                    var _this19 = this;
                    if (this.props.timeout) {
                        this.timeout = setTimeout(function() {
                            _this19.component.log("timed_out", {
                                timeout: _this19.props.timeout
                            });
                            var error = _this19.component.createError("Loading component timed out after " + _this19.props.timeout + " milliseconds");
                            _this19.onInit.reject(error);
                            _this19.props.onTimeout(error);
                        }, this.props.timeout);
                        this.clean.register(function() {
                            clearTimeout(_this19.timeout);
                            delete _this19.timeout;
                        });
                    }
                }
            }, {
                key: "listeners",
                value: function() {
                    var _ref15;
                    return _ref15 = {}, _defineProperty(_ref15, __WEBPACK_IMPORTED_MODULE_7__constants__.POST_MESSAGE.INIT, function(source, data) {
                        this.childExports = data.exports;
                        this.onInit.resolve(this);
                        this.timeout && clearTimeout(this.timeout);
                        return {
                            props: this.getPropsForChild(),
                            context: this.context
                        };
                    }), _defineProperty(_ref15, __WEBPACK_IMPORTED_MODULE_7__constants__.POST_MESSAGE.CLOSE, function(source, data) {
                        this.close(data.reason);
                    }), _defineProperty(_ref15, __WEBPACK_IMPORTED_MODULE_7__constants__.POST_MESSAGE.CHECK_CLOSE, function(source, data) {
                        this.checkClose();
                    }), _defineProperty(_ref15, __WEBPACK_IMPORTED_MODULE_7__constants__.POST_MESSAGE.RESIZE, function(source, data) {
                        var _this20 = this;
                        return __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__.a.try(function() {
                            if (_this20.driver.allowResize) return _this20.resize(data.width, data.height);
                        });
                    }), _defineProperty(_ref15, __WEBPACK_IMPORTED_MODULE_7__constants__.POST_MESSAGE.ONRESIZE, function(source, data) {
                        this.event.trigger("resize");
                    }), _defineProperty(_ref15, __WEBPACK_IMPORTED_MODULE_7__constants__.POST_MESSAGE.HIDE, function(source, data) {
                        this.hide();
                    }), _defineProperty(_ref15, __WEBPACK_IMPORTED_MODULE_7__constants__.POST_MESSAGE.SHOW, function(source, data) {
                        this.show();
                    }), _defineProperty(_ref15, __WEBPACK_IMPORTED_MODULE_7__constants__.POST_MESSAGE.ERROR, function(source, data) {
                        this.error(new Error(data.error));
                    }), _ref15;
                }
            }, {
                key: "resize",
                value: function(width, height) {
                    var _this21 = this, _ref16 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, _ref16$waitForTransit = _ref16.waitForTransition, waitForTransition = void 0 === _ref16$waitForTransit || _ref16$waitForTransit;
                    return __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__.a.try(function() {
                        _this21.component.log("resize", {
                            height: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.e)(height),
                            width: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.e)(width)
                        });
                        _this21.driver.resize.call(_this21, width, height);
                        if (waitForTransition && (_this21.element || _this21.iframe)) {
                            var overflow = void 0;
                            _this21.element && (overflow = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.r)(_this21.element, "hidden"));
                            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.s)(_this21.element || _this21.iframe).then(function() {
                                overflow && overflow.reset();
                            });
                        }
                    });
                }
            }, {
                key: "hide",
                value: function() {
                    this.container && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.t)(this.container);
                    return this.driver.hide.call(this);
                }
            }, {
                key: "show",
                value: function() {
                    this.container && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.u)(this.container);
                    return this.driver.show.call(this);
                }
            }, {
                key: "checkClose",
                value: function() {
                    var _this22 = this, closeWindowListener = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_cross_domain_utils_src__.p)(this.window, function() {
                        _this22.userClose();
                    }, 50, 500);
                    this.clean.register(closeWindowListener.cancel);
                }
            }, {
                key: "userClose",
                value: function() {
                    return this.close(__WEBPACK_IMPORTED_MODULE_7__constants__.CLOSE_REASONS.USER_CLOSED);
                }
            }, {
                key: "close",
                value: function() {
                    var _this23 = this, reason = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : __WEBPACK_IMPORTED_MODULE_7__constants__.CLOSE_REASONS.PARENT_CALL;
                    return __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__.a.try(function() {
                        _this23.component.log("close", {
                            reason: reason
                        });
                        _this23.event.triggerOnce(__WEBPACK_IMPORTED_MODULE_7__constants__.EVENTS.CLOSE);
                        return _this23.props.onClose(reason);
                    }).then(function() {
                        return __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__.a.all([ _this23.closeComponent(), _this23.closeContainer() ]);
                    }).then(function() {
                        return _this23.destroy();
                    });
                }
            }, {
                key: "closeContainer",
                value: function() {
                    var _this24 = this, reason = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : __WEBPACK_IMPORTED_MODULE_7__constants__.CLOSE_REASONS.PARENT_CALL;
                    return __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__.a.try(function() {
                        _this24.event.triggerOnce(__WEBPACK_IMPORTED_MODULE_7__constants__.EVENTS.CLOSE);
                        return _this24.props.onClose(reason);
                    }).then(function() {
                        return __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__.a.all([ _this24.closeComponent(reason), _this24.hideContainer() ]);
                    }).then(function() {
                        return _this24.destroyContainer();
                    });
                }
            }, {
                key: "destroyContainer",
                value: function() {
                    var _this25 = this;
                    return __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__.a.try(function() {
                        _this25.clean.run("destroyContainerEvents");
                        _this25.clean.run("destroyContainerTemplate");
                    });
                }
            }, {
                key: "closeComponent",
                value: function() {
                    var _this26 = this, reason = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : __WEBPACK_IMPORTED_MODULE_7__constants__.CLOSE_REASONS.PARENT_CALL, win = this.window;
                    return __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__.a.try(function() {
                        return _this26.cancelContainerEvents();
                    }).then(function() {
                        _this26.event.triggerOnce(__WEBPACK_IMPORTED_MODULE_7__constants__.EVENTS.CLOSE);
                        return _this26.props.onClose(reason);
                    }).then(function() {
                        return _this26.hideComponent();
                    }).then(function() {
                        return _this26.destroyComponent();
                    }).then(function() {
                        _this26.childExports && _this26.context === __WEBPACK_IMPORTED_MODULE_7__constants__.CONTEXT_TYPES.POPUP && !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_cross_domain_utils_src__.c)(win) && _this26.childExports.close().catch(__WEBPACK_IMPORTED_MODULE_6__lib__.n);
                    });
                }
            }, {
                key: "destroyComponent",
                value: function() {
                    this.clean.run("destroyUnloadWindowListener");
                    this.clean.run("destroyCloseWindowListener");
                    this.clean.run("destroyContainerEvents");
                    this.clean.run("destroyWindow");
                }
            }, {
                key: "showContainer",
                value: function() {
                    var _this27 = this;
                    return __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__.a.try(function() {
                        if (_this27.props.onDisplay) return _this27.props.onDisplay();
                    }).then(function() {
                        if (_this27.container) return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.v)(_this27.container, __WEBPACK_IMPORTED_MODULE_7__constants__.ANIMATION_NAMES.SHOW_CONTAINER, _this27.clean.register);
                    });
                }
            }, {
                key: "showComponent",
                value: function() {
                    var _this28 = this;
                    return __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__.a.try(function() {
                        if (_this28.props.onDisplay) return _this28.props.onDisplay();
                    }).then(function() {
                        if (_this28.element) return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.v)(_this28.element, __WEBPACK_IMPORTED_MODULE_7__constants__.ANIMATION_NAMES.SHOW_COMPONENT, _this28.clean.register);
                    });
                }
            }, {
                key: "hideContainer",
                value: function() {
                    var _this29 = this;
                    return __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__.a.try(function() {
                        return _this29.container ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.w)(_this29.container, __WEBPACK_IMPORTED_MODULE_7__constants__.ANIMATION_NAMES.HIDE_CONTAINER, _this29.clean.register) : __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__.a.resolve();
                    });
                }
            }, {
                key: "hideComponent",
                value: function() {
                    var _this30 = this;
                    return __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__.a.try(function() {
                        return _this30.element ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.w)(_this30.element, __WEBPACK_IMPORTED_MODULE_7__constants__.ANIMATION_NAMES.HIDE_COMPONENT, _this30.clean.register) : __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__.a.resolve();
                    });
                }
            }, {
                key: "focus",
                value: function() {
                    if (!this.window) throw new Error("No window to focus");
                    this.component.log("focus");
                    this.window.focus();
                }
            }, {
                key: "createPrerenderTemplate",
                value: function() {
                    var _this31 = this;
                    return __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__.a.try(function() {
                        return _this31.component.prerenderTemplate ? __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__.a.try(function() {
                            return _this31.prerenderIframe ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.x)(_this31.prerenderIframe).then(function() {
                                return _this31.prerenderWindow;
                            }) : _this31.prerenderWindow;
                        }).then(function(win) {
                            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.y)(win, _this31.renderTemplate(_this31.component.prerenderTemplate, {
                                jsxDom: __WEBPACK_IMPORTED_MODULE_6__lib__.z.bind(win.document),
                                document: win.document
                            }));
                        }) : __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__.a.resolve();
                    });
                }
            }, {
                key: "renderTemplate",
                value: function(renderer) {
                    var _this32 = this, options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, _ref17 = this.component.dimensions || {}, _ref17$width = _ref17.width, width = void 0 === _ref17$width ? __WEBPACK_IMPORTED_MODULE_7__constants__.DEFAULT_DIMENSIONS.WIDTH + "px" : _ref17$width, _ref17$height = _ref17.height, height = void 0 === _ref17$height ? __WEBPACK_IMPORTED_MODULE_7__constants__.DEFAULT_DIMENSIONS.HEIGHT + "px" : _ref17$height;
                    return renderer.call(this, _extends({
                        id: __WEBPACK_IMPORTED_MODULE_7__constants__.CLASS_NAMES.XCOMPONENT + "-" + this.component.tag + "-" + this.props.uid,
                        props: renderer.__xdomain__ ? null : this.props,
                        tag: this.component.tag,
                        context: this.context,
                        outlet: this.getOutlet(),
                        CLASS: __WEBPACK_IMPORTED_MODULE_7__constants__.CLASS_NAMES,
                        ANIMATION: __WEBPACK_IMPORTED_MODULE_7__constants__.ANIMATION_NAMES,
                        CONTEXT: __WEBPACK_IMPORTED_MODULE_7__constants__.CONTEXT_TYPES,
                        EVENT: __WEBPACK_IMPORTED_MODULE_7__constants__.EVENTS,
                        actions: {
                            close: function() {
                                return _this32.userClose();
                            },
                            focus: function() {
                                return _this32.focus();
                            }
                        },
                        on: function(eventName, handler) {
                            return _this32.on(eventName, handler);
                        },
                        jsxDom: __WEBPACK_IMPORTED_MODULE_6__lib__.z,
                        document: document,
                        dimensions: {
                            width: width,
                            height: height
                        }
                    }, options));
                }
            }, {
                key: "openContainer",
                value: function(element) {
                    var _this33 = this;
                    return __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__.a.try(function() {
                        var el = void 0;
                        el = element ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.A)(element) : document.body;
                        if (!el) throw new Error("Could not find element to open container into");
                        if (_this33.component.containerTemplate) {
                            var container = _this33.renderTemplate(_this33.component.containerTemplate, {
                                container: el
                            });
                            _this33.container = container;
                            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.t)(_this33.container);
                            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.B)(el, _this33.container);
                            if (_this33.driver.renderedIntoContainerTemplate) {
                                _this33.element = _this33.getOutlet();
                                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.t)(_this33.element);
                                if (!_this33.element) throw new Error("Could not find element to render component into");
                                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.t)(_this33.element);
                            }
                            _this33.clean.register("destroyContainerTemplate", function() {
                                _this33.container && _this33.container.parentNode && _this33.container.parentNode.removeChild(_this33.container);
                                delete _this33.container;
                            });
                        } else if (_this33.driver.renderedIntoContainerTemplate) throw new Error("containerTemplate needed to render " + _this33.context);
                    });
                }
            }, {
                key: "cancelContainerEvents",
                value: function() {
                    this.clean.run("destroyContainerEvents");
                }
            }, {
                key: "destroy",
                value: function() {
                    var _this34 = this;
                    return __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__.a.try(function() {
                        if (_this34.clean.hasTasks()) {
                            _this34.component.log("destroy");
                            __WEBPACK_IMPORTED_MODULE_0_beaver_logger_client__.f();
                            return _this34.clean.all();
                        }
                    });
                }
            }, {
                key: "tryInit",
                value: function(method) {
                    var _this35 = this;
                    return __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__.a.try(method).catch(function(err) {
                        _this35.onInit.reject(err);
                        throw err;
                    }).then(function() {
                        return _this35.onInit;
                    });
                }
            }, {
                key: "error",
                value: function(err) {
                    var _this36 = this;
                    return __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__.a.try(function() {
                        _this36.handledErrors = _this36.handledErrors || [];
                        if (-1 === _this36.handledErrors.indexOf(err)) {
                            _this36.handledErrors.push(err);
                            _this36.onInit.reject(err);
                            return _this36.destroy();
                        }
                    }).then(function() {
                        if (_this36.props.onError) return _this36.props.onError(err);
                    }).catch(function(errErr) {
                        throw new Error("An error was encountered while handling error:\n\n " + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.o)(err) + "\n\n" + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.o)(errErr));
                    }).then(function() {
                        if (!_this36.props.onError) throw err;
                    });
                }
            }, {
                key: "driver",
                get: function() {
                    if (!this.context) throw new Error("Context not set");
                    return __WEBPACK_IMPORTED_MODULE_8__drivers__.a[this.context];
                }
            } ], [ {
                key: "destroyAll",
                value: function() {
                    for (var results = []; ParentComponent.activeComponents.length; ) results.push(ParentComponent.activeComponents[0].destroy());
                    return __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__.a.all(results).then(__WEBPACK_IMPORTED_MODULE_6__lib__.n);
                }
            } ]);
            return ParentComponent;
        }(__WEBPACK_IMPORTED_MODULE_4__base__.a), _applyDecoratedDescriptor(_class.prototype, "getOutlet", [ __WEBPACK_IMPORTED_MODULE_6__lib__.C ], Object.getOwnPropertyDescriptor(_class.prototype, "getOutlet"), _class.prototype), 
        _applyDecoratedDescriptor(_class.prototype, "prefetch", [ __WEBPACK_IMPORTED_MODULE_6__lib__.C ], Object.getOwnPropertyDescriptor(_class.prototype, "prefetch"), _class.prototype), 
        _applyDecoratedDescriptor(_class.prototype, "loadHTML", [ __WEBPACK_IMPORTED_MODULE_6__lib__.C ], Object.getOwnPropertyDescriptor(_class.prototype, "loadHTML"), _class.prototype), 
        _applyDecoratedDescriptor(_class.prototype, "buildUrl", [ __WEBPACK_IMPORTED_MODULE_6__lib__.C ], Object.getOwnPropertyDescriptor(_class.prototype, "buildUrl"), _class.prototype), 
        _applyDecoratedDescriptor(_class.prototype, "open", [ __WEBPACK_IMPORTED_MODULE_6__lib__.C ], Object.getOwnPropertyDescriptor(_class.prototype, "open"), _class.prototype), 
        _applyDecoratedDescriptor(_class.prototype, "openPrerender", [ __WEBPACK_IMPORTED_MODULE_6__lib__.C ], Object.getOwnPropertyDescriptor(_class.prototype, "openPrerender"), _class.prototype), 
        _applyDecoratedDescriptor(_class.prototype, "switchPrerender", [ __WEBPACK_IMPORTED_MODULE_6__lib__.C ], Object.getOwnPropertyDescriptor(_class.prototype, "switchPrerender"), _class.prototype), 
        _applyDecoratedDescriptor(_class.prototype, "close", [ __WEBPACK_IMPORTED_MODULE_6__lib__.C ], Object.getOwnPropertyDescriptor(_class.prototype, "close"), _class.prototype), 
        _applyDecoratedDescriptor(_class.prototype, "closeContainer", [ __WEBPACK_IMPORTED_MODULE_6__lib__.C ], Object.getOwnPropertyDescriptor(_class.prototype, "closeContainer"), _class.prototype), 
        _applyDecoratedDescriptor(_class.prototype, "destroyContainer", [ __WEBPACK_IMPORTED_MODULE_6__lib__.C ], Object.getOwnPropertyDescriptor(_class.prototype, "destroyContainer"), _class.prototype), 
        _applyDecoratedDescriptor(_class.prototype, "closeComponent", [ __WEBPACK_IMPORTED_MODULE_6__lib__.C ], Object.getOwnPropertyDescriptor(_class.prototype, "closeComponent"), _class.prototype), 
        _applyDecoratedDescriptor(_class.prototype, "showContainer", [ __WEBPACK_IMPORTED_MODULE_6__lib__.C ], Object.getOwnPropertyDescriptor(_class.prototype, "showContainer"), _class.prototype), 
        _applyDecoratedDescriptor(_class.prototype, "showComponent", [ __WEBPACK_IMPORTED_MODULE_6__lib__.C ], Object.getOwnPropertyDescriptor(_class.prototype, "showComponent"), _class.prototype), 
        _applyDecoratedDescriptor(_class.prototype, "hideContainer", [ __WEBPACK_IMPORTED_MODULE_6__lib__.C ], Object.getOwnPropertyDescriptor(_class.prototype, "hideContainer"), _class.prototype), 
        _applyDecoratedDescriptor(_class.prototype, "hideComponent", [ __WEBPACK_IMPORTED_MODULE_6__lib__.C ], Object.getOwnPropertyDescriptor(_class.prototype, "hideComponent"), _class.prototype), 
        _applyDecoratedDescriptor(_class.prototype, "createPrerenderTemplate", [ __WEBPACK_IMPORTED_MODULE_6__lib__.C ], Object.getOwnPropertyDescriptor(_class.prototype, "createPrerenderTemplate"), _class.prototype), 
        _applyDecoratedDescriptor(_class.prototype, "openContainer", [ __WEBPACK_IMPORTED_MODULE_6__lib__.C ], Object.getOwnPropertyDescriptor(_class.prototype, "openContainer"), _class.prototype), 
        _class);
        ParentComponent.activeComponents = [];
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var __WEBPACK_IMPORTED_MODULE_0__receive__ = __webpack_require__(45);
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return __WEBPACK_IMPORTED_MODULE_0__receive__.a;
        });
        __webpack_require__.d(__webpack_exports__, "b", function() {
            return __WEBPACK_IMPORTED_MODULE_0__receive__.b;
        });
        var __WEBPACK_IMPORTED_MODULE_1__send__ = __webpack_require__(32);
        __webpack_require__.d(__webpack_exports__, "e", function() {
            return __WEBPACK_IMPORTED_MODULE_1__send__.a;
        });
        var __WEBPACK_IMPORTED_MODULE_2__listeners__ = __webpack_require__(31);
        __webpack_require__.d(__webpack_exports__, "c", function() {
            return __WEBPACK_IMPORTED_MODULE_2__listeners__.d;
        });
        __webpack_require__.d(__webpack_exports__, "d", function() {
            return __WEBPACK_IMPORTED_MODULE_2__listeners__.e;
        });
        __webpack_require__.d(__webpack_exports__, "f", function() {
            return __WEBPACK_IMPORTED_MODULE_2__listeners__.c;
        });
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function getInternalProps() {
            return {
                env: {
                    type: "string",
                    required: !1,
                    queryParam: !0,
                    def: function() {
                        return this.defaultEnv;
                    }
                },
                uid: {
                    type: "string",
                    def: function() {
                        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.i)();
                    },
                    queryParam: !0
                },
                logLevel: {
                    type: "string",
                    required: !1,
                    queryParam: !0,
                    def: function() {
                        return this.defaultLogLevel;
                    }
                },
                url: {
                    type: "string",
                    required: !1,
                    promise: !0,
                    sendToChild: !1
                },
                version: {
                    type: "string",
                    required: !1,
                    queryParam: !0
                },
                timeout: {
                    type: "number",
                    required: !1,
                    sendToChild: !1
                },
                onDisplay: {
                    type: "function",
                    required: !1,
                    noop: !0,
                    promisify: !0,
                    memoize: !0,
                    sendToChild: !1
                },
                onEnter: {
                    type: "function",
                    required: !1,
                    noop: !0,
                    promisify: !0,
                    sendToChild: !1
                },
                onRender: {
                    type: "function",
                    required: !1,
                    noop: !0,
                    promisify: !0,
                    sendToChild: !1
                },
                onClose: {
                    type: "function",
                    required: !1,
                    noop: !0,
                    once: !0,
                    promisify: !0,
                    sendToChild: !1
                },
                onTimeout: {
                    type: "function",
                    required: !1,
                    memoize: !0,
                    promisify: !0,
                    sendToChild: !1,
                    def: function() {
                        return function(err) {
                            if (this.props.onError) return this.props.onError(err);
                            throw err;
                        };
                    }
                },
                onError: {
                    type: "function",
                    required: !1,
                    promisify: !0,
                    sendToChild: !0,
                    once: !0
                }
            };
        }
        __webpack_exports__.a = getInternalProps;
        var __WEBPACK_IMPORTED_MODULE_1__lib__ = (__webpack_require__(1), __webpack_require__(3));
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return config;
        });
        __webpack_require__.d(__webpack_exports__, "b", function() {
            return logLevels;
        });
        var config = {
            uri: "",
            prefix: "",
            initial_state_name: "init",
            flushInterval: 6e5,
            debounceInterval: 10,
            sizeLimit: 300,
            silent: !1,
            heartbeat: !0,
            heartbeatConsoleLog: !0,
            heartbeatInterval: 5e3,
            heartbeatTooBusy: !1,
            heartbeatTooBusyThreshold: 1e4,
            logLevel: "warn",
            autoLog: [ "warn", "error" ],
            logUnload: !0,
            logPerformance: !0
        }, logLevels = [ "error", "warn", "info", "debug" ];
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function PopupOpenError(message) {
            this.message = message;
        }
        function IntegrationError(message) {
            this.message = message;
        }
        function RenderError(message) {
            this.message = message;
        }
        __webpack_exports__.a = PopupOpenError;
        __webpack_exports__.b = IntegrationError;
        __webpack_exports__.c = RenderError;
        PopupOpenError.prototype = Object.create(Error.prototype);
        IntegrationError.prototype = Object.create(Error.prototype);
        RenderError.prototype = Object.create(Error.prototype);
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function addPayloadBuilder(builder) {
            payloadBuilders.push(builder);
        }
        function addMetaBuilder(builder) {
            metaBuilders.push(builder);
        }
        function addTrackingBuilder(builder) {
            trackingBuilders.push(builder);
        }
        function addHeaderBuilder(builder) {
            headerBuilders.push(builder);
        }
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return payloadBuilders;
        });
        __webpack_require__.d(__webpack_exports__, "b", function() {
            return metaBuilders;
        });
        __webpack_require__.d(__webpack_exports__, "c", function() {
            return trackingBuilders;
        });
        __webpack_require__.d(__webpack_exports__, "d", function() {
            return headerBuilders;
        });
        __webpack_exports__.e = addPayloadBuilder;
        __webpack_exports__.f = addMetaBuilder;
        __webpack_exports__.g = addTrackingBuilder;
        __webpack_exports__.h = addHeaderBuilder;
        var payloadBuilders = [], metaBuilders = [], trackingBuilders = [], headerBuilders = [];
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function getTransport() {
            return transport;
        }
        function setTransport(newTransport) {
            transport = newTransport;
        }
        function print(level, event, payload) {
            if (!loaded) return setTimeout(function() {
                return print(level, event, payload);
            }, 1);
            if (window.console && window.console.log) {
                var logLevel = window.LOG_LEVEL || __WEBPACK_IMPORTED_MODULE_2__config__.a.logLevel;
                if (!(__WEBPACK_IMPORTED_MODULE_2__config__.b.indexOf(level) > __WEBPACK_IMPORTED_MODULE_2__config__.b.indexOf(logLevel))) {
                    payload = payload || {};
                    var args = [ event ];
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__.f)() && (payload = JSON.stringify(payload));
                    args.push(payload);
                    (payload.error || payload.warning) && args.push("\n\n", payload.error || payload.warning);
                    try {
                        window.console[level] && window.console[level].apply ? window.console[level].apply(window.console, args) : window.console.log && window.console.log.apply && window.console.log.apply(window.console, args);
                    } catch (err) {}
                }
            }
        }
        function immediateFlush() {
            var _ref = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, _ref$fireAndForget = _ref.fireAndForget, fireAndForget = void 0 !== _ref$fireAndForget && _ref$fireAndForget;
            if (__WEBPACK_IMPORTED_MODULE_2__config__.a.uri) {
                var hasBuffer = buffer.length, hasTracking = tracking.length;
                if (hasBuffer || hasTracking) {
                    for (var meta = {}, _iterator = __WEBPACK_IMPORTED_MODULE_1__builders__.b, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                        var _ref2;
                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref2 = _iterator[_i++];
                        } else {
                            _i = _iterator.next();
                            if (_i.done) break;
                            _ref2 = _i.value;
                        }
                        var builder = _ref2;
                        try {
                            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__.d)(meta, builder(), !1);
                        } catch (err) {
                            console.error("Error in custom meta builder:", err.stack || err.toString());
                        }
                    }
                    for (var headers = {}, _iterator2 = __WEBPACK_IMPORTED_MODULE_1__builders__.d, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                        var _ref3;
                        if (_isArray2) {
                            if (_i2 >= _iterator2.length) break;
                            _ref3 = _iterator2[_i2++];
                        } else {
                            _i2 = _iterator2.next();
                            if (_i2.done) break;
                            _ref3 = _i2.value;
                        }
                        var _builder = _ref3;
                        try {
                            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__.d)(headers, _builder(), !1);
                        } catch (err) {
                            console.error("Error in custom header builder:", err.stack || err.toString());
                        }
                    }
                    var events = buffer, req = transport(headers, {
                        events: events,
                        meta: meta,
                        tracking: tracking
                    }, {
                        fireAndForget: fireAndForget
                    });
                    buffer = [];
                    tracking = [];
                    return req;
                }
            }
        }
        function enqueue(level, event, payload) {
            buffer.push({
                level: level,
                event: event,
                payload: payload
            });
            __WEBPACK_IMPORTED_MODULE_2__config__.a.autoLog.indexOf(level) > -1 && _flush();
        }
        function log(level, event, payload) {
            __WEBPACK_IMPORTED_MODULE_2__config__.a.prefix && (event = __WEBPACK_IMPORTED_MODULE_2__config__.a.prefix + "_" + event);
            payload = payload || {};
            "string" == typeof payload ? payload = {
                message: payload
            } : payload instanceof Error && (payload = {
                error: payload.stack || payload.toString()
            });
            try {
                JSON.stringify(payload);
            } catch (err) {
                return;
            }
            payload.timestamp = Date.now();
            for (var _iterator3 = __WEBPACK_IMPORTED_MODULE_1__builders__.a, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                var _ref4;
                if (_isArray3) {
                    if (_i3 >= _iterator3.length) break;
                    _ref4 = _iterator3[_i3++];
                } else {
                    _i3 = _iterator3.next();
                    if (_i3.done) break;
                    _ref4 = _i3.value;
                }
                var builder = _ref4;
                try {
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__.d)(payload, builder(), !1);
                } catch (err) {
                    console.error("Error in custom payload builder:", err.stack || err.toString());
                }
            }
            __WEBPACK_IMPORTED_MODULE_2__config__.a.silent || print(level, event, payload);
            buffer.length === __WEBPACK_IMPORTED_MODULE_2__config__.a.sizeLimit ? enqueue("info", "logger_max_buffer_length") : buffer.length < __WEBPACK_IMPORTED_MODULE_2__config__.a.sizeLimit && enqueue(level, event, payload);
        }
        function prefix(name) {
            return {
                debug: function(event, payload) {
                    return log("debug", name + "_" + event, payload);
                },
                info: function(event, payload) {
                    return log("info", name + "_" + event, payload);
                },
                warn: function(event, payload) {
                    return log("warn", name + "_" + event, payload);
                },
                error: function(event, payload) {
                    return log("error", name + "_" + event, payload);
                },
                track: function(payload) {
                    return _track(payload);
                },
                flush: function() {
                    return _flush();
                }
            };
        }
        function debug(event, payload) {
            return log("debug", event, payload);
        }
        function info(event, payload) {
            return log("info", event, payload);
        }
        function warn(event, payload) {
            return log("warn", event, payload);
        }
        function error(event, payload) {
            return log("error", event, payload);
        }
        function _track(payload) {
            if (payload) {
                try {
                    JSON.stringify(payload);
                } catch (err) {
                    return;
                }
                for (var _iterator4 = __WEBPACK_IMPORTED_MODULE_1__builders__.c, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator](); ;) {
                    var _ref5;
                    if (_isArray4) {
                        if (_i4 >= _iterator4.length) break;
                        _ref5 = _iterator4[_i4++];
                    } else {
                        _i4 = _iterator4.next();
                        if (_i4.done) break;
                        _ref5 = _i4.value;
                    }
                    var builder = _ref5;
                    try {
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__.d)(payload, builder(), !1);
                    } catch (err) {
                        console.error("Error in custom tracking builder:", err.stack || err.toString());
                    }
                }
                print("debug", "tracking", payload);
                tracking.push(payload);
            }
        }
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return _track;
        });
        __webpack_require__.d(__webpack_exports__, "b", function() {
            return buffer;
        });
        __webpack_require__.d(__webpack_exports__, "c", function() {
            return tracking;
        });
        __webpack_exports__.d = getTransport;
        __webpack_exports__.e = setTransport;
        __webpack_exports__.f = print;
        __webpack_exports__.g = immediateFlush;
        __webpack_require__.d(__webpack_exports__, "h", function() {
            return _flush;
        });
        __webpack_exports__.i = log;
        __webpack_exports__.j = prefix;
        __webpack_exports__.k = debug;
        __webpack_exports__.l = info;
        __webpack_exports__.m = warn;
        __webpack_exports__.n = error;
        var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(17), __WEBPACK_IMPORTED_MODULE_1__builders__ = __webpack_require__(15), __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(13), _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        }, buffer = [], tracking = [];
        Function.prototype.bind && window.console && "object" === _typeof(console.log) && [ "log", "info", "warn", "error" ].forEach(function(method) {
            console[method] = this.bind(console[method], console);
        }, Function.prototype.call);
        var transport = function(headers, data, options) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__.e)("post", __WEBPACK_IMPORTED_MODULE_2__config__.a.uri, headers, data, options);
        }, loaded = !1;
        setTimeout(function() {
            loaded = !0;
        }, 1);
        var _flush = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__.g)(immediateFlush, __WEBPACK_IMPORTED_MODULE_2__config__.a.debounceInterval);
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function extend(dest, src) {
            var over = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
            dest = dest || {};
            src = src || {};
            for (var i in src) src.hasOwnProperty(i) && (!over && dest.hasOwnProperty(i) || (dest[i] = src[i]));
            return dest;
        }
        function isSameProtocol(url) {
            return window.location.protocol === url.split("/")[0];
        }
        function isSameDomain(url) {
            var match = url.match(/https?:\/\/[^\/]+/);
            return !match || match[0] === window.location.protocol + "//" + window.location.host;
        }
        function ajax(method, url) {
            var headers = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, data = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}, _ref = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {}, _ref$fireAndForget = _ref.fireAndForget, fireAndForget = void 0 !== _ref$fireAndForget && _ref$fireAndForget;
            return new __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__.a(function(resolve) {
                var XRequest = window.XMLHttpRequest || window.ActiveXObject;
                if (window.XDomainRequest && !isSameDomain(url)) {
                    if (!isSameProtocol(url)) return resolve();
                    XRequest = window.XDomainRequest;
                }
                var req = new XRequest("MSXML2.XMLHTTP.3.0");
                req.open(method.toUpperCase(), url, !0);
                if ("function" == typeof req.setRequestHeader) {
                    req.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                    req.setRequestHeader("Content-type", "application/json");
                    for (var headerName in headers) headers.hasOwnProperty(headerName) && req.setRequestHeader(headerName, headers[headerName]);
                }
                fireAndForget ? resolve() : req.onreadystatechange = function() {
                    req.readyState > 3 && resolve();
                };
                req.send(JSON.stringify(data).replace(/&/g, "%26"));
            });
        }
        function promiseDebounce(method, interval) {
            var debounce = {};
            return function() {
                var args = arguments;
                if (debounce.timeout) {
                    clearTimeout(debounce.timeout);
                    delete debounce.timeout;
                }
                debounce.timeout = setTimeout(function() {
                    var resolver = debounce.resolver, rejector = debounce.rejector;
                    delete debounce.promise;
                    delete debounce.resolver;
                    delete debounce.rejector;
                    delete debounce.timeout;
                    return __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__.a.resolve().then(function() {
                        return method.apply(null, args);
                    }).then(resolver, rejector);
                }, interval);
                debounce.promise = debounce.promise || new __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__.a(function(resolver, rejector) {
                    debounce.resolver = resolver;
                    debounce.rejector = rejector;
                });
                return debounce.promise;
            };
        }
        function safeInterval(method, time) {
            function loop() {
                timeout = setTimeout(function() {
                    method();
                    loop();
                }, time);
            }
            var timeout = void 0;
            loop();
            return {
                cancel: function() {
                    clearTimeout(timeout);
                }
            };
        }
        function uniqueID() {
            var chars = "0123456789abcdef";
            return "xxxxxxxxxx".replace(/./g, function() {
                return chars.charAt(Math.floor(Math.random() * chars.length));
            });
        }
        function isIE() {
            return Boolean(window.document.documentMode);
        }
        __webpack_exports__.d = extend;
        __webpack_exports__.e = ajax;
        __webpack_exports__.g = promiseDebounce;
        __webpack_require__.d(__webpack_exports__, "c", function() {
            return windowReady;
        });
        __webpack_exports__.b = safeInterval;
        __webpack_exports__.a = uniqueID;
        __webpack_exports__.f = isIE;
        var __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__ = __webpack_require__(1), windowReady = new __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__.a(function(resolve) {
            "undefined" != typeof document && "complete" === document.readyState && resolve();
            window.addEventListener && window.addEventListener("load", resolve);
        });
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function init() {
            if (!__WEBPACK_IMPORTED_MODULE_2__global__.a.initialized) {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__drivers__.a)();
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lib__.a)();
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lib__.b)();
            }
            __WEBPACK_IMPORTED_MODULE_2__global__.a.initialized = !0;
        }
        Object.defineProperty(__webpack_exports__, "__esModule", {
            value: !0
        });
        __webpack_exports__.init = init;
        var __WEBPACK_IMPORTED_MODULE_0__lib__ = __webpack_require__(9), __WEBPACK_IMPORTED_MODULE_1__drivers__ = __webpack_require__(11), __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(7), __WEBPACK_IMPORTED_MODULE_3__clean__ = __webpack_require__(43);
        __webpack_require__.d(__webpack_exports__, "cleanUpWindow", function() {
            return __WEBPACK_IMPORTED_MODULE_3__clean__.a;
        });
        var __WEBPACK_IMPORTED_MODULE_4__public__ = __webpack_require__(52);
        __webpack_require__.d(__webpack_exports__, "parent", function() {
            return __WEBPACK_IMPORTED_MODULE_4__public__.a;
        });
        __webpack_require__.d(__webpack_exports__, "bridge", function() {
            return __WEBPACK_IMPORTED_MODULE_4__public__.b;
        });
        __webpack_require__.d(__webpack_exports__, "send", function() {
            return __WEBPACK_IMPORTED_MODULE_4__public__.c;
        });
        __webpack_require__.d(__webpack_exports__, "request", function() {
            return __WEBPACK_IMPORTED_MODULE_4__public__.d;
        });
        __webpack_require__.d(__webpack_exports__, "sendToParent", function() {
            return __WEBPACK_IMPORTED_MODULE_4__public__.e;
        });
        __webpack_require__.d(__webpack_exports__, "client", function() {
            return __WEBPACK_IMPORTED_MODULE_4__public__.f;
        });
        __webpack_require__.d(__webpack_exports__, "on", function() {
            return __WEBPACK_IMPORTED_MODULE_4__public__.g;
        });
        __webpack_require__.d(__webpack_exports__, "listen", function() {
            return __WEBPACK_IMPORTED_MODULE_4__public__.h;
        });
        __webpack_require__.d(__webpack_exports__, "once", function() {
            return __WEBPACK_IMPORTED_MODULE_4__public__.i;
        });
        __webpack_require__.d(__webpack_exports__, "listener", function() {
            return __WEBPACK_IMPORTED_MODULE_4__public__.j;
        });
        __webpack_require__.d(__webpack_exports__, "CONFIG", function() {
            return __WEBPACK_IMPORTED_MODULE_4__public__.k;
        });
        __webpack_require__.d(__webpack_exports__, "CONSTANTS", function() {
            return __WEBPACK_IMPORTED_MODULE_4__public__.l;
        });
        __webpack_require__.d(__webpack_exports__, "disable", function() {
            return __WEBPACK_IMPORTED_MODULE_4__public__.m;
        });
        var __WEBPACK_IMPORTED_MODULE_5_zalgo_promise_src__ = __webpack_require__(1);
        __webpack_require__.d(__webpack_exports__, "Promise", function() {
            return __WEBPACK_IMPORTED_MODULE_5_zalgo_promise_src__.a;
        });
        init();
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function stringifyError(err) {
            if (!err) return "<unknown error: " + Object.prototype.toString.call(err) + ">";
            if ("string" == typeof err) return err;
            if (err instanceof Error) {
                var stack = err && err.stack, message = err && err.message;
                if (stack && message) return -1 !== stack.indexOf(message) ? stack : message + "\n" + stack;
                if (stack) return stack;
                if (message) return message;
            }
            return "function" == typeof err.toString ? err.toString() : Object.prototype.toString.call(err);
        }
        function noop() {}
        function addEventListener(obj, event, handler) {
            obj.addEventListener ? obj.addEventListener(event, handler) : obj.attachEvent("on" + event, handler);
            return {
                cancel: function() {
                    obj.removeEventListener ? obj.removeEventListener(event, handler) : obj.detachEvent("on" + event, handler);
                }
            };
        }
        function uniqueID() {
            var chars = "0123456789abcdef";
            return "xxxxxxxxxx".replace(/./g, function() {
                return chars.charAt(Math.floor(Math.random() * chars.length));
            });
        }
        function eachArray(item, callback) {
            for (var i = 0; i < item.length; i++) callback(item[i], i);
        }
        function eachObject(item, callback) {
            for (var _key in item) item.hasOwnProperty(_key) && callback(item[_key], _key);
        }
        function each(item, callback) {
            Array.isArray(item) ? eachArray(item, callback) : "object" === (void 0 === item ? "undefined" : _typeof(item)) && null !== item && eachObject(item, callback);
        }
        function replaceObject(item, callback) {
            var depth = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
            if (depth >= 100) throw new Error("Self-referential object passed, or object contained too many layers");
            var newobj = void 0;
            if ("object" !== (void 0 === item ? "undefined" : _typeof(item)) || null === item || Array.isArray(item)) {
                if (!Array.isArray(item)) throw new Error("Invalid type: " + (void 0 === item ? "undefined" : _typeof(item)));
                newobj = [];
            } else newobj = {};
            each(item, function(childItem, key) {
                var result = callback(childItem, key);
                void 0 !== result ? newobj[key] = result : "object" === (void 0 === childItem ? "undefined" : _typeof(childItem)) && null !== childItem ? newobj[key] = replaceObject(childItem, callback, depth + 1) : newobj[key] = childItem;
            });
            return newobj;
        }
        function safeInterval(method, time) {
            function runInterval() {
                timeout = setTimeout(runInterval, time);
                method.call();
            }
            var timeout = void 0;
            timeout = setTimeout(runInterval, time);
            return {
                cancel: function() {
                    clearTimeout(timeout);
                }
            };
        }
        function isRegex(item) {
            return "[object RegExp]" === Object.prototype.toString.call(item);
        }
        function getWindowType() {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_cross_domain_utils_src__.g)() ? __WEBPACK_IMPORTED_MODULE_2__conf__.b.WINDOW_TYPES.POPUP : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_cross_domain_utils_src__.h)() ? __WEBPACK_IMPORTED_MODULE_2__conf__.b.WINDOW_TYPES.IFRAME : __WEBPACK_IMPORTED_MODULE_2__conf__.b.WINDOW_TYPES.FULLPAGE;
        }
        function jsonStringify(obj, replacer, indent) {
            var objectToJSON = void 0, arrayToJSON = void 0;
            try {
                if ("{}" !== JSON.stringify({})) {
                    objectToJSON = Object.prototype.toJSON;
                    delete Object.prototype.toJSON;
                }
                if ("{}" !== JSON.stringify({})) throw new Error("Can not correctly serialize JSON objects");
                if ("[]" !== JSON.stringify([])) {
                    arrayToJSON = Array.prototype.toJSON;
                    delete Array.prototype.toJSON;
                }
                if ("[]" !== JSON.stringify([])) throw new Error("Can not correctly serialize JSON objects");
            } catch (err) {
                throw new Error("Can not repair JSON.stringify: " + err.message);
            }
            var result = JSON.stringify.call(this, obj, replacer, indent);
            try {
                objectToJSON && (Object.prototype.toJSON = objectToJSON);
                arrayToJSON && (Array.prototype.toJSON = arrayToJSON);
            } catch (err) {
                throw new Error("Can not repair JSON.stringify: " + err.message);
            }
            return result;
        }
        function jsonParse(item) {
            return JSON.parse(item);
        }
        __webpack_exports__.b = stringifyError;
        __webpack_require__.d(__webpack_exports__, "e", function() {
            return once;
        });
        __webpack_exports__.j = noop;
        __webpack_exports__.i = addEventListener;
        __webpack_exports__.f = uniqueID;
        __webpack_exports__.g = replaceObject;
        __webpack_exports__.k = safeInterval;
        __webpack_exports__.a = isRegex;
        __webpack_exports__.d = getWindowType;
        __webpack_exports__.c = jsonStringify;
        __webpack_exports__.h = jsonParse;
        var __WEBPACK_IMPORTED_MODULE_1_cross_domain_utils_src__ = (__webpack_require__(6), 
        __webpack_require__(0)), __WEBPACK_IMPORTED_MODULE_2__conf__ = __webpack_require__(4), _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        }, once = function(method) {
            if (!method) return method;
            var called = !1;
            return function() {
                if (!called) {
                    called = !0;
                    return method.apply(this, arguments);
                }
            };
        };
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function cleanup(obj) {
            var tasks = [], cleaned = !1;
            return {
                set: function(name, item) {
                    if (cleaned) return item;
                    obj[name] = item;
                    this.register(function() {
                        delete obj[name];
                    });
                    return item;
                },
                register: function(name, method) {
                    if ("function" == typeof name) {
                        method = name;
                        name = "<anonymous-cleanup-handler>";
                    }
                    if ("function" != typeof method) throw new Error("Expected to be passed function to clean.register");
                    cleaned ? method() : tasks.push({
                        complete: !1,
                        name: name,
                        run: function() {
                            if (!this.complete) {
                                this.complete = !0;
                                method && method();
                            }
                        }
                    });
                },
                hasTasks: function() {
                    return Boolean(tasks.filter(function(item) {
                        return !item.complete;
                    }).length);
                },
                all: function() {
                    var results = [];
                    cleaned = !0;
                    for (;tasks.length; ) results.push(tasks.pop().run());
                    return __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__.a.all(results).then(function() {});
                },
                run: function(name) {
                    for (var results = [], _iterator = tasks, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                        var _ref;
                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref = _iterator[_i++];
                        } else {
                            _i = _iterator.next();
                            if (_i.done) break;
                            _ref = _i.value;
                        }
                        var item = _ref;
                        item.name === name && results.push(item.run());
                    }
                    return __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__.a.all(results).then(function() {});
                }
            };
        }
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return BaseComponent;
        });
        var __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__ = __webpack_require__(1), __WEBPACK_IMPORTED_MODULE_1_post_robot_src__ = __webpack_require__(8), __WEBPACK_IMPORTED_MODULE_2__lib__ = __webpack_require__(3), _createClass = (__webpack_require__(2), 
        function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1;
                    descriptor.configurable = !0;
                    "value" in descriptor && (descriptor.writable = !0);
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                protoProps && defineProperties(Constructor.prototype, protoProps);
                staticProps && defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }()), BaseComponent = function() {
            function BaseComponent() {
                _classCallCheck(this, BaseComponent);
                this.clean = cleanup(this);
                this.event = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.D)();
            }
            _createClass(BaseComponent, [ {
                key: "addProp",
                value: function(options, name, def) {
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.E)(options, this, name, def);
                }
            }, {
                key: "on",
                value: function(eventName, handler) {
                    return this.event.on(eventName, handler);
                }
            }, {
                key: "listeners",
                value: function() {
                    throw new Error("Expected listeners to be implemented");
                }
            }, {
                key: "error",
                value: function(err) {
                    throw new Error("Expected error to be implemented - got " + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.o)(err));
                }
            }, {
                key: "listen",
                value: function(win, domain) {
                    var _this = this;
                    if (!win) throw this.component.createError("window to listen to not set");
                    if (!domain) throw new Error("Must pass domain to listen to");
                    if (this.listeners) for (var listeners = this.listeners(), _iterator2 = Object.keys(listeners), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                        var _ref2, _ret = function() {
                            if (_isArray2) {
                                if (_i2 >= _iterator2.length) return "break";
                                _ref2 = _iterator2[_i2++];
                            } else {
                                _i2 = _iterator2.next();
                                if (_i2.done) return "break";
                                _ref2 = _i2.value;
                            }
                            var listenerName = _ref2, name = listenerName.replace(/^xcomponent_/, ""), listener = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_post_robot_src__.on)(listenerName, {
                                window: win,
                                domain: domain,
                                errorHandler: function(err) {
                                    _this.error(err);
                                }
                            }, function(_ref3) {
                                var source = _ref3.source, data = _ref3.data;
                                _this.component.log("listener_" + name);
                                return listeners[listenerName].call(_this, source, data);
                            }), errorListener = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_post_robot_src__.on)(listenerName, {
                                window: win,
                                errorHandler: function(err) {
                                    _this.error(err);
                                }
                            }, function(_ref4) {
                                var origin = _ref4.origin;
                                _ref4.data;
                                _this.component.logError("unexpected_listener_" + name, {
                                    origin: origin,
                                    domain: domain
                                });
                                _this.error(new Error("Unexpected " + name + " message from domain " + origin + " -- expected message from " + domain));
                            });
                            _this.clean.register(function() {
                                listener.cancel();
                                errorListener.cancel();
                            });
                        }();
                        if ("break" === _ret) break;
                    }
                }
            } ]);
            return BaseComponent;
        }();
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function normalize(str) {
            return str.replace(/^[^a-z0-9A-Z]+|[^a-z0-9A-Z]+$/g, "").replace(/[^a-z0-9A-Z]+/g, "_");
        }
        function buildChildWindowName(name, version) {
            var options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            options.id = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.i)();
            options.domain = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__.i)(window);
            var encodedName = normalize(name), encodedVersion = normalize(version), encodedOptions = __WEBPACK_IMPORTED_MODULE_1_hi_base32___default.a.encode(JSON.stringify(options)).replace(/\=/g, "").toLowerCase();
            if (!encodedName) throw new Error("Invalid name: " + name + " - must contain alphanumeric characters");
            if (!encodedVersion) throw new Error("Invalid version: " + version + " - must contain alphanumeric characters");
            return [ __WEBPACK_IMPORTED_MODULE_3__constants__.XCOMPONENT, encodedName, encodedVersion, encodedOptions ].join("__");
        }
        function getParentDomain() {
            return getComponentMeta().domain;
        }
        function getWindowByRef(_ref) {
            var ref = _ref.ref, uid = _ref.uid, distance = _ref.distance, result = void 0;
            ref === __WEBPACK_IMPORTED_MODULE_3__constants__.WINDOW_REFERENCES.OPENER ? result = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__.r)(window) : ref === __WEBPACK_IMPORTED_MODULE_3__constants__.WINDOW_REFERENCES.TOP ? result = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__.s)(window) : ref === __WEBPACK_IMPORTED_MODULE_3__constants__.WINDOW_REFERENCES.PARENT && (result = distance ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__.t)(window, distance) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__.u)(window));
            if (ref === __WEBPACK_IMPORTED_MODULE_3__constants__.WINDOW_REFERENCES.GLOBAL) {
                var ancestor = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__.e)(window);
                if (ancestor) for (var _iterator = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__.v)(ancestor), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                    var _ref2;
                    if (_isArray) {
                        if (_i >= _iterator.length) break;
                        _ref2 = _iterator[_i++];
                    } else {
                        _i = _iterator.next();
                        if (_i.done) break;
                        _ref2 = _i.value;
                    }
                    var frame = _ref2, global = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.P)(frame);
                    if (global && global.windows && global.windows[uid]) {
                        result = global.windows[uid];
                        break;
                    }
                }
            }
            if (!result) throw new Error("Unable to find window by ref");
            return result;
        }
        __webpack_exports__.a = buildChildWindowName;
        __webpack_require__.d(__webpack_exports__, "f", function() {
            return isXComponentWindow;
        });
        __webpack_require__.d(__webpack_exports__, "e", function() {
            return getComponentMeta;
        });
        __webpack_exports__.c = getParentDomain;
        __webpack_require__.d(__webpack_exports__, "b", function() {
            return getParentComponentWindow;
        });
        __webpack_require__.d(__webpack_exports__, "d", function() {
            return getParentRenderWindow;
        });
        var __WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__ = __webpack_require__(0), __WEBPACK_IMPORTED_MODULE_1_hi_base32__ = __webpack_require__(42), __WEBPACK_IMPORTED_MODULE_1_hi_base32___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_hi_base32__), __WEBPACK_IMPORTED_MODULE_2__lib__ = __webpack_require__(3), __WEBPACK_IMPORTED_MODULE_3__constants__ = __webpack_require__(5), _slicedToArray = function() {
            function sliceIterator(arr, i) {
                var _arr = [], _n = !0, _d = !1, _e = void 0;
                try {
                    for (var _s, _i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done); _n = !0) {
                        _arr.push(_s.value);
                        if (i && _arr.length === i) break;
                    }
                } catch (err) {
                    _d = !0;
                    _e = err;
                } finally {
                    try {
                        !_n && _i.return && _i.return();
                    } finally {
                        if (_d) throw _e;
                    }
                }
                return _arr;
            }
            return function(arr, i) {
                if (Array.isArray(arr)) return arr;
                if (Symbol.iterator in Object(arr)) return sliceIterator(arr, i);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
        }(), isXComponentWindow = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.N)(function() {
            if (!window.name) return !1;
            var _window$name$split = window.name.split("__");
            return _slicedToArray(_window$name$split, 1)[0] === __WEBPACK_IMPORTED_MODULE_3__constants__.XCOMPONENT;
        }), getComponentMeta = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.N)(function() {
            if (!window.name) throw new Error("Can not get component meta without window name");
            var _window$name$split3 = window.name.split("__"), _window$name$split4 = _slicedToArray(_window$name$split3, 4), xcomp = _window$name$split4[0], name = _window$name$split4[1], version = _window$name$split4[2], encodedOptions = _window$name$split4[3];
            if (xcomp !== __WEBPACK_IMPORTED_MODULE_3__constants__.XCOMPONENT) throw new Error("Window not rendered by xcomponent - got " + xcomp);
            var componentMeta = void 0;
            try {
                componentMeta = JSON.parse(__WEBPACK_IMPORTED_MODULE_1_hi_base32___default.a.decode(encodedOptions.toUpperCase()));
            } catch (err) {
                throw new Error("Can not decode component-meta");
            }
            componentMeta.name = name;
            componentMeta.version = version.replace(/_/g, ".");
            return componentMeta;
        }), getParentComponentWindow = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.N)(function() {
            var componentMeta = getComponentMeta();
            if (!componentMeta) throw new Error("Can not get parent component window - window not rendered by xcomponent");
            return getWindowByRef(componentMeta.componentParent);
        }), getParentRenderWindow = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.N)(function() {
            var componentMeta = getComponentMeta();
            if (!componentMeta) throw new Error("Can not get parent component window - window not rendered by xcomponent");
            return getWindowByRef(componentMeta.renderParent);
        });
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function create(options) {
            return new __WEBPACK_IMPORTED_MODULE_1__component__.a(options);
        }
        function getByTag(tag) {
            return __WEBPACK_IMPORTED_MODULE_1__component__.a.getByTag(tag);
        }
        function destroyAll() {
            return __WEBPACK_IMPORTED_MODULE_2__component_parent__.a.destroyAll();
        }
        Object.defineProperty(__webpack_exports__, "__esModule", {
            value: !0
        });
        __webpack_exports__.create = create;
        __webpack_exports__.getByTag = getByTag;
        __webpack_exports__.destroyAll = destroyAll;
        __webpack_require__.d(__webpack_exports__, "postRobot", function() {
            return postRobot;
        });
        __webpack_require__.d(__webpack_exports__, "CONSTANTS", function() {
            return CONSTANTS;
        });
        var __WEBPACK_IMPORTED_MODULE_1__component__ = (__webpack_require__(1), __webpack_require__(64)), __WEBPACK_IMPORTED_MODULE_2__component_parent__ = __webpack_require__(10), __WEBPACK_IMPORTED_MODULE_3__lib__ = __webpack_require__(3);
        __webpack_require__.d(__webpack_exports__, "getCurrentScriptDir", function() {
            return __WEBPACK_IMPORTED_MODULE_3__lib__.a;
        });
        var __WEBPACK_IMPORTED_MODULE_4_post_robot_src__ = __webpack_require__(8), __WEBPACK_IMPORTED_MODULE_5__error__ = __webpack_require__(14);
        __webpack_require__.d(__webpack_exports__, "PopupOpenError", function() {
            return __WEBPACK_IMPORTED_MODULE_5__error__.a;
        });
        __webpack_require__.d(__webpack_exports__, "IntegrationError", function() {
            return __WEBPACK_IMPORTED_MODULE_5__error__.b;
        });
        __webpack_require__.d(__webpack_exports__, "RenderError", function() {
            return __WEBPACK_IMPORTED_MODULE_5__error__.c;
        });
        var __WEBPACK_IMPORTED_MODULE_6__constants__ = __webpack_require__(5), postRobot = __WEBPACK_IMPORTED_MODULE_4_post_robot_src__, CONSTANTS = __WEBPACK_IMPORTED_MODULE_6__constants__;
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var __WEBPACK_IMPORTED_MODULE_0__interface__ = __webpack_require__(27);
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.logLevels;
        });
        __webpack_require__.d(__webpack_exports__, "b", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.config;
        });
        __webpack_require__.d(__webpack_exports__, "c", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.info;
        });
        __webpack_require__.d(__webpack_exports__, "d", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.warn;
        });
        __webpack_require__.d(__webpack_exports__, "e", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.error;
        });
        __webpack_require__.d(__webpack_exports__, "f", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.flush;
        });
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return log;
        });
        var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(19), __WEBPACK_IMPORTED_MODULE_1__conf__ = __webpack_require__(4), _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        }, LOG_LEVELS = [ "debug", "info", "warn", "error" ];
        Function.prototype.bind && window.console && "object" === _typeof(console.log) && [ "log", "info", "warn", "error" ].forEach(function(method) {
            console[method] = this.bind(console[method], console);
        }, Function.prototype.call);
        var log = {
            clearLogs: function() {
                window.console && window.console.clear && window.console.clear();
                if (__WEBPACK_IMPORTED_MODULE_1__conf__.a.LOG_TO_PAGE) {
                    var container = document.getElementById("postRobotLogs");
                    container && container.parentNode && container.parentNode.removeChild(container);
                }
            },
            writeToPage: function(level, args) {
                setTimeout(function() {
                    var container = document.getElementById("postRobotLogs");
                    if (!container) {
                        container = document.createElement("div");
                        container.id = "postRobotLogs";
                        container.style.cssText = "width: 800px; font-family: monospace; white-space: pre-wrap;";
                        document.body && document.body.appendChild(container);
                    }
                    var el = document.createElement("div"), date = new Date().toString().split(" ")[4], payload = Array.prototype.slice.call(args).map(function(item) {
                        if ("string" == typeof item) return item;
                        if (!item) return Object.prototype.toString.call(item);
                        var json = void 0;
                        try {
                            json = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__.c)(item, null, 2);
                        } catch (e) {
                            json = "[object]";
                        }
                        return "\n\n" + json + "\n\n";
                    }).join(" "), msg = date + " " + level + " " + payload;
                    el.innerHTML = msg;
                    var color = {
                        log: "#ddd",
                        warn: "orange",
                        error: "red",
                        info: "blue",
                        debug: "#aaa"
                    }[level];
                    el.style.cssText = "margin-top: 10px; color: " + color + ";";
                    container.childNodes.length ? container.insertBefore(el, container.childNodes[0]) : container.appendChild(el);
                });
            },
            logLevel: function(level, args) {
                setTimeout(function() {
                    try {
                        var logLevel = window.LOG_LEVEL || __WEBPACK_IMPORTED_MODULE_1__conf__.a.LOG_LEVEL;
                        if (LOG_LEVELS.indexOf(level) < LOG_LEVELS.indexOf(logLevel)) return;
                        args = Array.prototype.slice.call(args);
                        args.unshift("" + window.location.host + window.location.pathname);
                        args.unshift("::");
                        args.unshift("" + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__.d)().toLowerCase());
                        args.unshift("[post-robot]");
                        __WEBPACK_IMPORTED_MODULE_1__conf__.a.LOG_TO_PAGE && log.writeToPage(level, args);
                        if (!window.console) return;
                        window.console[level] || (level = "log");
                        if (!window.console[level]) return;
                        window.console[level].apply(window.console, args);
                    } catch (err) {}
                }, 1);
            },
            debug: function() {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                log.logLevel("debug", args);
            },
            info: function() {
                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
                log.logLevel("info", args);
            },
            warn: function() {
                for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) args[_key3] = arguments[_key3];
                log.logLevel("warn", args);
            },
            error: function() {
                for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) args[_key4] = arguments[_key4];
                log.logLevel("error", args);
            }
        };
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !call || "object" != typeof call && "function" != typeof call ? self : call;
        }
        function _inherits(subClass, superClass) {
            if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            });
            superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
        }
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return ChildComponent;
        });
        var __WEBPACK_IMPORTED_MODULE_0_beaver_logger_client__ = __webpack_require__(23), __WEBPACK_IMPORTED_MODULE_1_cross_domain_utils_src__ = __webpack_require__(0), __WEBPACK_IMPORTED_MODULE_2_post_robot_src__ = __webpack_require__(8), __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__ = __webpack_require__(1), __WEBPACK_IMPORTED_MODULE_4__base__ = __webpack_require__(20), __WEBPACK_IMPORTED_MODULE_5__window__ = __webpack_require__(21), __WEBPACK_IMPORTED_MODULE_6__lib__ = __webpack_require__(3), __WEBPACK_IMPORTED_MODULE_7__constants__ = __webpack_require__(5), __WEBPACK_IMPORTED_MODULE_8__props__ = __webpack_require__(58), __WEBPACK_IMPORTED_MODULE_9__error__ = __webpack_require__(14), _typeof = (__webpack_require__(2), 
        __webpack_require__(12), "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        }), _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1;
                    descriptor.configurable = !0;
                    "value" in descriptor && (descriptor.writable = !0);
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                protoProps && defineProperties(Constructor.prototype, protoProps);
                staticProps && defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }(), ChildComponent = function(_BaseComponent) {
            function ChildComponent(component) {
                _classCallCheck(this, ChildComponent);
                var _this = _possibleConstructorReturn(this, (ChildComponent.__proto__ || Object.getPrototypeOf(ChildComponent)).call(this));
                _this.component = component;
                if (!_this.hasValidParentDomain()) {
                    _this.error(new __WEBPACK_IMPORTED_MODULE_9__error__.c("Can not be rendered by domain: " + _this.getParentDomain()));
                    return _possibleConstructorReturn(_this);
                }
                _this.sendLogsToOpener();
                _this.component.log("construct_child");
                _this.onPropHandlers = [];
                _this.setProps(_this.getInitialProps(), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__window__.c)());
                _this.props.logLevel && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.d)(_this.props.logLevel);
                _this.component.log("init_child");
                _this.setWindows();
                _this.listenForResize();
                _this.onInit = _this.sendToParent(__WEBPACK_IMPORTED_MODULE_7__constants__.POST_MESSAGE.INIT, {
                    exports: _this.exports()
                }).then(function(_ref) {
                    var origin = _ref.origin, data = _ref.data;
                    _this.context = data.context;
                    _this.setProps(data.props, origin);
                    _this.watchForResize();
                    return _this;
                }).catch(function(err) {
                    _this.error(err);
                    throw err;
                });
                return _this;
            }
            _inherits(ChildComponent, _BaseComponent);
            _createClass(ChildComponent, [ {
                key: "listenForResize",
                value: function() {
                    var _this2 = this;
                    window.addEventListener("resize", function() {
                        _this2.sendToParent(__WEBPACK_IMPORTED_MODULE_7__constants__.POST_MESSAGE.ONRESIZE);
                    });
                }
            }, {
                key: "hasValidParentDomain",
                value: function() {
                    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_cross_domain_utils_src__.f)(this.component.allowedParentDomains, this.getParentDomain());
                }
            }, {
                key: "init",
                value: function() {
                    return this.onInit;
                }
            }, {
                key: "getParentDomain",
                value: function() {
                    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__window__.c)();
                }
            }, {
                key: "onProps",
                value: function(handler) {
                    this.onPropHandlers.push(handler);
                }
            }, {
                key: "getParentComponentWindow",
                value: function() {
                    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__window__.b)();
                }
            }, {
                key: "getParentRenderWindow",
                value: function() {
                    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__window__.d)();
                }
            }, {
                key: "getInitialProps",
                value: function() {
                    var _this3 = this, componentMeta = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__window__.e)(), props = componentMeta.props;
                    if (props.type === __WEBPACK_IMPORTED_MODULE_7__constants__.INITIAL_PROPS.RAW) props = props.value; else {
                        if (props.type !== __WEBPACK_IMPORTED_MODULE_7__constants__.INITIAL_PROPS.UID) throw new Error("Unrecognized props type: " + props.type);
                        var parentComponentWindow = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__window__.b)();
                        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_cross_domain_utils_src__.a)(parentComponentWindow)) {
                            if ("file:" === window.location.protocol) throw new Error("Can not get props from file:// domain");
                            throw new Error("Parent component window is on a different domain - expected " + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_cross_domain_utils_src__.i)() + " - can not retrieve props");
                        }
                        var global = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.P)(parentComponentWindow);
                        if (!global) throw new Error("Can not find global for parent component - can not retrieve props");
                        props = global.props[componentMeta.uid];
                    }
                    if (!props) throw new Error("Initial props not found");
                    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.Q)(props, function(_ref2) {
                        var fullKey = _ref2.fullKey, self = _ref2.self, args = _ref2.args;
                        return _this3.onInit.then(function() {
                            var func = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.R)(_this3.props, fullKey);
                            if ("function" != typeof func) throw new Error("Expected " + (void 0 === func ? "undefined" : _typeof(func)) + " to be function");
                            return func.apply(self, args);
                        });
                    });
                }
            }, {
                key: "setProps",
                value: function(props, origin) {
                    var required = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                    this.props = this.props || {};
                    var normalizedProps = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__props__.a)(this.component, props, origin, required);
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.k)(this.props, normalizedProps);
                    window.xprops = this.props;
                    for (var _iterator = this.onPropHandlers, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                        var _ref3;
                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref3 = _iterator[_i++];
                        } else {
                            _i = _iterator.next();
                            if (_i.done) break;
                            _ref3 = _i.value;
                        }
                        _ref3.call(this, this.props);
                    }
                }
            }, {
                key: "sendToParent",
                value: function(name) {
                    var data = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, parentWindow = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__window__.b)();
                    if (!parentWindow) throw new Error("Can not find parent component window to message");
                    this.component.log("send_to_parent_" + name);
                    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_post_robot_src__.send)(parentWindow, name, data, {
                        domain: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__window__.c)()
                    });
                }
            }, {
                key: "setWindows",
                value: function() {
                    if (window.__activeXComponent__) throw this.component.createError("Can not attach multiple components to the same window");
                    window.__activeXComponent__ = this;
                    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__window__.b)()) throw this.component.createError("Can not find parent window");
                    var componentMeta = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__window__.e)();
                    if (componentMeta.tag !== this.component.tag) throw this.component.createError("Parent is " + componentMeta.tag + " - can not attach " + this.component.tag);
                    this.watchForClose();
                }
            }, {
                key: "sendLogsToOpener",
                value: function() {
                }
            }, {
                key: "watchForClose",
                value: function() {
                    var _this4 = this;
                    window.addEventListener("unload", function() {
                        return _this4.checkClose();
                    });
                }
            }, {
                key: "enableAutoResize",
                value: function() {
                    var _ref5 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, _ref5$width = _ref5.width, width = void 0 === _ref5$width || _ref5$width, _ref5$height = _ref5.height, height = void 0 === _ref5$height || _ref5$height;
                    this.autoResize = {
                        width: width,
                        height: height
                    };
                    this.watchForResize();
                }
            }, {
                key: "getAutoResize",
                value: function() {
                    var width = !1, height = !1, autoResize = this.autoResize || this.component.autoResize;
                    if ("object" === (void 0 === autoResize ? "undefined" : _typeof(autoResize))) {
                        width = Boolean(autoResize.width);
                        height = Boolean(autoResize.height);
                    } else if (autoResize) {
                        width = !0;
                        height = !0;
                    }
                    var element = void 0;
                    element = autoResize.element ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.A)(autoResize.element) : window.navigator.userAgent.match(/MSIE (9|10)\./) ? document.body : document.documentElement;
                    return {
                        width: width,
                        height: height,
                        element: element
                    };
                }
            }, {
                key: "watchForResize",
                value: function() {
                    var _this5 = this, _getAutoResize = this.getAutoResize(), width = _getAutoResize.width, height = _getAutoResize.height, element = _getAutoResize.element;
                    if ((width || height) && this.context !== __WEBPACK_IMPORTED_MODULE_7__constants__.CONTEXT_TYPES.POPUP && !this.watchingForResize) {
                        this.watchingForResize = !0;
                        return __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__.a.try(function() {
                            return __WEBPACK_IMPORTED_MODULE_6__lib__.S;
                        }).then(function() {
                            if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.T)(element, {
                                width: width,
                                height: height
                            })) return _this5.resizeToElement(element, {
                                width: width,
                                height: height
                            });
                        }).then(function() {
                            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.U)(function() {
                                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.V)(element, {
                                    width: width,
                                    height: height
                                }).then(function(dimensions) {
                                    return _this5.resizeToElement(element, {
                                        width: width,
                                        height: height
                                    });
                                });
                            });
                        });
                    }
                }
            }, {
                key: "exports",
                value: function() {
                    var self = this;
                    return {
                        updateProps: function(props) {
                            var _this6 = this;
                            return __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__.a.try(function() {
                                return self.setProps(props, _this6.origin, !1);
                            });
                        },
                        close: function() {
                            return __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__.a.try(function() {
                                return self.destroy();
                            });
                        }
                    };
                }
            }, {
                key: "resize",
                value: function(width, height) {
                    var _this7 = this;
                    return __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__.a.resolve().then(function() {
                        _this7.component.log("resize", {
                            width: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.e)(width),
                            height: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.e)(height)
                        });
                        if (_this7.context !== __WEBPACK_IMPORTED_MODULE_7__constants__.CONTEXT_TYPES.POPUP) return _this7.sendToParent(__WEBPACK_IMPORTED_MODULE_7__constants__.POST_MESSAGE.RESIZE, {
                            width: width,
                            height: height
                        }).then(__WEBPACK_IMPORTED_MODULE_6__lib__.n);
                    });
                }
            }, {
                key: "resizeToElement",
                value: function(el, _ref6) {
                    var _this8 = this, width = _ref6.width, height = _ref6.height, history = [];
                    return function resize() {
                        return __WEBPACK_IMPORTED_MODULE_3_zalgo_promise_src__.a.try(function() {
                            for (var tracker = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.W)(el, {
                                width: width,
                                height: height
                            }), _tracker$check = tracker.check(), dimensions = _tracker$check.dimensions, _iterator3 = history, _isArray3 = Array.isArray(_iterator3), _i4 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                                var _ref7;
                                if (_isArray3) {
                                    if (_i4 >= _iterator3.length) break;
                                    _ref7 = _iterator3[_i4++];
                                } else {
                                    _i4 = _iterator3.next();
                                    if (_i4.done) break;
                                    _ref7 = _i4.value;
                                }
                                var size = _ref7, widthMatch = !width || size.width === dimensions.width, heightMatch = !height || size.height === dimensions.height;
                                if (widthMatch && heightMatch) return;
                            }
                            history.push({
                                width: dimensions.width,
                                height: dimensions.height
                            });
                            return _this8.resize(width ? dimensions.width : null, height ? dimensions.height : null).then(function() {
                                if (tracker.check().changed) return resize();
                            });
                        });
                    }();
                }
            }, {
                key: "hide",
                value: function() {
                    return this.sendToParent(__WEBPACK_IMPORTED_MODULE_7__constants__.POST_MESSAGE.HIDE).then(__WEBPACK_IMPORTED_MODULE_6__lib__.n);
                }
            }, {
                key: "show",
                value: function() {
                    return this.sendToParent(__WEBPACK_IMPORTED_MODULE_7__constants__.POST_MESSAGE.SHOW).then(__WEBPACK_IMPORTED_MODULE_6__lib__.n);
                }
            }, {
                key: "userClose",
                value: function() {
                    return this.close(__WEBPACK_IMPORTED_MODULE_7__constants__.CLOSE_REASONS.USER_CLOSED);
                }
            }, {
                key: "close",
                value: function() {
                    var reason = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : __WEBPACK_IMPORTED_MODULE_7__constants__.CLOSE_REASONS.CHILD_CALL;
                    this.component.log("close_child");
                    this.sendToParent(__WEBPACK_IMPORTED_MODULE_7__constants__.POST_MESSAGE.CLOSE, {
                        reason: reason
                    });
                }
            }, {
                key: "checkClose",
                value: function() {
                    this.sendToParent(__WEBPACK_IMPORTED_MODULE_7__constants__.POST_MESSAGE.CHECK_CLOSE);
                }
            }, {
                key: "destroy",
                value: function() {
                    __WEBPACK_IMPORTED_MODULE_0_beaver_logger_client__.f().then(function() {
                        window.close();
                    });
                }
            }, {
                key: "focus",
                value: function() {
                    this.component.log("focus");
                    window.focus();
                }
            }, {
                key: "error",
                value: function(err) {
                    var stringifiedError = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib__.o)(err);
                    this.component.logError("error", {
                        error: stringifiedError
                    });
                    return this.sendToParent(__WEBPACK_IMPORTED_MODULE_7__constants__.POST_MESSAGE.ERROR, {
                        error: stringifiedError
                    }).then(__WEBPACK_IMPORTED_MODULE_6__lib__.n);
                }
            } ]);
            return ChildComponent;
        }(__WEBPACK_IMPORTED_MODULE_4__base__.a);
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function urlEncode(str) {
            return str.replace(/\?/g, "%3F").replace(/\&/g, "%26").replace(/#/g, "%23");
        }
        function dasherizeToCamel(string) {
            return string.replace(/-([a-z])/g, function(g) {
                return g[1].toUpperCase();
            });
        }
        function extend(obj, source) {
            if (!source) return obj;
            for (var key in source) source.hasOwnProperty(key) && (obj[key] = source[key]);
            return obj;
        }
        function values(obj) {
            var results = [];
            for (var key in obj) obj.hasOwnProperty(key) && results.push(obj[key]);
            return results;
        }
        function uniqueID() {
            var chars = "0123456789abcdef";
            return "xxxxxxxxxx".replace(/./g, function() {
                return chars.charAt(Math.floor(Math.random() * chars.length));
            });
        }
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        }
        function get(item, path, def) {
            if (!path) return def;
            for (var pathParts = path.split("."), i = 0; i < pathParts.length; i++) {
                if ("object" !== (void 0 === item ? "undefined" : _typeof(item)) || null === item) return def;
                item = item[pathParts[i]];
            }
            return void 0 === item ? def : item;
        }
        function safeInterval(method, time) {
            function runInterval() {
                timeout = setTimeout(runInterval, time);
                method.call();
            }
            var timeout = void 0;
            timeout = setTimeout(runInterval, time);
            return {
                cancel: function() {
                    clearTimeout(timeout);
                }
            };
        }
        function each(item, callback) {
            if (item) if (item instanceof Array) for (var len = item.length, i = 0; i < len; i++) callback(item[i], i); else if ("object" === (void 0 === item ? "undefined" : _typeof(item))) for (var keys = Object.keys(item), _len = keys.length, _i = 0; _i < _len; _i++) {
                var key = keys[_i];
                callback(item[key], key);
            }
        }
        function replaceObject(obj, callback) {
            var parentKey = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "", newobj = obj instanceof Array ? [] : {};
            each(obj, function(item, key) {
                var fullKey = parentKey ? parentKey + "." + key : key, result = callback(item, key, fullKey);
                void 0 !== result ? newobj[key] = result : "object" === (void 0 === item ? "undefined" : _typeof(item)) && null !== item ? newobj[key] = replaceObject(item, callback, fullKey) : newobj[key] = item;
            });
            return newobj;
        }
        function copyProp(source, target, name, def) {
            if (source.hasOwnProperty(name)) {
                var descriptor = Object.getOwnPropertyDescriptor(source, name);
                Object.defineProperty(target, name, descriptor);
            } else target[name] = def;
        }
        function dotify(obj) {
            var prefix = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", newobj = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            prefix = prefix ? prefix + "." : prefix;
            for (var key in obj) void 0 !== obj[key] && null !== obj[key] && "function" != typeof obj[key] && (obj[key] && Array.isArray(obj[key]) && obj[key].length && obj[key].every(function(val) {
                return "object" !== (void 0 === val ? "undefined" : _typeof(val));
            }) ? newobj["" + prefix + key] = obj[key].join(",") : obj[key] && "object" === _typeof(obj[key]) ? newobj = dotify(obj[key], "" + prefix + key, newobj) : newobj["" + prefix + key] = obj[key].toString());
            return newobj;
        }
        function getObjectID(obj) {
            if (null === obj || void 0 === obj || "object" !== (void 0 === obj ? "undefined" : _typeof(obj)) && "function" != typeof obj) throw new Error("Invalid object");
            var uid = objectIDs.get(obj);
            if (!uid) {
                uid = (void 0 === obj ? "undefined" : _typeof(obj)) + ":" + uniqueID();
                objectIDs.set(obj, uid);
            }
            return uid;
        }
        function stringify(item) {
            return "string" == typeof item ? item : item && "function" == typeof item.toString ? item.toString() : Object.prototype.toString.call(item);
        }
        function stringifyError(err) {
            if (err) {
                var stack = err.stack, message = err.message;
                if ("string" == typeof stack) return stack;
                if ("string" == typeof message) return message;
            }
            return stringify(err);
        }
        function eventEmitter() {
            var triggered = {}, handlers = {};
            return {
                on: function(eventName, handler) {
                    var handlerList = handlers[eventName] = handlers[eventName] || [];
                    handlerList.push(handler);
                    var cancelled = !1;
                    return {
                        cancel: function() {
                            if (!cancelled) {
                                cancelled = !0;
                                handlerList.splice(handlerList.indexOf(handler), 1);
                            }
                        }
                    };
                },
                once: function(eventName, handler) {
                    var listener = this.on(eventName, function() {
                        listener.cancel();
                        handler();
                    });
                    return listener;
                },
                trigger: function(eventName) {
                    var handlerList = handlers[eventName];
                    if (handlerList) for (var _iterator = handlerList, _isArray = Array.isArray(_iterator), _i2 = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                        var _ref;
                        if (_isArray) {
                            if (_i2 >= _iterator.length) break;
                            _ref = _iterator[_i2++];
                        } else {
                            _i2 = _iterator.next();
                            if (_i2.done) break;
                            _ref = _i2.value;
                        }
                        var _handler = _ref;
                        _handler();
                    }
                },
                triggerOnce: function(eventName) {
                    if (!triggered[eventName]) {
                        triggered[eventName] = !0;
                        this.trigger(eventName);
                    }
                }
            };
        }
        __webpack_exports__.f = urlEncode;
        __webpack_exports__.o = dasherizeToCamel;
        __webpack_exports__.e = extend;
        __webpack_exports__.a = values;
        __webpack_exports__.i = uniqueID;
        __webpack_exports__.g = capitalizeFirstLetter;
        __webpack_exports__.n = get;
        __webpack_exports__.h = safeInterval;
        __webpack_exports__.c = replaceObject;
        __webpack_exports__.l = copyProp;
        __webpack_exports__.m = dotify;
        __webpack_exports__.b = getObjectID;
        __webpack_exports__.d = stringify;
        __webpack_exports__.j = stringifyError;
        __webpack_exports__.k = eventEmitter;
        var __WEBPACK_IMPORTED_MODULE_0_cross_domain_safe_weakmap_src__ = __webpack_require__(6), _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        }, objectIDs = new __WEBPACK_IMPORTED_MODULE_0_cross_domain_safe_weakmap_src__.a();
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        Object.defineProperty(__webpack_exports__, "__esModule", {
            value: !0
        });
        var __WEBPACK_IMPORTED_MODULE_0__logger__ = __webpack_require__(16);
        __webpack_require__.d(__webpack_exports__, "track", function() {
            return __WEBPACK_IMPORTED_MODULE_0__logger__.a;
        });
        __webpack_require__.d(__webpack_exports__, "buffer", function() {
            return __WEBPACK_IMPORTED_MODULE_0__logger__.b;
        });
        __webpack_require__.d(__webpack_exports__, "tracking", function() {
            return __WEBPACK_IMPORTED_MODULE_0__logger__.c;
        });
        __webpack_require__.d(__webpack_exports__, "getTransport", function() {
            return __WEBPACK_IMPORTED_MODULE_0__logger__.d;
        });
        __webpack_require__.d(__webpack_exports__, "setTransport", function() {
            return __WEBPACK_IMPORTED_MODULE_0__logger__.e;
        });
        __webpack_require__.d(__webpack_exports__, "print", function() {
            return __WEBPACK_IMPORTED_MODULE_0__logger__.f;
        });
        __webpack_require__.d(__webpack_exports__, "immediateFlush", function() {
            return __WEBPACK_IMPORTED_MODULE_0__logger__.g;
        });
        __webpack_require__.d(__webpack_exports__, "flush", function() {
            return __WEBPACK_IMPORTED_MODULE_0__logger__.h;
        });
        __webpack_require__.d(__webpack_exports__, "log", function() {
            return __WEBPACK_IMPORTED_MODULE_0__logger__.i;
        });
        __webpack_require__.d(__webpack_exports__, "prefix", function() {
            return __WEBPACK_IMPORTED_MODULE_0__logger__.j;
        });
        __webpack_require__.d(__webpack_exports__, "debug", function() {
            return __WEBPACK_IMPORTED_MODULE_0__logger__.k;
        });
        __webpack_require__.d(__webpack_exports__, "info", function() {
            return __WEBPACK_IMPORTED_MODULE_0__logger__.l;
        });
        __webpack_require__.d(__webpack_exports__, "warn", function() {
            return __WEBPACK_IMPORTED_MODULE_0__logger__.m;
        });
        __webpack_require__.d(__webpack_exports__, "error", function() {
            return __WEBPACK_IMPORTED_MODULE_0__logger__.n;
        });
        var __WEBPACK_IMPORTED_MODULE_1__init__ = __webpack_require__(36);
        __webpack_require__.d(__webpack_exports__, "init", function() {
            return __WEBPACK_IMPORTED_MODULE_1__init__.a;
        });
        var __WEBPACK_IMPORTED_MODULE_2__transitions__ = __webpack_require__(37);
        __webpack_require__.d(__webpack_exports__, "startTransition", function() {
            return __WEBPACK_IMPORTED_MODULE_2__transitions__.a;
        });
        __webpack_require__.d(__webpack_exports__, "endTransition", function() {
            return __WEBPACK_IMPORTED_MODULE_2__transitions__.b;
        });
        __webpack_require__.d(__webpack_exports__, "transition", function() {
            return __WEBPACK_IMPORTED_MODULE_2__transitions__.c;
        });
        var __WEBPACK_IMPORTED_MODULE_3__builders__ = __webpack_require__(15);
        __webpack_require__.d(__webpack_exports__, "payloadBuilders", function() {
            return __WEBPACK_IMPORTED_MODULE_3__builders__.a;
        });
        __webpack_require__.d(__webpack_exports__, "metaBuilders", function() {
            return __WEBPACK_IMPORTED_MODULE_3__builders__.b;
        });
        __webpack_require__.d(__webpack_exports__, "trackingBuilders", function() {
            return __WEBPACK_IMPORTED_MODULE_3__builders__.c;
        });
        __webpack_require__.d(__webpack_exports__, "headerBuilders", function() {
            return __WEBPACK_IMPORTED_MODULE_3__builders__.d;
        });
        __webpack_require__.d(__webpack_exports__, "addPayloadBuilder", function() {
            return __WEBPACK_IMPORTED_MODULE_3__builders__.e;
        });
        __webpack_require__.d(__webpack_exports__, "addMetaBuilder", function() {
            return __WEBPACK_IMPORTED_MODULE_3__builders__.f;
        });
        __webpack_require__.d(__webpack_exports__, "addTrackingBuilder", function() {
            return __WEBPACK_IMPORTED_MODULE_3__builders__.g;
        });
        __webpack_require__.d(__webpack_exports__, "addHeaderBuilder", function() {
            return __WEBPACK_IMPORTED_MODULE_3__builders__.h;
        });
        var __WEBPACK_IMPORTED_MODULE_4__config__ = __webpack_require__(13);
        __webpack_require__.d(__webpack_exports__, "config", function() {
            return __WEBPACK_IMPORTED_MODULE_4__config__.a;
        });
        __webpack_require__.d(__webpack_exports__, "logLevels", function() {
            return __WEBPACK_IMPORTED_MODULE_4__config__.b;
        });
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function now() {
            return enablePerformance ? performance.now() : Date.now();
        }
        function timer(startTime) {
            startTime = void 0 !== startTime ? startTime : now();
            return {
                startTime: startTime,
                elapsed: function() {
                    return parseInt(now() - startTime, 10);
                },
                reset: function() {
                    startTime = now();
                }
            };
        }
        function reqStartElapsed() {
            if (enablePerformance) {
                var timing = window.performance.timing;
                return parseInt(timing.connectEnd - timing.navigationStart, 10);
            }
        }
        function initHeartBeat() {
            var heartBeatTimer = timer(), heartbeatCount = 0;
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util__.b)(function() {
                if (!(__WEBPACK_IMPORTED_MODULE_0__config__.a.heartbeatMaxThreshold && heartbeatCount > __WEBPACK_IMPORTED_MODULE_0__config__.a.heartbeatMaxThreshold)) {
                    heartbeatCount += 1;
                    var elapsed = heartBeatTimer.elapsed(), lag = elapsed - __WEBPACK_IMPORTED_MODULE_0__config__.a.heartbeatInterval, heartbeatPayload = {
                        count: heartbeatCount,
                        elapsed: elapsed
                    };
                    if (__WEBPACK_IMPORTED_MODULE_0__config__.a.heartbeatTooBusy) {
                        heartbeatPayload.lag = lag;
                        lag >= __WEBPACK_IMPORTED_MODULE_0__config__.a.heartbeatTooBusyThreshold && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__logger__.l)("toobusy", heartbeatPayload, {
                            noConsole: !__WEBPACK_IMPORTED_MODULE_0__config__.a.heartbeatConsoleLog
                        });
                    }
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__logger__.l)("heartbeat", heartbeatPayload, {
                        noConsole: !__WEBPACK_IMPORTED_MODULE_0__config__.a.heartbeatConsoleLog
                    });
                }
            }, __WEBPACK_IMPORTED_MODULE_0__config__.a.heartbeatInterval);
        }
        function initPerformance() {
            if (!enablePerformance) return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__logger__.l)("no_performance_data");
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__builders__.e)(function() {
                var payload = {};
                payload.client_elapsed = clientTimer.elapsed();
                enablePerformance && (payload.req_elapsed = reqTimer.elapsed());
                return payload;
            });
            __WEBPACK_IMPORTED_MODULE_3__util__.c.then(function() {
                var keys = [ "connectEnd", "connectStart", "domComplete", "domContentLoadedEventEnd", "domContentLoadedEventStart", "domInteractive", "domLoading", "domainLookupEnd", "domainLookupStart", "fetchStart", "loadEventEnd", "loadEventStart", "navigationStart", "redirectEnd", "redirectStart", "requestStart", "responseEnd", "responseStart", "secureConnectionStart", "unloadEventEnd", "unloadEventStart" ], timing = {};
                keys.forEach(function(key) {
                    timing[key] = parseInt(window.performance.timing[key], 10) || 0;
                });
                var offset = timing.connectEnd - timing.navigationStart;
                timing.connectEnd && Object.keys(timing).forEach(function(name) {
                    var time = timing[name];
                    time && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__logger__.l)("timing_" + name, {
                        client_elapsed: parseInt(time - timing.connectEnd - (clientTimer.startTime - offset), 10),
                        req_elapsed: parseInt(time - timing.connectEnd, 10)
                    });
                });
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__logger__.l)("timing", timing);
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__logger__.l)("memory", window.performance.memory);
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__logger__.l)("navigation", window.performance.navigation);
                window.performance.getEntries && window.performance.getEntries().forEach(function(resource) {
                    [ "link", "script", "img", "css" ].indexOf(resource.initiatorType) > -1 && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__logger__.l)(resource.initiatorType, resource);
                });
            });
        }
        __webpack_exports__.a = now;
        __webpack_exports__.b = reqStartElapsed;
        __webpack_exports__.d = initHeartBeat;
        __webpack_exports__.c = initPerformance;
        var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(13), __WEBPACK_IMPORTED_MODULE_1__logger__ = __webpack_require__(16), __WEBPACK_IMPORTED_MODULE_2__builders__ = __webpack_require__(15), __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__(17), enablePerformance = window && window.performance && performance.now && performance.timing && performance.timing.connectEnd && performance.timing.navigationStart && Math.abs(performance.now() - Date.now()) > 1e3 && performance.now() - (performance.timing.connectEnd - performance.timing.navigationStart) > 0, clientTimer = timer(), reqTimer = timer(reqStartElapsed());
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        Object.defineProperty(__webpack_exports__, "__esModule", {
            value: !0
        });
        var __WEBPACK_IMPORTED_MODULE_0__weakmap__ = __webpack_require__(40);
        __webpack_require__.d(__webpack_exports__, "WeakMap", function() {
            return __WEBPACK_IMPORTED_MODULE_0__weakmap__.a;
        });
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return CONSTANTS;
        });
        __webpack_require__.d(__webpack_exports__, "b", function() {
            return POST_MESSAGE_NAMES_LIST;
        });
        var CONSTANTS = {
            POST_MESSAGE_TYPE: {
                REQUEST: "postrobot_message_request",
                RESPONSE: "postrobot_message_response",
                ACK: "postrobot_message_ack"
            },
            POST_MESSAGE_ACK: {
                SUCCESS: "success",
                ERROR: "error"
            },
            POST_MESSAGE_NAMES: {
                METHOD: "postrobot_method",
                READY: "postrobot_ready",
                OPEN_TUNNEL: "postrobot_open_tunnel"
            },
            WINDOW_TYPES: {
                FULLPAGE: "fullpage",
                POPUP: "popup",
                IFRAME: "iframe"
            },
            WINDOW_PROPS: {
                POSTROBOT: "__postRobot__"
            },
            SERIALIZATION_TYPES: {
                METHOD: "postrobot_method",
                ERROR: "postrobot_error",
                PROMISE: "postrobot_promise",
                ZALGO_PROMISE: "postrobot_zalgo_promise",
                REGEX: "regex"
            },
            SEND_STRATEGIES: {
                POST_MESSAGE: "postrobot_post_message",
                BRIDGE: "postrobot_bridge",
                GLOBAL: "postrobot_global"
            },
            MOCK_PROTOCOL: "mock:",
            FILE_PROTOCOL: "file:",
            BRIDGE_NAME_PREFIX: "__postrobot_bridge__",
            POSTROBOT_PROXY: "__postrobot_proxy__",
            WILDCARD: "*"
        }, POST_MESSAGE_NAMES_LIST = Object.keys(CONSTANTS.POST_MESSAGE_NAMES).map(function(key) {
            return CONSTANTS.POST_MESSAGE_NAMES[key];
        });
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function addResponseListener(hash, listener) {
            __WEBPACK_IMPORTED_MODULE_3__global__.a.responseListeners[hash] = listener;
        }
        function getResponseListener(hash) {
            return __WEBPACK_IMPORTED_MODULE_3__global__.a.responseListeners[hash];
        }
        function deleteResponseListener(hash) {
            delete __WEBPACK_IMPORTED_MODULE_3__global__.a.responseListeners[hash];
        }
        function getRequestListener(_ref) {
            var name = _ref.name, win = _ref.win, domain = _ref.domain;
            win === __WEBPACK_IMPORTED_MODULE_5__conf__.b.WILDCARD && (win = null);
            domain === __WEBPACK_IMPORTED_MODULE_5__conf__.b.WILDCARD && (domain = null);
            if (!name) throw new Error("Name required to get request listener");
            var nameListeners = __WEBPACK_IMPORTED_MODULE_3__global__.a.requestListeners[name];
            if (nameListeners) for (var _arr = [ win, __WEBPACK_IMPORTED_MODULE_3__global__.a.WINDOW_WILDCARD ], _i = 0; _i < _arr.length; _i++) {
                var winQualifier = _arr[_i], winListeners = winQualifier && nameListeners.get(winQualifier);
                if (winListeners) {
                    for (var _arr2 = [ domain, __WEBPACK_IMPORTED_MODULE_5__conf__.b.WILDCARD ], _i2 = 0; _i2 < _arr2.length; _i2++) {
                        var domainQualifier = _arr2[_i2];
                        if (domainQualifier) {
                            domainQualifier = domainQualifier.toString();
                            if (winListeners[domainQualifier]) return winListeners[domainQualifier];
                        }
                    }
                    if (winListeners[__DOMAIN_REGEX__]) for (var _iterator = winListeners[__DOMAIN_REGEX__], _isArray = Array.isArray(_iterator), _i3 = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                        var _ref3;
                        if (_isArray) {
                            if (_i3 >= _iterator.length) break;
                            _ref3 = _iterator[_i3++];
                        } else {
                            _i3 = _iterator.next();
                            if (_i3.done) break;
                            _ref3 = _i3.value;
                        }
                        var _ref4 = _ref3, regex = _ref4.regex, listener = _ref4.listener;
                        if (domain && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_cross_domain_utils_src__.f)(regex, domain)) return listener;
                    }
                }
            }
        }
        function addRequestListener(_ref5, listener) {
            var name = _ref5.name, win = _ref5.win, domain = _ref5.domain;
            if (!name || "string" != typeof name) throw new Error("Name required to add request listener");
            if (Array.isArray(win)) {
                for (var listenersCollection = [], _iterator2 = win, _isArray2 = Array.isArray(_iterator2), _i4 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                    var _ref6;
                    if (_isArray2) {
                        if (_i4 >= _iterator2.length) break;
                        _ref6 = _iterator2[_i4++];
                    } else {
                        _i4 = _iterator2.next();
                        if (_i4.done) break;
                        _ref6 = _i4.value;
                    }
                    var item = _ref6;
                    listenersCollection.push(addRequestListener({
                        name: name,
                        domain: domain,
                        win: item
                    }, listener));
                }
                return {
                    cancel: function() {
                        for (var _iterator3 = listenersCollection, _isArray3 = Array.isArray(_iterator3), _i5 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                            var _ref7;
                            if (_isArray3) {
                                if (_i5 >= _iterator3.length) break;
                                _ref7 = _iterator3[_i5++];
                            } else {
                                _i5 = _iterator3.next();
                                if (_i5.done) break;
                                _ref7 = _i5.value;
                            }
                            _ref7.cancel();
                        }
                    }
                };
            }
            if (Array.isArray(domain)) {
                for (var _listenersCollection = [], _iterator4 = domain, _isArray4 = Array.isArray(_iterator4), _i6 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator](); ;) {
                    var _ref8;
                    if (_isArray4) {
                        if (_i6 >= _iterator4.length) break;
                        _ref8 = _iterator4[_i6++];
                    } else {
                        _i6 = _iterator4.next();
                        if (_i6.done) break;
                        _ref8 = _i6.value;
                    }
                    var _item = _ref8;
                    _listenersCollection.push(addRequestListener({
                        name: name,
                        win: win,
                        domain: _item
                    }, listener));
                }
                return {
                    cancel: function() {
                        for (var _iterator5 = _listenersCollection, _isArray5 = Array.isArray(_iterator5), _i7 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator](); ;) {
                            var _ref9;
                            if (_isArray5) {
                                if (_i7 >= _iterator5.length) break;
                                _ref9 = _iterator5[_i7++];
                            } else {
                                _i7 = _iterator5.next();
                                if (_i7.done) break;
                                _ref9 = _i7.value;
                            }
                            _ref9.cancel();
                        }
                    }
                };
            }
            var existingListener = getRequestListener({
                name: name,
                win: win,
                domain: domain
            });
            win && win !== __WEBPACK_IMPORTED_MODULE_5__conf__.b.WILDCARD || (win = __WEBPACK_IMPORTED_MODULE_3__global__.a.WINDOW_WILDCARD);
            domain = domain || __WEBPACK_IMPORTED_MODULE_5__conf__.b.WILDCARD;
            if (existingListener) throw win && domain ? new Error("Request listener already exists for " + name + " on domain " + domain.toString() + " for specified window") : win ? new Error("Request listener already exists for " + name + " for specified window") : domain ? new Error("Request listener already exists for " + name + " on domain " + domain.toString()) : new Error("Request listener already exists for " + name);
            var requestListeners = __WEBPACK_IMPORTED_MODULE_3__global__.a.requestListeners, nameListeners = requestListeners[name];
            if (!nameListeners) {
                nameListeners = new __WEBPACK_IMPORTED_MODULE_1_cross_domain_safe_weakmap_src__.a();
                requestListeners[name] = nameListeners;
            }
            var winListeners = nameListeners.get(win);
            if (!winListeners) {
                winListeners = {};
                nameListeners.set(win, winListeners);
            }
            var strDomain = domain.toString();
            winListeners[strDomain] = listener;
            var regexListeners = winListeners[__DOMAIN_REGEX__], regexListener = void 0;
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__lib__.c)(domain)) {
                if (!regexListeners) {
                    regexListeners = [];
                    winListeners[__DOMAIN_REGEX__] = regexListeners;
                }
                regexListener = {
                    regex: domain,
                    listener: listener
                };
                regexListeners.push(regexListener);
            }
            return {
                cancel: function() {
                    if (winListeners) {
                        delete winListeners[strDomain];
                        win && 0 === Object.keys(winListeners).length && nameListeners.delete(win);
                        regexListener && regexListeners.splice(regexListeners.indexOf(regexListener, 1));
                    }
                }
            };
        }
        __webpack_exports__.e = addResponseListener;
        __webpack_exports__.a = getResponseListener;
        __webpack_exports__.c = deleteResponseListener;
        __webpack_exports__.b = getRequestListener;
        __webpack_exports__.d = addRequestListener;
        var __WEBPACK_IMPORTED_MODULE_1_cross_domain_safe_weakmap_src__ = (__webpack_require__(1), 
        __webpack_require__(6)), __WEBPACK_IMPORTED_MODULE_2_cross_domain_utils_src__ = __webpack_require__(0), __WEBPACK_IMPORTED_MODULE_3__global__ = __webpack_require__(7), __WEBPACK_IMPORTED_MODULE_4__lib__ = __webpack_require__(9), __WEBPACK_IMPORTED_MODULE_5__conf__ = __webpack_require__(4);
        __WEBPACK_IMPORTED_MODULE_3__global__.a.responseListeners = __WEBPACK_IMPORTED_MODULE_3__global__.a.responseListeners || {};
        __WEBPACK_IMPORTED_MODULE_3__global__.a.requestListeners = __WEBPACK_IMPORTED_MODULE_3__global__.a.requestListeners || {};
        __WEBPACK_IMPORTED_MODULE_3__global__.a.WINDOW_WILDCARD = __WEBPACK_IMPORTED_MODULE_3__global__.a.WINDOW_WILDCARD || new function() {}();
        var __DOMAIN_REGEX__ = "__domain_regex__";
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function _defineProperty(obj, key, value) {
            key in obj ? Object.defineProperty(obj, key, {
                value: value,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : obj[key] = value;
            return obj;
        }
        function buildMessage(win, message) {
            var options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, id = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.d)(), type = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.e)(), sourceDomain = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__.i)(window);
            return _extends({}, message, options, {
                sourceDomain: sourceDomain,
                id: message.id || id,
                windowType: type
            });
        }
        function sendMessage(win, message, domain) {
            return __WEBPACK_IMPORTED_MODULE_1_zalgo_promise_src__.a.try(function() {
                message = buildMessage(win, message, {
                    data: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.f)(win, domain, message.data),
                    domain: domain
                });
                var level = void 0;
                level = -1 !== __WEBPACK_IMPORTED_MODULE_2__conf__.c.indexOf(message.name) || message.type === __WEBPACK_IMPORTED_MODULE_2__conf__.b.POST_MESSAGE_TYPE.ACK ? "debug" : "error" === message.ack ? "error" : "info";
                __WEBPACK_IMPORTED_MODULE_3__lib__.g.logLevel(level, [ "\n\n\t", "#send", message.type.replace(/^postrobot_message_/, ""), "::", message.name, "::", domain || __WEBPACK_IMPORTED_MODULE_2__conf__.b.WILDCARD, "\n\n", message ]);
                if (win === window) throw new Error("Attemping to send message to self");
                if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__.c)(win)) throw new Error("Window is closed");
                __WEBPACK_IMPORTED_MODULE_3__lib__.g.debug("Running send message strategies", message);
                var messages = [], serializedMessage = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.h)(_defineProperty({}, __WEBPACK_IMPORTED_MODULE_2__conf__.b.WINDOW_PROPS.POSTROBOT, message), null, 2);
                return __WEBPACK_IMPORTED_MODULE_1_zalgo_promise_src__.a.map(Object.keys(__WEBPACK_IMPORTED_MODULE_4__strategies__.a), function(strategyName) {
                    return __WEBPACK_IMPORTED_MODULE_1_zalgo_promise_src__.a.try(function() {
                        if (!__WEBPACK_IMPORTED_MODULE_2__conf__.a.ALLOWED_POST_MESSAGE_METHODS[strategyName]) throw new Error("Strategy disallowed: " + strategyName);
                        return __WEBPACK_IMPORTED_MODULE_4__strategies__.a[strategyName](win, serializedMessage, domain);
                    }).then(function() {
                        messages.push(strategyName + ": success");
                        return !0;
                    }, function(err) {
                        messages.push(strategyName + ": " + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.i)(err) + "\n");
                        return !1;
                    });
                }).then(function(results) {
                    var success = results.some(Boolean), status = message.type + " " + message.name + " " + (success ? "success" : "error") + ":\n  - " + messages.join("\n  - ") + "\n";
                    __WEBPACK_IMPORTED_MODULE_3__lib__.g.debug(status);
                    if (!success) throw new Error(status);
                });
            });
        }
        __webpack_exports__.a = sendMessage;
        var __WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__ = __webpack_require__(0), __WEBPACK_IMPORTED_MODULE_1_zalgo_promise_src__ = __webpack_require__(1), __WEBPACK_IMPORTED_MODULE_2__conf__ = __webpack_require__(4), __WEBPACK_IMPORTED_MODULE_3__lib__ = __webpack_require__(9), __WEBPACK_IMPORTED_MODULE_4__strategies__ = __webpack_require__(47), _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        };
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return RENDER_DRIVERS;
        });
        var __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__ = __webpack_require__(1), __WEBPACK_IMPORTED_MODULE_1_post_robot_src__ = __webpack_require__(8), __WEBPACK_IMPORTED_MODULE_2_cross_domain_utils_src__ = __webpack_require__(0), __WEBPACK_IMPORTED_MODULE_3__lib__ = __webpack_require__(3), __WEBPACK_IMPORTED_MODULE_4__constants__ = __webpack_require__(5), __WEBPACK_IMPORTED_MODULE_5__window__ = __webpack_require__(21), RENDER_DRIVERS = (__webpack_require__(14), 
        {});
        RENDER_DRIVERS[__WEBPACK_IMPORTED_MODULE_4__constants__.CONTEXT_TYPES.IFRAME] = {
            focusable: !1,
            renderedIntoContainerTemplate: !0,
            allowResize: !0,
            openOnClick: !1,
            open: function(url) {
                var _this = this;
                this.iframe = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.F)({
                    url: url,
                    attributes: {
                        name: this.childWindowName,
                        scrolling: this.component.scrolling ? "yes" : "no"
                    },
                    class: [ __WEBPACK_IMPORTED_MODULE_4__constants__.CLASS_NAMES.COMPONENT_FRAME, __WEBPACK_IMPORTED_MODULE_4__constants__.CLASS_NAMES.INVISIBLE ]
                }, this.element);
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.G)(this.iframe).then(function(frameWindow) {
                    _this.window = frameWindow;
                    var detectClose = function() {
                        __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__.a.try(function() {
                            return _this.props.onClose(__WEBPACK_IMPORTED_MODULE_4__constants__.CLOSE_REASONS.CLOSE_DETECTED);
                        }).finally(function() {
                            return _this.destroy();
                        });
                    }, iframeWatcher = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.H)(_this.iframe, detectClose), elementWatcher = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.H)(_this.element, detectClose);
                    _this.clean.register("destroyWindow", function() {
                        iframeWatcher.cancel();
                        elementWatcher.cancel();
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_post_robot_src__.cleanUpWindow)(_this.window);
                        delete _this.window;
                        if (_this.iframe) {
                            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.I)(_this.iframe);
                            delete _this.iframe;
                        }
                    });
                });
            },
            openPrerender: function() {
                var _this2 = this;
                this.prerenderIframe = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.F)({
                    attributes: {
                        name: "__prerender__" + this.childWindowName,
                        scrolling: this.component.scrolling ? "yes" : "no"
                    },
                    class: [ __WEBPACK_IMPORTED_MODULE_4__constants__.CLASS_NAMES.PRERENDER_FRAME, __WEBPACK_IMPORTED_MODULE_4__constants__.CLASS_NAMES.VISIBLE ]
                }, this.element);
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.G)(this.prerenderIframe).then(function(prerenderFrameWindow) {
                    _this2.prerenderWindow = prerenderFrameWindow;
                    _this2.clean.register("destroyPrerender", function() {
                        if (_this2.prerenderIframe) {
                            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.I)(_this2.prerenderIframe);
                            delete _this2.prerenderIframe;
                        }
                    });
                });
            },
            switchPrerender: function() {
                var _this3 = this;
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.f)(this.prerenderIframe, __WEBPACK_IMPORTED_MODULE_4__constants__.CLASS_NAMES.INVISIBLE);
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.J)(this.prerenderIframe, __WEBPACK_IMPORTED_MODULE_4__constants__.CLASS_NAMES.VISIBLE);
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.f)(this.iframe, __WEBPACK_IMPORTED_MODULE_4__constants__.CLASS_NAMES.VISIBLE);
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.J)(this.iframe, __WEBPACK_IMPORTED_MODULE_4__constants__.CLASS_NAMES.INVISIBLE);
                setTimeout(function() {
                    _this3.prerenderIframe && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.I)(_this3.prerenderIframe);
                }, 1e3);
            },
            delegateOverrides: {
                openContainer: __WEBPACK_IMPORTED_MODULE_4__constants__.DELEGATE.CALL_DELEGATE,
                destroyComponent: __WEBPACK_IMPORTED_MODULE_4__constants__.DELEGATE.CALL_DELEGATE,
                destroyContainer: __WEBPACK_IMPORTED_MODULE_4__constants__.DELEGATE.CALL_DELEGATE,
                cancelContainerEvents: __WEBPACK_IMPORTED_MODULE_4__constants__.DELEGATE.CALL_DELEGATE,
                createPrerenderTemplate: __WEBPACK_IMPORTED_MODULE_4__constants__.DELEGATE.CALL_DELEGATE,
                elementReady: __WEBPACK_IMPORTED_MODULE_4__constants__.DELEGATE.CALL_DELEGATE,
                showContainer: __WEBPACK_IMPORTED_MODULE_4__constants__.DELEGATE.CALL_DELEGATE,
                showComponent: __WEBPACK_IMPORTED_MODULE_4__constants__.DELEGATE.CALL_DELEGATE,
                hideContainer: __WEBPACK_IMPORTED_MODULE_4__constants__.DELEGATE.CALL_DELEGATE,
                hideComponent: __WEBPACK_IMPORTED_MODULE_4__constants__.DELEGATE.CALL_DELEGATE,
                hide: __WEBPACK_IMPORTED_MODULE_4__constants__.DELEGATE.CALL_DELEGATE,
                show: __WEBPACK_IMPORTED_MODULE_4__constants__.DELEGATE.CALL_DELEGATE,
                resize: __WEBPACK_IMPORTED_MODULE_4__constants__.DELEGATE.CALL_DELEGATE,
                loadUrl: __WEBPACK_IMPORTED_MODULE_4__constants__.DELEGATE.CALL_DELEGATE,
                hijackSubmit: __WEBPACK_IMPORTED_MODULE_4__constants__.DELEGATE.CALL_DELEGATE,
                openPrerender: __WEBPACK_IMPORTED_MODULE_4__constants__.DELEGATE.CALL_DELEGATE,
                switchPrerender: __WEBPACK_IMPORTED_MODULE_4__constants__.DELEGATE.CALL_DELEGATE,
                renderTemplate: __WEBPACK_IMPORTED_MODULE_4__constants__.DELEGATE.CALL_ORIGINAL,
                openContainerFrame: __WEBPACK_IMPORTED_MODULE_4__constants__.DELEGATE.CALL_ORIGINAL,
                getOutlet: __WEBPACK_IMPORTED_MODULE_4__constants__.DELEGATE.CALL_ORIGINAL,
                open: function(original, override) {
                    return function() {
                        var _this4 = this;
                        return override.apply(this, arguments).then(function() {
                            _this4.clean.set("window", __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_cross_domain_utils_src__.q)(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__window__.b)(), _this4.childWindowName));
                            if (!_this4.window) throw new Error("Unable to find parent component iframe window");
                        });
                    };
                }
            },
            resize: function(width, height) {
                width && (this.element.style.width = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.K)(width));
                height && (this.element.style.height = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.K)(height));
            },
            show: function() {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.u)(this.element);
            },
            hide: function() {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.t)(this.element);
            },
            loadUrl: function(url) {
                this.iframe.setAttribute("src", url);
            }
        };
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function isDefined(value) {
            return null !== value && void 0 !== value && "" !== value;
        }
        function normalizeProp(component, instance, props, key, value) {
            var prop = component.getProp(key), resultValue = void 0;
            resultValue = prop.value ? prop.value : !prop.def || props.hasOwnProperty(key) && isDefined(value) ? value : prop.def.call(component, props);
            !resultValue && prop.alias && props[prop.alias] && (resultValue = props[prop.alias]);
            var decorated = !1;
            if (prop.decorate && null !== resultValue && void 0 !== resultValue) {
                resultValue = prop.decorate(resultValue, props);
                decorated = !0;
            }
            if ("boolean" === prop.type) resultValue = Boolean(resultValue); else if ("function" === prop.type) {
                if (!resultValue && prop.noop) {
                    resultValue = __WEBPACK_IMPORTED_MODULE_1__lib__.n;
                    !decorated && prop.decorate && (resultValue = prop.decorate(resultValue, props));
                }
                if (resultValue && "function" == typeof resultValue) {
                    resultValue = resultValue.bind(instance);
                    prop.denodeify && (resultValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.L)(resultValue));
                    prop.promisify && (resultValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.M)(resultValue));
                    var original = resultValue;
                    resultValue = function() {
                        component.log("call_prop_" + key);
                        return original.apply(this, arguments);
                    };
                    prop.once && (resultValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.p)(resultValue));
                    prop.memoize && (resultValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.N)(resultValue));
                }
            } else "string" === prop.type || "object" === prop.type || "number" === prop.type && void 0 !== resultValue && (resultValue = parseInt(resultValue, 10));
            return resultValue;
        }
        function normalizeProps(component, instance, props) {
            var result = (!(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3], 
            {});
            props = props || {};
            result.version = component.version;
            for (var _iterator = Object.keys(props), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                var _ref;
                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }
                var key = _ref;
                -1 !== component.getPropNames().indexOf(key) ? result[key] = normalizeProp(component, instance, props, key, props[key]) : result[key] = props[key];
            }
            for (var _iterator2 = component.getPropNames(), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                var _ref2;
                if (_isArray2) {
                    if (_i2 >= _iterator2.length) break;
                    _ref2 = _iterator2[_i2++];
                } else {
                    _i2 = _iterator2.next();
                    if (_i2.done) break;
                    _ref2 = _i2.value;
                }
                var _key = _ref2;
                if (!props.hasOwnProperty(_key)) {
                    var normalizedProp = normalizeProp(component, instance, props, _key, props[_key]);
                    void 0 !== normalizedProp && (result[_key] = normalizedProp);
                }
            }
            return result;
        }
        function getQueryParam(prop, key, value) {
            return __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__.a.try(function() {
                return "function" == typeof prop.queryParam ? prop.queryParam(value) : "string" == typeof prop.queryParam ? prop.queryParam : key;
            });
        }
        function getQueryValue(prop, key, value) {
            return __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__.a.try(function() {
                return "function" == typeof prop.queryValue ? prop.queryValue(value) : value;
            });
        }
        function propsToQuery(propsDef, props) {
            var params = {};
            return __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__.a.all(Object.keys(props).map(function(key) {
                var prop = propsDef[key];
                if (prop) return __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__.a.resolve().then(function() {
                    var value = props[key];
                    if (value && prop.queryParam) return value;
                }).then(function(value) {
                    value && __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__.a.all([ getQueryParam(prop, key, value), getQueryValue(prop, key, value) ]).then(function(_ref3) {
                        var _ref4 = _slicedToArray(_ref3, 2), queryParam = _ref4[0], queryValue = _ref4[1], result = void 0;
                        if ("boolean" == typeof queryValue) result = "1"; else if ("string" == typeof queryValue) result = queryValue.toString(); else {
                            if ("function" == typeof queryValue) return;
                            if ("object" === (void 0 === queryValue ? "undefined" : _typeof(queryValue))) {
                                if ("json" !== prop.serialization) {
                                    result = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.O)(queryValue, key);
                                    for (var dotkey in result) params[dotkey] = result[dotkey];
                                    return;
                                }
                                result = JSON.stringify(queryValue);
                            } else "number" == typeof queryValue && (result = queryValue.toString());
                        }
                        params[queryParam] = result;
                    });
                });
            })).then(function() {
                return params;
            });
        }
        __webpack_exports__.a = normalizeProps;
        __webpack_exports__.b = propsToQuery;
        var __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__ = __webpack_require__(1), __WEBPACK_IMPORTED_MODULE_1__lib__ = __webpack_require__(3), _typeof = (__webpack_require__(2), 
        __webpack_require__(12), __webpack_require__(10), "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        }), _slicedToArray = function() {
            function sliceIterator(arr, i) {
                var _arr = [], _n = !0, _d = !1, _e = void 0;
                try {
                    for (var _s, _i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done); _n = !0) {
                        _arr.push(_s.value);
                        if (i && _arr.length === i) break;
                    }
                } catch (err) {
                    _d = !0;
                    _e = err;
                } finally {
                    try {
                        !_n && _i.return && _i.return();
                    } finally {
                        if (_d) throw _e;
                    }
                }
                return _arr;
            }
            return function(arr, i) {
                if (Array.isArray(arr)) return arr;
                if (Symbol.iterator in Object(arr)) return sliceIterator(arr, i);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
        }();
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function noop() {}
        function once(method) {
            var called = !1, result = void 0;
            return function() {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                if (called) return result;
                called = !0;
                result = method.apply(this, arguments);
                return result;
            };
        }
        function memoize(method) {
            var results = {};
            return function() {
                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
                var cacheKey = void 0;
                try {
                    cacheKey = JSON.stringify(Array.prototype.slice.call(arguments), function(key, val) {
                        return "function" == typeof val ? "xcomponent:memoize[" + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__.b)(val) + "]" : val;
                    });
                } catch (err) {
                    throw new Error("Arguments not serializable -- can not be used to memoize");
                }
                results.hasOwnProperty(cacheKey) || (results[cacheKey] = method.apply(this, arguments));
                return results[cacheKey];
            };
        }
        function debounce(method) {
            var time = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100, timeout = void 0;
            return function() {
                var _this = this, _arguments = arguments;
                clearTimeout(timeout);
                timeout = setTimeout(function() {
                    return method.apply(_this, _arguments);
                }, time);
            };
        }
        function serializeFunctions(obj) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__.c)(obj, function(value, key, fullKey) {
                if (value instanceof Function) return {
                    __type__: "__function__"
                };
            });
        }
        function deserializeFunctions(obj, handler) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__.c)(obj, function(value, key, fullKey) {
                if (value && "__function__" === value.__type__) return function() {
                    return handler({
                        key: key,
                        fullKey: fullKey,
                        self: this,
                        args: arguments
                    });
                };
            });
        }
        __webpack_exports__.e = noop;
        __webpack_exports__.c = once;
        __webpack_exports__.a = memoize;
        __webpack_exports__.b = debounce;
        __webpack_exports__.d = serializeFunctions;
        __webpack_exports__.f = deserializeFunctions;
        var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(26);
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function init(conf) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util__.d)(__WEBPACK_IMPORTED_MODULE_0__config__.a, conf || {});
            if (!initiated) {
                initiated = !0;
                __WEBPACK_IMPORTED_MODULE_0__config__.a.logPerformance && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__performance__.c)();
                __WEBPACK_IMPORTED_MODULE_0__config__.a.heartbeat && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__performance__.d)();
                if (__WEBPACK_IMPORTED_MODULE_0__config__.a.logUnload) {
                    window.addEventListener("beforeunload", function() {
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__logger__.l)("window_beforeunload");
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__logger__.g)({
                            fireAndForget: !0
                        });
                    });
                    window.addEventListener("unload", function() {
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__logger__.l)("window_unload");
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__logger__.g)({
                            fireAndForget: !0
                        });
                    });
                }
                __WEBPACK_IMPORTED_MODULE_0__config__.a.flushInterval && setInterval(__WEBPACK_IMPORTED_MODULE_3__logger__.h, __WEBPACK_IMPORTED_MODULE_0__config__.a.flushInterval);
                if (window.beaverLogQueue) {
                    window.beaverLogQueue.forEach(function(payload) {
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__logger__.i)(payload.level, payload.event, payload);
                    });
                    delete window.beaverLogQueue;
                }
            }
        }
        __webpack_exports__.a = init;
        var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(13), __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(17), __WEBPACK_IMPORTED_MODULE_2__performance__ = __webpack_require__(28), __WEBPACK_IMPORTED_MODULE_3__logger__ = __webpack_require__(16), initiated = !1;
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function startTransition() {
            startTime = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__performance__.a)();
        }
        function endTransition(toState) {
            startTime = startTime || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__performance__.b)();
            var currentTime = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__performance__.a)(), elapsedTime = void 0;
            void 0 !== startTime && (elapsedTime = parseInt(currentTime - startTime, 0));
            var transitionName = "transition_" + currentState + "_to_" + toState;
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__logger__.l)(transitionName, {
                duration: elapsedTime
            });
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__logger__.a)({
                transition: transitionName,
                transition_time: elapsedTime
            });
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__logger__.g)();
            startTime = currentTime;
            currentState = toState;
            pageID = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util__.a)();
        }
        function transition(toState) {
            startTransition();
            endTransition(toState);
        }
        __webpack_exports__.a = startTransition;
        __webpack_exports__.b = endTransition;
        __webpack_exports__.c = transition;
        var __WEBPACK_IMPORTED_MODULE_0__performance__ = __webpack_require__(28), __WEBPACK_IMPORTED_MODULE_1__logger__ = __webpack_require__(16), __WEBPACK_IMPORTED_MODULE_2__builders__ = __webpack_require__(15), __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__(17), __WEBPACK_IMPORTED_MODULE_4__config__ = __webpack_require__(13), windowID = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util__.a)(), pageID = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util__.a)(), currentState = __WEBPACK_IMPORTED_MODULE_4__config__.a.initial_state_name, startTime = void 0;
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__builders__.e)(function() {
            return {
                windowID: windowID,
                pageID: pageID
            };
        });
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__builders__.f)(function() {
            return {
                state: "ui_" + currentState
            };
        });
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function hasNativeWeakMap() {
            if (!window.WeakMap) return !1;
            if (!window.Object.freeze) return !1;
            try {
                var testWeakMap = new window.WeakMap(), testKey = {};
                window.Object.freeze(testKey);
                testWeakMap.set(testKey, "__testvalue__");
                return "__testvalue__" === testWeakMap.get(testKey);
            } catch (err) {
                return !1;
            }
        }
        __webpack_exports__.a = hasNativeWeakMap;
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function safeIndexOf(collection, item) {
            for (var i = 0; i < collection.length; i++) try {
                if (collection[i] === item) return i;
            } catch (err) {}
            return -1;
        }
        function noop() {}
        __webpack_exports__.b = safeIndexOf;
        __webpack_exports__.a = noop;
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return CrossDomainSafeWeakMap;
        });
        var __WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__ = __webpack_require__(0), __WEBPACK_IMPORTED_MODULE_1__native__ = __webpack_require__(38), __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(39), _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1;
                    descriptor.configurable = !0;
                    "value" in descriptor && (descriptor.writable = !0);
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                protoProps && defineProperties(Constructor.prototype, protoProps);
                staticProps && defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }(), defineProperty = Object.defineProperty, counter = Date.now() % 1e9, CrossDomainSafeWeakMap = function() {
            function CrossDomainSafeWeakMap() {
                _classCallCheck(this, CrossDomainSafeWeakMap);
                counter += 1;
                this.name = "__weakmap_" + (1e9 * Math.random() >>> 0) + "__" + counter;
                if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__native__.a)()) try {
                    this.weakmap = new window.WeakMap();
                } catch (err) {}
                this.keys = [];
                this.values = [];
            }
            _createClass(CrossDomainSafeWeakMap, [ {
                key: "_cleanupClosedWindows",
                value: function() {
                    for (var weakmap = this.weakmap, keys = this.keys, i = 0; i < keys.length; i++) {
                        var value = keys[i];
                        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__.b)(value) && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__.c)(value)) {
                            if (weakmap) try {
                                weakmap.delete(value);
                            } catch (err) {}
                            keys.splice(i, 1);
                            this.values.splice(i, 1);
                            i -= 1;
                        }
                    }
                }
            }, {
                key: "isSafeToReadWrite",
                value: function(key) {
                    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__.b)(key)) return !1;
                    try {
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__.a)(key && key.self);
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__.a)(key && key[this.name]);
                    } catch (err) {
                        return !1;
                    }
                    return !0;
                }
            }, {
                key: "set",
                value: function(key, value) {
                    if (!key) throw new Error("WeakMap expected key");
                    var weakmap = this.weakmap;
                    if (weakmap) try {
                        weakmap.set(key, value);
                    } catch (err) {
                        delete this.weakmap;
                    }
                    if (this.isSafeToReadWrite(key)) {
                        var name = this.name, entry = key[name];
                        entry && entry[0] === key ? entry[1] = value : defineProperty(key, name, {
                            value: [ key, value ],
                            writable: !0
                        });
                    } else {
                        this._cleanupClosedWindows();
                        var keys = this.keys, values = this.values, index = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__.b)(keys, key);
                        if (-1 === index) {
                            keys.push(key);
                            values.push(value);
                        } else values[index] = value;
                    }
                }
            }, {
                key: "get",
                value: function(key) {
                    if (!key) throw new Error("WeakMap expected key");
                    var weakmap = this.weakmap;
                    if (weakmap) try {
                        if (weakmap.has(key)) return weakmap.get(key);
                    } catch (err) {
                        delete this.weakmap;
                    }
                    if (!this.isSafeToReadWrite(key)) {
                        this._cleanupClosedWindows();
                        var keys = this.keys, index = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__.b)(keys, key);
                        if (-1 === index) return;
                        return this.values[index];
                    }
                    var entry = key[this.name];
                    if (entry && entry[0] === key) return entry[1];
                }
            }, {
                key: "delete",
                value: function(key) {
                    if (!key) throw new Error("WeakMap expected key");
                    var weakmap = this.weakmap;
                    if (weakmap) try {
                        weakmap.delete(key);
                    } catch (err) {
                        delete this.weakmap;
                    }
                    if (this.isSafeToReadWrite(key)) {
                        var entry = key[this.name];
                        entry && entry[0] === key && (entry[0] = entry[1] = void 0);
                    } else {
                        this._cleanupClosedWindows();
                        var keys = this.keys, index = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__.b)(keys, key);
                        if (-1 !== index) {
                            keys.splice(index, 1);
                            this.values.splice(index, 1);
                        }
                    }
                }
            }, {
                key: "has",
                value: function(key) {
                    if (!key) throw new Error("WeakMap expected key");
                    var weakmap = this.weakmap;
                    if (weakmap) try {
                        return weakmap.has(key);
                    } catch (err) {
                        delete this.weakmap;
                    }
                    if (this.isSafeToReadWrite(key)) {
                        var entry = key[this.name];
                        return !(!entry || entry[0] !== key);
                    }
                    this._cleanupClosedWindows();
                    return -1 !== __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__.b)(this.keys, key);
                }
            } ]);
            return CrossDomainSafeWeakMap;
        }();
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function isRegex(item) {
            return "[object RegExp]" === Object.prototype.toString.call(item);
        }
        function noop() {}
        __webpack_exports__.b = isRegex;
        __webpack_exports__.a = noop;
    }, function(module, exports, __webpack_require__) {
        (function(global) {
            !function(root, undefined) {
                "use strict";
                var NODE_JS = void 0 !== module;
                NODE_JS && (root = global);
                var BASE32_ENCODE_CHAR = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567".split(""), BASE32_DECODE_CHAR = {
                    A: 0,
                    B: 1,
                    C: 2,
                    D: 3,
                    E: 4,
                    F: 5,
                    G: 6,
                    H: 7,
                    I: 8,
                    J: 9,
                    K: 10,
                    L: 11,
                    M: 12,
                    N: 13,
                    O: 14,
                    P: 15,
                    Q: 16,
                    R: 17,
                    S: 18,
                    T: 19,
                    U: 20,
                    V: 21,
                    W: 22,
                    X: 23,
                    Y: 24,
                    Z: 25,
                    "2": 26,
                    "3": 27,
                    "4": 28,
                    "5": 29,
                    "6": 30,
                    "7": 31
                }, blocks = [ 0, 0, 0, 0, 0, 0, 0, 0 ], toUtf8String = function(bytes) {
                    for (var b, c, str = "", length = bytes.length, i = 0, followingChars = 0; i < length; ) {
                        b = bytes[i++];
                        if (b <= 127) str += String.fromCharCode(b); else {
                            if (b > 191 && b <= 223) {
                                c = 31 & b;
                                followingChars = 1;
                            } else if (b <= 239) {
                                c = 15 & b;
                                followingChars = 2;
                            } else {
                                if (!(b <= 247)) throw "not a UTF-8 string";
                                c = 7 & b;
                                followingChars = 3;
                            }
                            for (var j = 0; j < followingChars; ++j) {
                                b = bytes[i++];
                                if (b < 128 || b > 191) throw "not a UTF-8 string";
                                c <<= 6;
                                c += 63 & b;
                            }
                            if (c >= 55296 && c <= 57343) throw "not a UTF-8 string";
                            if (c > 1114111) throw "not a UTF-8 string";
                            if (c <= 65535) str += String.fromCharCode(c); else {
                                c -= 65536;
                                str += String.fromCharCode(55296 + (c >> 10));
                                str += String.fromCharCode(56320 + (1023 & c));
                            }
                        }
                    }
                    return str;
                }, decodeAsBytes = function(base32Str) {
                    base32Str = base32Str.replace(/=/g, "");
                    for (var v1, v2, v3, v4, v5, v6, v7, v8, bytes = [], index = 0, length = base32Str.length, i = 0, count = length >> 3 << 3; i < count; ) {
                        v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v6 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v7 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v8 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        bytes[index++] = 255 & (v1 << 3 | v2 >>> 2);
                        bytes[index++] = 255 & (v2 << 6 | v3 << 1 | v4 >>> 4);
                        bytes[index++] = 255 & (v4 << 4 | v5 >>> 1);
                        bytes[index++] = 255 & (v5 << 7 | v6 << 2 | v7 >>> 3);
                        bytes[index++] = 255 & (v7 << 5 | v8);
                    }
                    var remain = length - count;
                    if (2 == remain) {
                        v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        bytes[index++] = 255 & (v1 << 3 | v2 >>> 2);
                    } else if (4 == remain) {
                        v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        bytes[index++] = 255 & (v1 << 3 | v2 >>> 2);
                        bytes[index++] = 255 & (v2 << 6 | v3 << 1 | v4 >>> 4);
                    } else if (5 == remain) {
                        v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        bytes[index++] = 255 & (v1 << 3 | v2 >>> 2);
                        bytes[index++] = 255 & (v2 << 6 | v3 << 1 | v4 >>> 4);
                        bytes[index++] = 255 & (v4 << 4 | v5 >>> 1);
                    } else if (7 == remain) {
                        v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v6 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v7 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        bytes[index++] = 255 & (v1 << 3 | v2 >>> 2);
                        bytes[index++] = 255 & (v2 << 6 | v3 << 1 | v4 >>> 4);
                        bytes[index++] = 255 & (v4 << 4 | v5 >>> 1);
                        bytes[index++] = 255 & (v5 << 7 | v6 << 2 | v7 >>> 3);
                    }
                    return bytes;
                }, encodeAscii = function(str) {
                    for (var v1, v2, v3, v4, v5, base32Str = "", length = str.length, i = 0, count = 5 * parseInt(length / 5); i < count; ) {
                        v1 = str.charCodeAt(i++);
                        v2 = str.charCodeAt(i++);
                        v3 = str.charCodeAt(i++);
                        v4 = str.charCodeAt(i++);
                        v5 = str.charCodeAt(i++);
                        base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[31 & (v3 << 1 | v4 >>> 7)] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[31 & (v4 << 3 | v5 >>> 5)] + BASE32_ENCODE_CHAR[31 & v5];
                    }
                    var remain = length - count;
                    if (1 == remain) {
                        v1 = str.charCodeAt(i);
                        base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[v1 << 2 & 31] + "======";
                    } else if (2 == remain) {
                        v1 = str.charCodeAt(i++);
                        v2 = str.charCodeAt(i);
                        base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[v2 << 4 & 31] + "====";
                    } else if (3 == remain) {
                        v1 = str.charCodeAt(i++);
                        v2 = str.charCodeAt(i++);
                        v3 = str.charCodeAt(i);
                        base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[v3 << 1 & 31] + "===";
                    } else if (4 == remain) {
                        v1 = str.charCodeAt(i++);
                        v2 = str.charCodeAt(i++);
                        v3 = str.charCodeAt(i++);
                        v4 = str.charCodeAt(i);
                        base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[31 & (v3 << 1 | v4 >>> 7)] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[v4 << 3 & 31] + "=";
                    }
                    return base32Str;
                }, encodeUtf8 = function(str) {
                    var v1, v2, v3, v4, v5, code, i, end = !1, base32Str = "", index = 0, start = 0, bytes = 0, length = str.length;
                    do {
                        blocks[0] = blocks[5];
                        blocks[1] = blocks[6];
                        blocks[2] = blocks[7];
                        for (i = start; index < length && i < 5; ++index) {
                            code = str.charCodeAt(index);
                            if (code < 128) blocks[i++] = code; else if (code < 2048) {
                                blocks[i++] = 192 | code >> 6;
                                blocks[i++] = 128 | 63 & code;
                            } else if (code < 55296 || code >= 57344) {
                                blocks[i++] = 224 | code >> 12;
                                blocks[i++] = 128 | code >> 6 & 63;
                                blocks[i++] = 128 | 63 & code;
                            } else {
                                code = 65536 + ((1023 & code) << 10 | 1023 & str.charCodeAt(++index));
                                blocks[i++] = 240 | code >> 18;
                                blocks[i++] = 128 | code >> 12 & 63;
                                blocks[i++] = 128 | code >> 6 & 63;
                                blocks[i++] = 128 | 63 & code;
                            }
                        }
                        bytes += i - start;
                        start = i - 5;
                        index == length && ++index;
                        index > length && i < 6 && (end = !0);
                        v1 = blocks[0];
                        if (i > 4) {
                            v2 = blocks[1];
                            v3 = blocks[2];
                            v4 = blocks[3];
                            v5 = blocks[4];
                            base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[31 & (v3 << 1 | v4 >>> 7)] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[31 & (v4 << 3 | v5 >>> 5)] + BASE32_ENCODE_CHAR[31 & v5];
                        } else if (1 == i) base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[v1 << 2 & 31] + "======"; else if (2 == i) {
                            v2 = blocks[1];
                            base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[v2 << 4 & 31] + "====";
                        } else if (3 == i) {
                            v2 = blocks[1];
                            v3 = blocks[2];
                            base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[v3 << 1 & 31] + "===";
                        } else if (4 == i) {
                            v2 = blocks[1];
                            v3 = blocks[2];
                            v4 = blocks[3];
                            base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[31 & (v3 << 1 | v4 >>> 7)] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[v4 << 3 & 31] + "=";
                        }
                    } while (!end);
                    return base32Str;
                }, encodeBytes = function(bytes) {
                    for (var v1, v2, v3, v4, v5, base32Str = "", length = bytes.length, i = 0, count = 5 * parseInt(length / 5); i < count; ) {
                        v1 = bytes[i++];
                        v2 = bytes[i++];
                        v3 = bytes[i++];
                        v4 = bytes[i++];
                        v5 = bytes[i++];
                        base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[31 & (v3 << 1 | v4 >>> 7)] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[31 & (v4 << 3 | v5 >>> 5)] + BASE32_ENCODE_CHAR[31 & v5];
                    }
                    var remain = length - count;
                    if (1 == remain) {
                        v1 = bytes[i];
                        base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[v1 << 2 & 31] + "======";
                    } else if (2 == remain) {
                        v1 = bytes[i++];
                        v2 = bytes[i];
                        base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[v2 << 4 & 31] + "====";
                    } else if (3 == remain) {
                        v1 = bytes[i++];
                        v2 = bytes[i++];
                        v3 = bytes[i];
                        base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[v3 << 1 & 31] + "===";
                    } else if (4 == remain) {
                        v1 = bytes[i++];
                        v2 = bytes[i++];
                        v3 = bytes[i++];
                        v4 = bytes[i];
                        base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[31 & (v3 << 1 | v4 >>> 7)] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[v4 << 3 & 31] + "=";
                    }
                    return base32Str;
                }, encode = function(input, asciiOnly) {
                    var notString = "string" != typeof input;
                    notString && input.constructor == ArrayBuffer && (input = new Uint8Array(input));
                    return notString ? encodeBytes(input) : asciiOnly ? encodeAscii(input) : encodeUtf8(input);
                }, decode = function(base32Str, asciiOnly) {
                    if (!asciiOnly) return toUtf8String(decodeAsBytes(base32Str));
                    var v1, v2, v3, v4, v5, v6, v7, v8, str = "", length = base32Str.indexOf("=");
                    -1 == length && (length = base32Str.length);
                    for (var i = 0, count = length >> 3 << 3; i < count; ) {
                        v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v6 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v7 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v8 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        str += String.fromCharCode(255 & (v1 << 3 | v2 >>> 2)) + String.fromCharCode(255 & (v2 << 6 | v3 << 1 | v4 >>> 4)) + String.fromCharCode(255 & (v4 << 4 | v5 >>> 1)) + String.fromCharCode(255 & (v5 << 7 | v6 << 2 | v7 >>> 3)) + String.fromCharCode(255 & (v7 << 5 | v8));
                    }
                    var remain = length - count;
                    if (2 == remain) {
                        v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        str += String.fromCharCode(255 & (v1 << 3 | v2 >>> 2));
                    } else if (4 == remain) {
                        v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        str += String.fromCharCode(255 & (v1 << 3 | v2 >>> 2)) + String.fromCharCode(255 & (v2 << 6 | v3 << 1 | v4 >>> 4));
                    } else if (5 == remain) {
                        v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        str += String.fromCharCode(255 & (v1 << 3 | v2 >>> 2)) + String.fromCharCode(255 & (v2 << 6 | v3 << 1 | v4 >>> 4)) + String.fromCharCode(255 & (v4 << 4 | v5 >>> 1));
                    } else if (7 == remain) {
                        v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v6 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v7 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        str += String.fromCharCode(255 & (v1 << 3 | v2 >>> 2)) + String.fromCharCode(255 & (v2 << 6 | v3 << 1 | v4 >>> 4)) + String.fromCharCode(255 & (v4 << 4 | v5 >>> 1)) + String.fromCharCode(255 & (v5 << 7 | v6 << 2 | v7 >>> 3));
                    }
                    return str;
                };
                decode.asBytes = decodeAsBytes;
                var exports = {
                    encode: encode,
                    decode: decode
                };
                root.HI_BASE32_TEST && (exports.toUtf8String = toUtf8String);
                !root.HI_BASE32_TEST && NODE_JS ? module.exports = exports : root && (root.base32 = exports);
            }(this);
        }).call(exports, __webpack_require__(54));
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function cleanUpWindow(win) {
            var requestPromises = __WEBPACK_IMPORTED_MODULE_0__global__.a.requestPromises.get(win);
            if (requestPromises) for (var _iterator = requestPromises, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                var _ref;
                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }
                var promise = _ref;
                promise.reject(new Error("No response from window - cleaned up"));
            }
            __WEBPACK_IMPORTED_MODULE_0__global__.a.popupWindowsByWin && __WEBPACK_IMPORTED_MODULE_0__global__.a.popupWindowsByWin.delete(win);
            __WEBPACK_IMPORTED_MODULE_0__global__.a.remoteWindows && __WEBPACK_IMPORTED_MODULE_0__global__.a.remoteWindows.delete(win);
            __WEBPACK_IMPORTED_MODULE_0__global__.a.requestPromises.delete(win);
            __WEBPACK_IMPORTED_MODULE_0__global__.a.methods.delete(win);
            __WEBPACK_IMPORTED_MODULE_0__global__.a.readyPromises.delete(win);
        }
        __webpack_exports__.a = cleanUpWindow;
        var __WEBPACK_IMPORTED_MODULE_0__global__ = __webpack_require__(7);
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function _defineProperty(obj, key, value) {
            key in obj ? Object.defineProperty(obj, key, {
                value: value,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : obj[key] = value;
            return obj;
        }
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return CONFIG;
        });
        var _ALLOWED_POST_MESSAGE, __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(30), CONFIG = {
            ALLOW_POSTMESSAGE_POPUP: !0,
            LOG_LEVEL: "info",
            BRIDGE_TIMEOUT: 5e3,
            ACK_TIMEOUT: 1e3,
            RES_TIMEOUT: 1 / 0,
            LOG_TO_PAGE: !1,
            ALLOWED_POST_MESSAGE_METHODS: (_ALLOWED_POST_MESSAGE = {}, _defineProperty(_ALLOWED_POST_MESSAGE, __WEBPACK_IMPORTED_MODULE_0__constants__.a.SEND_STRATEGIES.POST_MESSAGE, !0), 
            _defineProperty(_ALLOWED_POST_MESSAGE, __WEBPACK_IMPORTED_MODULE_0__constants__.a.SEND_STRATEGIES.BRIDGE, !0), 
            _defineProperty(_ALLOWED_POST_MESSAGE, __WEBPACK_IMPORTED_MODULE_0__constants__.a.SEND_STRATEGIES.GLOBAL, !0), 
            _ALLOWED_POST_MESSAGE)
        };
        0 === window.location.href.indexOf(__WEBPACK_IMPORTED_MODULE_0__constants__.a.FILE_PROTOCOL) && (CONFIG.ALLOW_POSTMESSAGE_POPUP = !0);
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function parseMessage(message) {
            var parsedMessage = void 0;
            try {
                parsedMessage = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.j)(message);
            } catch (err) {
                return;
            }
            if (parsedMessage && "object" === (void 0 === parsedMessage ? "undefined" : _typeof(parsedMessage)) && null !== parsedMessage) {
                parsedMessage = parsedMessage[__WEBPACK_IMPORTED_MODULE_1__conf__.b.WINDOW_PROPS.POSTROBOT];
                if (parsedMessage && "object" === (void 0 === parsedMessage ? "undefined" : _typeof(parsedMessage)) && null !== parsedMessage && parsedMessage.type && "string" == typeof parsedMessage.type && __WEBPACK_IMPORTED_MODULE_4__types__.a[parsedMessage.type]) return parsedMessage;
            }
        }
        function receiveMessage(event) {
            if (!window || window.closed) throw new Error("Message recieved in closed window");
            try {
                if (!event.source) return;
            } catch (err) {
                return;
            }
            var source = event.source, origin = event.origin, data = event.data, message = parseMessage(data);
            if (message) {
                if (!message.sourceDomain || "string" != typeof message.sourceDomain) throw new Error("Expected message to have sourceDomain");
                0 !== message.sourceDomain.indexOf(__WEBPACK_IMPORTED_MODULE_1__conf__.b.MOCK_PROTOCOL) && 0 !== message.sourceDomain.indexOf(__WEBPACK_IMPORTED_MODULE_1__conf__.b.FILE_PROTOCOL) || (origin = message.sourceDomain);
                if (-1 === __WEBPACK_IMPORTED_MODULE_3__global__.a.receivedMessages.indexOf(message.id)) {
                    __WEBPACK_IMPORTED_MODULE_3__global__.a.receivedMessages.push(message.id);
                    var level = void 0;
                    level = -1 !== __WEBPACK_IMPORTED_MODULE_1__conf__.c.indexOf(message.name) || message.type === __WEBPACK_IMPORTED_MODULE_1__conf__.b.POST_MESSAGE_TYPE.ACK ? "debug" : "error" === message.ack ? "error" : "info";
                    __WEBPACK_IMPORTED_MODULE_2__lib__.g.logLevel(level, [ "\n\n\t", "#receive", message.type.replace(/^postrobot_message_/, ""), "::", message.name, "::", origin, "\n\n", message ]);
                    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__.c)(source)) __WEBPACK_IMPORTED_MODULE_2__lib__.g.debug("Source window is closed - can not send " + message.type + " " + message.name); else {
                        message.data && (message.data = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.k)(source, origin, message.data));
                        __WEBPACK_IMPORTED_MODULE_4__types__.a[message.type](source, origin, message);
                    }
                }
            }
        }
        function messageListener(event) {
            try {
                event.source;
            } catch (err) {
                return;
            }
            var messageEvent = {
                source: event.source || event.sourceElement,
                origin: event.origin || event.originalEvent && event.originalEvent.origin,
                data: event.data
            };
            receiveMessage(messageEvent);
        }
        function listenForMessages() {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.l)(window, "message", messageListener);
        }
        __webpack_exports__.b = messageListener;
        __webpack_exports__.a = listenForMessages;
        var __WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__ = __webpack_require__(0), __WEBPACK_IMPORTED_MODULE_1__conf__ = __webpack_require__(4), __WEBPACK_IMPORTED_MODULE_2__lib__ = __webpack_require__(9), __WEBPACK_IMPORTED_MODULE_3__global__ = __webpack_require__(7), __WEBPACK_IMPORTED_MODULE_4__types__ = __webpack_require__(46), _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        __WEBPACK_IMPORTED_MODULE_3__global__.a.receivedMessages = __WEBPACK_IMPORTED_MODULE_3__global__.a.receivedMessages || [];
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function _defineProperty(obj, key, value) {
            key in obj ? Object.defineProperty(obj, key, {
                value: value,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : obj[key] = value;
            return obj;
        }
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return RECEIVE_MESSAGE_TYPES;
        });
        var _RECEIVE_MESSAGE_TYPE, __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__ = __webpack_require__(1), __WEBPACK_IMPORTED_MODULE_1_cross_domain_utils_src__ = __webpack_require__(0), __WEBPACK_IMPORTED_MODULE_2__conf__ = __webpack_require__(4), __WEBPACK_IMPORTED_MODULE_3__lib__ = __webpack_require__(9), __WEBPACK_IMPORTED_MODULE_4__send__ = __webpack_require__(32), __WEBPACK_IMPORTED_MODULE_5__listeners__ = __webpack_require__(31), _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        }, RECEIVE_MESSAGE_TYPES = (_RECEIVE_MESSAGE_TYPE = {}, _defineProperty(_RECEIVE_MESSAGE_TYPE, __WEBPACK_IMPORTED_MODULE_2__conf__.b.POST_MESSAGE_TYPE.ACK, function(source, origin, message) {
            var options = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__listeners__.a)(message.hash);
            if (!options) throw new Error("No handler found for post message ack for message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
            if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_cross_domain_utils_src__.f)(options.domain, origin)) throw new Error("Ack origin " + origin + " does not match domain " + options.domain.toString());
            options.ack = !0;
        }), _defineProperty(_RECEIVE_MESSAGE_TYPE, __WEBPACK_IMPORTED_MODULE_2__conf__.b.POST_MESSAGE_TYPE.REQUEST, function(source, origin, message) {
            function respond(data) {
                return message.fireAndForget || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_cross_domain_utils_src__.c)(source) ? __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__.a.resolve() : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__send__.a)(source, _extends({
                    target: message.originalSource,
                    hash: message.hash,
                    name: message.name
                }, data), origin);
            }
            var options = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__listeners__.b)({
                name: message.name,
                win: source,
                domain: origin
            });
            return __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__.a.all([ respond({
                type: __WEBPACK_IMPORTED_MODULE_2__conf__.b.POST_MESSAGE_TYPE.ACK
            }), __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__.a.try(function() {
                if (!options) throw new Error("No handler found for post message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_cross_domain_utils_src__.f)(options.domain, origin)) throw new Error("Request origin " + origin + " does not match domain " + options.domain.toString());
                var data = message.data;
                return options.handler({
                    source: source,
                    origin: origin,
                    data: data
                });
            }).then(function(data) {
                return respond({
                    type: __WEBPACK_IMPORTED_MODULE_2__conf__.b.POST_MESSAGE_TYPE.RESPONSE,
                    ack: __WEBPACK_IMPORTED_MODULE_2__conf__.b.POST_MESSAGE_ACK.SUCCESS,
                    data: data
                });
            }, function(err) {
                var error = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.i)(err).replace(/^Error: /, "");
                return respond({
                    type: __WEBPACK_IMPORTED_MODULE_2__conf__.b.POST_MESSAGE_TYPE.RESPONSE,
                    ack: __WEBPACK_IMPORTED_MODULE_2__conf__.b.POST_MESSAGE_ACK.ERROR,
                    error: error
                });
            }) ]).then(__WEBPACK_IMPORTED_MODULE_3__lib__.m).catch(function(err) {
                if (options && options.handleError) return options.handleError(err);
                __WEBPACK_IMPORTED_MODULE_3__lib__.g.error(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.i)(err));
            });
        }), _defineProperty(_RECEIVE_MESSAGE_TYPE, __WEBPACK_IMPORTED_MODULE_2__conf__.b.POST_MESSAGE_TYPE.RESPONSE, function(source, origin, message) {
            var options = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__listeners__.a)(message.hash);
            if (!options) throw new Error("No handler found for post message response for message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
            if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_cross_domain_utils_src__.f)(options.domain, origin)) throw new Error("Response origin " + origin + " does not match domain " + options.domain);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__listeners__.c)(message.hash);
            if (message.ack === __WEBPACK_IMPORTED_MODULE_2__conf__.b.POST_MESSAGE_ACK.ERROR) return options.respond(new Error(message.error), null);
            if (message.ack === __WEBPACK_IMPORTED_MODULE_2__conf__.b.POST_MESSAGE_ACK.SUCCESS) {
                var data = message.data || message.response;
                return options.respond(null, {
                    source: source,
                    origin: origin,
                    data: data
                });
            }
        }), _RECEIVE_MESSAGE_TYPE);
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return SEND_MESSAGE_STRATEGIES;
        });
        var __WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__ = __webpack_require__(0), __WEBPACK_IMPORTED_MODULE_1__conf__ = __webpack_require__(4), SEND_MESSAGE_STRATEGIES = {};
        SEND_MESSAGE_STRATEGIES[__WEBPACK_IMPORTED_MODULE_1__conf__.b.SEND_STRATEGIES.POST_MESSAGE] = function(win, serializedMessage, domain) {
            var domains = void 0;
            domains = Array.isArray(domain) ? domain : domain ? [ domain ] : [ __WEBPACK_IMPORTED_MODULE_1__conf__.b.WILDCARD ];
            domains = domains.map(function(dom) {
                if (0 === dom.indexOf(__WEBPACK_IMPORTED_MODULE_1__conf__.b.MOCK_PROTOCOL)) {
                    if (window.location.protocol === __WEBPACK_IMPORTED_MODULE_1__conf__.b.FILE_PROTOCOL) return __WEBPACK_IMPORTED_MODULE_1__conf__.b.WILDCARD;
                    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__.j)(win)) throw new Error("Attempting to send messsage to mock domain " + dom + ", but window is actually cross-domain");
                    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__.k)(win);
                }
                return 0 === dom.indexOf(__WEBPACK_IMPORTED_MODULE_1__conf__.b.FILE_PROTOCOL) ? __WEBPACK_IMPORTED_MODULE_1__conf__.b.WILDCARD : dom;
            });
            domains.forEach(function(dom) {
                return win.postMessage(serializedMessage, dom);
            });
        };
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function initOnReady() {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__interface__.on)(__WEBPACK_IMPORTED_MODULE_3__conf__.b.POST_MESSAGE_NAMES.READY, {
                window: __WEBPACK_IMPORTED_MODULE_3__conf__.b.WILDCARD,
                domain: __WEBPACK_IMPORTED_MODULE_3__conf__.b.WILDCARD
            }, function(event) {
                var win = event.source, promise = __WEBPACK_IMPORTED_MODULE_6__global__.a.readyPromises.get(win);
                if (promise) promise.resolve(event); else {
                    promise = new __WEBPACK_IMPORTED_MODULE_2_zalgo_promise_src__.a().resolve(event);
                    __WEBPACK_IMPORTED_MODULE_6__global__.a.readyPromises.set(win, promise);
                }
            });
            var parent = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_cross_domain_utils_src__.e)();
            parent && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__interface__.send)(parent, __WEBPACK_IMPORTED_MODULE_3__conf__.b.POST_MESSAGE_NAMES.READY, {}, {
                domain: __WEBPACK_IMPORTED_MODULE_3__conf__.b.WILDCARD,
                timeout: 1 / 0
            }).catch(function(err) {
                __WEBPACK_IMPORTED_MODULE_5__log__.a.debug(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__util__.b)(err));
            });
        }
        function onWindowReady(win) {
            var timeout = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 5e3, name = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "Window", promise = __WEBPACK_IMPORTED_MODULE_6__global__.a.readyPromises.get(win);
            if (promise) return promise;
            promise = new __WEBPACK_IMPORTED_MODULE_2_zalgo_promise_src__.a();
            __WEBPACK_IMPORTED_MODULE_6__global__.a.readyPromises.set(win, promise);
            setTimeout(function() {
                return promise.reject(new Error(name + " did not load after " + timeout + "ms"));
            }, timeout);
            return promise;
        }
        __webpack_exports__.a = initOnReady;
        __webpack_exports__.b = onWindowReady;
        var __WEBPACK_IMPORTED_MODULE_0_cross_domain_safe_weakmap_src__ = __webpack_require__(6), __WEBPACK_IMPORTED_MODULE_1_cross_domain_utils_src__ = __webpack_require__(0), __WEBPACK_IMPORTED_MODULE_2_zalgo_promise_src__ = __webpack_require__(1), __WEBPACK_IMPORTED_MODULE_3__conf__ = __webpack_require__(4), __WEBPACK_IMPORTED_MODULE_4__interface__ = __webpack_require__(18), __WEBPACK_IMPORTED_MODULE_5__log__ = __webpack_require__(24), __WEBPACK_IMPORTED_MODULE_6__global__ = __webpack_require__(7), __WEBPACK_IMPORTED_MODULE_7__util__ = __webpack_require__(19);
        __WEBPACK_IMPORTED_MODULE_6__global__.a.readyPromises = __WEBPACK_IMPORTED_MODULE_6__global__.a.readyPromises || new __WEBPACK_IMPORTED_MODULE_0_cross_domain_safe_weakmap_src__.a();
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function isSerialized(item, type) {
            return "object" === (void 0 === item ? "undefined" : _typeof(item)) && null !== item && item.__type__ === type;
        }
        function serializeMethod(destination, domain, method, name) {
            var id = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util__.f)(), methods = __WEBPACK_IMPORTED_MODULE_7__global__.a.methods.get(destination);
            if (!methods) {
                methods = {};
                __WEBPACK_IMPORTED_MODULE_7__global__.a.methods.set(destination, methods);
            }
            methods[id] = {
                domain: domain,
                method: method
            };
            return {
                __type__: __WEBPACK_IMPORTED_MODULE_3__conf__.b.SERIALIZATION_TYPES.METHOD,
                __id__: id,
                __name__: name
            };
        }
        function serializeError(err) {
            return {
                __type__: __WEBPACK_IMPORTED_MODULE_3__conf__.b.SERIALIZATION_TYPES.ERROR,
                __message__: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util__.b)(err)
            };
        }
        function serializePromise(destination, domain, promise, name) {
            return {
                __type__: __WEBPACK_IMPORTED_MODULE_3__conf__.b.SERIALIZATION_TYPES.PROMISE,
                __then__: serializeMethod(destination, domain, function(resolve, reject) {
                    return promise.then(resolve, reject);
                }, name + ".then")
            };
        }
        function serializeZalgoPromise(destination, domain, promise, name) {
            return {
                __type__: __WEBPACK_IMPORTED_MODULE_3__conf__.b.SERIALIZATION_TYPES.ZALGO_PROMISE,
                __then__: serializeMethod(destination, domain, function(resolve, reject) {
                    return promise.then(resolve, reject);
                }, name + ".then")
            };
        }
        function serializeRegex(regex) {
            return {
                __type__: __WEBPACK_IMPORTED_MODULE_3__conf__.b.SERIALIZATION_TYPES.REGEX,
                __source__: regex.source
            };
        }
        function serializeMethods(destination, domain, obj) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util__.g)({
                obj: obj
            }, function(item, key) {
                return "function" == typeof item ? serializeMethod(destination, domain, item, key.toString()) : item instanceof Error ? serializeError(item) : window.Promise && item instanceof window.Promise ? serializePromise(destination, domain, item, key.toString()) : __WEBPACK_IMPORTED_MODULE_2_zalgo_promise_src__.a.isPromise(item) ? serializeZalgoPromise(destination, domain, item, key.toString()) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util__.a)(item) ? serializeRegex(item) : void 0;
            }).obj;
        }
        function deserializeMethod(source, origin, obj) {
            function wrapper() {
                var args = Array.prototype.slice.call(arguments);
                __WEBPACK_IMPORTED_MODULE_6__log__.a.debug("Call foreign method", obj.__name__, args);
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__interface__.send)(source, __WEBPACK_IMPORTED_MODULE_3__conf__.b.POST_MESSAGE_NAMES.METHOD, {
                    id: obj.__id__,
                    name: obj.__name__,
                    args: args
                }, {
                    domain: origin,
                    timeout: 1 / 0
                }).then(function(_ref2) {
                    var data = _ref2.data;
                    __WEBPACK_IMPORTED_MODULE_6__log__.a.debug("Got foreign method result", obj.__name__, data.result);
                    return data.result;
                }, function(err) {
                    __WEBPACK_IMPORTED_MODULE_6__log__.a.debug("Got foreign method error", __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util__.b)(err));
                    throw err;
                });
            }
            wrapper.__name__ = obj.__name__;
            wrapper.__xdomain__ = !0;
            wrapper.source = source;
            wrapper.origin = origin;
            return wrapper;
        }
        function deserializeError(source, origin, obj) {
            return new Error(obj.__message__);
        }
        function deserializeZalgoPromise(source, origin, prom) {
            return new __WEBPACK_IMPORTED_MODULE_2_zalgo_promise_src__.a(function(resolve, reject) {
                return deserializeMethod(source, origin, prom.__then__)(resolve, reject);
            });
        }
        function deserializePromise(source, origin, prom) {
            return window.Promise ? new window.Promise(function(resolve, reject) {
                return deserializeMethod(source, origin, prom.__then__)(resolve, reject);
            }) : deserializeZalgoPromise(source, origin, prom);
        }
        function deserializeRegex(source, origin, item) {
            return new RegExp(item.__source__);
        }
        function deserializeMethods(source, origin, obj) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util__.g)({
                obj: obj
            }, function(item, key) {
                if ("object" === (void 0 === item ? "undefined" : _typeof(item)) && null !== item) return isSerialized(item, __WEBPACK_IMPORTED_MODULE_3__conf__.b.SERIALIZATION_TYPES.METHOD) ? deserializeMethod(source, origin, item) : isSerialized(item, __WEBPACK_IMPORTED_MODULE_3__conf__.b.SERIALIZATION_TYPES.ERROR) ? deserializeError(source, origin, item) : isSerialized(item, __WEBPACK_IMPORTED_MODULE_3__conf__.b.SERIALIZATION_TYPES.PROMISE) ? deserializePromise(source, origin, item) : isSerialized(item, __WEBPACK_IMPORTED_MODULE_3__conf__.b.SERIALIZATION_TYPES.ZALGO_PROMISE) ? deserializeZalgoPromise(source, origin, item) : isSerialized(item, __WEBPACK_IMPORTED_MODULE_3__conf__.b.SERIALIZATION_TYPES.REGEX) ? deserializeRegex(source, origin, item) : void 0;
            }).obj;
        }
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return listenForMethods;
        });
        __webpack_exports__.b = serializeMethods;
        __webpack_exports__.c = deserializeMethods;
        var __WEBPACK_IMPORTED_MODULE_0_cross_domain_safe_weakmap_src__ = __webpack_require__(6), __WEBPACK_IMPORTED_MODULE_1_cross_domain_utils_src__ = __webpack_require__(0), __WEBPACK_IMPORTED_MODULE_2_zalgo_promise_src__ = __webpack_require__(1), __WEBPACK_IMPORTED_MODULE_3__conf__ = __webpack_require__(4), __WEBPACK_IMPORTED_MODULE_4__util__ = __webpack_require__(19), __WEBPACK_IMPORTED_MODULE_5__interface__ = __webpack_require__(18), __WEBPACK_IMPORTED_MODULE_6__log__ = __webpack_require__(24), __WEBPACK_IMPORTED_MODULE_7__global__ = __webpack_require__(7), _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        __WEBPACK_IMPORTED_MODULE_7__global__.a.methods = __WEBPACK_IMPORTED_MODULE_7__global__.a.methods || new __WEBPACK_IMPORTED_MODULE_0_cross_domain_safe_weakmap_src__.a();
        var listenForMethods = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util__.e)(function() {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__interface__.on)(__WEBPACK_IMPORTED_MODULE_3__conf__.b.POST_MESSAGE_NAMES.METHOD, {
                window: __WEBPACK_IMPORTED_MODULE_3__conf__.b.WILDCARD,
                origin: __WEBPACK_IMPORTED_MODULE_3__conf__.b.WILDCARD
            }, function(_ref) {
                var source = _ref.source, origin = _ref.origin, data = _ref.data, methods = __WEBPACK_IMPORTED_MODULE_7__global__.a.methods.get(source);
                if (!methods) throw new Error("Could not find any methods this window has privileges to call");
                var meth = methods[data.id];
                if (!meth) throw new Error("Could not find method with id: " + data.id);
                if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_cross_domain_utils_src__.f)(meth.domain, origin)) throw new Error("Method domain " + meth.domain + " does not match origin " + origin);
                __WEBPACK_IMPORTED_MODULE_6__log__.a.debug("Call local method", data.name, data.args);
                return __WEBPACK_IMPORTED_MODULE_2_zalgo_promise_src__.a.try(function() {
                    return meth.method.apply({
                        source: source,
                        origin: origin,
                        data: data
                    }, data.args);
                }).then(function(result) {
                    return {
                        result: result,
                        id: data.id,
                        name: data.name
                    };
                });
            });
        });
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function request(options) {
            return __WEBPACK_IMPORTED_MODULE_1_zalgo_promise_src__.a.try(function() {
                if (!options.name) throw new Error("Expected options.name");
                var name = options.name, win = options.window, domain = void 0;
                if ("string" == typeof win) {
                    var el = document.getElementById(win);
                    if (!el) throw new Error("Expected options.window " + Object.prototype.toString.call(win) + " to be a valid element id");
                    if ("iframe" !== el.tagName.toLowerCase()) throw new Error("Expected options.window " + Object.prototype.toString.call(win) + " to be an iframe");
                    if (!el.contentWindow) throw new Error("Iframe must have contentWindow.  Make sure it has a src attribute and is in the DOM.");
                    win = el.contentWindow;
                } else if (win instanceof HTMLElement) {
                    if ("iframe" !== win.tagName.toLowerCase()) throw new Error("Expected options.window " + Object.prototype.toString.call(win) + " to be an iframe");
                    if (win && !win.contentWindow) throw new Error("Iframe must have contentWindow.  Make sure it has a src attribute and is in the DOM.");
                    win && win.contentWindow && (win = win.contentWindow);
                }
                if (!win) throw new Error("Expected options.window to be a window object, iframe, or iframe element id.");
                domain = options.domain || __WEBPACK_IMPORTED_MODULE_3__conf__.b.WILDCARD;
                var hash = options.name + "_" + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.d)();
                if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_cross_domain_utils_src__.c)(win)) throw new Error("Target window is closed");
                var hasResult = !1, requestPromises = __WEBPACK_IMPORTED_MODULE_6__global__.a.requestPromises.get(win);
                if (!requestPromises) {
                    requestPromises = [];
                    __WEBPACK_IMPORTED_MODULE_6__global__.a.requestPromises.set(win, requestPromises);
                }
                var requestPromise = __WEBPACK_IMPORTED_MODULE_1_zalgo_promise_src__.a.try(function() {
                    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_cross_domain_utils_src__.l)(window, win)) return __WEBPACK_IMPORTED_MODULE_1_zalgo_promise_src__.a.resolve(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.p)(win));
                }).then(function() {
                    return new __WEBPACK_IMPORTED_MODULE_1_zalgo_promise_src__.a(function(resolve, reject) {
                        var responseListener = {
                            name: name,
                            window: win,
                            domain: domain,
                            respond: function(err, result) {
                                if (!err) {
                                    hasResult = !0;
                                    requestPromises.splice(requestPromises.indexOf(requestPromise, 1));
                                }
                                err ? reject(err) : resolve(result);
                            }
                        };
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__drivers__.d)(hash, responseListener);
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__drivers__.e)(win, {
                            type: __WEBPACK_IMPORTED_MODULE_3__conf__.b.POST_MESSAGE_TYPE.REQUEST,
                            hash: hash,
                            name: name,
                            data: options.data,
                            fireAndForget: options.fireAndForget
                        }, domain).catch(reject);
                        if (options.fireAndForget) return resolve();
                        var ackTimeout = __WEBPACK_IMPORTED_MODULE_3__conf__.a.ACK_TIMEOUT, resTimeout = options.timeout || __WEBPACK_IMPORTED_MODULE_3__conf__.a.RES_TIMEOUT, cycleTime = 100, cycle = function cycle() {
                            if (!hasResult) {
                                if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_cross_domain_utils_src__.c)(win)) return reject(responseListener.ack ? new Error("Window closed for " + name + " before response") : new Error("Window closed for " + name + " before ack"));
                                ackTimeout -= cycleTime;
                                resTimeout -= cycleTime;
                                if (responseListener.ack) {
                                    if (resTimeout === 1 / 0) return;
                                    cycleTime = Math.min(resTimeout, 2e3);
                                } else {
                                    if (ackTimeout <= 0) return reject(new Error("No ack for postMessage " + name + " in " + __WEBPACK_IMPORTED_MODULE_3__conf__.a.ACK_TIMEOUT + "ms"));
                                    if (resTimeout <= 0) return reject(new Error("No response for postMessage " + name + " in " + (options.timeout || __WEBPACK_IMPORTED_MODULE_3__conf__.a.RES_TIMEOUT) + "ms"));
                                }
                                setTimeout(cycle, cycleTime);
                            }
                        };
                        setTimeout(cycle, cycleTime);
                    });
                });
                requestPromise.catch(function() {
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__drivers__.f)(hash);
                });
                requestPromises.push(requestPromise);
                return requestPromise;
            });
        }
        function _send(window, name, data, options) {
            options = options || {};
            options.window = window;
            options.name = name;
            options.data = data;
            return request(options);
        }
        function sendToParent(name, data, options) {
            var win = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_cross_domain_utils_src__.e)();
            return win ? _send(win, name, data, options) : new __WEBPACK_IMPORTED_MODULE_1_zalgo_promise_src__.a(function(resolve, reject) {
                return reject(new Error("Window does not have a parent"));
            });
        }
        function client() {
            var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            if (!options.window) throw new Error("Expected options.window");
            return {
                send: function(name, data) {
                    return _send(options.window, name, data, options);
                }
            };
        }
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return _send;
        });
        __webpack_exports__.b = request;
        __webpack_exports__.c = sendToParent;
        __webpack_exports__.d = client;
        var __WEBPACK_IMPORTED_MODULE_0_cross_domain_safe_weakmap_src__ = __webpack_require__(6), __WEBPACK_IMPORTED_MODULE_1_zalgo_promise_src__ = __webpack_require__(1), __WEBPACK_IMPORTED_MODULE_2_cross_domain_utils_src__ = __webpack_require__(0), __WEBPACK_IMPORTED_MODULE_3__conf__ = __webpack_require__(4), __WEBPACK_IMPORTED_MODULE_4__drivers__ = __webpack_require__(11), __WEBPACK_IMPORTED_MODULE_5__lib__ = __webpack_require__(9), __WEBPACK_IMPORTED_MODULE_6__global__ = __webpack_require__(7);
        __WEBPACK_IMPORTED_MODULE_6__global__.a.requestPromises = __WEBPACK_IMPORTED_MODULE_6__global__.a.requestPromises || new __WEBPACK_IMPORTED_MODULE_0_cross_domain_safe_weakmap_src__.a();
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function disable() {
            delete window[__WEBPACK_IMPORTED_MODULE_0__conf__.b.WINDOW_PROPS.POSTROBOT];
            window.removeEventListener("message", __WEBPACK_IMPORTED_MODULE_1__drivers__.b);
        }
        __webpack_exports__.c = disable;
        var __WEBPACK_IMPORTED_MODULE_0__conf__ = __webpack_require__(4), __WEBPACK_IMPORTED_MODULE_1__drivers__ = __webpack_require__(11);
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return __WEBPACK_IMPORTED_MODULE_0__conf__.a;
        });
        __webpack_require__.d(__webpack_exports__, "b", function() {
            return __WEBPACK_IMPORTED_MODULE_0__conf__.b;
        });
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return parent;
        });
        __webpack_require__.d(__webpack_exports__, "b", function() {
            return bridge;
        });
        var __WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__ = __webpack_require__(0), __WEBPACK_IMPORTED_MODULE_1__client__ = __webpack_require__(50);
        __webpack_require__.d(__webpack_exports__, "c", function() {
            return __WEBPACK_IMPORTED_MODULE_1__client__.a;
        });
        __webpack_require__.d(__webpack_exports__, "d", function() {
            return __WEBPACK_IMPORTED_MODULE_1__client__.b;
        });
        __webpack_require__.d(__webpack_exports__, "e", function() {
            return __WEBPACK_IMPORTED_MODULE_1__client__.c;
        });
        __webpack_require__.d(__webpack_exports__, "f", function() {
            return __WEBPACK_IMPORTED_MODULE_1__client__.d;
        });
        var __WEBPACK_IMPORTED_MODULE_2__server__ = __webpack_require__(53);
        __webpack_require__.d(__webpack_exports__, "g", function() {
            return __WEBPACK_IMPORTED_MODULE_2__server__.a;
        });
        __webpack_require__.d(__webpack_exports__, "h", function() {
            return __WEBPACK_IMPORTED_MODULE_2__server__.b;
        });
        __webpack_require__.d(__webpack_exports__, "i", function() {
            return __WEBPACK_IMPORTED_MODULE_2__server__.c;
        });
        __webpack_require__.d(__webpack_exports__, "j", function() {
            return __WEBPACK_IMPORTED_MODULE_2__server__.d;
        });
        var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(51);
        __webpack_require__.d(__webpack_exports__, "k", function() {
            return __WEBPACK_IMPORTED_MODULE_3__config__.a;
        });
        __webpack_require__.d(__webpack_exports__, "l", function() {
            return __WEBPACK_IMPORTED_MODULE_3__config__.b;
        });
        __webpack_require__.d(__webpack_exports__, "m", function() {
            return __WEBPACK_IMPORTED_MODULE_3__config__.c;
        });
        var parent = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__.e)(), bridge = void 0;
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function listen(options) {
            if (!options.name) throw new Error("Expected options.name");
            if (!options.handler) throw new Error("Expected options.handler");
            var listenerOptions = {
                handler: options.handler,
                handleError: options.errorHandler || function(err) {
                    throw err;
                },
                window: options.window,
                domain: options.domain || __WEBPACK_IMPORTED_MODULE_4__conf__.b.WILDCARD,
                name: options.name
            }, requestListener = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__drivers__.c)({
                name: listenerOptions.name,
                win: listenerOptions.window,
                domain: listenerOptions.domain
            }, listenerOptions);
            if (options.once) {
                var _handler = listenerOptions.handler;
                listenerOptions.handler = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.n)(function() {
                    requestListener.cancel();
                    return _handler.apply(this, arguments);
                });
            }
            if (listenerOptions.window && options.errorOnClose) var interval = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.o)(function() {
                if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__.c)(listenerOptions.window)) {
                    interval.cancel();
                    listenerOptions.handleError(new Error("Post message target window is closed"));
                }
            }, 50);
            return {
                cancel: function() {
                    requestListener.cancel();
                }
            };
        }
        function _on(name, options, handler) {
            if ("function" == typeof options) {
                handler = options;
                options = {};
            }
            options = options || {};
            options.name = name;
            options.handler = handler || options.handler;
            return listen(options);
        }
        function once(name) {
            var options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, handler = arguments[2];
            if ("function" == typeof options) {
                handler = options;
                options = {};
            }
            options = options || {};
            handler = handler || options.handler;
            var errorHandler = options.errorHandler, promise = new __WEBPACK_IMPORTED_MODULE_1_zalgo_promise_src__.a(function(resolve, reject) {
                options = options || {};
                options.name = name;
                options.once = !0;
                options.handler = function(event) {
                    resolve(event);
                    if (handler) return handler(event);
                };
                options.errorHandler = function(err) {
                    reject(err);
                    if (errorHandler) return errorHandler(err);
                };
            }), onceListener = listen(options);
            promise.cancel = onceListener.cancel;
            return promise;
        }
        function listener() {
            var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return {
                on: function(name, handler) {
                    return _on(name, options, handler);
                }
            };
        }
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return _on;
        });
        __webpack_exports__.b = listen;
        __webpack_exports__.c = once;
        __webpack_exports__.d = listener;
        var __WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__ = __webpack_require__(0), __WEBPACK_IMPORTED_MODULE_1_zalgo_promise_src__ = __webpack_require__(1), __WEBPACK_IMPORTED_MODULE_2__lib__ = __webpack_require__(9), __WEBPACK_IMPORTED_MODULE_3__drivers__ = __webpack_require__(11), __WEBPACK_IMPORTED_MODULE_4__conf__ = __webpack_require__(4);
    }, function(module, exports) {
        var g, _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        g = function() {
            return this;
        }();
        try {
            g = g || Function("return this")() || (0, eval)("this");
        } catch (e) {
            "object" === ("undefined" == typeof window ? "undefined" : _typeof(window)) && (g = window);
        }
        module.exports = g;
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function dispatchPossiblyUnhandledError(err) {
            if (-1 === dispatchedErrors.indexOf(err)) {
                dispatchedErrors.push(err);
                setTimeout(function() {
                    throw err;
                }, 1);
                for (var j = 0; j < possiblyUnhandledPromiseHandlers.length; j++) possiblyUnhandledPromiseHandlers[j](err);
            }
        }
        function onPossiblyUnhandledException(handler) {
            possiblyUnhandledPromiseHandlers.push(handler);
            return {
                cancel: function() {
                    possiblyUnhandledPromiseHandlers.splice(possiblyUnhandledPromiseHandlers.indexOf(handler), 1);
                }
            };
        }
        __webpack_exports__.a = dispatchPossiblyUnhandledError;
        __webpack_exports__.b = onPossiblyUnhandledException;
        var possiblyUnhandledPromiseHandlers = [], dispatchedErrors = [];
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return ZalgoPromise;
        });
        var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(57), __WEBPACK_IMPORTED_MODULE_1__exceptions__ = __webpack_require__(55), _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1;
                    descriptor.configurable = !0;
                    "value" in descriptor && (descriptor.writable = !0);
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                protoProps && defineProperties(Constructor.prototype, protoProps);
                staticProps && defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }(), global = window.__zalgopromise__ = window.__zalgopromise__ || {
            flushPromises: [],
            activeCount: 0
        }, ZalgoPromise = function() {
            function ZalgoPromise(handler) {
                var _this = this;
                _classCallCheck(this, ZalgoPromise);
                this.resolved = !1;
                this.rejected = !1;
                this.errorHandled = !1;
                this.handlers = [];
                if (handler) {
                    var _result = void 0, _error = void 0, resolved = !1, rejected = !1, isAsync = !1;
                    try {
                        handler(function(res) {
                            if (isAsync) _this.resolve(res); else {
                                resolved = !0;
                                _result = res;
                            }
                        }, function(err) {
                            if (isAsync) _this.reject(err); else {
                                rejected = !0;
                                _error = err;
                            }
                        });
                    } catch (err) {
                        this.reject(err);
                        return;
                    }
                    isAsync = !0;
                    resolved ? this.resolve(_result) : rejected && this.reject(_error);
                }
            }
            _createClass(ZalgoPromise, [ {
                key: "resolve",
                value: function(result) {
                    if (this.resolved || this.rejected) return this;
                    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__.a)(result)) throw new Error("Can not resolve promise with another promise");
                    this.resolved = !0;
                    this.value = result;
                    this.dispatch();
                    return this;
                }
            }, {
                key: "reject",
                value: function(error) {
                    var _this2 = this;
                    if (this.resolved || this.rejected) return this;
                    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__.a)(error)) throw new Error("Can not reject promise with another promise");
                    if (!error) {
                        var _err = error && "function" == typeof error.toString ? error.toString() : Object.prototype.toString.call(error);
                        error = new Error("Expected reject to be called with Error, got " + _err);
                    }
                    this.rejected = !0;
                    this.error = error;
                    this.errorHandled || setTimeout(function() {
                        _this2.errorHandled || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__exceptions__.a)(error);
                    }, 1);
                    this.dispatch();
                    return this;
                }
            }, {
                key: "asyncReject",
                value: function(error) {
                    this.errorHandled = !0;
                    this.reject(error);
                }
            }, {
                key: "dispatch",
                value: function() {
                    var _this3 = this, dispatching = this.dispatching, resolved = this.resolved, rejected = this.rejected, handlers = this.handlers;
                    if (!dispatching && (resolved || rejected)) {
                        this.dispatching = !0;
                        global.activeCount += 1;
                        for (var i = 0; i < handlers.length; i++) {
                            (function(i) {
                                var _handlers$i = handlers[i], onSuccess = _handlers$i.onSuccess, onError = _handlers$i.onError, promise = _handlers$i.promise, result = void 0;
                                if (resolved) try {
                                    result = onSuccess ? onSuccess(_this3.value) : _this3.value;
                                } catch (err) {
                                    promise.reject(err);
                                    return "continue";
                                } else if (rejected) {
                                    if (!onError) {
                                        promise.reject(_this3.error);
                                        return "continue";
                                    }
                                    try {
                                        result = onError(_this3.error);
                                    } catch (err) {
                                        promise.reject(err);
                                        return "continue";
                                    }
                                }
                                if (result instanceof ZalgoPromise && (result.resolved || result.rejected)) {
                                    result.resolved ? promise.resolve(result.value) : promise.reject(result.error);
                                    result.errorHandled = !0;
                                } else __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__.a)(result) ? result instanceof ZalgoPromise && (result.resolved || result.rejected) ? result.resolved ? promise.resolve(result.value) : promise.reject(result.error) : result.then(function(res) {
                                    promise.resolve(res);
                                }, function(err) {
                                    promise.reject(err);
                                }) : promise.resolve(result);
                            })(i);
                        }
                        handlers.length = 0;
                        this.dispatching = !1;
                        global.activeCount -= 1;
                        0 === global.activeCount && ZalgoPromise.flushQueue();
                    }
                }
            }, {
                key: "then",
                value: function(onSuccess, onError) {
                    if (onSuccess && "function" != typeof onSuccess && !onSuccess.call) throw new Error("Promise.then expected a function for success handler");
                    if (onError && "function" != typeof onError && !onError.call) throw new Error("Promise.then expected a function for error handler");
                    var promise = new ZalgoPromise();
                    this.handlers.push({
                        promise: promise,
                        onSuccess: onSuccess,
                        onError: onError
                    });
                    this.errorHandled = !0;
                    this.dispatch();
                    return promise;
                }
            }, {
                key: "catch",
                value: function(onError) {
                    return this.then(void 0, onError);
                }
            }, {
                key: "finally",
                value: function(handler) {
                    return this.then(function(result) {
                        return ZalgoPromise.try(handler).then(function() {
                            return result;
                        });
                    }, function(err) {
                        return ZalgoPromise.try(handler).then(function() {
                            throw err;
                        });
                    });
                }
            }, {
                key: "timeout",
                value: function(time, err) {
                    var _this4 = this;
                    if (this.resolved || this.rejected) return this;
                    var timeout = setTimeout(function() {
                        _this4.resolved || _this4.rejected || _this4.reject(err || new Error("Promise timed out after " + time + "ms"));
                    }, time);
                    return this.then(function(result) {
                        clearTimeout(timeout);
                        return result;
                    });
                }
            }, {
                key: "toPromise",
                value: function() {
                    if (!window.Promise) throw new Error("Could not find window.Promise");
                    return window.Promise.resolve(this);
                }
            } ], [ {
                key: "resolve",
                value: function(value) {
                    return value instanceof ZalgoPromise ? value : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__.a)(value) ? new ZalgoPromise(function(resolve, reject) {
                        return value.then(resolve, reject);
                    }) : new ZalgoPromise().resolve(value);
                }
            }, {
                key: "reject",
                value: function(error) {
                    return new ZalgoPromise().reject(error);
                }
            }, {
                key: "all",
                value: function(promises) {
                    var promise = new ZalgoPromise(), count = promises.length, results = [];
                    if (!count) {
                        promise.resolve(results);
                        return promise;
                    }
                    for (var i = 0; i < promises.length; i++) {
                        (function(i) {
                            var prom = promises[i];
                            if (prom instanceof ZalgoPromise) {
                                if (prom.resolved) {
                                    results[i] = prom.value;
                                    count -= 1;
                                    return "continue";
                                }
                            } else if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__.a)(prom)) {
                                results[i] = prom;
                                count -= 1;
                                return "continue";
                            }
                            ZalgoPromise.resolve(prom).then(function(result) {
                                results[i] = result;
                                count -= 1;
                                0 === count && promise.resolve(results);
                            }, function(err) {
                                promise.reject(err);
                            });
                        })(i);
                    }
                    0 === count && promise.resolve(results);
                    return promise;
                }
            }, {
                key: "map",
                value: function(promises, method) {
                    var promise = new ZalgoPromise(), count = promises.length, results = [];
                    if (!count) {
                        promise.resolve(results);
                        return promise;
                    }
                    for (var i = 0; i < promises.length; i++) !function(i) {
                        ZalgoPromise.try(function() {
                            return method(promises[i]);
                        }).then(function(result) {
                            results[i] = result;
                            count -= 1;
                            0 === count && promise.resolve(results);
                        }, function(err) {
                            promise.reject(err);
                        });
                    }(i);
                    return promise;
                }
            }, {
                key: "onPossiblyUnhandledException",
                value: function(handler) {
                    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__exceptions__.b)(handler);
                }
            }, {
                key: "try",
                value: function(method, context, args) {
                    var result = void 0;
                    try {
                        result = method.apply(context, args || []);
                    } catch (err) {
                        return ZalgoPromise.reject(err);
                    }
                    return ZalgoPromise.resolve(result);
                }
            }, {
                key: "delay",
                value: function(_delay) {
                    return new ZalgoPromise(function(resolve) {
                        setTimeout(resolve, _delay);
                    });
                }
            }, {
                key: "hash",
                value: function(obj) {
                    var results = {}, promises = [];
                    for (var key in obj) !function(key) {
                        obj.hasOwnProperty(key) && promises.push(ZalgoPromise.resolve(obj[key]).then(function(result) {
                            results[key] = result;
                        }));
                    }(key);
                    return ZalgoPromise.all(promises).then(function() {
                        return results;
                    });
                }
            }, {
                key: "isPromise",
                value: function(value) {
                    return !!(value && value instanceof ZalgoPromise) || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__.a)(value);
                }
            }, {
                key: "flush",
                value: function() {
                    var promise = new ZalgoPromise();
                    global.flushPromises.push(promise);
                    0 === global.activeCount && ZalgoPromise.flushQueue();
                    return promise;
                }
            }, {
                key: "flushQueue",
                value: function() {
                    var promisesToFlush = global.flushPromises;
                    global.flushPromises = [];
                    for (var _iterator = promisesToFlush, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                        var _ref;
                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref = _iterator[_i++];
                        } else {
                            _i = _iterator.next();
                            if (_i.done) break;
                            _ref = _i.value;
                        }
                        _ref.resolve();
                    }
                }
            } ]);
            return ZalgoPromise;
        }();
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function isPromise(item) {
            try {
                if (!item) return !1;
                if (window.Promise && item instanceof window.Promise) return !0;
                if (window.Window && item instanceof window.Window) return !1;
                if (window.constructor && item instanceof window.constructor) return !1;
                if (toString) {
                    var name = toString.call(item);
                    if ("[object Window]" === name || "[object global]" === name || "[object DOMWindow]" === name) return !1;
                }
                if ("function" == typeof item.then) return !0;
            } catch (err) {
                return !1;
            }
            return !1;
        }
        __webpack_exports__.a = isPromise;
        var toString = {}.toString;
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function normalizeChildProp(component, props, key, value) {
            var prop = component.getProp(key);
            if (!prop) {
                if (component.looseProps) return value;
                throw new Error("Unrecognized prop: " + key);
            }
            "function" == typeof prop.childDecorate && (value = prop.childDecorate(value));
            return value;
        }
        function normalizeChildProps(component, props, origin) {
            for (var required = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3], result = {}, _iterator = Object.keys(props), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                var _ref;
                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }
                var _key = _ref, prop = component.getProp(_key), value = props[_key];
                if (!prop || !prop.sameDomain || origin === __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__.i)(window)) {
                    result[_key] = normalizeChildProp(component, props, _key, value);
                    prop && prop.alias && !result[prop.alias] && (result[prop.alias] = value);
                }
            }
            if (required) for (var _iterator2 = component.getPropNames(), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                var _ref2;
                if (_isArray2) {
                    if (_i2 >= _iterator2.length) break;
                    _ref2 = _iterator2[_i2++];
                } else {
                    _i2 = _iterator2.next();
                    if (_i2.done) break;
                    _ref2 = _i2.value;
                }
                var key = _ref2;
                props.hasOwnProperty(key) || (result[key] = normalizeChildProp(component, props, key, props[key]));
            }
            return result;
        }
        __webpack_exports__.a = normalizeChildProps;
        var __WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__ = __webpack_require__(0);
        __webpack_require__(2), __webpack_require__(12);
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function defaultPrerenderTemplate(_ref) {
            var jsxDom = _ref.jsxDom;
            return jsxDom("html", null, jsxDom("head", null, jsxDom("style", null, "\n                        html, body {\n                            width: 100%;\n                            height: 100%;\n                            overflow: hidden;\n                            top: 0;\n                            left: 0;\n                            margin: 0;\n                            text-align: center;\n                        }\n\n                        .spinner {\n                            position: absolute;\n                            max-height: 60vmin;\n                            max-width: 60vmin;\n                            height: 40px;\n                            width: 40px;\n                            top: 50%;\n                            left: 50%;\n                            transform: translateX(-50%) translateY(-50%);\n                            z-index: 10;\n                        }\n\n                        .spinner .loader {\n                            height: 100%;\n                            width: 100%;\n                            box-sizing: border-box;\n                            border: 3px solid rgba(0, 0, 0, .2);\n                            border-top-color: rgba(33, 128, 192, 0.8);\n                            border-radius: 100%;\n                            animation: rotation .7s infinite linear;\n\n                        }\n\n                        @keyframes rotation {\n                            from {\n                                transform: rotate(0deg)\n                            }\n                            to {\n                                transform: rotate(359deg)\n                            }\n                        }\n                    ")), jsxDom("body", null, jsxDom("div", {
                class: "spinner"
            }, jsxDom("div", {
                id: "loader",
                class: "loader"
            }))));
        }
        __webpack_exports__.a = defaultPrerenderTemplate;
        __webpack_require__(10);
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function defaultContainerTemplate(_ref) {
            var id = _ref.id, tag = _ref.tag, context = _ref.context, CLASS = _ref.CLASS, outlet = _ref.outlet, jsxDom = _ref.jsxDom, _ref$dimensions = _ref.dimensions, width = _ref$dimensions.width, height = _ref$dimensions.height;
            return jsxDom("div", {
                id: id,
                class: CLASS.XCOMPONENT + " " + CLASS.XCOMPONENT + "-tag-" + tag + " " + CLASS.XCOMPONENT + "-context-" + context
            }, jsxDom("style", null, "\n                    #" + id + " > ." + CLASS.OUTLET + " {\n                        display: inline-block;\n                        width: " + width + ";\n                        height: " + height + ";\n                        position: relative;\n                    }\n\n                    #" + id + " > ." + CLASS.OUTLET + " > iframe {\n                        height: 100%;\n                        width: 100%;\n                        position: absolute;\n                        top: 0;\n                        left: 0;\n                        transition: opacity .2s ease-in-out;\n                    }\n\n                    #" + id + " > ." + CLASS.OUTLET + " > iframe." + CLASS.VISIBLE + " {\n                        opacity: 1;\n                    }\n\n                    #" + id + " > ." + CLASS.OUTLET + " > iframe." + CLASS.INVISIBLE + " {\n                        opacity: 0;\n                    }\n                "), outlet);
        }
        __webpack_exports__.a = defaultContainerTemplate;
        __webpack_require__(10);
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var __WEBPACK_IMPORTED_MODULE_0__container__ = __webpack_require__(60);
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return __WEBPACK_IMPORTED_MODULE_0__container__.a;
        });
        var __WEBPACK_IMPORTED_MODULE_1__component__ = __webpack_require__(59);
        __webpack_require__.d(__webpack_exports__, "b", function() {
            return __WEBPACK_IMPORTED_MODULE_1__component__.a;
        });
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function validatePropDefinitions(options) {
            if (options.props && "object" !== _typeof(options.props)) throw new Error("Expected options.props to be an object");
            if (options.props) for (var _iterator = Object.keys(options.props), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                var _ref;
                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }
                var key = _ref, prop = options.props[key];
                if (!prop || "object" !== (void 0 === prop ? "undefined" : _typeof(prop))) throw new Error("Expected options.props." + key + " to be an object");
                if (!prop.type) throw new Error("Expected prop.type");
                if (-1 === __WEBPACK_IMPORTED_MODULE_0__constants__.PROP_TYPES_LIST.indexOf(prop.type)) throw new Error("Expected prop.type to be one of " + __WEBPACK_IMPORTED_MODULE_0__constants__.PROP_TYPES_LIST.join(", "));
                if (prop.required && prop.def) throw new Error("Required prop can not have a default value");
            }
        }
        function validate(options) {
            if (!options) throw new Error("Expecred options to be passed");
            if (!options.tag || !options.tag.match(/^[a-z0-9-]+$/)) throw new Error("Invalid options.tag: " + options.tag);
            validatePropDefinitions(options);
            if (options.dimensions) {
                if (options.dimensions && !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__._2)(options.dimensions.width) && !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__._3)(options.dimensions.width)) throw new Error("Expected options.dimensions.width to be a px or % string value");
                if (options.dimensions && !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__._2)(options.dimensions.height) && !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__._3)(options.dimensions.height)) throw new Error("Expected options.dimensions.height to be a px or % string value");
            }
            if (options.contexts) {
                if (options.contexts.popup) throw new Error("Popups not supported in this build -- please use the full xcomponent.js build");
                for (var anyEnabled = !1, _iterator2 = Object.keys(options.contexts), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                    var _ref2;
                    if (_isArray2) {
                        if (_i2 >= _iterator2.length) break;
                        _ref2 = _iterator2[_i2++];
                    } else {
                        _i2 = _iterator2.next();
                        if (_i2.done) break;
                        _ref2 = _i2.value;
                    }
                    var context = _ref2;
                    if (-1 === __WEBPACK_IMPORTED_MODULE_0__constants__.CONTEXT_TYPES_LIST.indexOf(context)) throw new Error("Unsupported context type: " + context);
                    (options.contexts && options.contexts[context] || options.contexts && void 0 === options.contexts[context]) && (anyEnabled = !0);
                }
                if (!anyEnabled) throw new Error("No context type is enabled");
            }
            if (options.defaultContext) {
                if (-1 === __WEBPACK_IMPORTED_MODULE_0__constants__.CONTEXT_TYPES_LIST.indexOf(options.defaultContext)) throw new Error("Unsupported context type: " + (options.defaultContext || "unknown"));
                if (options.contexts && options.defaultContext && !options.contexts[options.defaultContext]) throw new Error("Disallowed default context type: " + (options.defaultContext || "unknown"));
            }
            if (!options.url && !options.buildUrl) throw new Error("Expected options.url to be passed");
            if (options.url && options.buildUrl) throw new Error("Can not pass options.url and options.buildUrl");
            if (options.defaultEnv) {
                if ("string" != typeof options.defaultEnv) throw new Error("Expected options.defaultEnv to be a string");
                if (!options.buildUrl && "object" !== _typeof(options.url)) throw new Error("Expected options.url to be an object mapping env->url");
                if (options.url && "object" === _typeof(options.url) && !options.url[options.defaultEnv]) throw new Error("No url found for default env: " + options.defaultEnv);
            }
            if (options.url && "object" === _typeof(options.url)) {
                if (!options.defaultEnv) throw new Error("Must pass options.defaultEnv with env->url mapping");
                for (var _iterator3 = Object.keys(options.url), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                    var _ref3;
                    if (_isArray3) {
                        if (_i3 >= _iterator3.length) break;
                        _ref3 = _iterator3[_i3++];
                    } else {
                        _i3 = _iterator3.next();
                        if (_i3.done) break;
                        _ref3 = _i3.value;
                    }
                    var env = _ref3;
                    if (!options.url[env]) throw new Error("No url specified for env: " + env);
                }
            }
            if (options.prerenderTemplate && "function" != typeof options.prerenderTemplate) throw new Error("Expected options.prerenderTemplate to be a function");
            if (options.containerTemplate && "function" != typeof options.containerTemplate) throw new Error("Expected options.containerTemplate to be a function");
        }
        __webpack_exports__.a = validate;
        var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(5), __WEBPACK_IMPORTED_MODULE_1__lib__ = __webpack_require__(3), _typeof = (__webpack_require__(2), 
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        });
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !call || "object" != typeof call && "function" != typeof call ? self : call;
        }
        function _inherits(subClass, superClass) {
            if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            });
            superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
        }
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return DelegateComponent;
        });
        var __WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__ = __webpack_require__(0), __WEBPACK_IMPORTED_MODULE_2__base__ = (__webpack_require__(1), 
        __webpack_require__(20)), __WEBPACK_IMPORTED_MODULE_3__parent__ = __webpack_require__(10), __WEBPACK_IMPORTED_MODULE_4__parent_drivers__ = __webpack_require__(33), _createClass = (__webpack_require__(2), 
        function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1;
                    descriptor.configurable = !0;
                    "value" in descriptor && (descriptor.writable = !0);
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                protoProps && defineProperties(Constructor.prototype, protoProps);
                staticProps && defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }()), DelegateComponent = function(_BaseComponent) {
            function DelegateComponent(component, source, options) {
                _classCallCheck(this, DelegateComponent);
                var _this = _possibleConstructorReturn(this, (DelegateComponent.__proto__ || Object.getPrototypeOf(DelegateComponent)).call(this));
                _this.component = component;
                _this.clean.set("source", source);
                _this.context = options.context;
                _this.props = {
                    uid: options.props.uid,
                    dimensions: options.props.dimensions,
                    onClose: options.props.onClose,
                    onDisplay: options.props.onDisplay
                };
                for (var _iterator = component.getPropNames(), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                    var _ref;
                    if (_isArray) {
                        if (_i >= _iterator.length) break;
                        _ref = _iterator[_i++];
                    } else {
                        _i = _iterator.next();
                        if (_i.done) break;
                        _ref = _i.value;
                    }
                    var propName = _ref;
                    _this.component.getProp(propName).allowDelegate && (_this.props[propName] = options.props[propName]);
                }
                _this.focus = options.overrides.focus;
                _this.userClose = options.overrides.userClose;
                _this.getDomain = options.overrides.getDomain;
                _this.error = options.overrides.error;
                _this.on = options.overrides.on;
                for (var delegateOverrides = __WEBPACK_IMPORTED_MODULE_4__parent_drivers__.a[options.context].delegateOverrides, _iterator2 = Object.keys(delegateOverrides), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                    var _ref2;
                    if (_isArray2) {
                        if (_i2 >= _iterator2.length) break;
                        _ref2 = _iterator2[_i2++];
                    } else {
                        _i2 = _iterator2.next();
                        if (_i2.done) break;
                        _ref2 = _i2.value;
                    }
                    var key = _ref2;
                    _this[key] = __WEBPACK_IMPORTED_MODULE_3__parent__.a.prototype[key];
                }
                _this.childWindowName = options.childWindowName;
                __WEBPACK_IMPORTED_MODULE_3__parent__.a.prototype.registerActiveComponent.call(_this);
                _this.watchForClose();
                return _this;
            }
            _inherits(DelegateComponent, _BaseComponent);
            _createClass(DelegateComponent, [ {
                key: "watchForClose",
                value: function() {
                    var _this2 = this, closeWindowListener = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__.p)(this.source, function() {
                        return _this2.destroy();
                    }, 3e3);
                    this.clean.register("destroyCloseWindowListener", closeWindowListener.cancel);
                }
            }, {
                key: "getOverrides",
                value: function(context) {
                    for (var delegateOverrides = __WEBPACK_IMPORTED_MODULE_4__parent_drivers__.a[context].delegateOverrides, overrides = {}, self = this, _iterator3 = Object.keys(delegateOverrides), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                        var _ref3;
                        if ("break" === function() {
                            if (_isArray3) {
                                if (_i3 >= _iterator3.length) return "break";
                                _ref3 = _iterator3[_i3++];
                            } else {
                                _i3 = _iterator3.next();
                                if (_i3.done) return "break";
                                _ref3 = _i3.value;
                            }
                            var key = _ref3;
                            overrides[key] = function() {
                                return __WEBPACK_IMPORTED_MODULE_3__parent__.a.prototype[key].apply(self, arguments);
                            };
                        }()) break;
                    }
                    return overrides;
                }
            }, {
                key: "destroy",
                value: function() {
                    return this.clean.all();
                }
            }, {
                key: "driver",
                get: function() {
                    if (!this.context) throw new Error("Context not set");
                    return __WEBPACK_IMPORTED_MODULE_4__parent_drivers__.a[this.context];
                }
            } ]);
            return DelegateComponent;
        }(__WEBPACK_IMPORTED_MODULE_2__base__.a);
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var __WEBPACK_IMPORTED_MODULE_0__component__ = __webpack_require__(2);
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return __WEBPACK_IMPORTED_MODULE_0__component__.a;
        });
        __webpack_require__(10), __webpack_require__(25);
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function validateProp(prop, key, value, props) {
            var required = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4];
            if (null !== value && void 0 !== value && "" !== value) {
                if (!value || "function" != typeof value.then || !prop.promise) {
                    if ("function" === prop.type) {
                        if (!(value instanceof Function)) throw new Error("Prop is not of type function: " + key);
                    } else if ("string" === prop.type) {
                        if ("string" != typeof value) throw new Error("Prop is not of type string: " + key);
                    } else if ("object" === prop.type) try {
                        JSON.stringify(value);
                    } catch (err) {
                        throw new Error("Unable to serialize prop: " + key);
                    } else if ("number" === prop.type && isNaN(parseInt(value, 10))) throw new Error("Prop is not a number: " + key);
                    "function" == typeof prop.validate && value && prop.validate(value, props);
                }
            } else if (required && !1 !== prop.required && !prop.hasOwnProperty("def")) throw new Error("Prop is required: " + key);
        }
        function validateProps(component, props) {
            var required = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
            props = props || {};
            if (props.env && "object" === _typeof(component.url) && !component.url[props.env]) throw new Error("Invalid env: " + props.env);
            for (var _iterator = component.getPropNames(), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                var _ref;
                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }
                var key = _ref, prop = component.getProp(key);
                if (prop.alias && props.hasOwnProperty(prop.alias)) {
                    var value = props[prop.alias];
                    delete props[prop.alias];
                    props[key] || (props[key] = value);
                }
            }
            for (var _iterator2 = Object.keys(props), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                var _ref2;
                if (_isArray2) {
                    if (_i2 >= _iterator2.length) break;
                    _ref2 = _iterator2[_i2++];
                } else {
                    _i2 = _iterator2.next();
                    if (_i2.done) break;
                    _ref2 = _i2.value;
                }
                var _key = _ref2, _prop = component.getProp(_key), _value = props[_key];
                _prop && validateProp(_prop, _key, _value, props, required);
            }
            for (var _iterator3 = component.getPropNames(), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                var _ref3;
                if (_isArray3) {
                    if (_i3 >= _iterator3.length) break;
                    _ref3 = _iterator3[_i3++];
                } else {
                    _i3 = _iterator3.next();
                    if (_i3.done) break;
                    _ref3 = _i3.value;
                }
                var _key2 = _ref3, _prop2 = component.getProp(_key2), _value2 = props[_key2];
                _prop2 && !props.hasOwnProperty(_key2) && validateProp(_prop2, _key2, _value2, props, required);
            }
        }
        __webpack_exports__.a = validateProps;
        var _typeof = (__webpack_require__(2), __webpack_require__(12), "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        });
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return angular;
        });
        var __WEBPACK_IMPORTED_MODULE_0__lib__ = __webpack_require__(3), angular = (__webpack_require__(2), 
        {
            global: function() {
                return window.angular;
            },
            register: function(component, ng) {
                return ng.module(component.tag, []).directive(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lib__._1)(component.tag), function() {
                    for (var scope = {}, _iterator = component.getPropNames(), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                        var _ref;
                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref = _iterator[_i++];
                        } else {
                            _i = _iterator.next();
                            if (_i.done) break;
                            _ref = _i.value;
                        }
                        scope[_ref] = "=";
                    }
                    component.looseProps && (scope.props = "=");
                    return {
                        scope: scope,
                        restrict: "E",
                        controller: [ "$scope", "$element", function($scope, $element) {
                            function safeApply(fn) {
                                if ("$apply" !== $scope.$root.$$phase && "$digest" !== $scope.$root.$$phase) try {
                                    $scope.$apply();
                                } catch (err) {
                                    console.warn("Error trying to scope.apply on prop function call:", err);
                                }
                            }
                            if (component.looseProps && !$scope.props) throw new Error("For angular bindings to work, prop definitions must be passed to xcomponent.create");
                            component.log("instantiate_angular_component");
                            var getProps = function() {
                                var scopeProps = void 0;
                                if ($scope.props) scopeProps = $scope.props; else {
                                    scopeProps = {};
                                    for (var _iterator2 = Object.keys(scope), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                                        var _ref2;
                                        if (_isArray2) {
                                            if (_i2 >= _iterator2.length) break;
                                            _ref2 = _iterator2[_i2++];
                                        } else {
                                            _i2 = _iterator2.next();
                                            if (_i2.done) break;
                                            _ref2 = _i2.value;
                                        }
                                        var key = _ref2;
                                        scopeProps[key] = $scope[key];
                                    }
                                }
                                scopeProps = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lib__._0)(scopeProps, function(value, key, fullKey) {
                                    if ("function" == typeof value) return function() {
                                        var result = value.apply(this, arguments);
                                        safeApply();
                                        return result;
                                    };
                                });
                                return scopeProps;
                            }, parent = component.init(getProps(), null, $element[0]);
                            parent.render($element[0]);
                            $scope.$watch(function() {
                                parent.updateProps(getProps());
                            });
                        } ]
                    };
                });
            }
        });
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return angular2;
        });
        var __WEBPACK_IMPORTED_MODULE_0__lib__ = __webpack_require__(3), _extends = (__webpack_require__(2), 
        Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        }), angular2 = {
            global: function() {},
            register: function(xcomponent, _ref) {
                var AngularComponent = _ref.Component, NgModule = _ref.NgModule, ElementRef = _ref.ElementRef, NgZone = _ref.NgZone;
                xcomponent.log("initializing angular2 component");
                var getProps = function(component) {
                    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lib__._0)(_extends({}, component.internalProps, component.props), function(value, key, fullKey) {
                        if ("function" == typeof value) return function() {
                            var _this = this, _arguments = arguments;
                            return component.zone.run(function() {
                                return value.apply(_this, _arguments);
                            });
                        };
                    });
                }, ComponentInstance = AngularComponent({
                    selector: xcomponent.tag,
                    template: "<div></div>",
                    inputs: [ "props" ]
                }).Class({
                    constructor: [ ElementRef, NgZone, function(elementRef, zone) {
                        this.elementRef = elementRef;
                        this.zone = zone;
                    } ],
                    ngOnInit: function() {
                        var targetElement = this.elementRef.nativeElement, parent = xcomponent.init(getProps(this), null, targetElement);
                        parent.render(targetElement);
                        this.parent = parent;
                    },
                    ngOnChanges: function() {
                        this.parent && this.parent.updateProps(getProps(this));
                    }
                });
                return NgModule({
                    declarations: [ ComponentInstance ],
                    exports: [ ComponentInstance ]
                }).Class({
                    constructor: function() {}
                });
            }
        };
    }, function(module, exports) {}, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !call || "object" != typeof call && "function" != typeof call ? self : call;
        }
        function _inherits(subClass, superClass) {
            if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            });
            superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
        }
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return glimmer;
        });
        var _extends = (__webpack_require__(2), Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        }), _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1;
                    descriptor.configurable = !0;
                    "value" in descriptor && (descriptor.writable = !0);
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                protoProps && defineProperties(Constructor.prototype, protoProps);
                staticProps && defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }(), glimmer = {
            global: function() {},
            register: function(component, GlimmerComponent) {
                return function(_GlimmerComponent) {
                    function _class() {
                        _classCallCheck(this, _class);
                        return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
                    }
                    _inherits(_class, _GlimmerComponent);
                    _createClass(_class, [ {
                        key: "didInsertElement",
                        value: function() {
                            component.render(_extends({}, this.args), this.element);
                        }
                    } ]);
                    return _class;
                }(GlimmerComponent);
            }
        };
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        Object.defineProperty(__webpack_exports__, "__esModule", {
            value: !0
        });
        var __WEBPACK_IMPORTED_MODULE_0__script__ = __webpack_require__(72);
        __webpack_require__.d(__webpack_exports__, "htmlComponent", function() {
            return __WEBPACK_IMPORTED_MODULE_0__script__.a;
        });
        var __WEBPACK_IMPORTED_MODULE_1__react__ = __webpack_require__(71);
        __webpack_require__.d(__webpack_exports__, "react", function() {
            return __WEBPACK_IMPORTED_MODULE_1__react__.a;
        });
        var __WEBPACK_IMPORTED_MODULE_2__vue__ = __webpack_require__(73);
        __webpack_require__.d(__webpack_exports__, "vue", function() {
            return __WEBPACK_IMPORTED_MODULE_2__vue__.a;
        });
        var __WEBPACK_IMPORTED_MODULE_3__angular__ = __webpack_require__(66);
        __webpack_require__.d(__webpack_exports__, "angular", function() {
            return __WEBPACK_IMPORTED_MODULE_3__angular__.a;
        });
        var __WEBPACK_IMPORTED_MODULE_4__ember__ = __webpack_require__(68);
        __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__ember__);
        for (var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_4__ember__) [ "htmlComponent", "react", "vue", "angular", "default" ].indexOf(__WEBPACK_IMPORT_KEY__) < 0 && function(key) {
            __webpack_require__.d(__webpack_exports__, key, function() {
                return __WEBPACK_IMPORTED_MODULE_4__ember__[key];
            });
        }(__WEBPACK_IMPORT_KEY__);
        var __WEBPACK_IMPORTED_MODULE_5__glimmer__ = __webpack_require__(69);
        __webpack_require__.d(__webpack_exports__, "glimmer", function() {
            return __WEBPACK_IMPORTED_MODULE_5__glimmer__.a;
        });
        var __WEBPACK_IMPORTED_MODULE_6__angular2__ = __webpack_require__(67);
        __webpack_require__.d(__webpack_exports__, "angular2", function() {
            return __WEBPACK_IMPORTED_MODULE_6__angular2__.a;
        });
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !call || "object" != typeof call && "function" != typeof call ? self : call;
        }
        function _inherits(subClass, superClass) {
            if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            });
            superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
        }
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return react;
        });
        var __WEBPACK_IMPORTED_MODULE_0__lib__ = __webpack_require__(3), _createClass = (__webpack_require__(2), 
        function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1;
                    descriptor.configurable = !0;
                    "value" in descriptor && (descriptor.writable = !0);
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                protoProps && defineProperties(Constructor.prototype, protoProps);
                staticProps && defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }()), react = {
            global: function() {
                if (window.React && window.ReactDOM) return {
                    React: window.React,
                    ReactDOM: window.ReactDOM
                };
            },
            register: function(component, _ref) {
                var React = _ref.React, ReactDOM = _ref.ReactDOM;
                React.createClass ? component.react = React.createClass({
                    displayName: "react",
                    render: function() {
                        return React.createElement("div", null);
                    },
                    componentDidMount: function() {
                        component.log("instantiate_react_component");
                        var el = ReactDOM.findDOMNode(this), parent = component.init(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lib__.k)({}, this.props), null, el);
                        this.setState({
                            parent: parent
                        });
                        parent.render(el);
                    },
                    componentDidUpdate: function() {
                        this.state && this.state.parent && this.state.parent.updateProps(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lib__.k)({}, this.props));
                    }
                }) : component.react = function(_React$Component) {
                    function _class() {
                        _classCallCheck(this, _class);
                        return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
                    }
                    _inherits(_class, _React$Component);
                    _createClass(_class, [ {
                        key: "render",
                        value: function() {
                            return React.createElement("div", null);
                        }
                    }, {
                        key: "componentDidMount",
                        value: function() {
                            component.log("instantiate_react_component");
                            var el = ReactDOM.findDOMNode(this), parent = component.init(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lib__.k)({}, this.props), null, el);
                            this.setState({
                                parent: parent
                            });
                            parent.render(el);
                        }
                    }, {
                        key: "componentDidUpdate",
                        value: function() {
                            this.state && this.state.parent && this.state.parent.updateProps(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lib__.k)({}, this.props));
                        }
                    } ]);
                    return _class;
                }(React.Component);
                return component.react;
            }
        };
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return htmlComponent;
        });
        var __WEBPACK_IMPORTED_MODULE_0__component_component__ = __webpack_require__(2), htmlComponent = {
            global: function() {
                return window.document;
            },
            register: function register(component, document) {
                function render(element) {
                    if (element && element.tagName && "script" === element.tagName.toLowerCase() && element.attributes.type && "application/x-component" === element.attributes.type.value && element.parentNode) {
                        var tag = element.getAttribute("data-component");
                        if (tag && tag === component.tag) {
                            component.log("instantiate_script_component");
                            var props = element.innerText ? eval("(" + element.innerText + ")") : {}, container = document.createElement("div");
                            if (!element.parentNode) throw new Error("Element has no parent");
                            element.parentNode.replaceChild(container, element);
                            component.render(props, container);
                        }
                    }
                }
                function scan() {
                    for (var scriptTags = Array.prototype.slice.call(document.getElementsByTagName("script")), _iterator = scriptTags, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                        var _ref;
                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref = _iterator[_i++];
                        } else {
                            _i = _iterator.next();
                            if (_i.done) break;
                            _ref = _i.value;
                        }
                        render(_ref);
                    }
                }
                scan();
                document.addEventListener("DOMContentLoaded", scan);
                window.addEventListener("load", scan);
                document.addEventListener("DOMNodeInserted", function(event) {
                    render(event.target);
                });
            }
        };
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return vue;
        });
        var __WEBPACK_IMPORTED_MODULE_1__lib__ = (__webpack_require__(2), __webpack_require__(3)), vue = {
            global: function() {},
            register: function(component) {
                return {
                    template: "<div></div>",
                    inheritAttrs: !1,
                    mounted: function() {
                        var el = this.$el;
                        this.parent = component.init(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.k)({}, this.$attrs), null, el);
                        this.parent.render(el);
                    },
                    beforeUpdate: function() {
                        this.parent && this.$attrs && this.parent.updateProps(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__.k)({}, this.$attrs));
                    }
                };
            }
        };
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        Object.defineProperty(__webpack_exports__, "__esModule", {
            value: !0
        });
        var __WEBPACK_IMPORTED_MODULE_0__interface__ = __webpack_require__(22);
        __webpack_require__.d(__webpack_exports__, "create", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.create;
        });
        __webpack_require__.d(__webpack_exports__, "getByTag", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.getByTag;
        });
        __webpack_require__.d(__webpack_exports__, "getCurrentScriptDir", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.getCurrentScriptDir;
        });
        __webpack_require__.d(__webpack_exports__, "destroyAll", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.destroyAll;
        });
        __webpack_require__.d(__webpack_exports__, "postRobot", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.postRobot;
        });
        __webpack_require__.d(__webpack_exports__, "CONSTANTS", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.CONSTANTS;
        });
        __webpack_require__.d(__webpack_exports__, "PopupOpenError", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.PopupOpenError;
        });
        __webpack_require__.d(__webpack_exports__, "IntegrationError", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.IntegrationError;
        });
        __webpack_require__.d(__webpack_exports__, "RenderError", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.RenderError;
        });
        __webpack_exports__.default = __WEBPACK_IMPORTED_MODULE_0__interface__;
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function isPerc(str) {
            return "string" == typeof str && /^[0-9]+%$/.test(str);
        }
        function isPx(str) {
            return "string" == typeof str && /^[0-9]+px$/.test(str);
        }
        function toNum(val) {
            if ("number" == typeof val) return val;
            var match = val.match(/^([0-9]+)(px|%)$/);
            if (!match) throw new Error("Could not match css value from " + val);
            return parseInt(match[1], 10);
        }
        function toPx(val) {
            return toNum(val) + "px";
        }
        function toCSS(val) {
            return "number" == typeof val ? toPx(val) : isPerc(val) ? val : toPx(val);
        }
        __webpack_exports__.c = isPerc;
        __webpack_exports__.b = isPx;
        __webpack_exports__.a = toCSS;
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function memoized(target, name, descriptor) {
            var method = descriptor.value;
            descriptor.value = function() {
                this.__memoized__ = this.__memoized__ || {};
                this.__memoized__.hasOwnProperty(name) || (this.__memoized__[name] = method.apply(this, arguments));
                return this.__memoized__[name];
            };
            descriptor.value.displayName = name + ":memoized";
        }
        __webpack_exports__.a = memoized;
        __webpack_require__(1);
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function appendChild(container, child) {
            container.appendChild(child);
        }
        function isElement(element) {
            return element instanceof window.Element || null !== element && "object" === (void 0 === element ? "undefined" : _typeof(element)) && 1 === element.nodeType && "object" === _typeof(element.style) && "object" === _typeof(element.ownerDocument);
        }
        function querySelectorAll(el, selector) {
            return Array.prototype.slice.call(el.querySelectorAll(selector));
        }
        function getElementSafe(id) {
            if (isElement(id)) return id;
            if ("string" == typeof id) {
                var element = document.getElementById(id);
                if (element) return element;
                document.querySelector && (element = document.querySelector(id));
                if (element) return element;
            }
        }
        function getElement(id) {
            var element = getElementSafe(id);
            if (element) return element;
            throw new Error("Can not find element: " + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util__.d)(id));
        }
        function isDocumentReady() {
            return "complete" === window.document.readyState;
        }
        function elementReady(id) {
            return new __WEBPACK_IMPORTED_MODULE_1_zalgo_promise_src__.a(function(resolve, reject) {
                var name = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util__.d)(id), el = getElementSafe(id);
                if (el) return resolve(el);
                if (isDocumentReady()) return reject(new Error("Document is ready and element " + name + " does not exist"));
                var interval = setInterval(function() {
                    el = getElementSafe(id);
                    if (el) {
                        clearInterval(interval);
                        return resolve(el);
                    }
                    if (isDocumentReady()) {
                        clearInterval(interval);
                        return reject(new Error("Document is ready and element " + name + " does not exist"));
                    }
                }, 10);
            });
        }
        function writeToWindow(win, html) {
            try {
                win.document.open();
                win.document.write(html);
                win.document.close();
            } catch (err) {
                try {
                    win.location = "javascript: document.open(); document.write(" + JSON.stringify(html) + "); document.close();";
                } catch (err2) {}
            }
        }
        function writeElementToWindow(win, el) {
            var tag = el.tagName.toLowerCase();
            if ("html" !== tag) throw new Error("Expected element to be html, got " + tag);
            for (var documentElement = win.document.documentElement; documentElement.children && documentElement.children.length; ) documentElement.removeChild(documentElement.children[0]);
            for (;el.children.length; ) documentElement.appendChild(el.children[0]);
        }
        function setStyle(el, styleText) {
            var doc = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : window.document;
            el.styleSheet ? el.styleSheet.cssText = styleText : el.appendChild(doc.createTextNode(styleText));
        }
        function createElement() {
            var tag = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "div", options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, container = arguments[2];
            tag = tag.toLowerCase();
            var element = document.createElement(tag);
            options.style && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util__.e)(element.style, options.style);
            options.class && (element.className = options.class.join(" "));
            if (options.attributes) for (var _iterator = Object.keys(options.attributes), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                var _ref;
                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }
                var key = _ref;
                element.setAttribute(key, options.attributes[key]);
            }
            options.styleSheet && setStyle(element, options.styleSheet);
            container && appendChild(container, element);
            if (options.html) if ("iframe" === tag) {
                if (!container || !element.contentWindow) throw new Error("Iframe html can not be written unless container provided and iframe in DOM");
                writeToWindow(element.contentWindow, options.html);
            } else element.innerHTML = options.html;
            return element;
        }
        function awaitFrameLoad(frame) {
            if (awaitFrameLoadPromises.has(frame)) {
                var _promise = awaitFrameLoadPromises.get(frame);
                if (_promise) return _promise;
            }
            var promise = new __WEBPACK_IMPORTED_MODULE_1_zalgo_promise_src__.a(function(resolve, reject) {
                frame.addEventListener("load", function() {
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__.d)(frame);
                    resolve(frame);
                });
                frame.addEventListener("error", function(err) {
                    frame.contentWindow ? resolve(frame) : reject(err);
                });
            });
            awaitFrameLoadPromises.set(frame, promise);
            return promise;
        }
        function awaitFrameWindow(frame) {
            return frame.contentWindow ? __WEBPACK_IMPORTED_MODULE_1_zalgo_promise_src__.a.resolve(frame.contentWindow) : awaitFrameLoad(frame).then(function(loadedFrame) {
                if (!loadedFrame.contentWindow) throw new Error("Could not find window in iframe");
                return loadedFrame.contentWindow;
            });
        }
        function iframe() {
            var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, container = arguments[1], el = getElement(container), attributes = options.attributes || {}, style = options.style || {}, frame = createElement("iframe", {
                attributes: _extends({
                    frameBorder: "0",
                    allowTransparency: "true"
                }, attributes),
                style: _extends({
                    backgroundColor: "transparent"
                }, style),
                html: options.html,
                class: options.class
            });
            awaitFrameLoad(frame);
            el.appendChild(frame);
            options.url && frame.setAttribute("src", options.url);
            return frame;
        }
        function addEventListener(obj, event, handler) {
            obj.addEventListener(event, handler);
            return {
                cancel: function() {
                    obj.removeEventListener(event, handler);
                }
            };
        }
        function formatQuery() {
            var obj = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return Object.keys(obj).filter(function(key) {
                return "string" == typeof obj[key];
            }).map(function(key) {
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util__.f)(key) + "=" + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util__.f)(obj[key]);
            }).join("&");
        }
        function extendQuery(originalQuery) {
            var props = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return props && Object.keys(props).length ? formatQuery(_extends({}, parseQuery(originalQuery), props)) : originalQuery;
        }
        function extendUrl(url) {
            var options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, query = options.query || {}, hash = options.hash || {}, originalUrl = void 0, originalQuery = void 0, originalHash = void 0, _url$split = url.split("#"), _url$split2 = _slicedToArray(_url$split, 2);
            originalUrl = _url$split2[0];
            originalHash = _url$split2[1];
            var _originalUrl$split = originalUrl.split("?"), _originalUrl$split2 = _slicedToArray(_originalUrl$split, 2);
            originalUrl = _originalUrl$split2[0];
            originalQuery = _originalUrl$split2[1];
            var queryString = extendQuery(originalQuery, query), hashString = extendQuery(originalHash, hash);
            queryString && (originalUrl = originalUrl + "?" + queryString);
            hashString && (originalUrl = originalUrl + "#" + hashString);
            return originalUrl;
        }
        function elementStoppedMoving(element) {
            var timeout = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 5e3;
            return new __WEBPACK_IMPORTED_MODULE_1_zalgo_promise_src__.a(function(resolve, reject) {
                var el = getElement(element), start = el.getBoundingClientRect(), interval = void 0, timer = void 0;
                interval = setInterval(function() {
                    var end = el.getBoundingClientRect();
                    if (start.top === end.top && start.bottom === end.bottom && start.left === end.left && start.right === end.right && start.width === end.width && start.height === end.height) {
                        clearTimeout(timer);
                        clearInterval(interval);
                        return resolve();
                    }
                    start = end;
                }, 50);
                timer = setTimeout(function() {
                    clearInterval(interval);
                    reject(new Error("Timed out waiting for element to stop animating after " + timeout + "ms"));
                }, timeout);
            });
        }
        function getCurrentDimensions(el) {
            return {
                width: el.offsetWidth,
                height: el.offsetHeight
            };
        }
        function setOverflow(el) {
            var value = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "auto", _el$style = el.style, overflow = _el$style.overflow, overflowX = _el$style.overflowX, overflowY = _el$style.overflowY;
            el.style.overflow = el.style.overflowX = el.style.overflowY = value;
            return {
                reset: function() {
                    el.style.overflow = overflow;
                    el.style.overflowX = overflowX;
                    el.style.overflowY = overflowY;
                }
            };
        }
        function dimensionsDiff(one, two, _ref4) {
            var _ref4$width = _ref4.width, width = void 0 === _ref4$width || _ref4$width, _ref4$height = _ref4.height, height = void 0 === _ref4$height || _ref4$height, _ref4$threshold = _ref4.threshold, threshold = void 0 === _ref4$threshold ? 0 : _ref4$threshold;
            return !!(width && Math.abs(one.width - two.width) > threshold) || !!(height && Math.abs(one.height - two.height) > threshold);
        }
        function trackDimensions(el, _ref5) {
            var _ref5$width = _ref5.width, width = void 0 === _ref5$width || _ref5$width, _ref5$height = _ref5.height, height = void 0 === _ref5$height || _ref5$height, _ref5$threshold = _ref5.threshold, threshold = void 0 === _ref5$threshold ? 0 : _ref5$threshold, currentDimensions = getCurrentDimensions(el);
            return {
                check: function() {
                    var newDimensions = getCurrentDimensions(el);
                    return {
                        changed: dimensionsDiff(currentDimensions, newDimensions, {
                            width: width,
                            height: height,
                            threshold: threshold
                        }),
                        dimensions: newDimensions
                    };
                },
                reset: function() {
                    currentDimensions = getCurrentDimensions(el);
                }
            };
        }
        function onDimensionsChange(el, _ref6) {
            var _ref6$width = _ref6.width, width = void 0 === _ref6$width || _ref6$width, _ref6$height = _ref6.height, height = void 0 === _ref6$height || _ref6$height, _ref6$delay = _ref6.delay, delay = void 0 === _ref6$delay ? 50 : _ref6$delay, _ref6$threshold = _ref6.threshold, threshold = void 0 === _ref6$threshold ? 0 : _ref6$threshold;
            return new __WEBPACK_IMPORTED_MODULE_1_zalgo_promise_src__.a(function(resolve) {
                function onWindowResize() {
                    var _tracker$check2 = tracker.check(), changed = _tracker$check2.changed, dimensions = _tracker$check2.dimensions;
                    if (changed) {
                        tracker.reset();
                        window.removeEventListener("resize", onWindowResize);
                        resolver(dimensions);
                    }
                }
                var tracker = trackDimensions(el, {
                    width: width,
                    height: height,
                    threshold: threshold
                }), interval = void 0, resolver = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__fn__.b)(function(dimensions) {
                    clearInterval(interval);
                    return resolve(dimensions);
                }, 4 * delay);
                interval = setInterval(function() {
                    var _tracker$check = tracker.check(), changed = _tracker$check.changed, dimensions = _tracker$check.dimensions;
                    if (changed) {
                        tracker.reset();
                        return resolver(dimensions);
                    }
                }, delay);
                window.addEventListener("resize", onWindowResize);
            });
        }
        function dimensionsMatchViewport(el, _ref7) {
            var width = _ref7.width, height = _ref7.height, dimensions = getCurrentDimensions(el);
            return (!width || dimensions.width === window.innerWidth) && (!height || dimensions.height === window.innerHeight);
        }
        function bindEvents(element, eventNames, handler) {
            handler = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__fn__.c)(handler);
            for (var _iterator4 = eventNames, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator](); ;) {
                var _ref8;
                if (_isArray4) {
                    if (_i4 >= _iterator4.length) break;
                    _ref8 = _iterator4[_i4++];
                } else {
                    _i4 = _iterator4.next();
                    if (_i4.done) break;
                    _ref8 = _i4.value;
                }
                var eventName = _ref8;
                element.addEventListener(eventName, handler);
            }
            return {
                cancel: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__fn__.c)(function() {
                    for (var _iterator5 = eventNames, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator](); ;) {
                        var _ref9;
                        if (_isArray5) {
                            if (_i5 >= _iterator5.length) break;
                            _ref9 = _iterator5[_i5++];
                        } else {
                            _i5 = _iterator5.next();
                            if (_i5.done) break;
                            _ref9 = _i5.value;
                        }
                        var eventName = _ref9;
                        element.removeEventListener(eventName, handler);
                    }
                })
            };
        }
        function setVendorCSS(element, name, value) {
            element.style[name] = value;
            for (var capitalizedName = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util__.g)(name), _iterator6 = VENDOR_PREFIXES, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator](); ;) {
                var _ref10;
                if (_isArray6) {
                    if (_i6 >= _iterator6.length) break;
                    _ref10 = _iterator6[_i6++];
                } else {
                    _i6 = _iterator6.next();
                    if (_i6.done) break;
                    _ref10 = _i6.value;
                }
                var prefix = _ref10;
                element.style["" + prefix + capitalizedName] = value;
            }
        }
        function isValidAnimation(element, name) {
            var stylesheets = element.ownerDocument.styleSheets;
            try {
                for (var i = 0; i < stylesheets.length; i++) {
                    var cssRules = stylesheets[i].cssRules;
                    if (cssRules) for (var j = 0; j < cssRules.length; j++) {
                        var cssRule = cssRules[j];
                        if (cssRule && (cssRule.type === KEYFRAMES_RULE && cssRule.name === name)) return !0;
                    }
                }
            } catch (err) {
                return !1;
            }
            return !1;
        }
        function animate(element, name, clean) {
            var timeout = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1e3;
            return new __WEBPACK_IMPORTED_MODULE_1_zalgo_promise_src__.a(function(resolve, reject) {
                function cleanUp() {
                    setVendorCSS(el, "animationName", "");
                    clearTimeout(startTimeout);
                    clearTimeout(endTimeout);
                    startEvent.cancel();
                    endEvent.cancel();
                }
                var el = getElement(element);
                if (!el || !isValidAnimation(el, name)) return resolve();
                var hasStarted = !1, startTimeout = void 0, endTimeout = void 0, startEvent = void 0, endEvent = void 0;
                startEvent = bindEvents(el, ANIMATION_START_EVENTS, function(event) {
                    if (event.target === el && event.animationName === name) {
                        clearTimeout(startTimeout);
                        event.stopPropagation();
                        startEvent.cancel();
                        hasStarted = !0;
                        endTimeout = setTimeout(function() {
                            cleanUp();
                            resolve();
                        }, timeout);
                    }
                });
                endEvent = bindEvents(el, ANIMATION_END_EVENTS, function(event) {
                    if (event.target === el && event.animationName === name) {
                        cleanUp();
                        return "string" == typeof event.animationName && event.animationName !== name ? reject("Expected animation name to be " + name + ", found " + event.animationName) : resolve();
                    }
                });
                setVendorCSS(el, "animationName", name);
                startTimeout = setTimeout(function() {
                    if (!hasStarted) {
                        cleanUp();
                        return resolve();
                    }
                }, 200);
                clean && clean(cleanUp);
            });
        }
        function showElement(element) {
            element.style.setProperty("display", "");
        }
        function hideElement(element) {
            element.style.setProperty("display", STYLE.DISPLAY.NONE, STYLE.IMPORTANT);
        }
        function destroyElement(element) {
            element.parentNode && element.parentNode.removeChild(element);
        }
        function showAndAnimate(element, name, clean) {
            var animation = animate(element, name, clean);
            showElement(element);
            return animation;
        }
        function animateAndHide(element, name, clean) {
            return animate(element, name, clean).then(function() {
                hideElement(element);
            });
        }
        function addClass(element, name) {
            element.classList ? element.classList.add(name) : -1 === element.className.split(/\s+/).indexOf(name) && (element.className += " " + name);
        }
        function removeClass(element, name) {
            element.classList ? element.classList.remove(name) : -1 !== element.className.split(/\s+/).indexOf(name) && (element.className = element.className.replace(name, ""));
        }
        function getCurrentScriptDir() {
            console.warn("Do not use xcomponent.getCurrentScriptDir() in production -- browser support is limited");
            return document.currentScript ? document.currentScript.src.split("/").slice(0, -1).join("/") : ".";
        }
        function isElementClosed(el) {
            return !el || !el.parentNode;
        }
        function watchElementForClose(element, handler) {
            handler = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__fn__.c)(handler);
            var interval = void 0;
            isElementClosed(element) ? handler() : interval = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util__.h)(function() {
                if (isElementClosed(element)) {
                    interval.cancel();
                    handler();
                }
            }, 50);
            return {
                cancel: function() {
                    interval && interval.cancel();
                }
            };
        }
        function getHttpType(contentType, url) {
            return new __WEBPACK_IMPORTED_MODULE_1_zalgo_promise_src__.a(function(resolve, reject) {
                var req = new window.XMLHttpRequest();
                req.open("GET", url);
                req.setRequestHeader("Accept", contentType);
                req.send(null);
                req.onload = function() {
                    resolve(req.responseText);
                };
                req.onerror = function() {
                    return reject(new Error("prefetch failed"));
                };
            });
        }
        function getHTML(url) {
            return getHttpType("text/html", url);
        }
        function prefetchPage(url) {
            return getHTML(url);
        }
        function fixScripts(el) {
            for (var doc = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window.document, _iterator7 = querySelectorAll(el, "script"), _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator](); ;) {
                var _ref11;
                if (_isArray7) {
                    if (_i7 >= _iterator7.length) break;
                    _ref11 = _iterator7[_i7++];
                } else {
                    _i7 = _iterator7.next();
                    if (_i7.done) break;
                    _ref11 = _i7.value;
                }
                var script = _ref11, newScript = doc.createElement("script");
                newScript.text = script.textContent;
                script.parentNode.replaceChild(newScript, script);
            }
        }
        function jsxDom(name, props, content) {
            name = name.toLowerCase();
            var doc = this && this.createElement ? this : window.document, el = doc.createElement(name);
            for (var prop in props) if (prop in JSX_EVENTS) el.addEventListener(JSX_EVENTS[prop], props[prop]); else if ("innerHTML" === prop) {
                el.innerHTML = props[prop];
                fixScripts(el, doc);
            } else el.setAttribute(prop, props[prop]);
            if ("style" === name) {
                if ("string" != typeof content) throw new Error("Expected " + name + " tag content to be string, got " + (void 0 === content ? "undefined" : _typeof(content)));
                if (arguments.length > 3) throw new Error("Expected only text content for " + name + " tag");
                setStyle(el, content, doc);
            } else if ("iframe" === name) {
                if (arguments.length > 3) throw new Error("Expected only single child node for iframe");
                el.addEventListener("load", function() {
                    var win = el.contentWindow;
                    if (!win) throw new Error("Expected frame to have contentWindow");
                    "string" == typeof content ? writeToWindow(win, content) : writeElementToWindow(win, content);
                });
            } else if ("script" === name) {
                if ("string" != typeof content) throw new Error("Expected " + name + " tag content to be string, got " + (void 0 === content ? "undefined" : _typeof(content)));
                if (arguments.length > 3) throw new Error("Expected only text content for " + name + " tag");
                el.text = content;
            } else for (var i = 2; i < arguments.length; i++) "string" == typeof arguments[i] ? el.textContent = arguments[i] : appendChild(el, arguments[i]);
            return el;
        }
        __webpack_exports__.r = appendChild;
        __webpack_exports__.q = getElement;
        __webpack_require__.d(__webpack_exports__, "x", function() {
            return documentReady;
        });
        __webpack_exports__.f = elementReady;
        __webpack_exports__.d = writeToWindow;
        __webpack_exports__.o = writeElementToWindow;
        __webpack_exports__.n = awaitFrameLoad;
        __webpack_exports__.t = awaitFrameWindow;
        __webpack_exports__.s = iframe;
        __webpack_exports__.g = addEventListener;
        __webpack_exports__.e = extendUrl;
        __webpack_exports__.i = elementStoppedMoving;
        __webpack_exports__.h = setOverflow;
        __webpack_exports__.A = trackDimensions;
        __webpack_exports__.z = onDimensionsChange;
        __webpack_exports__.y = dimensionsMatchViewport;
        __webpack_exports__.k = showElement;
        __webpack_exports__.j = hideElement;
        __webpack_exports__.v = destroyElement;
        __webpack_exports__.l = showAndAnimate;
        __webpack_exports__.m = animateAndHide;
        __webpack_exports__.b = addClass;
        __webpack_exports__.w = removeClass;
        __webpack_exports__.a = getCurrentScriptDir;
        __webpack_exports__.u = watchElementForClose;
        __webpack_exports__.c = prefetchPage;
        __webpack_exports__.p = jsxDom;
        var __WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__ = __webpack_require__(0), __WEBPACK_IMPORTED_MODULE_1_zalgo_promise_src__ = __webpack_require__(1), __WEBPACK_IMPORTED_MODULE_2_cross_domain_safe_weakmap_src__ = __webpack_require__(6), __WEBPACK_IMPORTED_MODULE_3__fn__ = __webpack_require__(35), __WEBPACK_IMPORTED_MODULE_4__util__ = __webpack_require__(26), _slicedToArray = (__webpack_require__(14), 
        function() {
            function sliceIterator(arr, i) {
                var _arr = [], _n = !0, _d = !1, _e = void 0;
                try {
                    for (var _s, _i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done); _n = !0) {
                        _arr.push(_s.value);
                        if (i && _arr.length === i) break;
                    }
                } catch (err) {
                    _d = !0;
                    _e = err;
                } finally {
                    try {
                        !_n && _i.return && _i.return();
                    } finally {
                        if (_d) throw _e;
                    }
                }
                return _arr;
            }
            return function(arr, i) {
                if (Array.isArray(arr)) return arr;
                if (Symbol.iterator in Object(arr)) return sliceIterator(arr, i);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
        }()), _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        }, _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        }, documentReady = new __WEBPACK_IMPORTED_MODULE_1_zalgo_promise_src__.a(function(resolve) {
            if ("complete" === window.document.readyState) return resolve(window.document);
            var interval = setInterval(function() {
                if ("complete" === window.document.readyState) {
                    clearInterval(interval);
                    return resolve(window.document);
                }
            }, 10);
        }), awaitFrameLoadPromises = new __WEBPACK_IMPORTED_MODULE_2_cross_domain_safe_weakmap_src__.a(), parseQuery = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__fn__.a)(function(queryString) {
            var params = {};
            if (!queryString) return params;
            if (-1 === queryString.indexOf("=")) throw new Error("Can not parse query string params: " + queryString);
            for (var _iterator2 = queryString.split("&"), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                var _ref2;
                if (_isArray2) {
                    if (_i2 >= _iterator2.length) break;
                    _ref2 = _iterator2[_i2++];
                } else {
                    _i2 = _iterator2.next();
                    if (_i2.done) break;
                    _ref2 = _i2.value;
                }
                var pair = _ref2;
                pair = pair.split("=");
                pair[0] && pair[1] && (params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]));
            }
            return params;
        }), VENDOR_PREFIXES = [ "webkit", "moz", "ms", "o" ], CSSRule = window.CSSRule, KEYFRAMES_RULE = CSSRule.KEYFRAMES_RULE || CSSRule.WEBKIT_KEYFRAMES_RULE || CSSRule.MOZ_KEYFRAMES_RULE || CSSRule.O_KEYFRAMES_RULE || CSSRule.MS_KEYFRAMES_RULE, ANIMATION_START_EVENTS = [ "animationstart", "webkitAnimationStart", "oAnimationStart", "MSAnimationStart" ], ANIMATION_END_EVENTS = [ "animationend", "webkitAnimationEnd", "oAnimationEnd", "MSAnimationEnd" ], STYLE = {
            DISPLAY: {
                NONE: "none",
                BLOCK: "block"
            },
            VISIBILITY: {
                VISIBLE: "visible",
                HIDDEN: "hidden"
            },
            IMPORTANT: "important"
        }, JSX_EVENTS = {
            onClick: "click"
        };
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function globalFor(win) {
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__.a)(win)) {
                win[__WEBPACK_IMPORTED_MODULE_1__constants__.__XCOMPONENT__] || (win[__WEBPACK_IMPORTED_MODULE_1__constants__.__XCOMPONENT__] = {});
                return win[__WEBPACK_IMPORTED_MODULE_1__constants__.__XCOMPONENT__];
            }
        }
        __webpack_exports__.b = globalFor;
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return global;
        });
        var __WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__ = __webpack_require__(0), __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__(5), global = function() {
            var global = globalFor(window);
            if (!global) throw new Error("Could not get local global");
            return global;
        }();
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function setLogLevel(logLevel) {
            if (-1 === __WEBPACK_IMPORTED_MODULE_1_beaver_logger_client__.a.indexOf(logLevel)) throw new Error("Invalid logLevel: " + logLevel);
            __WEBPACK_IMPORTED_MODULE_1_beaver_logger_client__.b.logLevel = logLevel;
            __WEBPACK_IMPORTED_MODULE_0_post_robot_src__.CONFIG.LOG_LEVEL = logLevel;
            window.LOG_LEVEL = logLevel;
        }
        function info(name, event) {
            var payload = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            __WEBPACK_IMPORTED_MODULE_1_beaver_logger_client__.c("xc_" + name + "_" + event, payload);
        }
        function warn(name, event) {
            var payload = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            __WEBPACK_IMPORTED_MODULE_1_beaver_logger_client__.d("xc_" + name + "_" + event, payload);
        }
        function error(name, event) {
            var payload = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            __WEBPACK_IMPORTED_MODULE_1_beaver_logger_client__.e("xc_" + name + "_" + event, payload);
        }
        __webpack_exports__.a = setLogLevel;
        __webpack_exports__.b = info;
        __webpack_exports__.c = warn;
        __webpack_exports__.d = error;
        var __WEBPACK_IMPORTED_MODULE_0_post_robot_src__ = __webpack_require__(8), __WEBPACK_IMPORTED_MODULE_1_beaver_logger_client__ = __webpack_require__(23);
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function denodeify(method) {
            return function() {
                var self = this, args = Array.prototype.slice.call(arguments);
                return args.length >= method.length ? __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__.a.resolve(method.apply(self, args)) : new __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__.a(function(resolve, reject) {
                    args.push(function(err, result) {
                        if (err && !(err instanceof Error)) throw new Error("Passed non-Error object in callback: [ " + err + " ] -- callbacks should either be called with callback(new Error(...)) or callback(null, result).");
                        return err ? reject(err) : resolve(result);
                    });
                    method.apply(self, args);
                });
            };
        }
        function promisify(method) {
            return function() {
                var _this = this, _arguments = arguments;
                return __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__.a.try(function() {
                    return method.apply(_this, _arguments);
                });
            };
        }
        function cycle(method) {
            return __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__.a.try(method).then(function() {
                return cycle(method);
            });
        }
        __webpack_exports__.a = denodeify;
        __webpack_exports__.b = promisify;
        __webpack_exports__.c = cycle;
        var __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__ = __webpack_require__(1);
    } ]);
});
//# sourceMappingURL=xcomponent.frame.js.map