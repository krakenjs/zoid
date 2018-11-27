!function(root, factory) {
    "object" == typeof exports && "object" == typeof module ? module.exports = factory() : "function" == typeof define && define.amd ? define("zoid", [], factory) : "object" == typeof exports ? exports.zoid = factory() : root.zoid = factory();
}("undefined" != typeof self ? self : this, function() {
    return function(modules) {
        var installedModules = {};
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
        __webpack_require__.m = modules;
        __webpack_require__.c = installedModules;
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
        return __webpack_require__(__webpack_require__.s = "./src/index.js");
    }({
        "./node_modules/belter/src/css.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_exports__.a = isPerc;
            __webpack_exports__.b = isPx;
            __webpack_exports__.d = function(val) {
                return "number" == typeof val ? toPx(val) : isPerc(val) ? val : toPx(val);
            };
            __webpack_exports__.c = function(dim, max) {
                if ("number" == typeof dim) return dim;
                if (isPerc(dim)) return parseInt(max * toNum(dim) / 100, 10);
                if (isPx(dim)) return toNum(dim);
                throw new Error("Can not normalize dimension: " + dim);
            };
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
        },
        "./node_modules/belter/src/decorators.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_exports__.a = function(target, name, descriptor) {
                descriptor.value = Object(__WEBPACK_IMPORTED_MODULE_0__util__.p)(descriptor.value, {
                    name: name,
                    thisNamespace: !0
                });
            };
            var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__("./node_modules/belter/src/util.js");
        },
        "./node_modules/belter/src/device.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_exports__.a = function() {
                return !!(window.navigator.mockUserAgent || window.navigator.userAgent).match(/Android|webOS|iPhone|iPad|iPod|bada|Symbian|Palm|CriOS|BlackBerry|IEMobile|WindowsMobile|Opera Mini/i);
            };
        },
        "./node_modules/belter/src/dom.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var src = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), cross_domain_utils_src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), cross_domain_safe_weakmap_src = __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/index.js"), util = __webpack_require__("./node_modules/belter/src/util.js");
            __webpack_require__("./node_modules/belter/src/device.js");
            __webpack_exports__.w = function waitForDocumentReady() {
                return Object(util.m)(waitForDocumentReady, function() {
                    return new src.a(function(resolve) {
                        if (isDocumentReady()) return resolve();
                        var interval = setInterval(function() {
                            if (isDocumentReady()) {
                                clearInterval(interval);
                                return resolve();
                            }
                        }, 10);
                    });
                });
            };
            __webpack_exports__.k = function(url) {
                var originalHash, options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, query = options.query || {}, hash = options.hash || {}, originalUrl = void 0, _url$split = url.split("#");
                originalUrl = _url$split[0];
                originalHash = _url$split[1];
                var _originalUrl$split = originalUrl.split("?");
                originalUrl = _originalUrl$split[0];
                var queryString = extendQuery(_originalUrl$split[1], query), hashString = extendQuery(originalHash, hash);
                queryString && (originalUrl = originalUrl + "?" + queryString);
                hashString && (originalUrl = originalUrl + "#" + hashString);
                return originalUrl;
            };
            __webpack_exports__.o = function isLocalStorageEnabled() {
                return Object(util.m)(isLocalStorageEnabled, function() {
                    try {
                        if ("undefined" == typeof window) return !1;
                        if (window.localStorage) {
                            var value = Math.random().toString();
                            window.localStorage.setItem("__test__localStorage__", value);
                            var result = window.localStorage.getItem("__test__localStorage__");
                            window.localStorage.removeItem("__test__localStorage__");
                            if (value === result) return !0;
                        }
                    } catch (err) {}
                    return !1;
                });
            };
            __webpack_exports__.e = appendChild;
            __webpack_exports__.l = getElement;
            __webpack_exports__.i = function(id) {
                return new src.a(function(resolve, reject) {
                    var name = Object(util.w)(id), el = getElementSafe(id);
                    if (el) return resolve(el);
                    if (isDocumentReady()) return reject(new Error("Document is ready and element " + name + " does not exist"));
                    var interval = setInterval(function() {
                        if (el = getElementSafe(id)) {
                            clearInterval(interval);
                            return resolve(el);
                        }
                        if (isDocumentReady()) {
                            clearInterval(interval);
                            return reject(new Error("Document is ready and element " + name + " does not exist"));
                        }
                    }, 10);
                });
            };
            __webpack_exports__.a = PopupOpenError;
            __webpack_exports__.q = function(url, options) {
                var _options = options = options || {}, width = _options.width, height = _options.height, top = 0, left = 0;
                width && (window.outerWidth ? left = Math.round((window.outerWidth - width) / 2) + window.screenX : window.screen.width && (left = Math.round((window.screen.width - width) / 2)));
                height && (window.outerHeight ? top = Math.round((window.outerHeight - height) / 2) + window.screenY : window.screen.height && (top = Math.round((window.screen.height - height) / 2)));
                var name = (options = _extends({
                    top: top,
                    left: left,
                    width: width,
                    height: height,
                    status: 1,
                    toolbar: 0,
                    menubar: 0,
                    resizable: 1,
                    scrollbars: 1
                }, options)).name || Object(util.y)();
                delete options.name;
                var params = Object.keys(options).map(function(key) {
                    if (options[key]) return key + "=" + Object(util.w)(options[key]);
                }).filter(Boolean).join(","), win = void 0;
                try {
                    win = window.open(url, name, params, !0);
                } catch (err) {
                    throw new PopupOpenError("Can not open popup window - " + (err.stack || err.message));
                }
                if (Object(cross_domain_utils_src.isWindowClosed)(win)) {
                    var err;
                    throw new PopupOpenError("Can not open popup window - blocked");
                }
                return win;
            };
            __webpack_exports__.y = function(win, el) {
                var tag = el.tagName.toLowerCase();
                if ("html" !== tag) throw new Error("Expected element to be html, got " + tag);
                for (var documentElement = win.document.documentElement; documentElement.children && documentElement.children.length; ) documentElement.removeChild(documentElement.children[0]);
                for (;el.children.length; ) documentElement.appendChild(el.children[0]);
            };
            __webpack_exports__.f = function(frame) {
                return frame.contentWindow ? src.a.resolve(frame.contentWindow) : awaitFrameLoad(frame).then(function(loadedFrame) {
                    if (!loadedFrame.contentWindow) throw new Error("Could not find window in iframe");
                    return loadedFrame.contentWindow;
                });
            };
            __webpack_exports__.n = function() {
                var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, el = getElement(arguments[1]), attributes = options.attributes || {}, style = options.style || {}, frame = function() {
                    var tag = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "div", options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, container = arguments[2];
                    tag = tag.toLowerCase();
                    var element = document.createElement(tag);
                    options.style && Object(util.j)(element.style, options.style);
                    options.class && (element.className = options.class.join(" "));
                    if (options.attributes) for (var _i6 = 0, _Object$keys2 = Object.keys(options.attributes), _length6 = null == _Object$keys2 ? 0 : _Object$keys2.length; _i6 < _length6; _i6++) {
                        var key = _Object$keys2[_i6];
                        element.setAttribute(key, options.attributes[key]);
                    }
                    options.styleSheet && function(el, styleText) {
                        var doc = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : window.document;
                        el.styleSheet ? el.styleSheet.cssText = styleText : el.appendChild(doc.createTextNode(styleText));
                    }(element, options.styleSheet);
                    container && appendChild(container, element);
                    if (options.html) if ("iframe" === tag) {
                        if (!container || !element.contentWindow) throw new Error("Iframe html can not be written unless container provided and iframe in DOM");
                        !function(win, html) {
                            try {
                                win.document.open();
                                win.document.write(html);
                                win.document.close();
                            } catch (err) {
                                try {
                                    win.location = "javascript: document.open(); document.write(" + JSON.stringify(html) + "); document.close();";
                                } catch (err2) {}
                            }
                        }(element.contentWindow, options.html);
                    } else element.innerHTML = options.html;
                    return element;
                }("iframe", {
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
                (options.url || window.navigator.userAgent.match(/MSIE|Edge/i)) && frame.setAttribute("src", options.url || "about:blank");
                return frame;
            };
            __webpack_exports__.c = function(obj, event, handler) {
                obj.addEventListener(event, handler);
                return {
                    cancel: function() {
                        obj.removeEventListener(event, handler);
                    }
                };
            };
            __webpack_exports__.j = function(element) {
                var timeout = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 5e3;
                return new src.a(function(resolve, reject) {
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
            };
            __webpack_exports__.s = function(el) {
                var value = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "auto", _el$style = el.style, overflow = _el$style.overflow, overflowX = _el$style.overflowX, overflowY = _el$style.overflowY;
                el.style.overflow = el.style.overflowX = el.style.overflowY = value;
                return {
                    reset: function() {
                        el.style.overflow = overflow;
                        el.style.overflowX = overflowX;
                        el.style.overflowY = overflowY;
                    }
                };
            };
            __webpack_exports__.v = trackDimensions;
            __webpack_exports__.p = function(el, _ref4) {
                var _ref4$width = _ref4.width, width = void 0 === _ref4$width || _ref4$width, _ref4$height = _ref4.height, height = void 0 === _ref4$height || _ref4$height, _ref4$delay = _ref4.delay, delay = void 0 === _ref4$delay ? 50 : _ref4$delay, _ref4$threshold = _ref4.threshold, threshold = void 0 === _ref4$threshold ? 0 : _ref4$threshold;
                return new src.a(function(resolve) {
                    var tracker = trackDimensions(el, {
                        width: width,
                        height: height,
                        threshold: threshold
                    }), interval = void 0, resolver = Object(util.g)(function(dimensions) {
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
                    window.addEventListener("resize", function onWindowResize() {
                        var _tracker$check2 = tracker.check(), changed = _tracker$check2.changed, dimensions = _tracker$check2.dimensions;
                        if (changed) {
                            tracker.reset();
                            window.removeEventListener("resize", onWindowResize);
                            resolver(dimensions);
                        }
                    });
                });
            };
            __webpack_exports__.h = function(el, _ref5) {
                var width = _ref5.width, height = _ref5.height, dimensions = getCurrentDimensions(el);
                return !(width && dimensions.width !== window.innerWidth || height && dimensions.height !== window.innerHeight);
            };
            __webpack_exports__.u = showElement;
            __webpack_exports__.m = hideElement;
            __webpack_exports__.g = function(element) {
                element.parentNode && element.parentNode.removeChild(element);
            };
            __webpack_exports__.t = function(element, name, clean) {
                var animation = animate(element, name, clean);
                showElement(element);
                return animation;
            };
            __webpack_exports__.d = function(element, name, clean) {
                return animate(element, name, clean).then(function() {
                    hideElement(element);
                });
            };
            __webpack_exports__.b = function(element, name) {
                element.classList ? element.classList.add(name) : -1 === element.className.split(/\s+/).indexOf(name) && (element.className += " " + name);
            };
            __webpack_exports__.r = function(element, name) {
                element.classList ? element.classList.remove(name) : -1 !== element.className.split(/\s+/).indexOf(name) && (element.className = element.className.replace(name, ""));
            };
            __webpack_exports__.x = function(element, handler) {
                handler = Object(util.s)(handler);
                var interval = void 0;
                isElementClosed(element) ? handler() : interval = Object(util.v)(function() {
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
            };
            var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            }, _extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            };
            function isDocumentReady() {
                return Boolean(document.body) && "complete" === document.readyState;
            }
            function urlEncode(str) {
                return str.replace(/\?/g, "%3F").replace(/&/g, "%26").replace(/#/g, "%23").replace(/\+/g, "%2B");
            }
            function parseQuery(queryString) {
                return Object(util.m)(parseQuery, function() {
                    var params = {};
                    if (!queryString) return params;
                    if (-1 === queryString.indexOf("=")) return params;
                    for (var _i2 = 0, _queryString$split2 = queryString.split("&"), _length2 = null == _queryString$split2 ? 0 : _queryString$split2.length; _i2 < _length2; _i2++) {
                        var pair = _queryString$split2[_i2];
                        (pair = pair.split("="))[0] && pair[1] && (params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]));
                    }
                    return params;
                }, [ queryString ]);
            }
            function extendQuery(originalQuery) {
                var props = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return props && Object.keys(props).length ? function() {
                    var obj = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    return Object.keys(obj).filter(function(key) {
                        return "string" == typeof obj[key];
                    }).map(function(key) {
                        return urlEncode(key) + "=" + urlEncode(obj[key]);
                    }).join("&");
                }(_extends({}, parseQuery(originalQuery), props)) : originalQuery;
            }
            function appendChild(container, child) {
                container.appendChild(child);
            }
            function getElementSafe(id) {
                if (function(element) {
                    return element instanceof window.Element || null !== element && "object" === (void 0 === element ? "undefined" : _typeof(element)) && 1 === element.nodeType && "object" === _typeof(element.style) && "object" === _typeof(element.ownerDocument);
                }(id)) return id;
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
                throw new Error("Can not find element: " + Object(util.w)(id));
            }
            function PopupOpenError(message) {
                this.message = message;
            }
            PopupOpenError.prototype = Object.create(Error.prototype);
            var awaitFrameLoadPromises = void 0;
            function awaitFrameLoad(frame) {
                if ((awaitFrameLoadPromises = awaitFrameLoadPromises || new cross_domain_safe_weakmap_src.a()).has(frame)) {
                    var _promise = awaitFrameLoadPromises.get(frame);
                    if (_promise) return _promise;
                }
                var promise = new src.a(function(resolve, reject) {
                    frame.addEventListener("load", function() {
                        Object(cross_domain_utils_src.linkFrameWindow)(frame);
                        resolve(frame);
                    });
                    frame.addEventListener("error", function(err) {
                        frame.contentWindow ? resolve(frame) : reject(err);
                    });
                });
                awaitFrameLoadPromises.set(frame, promise);
                return promise;
            }
            function getCurrentDimensions(el) {
                return {
                    width: el.offsetWidth,
                    height: el.offsetHeight
                };
            }
            function trackDimensions(el, _ref3) {
                var _ref3$width = _ref3.width, width = void 0 === _ref3$width || _ref3$width, _ref3$height = _ref3.height, height = void 0 === _ref3$height || _ref3$height, _ref3$threshold = _ref3.threshold, threshold = void 0 === _ref3$threshold ? 0 : _ref3$threshold, currentDimensions = getCurrentDimensions(el);
                return {
                    check: function() {
                        var newDimensions = getCurrentDimensions(el);
                        return {
                            changed: function(one, two, _ref2) {
                                var _ref2$width = _ref2.width, _ref2$height = _ref2.height, height = void 0 === _ref2$height || _ref2$height, _ref2$threshold = _ref2.threshold, threshold = void 0 === _ref2$threshold ? 0 : _ref2$threshold;
                                return !(void 0 !== _ref2$width && !_ref2$width || !(Math.abs(one.width - two.width) > threshold)) || !!(height && Math.abs(one.height - two.height) > threshold);
                            }(currentDimensions, newDimensions, {
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
            function bindEvents(element, eventNames, handler) {
                handler = Object(util.s)(handler);
                for (var _i8 = 0, _length8 = null == eventNames ? 0 : eventNames.length; _i8 < _length8; _i8++) {
                    var eventName = eventNames[_i8];
                    element.addEventListener(eventName, handler);
                }
                return {
                    cancel: Object(util.s)(function() {
                        for (var _i10 = 0, _length10 = null == eventNames ? 0 : eventNames.length; _i10 < _length10; _i10++) {
                            var _eventName = eventNames[_i10];
                            element.removeEventListener(_eventName, handler);
                        }
                    })
                };
            }
            var VENDOR_PREFIXES = [ "webkit", "moz", "ms", "o" ];
            function setVendorCSS(element, name, value) {
                element.style[name] = value;
                for (var capitalizedName = Object(util.c)(name), _i12 = 0, _length12 = null == VENDOR_PREFIXES ? 0 : VENDOR_PREFIXES.length; _i12 < _length12; _i12++) {
                    var prefix = VENDOR_PREFIXES[_i12];
                    element.style["" + prefix + capitalizedName] = value;
                }
            }
            var ANIMATION_START_EVENTS = [ "animationstart", "webkitAnimationStart", "oAnimationStart", "MSAnimationStart" ], ANIMATION_END_EVENTS = [ "animationend", "webkitAnimationEnd", "oAnimationEnd", "MSAnimationEnd" ];
            function animate(element, name, clean) {
                var timeout = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1e3;
                return new src.a(function(resolve, reject) {
                    var el = getElement(element);
                    if (!el || !function(element, name) {
                        var CSSRule = window.CSSRule, KEYFRAMES_RULE = CSSRule.KEYFRAMES_RULE || CSSRule.WEBKIT_KEYFRAMES_RULE || CSSRule.MOZ_KEYFRAMES_RULE || CSSRule.O_KEYFRAMES_RULE || CSSRule.MS_KEYFRAMES_RULE, stylesheets = element.ownerDocument.styleSheets;
                        try {
                            for (var i = 0; i < stylesheets.length; i++) {
                                var cssRules = stylesheets[i].cssRules;
                                if (cssRules) for (var j = 0; j < cssRules.length; j++) {
                                    var cssRule = cssRules[j];
                                    if (cssRule && cssRule.type === KEYFRAMES_RULE && cssRule.name === name) return !0;
                                }
                            }
                        } catch (err) {
                            return !1;
                        }
                        return !1;
                    }(el, name)) return resolve();
                    var hasStarted = !1, startTimeout = void 0, endTimeout = void 0, startEvent = void 0, endEvent = void 0;
                    function cleanUp() {
                        setVendorCSS(el, "animationName", "");
                        clearTimeout(startTimeout);
                        clearTimeout(endTimeout);
                        startEvent.cancel();
                        endEvent.cancel();
                    }
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
            var STYLE = {
                DISPLAY: {
                    NONE: "none",
                    BLOCK: "block"
                },
                VISIBILITY: {
                    VISIBLE: "visible",
                    HIDDEN: "hidden"
                },
                IMPORTANT: "important"
            };
            function showElement(element) {
                element.style.setProperty("display", "");
            }
            function hideElement(element) {
                element.style.setProperty("display", STYLE.DISPLAY.NONE, STYLE.IMPORTANT);
            }
            function isElementClosed(el) {
                return !el || !el.parentNode;
            }
        },
        "./node_modules/belter/src/experiment.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__("./node_modules/belter/src/util.js"), __webpack_require__("./node_modules/belter/src/storage.js");
        },
        "./node_modules/belter/src/global.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__("./node_modules/belter/src/util.js");
        },
        "./node_modules/belter/src/http.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__("./node_modules/zalgo-promise/src/index.js"), __webpack_require__("./node_modules/cross-domain-utils/src/index.js");
        },
        "./node_modules/belter/src/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__("./node_modules/belter/src/device.js");
            var __WEBPACK_IMPORTED_MODULE_1__dom__ = __webpack_require__("./node_modules/belter/src/dom.js");
            __webpack_require__.d(__webpack_exports__, "PopupOpenError", function() {
                return __WEBPACK_IMPORTED_MODULE_1__dom__.a;
            });
            __webpack_require__.d(__webpack_exports__, "addClass", function() {
                return __WEBPACK_IMPORTED_MODULE_1__dom__.b;
            });
            __webpack_require__.d(__webpack_exports__, "addEventListener", function() {
                return __WEBPACK_IMPORTED_MODULE_1__dom__.c;
            });
            __webpack_require__.d(__webpack_exports__, "animateAndHide", function() {
                return __WEBPACK_IMPORTED_MODULE_1__dom__.d;
            });
            __webpack_require__.d(__webpack_exports__, "appendChild", function() {
                return __WEBPACK_IMPORTED_MODULE_1__dom__.e;
            });
            __webpack_require__.d(__webpack_exports__, "awaitFrameWindow", function() {
                return __WEBPACK_IMPORTED_MODULE_1__dom__.f;
            });
            __webpack_require__.d(__webpack_exports__, "destroyElement", function() {
                return __WEBPACK_IMPORTED_MODULE_1__dom__.g;
            });
            __webpack_require__.d(__webpack_exports__, "dimensionsMatchViewport", function() {
                return __WEBPACK_IMPORTED_MODULE_1__dom__.h;
            });
            __webpack_require__.d(__webpack_exports__, "elementReady", function() {
                return __WEBPACK_IMPORTED_MODULE_1__dom__.i;
            });
            __webpack_require__.d(__webpack_exports__, "elementStoppedMoving", function() {
                return __WEBPACK_IMPORTED_MODULE_1__dom__.j;
            });
            __webpack_require__.d(__webpack_exports__, "extendUrl", function() {
                return __WEBPACK_IMPORTED_MODULE_1__dom__.k;
            });
            __webpack_require__.d(__webpack_exports__, "getElement", function() {
                return __WEBPACK_IMPORTED_MODULE_1__dom__.l;
            });
            __webpack_require__.d(__webpack_exports__, "hideElement", function() {
                return __WEBPACK_IMPORTED_MODULE_1__dom__.m;
            });
            __webpack_require__.d(__webpack_exports__, "iframe", function() {
                return __WEBPACK_IMPORTED_MODULE_1__dom__.n;
            });
            __webpack_require__.d(__webpack_exports__, "onDimensionsChange", function() {
                return __WEBPACK_IMPORTED_MODULE_1__dom__.p;
            });
            __webpack_require__.d(__webpack_exports__, "popup", function() {
                return __WEBPACK_IMPORTED_MODULE_1__dom__.q;
            });
            __webpack_require__.d(__webpack_exports__, "removeClass", function() {
                return __WEBPACK_IMPORTED_MODULE_1__dom__.r;
            });
            __webpack_require__.d(__webpack_exports__, "setOverflow", function() {
                return __WEBPACK_IMPORTED_MODULE_1__dom__.s;
            });
            __webpack_require__.d(__webpack_exports__, "showAndAnimate", function() {
                return __WEBPACK_IMPORTED_MODULE_1__dom__.t;
            });
            __webpack_require__.d(__webpack_exports__, "showElement", function() {
                return __WEBPACK_IMPORTED_MODULE_1__dom__.u;
            });
            __webpack_require__.d(__webpack_exports__, "trackDimensions", function() {
                return __WEBPACK_IMPORTED_MODULE_1__dom__.v;
            });
            __webpack_require__.d(__webpack_exports__, "waitForDocumentReady", function() {
                return __WEBPACK_IMPORTED_MODULE_1__dom__.w;
            });
            __webpack_require__.d(__webpack_exports__, "watchElementForClose", function() {
                return __WEBPACK_IMPORTED_MODULE_1__dom__.x;
            });
            __webpack_require__.d(__webpack_exports__, "writeElementToWindow", function() {
                return __WEBPACK_IMPORTED_MODULE_1__dom__.y;
            });
            __webpack_require__("./node_modules/belter/src/experiment.js"), __webpack_require__("./node_modules/belter/src/global.js"), 
            __webpack_require__("./node_modules/belter/src/storage.js");
            var __WEBPACK_IMPORTED_MODULE_5__util__ = __webpack_require__("./node_modules/belter/src/util.js");
            __webpack_require__.d(__webpack_exports__, "base64decode", function() {
                return __WEBPACK_IMPORTED_MODULE_5__util__.a;
            });
            __webpack_require__.d(__webpack_exports__, "base64encode", function() {
                return __WEBPACK_IMPORTED_MODULE_5__util__.b;
            });
            __webpack_require__.d(__webpack_exports__, "copyProp", function() {
                return __WEBPACK_IMPORTED_MODULE_5__util__.d;
            });
            __webpack_require__.d(__webpack_exports__, "cycle", function() {
                return __WEBPACK_IMPORTED_MODULE_5__util__.e;
            });
            __webpack_require__.d(__webpack_exports__, "dasherizeToCamel", function() {
                return __WEBPACK_IMPORTED_MODULE_5__util__.f;
            });
            __webpack_require__.d(__webpack_exports__, "dotify", function() {
                return __WEBPACK_IMPORTED_MODULE_5__util__.h;
            });
            __webpack_require__.d(__webpack_exports__, "eventEmitter", function() {
                return __WEBPACK_IMPORTED_MODULE_5__util__.i;
            });
            __webpack_require__.d(__webpack_exports__, "extend", function() {
                return __WEBPACK_IMPORTED_MODULE_5__util__.j;
            });
            __webpack_require__.d(__webpack_exports__, "getOrSet", function() {
                return __WEBPACK_IMPORTED_MODULE_5__util__.l;
            });
            __webpack_require__.d(__webpack_exports__, "isDefined", function() {
                return __WEBPACK_IMPORTED_MODULE_5__util__.n;
            });
            __webpack_require__.d(__webpack_exports__, "isRegex", function() {
                return __WEBPACK_IMPORTED_MODULE_5__util__.o;
            });
            __webpack_require__.d(__webpack_exports__, "memoize", function() {
                return __WEBPACK_IMPORTED_MODULE_5__util__.p;
            });
            __webpack_require__.d(__webpack_exports__, "memoizePromise", function() {
                return __WEBPACK_IMPORTED_MODULE_5__util__.q;
            });
            __webpack_require__.d(__webpack_exports__, "noop", function() {
                return __WEBPACK_IMPORTED_MODULE_5__util__.r;
            });
            __webpack_require__.d(__webpack_exports__, "once", function() {
                return __WEBPACK_IMPORTED_MODULE_5__util__.s;
            });
            __webpack_require__.d(__webpack_exports__, "promisify", function() {
                return __WEBPACK_IMPORTED_MODULE_5__util__.t;
            });
            __webpack_require__.d(__webpack_exports__, "replaceObject", function() {
                return __WEBPACK_IMPORTED_MODULE_5__util__.u;
            });
            __webpack_require__.d(__webpack_exports__, "safeInterval", function() {
                return __WEBPACK_IMPORTED_MODULE_5__util__.v;
            });
            __webpack_require__.d(__webpack_exports__, "stringify", function() {
                return __WEBPACK_IMPORTED_MODULE_5__util__.w;
            });
            __webpack_require__.d(__webpack_exports__, "stringifyError", function() {
                return __WEBPACK_IMPORTED_MODULE_5__util__.x;
            });
            __webpack_require__.d(__webpack_exports__, "uniqueID", function() {
                return __WEBPACK_IMPORTED_MODULE_5__util__.y;
            });
            __webpack_require__.d(__webpack_exports__, "weakMapMemoize", function() {
                return __WEBPACK_IMPORTED_MODULE_5__util__.z;
            });
            __webpack_require__.d(__webpack_exports__, "weakMapMemoizePromise", function() {
                return __WEBPACK_IMPORTED_MODULE_5__util__.A;
            });
            __webpack_require__("./node_modules/belter/src/http.js");
            var __WEBPACK_IMPORTED_MODULE_7__types__ = __webpack_require__("./node_modules/belter/src/types.js");
            __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__types__);
            __webpack_require__.o(__WEBPACK_IMPORTED_MODULE_7__types__, "isPerc") && __webpack_require__.d(__webpack_exports__, "isPerc", function() {
                return __WEBPACK_IMPORTED_MODULE_7__types__.isPerc;
            });
            __webpack_require__.o(__WEBPACK_IMPORTED_MODULE_7__types__, "isPx") && __webpack_require__.d(__webpack_exports__, "isPx", function() {
                return __WEBPACK_IMPORTED_MODULE_7__types__.isPx;
            });
            __webpack_require__.o(__WEBPACK_IMPORTED_MODULE_7__types__, "memoized") && __webpack_require__.d(__webpack_exports__, "memoized", function() {
                return __WEBPACK_IMPORTED_MODULE_7__types__.memoized;
            });
            __webpack_require__.o(__WEBPACK_IMPORTED_MODULE_7__types__, "normalizeDimension") && __webpack_require__.d(__webpack_exports__, "normalizeDimension", function() {
                return __WEBPACK_IMPORTED_MODULE_7__types__.normalizeDimension;
            });
            __webpack_require__.o(__WEBPACK_IMPORTED_MODULE_7__types__, "toCSS") && __webpack_require__.d(__webpack_exports__, "toCSS", function() {
                return __WEBPACK_IMPORTED_MODULE_7__types__.toCSS;
            });
            var __WEBPACK_IMPORTED_MODULE_8__decorators__ = __webpack_require__("./node_modules/belter/src/decorators.js");
            __webpack_require__.d(__webpack_exports__, "memoized", function() {
                return __WEBPACK_IMPORTED_MODULE_8__decorators__.a;
            });
            var __WEBPACK_IMPORTED_MODULE_9__css__ = __webpack_require__("./node_modules/belter/src/css.js");
            __webpack_require__.d(__webpack_exports__, "isPerc", function() {
                return __WEBPACK_IMPORTED_MODULE_9__css__.a;
            });
            __webpack_require__.d(__webpack_exports__, "isPx", function() {
                return __WEBPACK_IMPORTED_MODULE_9__css__.b;
            });
            __webpack_require__.d(__webpack_exports__, "normalizeDimension", function() {
                return __WEBPACK_IMPORTED_MODULE_9__css__.c;
            });
            __webpack_require__.d(__webpack_exports__, "toCSS", function() {
                return __WEBPACK_IMPORTED_MODULE_9__css__.d;
            });
        },
        "./node_modules/belter/src/storage.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_exports__.a = function getStorage(_ref) {
                var name = _ref.name, _ref$version = _ref.version, version = void 0 === _ref$version ? "latest" : _ref$version, _ref$lifetime = _ref.lifetime, lifetime = void 0 === _ref$lifetime ? 3e5 : _ref$lifetime;
                return Object(__WEBPACK_IMPORTED_MODULE_0__util__.m)(getStorage, function() {
                    var STORAGE_KEY = "__" + name + "_" + version + "_storage__", accessedStorage = void 0;
                    function getState(handler) {
                        var localStorageEnabled = Object(__WEBPACK_IMPORTED_MODULE_1__dom__.o)(), storage = void 0;
                        accessedStorage && (storage = accessedStorage);
                        if (!storage && localStorageEnabled) {
                            var rawStorage = window.localStorage.getItem(STORAGE_KEY);
                            rawStorage && (storage = JSON.parse(rawStorage));
                        }
                        storage || (storage = Object(__WEBPACK_IMPORTED_MODULE_0__util__.k)()[STORAGE_KEY]);
                        storage || (storage = {
                            id: Object(__WEBPACK_IMPORTED_MODULE_0__util__.y)()
                        });
                        storage.id || (storage.id = Object(__WEBPACK_IMPORTED_MODULE_0__util__.y)());
                        accessedStorage = storage;
                        var result = handler(storage);
                        localStorageEnabled ? window.localStorage.setItem(STORAGE_KEY, JSON.stringify(storage)) : Object(__WEBPACK_IMPORTED_MODULE_0__util__.k)()[STORAGE_KEY] = storage;
                        accessedStorage = null;
                        return result;
                    }
                    function getSession(handler) {
                        return getState(function(storage) {
                            var session = storage.__session__, now = Date.now();
                            session && now - session.created > lifetime && (session = null);
                            session || (session = {
                                guid: Object(__WEBPACK_IMPORTED_MODULE_0__util__.y)(),
                                created: now
                            });
                            storage.__session__ = session;
                            return handler(session);
                        });
                    }
                    return {
                        getState: getState,
                        getID: function() {
                            return getState(function(storage) {
                                return storage.id;
                            });
                        },
                        getSessionState: function(handler) {
                            return getSession(function(session) {
                                session.state = session.state || {};
                                return handler(session.state);
                            });
                        },
                        getSessionID: function() {
                            return getSession(function(session) {
                                return session.guid;
                            });
                        }
                    };
                }, [ {
                    name: name,
                    version: version,
                    lifetime: lifetime
                } ]);
            };
            var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__("./node_modules/belter/src/util.js"), __WEBPACK_IMPORTED_MODULE_1__dom__ = __webpack_require__("./node_modules/belter/src/dom.js");
        },
        "./node_modules/belter/src/types.js": function(module, exports) {},
        "./node_modules/belter/src/util.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_exports__.b = base64encode;
            __webpack_exports__.a = function(str) {
                return window.atob(str);
            };
            __webpack_exports__.y = uniqueID;
            __webpack_exports__.k = function() {
                if ("undefined" != typeof window) return window;
                if ("undefined" != typeof window) return window;
                if ("undefined" != typeof global) return global;
                throw new Error("No global found");
            };
            __webpack_exports__.p = function(method) {
                var _this = this, options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, cacheMap = new __WEBPACK_IMPORTED_MODULE_1_cross_domain_safe_weakmap_src__.a();
                function memoizedFunction() {
                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                    var cache = cacheMap.getOrSet(options.thisNamespace ? this : method, function() {
                        return {};
                    }), key = serializeArgs(args), cacheTime = options.time;
                    cache[key] && cacheTime && Date.now() - cache[key].time < cacheTime && delete cache[key];
                    if (cache[key]) return cache[key].value;
                    var time = Date.now(), value = method.apply(this, arguments);
                    cache[key] = {
                        time: time,
                        value: value
                    };
                    return cache[key].value;
                }
                memoizedFunction.reset = function() {
                    cacheMap.delete(options.thisNamespace ? _this : method);
                };
                options.name && (memoizedFunction.displayName = options.name + ":memoized");
                return memoizedFunction;
            };
            __webpack_exports__.q = function(method) {
                var cache = {};
                function memoizedPromiseFunction() {
                    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
                    var key = serializeArgs(args);
                    if (cache.hasOwnProperty(key)) return cache[key];
                    cache[key] = method.apply(this, arguments).finally(function() {
                        delete cache[key];
                    });
                    return cache[key];
                }
                memoizedPromiseFunction.reset = function() {
                    cache = {};
                };
                return memoizedPromiseFunction;
            };
            __webpack_exports__.t = function(method) {
                var options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                function promisifiedFunction() {
                    return __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__.a.try(method, this, arguments);
                }
                options.name && (promisifiedFunction.displayName = options.name + ":promisified");
                return promisifiedFunction;
            };
            __webpack_exports__.m = function(method, logic) {
                var args = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [], cache = method.__inline_memoize_cache__ = method.__inline_memoize_cache__ || {}, key = serializeArgs(args);
                return cache.hasOwnProperty(key) ? cache[key] : cache[key] = logic.apply(void 0, args);
            };
            __webpack_exports__.r = function() {};
            __webpack_exports__.s = function(method) {
                var called = !1;
                return function() {
                    if (!called) {
                        called = !0;
                        return method.apply(this, arguments);
                    }
                };
            };
            __webpack_exports__.x = function stringifyError(err) {
                var level = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
                if (level >= 3) return "stringifyError stack overflow";
                try {
                    if (!err) return "<unknown error: " + Object.prototype.toString.call(err) + ">";
                    if ("string" == typeof err) return err;
                    if (err instanceof Error) {
                        var stack = err && err.stack, message = err && err.message;
                        if (stack && message) return -1 !== stack.indexOf(message) ? stack : message + "\n" + stack;
                        if (stack) return stack;
                        if (message) return message;
                    }
                    return "function" == typeof err.toString ? err.toString() : Object.prototype.toString.call(err);
                } catch (newErr) {
                    return "Error while stringifying error: " + stringifyError(newErr, level + 1);
                }
            };
            __webpack_exports__.w = function(item) {
                return "string" == typeof item ? item : item && "function" == typeof item.toString ? item.toString() : Object.prototype.toString.call(item);
            };
            __webpack_exports__.j = function(obj, source) {
                if (!source) return obj;
                if (Object.assign) return Object.assign(obj, source);
                for (var key in source) source.hasOwnProperty(key) && (obj[key] = source[key]);
                return obj;
            };
            __webpack_exports__.v = function(method, time) {
                var timeout = void 0;
                !function loop() {
                    timeout = setTimeout(function() {
                        method();
                        loop();
                    }, time);
                }();
                return {
                    cancel: function() {
                        clearTimeout(timeout);
                    }
                };
            };
            __webpack_exports__.h = function dotify(obj) {
                var prefix = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", newobj = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                prefix = prefix ? prefix + "." : prefix;
                for (var key in obj) obj.hasOwnProperty(key) && void 0 !== obj[key] && null !== obj[key] && "function" != typeof obj[key] && (obj[key] && Array.isArray(obj[key]) && obj[key].length && obj[key].every(function(val) {
                    return "object" !== (void 0 === val ? "undefined" : _typeof(val));
                }) ? newobj["" + prefix + key + "[]"] = obj[key].join(",") : obj[key] && "object" === _typeof(obj[key]) ? newobj = dotify(obj[key], "" + prefix + key, newobj) : newobj["" + prefix + key] = obj[key].toString());
                return newobj;
            };
            __webpack_exports__.i = function() {
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
                        if (handlerList) for (var _i2 = 0, _length2 = null == handlerList ? 0 : handlerList.length; _i2 < _length2; _i2++) (0, 
                        handlerList[_i2])();
                    },
                    triggerOnce: function(eventName) {
                        if (!triggered[eventName]) {
                            triggered[eventName] = !0;
                            this.trigger(eventName);
                        }
                    }
                };
            };
            __webpack_exports__.f = function(string) {
                return string.replace(/-([a-z])/g, function(g) {
                    return g[1].toUpperCase();
                });
            };
            __webpack_exports__.c = function(string) {
                return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
            };
            __webpack_exports__.u = function replaceObject(item, replacer) {
                var fullKey = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
                if (Array.isArray(item)) {
                    for (var _length3 = item.length, result = [], _loop = function(i) {
                        defineLazyProp(result, i, function() {
                            var itemKey = fullKey ? fullKey + "." + i : "" + i, el = item[i], child = replacer(el, i, itemKey);
                            (isPlainObject(child) || Array.isArray(child)) && (child = replaceObject(child, replacer, itemKey));
                            return child;
                        });
                    }, i = 0; i < _length3; i++) _loop(i);
                    return result;
                }
                if (isPlainObject(item)) {
                    var _result = {}, _loop2 = function(key) {
                        if (!item.hasOwnProperty(key)) return "continue";
                        defineLazyProp(_result, key, function() {
                            var itemKey = fullKey ? fullKey + "." + key : "" + key, el = item[key], child = replacer(el, key, itemKey);
                            (isPlainObject(child) || Array.isArray(child)) && (child = replaceObject(child, replacer, itemKey));
                            return child;
                        });
                    };
                    for (var key in item) _loop2(key);
                    return _result;
                }
                throw new Error("Pass an object or array");
            };
            __webpack_exports__.d = function(source, target, name, def) {
                if (source.hasOwnProperty(name)) {
                    var descriptor = Object.getOwnPropertyDescriptor(source, name);
                    Object.defineProperty(target, name, descriptor);
                } else target[name] = def;
            };
            __webpack_exports__.n = function(value) {
                return null !== value && void 0 !== value;
            };
            __webpack_exports__.e = function cycle(method) {
                return __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__.a.try(method).then(function() {
                    return cycle(method);
                });
            };
            __webpack_exports__.g = function(method) {
                var time = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100, timeout = void 0;
                return function() {
                    var _this3 = this, _arguments2 = arguments;
                    clearTimeout(timeout);
                    timeout = setTimeout(function() {
                        return method.apply(_this3, _arguments2);
                    }, time);
                };
            };
            __webpack_exports__.o = function(item) {
                return "[object RegExp]" === Object.prototype.toString.call(item);
            };
            __webpack_require__.d(__webpack_exports__, "z", function() {
                return weakMapMemoize;
            });
            __webpack_require__.d(__webpack_exports__, "A", function() {
                return weakMapMemoizePromise;
            });
            __webpack_exports__.l = function(obj, key, getter) {
                if (obj.hasOwnProperty(key)) return obj[key];
                var val = getter();
                obj[key] = val;
                return val;
            };
            var __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__ = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), __WEBPACK_IMPORTED_MODULE_1_cross_domain_safe_weakmap_src__ = __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/index.js"), _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            function base64encode(str) {
                return window.btoa(str);
            }
            function uniqueID() {
                var chars = "0123456789abcdef";
                return "xxxxxxxxxx".replace(/./g, function() {
                    return chars.charAt(Math.floor(Math.random() * chars.length));
                }) + "_" + base64encode(new Date().toISOString().slice(11, 19).replace("T", ".")).replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
            }
            var objectIDs = void 0;
            function serializeArgs(args) {
                try {
                    return JSON.stringify(Array.prototype.slice.call(args), function(subkey, val) {
                        return "function" == typeof val ? "memoize[" + function(obj) {
                            objectIDs = objectIDs || new __WEBPACK_IMPORTED_MODULE_1_cross_domain_safe_weakmap_src__.a();
                            if (null === obj || void 0 === obj || "object" !== (void 0 === obj ? "undefined" : _typeof(obj)) && "function" != typeof obj) throw new Error("Invalid object");
                            var uid = objectIDs.get(obj);
                            if (!uid) {
                                uid = (void 0 === obj ? "undefined" : _typeof(obj)) + ":" + uniqueID();
                                objectIDs.set(obj, uid);
                            }
                            return uid;
                        }(val) + "]" : val;
                    });
                } catch (err) {
                    throw new Error("Arguments not serializable -- can not be used to memoize");
                }
            }
            function defineLazyProp(obj, key, getter) {
                if (Array.isArray(obj)) {
                    if ("number" != typeof key) throw new TypeError("Array key must be number");
                } else if ("object" === (void 0 === obj ? "undefined" : _typeof(obj)) && null !== obj && "string" != typeof key) throw new TypeError("Object key must be string");
                Object.defineProperty(obj, key, {
                    configurable: !0,
                    enumerable: !0,
                    get: function() {
                        delete obj[key];
                        var value = getter();
                        obj[key] = value;
                        return value;
                    },
                    set: function(value) {
                        delete obj[key];
                        obj[key] = value;
                    }
                });
            }
            function isObjectObject(obj) {
                return "object" === (void 0 === (item = obj) ? "undefined" : _typeof(item)) && null !== item && "[object Object]" === Object.prototype.toString.call(obj);
                var item;
            }
            function isPlainObject(obj) {
                if (!isObjectObject(obj)) return !1;
                var constructor = obj.constructor;
                if ("function" != typeof constructor) return !1;
                var prototype = constructor.prototype;
                return !!isObjectObject(prototype) && !!prototype.hasOwnProperty("isPrototypeOf");
            }
            var weakMapMemoize = function(method) {
                var weakmap = new __WEBPACK_IMPORTED_MODULE_1_cross_domain_safe_weakmap_src__.a();
                return function(arg) {
                    var _this4 = this;
                    return weakmap.getOrSet(arg, function() {
                        return method.call(_this4, arg);
                    });
                };
            }, weakMapMemoizePromise = function(method) {
                var weakmap = new __WEBPACK_IMPORTED_MODULE_1_cross_domain_safe_weakmap_src__.a();
                return function(arg) {
                    var _this5 = this;
                    return weakmap.getOrSet(arg, function() {
                        return method.call(_this5, arg).finally(function() {
                            weakmap.delete(arg);
                        });
                    });
                };
            };
        },
        "./node_modules/cross-domain-safe-weakmap/src/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.d({}, "WeakMap", function() {
                return weakmap_CrossDomainSafeWeakMap;
            });
            var src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js");
            function safeIndexOf(collection, item) {
                for (var i = 0; i < collection.length; i++) try {
                    if (collection[i] === item) return i;
                } catch (err) {}
                return -1;
            }
            var defineProperty = Object.defineProperty, counter = Date.now() % 1e9, weakmap_CrossDomainSafeWeakMap = function() {
                function CrossDomainSafeWeakMap() {
                    !function(instance, Constructor) {
                        if (!(instance instanceof CrossDomainSafeWeakMap)) throw new TypeError("Cannot call a class as a function");
                    }(this);
                    counter += 1;
                    this.name = "__weakmap_" + (1e9 * Math.random() >>> 0) + "__" + counter;
                    if (function() {
                        if ("undefined" == typeof WeakMap) return !1;
                        if (void 0 === Object.freeze) return !1;
                        try {
                            var testWeakMap = new WeakMap(), testKey = {};
                            Object.freeze(testKey);
                            testWeakMap.set(testKey, "__testvalue__");
                            return "__testvalue__" === testWeakMap.get(testKey);
                        } catch (err) {
                            return !1;
                        }
                    }()) try {
                        this.weakmap = new WeakMap();
                    } catch (err) {}
                    this.keys = [];
                    this.values = [];
                }
                CrossDomainSafeWeakMap.prototype._cleanupClosedWindows = function() {
                    for (var weakmap = this.weakmap, keys = this.keys, i = 0; i < keys.length; i++) {
                        var value = keys[i];
                        if (Object(src.isWindow)(value) && Object(src.isWindowClosed)(value)) {
                            if (weakmap) try {
                                weakmap.delete(value);
                            } catch (err) {}
                            keys.splice(i, 1);
                            this.values.splice(i, 1);
                            i -= 1;
                        }
                    }
                };
                CrossDomainSafeWeakMap.prototype.isSafeToReadWrite = function(key) {
                    if (Object(src.isWindow)(key)) return !1;
                    try {
                        key && key.self;
                        key && key[this.name];
                    } catch (err) {
                        return !1;
                    }
                    return !0;
                };
                CrossDomainSafeWeakMap.prototype.set = function(key, value) {
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
                        var keys = this.keys, values = this.values, index = safeIndexOf(keys, key);
                        if (-1 === index) {
                            keys.push(key);
                            values.push(value);
                        } else values[index] = value;
                    }
                };
                CrossDomainSafeWeakMap.prototype.get = function(key) {
                    if (!key) throw new Error("WeakMap expected key");
                    var weakmap = this.weakmap;
                    if (weakmap) try {
                        if (weakmap.has(key)) return weakmap.get(key);
                    } catch (err) {
                        delete this.weakmap;
                    }
                    if (!this.isSafeToReadWrite(key)) {
                        this._cleanupClosedWindows();
                        var index = safeIndexOf(this.keys, key);
                        if (-1 === index) return;
                        return this.values[index];
                    }
                    var entry = key[this.name];
                    if (entry && entry[0] === key) return entry[1];
                };
                CrossDomainSafeWeakMap.prototype.delete = function(key) {
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
                        var keys = this.keys, index = safeIndexOf(keys, key);
                        if (-1 !== index) {
                            keys.splice(index, 1);
                            this.values.splice(index, 1);
                        }
                    }
                };
                CrossDomainSafeWeakMap.prototype.has = function(key) {
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
                    return -1 !== safeIndexOf(this.keys, key);
                };
                CrossDomainSafeWeakMap.prototype.getOrSet = function(key, getter) {
                    if (this.has(key)) return this.get(key);
                    var value = getter();
                    this.set(key, value);
                    return value;
                };
                return CrossDomainSafeWeakMap;
            }();
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return weakmap_CrossDomainSafeWeakMap;
            });
        },
        "./node_modules/cross-domain-utils/src/constants.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return PROTOCOL;
            });
            __webpack_require__.d(__webpack_exports__, "b", function() {
                return WILDCARD;
            });
            var PROTOCOL = {
                MOCK: "mock:",
                FILE: "file:",
                ABOUT: "about:"
            }, WILDCARD = "*";
        },
        "./node_modules/cross-domain-utils/src/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__("./node_modules/cross-domain-utils/src/utils.js");
            __webpack_require__.d(__webpack_exports__, "assertSameDomain", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.a;
            });
            __webpack_require__.d(__webpack_exports__, "getActualDomain", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.b;
            });
            __webpack_require__.d(__webpack_exports__, "getAllFramesInWindow", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.c;
            });
            __webpack_require__.d(__webpack_exports__, "getAllWindows", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.d;
            });
            __webpack_require__.d(__webpack_exports__, "getAncestor", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.e;
            });
            __webpack_require__.d(__webpack_exports__, "getDistanceFromTop", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.f;
            });
            __webpack_require__.d(__webpack_exports__, "getDomain", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.g;
            });
            __webpack_require__.d(__webpack_exports__, "getDomainFromUrl", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.h;
            });
            __webpack_require__.d(__webpack_exports__, "getFrameByName", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.i;
            });
            __webpack_require__.d(__webpack_exports__, "getNthParentFromTop", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.j;
            });
            __webpack_require__.d(__webpack_exports__, "getOpener", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.k;
            });
            __webpack_require__.d(__webpack_exports__, "getParent", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.l;
            });
            __webpack_require__.d(__webpack_exports__, "getTop", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.m;
            });
            __webpack_require__.d(__webpack_exports__, "getUserAgent", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.n;
            });
            __webpack_require__.d(__webpack_exports__, "isActuallySameDomain", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.o;
            });
            __webpack_require__.d(__webpack_exports__, "isAncestor", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.p;
            });
            __webpack_require__.d(__webpack_exports__, "isOpener", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.q;
            });
            __webpack_require__.d(__webpack_exports__, "isSameDomain", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.r;
            });
            __webpack_require__.d(__webpack_exports__, "isSameTopWindow", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.s;
            });
            __webpack_require__.d(__webpack_exports__, "isTop", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.t;
            });
            __webpack_require__.d(__webpack_exports__, "isWindow", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.u;
            });
            __webpack_require__.d(__webpack_exports__, "isWindowClosed", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.v;
            });
            __webpack_require__.d(__webpack_exports__, "linkFrameWindow", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.w;
            });
            __webpack_require__.d(__webpack_exports__, "matchDomain", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.x;
            });
            __webpack_require__.d(__webpack_exports__, "onCloseWindow", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.y;
            });
            __webpack_require__.d(__webpack_exports__, "stringifyDomainPattern", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.z;
            });
            var __WEBPACK_IMPORTED_MODULE_1__types__ = __webpack_require__("./node_modules/cross-domain-utils/src/types.js");
            __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__types__), __webpack_require__("./node_modules/cross-domain-utils/src/constants.js");
        },
        "./node_modules/cross-domain-utils/src/types.js": function(module, exports) {},
        "./node_modules/cross-domain-utils/src/utils.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function isRegex(item) {
                return "[object RegExp]" === Object.prototype.toString.call(item);
            }
            var constants = __webpack_require__("./node_modules/cross-domain-utils/src/constants.js");
            __webpack_exports__.l = getParent;
            __webpack_exports__.k = getOpener;
            __webpack_exports__.b = getActualDomain;
            __webpack_exports__.g = getDomain;
            __webpack_exports__.o = isActuallySameDomain;
            __webpack_exports__.r = isSameDomain;
            __webpack_exports__.a = function(win) {
                if (!isSameDomain(win)) throw new Error("Expected window to be same domain");
                return win;
            };
            __webpack_exports__.m = getTop;
            __webpack_exports__.c = getAllFramesInWindow;
            __webpack_exports__.d = function getAllWindows() {
                var win = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window, frames = getAllFramesInWindow(win), opener = function() {
                    var win = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window;
                    return getOpener(getTop(win) || win);
                }(win);
                return opener ? [].concat(getAllWindows(opener), frames) : frames;
            };
            __webpack_exports__.t = function(win) {
                return win === getTop(win);
            };
            __webpack_exports__.v = isWindowClosed;
            __webpack_exports__.w = function(frame) {
                !function() {
                    for (var i = 0; i < iframeFrames.length; i++) if (isFrameWindowClosed(iframeFrames[i])) {
                        iframeFrames.splice(i, 1);
                        iframeWindows.splice(i, 1);
                    }
                    for (var _i8 = 0; _i8 < iframeWindows.length; _i8++) if (isWindowClosed(iframeWindows[_i8])) {
                        iframeFrames.splice(_i8, 1);
                        iframeWindows.splice(_i8, 1);
                    }
                }();
                if (frame && frame.contentWindow) try {
                    iframeWindows.push(frame.contentWindow);
                    iframeFrames.push(frame);
                } catch (err) {}
            };
            __webpack_exports__.n = function(win) {
                return (win = win || window).navigator.mockUserAgent || win.navigator.userAgent;
            };
            __webpack_exports__.i = function(win, name) {
                for (var winFrames = getFrames(win), _i10 = 0, _length8 = null == winFrames ? 0 : winFrames.length; _i10 < _length8; _i10++) {
                    var childFrame = winFrames[_i10];
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
            };
            __webpack_exports__.q = function(parent, child) {
                return parent === getOpener(child);
            };
            __webpack_exports__.e = getAncestor;
            __webpack_exports__.p = function(parent, child) {
                var actualParent = getAncestor(child);
                if (actualParent) return actualParent === parent;
                if (child === parent) return !1;
                if (getTop(child) === child) return !1;
                for (var _i16 = 0, _getFrames8 = getFrames(parent), _length14 = null == _getFrames8 ? 0 : _getFrames8.length; _i16 < _length14; _i16++) if (_getFrames8[_i16] === child) return !0;
                return !1;
            };
            __webpack_exports__.f = getDistanceFromTop;
            __webpack_exports__.j = function(win) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
                return function(win) {
                    for (var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1, parent = win, i = 0; i < n; i++) {
                        if (!parent) return;
                        parent = getParent(parent);
                    }
                    return parent;
                }(win, getDistanceFromTop(win) - n);
            };
            __webpack_exports__.s = function(win1, win2) {
                var top1 = getTop(win1) || win1, top2 = getTop(win2) || win2;
                try {
                    if (top1 && top2) return top1 === top2;
                } catch (err) {}
                var allFrames1 = getAllFramesInWindow(win1), allFrames2 = getAllFramesInWindow(win2);
                if (anyMatch(allFrames1, allFrames2)) return !0;
                var opener1 = getOpener(top1), opener2 = getOpener(top2);
                return !(opener1 && anyMatch(getAllFramesInWindow(opener1), allFrames2) || (opener2 && anyMatch(getAllFramesInWindow(opener2), allFrames1), 
                1));
            };
            __webpack_exports__.x = function matchDomain(pattern, origin) {
                if ("string" == typeof pattern) {
                    if ("string" == typeof origin) return pattern === constants.b || origin === pattern;
                    if (isRegex(origin)) return !1;
                    if (Array.isArray(origin)) return !1;
                }
                return isRegex(pattern) ? isRegex(origin) ? pattern.toString() === origin.toString() : !Array.isArray(origin) && Boolean(origin.match(pattern)) : !!Array.isArray(pattern) && (Array.isArray(origin) ? JSON.stringify(pattern) === JSON.stringify(origin) : !isRegex(origin) && pattern.some(function(subpattern) {
                    return matchDomain(subpattern, origin);
                }));
            };
            __webpack_exports__.z = function(pattern) {
                return Array.isArray(pattern) ? "(" + pattern.join(" | ") + ")" : isRegex(pattern) ? "RegExp(" + pattern.toString() : pattern.toString();
            };
            __webpack_exports__.h = function(url) {
                return url.match(/^(https?|mock|file):\/\//) ? url.split("/").slice(0, 3).join("/") : getDomain();
            };
            __webpack_exports__.y = function(win, callback) {
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
            };
            __webpack_exports__.u = function(obj) {
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
                    obj && obj.__cross_domain_utils_window_check__;
                } catch (err) {
                    return !0;
                }
                return !1;
            };
            var IE_WIN_ACCESS_ERROR = "Call was rejected by callee.\r\n";
            function isAboutProtocol() {
                return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window).location.protocol === constants.a.ABOUT;
            }
            function getParent(win) {
                if (win) try {
                    if (win.parent && win.parent !== win) return win.parent;
                } catch (err) {}
            }
            function getOpener(win) {
                if (win && !getParent(win)) try {
                    return win.opener;
                } catch (err) {}
            }
            function canReadFromWindow(win) {
                try {
                    win && win.location && win.location.href;
                    return !0;
                } catch (err) {}
                return !1;
            }
            function getActualDomain(win) {
                var location = (win = win || window).location;
                if (!location) throw new Error("Can not read window location");
                var protocol = location.protocol;
                if (!protocol) throw new Error("Can not read window protocol");
                if (protocol === constants.a.FILE) return constants.a.FILE + "//";
                if (protocol === constants.a.ABOUT) {
                    var parent = getParent(win);
                    return parent && canReadFromWindow(parent) ? getActualDomain(parent) : constants.a.ABOUT + "//";
                }
                var host = location.host;
                if (!host) throw new Error("Can not read window host");
                return protocol + "//" + host;
            }
            function getDomain(win) {
                var domain = getActualDomain(win = win || window);
                return domain && win.mockDomain && 0 === win.mockDomain.indexOf(constants.a.MOCK) ? win.mockDomain : domain;
            }
            function isActuallySameDomain(win) {
                try {
                    if (win === window) return !0;
                } catch (err) {}
                try {
                    var desc = Object.getOwnPropertyDescriptor(win, "location");
                    if (desc && !1 === desc.enumerable) return !1;
                } catch (err) {}
                try {
                    if (isAboutProtocol(win) && canReadFromWindow(win)) return !0;
                } catch (err) {}
                try {
                    if (getActualDomain(win) === getActualDomain(window)) return !0;
                } catch (err) {}
                return !1;
            }
            function isSameDomain(win) {
                if (!isActuallySameDomain(win)) return !1;
                try {
                    if (win === window) return !0;
                    if (isAboutProtocol(win) && canReadFromWindow(win)) return !0;
                    if (getDomain(window) === getDomain(win)) return !0;
                } catch (err) {}
                return !1;
            }
            function isAncestorParent(parent, child) {
                if (!parent || !child) return !1;
                var childParent = getParent(child);
                return childParent ? childParent === parent : -1 !== function(win) {
                    var result = [];
                    try {
                        for (;win.parent !== win; ) {
                            result.push(win.parent);
                            win = win.parent;
                        }
                    } catch (err) {}
                    return result;
                }(child).indexOf(parent);
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
                for (var result = [], _i3 = 0, _getFrames2 = getFrames(win), _length2 = null == _getFrames2 ? 0 : _getFrames2.length; _i3 < _length2; _i3++) {
                    var frame = _getFrames2[_i3];
                    result.push(frame);
                    for (var _i5 = 0, _getAllChildFrames2 = getAllChildFrames(frame), _length4 = null == _getAllChildFrames2 ? 0 : _getAllChildFrames2.length; _i5 < _length4; _i5++) {
                        var childFrame = _getAllChildFrames2[_i5];
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
                    for (var _i7 = 0, _getAllChildFrames4 = getAllChildFrames(win), _length6 = null == _getAllChildFrames4 ? 0 : _getAllChildFrames4.length; _i7 < _length6; _i7++) {
                        var frame = _getAllChildFrames4[_i7];
                        try {
                            if (frame.top) return frame.top;
                        } catch (err) {}
                        if (getParent(frame) === frame) return frame;
                    }
                }
            }
            function getAllFramesInWindow(win) {
                var top = getTop(win);
                if (!top) throw new Error("Can not determine top window");
                return [].concat(getAllChildFrames(top), [ top ]);
            }
            function isFrameWindowClosed(frame) {
                if (!frame.contentWindow) return !0;
                if (!frame.parentNode) return !0;
                var doc = frame.ownerDocument;
                return !(!doc || !doc.documentElement || doc.documentElement.contains(frame));
            }
            var iframeWindows = [], iframeFrames = [];
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
                var iframeIndex = function(collection, item) {
                    for (var i = 0; i < collection.length; i++) try {
                        if (collection[i] === item) return i;
                    } catch (err) {}
                    return -1;
                }(iframeWindows, win);
                if (-1 !== iframeIndex) {
                    var frame = iframeFrames[iframeIndex];
                    if (frame && isFrameWindowClosed(frame)) return !0;
                }
                return !1;
            }
            function getAncestor(win) {
                return getOpener(win = win || window) || getParent(win) || void 0;
            }
            function anyMatch(collection1, collection2) {
                for (var _i18 = 0, _length16 = null == collection1 ? 0 : collection1.length; _i18 < _length16; _i18++) for (var item1 = collection1[_i18], _i20 = 0, _length18 = null == collection2 ? 0 : collection2.length; _i20 < _length18; _i20++) if (item1 === collection2[_i20]) return !0;
                return !1;
            }
            function getDistanceFromTop() {
                for (var distance = 0, parent = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window; parent; ) (parent = getParent(parent)) && (distance += 1);
                return distance;
            }
        },
        "./node_modules/post-robot/src/bridge/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            Object.defineProperty(__webpack_exports__, "__esModule", {
                value: !0
            });
            var src = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), cross_domain_utils_src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), belter_src = __webpack_require__("./node_modules/belter/src/index.js"), conf = __webpack_require__("./node_modules/post-robot/src/conf/index.js"), global = __webpack_require__("./node_modules/post-robot/src/global.js"), tunnelWindows = Object(global.b)("tunnelWindows");
            global.a.openTunnelToParent = function(_ref2) {
                var name = _ref2.name, source = _ref2.source, canary = _ref2.canary, sendMessage = _ref2.sendMessage, parentWindow = Object(cross_domain_utils_src.getParent)(window);
                if (!parentWindow) throw new Error("No parent window found to open tunnel to");
                var id = function(_ref) {
                    var name = _ref.name, source = _ref.source, canary = _ref.canary, sendMessage = _ref.sendMessage;
                    !function() {
                        for (var _i2 = 0, _tunnelWindows$keys2 = tunnelWindows.keys(), _length2 = null == _tunnelWindows$keys2 ? 0 : _tunnelWindows$keys2.length; _i2 < _length2; _i2++) {
                            var key = _tunnelWindows$keys2[_i2], tunnelWindow = tunnelWindows[key];
                            try {
                                Object(belter_src.noop)(tunnelWindow.source);
                            } catch (err) {
                                tunnelWindows.del(key);
                                continue;
                            }
                            Object(cross_domain_utils_src.isWindowClosed)(tunnelWindow.source) && tunnelWindows.del(key);
                        }
                    }();
                    var id = Object(belter_src.uniqueID)();
                    tunnelWindows.set(id, {
                        name: name,
                        source: source,
                        canary: canary,
                        sendMessage: sendMessage
                    });
                    return id;
                }({
                    name: name,
                    source: source,
                    canary: canary,
                    sendMessage: sendMessage
                });
                return global.a.send(parentWindow, conf.d.OPEN_TUNNEL, {
                    name: name,
                    sendMessage: function() {
                        var tunnelWindow = tunnelWindows.get(id);
                        try {
                            Object(belter_src.noop)(tunnelWindow && tunnelWindow.source);
                        } catch (err) {
                            tunnelWindows.del(id);
                            return;
                        }
                        if (tunnelWindow && tunnelWindow.source && !Object(cross_domain_utils_src.isWindowClosed)(tunnelWindow.source)) {
                            try {
                                tunnelWindow.canary();
                            } catch (err) {
                                return;
                            }
                            tunnelWindow.sendMessage.apply(this, arguments);
                        }
                    }
                }, {
                    domain: conf.i
                });
            };
            function needsBridgeForBrowser() {
                return !!Object(cross_domain_utils_src.getUserAgent)(window).match(/MSIE|trident|edge\/12|edge\/13/i) || !conf.b.ALLOW_POSTMESSAGE_POPUP;
            }
            function needsBridgeForWin(win) {
                return !Object(cross_domain_utils_src.isSameTopWindow)(window, win);
            }
            function needsBridgeForDomain(domain, win) {
                if (domain) {
                    if (Object(cross_domain_utils_src.getDomain)() !== Object(cross_domain_utils_src.getDomainFromUrl)(domain)) return !0;
                } else if (win && !Object(cross_domain_utils_src.isSameDomain)(win)) return !0;
                return !1;
            }
            function needsBridge(_ref) {
                var win = _ref.win, domain = _ref.domain;
                return !(!needsBridgeForBrowser() || domain && !needsBridgeForDomain(domain, win) || win && !needsBridgeForWin(win));
            }
            function getBridgeName(domain) {
                var sanitizedDomain = (domain = domain || Object(cross_domain_utils_src.getDomainFromUrl)(domain)).replace(/[^a-zA-Z0-9]+/g, "_");
                return conf.a + "_" + sanitizedDomain;
            }
            function isBridge() {
                return Boolean(window.name && window.name === getBridgeName(Object(cross_domain_utils_src.getDomain)()));
            }
            var documentBodyReady = new src.a(function(resolve) {
                if (window.document && window.document.body) return resolve(window.document.body);
                var interval = setInterval(function() {
                    if (window.document && window.document.body) {
                        clearInterval(interval);
                        return resolve(window.document.body);
                    }
                }, 10);
            }), remoteWindows = Object(global.c)("remoteWindows");
            function registerRemoteWindow(win) {
                remoteWindows.getOrSet(win, function() {
                    return new src.a();
                });
            }
            function findRemoteWindow(win) {
                var remoteWin = remoteWindows.get(win);
                if (!remoteWin) throw new Error("Remote window not found");
                return remoteWin;
            }
            function registerRemoteSendMessage(win, domain, sendMessage) {
                findRemoteWindow(win).resolve(function(remoteWin, remoteDomain, message) {
                    if (remoteWin !== win) throw new Error("Remote window does not match window");
                    if (!Object(cross_domain_utils_src.matchDomain)(remoteDomain, domain)) throw new Error("Remote domain " + remoteDomain + " does not match domain " + domain);
                    sendMessage(message);
                });
            }
            function rejectRemoteSendMessage(win, err) {
                findRemoteWindow(win).reject(err).catch(belter_src.noop);
            }
            function sendBridgeMessage(win, domain, message) {
                var messagingChild = Object(cross_domain_utils_src.isOpener)(window, win), messagingParent = Object(cross_domain_utils_src.isOpener)(win, window);
                if (!messagingChild && !messagingParent) throw new Error("Can only send messages to and from parent and popup windows");
                return findRemoteWindow(win).then(function(sendMessage) {
                    return sendMessage(win, domain, message);
                });
            }
            var awaitRemoteBridgeForWindow = Object(belter_src.weakMapMemoize)(function(win) {
                return src.a.try(function() {
                    try {
                        var frame = Object(cross_domain_utils_src.getFrameByName)(win, getBridgeName(Object(cross_domain_utils_src.getDomain)()));
                        if (!frame) return;
                        return Object(cross_domain_utils_src.isSameDomain)(frame) && frame[conf.j.POSTROBOT] ? frame : new src.a(function(resolve) {
                            var interval = void 0, timeout = void 0;
                            interval = setInterval(function() {
                                if (frame && Object(cross_domain_utils_src.isSameDomain)(frame) && frame[conf.j.POSTROBOT]) {
                                    clearInterval(interval);
                                    clearTimeout(timeout);
                                    return resolve(frame);
                                }
                            }, 100);
                            timeout = setTimeout(function() {
                                clearInterval(interval);
                                return resolve();
                            }, 2e3);
                        });
                    } catch (err) {}
                });
            });
            function openTunnelToOpener() {
                return src.a.try(function() {
                    var opener = Object(cross_domain_utils_src.getOpener)(window);
                    if (opener && needsBridge({
                        win: opener
                    })) {
                        registerRemoteWindow(opener);
                        return awaitRemoteBridgeForWindow(opener).then(function(bridge) {
                            return bridge ? window.name ? bridge[conf.j.POSTROBOT].openTunnelToParent({
                                name: window.name,
                                source: window,
                                canary: function() {},
                                sendMessage: function(message) {
                                    try {
                                        Object(belter_src.noop)(window);
                                    } catch (err) {
                                        return;
                                    }
                                    if (window && !window.closed) try {
                                        global.a.receiveMessage({
                                            data: message,
                                            origin: this.origin,
                                            source: this.source
                                        });
                                    } catch (err) {
                                        src.a.reject(err);
                                    }
                                }
                            }).then(function(_ref) {
                                var source = _ref.source, origin = _ref.origin, data = _ref.data;
                                if (source !== opener) throw new Error("Source does not match opener");
                                registerRemoteSendMessage(source, origin, data.sendMessage);
                            }).catch(function(err) {
                                rejectRemoteSendMessage(opener, err);
                                throw err;
                            }) : rejectRemoteSendMessage(opener, new Error("Can not register with opener: window does not have a name")) : rejectRemoteSendMessage(opener, new Error("Can not register with opener: no bridge found in opener"));
                        });
                    }
                });
            }
            var lib = __webpack_require__("./node_modules/post-robot/src/lib/index.js"), bridges = Object(global.b)("bridges"), bridgeFrames = Object(global.b)("bridgeFrames"), popupWindowsByName = Object(global.b)("popupWindowsByName"), popupWindowsByWin = Object(global.c)("popupWindowsByWin");
            function hasBridge(url, domain) {
                return bridges.has(domain || Object(cross_domain_utils_src.getDomainFromUrl)(url));
            }
            function openBridge(url, domain) {
                domain = domain || Object(cross_domain_utils_src.getDomainFromUrl)(url);
                return bridges.getOrSet(domain, function() {
                    return src.a.try(function() {
                        if (Object(cross_domain_utils_src.getDomain)() === domain) throw new Error("Can not open bridge on the same domain as current domain: " + domain);
                        var name = getBridgeName(domain);
                        if (Object(cross_domain_utils_src.getFrameByName)(window, name)) throw new Error("Frame with name " + name + " already exists on page");
                        var iframe = function(name, url) {
                            var iframe = document.createElement("iframe");
                            iframe.setAttribute("name", name);
                            iframe.setAttribute("id", name);
                            iframe.setAttribute("style", "display: none; margin: 0; padding: 0; border: 0px none; overflow: hidden;");
                            iframe.setAttribute("frameborder", "0");
                            iframe.setAttribute("border", "0");
                            iframe.setAttribute("scrolling", "no");
                            iframe.setAttribute("allowTransparency", "true");
                            iframe.setAttribute("tabindex", "-1");
                            iframe.setAttribute("hidden", "true");
                            iframe.setAttribute("title", "");
                            iframe.setAttribute("role", "presentation");
                            iframe.src = url;
                            return iframe;
                        }(name, url);
                        bridgeFrames.set(domain, iframe);
                        return documentBodyReady.then(function(body) {
                            body.appendChild(iframe);
                            var bridge = iframe.contentWindow;
                            !function(source, domain) {
                                global.a.on(conf.d.OPEN_TUNNEL, {
                                    window: source,
                                    domain: domain
                                }, function(_ref) {
                                    var origin = _ref.origin, data = _ref.data;
                                    if (origin !== domain) throw new Error("Domain " + domain + " does not match origin " + origin);
                                    if (!data.name) throw new Error("Register window expected to be passed window name");
                                    if (!data.sendMessage) throw new Error("Register window expected to be passed sendMessage method");
                                    if (!popupWindowsByName.has(data.name)) throw new Error("Window with name " + data.name + " does not exist, or was not opened by this window");
                                    if (!popupWindowsByName.get(data.name).domain) throw new Error("We do not have a registered domain for window " + data.name);
                                    if (popupWindowsByName.get(data.name).domain !== origin) throw new Error("Message origin " + origin + " does not matched registered window origin " + popupWindowsByName.get(data.name).domain);
                                    registerRemoteSendMessage(popupWindowsByName.get(data.name).win, domain, data.sendMessage);
                                    return {
                                        sendMessage: function(message) {
                                            if (window && !window.closed) {
                                                var winDetails = popupWindowsByName.get(data.name);
                                                if (winDetails) try {
                                                    global.a.receiveMessage({
                                                        data: message,
                                                        origin: winDetails.domain,
                                                        source: winDetails.win
                                                    });
                                                } catch (err) {
                                                    src.a.reject(err);
                                                }
                                            }
                                        }
                                    };
                                });
                            }(bridge, domain);
                            return new src.a(function(resolve, reject) {
                                iframe.onload = resolve;
                                iframe.onerror = reject;
                            }).then(function() {
                                return Object(lib.a)(bridge, conf.b.BRIDGE_TIMEOUT, "Bridge " + url);
                            }).then(function() {
                                return bridge;
                            });
                        });
                    });
                });
            }
            var windowOpen = window.open;
            window.open = function(url, name, options, last) {
                var domain = url;
                if (url && 0 === url.indexOf(conf.f.MOCK)) {
                    var _url$split = url.split("|");
                    domain = _url$split[0];
                    url = _url$split[1];
                }
                domain && (domain = Object(cross_domain_utils_src.getDomainFromUrl)(domain));
                var win = windowOpen.call(this, url, name, options, last);
                if (!win) return win;
                url && registerRemoteWindow(win);
                for (var _i2 = 0, _popupWindowsByName$k2 = popupWindowsByName.keys(), _length2 = null == _popupWindowsByName$k2 ? 0 : _popupWindowsByName$k2.length; _i2 < _length2; _i2++) {
                    var winName = _popupWindowsByName$k2[_i2];
                    Object(cross_domain_utils_src.isWindowClosed)(popupWindowsByName.get(winName).win) && popupWindowsByName.del(winName);
                }
                if (name && win) {
                    var winOptions = popupWindowsByWin.getOrSet(win, function() {
                        return {};
                    });
                    winOptions.name = winOptions.name || name;
                    winOptions.win = winOptions.win || win;
                    winOptions.domain = winOptions.domain || domain;
                    popupWindowsByWin.set(win, winOptions);
                    popupWindowsByName.set(name, winOptions);
                }
                return win;
            };
            function linkUrl(win, url) {
                if (popupWindowsByWin.has(win)) {
                    popupWindowsByWin.get(win).domain = Object(cross_domain_utils_src.getDomainFromUrl)(url);
                    registerRemoteWindow(win);
                }
            }
            function destroyBridges() {
                for (var _i4 = 0, _bridgeFrames$keys2 = bridgeFrames.keys(), _length4 = null == _bridgeFrames$keys2 ? 0 : _bridgeFrames$keys2.length; _i4 < _length4; _i4++) {
                    var domain = _bridgeFrames$keys2[_i4], frame = bridgeFrames.get(domain);
                    frame && frame.parentNode && frame.parentNode.removeChild(frame);
                }
                bridgeFrames.reset();
                bridges.reset();
            }
            __webpack_require__.d(__webpack_exports__, "openTunnelToOpener", function() {
                return openTunnelToOpener;
            });
            __webpack_require__.d(__webpack_exports__, "needsBridgeForBrowser", function() {
                return needsBridgeForBrowser;
            });
            __webpack_require__.d(__webpack_exports__, "needsBridgeForWin", function() {
                return needsBridgeForWin;
            });
            __webpack_require__.d(__webpack_exports__, "needsBridgeForDomain", function() {
                return needsBridgeForDomain;
            });
            __webpack_require__.d(__webpack_exports__, "needsBridge", function() {
                return needsBridge;
            });
            __webpack_require__.d(__webpack_exports__, "getBridgeName", function() {
                return getBridgeName;
            });
            __webpack_require__.d(__webpack_exports__, "isBridge", function() {
                return isBridge;
            });
            __webpack_require__.d(__webpack_exports__, "documentBodyReady", function() {
                return documentBodyReady;
            });
            __webpack_require__.d(__webpack_exports__, "registerRemoteWindow", function() {
                return registerRemoteWindow;
            });
            __webpack_require__.d(__webpack_exports__, "findRemoteWindow", function() {
                return findRemoteWindow;
            });
            __webpack_require__.d(__webpack_exports__, "registerRemoteSendMessage", function() {
                return registerRemoteSendMessage;
            });
            __webpack_require__.d(__webpack_exports__, "rejectRemoteSendMessage", function() {
                return rejectRemoteSendMessage;
            });
            __webpack_require__.d(__webpack_exports__, "sendBridgeMessage", function() {
                return sendBridgeMessage;
            });
            __webpack_require__.d(__webpack_exports__, "hasBridge", function() {
                return hasBridge;
            });
            __webpack_require__.d(__webpack_exports__, "openBridge", function() {
                return openBridge;
            });
            __webpack_require__.d(__webpack_exports__, "linkUrl", function() {
                return linkUrl;
            });
            __webpack_require__.d(__webpack_exports__, "destroyBridges", function() {
                return destroyBridges;
            });
        },
        "./node_modules/post-robot/src/bridge/interface.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            Object.defineProperty(__webpack_exports__, "__esModule", {
                value: !0
            });
            var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__("./node_modules/post-robot/src/bridge/index.js");
            __webpack_require__.d(__webpack_exports__, "openBridge", function() {
                return __WEBPACK_IMPORTED_MODULE_0__index__.openBridge;
            });
            __webpack_require__.d(__webpack_exports__, "linkUrl", function() {
                return __WEBPACK_IMPORTED_MODULE_0__index__.linkUrl;
            });
            __webpack_require__.d(__webpack_exports__, "isBridge", function() {
                return __WEBPACK_IMPORTED_MODULE_0__index__.isBridge;
            });
            __webpack_require__.d(__webpack_exports__, "needsBridge", function() {
                return __WEBPACK_IMPORTED_MODULE_0__index__.needsBridge;
            });
            __webpack_require__.d(__webpack_exports__, "needsBridgeForBrowser", function() {
                return __WEBPACK_IMPORTED_MODULE_0__index__.needsBridgeForBrowser;
            });
            __webpack_require__.d(__webpack_exports__, "hasBridge", function() {
                return __WEBPACK_IMPORTED_MODULE_0__index__.hasBridge;
            });
            __webpack_require__.d(__webpack_exports__, "needsBridgeForWin", function() {
                return __WEBPACK_IMPORTED_MODULE_0__index__.needsBridgeForWin;
            });
            __webpack_require__.d(__webpack_exports__, "needsBridgeForDomain", function() {
                return __WEBPACK_IMPORTED_MODULE_0__index__.needsBridgeForDomain;
            });
            __webpack_require__.d(__webpack_exports__, "openTunnelToOpener", function() {
                return __WEBPACK_IMPORTED_MODULE_0__index__.openTunnelToOpener;
            });
            __webpack_require__.d(__webpack_exports__, "destroyBridges", function() {
                return __WEBPACK_IMPORTED_MODULE_0__index__.destroyBridges;
            });
        },
        "./node_modules/post-robot/src/compat/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            Object.defineProperty(__webpack_exports__, "__esModule", {
                value: !0
            });
            var src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), conf = __webpack_require__("./node_modules/post-robot/src/conf/index.js");
            function emulateIERestrictions(sourceWindow, targetWindow) {
                if (!conf.b.ALLOW_POSTMESSAGE_POPUP && !1 === Object(src.isSameTopWindow)(sourceWindow, targetWindow)) throw new Error("Can not send and receive post messages between two different windows (disabled to emulate IE)");
            }
            __webpack_require__.d(__webpack_exports__, "emulateIERestrictions", function() {
                return emulateIERestrictions;
            });
        },
        "./node_modules/post-robot/src/conf/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var _ALLOWED_POST_MESSAGE, MESSAGE_TYPE = {
                REQUEST: "postrobot_message_request",
                RESPONSE: "postrobot_message_response",
                ACK: "postrobot_message_ack"
            }, MESSAGE_ACK = {
                SUCCESS: "success",
                ERROR: "error"
            }, MESSAGE_NAME = {
                METHOD: "postrobot_method",
                HELLO: "postrobot_hello",
                OPEN_TUNNEL: "postrobot_open_tunnel"
            }, WINDOW_PROP = {
                POSTROBOT: "__postRobot__"
            }, SEND_STRATEGY = {
                POST_MESSAGE: "postrobot_post_message",
                BRIDGE: "postrobot_bridge",
                GLOBAL: "postrobot_global"
            }, PROTOCOL = {
                MOCK: "mock:",
                FILE: "file:"
            }, SERIALIZATION_TYPE = {
                CROSS_DOMAIN_ZALGO_PROMISE: "cross_domain_zalgo_promise",
                CROSS_DOMAIN_FUNCTION: "cross_domain_function",
                CROSS_DOMAIN_WINDOW: "cross_domain_window"
            }, CONFIG = {
                ALLOW_POSTMESSAGE_POPUP: !("__ALLOW_POSTMESSAGE_POPUP__" in window) || window.__ALLOW_POSTMESSAGE_POPUP__,
                BRIDGE_TIMEOUT: 5e3,
                CHILD_WINDOW_TIMEOUT: 5e3,
                ACK_TIMEOUT: 2e3,
                ACK_TIMEOUT_KNOWN: 1e4,
                RES_TIMEOUT: -1,
                ALLOWED_POST_MESSAGE_METHODS: (_ALLOWED_POST_MESSAGE = {}, _ALLOWED_POST_MESSAGE[SEND_STRATEGY.POST_MESSAGE] = !0, 
                _ALLOWED_POST_MESSAGE[SEND_STRATEGY.BRIDGE] = !0, _ALLOWED_POST_MESSAGE[SEND_STRATEGY.GLOBAL] = !0, 
                _ALLOWED_POST_MESSAGE)
            };
            0 === window.location.href.indexOf(PROTOCOL.FILE) && (CONFIG.ALLOW_POSTMESSAGE_POPUP = !0);
            __webpack_require__.d(__webpack_exports__, "b", function() {
                return CONFIG;
            });
            __webpack_require__.d(__webpack_exports__, "e", function() {
                return MESSAGE_TYPE;
            });
            __webpack_require__.d(__webpack_exports__, "c", function() {
                return MESSAGE_ACK;
            });
            __webpack_require__.d(__webpack_exports__, "d", function() {
                return MESSAGE_NAME;
            });
            __webpack_require__.d(__webpack_exports__, "j", function() {
                return WINDOW_PROP;
            });
            __webpack_require__.d(__webpack_exports__, "g", function() {
                return SEND_STRATEGY;
            });
            __webpack_require__.d(__webpack_exports__, "f", function() {
                return PROTOCOL;
            });
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return "__postrobot_bridge__";
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return "__postrobot_proxy__";
            });
            __webpack_require__.d(__webpack_exports__, "i", function() {
                return "*";
            });
            __webpack_require__.d(__webpack_exports__, "h", function() {
                return SERIALIZATION_TYPE;
            });
        },
        "./node_modules/post-robot/src/global.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return global;
            });
            __webpack_exports__.c = function(key) {
                var defStore = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : getObj;
                function getStore(win) {
                    return winStore.getOrSet(win, defStore);
                }
                return {
                    has: function(win) {
                        return getStore(win).hasOwnProperty(key);
                    },
                    get: function(win, defVal) {
                        var store = getStore(win);
                        return store.hasOwnProperty(key) ? store[key] : defVal;
                    },
                    set: function(win, val) {
                        getStore(win)[key] = val;
                        return val;
                    },
                    del: function(win) {
                        delete getStore(win)[key];
                    },
                    getOrSet: function(win, getter) {
                        var store = getStore(win);
                        if (store.hasOwnProperty(key)) return store[key];
                        var val = getter();
                        store[key] = val;
                        return val;
                    }
                };
            };
            __webpack_exports__.b = function(key) {
                var defStore = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : getObj, store = Object(__WEBPACK_IMPORTED_MODULE_2_belter_src__.getOrSet)(global, key, defStore);
                return {
                    has: function(storeKey) {
                        return store.hasOwnProperty(storeKey);
                    },
                    get: function(storeKey, defVal) {
                        return store.hasOwnProperty(storeKey) ? store[storeKey] : defVal;
                    },
                    set: function(storeKey, val) {
                        store[storeKey] = val;
                        return val;
                    },
                    del: function(storeKey) {
                        delete store[storeKey];
                    },
                    getOrSet: function(storeKey, getter) {
                        if (store.hasOwnProperty(storeKey)) return store[storeKey];
                        var val = getter();
                        store[storeKey] = val;
                        return val;
                    },
                    reset: function() {
                        store = defStore();
                    },
                    keys: function() {
                        return Object.keys(store);
                    }
                };
            };
            __webpack_require__("./node_modules/cross-domain-utils/src/index.js");
            var __WEBPACK_IMPORTED_MODULE_1_cross_domain_safe_weakmap_src__ = __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/index.js"), __WEBPACK_IMPORTED_MODULE_2_belter_src__ = __webpack_require__("./node_modules/belter/src/index.js"), __WEBPACK_IMPORTED_MODULE_3__conf__ = __webpack_require__("./node_modules/post-robot/src/conf/index.js"), global = window[__WEBPACK_IMPORTED_MODULE_3__conf__.j.POSTROBOT] = window[__WEBPACK_IMPORTED_MODULE_3__conf__.j.POSTROBOT] || {}, winStore = global.windowStore = global.windowStore || new __WEBPACK_IMPORTED_MODULE_1_cross_domain_safe_weakmap_src__.a(), getObj = function() {
                return {};
            };
        },
        "./node_modules/post-robot/src/lib/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), zalgo_promise_src = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), belter_src = __webpack_require__("./node_modules/belter/src/index.js"), conf = __webpack_require__("./node_modules/post-robot/src/conf/index.js"), global = __webpack_require__("./node_modules/post-robot/src/global.js");
            global.a.instanceID = global.a.instanceID || Object(belter_src.uniqueID)();
            var helloPromises = Object(global.c)("helloPromises");
            function getHelloPromise(win) {
                return helloPromises.getOrSet(win, function() {
                    return new zalgo_promise_src.a();
                });
            }
            var listenForHello = Object(belter_src.once)(function() {
                global.a.on(conf.d.HELLO, {
                    domain: conf.i
                }, function(_ref) {
                    var source = _ref.source, origin = _ref.origin;
                    getHelloPromise(source).resolve({
                        win: source,
                        domain: origin
                    });
                    return {
                        instanceID: global.a.instanceID
                    };
                });
            });
            function sayHello(win) {
                return global.a.send(win, conf.d.HELLO, {
                    instanceID: global.a.instanceID
                }, {
                    domain: conf.i,
                    timeout: -1
                }).then(function(_ref2) {
                    var origin = _ref2.origin, instanceID = _ref2.data.instanceID;
                    getHelloPromise(win).resolve({
                        win: win,
                        domain: origin
                    });
                    return {
                        win: win,
                        domain: origin,
                        instanceID: instanceID
                    };
                });
            }
            var getWindowInstanceID = Object(belter_src.weakMapMemoizePromise)(function(win) {
                return sayHello(win).then(function(_ref3) {
                    return _ref3.instanceID;
                });
            });
            function initHello() {
                listenForHello();
                for (var _i2 = 0, _getAllWindows2 = Object(src.getAllWindows)(), _length2 = null == _getAllWindows2 ? 0 : _getAllWindows2.length; _i2 < _length2; _i2++) {
                    var win = _getAllWindows2[_i2];
                    win !== window && sayHello(win).catch(belter_src.noop);
                }
            }
            function awaitWindowHello(win) {
                var timeout = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 5e3, name = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "Window", promise = getHelloPromise(win);
                -1 !== timeout && (promise = promise.timeout(timeout, new Error(name + " did not load after " + timeout + "ms")));
                return promise;
            }
            function needsGlobalMessagingForBrowser() {
                return !!Object(src.getUserAgent)(window).match(/MSIE|trident|edge\/12|edge\/13/i) || !conf.b.ALLOW_POSTMESSAGE_POPUP;
            }
            var knownWindows = Object(global.c)("knownWindows");
            function markWindowKnown(win) {
                knownWindows.set(win, !0);
            }
            function isWindowKnown(win) {
                return knownWindows.get(win, !1);
            }
            __webpack_require__.d(__webpack_exports__, "g", function() {
                return sayHello;
            });
            __webpack_require__.d(__webpack_exports__, "b", function() {
                return getWindowInstanceID;
            });
            __webpack_require__.d(__webpack_exports__, "c", function() {
                return initHello;
            });
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return awaitWindowHello;
            });
            __webpack_require__.d(__webpack_exports__, "f", function() {
                return needsGlobalMessagingForBrowser;
            });
            __webpack_require__.d(__webpack_exports__, "e", function() {
                return markWindowKnown;
            });
            __webpack_require__.d(__webpack_exports__, "d", function() {
                return isWindowKnown;
            });
        },
        "./node_modules/zalgo-promise/src/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function utils_isPromise(item) {
                try {
                    if (!item) return !1;
                    if ("undefined" != typeof Promise && item instanceof Promise) return !0;
                    if ("undefined" != typeof window && window.Window && item instanceof window.Window) return !1;
                    if ("undefined" != typeof window && window.constructor && item instanceof window.constructor) return !1;
                    var _toString = {}.toString;
                    if (_toString) {
                        var name = _toString.call(item);
                        if ("[object Window]" === name || "[object global]" === name || "[object DOMWindow]" === name) return !1;
                    }
                    if ("function" == typeof item.then) return !0;
                } catch (err) {
                    return !1;
                }
                return !1;
            }
            function getGlobal() {
                var glob = void 0;
                if ("undefined" != typeof window) glob = window; else {
                    if ("undefined" == typeof window) throw new TypeError("Can not find global");
                    glob = window;
                }
                var zalgoGlobal = glob.__zalgopromise__ = glob.__zalgopromise__ || {};
                zalgoGlobal.flushPromises = zalgoGlobal.flushPromises || [];
                zalgoGlobal.activeCount = zalgoGlobal.activeCount || 0;
                zalgoGlobal.possiblyUnhandledPromiseHandlers = zalgoGlobal.possiblyUnhandledPromiseHandlers || [];
                zalgoGlobal.dispatchedErrors = zalgoGlobal.dispatchedErrors || [];
                return zalgoGlobal;
            }
            var promise_ZalgoPromise = function() {
                function ZalgoPromise(handler) {
                    var _this = this;
                    !function(instance, Constructor) {
                        if (!(instance instanceof ZalgoPromise)) throw new TypeError("Cannot call a class as a function");
                    }(this);
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
                ZalgoPromise.prototype.resolve = function(result) {
                    if (this.resolved || this.rejected) return this;
                    if (utils_isPromise(result)) throw new Error("Can not resolve promise with another promise");
                    this.resolved = !0;
                    this.value = result;
                    this.dispatch();
                    return this;
                };
                ZalgoPromise.prototype.reject = function(error) {
                    var _this2 = this;
                    if (this.resolved || this.rejected) return this;
                    if (utils_isPromise(error)) throw new Error("Can not reject promise with another promise");
                    if (!error) {
                        var _err = error && "function" == typeof error.toString ? error.toString() : Object.prototype.toString.call(error);
                        error = new Error("Expected reject to be called with Error, got " + _err);
                    }
                    this.rejected = !0;
                    this.error = error;
                    this.errorHandled || setTimeout(function() {
                        _this2.errorHandled || function(err, promise) {
                            if (-1 === getGlobal().dispatchedErrors.indexOf(err)) {
                                getGlobal().dispatchedErrors.push(err);
                                setTimeout(function() {
                                    throw err;
                                }, 1);
                                for (var j = 0; j < getGlobal().possiblyUnhandledPromiseHandlers.length; j++) getGlobal().possiblyUnhandledPromiseHandlers[j](err, promise);
                            }
                        }(error, _this2);
                    }, 1);
                    this.dispatch();
                    return this;
                };
                ZalgoPromise.prototype.asyncReject = function(error) {
                    this.errorHandled = !0;
                    this.reject(error);
                };
                ZalgoPromise.prototype.dispatch = function() {
                    var _this3 = this, dispatching = this.dispatching, resolved = this.resolved, rejected = this.rejected, handlers = this.handlers;
                    if (!dispatching && (resolved || rejected)) {
                        this.dispatching = !0;
                        getGlobal().activeCount += 1;
                        for (var _loop = function(i) {
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
                            } else utils_isPromise(result) ? result instanceof ZalgoPromise && (result.resolved || result.rejected) ? result.resolved ? promise.resolve(result.value) : promise.reject(result.error) : result.then(function(res) {
                                promise.resolve(res);
                            }, function(err) {
                                promise.reject(err);
                            }) : promise.resolve(result);
                        }, i = 0; i < handlers.length; i++) _loop(i);
                        handlers.length = 0;
                        this.dispatching = !1;
                        getGlobal().activeCount -= 1;
                        0 === getGlobal().activeCount && ZalgoPromise.flushQueue();
                    }
                };
                ZalgoPromise.prototype.then = function(onSuccess, onError) {
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
                };
                ZalgoPromise.prototype.catch = function(onError) {
                    return this.then(void 0, onError);
                };
                ZalgoPromise.prototype.finally = function(onFinally) {
                    if (onFinally && "function" != typeof onFinally && !onFinally.call) throw new Error("Promise.finally expected a function");
                    return this.then(function(result) {
                        return ZalgoPromise.try(onFinally).then(function() {
                            return result;
                        });
                    }, function(err) {
                        return ZalgoPromise.try(onFinally).then(function() {
                            throw err;
                        });
                    });
                };
                ZalgoPromise.prototype.timeout = function(time, err) {
                    var _this4 = this;
                    if (this.resolved || this.rejected) return this;
                    var timeout = setTimeout(function() {
                        _this4.resolved || _this4.rejected || _this4.reject(err || new Error("Promise timed out after " + time + "ms"));
                    }, time);
                    return this.then(function(result) {
                        clearTimeout(timeout);
                        return result;
                    });
                };
                ZalgoPromise.prototype.toPromise = function() {
                    if ("undefined" == typeof Promise) throw new TypeError("Could not find Promise");
                    return Promise.resolve(this);
                };
                ZalgoPromise.resolve = function(value) {
                    return value instanceof ZalgoPromise ? value : utils_isPromise(value) ? new ZalgoPromise(function(resolve, reject) {
                        return value.then(resolve, reject);
                    }) : new ZalgoPromise().resolve(value);
                };
                ZalgoPromise.reject = function(error) {
                    return new ZalgoPromise().reject(error);
                };
                ZalgoPromise.all = function(promises) {
                    var promise = new ZalgoPromise(), count = promises.length, results = [];
                    if (!count) {
                        promise.resolve(results);
                        return promise;
                    }
                    for (var _loop2 = function(i) {
                        var prom = promises[i];
                        if (prom instanceof ZalgoPromise) {
                            if (prom.resolved) {
                                results[i] = prom.value;
                                count -= 1;
                                return "continue";
                            }
                        } else if (!utils_isPromise(prom)) {
                            results[i] = prom;
                            count -= 1;
                            return "continue";
                        }
                        ZalgoPromise.resolve(prom).then(function(result) {
                            results[i] = result;
                            0 == (count -= 1) && promise.resolve(results);
                        }, function(err) {
                            promise.reject(err);
                        });
                    }, i = 0; i < promises.length; i++) _loop2(i);
                    0 === count && promise.resolve(results);
                    return promise;
                };
                ZalgoPromise.hash = function(promises) {
                    var result = {};
                    return ZalgoPromise.all(Object.keys(promises).map(function(key) {
                        return ZalgoPromise.resolve(promises[key]).then(function(value) {
                            result[key] = value;
                        });
                    })).then(function() {
                        return result;
                    });
                };
                ZalgoPromise.map = function(items, method) {
                    return ZalgoPromise.all(items.map(method));
                };
                ZalgoPromise.onPossiblyUnhandledException = function(handler) {
                    return function(handler) {
                        getGlobal().possiblyUnhandledPromiseHandlers.push(handler);
                        return {
                            cancel: function() {
                                getGlobal().possiblyUnhandledPromiseHandlers.splice(getGlobal().possiblyUnhandledPromiseHandlers.indexOf(handler), 1);
                            }
                        };
                    }(handler);
                };
                ZalgoPromise.try = function(method, context, args) {
                    if (method && "function" != typeof method && !method.call) throw new Error("Promise.try expected a function");
                    var result = void 0;
                    try {
                        result = method.apply(context, args || []);
                    } catch (err) {
                        return ZalgoPromise.reject(err);
                    }
                    return ZalgoPromise.resolve(result);
                };
                ZalgoPromise.delay = function(_delay) {
                    return new ZalgoPromise(function(resolve) {
                        setTimeout(resolve, _delay);
                    });
                };
                ZalgoPromise.isPromise = function(value) {
                    return !!(value && value instanceof ZalgoPromise) || utils_isPromise(value);
                };
                ZalgoPromise.flush = function() {
                    var promise = new ZalgoPromise();
                    getGlobal().flushPromises.push(promise);
                    0 === getGlobal().activeCount && ZalgoPromise.flushQueue();
                    return promise;
                };
                ZalgoPromise.flushQueue = function() {
                    var promisesToFlush = getGlobal().flushPromises;
                    getGlobal().flushPromises = [];
                    for (var _i2 = 0, _length2 = null == promisesToFlush ? 0 : promisesToFlush.length; _i2 < _length2; _i2++) promisesToFlush[_i2].resolve();
                };
                return ZalgoPromise;
            }();
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return promise_ZalgoPromise;
            });
        },
        "./src/drivers/angular.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return angular;
            });
            var __WEBPACK_IMPORTED_MODULE_0_belter_src__ = __webpack_require__("./node_modules/belter/src/index.js"), angular = {
                global: function() {
                    return window.angular;
                },
                register: function(component, ng) {
                    return ng.module(component.tag, []).directive(Object(__WEBPACK_IMPORTED_MODULE_0_belter_src__.dasherizeToCamel)(component.tag), function() {
                        for (var scope = {}, _i2 = 0, _component$getPropNam2 = component.getPropNames(), _length2 = null == _component$getPropNam2 ? 0 : _component$getPropNam2.length; _i2 < _length2; _i2++) {
                            var key = _component$getPropNam2[_i2];
                            scope[key] = "=";
                        }
                        component.looseProps && (scope.props = "=");
                        return {
                            scope: scope,
                            restrict: "E",
                            controller: [ "$scope", "$element", function($scope, $element) {
                                if (component.looseProps && !$scope.props) throw new Error("For angular bindings to work, prop definitions must be passed to zoid.create");
                                component.log("instantiate_angular_component");
                                var getProps = function() {
                                    var scopeProps = void 0;
                                    if ($scope.props) scopeProps = $scope.props; else {
                                        scopeProps = {};
                                        for (var _i4 = 0, _Object$keys2 = Object.keys(scope), _length4 = null == _Object$keys2 ? 0 : _Object$keys2.length; _i4 < _length4; _i4++) {
                                            var _key = _Object$keys2[_i4];
                                            void 0 !== $scope[_key] && (scopeProps[_key] = $scope[_key]);
                                        }
                                    }
                                    return Object(__WEBPACK_IMPORTED_MODULE_0_belter_src__.replaceObject)(scopeProps, function(item) {
                                        return "function" == typeof item ? function() {
                                            var result = item.apply(this, arguments);
                                            !function() {
                                                if ("$apply" !== $scope.$root.$$phase && "$digest" !== $scope.$root.$$phase) try {
                                                    $scope.$apply();
                                                } catch (err) {}
                                            }();
                                            return result;
                                        } : item;
                                    });
                                }, parent = component.init(getProps(), null, $element[0]);
                                parent.render($element[0]);
                                $scope.$watch(function() {
                                    parent.updateProps(getProps());
                                });
                            } ]
                        };
                    });
                }
            };
        },
        "./src/drivers/angular2.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return angular2;
            });
            var __WEBPACK_IMPORTED_MODULE_0_belter_src__ = __webpack_require__("./node_modules/belter/src/index.js"), _extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            }, angular2 = {
                global: function() {},
                register: function(zoid, _ref) {
                    var AngularComponent = _ref.Component, NgModule = _ref.NgModule, ElementRef = _ref.ElementRef, NgZone = _ref.NgZone;
                    zoid.log("initializing angular2 component");
                    var getProps = function(component) {
                        return Object(__WEBPACK_IMPORTED_MODULE_0_belter_src__.replaceObject)(_extends({}, component.internalProps, component.props), function(item) {
                            return "function" == typeof item ? function() {
                                var _this = this, _arguments = arguments;
                                return component.zone.run(function() {
                                    return item.apply(_this, _arguments);
                                });
                            } : item;
                        });
                    }, ComponentInstance = AngularComponent({
                        selector: zoid.tag,
                        template: "<div></div>",
                        inputs: [ "props" ]
                    }).Class({
                        constructor: [ ElementRef, NgZone, function(elementRef, zone) {
                            this.elementRef = elementRef;
                            this.zone = zone;
                        } ],
                        ngOnInit: function() {
                            var targetElement = this.elementRef.nativeElement, parent = zoid.init(getProps(this), null, targetElement);
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
        },
        "./src/drivers/ember.js": function(module, exports) {},
        "./src/drivers/glimmer.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return glimmer;
            });
            var _extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            }, glimmer = {
                global: function() {},
                register: function(component, GlimmerComponent) {
                    return function(_GlimmerComponent) {
                        !function(subClass, superClass) {
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
                        }(_class, _GlimmerComponent);
                        function _class() {
                            !function(instance, Constructor) {
                                if (!(instance instanceof _class)) throw new TypeError("Cannot call a class as a function");
                            }(this);
                            return function(self, call) {
                                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                return !call || "object" != typeof call && "function" != typeof call ? self : call;
                            }(this, _GlimmerComponent.apply(this, arguments));
                        }
                        _class.prototype.didInsertElement = function() {
                            component.render(_extends({}, this.args), this.element);
                        };
                        return _class;
                    }(GlimmerComponent);
                }
            };
        },
        "./src/drivers/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__script__ = __webpack_require__("./src/drivers/script.js");
            __webpack_require__.d(__webpack_exports__, "script", function() {
                return __WEBPACK_IMPORTED_MODULE_0__script__.a;
            });
            var __WEBPACK_IMPORTED_MODULE_1__react__ = __webpack_require__("./src/drivers/react.js");
            __webpack_require__.d(__webpack_exports__, "react", function() {
                return __WEBPACK_IMPORTED_MODULE_1__react__.a;
            });
            var __WEBPACK_IMPORTED_MODULE_2__vue__ = __webpack_require__("./src/drivers/vue.js");
            __webpack_require__.d(__webpack_exports__, "vue", function() {
                return __WEBPACK_IMPORTED_MODULE_2__vue__.a;
            });
            var __WEBPACK_IMPORTED_MODULE_3__angular__ = __webpack_require__("./src/drivers/angular.js");
            __webpack_require__.d(__webpack_exports__, "angular", function() {
                return __WEBPACK_IMPORTED_MODULE_3__angular__.a;
            });
            var __WEBPACK_IMPORTED_MODULE_4__ember__ = __webpack_require__("./src/drivers/ember.js");
            __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__ember__);
            __webpack_require__.o(__WEBPACK_IMPORTED_MODULE_4__ember__, "angular2") && __webpack_require__.d(__webpack_exports__, "angular2", function() {
                return __WEBPACK_IMPORTED_MODULE_4__ember__.angular2;
            });
            __webpack_require__.o(__WEBPACK_IMPORTED_MODULE_4__ember__, "glimmer") && __webpack_require__.d(__webpack_exports__, "glimmer", function() {
                return __WEBPACK_IMPORTED_MODULE_4__ember__.glimmer;
            });
            var __WEBPACK_IMPORTED_MODULE_5__glimmer__ = __webpack_require__("./src/drivers/glimmer.js");
            __webpack_require__.d(__webpack_exports__, "glimmer", function() {
                return __WEBPACK_IMPORTED_MODULE_5__glimmer__.a;
            });
            var __WEBPACK_IMPORTED_MODULE_6__angular2__ = __webpack_require__("./src/drivers/angular2.js");
            __webpack_require__.d(__webpack_exports__, "angular2", function() {
                return __WEBPACK_IMPORTED_MODULE_6__angular2__.a;
            });
        },
        "./src/drivers/react.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return react;
            });
            var __WEBPACK_IMPORTED_MODULE_0_belter_src__ = __webpack_require__("./node_modules/belter/src/index.js"), react = {
                global: function() {
                    if (window.React && window.ReactDOM) return {
                        React: window.React,
                        ReactDOM: window.ReactDOM
                    };
                },
                register: function(component, _ref) {
                    var React = _ref.React, ReactDOM = _ref.ReactDOM;
                    React.createClass ? component.react = React.createClass({
                        render: function() {
                            return React.createElement("div", null);
                        },
                        componentDidMount: function() {
                            component.log("instantiate_react_component");
                            var el = ReactDOM.findDOMNode(this), parent = component.init(Object(__WEBPACK_IMPORTED_MODULE_0_belter_src__.extend)({}, this.props), null, el);
                            this.setState({
                                parent: parent
                            });
                            parent.render(el);
                        },
                        componentDidUpdate: function() {
                            this.state && this.state.parent && this.state.parent.updateProps(Object(__WEBPACK_IMPORTED_MODULE_0_belter_src__.extend)({}, this.props));
                        }
                    }) : component.react = function(_React$Component) {
                        !function(subClass, superClass) {
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
                        }(_class, _React$Component);
                        function _class() {
                            !function(instance, Constructor) {
                                if (!(instance instanceof _class)) throw new TypeError("Cannot call a class as a function");
                            }(this);
                            return function(self, call) {
                                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                return !call || "object" != typeof call && "function" != typeof call ? self : call;
                            }(this, _React$Component.apply(this, arguments));
                        }
                        _class.prototype.render = function() {
                            return React.createElement("div", null);
                        };
                        _class.prototype.componentDidMount = function() {
                            component.log("instantiate_react_component");
                            var el = ReactDOM.findDOMNode(this), parent = component.init(Object(__WEBPACK_IMPORTED_MODULE_0_belter_src__.extend)({}, this.props), null, el);
                            this.setState({
                                parent: parent
                            });
                            parent.render(el);
                        };
                        _class.prototype.componentDidUpdate = function() {
                            this.state && this.state.parent && this.state.parent.updateProps(Object(__WEBPACK_IMPORTED_MODULE_0_belter_src__.extend)({}, this.props));
                        };
                        return _class;
                    }(React.Component);
                    return component.react;
                }
            };
        },
        "./src/drivers/script.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return script;
            });
            var script = {
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
                        for (var scriptTags = Array.prototype.slice.call(document.getElementsByTagName("script")), _i2 = 0, _length2 = null == scriptTags ? 0 : scriptTags.length; _i2 < _length2; _i2++) render(scriptTags[_i2]);
                    }
                    scan();
                    document.addEventListener("DOMContentLoaded", scan);
                    window.addEventListener("load", scan);
                    document.addEventListener("DOMNodeInserted", function(event) {
                        render(event.target);
                    });
                }
            };
        },
        "./src/drivers/vue.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return vue;
            });
            var __WEBPACK_IMPORTED_MODULE_0_belter_src__ = __webpack_require__("./node_modules/belter/src/index.js"), vue = {
                global: function() {},
                register: function(component) {
                    return {
                        render: function(createElement) {
                            return createElement("div");
                        },
                        inheritAttrs: !1,
                        mounted: function() {
                            var el = this.$el;
                            this.parent = component.init(Object(__WEBPACK_IMPORTED_MODULE_0_belter_src__.extend)({}, this.$attrs), null, el);
                            this.parent.render(el);
                        },
                        beforeUpdate: function() {
                            this.parent && this.$attrs && this.parent.updateProps(Object(__WEBPACK_IMPORTED_MODULE_0_belter_src__.extend)({}, this.$attrs));
                        }
                    };
                }
            };
        },
        "./src/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            Object.defineProperty(__webpack_exports__, "__esModule", {
                value: !0
            });
            var interface_namespaceObject = {};
            __webpack_require__.d(interface_namespaceObject, "markWindowKnown", function() {
                return lib.e;
            });
            __webpack_require__.d(interface_namespaceObject, "serializeMessage", function() {
                return serializeMessage;
            });
            __webpack_require__.d(interface_namespaceObject, "deserializeMessage", function() {
                return deserializeMessage;
            });
            __webpack_require__.d(interface_namespaceObject, "ProxyWindow", function() {
                return window_ProxyWindow;
            });
            __webpack_require__.d(interface_namespaceObject, "cleanUpWindow", function() {
                return cleanUpWindow;
            });
            __webpack_require__.d(interface_namespaceObject, "Promise", function() {
                return src.a;
            });
            __webpack_require__.d(interface_namespaceObject, "bridge", function() {
                return bridge;
            });
            __webpack_require__.d(interface_namespaceObject, "parent", function() {
                return public_parent;
            });
            __webpack_require__.d(interface_namespaceObject, "send", function() {
                return _send;
            });
            __webpack_require__.d(interface_namespaceObject, "requestPromises", function() {
                return requestPromises;
            });
            __webpack_require__.d(interface_namespaceObject, "request", function() {
                return request;
            });
            __webpack_require__.d(interface_namespaceObject, "sendToParent", function() {
                return sendToParent;
            });
            __webpack_require__.d(interface_namespaceObject, "client", function() {
                return client;
            });
            __webpack_require__.d(interface_namespaceObject, "on", function() {
                return _on;
            });
            __webpack_require__.d(interface_namespaceObject, "listen", function() {
                return listen;
            });
            __webpack_require__.d(interface_namespaceObject, "once", function() {
                return once;
            });
            __webpack_require__.d(interface_namespaceObject, "listener", function() {
                return server_listener;
            });
            __webpack_require__.d(interface_namespaceObject, "CONFIG", function() {
                return conf.b;
            });
            __webpack_require__.d(interface_namespaceObject, "disable", function() {
                return disable;
            });
            var post_robot_src_namespaceObject = {};
            __webpack_require__.d(post_robot_src_namespaceObject, "default", function() {
                return post_robot_src;
            });
            __webpack_require__.d(post_robot_src_namespaceObject, "markWindowKnown", function() {
                return lib.e;
            });
            __webpack_require__.d(post_robot_src_namespaceObject, "serializeMessage", function() {
                return serializeMessage;
            });
            __webpack_require__.d(post_robot_src_namespaceObject, "deserializeMessage", function() {
                return deserializeMessage;
            });
            __webpack_require__.d(post_robot_src_namespaceObject, "ProxyWindow", function() {
                return window_ProxyWindow;
            });
            __webpack_require__.d(post_robot_src_namespaceObject, "cleanUpWindow", function() {
                return cleanUpWindow;
            });
            __webpack_require__.d(post_robot_src_namespaceObject, "Promise", function() {
                return src.a;
            });
            __webpack_require__.d(post_robot_src_namespaceObject, "bridge", function() {
                return bridge;
            });
            __webpack_require__.d(post_robot_src_namespaceObject, "parent", function() {
                return public_parent;
            });
            __webpack_require__.d(post_robot_src_namespaceObject, "send", function() {
                return _send;
            });
            __webpack_require__.d(post_robot_src_namespaceObject, "requestPromises", function() {
                return requestPromises;
            });
            __webpack_require__.d(post_robot_src_namespaceObject, "request", function() {
                return request;
            });
            __webpack_require__.d(post_robot_src_namespaceObject, "sendToParent", function() {
                return sendToParent;
            });
            __webpack_require__.d(post_robot_src_namespaceObject, "client", function() {
                return client;
            });
            __webpack_require__.d(post_robot_src_namespaceObject, "on", function() {
                return _on;
            });
            __webpack_require__.d(post_robot_src_namespaceObject, "listen", function() {
                return listen;
            });
            __webpack_require__.d(post_robot_src_namespaceObject, "once", function() {
                return once;
            });
            __webpack_require__.d(post_robot_src_namespaceObject, "listener", function() {
                return server_listener;
            });
            __webpack_require__.d(post_robot_src_namespaceObject, "CONFIG", function() {
                return conf.b;
            });
            __webpack_require__.d(post_robot_src_namespaceObject, "disable", function() {
                return disable;
            });
            var src_constants_namespaceObject = {};
            __webpack_require__.d(src_constants_namespaceObject, "ZOID", function() {
                return ZOID;
            });
            __webpack_require__.d(src_constants_namespaceObject, "__ZOID__", function() {
                return __ZOID__;
            });
            __webpack_require__.d(src_constants_namespaceObject, "POST_MESSAGE", function() {
                return POST_MESSAGE;
            });
            __webpack_require__.d(src_constants_namespaceObject, "PROP_TYPES", function() {
                return PROP_TYPES;
            });
            __webpack_require__.d(src_constants_namespaceObject, "INITIAL_PROPS", function() {
                return INITIAL_PROPS;
            });
            __webpack_require__.d(src_constants_namespaceObject, "WINDOW_REFERENCES", function() {
                return WINDOW_REFERENCES;
            });
            __webpack_require__.d(src_constants_namespaceObject, "PROP_SERIALIZATION", function() {
                return PROP_SERIALIZATION;
            });
            __webpack_require__.d(src_constants_namespaceObject, "PROP_TYPES_LIST", function() {
                return PROP_TYPES_LIST;
            });
            __webpack_require__.d(src_constants_namespaceObject, "CONTEXT_TYPES", function() {
                return CONTEXT_TYPES;
            });
            __webpack_require__.d(src_constants_namespaceObject, "CLASS_NAMES", function() {
                return CLASS_NAMES;
            });
            __webpack_require__.d(src_constants_namespaceObject, "EVENTS", function() {
                return EVENTS;
            });
            __webpack_require__.d(src_constants_namespaceObject, "ATTRIBUTES", function() {
                return ATTRIBUTES;
            });
            __webpack_require__.d(src_constants_namespaceObject, "ANIMATION_NAMES", function() {
                return ANIMATION_NAMES;
            });
            __webpack_require__.d(src_constants_namespaceObject, "EVENT_NAMES", function() {
                return EVENT_NAMES;
            });
            __webpack_require__.d(src_constants_namespaceObject, "CLOSE_REASONS", function() {
                return CLOSE_REASONS;
            });
            __webpack_require__.d(src_constants_namespaceObject, "CONTEXT_TYPES_LIST", function() {
                return CONTEXT_TYPES_LIST;
            });
            __webpack_require__.d(src_constants_namespaceObject, "DELEGATE", function() {
                return DELEGATE;
            });
            __webpack_require__.d(src_constants_namespaceObject, "WILDCARD", function() {
                return constants_WILDCARD;
            });
            __webpack_require__.d(src_constants_namespaceObject, "DEFAULT_DIMENSIONS", function() {
                return DEFAULT_DIMENSIONS;
            });
            var src_interface_namespaceObject = {};
            __webpack_require__.d(src_interface_namespaceObject, "PopupOpenError", function() {
                return belter_src.PopupOpenError;
            });
            __webpack_require__.d(src_interface_namespaceObject, "create", function() {
                return create;
            });
            __webpack_require__.d(src_interface_namespaceObject, "getByTag", function() {
                return getByTag;
            });
            __webpack_require__.d(src_interface_namespaceObject, "getCurrentScriptDir", function() {
                return getCurrentScriptDir;
            });
            __webpack_require__.d(src_interface_namespaceObject, "useLogger", function() {
                return useLogger;
            });
            __webpack_require__.d(src_interface_namespaceObject, "destroyAll", function() {
                return interface_destroyAll;
            });
            __webpack_require__.d(src_interface_namespaceObject, "postRobot", function() {
                return postRobot;
            });
            __webpack_require__.d(src_interface_namespaceObject, "CONSTANTS", function() {
                return CONSTANTS;
            });
            var _SERIALIZER, src = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), lib = __webpack_require__("./node_modules/post-robot/src/lib/index.js"), cross_domain_utils_src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), belter_src = __webpack_require__("./node_modules/belter/src/index.js"), conf = __webpack_require__("./node_modules/post-robot/src/conf/index.js"), TYPE = {
                FUNCTION: "function",
                ERROR: "error",
                PROMISE: "promise",
                REGEX: "regex",
                DATE: "date",
                ARRAY: "array",
                OBJECT: "object",
                STRING: "string",
                NUMBER: "number",
                BOOLEAN: "boolean",
                NULL: "null",
                UNDEFINED: "undefined"
            }, _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            function isSerializedType(item) {
                return "object" === (void 0 === item ? "undefined" : _typeof(item)) && null !== item && "string" == typeof item.__type__;
            }
            function determineType(val) {
                return void 0 === val ? TYPE.UNDEFINED : null === val ? TYPE.NULL : Array.isArray(val) ? TYPE.ARRAY : "function" == typeof val ? TYPE.FUNCTION : "object" === (void 0 === val ? "undefined" : _typeof(val)) ? val instanceof Error ? TYPE.ERROR : "function" == typeof val.then ? TYPE.PROMISE : "[object RegExp]" === Object.prototype.toString.call(val) ? TYPE.REGEX : "[object Date]" === Object.prototype.toString.call(val) ? TYPE.DATE : TYPE.OBJECT : "string" == typeof val ? TYPE.STRING : "number" == typeof val ? TYPE.NUMBER : "boolean" == typeof val ? TYPE.BOOLEAN : void 0;
            }
            function serializeType(type, val) {
                return {
                    __type__: type,
                    __val__: val
                };
            }
            var _DESERIALIZER, SERIALIZER = ((_SERIALIZER = {})[TYPE.FUNCTION] = function() {}, 
            _SERIALIZER[TYPE.ERROR] = function(_ref) {
                var message = _ref.message, stack = _ref.stack, code = _ref.code;
                return serializeType(TYPE.ERROR, {
                    message: message,
                    stack: stack,
                    code: code
                });
            }, _SERIALIZER[TYPE.PROMISE] = function() {}, _SERIALIZER[TYPE.REGEX] = function(val) {
                return serializeType(TYPE.REGEX, val.source);
            }, _SERIALIZER[TYPE.DATE] = function(val) {
                return serializeType(TYPE.DATE, val.toJSON());
            }, _SERIALIZER[TYPE.ARRAY] = function(val) {
                return val;
            }, _SERIALIZER[TYPE.OBJECT] = function(val) {
                return val;
            }, _SERIALIZER[TYPE.STRING] = function(val) {
                return val;
            }, _SERIALIZER[TYPE.NUMBER] = function(val) {
                return val;
            }, _SERIALIZER[TYPE.BOOLEAN] = function(val) {
                return val;
            }, _SERIALIZER[TYPE.NULL] = function(val) {
                return val;
            }, _SERIALIZER), defaultSerializers = {}, DESERIALIZER = ((_DESERIALIZER = {})[TYPE.FUNCTION] = function() {
                throw new Error("Function serialization is not implemented; nothing to deserialize");
            }, _DESERIALIZER[TYPE.ERROR] = function(_ref2) {
                var message = _ref2.message, stack = _ref2.stack, code = _ref2.code, error = new Error(message);
                error.code = code;
                error.stack = stack + "\n\n" + error.stack;
                return error;
            }, _DESERIALIZER[TYPE.PROMISE] = function() {
                throw new Error("Promise serialization is not implemented; nothing to deserialize");
            }, _DESERIALIZER[TYPE.REGEX] = function(val) {
                return new RegExp(val);
            }, _DESERIALIZER[TYPE.DATE] = function(val) {
                return new Date(val);
            }, _DESERIALIZER[TYPE.ARRAY] = function(val) {
                return val;
            }, _DESERIALIZER[TYPE.OBJECT] = function(val) {
                return val;
            }, _DESERIALIZER[TYPE.STRING] = function(val) {
                return val;
            }, _DESERIALIZER[TYPE.NUMBER] = function(val) {
                return val;
            }, _DESERIALIZER[TYPE.BOOLEAN] = function(val) {
                return val;
            }, _DESERIALIZER[TYPE.NULL] = function(val) {
                return val;
            }, _DESERIALIZER), defaultDeserializers = {}, src_global = __webpack_require__("./node_modules/post-robot/src/global.js"), winToProxyWindow = Object(src_global.c)("winToProxyWindow"), idToProxyWindow = Object(src_global.b)("idToProxyWindow");
            function cleanupProxyWindows() {
                for (var _i2 = 0, _idToProxyWindow$keys2 = idToProxyWindow.keys(), _length2 = null == _idToProxyWindow$keys2 ? 0 : _idToProxyWindow$keys2.length; _i2 < _length2; _i2++) {
                    var _id = _idToProxyWindow$keys2[_i2];
                    idToProxyWindow.get(_id).shouldClean() && idToProxyWindow.del(_id);
                }
            }
            var window_ProxyWindow = function() {
                function ProxyWindow(serializedWindow, actualWindow) {
                    !function(instance, Constructor) {
                        if (!(instance instanceof ProxyWindow)) throw new TypeError("Cannot call a class as a function");
                    }(this);
                    this.serializedWindow = serializedWindow;
                    this.actualWindowPromise = new src.a();
                    actualWindow && this.setWindow(actualWindow);
                    this.serializedWindow.getInstanceID = Object(belter_src.memoizePromise)(this.serializedWindow.getInstanceID);
                }
                ProxyWindow.prototype.setLocation = function(href) {
                    var _this = this;
                    return src.a.try(function() {
                        if (!_this.actualWindow) return _this.serializedWindow.setLocation(href);
                        _this.actualWindow.location = href;
                    }).then(function() {
                        return _this;
                    });
                };
                ProxyWindow.prototype.setName = function(name) {
                    var _this2 = this;
                    return src.a.try(function() {
                        if (!_this2.actualWindow) return _this2.serializedWindow.setName(name);
                        if (!Object(cross_domain_utils_src.isSameDomain)(_this2.actualWindow)) throw new Error("Can not set name for window on different domain");
                        _this2.actualWindow.name = name;
                        _this2.actualWindow.frameElement && _this2.actualWindow.frameElement.setAttribute("name", name);
                    }).then(function() {
                        return _this2;
                    });
                };
                ProxyWindow.prototype.close = function() {
                    var _this3 = this;
                    return src.a.try(function() {
                        if (!_this3.actualWindow) return _this3.serializedWindow.close();
                        _this3.actualWindow.close();
                    }).then(function() {
                        return _this3;
                    });
                };
                ProxyWindow.prototype.focus = function() {
                    var _this4 = this;
                    return src.a.try(function() {
                        if (!_this4.actualWindow) return _this4.serializedWindow.focus();
                        _this4.actualWindow.focus();
                    }).then(function() {
                        return _this4;
                    });
                };
                ProxyWindow.prototype.isClosed = function() {
                    var _this5 = this;
                    return src.a.try(function() {
                        return _this5.actualWindow ? Object(cross_domain_utils_src.isWindowClosed)(_this5.actualWindow) : _this5.serializedWindow.isClosed();
                    });
                };
                ProxyWindow.prototype.setWindow = function(win) {
                    this.actualWindow = win;
                    this.actualWindowPromise.resolve(win);
                };
                ProxyWindow.prototype.matchWindow = function(win) {
                    var _this6 = this;
                    return src.a.try(function() {
                        return _this6.actualWindow ? win === _this6.actualWindow : src.a.all([ _this6.getInstanceID(), Object(lib.b)(win) ]).then(function(_ref) {
                            var match = _ref[0] === _ref[1];
                            match && _this6.setWindow(win);
                            return match;
                        });
                    });
                };
                ProxyWindow.prototype.unwrap = function() {
                    return this.actualWindow || this;
                };
                ProxyWindow.prototype.awaitWindow = function() {
                    return this.actualWindowPromise;
                };
                ProxyWindow.prototype.getInstanceID = function() {
                    return this.actualWindow ? Object(lib.b)(this.actualWindow) : this.serializedWindow.getInstanceID();
                };
                ProxyWindow.prototype.serialize = function() {
                    return this.serializedWindow;
                };
                ProxyWindow.prototype.shouldClean = function() {
                    return this.actualWindow && Object(cross_domain_utils_src.isWindowClosed)(this.actualWindow);
                };
                ProxyWindow.unwrap = function(win) {
                    return ProxyWindow.isProxyWindow(win) ? win.unwrap() : win;
                };
                ProxyWindow.serialize = function(win) {
                    cleanupProxyWindows();
                    return ProxyWindow.toProxyWindow(win).serialize();
                };
                ProxyWindow.deserialize = function(serializedWindow) {
                    cleanupProxyWindows();
                    return idToProxyWindow.getOrSet(serializedWindow.id, function() {
                        return new ProxyWindow(serializedWindow);
                    });
                };
                ProxyWindow.isProxyWindow = function(obj) {
                    return obj instanceof ProxyWindow;
                };
                ProxyWindow.toProxyWindow = function(win) {
                    cleanupProxyWindows();
                    return ProxyWindow.isProxyWindow(win) ? win : winToProxyWindow.getOrSet(win, function() {
                        var id = Object(belter_src.uniqueID)();
                        return idToProxyWindow.set(id, new ProxyWindow({
                            id: id,
                            getInstanceID: function() {
                                return Object(lib.b)(win);
                            },
                            close: function() {
                                return src.a.try(function() {
                                    win.close();
                                });
                            },
                            focus: function() {
                                return src.a.try(function() {
                                    win.focus();
                                });
                            },
                            isClosed: function() {
                                return src.a.try(function() {
                                    return Object(cross_domain_utils_src.isWindowClosed)(win);
                                });
                            },
                            setLocation: function(href) {
                                return src.a.try(function() {
                                    if (Object(cross_domain_utils_src.isSameDomain)(win)) try {
                                        if (win.location && "function" == typeof win.location.replace) {
                                            win.location.replace(href);
                                            return;
                                        }
                                    } catch (err) {}
                                    win.location = href;
                                });
                            },
                            setName: function(name) {
                                return src.a.try(function() {
                                    win.name = name;
                                });
                            }
                        }, win));
                    });
                };
                return ProxyWindow;
            }(), methodStore = Object(src_global.c)("methodStore"), proxyWindowMethods = Object(src_global.b)("proxyWindowMethods");
            src_global.a.listeningForFunctions = src_global.a.listeningForFunctions || !1;
            var listenForFunctionCalls = Object(belter_src.once)(function() {
                if (!src_global.a.listeningForFunctions) {
                    src_global.a.listeningForFunctions = !0;
                    src_global.a.on(conf.d.METHOD, {
                        origin: conf.i
                    }, function(_ref) {
                        var source = _ref.source, origin = _ref.origin, data = _ref.data, id = data.id, name = data.name;
                        return src.a.try(function() {
                            var meth = methodStore.get(source, function() {
                                return {};
                            })[data.id] || proxyWindowMethods.get(id);
                            if (!meth) throw new Error("Could not find method with id: " + data.id);
                            var proxy = meth.proxy, domain = meth.domain, val = meth.val;
                            if (!Object(cross_domain_utils_src.matchDomain)(domain, origin)) throw new Error("Method domain " + JSON.stringify(meth.domain) + " does not match origin " + origin);
                            return proxy ? proxy.matchWindow(source).then(function(match) {
                                if (!match) throw new Error("Proxy window does not match source");
                                return val;
                            }) : val;
                        }).then(function(method) {
                            return method.apply({
                                source: source,
                                origin: origin,
                                data: data
                            }, data.args);
                        }).then(function(result) {
                            return {
                                result: result,
                                id: id,
                                name: name
                            };
                        });
                    });
                }
            });
            function function_serializeFunction(destination, domain, val, key) {
                listenForFunctionCalls();
                var id = Object(belter_src.uniqueID)();
                destination = window_ProxyWindow.unwrap(destination);
                if (window_ProxyWindow.isProxyWindow(destination)) {
                    proxyWindowMethods.set(id, {
                        proxy: destination,
                        domain: domain,
                        val: val
                    });
                    destination.awaitWindow().then(function(win) {
                        proxyWindowMethods.del(id);
                        methodStore.getOrSet(win, function() {
                            return {};
                        })[id] = {
                            domain: domain,
                            val: val
                        };
                    });
                } else methodStore.getOrSet(destination, function() {
                    return {};
                })[id] = {
                    domain: domain,
                    val: val
                };
                return serializeType(conf.h.CROSS_DOMAIN_FUNCTION, {
                    id: id,
                    name: val.name || key
                });
            }
            function serializeMessage(destination, domain, obj) {
                var _serialize;
                return function(obj) {
                    var serializers = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : defaultSerializers, result = JSON.stringify(obj, function(key) {
                        var val = this[key];
                        if (isSerializedType(this)) return val;
                        var type = determineType(val);
                        if (!type) return val;
                        var serializer = serializers[type] || SERIALIZER[type];
                        return serializer ? serializer(val, key) : val;
                    });
                    return void 0 === result ? TYPE.UNDEFINED : result;
                }(obj, ((_serialize = {})[TYPE.PROMISE] = function(val, key) {
                    return function(destination, domain, val, key) {
                        return serializeType(conf.h.CROSS_DOMAIN_ZALGO_PROMISE, {
                            then: function_serializeFunction(destination, domain, function(resolve, reject) {
                                return val.then(resolve, reject);
                            }, key)
                        });
                    }(destination, domain, val, key);
                }, _serialize[TYPE.FUNCTION] = function(val, key) {
                    return function_serializeFunction(destination, domain, val, key);
                }, _serialize[TYPE.OBJECT] = function(val) {
                    return Object(cross_domain_utils_src.isWindow)(val) || window_ProxyWindow.isProxyWindow(val) ? (win = val, 
                    serializeType(conf.h.CROSS_DOMAIN_WINDOW, window_ProxyWindow.serialize(win))) : val;
                    var win;
                }, _serialize));
            }
            function deserializeMessage(source, origin, message) {
                var _deserialize;
                return function(str) {
                    var deserializers = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : defaultDeserializers;
                    if (str !== TYPE.UNDEFINED) return JSON.parse(str, function(key, val) {
                        if (isSerializedType(this)) return val;
                        var type = void 0, value = void 0;
                        if (isSerializedType(val)) {
                            type = val.__type__;
                            value = val.__val__;
                        } else {
                            type = determineType(val);
                            value = val;
                        }
                        if (!type) return value;
                        var deserializer = deserializers[type] || DESERIALIZER[type];
                        return deserializer ? deserializer(value, key) : value;
                    });
                }(message, ((_deserialize = {})[conf.h.CROSS_DOMAIN_ZALGO_PROMISE] = function(serializedPromise) {
                    return then = serializedPromise.then, new src.a(then);
                    var then;
                }, _deserialize[conf.h.CROSS_DOMAIN_FUNCTION] = function(serializedFunction) {
                    return function(source, origin, _ref2) {
                        var id = _ref2.id, name = _ref2.name;
                        function crossDomainFunctionWrapper() {
                            var args = Array.prototype.slice.call(arguments);
                            return src_global.a.send(source, conf.d.METHOD, {
                                id: id,
                                name: name,
                                args: args
                            }, {
                                domain: origin
                            }).then(function(_ref3) {
                                return _ref3.data.result;
                            });
                        }
                        crossDomainFunctionWrapper.fireAndForget = function() {
                            var args = Array.prototype.slice.call(arguments);
                            return src_global.a.send(source, conf.d.METHOD, {
                                id: id,
                                name: name,
                                args: args
                            }, {
                                domain: origin,
                                fireAndForget: !0
                            });
                        };
                        crossDomainFunctionWrapper.__name__ = name;
                        crossDomainFunctionWrapper.__xdomain__ = !0;
                        crossDomainFunctionWrapper.source = source;
                        crossDomainFunctionWrapper.origin = origin;
                        return crossDomainFunctionWrapper;
                    }(source, origin, serializedFunction);
                }, _deserialize[conf.h.CROSS_DOMAIN_WINDOW] = function(serializedWindow) {
                    return win = serializedWindow, window_ProxyWindow.deserialize(win);
                    var win;
                }, _deserialize));
            }
            var SEND_MESSAGE_STRATEGIES = {};
            SEND_MESSAGE_STRATEGIES[conf.g.POST_MESSAGE] = function(win, serializedMessage, domain) {
                try {
                    __webpack_require__("./node_modules/post-robot/src/compat/index.js").emulateIERestrictions(window, win);
                } catch (err) {
                    return;
                }
                (Array.isArray(domain) ? domain : "string" == typeof domain ? [ domain ] : [ conf.i ]).map(function(dom) {
                    if (0 === dom.indexOf(conf.f.MOCK)) {
                        if (window.location.protocol === conf.f.FILE) return conf.i;
                        if (!Object(cross_domain_utils_src.isActuallySameDomain)(win)) throw new Error("Attempting to send messsage to mock domain " + dom + ", but window is actually cross-domain");
                        return Object(cross_domain_utils_src.getActualDomain)(win);
                    }
                    return 0 === dom.indexOf(conf.f.FILE) ? conf.i : dom;
                }).forEach(function(dom) {
                    return win.postMessage(serializedMessage, dom);
                });
            };
            var _require = __webpack_require__("./node_modules/post-robot/src/bridge/index.js"), sendBridgeMessage = _require.sendBridgeMessage, needsBridgeForBrowser = _require.needsBridgeForBrowser, isBridge = _require.isBridge;
            SEND_MESSAGE_STRATEGIES[conf.g.BRIDGE] = function(win, serializedMessage, domain) {
                if (needsBridgeForBrowser() || isBridge()) {
                    if (Object(cross_domain_utils_src.isSameDomain)(win)) throw new Error("Post message through bridge disabled between same domain windows");
                    if (!1 !== Object(cross_domain_utils_src.isSameTopWindow)(window, win)) throw new Error("Can only use bridge to communicate between two different windows, not between frames");
                    return sendBridgeMessage(win, domain, serializedMessage);
                }
            };
            SEND_MESSAGE_STRATEGIES[conf.g.GLOBAL] = function(win, serializedMessage) {
                if (Object(lib.f)()) {
                    if (!Object(cross_domain_utils_src.isSameDomain)(win)) throw new Error("Post message through global disabled between different domain windows");
                    if (!1 !== Object(cross_domain_utils_src.isSameTopWindow)(window, win)) throw new Error("Can only use global to communicate between two different windows, not between frames");
                    var foreignGlobal = win[conf.j.POSTROBOT];
                    if (!foreignGlobal) throw new Error("Can not find postRobot global on foreign window");
                    return foreignGlobal.receiveMessage({
                        source: window,
                        origin: Object(cross_domain_utils_src.getDomain)(),
                        data: serializedMessage
                    });
                }
            };
            var _extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            };
            function sendMessage(win, domain, message) {
                return src.a.try(function() {
                    var _serializeMessage;
                    if (Object(cross_domain_utils_src.isWindowClosed)(win)) throw new Error("Window is closed");
                    var serializedMessage = serializeMessage(win, domain, ((_serializeMessage = {})[conf.j.POSTROBOT] = _extends({
                        id: Object(belter_src.uniqueID)()
                    }, message), _serializeMessage)), messages = [];
                    return src.a.map(Object.keys(SEND_MESSAGE_STRATEGIES), function(strategyName) {
                        return src.a.try(function() {
                            if (!conf.b.ALLOWED_POST_MESSAGE_METHODS[strategyName]) throw new Error("Strategy disallowed: " + strategyName);
                            return SEND_MESSAGE_STRATEGIES[strategyName](win, serializedMessage, domain);
                        }).then(function() {
                            messages.push(strategyName + ": success");
                            return !0;
                        }, function(err) {
                            messages.push(strategyName + ": " + Object(belter_src.stringifyError)(err) + "\n");
                            return !1;
                        });
                    }).then(function(results) {
                        var success = results.some(Boolean), status = message.type + " " + message.name + " " + (success ? "success" : "error") + ":\n  - " + messages.join("\n  - ") + "\n";
                        if (!success) throw new Error(status);
                    });
                });
            }
            var responseListeners = Object(src_global.b)("responseListeners"), requestListeners = Object(src_global.c)("requestListeners"), erroredResponseListeners = Object(src_global.b)("erroredResponseListeners");
            src_global.a.WINDOW_WILDCARD = src_global.a.WINDOW_WILDCARD || new function() {}();
            var _RECEIVE_MESSAGE_TYPE, __DOMAIN_REGEX__ = "__domain_regex__";
            function getResponseListener(hash) {
                return responseListeners.get(hash);
            }
            function deleteResponseListener(hash) {
                responseListeners.del(hash);
            }
            function isResponseListenerErrored(hash) {
                return erroredResponseListeners.has(hash);
            }
            function getRequestListener(_ref) {
                var name = _ref.name, win = _ref.win, domain = _ref.domain;
                win === conf.i && (win = null);
                domain === conf.i && (domain = null);
                if (!name) throw new Error("Name required to get request listener");
                for (var _i2 = 0, _ref3 = [ win, src_global.a.WINDOW_WILDCARD ], _length2 = null == _ref3 ? 0 : _ref3.length; _i2 < _length2; _i2++) {
                    var winQualifier = _ref3[_i2];
                    if (winQualifier) {
                        var nameListeners = requestListeners.get(winQualifier);
                        if (nameListeners) {
                            var domainListeners = nameListeners[name];
                            if (domainListeners) {
                                if (domain && "string" == typeof domain) {
                                    if (domainListeners[domain]) return domainListeners[domain];
                                    if (domainListeners[__DOMAIN_REGEX__]) for (var _i4 = 0, _domainListeners$__DO2 = domainListeners[__DOMAIN_REGEX__], _length4 = null == _domainListeners$__DO2 ? 0 : _domainListeners$__DO2.length; _i4 < _length4; _i4++) {
                                        var _ref5 = _domainListeners$__DO2[_i4], regex = _ref5.regex, listener = _ref5.listener;
                                        if (Object(cross_domain_utils_src.matchDomain)(regex, domain)) return listener;
                                    }
                                }
                                if (domainListeners[conf.i]) return domainListeners[conf.i];
                            }
                        }
                    }
                }
            }
            var types__extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            }, RECEIVE_MESSAGE_TYPES = ((_RECEIVE_MESSAGE_TYPE = {})[conf.e.REQUEST] = function(source, origin, message) {
                var options = getRequestListener({
                    name: message.name,
                    win: source,
                    domain: origin
                });
                function sendResponse(type) {
                    var data = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    return message.fireAndForget || Object(cross_domain_utils_src.isWindowClosed)(source) ? src.a.resolve() : sendMessage(source, origin, types__extends({
                        type: type,
                        hash: message.hash,
                        name: message.name
                    }, data));
                }
                return src.a.all([ sendResponse(conf.e.ACK), src.a.try(function() {
                    if (!options) throw new Error("No handler found for post message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                    if (!Object(cross_domain_utils_src.matchDomain)(options.domain, origin)) throw new Error("Request origin " + origin + " does not match domain " + options.domain.toString());
                    var data = message.data;
                    return options.handler({
                        source: source,
                        origin: origin,
                        data: data
                    });
                }).then(function(data) {
                    return sendResponse(conf.e.RESPONSE, {
                        ack: conf.c.SUCCESS,
                        data: data
                    });
                }, function(error) {
                    return sendResponse(conf.e.RESPONSE, {
                        ack: conf.c.ERROR,
                        error: error
                    });
                }) ]).then(belter_src.noop).catch(function(err) {
                    if (options && options.handleError) return options.handleError(err);
                    throw err;
                });
            }, _RECEIVE_MESSAGE_TYPE[conf.e.ACK] = function(source, origin, message) {
                if (!isResponseListenerErrored(message.hash)) {
                    var options = getResponseListener(message.hash);
                    if (!options) throw new Error("No handler found for post message ack for message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                    if (!Object(cross_domain_utils_src.matchDomain)(options.domain, origin)) throw new Error("Ack origin " + origin + " does not match domain " + options.domain.toString());
                    options.ack = !0;
                }
            }, _RECEIVE_MESSAGE_TYPE[conf.e.RESPONSE] = function(source, origin, message) {
                if (!isResponseListenerErrored(message.hash)) {
                    var options = getResponseListener(message.hash);
                    if (!options) throw new Error("No handler found for post message response for message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                    if (!Object(cross_domain_utils_src.matchDomain)(options.domain, origin)) throw new Error("Response origin " + origin + " does not match domain " + Object(cross_domain_utils_src.stringifyDomainPattern)(options.domain));
                    deleteResponseListener(message.hash);
                    if (message.ack === conf.c.ERROR) return options.respond(message.error, null);
                    if (message.ack === conf.c.SUCCESS) {
                        var data = message.data;
                        return options.respond(null, {
                            source: source,
                            origin: origin,
                            data: data
                        });
                    }
                }
            }, _RECEIVE_MESSAGE_TYPE), receive__typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            }, receivedMessages = Object(src_global.b)("receivedMessages");
            function receiveMessage(event) {
                if (!window || window.closed) throw new Error("Message recieved in closed window");
                try {
                    if (!event.source) return;
                } catch (err) {
                    return;
                }
                var source = event.source, origin = event.origin, message = function(message, source, origin) {
                    var parsedMessage = void 0;
                    try {
                        parsedMessage = deserializeMessage(source, origin, message);
                    } catch (err) {
                        return;
                    }
                    if (parsedMessage && "object" === (void 0 === parsedMessage ? "undefined" : receive__typeof(parsedMessage)) && null !== parsedMessage && (parsedMessage = parsedMessage[conf.j.POSTROBOT]) && "object" === (void 0 === parsedMessage ? "undefined" : receive__typeof(parsedMessage)) && null !== parsedMessage && parsedMessage.type && "string" == typeof parsedMessage.type && RECEIVE_MESSAGE_TYPES[parsedMessage.type]) return parsedMessage;
                }(event.data, source, origin);
                if (message) {
                    Object(lib.e)(source);
                    if (!receivedMessages.has(message.id)) {
                        receivedMessages.set(message.id, !0);
                        Object(cross_domain_utils_src.isWindowClosed)(source) && !message.fireAndForget || RECEIVE_MESSAGE_TYPES[message.type](source, origin, message);
                    }
                }
            }
            function messageListener(event) {
                try {
                    Object(belter_src.noop)(event.source);
                } catch (err) {
                    return;
                }
                var messageEvent = {
                    source: event.source || event.sourceElement,
                    origin: event.origin || event.originalEvent && event.originalEvent.origin,
                    data: event.data
                };
                try {
                    __webpack_require__("./node_modules/post-robot/src/compat/index.js").emulateIERestrictions(messageEvent.source, window);
                } catch (err) {
                    return;
                }
                receiveMessage(messageEvent);
            }
            src_global.a.receiveMessage = receiveMessage;
            var requestPromises = Object(src_global.c)("requestPromises");
            function request(options) {
                return src.a.try(function() {
                    if (!options.name) throw new Error("Expected options.name");
                    var name = options.name, targetWindow = void 0, domain = void 0;
                    if ("string" == typeof options.window) {
                        var el = document.getElementById(options.window);
                        if (!el) throw new Error("Expected options.window " + Object.prototype.toString.call(options.window) + " to be a valid element id");
                        if ("iframe" !== el.tagName.toLowerCase()) throw new Error("Expected options.window " + Object.prototype.toString.call(options.window) + " to be an iframe");
                        if (!el.contentWindow) throw new Error("Iframe must have contentWindow.  Make sure it has a src attribute and is in the DOM.");
                        targetWindow = el.contentWindow;
                    } else if (options.window instanceof HTMLIFrameElement) {
                        if ("iframe" !== options.window.tagName.toLowerCase()) throw new Error("Expected options.window " + Object.prototype.toString.call(options.window) + " to be an iframe");
                        if (options.window && !options.window.contentWindow) throw new Error("Iframe must have contentWindow.  Make sure it has a src attribute and is in the DOM.");
                        options.window && options.window.contentWindow && (targetWindow = options.window.contentWindow);
                    } else targetWindow = options.window;
                    if (!targetWindow) throw new Error("Expected options.window to be a window object, iframe, or iframe element id.");
                    var win = targetWindow;
                    domain = options.domain || conf.i;
                    var hash = options.name + "_" + Object(belter_src.uniqueID)();
                    if (Object(cross_domain_utils_src.isWindowClosed)(win)) throw new Error("Target window is closed");
                    var hasResult = !1, reqPromises = requestPromises.getOrSet(win, function() {
                        return [];
                    }), requestPromise = src.a.try(function() {
                        if (Object(cross_domain_utils_src.isAncestor)(window, win)) return Object(lib.a)(win, options.timeout || conf.b.CHILD_WINDOW_TIMEOUT);
                    }).then(function() {
                        var origin = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).domain;
                        if (Object(belter_src.isRegex)(domain) && !origin) return Object(lib.g)(win);
                    }).then(function() {
                        var origin = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).domain;
                        if (Object(belter_src.isRegex)(domain)) {
                            if (!Object(cross_domain_utils_src.matchDomain)(domain, origin)) throw new Error("Remote window domain " + origin + " does not match regex: " + domain.toString());
                            domain = origin;
                        }
                        if ("string" != typeof domain && !Array.isArray(domain)) throw new TypeError("Expected domain to be a string or array");
                        var actualDomain = domain;
                        return new src.a(function(resolve, reject) {
                            var responseListener = void 0;
                            options.fireAndForget || function(hash, listener) {
                                responseListeners.set(hash, listener);
                            }(hash, responseListener = {
                                name: name,
                                window: win,
                                domain: actualDomain,
                                respond: function(err, result) {
                                    if (!err) {
                                        hasResult = !0;
                                        reqPromises.splice(reqPromises.indexOf(requestPromise, 1));
                                    }
                                    err ? reject(err) : resolve(result);
                                }
                            });
                            sendMessage(win, actualDomain, {
                                type: conf.e.REQUEST,
                                hash: hash,
                                name: name,
                                data: options.data,
                                fireAndForget: Boolean(options.fireAndForget)
                            }).catch(reject);
                            if (options.fireAndForget) return resolve();
                            var totalAckTimeout = Object(lib.d)(win) ? conf.b.ACK_TIMEOUT_KNOWN : conf.b.ACK_TIMEOUT, totalResTimeout = options.timeout || conf.b.RES_TIMEOUT, ackTimeout = totalAckTimeout, resTimeout = totalResTimeout, cycleTime = 100;
                            setTimeout(function cycle() {
                                if (!hasResult) {
                                    if (Object(cross_domain_utils_src.isWindowClosed)(win)) return responseListener.ack ? reject(new Error("Window closed for " + name + " before response")) : reject(new Error("Window closed for " + name + " before ack"));
                                    ackTimeout = Math.max(ackTimeout - cycleTime, 0);
                                    -1 !== resTimeout && (resTimeout = Math.max(resTimeout - cycleTime, 0));
                                    if (responseListener.ack) {
                                        if (-1 === resTimeout) return;
                                        cycleTime = Math.min(resTimeout, 2e3);
                                    } else {
                                        if (0 === ackTimeout) return reject(new Error("No ack for postMessage " + name + " in " + Object(cross_domain_utils_src.getDomain)() + " in " + totalAckTimeout + "ms"));
                                        if (0 === resTimeout) return reject(new Error("No response for postMessage " + name + " in " + Object(cross_domain_utils_src.getDomain)() + " in " + totalResTimeout + "ms"));
                                    }
                                    setTimeout(cycle, cycleTime);
                                }
                            }, cycleTime);
                        });
                    });
                    requestPromise.catch(function() {
                        !function(hash) {
                            erroredResponseListeners.set(hash, !0);
                        }(hash);
                        deleteResponseListener(hash);
                    });
                    reqPromises.push(requestPromise);
                    return requestPromise;
                });
            }
            function _send(window, name, data, options) {
                (options = options || {}).window = window;
                options.name = name;
                options.data = data;
                return request(options);
            }
            function sendToParent(name, data, options) {
                var win = Object(cross_domain_utils_src.getAncestor)();
                return win ? _send(win, name, data, options) : new src.a(function(resolve, reject) {
                    return reject(new Error("Window does not have a parent"));
                });
            }
            function client() {
                var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                if (!options.window) throw new Error("Expected options.window");
                var win = options.window;
                return {
                    send: function(name, data) {
                        return _send(win, name, data, options);
                    }
                };
            }
            src_global.a.send = _send;
            var server__typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            function listen(options) {
                if (!options.name) throw new Error("Expected options.name");
                if (!options.handler) throw new Error("Expected options.handler");
                var name = options.name, win = options.window, domain = options.domain, listenerOptions = {
                    handler: options.handler,
                    handleError: options.errorHandler || function(err) {
                        throw err;
                    },
                    window: win,
                    domain: domain || conf.i,
                    name: name
                }, requestListener = function addRequestListener(_ref6, listener) {
                    var name = _ref6.name, win = _ref6.win, domain = _ref6.domain;
                    if (!name || "string" != typeof name) throw new Error("Name required to add request listener");
                    if (Array.isArray(win)) {
                        for (var listenersCollection = [], _i6 = 0, _win2 = win, _length6 = null == _win2 ? 0 : _win2.length; _i6 < _length6; _i6++) {
                            var item = _win2[_i6];
                            listenersCollection.push(addRequestListener({
                                name: name,
                                domain: domain,
                                win: item
                            }, listener));
                        }
                        return {
                            cancel: function() {
                                for (var _i8 = 0, _length8 = null == listenersCollection ? 0 : listenersCollection.length; _i8 < _length8; _i8++) listenersCollection[_i8].cancel();
                            }
                        };
                    }
                    if (Array.isArray(domain)) {
                        for (var _listenersCollection = [], _i10 = 0, _domain2 = domain, _length10 = null == _domain2 ? 0 : _domain2.length; _i10 < _length10; _i10++) {
                            var _item = _domain2[_i10];
                            _listenersCollection.push(addRequestListener({
                                name: name,
                                win: win,
                                domain: _item
                            }, listener));
                        }
                        return {
                            cancel: function() {
                                for (var _i12 = 0, _length12 = null == _listenersCollection ? 0 : _listenersCollection.length; _i12 < _length12; _i12++) _listenersCollection[_i12].cancel();
                            }
                        };
                    }
                    var existingListener = getRequestListener({
                        name: name,
                        win: win,
                        domain: domain
                    });
                    win && win !== conf.i || (win = src_global.a.WINDOW_WILDCARD);
                    domain = domain || conf.i;
                    if (existingListener) throw win && domain ? new Error("Request listener already exists for " + name + " on domain " + domain.toString() + " for " + (win === src_global.a.WINDOW_WILDCARD ? "wildcard" : "specified") + " window") : win ? new Error("Request listener already exists for " + name + " for " + (win === src_global.a.WINDOW_WILDCARD ? "wildcard" : "specified") + " window") : domain ? new Error("Request listener already exists for " + name + " on domain " + domain.toString()) : new Error("Request listener already exists for " + name);
                    var nameListeners = requestListeners.getOrSet(win, function() {
                        return {};
                    }), domainListeners = Object(belter_src.getOrSet)(nameListeners, name, function() {
                        return {};
                    }), strDomain = domain.toString(), regexListeners = void 0, regexListener = void 0;
                    if (Object(belter_src.isRegex)(domain)) {
                        regexListeners = Object(belter_src.getOrSet)(domainListeners, __DOMAIN_REGEX__, function() {
                            return [];
                        });
                        regexListener = {
                            regex: domain,
                            listener: listener
                        };
                        regexListeners.push(regexListener);
                    } else domainListeners[strDomain] = listener;
                    return {
                        cancel: function() {
                            delete domainListeners[strDomain];
                            if (regexListener) {
                                regexListeners.splice(regexListeners.indexOf(regexListener, 1));
                                regexListeners.length || delete domainListeners[__DOMAIN_REGEX__];
                            }
                            Object.keys(domainListeners).length || delete nameListeners[name];
                            win && !Object.keys(nameListeners).length && requestListeners.del(win);
                        }
                    };
                }({
                    name: name,
                    win: win,
                    domain: domain
                }, listenerOptions);
                if (options.once) {
                    var _handler = listenerOptions.handler;
                    listenerOptions.handler = Object(belter_src.once)(function() {
                        requestListener.cancel();
                        return _handler.apply(this, arguments);
                    });
                }
                if (listenerOptions.window && options.errorOnClose) var interval = Object(belter_src.safeInterval)(function() {
                    if (win && "object" === (void 0 === win ? "undefined" : server__typeof(win)) && Object(cross_domain_utils_src.isWindowClosed)(win)) {
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
                (options = options || {}).name = name;
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
                var errorHandler = options.errorHandler, promise = new src.a(function(resolve, reject) {
                    (options = options || {}).name = name;
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
            function server_listener() {
                var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return {
                    on: function(name, handler) {
                        return _on(name, options, handler);
                    }
                };
            }
            src_global.a.on = _on;
            function disable() {
                delete window[conf.j.POSTROBOT];
                window.removeEventListener("message", messageListener);
            }
            var public_parent = Object(cross_domain_utils_src.getAncestor)();
            function cleanUpWindow(win) {
                for (var _i2 = 0, _requestPromises$get2 = requestPromises.get(win, []), _length2 = null == _requestPromises$get2 ? 0 : _requestPromises$get2.length; _i2 < _length2; _i2++) _requestPromises$get2[_i2].reject(new Error("Window cleaned up before response"));
            }
            var bridge = __webpack_require__("./node_modules/post-robot/src/bridge/interface.js");
            if (!src_global.a.initialized) {
                src_global.a.initialized = !0;
                Object(belter_src.addEventListener)(window, "message", messageListener);
                bridge && bridge.openTunnelToOpener();
                Object(lib.c)();
            }
            var post_robot_src = interface_namespaceObject, node__typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
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
            function node__classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            var Node = function() {
                function Node() {
                    node__classCallCheck(this, Node);
                }
                Node.prototype.isElementNode = function() {
                    return !1;
                };
                Node.prototype.isTextNode = function() {
                    return !1;
                };
                Node.prototype.isFragmentNode = function() {
                    return !1;
                };
                return Node;
            }(), ElementNode = function(_Node) {
                _inherits(ElementNode, _Node);
                function ElementNode(name, props, children) {
                    node__classCallCheck(this, ElementNode);
                    var _this = _possibleConstructorReturn(this, _Node.call(this));
                    _this.name = name;
                    _this.props = props;
                    _this.children = children;
                    if ("function" == typeof props.onRender) {
                        _this.onRender = props.onRender;
                        delete props.onRender;
                    }
                    return _this;
                }
                ElementNode.prototype.getTag = function() {
                    return this.name;
                };
                ElementNode.prototype.isTag = function(name) {
                    return name === this.name;
                };
                ElementNode.prototype.isElementNode = function() {
                    return !0;
                };
                ElementNode.prototype.render = function(renderer) {
                    var element = renderer(this.name, this.props, this.children);
                    this.onRender && this.onRender(element);
                    return element;
                };
                ElementNode.prototype.getText = function() {
                    throw new Error("Can not get text of an element node");
                };
                return ElementNode;
            }(Node), TextNode = function(_Node2) {
                _inherits(TextNode, _Node2);
                function TextNode(text) {
                    node__classCallCheck(this, TextNode);
                    var _this2 = _possibleConstructorReturn(this, _Node2.call(this));
                    _this2.text = text;
                    return _this2;
                }
                TextNode.prototype.getTag = function() {
                    throw new Error("Can not get tag of text node");
                };
                TextNode.prototype.isTag = function(name) {
                    throw new Error("Can not check tag of text node");
                };
                TextNode.prototype.isTextNode = function() {
                    return !0;
                };
                TextNode.prototype.render = function(renderer) {
                    throw new Error("Can not render a text node");
                };
                TextNode.prototype.getText = function() {
                    return this.text;
                };
                return TextNode;
            }(Node), FragmentNode = function(_Node3) {
                _inherits(FragmentNode, _Node3);
                function FragmentNode(children) {
                    node__classCallCheck(this, FragmentNode);
                    var _this3 = _possibleConstructorReturn(this, _Node3.call(this));
                    _this3.children = children;
                    return _this3;
                }
                FragmentNode.prototype.getTag = function() {
                    throw new Error("Can not get tag of fragment node");
                };
                FragmentNode.prototype.isTag = function(name) {
                    throw new Error("Can not check tag of fragment node");
                };
                FragmentNode.prototype.isFragmentNode = function() {
                    return !0;
                };
                FragmentNode.prototype.render = function(renderer) {
                    throw new Error("Can not render a fragment node");
                };
                FragmentNode.prototype.getText = function() {
                    throw new Error("Can not get text of a fragment node");
                };
                return FragmentNode;
            }(Node);
            function normalizeChild(child) {
                if ("string" == typeof child) return new TextNode(child);
                if (child instanceof ElementNode || child instanceof TextNode || child instanceof FragmentNode) return child;
                if (Array.isArray(child)) return new FragmentNode(normalizeChildren(child));
                if (null !== child && void 0 !== child) throw new Error("Child node must be string or instance of jsx-pragmatic node; got " + (void 0 === child ? "undefined" : node__typeof(child)));
            }
            function normalizeChildren(children) {
                for (var result = [], _i2 = 0, _length2 = null == children ? 0 : children.length; _i2 < _length2; _i2++) {
                    var normalizedChild = normalizeChild(children[_i2]);
                    if (normalizedChild) if (normalizedChild instanceof FragmentNode) for (var _i4 = 0, _normalizedChild$chil2 = normalizedChild.children, _length4 = null == _normalizedChild$chil2 ? 0 : _normalizedChild$chil2.length; _i4 < _length4; _i4++) {
                        var subchild = _normalizedChild$chil2[_i4];
                        result.push(subchild);
                    } else result.push(normalizedChild);
                }
                return result;
            }
            var _CREATE_ELEMENT, _ADD_CHILDREN, node = function(element, props) {
                for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) children[_key - 2] = arguments[_key];
                if ("string" == typeof element) return new ElementNode(element, props || {}, normalizeChildren(children));
                if ("function" == typeof element) return normalizeChild(element(props || {}, normalizeChildren(children)));
                throw new TypeError("Expected jsx Element to be a string or a function");
            }, dom__typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            }, ELEMENT_TAG_HTML = "html", ELEMENT_TAG_IFRAME = "iframe", ELEMENT_TAG_SCRIPT = "script", ELEMENT_TAG_NODE = "node", ELEMENT_TAG_DEFAULT = "default", ELEMENT_PROP_INNER_HTML = "innerHTML", ELEMENT_PROP_EL = "el", DOM_EVENT = {
                onBlur: "blur",
                onCancel: "cancel",
                onClick: "click",
                onClose: "close",
                onContextMenu: "contextMenu",
                onCopy: "copy",
                onCut: "cut",
                onAuxClick: "auxClick",
                onDoubleClick: "doubleClick",
                onDragEnd: "dragEnd",
                onDragStart: "dragStart",
                onDrop: "drop",
                onFocus: "focus",
                onInput: "input",
                onInvalid: "invalid",
                onKeyDown: "keyDown",
                onKeyPress: "keyPress",
                onKeyUp: "keyUp",
                onMouseDown: "mouseDown",
                onMouseUp: "mouseUp",
                onPaste: "paste",
                onPause: "pause",
                onPlay: "play",
                onPointerCancel: "pointerCancel",
                onPointerDown: "pointerDown",
                onPointerUp: "pointerUp",
                onRateChange: "rateChange",
                onReset: "reset",
                onSeeked: "seeked",
                onSubmit: "submit",
                onTouchCancel: "touchCancel",
                onTouchEnd: "touchEnd",
                onTouchStart: "touchStart",
                onVolumeChange: "volumeChange",
                onAbort: "abort",
                onAnimationEnd: "animationEnd",
                onAnimationIteration: "animationIteration",
                onAnimationStart: "animationStart",
                onCanPlay: "canPlay",
                onCanPlayThrough: "canPlayThrough",
                onDrag: "drag",
                onDragEnter: "dragEnter",
                onDragExit: "dragExit",
                onDragLeave: "dragLeave",
                onDragOver: "dragOver",
                onDurationChange: "durationChange",
                onEmptied: "emptied",
                onEncrypted: "encrypted",
                onEnded: "ended",
                onError: "error",
                onGotPointerCapture: "gotPointerCapture",
                onLoad: "load",
                onLoadedData: "loadedData",
                onLoadedMetadata: "loadedMetadata",
                onLoadStart: "loadStart",
                onLostPointerCapture: "lostPointerCapture",
                onMouseMove: "mouseMove",
                onMouseOut: "mouseOut",
                onMouseOver: "mouseOver",
                onPlaying: "playing",
                onPointerMove: "pointerMove",
                onPointerOut: "pointerOut",
                onPointerOver: "pointerOver",
                onProgress: "progress",
                onScroll: "scroll",
                onSeeking: "seeking",
                onStalled: "stalled",
                onSuspend: "suspend",
                onTimeUpdate: "timeUpdate",
                onToggle: "toggle",
                onTouchMove: "touchMove",
                onTransitionEnd: "transitionEnd",
                onWaiting: "waiting",
                onWheel: "wheel"
            }, CREATE_ELEMENT = ((_CREATE_ELEMENT = {})[ELEMENT_TAG_NODE] = function(_ref) {
                var props = _ref.props;
                if (!props[ELEMENT_PROP_EL]) throw new Error("Must pass " + ELEMENT_PROP_EL + " prop to " + ELEMENT_TAG_NODE + " element");
                if (Object.keys(props).length > 1) throw new Error("Must not pass any prop other than " + ELEMENT_PROP_EL + " to " + ELEMENT_TAG_NODE + " element");
                return props[ELEMENT_PROP_EL];
            }, _CREATE_ELEMENT[ELEMENT_TAG_DEFAULT] = function(_ref2) {
                var name = _ref2.name;
                return _ref2.doc.createElement(name);
            }, _CREATE_ELEMENT), ADD_CHILDREN = ((_ADD_CHILDREN = {})[ELEMENT_TAG_IFRAME] = function(_ref5) {
                var el = _ref5.el, children = _ref5.children, firstChild = children[0];
                if (children.length > 1 || !firstChild.isElementNode()) throw new Error("Expected only single element node as child of " + ELEMENT_TAG_IFRAME + " element");
                if (!firstChild.isTag(ELEMENT_TAG_HTML)) throw new Error("Expected element to be inserted into frame to be html, got " + firstChild.getTag());
                el.addEventListener("load", function() {
                    var win = el.contentWindow;
                    if (!win) throw new Error("Expected frame to have contentWindow");
                    for (var doc = win.document, docElement = doc.documentElement; docElement.children && docElement.children.length; ) docElement.removeChild(docElement.children[0]);
                    for (var child = firstChild.render(dom_dom({
                        doc: doc
                    })); child.children.length; ) docElement.appendChild(child.children[0]);
                });
            }, _ADD_CHILDREN[ELEMENT_TAG_SCRIPT] = function(_ref6) {
                var el = _ref6.el, children = _ref6.children, firstChild = children[0];
                if (1 !== children.length || !firstChild.isTextNode()) throw new Error("Expected only single text node as child of " + ELEMENT_TAG_SCRIPT + " element");
                el.text = firstChild.getText();
            }, _ADD_CHILDREN[ELEMENT_TAG_DEFAULT] = function(_ref7) {
                for (var el = _ref7.el, children = _ref7.children, doc = _ref7.doc, domRenderer = _ref7.domRenderer, _i6 = 0, _length6 = null == children ? 0 : children.length; _i6 < _length6; _i6++) {
                    var child = children[_i6];
                    child.isTextNode() ? el.appendChild(doc.createTextNode(child.getText())) : el.appendChild(child.render(domRenderer));
                }
            }, _ADD_CHILDREN), dom_dom = function() {
                var _ref9$doc = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).doc, doc = void 0 === _ref9$doc ? document : _ref9$doc;
                return function domRenderer(name, props, children) {
                    var el = function(_ref3) {
                        var doc = _ref3.doc, name = _ref3.name, props = _ref3.props;
                        return (CREATE_ELEMENT[name] || CREATE_ELEMENT[ELEMENT_TAG_DEFAULT])({
                            name: name,
                            props: props,
                            doc: doc
                        });
                    }({
                        name: name,
                        props: props,
                        doc: doc
                    });
                    !function(_ref4) {
                        for (var el = _ref4.el, props = _ref4.props, _i4 = 0, _Object$keys2 = Object.keys(props), _length4 = null == _Object$keys2 ? 0 : _Object$keys2.length; _i4 < _length4; _i4++) {
                            var prop = _Object$keys2[_i4], val = props[prop];
                            if (null !== val && void 0 !== val && prop !== ELEMENT_PROP_EL && prop !== ELEMENT_PROP_INNER_HTML) if (DOM_EVENT.hasOwnProperty(prop)) {
                                if ("function" != typeof val) throw new TypeError("Prop " + prop + " must be function");
                                el.addEventListener(DOM_EVENT[prop], val);
                            } else if ("string" == typeof val || "number" == typeof val) el.setAttribute(prop, val.toString()); else {
                                if ("boolean" != typeof val) throw new TypeError("Can not render prop " + prop + " of type " + (void 0 === val ? "undefined" : dom__typeof(val)));
                                !0 === val && el.setAttribute(prop, "");
                            }
                        }
                    }({
                        el: el,
                        props: props
                    });
                    !function(_ref8) {
                        var el = _ref8.el, name = _ref8.name, props = _ref8.props, children = _ref8.children, doc = _ref8.doc, domRenderer = _ref8.domRenderer;
                        if (props.hasOwnProperty(ELEMENT_PROP_INNER_HTML)) {
                            if (children.length >= 1) throw new Error("Expected no children to be passed when " + ELEMENT_PROP_INNER_HTML + " prop is set");
                            var html = props[ELEMENT_PROP_INNER_HTML];
                            if ("string" != typeof html) throw new TypeError(ELEMENT_PROP_INNER_HTML + " prop must be string");
                            if (name === ELEMENT_TAG_SCRIPT) el.text = html; else {
                                el.innerHTML = html;
                                !function(el) {
                                    for (var doc = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window.document, _i2 = 0, _el$querySelectorAll2 = el.querySelectorAll("script"), _length2 = null == _el$querySelectorAll2 ? 0 : _el$querySelectorAll2.length; _i2 < _length2; _i2++) {
                                        var script = _el$querySelectorAll2[_i2], parentNode = script.parentNode;
                                        if (parentNode) {
                                            var newScript = doc.createElement("script");
                                            newScript.text = script.textContent;
                                            parentNode.replaceChild(newScript, script);
                                        }
                                    }
                                }(el, doc);
                            }
                        } else (ADD_CHILDREN[name] || ADD_CHILDREN[ELEMENT_TAG_DEFAULT])({
                            el: el,
                            name: name,
                            props: props,
                            children: children,
                            doc: doc,
                            domRenderer: domRenderer
                        });
                    }({
                        el: el,
                        name: name,
                        props: props,
                        children: children,
                        doc: doc,
                        domRenderer: domRenderer
                    });
                    return el;
                };
            };
            "function" == typeof Symbol && Symbol.iterator;
            function getCurrentScriptDir() {
                console.warn("Do not use zoid.getCurrentScriptDir() in production -- browser support is limited");
                return document.currentScript ? document.currentScript.src.split("/").slice(0, -1).join("/") : ".";
            }
            var logger = void 0;
            function useLogger(newLogger) {
                logger = newLogger;
            }
            var ZOID = "zoid", __ZOID__ = "__" + ZOID + "__", POST_MESSAGE = {
                DELEGATE: ZOID + "_delegate",
                ALLOW_DELEGATE: ZOID + "_allow_delegate"
            }, PROP_TYPES = {
                STRING: "string",
                OBJECT: "object",
                FUNCTION: "function",
                BOOLEAN: "boolean",
                NUMBER: "number",
                ARRAY: "array"
            }, INITIAL_PROPS = {
                RAW: "raw",
                UID: "uid"
            }, WINDOW_REFERENCES = {
                OPENER: "opener",
                TOP: "top",
                PARENT: "parent",
                GLOBAL: "global"
            }, PROP_SERIALIZATION = {
                JSON: "json",
                DOTIFY: "dotify",
                BASE64: "base64"
            }, PROP_TYPES_LIST = Object.keys(PROP_TYPES).map(function(key) {
                return PROP_TYPES[key];
            }), CONTEXT_TYPES = {
                IFRAME: "iframe",
                POPUP: "popup"
            }, CLASS_NAMES = {
                ZOID: "" + ZOID,
                OUTLET: ZOID + "-outlet",
                COMPONENT_FRAME: ZOID + "-component-frame",
                PRERENDER_FRAME: ZOID + "-prerender-frame",
                VISIBLE: ZOID + "-visible",
                INVISIBLE: ZOID + "-invisible"
            }, EVENTS = {
                CLOSE: ZOID + "-close"
            }, ATTRIBUTES = {
                IFRAME_PLACEHOLDER: "data-zoid-" + ZOID + "-placeholder"
            }, ANIMATION_NAMES = {
                SHOW_CONTAINER: ZOID + "-show-container",
                SHOW_COMPONENT: ZOID + "-show-component",
                HIDE_CONTAINER: ZOID + "-hide-container",
                HIDE_COMPONENT: ZOID + "-hide-component"
            }, EVENT_NAMES = {
                CLICK: "click"
            }, CLOSE_REASONS = {
                PARENT_CALL: "parent_call",
                CHILD_CALL: "child_call",
                CLOSE_DETECTED: "close_detected",
                USER_CLOSED: "user_closed",
                PARENT_CLOSE_DETECTED: "parent_close_detected"
            }, CONTEXT_TYPES_LIST = Object.keys(CONTEXT_TYPES).map(function(key) {
                return CONTEXT_TYPES[key];
            }), DELEGATE = {
                CALL_ORIGINAL: "call_original",
                CALL_DELEGATE: "call_delegate"
            }, constants_WILDCARD = "*", DEFAULT_DIMENSIONS = {
                WIDTH: 300,
                HEIGHT: 150
            };
            function globalFor(win) {
                if (Object(cross_domain_utils_src.isSameDomain)(win)) {
                    win[__ZOID__] || (win[__ZOID__] = {});
                    return win[__ZOID__];
                }
            }
            var global_global = function() {
                var global = globalFor(window);
                if (!global) throw new Error("Could not get local global");
                return global;
            }();
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
                        if ("function" != typeof method) throw new TypeError("Expected to be passed function to clean.register");
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
                        return src.a.all(results).then(function() {});
                    },
                    run: function(name) {
                        for (var results = [], _i2 = 0, _length2 = null == tasks ? 0 : tasks.length; _i2 < _length2; _i2++) {
                            var item = tasks[_i2];
                            item.name === name && results.push(item.run());
                        }
                        return src.a.all(results).then(belter_src.noop);
                    }
                };
            }
            var isZoidComponentWindow = Object(belter_src.memoize)(function() {
                return !!window.name && window.name.split("__")[0] === ZOID;
            }), getComponentMeta = Object(belter_src.memoize)(function() {
                if (!window.name) throw new Error("Can not get component meta without window name");
                var _window$name$split2 = window.name.split("__"), zoidcomp = _window$name$split2[0], name = _window$name$split2[1], encodedOptions = _window$name$split2[2];
                if (zoidcomp !== ZOID) throw new Error("Window not rendered by zoid - got " + zoidcomp);
                var componentMeta = void 0;
                try {
                    componentMeta = JSON.parse(Object(belter_src.base64decode)(encodedOptions));
                } catch (err) {
                    throw new Error("Can not decode component-meta: " + encodedOptions + " " + Object(belter_src.stringifyError)(err));
                }
                componentMeta.name = name;
                return componentMeta;
            });
            function getParentDomain() {
                return getComponentMeta().domain;
            }
            var window_getParentComponentWindow = Object(belter_src.memoize)(function() {
                var componentMeta = getComponentMeta();
                if (!componentMeta) throw new Error("Can not get parent component window - window not rendered by zoid");
                return function(_ref) {
                    var ref = _ref.ref, uid = _ref.uid, distance = _ref.distance, result = void 0;
                    ref === WINDOW_REFERENCES.OPENER ? result = Object(cross_domain_utils_src.getOpener)(window) : ref === WINDOW_REFERENCES.TOP ? result = Object(cross_domain_utils_src.getTop)(window) : ref === WINDOW_REFERENCES.PARENT && (result = distance ? Object(cross_domain_utils_src.getNthParentFromTop)(window, distance) : Object(cross_domain_utils_src.getParent)(window));
                    if (ref === WINDOW_REFERENCES.GLOBAL) {
                        var ancestor = Object(cross_domain_utils_src.getAncestor)(window);
                        if (ancestor) for (var _i2 = 0, _getAllFramesInWindow2 = Object(cross_domain_utils_src.getAllFramesInWindow)(ancestor), _length2 = null == _getAllFramesInWindow2 ? 0 : _getAllFramesInWindow2.length; _i2 < _length2; _i2++) {
                            var global = globalFor(_getAllFramesInWindow2[_i2]);
                            if (global && global.windows && global.windows[uid]) {
                                result = global.windows[uid];
                                break;
                            }
                        }
                    }
                    if (!result) throw new Error("Unable to find window by ref");
                    return result;
                }(componentMeta.componentParent);
            });
            function normalizeChildProp(component, props, key, value) {
                var prop = component.getProp(key);
                return prop ? "function" == typeof prop.childDecorate ? prop.childDecorate(value) : value : component.looseProps ? value : void 0;
            }
            var child__typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            }, child_ChildComponent = function() {
                function ChildComponent(component) {
                    var _this = this;
                    !function(instance, Constructor) {
                        if (!(instance instanceof ChildComponent)) throw new TypeError("Cannot call a class as a function");
                    }(this);
                    src.a.try(function() {
                        if (window.xchild || window.xprops) throw _this.component.createError("Can not attach multiple components to the same window");
                        var parentDomain = getParentDomain(), parentComponentWindow = _this.getParentComponentWindow();
                        _this.parentExports = deserializeMessage(parentComponentWindow, parentDomain, getComponentMeta().exports);
                        _this.component = component;
                        _this.onPropHandlers = [];
                        window.xchild = _this.component.xchild = _this;
                        _this.setProps(_this.getInitialProps(), getParentDomain());
                        _this.checkParentDomain();
                        Object(lib.e)(parentComponentWindow);
                        _this.watchForClose();
                        _this.listenForResize();
                        _this.watchForResize();
                        return _this.parentExports.init(_this.buildExports());
                    }).catch(function(err) {
                        _this.error(err);
                    });
                }
                ChildComponent.prototype.listenForResize = function() {
                    var _this2 = this;
                    if (this.component.listenForResize) {
                        this.parentExports.trigger.fireAndForget("resize");
                        window.addEventListener("resize", function() {
                            _this2.parentExports.trigger.fireAndForget("resize");
                        });
                    }
                };
                ChildComponent.prototype.checkParentDomain = function() {
                    if (!Object(cross_domain_utils_src.matchDomain)(this.component.allowedParentDomains, getParentDomain())) throw new Error("Can not be rendered by domain: " + getParentDomain());
                };
                ChildComponent.prototype.onProps = function(handler) {
                    this.onPropHandlers.push(handler);
                };
                ChildComponent.prototype.getParentComponentWindow = function() {
                    return window_getParentComponentWindow();
                };
                ChildComponent.prototype.getInitialProps = function() {
                    var componentMeta = getComponentMeta(), props = componentMeta.props, parentComponentWindow = window_getParentComponentWindow();
                    if (props.type === INITIAL_PROPS.RAW) props = props.value; else {
                        if (props.type !== INITIAL_PROPS.UID) throw new Error("Unrecognized props type: " + props.type);
                        if (!Object(cross_domain_utils_src.isSameDomain)(parentComponentWindow)) {
                            if ("file:" === window.location.protocol) throw new Error("Can not get props from file:// domain");
                            throw new Error("Parent component window is on a different domain - expected " + Object(cross_domain_utils_src.getDomain)() + " - can not retrieve props");
                        }
                        var global = globalFor(parentComponentWindow);
                        if (!global) throw new Error("Can not find global for parent component - can not retrieve props");
                        props = global.props[componentMeta.uid];
                    }
                    if (!props) throw new Error("Initial props not found");
                    return deserializeMessage(parentComponentWindow, getParentDomain(), props);
                };
                ChildComponent.prototype.setProps = function(props, origin) {
                    var required = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                    this.props = this.props || {};
                    var normalizedProps = function(component, props, origin) {
                        for (var required = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3], result = {}, _i2 = 0, _Object$keys2 = Object.keys(props), _length2 = null == _Object$keys2 ? 0 : _Object$keys2.length; _i2 < _length2; _i2++) {
                            var key = _Object$keys2[_i2], prop = component.getProp(key), value = props[key];
                            if (!prop || !prop.sameDomain || origin === Object(cross_domain_utils_src.getDomain)(window)) {
                                result[key] = normalizeChildProp(component, 0, key, value);
                                prop && prop.alias && !result[prop.alias] && (result[prop.alias] = value);
                            }
                        }
                        if (required) for (var _i4 = 0, _component$getPropNam2 = component.getPropNames(), _length4 = null == _component$getPropNam2 ? 0 : _component$getPropNam2.length; _i4 < _length4; _i4++) {
                            var _key = _component$getPropNam2[_i4];
                            props.hasOwnProperty(_key) || (result[_key] = normalizeChildProp(component, 0, _key, props[_key]));
                        }
                        return result;
                    }(this.component, props, origin, required);
                    Object(belter_src.extend)(this.props, normalizedProps);
                    for (var _i2 = 0, _onPropHandlers2 = this.onPropHandlers, _length2 = null == _onPropHandlers2 ? 0 : _onPropHandlers2.length; _i2 < _length2; _i2++) _onPropHandlers2[_i2].call(this, this.props);
                    window.xprops = this.component.xprops = this.props;
                };
                ChildComponent.prototype.watchForClose = function() {
                    var _this3 = this;
                    window.addEventListener("unload", function() {
                        return _this3.parentExports.checkClose.fireAndForget();
                    });
                };
                ChildComponent.prototype.enableAutoResize = function() {
                    var _ref = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, _ref$width = _ref.width, width = void 0 === _ref$width || _ref$width, _ref$height = _ref.height, height = void 0 === _ref$height || _ref$height;
                    this.autoResize = {
                        width: width,
                        height: height
                    };
                    this.watchForResize();
                };
                ChildComponent.prototype.getAutoResize = function() {
                    var width = !1, height = !1, autoResize = this.autoResize || this.component.autoResize;
                    if ("object" === (void 0 === autoResize ? "undefined" : child__typeof(autoResize))) {
                        width = Boolean(autoResize.width);
                        height = Boolean(autoResize.height);
                    } else if (autoResize) {
                        width = !0;
                        height = !0;
                    }
                    return {
                        width: width,
                        height: height,
                        element: autoResize.element ? Object(belter_src.getElement)(autoResize.element) : window.navigator.userAgent.match(/MSIE (9|10)\./) ? document.body : document.documentElement
                    };
                };
                ChildComponent.prototype.watchForResize = function() {
                    var _this4 = this, _getAutoResize = this.getAutoResize(), width = _getAutoResize.width, height = _getAutoResize.height, element = _getAutoResize.element;
                    if ((width || height) && getComponentMeta().context !== CONTEXT_TYPES.POPUP && !this.watchingForResize) {
                        this.watchingForResize = !0;
                        return src.a.try(function() {
                            return Object(belter_src.waitForDocumentReady)();
                        }).then(function() {
                            if (!Object(belter_src.dimensionsMatchViewport)(element, {
                                width: width,
                                height: height
                            })) return _this4.resizeToElement(element, {
                                width: width,
                                height: height
                            });
                        }).then(function() {
                            return Object(belter_src.cycle)(function() {
                                return Object(belter_src.onDimensionsChange)(element, {
                                    width: width,
                                    height: height
                                }).then(function() {
                                    return _this4.resizeToElement(element, {
                                        width: width,
                                        height: height
                                    });
                                });
                            });
                        });
                    }
                };
                ChildComponent.prototype.buildExports = function() {
                    var self = this;
                    return {
                        updateProps: function(props) {
                            var _this5 = this;
                            return src.a.try(function() {
                                return self.setProps(props, _this5.origin, !1);
                            });
                        },
                        close: function() {
                            return src.a.try(function() {
                                return self.destroy();
                            });
                        }
                    };
                };
                ChildComponent.prototype.resize = function(width, height) {
                    return this.parentExports.resize(width, height);
                };
                ChildComponent.prototype.resizeToElement = function(el, _ref2) {
                    var _this6 = this, width = _ref2.width, height = _ref2.height, history = [];
                    return function resize() {
                        return src.a.try(function() {
                            for (var tracker = Object(belter_src.trackDimensions)(el, {
                                width: width,
                                height: height
                            }), dimensions = tracker.check().dimensions, _i4 = 0, _length4 = null == history ? 0 : history.length; _i4 < _length4; _i4++) {
                                var size = history[_i4], widthMatch = !width || size.width === dimensions.width, heightMatch = !height || size.height === dimensions.height;
                                if (widthMatch && heightMatch) return;
                            }
                            history.push({
                                width: dimensions.width,
                                height: dimensions.height
                            });
                            return _this6.resize(width ? dimensions.width : null, height ? dimensions.height : null).then(function() {
                                if (tracker.check().changed) return resize();
                            });
                        });
                    }();
                };
                ChildComponent.prototype.hide = function() {
                    return this.parentExports.hide();
                };
                ChildComponent.prototype.show = function() {
                    return this.parentExports.show();
                };
                ChildComponent.prototype.userClose = function() {
                    return this.close(CLOSE_REASONS.USER_CLOSED);
                };
                ChildComponent.prototype.close = function() {
                    var reason = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : CLOSE_REASONS.CHILD_CALL;
                    return this.parentExports.close(reason);
                };
                ChildComponent.prototype.destroy = function() {
                    return src.a.try(function() {
                        window.close();
                    });
                };
                ChildComponent.prototype.focus = function() {
                    window.focus();
                };
                ChildComponent.prototype.error = function(err) {
                    var _this7 = this;
                    return this.parentExports.error(err).then(belter_src.noop).finally(function() {
                        return _this7.destroy();
                    }).then(function() {
                        throw err;
                    });
                };
                return ChildComponent;
            }(), drivers__extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            }, RENDER_DRIVERS = {};
            RENDER_DRIVERS[CONTEXT_TYPES.IFRAME] = {
                renderedIntoContainer: !0,
                open: function() {
                    var _this = this, attributes = this.component.attributes.iframe || {}, frame = Object(belter_src.iframe)({
                        attributes: drivers__extends({
                            title: this.component.name,
                            scrolling: this.component.scrolling ? "yes" : "no"
                        }, attributes),
                        class: [ CLASS_NAMES.COMPONENT_FRAME, CLASS_NAMES.INVISIBLE ]
                    }, this.element);
                    this.clean.set("iframe", frame);
                    return Object(belter_src.awaitFrameWindow)(frame).then(function(win) {
                        var detectClose = function() {
                            return src.a.try(function() {
                                return _this.props.onClose(CLOSE_REASONS.CLOSE_DETECTED);
                            }).finally(function() {
                                return _this.destroy();
                            });
                        }, iframeWatcher = Object(belter_src.watchElementForClose)(frame, detectClose), elementWatcher = Object(belter_src.watchElementForClose)(_this.element, detectClose);
                        _this.clean.register("destroyWindow", function() {
                            iframeWatcher.cancel();
                            elementWatcher.cancel();
                            cleanUpWindow(win);
                            Object(belter_src.destroyElement)(frame);
                        });
                        return window_ProxyWindow.toProxyWindow(win);
                    });
                },
                openPrerender: function() {
                    var _this2 = this, attributes = this.component.attributes.iframe || {}, prerenderIframe = Object(belter_src.iframe)({
                        attributes: drivers__extends({
                            name: "__zoid_prerender_frame__" + this.component.name + "_" + Object(belter_src.uniqueID)() + "__",
                            scrolling: this.component.scrolling ? "yes" : "no"
                        }, attributes),
                        class: [ CLASS_NAMES.PRERENDER_FRAME, CLASS_NAMES.VISIBLE ]
                    }, this.element);
                    this.clean.set("prerenderIframe", prerenderIframe);
                    return Object(belter_src.awaitFrameWindow)(prerenderIframe).then(function(prerenderFrameWindow) {
                        _this2.clean.register("destroyPrerender", function() {
                            Object(belter_src.destroyElement)(prerenderIframe);
                        });
                        return Object(cross_domain_utils_src.assertSameDomain)(prerenderFrameWindow);
                    });
                },
                switchPrerender: function() {
                    var _this3 = this;
                    Object(belter_src.addClass)(this.prerenderIframe, CLASS_NAMES.INVISIBLE);
                    Object(belter_src.removeClass)(this.prerenderIframe, CLASS_NAMES.VISIBLE);
                    Object(belter_src.addClass)(this.iframe, CLASS_NAMES.VISIBLE);
                    Object(belter_src.removeClass)(this.iframe, CLASS_NAMES.INVISIBLE);
                    setTimeout(function() {
                        _this3.prerenderIframe && Object(belter_src.destroyElement)(_this3.prerenderIframe);
                    }, 1e3);
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
                    open: DELEGATE.CALL_DELEGATE,
                    renderTemplate: DELEGATE.CALL_ORIGINAL,
                    openContainerFrame: DELEGATE.CALL_ORIGINAL,
                    getOutlet: DELEGATE.CALL_ORIGINAL
                },
                resize: function(width, height) {
                    if (width) {
                        this.container.style.width = Object(belter_src.toCSS)(width);
                        this.element.style.width = Object(belter_src.toCSS)(width);
                    }
                    if (height) {
                        this.container.style.height = Object(belter_src.toCSS)(height);
                        this.element.style.height = Object(belter_src.toCSS)(height);
                    }
                },
                show: function() {
                    Object(belter_src.showElement)(this.element);
                },
                hide: function() {
                    Object(belter_src.hideElement)(this.element);
                }
            };
            RENDER_DRIVERS[CONTEXT_TYPES.POPUP] = {
                renderedIntoContainer: !1,
                open: function() {
                    var _this4 = this;
                    return src.a.try(function() {
                        var _ref = _this4.component.dimensions || {}, _ref$width = _ref.width, width = void 0 === _ref$width ? DEFAULT_DIMENSIONS.WIDTH : _ref$width, _ref$height = _ref.height, height = void 0 === _ref$height ? DEFAULT_DIMENSIONS.HEIGHT : _ref$height;
                        width = Object(belter_src.normalizeDimension)(width, window.outerWidth);
                        height = Object(belter_src.normalizeDimension)(height, window.outerWidth);
                        var attributes = _this4.component.attributes.popup || {}, win = Object(belter_src.popup)("", drivers__extends({
                            width: width,
                            height: height
                        }, attributes));
                        _this4.clean.register("destroyWindow", function() {
                            win.close();
                            cleanUpWindow(win);
                        });
                        return window_ProxyWindow.toProxyWindow(win);
                    });
                },
                openPrerender: function(win) {
                    return src.a.try(function() {
                        if (Object(cross_domain_utils_src.isSameDomain)(win)) return Object(cross_domain_utils_src.assertSameDomain)(win);
                    });
                },
                resize: function() {},
                hide: function() {
                    throw new Error("Can not hide popup");
                },
                show: function() {
                    throw new Error("Can not show popup");
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
                    cancelContainerEvents: DELEGATE.CALL_DELEGATE,
                    open: DELEGATE.CALL_ORIGINAL,
                    loadUrl: DELEGATE.CALL_ORIGINAL,
                    prerender: DELEGATE.CALL_ORIGINAL,
                    destroyComponent: DELEGATE.CALL_ORIGINAL,
                    resize: DELEGATE.CALL_ORIGINAL,
                    renderTemplate: DELEGATE.CALL_ORIGINAL,
                    openContainerFrame: DELEGATE.CALL_ORIGINAL,
                    getOutlet: DELEGATE.CALL_ORIGINAL
                }
            };
            var _class, props__typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            }, parent__extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            }, parent__typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
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
            global_global.props = global_global.props || {};
            global_global.windows = global_global.windows || {};
            var parent_ParentComponent = (_applyDecoratedDescriptor((_class = function() {
                function ParentComponent(component, context, _ref) {
                    var _this = this, props = _ref.props;
                    !function(instance, Constructor) {
                        if (!(instance instanceof ParentComponent)) throw new TypeError("Cannot call a class as a function");
                    }(this);
                    src.a.try(function() {
                        _this.onInit = new src.a();
                        _this.clean = cleanup(_this);
                        _this.event = Object(belter_src.eventEmitter)();
                        _this.component = component;
                        _this.context = context;
                        _this.driver = RENDER_DRIVERS[_this.context];
                        _this.setProps(props);
                        _this.registerActiveComponent();
                        _this.watchForUnload();
                        return _this.onInit;
                    }).catch(function(err) {
                        return _this.error(err, props);
                    });
                }
                ParentComponent.prototype.render = function(element) {
                    var _this2 = this, target = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window;
                    return this.tryInit(function() {
                        _this2.component.log("render_" + _this2.context, {
                            context: _this2.context,
                            element: element
                        });
                        var tasks = {};
                        tasks.onRender = _this2.props.onRender();
                        var domain = _this2.getDomain();
                        tasks.elementReady = src.a.try(function() {
                            if (element) return _this2.elementReady(element);
                        });
                        var focus = function() {
                            return tasks.awaitWindow.then(function(win) {
                                return win.focus();
                            });
                        };
                        tasks.openContainer = tasks.elementReady.then(function() {
                            return _this2.openContainer(element, {
                                focus: focus
                            });
                        });
                        tasks.open = _this2.driver.renderedIntoContainer ? tasks.openContainer.then(function() {
                            return _this2.open();
                        }) : _this2.open();
                        tasks.awaitWindow = tasks.open.then(function(proxyWin) {
                            return proxyWin.awaitWindow();
                        });
                        tasks.showContainer = tasks.openContainer.then(function() {
                            return _this2.showContainer();
                        });
                        tasks.setWindowName = tasks.open.then(function(proxyWin) {
                            return _this2.setWindowName(proxyWin, _this2.buildChildWindowName({
                                proxyWin: proxyWin,
                                domain: domain,
                                target: target
                            }));
                        });
                        tasks.watchForClose = src.a.all([ tasks.awaitWindow, tasks.setWindowName ]).then(function(_ref2) {
                            var win = _ref2[0];
                            return _this2.watchForClose(win);
                        });
                        tasks.prerender = src.a.all([ tasks.open, tasks.openContainer ]).then(function(_ref3) {
                            var proxyWin = _ref3[0];
                            return _this2.prerender(proxyWin);
                        });
                        tasks.showComponent = tasks.prerender.then(function() {
                            return _this2.showComponent();
                        });
                        tasks.buildUrl = _this2.buildUrl();
                        tasks.openBridge = src.a.all([ tasks.awaitWindow, tasks.buildUrl ]).then(function(_ref4) {
                            var win = _ref4[0], url = _ref4[1];
                            return _this2.openBridge(win, Object(cross_domain_utils_src.getDomainFromUrl)(url));
                        });
                        tasks.loadUrl = src.a.all([ tasks.open, tasks.buildUrl, tasks.setWindowName ]).then(function(_ref5) {
                            var proxyWin = _ref5[0], url = _ref5[1];
                            return _this2.loadUrl(proxyWin, url);
                        });
                        tasks.switchPrerender = src.a.all([ tasks.prerender, _this2.onInit ]).then(function() {
                            return _this2.switchPrerender();
                        });
                        tasks.runTimeout = tasks.loadUrl.then(function() {
                            return _this2.runTimeout();
                        });
                        return src.a.hash(tasks);
                    }).then(function() {
                        return _this2.props.onEnter();
                    }).then(function() {
                        return _this2;
                    });
                };
                ParentComponent.prototype.renderTo = function(target, element) {
                    var _this3 = this;
                    return this.tryInit(function() {
                        if (target === window) return _this3.render(element);
                        if (element && "string" != typeof element) throw new Error("Element passed to renderTo must be a string selector, got " + (void 0 === element ? "undefined" : parent__typeof(element)) + " " + element);
                        _this3.checkAllowRemoteRender(target);
                        _this3.component.log("render_" + _this3.context + "_to_win", {
                            element: Object(belter_src.stringify)(element),
                            context: _this3.context
                        });
                        _this3.delegate(target);
                        return _this3.render(element, target);
                    });
                };
                ParentComponent.prototype.on = function(eventName, handler) {
                    return this.event.on(eventName, handler);
                };
                ParentComponent.prototype.getOutlet = function() {
                    var outlet = document.createElement("div");
                    Object(belter_src.addClass)(outlet, CLASS_NAMES.OUTLET);
                    return outlet;
                };
                ParentComponent.prototype.checkAllowRemoteRender = function(target) {
                    if (!target) throw this.component.createError("Must pass window to renderTo");
                    if (!Object(cross_domain_utils_src.isSameTopWindow)(window, target)) throw new Error("Can only renderTo an adjacent frame");
                    var origin = Object(cross_domain_utils_src.getDomain)(), domain = this.getDomain();
                    if (!Object(cross_domain_utils_src.matchDomain)(domain, origin) && !Object(cross_domain_utils_src.isSameDomain)(target)) throw new Error("Can not render remotely to " + domain.toString() + " - can only render to " + origin);
                };
                ParentComponent.prototype.registerActiveComponent = function() {
                    var _this4 = this;
                    ParentComponent.activeComponents.push(this);
                    this.clean.register(function() {
                        ParentComponent.activeComponents.splice(ParentComponent.activeComponents.indexOf(_this4), 1);
                    });
                };
                ParentComponent.prototype.getComponentParentRef = function() {
                    var renderToWindow = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window;
                    if (this.context === CONTEXT_TYPES.POPUP) return {
                        ref: WINDOW_REFERENCES.OPENER
                    };
                    if (renderToWindow === window) return Object(cross_domain_utils_src.isTop)(window) ? {
                        ref: WINDOW_REFERENCES.TOP
                    } : {
                        ref: WINDOW_REFERENCES.PARENT,
                        distance: Object(cross_domain_utils_src.getDistanceFromTop)(window)
                    };
                    var uid = Object(belter_src.uniqueID)();
                    global_global.windows[uid] = window;
                    this.clean.register(function() {
                        delete global_global.windows[uid];
                    });
                    return {
                        ref: WINDOW_REFERENCES.GLOBAL,
                        uid: uid
                    };
                };
                ParentComponent.prototype.buildChildWindowName = function() {
                    var _ref6 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, proxyWin = _ref6.proxyWin, domain = _ref6.domain, _ref6$target = _ref6.target, target = void 0 === _ref6$target ? window : _ref6$target, uid = Object(belter_src.uniqueID)(), tag = this.component.tag, sProps = serializeMessage(proxyWin, domain, this.getPropsForChild()), componentParent = this.getComponentParentRef(target), props = Object(cross_domain_utils_src.isSameDomain)(target) ? {
                        type: INITIAL_PROPS.RAW,
                        value: sProps
                    } : {
                        type: INITIAL_PROPS.UID,
                        uid: uid
                    };
                    if (props.type === INITIAL_PROPS.UID) {
                        global_global.props[uid] = sProps;
                        this.clean.register(function() {
                            delete global_global.props[uid];
                        });
                    }
                    var exports = serializeMessage(proxyWin, domain, this.buildParentExports(proxyWin)), id = Object(belter_src.uniqueID)(), thisdomain = Object(cross_domain_utils_src.getDomain)(window), context = this.context;
                    return function(name, options) {
                        var encodedName = name.replace(/^[^a-z0-9A-Z]+|[^a-z0-9A-Z]+$/g, "").replace(/[^a-z0-9A-Z]+/g, "_"), encodedOptions = Object(belter_src.base64encode)(JSON.stringify(options));
                        if (!encodedName) throw new Error("Invalid name: " + name + " - must contain alphanumeric characters");
                        return [ ZOID, encodedName, encodedOptions, "" ].join("__");
                    }(this.component.name, {
                        id: id,
                        context: context,
                        domain: thisdomain,
                        uid: uid,
                        tag: tag,
                        componentParent: componentParent,
                        props: props,
                        exports: exports
                    });
                };
                ParentComponent.prototype.setProps = function(props) {
                    var isUpdate = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    this.component.validate && this.component.validate(this.component, props);
                    this.props = this.props || {};
                    Object(belter_src.extend)(this.props, function(component, instance, props) {
                        var isUpdate = arguments.length > 3 && void 0 !== arguments[3] && arguments[3], result = {};
                        props = props || {};
                        for (var propNames = isUpdate ? [] : component.getPropNames(), _i2 = 0, _Object$keys2 = Object.keys(props), _length2 = null == _Object$keys2 ? 0 : _Object$keys2.length; _i2 < _length2; _i2++) {
                            var key = _Object$keys2[_i2];
                            -1 === propNames.indexOf(key) && propNames.push(key);
                        }
                        for (var _i4 = 0, _length4 = null == propNames ? 0 : propNames.length; _i4 < _length4; _i4++) {
                            var _key = propNames[_i4], propDef = component.getProp(_key), value = props[_key];
                            if (!propDef) {
                                if (component.looseProps) {
                                    result[_key] = value;
                                    continue;
                                }
                                throw new Error("Unrecognized prop: " + _key);
                            }
                            !Object(belter_src.isDefined)(value) && propDef.alias && (value = props[propDef.alias]);
                            propDef.value && (value = propDef.value());
                            !Object(belter_src.isDefined)(value) && propDef.def && (value = propDef.def(props, component));
                            if (Object(belter_src.isDefined)(value)) {
                                if ("array" === propDef.type ? !Array.isArray(value) : (void 0 === value ? "undefined" : props__typeof(value)) !== propDef.type) throw new TypeError("Prop is not of type " + propDef.type + ": " + _key);
                            } else if (!1 !== propDef.required) throw new Error("Expected prop " + _key + " to be passed");
                            result[_key] = value;
                        }
                        for (var _i6 = 0, _Object$keys4 = Object.keys(result), _length6 = null == _Object$keys4 ? 0 : _Object$keys4.length; _i6 < _length6; _i6++) {
                            var _key2 = _Object$keys4[_i6], _propDef = component.getProp(_key2), _value = result[_key2];
                            if (_propDef) {
                                _propDef.validate && _propDef.validate(_value, result);
                                _propDef.decorate && (result[_key2] = _propDef.decorate(_value, result));
                                result[_key2] && "function" === _propDef.type && (result[_key2] = result[_key2].bind(instance));
                            }
                        }
                        return result;
                    }(this.component, this, props, isUpdate));
                };
                ParentComponent.prototype.buildUrl = function() {
                    var propsDef, props, params, _this5 = this;
                    return (propsDef = parent__extends({}, this.component.props, this.component.builtinProps), 
                    props = this.props, params = {}, src.a.all(Object.keys(props).map(function(key) {
                        var prop = propsDef[key];
                        if (prop) return src.a.resolve().then(function() {
                            var value = props[key];
                            if (value && prop.queryParam) return value;
                        }).then(function(value) {
                            if (null !== value && void 0 !== value) return src.a.all([ function(prop, key, value) {
                                return src.a.try(function() {
                                    return "function" == typeof prop.queryParam ? prop.queryParam(value) : "string" == typeof prop.queryParam ? prop.queryParam : key;
                                });
                            }(prop, key, value), function(prop, key, value) {
                                return src.a.try(function() {
                                    return "function" == typeof prop.queryValue ? prop.queryValue(value) : value;
                                });
                            }(prop, 0, value) ]).then(function(_ref) {
                                var queryParam = _ref[0], queryValue = _ref[1], result = void 0;
                                if ("boolean" == typeof queryValue) result = queryValue.toString(); else if ("string" == typeof queryValue) result = queryValue.toString(); else {
                                    if ("function" == typeof queryValue) return;
                                    if ("object" === (void 0 === queryValue ? "undefined" : props__typeof(queryValue)) && null !== queryValue) {
                                        if (prop.serialization === PROP_SERIALIZATION.JSON) result = JSON.stringify(queryValue); else if (prop.serialization === PROP_SERIALIZATION.BASE64) result = btoa(JSON.stringify(queryValue)); else if (prop.serialization === PROP_SERIALIZATION.DOTIFY || !prop.serialization) {
                                            result = Object(belter_src.dotify)(queryValue, key);
                                            for (var _i8 = 0, _Object$keys6 = Object.keys(result), _length8 = null == _Object$keys6 ? 0 : _Object$keys6.length; _i8 < _length8; _i8++) {
                                                var dotkey = _Object$keys6[_i8];
                                                params[dotkey] = result[dotkey];
                                            }
                                            return;
                                        }
                                    } else "number" == typeof queryValue && (result = queryValue.toString());
                                }
                                params[queryParam] = result;
                            });
                        });
                    })).then(function() {
                        return params;
                    })).then(function(query) {
                        var url = _this5.component.getUrl(_this5.props);
                        return Object(belter_src.extendUrl)(url, {
                            query: parent__extends({}, query)
                        });
                    });
                };
                ParentComponent.prototype.getDomain = function() {
                    return this.component.getDomain(this.props);
                };
                ParentComponent.prototype.getPropsForChild = function() {
                    for (var result = {}, _i2 = 0, _Object$keys2 = Object.keys(this.props), _length2 = null == _Object$keys2 ? 0 : _Object$keys2.length; _i2 < _length2; _i2++) {
                        var key = _Object$keys2[_i2], prop = this.component.getProp(key);
                        prop && !1 === prop.sendToChild || (result[key] = this.props[key]);
                    }
                    return result;
                };
                ParentComponent.prototype.updateProps = function(props) {
                    var _this6 = this;
                    this.setProps(props, !0);
                    return this.onInit.then(function() {
                        if (_this6.childExports) return _this6.childExports.updateProps(_this6.getPropsForChild());
                        throw new Error("Child exports were not available");
                    });
                };
                ParentComponent.prototype.openBridge = function(win, domain) {
                    var _this7 = this;
                    return src.a.try(function() {
                        if (bridge && bridge.needsBridge({
                            win: win,
                            domain: domain
                        }) && !bridge.hasBridge(domain, domain)) {
                            var bridgeUrl = _this7.component.getBridgeUrl(_this7.props);
                            if (!bridgeUrl) throw new Error("Bridge url and domain needed to render " + _this7.context);
                            var bridgeDomain = Object(cross_domain_utils_src.getDomainFromUrl)(bridgeUrl);
                            bridge.linkUrl(win, domain);
                            return bridge.openBridge(bridgeUrl, bridgeDomain);
                        }
                    });
                };
                ParentComponent.prototype.open = function() {
                    var _this8 = this;
                    return src.a.try(function() {
                        _this8.component.log("open_" + _this8.context);
                        return _this8.driver.open.call(_this8);
                    });
                };
                ParentComponent.prototype.setWindowName = function(proxyWin, name) {
                    return proxyWin.setName(name);
                };
                ParentComponent.prototype.switchPrerender = function() {
                    var _this9 = this;
                    return src.a.try(function() {
                        if (_this9.component.prerenderTemplate && _this9.driver.switchPrerender) return _this9.driver.switchPrerender.call(_this9);
                    });
                };
                ParentComponent.prototype.elementReady = function(element) {
                    return Object(belter_src.elementReady)(element).then(belter_src.noop);
                };
                ParentComponent.prototype.delegate = function(target) {
                    var _this10 = this;
                    this.component.log("delegate_" + this.context);
                    for (var props = {
                        uid: this.props.uid,
                        dimensions: this.props.dimensions,
                        onClose: this.props.onClose,
                        onDisplay: this.props.onDisplay
                    }, _i4 = 0, _component$getPropNam2 = this.component.getPropNames(), _length4 = null == _component$getPropNam2 ? 0 : _component$getPropNam2.length; _i4 < _length4; _i4++) {
                        var propName = _component$getPropNam2[_i4];
                        this.component.getProp(propName).allowDelegate && (props[propName] = this.props[propName]);
                    }
                    for (var delegate = _send(target, POST_MESSAGE.DELEGATE + "_" + this.component.name, {
                        context: this.context,
                        env: this.props.env,
                        options: {
                            context: this.context,
                            props: props,
                            overrides: {
                                userClose: function() {
                                    return _this10.userClose();
                                },
                                error: function(err) {
                                    return _this10.error(err);
                                },
                                on: function(eventName, handler) {
                                    return _this10.on(eventName, handler);
                                }
                            }
                        }
                    }).then(function(_ref7) {
                        var data = _ref7.data;
                        _this10.clean.register(data.destroy);
                        return data;
                    }).catch(function(err) {
                        throw new Error("Unable to delegate rendering. Possibly the component is not loaded in the target window.\n\n" + Object(belter_src.stringifyError)(err));
                    }), overrides = this.driver.delegateOverrides, _loop = function(_i6, _Object$keys4, _length6) {
                        var key = _Object$keys4[_i6];
                        overrides[key] === DELEGATE.CALL_DELEGATE && (_this10[key] = function() {
                            var _this11 = this, _arguments = arguments;
                            return delegate.then(function(data) {
                                return data.overrides[key].apply(_this11, _arguments);
                            });
                        });
                    }, _i6 = 0, _Object$keys4 = Object.keys(overrides), _length6 = null == _Object$keys4 ? 0 : _Object$keys4.length; _i6 < _length6; _i6++) _loop(_i6, _Object$keys4);
                };
                ParentComponent.prototype.watchForClose = function(win) {
                    var _this12 = this, closeWindowListener = Object(cross_domain_utils_src.onCloseWindow)(win, function() {
                        _this12.component.log("detect_close_child");
                        return src.a.try(function() {
                            return _this12.props.onClose(CLOSE_REASONS.CLOSE_DETECTED);
                        }).finally(function() {
                            return _this12.destroy();
                        });
                    }, 3e3);
                    this.clean.register("destroyCloseWindowListener", closeWindowListener.cancel);
                };
                ParentComponent.prototype.watchForUnload = function() {
                    var _this13 = this, onunload = Object(belter_src.once)(function() {
                        _this13.component.log("navigate_away");
                        _this13.destroyComponent();
                    }), unloadWindowListener = Object(belter_src.addEventListener)(window, "unload", onunload);
                    this.clean.register("destroyUnloadWindowListener", unloadWindowListener.cancel);
                };
                ParentComponent.prototype.loadUrl = function(proxyWin, url) {
                    this.component.log("load_url");
                    return proxyWin.setLocation(url);
                };
                ParentComponent.prototype.runTimeout = function() {
                    var _this14 = this, timeout = this.props.timeout;
                    if (timeout) {
                        var _id = this.timeout = setTimeout(function() {
                            _this14.component.log("timed_out", {
                                timeout: timeout.toString()
                            });
                            _this14.error(_this14.component.createError("Loading component timed out after " + timeout + " milliseconds"));
                        }, timeout);
                        this.clean.register(function() {
                            clearTimeout(_id);
                            delete _this14.timeout;
                        });
                    }
                };
                ParentComponent.prototype.initChild = function(childExports) {
                    var _this15 = this;
                    return src.a.try(function() {
                        _this15.childExports = childExports;
                        _this15.onInit.resolve(_this15);
                        _this15.timeout && clearTimeout(_this15.timeout);
                    });
                };
                ParentComponent.prototype.buildParentExports = function(win) {
                    var _this16 = this;
                    return {
                        init: function(childExports) {
                            return _this16.initChild(childExports);
                        },
                        close: function(reason) {
                            return _this16.close(reason);
                        },
                        checkClose: function() {
                            return _this16.checkClose(win);
                        },
                        resize: function(width, height) {
                            return _this16.resize(width, height);
                        },
                        trigger: function(name) {
                            return src.a.try(function() {
                                return _this16.event.trigger(name);
                            });
                        },
                        hide: function() {
                            return src.a.try(function() {
                                return _this16.hide();
                            });
                        },
                        show: function() {
                            return src.a.try(function() {
                                return _this16.show();
                            });
                        },
                        error: function(err) {
                            return _this16.error(err);
                        }
                    };
                };
                ParentComponent.prototype.resize = function(width, height) {
                    var _this17 = this, _ref8$waitForTransiti = (arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}).waitForTransition, waitForTransition = void 0 === _ref8$waitForTransiti || _ref8$waitForTransiti;
                    return src.a.try(function() {
                        _this17.component.log("resize", {
                            height: Object(belter_src.stringify)(height),
                            width: Object(belter_src.stringify)(width)
                        });
                        _this17.driver.resize.call(_this17, width, height);
                        if (waitForTransition && _this17.element) {
                            var overflow = void 0;
                            _this17.element && (overflow = Object(belter_src.setOverflow)(_this17.element, "hidden"));
                            return Object(belter_src.elementStoppedMoving)(_this17.element).then(function() {
                                overflow && overflow.reset();
                            });
                        }
                    });
                };
                ParentComponent.prototype.hide = function() {
                    this.container && Object(belter_src.hideElement)(this.container);
                    return this.driver.hide.call(this);
                };
                ParentComponent.prototype.show = function() {
                    this.container && Object(belter_src.showElement)(this.container);
                    return this.driver.show.call(this);
                };
                ParentComponent.prototype.checkClose = function(win) {
                    var _this18 = this;
                    return win.isClosed().then(function(closed) {
                        return closed ? _this18.userClose() : src.a.delay(200).then(function() {
                            return win.isClosed();
                        }).then(function(secondClosed) {
                            if (secondClosed) return _this18.userClose();
                        });
                    });
                };
                ParentComponent.prototype.userClose = function() {
                    return this.close(CLOSE_REASONS.USER_CLOSED);
                };
                ParentComponent.prototype.close = function() {
                    var _this19 = this, reason = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : CLOSE_REASONS.PARENT_CALL;
                    return src.a.try(function() {
                        _this19.component.log("close", {
                            reason: reason
                        });
                        _this19.event.triggerOnce(EVENTS.CLOSE);
                        return _this19.props.onClose(reason);
                    }).then(function() {
                        return src.a.all([ _this19.closeComponent(), _this19.closeContainer() ]);
                    }).then(function() {
                        return _this19.destroy();
                    });
                };
                ParentComponent.prototype.closeContainer = function() {
                    var _this20 = this, reason = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : CLOSE_REASONS.PARENT_CALL;
                    return src.a.try(function() {
                        _this20.event.triggerOnce(EVENTS.CLOSE);
                        return _this20.props.onClose(reason);
                    }).then(function() {
                        return src.a.all([ _this20.closeComponent(reason), _this20.hideContainer() ]);
                    }).then(function() {
                        return _this20.destroyContainer();
                    });
                };
                ParentComponent.prototype.destroyContainer = function() {
                    var _this21 = this;
                    return src.a.try(function() {
                        _this21.clean.run("destroyContainerEvents");
                        _this21.clean.run("destroyContainerTemplate");
                    });
                };
                ParentComponent.prototype.closeComponent = function() {
                    var _this22 = this, reason = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : CLOSE_REASONS.PARENT_CALL;
                    return src.a.try(function() {
                        return _this22.cancelContainerEvents();
                    }).then(function() {
                        _this22.event.triggerOnce(EVENTS.CLOSE);
                        return _this22.props.onClose(reason);
                    }).then(function() {
                        return _this22.hideComponent();
                    }).then(function() {
                        return _this22.destroyComponent();
                    }).then(function() {
                        _this22.childExports && _this22.context === CONTEXT_TYPES.POPUP && _this22.childExports.close().catch(belter_src.noop);
                    });
                };
                ParentComponent.prototype.destroyComponent = function() {
                    this.clean.run("destroyUnloadWindowListener");
                    this.clean.run("destroyCloseWindowListener");
                    this.clean.run("destroyContainerEvents");
                    this.clean.run("destroyWindow");
                };
                ParentComponent.prototype.showContainer = function() {
                    var _this23 = this;
                    return src.a.try(function() {
                        if (_this23.props.onDisplay) return _this23.props.onDisplay();
                    }).then(function() {
                        if (_this23.container) return Object(belter_src.showAndAnimate)(_this23.container, ANIMATION_NAMES.SHOW_CONTAINER, _this23.clean.register);
                    });
                };
                ParentComponent.prototype.showComponent = function() {
                    var _this24 = this;
                    return src.a.try(function() {
                        if (_this24.props.onDisplay) return _this24.props.onDisplay();
                    }).then(function() {
                        if (_this24.element) return Object(belter_src.showAndAnimate)(_this24.element, ANIMATION_NAMES.SHOW_COMPONENT, _this24.clean.register);
                    });
                };
                ParentComponent.prototype.hideContainer = function() {
                    var _this25 = this;
                    return src.a.try(function() {
                        if (_this25.container) return Object(belter_src.animateAndHide)(_this25.container, ANIMATION_NAMES.HIDE_CONTAINER, _this25.clean.register);
                    });
                };
                ParentComponent.prototype.hideComponent = function() {
                    var _this26 = this;
                    return src.a.try(function() {
                        if (_this26.element) return Object(belter_src.animateAndHide)(_this26.element, ANIMATION_NAMES.HIDE_COMPONENT, _this26.clean.register);
                    });
                };
                ParentComponent.prototype.prerender = function(proxyWin) {
                    var _this27 = this;
                    return src.a.try(function() {
                        if (_this27.component.prerenderTemplate) return src.a.try(function() {
                            return proxyWin.awaitWindow();
                        }).then(function(win) {
                            return _this27.driver.openPrerender.call(_this27, win);
                        }).then(function(prerenderWindow) {
                            if (prerenderWindow) {
                                var doc = prerenderWindow.document, el = _this27.renderTemplate(_this27.component.prerenderTemplate, {
                                    document: doc
                                });
                                el instanceof ElementNode && (el = el.render(dom_dom({
                                    doc: doc
                                })));
                                try {
                                    Object(belter_src.writeElementToWindow)(prerenderWindow, el);
                                } catch (err) {}
                            }
                        });
                    });
                };
                ParentComponent.prototype.renderTemplate = function(renderer, _ref9) {
                    var _this28 = this, focus = _ref9.focus, container = _ref9.container, document = _ref9.document, _ref10 = this.component.dimensions || {}, _ref10$width = _ref10.width, width = void 0 === _ref10$width ? DEFAULT_DIMENSIONS.WIDTH + "px" : _ref10$width, _ref10$height = _ref10.height, height = void 0 === _ref10$height ? DEFAULT_DIMENSIONS.HEIGHT + "px" : _ref10$height;
                    focus = focus || function() {
                        return src.a.resolve();
                    };
                    return renderer.call(this, {
                        id: CLASS_NAMES.ZOID + "-" + this.component.tag + "-" + this.props.uid,
                        props: renderer.__xdomain__ ? null : this.props,
                        tag: this.component.tag,
                        context: this.context,
                        outlet: this.getOutlet(),
                        CLASS: CLASS_NAMES,
                        ANIMATION: ANIMATION_NAMES,
                        CONTEXT: CONTEXT_TYPES,
                        EVENT: EVENTS,
                        actions: {
                            focus: focus,
                            close: function() {
                                return _this28.userClose();
                            }
                        },
                        on: function(eventName, handler) {
                            return _this28.on(eventName, handler);
                        },
                        jsxDom: node,
                        document: document,
                        dimensions: {
                            width: width,
                            height: height
                        },
                        container: container
                    });
                };
                ParentComponent.prototype.openContainer = function(element, _ref11) {
                    var _this29 = this, focus = _ref11.focus;
                    return src.a.try(function() {
                        var el;
                        if (!(el = element ? Object(belter_src.getElement)(element) : document.body)) throw new Error("Could not find element to open container into");
                        if (_this29.component.containerTemplate) {
                            var container = _this29.renderTemplate(_this29.component.containerTemplate, {
                                container: el,
                                focus: focus
                            });
                            container instanceof ElementNode && (container = container.render(dom_dom({
                                doc: document
                            })));
                            _this29.container = container;
                            Object(belter_src.hideElement)(_this29.container);
                            Object(belter_src.appendChild)(el, _this29.container);
                            if (_this29.driver.renderedIntoContainer) {
                                _this29.element = _this29.getOutlet();
                                Object(belter_src.hideElement)(_this29.element);
                                if (!_this29.element) throw new Error("Could not find element to render component into");
                                Object(belter_src.hideElement)(_this29.element);
                            }
                            _this29.clean.register("destroyContainerTemplate", function() {
                                _this29.container && _this29.container.parentNode && _this29.container.parentNode.removeChild(_this29.container);
                                delete _this29.container;
                            });
                        } else if (_this29.driver.renderedIntoContainer) throw new Error("containerTemplate needed to render " + _this29.context);
                    });
                };
                ParentComponent.prototype.cancelContainerEvents = function() {
                    this.clean.run("destroyContainerEvents");
                };
                ParentComponent.prototype.destroy = function() {
                    var _this30 = this;
                    return src.a.try(function() {
                        if (_this30.clean.hasTasks()) {
                            _this30.component.log("destroy");
                            return _this30.clean.all();
                        }
                    });
                };
                ParentComponent.prototype.tryInit = function(method) {
                    var _this31 = this;
                    return src.a.try(method).catch(function(err) {
                        _this31.onInit.reject(err);
                    }).then(function() {
                        return _this31.onInit;
                    });
                };
                ParentComponent.prototype.error = function(err) {
                    var _this32 = this, props = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.props;
                    if (!this.errored) {
                        this.errored = !0;
                        return src.a.try(function() {
                            _this32.onInit = _this32.onInit || new src.a();
                            _this32.onInit.reject(err);
                            return _this32.destroy();
                        }).then(function() {
                            if (props.onError) return props.onError(err);
                        }).catch(function(errErr) {
                            throw new Error("An error was encountered while handling error:\n\n " + Object(belter_src.stringifyError)(err) + "\n\n" + Object(belter_src.stringifyError)(errErr));
                        }).then(function() {
                            if (!props.onError) throw err;
                        });
                    }
                };
                ParentComponent.destroyAll = function() {
                    for (var results = []; ParentComponent.activeComponents.length; ) results.push(ParentComponent.activeComponents[0].destroy());
                    return src.a.all(results).then(belter_src.noop);
                };
                return ParentComponent;
            }()).prototype, "getOutlet", [ belter_src.memoized ], Object.getOwnPropertyDescriptor(_class.prototype, "getOutlet"), _class.prototype), 
            _applyDecoratedDescriptor(_class.prototype, "close", [ belter_src.memoized ], Object.getOwnPropertyDescriptor(_class.prototype, "close"), _class.prototype), 
            _applyDecoratedDescriptor(_class.prototype, "closeContainer", [ belter_src.memoized ], Object.getOwnPropertyDescriptor(_class.prototype, "closeContainer"), _class.prototype), 
            _applyDecoratedDescriptor(_class.prototype, "destroyContainer", [ belter_src.memoized ], Object.getOwnPropertyDescriptor(_class.prototype, "destroyContainer"), _class.prototype), 
            _applyDecoratedDescriptor(_class.prototype, "closeComponent", [ belter_src.memoized ], Object.getOwnPropertyDescriptor(_class.prototype, "closeComponent"), _class.prototype), 
            _applyDecoratedDescriptor(_class.prototype, "showContainer", [ belter_src.memoized ], Object.getOwnPropertyDescriptor(_class.prototype, "showContainer"), _class.prototype), 
            _applyDecoratedDescriptor(_class.prototype, "showComponent", [ belter_src.memoized ], Object.getOwnPropertyDescriptor(_class.prototype, "showComponent"), _class.prototype), 
            _applyDecoratedDescriptor(_class.prototype, "hideContainer", [ belter_src.memoized ], Object.getOwnPropertyDescriptor(_class.prototype, "hideContainer"), _class.prototype), 
            _applyDecoratedDescriptor(_class.prototype, "hideComponent", [ belter_src.memoized ], Object.getOwnPropertyDescriptor(_class.prototype, "hideComponent"), _class.prototype), 
            _class);
            parent_ParentComponent.activeComponents = [];
            var _createClass = function() {
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
            }(), delegate_DelegateComponent = function() {
                function DelegateComponent(component, source, options) {
                    !function(instance, Constructor) {
                        if (!(instance instanceof DelegateComponent)) throw new TypeError("Cannot call a class as a function");
                    }(this);
                    this.component = component;
                    this.context = options.context;
                    this.clean = cleanup(this);
                    this.event = Object(belter_src.eventEmitter)();
                    this.props = {
                        uid: options.props.uid,
                        dimensions: options.props.dimensions,
                        onClose: options.props.onClose,
                        onDisplay: options.props.onDisplay
                    };
                    for (var _i2 = 0, _component$getPropNam2 = component.getPropNames(), _length2 = null == _component$getPropNam2 ? 0 : _component$getPropNam2.length; _i2 < _length2; _i2++) {
                        var propName = _component$getPropNam2[_i2];
                        this.component.getProp(propName).allowDelegate && (this.props[propName] = options.props[propName]);
                    }
                    this.userClose = options.overrides.userClose;
                    this.error = options.overrides.error;
                    this.on = options.overrides.on;
                    for (var delegateOverrides = RENDER_DRIVERS[options.context].delegateOverrides, _i4 = 0, _Object$keys2 = Object.keys(delegateOverrides), _length4 = null == _Object$keys2 ? 0 : _Object$keys2.length; _i4 < _length4; _i4++) {
                        var key = _Object$keys2[_i4];
                        this[key] = parent_ParentComponent.prototype[key];
                    }
                    parent_ParentComponent.prototype.registerActiveComponent.call(this);
                    this.watchForClose(source);
                }
                DelegateComponent.prototype.watchForClose = function(source) {
                    var _this = this, closeWindowListener = Object(cross_domain_utils_src.onCloseWindow)(source, function() {
                        return _this.destroy();
                    }, 3e3);
                    this.clean.register("destroyCloseWindowListener", closeWindowListener.cancel);
                };
                DelegateComponent.prototype.getOverrides = function(context) {
                    for (var delegateOverrides = RENDER_DRIVERS[context].delegateOverrides, overrides = {}, self = this, _loop = function(_i6, _Object$keys4, _length6) {
                        var key = _Object$keys4[_i6];
                        overrides[key] = function() {
                            return parent_ParentComponent.prototype[key].apply(self, arguments);
                        };
                    }, _i6 = 0, _Object$keys4 = Object.keys(delegateOverrides), _length6 = null == _Object$keys4 ? 0 : _Object$keys4.length; _i6 < _length6; _i6++) _loop(_i6, _Object$keys4);
                    return overrides;
                };
                DelegateComponent.prototype.destroy = function() {
                    return this.clean.all();
                };
                _createClass(DelegateComponent, [ {
                    key: "driver",
                    get: function() {
                        if (!this.context) throw new Error("Context not set");
                        return RENDER_DRIVERS[this.context];
                    }
                } ]);
                return DelegateComponent;
            }(), drivers = __webpack_require__("./src/drivers/index.js"), validate__typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            function defaultContainerTemplate(_ref) {
                var id = _ref.id, tag = _ref.tag, context = _ref.context, CLASS = _ref.CLASS, outlet = _ref.outlet, document = _ref.document, _ref$dimensions = _ref.dimensions, width = _ref$dimensions.width, height = _ref$dimensions.height;
                return node("div", {
                    id: id,
                    class: CLASS.ZOID + " " + CLASS.ZOID + "-tag-" + tag + " " + CLASS.ZOID + "-context-" + context
                }, node("style", null, "\n                    #" + id + ", #" + id + " > ." + CLASS.OUTLET + " {\n                        width: " + width + ";\n                        height: " + height + ";\n                    }\n\n                    #" + id + " > ." + CLASS.OUTLET + " {\n                        display: inline-block;\n                        position: relative;\n                    }\n\n                    #" + id + " > ." + CLASS.OUTLET + " > iframe {\n                        height: 100%;\n                        width: 100%;\n                        position: absolute;\n                        top: 0;\n                        left: 0;\n                        transition: opacity .2s ease-in-out;\n                    }\n\n                    #" + id + " > ." + CLASS.OUTLET + " > iframe." + CLASS.VISIBLE + " {\n                        opacity: 1;\n                    }\n\n                    #" + id + " > ." + CLASS.OUTLET + " > iframe." + CLASS.INVISIBLE + " {\n                        opacity: 0;\n                    }\n                "), node("node", {
                    el: outlet
                })).render(dom_dom({
                    doc: document
                }));
            }
            function defaultPrerenderTemplate(_ref) {
                var document = _ref.document;
                return node("html", null, node("head", null, node("style", null, "\n                        html, body {\n                            width: 100%;\n                            height: 100%;\n                            overflow: hidden;\n                            top: 0;\n                            left: 0;\n                            margin: 0;\n                            text-align: center;\n                        }\n\n                        .spinner {\n                            position: absolute;\n                            max-height: 60vmin;\n                            max-width: 60vmin;\n                            height: 40px;\n                            width: 40px;\n                            top: 50%;\n                            left: 50%;\n                            transform: translateX(-50%) translateY(-50%);\n                            z-index: 10;\n                        }\n\n                        .spinner .loader {\n                            height: 100%;\n                            width: 100%;\n                            box-sizing: border-box;\n                            border: 3px solid rgba(0, 0, 0, .2);\n                            border-top-color: rgba(33, 128, 192, 0.8);\n                            border-radius: 100%;\n                            animation: rotation .7s infinite linear;\n\n                        }\n\n                        @keyframes rotation {\n                            from {\n                                transform: rotate(0deg)\n                            }\n                            to {\n                                transform: rotate(359deg)\n                            }\n                        }\n                    ")), node("body", null, node("div", {
                    class: "spinner"
                }, node("div", {
                    id: "loader",
                    class: "loader"
                })))).render(dom_dom({
                    doc: document
                }));
            }
            __webpack_require__("./src/types.js");
            var component__class, component__typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            }, component_drivers = {
                angular: drivers.angular,
                angular2: drivers.angular2,
                glimmer: drivers.glimmer,
                react: drivers.react,
                vue: drivers.vue,
                script: drivers.script
            }, component_Component = (function(target, property, decorators, descriptor, context) {
                var desc = {};
                Object.keys(descriptor).forEach(function(key) {
                    desc[key] = descriptor[key];
                });
                desc.enumerable = !!desc.enumerable;
                desc.configurable = !!desc.configurable;
                ("value" in desc || desc.initializer) && (desc.writable = !0);
                desc = decorators.slice().reverse().reduce(function(desc, decorator) {
                    return decorator(target, "getPropNames", desc) || desc;
                }, desc);
                if (context && void 0 !== desc.initializer) {
                    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
                    desc.initializer = void 0;
                }
                if (void 0 === desc.initializer) {
                    Object.defineProperty(target, "getPropNames", desc);
                    desc = null;
                }
            }((component__class = function() {
                function Component(options) {
                    !function(instance, Constructor) {
                        if (!(instance instanceof Component)) throw new TypeError("Cannot call a class as a function");
                    }(this);
                    !function(options) {
                        if (!options) throw new Error("Expected options to be passed");
                        if (!options.tag || !options.tag.match(/^[a-z0-9-]+$/)) throw new Error("Invalid options.tag: " + options.tag);
                        !function(options) {
                            if (options.props && "object" !== validate__typeof(options.props)) throw new Error("Expected options.props to be an object");
                            if (options.props) for (var _i2 = 0, _Object$keys2 = Object.keys(options.props), _length2 = null == _Object$keys2 ? 0 : _Object$keys2.length; _i2 < _length2; _i2++) {
                                var key = _Object$keys2[_i2], prop = options.props[key];
                                if (!prop || "object" !== (void 0 === prop ? "undefined" : validate__typeof(prop))) throw new Error("Expected options.props." + key + " to be an object");
                                if (!prop.type) throw new Error("Expected prop.type");
                                if (-1 === PROP_TYPES_LIST.indexOf(prop.type)) throw new Error("Expected prop.type to be one of " + PROP_TYPES_LIST.join(", "));
                                if (prop.required && prop.def) throw new Error("Required prop can not have a default value");
                            }
                        }(options);
                        if (options.dimensions) {
                            if (options.dimensions && !Object(belter_src.isPx)(options.dimensions.width) && !Object(belter_src.isPerc)(options.dimensions.width)) throw new Error("Expected options.dimensions.width to be a px or % string value");
                            if (options.dimensions && !Object(belter_src.isPx)(options.dimensions.height) && !Object(belter_src.isPerc)(options.dimensions.height)) throw new Error("Expected options.dimensions.height to be a px or % string value");
                        }
                        if (options.contexts) {
                            options.contexts.popup;
                            for (var anyEnabled = !1, _i4 = 0, _Object$keys4 = Object.keys(options.contexts), _length4 = null == _Object$keys4 ? 0 : _Object$keys4.length; _i4 < _length4; _i4++) {
                                var context = _Object$keys4[_i4];
                                if (-1 === CONTEXT_TYPES_LIST.indexOf(context)) throw new Error("Unsupported context type: " + context);
                                (options.contexts && options.contexts[context] || options.contexts && void 0 === options.contexts[context]) && (anyEnabled = !0);
                            }
                            if (!anyEnabled) throw new Error("No context type is enabled");
                        }
                        if (options.defaultContext) {
                            if (-1 === CONTEXT_TYPES_LIST.indexOf(options.defaultContext)) throw new Error("Unsupported context type: " + (options.defaultContext || "unknown"));
                            if (options.contexts && options.defaultContext && !options.contexts[options.defaultContext]) throw new Error("Disallowed default context type: " + (options.defaultContext || "unknown"));
                        }
                        if (options.defaultEnv) {
                            if ("string" != typeof options.defaultEnv) throw new TypeError("Expected options.defaultEnv to be a string");
                            if ("object" !== validate__typeof(options.url)) throw new TypeError("Expected options.url to be an object mapping env->url");
                            if (options.url && "object" === validate__typeof(options.url) && !options.url[options.defaultEnv]) throw new Error("No url found for default env: " + options.defaultEnv);
                        }
                        if (!options.url) throw new Error("Must pass url");
                        if ("object" === validate__typeof(options.url)) {
                            if (!options.defaultEnv) throw new Error("Must pass options.defaultEnv with env->url mapping");
                            for (var _i6 = 0, _Object$keys6 = Object.keys(options.url), _length6 = null == _Object$keys6 ? 0 : _Object$keys6.length; _i6 < _length6; _i6++) {
                                var env = _Object$keys6[_i6];
                                if (!options.url[env]) throw new Error("No url specified for env: " + env);
                            }
                        }
                        if (options.prerenderTemplate && "function" != typeof options.prerenderTemplate) throw new Error("Expected options.prerenderTemplate to be a function");
                        if (options.containerTemplate && "function" != typeof options.containerTemplate) throw new Error("Expected options.containerTemplate to be a function");
                    }(options);
                    this.addProp(options, "tag");
                    this.addProp(options, "allowedParentDomains", constants_WILDCARD);
                    if (Component.components[this.tag]) throw new Error("Can not register multiple components with the same tag");
                    this.addProp(options, "name", this.tag.replace(/-/g, "_"));
                    this.builtinProps = {
                        env: {
                            type: "string",
                            queryParam: !0,
                            required: !1,
                            def: function(props, component) {
                                return component.defaultEnv;
                            }
                        },
                        uid: {
                            type: "string",
                            def: function() {
                                return Object(belter_src.uniqueID)();
                            },
                            queryParam: !0
                        },
                        dimensions: {
                            type: "object",
                            required: !1
                        },
                        timeout: {
                            type: "number",
                            required: !1,
                            sendToChild: !1
                        },
                        onDisplay: {
                            type: "function",
                            required: !1,
                            sendToChild: !1,
                            def: function() {
                                return belter_src.noop;
                            },
                            decorate: function(onDisplay) {
                                return Object(belter_src.memoize)(Object(belter_src.promisify)(onDisplay));
                            }
                        },
                        onEnter: {
                            type: "function",
                            required: !1,
                            sendToChild: !1,
                            def: function() {
                                return belter_src.noop;
                            },
                            decorate: function(onEnter) {
                                return Object(belter_src.promisify)(onEnter);
                            }
                        },
                        onRender: {
                            type: "function",
                            required: !1,
                            sendToChild: !1,
                            def: function() {
                                return belter_src.noop;
                            },
                            decorate: function(onRender) {
                                return Object(belter_src.promisify)(onRender);
                            }
                        },
                        onClose: {
                            type: "function",
                            required: !1,
                            sendToChild: !1,
                            def: function() {
                                return belter_src.noop;
                            },
                            decorate: function(onClose) {
                                return Object(belter_src.once)(Object(belter_src.promisify)(onClose));
                            }
                        },
                        onError: {
                            type: "function",
                            required: !1,
                            sendToChild: !0,
                            def: function() {
                                return function(err) {
                                    setTimeout(function() {
                                        throw err;
                                    });
                                };
                            },
                            decorate: function(onError) {
                                return Object(belter_src.once)(Object(belter_src.promisify)(onError));
                            }
                        }
                    };
                    this.props = options.props || {};
                    options.props || (this.looseProps = !0);
                    this.addProp(options, "dimensions");
                    this.addProp(options, "scrolling");
                    this.addProp(options, "listenForResize");
                    this.addProp(options, "defaultEnv");
                    this.addProp(options, "url", options.buildUrl);
                    this.addProp(options, "domain");
                    this.addProp(options, "bridgeUrl");
                    this.addProp(options, "attributes", {});
                    this.addProp(options, "contexts", {
                        iframe: !0,
                        popup: !1
                    });
                    this.addProp(options, "defaultContext");
                    this.addProp(options, "autoResize", !1);
                    this.addProp(options, "containerTemplate", defaultContainerTemplate);
                    this.addProp(options, "prerenderTemplate", defaultPrerenderTemplate);
                    this.addProp(options, "validate");
                    Component.components[this.tag] = this;
                    this.registerDrivers();
                    this.registerChild();
                    this.listenDelegate();
                }
                Component.prototype.addProp = function(options, name, def) {
                    Object(belter_src.copyProp)(options, this, name, def);
                };
                Component.prototype.getPropNames = function() {
                    for (var props = Object.keys(this.props), _i2 = 0, _Object$keys2 = Object.keys(this.builtinProps), _length2 = null == _Object$keys2 ? 0 : _Object$keys2.length; _i2 < _length2; _i2++) {
                        var key = _Object$keys2[_i2];
                        -1 === props.indexOf(key) && props.push(key);
                    }
                    return props;
                };
                Component.prototype.getProp = function(name) {
                    return this.props[name] || this.builtinProps[name];
                };
                Component.prototype.registerDrivers = function() {
                    this.driverCache = {};
                    for (var _i4 = 0, _Object$keys4 = Object.keys(component_drivers), _length4 = null == _Object$keys4 ? 0 : _Object$keys4.length; _i4 < _length4; _i4++) {
                        var driverName = _Object$keys4[_i4];
                        if (0 !== driverName.indexOf("_")) {
                            var glob = component_drivers[driverName].global();
                            glob && this.driver(driverName, glob);
                        }
                    }
                };
                Component.prototype.driver = function(name, dep) {
                    if (!component_drivers[name]) throw new Error("Could not find driver for framework: " + name);
                    this.driverCache[name] || (this.driverCache[name] = component_drivers[name].register(this, dep));
                    return this.driverCache[name];
                };
                Component.prototype.registerChild = function() {
                    var _this = this;
                    return src.a.try(function() {
                        if (_this.isChild()) return new child_ChildComponent(_this);
                    });
                };
                Component.prototype.listenDelegate = function() {
                    var _this2 = this;
                    _on(POST_MESSAGE.ALLOW_DELEGATE + "_" + this.name, function() {
                        return !0;
                    });
                    _on(POST_MESSAGE.DELEGATE + "_" + this.name, function(_ref) {
                        var source = _ref.source, data = _ref.data, delegate = _this2.delegate(source, data.options);
                        return {
                            overrides: delegate.getOverrides(data.context),
                            destroy: function() {
                                return delegate.destroy();
                            }
                        };
                    });
                };
                Component.prototype.canRenderTo = function(win) {
                    return _send(win, POST_MESSAGE.ALLOW_DELEGATE + "_" + this.name).then(function(_ref2) {
                        return _ref2.data;
                    }).catch(function() {
                        return !1;
                    });
                };
                Component.prototype.getUrl = function(props) {
                    if ("function" == typeof this.url) return this.url(props);
                    if ("string" == typeof this.url) return this.url;
                    var env = props.env || this.defaultEnv;
                    if (env && "object" === component__typeof(this.url) && this.url[env]) return this.url[env];
                    throw new Error("Can not find url");
                };
                Component.prototype.getDomain = function(props) {
                    if ("string" == typeof this.domain) return this.domain;
                    var env = props.env || this.defaultEnv;
                    return env && "object" === component__typeof(this.domain) && this.domain[env] ? this.domain[env] : Object(cross_domain_utils_src.getDomainFromUrl)(this.getUrl(props));
                };
                Component.prototype.getBridgeUrl = function(props) {
                    if (this.bridgeUrl) {
                        if ("string" == typeof this.bridgeUrl) return this.bridgeUrl;
                        var env = props.env || this.defaultEnv;
                        if (env && "object" === component__typeof(this.bridgeUrl) && this.bridgeUrl[env]) return this.bridgeUrl[env];
                    }
                };
                Component.prototype.isZoidComponent = function() {
                    return isZoidComponentWindow();
                };
                Component.prototype.isChild = function() {
                    return isZoidComponentWindow() && getComponentMeta().tag === this.tag;
                };
                Component.prototype.createError = function(message, tag) {
                    return new Error("[" + (tag || this.tag) + "] " + message);
                };
                Component.prototype.init = function(props, context, element) {
                    return new parent_ParentComponent(this, this.getRenderContext(context, element), {
                        props: props
                    });
                };
                Component.prototype.delegate = function(source, options) {
                    return new delegate_DelegateComponent(this, source, options);
                };
                Component.prototype.validateRenderContext = function(context, element) {
                    if (context && !this.contexts[context]) throw new Error("[" + this.tag + "] Can not render to " + context);
                    if (!element && context === CONTEXT_TYPES.IFRAME) throw new Error("[" + this.tag + "] Context type " + CONTEXT_TYPES.IFRAME + " requires an element selector");
                };
                Component.prototype.getDefaultContext = function() {
                    if (this.defaultContext) return this.defaultContext;
                    if (this.contexts[CONTEXT_TYPES.IFRAME]) return CONTEXT_TYPES.IFRAME;
                    if (this.contexts[CONTEXT_TYPES.POPUP]) return CONTEXT_TYPES.POPUP;
                    throw new Error("Can not determine default context");
                };
                Component.prototype.getRenderContext = function(context, element) {
                    context = context || this.getDefaultContext();
                    this.validateRenderContext(context, element);
                    return context;
                };
                Component.prototype.render = function(props, element) {
                    var _this3 = this;
                    return src.a.try(function() {
                        return new parent_ParentComponent(_this3, _this3.getRenderContext(null, element), {
                            props: props
                        }).render(element);
                    });
                };
                Component.prototype.renderIframe = function(props, element) {
                    var _this4 = this;
                    return src.a.try(function() {
                        return new parent_ParentComponent(_this4, _this4.getRenderContext(CONTEXT_TYPES.IFRAME, element), {
                            props: props
                        }).render(element);
                    });
                };
                Component.prototype.renderPopup = function(props) {
                    var _this5 = this;
                    return src.a.try(function() {
                        return new parent_ParentComponent(_this5, _this5.getRenderContext(CONTEXT_TYPES.POPUP), {
                            props: props
                        }).render();
                    });
                };
                Component.prototype.renderTo = function(win, props, element) {
                    var _this6 = this;
                    return src.a.try(function() {
                        return new parent_ParentComponent(_this6, _this6.getRenderContext(null, element), {
                            props: props
                        }).renderTo(win, element);
                    });
                };
                Component.prototype.renderIframeTo = function(win, props, element) {
                    var _this7 = this;
                    return src.a.try(function() {
                        return new parent_ParentComponent(_this7, _this7.getRenderContext(CONTEXT_TYPES.IFRAME, element), {
                            props: props
                        }).renderTo(win, element);
                    });
                };
                Component.prototype.renderPopupTo = function(win, props) {
                    var _this8 = this;
                    return src.a.try(function() {
                        return new parent_ParentComponent(_this8, _this8.getRenderContext(CONTEXT_TYPES.POPUP), {
                            props: props
                        }).renderTo(win);
                    });
                };
                Component.prototype.log = function(event) {
                    var payload = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    !function(name, event) {
                        var payload = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                        logger && logger.info("xc_" + name + "_" + event, payload);
                    }(this.name, event, payload);
                };
                Component.prototype.logWarning = function(event, payload) {
                    !function(name, event) {
                        var payload = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                        logger && logger.warn("xc_" + name + "_" + event, payload);
                    }(this.name, event, payload);
                };
                Component.prototype.logError = function(event, payload) {
                    !function(name, event) {
                        var payload = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                        logger && logger.error("xc_" + name + "_" + event, payload);
                    }(this.name, event, payload);
                };
                Component.getByTag = function(tag) {
                    return Component.components[tag];
                };
                return Component;
            }()).prototype, 0, [ belter_src.memoize ], Object.getOwnPropertyDescriptor(component__class.prototype, "getPropNames"), component__class.prototype), 
            component__class);
            component_Component.components = {};
            function create(options) {
                return new component_Component(options);
            }
            function getByTag(tag) {
                return component_Component.getByTag(tag);
            }
            function interface_destroyAll() {
                return parent_ParentComponent.destroyAll();
            }
            var postRobot = post_robot_src_namespaceObject, CONSTANTS = src_constants_namespaceObject;
            __webpack_require__.d(__webpack_exports__, "PopupOpenError", function() {
                return belter_src.PopupOpenError;
            });
            __webpack_require__.d(__webpack_exports__, "create", function() {
                return create;
            });
            __webpack_require__.d(__webpack_exports__, "getByTag", function() {
                return getByTag;
            });
            __webpack_require__.d(__webpack_exports__, "getCurrentScriptDir", function() {
                return getCurrentScriptDir;
            });
            __webpack_require__.d(__webpack_exports__, "useLogger", function() {
                return useLogger;
            });
            __webpack_require__.d(__webpack_exports__, "destroyAll", function() {
                return interface_destroyAll;
            });
            __webpack_require__.d(__webpack_exports__, "postRobot", function() {
                return postRobot;
            });
            __webpack_require__.d(__webpack_exports__, "CONSTANTS", function() {
                return CONSTANTS;
            });
            __webpack_exports__.default = src_interface_namespaceObject;
        },
        "./src/types.js": function(module, exports) {}
    });
});
//# sourceMappingURL=zoid.js.map