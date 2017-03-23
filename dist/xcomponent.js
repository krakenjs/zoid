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
            return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
            module.l = !0, module.exports;
        }
        var installedModules = {};
        return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
        __webpack_require__.i = function(value) {
            return value;
        }, __webpack_require__.d = function(exports, name, getter) {
            __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
                configurable: !1,
                enumerable: !0,
                get: getter
            });
        }, __webpack_require__.n = function(module) {
            var getter = module && module.__esModule ? function() {
                return module.default;
            } : function() {
                return module;
            };
            return __webpack_require__.d(getter, "a", getter), getter;
        }, __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 74);
    }([ /*!****************************************!*\
  !*** ./~/post-robot/src/conf/index.js ***!
  \****************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _config = __webpack_require__(/*! ./config */ 46);
        Object.keys(_config).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _config[key];
                }
            });
        });
        var _constants = __webpack_require__(/*! ./constants */ 26);
        Object.keys(_constants).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _constants[key];
                }
            });
        });
    }, /*!**************************!*\
  !*** ./src/lib/index.js ***!
  \**************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _dom = __webpack_require__(/*! ./dom */ 70);
        Object.keys(_dom).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _dom[key];
                }
            });
        });
        var _fn = __webpack_require__(/*! ./fn */ 36);
        Object.keys(_fn).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _fn[key];
                }
            });
        });
        var _promise = __webpack_require__(/*! ./promise */ 71);
        Object.keys(_promise).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _promise[key];
                }
            });
        });
        var _util = __webpack_require__(/*! ./util */ 23);
        Object.keys(_util).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _util[key];
                }
            });
        });
        var _css = __webpack_require__(/*! ./css */ 68);
        Object.keys(_css).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _css[key];
                }
            });
        });
        var _decorators = __webpack_require__(/*! ./decorators */ 69);
        Object.keys(_decorators).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _decorators[key];
                }
            });
        });
    }, /*!***************************************!*\
  !*** ./~/post-robot/src/lib/index.js ***!
  \***************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _promise = __webpack_require__(/*! ./promise */ 30);
        Object.keys(_promise).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _promise[key];
                }
            });
        });
        var _util = __webpack_require__(/*! ./util */ 8);
        Object.keys(_util).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _util[key];
                }
            });
        });
        var _log = __webpack_require__(/*! ./log */ 20);
        Object.keys(_log).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _log[key];
                }
            });
        });
        var _windows = __webpack_require__(/*! ./windows */ 14);
        Object.keys(_windows).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _windows[key];
                }
            });
        });
        var _methods = __webpack_require__(/*! ./methods */ 53);
        Object.keys(_methods).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _methods[key];
                }
            });
        });
        var _tick = __webpack_require__(/*! ./tick */ 31);
        Object.keys(_tick).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _tick[key];
                }
            });
        });
        var _ready = __webpack_require__(/*! ./ready */ 54);
        Object.keys(_ready).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _ready[key];
                }
            });
        });
        var _cleanup = __webpack_require__(/*! ./cleanup */ 29);
        Object.keys(_cleanup).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _cleanup[key];
                }
            });
        });
    }, /*!*********************************************!*\
  !*** ./~/sync-browser-mocks/src/promise.js ***!
  \*********************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        function trycatch(method, successHandler, errorHandler) {
            function flush() {
                if (isCalled) {
                    if (isError) return errorHandler(err);
                    if (isSuccess) return successHandler(res);
                }
            }
            var isCalled = !1, isSuccess = !1, isError = !1, err = void 0, res = void 0;
            try {
                method(function(result) {
                    res = result, isSuccess = !0, flush();
                }, function(error) {
                    err = error, isError = !0, flush();
                });
            } catch (error) {
                return errorHandler(error);
            }
            isCalled = !0, flush();
        }
        function addPossiblyUnhandledPromise(promise) {
            possiblyUnhandledPromises.push(promise), possiblyUnhandledPromiseTimeout = possiblyUnhandledPromiseTimeout || setTimeout(flushPossiblyUnhandledPromises, 1);
        }
        function flushPossiblyUnhandledPromises() {
            possiblyUnhandledPromiseTimeout = null;
            var promises = possiblyUnhandledPromises;
            possiblyUnhandledPromises = [];
            for (var _loop = function(i) {
                var promise = promises[i];
                return promise.silentReject ? "continue" : (promise.handlers.push({
                    onError: function(err) {
                        promise.silentReject || dispatchError(err);
                    }
                }), void promise.dispatch());
            }, i = 0; i < promises.length; i++) {
                _loop(i);
            }
        }
        function dispatchError(err) {
            if (dispatchedErrors.indexOf(err) === -1) {
                dispatchedErrors.push(err), setTimeout(function() {
                    throw err;
                }, 1);
                for (var j = 0; j < possiblyUnhandledPromiseHandlers.length; j++) possiblyUnhandledPromiseHandlers[j](err);
            }
        }
        function isPromise(item) {
            try {
                if (!item) return !1;
                if (window.Window && item instanceof window.Window) return !1;
                if (window.constructor && item instanceof window.constructor) return !1;
                if (toString) {
                    var name = toString.call(item);
                    if ("[object Window]" === name || "[object global]" === name || "[object DOMWindow]" === name) return !1;
                }
                if (item && item.then instanceof Function) return !0;
            } catch (err) {
                return !1;
            }
            return !1;
        }
        function patchPromise() {
            window.Promise = SyncPromise;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.patchPromise = patchPromise;
        var possiblyUnhandledPromiseHandlers = [], possiblyUnhandledPromises = [], possiblyUnhandledPromiseTimeout = void 0, dispatchedErrors = [], toString = {}.toString, SyncPromise = exports.SyncPromise = function(handler) {
            if (this.resolved = !1, this.rejected = !1, this.silentReject = !1, this.handlers = [], 
            addPossiblyUnhandledPromise(this), handler) {
                var self = this;
                trycatch(handler, function(res) {
                    return self.resolve(res);
                }, function(err) {
                    return self.reject(err);
                });
            }
        };
        SyncPromise.resolve = function(value) {
            return isPromise(value) ? value : new SyncPromise().resolve(value);
        }, SyncPromise.reject = function(error) {
            return new SyncPromise().reject(error);
        }, SyncPromise.prototype.resolve = function(result) {
            if (this.resolved || this.rejected) return this;
            if (isPromise(result)) throw new Error("Can not resolve promise with another promise");
            return this.resolved = !0, this.value = result, this.dispatch(), this;
        }, SyncPromise.prototype.reject = function(error) {
            if (this.resolved || this.rejected) return this;
            if (isPromise(error)) throw new Error("Can not reject promise with another promise");
            return this.rejected = !0, this.value = error, this.dispatch(), this;
        }, SyncPromise.prototype.asyncReject = function(error) {
            this.silentReject = !0, this.reject(error);
        }, SyncPromise.prototype.dispatch = function() {
            var _this = this;
            if (this.resolved || this.rejected) for (var _loop2 = function() {
                var handler = _this.handlers.shift(), result = void 0, error = void 0;
                try {
                    _this.resolved ? result = handler.onSuccess ? handler.onSuccess(_this.value) : _this.value : _this.rejected && (handler.onError ? result = handler.onError(_this.value) : error = _this.value);
                } catch (err) {
                    error = err;
                }
                if (result === _this) throw new Error("Can not return a promise from the the then handler of the same promise");
                return handler.promise ? void (error ? handler.promise.reject(error) : isPromise(result) ? result.then(function(res) {
                    handler.promise.resolve(res);
                }, function(err) {
                    handler.promise.reject(err);
                }) : handler.promise.resolve(result)) : "continue";
            }; this.handlers.length; ) {
                _loop2();
            }
        }, SyncPromise.prototype.then = function(onSuccess, onError) {
            if (onSuccess && "function" != typeof onSuccess && !onSuccess.call) throw new Error("Promise.then expected a function for success handler");
            if (onError && "function" != typeof onError && !onError.call) throw new Error("Promise.then expected a function for error handler");
            var promise = new SyncPromise(null, this);
            return this.handlers.push({
                promise: promise,
                onSuccess: onSuccess,
                onError: onError
            }), this.silentReject = !0, this.dispatch(), promise;
        }, SyncPromise.prototype.catch = function(onError) {
            return this.then(null, onError);
        }, SyncPromise.prototype.finally = function(handler) {
            return this.then(function(result) {
                return SyncPromise.try(handler).then(function() {
                    return result;
                });
            }, function(err) {
                return SyncPromise.try(handler).then(function() {
                    throw err;
                });
            });
        }, SyncPromise.all = function(promises) {
            for (var promise = new SyncPromise(), count = promises.length, results = [], _loop3 = function(i) {
                var prom = isPromise(promises[i]) ? promises[i] : SyncPromise.resolve(promises[i]);
                prom.then(function(result) {
                    results[i] = result, count -= 1, 0 === count && promise.resolve(results);
                }, function(err) {
                    promise.reject(err);
                });
            }, i = 0; i < promises.length; i++) _loop3(i);
            return count || promise.resolve(results), promise;
        }, SyncPromise.onPossiblyUnhandledException = function(handler) {
            possiblyUnhandledPromiseHandlers.push(handler);
        }, SyncPromise.try = function(method) {
            return SyncPromise.resolve().then(method);
        }, SyncPromise.delay = function(delay) {
            return new SyncPromise(function(resolve) {
                setTimeout(resolve, delay);
            });
        }, SyncPromise.hash = function(obj) {
            var results = {}, promises = [], _loop4 = function(key) {
                obj.hasOwnProperty(key) && promises.push(SyncPromise.resolve(obj[key]).then(function(result) {
                    results[key] = result;
                }));
            };
            for (var key in obj) _loop4(key);
            return SyncPromise.all(promises).then(function() {
                return results;
            });
        }, SyncPromise.promisifyCall = function() {
            var args = Array.prototype.slice.call(arguments), method = args.shift();
            if ("function" != typeof method) throw new Error("Expected promisifyCall to be called with a function");
            return new SyncPromise(function(resolve, reject) {
                return args.push(function(err, result) {
                    return err ? reject(err) : resolve(result);
                }), method.apply(null, args);
            });
        };
    }, /*!************************************!*\
  !*** ./~/post-robot/src/global.js ***!
  \************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.global = void 0;
        var _conf = __webpack_require__(/*! ./conf */ 0), _cleanup = __webpack_require__(/*! ./lib/cleanup */ 29), global = exports.global = window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT] = window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT] || {};
        global.clean = global.clean || (0, _cleanup.cleanup)(global), global.registerSelf = function() {};
    }, /*!***********************************!*\
  !*** ./~/post-robot/src/index.js ***!
  \***********************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        function init() {
            _global.global.initialized || ((0, _drivers.listenForMessages)(), (0, _bridge.openTunnelToOpener)(), 
            (0, _lib.initOnReady)(), (0, _lib.listenForMethods)()), _global.global.initialized = !0;
        }
        function reset() {
            return _global.global.clean.all().then(function() {
                return _global.global.initialized = !1, init();
            });
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.Promise = void 0, exports.init = init, exports.reset = reset;
        var _interface = __webpack_require__(/*! ./interface */ 10);
        Object.keys(_interface).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _interface[key];
                }
            });
        });
        var _lib = __webpack_require__(/*! ./lib */ 2);
        Object.defineProperty(exports, "Promise", {
            enumerable: !0,
            get: function() {
                return _lib.Promise;
            }
        });
        var _drivers = __webpack_require__(/*! ./drivers */ 6), _global = __webpack_require__(/*! ./global */ 4), _bridge = __webpack_require__(/*! ./bridge */ 19);
        init(), exports.default = module.exports;
    }, /*!*******************************************!*\
  !*** ./~/post-robot/src/drivers/index.js ***!
  \*******************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _receive = __webpack_require__(/*! ./receive */ 47);
        Object.keys(_receive).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _receive[key];
                }
            });
        });
        var _send = __webpack_require__(/*! ./send */ 28);
        Object.keys(_send).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _send[key];
                }
            });
        });
        var _listeners = __webpack_require__(/*! ./listeners */ 27);
        Object.keys(_listeners).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _listeners[key];
                }
            });
        });
    }, /*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.DELEGATE = exports.CONTEXT_TYPES_LIST = exports.CLOSE_REASONS = exports.EVENT_NAMES = exports.ANIMATION_NAMES = exports.CLASS_NAMES = exports.CONTEXT_TYPES = exports.PROP_TYPES_LIST = exports.WINDOW_REFERENCES = exports.INITIAL_PROPS = exports.PROP_TYPES = exports.POST_MESSAGE = exports.__XCOMPONENT__ = exports.XCOMPONENT = void 0;
        var _lib = __webpack_require__(/*! ./lib */ 1), XCOMPONENT = exports.XCOMPONENT = "xcomponent", PROP_TYPES = (exports.__XCOMPONENT__ = "__" + XCOMPONENT + "__", 
        exports.POST_MESSAGE = {
            INIT: XCOMPONENT + "_init",
            PROPS: XCOMPONENT + "_props",
            PROP_CALLBACK: XCOMPONENT + "_prop_callback",
            CLOSE: XCOMPONENT + "_close",
            REDIRECT: XCOMPONENT + "_redirect",
            RESIZE: XCOMPONENT + "_resize",
            DELEGATE: XCOMPONENT + "_delegate",
            ERROR: XCOMPONENT + "_error",
            HIDE: XCOMPONENT + "_hide",
            SHOW: XCOMPONENT + "_show"
        }, exports.PROP_TYPES = {
            STRING: "string",
            OBJECT: "object",
            FUNCTION: "function",
            BOOLEAN: "boolean",
            NUMBER: "number"
        }), CONTEXT_TYPES = (exports.INITIAL_PROPS = {
            RAW: "raw",
            UID: "uid"
        }, exports.WINDOW_REFERENCES = {
            DIRECT_PARENT: "__direct_parent__",
            PARENT_PARENT: "__parent_parent__",
            PARENT_UID: "__parent_uid__"
        }, exports.PROP_TYPES_LIST = (0, _lib.values)(PROP_TYPES), exports.CONTEXT_TYPES = {
            IFRAME: "iframe",
            LIGHTBOX: "lightbox",
            POPUP: "popup"
        });
        exports.CLASS_NAMES = {
            XCOMPONENT: "" + XCOMPONENT,
            COMPONENT: XCOMPONENT + "-component",
            CLOSE: XCOMPONENT + "-close",
            FOCUS: XCOMPONENT + "-focus",
            ELEMENT: XCOMPONENT + "-element",
            IFRAME: XCOMPONENT + "-iframe",
            LIGHTBOX: XCOMPONENT + "-lightbox",
            POPUP: XCOMPONENT + "-popup",
            LOADING: XCOMPONENT + "-loading",
            SHOW_CONTAINER: XCOMPONENT + "-show-container",
            SHOW_COMPONENT: XCOMPONENT + "-show-component",
            HIDE_CONTAINER: XCOMPONENT + "-hide-container",
            HIDE_COMPONENT: XCOMPONENT + "-hide-component"
        }, exports.ANIMATION_NAMES = {
            SHOW_CONTAINER: XCOMPONENT + "-show-container",
            SHOW_COMPONENT: XCOMPONENT + "-show-component",
            HIDE_CONTAINER: XCOMPONENT + "-hide-container",
            HIDE_COMPONENT: XCOMPONENT + "-hide-component"
        }, exports.EVENT_NAMES = {
            CLICK: "click"
        }, exports.CLOSE_REASONS = {
            PARENT_CALL: "parent_call",
            CHILD_CALL: "child_call",
            CLOSE_DETECTED: "close_detected",
            USER_CLOSED: "user_closed",
            PARENT_CLOSE_DETECTED: "parent_close_detected"
        }, exports.CONTEXT_TYPES_LIST = (0, _lib.values)(CONTEXT_TYPES), exports.DELEGATE = {
            CALL_ORIGINAL: "call_original",
            CALL_DELEGATE: "call_delegate"
        };
    }, /*!**************************************!*\
  !*** ./~/post-robot/src/lib/util.js ***!
  \**************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.util = void 0;
        var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        }, _conf = __webpack_require__(/*! ../conf */ 0), util = exports.util = {
            once: function(method) {
                if (!method) return method;
                var called = !1;
                return function() {
                    if (!called) return called = !0, method.apply(this, arguments);
                };
            },
            noop: function() {},
            safeHasProp: function(obj, name) {
                try {
                    return !!obj[name];
                } catch (err) {
                    return !1;
                }
            },
            safeGetProp: function(obj, name) {
                try {
                    return obj[name];
                } catch (err) {
                    return;
                }
            },
            listen: function(win, event, handler) {
                return win.addEventListener ? win.addEventListener(event, handler) : win.attachEvent("on" + event, handler), 
                {
                    cancel: function() {
                        win.removeEventListener ? win.removeEventListener(event, handler) : win.detachEvent("on" + event, handler);
                    }
                };
            },
            apply: function(method, context, args) {
                return "function" == typeof method.apply ? method.apply(context, args) : method(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9]);
            },
            find: function(collection, method, def) {
                if (!collection) return def;
                for (var i = 0; i < collection.length; i++) if (method(collection[i])) return collection[i];
                return def;
            },
            map: function(collection, method) {
                for (var results = [], i = 0; i < collection.length; i++) results.push(method(collection[i]));
                return results;
            },
            some: function(collection, method) {
                method = method || Boolean;
                for (var i = 0; i < collection.length; i++) if (method(collection[i])) return !0;
                return !1;
            },
            keys: function(mapping) {
                var result = [];
                for (var key in mapping) mapping.hasOwnProperty(key) && result.push(key);
                return result;
            },
            values: function(mapping) {
                var result = [];
                for (var key in mapping) mapping.hasOwnProperty(key) && result.push(mapping[key]);
                return result;
            },
            getByValue: function(mapping, value) {
                for (var key in mapping) if (mapping.hasOwnProperty(key) && mapping[key] === value) return key;
            },
            uniqueID: function() {
                var chars = "0123456789abcdef";
                return "xxxxxxxxxx".replace(/./g, function() {
                    return chars.charAt(Math.floor(Math.random() * chars.length));
                });
            },
            memoize: function(method) {
                var results = {};
                return function() {
                    var args = JSON.stringify(Array.prototype.slice.call(arguments));
                    return results.hasOwnProperty(args) || (results[args] = method.apply(this, arguments)), 
                    results[args];
                };
            },
            extend: function(obj, source) {
                if (!source) return obj;
                for (var key in source) source.hasOwnProperty(key) && (obj[key] = source[key]);
                return obj;
            },
            each: function(obj, callback) {
                if (Array.isArray(obj)) for (var i = 0; i < obj.length; i++) callback(obj[i], i); else if ("object" === ("undefined" == typeof obj ? "undefined" : _typeof(obj)) && null !== obj) for (var key in obj) obj.hasOwnProperty(key) && callback(obj[key], key);
            },
            replaceObject: function(obj, callback) {
                var depth = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
                if (depth >= 100) throw new Error("Self-referential object passed, or object contained too many layers");
                var newobj = Array.isArray(obj) ? [] : {};
                return util.each(obj, function(item, key) {
                    var result = callback(item, key);
                    void 0 !== result ? newobj[key] = result : "object" === ("undefined" == typeof item ? "undefined" : _typeof(item)) && null !== item ? newobj[key] = util.replaceObject(item, callback, depth + 1) : newobj[key] = item;
                }), newobj;
            },
            safeInterval: function(method, time) {
                function runInterval() {
                    timeout = setTimeout(runInterval, time), method.call();
                }
                var timeout = void 0;
                return timeout = setTimeout(runInterval, time), {
                    cancel: function() {
                        clearTimeout(timeout);
                    }
                };
            },
            intervalTimeout: function(time, interval, method) {
                var safeInterval = util.safeInterval(function() {
                    time -= interval, time = time <= 0 ? 0 : time, 0 === time && safeInterval.cancel(), 
                    method(time);
                }, interval);
                return safeInterval;
            },
            getDomain: function(win) {
                if (win = win || window, win.mockDomain && 0 === win.mockDomain.indexOf(_conf.CONSTANTS.MOCK_PROTOCOL)) return win.mockDomain;
                if (!win.location.protocol) throw new Error("Can not read window protocol");
                if (win.location.protocol === _conf.CONSTANTS.FILE_PROTOCOL) return win.location.protocol + "//" + win.location.host;
                if (!win.location.host) throw new Error("Can not read window host");
                return win.location.protocol + "//" + win.location.host;
            },
            getDomainFromUrl: function(url) {
                var domain = void 0;
                return url.match(/^(https?|mock|file):\/\//) ? (domain = url, domain = domain.split("/").slice(0, 3).join("/")) : this.getDomain();
            },
            safeGet: function(obj, prop) {
                var result = void 0;
                try {
                    result = obj[prop];
                } catch (err) {}
                return result;
            }
        };
    }, /*!******************************************!*\
  !*** ./~/beaver-logger/client/config.js ***!
  \******************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        exports.config = {
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
            logLevel: "debug",
            autoLog: [ "warn", "error" ],
            logUnload: !0,
            logUnloadSync: !1,
            logPerformance: !0
        }, exports.logLevels = [ "error", "warn", "info", "debug" ];
    }, /*!*********************************************!*\
  !*** ./~/post-robot/src/interface/index.js ***!
  \*********************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) return obj;
            var newObj = {};
            if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
            return newObj.default = obj, newObj;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.winutil = exports.util = exports.destroyBridges = exports.openTunnelToOpener = exports.needsBridgeForDomain = exports.needsBridgeForWin = exports.needsBridgeForBrowser = exports.needsBridge = exports.isBridge = exports.linkUrl = exports.openBridge = exports.parent = void 0;
        var _client = __webpack_require__(/*! ./client */ 50);
        Object.keys(_client).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _client[key];
                }
            });
        });
        var _server = __webpack_require__(/*! ./server */ 52);
        Object.keys(_server).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _server[key];
                }
            });
        });
        var _config = __webpack_require__(/*! ./config */ 51);
        Object.keys(_config).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _config[key];
                }
            });
        });
        var _bridge = __webpack_require__(/*! ../bridge */ 19);
        Object.defineProperty(exports, "openBridge", {
            enumerable: !0,
            get: function() {
                return _bridge.openBridge;
            }
        }), Object.defineProperty(exports, "linkUrl", {
            enumerable: !0,
            get: function() {
                return _bridge.linkUrl;
            }
        }), Object.defineProperty(exports, "isBridge", {
            enumerable: !0,
            get: function() {
                return _bridge.isBridge;
            }
        }), Object.defineProperty(exports, "needsBridge", {
            enumerable: !0,
            get: function() {
                return _bridge.needsBridge;
            }
        }), Object.defineProperty(exports, "needsBridgeForBrowser", {
            enumerable: !0,
            get: function() {
                return _bridge.needsBridgeForBrowser;
            }
        }), Object.defineProperty(exports, "needsBridgeForWin", {
            enumerable: !0,
            get: function() {
                return _bridge.needsBridgeForWin;
            }
        }), Object.defineProperty(exports, "needsBridgeForDomain", {
            enumerable: !0,
            get: function() {
                return _bridge.needsBridgeForDomain;
            }
        }), Object.defineProperty(exports, "openTunnelToOpener", {
            enumerable: !0,
            get: function() {
                return _bridge.openTunnelToOpener;
            }
        }), Object.defineProperty(exports, "destroyBridges", {
            enumerable: !0,
            get: function() {
                return _bridge.destroyBridges;
            }
        });
        var _util = __webpack_require__(/*! ../lib/util */ 8);
        Object.defineProperty(exports, "util", {
            enumerable: !0,
            get: function() {
                return _util.util;
            }
        });
        var _windows = __webpack_require__(/*! ../lib/windows */ 14), windowUtil = _interopRequireWildcard(_windows);
        exports.parent = (0, _windows.getAncestor)(), exports.winutil = windowUtil;
    }, /*!********************************************!*\
  !*** ./~/beaver-logger/client/builders.js ***!
  \********************************************/
    function(module, exports, __webpack_require__) {
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
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.addPayloadBuilder = addPayloadBuilder, exports.addMetaBuilder = addMetaBuilder, 
        exports.addTrackingBuilder = addTrackingBuilder, exports.addHeaderBuilder = addHeaderBuilder;
        var payloadBuilders = exports.payloadBuilders = [], metaBuilders = exports.metaBuilders = [], trackingBuilders = exports.trackingBuilders = [], headerBuilders = exports.headerBuilders = [];
    }, /*!******************************************!*\
  !*** ./~/beaver-logger/client/logger.js ***!
  \******************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        function print(level, event, payload) {
            if (!loaded) return setTimeout(function() {
                return print(level, event, payload);
            }, 1);
            if (window.console && window.console.log) {
                var logLevel = window.LOG_LEVEL || _config.config.logLevel;
                if (!(_config.logLevels.indexOf(level) > _config.logLevels.indexOf(logLevel))) {
                    payload = payload || {};
                    var args = [ event ];
                    args.push(payload), (payload.error || payload.warning) && args.push("\n\n", payload.error || payload.warning), 
                    window.console && (window.console[level] && window.console[level].apply ? window.console[level].apply(window.console, args) : window.console.log && window.console.log.apply && window.console.log.apply(window.console, args));
                }
            }
        }
        function immediateFlush() {
            var async = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
            if (_config.config.uri) {
                var hasBuffer = buffer.length, hasTracking = Object.keys(tracking).length;
                if (hasBuffer || hasTracking) {
                    hasTracking && print("info", "tracking", tracking);
                    for (var meta = {}, _iterator = _builders.metaBuilders, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                        var _ref;
                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref = _iterator[_i++];
                        } else {
                            if (_i = _iterator.next(), _i.done) break;
                            _ref = _i.value;
                        }
                        var builder = _ref;
                        try {
                            (0, _util.extend)(meta, builder(), !1);
                        } catch (err) {
                            console.error("Error in custom meta builder:", err.stack || err.toString());
                        }
                    }
                    for (var _iterator2 = _builders.trackingBuilders, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                        var _ref2;
                        if (_isArray2) {
                            if (_i2 >= _iterator2.length) break;
                            _ref2 = _iterator2[_i2++];
                        } else {
                            if (_i2 = _iterator2.next(), _i2.done) break;
                            _ref2 = _i2.value;
                        }
                        var _builder = _ref2;
                        try {
                            (0, _util.extend)(tracking, _builder(), !1);
                        } catch (err) {
                            console.error("Error in custom tracking builder:", err.stack || err.toString());
                        }
                    }
                    for (var headers = {}, _iterator3 = _builders.headerBuilders, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                        var _ref3;
                        if (_isArray3) {
                            if (_i3 >= _iterator3.length) break;
                            _ref3 = _iterator3[_i3++];
                        } else {
                            if (_i3 = _iterator3.next(), _i3.done) break;
                            _ref3 = _i3.value;
                        }
                        var _builder2 = _ref3;
                        try {
                            (0, _util.extend)(headers, _builder2(), !1);
                        } catch (err) {
                            console.error("Error in custom header builder:", err.stack || err.toString());
                        }
                    }
                    var events = buffer, req = (0, _util.ajax)("post", _config.config.uri, headers, {
                        events: events,
                        meta: meta,
                        tracking: tracking
                    }, async);
                    return exports.buffer = buffer = [], exports.tracking = tracking = {}, req;
                }
            }
        }
        function enqueue(level, event, payload) {
            buffer.push({
                level: level,
                event: event,
                payload: payload
            }), _config.config.autoLog.indexOf(level) > -1 && _flush();
        }
        function log(level, event, payload) {
            _config.config.prefix && (event = _config.config.prefix + "_" + event), payload = payload || {}, 
            "string" == typeof payload ? payload = {
                message: payload
            } : payload instanceof Error && (payload = {
                error: payload.stack || payload.toString()
            }), payload.timestamp = Date.now();
            for (var _iterator4 = _builders.payloadBuilders, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator](); ;) {
                var _ref4;
                if (_isArray4) {
                    if (_i4 >= _iterator4.length) break;
                    _ref4 = _iterator4[_i4++];
                } else {
                    if (_i4 = _iterator4.next(), _i4.done) break;
                    _ref4 = _i4.value;
                }
                var builder = _ref4;
                try {
                    (0, _util.extend)(payload, builder(), !1);
                } catch (err) {
                    console.error("Error in custom payload builder:", err.stack || err.toString());
                }
            }
            _config.config.silent || print(level, event, payload), buffer.length === _config.config.sizeLimit ? enqueue("info", "logger_max_buffer_length") : buffer.length < _config.config.sizeLimit && enqueue(level, event, payload);
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
        function track(payload) {
            (0, _util.extend)(tracking, payload || {}, !1);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.flush = exports.tracking = exports.buffer = void 0;
        var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        exports.print = print, exports.immediateFlush = immediateFlush, exports.log = log, 
        exports.prefix = prefix, exports.debug = debug, exports.info = info, exports.warn = warn, 
        exports.error = error, exports.track = track;
        var _util = __webpack_require__(/*! ./util */ 13), _builders = __webpack_require__(/*! ./builders */ 11), _config = __webpack_require__(/*! ./config */ 9), buffer = exports.buffer = [], tracking = exports.tracking = {};
        Function.prototype.bind && window.console && "object" === _typeof(console.log) && [ "log", "info", "warn", "error" ].forEach(function(method) {
            console[method] = this.bind(console[method], console);
        }, Function.prototype.call);
        var loaded = !1;
        setTimeout(function() {
            loaded = !0;
        }, 1);
        var _flush = (0, _util.promiseDebounce)(immediateFlush, _config.config.debounceInterval);
        exports.flush = _flush;
    }, /*!****************************************!*\
  !*** ./~/beaver-logger/client/util.js ***!
  \****************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        function extend(dest, src) {
            var over = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
            dest = dest || {}, src = src || {};
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
            var headers = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, data = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}, async = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4];
            return new _es6PromiseMin.Promise(function(resolve) {
                var XRequest = window.XMLHttpRequest || window.ActiveXObject;
                if (window.XDomainRequest && !isSameDomain(url)) {
                    if (!isSameProtocol(url)) return resolve();
                    XRequest = window.XDomainRequest;
                }
                var req = new XRequest("MSXML2.XMLHTTP.3.0");
                req.open(method.toUpperCase(), url, async), req.setRequestHeader("X-Requested-With", "XMLHttpRequest"), 
                req.setRequestHeader("Content-type", "application/json");
                for (var headerName in headers) headers.hasOwnProperty(headerName) && req.setRequestHeader(headerName, headers[headerName]);
                req.onreadystatechange = function() {
                    req.readyState > 3 && resolve();
                }, req.send(JSON.stringify(data).replace(/&/g, "%26"));
            });
        }
        function promiseDebounce(method, interval) {
            var debounce = {};
            return function() {
                var args = arguments;
                return debounce.timeout && (clearTimeout(debounce.timeout), delete debounce.timeout), 
                debounce.timeout = setTimeout(function() {
                    var resolver = debounce.resolver, rejector = debounce.rejector;
                    return delete debounce.promise, delete debounce.resolver, delete debounce.rejector, 
                    delete debounce.timeout, _es6PromiseMin.Promise.resolve().then(function() {
                        return method.apply(null, args);
                    }).then(resolver, rejector);
                }, interval), debounce.promise = debounce.promise || new _es6PromiseMin.Promise(function(resolver, rejector) {
                    debounce.resolver = resolver, debounce.rejector = rejector;
                }), debounce.promise;
            };
        }
        function safeInterval(method, time) {
            function loop() {
                timeout = setTimeout(function() {
                    method(), loop();
                }, time);
            }
            var timeout = void 0;
            return loop(), {
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
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.windowReady = void 0, exports.extend = extend, exports.isSameProtocol = isSameProtocol, 
        exports.isSameDomain = isSameDomain, exports.ajax = ajax, exports.promiseDebounce = promiseDebounce, 
        exports.safeInterval = safeInterval, exports.uniqueID = uniqueID;
        var _es6PromiseMin = __webpack_require__(/*! es6-promise-min */ 72);
        exports.windowReady = new _es6PromiseMin.Promise(function(resolve) {
            "complete" === document.readyState && resolve(), window.addEventListener("load", resolve);
        });
    }, /*!*****************************************!*\
  !*** ./~/post-robot/src/lib/windows.js ***!
  \*****************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        function isSameDomain(win) {
            for (var _iterator = _global.global.domainMatches, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                var _ref;
                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    if (_i = _iterator.next(), _i.done) break;
                    _ref = _i.value;
                }
                var _match = _ref;
                if (_match.win === win) return _match.match;
            }
            var match = void 0;
            try {
                match = _util.util.getDomain(window) === _util.util.getDomain(win);
            } catch (err) {
                match = !1;
            }
            return _global.global.clean.push(_global.global.domainMatches, {
                win: win,
                match: match
            }), domainMatchTimeout || (domainMatchTimeout = setTimeout(function() {
                _global.global.domainMatches = [], domainMatchTimeout = null;
            }, 1)), match;
        }
        function getOpener(win) {
            if (win) try {
                return win.opener;
            } catch (err) {
                return;
            }
        }
        function getParent(win) {
            if (win) try {
                if (win.parent && win.parent !== win) return win.parent;
            } catch (err) {
                return;
            }
        }
        function getParents(win) {
            var result = [];
            try {
                for (;win.parent !== win; ) result.push(win.parent), win = win.parent;
            } catch (err) {}
            return result;
        }
        function isAncestorParent(parent, child) {
            if (!parent || !child) return !1;
            var childParent = getParent(child);
            return childParent ? childParent === parent : getParents(child).indexOf(parent) !== -1;
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
            for (var _i2 = 0; _i2 < 100; _i2++) {
                var _frame = void 0;
                try {
                    _frame = frames[_i2];
                } catch (err) {
                    return result;
                }
                if (!_frame) return result;
                result.push(_frame);
            }
            return result;
        }
        function getAllChildFrames(win) {
            for (var result = [], _iterator2 = getFrames(win), _isArray2 = Array.isArray(_iterator2), _i3 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                var _ref2;
                if (_isArray2) {
                    if (_i3 >= _iterator2.length) break;
                    _ref2 = _iterator2[_i3++];
                } else {
                    if (_i3 = _iterator2.next(), _i3.done) break;
                    _ref2 = _i3.value;
                }
                var frame = _ref2;
                result.push(frame);
                for (var _iterator3 = getAllChildFrames(frame), _isArray3 = Array.isArray(_iterator3), _i4 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                    var _ref3;
                    if (_isArray3) {
                        if (_i4 >= _iterator3.length) break;
                        _ref3 = _iterator3[_i4++];
                    } else {
                        if (_i4 = _iterator3.next(), _i4.done) break;
                        _ref3 = _i4.value;
                    }
                    var childFrame = _ref3;
                    result.push(childFrame);
                }
            }
            return result;
        }
        function getAllFramesInWindow(win) {
            var result = getAllChildFrames(win);
            result.push(win);
            for (var _iterator4 = getParents(win), _isArray4 = Array.isArray(_iterator4), _i5 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator](); ;) {
                var _ref4;
                if (_isArray4) {
                    if (_i5 >= _iterator4.length) break;
                    _ref4 = _iterator4[_i5++];
                } else {
                    if (_i5 = _iterator4.next(), _i5.done) break;
                    _ref4 = _i5.value;
                }
                var parent = _ref4;
                result.push(parent);
                for (var _iterator5 = getFrames(parent), _isArray5 = Array.isArray(_iterator5), _i6 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator](); ;) {
                    var _ref5;
                    if (_isArray5) {
                        if (_i6 >= _iterator5.length) break;
                        _ref5 = _iterator5[_i6++];
                    } else {
                        if (_i6 = _iterator5.next(), _i6.done) break;
                        _ref5 = _i6.value;
                    }
                    var frame = _ref5;
                    result.indexOf(frame) === -1 && result.push(frame);
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
                    if (isAncestorParent(window, win)) return window.top;
                } catch (err) {}
                try {
                    if (isAncestorParent(win, window)) return window.top;
                } catch (err) {}
                for (var _iterator6 = getAllChildFrames(win), _isArray6 = Array.isArray(_iterator6), _i7 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator](); ;) {
                    var _ref6;
                    if (_isArray6) {
                        if (_i7 >= _iterator6.length) break;
                        _ref6 = _iterator6[_i7++];
                    } else {
                        if (_i7 = _iterator6.next(), _i7.done) break;
                        _ref6 = _i7.value;
                    }
                    var frame = _ref6;
                    try {
                        if (frame.top) return frame.top;
                    } catch (err) {}
                    if (getParent(frame) === frame) return frame;
                }
            }
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
                return !err || "Call was rejected by callee.\r\n" !== err.message;
            }
            return !!(allowMock && isSameDomain(win) && _util.util.safeGet(win, "mockclosed"));
        }
        function getUserAgent(win) {
            return win = win || window, win.navigator.mockUserAgent || win.navigator.userAgent;
        }
        function getFrameByName(win, name) {
            for (var winFrames = getFrames(win), _iterator7 = winFrames, _isArray7 = Array.isArray(_iterator7), _i8 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator](); ;) {
                var _ref7;
                if (_isArray7) {
                    if (_i8 >= _iterator7.length) break;
                    _ref7 = _iterator7[_i8++];
                } else {
                    if (_i8 = _iterator7.next(), _i8.done) break;
                    _ref7 = _i8.value;
                }
                var childFrame = _ref7;
                try {
                    if (isSameDomain(childFrame) && childFrame.name === name && winFrames.indexOf(childFrame) !== -1) return childFrame;
                } catch (err) {}
            }
            try {
                if (winFrames.indexOf(win.frames[name]) !== -1) return win.frames[name];
            } catch (err) {}
            try {
                if (winFrames.indexOf(win[name]) !== -1) return win[name];
            } catch (err) {}
        }
        function findChildFrameByName(win, name) {
            var frame = getFrameByName(win, name);
            if (frame) return frame;
            for (var _iterator8 = getFrames(win), _isArray8 = Array.isArray(_iterator8), _i9 = 0, _iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator](); ;) {
                var _ref8;
                if (_isArray8) {
                    if (_i9 >= _iterator8.length) break;
                    _ref8 = _iterator8[_i9++];
                } else {
                    if (_i9 = _iterator8.next(), _i9.done) break;
                    _ref8 = _i9.value;
                }
                var childFrame = _ref8, namedFrame = findChildFrameByName(childFrame, name);
                if (namedFrame) return namedFrame;
            }
        }
        function findFrameByName(win, name) {
            var frame = void 0;
            return frame = getFrameByName(win, name), frame ? frame : findChildFrameByName(getTop(win), name);
        }
        function isParent(win, frame) {
            var frameParent = getParent(frame);
            if (frameParent) return frameParent === win;
            for (var _iterator9 = getFrames(win), _isArray9 = Array.isArray(_iterator9), _i10 = 0, _iterator9 = _isArray9 ? _iterator9 : _iterator9[Symbol.iterator](); ;) {
                var _ref9;
                if (_isArray9) {
                    if (_i10 >= _iterator9.length) break;
                    _ref9 = _iterator9[_i10++];
                } else {
                    if (_i10 = _iterator9.next(), _i10.done) break;
                    _ref9 = _i10.value;
                }
                var childFrame = _ref9;
                if (childFrame === frame) return !0;
            }
            return !1;
        }
        function isOpener(parent, child) {
            return parent === getOpener(child);
        }
        function getAncestor(win) {
            win = win || window;
            var opener = getOpener(win);
            if (opener) return opener;
            var parent = getParent(win);
            return parent ? parent : void 0;
        }
        function getAncestors(win) {
            for (var results = [], ancestor = win; ancestor; ) ancestor = getAncestor(ancestor), 
            ancestor && results.push(ancestor);
            return results;
        }
        function isAncestor(parent, child) {
            var actualParent = getAncestor(child);
            if (actualParent) return actualParent === parent;
            if (child === parent) return !1;
            if (getTop(child) === child) return !1;
            for (var _iterator10 = getFrames(parent), _isArray10 = Array.isArray(_iterator10), _i11 = 0, _iterator10 = _isArray10 ? _iterator10 : _iterator10[Symbol.iterator](); ;) {
                var _ref10;
                if (_isArray10) {
                    if (_i11 >= _iterator10.length) break;
                    _ref10 = _iterator10[_i11++];
                } else {
                    if (_i11 = _iterator10.next(), _i11.done) break;
                    _ref10 = _i11.value;
                }
                var frame = _ref10;
                if (frame === child) return !0;
            }
            return !1;
        }
        function isPopup() {
            return Boolean(getOpener(window));
        }
        function isIframe() {
            return Boolean(getParent(window));
        }
        function isFullpage() {
            return Boolean(!isIframe() && !isPopup());
        }
        function getWindowType() {
            return isPopup() ? _conf.CONSTANTS.WINDOW_TYPES.POPUP : isIframe() ? _conf.CONSTANTS.WINDOW_TYPES.IFRAME : _conf.CONSTANTS.WINDOW_TYPES.FULLPAGE;
        }
        function anyMatch(collection1, collection2) {
            for (var _iterator11 = collection1, _isArray11 = Array.isArray(_iterator11), _i12 = 0, _iterator11 = _isArray11 ? _iterator11 : _iterator11[Symbol.iterator](); ;) {
                var _ref11;
                if (_isArray11) {
                    if (_i12 >= _iterator11.length) break;
                    _ref11 = _iterator11[_i12++];
                } else {
                    if (_i12 = _iterator11.next(), _i12.done) break;
                    _ref11 = _i12.value;
                }
                for (var item1 = _ref11, _iterator12 = collection2, _isArray12 = Array.isArray(_iterator12), _i13 = 0, _iterator12 = _isArray12 ? _iterator12 : _iterator12[Symbol.iterator](); ;) {
                    var _ref12;
                    if (_isArray12) {
                        if (_i13 >= _iterator12.length) break;
                        _ref12 = _iterator12[_i13++];
                    } else {
                        if (_i13 = _iterator12.next(), _i13.done) break;
                        _ref12 = _i13.value;
                    }
                    var item2 = _ref12;
                    if (item1 === item2) return !0;
                }
            }
        }
        function isSameTopWindow(win1, win2) {
            var top1 = getTop(win1), top2 = getTop(win2);
            try {
                if (top1 && top2) return top1 === top2;
            } catch (err) {}
            var allFrames1 = getAllFramesInWindow(win1), allFrames2 = getAllFramesInWindow(win2);
            if (anyMatch(allFrames1, allFrames2)) return !0;
            var opener1 = getOpener(top1), opener2 = getOpener(top2);
            return (!opener1 || !anyMatch(getAllFramesInWindow(opener1), allFrames2)) && ((!opener2 || !anyMatch(getAllFramesInWindow(opener2), allFrames1)) && void 0);
        }
        function jsonStringify() {
            var objectToJSON = void 0, arrayToJSON = void 0;
            try {
                if ("{}" !== JSON.stringify({}) && (objectToJSON = Object.prototype.toJSON, delete Object.prototype.toJSON), 
                "{}" !== JSON.stringify({})) throw new Error("Can not correctly serialize JSON objects");
                if ("[]" !== JSON.stringify([]) && (arrayToJSON = Array.prototype.toJSON, delete Array.prototype.toJSON), 
                "[]" !== JSON.stringify([])) throw new Error("Can not correctly serialize JSON objects");
            } catch (err) {
                throw new Error("Can not repair JSON.stringify: " + err.message);
            }
            var result = JSON.stringify.apply(this, arguments);
            try {
                objectToJSON && (Object.prototype.toJSON = objectToJSON), arrayToJSON && (Array.prototype.toJSON = arrayToJSON);
            } catch (err) {
                throw new Error("Can not repair JSON.stringify: " + err.message);
            }
            return result;
        }
        function jsonParse() {
            return JSON.parse.apply(this, arguments);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.isSameDomain = isSameDomain, exports.getOpener = getOpener, exports.getParent = getParent, 
        exports.getParents = getParents, exports.isAncestorParent = isAncestorParent, exports.getFrames = getFrames, 
        exports.getAllChildFrames = getAllChildFrames, exports.getAllFramesInWindow = getAllFramesInWindow, 
        exports.getTop = getTop, exports.isWindowClosed = isWindowClosed, exports.getUserAgent = getUserAgent, 
        exports.getFrameByName = getFrameByName, exports.findChildFrameByName = findChildFrameByName, 
        exports.findFrameByName = findFrameByName, exports.isParent = isParent, exports.isOpener = isOpener, 
        exports.getAncestor = getAncestor, exports.getAncestors = getAncestors, exports.isAncestor = isAncestor, 
        exports.isPopup = isPopup, exports.isIframe = isIframe, exports.isFullpage = isFullpage, 
        exports.getWindowType = getWindowType, exports.isSameTopWindow = isSameTopWindow, 
        exports.jsonStringify = jsonStringify, exports.jsonParse = jsonParse;
        var _util = __webpack_require__(/*! ./util */ 8), _global = __webpack_require__(/*! ../global */ 4), _conf = __webpack_require__(/*! ../conf */ 0);
        _global.global.domainMatches = _global.global.domainMatches || [];
        var domainMatchTimeout = void 0;
    }, /*!*******************************!*\
  !*** ./src/component/base.js ***!
  \*******************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) return obj;
            var newObj = {};
            if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
            return newObj.default = obj, newObj;
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function cleanup(obj) {
            var tasks = [];
            return {
                set: function(name, item) {
                    return obj[name] = item, this.register(function() {
                        delete obj[name];
                    }), item;
                },
                register: function(name, method) {
                    method || (method = name, name = void 0), tasks.push({
                        complete: !1,
                        name: name,
                        run: function() {
                            if (!this.complete) return this.complete = !0, method();
                        }
                    });
                },
                hasTasks: function() {
                    return Boolean(tasks.filter(function(item) {
                        return !item.complete;
                    }).length);
                },
                all: function() {
                    for (var results = []; tasks.length; ) results.push(tasks.pop().run());
                    return _promise.SyncPromise.all(results).then(function() {});
                },
                run: function(name) {
                    for (var results = [], _iterator = tasks, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                        var _ref;
                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref = _iterator[_i++];
                        } else {
                            if (_i = _iterator.next(), _i.done) break;
                            _ref = _i.value;
                        }
                        var item = _ref;
                        item.name === name && results.push(item.run());
                    }
                    return _promise.SyncPromise.all(results).then(function() {});
                }
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.BaseComponent = void 0;
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                Constructor;
            };
        }(), _promise = __webpack_require__(/*! sync-browser-mocks/src/promise */ 3), _src = __webpack_require__(/*! post-robot/src */ 5), postRobot = _interopRequireWildcard(_src), _lib = __webpack_require__(/*! ../lib */ 1);
        exports.BaseComponent = function() {
            function BaseComponent() {
                _classCallCheck(this, BaseComponent), this.clean = cleanup(this);
            }
            return _createClass(BaseComponent, [ {
                key: "addProp",
                value: function(options, name, def) {
                    (0, _lib.copyProp)(options, this, name, def);
                }
            }, {
                key: "tryCatch",
                value: function(method, doOnce) {
                    var self = this, errored = !1, wrapper = function() {
                        if (!errored) try {
                            return method.apply(this, arguments);
                        } catch (err) {
                            return errored = !0, self.error(err);
                        }
                    };
                    return doOnce !== !1 && (wrapper = (0, _lib.once)(wrapper)), wrapper;
                }
            }, {
                key: "listen",
                value: function(win, domain) {
                    var _this = this;
                    if (!win) throw new Error("[" + this.component.tag + "] window to listen to not set");
                    if (!domain) throw new Error("Must pass domain to listen to");
                    if (this.listeners) for (var listeners = this.listeners(), _loop = function() {
                        if (_isArray2) {
                            if (_i2 >= _iterator2.length) return "break";
                            _ref2 = _iterator2[_i2++];
                        } else {
                            if (_i2 = _iterator2.next(), _i2.done) return "break";
                            _ref2 = _i2.value;
                        }
                        var listenerName = _ref2, name = listenerName.replace(/^xcomponent_/, ""), listener = postRobot.on(listenerName, {
                            window: win,
                            domain: domain,
                            errorHandler: function(err) {
                                return _this.error(err);
                            }
                        }, function(_ref3) {
                            var source = _ref3.source, data = _ref3.data;
                            return _this.component.log("listener_" + name), listeners[listenerName].call(_this, source, data);
                        }), errorListener = postRobot.on(listenerName, {
                            window: win,
                            errorHandler: function(err) {
                                return _this.error(err);
                            }
                        }, function(_ref4) {
                            var origin = _ref4.origin;
                            _ref4.data;
                            _this.component.logError("unexpected_listener_" + name, {
                                origin: origin,
                                domain: domain
                            }), _this.error(new Error("Unexpected " + name + " message from domain " + origin + " -- expected message from " + domain));
                        });
                        _this.clean.register(function() {
                            listener.cancel(), errorListener.cancel();
                        });
                    }, _iterator2 = Object.keys(listeners), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                        var _ref2, _ret = _loop();
                        if ("break" === _ret) break;
                    }
                }
            } ]), BaseComponent;
        }();
    }, /*!*********************************!*\
  !*** ./src/component/window.js ***!
  \*********************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) return obj;
            var newObj = {};
            if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
            return newObj.default = obj, newObj;
        }
        function normalize(str) {
            return str && str.replace(/^[^a-z0-9A-Z]+|[^a-z0-9A-Z]+$/g, "").replace(/[^a-z0-9A-Z]+/g, "_");
        }
        function buildChildWindowName(name, version) {
            var options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            options.id = (0, _lib.uniqueID)(), options.domain = (0, _lib.getDomain)(window);
            var encodedName = normalize(name), encodedVersion = normalize(version), encodedOptions = _hiBase2.default.encode(JSON.stringify(options)).replace(/\=/g, "").toLowerCase();
            if (!encodedName) throw new Error("Invalid name: " + name + " - must contain alphanumeric characters");
            if (!encodedVersion) throw new Error("Invalid version: " + version + " - must contain alphanumeric characters");
            return [ _constants.XCOMPONENT, encodedName, encodedVersion, encodedOptions ].join("__");
        }
        function getParentDomain() {
            return getComponentMeta().domain;
        }
        function getPosition(options) {
            var left = void 0, top = void 0, width = options.width, height = options.height;
            return window.outerWidth ? (left = Math.round((window.outerWidth - width) / 2) + window.screenX, 
            top = Math.round((window.outerHeight - height) / 2) + window.screenY) : window.screen.width && (left = Math.round((window.screen.width - width) / 2), 
            top = Math.round((window.screen.height - height) / 2)), {
                x: left,
                y: top
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.getParentRenderWindow = exports.getParentComponentWindow = exports.isXComponentWindow = exports.getComponentMeta = void 0;
        var _slicedToArray = function() {
            function sliceIterator(arr, i) {
                var _arr = [], _n = !0, _d = !1, _e = void 0;
                try {
                    for (var _s, _i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), 
                    !i || _arr.length !== i); _n = !0) ;
                } catch (err) {
                    _d = !0, _e = err;
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
        exports.buildChildWindowName = buildChildWindowName, exports.getParentDomain = getParentDomain, 
        exports.getPosition = getPosition;
        var _src = __webpack_require__(/*! post-robot/src */ 5), postRobot = _interopRequireWildcard(_src), _hiBase = __webpack_require__(/*! hi-base32 */ 41), _hiBase2 = _interopRequireDefault(_hiBase), _lib = __webpack_require__(/*! ../lib */ 1), _constants = __webpack_require__(/*! ../constants */ 7), getComponentMeta = exports.getComponentMeta = (0, 
        _lib.memoize)(function() {
            if (window.name) {
                var _window$name$split = window.name.split("__"), _window$name$split2 = _slicedToArray(_window$name$split, 4), xcomp = _window$name$split2[0], name = _window$name$split2[1], version = _window$name$split2[2], encodedOptions = _window$name$split2[3];
                if (xcomp === _constants.XCOMPONENT) {
                    var componentMeta = void 0;
                    try {
                        componentMeta = JSON.parse(_hiBase2.default.decode(encodedOptions.toUpperCase()));
                    } catch (err) {
                        return;
                    }
                    return componentMeta.name = name, componentMeta.version = version.replace(/_/g, "."), 
                    componentMeta;
                }
            }
        }), getParentComponentWindow = (exports.isXComponentWindow = (0, _lib.memoize)(function() {
            return Boolean(getComponentMeta());
        }), exports.getParentComponentWindow = (0, _lib.memoize)(function() {
            var componentMeta = getComponentMeta();
            if (!componentMeta) throw new Error("Can not get parent component window - window not rendered by xcomponent");
            var parentWindow = postRobot.winutil.getAncestor(window);
            if (!parentWindow) throw new Error("Can not find parent window");
            if (componentMeta.parent === _constants.WINDOW_REFERENCES.DIRECT_PARENT) return parentWindow;
            if (componentMeta.parent === _constants.WINDOW_REFERENCES.PARENT_PARENT) {
                if (parentWindow = postRobot.winutil.getAncestor(parentWindow), !parentWindow) throw new Error("Can not find parent component window");
                return parentWindow;
            }
            var parentFrame = postRobot.winutil.findFrameByName(parentWindow, componentMeta.parent);
            if (!parentFrame) throw new Error("Can not find frame with name: " + componentMeta.parent);
            return parentFrame;
        }));
        exports.getParentRenderWindow = (0, _lib.memoize)(function() {
            var componentMeta = getComponentMeta();
            if (!componentMeta) throw new Error("Can not get parent component window - window not rendered by xcomponent");
            var parentWindow = postRobot.winutil.getAncestor(window);
            if (!parentWindow) throw new Error("Can not find parent window");
            if (componentMeta.renderParent === _constants.WINDOW_REFERENCES.DIRECT_PARENT) return parentWindow;
            if (componentMeta.renderParent === _constants.WINDOW_REFERENCES.PARENT_PARENT) {
                if (parentWindow = postRobot.winutil.getAncestor(parentWindow), !parentWindow) throw new Error("Can not find parent render window");
                return parentWindow;
            }
            if (componentMeta.renderParent === _constants.WINDOW_REFERENCES.PARENT_UID) {
                if (parentWindow = getParentComponentWindow()[_constants.__XCOMPONENT__].windows[componentMeta.uid], 
                !parentWindow) throw new Error("Can not find parent render window");
                return parentWindow;
            }
            throw new Error("Unrecognized renderParent reference: " + componentMeta.renderParent);
        });
    }, /*!*****************************************!*\
  !*** ./~/beaver-logger/client/index.js ***!
  \*****************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _logger = __webpack_require__(/*! ./logger */ 12);
        Object.keys(_logger).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _logger[key];
                }
            });
        });
        var _init = __webpack_require__(/*! ./init */ 39);
        Object.keys(_init).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _init[key];
                }
            });
        });
        var _transitions = __webpack_require__(/*! ./transitions */ 40);
        Object.keys(_transitions).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _transitions[key];
                }
            });
        });
        var _builders = __webpack_require__(/*! ./builders */ 11);
        Object.keys(_builders).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _builders[key];
                }
            });
        });
        var _config = __webpack_require__(/*! ./config */ 9);
        Object.keys(_config).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _config[key];
                }
            });
        }), exports.default = module.exports;
    }, /*!*******************************************!*\
  !*** ./~/post-robot/src/bridge/common.js ***!
  \*******************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        function needsBridgeForBrowser() {
            return !!(0, _lib.getUserAgent)(window).match(/MSIE|trident|edge/i) || !_conf.CONFIG.ALLOW_POSTMESSAGE_POPUP;
        }
        function needsBridgeForWin(win) {
            return (!win || !(0, _lib.isSameTopWindow)(window, win)) && (!win || !(0, _lib.isSameDomain)(win));
        }
        function needsBridgeForDomain(domain) {
            return !domain || _lib.util.getDomain() !== _lib.util.getDomainFromUrl(domain);
        }
        function needsBridge(_ref) {
            var win = _ref.win, domain = _ref.domain;
            return needsBridgeForBrowser() && needsBridgeForWin(win) && needsBridgeForDomain(domain);
        }
        function getBridgeName(domain) {
            domain = domain || _lib.util.getDomainFromUrl(domain);
            var sanitizedDomain = domain.replace(/[^a-zA-Z0-9]+/g, "_"), id = _conf.CONSTANTS.BRIDGE_NAME_PREFIX + "_" + sanitizedDomain;
            return id;
        }
        function isBridge() {
            return window.name && window.name === getBridgeName(_lib.util.getDomain());
        }
        function registerRemoteWindow(win) {
            var sendMessagePromise = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : _conf.CONFIG.BRIDGE_TIMEOUT, 
            new _lib.promise.Promise());
            _global.global.clean.push(_global.global.remoteWindows, {
                win: win,
                sendMessagePromise: sendMessagePromise
            });
        }
        function findRemoteWindow(win) {
            for (var i = 0; i < _global.global.remoteWindows.length; i++) if (_global.global.remoteWindows[i].win === win) return _global.global.remoteWindows[i];
        }
        function registerRemoteSendMessage(win, domain, sendMessage) {
            var remoteWindow = findRemoteWindow(win);
            if (!remoteWindow) throw new Error("Window not found to register sendMessage to");
            var sendMessageWrapper = function(remoteWin, message, remoteDomain) {
                if (remoteWin !== win) throw new Error("Remote window does not match window");
                if ("*" !== remoteDomain && remoteDomain !== domain) throw new Error("Remote domain " + remoteDomain + " does not match domain " + domain);
                sendMessage(message);
            };
            remoteWindow.sendMessagePromise.resolve(sendMessageWrapper), remoteWindow.sendMessagePromise = _lib.promise.Promise.resolve(sendMessageWrapper);
        }
        function rejectRemoteSendMessage(win, err) {
            var remoteWindow = findRemoteWindow(win);
            if (!remoteWindow) throw new Error("Window not found on which to reject sendMessage");
            remoteWindow.sendMessagePromise.asyncReject(err);
        }
        function sendBridgeMessage(win, message, domain) {
            var messagingChild = (0, _lib.isOpener)(window, win), messagingParent = (0, _lib.isOpener)(win, window);
            if (!messagingChild && !messagingParent) throw new Error("Can only send messages to and from parent and popup windows");
            var remoteWindow = findRemoteWindow(win);
            if (!remoteWindow) throw new Error("Window not found to send message to");
            return remoteWindow.sendMessagePromise.then(function(sendMessage) {
                return sendMessage(win, message, domain);
            });
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.documentBodyReady = void 0, exports.needsBridgeForBrowser = needsBridgeForBrowser, 
        exports.needsBridgeForWin = needsBridgeForWin, exports.needsBridgeForDomain = needsBridgeForDomain, 
        exports.needsBridge = needsBridge, exports.getBridgeName = getBridgeName, exports.isBridge = isBridge, 
        exports.registerRemoteWindow = registerRemoteWindow, exports.findRemoteWindow = findRemoteWindow, 
        exports.registerRemoteSendMessage = registerRemoteSendMessage, exports.rejectRemoteSendMessage = rejectRemoteSendMessage, 
        exports.sendBridgeMessage = sendBridgeMessage;
        var _conf = __webpack_require__(/*! ../conf */ 0), _lib = __webpack_require__(/*! ../lib */ 2), _global = __webpack_require__(/*! ../global */ 4), _drivers = __webpack_require__(/*! ../drivers */ 6);
        exports.documentBodyReady = new _lib.promise.Promise(function(resolve) {
            if (window.document && window.document.body) return resolve(window.document.body);
            var interval = setInterval(function() {
                if (window.document && window.document.body) return clearInterval(interval), resolve(window.document.body);
            }, 10);
        });
        _global.global.remoteWindows = _global.global.remoteWindows || [], _global.global.receiveMessage = function(event) {
            return (0, _drivers.receiveMessage)(event);
        };
    }, /*!******************************************!*\
  !*** ./~/post-robot/src/bridge/index.js ***!
  \******************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _bridge = __webpack_require__(/*! ./bridge */ 42);
        Object.keys(_bridge).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _bridge[key];
                }
            });
        });
        var _child = __webpack_require__(/*! ./child */ 43);
        Object.keys(_child).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _child[key];
                }
            });
        });
        var _common = __webpack_require__(/*! ./common */ 18);
        Object.keys(_common).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _common[key];
                }
            });
        });
        var _parent = __webpack_require__(/*! ./parent */ 44);
        Object.keys(_parent).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _parent[key];
                }
            });
        });
    }, /*!*************************************!*\
  !*** ./~/post-robot/src/lib/log.js ***!
  \*************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.log = void 0;
        var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        }, _util = __webpack_require__(/*! ./util */ 8), _windows = __webpack_require__(/*! ./windows */ 14), _conf = __webpack_require__(/*! ../conf */ 0), LOG_LEVELS = [ "debug", "info", "warn", "error" ];
        Function.prototype.bind && window.console && "object" === _typeof(console.log) && [ "log", "info", "warn", "error" ].forEach(function(method) {
            console[method] = this.bind(console[method], console);
        }, Function.prototype.call);
        var log = exports.log = {
            clearLogs: function() {
                if (window.console && window.console.clear && window.console.clear(), _conf.CONFIG.LOG_TO_PAGE) {
                    var container = document.getElementById("postRobotLogs");
                    container && container.parentNode.removeChild(container);
                }
            },
            writeToPage: function(level, args) {
                setTimeout(function() {
                    var container = document.getElementById("postRobotLogs");
                    container || (container = document.createElement("div"), container.id = "postRobotLogs", 
                    container.style.cssText = "width: 800px; font-family: monospace; white-space: pre-wrap;", 
                    document.body.appendChild(container));
                    var el = document.createElement("div"), date = new Date().toString().split(" ")[4], payload = _util.util.map(args, function(item) {
                        if ("string" == typeof item) return item;
                        if (!item) return Object.prototype.toString.call(item);
                        var json = void 0;
                        try {
                            json = (0, _windows.jsonStringify)(item, 0, 2);
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
                    el.style.cssText = "margin-top: 10px; color: " + color + ";", container.childNodes.length ? container.insertBefore(el, container.childNodes[0]) : container.appendChild(el);
                });
            },
            logLevel: function(level, args) {
                setTimeout(function() {
                    try {
                        if (LOG_LEVELS.indexOf(level) < LOG_LEVELS.indexOf(_conf.CONFIG.LOG_LEVEL)) return;
                        if (args = Array.prototype.slice.call(args), args.unshift("" + window.location.host + window.location.pathname), 
                        args.unshift("::"), args.unshift("" + (0, _windows.getWindowType)().toLowerCase()), 
                        args.unshift("[post-robot]"), _conf.CONFIG.LOG_TO_PAGE && log.writeToPage(level, args), 
                        !window.console) return;
                        if (window.console[level] || (level = "log"), !window.console[level]) return;
                        window.console[level].apply(window.console, args);
                    } catch (err) {}
                }, 1);
            },
            debug: function() {
                log.logLevel("debug", arguments);
            },
            info: function() {
                log.logLevel("info", arguments);
            },
            warn: function() {
                log.logLevel("warn", arguments);
            },
            error: function() {
                log.logLevel("error", arguments);
            }
        };
    }, /*!*****************************************!*\
  !*** ./src/component/parent/drivers.js ***!
  \*****************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) return obj;
            var newObj = {};
            if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
            return newObj.default = obj, newObj;
        }
        function _defineProperty(obj, key, value) {
            return key in obj ? Object.defineProperty(obj, key, {
                value: value,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : obj[key] = value, obj;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.RENDER_DRIVERS = void 0;
        var _RENDER_DRIVERS, _src = __webpack_require__(/*! post-robot/src */ 5), postRobot = _interopRequireWildcard(_src), _lib = __webpack_require__(/*! ../../lib */ 1), _constants = __webpack_require__(/*! ../../constants */ 7), _window = __webpack_require__(/*! ../window */ 16), RENDER_DRIVERS = exports.RENDER_DRIVERS = (_RENDER_DRIVERS = {}, 
        _defineProperty(_RENDER_DRIVERS, _constants.CONTEXT_TYPES.IFRAME, {
            requiresElement: !0,
            renderedIntoParentTemplate: !0,
            destroyOnUnload: !1,
            allowResize: !0,
            openOnClick: !1,
            errorOnCloseDuringInit: !0,
            open: function(element) {
                var _this = this;
                if (!element) throw new Error("[" + this.component.tag + "] Must specify element to render to iframe");
                if (!(0, _lib.getElement)(element)) throw new Error("[" + this.component.tag + "] Can not find element " + element);
                this.iframe = (0, _lib.iframe)(null, {
                    name: this.childWindowName,
                    scrolling: this.component.scrolling === !1 ? "no" : "yes"
                }, this.elementTemplate || element), this.elementTemplate = this.elementTemplate || this.iframe, 
                (0, _lib.hideElement)(this.elementTemplate);
                var dimensions = this.props.dimensions || this.component.dimensions || {};
                this.resize(dimensions.width, dimensions.height), this.restyle(), this.window = this.iframe.contentWindow, 
                this.clean.register("destroyWindow", function() {
                    _this.window.close(), delete _this.window, _this.iframe && (_this.iframe.parentNode && _this.iframe.parentNode.removeChild(_this.iframe), 
                    delete _this.iframe);
                });
            },
            renderToParentOverrides: {
                openContainer: _constants.DELEGATE.CALL_DELEGATE,
                destroyComponent: _constants.DELEGATE.CALL_DELEGATE,
                destroyContainer: _constants.DELEGATE.CALL_DELEGATE,
                cancelContainerEvents: _constants.DELEGATE.CALL_DELEGATE,
                createComponentTemplate: _constants.DELEGATE.CALL_DELEGATE,
                elementReady: _constants.DELEGATE.CALL_DELEGATE,
                showContainer: _constants.DELEGATE.CALL_DELEGATE,
                showComponent: _constants.DELEGATE.CALL_DELEGATE,
                hideContainer: _constants.DELEGATE.CALL_DELEGATE,
                hideComponent: _constants.DELEGATE.CALL_DELEGATE,
                hide: _constants.DELEGATE.CALL_DELEGATE,
                show: _constants.DELEGATE.CALL_DELEGATE,
                resize: _constants.DELEGATE.CALL_DELEGATE,
                restyle: _constants.DELEGATE.CALL_DELEGATE,
                loadUrl: _constants.DELEGATE.CALL_DELEGATE,
                hijackSubmit: _constants.DELEGATE.CALL_DELEGATE,
                open: function(original, override) {
                    return function() {
                        var _this2 = this;
                        return override.apply(this, arguments).then(function() {
                            if (_this2.window = postRobot.winutil.findFrameByName((0, _window.getParentComponentWindow)(), _this2.childWindowName), 
                            !_this2.window) throw new Error("Unable to find parent component iframe window");
                        });
                    };
                }
            },
            resize: function(width, height) {
                width && (this.iframe.style.width = (0, _lib.toCSS)(width)), height && (this.iframe.style.height = (0, 
                _lib.toCSS)(height));
            },
            hide: function() {
                this.iframe.style.display = "none";
            },
            show: function() {
                this.iframe.style.display = "block";
            },
            restyle: function() {
                this.iframe.style.backgroundColor = "transparent";
            },
            loadUrl: function(url) {
                this.iframe.src = url;
            }
        }), _defineProperty(_RENDER_DRIVERS, _constants.CONTEXT_TYPES.POPUP, {
            focusable: !0,
            requiresElement: !1,
            renderedIntoParentTemplate: !1,
            destroyOnUnload: !0,
            allowResize: !1,
            openOnClick: !0,
            errorOnCloseDuringInit: !1,
            open: function() {
                var _this3 = this, _ref = this.props.dimensions || this.component.dimensions || {}, width = _ref.width, height = _ref.height, x = _ref.x, y = _ref.y;
                width = (0, _lib.isPerc)(width) ? parseInt(window.innerWidth * (0, _lib.toNum)(width) / 100, 10) : (0, 
                _lib.toNum)(width), height = (0, _lib.isPerc)(height) ? parseInt(window.innerHeight * (0, 
                _lib.toNum)(height) / 100, 10) : (0, _lib.toNum)(height);
                var pos = (0, _window.getPosition)({
                    width: width,
                    height: height,
                    x: x,
                    y: y
                });
                this.window = (0, _lib.popup)("", {
                    name: this.childWindowName,
                    width: width,
                    height: height,
                    top: pos.y,
                    left: pos.x,
                    location: 1,
                    status: 1,
                    toolbar: 0,
                    menubar: 0,
                    resizable: 1,
                    scrollbars: 1
                }), this.clean.register("destroyWindow", function() {
                    _this3.window && (_this3.window.close(), delete _this3.window);
                }), this.resize(width, height);
            },
            resize: function(width, height) {},
            hide: function() {
                throw new Error("Can not hide popup");
            },
            show: function() {
                throw new Error("Can not show popup");
            },
            restyle: function() {},
            renderToParentOverrides: {
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
                createComponentTemplate: _constants.DELEGATE.CALL_ORIGINAL,
                destroyComponent: _constants.DELEGATE.CALL_ORIGINAL,
                resize: _constants.DELEGATE.CALL_ORIGINAL,
                restyle: _constants.DELEGATE.CALL_ORIGINAL
            },
            loadUrl: function(url) {
                this.window.location = url;
            }
        }), _defineProperty(_RENDER_DRIVERS, _constants.CONTEXT_TYPES.LIGHTBOX, {
            requiresElement: !1,
            renderedIntoParentTemplate: !0,
            destroyOnUnload: !1,
            allowResize: !0,
            openOnClick: !1,
            errorOnCloseDuringInit: !0,
            renderToParentOverrides: {
                openContainer: _constants.DELEGATE.CALL_DELEGATE,
                destroyComponent: _constants.DELEGATE.CALL_DELEGATE,
                destroyContainer: _constants.DELEGATE.CALL_DELEGATE,
                createComponentTemplate: _constants.DELEGATE.CALL_DELEGATE,
                elementReady: _constants.DELEGATE.CALL_DELEGATE,
                showContainer: _constants.DELEGATE.CALL_DELEGATE,
                showComponent: _constants.DELEGATE.CALL_DELEGATE,
                hideContainer: _constants.DELEGATE.CALL_DELEGATE,
                hideComponent: _constants.DELEGATE.CALL_DELEGATE,
                hide: _constants.DELEGATE.CALL_DELEGATE,
                show: _constants.DELEGATE.CALL_DELEGATE,
                resize: _constants.DELEGATE.CALL_DELEGATE,
                restyle: _constants.DELEGATE.CALL_DELEGATE,
                loadUrl: _constants.DELEGATE.CALL_DELEGATE,
                cancelContainerEvents: _constants.DELEGATE.CALL_DELEGATE,
                open: function(original, override) {
                    return function() {
                        var _this4 = this;
                        return override.apply(this, arguments).then(function() {
                            if (_this4.window = postRobot.winutil.findFrameByName(_this4.delegateWindow, _this4.childWindowName), 
                            !_this4.window) throw new Error("Unable to find parent component iframe window");
                        });
                    };
                }
            },
            open: function() {
                var element = this.parentTemplate.getElementsByClassName(_constants.CLASS_NAMES.ELEMENT)[0] || document.body;
                return RENDER_DRIVERS[_constants.CONTEXT_TYPES.IFRAME].open.call(this, element);
            },
            resize: function(width, height) {
                var container = this.parentTemplate.getElementsByClassName(_constants.CLASS_NAMES.ELEMENT)[0] || this.iframe;
                width && (container.style.width = (0, _lib.toCSS)(width)), height && (container.style.height = (0, 
                _lib.toCSS)(height));
            },
            hide: function() {
                this.iframe.style.display = "none";
            },
            show: function() {
                this.iframe.style.display = "block";
            },
            restyle: function() {},
            loadUrl: function(url) {
                this.iframe.src = url;
            }
        }), _RENDER_DRIVERS);
    }, /*!***************************************!*\
  !*** ./src/component/parent/index.js ***!
  \***************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) return obj;
            var newObj = {};
            if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
            return newObj.default = obj, newObj;
        }
        function _defineProperty(obj, key, value) {
            return key in obj ? Object.defineProperty(obj, key, {
                value: value,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : obj[key] = value, obj;
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
            }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
        }
        function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
            var desc = {};
            return Object.keys(descriptor).forEach(function(key) {
                desc[key] = descriptor[key];
            }), desc.enumerable = !!desc.enumerable, desc.configurable = !!desc.configurable, 
            ("value" in desc || desc.initializer) && (desc.writable = !0), desc = decorators.slice().reverse().reduce(function(desc, decorator) {
                return decorator(target, property, desc) || desc;
            }, desc), context && void 0 !== desc.initializer && (desc.value = desc.initializer ? desc.initializer.call(context) : void 0, 
            desc.initializer = void 0), void 0 === desc.initializer && (Object.defineProperty(target, property, desc), 
            desc = null), desc;
        }
        function destroyAll() {
            for (var results = []; activeComponents.length; ) results.push(activeComponents[0].destroy());
            return _promise.SyncPromise.all(results);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.ParentComponent = void 0;
        var _class, _slicedToArray = function() {
            function sliceIterator(arr, i) {
                var _arr = [], _n = !0, _d = !1, _e = void 0;
                try {
                    for (var _s, _i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), 
                    !i || _arr.length !== i); _n = !0) ;
                } catch (err) {
                    _d = !0, _e = err;
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
        }(), _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        }, _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                Constructor;
            };
        }();
        exports.destroyAll = destroyAll;
        var _client = __webpack_require__(/*! beaver-logger/client */ 17), $logger = _interopRequireWildcard(_client), _src = __webpack_require__(/*! post-robot/src */ 5), postRobot = _interopRequireWildcard(_src), _promise = __webpack_require__(/*! sync-browser-mocks/src/promise */ 3), _base = __webpack_require__(/*! ../base */ 15), _window = __webpack_require__(/*! ../window */ 16), _lib = __webpack_require__(/*! ../../lib */ 1), _constants = __webpack_require__(/*! ../../constants */ 7), _drivers = __webpack_require__(/*! ./drivers */ 21), _validate = __webpack_require__(/*! ./validate */ 34), _props = __webpack_require__(/*! ./props */ 62), _parent = __webpack_require__(/*! ../component/templates/parent.htm */ 37), _parent2 = _interopRequireDefault(_parent), activeComponents = [], global = window[_constants.__XCOMPONENT__] = window[_constants.__XCOMPONENT__] || {};
        global.props = global.props || {}, global.windows = global.windows || {};
        exports.ParentComponent = (_class = function(_BaseComponent) {
            function ParentComponent(component, context) {
                var options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                _classCallCheck(this, ParentComponent);
                var _this = _possibleConstructorReturn(this, (ParentComponent.__proto__ || Object.getPrototypeOf(ParentComponent)).call(this, component, options));
                if ((0, _validate.validate)(component, options), _this.rawProps = _extends({}, options.props || {}), 
                _this.component = component, _this.context = context, _this.setProps(options.props || {}), 
                _this.childWindowName = _this.buildChildWindowName({
                    renderTo: window
                }), component.singleton && activeComponents.some(function(comp) {
                    return comp.component === component;
                })) throw new Error(component.tag + " is a singleton, and an only be instantiated once");
                return _this.registerActiveComponent(), _this.component.log("construct_parent"), 
                _this.onInit = new _promise.SyncPromise(), _this.clean.register(function() {
                    _this.onInit = new _promise.SyncPromise();
                }), _this.onInit.catch(function(err) {
                    return _this.error(err);
                }), _this;
            }
            return _inherits(ParentComponent, _BaseComponent), _createClass(ParentComponent, [ {
                key: "registerActiveComponent",
                value: function() {
                    var _this2 = this;
                    activeComponents.push(this), this.clean.register(function() {
                        activeComponents.splice(activeComponents.indexOf(_this2), 1);
                    });
                }
            }, {
                key: "buildChildWindowName",
                value: function() {
                    var _ref = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, _ref$renderTo = _ref.renderTo, renderTo = void 0 === _ref$renderTo ? window : _ref$renderTo, _ref$secureProps = _ref.secureProps, secureProps = void 0 !== _ref$secureProps && _ref$secureProps, sameWindow = renderTo === window, isLightbox = this.context === _constants.CONTEXT_TYPES.LIGHTBOX, uid = (0, 
                    _lib.uniqueID)(), tag = this.component.tag, sProps = this.getSerializedPropsForChild(), defaultParent = isLightbox ? _constants.WINDOW_REFERENCES.PARENT_PARENT : _constants.WINDOW_REFERENCES.DIRECT_PARENT, parent = sameWindow ? defaultParent : window.name, renderParent = sameWindow ? defaultParent : _constants.WINDOW_REFERENCES.PARENT_UID, props = secureProps ? {
                        type: _constants.INITIAL_PROPS.UID
                    } : {
                        type: _constants.INITIAL_PROPS.RAW,
                        value: sProps
                    };
                    return props.type === _constants.INITIAL_PROPS.UID && (global.props[uid] = sProps), 
                    renderParent === _constants.WINDOW_REFERENCES.PARENT_UID && (global.windows[uid] = renderTo), 
                    (0, _window.buildChildWindowName)(this.component.name, this.component.version, {
                        uid: uid,
                        tag: tag,
                        parent: parent,
                        renderParent: renderParent,
                        props: props
                    });
                }
            }, {
                key: "sendToParent",
                value: function(name, data) {
                    var parentWindow = (0, _window.getParentComponentWindow)();
                    if (!parentWindow) throw new Error("Can not find parent component window to message");
                    return this.component.log("send_to_parent_" + name), postRobot.send((0, _window.getParentComponentWindow)(), name, data, {
                        domain: (0, _window.getParentDomain)()
                    });
                }
            }, {
                key: "setProps",
                value: function() {
                    var props = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, required = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                    this.props = this.props || {}, props.version = this.component.version, (0, _validate.validateProps)(this.component, props, required), 
                    this.component.validateProps && this.component.validateProps(this.component, props, required), 
                    (0, _lib.extend)(this.props, (0, _props.normalizeProps)(this.component, this, props, required));
                }
            }, {
                key: "buildUrl",
                value: function() {
                    var _this3 = this;
                    return _promise.SyncPromise.hash({
                        url: this.props.url,
                        query: (0, _props.propsToQuery)(this.component.props, this.props)
                    }).then(function(_ref2) {
                        var url = _ref2.url, query = _ref2.query;
                        return url && !_this3.component.getValidDomain(url) ? url : _promise.SyncPromise.try(function() {
                            return url ? url : _this3.props.env && _this3.component.envUrls ? _this3.component.envUrls[_this3.props.env] : _this3.component.defaultEnv && _this3.component.envUrls ? _this3.component.envUrls[_this3.component.defaultEnv] : _this3.component.buildUrl ? _this3.component.buildUrl(_this3.props) : _this3.component.url;
                        }).then(function(finalUrl) {
                            return query[_constants.XCOMPONENT] = "1", (0, _lib.extendUrl)(finalUrl, {
                                query: query
                            });
                        });
                    });
                }
            }, {
                key: "getDomain",
                value: function() {
                    var _this4 = this;
                    return _promise.SyncPromise.try(function() {
                        return _this4.props.url;
                    }).then(function(url) {
                        var domain = _this4.component.getDomain(url, _this4.props);
                        return domain ? domain : _this4.component.buildUrl ? _promise.SyncPromise.try(function() {
                            return _this4.component.buildUrl(_this4.props);
                        }).then(function(builtUrl) {
                            return _this4.component.getDomain(builtUrl, _this4.props);
                        }) : void 0;
                    }).then(function(domain) {
                        if (!domain) throw new Error("Could not determine domain");
                        return domain;
                    });
                }
            }, {
                key: "getBridgeDomain",
                value: function(url) {
                    var _this5 = this;
                    return _promise.SyncPromise.try(function() {
                        if (_this5.component.bridgeDomain) return _this5.component.bridgeDomain;
                        if (_this5.component.bridgeDomains && _this5.props.env && _this5.component.bridgeDomains[_this5.props.env]) return _this5.component.bridgeDomains[_this5.props.env];
                        if (url) return (0, _lib.getDomainFromUrl)(url);
                        throw new Error("Can not determine domain for bridge");
                    });
                }
            }, {
                key: "getPropsForChild",
                value: function() {
                    for (var result = {}, _iterator = Object.keys(this.props), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                        var _ref3;
                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref3 = _iterator[_i++];
                        } else {
                            if (_i = _iterator.next(), _i.done) break;
                            _ref3 = _i.value;
                        }
                        var key = _ref3;
                        this.component.props[key].sendToChild !== !1 && (result[key] = this.props[key]);
                    }
                    return result;
                }
            }, {
                key: "getSerializedPropsForChild",
                value: function() {
                    return (0, _lib.replaceObject)(this.getPropsForChild(), function(value, key, fullKey) {
                        if (value instanceof Function) return {
                            __type__: "__function__"
                        };
                    });
                }
            }, {
                key: "updateProps",
                value: function() {
                    for (var _this6 = this, props = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, changed = !1, _iterator2 = Object.keys(props), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                        var _ref4;
                        if (_isArray2) {
                            if (_i2 >= _iterator2.length) break;
                            _ref4 = _iterator2[_i2++];
                        } else {
                            if (_i2 = _iterator2.next(), _i2.done) break;
                            _ref4 = _i2.value;
                        }
                        var key = _ref4;
                        if (props[key] !== this.rawProps[key]) {
                            changed = !0;
                            break;
                        }
                    }
                    if (changed) return this.rawProps = _extends({}, this.rawProps, props), this.setProps(props, !1), 
                    this.propUpdater ? this.propUpdater : (this.propUpdater = this.onInit.then(function() {
                        return delete _this6.propUpdater, _this6.childExports.updateProps(_this6.getPropsForChild());
                    }), this.propUpdater);
                }
            }, {
                key: "openBridge",
                value: function() {
                    var _this7 = this, bridgeUrl = this.component.bridgeUrl;
                    if (!bridgeUrl && this.component.bridgeUrls && this.props.env && (bridgeUrl = this.component.bridgeUrls[this.props.env]), 
                    bridgeUrl) return this.getBridgeDomain(bridgeUrl).then(function(bridgeDomain) {
                        if (postRobot.needsBridge({
                            window: _this7.window,
                            domain: bridgeDomain
                        })) return postRobot.openBridge(bridgeUrl, bridgeDomain);
                    });
                }
            }, {
                key: "open",
                value: function(element) {
                    this.component.log("open_" + this.context, {
                        element: element,
                        windowName: this.childWindowName
                    }), this.driver.open.call(this, element);
                }
            }, {
                key: "elementReady",
                value: function(element) {
                    return (0, _lib.elementReady)(element).then(_lib.noop);
                }
            }, {
                key: "render",
                value: function(element) {
                    var _this8 = this, loadUrl = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                    return this.tryInit(function() {
                        _this8.component.log("render_" + _this8.context, {
                            context: _this8.context,
                            element: element,
                            loadUrl: loadUrl
                        });
                        var tasks = {
                            getDomain: _this8.getDomain()
                        };
                        return tasks.elementReady = _promise.SyncPromise.try(function() {
                            if (element) return _this8.elementReady(element);
                        }), tasks.openContainer = tasks.elementReady.then(function() {
                            return _this8.openContainer(element);
                        }), _this8.driver.openOnClick ? tasks.open = _this8.open(element, _this8.context) : tasks.open = _promise.SyncPromise.all([ tasks.openContainer, tasks.elementReady ]).then(function() {
                            return _this8.open(element, _this8.context);
                        }), tasks.openBridge = tasks.open.then(function() {
                            return _this8.openBridge(_this8.context);
                        }), tasks.showContainer = tasks.openContainer.then(function() {
                            return _this8.showContainer();
                        }), tasks.createComponentTemplate = tasks.open.then(function() {
                            return _this8.createComponentTemplate();
                        }), tasks.showComponent = tasks.createComponentTemplate.then(function() {
                            return _this8.showComponent();
                        }), tasks.linkDomain = _promise.SyncPromise.all([ tasks.getDomain, tasks.open ]).then(function(_ref5) {
                            var _ref6 = _slicedToArray(_ref5, 1), domain = _ref6[0];
                            return postRobot.linkUrl(_this8.window, domain);
                        }), tasks.listen = _promise.SyncPromise.all([ tasks.getDomain, tasks.open ]).then(function(_ref7) {
                            var _ref8 = _slicedToArray(_ref7, 1), domain = _ref8[0];
                            _this8.listen(_this8.window, domain);
                        }), tasks.watchForClose = tasks.open.then(function() {
                            return _this8.watchForClose();
                        }), loadUrl && (tasks.buildUrl = _this8.buildUrl(), tasks.loadUrl = _promise.SyncPromise.all([ tasks.buildUrl, tasks.linkDomain, tasks.listen, tasks.openBridge, tasks.createComponentTemplate ]).then(function(_ref9) {
                            var _ref10 = _slicedToArray(_ref9, 1), url = _ref10[0];
                            return _this8.loadUrl(url);
                        }), tasks.runTimeout = tasks.loadUrl.then(function() {
                            return _this8.runTimeout();
                        })), _promise.SyncPromise.hash(tasks);
                    });
                }
            }, {
                key: "validateRenderToParent",
                value: function(element) {
                    var parentWindow = (0, _window.getParentComponentWindow)();
                    if (!parentWindow) throw new Error("[" + this.component.tag + "] Can not render to parent - no parent exists");
                    if (!(0, _window.isXComponentWindow)()) throw new Error("[" + this.component.tag + "] Can not render to parent - not in a child component window");
                }
            }, {
                key: "delegate",
                value: function delegate(win) {
                    var _this9 = this;
                    this.delegateWindow = win, this.component.log("delegate_" + this.context), this.childWindowName = this.buildChildWindowName({
                        renderTo: win,
                        secureProps: !0
                    });
                    var delegate = postRobot.send(win, _constants.POST_MESSAGE.DELEGATE + "_" + this.component.name, {
                        context: this.context,
                        env: this.props.env,
                        options: {
                            context: this.context,
                            childWindowName: this.childWindowName,
                            props: {
                                uid: this.props.uid,
                                dimensions: this.props.dimensions,
                                onClose: this.props.onClose,
                                onDisplay: this.props.onDisplay
                            },
                            overrides: {
                                focus: function() {
                                    return _this9.focus();
                                },
                                userClose: function() {
                                    return _this9.userClose();
                                },
                                getDomain: function() {
                                    return _this9.getDomain();
                                },
                                getParentTemplate: function() {
                                    return _this9.getParentTemplate();
                                },
                                getComponentTemplate: function() {
                                    return _this9.getComponentTemplate();
                                }
                            }
                        }
                    }).then(function(_ref11) {
                        var data = _ref11.data;
                        return _this9.clean.register(data.destroy), data;
                    }).catch(function(err) {
                        throw new Error("Unable to delegate rendering. Possibly the component is not loaded in the target window.\n\n" + err.stack);
                    }), overrides = this.driver.renderToParentOverrides, _loop = function() {
                        if (_isArray3) {
                            if (_i3 >= _iterator3.length) return "break";
                            _ref12 = _iterator3[_i3++];
                        } else {
                            if (_i3 = _iterator3.next(), _i3.done) return "break";
                            _ref12 = _i3.value;
                        }
                        var key = _ref12, val = overrides[key];
                        if (val === _constants.DELEGATE.CALL_ORIGINAL) return "continue";
                        var original = _this9[key];
                        _this9[key] = function() {
                            var _this10 = this, _arguments = arguments;
                            return delegate.then(function(data) {
                                var override = data.overrides[key];
                                if (val === _constants.DELEGATE.CALL_DELEGATE) return override.apply(_this10, _arguments);
                                if (val instanceof Function) return val(original, override).apply(_this10, _arguments);
                                throw new Error("Expected delgate to be CALL_ORIGINAL, CALL_DELEGATE, or factory method");
                            });
                        };
                    };
                    _loop2: for (var _iterator3 = Object.keys(overrides), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                        var _ref12, _ret = _loop();
                        switch (_ret) {
                          case "break":
                            break _loop2;

                          case "continue":
                            continue;
                        }
                    }
                }
            }, {
                key: "renderTo",
                value: function(win, element, context) {
                    var _this11 = this;
                    arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                    return this.tryInit(function() {
                        if ("file:" === window.location.protocol) throw new Error("Can not render remotely from file:// domain");
                        var origin = (0, _lib.getDomain)(), domain = _this11.component.getDomain(null, _this11.props);
                        if (!domain) throw new Error("Could not determine domain to allow remote render");
                        if (domain !== origin) throw new Error("Can not render remotely to " + domain + " - can only render to " + origin);
                        return _this11.context = _this11.context || _this11.component.getRenderContext(element, context), 
                        _this11.validateRenderToParent(element, _this11.context), _this11.component.log("render_" + _this11.context + "_to_win", {
                            element: element,
                            context: _this11.context
                        }), _this11.delegate(win, _this11.context), _this11.render(element, _this11.context);
                    });
                }
            }, {
                key: "watchForClose",
                value: function() {
                    var _this12 = this, closeWindowListener = (0, _lib.onCloseWindow)(this.window, function() {
                        return _this12.component.log("detect_close_child"), _this12.driver.errorOnCloseDuringInit && _this12.onInit.reject(new Error("Detected close during init")), 
                        _promise.SyncPromise.try(function() {
                            return _this12.props.onClose(_constants.CLOSE_REASONS.CLOSE_DETECTED);
                        }).finally(function() {
                            return _this12.destroy();
                        });
                    });
                    this.clean.register("destroyCloseWindowListener", closeWindowListener.cancel);
                    var unloadWindowListener = (0, _lib.addEventListener)(window, "beforeunload", function() {
                        if (_this12.component.log("navigate_away"), $logger.flush(), closeWindowListener.cancel(), 
                        _this12.driver.destroyOnUnload) return _this12.destroyComponent();
                    });
                    this.clean.register("destroyUnloadWindowListener", unloadWindowListener.cancel);
                }
            }, {
                key: "loadUrl",
                value: function(url) {
                    return this.component.log("load_url"), window.location.href.split("#")[0] === url.split("#")[0] && (url = (0, 
                    _lib.extendUrl)(url, {
                        query: _defineProperty({}, (0, _lib.uniqueID)(), "1")
                    })), this.driver.loadUrl.call(this, url);
                }
            }, {
                key: "hijack",
                value: function(targetElement) {
                    targetElement.target = this.childWindowName;
                }
            }, {
                key: "runTimeout",
                value: function() {
                    var _this13 = this;
                    this.props.timeout && (this.timeout = setTimeout(function() {
                        _this13.component.log("timed_out", {
                            timeout: _this13.props.timeout
                        });
                        var error = new Error("[" + _this13.component.tag + "] Loading component " + _this13.component.tag + " timed out after " + _this13.props.timeout + " milliseconds");
                        _this13.onInit.reject(error), _this13.props.onTimeout(error);
                    }, this.props.timeout), this.clean.register(function() {
                        clearTimeout(_this13.timeout), delete _this13.timeout;
                    }));
                }
            }, {
                key: "listeners",
                value: function() {
                    var _ref13;
                    return _ref13 = {}, _defineProperty(_ref13, _constants.POST_MESSAGE.INIT, function(source, data) {
                        var _this14 = this;
                        return this.childExports = data.exports, this.onInit.resolve(this), this.timeout && clearTimeout(this.timeout), 
                        this.props.onEnter().then(function() {
                            return $logger.flush(), {
                                props: _this14.getPropsForChild(),
                                context: _this14.context
                            };
                        });
                    }), _defineProperty(_ref13, _constants.POST_MESSAGE.CLOSE, function(source, data) {
                        this.close(data.reason);
                    }), _defineProperty(_ref13, _constants.POST_MESSAGE.RESIZE, function(source, data) {
                        if (this.driver.allowResize && this.component.autoResize) return this.resize(data.width, data.height);
                    }), _defineProperty(_ref13, _constants.POST_MESSAGE.HIDE, function(source, data) {
                        this.hide();
                    }), _defineProperty(_ref13, _constants.POST_MESSAGE.SHOW, function(source, data) {
                        this.show();
                    }), _defineProperty(_ref13, _constants.POST_MESSAGE.ERROR, function(source, data) {
                        this.error(new Error(data.error));
                    }), _ref13;
                }
            }, {
                key: "resize",
                value: function(width, height) {
                    if (this.component.log("resize", {
                        height: height,
                        width: width
                    }), this.driver.resize.call(this, width, height), this.elementTemplate || this.iframe) {
                        var overflow = void 0;
                        return this.elementTemplate && (overflow = (0, _lib.setOverflow)(this.elementTemplate, "hidden")), 
                        (0, _lib.elementStoppedMoving)(this.elementTemplate || this.iframe).then(function() {
                            overflow && overflow.reset();
                        });
                    }
                }
            }, {
                key: "restyle",
                value: function() {
                    return this.driver.restyle.call(this);
                }
            }, {
                key: "hide",
                value: function() {
                    return this.parentTemplate && (this.parentTemplate.style.display = "none"), this.parentTemplateFrame && (this.parentTemplateFrame.style.display = "none"), 
                    this.driver.hide.call(this);
                }
            }, {
                key: "show",
                value: function() {
                    return this.parentTemplate && (this.parentTemplate.style.display = "block"), this.parentTemplateFrame && (this.parentTemplateFrame.style.display = "block"), 
                    this.driver.show.call(this);
                }
            }, {
                key: "userClose",
                value: function() {
                    return this.close(_constants.CLOSE_REASONS.USER_CLOSED);
                }
            }, {
                key: "close",
                value: function() {
                    var _this15 = this, reason = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _constants.CLOSE_REASONS.PARENT_CALL;
                    return _promise.SyncPromise.try(function() {
                        return _this15.component.log("close", {
                            reason: reason
                        }), _this15.props.onClose(reason);
                    }).then(function() {
                        return _promise.SyncPromise.all([ _this15.closeComponent(), _this15.closeContainer() ]);
                    }).then(function() {
                        return _this15.destroy();
                    });
                }
            }, {
                key: "closeContainer",
                value: function() {
                    var _this16 = this, reason = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _constants.CLOSE_REASONS.PARENT_CALL;
                    return _promise.SyncPromise.try(function() {
                        return _this16.props.onClose(reason);
                    }).then(function() {
                        return _promise.SyncPromise.all([ _this16.closeComponent(reason), _this16.hideContainer() ]);
                    }).then(function() {
                        return _this16.destroyContainer();
                    });
                }
            }, {
                key: "destroyContainer",
                value: function() {
                    this.clean.run("destroyContainerEvents"), this.clean.run("destroyParentTemplate");
                }
            }, {
                key: "closeComponent",
                value: function() {
                    var _this17 = this, reason = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _constants.CLOSE_REASONS.PARENT_CALL;
                    this.clean.run("destroyCloseWindowListener"), this.clean.run("destroyUnloadWindowListener");
                    var win = this.window;
                    return _promise.SyncPromise.try(function() {
                        return _this17.cancelContainerEvents();
                    }).then(function() {
                        return _this17.props.onClose(reason);
                    }).then(function() {
                        return _this17.hideComponent();
                    }).then(function() {
                        return _this17.destroyComponent();
                    }).then(function() {
                        _this17.childExports && _this17.context === _constants.CONTEXT_TYPES.POPUP && !postRobot.winutil.isWindowClosed(win) && _this17.childExports.close().catch(_lib.noop);
                    });
                }
            }, {
                key: "destroyComponent",
                value: function() {
                    this.clean.run("destroyCloseWindowListener"), this.clean.run("destroyContainerEvents"), 
                    this.clean.run("destroyWindow");
                }
            }, {
                key: "showContainer",
                value: function() {
                    if (this.parentTemplate) return (0, _lib.addClass)(this.parentTemplate, _constants.CLASS_NAMES.SHOW_CONTAINER), 
                    (0, _lib.showAndAnimate)(this.parentTemplate, _constants.ANIMATION_NAMES.SHOW_CONTAINER);
                }
            }, {
                key: "showComponent",
                value: function() {
                    var _this18 = this;
                    return _promise.SyncPromise.try(function() {
                        if (_this18.props.onDisplay) return _this18.props.onDisplay();
                    }).then(function() {
                        _this18.elementTemplate && ((0, _lib.addClass)(_this18.elementTemplate, _constants.CLASS_NAMES.SHOW_COMPONENT), 
                        (0, _lib.showAndAnimate)(_this18.elementTemplate, _constants.ANIMATION_NAMES.SHOW_COMPONENT));
                    });
                }
            }, {
                key: "hideContainer",
                value: function() {
                    if (this.parentTemplate) return (0, _lib.addClass)(this.parentTemplate, _constants.CLASS_NAMES.HIDE_CONTAINER), 
                    (0, _lib.addClass)(this.parentTemplate, _constants.CLASS_NAMES.LOADING), (0, _lib.animateAndHide)(this.parentTemplate, _constants.ANIMATION_NAMES.HIDE_CONTAINER);
                }
            }, {
                key: "hideComponent",
                value: function() {
                    if (this.parentTemplate && (0, _lib.addClass)(this.parentTemplate, _constants.CLASS_NAMES.LOADING), 
                    this.elementTemplate) return (0, _lib.addClass)(this.elementTemplate, _constants.CLASS_NAMES.HIDE_COMPONENT), 
                    (0, _lib.animateAndHide)(this.elementTemplate, _constants.ANIMATION_NAMES.HIDE_COMPONENT);
                }
            }, {
                key: "focus",
                value: function() {
                    if (!this.window) throw new Error("No window to focus");
                    this.component.log("focus"), this.window.focus();
                }
            }, {
                key: "getComponentTemplate",
                value: function() {
                    return this.component.componentTemplate;
                }
            }, {
                key: "createComponentTemplate",
                value: function() {
                    var _this19 = this;
                    return _promise.SyncPromise.try(function() {
                        return _this19.getComponentTemplate();
                    }).then(function(componentTemplate) {
                        return (0, _lib.template)(componentTemplate, {
                            id: _constants.CLASS_NAMES.XCOMPONENT + "-" + _this19.props.uid,
                            props: _this19.props,
                            CLASS: _constants.CLASS_NAMES,
                            ANIMATION: _constants.ANIMATION_NAMES
                        });
                    }).then(function(html) {
                        try {
                            _this19.window.document.open(), _this19.window.document.write(html), _this19.window.document.close();
                        } catch (err) {
                            try {
                                _this19.window.location = "javascript: document.open(); document.write(" + JSON.stringify(html) + "); document.close();";
                            } catch (err2) {}
                        }
                    });
                }
            }, {
                key: "getParentTemplate",
                value: function() {
                    return this.component.parentTemplate;
                }
            }, {
                key: "openContainer",
                value: function(element) {
                    var _this20 = this;
                    return _promise.SyncPromise.try(function() {
                        return _this20.getParentTemplate();
                    }).then(function(parentTemplate) {
                        if (parentTemplate !== _parent2.default || _this20.context !== _constants.CONTEXT_TYPES.IFRAME) return (0, 
                        _lib.template)(parentTemplate, {
                            id: _constants.CLASS_NAMES.XCOMPONENT + "-" + _this20.props.uid,
                            props: _this20.props,
                            CLASS: _constants.CLASS_NAMES,
                            ANIMATION: _constants.ANIMATION_NAMES
                        }).then(function(html) {
                            var el = void 0;
                            if (element) {
                                if (el = (0, _lib.getElement)(element), !el) throw new Error("Could not find element: " + element);
                            } else _this20.component.sandboxContainer ? (_this20.parentTemplateFrame = (0, _lib.iframe)(null, {
                                name: "__lightbox_container__" + (0, _lib.uniqueID)() + "__",
                                scrolling: "no"
                            }, document.body), _this20.parentTemplateFrame.style.display = "block", _this20.parentTemplateFrame.style.position = "fixed", 
                            _this20.parentTemplateFrame.style.top = "0", _this20.parentTemplateFrame.style.left = "0", 
                            _this20.parentTemplateFrame.style.width = "100%", _this20.parentTemplateFrame.style.height = "100%", 
                            _this20.parentTemplateFrame.style.zIndex = "2147483647", _this20.parentTemplateFrame.contentWindow.document.open(), 
                            _this20.parentTemplateFrame.contentWindow.document.write("<body></body>"), _this20.parentTemplateFrame.contentWindow.document.close(), 
                            el = _this20.parentTemplateFrame.contentWindow.document.body) : el = document.body;
                            if (_this20.parentTemplate = (0, _lib.createElement)("div", {
                                html: html,
                                attributes: {
                                    id: _constants.CLASS_NAMES.XCOMPONENT + "-" + _this20.props.uid
                                },
                                class: [ _constants.CLASS_NAMES.XCOMPONENT, _constants.CLASS_NAMES.XCOMPONENT + "-" + _this20.context ]
                            }), (0, _lib.hideElement)(_this20.parentTemplate), el.appendChild(_this20.parentTemplate), 
                            _this20.driver.renderedIntoParentTemplate) {
                                if (_this20.elementTemplate = _this20.parentTemplate.getElementsByClassName(_constants.CLASS_NAMES.ELEMENT)[0], 
                                !_this20.elementTemplate) throw new Error("Could not find element to render component into");
                                (0, _lib.hideElement)(_this20.elementTemplate);
                            }
                            var eventHandlers = [];
                            _this20.driver.focusable && eventHandlers.push((0, _lib.addEventToClass)(_this20.parentTemplate, _constants.CLASS_NAMES.FOCUS, _constants.EVENT_NAMES.CLICK, function(event) {
                                return _this20.focus();
                            })), eventHandlers.push((0, _lib.addEventToClass)(_this20.parentTemplate, _constants.CLASS_NAMES.CLOSE, _constants.EVENT_NAMES.CLICK, function(event) {
                                return _this20.userClose();
                            })), _this20.clean.register("destroyContainerEvents", function() {
                                for (var _iterator4 = eventHandlers, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator](); ;) {
                                    var _ref14;
                                    if (_isArray4) {
                                        if (_i4 >= _iterator4.length) break;
                                        _ref14 = _iterator4[_i4++];
                                    } else {
                                        if (_i4 = _iterator4.next(), _i4.done) break;
                                        _ref14 = _i4.value;
                                    }
                                    var eventHandler = _ref14;
                                    eventHandler.cancel();
                                }
                            }), _this20.clean.register("destroyParentTemplate", function() {
                                _this20.parentTemplateFrame && _this20.parentTemplateFrame.parentNode.removeChild(_this20.parentTemplateFrame), 
                                _this20.parentTemplate && _this20.parentTemplate.parentNode.removeChild(_this20.parentTemplate), 
                                delete _this20.parentTemplateFrame, delete _this20.parentTemplate;
                            });
                        });
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
                    var _this21 = this;
                    return _promise.SyncPromise.try(function() {
                        if (_this21.clean.hasTasks()) return _this21.component.log("destroy"), $logger.flush(), 
                        _this21.clean.all();
                    });
                }
            }, {
                key: "tryInit",
                value: function(method) {
                    var _this22 = this;
                    return _promise.SyncPromise.try(method).catch(function(err) {
                        throw _this22.onInit.reject(err), err;
                    }).then(function() {
                        return _this22.onInit;
                    });
                }
            }, {
                key: "error",
                value: function(err) {
                    var _this23 = this;
                    if (this.handledErrors = this.handledErrors || [], this.handledErrors.indexOf(err) === -1) return this.handledErrors.push(err), 
                    _promise.SyncPromise.try(function() {
                        return _this23.component.logError("error", {
                            error: err.stack || err.toString()
                        }), _this23.onInit.reject(err), _this23.props.onError(err);
                    }).then(function() {
                        return _this23.destroy();
                    }).catch(function(err2) {
                        throw new Error("An error was encountered while handling error:\n\n " + err.stack + "\n\n" + err2.stack);
                    }).then(function() {
                        throw err;
                    });
                }
            }, {
                key: "driver",
                get: function() {
                    if (!this.context) throw new Error("Context not set");
                    return _drivers.RENDER_DRIVERS[this.context];
                }
            } ]), ParentComponent;
        }(_base.BaseComponent), _applyDecoratedDescriptor(_class.prototype, "getDomain", [ _lib.promise ], Object.getOwnPropertyDescriptor(_class.prototype, "getDomain"), _class.prototype), 
        _applyDecoratedDescriptor(_class.prototype, "getBridgeDomain", [ _lib.promise ], Object.getOwnPropertyDescriptor(_class.prototype, "getBridgeDomain"), _class.prototype), 
        _applyDecoratedDescriptor(_class.prototype, "updateProps", [ _lib.promise ], Object.getOwnPropertyDescriptor(_class.prototype, "updateProps"), _class.prototype), 
        _applyDecoratedDescriptor(_class.prototype, "openBridge", [ _lib.promise ], Object.getOwnPropertyDescriptor(_class.prototype, "openBridge"), _class.prototype), 
        _applyDecoratedDescriptor(_class.prototype, "open", [ _lib.memoized, _lib.promise ], Object.getOwnPropertyDescriptor(_class.prototype, "open"), _class.prototype), 
        _applyDecoratedDescriptor(_class.prototype, "render", [ _lib.promise ], Object.getOwnPropertyDescriptor(_class.prototype, "render"), _class.prototype), 
        _applyDecoratedDescriptor(_class.prototype, "loadUrl", [ _lib.promise ], Object.getOwnPropertyDescriptor(_class.prototype, "loadUrl"), _class.prototype), 
        _applyDecoratedDescriptor(_class.prototype, "resize", [ _lib.promise ], Object.getOwnPropertyDescriptor(_class.prototype, "resize"), _class.prototype), 
        _applyDecoratedDescriptor(_class.prototype, "close", [ _lib.memoized ], Object.getOwnPropertyDescriptor(_class.prototype, "close"), _class.prototype), 
        _applyDecoratedDescriptor(_class.prototype, "closeContainer", [ _lib.memoized ], Object.getOwnPropertyDescriptor(_class.prototype, "closeContainer"), _class.prototype), 
        _applyDecoratedDescriptor(_class.prototype, "destroyContainer", [ _lib.memoized, _lib.promise ], Object.getOwnPropertyDescriptor(_class.prototype, "destroyContainer"), _class.prototype), 
        _applyDecoratedDescriptor(_class.prototype, "closeComponent", [ _lib.memoized ], Object.getOwnPropertyDescriptor(_class.prototype, "closeComponent"), _class.prototype), 
        _applyDecoratedDescriptor(_class.prototype, "showContainer", [ _lib.memoized, _lib.promise ], Object.getOwnPropertyDescriptor(_class.prototype, "showContainer"), _class.prototype), 
        _applyDecoratedDescriptor(_class.prototype, "showComponent", [ _lib.memoized, _lib.promise ], Object.getOwnPropertyDescriptor(_class.prototype, "showComponent"), _class.prototype), 
        _applyDecoratedDescriptor(_class.prototype, "hideContainer", [ _lib.memoized, _lib.promise ], Object.getOwnPropertyDescriptor(_class.prototype, "hideContainer"), _class.prototype), 
        _applyDecoratedDescriptor(_class.prototype, "hideComponent", [ _lib.memoized, _lib.promise ], Object.getOwnPropertyDescriptor(_class.prototype, "hideComponent"), _class.prototype), 
        _applyDecoratedDescriptor(_class.prototype, "getComponentTemplate", [ _lib.promise ], Object.getOwnPropertyDescriptor(_class.prototype, "getComponentTemplate"), _class.prototype), 
        _applyDecoratedDescriptor(_class.prototype, "createComponentTemplate", [ _lib.memoized, _lib.promise ], Object.getOwnPropertyDescriptor(_class.prototype, "createComponentTemplate"), _class.prototype), 
        _applyDecoratedDescriptor(_class.prototype, "getParentTemplate", [ _lib.promise ], Object.getOwnPropertyDescriptor(_class.prototype, "getParentTemplate"), _class.prototype), 
        _applyDecoratedDescriptor(_class.prototype, "openContainer", [ _lib.memoized, _lib.promise ], Object.getOwnPropertyDescriptor(_class.prototype, "openContainer"), _class.prototype), 
        _applyDecoratedDescriptor(_class.prototype, "error", [ _lib.promise ], Object.getOwnPropertyDescriptor(_class.prototype, "error"), _class.prototype), 
        _class);
    }, /*!*************************!*\
  !*** ./src/lib/util.js ***!
  \*************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        function urlEncode(str) {
            return str.replace(/\?/g, "%3F").replace(/\&/g, "%26").replace(/#/g, "%23");
        }
        function camelToDasherize(string) {
            return string.replace(/([A-Z])/g, function(g) {
                return "-" + g.toLowerCase();
            });
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
        function stringifyWithFunctions(obj) {
            return JSON.stringify(obj, function(key, val) {
                return "function" == typeof val ? val.toString() : val;
            });
        }
        function safeGet(obj, prop) {
            var result = void 0;
            try {
                result = obj[prop];
            } catch (err) {}
            return result;
        }
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        }
        function get(item, path, def) {
            if (!path) return def;
            path = path.split(".");
            for (var i = 0; i < path.length; i++) {
                if ("object" !== ("undefined" == typeof item ? "undefined" : _typeof(item)) || null === item) return def;
                item = item[path[i]];
            }
            return void 0 === item ? def : item;
        }
        function safeInterval(method, time) {
            function runInterval() {
                timeout = setTimeout(runInterval, time), method.call();
            }
            var timeout = void 0;
            return timeout = setTimeout(runInterval, time), {
                cancel: function() {
                    clearTimeout(timeout);
                }
            };
        }
        function safeTimeout(method, time) {
            var interval = safeInterval(function() {
                time -= 100, time <= 0 && (interval.cancel(), method());
            }, 100);
        }
        function each(item, callback) {
            if (item) if (item instanceof Array) for (var len = item.length, i = 0; i < len; i++) callback(item[i], i); else if ("object" === ("undefined" == typeof item ? "undefined" : _typeof(item))) for (var keys = Object.keys(item), _len = keys.length, _i = 0; _i < _len; _i++) {
                var key = keys[_i];
                callback(item[key], key);
            }
        }
        function replaceObject(obj, callback) {
            var parentKey = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "", newobj = obj instanceof Array ? [] : {};
            return each(obj, function(item, key) {
                var fullKey = parentKey ? parentKey + "." + key : key, result = callback(item, key, fullKey);
                void 0 !== result ? newobj[key] = result : "object" === ("undefined" == typeof item ? "undefined" : _typeof(item)) && null !== item ? newobj[key] = replaceObject(item, callback, fullKey) : newobj[key] = item;
            }), newobj;
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
            for (var key in obj) void 0 !== obj[key] && null !== obj[key] && (obj[key] && "object" === _typeof(obj[key]) ? newobj = dotify(obj[key], "" + prefix + key, newobj) : newobj["" + prefix + key] = obj[key].toString());
            return newobj;
        }
        function WeakMap() {
            this.id = "__weakmap_" + uniqueID() + "__";
        }
        function getObjectID(obj) {
            if (null === obj || void 0 === obj || "object" !== ("undefined" == typeof obj ? "undefined" : _typeof(obj)) && "function" != typeof obj) throw new Error("Invalid object");
            var uid = objectIDs.get(obj);
            return uid || (uid = ("undefined" == typeof obj ? "undefined" : _typeof(obj)) + ":" + uniqueID(), 
            objectIDs.set(obj, uid)), uid;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        exports.urlEncode = urlEncode, exports.camelToDasherize = camelToDasherize, exports.dasherizeToCamel = dasherizeToCamel, 
        exports.extend = extend, exports.values = values, exports.uniqueID = uniqueID, exports.stringifyWithFunctions = stringifyWithFunctions, 
        exports.safeGet = safeGet, exports.capitalizeFirstLetter = capitalizeFirstLetter, 
        exports.get = get, exports.safeInterval = safeInterval, exports.safeTimeout = safeTimeout, 
        exports.each = each, exports.replaceObject = replaceObject, exports.copyProp = copyProp, 
        exports.dotify = dotify, exports.getObjectID = getObjectID, WeakMap.prototype = {
            set: function(item, value) {
                if (null === item || void 0 === item || "object" !== ("undefined" == typeof item ? "undefined" : _typeof(item)) && "function" != typeof item) throw new Error("Invalid key for WeakMap");
                var entry = item[this.id];
                entry && entry[0] === item ? entry[1] = value : Object.defineProperty(item, this.id, {
                    value: [ item, value ],
                    writable: !0
                });
            },
            get: function(item) {
                var entry = item[this.id];
                if (entry && entry[0] === item) return entry[1];
            },
            delete: function(item) {
                var entry = item[this.id];
                entry && entry[0] === item && (entry[0] = entry[1] = void 0);
            },
            has: function(item) {
                var entry = item[this.id];
                return entry && entry[0] === item;
            }
        };
        var objectIDs = new WeakMap();
    }, /*!***********************************************!*\
  !*** ./~/beaver-logger/client/performance.js ***!
  \***********************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        function now() {
            return enablePerformance ? performance.now() : Date.now();
        }
        function timer(startTime) {
            return startTime = void 0 !== startTime ? startTime : now(), {
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
            (0, _util.safeInterval)(function() {
                if (!(_config.config.heartbeatMaxThreshold && heartbeatCount > _config.config.heartbeatMaxThreshold)) {
                    heartbeatCount += 1;
                    var elapsed = heartBeatTimer.elapsed(), lag = elapsed - _config.config.heartbeatInterval, heartbeatPayload = {
                        count: heartbeatCount,
                        elapsed: elapsed
                    };
                    _config.config.heartbeatTooBusy && (heartbeatPayload.lag = lag, lag >= _config.config.heartbeatTooBusyThreshold && (0, 
                    _logger.info)("toobusy", heartbeatPayload, {
                        noConsole: !_config.config.heartbeatConsoleLog
                    })), (0, _logger.info)("heartbeat", heartbeatPayload, {
                        noConsole: !_config.config.heartbeatConsoleLog
                    });
                }
            }, _config.config.heartbeatInterval);
        }
        function initPerformance() {
            return enablePerformance ? ((0, _builders.addPayloadBuilder)(function() {
                var payload = {};
                return payload.client_elapsed = clientTimer.elapsed(), enablePerformance && (payload.req_elapsed = reqTimer.elapsed()), 
                payload;
            }), void _util.windowReady.then(function() {
                var keys = [ "connectEnd", "connectStart", "domComplete", "domContentLoadedEventEnd", "domContentLoadedEventStart", "domInteractive", "domLoading", "domainLookupEnd", "domainLookupStart", "fetchStart", "loadEventEnd", "loadEventStart", "navigationStart", "redirectEnd", "redirectStart", "requestStart", "responseEnd", "responseStart", "secureConnectionStart", "unloadEventEnd", "unloadEventStart" ], timing = {};
                keys.forEach(function(key) {
                    timing[key] = parseInt(window.performance.timing[key], 10) || 0;
                });
                var offset = timing.connectEnd - timing.navigationStart;
                timing.connectEnd && Object.keys(timing).forEach(function(name) {
                    var time = timing[name];
                    time && (0, _logger.info)("timing_" + name, {
                        client_elapsed: parseInt(time - timing.connectEnd - (clientTimer.startTime - offset), 10),
                        req_elapsed: parseInt(time - timing.connectEnd, 10)
                    });
                }), (0, _logger.info)("timing", timing), (0, _logger.info)("memory", window.performance.memory), 
                (0, _logger.info)("navigation", window.performance.navigation), window.performance.getEntries && window.performance.getEntries().forEach(function(resource) {
                    [ "link", "script", "img", "css" ].indexOf(resource.initiatorType) > -1 && (0, _logger.info)(resource.initiatorType, resource);
                });
            })) : (0, _logger.info)("no_performance_data");
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.reqTimer = exports.clientTimer = void 0, exports.now = now, exports.reqStartElapsed = reqStartElapsed, 
        exports.initHeartBeat = initHeartBeat, exports.initPerformance = initPerformance;
        var _config = __webpack_require__(/*! ./config */ 9), _logger = __webpack_require__(/*! ./logger */ 12), _builders = __webpack_require__(/*! ./builders */ 11), _util = __webpack_require__(/*! ./util */ 13), enablePerformance = window && window.performance && performance.now && performance.timing && performance.timing.connectEnd && performance.timing.navigationStart && Math.abs(performance.now() - Date.now()) > 1e3 && performance.now() - (performance.timing.connectEnd - performance.timing.navigationStart) > 0, clientTimer = exports.clientTimer = timer(), reqTimer = exports.reqTimer = timer(reqStartElapsed());
    }, /*!******************************************!*\
  !*** ./~/post-robot/src/compat/index.js ***!
  \******************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _ie = __webpack_require__(/*! ./ie */ 45);
        Object.keys(_ie).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _ie[key];
                }
            });
        });
    }, /*!********************************************!*\
  !*** ./~/post-robot/src/conf/constants.js ***!
  \********************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var CONSTANTS = exports.CONSTANTS = {
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
                ERROR: "postrobot_error"
            },
            SEND_STRATEGIES: {
                POST_MESSAGE: "postrobot_post_message",
                BRIDGE: "postrobot_bridge",
                GLOBAL: "postrobot_global"
            },
            MOCK_PROTOCOL: "mock:",
            FILE_PROTOCOL: "file:",
            BRIDGE_NAME_PREFIX: "__postrobot_bridge__",
            POSTROBOT_PROXY: "__postrobot_proxy__"
        };
        exports.POST_MESSAGE_NAMES_LIST = Object.keys(CONSTANTS.POST_MESSAGE_NAMES).map(function(key) {
            return CONSTANTS.POST_MESSAGE_NAMES[key];
        });
    }, /*!***********************************************!*\
  !*** ./~/post-robot/src/drivers/listeners.js ***!
  \***********************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        function resetListeners() {
            _global.global.listeners.request = [], _global.global.listeners.response = [];
        }
        function isRegex(item) {
            return "[object RegExp]" === Object.prototype.toString.call(item);
        }
        function matchDomain(domain, origin) {
            return "string" == typeof domain ? !isRegex(origin) && (!Array.isArray(origin) && ("*" === domain || origin === domain)) : isRegex(domain) ? isRegex(origin) ? domain.toString() === origin.toString() : !Array.isArray(origin) && origin.match(domain) : !!Array.isArray(domain) && (!isRegex(origin) && (Array.isArray(origin) ? JSON.stringify(domain) === JSON.stringify(origin) : domain.indexOf(origin) !== -1));
        }
        function getRequestListener(name, win, domain) {
            for (var result = {}, _iterator = _global.global.listeners.request, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                var _ref;
                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    if (_i = _iterator.next(), _i.done) break;
                    _ref = _i.value;
                }
                var requestListener = _ref;
                if (requestListener.name === name) {
                    var specifiedWin = requestListener.win && "*" !== requestListener.win, specifiedDomain = requestListener.domain && "*" !== requestListener.domain, matchedWin = specifiedWin && requestListener.win === win, matchedDomain = specifiedDomain && matchDomain(requestListener.domain, domain);
                    specifiedWin && specifiedDomain ? matchedWin && matchedDomain && (result.all = result.all || requestListener.options) : specifiedDomain ? matchedDomain && (result.domain = result.domain || requestListener.options) : specifiedWin ? matchedWin && (result.win = result.win || requestListener.options) : result.name = result.name || requestListener.options;
                }
            }
            return result.all || result.domain || result.win || result.name;
        }
        function removeRequestListener(options) {
            for (var _iterator2 = _global.global.listeners.request, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                var _ref2;
                if (_isArray2) {
                    if (_i2 >= _iterator2.length) break;
                    _ref2 = _iterator2[_i2++];
                } else {
                    if (_i2 = _iterator2.next(), _i2.done) break;
                    _ref2 = _i2.value;
                }
                var listener = _ref2;
                listener.options === options && _global.global.listeners.request.splice(_global.global.listeners.request.indexOf(listener), 1);
            }
        }
        function addRequestListener(name, win, domain, options, override) {
            var listener = getRequestListener(name, win, domain);
            if (listener) {
                if (!override) {
                    if (win) throw new Error("Request listener already exists for " + name + " on domain " + domain + " for specified window: " + (listener.win === win));
                    throw new Error("Request listener already exists for " + name + " on domain " + domain);
                }
                removeRequestListener(listener);
            }
            _global.global.clean.push(_global.global.listeners.request, {
                name: name,
                win: win,
                domain: domain,
                options: options
            });
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.listeners = void 0, exports.resetListeners = resetListeners, exports.getRequestListener = getRequestListener, 
        exports.removeRequestListener = removeRequestListener, exports.addRequestListener = addRequestListener;
        var _global = __webpack_require__(/*! ../global */ 4);
        _global.global.listeners = _global.global.listeners || {
            request: [],
            response: []
        };
        exports.listeners = _global.global.listeners;
    }, /*!************************************************!*\
  !*** ./~/post-robot/src/drivers/send/index.js ***!
  \************************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _defineProperty(obj, key, value) {
            return key in obj ? Object.defineProperty(obj, key, {
                value: value,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : obj[key] = value, obj;
        }
        function buildMessage(win, message) {
            var options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, id = _lib.util.uniqueID(), type = (0, 
            _lib.getWindowType)(), sourceDomain = _lib.util.getDomain(window);
            return _extends({}, message, options, {
                sourceDomain: sourceDomain,
                id: message.id || id,
                windowType: type
            });
        }
        function sendMessage(win, message, domain) {
            return _lib.promise.run(function() {
                message = buildMessage(win, message, {
                    data: (0, _lib.serializeMethods)(win, domain, message.data),
                    domain: domain
                });
                var level = void 0;
                if (level = _conf.POST_MESSAGE_NAMES_LIST.indexOf(message.name) !== -1 || message.type === _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK ? "debug" : "error" === message.ack ? "error" : "info", 
                _lib.log.logLevel(level, [ "\n\n\t", "#send", message.type.replace(/^postrobot_message_/, ""), "::", message.name, "::", domain || "*", "\n\n", message ]), 
                _conf.CONFIG.MOCK_MODE) return delete message.target, window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT].postMessage({
                    origin: _lib.util.getDomain(window),
                    source: window,
                    data: (0, _lib.jsonStringify)(message, 0, 2)
                });
                if (win === window) throw new Error("Attemping to send message to self");
                if ((0, _lib.isWindowClosed)(win)) throw new Error("Window is closed");
                _lib.log.debug("Running send message strategies", message);
                var messages = [], serializedMessage = (0, _lib.jsonStringify)(_defineProperty({}, _conf.CONSTANTS.WINDOW_PROPS.POSTROBOT, message), 0, 2);
                return _lib.promise.map(Object.keys(_strategies.SEND_MESSAGE_STRATEGIES), function(strategyName) {
                    return _lib.promise.run(function() {
                        if (!_conf.CONFIG.ALLOWED_POST_MESSAGE_METHODS[strategyName]) throw new Error("Strategy disallowed: " + strategyName);
                        return _strategies.SEND_MESSAGE_STRATEGIES[strategyName](win, serializedMessage, domain);
                    }).then(function() {
                        return messages.push(strategyName + ": success"), !0;
                    }, function(err) {
                        return messages.push(strategyName + ": " + (err.stack || err.toString()) + "\n"), 
                        !1;
                    });
                }).then(function(results) {
                    var success = _lib.util.some(results), status = message.type + " " + message.name + " " + (success ? "success" : "error") + ":\n  - " + messages.join("\n  - ") + "\n";
                    if (_lib.log.debug(status), !success) throw new Error(status);
                });
            });
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        };
        exports.buildMessage = buildMessage, exports.sendMessage = sendMessage;
        var _conf = __webpack_require__(/*! ../../conf */ 0), _lib = __webpack_require__(/*! ../../lib */ 2), _strategies = __webpack_require__(/*! ./strategies */ 49);
    }, /*!*****************************************!*\
  !*** ./~/post-robot/src/lib/cleanup.js ***!
  \*****************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        function cleanup(obj) {
            var tasks = [];
            return {
                getters: {
                    array: function() {
                        return [];
                    },
                    object: function() {
                        return {};
                    }
                },
                set: function(name, item) {
                    return obj[name] = item, this.register(function() {
                        delete obj[name];
                    }), item;
                },
                push: function(collection, item) {
                    return collection.push(item), this.register(function() {
                        var index = collection.indexOf(item);
                        index !== -1 && collection.splice(index, 1);
                    }), item;
                },
                setItem: function(mapping, key, item) {
                    return mapping[key] = item, this.register(function() {
                        delete mapping[key];
                    }), item;
                },
                register: function(name, method) {
                    method || (method = name, name = void 0), tasks.push({
                        complete: !1,
                        name: name,
                        run: function() {
                            if (!this.complete) return this.complete = !0, method();
                        }
                    });
                },
                hasTasks: function() {
                    return Boolean(tasks.filter(function(item) {
                        return !item.complete;
                    }).length);
                },
                all: function() {
                    for (var results = []; tasks.length; ) results.push(tasks.pop().run());
                    return _promise.SyncPromise.all(results).then(function() {});
                },
                run: function(name) {
                    for (var results = [], toClean = [], _iterator = tasks, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                        var _ref;
                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref = _iterator[_i++];
                        } else {
                            if (_i = _iterator.next(), _i.done) break;
                            _ref = _i.value;
                        }
                        var item = _ref;
                        item.name === name && (toClean.push(item), results.push(item.run()));
                    }
                    for (var _iterator2 = toClean, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                        var _ref2;
                        if (_isArray2) {
                            if (_i2 >= _iterator2.length) break;
                            _ref2 = _iterator2[_i2++];
                        } else {
                            if (_i2 = _iterator2.next(), _i2.done) break;
                            _ref2 = _i2.value;
                        }
                        var _item = _ref2;
                        tasks.splice(tasks.indexOf(_item), 1);
                    }
                    return _promise.SyncPromise.all(results).then(function() {});
                }
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.cleanup = cleanup;
        var _promise = __webpack_require__(/*! sync-browser-mocks/src/promise */ 3);
    }, /*!*****************************************!*\
  !*** ./~/post-robot/src/lib/promise.js ***!
  \*****************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.promise = exports.Promise = void 0;
        var _promise = __webpack_require__(/*! sync-browser-mocks/src/promise */ 3), _tick = __webpack_require__(/*! ./tick */ 31), Promise = exports.Promise = _promise.SyncPromise, promise = exports.promise = {
            Promise: Promise,
            run: function(method) {
                return Promise.resolve().then(method);
            },
            nextTick: function(method) {
                return new Promise(function(resolve, reject) {
                    (0, _tick.nextTick)(function() {
                        return promise.run(method).then(resolve, reject);
                    });
                });
            },
            method: function(_method) {
                return function() {
                    var _this = this, _arguments = arguments;
                    return Promise.resolve().then(function() {
                        return _method.apply(_this, _arguments);
                    });
                };
            },
            nodeify: function(prom, callback) {
                return callback ? void prom.then(function(result) {
                    callback(null, result);
                }, function(err) {
                    callback(err);
                }) : prom;
            },
            deNodeify: function(method) {
                for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) args[_key - 1] = arguments[_key];
                return new Promise(function(resolve, reject) {
                    try {
                        return args.length < method.length ? method.apply(void 0, args.concat([ function(err, result) {
                            return err ? reject(err) : resolve(result);
                        } ])) : promise.run(function() {
                            return method.apply(void 0, args);
                        }).then(resolve, reject);
                    } catch (err) {
                        return reject(err);
                    }
                });
            },
            map: function(items, method) {
                for (var results = [], _loop = function(i) {
                    results.push(promise.run(function() {
                        return method(items[i]);
                    }));
                }, i = 0; i < items.length; i++) _loop(i);
                return Promise.all(results);
            }
        };
    }, /*!**************************************!*\
  !*** ./~/post-robot/src/lib/tick.js ***!
  \**************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        function nextTick(method) {
            queue.push(method), window.postMessage(tickMessageName, "*");
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.nextTick = nextTick;
        var _util = __webpack_require__(/*! ./util */ 8), tickMessageName = "__nextTick__postRobot__" + _util.util.uniqueID(), queue = [];
        window.addEventListener("message", function(event) {
            if (event.data === tickMessageName) {
                var method = queue.shift();
                method.call();
            }
        });
    }, /*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
    function(module, exports, __webpack_require__) {
        "use strict";
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
    }, /*!**************************************!*\
  !*** ./src/component/child/index.js ***!
  \**************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) return obj;
            var newObj = {};
            if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
            return newObj.default = obj, newObj;
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
            }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.ChildComponent = void 0;
        var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        }, _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                Constructor;
            };
        }(), _client = __webpack_require__(/*! beaver-logger/client */ 17), $logger = _interopRequireWildcard(_client), _src = __webpack_require__(/*! post-robot/src */ 5), postRobot = _interopRequireWildcard(_src), _promise = __webpack_require__(/*! sync-browser-mocks/src/promise */ 3), _base = __webpack_require__(/*! ../base */ 15), _window = __webpack_require__(/*! ../window */ 16), _lib = __webpack_require__(/*! ../../lib */ 1), _constants = __webpack_require__(/*! ../../constants */ 7), _props = __webpack_require__(/*! ./props */ 56);
        exports.ChildComponent = function(_BaseComponent) {
            function ChildComponent(component) {
                _classCallCheck(this, ChildComponent);
                var _this = _possibleConstructorReturn(this, (ChildComponent.__proto__ || Object.getPrototypeOf(ChildComponent)).call(this, component));
                return _this.component = component, _this.sendLogsToOpener(), _this.component.log("construct_child"), 
                _this.onPropHandlers = [], _this.setProps(_this.getInitialProps(), (0, _window.getParentDomain)()), 
                _this.component.log("init_child"), _this.setWindows(), _this.onInit = _this.sendToParent(_constants.POST_MESSAGE.INIT, {
                    exports: _this.exports()
                }).then(function(_ref) {
                    var origin = _ref.origin, data = _ref.data;
                    return _this.context = data.context, window.xprops = _this.props = {}, _this.setProps(data.props, origin), 
                    _this.watchForResize(), _this;
                }).catch(function(err) {
                    throw _this.error(err), err;
                }), _this;
            }
            return _inherits(ChildComponent, _BaseComponent), _createClass(ChildComponent, [ {
                key: "init",
                value: function() {
                    return this.onInit;
                }
            }, {
                key: "onProps",
                value: function(handler) {
                    this.onPropHandlers.push(handler);
                }
            }, {
                key: "getParentComponentWindow",
                value: function() {
                    return (0, _window.getParentComponentWindow)();
                }
            }, {
                key: "getParentRenderWindow",
                value: function() {
                    return (0, _window.getParentRenderWindow)();
                }
            }, {
                key: "getInitialProps",
                value: function() {
                    var componentMeta = (0, _window.getComponentMeta)(), self = this;
                    if (componentMeta) {
                        var props = componentMeta.props;
                        if (props.type === _constants.INITIAL_PROPS.RAW) props = props.value; else {
                            if (props.type !== _constants.INITIAL_PROPS.UID) throw new Error("Unrecognized props type: " + props.type);
                            var parentComponentWindow = (0, _window.getParentComponentWindow)();
                            if (!postRobot.winutil.isSameDomain(parentComponentWindow)) {
                                if ("file:" === window.location.protocol) throw new Error("Can not get props from file:// domain");
                                throw new Error("Parent component window is on a different domain - expected " + (0, 
                                _lib.getDomain)() + " - can not retrieve props");
                            }
                            props = parentComponentWindow.__xcomponent__.props[componentMeta.uid];
                        }
                        if (!props) throw new Error("Initial props not found");
                        return (0, _lib.replaceObject)(props, function(value, key, fullKey) {
                            if (value && "__function__" === value.__type__) return function() {
                                var _this2 = this, _arguments = arguments;
                                return self.onInit.then(function() {
                                    var original = (0, _lib.get)(self.props, fullKey);
                                    return original.apply(_this2, _arguments);
                                });
                            };
                        });
                    }
                }
            }, {
                key: "setProps",
                value: function() {
                    var props = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, origin = arguments[1], required = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                    window.xprops = this.props = this.props || {}, (0, _lib.extend)(this.props, (0, 
                    _props.normalizeChildProps)(this.component, props, origin, required));
                    for (var _iterator = this.onPropHandlers, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                        var _ref2;
                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref2 = _iterator[_i++];
                        } else {
                            if (_i = _iterator.next(), _i.done) break;
                            _ref2 = _i.value;
                        }
                        var handler = _ref2;
                        handler.call(this, this.props);
                    }
                }
            }, {
                key: "sendToParent",
                value: function(name, data) {
                    var parentWindow = (0, _window.getParentComponentWindow)();
                    if (!parentWindow) throw new Error("Can not find parent component window to message");
                    return this.component.log("send_to_parent_" + name), postRobot.send((0, _window.getParentComponentWindow)(), name, data, {
                        domain: (0, _window.getParentDomain)()
                    });
                }
            }, {
                key: "setWindows",
                value: function() {
                    if (window.__activeXComponent__) throw new Error("[" + this.component.tag + "] Can not attach multiple components to the same window");
                    if (window.__activeXComponent__ = this, !(0, _window.getParentComponentWindow)()) throw new Error("[" + this.component.tag + "] Can not find parent window");
                    var componentMeta = (0, _window.getComponentMeta)();
                    if (componentMeta.tag !== this.component.tag) throw new Error("[" + this.component.tag + "] Parent is " + componentMeta.tag + " - can not attach " + this.component.tag);
                    this.watchForClose();
                }
            }, {
                key: "sendLogsToOpener",
                value: function() {
                    try {
                        var opener = postRobot.winutil.getOpener(window);
                        if (!opener || !window.console) return;
                        var _loop = function() {
                            if (_isArray2) {
                                if (_i2 >= _iterator2.length) return "break";
                                _ref3 = _iterator2[_i2++];
                            } else {
                                if (_i2 = _iterator2.next(), _i2.done) return "break";
                                _ref3 = _i2.value;
                            }
                            var frame = _ref3;
                            if (!postRobot.winutil.isSameDomain(frame) || !frame.console || frame === window) return "continue";
                            for (var _arr = [ "log", "debug", "info", "warn", "error" ], _loop3 = function() {
                                var level = _arr[_i3], original = window.console[level];
                                if (!original) return "continue";
                                try {
                                    window.console[level] = function() {
                                        try {
                                            return frame.console[level].apply(frame.console, arguments);
                                        } catch (err3) {}
                                        return original.apply(this, arguments);
                                    };
                                } catch (err2) {}
                            }, _i3 = 0; _i3 < _arr.length; _i3++) {
                                _loop3();
                            }
                            return {
                                v: void 0
                            };
                        };
                        _loop2: for (var _iterator2 = postRobot.winutil.getAllFramesInWindow(opener), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                            var _ref3, _ret = _loop();
                            switch (_ret) {
                              case "break":
                                break _loop2;

                              case "continue":
                                continue;

                              default:
                                if ("object" === ("undefined" == typeof _ret ? "undefined" : _typeof(_ret))) return _ret.v;
                            }
                        }
                    } catch (err) {}
                }
            }, {
                key: "watchForClose",
                value: function() {
                    var _this3 = this;
                    (0, _lib.onCloseWindow)((0, _window.getParentComponentWindow)(), function() {
                        if (_this3.component.log("parent_window_closed"), _this3.context === _constants.CONTEXT_TYPES.POPUP) return _this3.destroy();
                    });
                }
            }, {
                key: "enableAutoResize",
                value: function() {
                    var _ref4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, _ref4$width = _ref4.width, width = void 0 === _ref4$width || _ref4$width, _ref4$height = _ref4.height, height = void 0 === _ref4$height || _ref4$height;
                    this.autoResize = {
                        width: width,
                        height: height
                    }, this.watchForResize();
                }
            }, {
                key: "getAutoResize",
                value: function() {
                    var width = !1, height = !1, autoResize = this.autoResize || this.component.autoResize;
                    return "object" === ("undefined" == typeof autoResize ? "undefined" : _typeof(autoResize)) ? (width = Boolean(autoResize.width), 
                    height = Boolean(autoResize.height)) : autoResize && (width = !0, height = !0), 
                    {
                        width: width,
                        height: height
                    };
                }
            }, {
                key: "watchForResize",
                value: function() {
                    var _this4 = this, _getAutoResize = this.getAutoResize(), width = _getAutoResize.width, height = _getAutoResize.height;
                    if ((width || height) && this.component.dimensions && this.context !== _constants.CONTEXT_TYPES.POPUP) {
                        var el = document.documentElement;
                        if (window.navigator.userAgent.match(/MSIE (9|10)\./) && (el = document.body), !this.watchingForResize) return this.watchingForResize = !0, 
                        _promise.SyncPromise.try(function() {
                            if (!(0, _lib.dimensionsMatchViewport)(el, {
                                width: width,
                                height: height
                            })) return _this4.resizeToElement(el, {
                                width: width,
                                height: height
                            });
                        }).then(function() {
                            return (0, _lib.cycle)(function() {
                                return (0, _lib.onDimensionsChange)(el, {
                                    width: width,
                                    height: height
                                }).then(function(dimensions) {
                                    return _this4.resizeToElement(el, {
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
                            return self.setProps(props, this.origin, !1);
                        },
                        close: function() {
                            return self.destroy();
                        }
                    };
                }
            }, {
                key: "resize",
                value: function(width, height) {
                    var _this5 = this;
                    return _promise.SyncPromise.resolve().then(function() {
                        if (_this5.component.log("resize", {
                            width: width,
                            height: height
                        }), _this5.context !== _constants.CONTEXT_TYPES.POPUP) return _this5.sendToParent(_constants.POST_MESSAGE.RESIZE, {
                            width: width,
                            height: height
                        });
                    });
                }
            }, {
                key: "resizeToElement",
                value: function(el, _ref5) {
                    var _this6 = this, width = _ref5.width, height = _ref5.height, history = [], resize = function resize() {
                        return _promise.SyncPromise.try(function() {
                            for (var tracker = (0, _lib.trackDimensions)(el, {
                                width: width,
                                height: height
                            }), _tracker$check = tracker.check(), dimensions = _tracker$check.dimensions, _iterator3 = history, _isArray3 = Array.isArray(_iterator3), _i4 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                                var _ref6;
                                if (_isArray3) {
                                    if (_i4 >= _iterator3.length) break;
                                    _ref6 = _iterator3[_i4++];
                                } else {
                                    if (_i4 = _iterator3.next(), _i4.done) break;
                                    _ref6 = _i4.value;
                                }
                                var size = _ref6, widthMatch = !width || size.width === dimensions.width, heightMatch = !height || size.height === dimensions.height;
                                if (widthMatch && heightMatch) return;
                            }
                            return history.push({
                                width: dimensions.width,
                                height: dimensions.height
                            }), _this6.resize(width ? dimensions.width : null, height ? dimensions.height : null).then(function() {
                                if (tracker.check().changed) return resize();
                            });
                        });
                    };
                    return resize();
                }
            }, {
                key: "hide",
                value: function() {
                    return this.sendToParent(_constants.POST_MESSAGE.HIDE);
                }
            }, {
                key: "show",
                value: function() {
                    return this.sendToParent(_constants.POST_MESSAGE.SHOW);
                }
            }, {
                key: "userClose",
                value: function() {
                    return this.close(_constants.CLOSE_REASONS.USER_CLOSED);
                }
            }, {
                key: "close",
                value: function() {
                    var reason = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _constants.CLOSE_REASONS.CHILD_CALL;
                    this.component.log("close_child"), this.sendToParent(_constants.POST_MESSAGE.CLOSE, {
                        reason: reason
                    }, {
                        fireAndForget: !0
                    });
                }
            }, {
                key: "destroy",
                value: function() {
                    $logger.flush().then(function() {
                        window.close();
                    });
                }
            }, {
                key: "focus",
                value: function() {
                    this.component.log("focus"), window.focus();
                }
            }, {
                key: "error",
                value: function(err) {
                    return this.component.logError("error", {
                        error: err.stack || err.toString()
                    }), this.sendToParent(_constants.POST_MESSAGE.ERROR, {
                        error: err.stack || err.toString()
                    });
                }
            } ]), ChildComponent;
        }(_base.BaseComponent);
        (0, _window.isXComponentWindow)() && window.console && !function() {
            var logLevels = $logger.logLevels, _loop4 = function() {
                if (_isArray4) {
                    if (_i5 >= _iterator4.length) return "break";
                    _ref7 = _iterator4[_i5++];
                } else {
                    if (_i5 = _iterator4.next(), _i5.done) return "break";
                    _ref7 = _i5.value;
                }
                var level = _ref7;
                try {
                    var _original = window.console[level];
                    if (!_original || !_original.apply) return "continue";
                    window.console[level] = function() {
                        try {
                            var logLevel = window.LOG_LEVEL;
                            if (!logLevel || logLevels.indexOf(logLevel) === -1) return _original.apply(this, arguments);
                            if (logLevels.indexOf(level) > logLevels.indexOf(logLevel)) return;
                            return _original.apply(this, arguments);
                        } catch (err2) {}
                    }, "info" === level && (window.console.log = window.console[level]);
                } catch (err) {}
            };
            _loop5: for (var _iterator4 = logLevels, _isArray4 = Array.isArray(_iterator4), _i5 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator](); ;) {
                var _ref7, _ret4 = _loop4();
                switch (_ret4) {
                  case "break":
                    break _loop5;

                  case "continue":
                    continue;
                }
            }
        }();
    }, /*!******************************************!*\
  !*** ./src/component/parent/validate.js ***!
  \******************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        function validateProp(prop, key, value, props) {
            var required = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4], hasProp = null !== value && void 0 !== value && "" !== value;
            if (hasProp) {
                if (!value.then || !prop.promise) {
                    if ("function" === prop.type) {
                        if (!(value instanceof Function)) throw new Error("Prop is not of type function: " + key);
                    } else if ("string" === prop.type) {
                        if (!("string" == typeof value || prop.getter && (value instanceof Function || value && value.then))) throw new Error("Prop is not of type string: " + key);
                    } else if ("object" === prop.type) try {
                        JSON.stringify(value);
                    } catch (err) {
                        throw new Error("Unable to serialize prop: " + key);
                    } else if ("number" === prop.type && isNaN(parseInt(value, 10))) throw new Error("Prop is not a number: " + key);
                    "function" == typeof prop.validate && prop.validate(value, props);
                }
            } else if (required && prop.required !== !1 && !prop.hasOwnProperty("def")) throw new Error("Prop is required: " + key);
        }
        function validateProps(component, props) {
            var required = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
            props = props || {};
            for (var _iterator = Object.keys(component.props), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                var _ref;
                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    if (_i = _iterator.next(), _i.done) break;
                    _ref = _i.value;
                }
                var key = _ref, prop = component.props[key];
                if (prop.alias && props.hasOwnProperty(prop.alias)) {
                    var value = props[prop.alias];
                    delete props[prop.alias], props[key] || (props[key] = value);
                }
            }
            for (var _iterator2 = Object.keys(props), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                var _ref2;
                if (_isArray2) {
                    if (_i2 >= _iterator2.length) break;
                    _ref2 = _iterator2[_i2++];
                } else {
                    if (_i2 = _iterator2.next(), _i2.done) break;
                    _ref2 = _i2.value;
                }
                var _key = _ref2;
                if (!component.props.hasOwnProperty(_key)) throw new Error("[" + component.tag + "] Invalid prop: " + _key);
            }
            for (var _iterator3 = Object.keys(component.props), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                var _ref3;
                if (_isArray3) {
                    if (_i3 >= _iterator3.length) break;
                    _ref3 = _iterator3[_i3++];
                } else {
                    if (_i3 = _iterator3.next(), _i3.done) break;
                    _ref3 = _i3.value;
                }
                var _key2 = _ref3, _prop = component.props[_key2], _value = props[_key2];
                validateProp(_prop, _key2, _value, props, required);
            }
        }
        function validate(component, options) {
            var props = options.props || {};
            if (props.env && component.envUrls && !component.envUrls[props.env]) throw new Error("Invalid env: " + props.env);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.validateProp = validateProp, exports.validateProps = validateProps, 
        exports.validate = validate;
    }, /*!**********************!*\
  !*** ./src/error.js ***!
  \**********************/
    function(module, exports, __webpack_require__) {
        "use strict";
        function PopupOpenError(message) {
            this.message = message;
        }
        function IntegrationError(message) {
            this.message = message;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.PopupOpenError = PopupOpenError, exports.IntegrationError = IntegrationError, 
        PopupOpenError.prototype = Object.create(Error.prototype), IntegrationError.prototype = Object.create(Error.prototype);
    }, /*!***********************!*\
  !*** ./src/lib/fn.js ***!
  \***********************/
    function(module, exports, __webpack_require__) {
        "use strict";
        function noop() {}
        function once(method) {
            var called = !1;
            return function() {
                if (!called) return called = !0, method.apply(this, arguments);
            };
        }
        function memoize(method) {
            var results = {};
            return function() {
                var cacheKey = void 0;
                try {
                    cacheKey = JSON.stringify(Array.prototype.slice.call(arguments), function(key, val) {
                        return "function" == typeof val ? "xcomponent:memoize[" + (0, _util.getObjectID)(val) + "]" : val;
                    });
                } catch (err) {
                    throw new Error("Arguments not serializable -- can not be used to memoize");
                }
                return results.hasOwnProperty(cacheKey) || (results[cacheKey] = method.apply(this, arguments)), 
                results[cacheKey];
            };
        }
        function debounce(method) {
            var time = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100, timeout = void 0;
            return function() {
                var _this = this, _arguments = arguments;
                clearTimeout(timeout), timeout = setTimeout(function() {
                    return method.apply(_this, _arguments);
                }, time);
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.noop = noop, exports.once = once, exports.memoize = memoize, exports.debounce = debounce;
        var _util = __webpack_require__(/*! ./util */ 23);
    }, /*!******************************************************!*\
  !*** ./src/component/component/templates/parent.htm ***!
  \******************************************************/
    function(module, exports) {
        module.exports = '<div class="{CLASS.XCOMPONENT}-overlay {CLASS.FOCUS}">\n    <a href="#{CLASS.CLOSE}" class="{CLASS.CLOSE}"></a>\n\n    <div class="{CLASS.ELEMENT}"></div>\n</div>\n\n<style>\n    #{id} .{CLASS.XCOMPONENT}-overlay {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        background-color: rgba(0, 0, 0, 0.8);\n    }\n\n    #{id}.{CLASS.POPUP} .{CLASS.XCOMPONENT}-overlay {\n        cursor: pointer;\n    }\n\n    #{id}.{CLASS.LIGHTBOX} .{CLASS.ELEMENT} {\n        box-shadow: 2px 2px 10px 3px rgba(0, 0, 0, 0.4);\n        position: fixed;\n\n        top: 50%;\n        left: 50%;\n\n        transform: translate3d(-50%, -50%, 0);\n        -webkit-transform: translate3d(-50%, -50%, 0);\n        -moz-transform: translate3d(-50%, -50%, 0);\n        -o-transform: translate3d(-50%, -50%, 0);\n        -ms-transform: translate3d(-50%, -50%, 0);\n    }\n\n    #{id}.{CLASS.LIGHTBOX} iframe {\n        height: 100%;\n        width: 100%;\n    }\n\n    #{id} .{CLASS.CLOSE} {\n        position: absolute;\n        right: 16px;\n        top: 16px;\n        width: 16px;\n        height: 16px;\n        opacity: 0.6;\n    }\n\n    #{id} .{CLASS.CLOSE}:hover {\n        opacity: 1;\n    }\n\n    #{id} .{CLASS.CLOSE}:before, .{CLASS.CLOSE}:after {\n        position: absolute;\n        left: 8px;\n        content: \' \';\n        height: 16px;\n        width: 2px;\n        background-color: white;\n    }\n\n    #{id} .{CLASS.CLOSE}:before {\n        transform: rotate(45deg);\n    }\n\n    #{id} .{CLASS.CLOSE}:after {\n        transform: rotate(-45deg);\n    }\n</style>';
    }, /*!**************************!*\
  !*** ./src/interface.js ***!
  \**************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) return obj;
            var newObj = {};
            if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
            return newObj.default = obj, newObj;
        }
        function create(options) {
            return new _component.Component(options);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.CONSTANTS = exports.postRobot = exports.destroyAll = exports.getByTag = void 0, 
        exports.create = create;
        var _component = __webpack_require__(/*! ./component */ 61);
        Object.defineProperty(exports, "getByTag", {
            enumerable: !0,
            get: function() {
                return _component.getByTag;
            }
        }), Object.defineProperty(exports, "destroyAll", {
            enumerable: !0,
            get: function() {
                return _component.destroyAll;
            }
        });
        var _error = __webpack_require__(/*! ./error */ 35);
        Object.keys(_error).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _error[key];
                }
            });
        });
        var _src = __webpack_require__(/*! post-robot/src */ 5), _postRobot = _interopRequireWildcard(_src), _constants = __webpack_require__(/*! ./constants */ 7), _CONSTANTS = _interopRequireWildcard(_constants);
        exports.postRobot = _postRobot, exports.CONSTANTS = _CONSTANTS;
    }, /*!****************************************!*\
  !*** ./~/beaver-logger/client/init.js ***!
  \****************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        function init(conf) {
            if ((0, _util.extend)(_config.config, conf || {}), !initiated) {
                if (initiated = !0, _config.config.logPerformance && (0, _performance.initPerformance)(), 
                _config.config.heartbeat && (0, _performance.initHeartBeat)(), _config.config.logUnload) {
                    var async = !_config.config.logUnloadSync;
                    window.addEventListener("beforeunload", function() {
                        (0, _logger.info)("window_beforeunload"), (0, _logger.immediateFlush)(async);
                    }), window.addEventListener("unload", function() {
                        (0, _logger.info)("window_unload"), (0, _logger.immediateFlush)(async);
                    });
                }
                _config.config.flushInterval && setInterval(_logger.flush, _config.config.flushInterval), 
                window.beaverLogQueue && (window.beaverLogQueue.forEach(function(payload) {
                    (0, _logger.log)(payload.level, payload.event, payload);
                }), delete window.beaverLogQueue);
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.init = init;
        var _config = __webpack_require__(/*! ./config */ 9), _util = __webpack_require__(/*! ./util */ 13), _performance = __webpack_require__(/*! ./performance */ 24), _logger = __webpack_require__(/*! ./logger */ 12), initiated = !1;
    }, /*!***********************************************!*\
  !*** ./~/beaver-logger/client/transitions.js ***!
  \***********************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        function startTransition() {
            startTime = (0, _performance.now)();
        }
        function endTransition(toState) {
            startTime = startTime || (0, _performance.reqStartElapsed)();
            var currentTime = (0, _performance.now)(), elapsedTime = void 0;
            void 0 !== startTime && (elapsedTime = parseInt(currentTime - startTime, 0));
            var transitionName = "transition_" + currentState + "_to_" + toState;
            (0, _logger.info)(transitionName, {
                duration: elapsedTime
            }), (0, _logger.track)({
                transition: transitionName,
                transition_time: elapsedTime
            }), (0, _logger.immediateFlush)(), startTime = currentTime, currentState = toState, 
            pageID = (0, _util.uniqueID)();
        }
        function transition(toState) {
            startTransition(), endTransition(toState);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.startTransition = startTransition, exports.endTransition = endTransition, 
        exports.transition = transition;
        var _performance = __webpack_require__(/*! ./performance */ 24), _logger = __webpack_require__(/*! ./logger */ 12), _builders = __webpack_require__(/*! ./builders */ 11), _util = __webpack_require__(/*! ./util */ 13), _config = __webpack_require__(/*! ./config */ 9), windowID = (0, 
        _util.uniqueID)(), pageID = (0, _util.uniqueID)(), currentState = _config.config.initial_state_name, startTime = void 0;
        (0, _builders.addPayloadBuilder)(function() {
            return {
                windowID: windowID,
                pageID: pageID
            };
        }), (0, _builders.addMetaBuilder)(function() {
            return {
                state: "ui_" + currentState
            };
        });
    }, /*!***********************************!*\
  !*** ./~/hi-base32/src/base32.js ***!
  \***********************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        (function(global) {
            !function(root, undefined) {
                var NODE_JS = "undefined" != typeof module;
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
                    for (var b, c, str = "", length = bytes.length, i = 0, followingChars = 0; i < length; ) if (b = bytes[i++], 
                    b <= 127) str += String.fromCharCode(b); else {
                        if (b > 191 && b <= 223) c = 31 & b, followingChars = 1; else if (b <= 239) c = 15 & b, 
                        followingChars = 2; else {
                            if (!(b <= 247)) throw "not a UTF-8 string";
                            c = 7 & b, followingChars = 3;
                        }
                        for (var j = 0; j < followingChars; ++j) {
                            if (b = bytes[i++], b < 128 || b > 191) throw "not a UTF-8 string";
                            c <<= 6, c += 63 & b;
                        }
                        if (c >= 55296 && c <= 57343) throw "not a UTF-8 string";
                        if (c > 1114111) throw "not a UTF-8 string";
                        c <= 65535 ? str += String.fromCharCode(c) : (c -= 65536, str += String.fromCharCode((c >> 10) + 55296), 
                        str += String.fromCharCode((1023 & c) + 56320));
                    }
                    return str;
                }, decodeAsBytes = function(base32Str) {
                    base32Str = base32Str.replace(/=/g, "");
                    for (var v1, v2, v3, v4, v5, v6, v7, v8, bytes = [], index = 0, length = base32Str.length, i = 0, count = length >> 3 << 3; i < count; ) v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                    v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                    v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                    v6 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], v7 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                    v8 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], bytes[index++] = 255 & (v1 << 3 | v2 >>> 2), 
                    bytes[index++] = 255 & (v2 << 6 | v3 << 1 | v4 >>> 4), bytes[index++] = 255 & (v4 << 4 | v5 >>> 1), 
                    bytes[index++] = 255 & (v5 << 7 | v6 << 2 | v7 >>> 3), bytes[index++] = 255 & (v7 << 5 | v8);
                    var remain = length - count;
                    return 2 == remain ? (v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                    bytes[index++] = 255 & (v1 << 3 | v2 >>> 2)) : 4 == remain ? (v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                    v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                    v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], bytes[index++] = 255 & (v1 << 3 | v2 >>> 2), 
                    bytes[index++] = 255 & (v2 << 6 | v3 << 1 | v4 >>> 4)) : 5 == remain ? (v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                    v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                    v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                    bytes[index++] = 255 & (v1 << 3 | v2 >>> 2), bytes[index++] = 255 & (v2 << 6 | v3 << 1 | v4 >>> 4), 
                    bytes[index++] = 255 & (v4 << 4 | v5 >>> 1)) : 7 == remain && (v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                    v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                    v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                    v6 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], v7 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                    bytes[index++] = 255 & (v1 << 3 | v2 >>> 2), bytes[index++] = 255 & (v2 << 6 | v3 << 1 | v4 >>> 4), 
                    bytes[index++] = 255 & (v4 << 4 | v5 >>> 1), bytes[index++] = 255 & (v5 << 7 | v6 << 2 | v7 >>> 3)), 
                    bytes;
                }, encodeAscii = function(str) {
                    for (var v1, v2, v3, v4, v5, base32Str = "", length = str.length, i = 0, count = 5 * parseInt(length / 5); i < count; ) v1 = str.charCodeAt(i++), 
                    v2 = str.charCodeAt(i++), v3 = str.charCodeAt(i++), v4 = str.charCodeAt(i++), v5 = str.charCodeAt(i++), 
                    base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[31 & (v3 << 1 | v4 >>> 7)] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[31 & (v4 << 3 | v5 >>> 5)] + BASE32_ENCODE_CHAR[31 & v5];
                    var remain = length - count;
                    return 1 == remain ? (v1 = str.charCodeAt(i), base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[v1 << 2 & 31] + "======") : 2 == remain ? (v1 = str.charCodeAt(i++), 
                    v2 = str.charCodeAt(i), base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[v2 << 4 & 31] + "====") : 3 == remain ? (v1 = str.charCodeAt(i++), 
                    v2 = str.charCodeAt(i++), v3 = str.charCodeAt(i), base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[v3 << 1 & 31] + "===") : 4 == remain && (v1 = str.charCodeAt(i++), 
                    v2 = str.charCodeAt(i++), v3 = str.charCodeAt(i++), v4 = str.charCodeAt(i), base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[31 & (v3 << 1 | v4 >>> 7)] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[v4 << 3 & 31] + "="), 
                    base32Str;
                }, encodeUtf8 = function(str) {
                    var v1, v2, v3, v4, v5, code, i, end = !1, base32Str = "", index = 0, start = 0, bytes = 0, length = str.length;
                    do {
                        for (blocks[0] = blocks[5], blocks[1] = blocks[6], blocks[2] = blocks[7], i = start; index < length && i < 5; ++index) code = str.charCodeAt(index), 
                        code < 128 ? blocks[i++] = code : code < 2048 ? (blocks[i++] = 192 | code >> 6, 
                        blocks[i++] = 128 | 63 & code) : code < 55296 || code >= 57344 ? (blocks[i++] = 224 | code >> 12, 
                        blocks[i++] = 128 | code >> 6 & 63, blocks[i++] = 128 | 63 & code) : (code = 65536 + ((1023 & code) << 10 | 1023 & str.charCodeAt(++index)), 
                        blocks[i++] = 240 | code >> 18, blocks[i++] = 128 | code >> 12 & 63, blocks[i++] = 128 | code >> 6 & 63, 
                        blocks[i++] = 128 | 63 & code);
                        bytes += i - start, start = i - 5, index == length && ++index, index > length && i < 6 && (end = !0), 
                        v1 = blocks[0], i > 4 ? (v2 = blocks[1], v3 = blocks[2], v4 = blocks[3], v5 = blocks[4], 
                        base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[31 & (v3 << 1 | v4 >>> 7)] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[31 & (v4 << 3 | v5 >>> 5)] + BASE32_ENCODE_CHAR[31 & v5]) : 1 == i ? base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[v1 << 2 & 31] + "======" : 2 == i ? (v2 = blocks[1], 
                        base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[v2 << 4 & 31] + "====") : 3 == i ? (v2 = blocks[1], 
                        v3 = blocks[2], base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[v3 << 1 & 31] + "===") : 4 == i && (v2 = blocks[1], 
                        v3 = blocks[2], v4 = blocks[3], base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[31 & (v3 << 1 | v4 >>> 7)] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[v4 << 3 & 31] + "=");
                    } while (!end);
                    return base32Str;
                }, encodeBytes = function(bytes) {
                    for (var v1, v2, v3, v4, v5, base32Str = "", length = bytes.length, i = 0, count = 5 * parseInt(length / 5); i < count; ) v1 = bytes[i++], 
                    v2 = bytes[i++], v3 = bytes[i++], v4 = bytes[i++], v5 = bytes[i++], base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[31 & (v3 << 1 | v4 >>> 7)] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[31 & (v4 << 3 | v5 >>> 5)] + BASE32_ENCODE_CHAR[31 & v5];
                    var remain = length - count;
                    return 1 == remain ? (v1 = bytes[i], base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[v1 << 2 & 31] + "======") : 2 == remain ? (v1 = bytes[i++], 
                    v2 = bytes[i], base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[v2 << 4 & 31] + "====") : 3 == remain ? (v1 = bytes[i++], 
                    v2 = bytes[i++], v3 = bytes[i], base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[v3 << 1 & 31] + "===") : 4 == remain && (v1 = bytes[i++], 
                    v2 = bytes[i++], v3 = bytes[i++], v4 = bytes[i], base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[31 & (v3 << 1 | v4 >>> 7)] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[v4 << 3 & 31] + "="), 
                    base32Str;
                }, encode = function(input, asciiOnly) {
                    var notString = "string" != typeof input;
                    return notString && input.constructor == ArrayBuffer && (input = new Uint8Array(input)), 
                    notString ? encodeBytes(input) : asciiOnly ? encodeAscii(input) : encodeUtf8(input);
                }, decode = function(base32Str, asciiOnly) {
                    if (!asciiOnly) return toUtf8String(decodeAsBytes(base32Str));
                    var v1, v2, v3, v4, v5, v6, v7, v8, str = "", length = base32Str.indexOf("=");
                    length == -1 && (length = base32Str.length);
                    for (var i = 0, count = length >> 3 << 3; i < count; ) v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                    v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                    v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                    v6 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], v7 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                    v8 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], str += String.fromCharCode(255 & (v1 << 3 | v2 >>> 2)) + String.fromCharCode(255 & (v2 << 6 | v3 << 1 | v4 >>> 4)) + String.fromCharCode(255 & (v4 << 4 | v5 >>> 1)) + String.fromCharCode(255 & (v5 << 7 | v6 << 2 | v7 >>> 3)) + String.fromCharCode(255 & (v7 << 5 | v8));
                    var remain = length - count;
                    return 2 == remain ? (v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                    str += String.fromCharCode(255 & (v1 << 3 | v2 >>> 2))) : 4 == remain ? (v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                    v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                    v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], str += String.fromCharCode(255 & (v1 << 3 | v2 >>> 2)) + String.fromCharCode(255 & (v2 << 6 | v3 << 1 | v4 >>> 4))) : 5 == remain ? (v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                    v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                    v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                    str += String.fromCharCode(255 & (v1 << 3 | v2 >>> 2)) + String.fromCharCode(255 & (v2 << 6 | v3 << 1 | v4 >>> 4)) + String.fromCharCode(255 & (v4 << 4 | v5 >>> 1))) : 7 == remain && (v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                    v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                    v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                    v6 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], v7 = BASE32_DECODE_CHAR[base32Str.charAt(i++)], 
                    str += String.fromCharCode(255 & (v1 << 3 | v2 >>> 2)) + String.fromCharCode(255 & (v2 << 6 | v3 << 1 | v4 >>> 4)) + String.fromCharCode(255 & (v4 << 4 | v5 >>> 1)) + String.fromCharCode(255 & (v5 << 7 | v6 << 2 | v7 >>> 3))), 
                    str;
                };
                decode.asBytes = decodeAsBytes;
                var exports = {
                    encode: encode,
                    decode: decode
                };
                root.HI_BASE32_TEST && (exports.toUtf8String = toUtf8String), !root.HI_BASE32_TEST && NODE_JS ? module.exports = exports : root && (root.base32 = exports);
            }(void 0);
        }).call(exports, __webpack_require__(/*! ./../../webpack/buildin/global.js */ 32));
    }, /*!*******************************************!*\
  !*** ./~/post-robot/src/bridge/bridge.js ***!
  \*******************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        var _conf = __webpack_require__(/*! ../conf */ 0), _lib = __webpack_require__(/*! ../lib */ 2), _global = __webpack_require__(/*! ../global */ 4), _interface = __webpack_require__(/*! ../interface */ 10);
        _global.global.openTunnelToParent = function(_ref) {
            var name = _ref.name, source = _ref.source, canary = _ref.canary, _sendMessage = _ref.sendMessage, remoteWindow = (0, 
            _lib.getParent)(window);
            if (!remoteWindow) throw new Error("No parent window found to open tunnel to");
            return (0, _interface.send)(remoteWindow, _conf.CONSTANTS.POST_MESSAGE_NAMES.OPEN_TUNNEL, {
                name: name,
                sendMessage: function() {
                    if (!(0, _lib.isWindowClosed)(source)) {
                        try {
                            canary();
                        } catch (err) {
                            return;
                        }
                        _sendMessage.apply(this, arguments);
                    }
                }
            }, {
                domain: "*"
            });
        };
    }, /*!******************************************!*\
  !*** ./~/post-robot/src/bridge/child.js ***!
  \******************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        function getRemoteBridgeForWindow(win) {
            return _promise.SyncPromise.try(function() {
                for (var _iterator = (0, _lib.getFrames)(win), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                    var _ref;
                    if (_isArray) {
                        if (_i >= _iterator.length) break;
                        _ref = _iterator[_i++];
                    } else {
                        if (_i = _iterator.next(), _i.done) break;
                        _ref = _i.value;
                    }
                    var _frame = _ref;
                    try {
                        if (_frame && _frame !== window && (0, _lib.isSameDomain)(_frame) && _frame[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT]) return _frame;
                    } catch (err) {
                        continue;
                    }
                }
                try {
                    var frame = (0, _lib.getFrameByName)(win, (0, _common.getBridgeName)(_lib.util.getDomain()));
                    if (!frame) return;
                    return (0, _lib.isSameDomain)(frame) && frame[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT] ? frame : new _promise.SyncPromise(function(resolve) {
                        var interval = void 0, timeout = void 0;
                        interval = setInterval(function() {
                            return (0, _lib.isSameDomain)(frame) && frame[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT] ? (clearInterval(interval), 
                            clearTimeout(timeout), resolve(frame)) : void setTimeout(function() {
                                return clearInterval(interval), resolve();
                            }, 2e3);
                        }, 100);
                    });
                } catch (err) {
                    return;
                }
            });
        }
        function openTunnelToOpener() {
            return _promise.SyncPromise.try(function() {
                var opener = (0, _lib.getOpener)(window);
                if (opener && (0, _common.needsBridge)({
                    win: opener
                })) return (0, _common.registerRemoteWindow)(opener), getRemoteBridgeForWindow(opener).then(function(bridge) {
                    return bridge ? window.name ? bridge[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT].openTunnelToParent({
                        name: window.name,
                        source: window,
                        canary: function() {},
                        sendMessage: function(message) {
                            window && !window.closed && (0, _drivers.receiveMessage)({
                                data: message,
                                origin: this.origin,
                                source: this.source
                            });
                        }
                    }).then(function(_ref2) {
                        var source = _ref2.source, origin = _ref2.origin, data = _ref2.data;
                        if (source !== opener) throw new Error("Source does not match opener");
                        (0, _common.registerRemoteSendMessage)(source, origin, data.sendMessage);
                    }).catch(function(err) {
                        throw (0, _common.rejectRemoteSendMessage)(opener, err), err;
                    }) : (0, _common.rejectRemoteSendMessage)(opener, new Error("Can not register with opener: window does not have a name")) : (0, 
                    _common.rejectRemoteSendMessage)(opener, new Error("Can not register with opener: no bridge found in opener"));
                });
            });
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.openTunnelToOpener = openTunnelToOpener;
        var _promise = __webpack_require__(/*! sync-browser-mocks/src/promise */ 3), _conf = __webpack_require__(/*! ../conf */ 0), _lib = __webpack_require__(/*! ../lib */ 2), _drivers = __webpack_require__(/*! ../drivers */ 6), _common = __webpack_require__(/*! ./common */ 18);
    }, /*!*******************************************!*\
  !*** ./~/post-robot/src/bridge/parent.js ***!
  \*******************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        function listenForRegister(source, domain) {
            (0, _interface.on)(_conf.CONSTANTS.POST_MESSAGE_NAMES.OPEN_TUNNEL, {
                source: source,
                domain: domain
            }, function(_ref) {
                var origin = _ref.origin, data = _ref.data;
                if (origin !== domain) throw new Error("Domain " + domain + " does not match origin " + origin);
                if (!data.name) throw new Error("Register window expected to be passed window name");
                if (!data.sendMessage) throw new Error("Register window expected to be passed sendMessage method");
                var winDetails = _global.global.popupWindows[data.name];
                if (!winDetails) throw new Error("Window with name " + data.name + " does not exist, or was not opened by this window");
                if (!winDetails.domain) throw new Error("We do not have a registered domain for window " + data.name);
                if (winDetails.domain !== origin) throw new Error("Message origin " + origin + " does not matched registered window origin " + winDetails.domain);
                return (0, _common.registerRemoteSendMessage)(winDetails.win, domain, data.sendMessage), 
                {
                    sendMessage: function(message) {
                        window && !window.closed && (0, _drivers.receiveMessage)({
                            data: message,
                            origin: winDetails.domain,
                            source: winDetails.win
                        });
                    }
                };
            });
        }
        function openBridgeFrame(name, url) {
            _lib.log.debug("Opening bridge:", name, url);
            var iframe = document.createElement("iframe");
            return iframe.setAttribute("name", name), iframe.setAttribute("id", name), iframe.setAttribute("style", "display: none; margin: 0; padding: 0; border: 0px none; overflow: hidden;"), 
            iframe.setAttribute("frameborder", "0"), iframe.setAttribute("border", "0"), iframe.setAttribute("scrolling", "no"), 
            iframe.setAttribute("allowTransparency", "true"), iframe.setAttribute("tabindex", "-1"), 
            iframe.setAttribute("hidden", "true"), iframe.setAttribute("title", ""), iframe.setAttribute("role", "presentation"), 
            iframe.src = url, iframe;
        }
        function openBridge(url, domain) {
            return domain = domain || _lib.util.getDomainFromUrl(url), _global.global.bridges[domain] ? _global.global.bridges[domain] : _global.global.clean.setItem(_global.global.bridges, domain, _lib.promise.run(function() {
                if (_lib.util.getDomain() === domain) throw new Error("Can not open bridge on the same domain as current domain: " + domain);
                var name = (0, _common.getBridgeName)(domain), frame = (0, _lib.getFrameByName)(window, name);
                if (frame) throw new Error("Frame with name " + name + " already exists on page");
                var iframe = openBridgeFrame(name, url);
                return _common.documentBodyReady.then(function(body) {
                    return new _lib.promise.Promise(function(resolve, reject) {
                        setTimeout(resolve, 1);
                    }).then(function() {
                        body.appendChild(iframe), _global.global.clean.register("bridgeFrames", function() {
                            body.removeChild(iframe), delete _global.global.bridges[domain];
                        });
                        var bridge = iframe.contentWindow;
                        return listenForRegister(bridge, domain), new _lib.promise.Promise(function(resolve, reject) {
                            iframe.onload = resolve, iframe.onerror = reject;
                        }).then(function() {
                            return (0, _lib.onWindowReady)(bridge, _conf.CONFIG.BRIDGE_TIMEOUT, "Bridge " + url);
                        }).then(function() {
                            return bridge;
                        });
                    });
                });
            }));
        }
        function destroyBridges() {
            return _global.global.clean.run("bridgeFrames");
        }
        function linkUrl(win, url) {
            for (var _iterator = Object.keys(_global.global.popupWindows), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                var _ref2;
                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref2 = _iterator[_i++];
                } else {
                    if (_i = _iterator.next(), _i.done) break;
                    _ref2 = _i.value;
                }
                var name = _ref2, winOptions = _global.global.popupWindows[name];
                if (winOptions.win === win) {
                    winOptions.domain = _lib.util.getDomainFromUrl(url), (0, _common.registerRemoteWindow)(win);
                    break;
                }
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _slicedToArray = function() {
            function sliceIterator(arr, i) {
                var _arr = [], _n = !0, _d = !1, _e = void 0;
                try {
                    for (var _s, _i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), 
                    !i || _arr.length !== i); _n = !0) ;
                } catch (err) {
                    _d = !0, _e = err;
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
        exports.openBridge = openBridge, exports.destroyBridges = destroyBridges, exports.linkUrl = linkUrl;
        var _conf = __webpack_require__(/*! ../conf */ 0), _lib = __webpack_require__(/*! ../lib */ 2), _global = __webpack_require__(/*! ../global */ 4), _interface = __webpack_require__(/*! ../interface */ 10), _drivers = __webpack_require__(/*! ../drivers */ 6), _common = __webpack_require__(/*! ./common */ 18);
        _global.global.bridges = _global.global.bridges || {}, _global.global.popupWindows = _global.global.popupWindows || {};
        var windowOpen = window.open;
        window.open = function(url, name, options, last) {
            var domain = url;
            if (url && 0 === url.indexOf(_conf.CONSTANTS.MOCK_PROTOCOL)) {
                var _url$split = url.split("|"), _url$split2 = _slicedToArray(_url$split, 2);
                domain = _url$split2[0], url = _url$split2[1];
            }
            domain && (domain = _lib.util.getDomainFromUrl(domain));
            var win = windowOpen.call(this, url, name, options, last);
            return url && (0, _common.registerRemoteWindow)(win), name && _global.global.clean.setItem(_global.global.popupWindows, name, {
                win: win,
                domain: domain
            }), win;
        };
    }, /*!***************************************!*\
  !*** ./~/post-robot/src/compat/ie.js ***!
  \***************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        function emulateIERestrictions(sourceWindow, targetWindow) {
            if (!_conf.CONFIG.ALLOW_POSTMESSAGE_POPUP && (0, _lib.isSameTopWindow)(sourceWindow, targetWindow) === !1) throw new Error("Can not send and receive post messages between two different windows (disabled to emulate IE)");
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.emulateIERestrictions = emulateIERestrictions;
        var _conf = __webpack_require__(/*! ../conf */ 0), _lib = __webpack_require__(/*! ../lib */ 2);
    }, /*!*****************************************!*\
  !*** ./~/post-robot/src/conf/config.js ***!
  \*****************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _defineProperty(obj, key, value) {
            return key in obj ? Object.defineProperty(obj, key, {
                value: value,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : obj[key] = value, obj;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.CONFIG = void 0;
        var _ALLOWED_POST_MESSAGE, _constants = __webpack_require__(/*! ./constants */ 26), CONFIG = exports.CONFIG = {
            ALLOW_POSTMESSAGE_POPUP: !0,
            LOG_LEVEL: "info",
            BRIDGE_TIMEOUT: 5e3,
            ACK_TIMEOUT: 1e3,
            LOG_TO_PAGE: !1,
            MOCK_MODE: !1,
            ALLOWED_POST_MESSAGE_METHODS: (_ALLOWED_POST_MESSAGE = {}, _defineProperty(_ALLOWED_POST_MESSAGE, _constants.CONSTANTS.SEND_STRATEGIES.POST_MESSAGE, !0), 
            _defineProperty(_ALLOWED_POST_MESSAGE, _constants.CONSTANTS.SEND_STRATEGIES.BRIDGE, !0), 
            _defineProperty(_ALLOWED_POST_MESSAGE, _constants.CONSTANTS.SEND_STRATEGIES.GLOBAL, !0), 
            _ALLOWED_POST_MESSAGE)
        };
        0 === window.location.href.indexOf(_constants.CONSTANTS.FILE_PROTOCOL) && (CONFIG.ALLOW_POSTMESSAGE_POPUP = !0);
    }, /*!***************************************************!*\
  !*** ./~/post-robot/src/drivers/receive/index.js ***!
  \***************************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        function parseMessage(message) {
            try {
                message = (0, _lib.jsonParse)(message);
            } catch (err) {
                return;
            }
            if (message && (message = message[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT], message && message.type && _types.RECEIVE_MESSAGE_TYPES[message.type])) return message;
        }
        function receiveMessage(event) {
            if (!window || window.closed) throw new Error("Message recieved in closed window");
            try {
                if (!event.source) return;
            } catch (err) {
                return;
            }
            var source = event.source, origin = event.origin, data = event.data, message = parseMessage(data);
            if (message && (0 !== message.sourceDomain.indexOf(_conf.CONSTANTS.MOCK_PROTOCOL) && 0 !== message.sourceDomain.indexOf(_conf.CONSTANTS.FILE_PROTOCOL) || (origin = message.sourceDomain), 
            _global.global.receivedMessages.indexOf(message.id) === -1)) {
                _global.global.clean.push(_global.global.receivedMessages, message.id);
                var level = void 0;
                if (level = _conf.POST_MESSAGE_NAMES_LIST.indexOf(message.name) !== -1 || message.type === _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK ? "debug" : "error" === message.ack ? "error" : "info", 
                _lib.log.logLevel(level, [ "\n\n\t", "#receive", message.type.replace(/^postrobot_message_/, ""), "::", message.name, "::", origin, "\n\n", message ]), 
                (0, _lib.isWindowClosed)(source)) return _lib.log.debug("Source window is closed - can not send " + message.type + " " + message.name);
                message.data && (message.data = (0, _lib.deserializeMethods)(source, origin, message.data)), 
                _types.RECEIVE_MESSAGE_TYPES[message.type](source, origin, message);
            }
        }
        function messageListener(event) {
            try {
                event.source;
            } catch (err) {
                return;
            }
            event = {
                source: event.source || event.sourceElement,
                origin: event.origin || event.originalEvent.origin,
                data: event.data
            };
            try {
                (0, _compat.emulateIERestrictions)(event.source, window);
            } catch (err) {
                return;
            }
            receiveMessage(event);
        }
        function listenForMessages() {
            var listener = _lib.util.listen(window, "message", messageListener);
            _global.global.clean.register("listener", function() {
                listener.cancel();
            });
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.receiveMessage = receiveMessage, exports.messageListener = messageListener, 
        exports.listenForMessages = listenForMessages;
        var _conf = __webpack_require__(/*! ../../conf */ 0), _lib = __webpack_require__(/*! ../../lib */ 2), _compat = __webpack_require__(/*! ../../compat */ 25), _global = __webpack_require__(/*! ../../global */ 4), _types = __webpack_require__(/*! ./types */ 48);
        _global.global.receivedMessages = _global.global.receivedMessages || [];
    }, /*!***************************************************!*\
  !*** ./~/post-robot/src/drivers/receive/types.js ***!
  \***************************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _defineProperty(obj, key, value) {
            return key in obj ? Object.defineProperty(obj, key, {
                value: value,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : obj[key] = value, obj;
        }
        function matchDomain(domain, origin) {
            return "string" == typeof domain ? "*" === domain || origin === domain : "[object RegExp]" === Object.prototype.toString.call(domain) ? origin.match(domain) : !!Array.isArray(domain) && domain.indexOf(origin) !== -1;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.RECEIVE_MESSAGE_TYPES = void 0;
        var _RECEIVE_MESSAGE_TYPE, _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        }, _conf = __webpack_require__(/*! ../../conf */ 0), _lib = __webpack_require__(/*! ../../lib */ 2), _send = __webpack_require__(/*! ../send */ 28), _listeners = __webpack_require__(/*! ../listeners */ 27);
        exports.RECEIVE_MESSAGE_TYPES = (_RECEIVE_MESSAGE_TYPE = {}, _defineProperty(_RECEIVE_MESSAGE_TYPE, _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK, function(source, origin, message) {
            var options = _listeners.listeners.response[message.hash];
            if (!options) throw new Error("No handler found for post message ack for message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
            if (!matchDomain(options.domain, origin)) throw new Error("Ack origin " + origin + " does not match domain " + options.domain);
            options.ack = !0;
        }), _defineProperty(_RECEIVE_MESSAGE_TYPE, _conf.CONSTANTS.POST_MESSAGE_TYPE.REQUEST, function(source, origin, message) {
            function respond(data) {
                return message.fireAndForget || (0, _lib.isWindowClosed)(source) ? _lib.promise.Promise.resolve() : (0, 
                _send.sendMessage)(source, _extends({
                    target: message.originalSource,
                    hash: message.hash,
                    name: message.name
                }, data), origin);
            }
            var options = (0, _listeners.getRequestListener)(message.name, source, origin);
            return _lib.promise.Promise.all([ respond({
                type: _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK
            }), _lib.promise.run(function() {
                if (!options) throw new Error("No handler found for post message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                if (!matchDomain(options.domain, origin)) throw new Error("Request origin " + origin + " does not match domain " + options.domain);
                var data = message.data;
                return _lib.promise.deNodeify(options.handler, {
                    source: source,
                    origin: origin,
                    data: data
                });
            }).then(function(data) {
                return respond({
                    type: _conf.CONSTANTS.POST_MESSAGE_TYPE.RESPONSE,
                    ack: _conf.CONSTANTS.POST_MESSAGE_ACK.SUCCESS,
                    data: data
                });
            }, function(err) {
                return respond({
                    type: _conf.CONSTANTS.POST_MESSAGE_TYPE.RESPONSE,
                    ack: _conf.CONSTANTS.POST_MESSAGE_ACK.ERROR,
                    error: err.stack ? err.message + "\n" + err.stack : err.toString()
                });
            }) ]).catch(function(err) {
                return options && options.handleError ? options.handleError(err) : void _lib.log.error(err.stack || err.toString());
            });
        }), _defineProperty(_RECEIVE_MESSAGE_TYPE, _conf.CONSTANTS.POST_MESSAGE_TYPE.RESPONSE, function(source, origin, message) {
            var options = _listeners.listeners.response[message.hash];
            if (!options) throw new Error("No handler found for post message response for message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
            if (!matchDomain(options.domain, origin)) throw new Error("Response origin " + origin + " does not match domain " + options.domain);
            if (delete _listeners.listeners.response[message.hash], message.ack === _conf.CONSTANTS.POST_MESSAGE_ACK.ERROR) return options.respond(new Error(message.error));
            if (message.ack === _conf.CONSTANTS.POST_MESSAGE_ACK.SUCCESS) {
                var data = message.data || message.response;
                return options.respond(null, {
                    source: source,
                    origin: origin,
                    data: data
                });
            }
        }), _RECEIVE_MESSAGE_TYPE);
    }, /*!*****************************************************!*\
  !*** ./~/post-robot/src/drivers/send/strategies.js ***!
  \*****************************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _defineProperty(obj, key, value) {
            return key in obj ? Object.defineProperty(obj, key, {
                value: value,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : obj[key] = value, obj;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.SEND_MESSAGE_STRATEGIES = void 0;
        var _SEND_MESSAGE_STRATEG, _conf = __webpack_require__(/*! ../../conf */ 0), _lib = __webpack_require__(/*! ../../lib */ 2), _compat = __webpack_require__(/*! ../../compat */ 25), _bridge = __webpack_require__(/*! ../../bridge */ 19);
        exports.SEND_MESSAGE_STRATEGIES = (_SEND_MESSAGE_STRATEG = {}, _defineProperty(_SEND_MESSAGE_STRATEG, _conf.CONSTANTS.SEND_STRATEGIES.POST_MESSAGE, function(win, serializedMessage, domain) {
            return (0, _compat.emulateIERestrictions)(window, win), domain && 0 === domain.indexOf(_conf.CONSTANTS.MOCK_PROTOCOL) && (domain = win.location.protocol + "//" + win.location.host), 
            domain && 0 === domain.indexOf(_conf.CONSTANTS.FILE_PROTOCOL) && (domain = "*"), 
            win.postMessage(serializedMessage, domain);
        }), _defineProperty(_SEND_MESSAGE_STRATEG, _conf.CONSTANTS.SEND_STRATEGIES.BRIDGE, function(win, serializedMessage, domain) {
            if ((0, _lib.isSameDomain)(win)) throw new Error("Post message through bridge disabled between same domain windows");
            if ((0, _lib.isSameTopWindow)(window, win) !== !1) throw new Error("Can only use bridge to communicate between two different windows, not between frames");
            return (0, _bridge.sendBridgeMessage)(win, serializedMessage, domain);
        }), _defineProperty(_SEND_MESSAGE_STRATEG, _conf.CONSTANTS.SEND_STRATEGIES.GLOBAL, function(win, serializedMessage, domain) {
            if (!(0, _lib.isSameDomain)(win)) throw new Error("Post message through global disabled between different domain windows");
            if ((0, _lib.isSameTopWindow)(window, win) !== !1) throw new Error("Can only use global to communicate between two different windows, not between frames");
            var foreignGlobal = win[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT];
            if (!foreignGlobal) throw new Error("Can not find postRobot global on foreign window");
            return foreignGlobal.receiveMessage({
                source: window,
                origin: domain,
                data: serializedMessage
            });
        }), _SEND_MESSAGE_STRATEG);
    }, /*!**********************************************!*\
  !*** ./~/post-robot/src/interface/client.js ***!
  \**********************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        function request(options) {
            return _lib.promise.nodeify(new _lib.promise.Promise(function(resolve, reject) {
                if (!options.name) throw new Error("Expected options.name");
                if (!options.window) throw new Error("Expected options.window");
                if (_conf.CONFIG.MOCK_MODE) options.window = window; else if ("string" == typeof options.window) {
                    var el = document.getElementById(options.window);
                    if (!el) throw new Error("Expected options.window " + options.window + " to be a valid element id");
                    if ("iframe" !== el.tagName.toLowerCase()) throw new Error("Expected options.window " + options.window + " to be an iframe");
                    if (options.window = el.contentWindow, !options.window) throw new Error("Expected options.window");
                }
                options.domain = options.domain || "*";
                var hash = options.name + "_" + _lib.util.uniqueID();
                if (_global.global.clean.setItem(_global.global.listeners.response, hash, options), 
                (0, _lib.isWindowClosed)(options.window)) throw new Error("Target window is closed");
                var hasResult = !1;
                return options.respond = function(err, result) {
                    return err || (hasResult = !0), err ? reject(err) : resolve(result);
                }, _lib.promise.run(function() {
                    if ((0, _lib.isAncestor)(window, options.window)) return (0, _lib.onWindowReady)(options.window);
                }).then(function() {
                    if ((0, _drivers.sendMessage)(options.window, {
                        hash: hash,
                        type: _conf.CONSTANTS.POST_MESSAGE_TYPE.REQUEST,
                        name: options.name,
                        data: options.data,
                        fireAndForget: options.fireAndForget
                    }, options.domain).catch(reject), options.fireAndForget) return resolve();
                    var ackTimeout = _lib.util.intervalTimeout(_conf.CONFIG.ACK_TIMEOUT, 100, function(remaining) {
                        return options.ack || (0, _lib.isWindowClosed)(options.window) ? ackTimeout.cancel() : remaining ? void 0 : reject(new Error("No ack for postMessage " + options.name + " in " + _conf.CONFIG.ACK_TIMEOUT + "ms"));
                    });
                    if (options.timeout) var timeout = _lib.util.intervalTimeout(options.timeout, 100, function(remaining) {
                        return hasResult || (0, _lib.isWindowClosed)(options.window) ? timeout.cancel() : remaining ? void 0 : reject(new Error("Post message response timed out after " + options.timeout + " ms"));
                    }, options.timeout);
                }).catch(reject);
            }), options.callback);
        }
        function _send(window, name, data, options, callback) {
            return callback || (options || "function" != typeof data ? "function" == typeof options && (callback = options, 
            options = {}) : (callback = data, options = {}, data = {})), options = options || {}, 
            options.window = window, options.name = name, options.data = data, options.callback = callback, 
            request(options);
        }
        function sendToParent(name, data, options, callback) {
            var win = (0, _lib.getAncestor)();
            return win ? _send(win, name, data, options, callback) : new _lib.promise.Promise(function(resolve, reject) {
                return reject(new Error("Window does not have a parent"));
            });
        }
        function client() {
            var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            if (!options.window) throw new Error("Expected options.window");
            return {
                send: function(name, data, callback) {
                    return _send(options.window, name, data, options, callback);
                }
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.send = void 0, exports.request = request, exports.sendToParent = sendToParent, 
        exports.client = client;
        var _conf = __webpack_require__(/*! ../conf */ 0), _drivers = __webpack_require__(/*! ../drivers */ 6), _global = __webpack_require__(/*! ../global */ 4), _lib = __webpack_require__(/*! ../lib */ 2);
        exports.send = _send;
    }, /*!**********************************************!*\
  !*** ./~/post-robot/src/interface/config.js ***!
  \**********************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        function enableMockMode() {
            _conf.CONFIG.MOCK_MODE = !0;
        }
        function disableMockMode() {
            _conf.CONFIG.MOCK_MODE = !1;
        }
        function disable() {
            delete window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT], window.removeEventListener("message", _drivers.messageListener);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.CONSTANTS = exports.CONFIG = void 0, exports.enableMockMode = enableMockMode, 
        exports.disableMockMode = disableMockMode;
        var _conf = __webpack_require__(/*! ../conf */ 0);
        Object.defineProperty(exports, "CONFIG", {
            enumerable: !0,
            get: function() {
                return _conf.CONFIG;
            }
        }), Object.defineProperty(exports, "CONSTANTS", {
            enumerable: !0,
            get: function() {
                return _conf.CONSTANTS;
            }
        }), exports.disable = disable;
        var _drivers = __webpack_require__(/*! ../drivers */ 6);
    }, /*!**********************************************!*\
  !*** ./~/post-robot/src/interface/server.js ***!
  \**********************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        function listen(options) {
            if (!options.name) throw new Error("Expected options.name");
            if (options.handler = options.handler || _lib.util.noop, options.errorHandler = options.errorHandler || function(err) {
                throw err;
            }, options.once) {
                var handler = options.handler;
                options.handler = _lib.util.once(function() {
                    return (0, _drivers.removeRequestListener)(options), handler.apply(this, arguments);
                });
            }
            var override = options.override || _conf.CONFIG.MOCK_MODE;
            if (options.source && (options.window = options.source), options.domain = options.domain || "*", 
            (0, _drivers.addRequestListener)(options.name, options.window, options.domain, options, override), 
            options.handleError = function(err) {
                options.errorHandler(err);
            }, options.window && options.errorOnClose) var interval = _lib.util.safeInterval(function() {
                (0, _lib.isWindowClosed)(options.window) && (interval.cancel(), options.handleError(new Error("Post message target window is closed")));
            }, 50);
            return {
                cancel: function() {
                    (0, _drivers.removeRequestListener)(options);
                }
            };
        }
        function _on(name, options, handler, errorHandler) {
            return "function" == typeof options && (errorHandler = handler, handler = options, 
            options = {}), options = options || {}, options.name = name, options.handler = handler || options.handler, 
            options.errorHandler = errorHandler || options.errorHandler, listen(options);
        }
        function once(name, options, handler, errorHandler) {
            "function" == typeof options && (errorHandler = handler, handler = options, options = {}), 
            options = options || {}, options.name = name, options.handler = handler || options.handler, 
            options.errorHandler = errorHandler || options.errorHandler, options.once = !0;
            var prom = new _lib.promise.Promise(function(resolve, reject) {
                options.handler = options.handler || function(event) {
                    return resolve(event);
                }, options.errorHandler = options.errorHandler || reject;
            }), myListener = listen(options);
            return _lib.util.extend(prom, myListener), prom;
        }
        function listener() {
            var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return {
                on: function(name, handler, errorHandler) {
                    return _on(name, options, handler, errorHandler);
                }
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.on = void 0, exports.listen = listen, exports.once = once, exports.listener = listener;
        var _conf = __webpack_require__(/*! ../conf */ 0), _lib = __webpack_require__(/*! ../lib */ 2), _drivers = __webpack_require__(/*! ../drivers */ 6);
        exports.on = _on;
    }, /*!*****************************************!*\
  !*** ./~/post-robot/src/lib/methods.js ***!
  \*****************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        function isSerialized(item, type) {
            return "object" === ("undefined" == typeof item ? "undefined" : _typeof(item)) && null !== item && item.__type__ === type;
        }
        function serializeMethod(destination, domain, method, name) {
            var id = _util.util.uniqueID();
            return _global.global.clean.setItem(_global.global.methods, id, {
                destination: destination,
                domain: domain,
                method: method
            }), {
                __type__: _conf.CONSTANTS.SERIALIZATION_TYPES.METHOD,
                __id__: id,
                __name__: name
            };
        }
        function serializeError(err) {
            return {
                __type__: _conf.CONSTANTS.SERIALIZATION_TYPES.ERROR,
                __message__: err.stack || err.message || err.toString()
            };
        }
        function serializeMethods(destination, domain, obj) {
            return _util.util.replaceObject({
                obj: obj
            }, function(item, key) {
                return "function" == typeof item ? serializeMethod(destination, domain, item, key) : item instanceof Error ? serializeError(item) : void 0;
            }).obj;
        }
        function deserializeMethod(source, origin, obj) {
            function wrapper() {
                var args = Array.prototype.slice.call(arguments);
                return _log.log.debug("Call foreign method", obj.__name__, args), (0, _interface.send)(source, _conf.CONSTANTS.POST_MESSAGE_NAMES.METHOD, {
                    id: obj.__id__,
                    name: obj.__name__,
                    args: args
                }, {
                    domain: origin
                }).then(function(_ref2) {
                    var data = _ref2.data;
                    return _log.log.debug("Got foreign method result", obj.__name__, data.result), data.result;
                });
            }
            return wrapper.__name__ = obj.__name__, wrapper.source = source, wrapper.origin = origin, 
            wrapper;
        }
        function deserializeError(source, origin, obj) {
            return new Error(obj.__message__);
        }
        function deserializeMethods(source, origin, obj) {
            return _util.util.replaceObject({
                obj: obj
            }, function(item, key) {
                return isSerialized(item, _conf.CONSTANTS.SERIALIZATION_TYPES.METHOD) ? deserializeMethod(source, origin, item) : isSerialized(item, _conf.CONSTANTS.SERIALIZATION_TYPES.ERROR) ? deserializeError(source, origin, item) : void 0;
            }).obj;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.listenForMethods = void 0;
        var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        exports.serializeMethod = serializeMethod, exports.serializeMethods = serializeMethods, 
        exports.deserializeMethod = deserializeMethod, exports.deserializeError = deserializeError, 
        exports.deserializeMethods = deserializeMethods;
        var _conf = __webpack_require__(/*! ../conf */ 0), _util = __webpack_require__(/*! ./util */ 8), _interface = __webpack_require__(/*! ../interface */ 10), _log = __webpack_require__(/*! ./log */ 20), _promise = __webpack_require__(/*! ./promise */ 30), _global = __webpack_require__(/*! ../global */ 4);
        _global.global.methods = _global.global.methods || {};
        exports.listenForMethods = _util.util.once(function() {
            (0, _interface.on)(_conf.CONSTANTS.POST_MESSAGE_NAMES.METHOD, {
                window: "*",
                origin: "*"
            }, function(_ref) {
                var source = _ref.source, origin = _ref.origin, data = _ref.data, meth = _global.global.methods[data.id];
                if (!meth) throw new Error("Could not find method with id: " + data.id);
                if (meth.destination !== source) throw new Error("Method window does not match");
                if (meth.domain && "*" !== meth.domain && origin !== meth.domain) throw new Error("Method domain " + meth.domain + " does not match origin " + origin);
                return _log.log.debug("Call local method", data.name, data.args), _promise.promise.run(function() {
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
    }, /*!***************************************!*\
  !*** ./~/post-robot/src/lib/ready.js ***!
  \***************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        function initOnReady() {
            (0, _interface.on)(_conf.CONSTANTS.POST_MESSAGE_NAMES.READY, {
                window: "*",
                domain: "*"
            }, function(event) {
                for (var _iterator = _global.global.readyPromises, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                    var _ref;
                    if (_isArray) {
                        if (_i >= _iterator.length) break;
                        _ref = _iterator[_i++];
                    } else {
                        if (_i = _iterator.next(), _i.done) break;
                        _ref = _i.value;
                    }
                    var item = _ref;
                    if (item.win === event.source) return void item.promise.resolve(event);
                }
                _global.global.clean.push(_global.global.readyPromises, {
                    win: event.source,
                    promise: new _promise.SyncPromise().resolve(event)
                });
            });
            var parent = (0, _windows.getAncestor)();
            parent && (0, _interface.send)(parent, _conf.CONSTANTS.POST_MESSAGE_NAMES.READY, {}, {
                domain: "*"
            }).catch(function(err) {
                _log.log.debug(err.stack || err.toString());
            });
        }
        function onWindowReady(win) {
            for (var timeout = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 5e3, name = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "Window", _iterator2 = _global.global.readyPromises, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                var _ref2;
                if (_isArray2) {
                    if (_i2 >= _iterator2.length) break;
                    _ref2 = _iterator2[_i2++];
                } else {
                    if (_i2 = _iterator2.next(), _i2.done) break;
                    _ref2 = _i2.value;
                }
                var item = _ref2;
                if (item.win === win) return item.promise;
            }
            var promise = new _promise.SyncPromise();
            return _global.global.clean.push(_global.global.readyPromises, {
                win: win,
                promise: promise
            }), setTimeout(function() {
                return promise.reject(new Error(name + " did not load after " + timeout + "ms"));
            }, timeout), promise;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.initOnReady = initOnReady, exports.onWindowReady = onWindowReady;
        var _conf = __webpack_require__(/*! ../conf */ 0), _windows = __webpack_require__(/*! ./windows */ 14), _interface = __webpack_require__(/*! ../interface */ 10), _log = __webpack_require__(/*! ./log */ 20), _promise = __webpack_require__(/*! sync-browser-mocks/src/promise */ 3), _global = __webpack_require__(/*! ../global */ 4);
        _global.global.readyPromises = _global.global.readyPromises || [];
    }, /*!******************************!*\
  !*** ./~/process/browser.js ***!
  \******************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        function defaultSetTimout() {
            throw new Error("setTimeout has not been defined");
        }
        function defaultClearTimeout() {
            throw new Error("clearTimeout has not been defined");
        }
        function runTimeout(fun) {
            if (cachedSetTimeout === setTimeout) return setTimeout(fun, 0);
            if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) return cachedSetTimeout = setTimeout, 
            setTimeout(fun, 0);
            try {
                return cachedSetTimeout(fun, 0);
            } catch (e) {
                try {
                    return cachedSetTimeout.call(null, fun, 0);
                } catch (e) {
                    return cachedSetTimeout.call(this, fun, 0);
                }
            }
        }
        function runClearTimeout(marker) {
            if (cachedClearTimeout === clearTimeout) return clearTimeout(marker);
            if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) return cachedClearTimeout = clearTimeout, 
            clearTimeout(marker);
            try {
                return cachedClearTimeout(marker);
            } catch (e) {
                try {
                    return cachedClearTimeout.call(null, marker);
                } catch (e) {
                    return cachedClearTimeout.call(this, marker);
                }
            }
        }
        function cleanUpNextTick() {
            draining && currentQueue && (draining = !1, currentQueue.length ? queue = currentQueue.concat(queue) : queueIndex = -1, 
            queue.length && drainQueue());
        }
        function drainQueue() {
            if (!draining) {
                var timeout = runTimeout(cleanUpNextTick);
                draining = !0;
                for (var len = queue.length; len; ) {
                    for (currentQueue = queue, queue = []; ++queueIndex < len; ) currentQueue && currentQueue[queueIndex].run();
                    queueIndex = -1, len = queue.length;
                }
                currentQueue = null, draining = !1, runClearTimeout(timeout);
            }
        }
        function Item(fun, array) {
            this.fun = fun, this.array = array;
        }
        function noop() {}
        var cachedSetTimeout, cachedClearTimeout, process = module.exports = {};
        !function() {
            try {
                cachedSetTimeout = "function" == typeof setTimeout ? setTimeout : defaultSetTimout;
            } catch (e) {
                cachedSetTimeout = defaultSetTimout;
            }
            try {
                cachedClearTimeout = "function" == typeof clearTimeout ? clearTimeout : defaultClearTimeout;
            } catch (e) {
                cachedClearTimeout = defaultClearTimeout;
            }
        }();
        var currentQueue, queue = [], draining = !1, queueIndex = -1;
        process.nextTick = function(fun) {
            var args = new Array(arguments.length - 1);
            if (arguments.length > 1) for (var i = 1; i < arguments.length; i++) args[i - 1] = arguments[i];
            queue.push(new Item(fun, args)), 1 !== queue.length || draining || runTimeout(drainQueue);
        }, Item.prototype.run = function() {
            this.fun.apply(null, this.array);
        }, process.title = "browser", process.browser = !0, process.env = {}, process.argv = [], 
        process.version = "", process.versions = {}, process.on = noop, process.addListener = noop, 
        process.once = noop, process.off = noop, process.removeListener = noop, process.removeAllListeners = noop, 
        process.emit = noop, process.binding = function(name) {
            throw new Error("process.binding is not supported");
        }, process.cwd = function() {
            return "/";
        }, process.chdir = function(dir) {
            throw new Error("process.chdir is not supported");
        }, process.umask = function() {
            return 0;
        };
    }, /*!**************************************!*\
  !*** ./src/component/child/props.js ***!
  \**************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        function normalizeChildProps(component, props, origin) {
            var required = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3], result = {}, _loop = function() {
                if (_isArray) {
                    if (_i >= _iterator.length) return "break";
                    _ref = _iterator[_i++];
                } else {
                    if (_i = _iterator.next(), _i.done) return "break";
                    _ref = _i.value;
                }
                var key = _ref;
                if (!props.hasOwnProperty(key) && !required) return "continue";
                var prop = component.props[key], value = props[key];
                if ("function" == typeof prop.childDef) if (value) {
                    if (prop.getter) {
                        var val = value;
                        value = function() {
                            return val.apply(this, arguments).then(function(res) {
                                return res ? res : prop.childDef.call();
                            });
                        };
                    }
                } else value = prop.getter ? function() {
                    return Promise.resolve(prop.childDef.call());
                } : prop.childDef.call();
                value && prop.sameDomain && origin !== (0, _lib.getDomain)(window) && (value = null), 
                result[key] = value, prop.alias && !result[prop.alias] && (result[prop.alias] = value);
            };
            _loop2: for (var _iterator = Object.keys(component.props), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                var _ref, _ret = _loop();
                switch (_ret) {
                  case "break":
                    break _loop2;

                  case "continue":
                    continue;
                }
            }
            return result;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.normalizeChildProps = normalizeChildProps;
        var _lib = __webpack_require__(/*! ../../lib */ 1);
    }, /*!******************************************!*\
  !*** ./src/component/component/index.js ***!
  \******************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) return obj;
            var newObj = {};
            if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
            return newObj.default = obj, newObj;
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
            }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
        }
        function getByTag(tag) {
            return components[tag];
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.Component = exports.components = void 0;
        var _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        }, _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                Constructor;
            };
        }();
        exports.getByTag = getByTag;
        for (var _src = __webpack_require__(/*! post-robot/src */ 5), postRobot = _interopRequireWildcard(_src), _client = __webpack_require__(/*! beaver-logger/client */ 17), $logger = _interopRequireWildcard(_client), _promise = __webpack_require__(/*! sync-browser-mocks/src/promise */ 3), _base = __webpack_require__(/*! ../base */ 15), _child = __webpack_require__(/*! ../child */ 33), _parent = __webpack_require__(/*! ../parent */ 22), _delegate = __webpack_require__(/*! ../delegate */ 60), _props = __webpack_require__(/*! ./props */ 58), _window = __webpack_require__(/*! ../window */ 16), _constants = __webpack_require__(/*! ../../constants */ 7), _drivers = __webpack_require__(/*! ../parent/drivers */ 21), _validate2 = __webpack_require__(/*! ./validate */ 59), _parent2 = __webpack_require__(/*! ./templates/parent.htm */ 37), _parent3 = _interopRequireDefault(_parent2), _component = __webpack_require__(/*! ./templates/component.htm */ 73), _component2 = _interopRequireDefault(_component), _drivers2 = __webpack_require__(/*! ../../drivers */ 65), drivers = _interopRequireWildcard(_drivers2), _lib = __webpack_require__(/*! ../../lib */ 1), components = exports.components = {}, Component = exports.Component = function(_BaseComponent) {
            function Component() {
                var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                _classCallCheck(this, Component);
                var _this = _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).call(this, options));
                _this.validate(options), _this.addProp(options, "tag"), _this.addProp(options, "name", _this.tag.replace(/-/g, "_")), 
                _this.props = _extends({}, _props.internalProps, options.props), _this.addProp(options, "dimensions"), 
                _this.addProp(options, "scrolling"), _this.addProp(options, "version", "latest"), 
                _this.addProp(options, "defaultEnv"), _this.addProp(options, "envUrls"), _this.addProp(options, "buildUrl"), 
                _this.addProp(options, "sandboxContainer", !0), _this.addProp(options, "bridgeUrl"), 
                _this.addProp(options, "bridgeUrls"), _this.addProp(options, "bridgeDomain"), _this.addProp(options, "bridgeDomains"), 
                _this.addProp(options, "url"), _this.addProp(options, "contexts", {});
                for (var _iterator = _constants.CONTEXT_TYPES_LIST, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                    var _ref;
                    if (_isArray) {
                        if (_i >= _iterator.length) break;
                        _ref = _iterator[_i++];
                    } else {
                        if (_i = _iterator.next(), _i.done) break;
                        _ref = _i.value;
                    }
                    var context = _ref;
                    _this.contexts[context] = void 0 === _this.contexts[context] || Boolean(_this.contexts[context]);
                }
                return _this.addProp(options, "defaultContext"), _this.addProp(options, "singleton"), 
                _this.addProp(options, "autoResize", !1), _this.addProp(options, "parentTemplate", _parent3.default), 
                _this.addProp(options, "componentTemplate", _component2.default), _this.addProp(options, "validateProps"), 
                _this.addProp(options, "domain"), _this.addProp(options, "domains"), components[_this.tag] = _this, 
                _this.registerDrivers(), _this.registerChild(), _this.listenDelegate(), _this;
            }
            return _inherits(Component, _BaseComponent), _createClass(Component, [ {
                key: "registerDrivers",
                value: function() {
                    for (var _iterator2 = Object.keys(drivers), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                        var _ref2;
                        if (_isArray2) {
                            if (_i2 >= _iterator2.length) break;
                            _ref2 = _iterator2[_i2++];
                        } else {
                            if (_i2 = _iterator2.next(), _i2.done) break;
                            _ref2 = _i2.value;
                        }
                        var driverName = _ref2, driver = drivers[driverName];
                        driver.isActive() && driver.register(this);
                    }
                }
            }, {
                key: "registerChild",
                value: function() {
                    if ((0, _window.isXComponentWindow)()) {
                        var componentMeta = (0, _window.getComponentMeta)();
                        componentMeta.tag === this.tag && (window.xchild = new _child.ChildComponent(this), 
                        window.xprops = window.xchild.props);
                    }
                }
            }, {
                key: "listenDelegate",
                value: function() {
                    var _this2 = this;
                    postRobot.on(_constants.POST_MESSAGE.DELEGATE + "_" + this.name, function(_ref3) {
                        var source = _ref3.source, origin = _ref3.origin, data = _ref3.data, domain = _this2.getDomain(null, {
                            env: data.env
                        });
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
                        var domain = (0, _lib.getDomainFromUrl)(url);
                        if (this.domain && domain === this.domain) return domain;
                        if (this.domains) for (var _iterator3 = Object.keys(this.domains), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                            var _ref4;
                            if (_isArray3) {
                                if (_i3 >= _iterator3.length) break;
                                _ref4 = _iterator3[_i3++];
                            } else {
                                if (_i3 = _iterator3.next(), _i3.done) break;
                                _ref4 = _i3.value;
                            }
                            var env = _ref4;
                            if ("test" !== env && domain === this.domains[env]) return domain;
                        }
                    }
                }
            }, {
                key: "getDomain",
                value: function(url) {
                    var props = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, domain = this.getValidDomain(url);
                    if (domain) return domain;
                    if (this.domain) return this.domain;
                    if (this.domains && props.env && this.domains[props.env]) return this.domains[props.env];
                    if (this.envUrls && props.env && this.envUrls[props.env]) return (0, _lib.getDomainFromUrl)(this.envUrls[props.env]);
                    if (this.envUrls && this.defaultEnv && this.envUrls[this.defaultEnv]) return (0, 
                    _lib.getDomainFromUrl)(this.envUrls[this.defaultEnv]);
                    if (this.url) return (0, _lib.getDomainFromUrl)(this.url);
                    if (url) {
                        var urlDomain = (0, _lib.getDomainFromUrl)(url);
                        if (urlDomain) return urlDomain;
                    }
                }
            }, {
                key: "isXComponent",
                value: function() {
                    return (0, _window.isXComponentWindow)();
                }
            }, {
                key: "isChild",
                value: function() {
                    return (0, _window.isXComponentWindow)() && (0, _window.getComponentMeta)().tag === this.tag;
                }
            }, {
                key: "parent",
                value: function(options) {
                    return new _parent.ParentComponent(this, null, options);
                }
            }, {
                key: "child",
                value: function(options) {
                    if (!window.xchild) throw new Error("Child not instantiated");
                    return window.xchild.component !== this, options && options.onEnter && options.onEnter.call(window.xchild), 
                    window.xchild;
                }
            }, {
                key: "attach",
                value: function(options) {
                    return this.child(options);
                }
            }, {
                key: "init",
                value: function(props, context, element) {
                    return context = this.getRenderContext(element, context), new _parent.ParentComponent(this, context, {
                        props: props
                    });
                }
            }, {
                key: "delegate",
                value: function(source) {
                    var options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    return new _delegate.DelegateComponent(this, source, options);
                }
            }, {
                key: "getRenderContext",
                value: function(element, context) {
                    var tag = this.tag, defaultContext = this.defaultContext, contexts = this.contexts;
                    if (element) {
                        if (context && !_drivers.RENDER_DRIVERS[context].requiresElement) throw new Error("[" + tag + "] " + context + " context can not be rendered into element");
                        context = _constants.CONTEXT_TYPES.IFRAME;
                    }
                    if (context) {
                        if (!contexts[context]) throw new Error("[" + tag + "] " + context + " context not allowed by component");
                        if (_drivers.RENDER_DRIVERS[context].requiresElement && !element) throw new Error("[" + tag + "] Must specify element to render to iframe");
                        return context;
                    }
                    if (defaultContext) return defaultContext;
                    for (var _arr = [ _constants.CONTEXT_TYPES.LIGHTBOX, _constants.CONTEXT_TYPES.POPUP ], _i4 = 0; _i4 < _arr.length; _i4++) {
                        var renderContext = _arr[_i4];
                        if (contexts[renderContext]) return renderContext;
                    }
                    throw new Error("[" + tag + "] No context options available for render");
                }
            }, {
                key: "render",
                value: function(props, element, context) {
                    var _this3 = this;
                    return _promise.SyncPromise.try(function() {
                        return context = _this3.getRenderContext(element, context), new _parent.ParentComponent(_this3, context, {
                            props: props
                        }).render(element);
                    });
                }
            }, {
                key: "renderTo",
                value: function(win, props, element, context) {
                    var _this4 = this;
                    return _promise.SyncPromise.try(function() {
                        return context = _this4.getRenderContext(element, context), new _parent.ParentComponent(_this4, context, {
                            props: props
                        }).renderTo(win, element);
                    });
                }
            }, {
                key: "getByTag",
                value: function(tag) {
                    return components[tag];
                }
            }, {
                key: "validate",
                value: function(options) {
                    return (0, _validate2.validate)(options);
                }
            }, {
                key: "log",
                value: function(event) {
                    var payload = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    $logger.info("xc_" + this.name + "_" + event, payload);
                }
            }, {
                key: "logWarning",
                value: function(event, payload) {
                    $logger.warn("xc_" + this.name + "_" + event, payload);
                }
            }, {
                key: "logError",
                value: function(event, payload) {
                    $logger.error("xc_" + this.name + "_" + event, payload);
                }
            } ]), Component;
        }(_base.BaseComponent), _loop = function() {
            if (_isArray4) {
                if (_i5 >= _iterator4.length) return "break";
                _ref5 = _iterator4[_i5++];
            } else {
                if (_i5 = _iterator4.next(), _i5.done) return "break";
                _ref5 = _i5.value;
            }
            var context = _ref5, contextName = (0, _lib.capitalizeFirstLetter)(context);
            Component.prototype["render" + contextName] = function(props, element) {
                return this.render(props, element, context);
            }, Component.prototype["render" + contextName + "To"] = function(win, props, element) {
                return this.renderTo(win, props, element, context);
            };
        }, _iterator4 = _constants.CONTEXT_TYPES_LIST, _isArray4 = Array.isArray(_iterator4), _i5 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator](); ;) {
            var _ref5, _ret = _loop();
            if ("break" === _ret) break;
        }
    }, /*!******************************************!*\
  !*** ./src/component/component/props.js ***!
  \******************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.internalProps = void 0;
        var _lib = __webpack_require__(/*! ../../lib */ 1);
        exports.internalProps = {
            uid: {
                type: "string",
                def: function() {
                    return (0, _lib.uniqueID)();
                },
                queryParam: !0
            },
            url: {
                type: "string",
                required: !1,
                promise: !0,
                sendToChild: !1
            },
            env: {
                type: "string",
                required: !1,
                queryParam: !0,
                def: function() {
                    return this.defaultEnv;
                }
            },
            version: {
                type: "string",
                required: !1,
                queryParam: !0
            },
            dimensions: {
                type: "object",
                required: !1
            },
            timeout: {
                type: "number",
                required: !1
            },
            onDisplay: {
                type: "function",
                required: !1,
                noop: !0,
                promisify: !0
            },
            onEnter: {
                type: "function",
                required: !1,
                noop: !0,
                promisify: !0
            },
            onClose: {
                type: "function",
                required: !1,
                noop: !0,
                once: !0,
                promisify: !0
            },
            onTimeout: {
                type: "function",
                required: !1,
                memoize: !0,
                promisify: !0,
                def: function() {
                    return function(err) {
                        return this.props.onError(err);
                    };
                }
            },
            onError: {
                type: "function",
                required: !1,
                promisify: !0,
                def: function() {
                    return function() {};
                },
                once: !0
            }
        };
    }, /*!*********************************************!*\
  !*** ./src/component/component/validate.js ***!
  \*********************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        function validateProps(options) {
            if (options.props && "object" !== _typeof(options.props)) throw new Error("[" + options.tag + "] Expected options.props to be an object");
            if (options.props) for (var _iterator = Object.keys(options.props), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                var _ref;
                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    if (_i = _iterator.next(), _i.done) break;
                    _ref = _i.value;
                }
                var key = _ref, prop = options.props[key];
                if (!prop || "object" !== ("undefined" == typeof prop ? "undefined" : _typeof(prop))) throw new Error("[" + options.tag + "] Expected options.props." + key + " to be an object");
                if (!prop.type) throw new Error("[" + options.tag + "] Expected prop.type");
                if (_constants.PROP_TYPES_LIST.indexOf(prop.type) === -1) throw new Error("[" + options.tag + "] Expected prop.type to be one of " + _constants.PROP_TYPES_LIST.join(", "));
                if (prop.required && prop.def) throw new Error("[" + options.tag + "] Required prop can not have a default value");
            }
        }
        function validate(options) {
            if (!options.tag || !options.tag.match(/^[a-z0-9-]+$/)) throw new Error("Invalid options.tag: " + options.tag);
            if (validateProps(options), options.dimensions) {
                if ("number" != typeof options.dimensions.width && "string" != typeof options.dimensions.width) throw new Error("[" + options.tag + "] Expected options.dimensions.width to be a number or string");
                if ("number" != typeof options.dimensions.height && "string" != typeof options.dimensions.height) throw new Error("[" + options.tag + "] Expected options.dimensions.height to be a number or string");
            }
            if (options.contexts) {
                for (var anyEnabled = !1, _iterator2 = Object.keys(options.contexts), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                    var _ref2;
                    if (_isArray2) {
                        if (_i2 >= _iterator2.length) break;
                        _ref2 = _iterator2[_i2++];
                    } else {
                        if (_i2 = _iterator2.next(), _i2.done) break;
                        _ref2 = _i2.value;
                    }
                    var context = _ref2;
                    if (_constants.CONTEXT_TYPES_LIST.indexOf(context) === -1) throw new Error("[" + options.tag + "] Unsupported context type: " + context);
                    (options.contexts[context] || void 0 === options.contexts[context]) && (anyEnabled = !0);
                }
                if (!anyEnabled) throw new Error("[" + options.tag + "] No context type is enabled");
                if (options.contexts.iframe !== !1 && !options.dimensions) throw new Error("[" + options.tag + "] dimesions.width and dimensions.height required for rendering to iframe");
            }
            if (options.defaultContext) {
                if (_constants.CONTEXT_TYPES_LIST.indexOf(options.defaultContext) === -1) throw new Error("[" + options.tag + "] Unsupported context type: " + options.defaultContext);
                if (options.contexts && !options.contexts[options.defaultContext]) throw new Error("[" + options.tag + "] Disallowed default context type: " + options.defaultContext);
            }
            if (options.envUrls) for (var _iterator3 = Object.keys(options.envUrls), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                var _ref3;
                if (_isArray3) {
                    if (_i3 >= _iterator3.length) break;
                    _ref3 = _iterator3[_i3++];
                } else {
                    if (_i3 = _iterator3.next(), _i3.done) break;
                    _ref3 = _i3.value;
                }
                var env = _ref3;
                if (!options.envUrls[env]) throw new Error("[" + options.tag + "] No url specified for env: " + env);
            }
            if (options.defaultEnv && !options.envUrls) throw new Error("[" + options.tag + "] options.envUrls must be set if passing in a defaultEnv");
            if (options.defaultEnv && !options.envUrls[options.defaultEnv]) throw new Error("[" + options.tag + "] Invalid default env: " + options.defaultEnv);
            if (!(options.url && "string" == typeof options.url || options.buildUrl || options.defaultEnv && "string" == typeof options.defaultEnv)) throw options.envUrls ? new Error("[" + options.tag + "] Expected options.defaultEnv to be a string") : new Error("[" + options.tag + "] Expected options.url to be a string");
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        exports.validate = validate;
        var _constants = __webpack_require__(/*! ../../constants */ 7);
    }, /*!*****************************************!*\
  !*** ./src/component/delegate/index.js ***!
  \*****************************************/
    function(module, exports, __webpack_require__) {
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
            }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.DelegateComponent = void 0;
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                Constructor;
            };
        }(), _base = __webpack_require__(/*! ../base */ 15), _parent = __webpack_require__(/*! ../parent */ 22), _drivers = __webpack_require__(/*! ../parent/drivers */ 21), _lib = __webpack_require__(/*! ../../lib */ 1);
        exports.DelegateComponent = function(_BaseComponent) {
            function DelegateComponent(component, source) {
                var options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                _classCallCheck(this, DelegateComponent);
                var _this = _possibleConstructorReturn(this, (DelegateComponent.__proto__ || Object.getPrototypeOf(DelegateComponent)).call(this, component, options));
                _this.component = component, _this.source = source, _this.context = options.context, 
                _this.props = options.props, _this.props = {
                    uid: options.props.uid,
                    dimensions: options.props.dimensions,
                    onClose: options.props.onClose,
                    onDisplay: options.props.onDisplay
                }, _this.focus = options.overrides.focus, _this.userClose = options.overrides.userClose, 
                _this.getDomain = options.overrides.getDomain, _this.getParentTemplate = options.overrides.getParentTemplate, 
                _this.getComponentTemplate = options.overrides.getComponentTemplate;
                for (var renderToParentOverrides = _drivers.RENDER_DRIVERS[options.context].renderToParentOverrides, _iterator = Object.keys(renderToParentOverrides), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                    var _ref;
                    if (_isArray) {
                        if (_i >= _iterator.length) break;
                        _ref = _iterator[_i++];
                    } else {
                        if (_i = _iterator.next(), _i.done) break;
                        _ref = _i.value;
                    }
                    var key = _ref;
                    _this[key] = _parent.ParentComponent.prototype[key];
                }
                return _this.childWindowName = options.childWindowName, _parent.ParentComponent.prototype.registerActiveComponent.call(_this), 
                _this.watchForClose(), _this;
            }
            return _inherits(DelegateComponent, _BaseComponent), _createClass(DelegateComponent, [ {
                key: "watchForClose",
                value: function() {
                    var _this2 = this, closeListener = (0, _lib.onCloseWindow)(this.source, function() {
                        return _this2.destroy();
                    });
                    (0, _lib.addEventListener)(window, "beforeunload", closeListener.cancel);
                }
            }, {
                key: "getOverrides",
                value: function(context) {
                    for (var renderToParentOverrides = _drivers.RENDER_DRIVERS[context].renderToParentOverrides, overrides = {}, self = this, _loop = function() {
                        if (_isArray2) {
                            if (_i2 >= _iterator2.length) return "break";
                            _ref2 = _iterator2[_i2++];
                        } else {
                            if (_i2 = _iterator2.next(), _i2.done) return "break";
                            _ref2 = _i2.value;
                        }
                        var key = _ref2;
                        overrides[key] = function() {
                            return _parent.ParentComponent.prototype[key].apply(self, arguments);
                        };
                    }, _iterator2 = Object.keys(renderToParentOverrides), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                        var _ref2, _ret = _loop();
                        if ("break" === _ret) break;
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
                    return _drivers.RENDER_DRIVERS[this.context];
                }
            } ]), DelegateComponent;
        }(_base.BaseComponent);
    }, /*!********************************!*\
  !*** ./src/component/index.js ***!
  \********************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _component = __webpack_require__(/*! ./component */ 57);
        Object.keys(_component).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _component[key];
                }
            });
        });
        var _parent = __webpack_require__(/*! ./parent */ 22);
        Object.keys(_parent).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _parent[key];
                }
            });
        });
        var _child = __webpack_require__(/*! ./child */ 33);
        Object.keys(_child).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _child[key];
                }
            });
        });
    }, /*!***************************************!*\
  !*** ./src/component/parent/props.js ***!
  \***************************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        function normalizeProp(component, instance, props, key, value) {
            var prop = component.props[key], hasProp = props.hasOwnProperty(key) && null !== value && void 0 !== value && "" !== value;
            if (!hasProp && prop.def && (value = prop.def instanceof Function ? prop.def.call(component, props) : prop.def), 
            !value && prop.alias && props[prop.alias] && (value = props[prop.alias]), prop.decorate && (value = prop.decorate(value)), 
            prop.value && (value = prop.value), prop.getter) {
                if (!value) return;
                if (value instanceof Function) value = value.bind(instance); else {
                    var val = value;
                    value = function() {
                        return val || _promise.SyncPromise.resolve(val);
                    };
                }
                value = (0, _lib.getter)(value, {
                    name: key,
                    timeout: prop.timeout
                });
                var _value = value;
                if (value = function() {
                    return component.log("call_getter_" + key), _value.apply(this, arguments).then(function(result) {
                        return component.log("return_getter_" + key), (0, _validate.validateProp)(prop, key, result, props), 
                        result;
                    });
                }, prop.memoize) {
                    var _val = (0, _lib.memoize)(value);
                    value = function() {
                        return _val();
                    };
                }
                return value;
            }
            if ("boolean" === prop.type) value = Boolean(value); else if ("function" === prop.type) if (value) {
                value = value.bind(instance), prop.denodeify && (value = (0, _lib.denodeify)(value)), 
                prop.promisify && (value = (0, _lib.promisify)(value));
                var original = value;
                value = function() {
                    return component.log("call_prop_" + key), original.apply(this, arguments);
                }, prop.once && (value = (0, _lib.once)(value)), prop.memoize && (value = (0, _lib.memoize)(value));
            } else !value && prop.noop && (value = _lib.noop, prop.denodeify && (value = (0, 
            _lib.denodeify)(value)), prop.promisify && (value = (0, _lib.promisify)(value))); else "string" === prop.type || "object" === prop.type || "number" === prop.type && void 0 !== value && (value = parseInt(value, 10));
            return value;
        }
        function normalizeProps(component, instance, props) {
            var required = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
            props = props || {};
            for (var result = {}, _iterator = Object.keys(component.props), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                var _ref;
                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    if (_i = _iterator.next(), _i.done) break;
                    _ref = _i.value;
                }
                var key = _ref;
                (required || props.hasOwnProperty(key)) && (result[key] = normalizeProp(component, instance, props, key, props[key]));
            }
            return result;
        }
        function propsToQuery(propsDef, props) {
            var params = {};
            return _promise.SyncPromise.all(Object.keys(props).map(function(key) {
                var prop = propsDef[key], queryParam = key;
                return "string" == typeof prop.queryParam && (queryParam = prop.queryParam), _promise.SyncPromise.resolve().then(function() {
                    var value = props[key];
                    if (value && prop.queryParam) return prop.getter ? value.call().then(function(result) {
                        return result;
                    }) : value;
                }).then(function(value) {
                    if (value) {
                        "function" == typeof prop.queryParam && (queryParam = prop.queryParam(value));
                        var result = void 0;
                        if ("boolean" == typeof value) result = "1"; else if ("string" == typeof value) result = value.toString(); else {
                            if ("function" == typeof value) return;
                            if ("object" === ("undefined" == typeof value ? "undefined" : _typeof(value))) {
                                if ("json" !== prop.serialization) {
                                    result = (0, _lib.dotify)(value, key);
                                    for (var dotkey in result) params[dotkey] = result[dotkey];
                                    return;
                                }
                                result = JSON.stringify(value);
                            } else "number" == typeof value && (result = value.toString());
                        }
                        params[queryParam] = result;
                    }
                });
            })).then(function() {
                return params;
            });
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        exports.normalizeProp = normalizeProp, exports.normalizeProps = normalizeProps, 
        exports.propsToQuery = propsToQuery;
        var _promise = __webpack_require__(/*! sync-browser-mocks/src/promise */ 3), _validate = __webpack_require__(/*! ./validate */ 34), _lib = __webpack_require__(/*! ../../lib */ 1);
    }, /*!********************************!*\
  !*** ./src/drivers/angular.js ***!
  \********************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.angular = void 0;
        var _lib = __webpack_require__(/*! ../lib */ 1);
        exports.angular = {
            isActive: function() {
                return Boolean(window.angular);
            },
            register: function(component) {
                window.angular.module(component.tag, []).directive((0, _lib.dasherizeToCamel)(component.tag), function() {
                    for (var scope = {}, _iterator = Object.keys(component.props), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                        var _ref;
                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref = _iterator[_i++];
                        } else {
                            if (_i = _iterator.next(), _i.done) break;
                            _ref = _i.value;
                        }
                        var key = _ref;
                        scope[key] = "=";
                    }
                    return {
                        scope: scope,
                        restrict: "E",
                        controller: function($scope, $element) {
                            function getProps() {
                                for (var instanceProps = {}, _iterator2 = Object.keys(scope), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                                    var _ref2;
                                    if (_isArray2) {
                                        if (_i2 >= _iterator2.length) break;
                                        _ref2 = _iterator2[_i2++];
                                    } else {
                                        if (_i2 = _iterator2.next(), _i2.done) break;
                                        _ref2 = _i2.value;
                                    }
                                    var key = _ref2;
                                    instanceProps[key] = $scope[key];
                                }
                                return instanceProps;
                            }
                            component.log("instantiate_angular_component");
                            var parent = component.init(getProps(), null, $element[0]);
                            parent.render($element[0]), $scope.$watch(function() {
                                parent.updateProps(getProps());
                            });
                        }
                    };
                });
            }
        };
    }, /*!******************************!*\
  !*** ./src/drivers/ember.js ***!
  \******************************/
    function(module, exports, __webpack_require__) {
        "use strict";
    }, /*!******************************!*\
  !*** ./src/drivers/index.js ***!
  \******************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _script = __webpack_require__(/*! ./script */ 67);
        Object.keys(_script).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _script[key];
                }
            });
        });
        var _react = __webpack_require__(/*! ./react */ 66);
        Object.keys(_react).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _react[key];
                }
            });
        });
        var _angular = __webpack_require__(/*! ./angular */ 63);
        Object.keys(_angular).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _angular[key];
                }
            });
        });
        var _ember = __webpack_require__(/*! ./ember */ 64);
        Object.keys(_ember).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _ember[key];
                }
            });
        });
    }, /*!******************************!*\
  !*** ./src/drivers/react.js ***!
  \******************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.react = void 0;
        var _lib = __webpack_require__(/*! ../lib */ 1);
        exports.react = {
            isActive: function() {
                return Boolean(window.React);
            },
            register: function(component) {
                component.react = window.React.createClass({
                    render: function() {
                        return window.React.createElement("div", null);
                    },
                    componentDidMount: function() {
                        component.log("instantiate_react_component");
                        var el = window.ReactDOM.findDOMNode(this), parent = component.init((0, _lib.extend)({}, this.props), null, el);
                        this.setState({
                            parent: parent
                        }), parent.render(el);
                    },
                    componentDidUpdate: function() {
                        this.state && this.state.parent && this.state.parent.updateProps((0, _lib.extend)({}, this.props));
                    }
                });
            }
        };
    }, /*!*******************************!*\
  !*** ./src/drivers/script.js ***!
  \*******************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var htmlComponent = exports.htmlComponent = {
            isActive: function() {
                return !0;
            },
            register: function register(component) {
                function render(element) {
                    if (element && element.tagName && "script" === element.tagName.toLowerCase() && element.attributes.type && "application/x-component" === element.attributes.type.value && element.attributes["data-component"] && element.attributes["data-component"].value === component.tag) {
                        component.log("instantiate_script_component");
                        var props = eval("(" + element.innerText + ")"), container = document.createElement("div");
                        element.parentNode.replaceChild(container, element), component.render(props, container);
                    }
                }
                function scan() {
                    for (var scriptTags = Array.prototype.slice.call(document.getElementsByTagName("script")), _iterator = scriptTags, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                        var _ref;
                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref = _iterator[_i++];
                        } else {
                            if (_i = _iterator.next(), _i.done) break;
                            _ref = _i.value;
                        }
                        var element = _ref;
                        render(element);
                    }
                }
                scan(), document.addEventListener("DOMContentLoaded", scan), window.addEventListener("load", scan), 
                document.addEventListener("DOMNodeInserted", function(event) {
                    render(event.target);
                });
            }
        };
    }, /*!************************!*\
  !*** ./src/lib/css.js ***!
  \************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        function isPerc(str) {
            return "string" == typeof str && /^[0-9]+%$/.test(str);
        }
        function isPx(str) {
            return "string" == typeof str && /^[0-9]+px$/.test(str);
        }
        function isCSS(str) {
            return isPerc(str) || isPx(str);
        }
        function isNum(num) {
            return "number" == typeof num;
        }
        function toNum(str) {
            return isNum(str) ? str : parseInt(str.match(/^([0-9]+)(px|%)$/)[1], 10);
        }
        function toPx(num) {
            return toNum(num) + "px";
        }
        function toPerc(num) {
            return toNum(num) + "%";
        }
        function toCSS(num) {
            return isPerc(num) ? num : toPx(num);
        }
        function mathCSS(num, action) {
            return isPerc(num) ? toPerc(action(toNum(num))) : toPx(Math.floor(action(toNum(num))));
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.isPerc = isPerc, exports.isPx = isPx, exports.isCSS = isCSS, exports.isNum = isNum, 
        exports.toNum = toNum, exports.toPx = toPx, exports.toPerc = toPerc, exports.toCSS = toCSS, 
        exports.mathCSS = mathCSS;
    }, /*!*******************************!*\
  !*** ./src/lib/decorators.js ***!
  \*******************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        function memoized(target, name, descriptor) {
            var method = descriptor.value;
            descriptor.value = function() {
                return this.__memoized__ = this.__memoized__ || {}, this.__memoized__.hasOwnProperty(name) || (this.__memoized__[name] = method.apply(this, arguments)), 
                this.__memoized__[name];
            };
        }
        function promise(target, name, descriptor) {
            var method = descriptor.value;
            descriptor.value = function() {
                var _this = this, _arguments = arguments;
                return _promise.SyncPromise.try(function() {
                    return method.apply(_this, _arguments);
                });
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.memoized = memoized, exports.promise = promise;
        var _promise = __webpack_require__(/*! sync-browser-mocks/src/promise */ 3);
    }, /*!************************!*\
  !*** ./src/lib/dom.js ***!
  \************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) return obj;
            var newObj = {};
            if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
            return newObj.default = obj, newObj;
        }
        function isElement(element) {
            return element instanceof window.Element || "object" === ("undefined" == typeof element ? "undefined" : _typeof(element)) && 1 === element.nodeType && "object" === _typeof(element.style) && "object" === _typeof(element.ownerDocument);
        }
        function getElement(id) {
            if (isElement(id)) return id;
            if ("string" == typeof id) {
                var element = document.getElementById(id);
                if (element) return element;
                if (document.querySelector) return document.querySelector(id);
            }
        }
        function elementReady(id) {
            return new _promise.SyncPromise(function(resolve, reject) {
                var el = getElement(id);
                if (el) return resolve(el);
                if ("complete" === window.document.readyState) return reject(new Error("Document is ready and element " + id + " does not exist"));
                var interval = setInterval(function() {
                    return el = getElement(id), el ? (clearInterval(interval), resolve(el)) : "complete" === window.document.readyState ? (clearInterval(interval), 
                    reject(new Error("Document is ready and element " + id + " does not exist"))) : void 0;
                }, 10);
            });
        }
        function popup(url, options) {
            var params = Object.keys(options).map(function(key) {
                if (options[key]) return key + "=" + options[key];
            }).filter(Boolean).join(","), win = window.open(url, options.name, params, !0);
            if (postRobot.winutil.isWindowClosed(win)) {
                var err = new _error.PopupOpenError("Can not open popup window - blocked");
                throw err;
            }
            return win;
        }
        function iframe(url, options, container) {
            container = getElement(container);
            for (var frame = document.createElement("iframe"), _iterator = Object.keys(options), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                var _ref;
                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    if (_i = _iterator.next(), _i.done) break;
                    _ref = _i.value;
                }
                var key = _ref;
                frame[key] = options[key];
            }
            return frame.frameBorder = "0", frame.allowTransparency = "true", container && container.appendChild(frame), 
            frame;
        }
        function onCloseWindow(win, callback) {
            callback = (0, _fn.once)(callback);
            var interval = void 0, checkWindowClosed = function() {
                if (postRobot.winutil.isWindowClosed(win, !1)) return clearInterval(interval), callback();
            };
            return interval = (0, _util.safeInterval)(checkWindowClosed, 50), checkWindowClosed(), 
            {
                cancel: function() {
                    interval.cancel(), callback = _fn.noop;
                }
            };
        }
        function addEventListener(obj, event, handler) {
            return obj.addEventListener(event, handler), {
                cancel: function() {
                    obj.removeEventListener(event, handler);
                }
            };
        }
        function scanForJavascript(str) {
            if (!str) return str;
            if (str.match(/<script|on\w+\s*=|javascript:|expression\s*\(|eval\(|new\s*Function/)) throw new Error("HTML contains potential javascript: " + str);
            return str;
        }
        function createElement() {
            var tag = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "div", options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, element = (arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, 
            document.createElement(tag));
            if (options.style && (0, _util.extend)(element.style, options.style), options.html && (element.innerHTML = options.html), 
            options.class && (element.className = options.class.join(" ")), options.attributes) for (var _iterator2 = Object.keys(options.attributes), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                var _ref2;
                if (_isArray2) {
                    if (_i2 >= _iterator2.length) break;
                    _ref2 = _iterator2[_i2++];
                } else {
                    if (_i2 = _iterator2.next(), _i2.done) break;
                    _ref2 = _i2.value;
                }
                var key = _ref2;
                element.setAttribute(key, options.attributes[key]);
            }
            return options.styleSheet && (element.styleSheet ? element.styleSheet.cssText = options.styleSheet : element.appendChild(document.createTextNode(options.styleSheet))), 
            element;
        }
        function addEventToClass(element, className, eventName, handler) {
            for (var handlers = [], _iterator3 = Array.prototype.slice.call(element.getElementsByClassName(className)), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                var _ref3;
                if (_isArray3) {
                    if (_i3 >= _iterator3.length) break;
                    _ref3 = _iterator3[_i3++];
                } else {
                    if (_i3 = _iterator3.next(), _i3.done) break;
                    _ref3 = _i3.value;
                }
                var el = _ref3, eventHandler = function(event) {
                    event.preventDefault(), event.stopPropagation(), handler();
                };
                handlers.push({
                    el: el,
                    eventHandler: eventHandler
                }), el.addEventListener(eventName, eventHandler);
            }
            return {
                cancel: function() {
                    for (var _iterator4 = handlers, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator](); ;) {
                        var _ref5;
                        if (_isArray4) {
                            if (_i4 >= _iterator4.length) break;
                            _ref5 = _iterator4[_i4++];
                        } else {
                            if (_i4 = _iterator4.next(), _i4.done) break;
                            _ref5 = _i4.value;
                        }
                        var _ref6 = _ref5, el = _ref6.el, eventHandler = _ref6.eventHandler;
                        el.removeEventListener(eventName, eventHandler);
                    }
                }
            };
        }
        function template(html, context) {
            return _promise.SyncPromise.try(function() {
                return "function" == typeof html ? html(context || {}) : html.replace(/\{([\w_\.]+)\}/g, function(variable) {
                    return (0, _util.get)(context, variable.slice(1, variable.length - 1), "");
                });
            }).then(function(result) {
                if ("string" != typeof result) throw new Error("Expected template to return string, got " + ("undefined" == typeof result ? "undefined" : _typeof(result)));
                return result;
            });
        }
        function getQueryParam(name) {
            return parseQuery(window.location.search.slice(1))[name];
        }
        function getDomain(win) {
            return win = win || window, win.mockDomain && 0 === win.mockDomain.indexOf("mock://") ? win.mockDomain : win.location.protocol + "//" + win.location.host;
        }
        function getDomainFromUrl(url) {
            var domain = void 0;
            return url.match(/^(https?|mock|file):\/\//) ? (domain = url, domain = domain.split("/").slice(0, 3).join("/")) : getDomain(window);
        }
        function formatQuery() {
            var obj = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return Object.keys(obj).filter(function(key) {
                return "string" == typeof obj[key];
            }).map(function(key) {
                return (0, _util.urlEncode)(key) + "=" + (0, _util.urlEncode)(obj[key]);
            }).join("&");
        }
        function extendQuery(originalQuery) {
            var props = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return props && Object.keys(props).length ? formatQuery(_extends({}, parseQuery(originalQuery), props)) : originalQuery;
        }
        function extendUrl(url) {
            var options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, query = options.query || {}, hash = options.hash || {}, originalUrl = void 0, originalQuery = void 0, originalHash = void 0, _url$split = url.split("#"), _url$split2 = _slicedToArray(_url$split, 2);
            originalUrl = _url$split2[0], originalHash = _url$split2[1];
            var _originalUrl$split = originalUrl.split("?"), _originalUrl$split2 = _slicedToArray(_originalUrl$split, 2);
            originalUrl = _originalUrl$split2[0], originalQuery = _originalUrl$split2[1];
            var queryString = extendQuery(originalQuery, query), hashString = extendQuery(originalHash, hash);
            return queryString && (originalUrl = originalUrl + "?" + queryString), hashString && (originalUrl = originalUrl + "#" + hashString), 
            originalUrl;
        }
        function elementStoppedMoving(element) {
            var timeout = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 5e3;
            return new _promise.SyncPromise(function(resolve, reject) {
                element = getElement(element);
                var start = element.getBoundingClientRect(), interval = void 0, timer = void 0;
                interval = setInterval(function() {
                    var end = element.getBoundingClientRect();
                    return start.top === end.top && start.bottom === end.bottom && start.left === end.left && start.right === end.right && start.width === end.width && start.height === end.height ? (clearTimeout(timer), 
                    clearInterval(interval), resolve()) : void (start = end);
                }, 50), timer = setTimeout(function() {
                    clearInterval(interval), reject(new Error("Timed out waiting for element to stop animating after " + timeout + "ms"));
                }, timeout);
            });
        }
        function getOpener(win) {
            if (win) try {
                return win.opener;
            } catch (err) {
                return;
            }
        }
        function getParent(win) {
            if (win) try {
                if (win.parent && win.parent !== win) return win.parent;
            } catch (err) {
                return;
            }
        }
        function getCurrentDimensions(el) {
            return {
                width: el.offsetWidth,
                height: el.offsetHeight
            };
        }
        function changeStyle(el, styles) {
            return new _promise.SyncPromise(function(resolve) {
                for (var _iterator6 = Object.keys(styles), _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator](); ;) {
                    var _ref8;
                    if (_isArray6) {
                        if (_i6 >= _iterator6.length) break;
                        _ref8 = _iterator6[_i6++];
                    } else {
                        if (_i6 = _iterator6.next(), _i6.done) break;
                        _ref8 = _i6.value;
                    }
                    var key = _ref8;
                    el.style[key] = styles[key];
                }
                setTimeout(resolve, 1);
            });
        }
        function setOverflow(el) {
            var value = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "auto", _el$style = el.style, overflow = _el$style.overflow, overflowX = _el$style.overflowX, overflowY = _el$style.overflowY;
            return el.style.overflow = el.style.overflowX = el.overflowY = value, {
                reset: function() {
                    el.style.overflow = overflow, el.style.overflowX = overflowX, el.style.overflowY = overflowY;
                }
            };
        }
        function dimensionsDiff(one, two, _ref9) {
            var _ref9$width = _ref9.width, width = void 0 === _ref9$width || _ref9$width, _ref9$height = _ref9.height, height = void 0 === _ref9$height || _ref9$height, _ref9$threshold = _ref9.threshold, threshold = void 0 === _ref9$threshold ? 0 : _ref9$threshold;
            return !!(width && Math.abs(one.width - two.width) > threshold) || !!(height && Math.abs(one.height - two.height) > threshold);
        }
        function trackDimensions(el, _ref10) {
            var _ref10$width = _ref10.width, width = void 0 === _ref10$width || _ref10$width, _ref10$height = _ref10.height, height = void 0 === _ref10$height || _ref10$height, _ref10$threshold = _ref10.threshold, threshold = void 0 === _ref10$threshold ? 0 : _ref10$threshold, currentDimensions = getCurrentDimensions(el);
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
        function onDimensionsChange(el, _ref11) {
            var _ref11$width = _ref11.width, width = void 0 === _ref11$width || _ref11$width, _ref11$height = _ref11.height, height = void 0 === _ref11$height || _ref11$height, _ref11$delay = _ref11.delay, delay = void 0 === _ref11$delay ? 50 : _ref11$delay, _ref11$threshold = _ref11.threshold, threshold = void 0 === _ref11$threshold ? 0 : _ref11$threshold;
            return new _promise.SyncPromise(function(resolve) {
                var tracker = trackDimensions(el, {
                    width: width,
                    height: height,
                    threshold: threshold
                }), interval = void 0, resolver = (0, _fn.debounce)(function(dimensions) {
                    return clearInterval(interval), resolve(dimensions);
                }, 4 * delay);
                interval = setInterval(function() {
                    var _tracker$check = tracker.check(), changed = _tracker$check.changed, dimensions = _tracker$check.dimensions;
                    if (changed) return tracker.reset(), resolver(dimensions);
                }, delay);
            });
        }
        function dimensionsMatchViewport(el, _ref12) {
            var width = _ref12.width, height = _ref12.height, dimensions = getCurrentDimensions(el);
            return (!width || dimensions.width === window.innerWidth) && (!height || dimensions.height === window.innerHeight);
        }
        function bindEvents(element, eventNames, handler) {
            handler = (0, _fn.once)(handler);
            for (var _iterator7 = eventNames, _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator](); ;) {
                var _ref13;
                if (_isArray7) {
                    if (_i7 >= _iterator7.length) break;
                    _ref13 = _iterator7[_i7++];
                } else {
                    if (_i7 = _iterator7.next(), _i7.done) break;
                    _ref13 = _i7.value;
                }
                var eventName = _ref13;
                element.addEventListener(eventName, handler);
            }
            return {
                cancel: (0, _fn.once)(function() {
                    for (var _iterator8 = eventNames, _isArray8 = Array.isArray(_iterator8), _i8 = 0, _iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator](); ;) {
                        var _ref14;
                        if (_isArray8) {
                            if (_i8 >= _iterator8.length) break;
                            _ref14 = _iterator8[_i8++];
                        } else {
                            if (_i8 = _iterator8.next(), _i8.done) break;
                            _ref14 = _i8.value;
                        }
                        var eventName = _ref14;
                        element.removeEventListener(eventName, handler);
                    }
                })
            };
        }
        function setVendorCSS(element, name, value) {
            element.style[name] = value;
            for (var capitalizedName = (0, _util.capitalizeFirstLetter)(name), _iterator9 = VENDOR_PREFIXES, _isArray9 = Array.isArray(_iterator9), _i9 = 0, _iterator9 = _isArray9 ? _iterator9 : _iterator9[Symbol.iterator](); ;) {
                var _ref15;
                if (_isArray9) {
                    if (_i9 >= _iterator9.length) break;
                    _ref15 = _iterator9[_i9++];
                } else {
                    if (_i9 = _iterator9.next(), _i9.done) break;
                    _ref15 = _i9.value;
                }
                var prefix = _ref15;
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
                        if (cssRule && cssRule.type === KEYFRAMES_RULE && cssRule.name === name) return !0;
                    }
                }
            } catch (err) {
                return !1;
            }
            return !1;
        }
        function animate(element, name) {
            var timeout = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1e3;
            return new _promise.SyncPromise(function(resolve, reject) {
                if (element = getElement(element), !element || !isValidAnimation(element, name)) return resolve();
                var hasStarted = !1, timer = void 0, startEvent = bindEvents(element, ANIMATION_START_EVENTS, function(event) {
                    event.target === element && event.animationName === name && (event.stopPropagation(), 
                    startEvent.cancel(), hasStarted = !0, timer = setTimeout(function() {
                        resolve();
                    }, timeout));
                }), endEvent = bindEvents(element, ANIMATION_END_EVENTS, function(event) {
                    if (event.target === element && event.animationName === name) return event.stopPropagation(), 
                    startEvent.cancel(), endEvent.cancel(), event.animationName !== name ? reject("Expected animation name to be " + name + ", found " + event.animationName) : (clearTimeout(timer), 
                    setVendorCSS(element, "animationName", "none"), resolve());
                });
                setVendorCSS(element, "animationName", name), setTimeout(function() {
                    setTimeout(function() {
                        if (!hasStarted) return startEvent.cancel(), endEvent.cancel(), resolve();
                    }, 200);
                }, 200);
            });
        }
        function showElement(element) {
            element.style.display = STYLE.DISPLAY.BLOCK;
        }
        function hideElement(element) {
            element.style.display = STYLE.DISPLAY.NONE;
        }
        function showAndAnimate(element, name) {
            var animation = animate(element, name);
            return showElement(element), animation;
        }
        function animateAndHide(element, name) {
            return animate(element, name).then(function() {
                hideElement(element);
            });
        }
        function addClass(element, name) {
            element.classList ? element.classList.add(name) : element.className.split(/\s+/).indexOf(name) === -1 && (element.className += " " + name);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.parseQuery = exports.documentReady = void 0;
        var _slicedToArray = function() {
            function sliceIterator(arr, i) {
                var _arr = [], _n = !0, _d = !1, _e = void 0;
                try {
                    for (var _s, _i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), 
                    !i || _arr.length !== i); _n = !0) ;
                } catch (err) {
                    _d = !0, _e = err;
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
        }(), _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        }, _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        exports.getElement = getElement, exports.elementReady = elementReady, exports.popup = popup, 
        exports.iframe = iframe, exports.onCloseWindow = onCloseWindow, exports.addEventListener = addEventListener, 
        exports.scanForJavascript = scanForJavascript, exports.createElement = createElement, 
        exports.addEventToClass = addEventToClass, exports.template = template, exports.getQueryParam = getQueryParam, 
        exports.getDomain = getDomain, exports.getDomainFromUrl = getDomainFromUrl, exports.formatQuery = formatQuery, 
        exports.extendQuery = extendQuery, exports.extendUrl = extendUrl, exports.elementStoppedMoving = elementStoppedMoving, 
        exports.getOpener = getOpener, exports.getParent = getParent, exports.getCurrentDimensions = getCurrentDimensions, 
        exports.changeStyle = changeStyle, exports.setOverflow = setOverflow, exports.trackDimensions = trackDimensions, 
        exports.onDimensionsChange = onDimensionsChange, exports.dimensionsMatchViewport = dimensionsMatchViewport, 
        exports.bindEvents = bindEvents, exports.setVendorCSS = setVendorCSS, exports.animate = animate, 
        exports.showElement = showElement, exports.hideElement = hideElement, exports.showAndAnimate = showAndAnimate, 
        exports.animateAndHide = animateAndHide, exports.addClass = addClass;
        var _src = __webpack_require__(/*! post-robot/src */ 5), postRobot = _interopRequireWildcard(_src), _promise = __webpack_require__(/*! sync-browser-mocks/src/promise */ 3), _fn = __webpack_require__(/*! ./fn */ 36), _util = __webpack_require__(/*! ./util */ 23), _error = __webpack_require__(/*! ../error */ 35), parseQuery = (exports.documentReady = new _promise.SyncPromise(function(resolve) {
            if ("complete" === window.document.readyState) return resolve(window.document);
            var interval = setInterval(function() {
                if ("complete" === window.document.readyState) return clearInterval(interval), resolve(window.document);
            }, 10);
        }), exports.parseQuery = (0, _fn.memoize)(function(queryString) {
            var params = {};
            if (!queryString) return params;
            if (queryString.indexOf("=") === -1) throw new Error("Can not parse query string params: " + queryString);
            for (var _iterator5 = queryString.split("&"), _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator](); ;) {
                var _ref7;
                if (_isArray5) {
                    if (_i5 >= _iterator5.length) break;
                    _ref7 = _iterator5[_i5++];
                } else {
                    if (_i5 = _iterator5.next(), _i5.done) break;
                    _ref7 = _i5.value;
                }
                var pair = _ref7;
                pair = pair.split("="), pair[0] && pair[1] && (params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]));
            }
            return params;
        })), VENDOR_PREFIXES = [ "webkit", "moz", "ms", "o" ], CSSRule = window.CSSRule, KEYFRAMES_RULE = CSSRule.KEYFRAMES_RULE || CSSRule.WEBKIT_KEYFRAMES_RULE || CSSRule.MOZ_KEYFRAMES_RULE || CSSRule.O_KEYFRAMES_RULE || CSSRule.MS_KEYFRAMES_RULE, ANIMATION_START_EVENTS = [ "animationstart", "webkitAnimationStart", "oAnimationStart", "MSAnimationStart" ], ANIMATION_END_EVENTS = [ "animationend", "webkitAnimationEnd", "oAnimationEnd", "MSAnimationEnd" ], STYLE = {
            VISIBILITY: {
                VISIBLE: "visible",
                HIDDEN: "hidden"
            },
            DISPLAY: {
                NONE: "none",
                BLOCK: "block"
            }
        };
    }, /*!****************************!*\
  !*** ./src/lib/promise.js ***!
  \****************************/
    function(module, exports, __webpack_require__) {
        "use strict";
        function denodeify(method) {
            return function() {
                var self = this, args = Array.prototype.slice.call(arguments);
                return args.length >= method.length ? _promise.SyncPromise.resolve(method.apply(self, args)) : new _promise.SyncPromise(function(resolve, reject) {
                    return args.push(function(err, result) {
                        if (err && !(err instanceof Error)) throw new Error("Passed non-Error object in callback: [ " + err + " ] -- callbacks should either be called with callback(new Error(...)) or callback(null, result).");
                        return err ? reject(err) : resolve(result);
                    }), method.apply(self, args);
                });
            };
        }
        function promisify(method) {
            var prom = _promise.SyncPromise.resolve();
            return function() {
                var _this = this, _arguments = arguments;
                return prom.then(function() {
                    return method.apply(_this, _arguments);
                });
            };
        }
        function getter(method) {
            var _ref = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, _ref$name = _ref.name, name = void 0 === _ref$name ? "property" : _ref$name, _ref$timeout = _ref.timeout, timeout = void 0 === _ref$timeout ? 1e4 : _ref$timeout;
            return function() {
                var _this2 = this;
                return new _promise.SyncPromise(function(resolve, reject) {
                    var result = method.call(_this2, resolve, reject);
                    return result && "function" == typeof result.then ? result.then(resolve, reject) : void 0 !== result ? resolve(result) : void setTimeout(function() {
                        reject("Timed out waiting " + timeout + "ms for " + name + " getter");
                    }, timeout);
                });
            };
        }
        function delay(time) {
            return new _promise.SyncPromise(function(resolve) {
                setTimeout(resolve, time);
            });
        }
        function cycle(method) {
            return _promise.SyncPromise.try(method).then(function() {
                return cycle(method);
            });
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.denodeify = denodeify, exports.promisify = promisify, exports.getter = getter, 
        exports.delay = delay, exports.cycle = cycle;
        var _promise = __webpack_require__(/*! sync-browser-mocks/src/promise */ 3);
    }, /*!***************************************************!*\
  !*** ./~/es6-promise-min/dist/es6-promise.min.js ***!
  \***************************************************/
    function(module, exports, __webpack_require__) {
        (function(process, global) {
            var __WEBPACK_AMD_DEFINE_RESULT__;
            /*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
 * @version   2.0.1
 */
            (function() {
                function r(a, b) {
                    n[l] = a, n[l + 1] = b, l += 2, 2 === l && A();
                }
                function s(a) {
                    return "function" == typeof a;
                }
                function F() {
                    return function() {
                        process.nextTick(t);
                    };
                }
                function G() {
                    var a = 0, b = new B(t), c = document.createTextNode("");
                    return b.observe(c, {
                        characterData: !0
                    }), function() {
                        c.data = a = ++a % 2;
                    };
                }
                function H() {
                    var a = new MessageChannel();
                    return a.port1.onmessage = t, function() {
                        a.port2.postMessage(0);
                    };
                }
                function I() {
                    return function() {
                        setTimeout(t, 1);
                    };
                }
                function t() {
                    for (var a = 0; a < l; a += 2) (0, n[a])(n[a + 1]), n[a] = void 0, n[a + 1] = void 0;
                    l = 0;
                }
                function p() {}
                function J(a, b, c, d) {
                    try {
                        a.call(b, c, d);
                    } catch (e) {
                        return e;
                    }
                }
                function K(a, b, c) {
                    r(function(a) {
                        var e = !1, f = J(c, b, function(c) {
                            e || (e = !0, b !== c ? q(a, c) : m(a, c));
                        }, function(b) {
                            e || (e = !0, g(a, b));
                        });
                        !e && f && (e = !0, g(a, f));
                    }, a);
                }
                function L(a, b) {
                    1 === b.a ? m(a, b.b) : 2 === a.a ? g(a, b.b) : u(b, void 0, function(b) {
                        q(a, b);
                    }, function(b) {
                        g(a, b);
                    });
                }
                function q(a, b) {
                    if (a === b) g(a, new TypeError("You cannot resolve a promise with itself")); else if ("function" == typeof b || "object" == typeof b && null !== b) if (b.constructor === a.constructor) L(a, b); else {
                        var c;
                        try {
                            c = b.then;
                        } catch (d) {
                            v.error = d, c = v;
                        }
                        c === v ? g(a, v.error) : void 0 === c ? m(a, b) : s(c) ? K(a, b, c) : m(a, b);
                    } else m(a, b);
                }
                function M(a) {
                    a.f && a.f(a.b), x(a);
                }
                function m(a, b) {
                    void 0 === a.a && (a.b = b, a.a = 1, 0 !== a.e.length && r(x, a));
                }
                function g(a, b) {
                    void 0 === a.a && (a.a = 2, a.b = b, r(M, a));
                }
                function u(a, b, c, d) {
                    var e = a.e, f = e.length;
                    a.f = null, e[f] = b, e[f + 1] = c, e[f + 2] = d, 0 === f && a.a && r(x, a);
                }
                function x(a) {
                    var b = a.e, c = a.a;
                    if (0 !== b.length) {
                        for (var d, e, f = a.b, g = 0; g < b.length; g += 3) d = b[g], e = b[g + c], d ? C(c, d, e, f) : e(f);
                        a.e.length = 0;
                    }
                }
                function D() {
                    this.error = null;
                }
                function C(a, b, c, d) {
                    var f, k, h, l, e = s(c);
                    if (e) {
                        try {
                            f = c(d);
                        } catch (n) {
                            y.error = n, f = y;
                        }
                        if (f === y ? (l = !0, k = f.error, f = null) : h = !0, b === f) return void g(b, new TypeError("A promises callback cannot return that same promise."));
                    } else f = d, h = !0;
                    void 0 === b.a && (e && h ? q(b, f) : l ? g(b, k) : 1 === a ? m(b, f) : 2 === a && g(b, f));
                }
                function N(a, b) {
                    try {
                        b(function(b) {
                            q(a, b);
                        }, function(b) {
                            g(a, b);
                        });
                    } catch (c) {
                        g(a, c);
                    }
                }
                function k(a, b, c, d) {
                    this.n = a, this.c = new a(p, d), this.i = c, this.o(b) ? (this.m = b, this.d = this.length = b.length, 
                    this.l(), 0 === this.length ? m(this.c, this.b) : (this.length = this.length || 0, 
                    this.k(), 0 === this.d && m(this.c, this.b))) : g(this.c, this.p());
                }
                function h(a) {
                    if (O++, this.b = this.a = void 0, this.e = [], p !== a) {
                        if (!s(a)) throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");
                        if (!(this instanceof h)) throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
                        N(this, a);
                    }
                }
                var A, E = Array.isArray ? Array.isArray : function(a) {
                    return "[object Array]" === Object.prototype.toString.call(a);
                }, l = 0, w = "undefined" != typeof window ? window : {}, B = w.MutationObserver || w.WebKitMutationObserver, w = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel, n = Array(1e3);
                A = "undefined" != typeof process && "[object process]" === {}.toString.call(process) ? F() : B ? G() : w ? H() : I();
                var v = new D(), y = new D();
                k.prototype.o = function(a) {
                    return E(a);
                }, k.prototype.p = function() {
                    return Error("Array Methods must be provided an Array");
                }, k.prototype.l = function() {
                    this.b = Array(this.length);
                }, k.prototype.k = function() {
                    for (var a = this.length, b = this.c, c = this.m, d = 0; void 0 === b.a && d < a; d++) this.j(c[d], d);
                }, k.prototype.j = function(a, b) {
                    var c = this.n;
                    "object" == typeof a && null !== a ? a.constructor === c && void 0 !== a.a ? (a.f = null, 
                    this.g(a.a, b, a.b)) : this.q(c.resolve(a), b) : (this.d--, this.b[b] = this.h(a));
                }, k.prototype.g = function(a, b, c) {
                    var d = this.c;
                    void 0 === d.a && (this.d--, this.i && 2 === a ? g(d, c) : this.b[b] = this.h(c)), 
                    0 === this.d && m(d, this.b);
                }, k.prototype.h = function(a) {
                    return a;
                }, k.prototype.q = function(a, b) {
                    var c = this;
                    u(a, void 0, function(a) {
                        c.g(1, b, a);
                    }, function(a) {
                        c.g(2, b, a);
                    });
                };
                var O = 0;
                h.all = function(a, b) {
                    return new k(this, a, !0, b).c;
                }, h.race = function(a, b) {
                    function c(a) {
                        q(e, a);
                    }
                    function d(a) {
                        g(e, a);
                    }
                    var e = new this(p, b);
                    if (!E(a)) return g(e, new TypeError("You must pass an array to race.")), e;
                    for (var f = a.length, h = 0; void 0 === e.a && h < f; h++) u(this.resolve(a[h]), void 0, c, d);
                    return e;
                }, h.resolve = function(a, b) {
                    if (a && "object" == typeof a && a.constructor === this) return a;
                    var c = new this(p, b);
                    return q(c, a), c;
                }, h.reject = function(a, b) {
                    var c = new this(p, b);
                    return g(c, a), c;
                }, h.prototype = {
                    constructor: h,
                    then: function(a, b) {
                        var c = this.a;
                        if (1 === c && !a || 2 === c && !b) return this;
                        var d = new this.constructor(p), e = this.b;
                        if (c) {
                            var f = arguments[c - 1];
                            r(function() {
                                C(c, d, f, e);
                            });
                        } else u(this, d, a, b);
                        return d;
                    },
                    catch: function(a) {
                        return this.then(null, a);
                    }
                };
                var z = {
                    Promise: h,
                    polyfill: function() {
                        var a;
                        a = "undefined" != typeof global ? global : "undefined" != typeof window && window.document ? window : self, 
                        "Promise" in a && "resolve" in a.Promise && "reject" in a.Promise && "all" in a.Promise && "race" in a.Promise && function() {
                            var b;
                            return new a.Promise(function(a) {
                                b = a;
                            }), s(b);
                        }() || (a.Promise = h);
                    }
                };
                __WEBPACK_AMD_DEFINE_RESULT__ = function() {
                    return z;
                }.call(exports, __webpack_require__, exports, module), !(void 0 !== __WEBPACK_AMD_DEFINE_RESULT__ && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
            }).call(this);
        }).call(exports, __webpack_require__(/*! ./../../process/browser.js */ 55), __webpack_require__(/*! ./../../webpack/buildin/global.js */ 32));
    }, /*!*********************************************************!*\
  !*** ./src/component/component/templates/component.htm ***!
  \*********************************************************/
    function(module, exports) {
        module.exports = "";
    }, /*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) return obj;
            var newObj = {};
            if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
            return newObj.default = obj, newObj;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _interface = __webpack_require__(/*! ./interface */ 38);
        Object.keys(_interface).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _interface[key];
                }
            });
        });
        var INTERFACE = _interopRequireWildcard(_interface);
        exports.default = INTERFACE;
    } ]);
});
//# sourceMappingURL=xcomponent.js.map