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
        "./node_modules/beaver-logger/client/builders.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.addPayloadBuilder = function(builder) {
                payloadBuilders.push(builder);
            };
            exports.addMetaBuilder = function(builder) {
                metaBuilders.push(builder);
            };
            exports.addTrackingBuilder = function(builder) {
                trackingBuilders.push(builder);
            };
            exports.addHeaderBuilder = function(builder) {
                headerBuilders.push(builder);
            };
            var payloadBuilders = exports.payloadBuilders = [], metaBuilders = exports.metaBuilders = [], trackingBuilders = exports.trackingBuilders = [], headerBuilders = exports.headerBuilders = [];
        },
        "./node_modules/beaver-logger/client/config.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
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
                logLevel: "warn",
                autoLog: [ "warn", "error" ],
                logUnload: !0,
                logPerformance: !0
            }, exports.logLevels = [ "error", "warn", "info", "debug" ];
        },
        "./node_modules/beaver-logger/client/index.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            var _interface = __webpack_require__("./node_modules/beaver-logger/client/interface.js");
            Object.keys(_interface).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _interface[key];
                    }
                });
            });
            var INTERFACE = function(obj) {
                if (obj && obj.__esModule) return obj;
                var newObj = {};
                if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                newObj.default = obj;
                return newObj;
            }(_interface);
            exports.default = INTERFACE;
        },
        "./node_modules/beaver-logger/client/init.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.init = function(conf) {
                (0, _util.extend)(_config.config, conf || {});
                if (initiated) return;
                initiated = !0;
                _config.config.logPerformance && (0, _performance.initPerformance)();
                _config.config.heartbeat && (0, _performance.initHeartBeat)();
                if (_config.config.logUnload) {
                    window.addEventListener("beforeunload", function() {
                        (0, _logger.info)("window_beforeunload");
                        (0, _logger.immediateFlush)({
                            fireAndForget: !0
                        });
                    });
                    window.addEventListener("unload", function() {
                        (0, _logger.info)("window_unload");
                        (0, _logger.immediateFlush)({
                            fireAndForget: !0
                        });
                    });
                }
                _config.config.flushInterval && setInterval(_logger.flush, _config.config.flushInterval);
                if (window.beaverLogQueue) {
                    window.beaverLogQueue.forEach(function(payload) {
                        (0, _logger.log)(payload.level, payload.event, payload);
                    });
                    delete window.beaverLogQueue;
                }
            };
            var _config = __webpack_require__("./node_modules/beaver-logger/client/config.js"), _util = __webpack_require__("./node_modules/beaver-logger/client/util.js"), _performance = __webpack_require__("./node_modules/beaver-logger/client/performance.js"), _logger = __webpack_require__("./node_modules/beaver-logger/client/logger.js"), initiated = !1;
        },
        "./node_modules/beaver-logger/client/interface.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            var _logger = __webpack_require__("./node_modules/beaver-logger/client/logger.js");
            Object.keys(_logger).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _logger[key];
                    }
                });
            });
            var _init = __webpack_require__("./node_modules/beaver-logger/client/init.js");
            Object.keys(_init).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _init[key];
                    }
                });
            });
            var _transitions = __webpack_require__("./node_modules/beaver-logger/client/transitions.js");
            Object.keys(_transitions).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _transitions[key];
                    }
                });
            });
            var _builders = __webpack_require__("./node_modules/beaver-logger/client/builders.js");
            Object.keys(_builders).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _builders[key];
                    }
                });
            });
            var _config = __webpack_require__("./node_modules/beaver-logger/client/config.js");
            Object.keys(_config).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _config[key];
                    }
                });
            });
        },
        "./node_modules/beaver-logger/client/logger.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.track = exports.flush = exports.tracking = exports.buffer = void 0;
            exports.getTransport = function() {
                return transport;
            };
            exports.setTransport = function(newTransport) {
                transport = newTransport;
            };
            exports.print = print;
            exports.immediateFlush = immediateFlush;
            exports.log = log;
            exports.prefix = function(name) {
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
            };
            exports.debug = function(event, payload) {
                return log("debug", event, payload);
            };
            exports.info = function(event, payload) {
                return log("info", event, payload);
            };
            exports.warn = function(event, payload) {
                return log("warn", event, payload);
            };
            exports.error = function(event, payload) {
                return log("error", event, payload);
            };
            var _util = __webpack_require__("./node_modules/beaver-logger/client/util.js"), _builders = __webpack_require__("./node_modules/beaver-logger/client/builders.js"), _config = __webpack_require__("./node_modules/beaver-logger/client/config.js"), buffer = exports.buffer = [], tracking = exports.tracking = [], transport = function(headers, data, options) {
                return (0, _util.ajax)("post", _config.config.uri, headers, data, options);
            };
            var loaded = !1;
            setTimeout(function() {
                loaded = !0;
            }, 1);
            function print(level, event, payload) {
                if ("undefined" != typeof window && window.console && window.console.log) {
                    if (!loaded) return setTimeout(function() {
                        return print(level, event, payload);
                    }, 1);
                    var logLevel = _config.config.logLevel;
                    window.LOG_LEVEL && (logLevel = window.LOG_LEVEL);
                    if (!(_config.logLevels.indexOf(level) > _config.logLevels.indexOf(logLevel))) {
                        payload = payload || {};
                        var args = [ event ];
                        (0, _util.isIE)() && (payload = JSON.stringify(payload));
                        args.push(payload);
                        (payload.error || payload.warning) && args.push("\n\n", payload.error || payload.warning);
                        try {
                            window.console[level] && window.console[level].apply ? window.console[level].apply(window.console, args) : window.console.log && window.console.log.apply && window.console.log.apply(window.console, args);
                        } catch (err) {}
                    }
                }
            }
            function immediateFlush() {
                var _ref$fireAndForget = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).fireAndForget, fireAndForget = void 0 !== _ref$fireAndForget && _ref$fireAndForget;
                if ("undefined" != typeof window && _config.config.uri) {
                    var hasBuffer = buffer.length, hasTracking = tracking.length;
                    if (hasBuffer || hasTracking) {
                        var meta = {}, _iterator = _builders.metaBuilders, _isArray = Array.isArray(_iterator), _i = 0;
                        for (_iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                            var _ref2;
                            if (_isArray) {
                                if (_i >= _iterator.length) break;
                                _ref2 = _iterator[_i++];
                            } else {
                                if ((_i = _iterator.next()).done) break;
                                _ref2 = _i.value;
                            }
                            var builder = _ref2;
                            try {
                                (0, _util.extend)(meta, builder(meta), !1);
                            } catch (err) {
                                console.error("Error in custom meta builder:", err.stack || err.toString());
                            }
                        }
                        var headers = {}, _iterator2 = _builders.headerBuilders, _isArray2 = Array.isArray(_iterator2), _i2 = 0;
                        for (_iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                            var _ref3;
                            if (_isArray2) {
                                if (_i2 >= _iterator2.length) break;
                                _ref3 = _iterator2[_i2++];
                            } else {
                                if ((_i2 = _iterator2.next()).done) break;
                                _ref3 = _i2.value;
                            }
                            var _builder = _ref3;
                            try {
                                (0, _util.extend)(headers, _builder(headers), !1);
                            } catch (err) {
                                console.error("Error in custom header builder:", err.stack || err.toString());
                            }
                        }
                        var req = transport(headers, {
                            events: buffer,
                            meta: meta,
                            tracking: tracking
                        }, {
                            fireAndForget: fireAndForget
                        });
                        exports.buffer = buffer = [];
                        exports.tracking = tracking = [];
                        return req;
                    }
                }
            }
            var _flush = (0, _util.promiseDebounce)(immediateFlush, _config.config.debounceInterval);
            exports.flush = _flush;
            function enqueue(level, event, payload) {
                buffer.push({
                    level: level,
                    event: event,
                    payload: payload
                });
                _config.config.autoLog.indexOf(level) > -1 && _flush();
            }
            function log(level, event, payload) {
                if ("undefined" != typeof window) {
                    _config.config.prefix && (event = _config.config.prefix + "_" + event);
                    "string" == typeof (payload = payload || {}) ? payload = {
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
                    var _iterator3 = _builders.payloadBuilders, _isArray3 = Array.isArray(_iterator3), _i3 = 0;
                    for (_iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                        var _ref4;
                        if (_isArray3) {
                            if (_i3 >= _iterator3.length) break;
                            _ref4 = _iterator3[_i3++];
                        } else {
                            if ((_i3 = _iterator3.next()).done) break;
                            _ref4 = _i3.value;
                        }
                        var builder = _ref4;
                        try {
                            (0, _util.extend)(payload, builder(payload), !1);
                        } catch (err) {
                            console.error("Error in custom payload builder:", err.stack || err.toString());
                        }
                    }
                    _config.config.silent || print(level, event, payload);
                    buffer.length === _config.config.sizeLimit ? enqueue("info", "logger_max_buffer_length") : buffer.length < _config.config.sizeLimit && enqueue(level, event, payload);
                }
            }
            function _track(payload) {
                if ("undefined" != typeof window && payload) {
                    try {
                        JSON.stringify(payload);
                    } catch (err) {
                        return;
                    }
                    var _iterator4 = _builders.trackingBuilders, _isArray4 = Array.isArray(_iterator4), _i4 = 0;
                    for (_iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator](); ;) {
                        var _ref5;
                        if (_isArray4) {
                            if (_i4 >= _iterator4.length) break;
                            _ref5 = _iterator4[_i4++];
                        } else {
                            if ((_i4 = _iterator4.next()).done) break;
                            _ref5 = _i4.value;
                        }
                        var builder = _ref5;
                        try {
                            (0, _util.extend)(payload, builder(payload), !1);
                        } catch (err) {
                            console.error("Error in custom tracking builder:", err.stack || err.toString());
                        }
                    }
                    print("debug", "tracking", payload);
                    tracking.push(payload);
                }
            }
            exports.track = _track;
        },
        "./node_modules/beaver-logger/client/performance.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.reqTimer = exports.clientTimer = void 0;
            exports.now = now;
            exports.reqStartElapsed = reqStartElapsed;
            exports.initHeartBeat = function() {
                var heartBeatTimer = timer(), heartbeatCount = 0;
                (0, _util.safeInterval)(function() {
                    if (!(_config.config.heartbeatMaxThreshold && heartbeatCount > _config.config.heartbeatMaxThreshold)) {
                        heartbeatCount += 1;
                        var elapsed = heartBeatTimer.elapsed(), lag = elapsed - _config.config.heartbeatInterval, heartbeatPayload = {
                            count: heartbeatCount,
                            elapsed: elapsed
                        };
                        if (_config.config.heartbeatTooBusy) {
                            heartbeatPayload.lag = lag;
                            lag >= _config.config.heartbeatTooBusyThreshold && (0, _logger.info)("toobusy", heartbeatPayload, {
                                noConsole: !_config.config.heartbeatConsoleLog
                            });
                        }
                        (0, _logger.info)("heartbeat", heartbeatPayload, {
                            noConsole: !_config.config.heartbeatConsoleLog
                        });
                    }
                }, _config.config.heartbeatInterval);
            };
            exports.initPerformance = function() {
                if (!enablePerformance) return (0, _logger.info)("no_performance_data");
                (0, _builders.addPayloadBuilder)(function() {
                    var payload = {};
                    payload.client_elapsed = clientTimer.elapsed();
                    enablePerformance && (payload.req_elapsed = reqTimer.elapsed());
                    return payload;
                });
                (0, _util.onWindowReady)().then(function() {
                    var timing = {};
                    [ "connectEnd", "connectStart", "domComplete", "domContentLoadedEventEnd", "domContentLoadedEventStart", "domInteractive", "domLoading", "domainLookupEnd", "domainLookupStart", "fetchStart", "loadEventEnd", "loadEventStart", "navigationStart", "redirectEnd", "redirectStart", "requestStart", "responseEnd", "responseStart", "secureConnectionStart", "unloadEventEnd", "unloadEventStart" ].forEach(function(key) {
                        timing[key] = parseInt(window.performance.timing[key], 10) || 0;
                    });
                    var offset = timing.connectEnd - timing.navigationStart;
                    timing.connectEnd && Object.keys(timing).forEach(function(name) {
                        var time = timing[name];
                        time && (0, _logger.info)("timing_" + name, {
                            client_elapsed: parseInt(time - timing.connectEnd - (clientTimer.startTime - offset), 10),
                            req_elapsed: parseInt(time - timing.connectEnd, 10)
                        });
                    });
                    (0, _logger.info)("timing", timing);
                    (0, _logger.info)("memory", window.performance.memory);
                    (0, _logger.info)("navigation", window.performance.navigation);
                    window.performance.getEntries && window.performance.getEntries().forEach(function(resource) {
                        [ "link", "script", "img", "css" ].indexOf(resource.initiatorType) > -1 && (0, _logger.info)(resource.initiatorType, resource);
                    });
                });
            };
            var _config = __webpack_require__("./node_modules/beaver-logger/client/config.js"), _logger = __webpack_require__("./node_modules/beaver-logger/client/logger.js"), _builders = __webpack_require__("./node_modules/beaver-logger/client/builders.js"), _util = __webpack_require__("./node_modules/beaver-logger/client/util.js"), enablePerformance = window && window.performance && performance.now && performance.timing && performance.timing.connectEnd && performance.timing.navigationStart && Math.abs(performance.now() - Date.now()) > 1e3 && performance.now() - (performance.timing.connectEnd - performance.timing.navigationStart) > 0;
            function now() {
                return enablePerformance ? performance.now() : Date.now();
            }
            function timer(startTime) {
                return {
                    startTime: startTime = void 0 !== startTime ? startTime : now(),
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
            var clientTimer = exports.clientTimer = timer(), reqTimer = exports.reqTimer = timer(reqStartElapsed());
        },
        "./node_modules/beaver-logger/client/transitions.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.startTransition = startTransition;
            exports.endTransition = endTransition;
            exports.transition = function(toState) {
                startTransition();
                endTransition(toState);
            };
            var _performance = __webpack_require__("./node_modules/beaver-logger/client/performance.js"), _logger = __webpack_require__("./node_modules/beaver-logger/client/logger.js"), _builders = __webpack_require__("./node_modules/beaver-logger/client/builders.js"), _util = __webpack_require__("./node_modules/beaver-logger/client/util.js"), _config = __webpack_require__("./node_modules/beaver-logger/client/config.js"), windowID = (0, 
            _util.uniqueID)(), pageID = (0, _util.uniqueID)(), currentState = _config.config.initial_state_name, startTime = void 0;
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
                });
                (0, _logger.track)({
                    transition: transitionName,
                    transition_time: elapsedTime
                });
                (0, _logger.immediateFlush)();
                startTime = currentTime;
                currentState = toState;
                pageID = (0, _util.uniqueID)();
            }
            (0, _builders.addPayloadBuilder)(function() {
                return {
                    windowID: windowID,
                    pageID: pageID
                };
            });
            (0, _builders.addMetaBuilder)(function() {
                return {
                    state: "ui_" + currentState
                };
            });
        },
        "./node_modules/beaver-logger/client/util.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.extend = function(dest, src) {
                var over = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                dest = dest || {};
                src = src || {};
                for (var i in src) src.hasOwnProperty(i) && (!over && dest.hasOwnProperty(i) || (dest[i] = src[i]));
                return dest;
            };
            exports.isSameProtocol = isSameProtocol;
            exports.isSameDomain = isSameDomain;
            exports.ajax = function(method, url) {
                var headers = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, data = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}, _ref$fireAndForget = (arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {}).fireAndForget, fireAndForget = void 0 !== _ref$fireAndForget && _ref$fireAndForget;
                return new _src.ZalgoPromise(function(resolve) {
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
            };
            exports.promiseDebounce = function(method, interval) {
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
                        return _src.ZalgoPromise.resolve().then(function() {
                            return method.apply(null, args);
                        }).then(resolver, rejector);
                    }, interval);
                    debounce.promise = debounce.promise || new _src.ZalgoPromise(function(resolver, rejector) {
                        debounce.resolver = resolver;
                        debounce.rejector = rejector;
                    });
                    return debounce.promise;
                };
            };
            exports.onWindowReady = function() {
                return new _src.ZalgoPromise(function(resolve) {
                    "undefined" != typeof document && "complete" === document.readyState && resolve();
                    window.addEventListener("load", resolve);
                });
            };
            exports.safeInterval = function(method, time) {
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
            exports.uniqueID = function() {
                var chars = "0123456789abcdef";
                return "xxxxxxxxxx".replace(/./g, function() {
                    return chars.charAt(Math.floor(Math.random() * chars.length));
                });
            };
            exports.isIE = function() {
                return Boolean(window.document.documentMode);
            };
            var _src = __webpack_require__("./node_modules/zalgo-promise/src/index.js");
            function isSameProtocol(url) {
                return window.location.protocol === url.split("/")[0];
            }
            function isSameDomain(url) {
                var match = url.match(/https?:\/\/[^/]+/);
                return !match || match[0] === window.location.protocol + "//" + window.location.host;
            }
        },
        "./node_modules/cross-domain-safe-weakmap/src/index.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            var _interface = __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/interface.js");
            Object.keys(_interface).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _interface[key];
                    }
                });
            });
            var INTERFACE = function(obj) {
                if (obj && obj.__esModule) return obj;
                var newObj = {};
                if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                newObj.default = obj;
                return newObj;
            }(_interface);
            exports.default = INTERFACE;
        },
        "./node_modules/cross-domain-safe-weakmap/src/interface.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            var _weakmap = __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/weakmap.js");
            Object.defineProperty(exports, "WeakMap", {
                enumerable: !0,
                get: function() {
                    return _weakmap.CrossDomainSafeWeakMap;
                }
            });
        },
        "./node_modules/cross-domain-safe-weakmap/src/native.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.hasNativeWeakMap = function() {
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
            };
        },
        "./node_modules/cross-domain-safe-weakmap/src/util.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.safeIndexOf = function(collection, item) {
                for (var i = 0; i < collection.length; i++) try {
                    if (collection[i] === item) return i;
                } catch (err) {}
                return -1;
            };
            exports.noop = function() {};
        },
        "./node_modules/cross-domain-safe-weakmap/src/weakmap.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.CrossDomainSafeWeakMap = void 0;
            var _src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), _native = __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/native.js"), _util = __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/util.js");
            var defineProperty = Object.defineProperty, counter = Date.now() % 1e9;
            exports.CrossDomainSafeWeakMap = function() {
                function CrossDomainSafeWeakMap() {
                    !function(instance, Constructor) {
                        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                    }(this, CrossDomainSafeWeakMap);
                    counter += 1;
                    this.name = "__weakmap_" + (1e9 * Math.random() >>> 0) + "__" + counter;
                    if ((0, _native.hasNativeWeakMap)()) try {
                        this.weakmap = new window.WeakMap();
                    } catch (err) {}
                    this.keys = [];
                    this.values = [];
                }
                CrossDomainSafeWeakMap.prototype._cleanupClosedWindows = function() {
                    for (var weakmap = this.weakmap, keys = this.keys, i = 0; i < keys.length; i++) {
                        var value = keys[i];
                        if ((0, _src.isWindow)(value) && (0, _src.isWindowClosed)(value)) {
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
                    if ((0, _src.isWindow)(key)) return !1;
                    try {
                        (0, _util.noop)(key && key.self);
                        (0, _util.noop)(key && key[this.name]);
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
                        var keys = this.keys, values = this.values, index = (0, _util.safeIndexOf)(keys, key);
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
                        var keys = this.keys, index = (0, _util.safeIndexOf)(keys, key);
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
                        var keys = this.keys, index = (0, _util.safeIndexOf)(keys, key);
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
                    return -1 !== (0, _util.safeIndexOf)(this.keys, key);
                };
                return CrossDomainSafeWeakMap;
            }();
        },
        "./node_modules/cross-domain-utils/src/index.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            var _utils = __webpack_require__("./node_modules/cross-domain-utils/src/utils.js");
            Object.keys(_utils).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _utils[key];
                    }
                });
            });
            var _types = __webpack_require__("./node_modules/cross-domain-utils/src/types.js");
            Object.keys(_types).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _types[key];
                    }
                });
            });
        },
        "./node_modules/cross-domain-utils/src/types.js": function(module, exports, __webpack_require__) {
            "use strict";
        },
        "./node_modules/cross-domain-utils/src/util.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.isRegex = function(item) {
                return "[object RegExp]" === Object.prototype.toString.call(item);
            };
            exports.noop = function() {};
        },
        "./node_modules/cross-domain-utils/src/utils.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.isFileProtocol = function() {
                return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window).location.protocol === CONSTANTS.FILE_PROTOCOL;
            };
            exports.isAboutProtocol = isAboutProtocol;
            exports.getParent = getParent;
            exports.getOpener = getOpener;
            exports.canReadFromWindow = canReadFromWindow;
            exports.getActualDomain = getActualDomain;
            exports.getDomain = getDomain;
            exports.isBlankDomain = function(win) {
                try {
                    if (!win.location.href) return !0;
                    if ("about:blank" === win.location.href) return !0;
                } catch (err) {}
                return !1;
            };
            exports.isActuallySameDomain = isActuallySameDomain;
            exports.isSameDomain = isSameDomain;
            exports.getParents = getParents;
            exports.isAncestorParent = isAncestorParent;
            exports.getFrames = getFrames;
            exports.getAllChildFrames = getAllChildFrames;
            exports.getTop = getTop;
            exports.getAllFramesInWindow = getAllFramesInWindow;
            exports.isTop = function(win) {
                return win === getTop(win);
            };
            exports.isFrameWindowClosed = isFrameWindowClosed;
            exports.isWindowClosed = isWindowClosed;
            exports.linkFrameWindow = function(frame) {
                !function() {
                    for (var i = 0; i < iframeFrames.length; i++) if (isFrameWindowClosed(iframeFrames[i])) {
                        iframeFrames.splice(i, 1);
                        iframeWindows.splice(i, 1);
                    }
                    for (var _i5 = 0; _i5 < iframeWindows.length; _i5++) if (isWindowClosed(iframeWindows[_i5])) {
                        iframeFrames.splice(_i5, 1);
                        iframeWindows.splice(_i5, 1);
                    }
                }();
                if (frame && frame.contentWindow) try {
                    iframeWindows.push(frame.contentWindow);
                    iframeFrames.push(frame);
                } catch (err) {}
            };
            exports.getUserAgent = function(win) {
                return (win = win || window).navigator.mockUserAgent || win.navigator.userAgent;
            };
            exports.getFrameByName = getFrameByName;
            exports.findChildFrameByName = findChildFrameByName;
            exports.findFrameByName = function(win, name) {
                var frame = void 0;
                if (frame = getFrameByName(win, name)) return frame;
                return findChildFrameByName(getTop(win) || win, name);
            };
            exports.isParent = function(win, frame) {
                var frameParent = getParent(frame);
                if (frameParent) return frameParent === win;
                for (var _iterator6 = getFrames(win), _isArray6 = Array.isArray(_iterator6), _i8 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator](); ;) {
                    var _ref6;
                    if (_isArray6) {
                        if (_i8 >= _iterator6.length) break;
                        _ref6 = _iterator6[_i8++];
                    } else {
                        if ((_i8 = _iterator6.next()).done) break;
                        _ref6 = _i8.value;
                    }
                    var childFrame = _ref6;
                    if (childFrame === frame) return !0;
                }
                return !1;
            };
            exports.isOpener = function(parent, child) {
                return parent === getOpener(child);
            };
            exports.getAncestor = getAncestor;
            exports.getAncestors = function(win) {
                var results = [], ancestor = win;
                for (;ancestor; ) (ancestor = getAncestor(ancestor)) && results.push(ancestor);
                return results;
            };
            exports.isAncestor = function(parent, child) {
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
                        if ((_i9 = _iterator7.next()).done) break;
                        _ref7 = _i9.value;
                    }
                    var frame = _ref7;
                    if (frame === child) return !0;
                }
                return !1;
            };
            exports.isPopup = isPopup;
            exports.isIframe = isIframe;
            exports.isFullpage = function() {
                return Boolean(!isIframe() && !isPopup());
            };
            exports.getDistanceFromTop = getDistanceFromTop;
            exports.getNthParent = getNthParent;
            exports.getNthParentFromTop = function(win) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
                return getNthParent(win, getDistanceFromTop(win) - n);
            };
            exports.isSameTopWindow = function(win1, win2) {
                var top1 = getTop(win1) || win1, top2 = getTop(win2) || win2;
                try {
                    if (top1 && top2) return top1 === top2;
                } catch (err) {}
                var allFrames1 = getAllFramesInWindow(win1), allFrames2 = getAllFramesInWindow(win2);
                if (anyMatch(allFrames1, allFrames2)) return !0;
                var opener1 = getOpener(top1), opener2 = getOpener(top2);
                if (opener1 && anyMatch(getAllFramesInWindow(opener1), allFrames2)) return !1;
                if (opener2 && anyMatch(getAllFramesInWindow(opener2), allFrames1)) return !1;
                return !1;
            };
            exports.matchDomain = function matchDomain(pattern, origin) {
                if ("string" == typeof pattern) {
                    if ("string" == typeof origin) return pattern === CONSTANTS.WILDCARD || origin === pattern;
                    if ((0, _util.isRegex)(origin)) return !1;
                    if (Array.isArray(origin)) return !1;
                }
                if ((0, _util.isRegex)(pattern)) return (0, _util.isRegex)(origin) ? pattern.toString() === origin.toString() : !Array.isArray(origin) && Boolean(origin.match(pattern));
                if (Array.isArray(pattern)) return Array.isArray(origin) ? JSON.stringify(pattern) === JSON.stringify(origin) : !(0, 
                _util.isRegex)(origin) && pattern.some(function(subpattern) {
                    return matchDomain(subpattern, origin);
                });
                return !1;
            };
            exports.stringifyDomainPattern = function(pattern) {
                return Array.isArray(pattern) ? "(" + pattern.join(" | ") + ")" : (0, _util.isRegex)(pattern) ? "RegExp(" + pattern.toString() : pattern.toString();
            };
            exports.getDomainFromUrl = function(url) {
                var domain = void 0;
                if (!url.match(/^(https?|mock|file):\/\//)) return getDomain();
                domain = url;
                return domain = domain.split("/").slice(0, 3).join("/");
            };
            exports.onCloseWindow = function(win, callback) {
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
            exports.isWindow = function(obj) {
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
                    (0, _util.noop)(obj == obj);
                } catch (err) {
                    return !0;
                }
                try {
                    (0, _util.noop)(obj && obj.__cross_domain_utils_window_check__);
                } catch (err) {
                    return !0;
                }
                return !1;
            };
            var _util = __webpack_require__("./node_modules/cross-domain-utils/src/util.js"), CONSTANTS = {
                MOCK_PROTOCOL: "mock:",
                FILE_PROTOCOL: "file:",
                ABOUT_PROTOCOL: "about:",
                WILDCARD: "*"
            }, IE_WIN_ACCESS_ERROR = "Call was rejected by callee.\r\n";
            function isAboutProtocol() {
                return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window).location.protocol === CONSTANTS.ABOUT_PROTOCOL;
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
                    (0, _util.noop)(win && win.location && win.location.href);
                    return !0;
                } catch (err) {}
                return !1;
            }
            function getActualDomain(win) {
                var location = (win = win || window).location;
                if (!location) throw new Error("Can not read window location");
                var protocol = location.protocol;
                if (!protocol) throw new Error("Can not read window protocol");
                if (protocol === CONSTANTS.FILE_PROTOCOL) return CONSTANTS.FILE_PROTOCOL + "//";
                if (protocol === CONSTANTS.ABOUT_PROTOCOL) {
                    var parent = getParent(win);
                    return parent && canReadFromWindow(win) ? getActualDomain(parent) : CONSTANTS.ABOUT_PROTOCOL + "//";
                }
                var host = location.host;
                if (!host) throw new Error("Can not read window host");
                return protocol + "//" + host;
            }
            function getDomain(win) {
                var domain = getActualDomain(win = win || window);
                return domain && win.mockDomain && 0 === win.mockDomain.indexOf(CONSTANTS.MOCK_PROTOCOL) ? win.mockDomain : domain;
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
                var result = [], _iterator = getFrames(win), _isArray = Array.isArray(_iterator), _i2 = 0;
                for (_iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                    var _ref;
                    if (_isArray) {
                        if (_i2 >= _iterator.length) break;
                        _ref = _iterator[_i2++];
                    } else {
                        if ((_i2 = _iterator.next()).done) break;
                        _ref = _i2.value;
                    }
                    var frame = _ref;
                    result.push(frame);
                    var _iterator2 = getAllChildFrames(frame), _isArray2 = Array.isArray(_iterator2), _i3 = 0;
                    for (_iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                        var _ref2;
                        if (_isArray2) {
                            if (_i3 >= _iterator2.length) break;
                            _ref2 = _iterator2[_i3++];
                        } else {
                            if ((_i3 = _iterator2.next()).done) break;
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
                    var _iterator3 = getAllChildFrames(win), _isArray3 = Array.isArray(_iterator3), _i4 = 0;
                    for (_iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                        var _ref3;
                        if (_isArray3) {
                            if (_i4 >= _iterator3.length) break;
                            _ref3 = _iterator3[_i4++];
                        } else {
                            if ((_i4 = _iterator3.next()).done) break;
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
            function isFrameWindowClosed(frame) {
                if (!frame.contentWindow) return !0;
                if (!frame.parentNode) return !0;
                var doc = frame.ownerDocument;
                return !(!doc || !doc.body || doc.body.contains(frame));
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
                try {
                    (0, _util.noop)(win == win);
                } catch (err) {
                    return !0;
                }
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
            function getFrameByName(win, name) {
                var winFrames = getFrames(win), _iterator4 = winFrames, _isArray4 = Array.isArray(_iterator4), _i6 = 0;
                for (_iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator](); ;) {
                    var _ref4;
                    if (_isArray4) {
                        if (_i6 >= _iterator4.length) break;
                        _ref4 = _iterator4[_i6++];
                    } else {
                        if ((_i6 = _iterator4.next()).done) break;
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
                var _iterator5 = getFrames(win), _isArray5 = Array.isArray(_iterator5), _i7 = 0;
                for (_iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator](); ;) {
                    var _ref5;
                    if (_isArray5) {
                        if (_i7 >= _iterator5.length) break;
                        _ref5 = _iterator5[_i7++];
                    } else {
                        if ((_i7 = _iterator5.next()).done) break;
                        _ref5 = _i7.value;
                    }
                    var namedFrame = findChildFrameByName(_ref5, name);
                    if (namedFrame) return namedFrame;
                }
            }
            function getAncestor(win) {
                var opener = getOpener(win = win || window);
                if (opener) return opener;
                var parent = getParent(win);
                return parent || void 0;
            }
            function isPopup() {
                return Boolean(getOpener(window));
            }
            function isIframe() {
                return Boolean(getParent(window));
            }
            function anyMatch(collection1, collection2) {
                var _iterator8 = collection1, _isArray8 = Array.isArray(_iterator8), _i10 = 0;
                for (_iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator](); ;) {
                    var _ref8;
                    if (_isArray8) {
                        if (_i10 >= _iterator8.length) break;
                        _ref8 = _iterator8[_i10++];
                    } else {
                        if ((_i10 = _iterator8.next()).done) break;
                        _ref8 = _i10.value;
                    }
                    var item1 = _ref8, _iterator9 = collection2, _isArray9 = Array.isArray(_iterator9), _i11 = 0;
                    for (_iterator9 = _isArray9 ? _iterator9 : _iterator9[Symbol.iterator](); ;) {
                        var _ref9;
                        if (_isArray9) {
                            if (_i11 >= _iterator9.length) break;
                            _ref9 = _iterator9[_i11++];
                        } else {
                            if ((_i11 = _iterator9.next()).done) break;
                            _ref9 = _i11.value;
                        }
                        if (item1 === _ref9) return !0;
                    }
                }
                return !1;
            }
            function getDistanceFromTop() {
                for (var distance = 0, parent = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window; parent; ) (parent = getParent(parent)) && (distance += 1);
                return distance;
            }
            function getNthParent(win) {
                for (var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1, parent = win, i = 0; i < n; i++) {
                    if (!parent) return;
                    parent = getParent(parent);
                }
                return parent;
            }
        },
        "./node_modules/hi-base32/src/base32.js": function(module, exports, __webpack_require__) {
            "use strict";
            (function(process, global, module) {
                var __WEBPACK_AMD_DEFINE_RESULT__, _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                    return typeof obj;
                } : function(obj) {
                    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                };
                !function() {
                    var root = "object" === ("undefined" == typeof window ? "undefined" : _typeof(window)) ? window : {};
                    !root.HI_BASE32_NO_NODE_JS && "object" === (void 0 === process ? "undefined" : _typeof(process)) && process.versions && process.versions.node && (root = global);
                    var COMMON_JS = !root.HI_BASE32_NO_COMMON_JS && "object" === _typeof(module) && module.exports, AMD = __webpack_require__("./node_modules/webpack/buildin/amd-options.js"), BASE32_ENCODE_CHAR = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567".split(""), BASE32_DECODE_CHAR = {
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
                        2: 26,
                        3: 27,
                        4: 28,
                        5: 29,
                        6: 30,
                        7: 31
                    }, blocks = [ 0, 0, 0, 0, 0, 0, 0, 0 ], throwInvalidUtf8 = function(position, partial) {
                        partial.length > 10 && (partial = "..." + partial.substr(-10));
                        var err = new Error("Decoded data is not valid UTF-8. Maybe try base32.decode.asBytes()? Partial data after reading " + position + " bytes: " + partial + " <-");
                        err.position = position;
                        throw err;
                    }, decodeAsBytes = function(base32Str) {
                        if (!/^[A-Z2-7=]+$/.test(base32Str)) throw new Error("Invalid base32 characters");
                        for (var v1, v2, v3, v4, v5, v6, v7, v8, bytes = [], index = 0, length = (base32Str = base32Str.replace(/=/g, "")).length, i = 0, count = length >> 3 << 3; i < count; ) {
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
                        if (2 === remain) {
                            v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            bytes[index++] = 255 & (v1 << 3 | v2 >>> 2);
                        } else if (4 === remain) {
                            v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            bytes[index++] = 255 & (v1 << 3 | v2 >>> 2);
                            bytes[index++] = 255 & (v2 << 6 | v3 << 1 | v4 >>> 4);
                        } else if (5 === remain) {
                            v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            bytes[index++] = 255 & (v1 << 3 | v2 >>> 2);
                            bytes[index++] = 255 & (v2 << 6 | v3 << 1 | v4 >>> 4);
                            bytes[index++] = 255 & (v4 << 4 | v5 >>> 1);
                        } else if (7 === remain) {
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
                    }, decode = function(base32Str, asciiOnly) {
                        if (!asciiOnly) return function(bytes) {
                            for (var b, c, str = "", length = bytes.length, i = 0, followingChars = 0; i < length; ) if ((b = bytes[i++]) <= 127) str += String.fromCharCode(b); else {
                                if (b > 191 && b <= 223) {
                                    c = 31 & b;
                                    followingChars = 1;
                                } else if (b <= 239) {
                                    c = 15 & b;
                                    followingChars = 2;
                                } else if (b <= 247) {
                                    c = 7 & b;
                                    followingChars = 3;
                                } else throwInvalidUtf8(i, str);
                                for (var j = 0; j < followingChars; ++j) {
                                    ((b = bytes[i++]) < 128 || b > 191) && throwInvalidUtf8(i, str);
                                    c <<= 6;
                                    c += 63 & b;
                                }
                                c >= 55296 && c <= 57343 && throwInvalidUtf8(i, str);
                                c > 1114111 && throwInvalidUtf8(i, str);
                                if (c <= 65535) str += String.fromCharCode(c); else {
                                    c -= 65536;
                                    str += String.fromCharCode(55296 + (c >> 10));
                                    str += String.fromCharCode(56320 + (1023 & c));
                                }
                            }
                            return str;
                        }(decodeAsBytes(base32Str));
                        if (!/^[A-Z2-7=]+$/.test(base32Str)) throw new Error("Invalid base32 characters");
                        var v1, v2, v3, v4, v5, v6, v7, v8, str = "", length = base32Str.indexOf("=");
                        -1 === length && (length = base32Str.length);
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
                        if (2 === remain) {
                            v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            str += String.fromCharCode(255 & (v1 << 3 | v2 >>> 2));
                        } else if (4 === remain) {
                            v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            str += String.fromCharCode(255 & (v1 << 3 | v2 >>> 2)) + String.fromCharCode(255 & (v2 << 6 | v3 << 1 | v4 >>> 4));
                        } else if (5 === remain) {
                            v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                            str += String.fromCharCode(255 & (v1 << 3 | v2 >>> 2)) + String.fromCharCode(255 & (v2 << 6 | v3 << 1 | v4 >>> 4)) + String.fromCharCode(255 & (v4 << 4 | v5 >>> 1));
                        } else if (7 === remain) {
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
                    }, exports = {
                        encode: function(input, asciiOnly) {
                            var notString = "string" != typeof input;
                            notString && input.constructor === ArrayBuffer && (input = new Uint8Array(input));
                            return notString ? function(bytes) {
                                for (var v1, v2, v3, v4, v5, base32Str = "", length = bytes.length, i = 0, count = 5 * parseInt(length / 5); i < count; ) {
                                    v1 = bytes[i++];
                                    v2 = bytes[i++];
                                    v3 = bytes[i++];
                                    v4 = bytes[i++];
                                    v5 = bytes[i++];
                                    base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[31 & (v3 << 1 | v4 >>> 7)] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[31 & (v4 << 3 | v5 >>> 5)] + BASE32_ENCODE_CHAR[31 & v5];
                                }
                                var remain = length - count;
                                if (1 === remain) {
                                    v1 = bytes[i];
                                    base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[v1 << 2 & 31] + "======";
                                } else if (2 === remain) {
                                    v1 = bytes[i++];
                                    v2 = bytes[i];
                                    base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[v2 << 4 & 31] + "====";
                                } else if (3 === remain) {
                                    v1 = bytes[i++];
                                    v2 = bytes[i++];
                                    v3 = bytes[i];
                                    base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[v3 << 1 & 31] + "===";
                                } else if (4 === remain) {
                                    v1 = bytes[i++];
                                    v2 = bytes[i++];
                                    v3 = bytes[i++];
                                    v4 = bytes[i];
                                    base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[31 & (v3 << 1 | v4 >>> 7)] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[v4 << 3 & 31] + "=";
                                }
                                return base32Str;
                            }(input) : asciiOnly ? function(str) {
                                for (var v1, v2, v3, v4, v5, base32Str = "", length = str.length, i = 0, count = 5 * parseInt(length / 5); i < count; ) {
                                    v1 = str.charCodeAt(i++);
                                    v2 = str.charCodeAt(i++);
                                    v3 = str.charCodeAt(i++);
                                    v4 = str.charCodeAt(i++);
                                    v5 = str.charCodeAt(i++);
                                    base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[31 & (v3 << 1 | v4 >>> 7)] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[31 & (v4 << 3 | v5 >>> 5)] + BASE32_ENCODE_CHAR[31 & v5];
                                }
                                var remain = length - count;
                                if (1 === remain) {
                                    v1 = str.charCodeAt(i);
                                    base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[v1 << 2 & 31] + "======";
                                } else if (2 === remain) {
                                    v1 = str.charCodeAt(i++);
                                    v2 = str.charCodeAt(i);
                                    base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[v2 << 4 & 31] + "====";
                                } else if (3 === remain) {
                                    v1 = str.charCodeAt(i++);
                                    v2 = str.charCodeAt(i++);
                                    v3 = str.charCodeAt(i);
                                    base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[v3 << 1 & 31] + "===";
                                } else if (4 === remain) {
                                    v1 = str.charCodeAt(i++);
                                    v2 = str.charCodeAt(i++);
                                    v3 = str.charCodeAt(i++);
                                    v4 = str.charCodeAt(i);
                                    base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[31 & (v3 << 1 | v4 >>> 7)] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[v4 << 3 & 31] + "=";
                                }
                                return base32Str;
                            }(input) : function(str) {
                                var v1, v2, v3, v4, v5, code, i, end = !1, base32Str = "", index = 0, start = 0, length = str.length;
                                do {
                                    blocks[0] = blocks[5];
                                    blocks[1] = blocks[6];
                                    blocks[2] = blocks[7];
                                    for (i = start; index < length && i < 5; ++index) if ((code = str.charCodeAt(index)) < 128) blocks[i++] = code; else if (code < 2048) {
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
                                    start = i - 5;
                                    index === length && ++index;
                                    index > length && i < 6 && (end = !0);
                                    v1 = blocks[0];
                                    if (i > 4) {
                                        v2 = blocks[1];
                                        v3 = blocks[2];
                                        v4 = blocks[3];
                                        v5 = blocks[4];
                                        base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[31 & (v3 << 1 | v4 >>> 7)] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[31 & (v4 << 3 | v5 >>> 5)] + BASE32_ENCODE_CHAR[31 & v5];
                                    } else if (1 === i) base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[v1 << 2 & 31] + "======"; else if (2 === i) {
                                        v2 = blocks[1];
                                        base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[v2 << 4 & 31] + "====";
                                    } else if (3 === i) {
                                        v2 = blocks[1];
                                        v3 = blocks[2];
                                        base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[v3 << 1 & 31] + "===";
                                    } else {
                                        v2 = blocks[1];
                                        v3 = blocks[2];
                                        v4 = blocks[3];
                                        base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[31 & (v3 << 1 | v4 >>> 7)] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[v4 << 3 & 31] + "=";
                                    }
                                } while (!end);
                                return base32Str;
                            }(input);
                        },
                        decode: decode
                    };
                    decode.asBytes = decodeAsBytes;
                    if (COMMON_JS) module.exports = exports; else {
                        root.base32 = exports;
                        AMD && void 0 !== (__WEBPACK_AMD_DEFINE_RESULT__ = function() {
                            return exports;
                        }.call(exports, __webpack_require__, exports, module)) && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__);
                    }
                }();
            }).call(exports, __webpack_require__("./node_modules/process/browser.js"), __webpack_require__("./node_modules/webpack/buildin/global.js"), __webpack_require__("./node_modules/webpack/buildin/module.js")(module));
        },
        "./node_modules/post-robot/src/bridge/bridge.js": function(module, exports, __webpack_require__) {
            "use strict";
            __webpack_require__("./node_modules/zalgo-promise/src/index.js");
            var _src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), _conf = __webpack_require__("./node_modules/post-robot/src/conf/index.js"), _lib = __webpack_require__("./node_modules/post-robot/src/lib/index.js"), _global = __webpack_require__("./node_modules/post-robot/src/global.js");
            _global.global.tunnelWindows = _global.global.tunnelWindows || {};
            _global.global.tunnelWindowId = 0;
            function deleteTunnelWindow(id) {
                try {
                    _global.global.tunnelWindows[id] && delete _global.global.tunnelWindows[id].source;
                } catch (err) {}
                delete _global.global.tunnelWindows[id];
            }
            function addTunnelWindow(_ref2) {
                var name = _ref2.name, source = _ref2.source, canary = _ref2.canary, sendMessage = _ref2.sendMessage;
                !function() {
                    var tunnelWindows = _global.global.tunnelWindows, _iterator = Object.keys(tunnelWindows), _isArray = Array.isArray(_iterator), _i = 0;
                    for (_iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                        var _ref;
                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref = _iterator[_i++];
                        } else {
                            if ((_i = _iterator.next()).done) break;
                            _ref = _i.value;
                        }
                        var key = _ref, tunnelWindow = tunnelWindows[key];
                        try {
                            (0, _lib.noop)(tunnelWindow.source);
                        } catch (err) {
                            deleteTunnelWindow(key);
                            continue;
                        }
                        (0, _src.isWindowClosed)(tunnelWindow.source) && deleteTunnelWindow(key);
                    }
                }();
                _global.global.tunnelWindowId += 1;
                _global.global.tunnelWindows[_global.global.tunnelWindowId] = {
                    name: name,
                    source: source,
                    canary: canary,
                    sendMessage: sendMessage
                };
                return _global.global.tunnelWindowId;
            }
            _global.global.openTunnelToParent = function(_ref3) {
                var name = _ref3.name, source = _ref3.source, canary = _ref3.canary, sendMessage = _ref3.sendMessage, parentWindow = (0, 
                _src.getParent)(window);
                if (!parentWindow) throw new Error("No parent window found to open tunnel to");
                var id = addTunnelWindow({
                    name: name,
                    source: source,
                    canary: canary,
                    sendMessage: sendMessage
                });
                return _global.global.send(parentWindow, _conf.CONSTANTS.POST_MESSAGE_NAMES.OPEN_TUNNEL, {
                    name: name,
                    sendMessage: function() {
                        var tunnelWindow = function(id) {
                            return _global.global.tunnelWindows[id];
                        }(id);
                        try {
                            (0, _lib.noop)(tunnelWindow && tunnelWindow.source);
                        } catch (err) {
                            deleteTunnelWindow(id);
                            return;
                        }
                        if (tunnelWindow && tunnelWindow.source && !(0, _src.isWindowClosed)(tunnelWindow.source)) {
                            try {
                                tunnelWindow.canary();
                            } catch (err) {
                                return;
                            }
                            tunnelWindow.sendMessage.apply(this, arguments);
                        }
                    }
                }, {
                    domain: _conf.CONSTANTS.WILDCARD
                });
            };
        },
        "./node_modules/post-robot/src/bridge/child.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.openTunnelToOpener = function() {
                return _src.ZalgoPromise.try(function() {
                    var opener = (0, _src2.getOpener)(window);
                    if (opener && (0, _common.needsBridge)({
                        win: opener
                    })) {
                        (0, _common.registerRemoteWindow)(opener);
                        return awaitRemoteBridgeForWindow(opener).then(function(bridge) {
                            return bridge ? window.name ? bridge[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT].openTunnelToParent({
                                name: window.name,
                                source: window,
                                canary: function() {},
                                sendMessage: function(message) {
                                    try {
                                        (0, _lib.noop)(window);
                                    } catch (err) {
                                        return;
                                    }
                                    if (window && !window.closed) try {
                                        _global.global.receiveMessage({
                                            data: message,
                                            origin: this.origin,
                                            source: this.source
                                        });
                                    } catch (err) {
                                        _src.ZalgoPromise.reject(err);
                                    }
                                }
                            }).then(function(_ref2) {
                                var source = _ref2.source, origin = _ref2.origin, data = _ref2.data;
                                if (source !== opener) throw new Error("Source does not match opener");
                                (0, _common.registerRemoteSendMessage)(source, origin, data.sendMessage);
                            }).catch(function(err) {
                                (0, _common.rejectRemoteSendMessage)(opener, err);
                                throw err;
                            }) : (0, _common.rejectRemoteSendMessage)(opener, new Error("Can not register with opener: window does not have a name")) : (0, 
                            _common.rejectRemoteSendMessage)(opener, new Error("Can not register with opener: no bridge found in opener"));
                        });
                    }
                });
            };
            var _src = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), _src2 = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), _conf = __webpack_require__("./node_modules/post-robot/src/conf/index.js"), _lib = __webpack_require__("./node_modules/post-robot/src/lib/index.js"), _global = __webpack_require__("./node_modules/post-robot/src/global.js"), _common = __webpack_require__("./node_modules/post-robot/src/bridge/common.js"), awaitRemoteBridgeForWindow = (0, 
            _lib.weakMapMemoize)(function(win) {
                return _src.ZalgoPromise.try(function() {
                    var _iterator = (0, _src2.getFrames)(win), _isArray = Array.isArray(_iterator), _i = 0;
                    for (_iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                        var _ref;
                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref = _iterator[_i++];
                        } else {
                            if ((_i = _iterator.next()).done) break;
                            _ref = _i.value;
                        }
                        var _frame = _ref;
                        try {
                            if (_frame && _frame !== window && (0, _src2.isSameDomain)(_frame) && _frame[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT]) return _frame;
                        } catch (err) {
                            continue;
                        }
                    }
                    try {
                        var frame = (0, _src2.getFrameByName)(win, (0, _common.getBridgeName)((0, _src2.getDomain)()));
                        if (!frame) return;
                        return (0, _src2.isSameDomain)(frame) && frame[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT] ? frame : new _src.ZalgoPromise(function(resolve) {
                            var interval = void 0, timeout = void 0;
                            interval = setInterval(function() {
                                if (frame && (0, _src2.isSameDomain)(frame) && frame[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT]) {
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
        },
        "./node_modules/post-robot/src/bridge/common.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.documentBodyReady = void 0;
            exports.needsBridgeForBrowser = needsBridgeForBrowser;
            exports.needsBridgeForWin = needsBridgeForWin;
            exports.needsBridgeForDomain = needsBridgeForDomain;
            exports.needsBridge = function(_ref) {
                var win = _ref.win, domain = _ref.domain;
                if (!needsBridgeForBrowser()) return !1;
                if (domain && !needsBridgeForDomain(domain, win)) return !1;
                if (win && !needsBridgeForWin(win)) return !1;
                return !0;
            };
            exports.getBridgeName = getBridgeName;
            exports.isBridge = function() {
                return Boolean(window.name && window.name === getBridgeName((0, _src3.getDomain)()));
            };
            exports.registerRemoteWindow = function(win) {
                _global.global.remoteWindows.set(win, {
                    sendMessagePromise: new _src2.ZalgoPromise()
                });
            };
            exports.findRemoteWindow = findRemoteWindow;
            exports.registerRemoteSendMessage = function(win, domain, sendMessage) {
                var remoteWindow = findRemoteWindow(win);
                if (!remoteWindow) throw new Error("Window not found to register sendMessage to");
                var sendMessageWrapper = function(remoteWin, message, remoteDomain) {
                    if (remoteWin !== win) throw new Error("Remote window does not match window");
                    if (!(0, _src3.matchDomain)(remoteDomain, domain)) throw new Error("Remote domain " + remoteDomain + " does not match domain " + domain);
                    sendMessage(message);
                };
                remoteWindow.sendMessagePromise.resolve(sendMessageWrapper);
                remoteWindow.sendMessagePromise = _src2.ZalgoPromise.resolve(sendMessageWrapper);
            };
            exports.rejectRemoteSendMessage = function(win, err) {
                var remoteWindow = findRemoteWindow(win);
                if (!remoteWindow) throw new Error("Window not found on which to reject sendMessage");
                remoteWindow.sendMessagePromise.asyncReject(err);
            };
            exports.sendBridgeMessage = function(win, message, domain) {
                var messagingChild = (0, _src3.isOpener)(window, win), messagingParent = (0, _src3.isOpener)(win, window);
                if (!messagingChild && !messagingParent) throw new Error("Can only send messages to and from parent and popup windows");
                var remoteWindow = findRemoteWindow(win);
                if (!remoteWindow) throw new Error("Window not found to send message to");
                return remoteWindow.sendMessagePromise.then(function(sendMessage) {
                    return sendMessage(win, message, domain);
                });
            };
            var _src = __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/index.js"), _src2 = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), _src3 = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), _conf = __webpack_require__("./node_modules/post-robot/src/conf/index.js"), _global = __webpack_require__("./node_modules/post-robot/src/global.js");
            function needsBridgeForBrowser() {
                return !!(0, _src3.getUserAgent)(window).match(/MSIE|trident|edge\/12|edge\/13/i) || !_conf.CONFIG.ALLOW_POSTMESSAGE_POPUP;
            }
            function needsBridgeForWin(win) {
                return !(0, _src3.isSameTopWindow)(window, win);
            }
            function needsBridgeForDomain(domain, win) {
                if (domain) {
                    if ((0, _src3.getDomain)() !== (0, _src3.getDomainFromUrl)(domain)) return !0;
                } else if (win && !(0, _src3.isSameDomain)(win)) return !0;
                return !1;
            }
            function getBridgeName(domain) {
                var sanitizedDomain = (domain = domain || (0, _src3.getDomainFromUrl)(domain)).replace(/[^a-zA-Z0-9]+/g, "_");
                return _conf.CONSTANTS.BRIDGE_NAME_PREFIX + "_" + sanitizedDomain;
            }
            exports.documentBodyReady = new _src2.ZalgoPromise(function(resolve) {
                if (window.document && window.document.body) return resolve(window.document.body);
                var interval = setInterval(function() {
                    if (window.document && window.document.body) {
                        clearInterval(interval);
                        return resolve(window.document.body);
                    }
                }, 10);
            });
            _global.global.remoteWindows = _global.global.remoteWindows || new _src.WeakMap();
            function findRemoteWindow(win) {
                return _global.global.remoteWindows.get(win);
            }
        },
        "./node_modules/post-robot/src/bridge/index.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            var _child = __webpack_require__("./node_modules/post-robot/src/bridge/child.js");
            Object.keys(_child).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _child[key];
                    }
                });
            });
            var _common = __webpack_require__("./node_modules/post-robot/src/bridge/common.js");
            Object.keys(_common).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _common[key];
                    }
                });
            });
            var _parent = __webpack_require__("./node_modules/post-robot/src/bridge/parent.js");
            Object.keys(_parent).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _parent[key];
                    }
                });
            });
            __webpack_require__("./node_modules/post-robot/src/bridge/bridge.js");
        },
        "./node_modules/post-robot/src/bridge/interface.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            var _index = __webpack_require__("./node_modules/post-robot/src/bridge/index.js");
            Object.defineProperty(exports, "openBridge", {
                enumerable: !0,
                get: function() {
                    return _index.openBridge;
                }
            });
            Object.defineProperty(exports, "linkUrl", {
                enumerable: !0,
                get: function() {
                    return _index.linkUrl;
                }
            });
            Object.defineProperty(exports, "isBridge", {
                enumerable: !0,
                get: function() {
                    return _index.isBridge;
                }
            });
            Object.defineProperty(exports, "needsBridge", {
                enumerable: !0,
                get: function() {
                    return _index.needsBridge;
                }
            });
            Object.defineProperty(exports, "needsBridgeForBrowser", {
                enumerable: !0,
                get: function() {
                    return _index.needsBridgeForBrowser;
                }
            });
            Object.defineProperty(exports, "hasBridge", {
                enumerable: !0,
                get: function() {
                    return _index.hasBridge;
                }
            });
            Object.defineProperty(exports, "needsBridgeForWin", {
                enumerable: !0,
                get: function() {
                    return _index.needsBridgeForWin;
                }
            });
            Object.defineProperty(exports, "needsBridgeForDomain", {
                enumerable: !0,
                get: function() {
                    return _index.needsBridgeForDomain;
                }
            });
            Object.defineProperty(exports, "openTunnelToOpener", {
                enumerable: !0,
                get: function() {
                    return _index.openTunnelToOpener;
                }
            });
            Object.defineProperty(exports, "destroyBridges", {
                enumerable: !0,
                get: function() {
                    return _index.destroyBridges;
                }
            });
        },
        "./node_modules/post-robot/src/bridge/parent.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.hasBridge = function(url, domain) {
                domain = domain || (0, _src3.getDomainFromUrl)(url);
                return Boolean(_global.global.bridges[domain]);
            };
            exports.openBridge = function(url, domain) {
                domain = domain || (0, _src3.getDomainFromUrl)(url);
                if (_global.global.bridges[domain]) return _global.global.bridges[domain];
                _global.global.bridges[domain] = _src2.ZalgoPromise.try(function() {
                    if ((0, _src3.getDomain)() === domain) throw new Error("Can not open bridge on the same domain as current domain: " + domain);
                    var name = (0, _common.getBridgeName)(domain), frame = (0, _src3.getFrameByName)(window, name);
                    if (frame) throw new Error("Frame with name " + name + " already exists on page");
                    var iframe = function(name, url) {
                        _lib.log.debug("Opening bridge:", name, url);
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
                    _global.global.bridgeFrames[domain] = iframe;
                    return _common.documentBodyReady.then(function(body) {
                        body.appendChild(iframe);
                        var bridge = iframe.contentWindow;
                        !function(source, domain) {
                            _global.global.on(_conf.CONSTANTS.POST_MESSAGE_NAMES.OPEN_TUNNEL, {
                                window: source,
                                domain: domain
                            }, function(_ref) {
                                var origin = _ref.origin, data = _ref.data;
                                if (origin !== domain) throw new Error("Domain " + domain + " does not match origin " + origin);
                                if (!data.name) throw new Error("Register window expected to be passed window name");
                                if (!data.sendMessage) throw new Error("Register window expected to be passed sendMessage method");
                                if (!_global.global.popupWindowsByName[data.name]) throw new Error("Window with name " + data.name + " does not exist, or was not opened by this window");
                                if (!_global.global.popupWindowsByName[data.name].domain) throw new Error("We do not have a registered domain for window " + data.name);
                                if (_global.global.popupWindowsByName[data.name].domain !== origin) throw new Error("Message origin " + origin + " does not matched registered window origin " + _global.global.popupWindowsByName[data.name].domain);
                                (0, _common.registerRemoteSendMessage)(_global.global.popupWindowsByName[data.name].win, domain, data.sendMessage);
                                return {
                                    sendMessage: function(message) {
                                        if (window && !window.closed) {
                                            var winDetails = _global.global.popupWindowsByName[data.name];
                                            if (winDetails) try {
                                                _global.global.receiveMessage({
                                                    data: message,
                                                    origin: winDetails.domain,
                                                    source: winDetails.win
                                                });
                                            } catch (err) {
                                                _src2.ZalgoPromise.reject(err);
                                            }
                                        }
                                    }
                                };
                            });
                        }(bridge, domain);
                        return new _src2.ZalgoPromise(function(resolve, reject) {
                            iframe.onload = resolve;
                            iframe.onerror = reject;
                        }).then(function() {
                            return (0, _lib.onChildWindowReady)(bridge, _conf.CONFIG.BRIDGE_TIMEOUT, "Bridge " + url);
                        }).then(function() {
                            return bridge;
                        });
                    });
                });
                return _global.global.bridges[domain];
            };
            exports.linkUrl = function(win, url) {
                var winOptions = _global.global.popupWindowsByWin.get(win);
                if (winOptions) {
                    winOptions.domain = (0, _src3.getDomainFromUrl)(url);
                    (0, _common.registerRemoteWindow)(win);
                }
            };
            exports.destroyBridges = function() {
                for (var _iterator2 = Object.keys(_global.global.bridgeFrames), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                    var _ref3;
                    if (_isArray2) {
                        if (_i2 >= _iterator2.length) break;
                        _ref3 = _iterator2[_i2++];
                    } else {
                        if ((_i2 = _iterator2.next()).done) break;
                        _ref3 = _i2.value;
                    }
                    var domain = _ref3, frame = _global.global.bridgeFrames[domain];
                    frame.parentNode && frame.parentNode.removeChild(frame);
                }
                _global.global.bridgeFrames = {};
                _global.global.bridges = {};
            };
            var _src = __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/index.js"), _src2 = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), _src3 = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), _conf = __webpack_require__("./node_modules/post-robot/src/conf/index.js"), _lib = __webpack_require__("./node_modules/post-robot/src/lib/index.js"), _global = __webpack_require__("./node_modules/post-robot/src/global.js"), _common = __webpack_require__("./node_modules/post-robot/src/bridge/common.js");
            _global.global.bridges = _global.global.bridges || {};
            _global.global.bridgeFrames = _global.global.bridgeFrames || {};
            _global.global.popupWindowsByWin = _global.global.popupWindowsByWin || new _src.WeakMap();
            _global.global.popupWindowsByName = _global.global.popupWindowsByName || {};
            var windowOpen = window.open;
            window.open = function(url, name, options, last) {
                var domain = url;
                if (url && 0 === url.indexOf(_conf.CONSTANTS.MOCK_PROTOCOL)) {
                    var _url$split = url.split("|");
                    domain = _url$split[0];
                    url = _url$split[1];
                }
                domain && (domain = (0, _src3.getDomainFromUrl)(domain));
                var win = windowOpen.call(this, url, name, options, last);
                if (!win) return win;
                url && (0, _common.registerRemoteWindow)(win);
                var _iterator = Object.keys(_global.global.popupWindowsByName), _isArray = Array.isArray(_iterator), _i = 0;
                for (_iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                    var _ref2;
                    if (_isArray) {
                        if (_i >= _iterator.length) break;
                        _ref2 = _iterator[_i++];
                    } else {
                        if ((_i = _iterator.next()).done) break;
                        _ref2 = _i.value;
                    }
                    var winName = _ref2;
                    (0, _src3.isWindowClosed)(_global.global.popupWindowsByName[winName].win) && delete _global.global.popupWindowsByName[winName];
                }
                if (name && win) {
                    var winOptions = _global.global.popupWindowsByWin.get(win) || _global.global.popupWindowsByName[name] || {};
                    winOptions.name = winOptions.name || name;
                    winOptions.win = winOptions.win || win;
                    winOptions.domain = winOptions.domain || domain;
                    _global.global.popupWindowsByWin.set(win, winOptions);
                    _global.global.popupWindowsByName[name] = winOptions;
                }
                return win;
            };
        },
        "./node_modules/post-robot/src/clean.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.cleanUpWindow = function(win) {
                var requestPromises = _global.global.requestPromises.get(win);
                if (requestPromises) for (var _iterator = requestPromises, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                    var _ref;
                    if (_isArray) {
                        if (_i >= _iterator.length) break;
                        _ref = _iterator[_i++];
                    } else {
                        if ((_i = _iterator.next()).done) break;
                        _ref = _i.value;
                    }
                    var promise = _ref;
                    promise.reject(new Error("No response from window - cleaned up"));
                }
                _global.global.popupWindowsByWin && _global.global.popupWindowsByWin.delete(win);
                _global.global.remoteWindows && _global.global.remoteWindows.delete(win);
                _global.global.requestPromises.delete(win);
                _global.global.methods.delete(win);
                _global.global.readyPromises.delete(win);
            };
            __webpack_require__("./node_modules/cross-domain-utils/src/index.js");
            var _global = __webpack_require__("./node_modules/post-robot/src/global.js");
        },
        "./node_modules/post-robot/src/compat/ie.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.emulateIERestrictions = function(sourceWindow, targetWindow) {
                if (!_conf.CONFIG.ALLOW_POSTMESSAGE_POPUP && !1 === (0, _src.isSameTopWindow)(sourceWindow, targetWindow)) throw new Error("Can not send and receive post messages between two different windows (disabled to emulate IE)");
            };
            var _src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), _conf = __webpack_require__("./node_modules/post-robot/src/conf/index.js");
        },
        "./node_modules/post-robot/src/compat/index.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            var _ie = __webpack_require__("./node_modules/post-robot/src/compat/ie.js");
            Object.keys(_ie).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _ie[key];
                    }
                });
            });
        },
        "./node_modules/post-robot/src/conf/config.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.CONFIG = void 0;
            var _ALLOWED_POST_MESSAGE, _constants = __webpack_require__("./node_modules/post-robot/src/conf/constants.js"), CONFIG = exports.CONFIG = {
                ALLOW_POSTMESSAGE_POPUP: !("__ALLOW_POSTMESSAGE_POPUP__" in window) || window.__ALLOW_POSTMESSAGE_POPUP__,
                LOG_LEVEL: "info",
                BRIDGE_TIMEOUT: 5e3,
                CHILD_WINDOW_TIMEOUT: 5e3,
                ACK_TIMEOUT: -1 !== window.navigator.userAgent.match(/MSIE/i) ? 2e3 : 1e3,
                RES_TIMEOUT: -1,
                LOG_TO_PAGE: !1,
                ALLOWED_POST_MESSAGE_METHODS: (_ALLOWED_POST_MESSAGE = {}, _ALLOWED_POST_MESSAGE[_constants.CONSTANTS.SEND_STRATEGIES.POST_MESSAGE] = !0, 
                _ALLOWED_POST_MESSAGE[_constants.CONSTANTS.SEND_STRATEGIES.BRIDGE] = !0, _ALLOWED_POST_MESSAGE[_constants.CONSTANTS.SEND_STRATEGIES.GLOBAL] = !0, 
                _ALLOWED_POST_MESSAGE),
                ALLOW_SAME_ORIGIN: !1
            };
            0 === window.location.href.indexOf(_constants.CONSTANTS.FILE_PROTOCOL) && (CONFIG.ALLOW_POSTMESSAGE_POPUP = !0);
        },
        "./node_modules/post-robot/src/conf/constants.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.CONSTANTS = {
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
                    HELLO: "postrobot_ready",
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
            };
            var POST_MESSAGE_NAMES = exports.POST_MESSAGE_NAMES = {
                METHOD: "postrobot_method",
                HELLO: "postrobot_hello",
                OPEN_TUNNEL: "postrobot_open_tunnel"
            };
            exports.POST_MESSAGE_NAMES_LIST = Object.keys(POST_MESSAGE_NAMES).map(function(key) {
                return POST_MESSAGE_NAMES[key];
            });
        },
        "./node_modules/post-robot/src/conf/index.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            var _config = __webpack_require__("./node_modules/post-robot/src/conf/config.js");
            Object.keys(_config).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _config[key];
                    }
                });
            });
            var _constants = __webpack_require__("./node_modules/post-robot/src/conf/constants.js");
            Object.keys(_constants).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _constants[key];
                    }
                });
            });
        },
        "./node_modules/post-robot/src/drivers/index.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            var _receive = __webpack_require__("./node_modules/post-robot/src/drivers/receive/index.js");
            Object.keys(_receive).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _receive[key];
                    }
                });
            });
            var _send = __webpack_require__("./node_modules/post-robot/src/drivers/send/index.js");
            Object.keys(_send).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _send[key];
                    }
                });
            });
            var _listeners = __webpack_require__("./node_modules/post-robot/src/drivers/listeners.js");
            Object.keys(_listeners).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _listeners[key];
                    }
                });
            });
        },
        "./node_modules/post-robot/src/drivers/listeners.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.resetListeners = function() {
                _global.global.responseListeners = {};
                _global.global.requestListeners = {};
            };
            exports.addResponseListener = function(hash, listener) {
                _global.global.responseListeners[hash] = listener;
            };
            exports.getResponseListener = function(hash) {
                return _global.global.responseListeners[hash];
            };
            exports.deleteResponseListener = function(hash) {
                delete _global.global.responseListeners[hash];
            };
            exports.markResponseListenerErrored = function(hash) {
                _global.global.erroredResponseListeners[hash] = !0;
            };
            exports.isResponseListenerErrored = function(hash) {
                return Boolean(_global.global.erroredResponseListeners[hash]);
            };
            exports.getRequestListener = getRequestListener;
            exports.addRequestListener = function addRequestListener(_ref5, listener) {
                var name = _ref5.name, win = _ref5.win, domain = _ref5.domain;
                if (!name || "string" != typeof name) throw new Error("Name required to add request listener");
                if (Array.isArray(win)) {
                    for (var listenersCollection = [], _iterator2 = win, _isArray2 = Array.isArray(_iterator2), _i3 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                        var _ref6;
                        if (_isArray2) {
                            if (_i3 >= _iterator2.length) break;
                            _ref6 = _iterator2[_i3++];
                        } else {
                            if ((_i3 = _iterator2.next()).done) break;
                            _ref6 = _i3.value;
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
                            for (var _iterator3 = listenersCollection, _isArray3 = Array.isArray(_iterator3), _i4 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                                var _ref7;
                                if (_isArray3) {
                                    if (_i4 >= _iterator3.length) break;
                                    _ref7 = _iterator3[_i4++];
                                } else {
                                    if ((_i4 = _iterator3.next()).done) break;
                                    _ref7 = _i4.value;
                                }
                                var cancelListener = _ref7;
                                cancelListener.cancel();
                            }
                        }
                    };
                }
                if (Array.isArray(domain)) {
                    for (var _listenersCollection = [], _iterator4 = domain, _isArray4 = Array.isArray(_iterator4), _i5 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator](); ;) {
                        var _ref8;
                        if (_isArray4) {
                            if (_i5 >= _iterator4.length) break;
                            _ref8 = _iterator4[_i5++];
                        } else {
                            if ((_i5 = _iterator4.next()).done) break;
                            _ref8 = _i5.value;
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
                            for (var _iterator5 = _listenersCollection, _isArray5 = Array.isArray(_iterator5), _i6 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator](); ;) {
                                var _ref9;
                                if (_isArray5) {
                                    if (_i6 >= _iterator5.length) break;
                                    _ref9 = _iterator5[_i6++];
                                } else {
                                    if ((_i6 = _iterator5.next()).done) break;
                                    _ref9 = _i6.value;
                                }
                                var cancelListener = _ref9;
                                cancelListener.cancel();
                            }
                        }
                    };
                }
                var existingListener = getRequestListener({
                    name: name,
                    win: win,
                    domain: domain
                });
                win && win !== _conf.CONSTANTS.WILDCARD || (win = _global.global.WINDOW_WILDCARD);
                domain = domain || _conf.CONSTANTS.WILDCARD;
                if (existingListener) throw win && domain ? new Error("Request listener already exists for " + name + " on domain " + domain.toString() + " for " + (win === _global.global.WINDOW_WILDCARD ? "wildcard" : "specified") + " window") : win ? new Error("Request listener already exists for " + name + " for " + (win === _global.global.WINDOW_WILDCARD ? "wildcard" : "specified") + " window") : domain ? new Error("Request listener already exists for " + name + " on domain " + domain.toString()) : new Error("Request listener already exists for " + name);
                var requestListeners = _global.global.requestListeners;
                var nameListeners = requestListeners[name];
                if (!nameListeners) {
                    nameListeners = new _src.WeakMap();
                    requestListeners[name] = nameListeners;
                }
                var winListeners = nameListeners.get(win);
                if (!winListeners) {
                    winListeners = {};
                    nameListeners.set(win, winListeners);
                }
                var strDomain = domain.toString();
                var regexListeners = winListeners[__DOMAIN_REGEX__];
                var regexListener = void 0;
                if ((0, _lib.isRegex)(domain)) {
                    if (!regexListeners) {
                        regexListeners = [];
                        winListeners[__DOMAIN_REGEX__] = regexListeners;
                    }
                    regexListener = {
                        regex: domain,
                        listener: listener
                    };
                    regexListeners.push(regexListener);
                } else winListeners[strDomain] = listener;
                return {
                    cancel: function() {
                        if (winListeners) {
                            delete winListeners[strDomain];
                            win && 0 === Object.keys(winListeners).length && nameListeners.delete(win);
                            regexListener && regexListeners.splice(regexListeners.indexOf(regexListener, 1));
                        }
                    }
                };
            };
            __webpack_require__("./node_modules/zalgo-promise/src/index.js");
            var _src = __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/index.js"), _src2 = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), _global = __webpack_require__("./node_modules/post-robot/src/global.js"), _lib = __webpack_require__("./node_modules/post-robot/src/lib/index.js"), _conf = __webpack_require__("./node_modules/post-robot/src/conf/index.js");
            _global.global.responseListeners = _global.global.responseListeners || {};
            _global.global.requestListeners = _global.global.requestListeners || {};
            _global.global.WINDOW_WILDCARD = _global.global.WINDOW_WILDCARD || new function() {}();
            _global.global.erroredResponseListeners = _global.global.erroredResponseListeners || {};
            var __DOMAIN_REGEX__ = "__domain_regex__";
            function getRequestListener(_ref) {
                var name = _ref.name, win = _ref.win, domain = _ref.domain;
                win === _conf.CONSTANTS.WILDCARD && (win = null);
                domain === _conf.CONSTANTS.WILDCARD && (domain = null);
                if (!name) throw new Error("Name required to get request listener");
                var nameListeners = _global.global.requestListeners[name];
                if (nameListeners) for (var _arr = [ win, _global.global.WINDOW_WILDCARD ], _i = 0; _i < _arr.length; _i++) {
                    var winQualifier = _arr[_i], winListeners = winQualifier && nameListeners.get(winQualifier);
                    if (winListeners) {
                        if (domain && "string" == typeof domain) {
                            if (winListeners[domain]) return winListeners[domain];
                            if (winListeners[__DOMAIN_REGEX__]) {
                                var _iterator = winListeners[__DOMAIN_REGEX__], _isArray = Array.isArray(_iterator), _i2 = 0;
                                for (_iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                                    var _ref3;
                                    if (_isArray) {
                                        if (_i2 >= _iterator.length) break;
                                        _ref3 = _iterator[_i2++];
                                    } else {
                                        if ((_i2 = _iterator.next()).done) break;
                                        _ref3 = _i2.value;
                                    }
                                    var _ref4 = _ref3, regex = _ref4.regex, listener = _ref4.listener;
                                    if ((0, _src2.matchDomain)(regex, domain)) return listener;
                                }
                            }
                        }
                        if (winListeners[_conf.CONSTANTS.WILDCARD]) return winListeners[_conf.CONSTANTS.WILDCARD];
                    }
                }
            }
        },
        "./node_modules/post-robot/src/drivers/receive/index.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            exports.receiveMessage = receiveMessage;
            exports.messageListener = messageListener;
            exports.listenForMessages = function() {
                (0, _lib.addEventListener)(window, "message", messageListener);
            };
            var _src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), _conf = __webpack_require__("./node_modules/post-robot/src/conf/index.js"), _lib = __webpack_require__("./node_modules/post-robot/src/lib/index.js"), _global = __webpack_require__("./node_modules/post-robot/src/global.js"), _types = __webpack_require__("./node_modules/post-robot/src/drivers/receive/types.js");
            _global.global.receivedMessages = _global.global.receivedMessages || [];
            function receiveMessage(event) {
                if (!window || window.closed) throw new Error("Message recieved in closed window");
                try {
                    if (!event.source) return;
                } catch (err) {
                    return;
                }
                var source = event.source, origin = event.origin, message = function(message) {
                    var parsedMessage = void 0;
                    try {
                        parsedMessage = (0, _lib.jsonParse)(message);
                    } catch (err) {
                        return;
                    }
                    if (parsedMessage && "object" === (void 0 === parsedMessage ? "undefined" : _typeof(parsedMessage)) && null !== parsedMessage && (parsedMessage = parsedMessage[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT]) && "object" === (void 0 === parsedMessage ? "undefined" : _typeof(parsedMessage)) && null !== parsedMessage && parsedMessage.type && "string" == typeof parsedMessage.type && _types.RECEIVE_MESSAGE_TYPES[parsedMessage.type]) return parsedMessage;
                }(event.data);
                if (message) {
                    if (!message.sourceDomain || "string" != typeof message.sourceDomain) throw new Error("Expected message to have sourceDomain");
                    0 !== message.sourceDomain.indexOf(_conf.CONSTANTS.MOCK_PROTOCOL) && 0 !== message.sourceDomain.indexOf(_conf.CONSTANTS.FILE_PROTOCOL) || (origin = message.sourceDomain);
                    if (-1 === _global.global.receivedMessages.indexOf(message.id)) {
                        _global.global.receivedMessages.push(message.id);
                        var level = void 0;
                        level = -1 !== _conf.POST_MESSAGE_NAMES_LIST.indexOf(message.name) || message.type === _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK ? "debug" : "error" === message.ack ? "error" : "info";
                        _lib.log.logLevel(level, [ "\n\n\t", "#receive", message.type.replace(/^postrobot_message_/, ""), "::", message.name, "::", origin, "\n\n", message ]);
                        if (!(0, _src.isWindowClosed)(source) || message.fireAndForget) {
                            message.data && (message.data = (0, _lib.deserializeMethods)(source, origin, message.data));
                            _types.RECEIVE_MESSAGE_TYPES[message.type](source, origin, message);
                        } else _lib.log.debug("Source window is closed - can not send " + message.type + " " + message.name);
                    }
                }
            }
            function messageListener(event) {
                try {
                    (0, _lib.noop)(event.source);
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
            _global.global.receiveMessage = receiveMessage;
        },
        "./node_modules/post-robot/src/drivers/receive/types.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.RECEIVE_MESSAGE_TYPES = void 0;
            var _RECEIVE_MESSAGE_TYPE, _extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            }, _src = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), _src2 = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), _conf = __webpack_require__("./node_modules/post-robot/src/conf/index.js"), _lib = __webpack_require__("./node_modules/post-robot/src/lib/index.js"), _send = __webpack_require__("./node_modules/post-robot/src/drivers/send/index.js"), _listeners = __webpack_require__("./node_modules/post-robot/src/drivers/listeners.js");
            exports.RECEIVE_MESSAGE_TYPES = ((_RECEIVE_MESSAGE_TYPE = {})[_conf.CONSTANTS.POST_MESSAGE_TYPE.ACK] = function(source, origin, message) {
                if (!(0, _listeners.isResponseListenerErrored)(message.hash)) {
                    var options = (0, _listeners.getResponseListener)(message.hash);
                    if (!options) throw new Error("No handler found for post message ack for message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                    if (!(0, _src2.matchDomain)(options.domain, origin)) throw new Error("Ack origin " + origin + " does not match domain " + options.domain.toString());
                    options.ack = !0;
                }
            }, _RECEIVE_MESSAGE_TYPE[_conf.CONSTANTS.POST_MESSAGE_TYPE.REQUEST] = function(source, origin, message) {
                var options = (0, _listeners.getRequestListener)({
                    name: message.name,
                    win: source,
                    domain: origin
                });
                function respond(data) {
                    return message.fireAndForget || (0, _src2.isWindowClosed)(source) ? _src.ZalgoPromise.resolve() : (0, 
                    _send.sendMessage)(source, _extends({
                        target: message.originalSource,
                        hash: message.hash,
                        name: message.name
                    }, data), origin);
                }
                return _src.ZalgoPromise.all([ respond({
                    type: _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK
                }), _src.ZalgoPromise.try(function() {
                    if (!options) throw new Error("No handler found for post message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                    if (!(0, _src2.matchDomain)(options.domain, origin)) throw new Error("Request origin " + origin + " does not match domain " + options.domain.toString());
                    var data = message.data;
                    return options.handler({
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
                    var error = (0, _lib.stringifyError)(err).replace(/^Error: /, ""), code = err.code;
                    return respond({
                        type: _conf.CONSTANTS.POST_MESSAGE_TYPE.RESPONSE,
                        ack: _conf.CONSTANTS.POST_MESSAGE_ACK.ERROR,
                        error: error,
                        code: code
                    });
                }) ]).then(_lib.noop).catch(function(err) {
                    if (options && options.handleError) return options.handleError(err);
                    _lib.log.error((0, _lib.stringifyError)(err));
                });
            }, _RECEIVE_MESSAGE_TYPE[_conf.CONSTANTS.POST_MESSAGE_TYPE.RESPONSE] = function(source, origin, message) {
                if (!(0, _listeners.isResponseListenerErrored)(message.hash)) {
                    var options = (0, _listeners.getResponseListener)(message.hash);
                    if (!options) throw new Error("No handler found for post message response for message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                    if (!(0, _src2.matchDomain)(options.domain, origin)) throw new Error("Response origin " + origin + " does not match domain " + (0, 
                    _src2.stringifyDomainPattern)(options.domain));
                    (0, _listeners.deleteResponseListener)(message.hash);
                    if (message.ack === _conf.CONSTANTS.POST_MESSAGE_ACK.ERROR) {
                        var err = new Error(message.error);
                        message.code && (err.code = message.code);
                        return options.respond(err, null);
                    }
                    if (message.ack === _conf.CONSTANTS.POST_MESSAGE_ACK.SUCCESS) {
                        var data = message.data || message.response;
                        return options.respond(null, {
                            source: source,
                            origin: origin,
                            data: data
                        });
                    }
                }
            }, _RECEIVE_MESSAGE_TYPE);
        },
        "./node_modules/post-robot/src/drivers/send/index.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            var _extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            };
            exports.sendMessage = function(win, message, domain) {
                return _src2.ZalgoPromise.try(function() {
                    var _jsonStringify;
                    message = function(win, message) {
                        var options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, id = (0, 
                        _lib.uniqueID)(), type = (0, _lib.getWindowType)(), sourceDomain = (0, _src.getDomain)(window);
                        return _extends({}, message, options, {
                            sourceDomain: sourceDomain,
                            id: message.id || id,
                            windowType: type
                        });
                    }(win, message, {
                        data: (0, _lib.serializeMethods)(win, domain, message.data),
                        domain: domain
                    });
                    var level = void 0;
                    level = -1 !== _conf.POST_MESSAGE_NAMES_LIST.indexOf(message.name) || message.type === _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK ? "debug" : "error" === message.ack ? "error" : "info";
                    _lib.log.logLevel(level, [ "\n\n\t", "#send", message.type.replace(/^postrobot_message_/, ""), "::", message.name, "::", domain || _conf.CONSTANTS.WILDCARD, "\n\n", message ]);
                    if (win === window && !_conf.CONFIG.ALLOW_SAME_ORIGIN) throw new Error("Attemping to send message to self");
                    if ((0, _src.isWindowClosed)(win)) throw new Error("Window is closed");
                    _lib.log.debug("Running send message strategies", message);
                    var messages = [], serializedMessage = (0, _lib.jsonStringify)(((_jsonStringify = {})[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT] = message, 
                    _jsonStringify), null, 2);
                    return _src2.ZalgoPromise.map(Object.keys(_strategies.SEND_MESSAGE_STRATEGIES), function(strategyName) {
                        return _src2.ZalgoPromise.try(function() {
                            if (!_conf.CONFIG.ALLOWED_POST_MESSAGE_METHODS[strategyName]) throw new Error("Strategy disallowed: " + strategyName);
                            return _strategies.SEND_MESSAGE_STRATEGIES[strategyName](win, serializedMessage, domain);
                        }).then(function() {
                            messages.push(strategyName + ": success");
                            return !0;
                        }, function(err) {
                            messages.push(strategyName + ": " + (0, _lib.stringifyError)(err) + "\n");
                            return !1;
                        });
                    }).then(function(results) {
                        var success = results.some(Boolean), status = message.type + " " + message.name + " " + (success ? "success" : "error") + ":\n  - " + messages.join("\n  - ") + "\n";
                        _lib.log.debug(status);
                        if (!success) throw new Error(status);
                    });
                });
            };
            var _src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), _src2 = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), _conf = __webpack_require__("./node_modules/post-robot/src/conf/index.js"), _lib = __webpack_require__("./node_modules/post-robot/src/lib/index.js"), _strategies = __webpack_require__("./node_modules/post-robot/src/drivers/send/strategies.js");
        },
        "./node_modules/post-robot/src/drivers/send/strategies.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.SEND_MESSAGE_STRATEGIES = void 0;
            var _src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), _conf = __webpack_require__("./node_modules/post-robot/src/conf/index.js"), _lib = __webpack_require__("./node_modules/post-robot/src/lib/index.js"), SEND_MESSAGE_STRATEGIES = exports.SEND_MESSAGE_STRATEGIES = {};
            SEND_MESSAGE_STRATEGIES[_conf.CONSTANTS.SEND_STRATEGIES.POST_MESSAGE] = function(win, serializedMessage, domain) {
                try {
                    __webpack_require__("./node_modules/post-robot/src/compat/index.js").emulateIERestrictions(window, win);
                } catch (err) {
                    return;
                }
                (Array.isArray(domain) ? domain : "string" == typeof domain ? [ domain ] : [ _conf.CONSTANTS.WILDCARD ]).map(function(dom) {
                    if (0 === dom.indexOf(_conf.CONSTANTS.MOCK_PROTOCOL)) {
                        if (window.location.protocol === _conf.CONSTANTS.FILE_PROTOCOL) return _conf.CONSTANTS.WILDCARD;
                        if (!(0, _src.isActuallySameDomain)(win)) throw new Error("Attempting to send messsage to mock domain " + dom + ", but window is actually cross-domain");
                        return (0, _src.getActualDomain)(win);
                    }
                    return 0 === dom.indexOf(_conf.CONSTANTS.FILE_PROTOCOL) ? _conf.CONSTANTS.WILDCARD : dom;
                }).forEach(function(dom) {
                    return win.postMessage(serializedMessage, dom);
                });
            };
            var _require = __webpack_require__("./node_modules/post-robot/src/bridge/index.js"), sendBridgeMessage = _require.sendBridgeMessage, needsBridgeForBrowser = _require.needsBridgeForBrowser, isBridge = _require.isBridge;
            SEND_MESSAGE_STRATEGIES[_conf.CONSTANTS.SEND_STRATEGIES.BRIDGE] = function(win, serializedMessage, domain) {
                if (needsBridgeForBrowser() || isBridge()) {
                    if ((0, _src.isSameDomain)(win)) throw new Error("Post message through bridge disabled between same domain windows");
                    if (!1 !== (0, _src.isSameTopWindow)(window, win)) throw new Error("Can only use bridge to communicate between two different windows, not between frames");
                    return sendBridgeMessage(win, serializedMessage, domain);
                }
            };
            SEND_MESSAGE_STRATEGIES[_conf.CONSTANTS.SEND_STRATEGIES.GLOBAL] = function(win, serializedMessage) {
                if ((0, _lib.needsGlobalMessagingForBrowser)()) {
                    if (!(0, _src.isSameDomain)(win)) throw new Error("Post message through global disabled between different domain windows");
                    if (!1 !== (0, _src.isSameTopWindow)(window, win)) throw new Error("Can only use global to communicate between two different windows, not between frames");
                    var foreignGlobal = win[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT];
                    if (!foreignGlobal) throw new Error("Can not find postRobot global on foreign window");
                    return foreignGlobal.receiveMessage({
                        source: window,
                        origin: (0, _src.getDomain)(),
                        data: serializedMessage
                    });
                }
            };
        },
        "./node_modules/post-robot/src/global.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.global = void 0;
            var _conf = __webpack_require__("./node_modules/post-robot/src/conf/index.js");
            (exports.global = window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT] = window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT] || {}).registerSelf = function() {};
        },
        "./node_modules/post-robot/src/index.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            var _interface = __webpack_require__("./node_modules/post-robot/src/interface.js");
            Object.keys(_interface).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _interface[key];
                    }
                });
            });
            var INTERFACE = function(obj) {
                if (obj && obj.__esModule) return obj;
                var newObj = {};
                if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                newObj.default = obj;
                return newObj;
            }(_interface);
            exports.default = INTERFACE;
        },
        "./node_modules/post-robot/src/interface.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.bridge = exports.Promise = exports.cleanUpWindow = void 0;
            var _public = __webpack_require__("./node_modules/post-robot/src/public/index.js");
            Object.keys(_public).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _public[key];
                    }
                });
            });
            var _clean = __webpack_require__("./node_modules/post-robot/src/clean.js");
            Object.defineProperty(exports, "cleanUpWindow", {
                enumerable: !0,
                get: function() {
                    return _clean.cleanUpWindow;
                }
            });
            var _src = __webpack_require__("./node_modules/zalgo-promise/src/index.js");
            Object.defineProperty(exports, "Promise", {
                enumerable: !0,
                get: function() {
                    return _src.ZalgoPromise;
                }
            });
            exports.init = init;
            var _lib = __webpack_require__("./node_modules/post-robot/src/lib/index.js"), _drivers = __webpack_require__("./node_modules/post-robot/src/drivers/index.js"), _global = __webpack_require__("./node_modules/post-robot/src/global.js");
            exports.bridge = __webpack_require__("./node_modules/post-robot/src/bridge/interface.js");
            function init() {
                if (!_global.global.initialized) {
                    (0, _drivers.listenForMessages)();
                    __webpack_require__("./node_modules/post-robot/src/bridge/index.js").openTunnelToOpener();
                    (0, _lib.initOnReady)();
                    (0, _lib.listenForMethods)({
                        on: _public.on,
                        send: _public.send
                    });
                }
                _global.global.initialized = !0;
            }
            init();
        },
        "./node_modules/post-robot/src/lib/index.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            var _util = __webpack_require__("./node_modules/post-robot/src/lib/util.js");
            Object.keys(_util).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _util[key];
                    }
                });
            });
            var _log = __webpack_require__("./node_modules/post-robot/src/lib/log.js");
            Object.keys(_log).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _log[key];
                    }
                });
            });
            var _serialize = __webpack_require__("./node_modules/post-robot/src/lib/serialize.js");
            Object.keys(_serialize).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _serialize[key];
                    }
                });
            });
            var _ready = __webpack_require__("./node_modules/post-robot/src/lib/ready.js");
            Object.keys(_ready).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _ready[key];
                    }
                });
            });
        },
        "./node_modules/post-robot/src/lib/log.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.log = void 0;
            var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            }, _conf = __webpack_require__("./node_modules/post-robot/src/conf/index.js"), _util = __webpack_require__("./node_modules/post-robot/src/lib/util.js"), LOG_LEVELS = [ "debug", "info", "warn", "error" ];
            Function.prototype.bind && window.console && "object" === _typeof(console.log) && [ "log", "info", "warn", "error" ].forEach(function(method) {
                console[method] = this.bind(console[method], console);
            }, Function.prototype.call);
            var log = exports.log = {
                clearLogs: function() {
                    window.console && window.console.clear && window.console.clear();
                    if (_conf.CONFIG.LOG_TO_PAGE) {
                        var container = document.getElementById("postRobotLogs");
                        container && container.parentNode && container.parentNode.removeChild(container);
                    }
                },
                writeToPage: function(level, args) {
                    setTimeout(function() {
                        var container = document.getElementById("postRobotLogs");
                        if (!container) {
                            (container = document.createElement("div")).id = "postRobotLogs";
                            container.style.cssText = "width: 800px; font-family: monospace; white-space: pre-wrap;";
                            document.body && document.body.appendChild(container);
                        }
                        var el = document.createElement("div"), date = new Date().toString().split(" ")[4], payload = Array.prototype.slice.call(args).map(function(item) {
                            if ("string" == typeof item) return item;
                            if (!item) return Object.prototype.toString.call(item);
                            var json = void 0;
                            try {
                                json = (0, _util.jsonStringify)(item, null, 2);
                            } catch (err) {
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
                            var logLevel = window.LOG_LEVEL || _conf.CONFIG.LOG_LEVEL;
                            if ("disabled" === logLevel || LOG_LEVELS.indexOf(level) < LOG_LEVELS.indexOf(logLevel)) return;
                            (args = Array.prototype.slice.call(args)).unshift("" + window.location.host + window.location.pathname);
                            args.unshift("::");
                            args.unshift("" + (0, _util.getWindowType)().toLowerCase());
                            args.unshift("[post-robot]");
                            _conf.CONFIG.LOG_TO_PAGE && log.writeToPage(level, args);
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
        },
        "./node_modules/post-robot/src/lib/ready.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.onHello = onHello;
            exports.sayHello = sayHello;
            exports.initOnReady = function() {
                onHello(function(_ref3) {
                    var source = _ref3.source, origin = _ref3.origin, promise = _global.global.readyPromises.get(source) || new _src3.ZalgoPromise();
                    promise.resolve({
                        origin: origin
                    });
                    _global.global.readyPromises.set(source, promise);
                });
                var parent = (0, _src2.getAncestor)();
                parent && sayHello(parent).catch(function(err) {
                    _log.log.debug((0, _util.stringifyError)(err));
                });
            };
            exports.onChildWindowReady = function(win) {
                var timeout = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 5e3, name = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "Window", promise = _global.global.readyPromises.get(win);
                if (promise) return promise;
                promise = new _src3.ZalgoPromise();
                _global.global.readyPromises.set(win, promise);
                -1 !== timeout && setTimeout(function() {
                    return promise.reject(new Error(name + " did not load after " + timeout + "ms"));
                }, timeout);
                return promise;
            };
            var _src = __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/index.js"), _src2 = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), _src3 = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), _conf = __webpack_require__("./node_modules/post-robot/src/conf/index.js"), _global = __webpack_require__("./node_modules/post-robot/src/global.js"), _log = __webpack_require__("./node_modules/post-robot/src/lib/log.js"), _util = __webpack_require__("./node_modules/post-robot/src/lib/util.js");
            _global.global.readyPromises = _global.global.readyPromises || new _src.WeakMap();
            function onHello(handler) {
                _global.global.on(_conf.CONSTANTS.POST_MESSAGE_NAMES.HELLO, {
                    domain: _conf.CONSTANTS.WILDCARD
                }, function(_ref) {
                    var source = _ref.source, origin = _ref.origin;
                    return handler({
                        source: source,
                        origin: origin
                    });
                });
            }
            function sayHello(win) {
                return _global.global.send(win, _conf.CONSTANTS.POST_MESSAGE_NAMES.HELLO, {}, {
                    domain: _conf.CONSTANTS.WILDCARD,
                    timeout: -1
                }).then(function(_ref2) {
                    return {
                        origin: _ref2.origin
                    };
                });
            }
        },
        "./node_modules/post-robot/src/lib/serialize.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.listenForMethods = void 0;
            var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            exports.serializeMethod = serializeMethod;
            exports.serializeMethods = function(destination, domain, obj) {
                return (0, _util.replaceObject)({
                    obj: obj
                }, function(item, key) {
                    return "function" == typeof item ? serializeMethod(destination, domain, item, key.toString()) : item instanceof Error ? (err = item, 
                    {
                        __type__: _conf.CONSTANTS.SERIALIZATION_TYPES.ERROR,
                        __message__: (0, _util.stringifyError)(err),
                        __code__: err.code
                    }) : window.Promise && item instanceof window.Promise ? function(destination, domain, promise, name) {
                        return {
                            __type__: _conf.CONSTANTS.SERIALIZATION_TYPES.PROMISE,
                            __then__: serializeMethod(destination, domain, function(resolve, reject) {
                                return promise.then(resolve, reject);
                            }, name + ".then")
                        };
                    }(destination, domain, item, key.toString()) : _src3.ZalgoPromise.isPromise(item) ? function(destination, domain, promise, name) {
                        return {
                            __type__: _conf.CONSTANTS.SERIALIZATION_TYPES.ZALGO_PROMISE,
                            __then__: serializeMethod(destination, domain, function(resolve, reject) {
                                return promise.then(resolve, reject);
                            }, name + ".then")
                        };
                    }(destination, domain, item, key.toString()) : (0, _util.isRegex)(item) ? (regex = item, 
                    {
                        __type__: _conf.CONSTANTS.SERIALIZATION_TYPES.REGEX,
                        __source__: regex.source
                    }) : void 0;
                    var err, regex;
                }).obj;
            };
            exports.deserializeMethod = deserializeMethod;
            exports.deserializeError = deserializeError;
            exports.deserializeZalgoPromise = deserializeZalgoPromise;
            exports.deserializePromise = deserializePromise;
            exports.deserializeRegex = deserializeRegex;
            exports.deserializeMethods = function(source, origin, obj) {
                return (0, _util.replaceObject)({
                    obj: obj
                }, function(item) {
                    if ("object" === (void 0 === item ? "undefined" : _typeof(item)) && null !== item) return isSerialized(item, _conf.CONSTANTS.SERIALIZATION_TYPES.METHOD) ? deserializeMethod(source, origin, item) : isSerialized(item, _conf.CONSTANTS.SERIALIZATION_TYPES.ERROR) ? deserializeError(source, origin, item) : isSerialized(item, _conf.CONSTANTS.SERIALIZATION_TYPES.PROMISE) ? deserializePromise(source, origin, item) : isSerialized(item, _conf.CONSTANTS.SERIALIZATION_TYPES.ZALGO_PROMISE) ? deserializeZalgoPromise(source, origin, item) : isSerialized(item, _conf.CONSTANTS.SERIALIZATION_TYPES.REGEX) ? deserializeRegex(source, origin, item) : void 0;
                }).obj;
            };
            var _src = __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/index.js"), _src2 = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), _src3 = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), _conf = __webpack_require__("./node_modules/post-robot/src/conf/index.js"), _global = __webpack_require__("./node_modules/post-robot/src/global.js"), _util = __webpack_require__("./node_modules/post-robot/src/lib/util.js"), _log = __webpack_require__("./node_modules/post-robot/src/lib/log.js");
            _global.global.methods = _global.global.methods || new _src.WeakMap();
            exports.listenForMethods = (0, _util.once)(function() {
                _global.global.on(_conf.CONSTANTS.POST_MESSAGE_NAMES.METHOD, {
                    origin: _conf.CONSTANTS.WILDCARD
                }, function(_ref) {
                    var source = _ref.source, origin = _ref.origin, data = _ref.data, methods = _global.global.methods.get(source);
                    if (!methods) throw new Error("Could not find any methods this window has privileges to call");
                    var meth = methods[data.id];
                    if (!meth) throw new Error("Could not find method with id: " + data.id);
                    if (!(0, _src2.matchDomain)(meth.domain, origin)) throw new Error("Method domain " + meth.domain + " does not match origin " + origin);
                    _log.log.debug("Call local method", data.name, data.args);
                    return _src3.ZalgoPromise.try(function() {
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
            function isSerialized(item, type) {
                return "object" === (void 0 === item ? "undefined" : _typeof(item)) && null !== item && item.__type__ === type;
            }
            function serializeMethod(destination, domain, method, name) {
                var id = (0, _util.uniqueID)(), methods = _global.global.methods.get(destination);
                if (!methods) {
                    methods = {};
                    _global.global.methods.set(destination, methods);
                }
                methods[id] = {
                    domain: domain,
                    method: method
                };
                return {
                    __type__: _conf.CONSTANTS.SERIALIZATION_TYPES.METHOD,
                    __id__: id,
                    __name__: name
                };
            }
            function deserializeMethod(source, origin, obj) {
                function wrapper() {
                    var args = Array.prototype.slice.call(arguments);
                    _log.log.debug("Call foreign method", obj.__name__, args);
                    return _global.global.send(source, _conf.CONSTANTS.POST_MESSAGE_NAMES.METHOD, {
                        id: obj.__id__,
                        name: obj.__name__,
                        args: args
                    }, {
                        domain: origin,
                        timeout: -1
                    }).then(function(_ref2) {
                        var data = _ref2.data;
                        _log.log.debug("Got foreign method result", obj.__name__, data.result);
                        return data.result;
                    }, function(err) {
                        _log.log.debug("Got foreign method error", (0, _util.stringifyError)(err));
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
                var err = new Error(obj.__message__);
                obj.__code__ && (err.code = obj.__code__);
                return err;
            }
            function deserializeZalgoPromise(source, origin, prom) {
                return new _src3.ZalgoPromise(function(resolve, reject) {
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
        },
        "./node_modules/post-robot/src/lib/util.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.weakMapMemoize = exports.once = void 0;
            var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            exports.stringifyError = function stringifyError(err) {
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
            exports.noop = function() {};
            exports.addEventListener = function(obj, event, handler) {
                obj.addEventListener ? obj.addEventListener(event, handler) : obj.attachEvent("on" + event, handler);
                return {
                    cancel: function() {
                        obj.removeEventListener ? obj.removeEventListener(event, handler) : obj.detachEvent("on" + event, handler);
                    }
                };
            };
            exports.uniqueID = function() {
                var chars = "0123456789abcdef";
                return "xxxxxxxxxx".replace(/./g, function() {
                    return chars.charAt(Math.floor(Math.random() * chars.length));
                });
            };
            exports.eachArray = eachArray;
            exports.eachObject = eachObject;
            exports.each = each;
            exports.replaceObject = function replaceObject(item, callback) {
                var depth = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
                if (depth >= 100) throw new Error("Self-referential object passed, or object contained too many layers");
                var newobj = void 0;
                if ("object" !== (void 0 === item ? "undefined" : _typeof(item)) || null === item || Array.isArray(item)) {
                    if (!Array.isArray(item)) throw new TypeError("Invalid type: " + (void 0 === item ? "undefined" : _typeof(item)));
                    newobj = [];
                } else newobj = {};
                each(item, function(childItem, key) {
                    var result = callback(childItem, key);
                    void 0 !== result ? newobj[key] = result : "object" === (void 0 === childItem ? "undefined" : _typeof(childItem)) && null !== childItem ? newobj[key] = replaceObject(childItem, callback, depth + 1) : newobj[key] = childItem;
                });
                return newobj;
            };
            exports.safeInterval = function(method, time) {
                var timeout = void 0;
                timeout = setTimeout(function runInterval() {
                    timeout = setTimeout(runInterval, time);
                    method.call();
                }, time);
                return {
                    cancel: function() {
                        clearTimeout(timeout);
                    }
                };
            };
            exports.isRegex = function(item) {
                return "[object RegExp]" === Object.prototype.toString.call(item);
            };
            exports.getWindowType = function() {
                if ((0, _src2.isPopup)()) return _conf.CONSTANTS.WINDOW_TYPES.POPUP;
                if ((0, _src2.isIframe)()) return _conf.CONSTANTS.WINDOW_TYPES.IFRAME;
                return _conf.CONSTANTS.WINDOW_TYPES.FULLPAGE;
            };
            exports.jsonStringify = function(obj, replacer, indent) {
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
            };
            exports.jsonParse = function(item) {
                return JSON.parse(item);
            };
            exports.needsGlobalMessagingForBrowser = function() {
                if ((0, _src2.getUserAgent)(window).match(/MSIE|trident|edge\/12|edge\/13/i)) return !0;
                if (!_conf.CONFIG.ALLOW_POSTMESSAGE_POPUP) return !0;
                return !1;
            };
            var _src = __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/index.js"), _src2 = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), _conf = __webpack_require__("./node_modules/post-robot/src/conf/index.js");
            exports.once = function(method) {
                if (!method) return method;
                var called = !1;
                return function() {
                    if (!called) {
                        called = !0;
                        return method.apply(this, arguments);
                    }
                };
            };
            function eachArray(item, callback) {
                for (var i = 0; i < item.length; i++) callback(item[i], i);
            }
            function eachObject(item, callback) {
                for (var _key in item) item.hasOwnProperty(_key) && callback(item[_key], _key);
            }
            function each(item, callback) {
                Array.isArray(item) ? eachArray(item, callback) : "object" === (void 0 === item ? "undefined" : _typeof(item)) && null !== item && eachObject(item, callback);
            }
            exports.weakMapMemoize = function(method) {
                var weakmap = new _src.WeakMap();
                return function(arg) {
                    var result = weakmap.get(arg);
                    if (void 0 !== result) return result;
                    void 0 !== (result = method.call(this, arg)) && weakmap.set(arg, result);
                    return result;
                };
            };
        },
        "./node_modules/post-robot/src/public/client.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.send = void 0;
            exports.request = request;
            exports.sendToParent = function(name, data, options) {
                var win = (0, _src3.getAncestor)();
                if (!win) return new _src2.ZalgoPromise(function(resolve, reject) {
                    return reject(new Error("Window does not have a parent"));
                });
                return _send(win, name, data, options);
            };
            exports.client = function() {
                var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                if (!options.window) throw new Error("Expected options.window");
                var win = options.window;
                return {
                    send: function(name, data) {
                        return _send(win, name, data, options);
                    }
                };
            };
            var _src = __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/index.js"), _src2 = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), _src3 = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), _conf = __webpack_require__("./node_modules/post-robot/src/conf/index.js"), _drivers = __webpack_require__("./node_modules/post-robot/src/drivers/index.js"), _lib = __webpack_require__("./node_modules/post-robot/src/lib/index.js"), _global = __webpack_require__("./node_modules/post-robot/src/global.js");
            _global.global.requestPromises = _global.global.requestPromises || new _src.WeakMap();
            function request(options) {
                return _src2.ZalgoPromise.try(function() {
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
                    domain = options.domain || _conf.CONSTANTS.WILDCARD;
                    var hash = options.name + "_" + (0, _lib.uniqueID)();
                    if ((0, _src3.isWindowClosed)(win)) throw new Error("Target window is closed");
                    var hasResult = !1, requestPromises = _global.global.requestPromises.get(win);
                    if (!requestPromises) {
                        requestPromises = [];
                        _global.global.requestPromises.set(win, requestPromises);
                    }
                    var requestPromise = _src2.ZalgoPromise.try(function() {
                        if ((0, _src3.isAncestor)(window, win)) return (0, _lib.onChildWindowReady)(win, options.timeout || _conf.CONFIG.CHILD_WINDOW_TIMEOUT);
                    }).then(function() {
                        var origin = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).origin;
                        if ((0, _lib.isRegex)(domain) && !origin) return (0, _lib.sayHello)(win);
                    }).then(function() {
                        var origin = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).origin;
                        if ((0, _lib.isRegex)(domain)) {
                            if (!(0, _src3.matchDomain)(domain, origin)) throw new Error("Remote window domain " + origin + " does not match regex: " + domain.toString());
                            domain = origin;
                        }
                        if ("string" != typeof domain && !Array.isArray(domain)) throw new TypeError("Expected domain to be a string or array");
                        var actualDomain = domain;
                        return new _src2.ZalgoPromise(function(resolve, reject) {
                            var responseListener = void 0;
                            if (!options.fireAndForget) {
                                responseListener = {
                                    name: name,
                                    window: win,
                                    domain: actualDomain,
                                    respond: function(err, result) {
                                        if (!err) {
                                            hasResult = !0;
                                            requestPromises.splice(requestPromises.indexOf(requestPromise, 1));
                                        }
                                        err ? reject(err) : resolve(result);
                                    }
                                };
                                (0, _drivers.addResponseListener)(hash, responseListener);
                            }
                            (0, _drivers.sendMessage)(win, {
                                type: _conf.CONSTANTS.POST_MESSAGE_TYPE.REQUEST,
                                hash: hash,
                                name: name,
                                data: options.data,
                                fireAndForget: options.fireAndForget
                            }, actualDomain).catch(reject);
                            if (options.fireAndForget) return resolve();
                            var ackTimeout = _conf.CONFIG.ACK_TIMEOUT, resTimeout = options.timeout || _conf.CONFIG.RES_TIMEOUT, cycleTime = 100;
                            setTimeout(function cycle() {
                                if (!hasResult) {
                                    if ((0, _src3.isWindowClosed)(win)) return responseListener.ack ? reject(new Error("Window closed for " + name + " before response")) : reject(new Error("Window closed for " + name + " before ack"));
                                    ackTimeout = Math.max(ackTimeout - cycleTime, 0);
                                    -1 !== resTimeout && (resTimeout = Math.max(resTimeout - cycleTime, 0));
                                    if (responseListener.ack) {
                                        if (-1 === resTimeout) return;
                                        cycleTime = Math.min(resTimeout, 2e3);
                                    } else {
                                        if (0 === ackTimeout) return reject(new Error("No ack for postMessage " + name + " in " + (0, 
                                        _src3.getDomain)() + " in " + _conf.CONFIG.ACK_TIMEOUT + "ms"));
                                        if (0 === resTimeout) return reject(new Error("No response for postMessage " + name + " in " + (0, 
                                        _src3.getDomain)() + " in " + (options.timeout || _conf.CONFIG.RES_TIMEOUT) + "ms"));
                                    }
                                    setTimeout(cycle, cycleTime);
                                }
                            }, cycleTime);
                        });
                    });
                    requestPromise.catch(function() {
                        (0, _drivers.markResponseListenerErrored)(hash);
                        (0, _drivers.deleteResponseListener)(hash);
                    });
                    requestPromises.push(requestPromise);
                    return requestPromise;
                });
            }
            function _send(window, name, data, options) {
                (options = options || {}).window = window;
                options.name = name;
                options.data = data;
                return request(options);
            }
            exports.send = _send;
            _global.global.send = _send;
        },
        "./node_modules/post-robot/src/public/config.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.CONSTANTS = exports.CONFIG = void 0;
            var _conf = __webpack_require__("./node_modules/post-robot/src/conf/index.js");
            Object.defineProperty(exports, "CONFIG", {
                enumerable: !0,
                get: function() {
                    return _conf.CONFIG;
                }
            });
            Object.defineProperty(exports, "CONSTANTS", {
                enumerable: !0,
                get: function() {
                    return _conf.CONSTANTS;
                }
            });
            exports.disable = function() {
                delete window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT];
                window.removeEventListener("message", _drivers.messageListener);
            };
            var _drivers = __webpack_require__("./node_modules/post-robot/src/drivers/index.js");
        },
        "./node_modules/post-robot/src/public/index.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.parent = void 0;
            var _client = __webpack_require__("./node_modules/post-robot/src/public/client.js");
            Object.keys(_client).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _client[key];
                    }
                });
            });
            var _server = __webpack_require__("./node_modules/post-robot/src/public/server.js");
            Object.keys(_server).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _server[key];
                    }
                });
            });
            var _config = __webpack_require__("./node_modules/post-robot/src/public/config.js");
            Object.keys(_config).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _config[key];
                    }
                });
            });
            var _src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js");
            exports.parent = (0, _src.getAncestor)();
        },
        "./node_modules/post-robot/src/public/server.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.on = void 0;
            var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            exports.listen = listen;
            exports.once = function(name) {
                var options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, handler = arguments[2];
                if ("function" == typeof options) {
                    handler = options;
                    options = {};
                }
                options = options || {};
                handler = handler || options.handler;
                var errorHandler = options.errorHandler, promise = new _src2.ZalgoPromise(function(resolve, reject) {
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
            };
            exports.listener = function() {
                var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return {
                    on: function(name, handler) {
                        return _on(name, options, handler);
                    }
                };
            };
            var _src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), _src2 = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), _lib = __webpack_require__("./node_modules/post-robot/src/lib/index.js"), _drivers = __webpack_require__("./node_modules/post-robot/src/drivers/index.js"), _conf = __webpack_require__("./node_modules/post-robot/src/conf/index.js"), _global = __webpack_require__("./node_modules/post-robot/src/global.js");
            function listen(options) {
                if (!options.name) throw new Error("Expected options.name");
                if (!options.handler) throw new Error("Expected options.handler");
                var name = options.name, win = options.window, domain = options.domain, listenerOptions = {
                    handler: options.handler,
                    handleError: options.errorHandler || function(err) {
                        throw err;
                    },
                    window: win,
                    domain: domain || _conf.CONSTANTS.WILDCARD,
                    name: name
                }, requestListener = (0, _drivers.addRequestListener)({
                    name: name,
                    win: win,
                    domain: domain
                }, listenerOptions);
                if (options.once) {
                    var _handler = listenerOptions.handler;
                    listenerOptions.handler = (0, _lib.once)(function() {
                        requestListener.cancel();
                        return _handler.apply(this, arguments);
                    });
                }
                if (listenerOptions.window && options.errorOnClose) var interval = (0, _lib.safeInterval)(function() {
                    if (win && "object" === (void 0 === win ? "undefined" : _typeof(win)) && (0, _src.isWindowClosed)(win)) {
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
            exports.on = _on;
            _global.global.on = _on;
        },
        "./node_modules/process/browser.js": function(module, exports, __webpack_require__) {
            "use strict";
            var cachedSetTimeout, cachedClearTimeout, process = module.exports = {};
            function defaultSetTimout() {
                throw new Error("setTimeout has not been defined");
            }
            function defaultClearTimeout() {
                throw new Error("clearTimeout has not been defined");
            }
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
            function runTimeout(fun) {
                if (cachedSetTimeout === setTimeout) return setTimeout(fun, 0);
                if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
                    cachedSetTimeout = setTimeout;
                    return setTimeout(fun, 0);
                }
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
            var currentQueue, queue = [], draining = !1, queueIndex = -1;
            function cleanUpNextTick() {
                if (draining && currentQueue) {
                    draining = !1;
                    currentQueue.length ? queue = currentQueue.concat(queue) : queueIndex = -1;
                    queue.length && drainQueue();
                }
            }
            function drainQueue() {
                if (!draining) {
                    var timeout = runTimeout(cleanUpNextTick);
                    draining = !0;
                    for (var len = queue.length; len; ) {
                        currentQueue = queue;
                        queue = [];
                        for (;++queueIndex < len; ) currentQueue && currentQueue[queueIndex].run();
                        queueIndex = -1;
                        len = queue.length;
                    }
                    currentQueue = null;
                    draining = !1;
                    !function(marker) {
                        if (cachedClearTimeout === clearTimeout) return clearTimeout(marker);
                        if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
                            cachedClearTimeout = clearTimeout;
                            return clearTimeout(marker);
                        }
                        try {
                            cachedClearTimeout(marker);
                        } catch (e) {
                            try {
                                return cachedClearTimeout.call(null, marker);
                            } catch (e) {
                                return cachedClearTimeout.call(this, marker);
                            }
                        }
                    }(timeout);
                }
            }
            process.nextTick = function(fun) {
                var args = new Array(arguments.length - 1);
                if (arguments.length > 1) for (var i = 1; i < arguments.length; i++) args[i - 1] = arguments[i];
                queue.push(new Item(fun, args));
                1 !== queue.length || draining || runTimeout(drainQueue);
            };
            function Item(fun, array) {
                this.fun = fun;
                this.array = array;
            }
            Item.prototype.run = function() {
                this.fun.apply(null, this.array);
            };
            process.title = "browser";
            process.browser = !0;
            process.env = {};
            process.argv = [];
            process.version = "";
            process.versions = {};
            function noop() {}
            process.on = noop;
            process.addListener = noop;
            process.once = noop;
            process.off = noop;
            process.removeListener = noop;
            process.removeAllListeners = noop;
            process.emit = noop;
            process.prependListener = noop;
            process.prependOnceListener = noop;
            process.listeners = function(name) {
                return [];
            };
            process.binding = function(name) {
                throw new Error("process.binding is not supported");
            };
            process.cwd = function() {
                return "/";
            };
            process.chdir = function(dir) {
                throw new Error("process.chdir is not supported");
            };
            process.umask = function() {
                return 0;
            };
        },
        "./node_modules/webpack/buildin/amd-options.js": function(module, exports) {
            (function(__webpack_amd_options__) {
                module.exports = __webpack_amd_options__;
            }).call(exports, {});
        },
        "./node_modules/webpack/buildin/global.js": function(module, exports, __webpack_require__) {
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
        },
        "./node_modules/webpack/buildin/module.js": function(module, exports, __webpack_require__) {
            "use strict";
            module.exports = function(module) {
                if (!module.webpackPolyfill) {
                    module.deprecate = function() {};
                    module.paths = [];
                    module.children || (module.children = []);
                    Object.defineProperty(module, "loaded", {
                        enumerable: !0,
                        get: function() {
                            return module.l;
                        }
                    });
                    Object.defineProperty(module, "id", {
                        enumerable: !0,
                        get: function() {
                            return module.i;
                        }
                    });
                    module.webpackPolyfill = 1;
                }
                return module;
            };
        },
        "./node_modules/zalgo-promise/src/exceptions.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.dispatchPossiblyUnhandledError = function(err) {
                if (-1 !== (0, _global.getGlobal)().dispatchedErrors.indexOf(err)) return;
                (0, _global.getGlobal)().dispatchedErrors.push(err);
                setTimeout(function() {
                    throw err;
                }, 1);
                for (var j = 0; j < (0, _global.getGlobal)().possiblyUnhandledPromiseHandlers.length; j++) (0, 
                _global.getGlobal)().possiblyUnhandledPromiseHandlers[j](err);
            };
            exports.onPossiblyUnhandledException = function(handler) {
                (0, _global.getGlobal)().possiblyUnhandledPromiseHandlers.push(handler);
                return {
                    cancel: function() {
                        (0, _global.getGlobal)().possiblyUnhandledPromiseHandlers.splice((0, _global.getGlobal)().possiblyUnhandledPromiseHandlers.indexOf(handler), 1);
                    }
                };
            };
            var _global = __webpack_require__("./node_modules/zalgo-promise/src/global.js");
        },
        "./node_modules/zalgo-promise/src/global.js": function(module, exports, __webpack_require__) {
            "use strict";
            (function(global) {
                exports.__esModule = !0;
                exports.getGlobal = function() {
                    var glob = void 0;
                    if ("undefined" != typeof window) glob = window; else {
                        if (void 0 === global) throw new TypeError("Can not find global");
                        glob = global;
                    }
                    var zalgoGlobal = glob.__zalgopromise__ = glob.__zalgopromise__ || {};
                    zalgoGlobal.flushPromises = zalgoGlobal.flushPromises || [];
                    zalgoGlobal.activeCount = zalgoGlobal.activeCount || 0;
                    zalgoGlobal.possiblyUnhandledPromiseHandlers = zalgoGlobal.possiblyUnhandledPromiseHandlers || [];
                    zalgoGlobal.dispatchedErrors = zalgoGlobal.dispatchedErrors || [];
                    return zalgoGlobal;
                };
            }).call(exports, __webpack_require__("./node_modules/webpack/buildin/global.js"));
        },
        "./node_modules/zalgo-promise/src/index.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            var _promise = __webpack_require__("./node_modules/zalgo-promise/src/promise.js");
            Object.defineProperty(exports, "ZalgoPromise", {
                enumerable: !0,
                get: function() {
                    return _promise.ZalgoPromise;
                }
            });
        },
        "./node_modules/zalgo-promise/src/promise.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.ZalgoPromise = void 0;
            var _utils = __webpack_require__("./node_modules/zalgo-promise/src/utils.js"), _exceptions = __webpack_require__("./node_modules/zalgo-promise/src/exceptions.js"), _global = __webpack_require__("./node_modules/zalgo-promise/src/global.js");
            var ZalgoPromise = function() {
                function ZalgoPromise(handler) {
                    var _this = this;
                    !function(instance, Constructor) {
                        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                    }(this, ZalgoPromise);
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
                    if ((0, _utils.isPromise)(result)) throw new Error("Can not resolve promise with another promise");
                    this.resolved = !0;
                    this.value = result;
                    this.dispatch();
                    return this;
                };
                ZalgoPromise.prototype.reject = function(error) {
                    var _this2 = this;
                    if (this.resolved || this.rejected) return this;
                    if ((0, _utils.isPromise)(error)) throw new Error("Can not reject promise with another promise");
                    if (!error) {
                        var _err = error && "function" == typeof error.toString ? error.toString() : Object.prototype.toString.call(error);
                        error = new Error("Expected reject to be called with Error, got " + _err);
                    }
                    this.rejected = !0;
                    this.error = error;
                    this.errorHandled || setTimeout(function() {
                        _this2.errorHandled || (0, _exceptions.dispatchPossiblyUnhandledError)(error);
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
                        (0, _global.getGlobal)().activeCount += 1;
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
                            } else (0, _utils.isPromise)(result) ? result instanceof ZalgoPromise && (result.resolved || result.rejected) ? result.resolved ? promise.resolve(result.value) : promise.reject(result.error) : result.then(function(res) {
                                promise.resolve(res);
                            }, function(err) {
                                promise.reject(err);
                            }) : promise.resolve(result);
                        }, i = 0; i < handlers.length; i++) _loop(i);
                        handlers.length = 0;
                        this.dispatching = !1;
                        (0, _global.getGlobal)().activeCount -= 1;
                        0 === (0, _global.getGlobal)().activeCount && ZalgoPromise.flushQueue();
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
                ZalgoPromise.prototype.finally = function(handler) {
                    return this.then(function(result) {
                        return ZalgoPromise.try(handler).then(function() {
                            return result;
                        });
                    }, function(err) {
                        return ZalgoPromise.try(handler).then(function() {
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
                    return value instanceof ZalgoPromise ? value : (0, _utils.isPromise)(value) ? new ZalgoPromise(function(resolve, reject) {
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
                        } else if (!(0, _utils.isPromise)(prom)) {
                            results[i] = prom;
                            count -= 1;
                            return "continue";
                        }
                        ZalgoPromise.resolve(prom).then(function(result) {
                            results[i] = result;
                            0 === (count -= 1) && promise.resolve(results);
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
                    return (0, _exceptions.onPossiblyUnhandledException)(handler);
                };
                ZalgoPromise.try = function(method, context, args) {
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
                    return !!(value && value instanceof ZalgoPromise) || (0, _utils.isPromise)(value);
                };
                ZalgoPromise.flush = function() {
                    var promise = new ZalgoPromise();
                    (0, _global.getGlobal)().flushPromises.push(promise);
                    0 === (0, _global.getGlobal)().activeCount && ZalgoPromise.flushQueue();
                    return promise;
                };
                ZalgoPromise.flushQueue = function() {
                    var promisesToFlush = (0, _global.getGlobal)().flushPromises;
                    (0, _global.getGlobal)().flushPromises = [];
                    var _iterator = promisesToFlush, _isArray = Array.isArray(_iterator), _i = 0;
                    for (_iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                        var _ref;
                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref = _iterator[_i++];
                        } else {
                            if ((_i = _iterator.next()).done) break;
                            _ref = _i.value;
                        }
                        _ref.resolve();
                    }
                };
                return ZalgoPromise;
            }();
            exports.ZalgoPromise = ZalgoPromise;
        },
        "./node_modules/zalgo-promise/src/utils.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.isPromise = function(item) {
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
            };
        },
        "./src/component/base.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.BaseComponent = void 0;
            var _src = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), _src2 = __webpack_require__("./node_modules/post-robot/src/index.js");
            __webpack_require__("./node_modules/cross-domain-utils/src/index.js");
            var _lib = __webpack_require__("./src/lib/index.js");
            exports.BaseComponent = function() {
                function BaseComponent() {
                    !function(instance, Constructor) {
                        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                    }(this, BaseComponent);
                    this.clean = (obj = this, tasks = [], cleaned = !1, {
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
                            return _src.ZalgoPromise.all(results).then(function() {});
                        },
                        run: function(name) {
                            var results = [], _iterator = tasks, _isArray = Array.isArray(_iterator), _i = 0;
                            for (_iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                                var _ref;
                                if (_isArray) {
                                    if (_i >= _iterator.length) break;
                                    _ref = _iterator[_i++];
                                } else {
                                    if ((_i = _iterator.next()).done) break;
                                    _ref = _i.value;
                                }
                                var item = _ref;
                                item.name === name && results.push(item.run());
                            }
                            return _src.ZalgoPromise.all(results).then(_lib.noop);
                        }
                    });
                    var obj, tasks, cleaned;
                    this.event = (0, _lib.eventEmitter)();
                }
                BaseComponent.prototype.addProp = function(options, name, def) {
                    (0, _lib.copyProp)(options, this, name, def);
                };
                BaseComponent.prototype.on = function(eventName, handler) {
                    return this.event.on(eventName, handler);
                };
                BaseComponent.prototype.listeners = function() {
                    throw new Error("Expected listeners to be implemented");
                };
                BaseComponent.prototype.error = function(err) {
                    throw new Error("Expected error to be implemented - got " + (0, _lib.stringifyError)(err));
                };
                BaseComponent.prototype.listen = function(win, domain) {
                    var _this = this;
                    if (!win) throw this.component.createError("window to listen to not set");
                    if (!domain) throw new Error("Must pass domain to listen to");
                    if (this.listeners) {
                        var listeners = this.listeners(), _loop = function() {
                            if (_isArray2) {
                                if (_i2 >= _iterator2.length) return "break";
                                _ref2 = _iterator2[_i2++];
                            } else {
                                if ((_i2 = _iterator2.next()).done) return "break";
                                _ref2 = _i2.value;
                            }
                            var listenerName = _ref2, name = listenerName.replace(/^zoid_/, ""), errorHandler = function(err) {
                                _this.error(err);
                            }, listener = (0, _src2.on)(listenerName, {
                                window: win,
                                domain: domain,
                                errorHandler: errorHandler
                            }, function(_ref3) {
                                var source = _ref3.source, data = _ref3.data;
                                _this.component.log("listener_" + name);
                                return listeners[listenerName].call(_this, source, data);
                            }), errorListener = (0, _src2.on)(listenerName, {
                                window: win,
                                errorHandler: errorHandler
                            }, function(_ref4) {
                                var origin = _ref4.origin;
                                _this.component.logError("unexpected_listener_" + name, {
                                    origin: origin,
                                    domain: domain.toString()
                                });
                                _this.error(new Error("Unexpected " + name + " message from domain " + origin + " -- expected message from " + domain.toString()));
                            });
                            _this.clean.register(function() {
                                listener.cancel();
                                errorListener.cancel();
                            });
                        }, _iterator2 = Object.keys(listeners), _isArray2 = Array.isArray(_iterator2), _i2 = 0;
                        for (_iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                            var _ref2;
                            if ("break" === _loop()) break;
                        }
                    }
                };
                return BaseComponent;
            }();
        },
        "./src/component/child/index.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.ChildComponent = void 0;
            var _extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            }, _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            }, _client = __webpack_require__("./node_modules/beaver-logger/client/index.js"), _src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), _src2 = __webpack_require__("./node_modules/post-robot/src/index.js"), _src3 = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), _base = __webpack_require__("./src/component/base.js"), _window = __webpack_require__("./src/component/window.js"), _lib = __webpack_require__("./src/lib/index.js"), _constants = __webpack_require__("./src/constants.js"), _error = __webpack_require__("./src/error.js"), _props = __webpack_require__("./src/component/child/props.js");
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            exports.ChildComponent = function(_BaseComponent) {
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
                }(ChildComponent, _BaseComponent);
                function ChildComponent(component) {
                    !function(instance, Constructor) {
                        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                    }(this, ChildComponent);
                    var _this = _possibleConstructorReturn(this, _BaseComponent.call(this));
                    _this.component = component;
                    if (!_this.hasValidParentDomain()) {
                        _this.error(new _error.RenderError("Can not be rendered by domain: " + _this.getParentDomain()));
                        return _possibleConstructorReturn(_this);
                    }
                    _this.component.log("construct_child");
                    _this.onPropHandlers = [];
                    for (var _arr = [ _this.component, window ], _loop = function() {
                        for (var item = _arr[_i], _arr2 = [ [ "xchild", function() {
                            return _this;
                        } ], [ "xprops", function() {
                            return _this.props;
                        } ] ], _loop2 = function() {
                            var _arr2$_i = _arr2[_i2], name = _arr2$_i[0], getter = _arr2$_i[1];
                            Object.defineProperty(item, name, {
                                configurable: !0,
                                get: function() {
                                    _this.props || _this.setProps(_this.getInitialProps(), (0, _window.getParentDomain)());
                                    delete item[name];
                                    item[name] = getter();
                                    return item[name];
                                }
                            });
                        }, _i2 = 0; _i2 < _arr2.length; _i2++) _loop2();
                    }, _i = 0; _i < _arr.length; _i++) _loop();
                    _this.component.log("init_child");
                    _this.setWindows();
                    _this.listenForResize();
                    _this.onInit = _this.sendToParent(_constants.POST_MESSAGE.INIT, {
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
                ChildComponent.prototype.listenForResize = function() {
                    var _this2 = this;
                    if (this.component.listenForResize) {
                        this.sendToParent(_constants.POST_MESSAGE.ONRESIZE, {}, {
                            fireAndForget: !0
                        });
                        window.addEventListener("resize", function() {
                            _this2.sendToParent(_constants.POST_MESSAGE.ONRESIZE, {}, {
                                fireAndForget: !0
                            });
                        });
                    }
                };
                ChildComponent.prototype.hasValidParentDomain = function() {
                    return (0, _src.matchDomain)(this.component.allowedParentDomains, this.getParentDomain());
                };
                ChildComponent.prototype.init = function() {
                    return this.onInit;
                };
                ChildComponent.prototype.getParentDomain = function() {
                    return (0, _window.getParentDomain)();
                };
                ChildComponent.prototype.onProps = function(handler) {
                    this.onPropHandlers.push(handler);
                };
                ChildComponent.prototype.getParentComponentWindow = function() {
                    return (0, _window.getParentComponentWindow)();
                };
                ChildComponent.prototype.getParentRenderWindow = function() {
                    return (0, _window.getParentRenderWindow)();
                };
                ChildComponent.prototype.getInitialProps = function() {
                    var _this3 = this, componentMeta = (0, _window.getComponentMeta)(), props = componentMeta.props;
                    if (props.type === _constants.INITIAL_PROPS.RAW) props = props.value; else {
                        if (props.type !== _constants.INITIAL_PROPS.UID) throw new Error("Unrecognized props type: " + props.type);
                        var parentComponentWindow = (0, _window.getParentComponentWindow)();
                        if (!(0, _src.isSameDomain)(parentComponentWindow)) {
                            if ("file:" === window.location.protocol) throw new Error("Can not get props from file:// domain");
                            throw new Error("Parent component window is on a different domain - expected " + (0, 
                            _src.getDomain)() + " - can not retrieve props");
                        }
                        var global = (0, _lib.globalFor)(parentComponentWindow);
                        if (!global) throw new Error("Can not find global for parent component - can not retrieve props");
                        props = JSON.parse(global.props[componentMeta.uid]);
                    }
                    if (!props) throw new Error("Initial props not found");
                    return (0, _lib.deserializeFunctions)(props, function(_ref2) {
                        var fullKey = _ref2.fullKey, self = _ref2.self, args = _ref2.args;
                        return _this3.onInit.then(function() {
                            var func = (0, _lib.get)(_this3.props, fullKey);
                            if ("function" != typeof func) throw new TypeError("Expected " + fullKey + " to be function, got " + (void 0 === func ? "undefined" : _typeof(func)));
                            return func.apply(self, args);
                        });
                    });
                };
                ChildComponent.prototype.setProps = function(props, origin) {
                    var required = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                    this.props = this.props || {};
                    var normalizedProps = (0, _props.normalizeChildProps)(this.component, props, origin, required);
                    (0, _lib.extend)(this.props, normalizedProps);
                    this.props.logLevel && (0, _lib.setLogLevel)(this.props.logLevel);
                    var _iterator = this.onPropHandlers, _isArray = Array.isArray(_iterator), _i3 = 0;
                    for (_iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                        var _ref3;
                        if (_isArray) {
                            if (_i3 >= _iterator.length) break;
                            _ref3 = _iterator[_i3++];
                        } else {
                            if ((_i3 = _iterator.next()).done) break;
                            _ref3 = _i3.value;
                        }
                        _ref3.call(this, this.props);
                    }
                };
                ChildComponent.prototype.sendToParent = function(name) {
                    var data = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, parentWindow = (0, 
                    _window.getParentComponentWindow)();
                    if (!parentWindow) throw new Error("Can not find parent component window to message");
                    this.component.log("send_to_parent_" + name);
                    return (0, _src2.send)(parentWindow, name, data, _extends({
                        domain: (0, _window.getParentDomain)()
                    }, options));
                };
                ChildComponent.prototype.setWindows = function() {
                    if (window.__activeZoidComponent__) throw this.component.createError("Can not attach multiple components to the same window");
                    window.__activeZoidComponent__ = this;
                    if (!(0, _window.getParentComponentWindow)()) throw this.component.createError("Can not find parent window");
                    var componentMeta = (0, _window.getComponentMeta)();
                    if (componentMeta.tag !== this.component.tag) throw this.component.createError("Parent is " + componentMeta.tag + " - can not attach " + this.component.tag);
                    this.watchForClose();
                };
                ChildComponent.prototype.watchForClose = function() {
                    var _this4 = this;
                    window.addEventListener("unload", function() {
                        return _this4.checkClose();
                    });
                };
                ChildComponent.prototype.enableAutoResize = function() {
                    var _ref4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, _ref4$width = _ref4.width, width = void 0 === _ref4$width || _ref4$width, _ref4$height = _ref4.height, height = void 0 === _ref4$height || _ref4$height;
                    this.autoResize = {
                        width: width,
                        height: height
                    };
                    this.watchForResize();
                };
                ChildComponent.prototype.getAutoResize = function() {
                    var width = !1, height = !1, autoResize = this.autoResize || this.component.autoResize;
                    if ("object" === (void 0 === autoResize ? "undefined" : _typeof(autoResize))) {
                        width = Boolean(autoResize.width);
                        height = Boolean(autoResize.height);
                    } else if (autoResize) {
                        width = !0;
                        height = !0;
                    }
                    return {
                        width: width,
                        height: height,
                        element: autoResize.element ? (0, _lib.getElement)(autoResize.element) : window.navigator.userAgent.match(/MSIE (9|10)\./) ? document.body : document.documentElement
                    };
                };
                ChildComponent.prototype.watchForResize = function() {
                    var _this5 = this, _getAutoResize = this.getAutoResize(), width = _getAutoResize.width, height = _getAutoResize.height, element = _getAutoResize.element;
                    if ((width || height) && this.context !== _constants.CONTEXT_TYPES.POPUP && !this.watchingForResize) {
                        this.watchingForResize = !0;
                        return _src3.ZalgoPromise.try(function() {
                            return _lib.documentReady;
                        }).then(function() {
                            if (!(0, _lib.dimensionsMatchViewport)(element, {
                                width: width,
                                height: height
                            })) return _this5.resizeToElement(element, {
                                width: width,
                                height: height
                            });
                        }).then(function() {
                            return (0, _lib.cycle)(function() {
                                return (0, _lib.onDimensionsChange)(element, {
                                    width: width,
                                    height: height
                                }).then(function() {
                                    return _this5.resizeToElement(element, {
                                        width: width,
                                        height: height
                                    });
                                });
                            });
                        });
                    }
                };
                ChildComponent.prototype.exports = function() {
                    var self = this;
                    return {
                        updateProps: function(props) {
                            var _this6 = this;
                            return _src3.ZalgoPromise.try(function() {
                                return self.setProps(props, _this6.origin, !1);
                            });
                        },
                        close: function() {
                            return _src3.ZalgoPromise.try(function() {
                                return self.destroy();
                            });
                        }
                    };
                };
                ChildComponent.prototype.resize = function(width, height) {
                    var _this7 = this;
                    return _src3.ZalgoPromise.resolve().then(function() {
                        _this7.component.log("resize", {
                            width: (0, _lib.stringify)(width),
                            height: (0, _lib.stringify)(height)
                        });
                        if (_this7.context !== _constants.CONTEXT_TYPES.POPUP) return _this7.sendToParent(_constants.POST_MESSAGE.RESIZE, {
                            width: width,
                            height: height
                        }).then(_lib.noop);
                    });
                };
                ChildComponent.prototype.resizeToElement = function(el, _ref5) {
                    var _this8 = this, width = _ref5.width, height = _ref5.height, history = [];
                    return function resize() {
                        return _src3.ZalgoPromise.try(function() {
                            var tracker = (0, _lib.trackDimensions)(el, {
                                width: width,
                                height: height
                            }), dimensions = tracker.check().dimensions, _iterator2 = history, _isArray2 = Array.isArray(_iterator2), _i4 = 0;
                            for (_iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                                var _ref6;
                                if (_isArray2) {
                                    if (_i4 >= _iterator2.length) break;
                                    _ref6 = _iterator2[_i4++];
                                } else {
                                    if ((_i4 = _iterator2.next()).done) break;
                                    _ref6 = _i4.value;
                                }
                                var size = _ref6, widthMatch = !width || size.width === dimensions.width, heightMatch = !height || size.height === dimensions.height;
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
                };
                ChildComponent.prototype.hide = function() {
                    return this.sendToParent(_constants.POST_MESSAGE.HIDE).then(_lib.noop);
                };
                ChildComponent.prototype.show = function() {
                    return this.sendToParent(_constants.POST_MESSAGE.SHOW).then(_lib.noop);
                };
                ChildComponent.prototype.userClose = function() {
                    return this.close(_constants.CLOSE_REASONS.USER_CLOSED);
                };
                ChildComponent.prototype.close = function() {
                    var reason = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _constants.CLOSE_REASONS.CHILD_CALL;
                    this.component.log("close_child");
                    this.sendToParent(_constants.POST_MESSAGE.CLOSE, {
                        reason: reason
                    });
                };
                ChildComponent.prototype.checkClose = function() {
                    this.sendToParent(_constants.POST_MESSAGE.CHECK_CLOSE, {}, {
                        fireAndForget: !0
                    });
                };
                ChildComponent.prototype.destroy = function() {
                    return (0, _client.flush)().then(function() {
                        window.close();
                    });
                };
                ChildComponent.prototype.focus = function() {
                    this.component.log("focus");
                    window.focus();
                };
                ChildComponent.prototype.error = function(err) {
                    var stringifiedError = (0, _lib.stringifyError)(err);
                    this.component.logError("error", {
                        error: stringifiedError
                    });
                    return this.sendToParent(_constants.POST_MESSAGE.ERROR, {
                        error: stringifiedError
                    }).then(_lib.noop);
                };
                return ChildComponent;
            }(_base.BaseComponent);
        },
        "./src/component/child/props.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.normalizeChildProp = normalizeChildProp;
            exports.normalizeChildProps = function(component, props, origin) {
                for (var required = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3], result = {}, _iterator = Object.keys(props), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                    var _ref;
                    if (_isArray) {
                        if (_i >= _iterator.length) break;
                        _ref = _iterator[_i++];
                    } else {
                        if ((_i = _iterator.next()).done) break;
                        _ref = _i.value;
                    }
                    var _key = _ref, prop = component.getProp(_key), value = props[_key];
                    if (!prop || !prop.sameDomain || origin === (0, _src.getDomain)(window)) {
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
                        if ((_i2 = _iterator2.next()).done) break;
                        _ref2 = _i2.value;
                    }
                    var key = _ref2;
                    props.hasOwnProperty(key) || (result[key] = normalizeChildProp(component, props, key, props[key]));
                }
                return result;
            };
            var _src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js");
            function normalizeChildProp(component, props, key, value) {
                var prop = component.getProp(key);
                return prop ? "function" == typeof prop.childDecorate ? prop.childDecorate(value) : value : component.looseProps ? value : void 0;
            }
        },
        "./src/component/component/index.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.Component = void 0;
            var _class, _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            }, _src = __webpack_require__("./node_modules/post-robot/src/index.js"), _src2 = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), _src3 = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), _base = __webpack_require__("./src/component/base.js"), _child = __webpack_require__("./src/component/child/index.js"), _parent = __webpack_require__("./src/component/parent/index.js"), _delegate = __webpack_require__("./src/component/delegate/index.js"), _window = __webpack_require__("./src/component/window.js"), _constants = __webpack_require__("./src/constants.js"), _index = __webpack_require__("./src/drivers/index.js"), _lib = __webpack_require__("./src/lib/index.js"), _validate = __webpack_require__("./src/component/component/validate.js"), _templates = __webpack_require__("./src/component/component/templates/index.js"), _props = __webpack_require__("./src/component/component/props.js");
            var drivers = {
                angular: _index.angular,
                angular2: _index.angular2,
                glimmer: _index.glimmer,
                react: _index.react,
                vue: _index.vue,
                script: _index.script
            };
            (exports.Component = (function(target, property, decorators, descriptor, context) {
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
            }((_class = function(_BaseComponent) {
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
                }(Component, _BaseComponent);
                function Component(options) {
                    !function(instance, Constructor) {
                        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                    }(this, Component);
                    var _this = function(self, call) {
                        if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !call || "object" != typeof call && "function" != typeof call ? self : call;
                    }(this, _BaseComponent.call(this));
                    (0, _validate.validate)(options);
                    _this.addProp(options, "tag");
                    _this.addProp(options, "defaultLogLevel", "info");
                    _this.addProp(options, "allowedParentDomains", _constants.WILDCARD);
                    (0, _lib.setLogLevel)(_this.defaultLogLevel);
                    if (Component.components[_this.tag]) throw new Error("Can not register multiple components with the same tag");
                    _this.addProp(options, "name", _this.tag.replace(/-/g, "_"));
                    _this.builtinProps = (0, _props.getInternalProps)();
                    _this.props = options.props || {};
                    options.props || (_this.looseProps = !0);
                    _this.addProp(options, "dimensions");
                    _this.addProp(options, "scrolling");
                    _this.addProp(options, "listenForResize");
                    _this.addProp(options, "version", "latest");
                    _this.addProp(options, "defaultEnv");
                    _this.addProp(options, "buildUrl");
                    _this.addProp(options, "url");
                    _this.addProp(options, "domain");
                    _this.addProp(options, "bridgeUrl");
                    _this.addProp(options, "bridgeDomain");
                    _this.addProp(options, "attributes", {});
                    _this.addProp(options, "contexts", {
                        iframe: !0,
                        popup: !1
                    });
                    _this.addProp(options, "defaultContext");
                    _this.addProp(options, "autoResize", !1);
                    _this.addProp(options, "containerTemplate", _templates.defaultContainerTemplate);
                    _this.addProp(options, "prerenderTemplate", _templates.defaultPrerenderTemplate);
                    _this.addProp(options, "validate");
                    _this.addProp(options, "unsafeRenderTo", !1);
                    Component.components[_this.tag] = _this;
                    _this.registerDrivers();
                    _this.registerChild();
                    _this.listenDelegate();
                    return _this;
                }
                Component.prototype.getPropNames = function() {
                    var props = Object.keys(this.props), _iterator = Object.keys(this.builtinProps), _isArray = Array.isArray(_iterator), _i = 0;
                    for (_iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                        var _ref;
                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref = _iterator[_i++];
                        } else {
                            if ((_i = _iterator.next()).done) break;
                            _ref = _i.value;
                        }
                        var key = _ref;
                        -1 === props.indexOf(key) && props.push(key);
                    }
                    return props;
                };
                Component.prototype.getProp = function(name) {
                    return this.props[name] || this.builtinProps[name];
                };
                Component.prototype.registerDrivers = function() {
                    this.driverCache = {};
                    var _iterator2 = Object.keys(drivers), _isArray2 = Array.isArray(_iterator2), _i2 = 0;
                    for (_iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                        var _ref2;
                        if (_isArray2) {
                            if (_i2 >= _iterator2.length) break;
                            _ref2 = _iterator2[_i2++];
                        } else {
                            if ((_i2 = _iterator2.next()).done) break;
                            _ref2 = _i2.value;
                        }
                        var driverName = _ref2;
                        if (0 !== driverName.indexOf("_")) {
                            var glob = drivers[driverName].global();
                            glob && this.driver(driverName, glob);
                        }
                    }
                };
                Component.prototype.driver = function(name, dep) {
                    if (!drivers[name]) throw new Error("Could not find driver for framework: " + name);
                    this.driverCache[name] || (this.driverCache[name] = drivers[name].register(this, dep));
                    return this.driverCache[name];
                };
                Component.prototype.registerChild = function() {
                    var _this2 = this;
                    return _src2.ZalgoPromise.try(function() {
                        if (_this2.isChild()) return new _child.ChildComponent(_this2);
                    });
                };
                Component.prototype.listenDelegate = function() {
                    var _this3 = this;
                    (0, _src.on)(_constants.POST_MESSAGE.ALLOW_DELEGATE + "_" + this.name, function() {
                        return !0;
                    });
                    (0, _src.on)(_constants.POST_MESSAGE.DELEGATE + "_" + this.name, function(_ref3) {
                        var source = _ref3.source, origin = _ref3.origin, data = _ref3.data, domain = _this3.getDomain(null, data.env || _this3.defaultEnv);
                        if (!domain) throw new Error("Could not determine domain to allow remote render");
                        if (!(0, _src3.matchDomain)(domain, origin)) throw new Error("Can not render from " + origin + " - expected " + domain.toString());
                        var delegate = _this3.delegate(source, data.options);
                        return {
                            overrides: delegate.getOverrides(data.context),
                            destroy: function() {
                                return delegate.destroy();
                            }
                        };
                    });
                };
                Component.prototype.canRenderTo = function(win) {
                    return (0, _src.send)(win, _constants.POST_MESSAGE.ALLOW_DELEGATE + "_" + this.name).then(function(_ref4) {
                        return _ref4.data;
                    }).catch(function() {
                        return !1;
                    });
                };
                Component.prototype.getValidDomain = function(url) {
                    if (url) {
                        var domain = (0, _src3.getDomainFromUrl)(url);
                        if ("string" == typeof this.domain && domain === this.domain) return domain;
                        var domains = this.domain;
                        if (domains && "object" === (void 0 === domains ? "undefined" : _typeof(domains)) && !(domains instanceof RegExp)) {
                            var _iterator3 = Object.keys(domains), _isArray3 = Array.isArray(_iterator3), _i3 = 0;
                            for (_iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                                var _ref5;
                                if (_isArray3) {
                                    if (_i3 >= _iterator3.length) break;
                                    _ref5 = _iterator3[_i3++];
                                } else {
                                    if ((_i3 = _iterator3.next()).done) break;
                                    _ref5 = _i3.value;
                                }
                                if ("test" !== _ref5 && domain === domains[_ref5]) return domain;
                            }
                        }
                    }
                };
                Component.prototype.getDomain = function(url, env) {
                    var domain = this.getForEnv(this.domain, env);
                    if (domain) return domain;
                    if (domain = this.getValidDomain(url)) return domain;
                    var envUrl = this.getForEnv(this.url, env);
                    return envUrl ? (0, _src3.getDomainFromUrl)(envUrl) : url ? (0, _src3.getDomainFromUrl)(url) : void 0;
                };
                Component.prototype.getBridgeUrl = function(env) {
                    return this.getForEnv(this.bridgeUrl, env);
                };
                Component.prototype.getForEnv = function(item, env) {
                    if (item) {
                        if ("string" == typeof item || item instanceof RegExp) return item;
                        env || (env = this.defaultEnv);
                        if (env) return env && "object" === (void 0 === item ? "undefined" : _typeof(item)) && item[env] ? item[env] : void 0;
                    }
                };
                Component.prototype.getBridgeDomain = function(env) {
                    var bridgeDomain = this.getForEnv(this.bridgeDomain, env);
                    if (bridgeDomain) return bridgeDomain;
                    var bridgeUrl = this.getBridgeUrl(env);
                    return bridgeUrl ? (0, _src3.getDomainFromUrl)(bridgeUrl) : void 0;
                };
                Component.prototype.getUrl = function(env, props) {
                    var url = this.getForEnv(this.url, env);
                    if (url) return url;
                    if (this.buildUrl) return this.buildUrl(props);
                    throw new Error("Unable to get url");
                };
                Component.prototype.isZoidComponent = function() {
                    return (0, _window.isZoidComponentWindow)();
                };
                Component.prototype.isChild = function() {
                    return (0, _window.isZoidComponentWindow)() && (0, _window.getComponentMeta)().tag === this.tag;
                };
                Component.prototype.createError = function(message, tag) {
                    return new Error("[" + (tag || this.tag) + "] " + message);
                };
                Component.prototype.init = function(props, context, element) {
                    return new _parent.ParentComponent(this, this.getRenderContext(context, element), {
                        props: props
                    });
                };
                Component.prototype.delegate = function(source, options) {
                    return new _delegate.DelegateComponent(this, source, options);
                };
                Component.prototype.validateRenderContext = function(context, element) {
                    if (context && !this.contexts[context]) throw new Error("[" + this.tag + "] Can not render to " + context);
                    if (!element && context === _constants.CONTEXT_TYPES.IFRAME) throw new Error("[" + this.tag + "] Context type " + _constants.CONTEXT_TYPES.IFRAME + " requires an element selector");
                };
                Component.prototype.getDefaultContext = function() {
                    if (this.defaultContext) return this.defaultContext;
                    if (this.contexts[_constants.CONTEXT_TYPES.IFRAME]) return _constants.CONTEXT_TYPES.IFRAME;
                    if (this.contexts[_constants.CONTEXT_TYPES.POPUP]) return _constants.CONTEXT_TYPES.POPUP;
                    throw new Error("Can not determine default context");
                };
                Component.prototype.getRenderContext = function(context, element) {
                    context = context || this.getDefaultContext();
                    this.validateRenderContext(context, element);
                    return context;
                };
                Component.prototype.render = function(props, element) {
                    var _this4 = this;
                    return _src2.ZalgoPromise.try(function() {
                        return new _parent.ParentComponent(_this4, _this4.getRenderContext(null, element), {
                            props: props
                        }).render(element);
                    });
                };
                Component.prototype.renderIframe = function(props, element) {
                    var _this5 = this;
                    return _src2.ZalgoPromise.try(function() {
                        return new _parent.ParentComponent(_this5, _this5.getRenderContext(_constants.CONTEXT_TYPES.IFRAME, element), {
                            props: props
                        }).render(element);
                    });
                };
                Component.prototype.renderPopup = function(props) {
                    var _this6 = this;
                    return _src2.ZalgoPromise.try(function() {
                        return new _parent.ParentComponent(_this6, _this6.getRenderContext(_constants.CONTEXT_TYPES.POPUP), {
                            props: props
                        }).render();
                    });
                };
                Component.prototype.renderTo = function(win, props, element) {
                    var _this7 = this;
                    return _src2.ZalgoPromise.try(function() {
                        return new _parent.ParentComponent(_this7, _this7.getRenderContext(null, element), {
                            props: props
                        }).renderTo(win, element);
                    });
                };
                Component.prototype.renderIframeTo = function(win, props, element) {
                    var _this8 = this;
                    return _src2.ZalgoPromise.try(function() {
                        return new _parent.ParentComponent(_this8, _this8.getRenderContext(_constants.CONTEXT_TYPES.IFRAME, element), {
                            props: props
                        }).renderTo(win, element);
                    });
                };
                Component.prototype.renderPopupTo = function(win, props) {
                    var _this9 = this;
                    return _src2.ZalgoPromise.try(function() {
                        return new _parent.ParentComponent(_this9, _this9.getRenderContext(_constants.CONTEXT_TYPES.POPUP), {
                            props: props
                        }).renderTo(win);
                    });
                };
                Component.prototype.prerender = function(props, element) {
                    var instance = new _parent.ParentComponent(this, this.getRenderContext(null, element), {
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
                };
                Component.prototype.log = function(event) {
                    var payload = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    (0, _lib.info)(this.name, event, payload);
                };
                Component.prototype.logWarning = function(event, payload) {
                    (0, _lib.warn)(this.name, event, payload);
                };
                Component.prototype.logError = function(event, payload) {
                    (0, _lib.error)(this.name, event, payload);
                };
                Component.getByTag = function(tag) {
                    return Component.components[tag];
                };
                return Component;
            }(_base.BaseComponent)).prototype, "getPropNames", [ _lib.memoize ], Object.getOwnPropertyDescriptor(_class.prototype, "getPropNames"), _class.prototype), 
            _class)).components = {};
        },
        "./src/component/component/props.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.getInternalProps = function() {
                return {
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
                            return (0, _lib.uniqueID)();
                        },
                        queryParam: !0
                    },
                    logLevel: {
                        type: "string",
                        queryParam: !0,
                        def: function(props, component) {
                            return component.defaultLogLevel;
                        }
                    },
                    dimensions: {
                        type: "object",
                        required: !1
                    },
                    version: {
                        type: "string",
                        required: !1,
                        queryParam: !0,
                        def: function(props, component) {
                            return component.version;
                        }
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
                            return _lib.noop;
                        },
                        decorate: function(onDisplay) {
                            return (0, _lib.memoize)((0, _lib.promisify)(onDisplay));
                        }
                    },
                    onEnter: {
                        type: "function",
                        required: !1,
                        sendToChild: !1,
                        def: function() {
                            return _lib.noop;
                        },
                        decorate: function(onEnter) {
                            return (0, _lib.promisify)(onEnter);
                        }
                    },
                    onRender: {
                        type: "function",
                        required: !1,
                        sendToChild: !1,
                        def: function() {
                            return _lib.noop;
                        },
                        decorate: function(onRender) {
                            return (0, _lib.promisify)(onRender);
                        }
                    },
                    onClose: {
                        type: "function",
                        required: !1,
                        sendToChild: !1,
                        def: function() {
                            return _lib.noop;
                        },
                        decorate: function(onClose) {
                            return (0, _lib.once)((0, _lib.promisify)(onClose));
                        }
                    },
                    onTimeout: {
                        type: "function",
                        required: !1,
                        sendToChild: !1,
                        def: function() {
                            return function(err) {
                                return this.props.onError(err);
                            };
                        },
                        decorate: function(onTimeout) {
                            return (0, _lib.memoize)((0, _lib.promisify)(onTimeout));
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
                            return (0, _lib.once)((0, _lib.promisify)(onError));
                        }
                    }
                };
            };
            __webpack_require__("./node_modules/zalgo-promise/src/index.js");
            var _lib = __webpack_require__("./src/lib/index.js");
            __webpack_require__("./src/types.js");
        },
        "./src/component/component/templates/component.jsx": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.defaultPrerenderTemplate = function(_ref) {
                var jsxDom = _ref.jsxDom;
                return jsxDom("html", null, jsxDom("head", null, jsxDom("style", null, "\n                        html, body {\n                            width: 100%;\n                            height: 100%;\n                            overflow: hidden;\n                            top: 0;\n                            left: 0;\n                            margin: 0;\n                            text-align: center;\n                        }\n\n                        .spinner {\n                            position: absolute;\n                            max-height: 60vmin;\n                            max-width: 60vmin;\n                            height: 40px;\n                            width: 40px;\n                            top: 50%;\n                            left: 50%;\n                            transform: translateX(-50%) translateY(-50%);\n                            z-index: 10;\n                        }\n\n                        .spinner .loader {\n                            height: 100%;\n                            width: 100%;\n                            box-sizing: border-box;\n                            border: 3px solid rgba(0, 0, 0, .2);\n                            border-top-color: rgba(33, 128, 192, 0.8);\n                            border-radius: 100%;\n                            animation: rotation .7s infinite linear;\n\n                        }\n\n                        @keyframes rotation {\n                            from {\n                                transform: rotate(0deg)\n                            }\n                            to {\n                                transform: rotate(359deg)\n                            }\n                        }\n                    ")), jsxDom("body", null, jsxDom("div", {
                    class: "spinner"
                }, jsxDom("div", {
                    id: "loader",
                    class: "loader"
                }))));
            };
            __webpack_require__("./src/component/parent/index.js");
        },
        "./src/component/component/templates/container.jsx": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.defaultContainerTemplate = function(_ref) {
                var id = _ref.id, tag = _ref.tag, context = _ref.context, CLASS = _ref.CLASS, outlet = _ref.outlet, jsxDom = _ref.jsxDom, _ref$dimensions = _ref.dimensions, width = _ref$dimensions.width, height = _ref$dimensions.height;
                return jsxDom("div", {
                    id: id,
                    class: CLASS.ZOID + " " + CLASS.ZOID + "-tag-" + tag + " " + CLASS.ZOID + "-context-" + context
                }, jsxDom("style", null, "\n                    #" + id + ", #" + id + " > ." + CLASS.OUTLET + " {\n                        width: " + width + ";\n                        height: " + height + ";\n                    }\n\n                    #" + id + " > ." + CLASS.OUTLET + " {\n                        display: inline-block;\n                        position: relative;\n                    }\n\n                    #" + id + " > ." + CLASS.OUTLET + " > iframe {\n                        height: 100%;\n                        width: 100%;\n                        position: absolute;\n                        top: 0;\n                        left: 0;\n                        transition: opacity .2s ease-in-out;\n                    }\n\n                    #" + id + " > ." + CLASS.OUTLET + " > iframe." + CLASS.VISIBLE + " {\n                        opacity: 1;\n                    }\n\n                    #" + id + " > ." + CLASS.OUTLET + " > iframe." + CLASS.INVISIBLE + " {\n                        opacity: 0;\n                    }\n                "), outlet);
            };
            __webpack_require__("./src/component/parent/index.js");
        },
        "./src/component/component/templates/index.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            var _container = __webpack_require__("./src/component/component/templates/container.jsx");
            Object.keys(_container).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _container[key];
                    }
                });
            });
            var _component = __webpack_require__("./src/component/component/templates/component.jsx");
            Object.keys(_component).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _component[key];
                    }
                });
            });
        },
        "./src/component/component/validate.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            exports.validate = function(options) {
                if (!options) throw new Error("Expecred options to be passed");
                if (!options.tag || !options.tag.match(/^[a-z0-9-]+$/)) throw new Error("Invalid options.tag: " + options.tag);
                !function(options) {
                    if (options.props && "object" !== _typeof(options.props)) throw new Error("Expected options.props to be an object");
                    if (options.props) for (var _iterator = Object.keys(options.props), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                        var _ref;
                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref = _iterator[_i++];
                        } else {
                            if ((_i = _iterator.next()).done) break;
                            _ref = _i.value;
                        }
                        var key = _ref, prop = options.props[key];
                        if (!prop || "object" !== (void 0 === prop ? "undefined" : _typeof(prop))) throw new Error("Expected options.props." + key + " to be an object");
                        if (!prop.type) throw new Error("Expected prop.type");
                        if (-1 === _constants.PROP_TYPES_LIST.indexOf(prop.type)) throw new Error("Expected prop.type to be one of " + _constants.PROP_TYPES_LIST.join(", "));
                        if (prop.required && prop.def) throw new Error("Required prop can not have a default value");
                    }
                }(options);
                if (options.dimensions) {
                    if (options.dimensions && !(0, _lib.isPx)(options.dimensions.width) && !(0, _lib.isPerc)(options.dimensions.width)) throw new Error("Expected options.dimensions.width to be a px or % string value");
                    if (options.dimensions && !(0, _lib.isPx)(options.dimensions.height) && !(0, _lib.isPerc)(options.dimensions.height)) throw new Error("Expected options.dimensions.height to be a px or % string value");
                }
                if (options.contexts) {
                    options.contexts.popup, 0;
                    for (var anyEnabled = !1, _iterator2 = Object.keys(options.contexts), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                        var _ref2;
                        if (_isArray2) {
                            if (_i2 >= _iterator2.length) break;
                            _ref2 = _iterator2[_i2++];
                        } else {
                            if ((_i2 = _iterator2.next()).done) break;
                            _ref2 = _i2.value;
                        }
                        var context = _ref2;
                        if (-1 === _constants.CONTEXT_TYPES_LIST.indexOf(context)) throw new Error("Unsupported context type: " + context);
                        (options.contexts && options.contexts[context] || options.contexts && void 0 === options.contexts[context]) && (anyEnabled = !0);
                    }
                    if (!anyEnabled) throw new Error("No context type is enabled");
                }
                if (options.defaultContext) {
                    if (-1 === _constants.CONTEXT_TYPES_LIST.indexOf(options.defaultContext)) throw new Error("Unsupported context type: " + (options.defaultContext || "unknown"));
                    if (options.contexts && options.defaultContext && !options.contexts[options.defaultContext]) throw new Error("Disallowed default context type: " + (options.defaultContext || "unknown"));
                }
                if (options.url && options.buildUrl) throw new Error("Can not pass both options.url and options.buildUrl");
                if (options.defaultEnv) {
                    if ("string" != typeof options.defaultEnv) throw new TypeError("Expected options.defaultEnv to be a string");
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
                            if ((_i3 = _iterator3.next()).done) break;
                            _ref3 = _i3.value;
                        }
                        var env = _ref3;
                        if (!options.url[env]) throw new Error("No url specified for env: " + env);
                    }
                }
                if (options.prerenderTemplate && "function" != typeof options.prerenderTemplate) throw new Error("Expected options.prerenderTemplate to be a function");
                if (options.containerTemplate && "function" != typeof options.containerTemplate) throw new Error("Expected options.containerTemplate to be a function");
            };
            var _constants = __webpack_require__("./src/constants.js"), _lib = __webpack_require__("./src/lib/index.js");
        },
        "./src/component/delegate/index.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.DelegateComponent = void 0;
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
            }(), _src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), _base = (__webpack_require__("./node_modules/zalgo-promise/src/index.js"), 
            __webpack_require__("./src/component/base.js")), _parent = __webpack_require__("./src/component/parent/index.js"), _drivers = __webpack_require__("./src/component/parent/drivers.js"), _lib = __webpack_require__("./src/lib/index.js");
            exports.DelegateComponent = function(_BaseComponent) {
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
                }(DelegateComponent, _BaseComponent);
                function DelegateComponent(component, source, options) {
                    !function(instance, Constructor) {
                        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                    }(this, DelegateComponent);
                    var _this = function(self, call) {
                        if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !call || "object" != typeof call && "function" != typeof call ? self : call;
                    }(this, _BaseComponent.call(this));
                    _this.component = component;
                    _this.clean.set("source", source);
                    _this.context = options.context;
                    _this.props = {
                        uid: options.props.uid,
                        dimensions: options.props.dimensions,
                        onClose: options.props.onClose,
                        onDisplay: options.props.onDisplay
                    };
                    var _iterator = component.getPropNames(), _isArray = Array.isArray(_iterator), _i = 0;
                    for (_iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                        var _ref;
                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref = _iterator[_i++];
                        } else {
                            if ((_i = _iterator.next()).done) break;
                            _ref = _i.value;
                        }
                        var propName = _ref;
                        _this.component.getProp(propName).allowDelegate && (_this.props[propName] = options.props[propName]);
                    }
                    _this.focus = function() {
                        return options.overrides.focus.call(_this);
                    };
                    _this.clean.register("destroyFocusOverride", function() {
                        _this.focus = _lib.noop;
                    });
                    _this.userClose = options.overrides.userClose;
                    _this.getDomain = options.overrides.getDomain;
                    _this.error = options.overrides.error;
                    _this.on = options.overrides.on;
                    var delegateOverrides = _drivers.RENDER_DRIVERS[options.context].delegateOverrides, _iterator2 = Object.keys(delegateOverrides), _isArray2 = Array.isArray(_iterator2), _i2 = 0;
                    for (_iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                        var _ref2;
                        if (_isArray2) {
                            if (_i2 >= _iterator2.length) break;
                            _ref2 = _iterator2[_i2++];
                        } else {
                            if ((_i2 = _iterator2.next()).done) break;
                            _ref2 = _i2.value;
                        }
                        var key = _ref2;
                        _this[key] = _parent.ParentComponent.prototype[key];
                    }
                    _this.childWindowName = options.childWindowName;
                    _parent.ParentComponent.prototype.registerActiveComponent.call(_this);
                    _this.watchForClose();
                    return _this;
                }
                DelegateComponent.prototype.watchForClose = function() {
                    var _this2 = this, closeWindowListener = (0, _src.onCloseWindow)(this.source, function() {
                        return _this2.destroy();
                    }, 3e3);
                    this.clean.register("destroyCloseWindowListener", closeWindowListener.cancel);
                };
                DelegateComponent.prototype.getOverrides = function(context) {
                    var delegateOverrides = _drivers.RENDER_DRIVERS[context].delegateOverrides, overrides = {}, self = this, _loop = function() {
                        if (_isArray3) {
                            if (_i3 >= _iterator3.length) return "break";
                            _ref3 = _iterator3[_i3++];
                        } else {
                            if ((_i3 = _iterator3.next()).done) return "break";
                            _ref3 = _i3.value;
                        }
                        var key = _ref3;
                        overrides[key] = function() {
                            return _parent.ParentComponent.prototype[key].apply(self, arguments);
                        };
                    }, _iterator3 = Object.keys(delegateOverrides), _isArray3 = Array.isArray(_iterator3), _i3 = 0;
                    for (_iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                        var _ref3;
                        if ("break" === _loop()) break;
                    }
                    return overrides;
                };
                DelegateComponent.prototype.destroy = function() {
                    return this.clean.all();
                };
                _createClass(DelegateComponent, [ {
                    key: "driver",
                    get: function() {
                        if (!this.context) throw new Error("Context not set");
                        return _drivers.RENDER_DRIVERS[this.context];
                    }
                } ]);
                return DelegateComponent;
            }(_base.BaseComponent);
        },
        "./src/component/index.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            var _component = __webpack_require__("./src/component/component/index.js");
            Object.keys(_component).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _component[key];
                    }
                });
            });
            var _parent = __webpack_require__("./src/component/parent/index.js");
            Object.keys(_parent).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _parent[key];
                    }
                });
            });
            var _child = __webpack_require__("./src/component/child/index.js");
            Object.keys(_child).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _child[key];
                    }
                });
            });
        },
        "./src/component/parent/drivers.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.RENDER_DRIVERS = void 0;
            var _extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            }, _src = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), _src2 = __webpack_require__("./node_modules/post-robot/src/index.js"), _src3 = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), _lib = __webpack_require__("./src/lib/index.js"), _constants = __webpack_require__("./src/constants.js"), _window = __webpack_require__("./src/component/window.js"), RENDER_DRIVERS = exports.RENDER_DRIVERS = {};
            RENDER_DRIVERS[_constants.CONTEXT_TYPES.IFRAME] = {
                focusable: !1,
                renderedIntoContainerTemplate: !0,
                allowResize: !0,
                openOnClick: !1,
                needsBridge: !1,
                open: function(url) {
                    var _this = this, attributes = this.component.attributes.iframe || {};
                    this.iframe = (0, _lib.iframe)({
                        url: url,
                        attributes: _extends({
                            name: this.childWindowName,
                            title: this.component.name,
                            scrolling: this.component.scrolling ? "yes" : "no"
                        }, attributes),
                        class: [ _constants.CLASS_NAMES.COMPONENT_FRAME, _constants.CLASS_NAMES.INVISIBLE ]
                    }, this.element);
                    return (0, _lib.awaitFrameWindow)(this.iframe).then(function(frameWindow) {
                        _this.window = frameWindow;
                        var detectClose = function() {
                            return _src.ZalgoPromise.try(function() {
                                return _this.props.onClose(_constants.CLOSE_REASONS.CLOSE_DETECTED);
                            }).finally(function() {
                                return _this.destroy();
                            });
                        }, iframeWatcher = (0, _lib.watchElementForClose)(_this.iframe, detectClose), elementWatcher = (0, 
                        _lib.watchElementForClose)(_this.element, detectClose);
                        _this.clean.register("destroyWindow", function() {
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
                openPrerender: function() {
                    var _this2 = this, attributes = this.component.attributes.iframe || {};
                    this.prerenderIframe = (0, _lib.iframe)({
                        attributes: _extends({
                            name: "__prerender__" + this.childWindowName,
                            scrolling: this.component.scrolling ? "yes" : "no"
                        }, attributes),
                        class: [ _constants.CLASS_NAMES.PRERENDER_FRAME, _constants.CLASS_NAMES.VISIBLE ]
                    }, this.element);
                    return (0, _lib.awaitFrameWindow)(this.prerenderIframe).then(function(prerenderFrameWindow) {
                        _this2.prerenderWindow = prerenderFrameWindow;
                        _this2.clean.register("destroyPrerender", function() {
                            if (_this2.prerenderIframe) {
                                (0, _lib.destroyElement)(_this2.prerenderIframe);
                                delete _this2.prerenderIframe;
                            }
                        });
                    });
                },
                switchPrerender: function() {
                    var _this3 = this;
                    (0, _lib.addClass)(this.prerenderIframe, _constants.CLASS_NAMES.INVISIBLE);
                    (0, _lib.removeClass)(this.prerenderIframe, _constants.CLASS_NAMES.VISIBLE);
                    (0, _lib.addClass)(this.iframe, _constants.CLASS_NAMES.VISIBLE);
                    (0, _lib.removeClass)(this.iframe, _constants.CLASS_NAMES.INVISIBLE);
                    setTimeout(function() {
                        _this3.prerenderIframe && (0, _lib.destroyElement)(_this3.prerenderIframe);
                    }, 1e3);
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
                    open: function(original, override) {
                        return function() {
                            var _this4 = this;
                            return override.apply(this, arguments).then(function() {
                                _this4.clean.set("window", (0, _src3.findFrameByName)((0, _window.getParentComponentWindow)(), _this4.childWindowName));
                                if (!_this4.window) throw new Error("Unable to find parent component iframe window");
                            });
                        };
                    }
                },
                resize: function(width, height) {
                    if (width) {
                        this.container.style.width = (0, _lib.toCSS)(width);
                        this.element.style.width = (0, _lib.toCSS)(width);
                    }
                    if (height) {
                        this.container.style.height = (0, _lib.toCSS)(height);
                        this.element.style.height = (0, _lib.toCSS)(height);
                    }
                },
                show: function() {
                    (0, _lib.showElement)(this.element);
                },
                hide: function() {
                    (0, _lib.hideElement)(this.element);
                },
                loadUrl: function(url) {
                    this.iframe.setAttribute("src", url);
                }
            };
            RENDER_DRIVERS[_constants.CONTEXT_TYPES.POPUP] = {
                focusable: !0,
                renderedIntoContainerTemplate: !1,
                allowResize: !1,
                openOnClick: !0,
                needsBridge: !0,
                open: function() {
                    var _this5 = this, url = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                    return _src.ZalgoPromise.try(function() {
                        var _ref = _this5.component.dimensions || {}, _ref$width = _ref.width, width = void 0 === _ref$width ? _constants.DEFAULT_DIMENSIONS.WIDTH : _ref$width, _ref$height = _ref.height, height = void 0 === _ref$height ? _constants.DEFAULT_DIMENSIONS.HEIGHT : _ref$height;
                        width = (0, _lib.normalizeDimension)(width, window.outerWidth);
                        height = (0, _lib.normalizeDimension)(height, window.outerWidth);
                        var _getPosition = (0, _window.getPosition)({
                            width: width,
                            height: height
                        }), x = _getPosition.x, y = _getPosition.y, attributes = _this5.component.attributes.popup || {};
                        _this5.window = (0, _lib.popup)(url || "", _extends({
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
                        _this5.clean.register("destroyWindow", function() {
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
                openPrerender: function() {
                    return _src.ZalgoPromise.try(_lib.noop);
                },
                resize: function() {},
                hide: function() {
                    throw new Error("Can not hide popup");
                },
                show: function() {
                    throw new Error("Can not show popup");
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
                loadUrl: function(url) {
                    if ((0, _src3.isSameDomain)(this.window)) try {
                        if (this.window.location && this.window.location.replace) {
                            this.window.location.replace(url);
                            return;
                        }
                    } catch (err) {}
                    this.window.location = url;
                }
            };
        },
        "./src/component/parent/index.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.ParentComponent = void 0;
            var _class, _extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            }, _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
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
            }(), _client = __webpack_require__("./node_modules/beaver-logger/client/index.js"), _src = __webpack_require__("./node_modules/post-robot/src/index.js"), _src2 = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), _src3 = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), _base = __webpack_require__("./src/component/base.js"), _window = __webpack_require__("./src/component/window.js"), _lib = __webpack_require__("./src/lib/index.js"), _constants = __webpack_require__("./src/constants.js"), _error = __webpack_require__("./src/error.js"), _drivers = __webpack_require__("./src/component/parent/drivers.js"), _props = __webpack_require__("./src/component/parent/props.js");
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
            _lib.global.props = _lib.global.props || {};
            _lib.global.windows = _lib.global.windows || {};
            (exports.ParentComponent = (_applyDecoratedDescriptor((_class = function(_BaseComponent) {
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
                }(ParentComponent, _BaseComponent);
                function ParentComponent(component, context, _ref) {
                    var props = _ref.props;
                    !function(instance, Constructor) {
                        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                    }(this, ParentComponent);
                    var _this = function(self, call) {
                        if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !call || "object" != typeof call && "function" != typeof call ? self : call;
                    }(this, _BaseComponent.call(this));
                    _this.component = component;
                    _this.validateParentDomain();
                    _this.context = context;
                    _this.setProps(props);
                    _this.props.logLevel && (0, _lib.setLogLevel)(_this.props.logLevel);
                    _this.childWindowName = _this.buildChildWindowName({
                        renderTo: window
                    });
                    _this.registerActiveComponent();
                    _this.component.log("construct_parent");
                    _this.watchForUnload();
                    _this.onInit = new _src3.ZalgoPromise();
                    _this.onInit.catch(function(err) {
                        return _this.error(err);
                    });
                    return _this;
                }
                ParentComponent.prototype.render = function(element) {
                    var _this2 = this, loadUrl = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                    return this.tryInit(function() {
                        _this2.component.log("render_" + _this2.context, {
                            context: _this2.context,
                            element: element,
                            loadUrl: (0, _lib.stringify)(loadUrl)
                        });
                        var tasks = {};
                        tasks.onRender = _this2.props.onRender();
                        tasks.getDomain = _this2.getDomain();
                        tasks.elementReady = _src3.ZalgoPromise.try(function() {
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
                        tasks.switchPrerender = _src3.ZalgoPromise.all([ tasks.openPrerender, _this2.onInit ]).then(function() {
                            return _this2.switchPrerender();
                        });
                        tasks.open = _this2.driver.openOnClick ? _this2.open() : tasks.openContainer.then(function() {
                            return _this2.open();
                        });
                        tasks.listen = _src3.ZalgoPromise.all([ tasks.getDomain, tasks.open ]).then(function(_ref2) {
                            var domain = _ref2[0];
                            _this2.listen(_this2.window, domain);
                        });
                        tasks.watchForClose = tasks.open.then(function() {
                            return _this2.watchForClose();
                        });
                        tasks.linkDomain = _src3.ZalgoPromise.all([ tasks.getDomain, tasks.open ]).then(function(_ref3) {
                            var domain = _ref3[0];
                            if (_src.bridge && "string" == typeof domain) return _src.bridge.linkUrl(_this2.window, domain);
                        });
                        if (!_this2.html) {
                            tasks.createPrerenderTemplate = tasks.openPrerender.then(function() {
                                return _this2.createPrerenderTemplate();
                            });
                            tasks.showComponent = tasks.createPrerenderTemplate.then(function() {
                                return _this2.showComponent();
                            });
                        }
                        tasks.openBridge = _src3.ZalgoPromise.all([ tasks.getDomain, tasks.open ]).then(function(_ref4) {
                            var domain = _ref4[0];
                            return _this2.openBridge("string" == typeof domain ? domain : null);
                        });
                        if (_this2.html) tasks.loadHTML = tasks.open.then(function() {
                            return _this2.loadHTML();
                        }); else if (loadUrl) {
                            tasks.buildUrl = _this2.buildUrl();
                            tasks.loadUrl = _src3.ZalgoPromise.all([ tasks.buildUrl, tasks.open, tasks.linkDomain, tasks.listen, tasks.open, tasks.openBridge, tasks.createPrerenderTemplate ]).then(function(_ref5) {
                                var url = _ref5[0];
                                return _this2.loadUrl(url);
                            });
                            tasks.runTimeout = tasks.loadUrl.then(function() {
                                return _this2.runTimeout();
                            });
                        }
                        return _src3.ZalgoPromise.hash(tasks);
                    }).then(function() {
                        return _this2.props.onEnter();
                    }).then(function() {
                        return _this2;
                    });
                };
                ParentComponent.prototype.getOutlet = function() {
                    var outlet = document.createElement("div");
                    (0, _lib.addClass)(outlet, _constants.CLASS_NAMES.OUTLET);
                    return outlet;
                };
                ParentComponent.prototype.validateParentDomain = function() {
                    var domain = (0, _src2.getDomain)();
                    if (!(0, _src2.matchDomain)(this.component.allowedParentDomains, domain)) throw new _error.RenderError("Can not be rendered by domain: " + domain);
                };
                ParentComponent.prototype.renderTo = function(win, element) {
                    var _this3 = this;
                    return this.tryInit(function() {
                        if (win === window) return _this3.render(element);
                        if (!(0, _src2.isSameTopWindow)(window, win)) throw new Error("Can only renderTo an adjacent frame");
                        if (element && "string" != typeof element) throw new Error("Element passed to renderTo must be a string selector, got " + (void 0 === element ? "undefined" : _typeof(element)) + " " + element);
                        _this3.checkAllowRenderTo(win);
                        _this3.component.log("render_" + _this3.context + "_to_win", {
                            element: (0, _lib.stringify)(element),
                            context: _this3.context
                        });
                        _this3.childWindowName = _this3.buildChildWindowName({
                            renderTo: win
                        });
                        _this3.delegate(win);
                        return _this3.render(element);
                    });
                };
                ParentComponent.prototype.prefetch = function() {
                    var _this4 = this;
                    return _src3.ZalgoPromise.try(function() {
                        _this4.html = _this4.buildUrl().then(function(url) {
                            return (0, _lib.prefetchPage)(url).then(function(html) {
                                return '\n                        <base href="' + ("" + url.split("/").slice(0, 3).join("/")) + '">\n\n                        ' + html + "\n\n                        <script>\n                            if (window.history && window.history.pushState) {\n                                window.history.pushState({}, '', '" + ("/" + url.split("/").slice(3).join("/")) + "');\n                            }\n                        <\/script>\n                    ";
                            });
                        });
                    });
                };
                ParentComponent.prototype.loadHTML = function() {
                    var _this5 = this;
                    return _src3.ZalgoPromise.try(function() {
                        if (!_this5.html) throw new Error("Html not prefetched");
                        return _this5.html.then(function(html) {
                            return (0, _lib.writeToWindow)(_this5.window, html);
                        });
                    });
                };
                ParentComponent.prototype.checkAllowRenderTo = function(win) {
                    if (!win) throw this.component.createError("Must pass window to renderTo");
                    if (!(0, _src2.isSameDomain)(win)) {
                        var origin = (0, _src2.getDomain)(), domain = this.component.getDomain(null, this.props.env);
                        if (!domain) throw new Error("Could not determine domain to allow remote render");
                        if (!(0, _src2.matchDomain)(domain, origin)) throw new Error("Can not render remotely to " + domain.toString() + " - can only render to " + origin);
                    }
                };
                ParentComponent.prototype.registerActiveComponent = function() {
                    var _this6 = this;
                    ParentComponent.activeComponents.push(this);
                    this.clean.register(function() {
                        ParentComponent.activeComponents.splice(ParentComponent.activeComponents.indexOf(_this6), 1);
                    });
                };
                ParentComponent.prototype.getComponentParentRef = function() {
                    var renderToWindow = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window;
                    if (this.context === _constants.CONTEXT_TYPES.POPUP) return {
                        ref: _constants.WINDOW_REFERENCES.OPENER
                    };
                    if (renderToWindow === window) return (0, _src2.isTop)(window) ? {
                        ref: _constants.WINDOW_REFERENCES.TOP
                    } : {
                        ref: _constants.WINDOW_REFERENCES.PARENT,
                        distance: (0, _src2.getDistanceFromTop)(window)
                    };
                    var uid = (0, _lib.uniqueID)();
                    _lib.global.windows[uid] = window;
                    this.clean.register(function() {
                        delete _lib.global.windows[uid];
                    });
                    return {
                        ref: _constants.WINDOW_REFERENCES.GLOBAL,
                        uid: uid
                    };
                };
                ParentComponent.prototype.getRenderParentRef = function() {
                    var renderToWindow = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window;
                    if (renderToWindow === window) return this.getComponentParentRef(renderToWindow);
                    var uid = (0, _lib.uniqueID)();
                    _lib.global.windows[uid] = renderToWindow;
                    this.clean.register(function() {
                        delete _lib.global.windows[uid];
                    });
                    return {
                        ref: _constants.WINDOW_REFERENCES.GLOBAL,
                        uid: uid
                    };
                };
                ParentComponent.prototype.buildChildWindowName = function() {
                    var _ref6$renderTo = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).renderTo, renderTo = void 0 === _ref6$renderTo ? window : _ref6$renderTo, sameDomain = (0, 
                    _src2.isSameDomain)(renderTo), uid = (0, _lib.uniqueID)(), tag = this.component.tag, sProps = (0, 
                    _lib.serializeFunctions)(this.getPropsForChild()), componentParent = this.getComponentParentRef(renderTo), renderParent = this.getRenderParentRef(renderTo), props = !sameDomain && !this.component.unsafeRenderTo ? {
                        type: _constants.INITIAL_PROPS.UID,
                        uid: uid
                    } : {
                        type: _constants.INITIAL_PROPS.RAW,
                        value: sProps
                    };
                    if (props.type === _constants.INITIAL_PROPS.UID) {
                        _lib.global.props[uid] = JSON.stringify(sProps);
                        this.clean.register(function() {
                            delete _lib.global.props[uid];
                        });
                    }
                    return (0, _window.buildChildWindowName)(this.component.name, this.component.version, {
                        uid: uid,
                        tag: tag,
                        componentParent: componentParent,
                        renderParent: renderParent,
                        props: props
                    });
                };
                ParentComponent.prototype.sendToParent = function(name, data) {
                    if (!(0, _window.getParentComponentWindow)()) throw new Error("Can not find parent component window to message");
                    this.component.log("send_to_parent_" + name);
                    return (0, _src.send)((0, _window.getParentComponentWindow)(), name, data, {
                        domain: (0, _window.getParentDomain)()
                    });
                };
                ParentComponent.prototype.setProps = function(props) {
                    var isUpdate = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    this.component.validate && this.component.validate(this.component, props);
                    this.props = this.props || {};
                    (0, _lib.extend)(this.props, (0, _props.normalizeProps)(this.component, this, props, isUpdate));
                };
                ParentComponent.prototype.buildUrl = function() {
                    var _this7 = this;
                    return (0, _props.propsToQuery)(_extends({}, this.component.props, this.component.builtinProps), this.props).then(function(query) {
                        var url = _this7.component.getUrl(_this7.props.env, _this7.props);
                        return (0, _lib.extendUrl)(url, {
                            query: _extends({}, query, {
                                xcomponent: "1"
                            })
                        });
                    });
                };
                ParentComponent.prototype.getDomain = function() {
                    var _this8 = this;
                    return _src3.ZalgoPromise.try(function() {
                        var domain = _this8.component.getDomain(null, _this8.props.env);
                        return domain || (_this8.component.buildUrl ? _src3.ZalgoPromise.try(function() {
                            return _this8.component.buildUrl(_this8.props);
                        }).then(function(builtUrl) {
                            return _this8.component.getDomain(builtUrl, _this8.props.env);
                        }) : void 0);
                    }).then(function(domain) {
                        if (!domain) throw new Error("Could not determine domain");
                        return domain;
                    });
                };
                ParentComponent.prototype.getPropsForChild = function() {
                    var result = {}, _iterator = Object.keys(this.props), _isArray = Array.isArray(_iterator), _i = 0;
                    for (_iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                        var _ref7;
                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref7 = _iterator[_i++];
                        } else {
                            if ((_i = _iterator.next()).done) break;
                            _ref7 = _i.value;
                        }
                        var key = _ref7, prop = this.component.getProp(key);
                        prop && !1 === prop.sendToChild || (result[key] = this.props[key]);
                    }
                    return result;
                };
                ParentComponent.prototype.updateProps = function(props) {
                    var _this9 = this;
                    this.setProps(props, !0);
                    return this.onInit.then(function() {
                        if (_this9.childExports) return _this9.childExports.updateProps(_this9.getPropsForChild());
                        throw new Error("Child exports were not available");
                    });
                };
                ParentComponent.prototype.openBridge = function(domain) {
                    var _this10 = this;
                    return _src3.ZalgoPromise.try(function() {
                        if (_src.bridge && _this10.driver.needsBridge) {
                            var needsBridgeParams = {
                                win: _this10.window
                            };
                            domain && (needsBridgeParams.domain = domain);
                            var needsBridge = _src.bridge.needsBridge(needsBridgeParams), bridgeUrl = _this10.component.getBridgeUrl(_this10.props.env);
                            if (bridgeUrl) {
                                bridgeUrl = (0, _lib.extendUrl)(bridgeUrl, {
                                    query: {
                                        version: _this10.component.version
                                    }
                                });
                                var bridgeDomain = _this10.component.getBridgeDomain(_this10.props.env);
                                if (!bridgeDomain) throw new Error("Can not determine domain for bridge");
                                return needsBridge ? _src.bridge.openBridge(bridgeUrl, bridgeDomain).then(function(result) {
                                    if (result) return result;
                                }) : void 0;
                            }
                            if (needsBridge && domain && !_src.bridge.hasBridge(domain, domain)) throw new Error("Bridge url needed to render " + _this10.context);
                        }
                    });
                };
                ParentComponent.prototype.open = function() {
                    var _this11 = this;
                    return _src3.ZalgoPromise.try(function() {
                        _this11.component.log("open_" + _this11.context, {
                            windowName: _this11.childWindowName
                        });
                        return _this11.driver.open.call(_this11);
                    });
                };
                ParentComponent.prototype.openPrerender = function() {
                    var _this12 = this;
                    return _src3.ZalgoPromise.try(function() {
                        if (_this12.component.prerenderTemplate) return _this12.driver.openPrerender.call(_this12);
                    });
                };
                ParentComponent.prototype.switchPrerender = function() {
                    var _this13 = this;
                    return _src3.ZalgoPromise.try(function() {
                        if (_this13.prerenderWindow && _this13.driver.switchPrerender) return _this13.driver.switchPrerender.call(_this13);
                    });
                };
                ParentComponent.prototype.elementReady = function(element) {
                    return (0, _lib.elementReady)(element).then(_lib.noop);
                };
                ParentComponent.prototype.delegate = function(win) {
                    var _this14 = this;
                    this.component.log("delegate_" + this.context);
                    var props = {
                        uid: this.props.uid,
                        dimensions: this.props.dimensions,
                        onClose: this.props.onClose,
                        onDisplay: this.props.onDisplay
                    }, _iterator2 = this.component.getPropNames(), _isArray2 = Array.isArray(_iterator2), _i2 = 0;
                    for (_iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                        var _ref8;
                        if (_isArray2) {
                            if (_i2 >= _iterator2.length) break;
                            _ref8 = _iterator2[_i2++];
                        } else {
                            if ((_i2 = _iterator2.next()).done) break;
                            _ref8 = _i2.value;
                        }
                        var propName = _ref8;
                        this.component.getProp(propName).allowDelegate && (props[propName] = this.props[propName]);
                    }
                    var delegate = (0, _src.send)(win, _constants.POST_MESSAGE.DELEGATE + "_" + this.component.name, {
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
                    }).then(function(_ref9) {
                        var data = _ref9.data;
                        _this14.clean.register(data.destroy);
                        return data;
                    }).catch(function(err) {
                        throw new Error("Unable to delegate rendering. Possibly the component is not loaded in the target window.\n\n" + (0, 
                        _lib.stringifyError)(err));
                    }), overrides = this.driver.delegateOverrides, _loop = function() {
                        if (_isArray3) {
                            if (_i3 >= _iterator3.length) return "break";
                            _ref10 = _iterator3[_i3++];
                        } else {
                            if ((_i3 = _iterator3.next()).done) return "break";
                            _ref10 = _i3.value;
                        }
                        var key = _ref10, val = overrides[key];
                        if (val === _constants.DELEGATE.CALL_ORIGINAL) return "continue";
                        var original = _this14[key];
                        _this14[key] = function() {
                            var _this15 = this, _arguments = arguments;
                            return delegate.then(function(data) {
                                var override = data.overrides[key];
                                if (val === _constants.DELEGATE.CALL_DELEGATE) return override.apply(_this15, _arguments);
                                if ("function" == typeof val) return val(original, override).apply(_this15, _arguments);
                                throw new Error("Expected delgate to be CALL_ORIGINAL, CALL_DELEGATE, or factory method");
                            });
                        };
                    };
                    var _iterator3 = Object.keys(overrides), _isArray3 = Array.isArray(_iterator3), _i3 = 0;
                    _loop2: for (_iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                        var _ref10;
                        switch (_loop()) {
                          case "break":
                            break _loop2;

                          case "continue":
                            continue;
                        }
                    }
                };
                ParentComponent.prototype.watchForClose = function() {
                    var _this16 = this, closeWindowListener = (0, _src2.onCloseWindow)(this.window, function() {
                        _this16.component.log("detect_close_child");
                        return _src3.ZalgoPromise.try(function() {
                            return _this16.props.onClose(_constants.CLOSE_REASONS.CLOSE_DETECTED);
                        }).finally(function() {
                            return _this16.destroy();
                        });
                    }, 3e3);
                    this.clean.register("destroyCloseWindowListener", closeWindowListener.cancel);
                };
                ParentComponent.prototype.watchForUnload = function() {
                    var _this17 = this, onunload = (0, _lib.once)(function() {
                        _this17.component.log("navigate_away");
                        (0, _client.flush)();
                        _this17.destroyComponent();
                    }), unloadWindowListener = (0, _lib.addEventListener)(window, "unload", onunload);
                    this.clean.register("destroyUnloadWindowListener", unloadWindowListener.cancel);
                };
                ParentComponent.prototype.loadUrl = function(url) {
                    var _this18 = this;
                    return _src3.ZalgoPromise.try(function() {
                        _this18.component.log("load_url");
                        if (window.location.href.split("#")[0] === url.split("#")[0]) {
                            var _query;
                            url = (0, _lib.extendUrl)(url, {
                                query: (_query = {}, _query[(0, _lib.uniqueID)()] = "1", _query)
                            });
                        }
                        return _this18.driver.loadUrl.call(_this18, url);
                    });
                };
                ParentComponent.prototype.runTimeout = function() {
                    var _this19 = this, timeout = this.props.timeout;
                    if (timeout) {
                        var _id = this.timeout = setTimeout(function() {
                            _this19.component.log("timed_out", {
                                timeout: timeout.toString()
                            });
                            var error = _this19.component.createError("Loading component timed out after " + timeout + " milliseconds");
                            _this19.onInit.reject(error);
                            _this19.props.onTimeout(error);
                        }, timeout);
                        this.clean.register(function() {
                            clearTimeout(_id);
                            delete _this19.timeout;
                        });
                    }
                };
                ParentComponent.prototype.listeners = function() {
                    var _ref11;
                    return (_ref11 = {})[_constants.POST_MESSAGE.INIT] = function(source, data) {
                        this.childExports = data.exports;
                        this.onInit.resolve(this);
                        this.timeout && clearTimeout(this.timeout);
                        return {
                            props: this.getPropsForChild(),
                            context: this.context
                        };
                    }, _ref11[_constants.POST_MESSAGE.CLOSE] = function(source, data) {
                        this.close(data.reason);
                    }, _ref11[_constants.POST_MESSAGE.CHECK_CLOSE] = function() {
                        this.checkClose();
                    }, _ref11[_constants.POST_MESSAGE.RESIZE] = function(source, data) {
                        var _this20 = this;
                        return _src3.ZalgoPromise.try(function() {
                            if (_this20.driver.allowResize) return _this20.resize(data.width, data.height);
                        });
                    }, _ref11[_constants.POST_MESSAGE.ONRESIZE] = function() {
                        this.event.trigger("resize");
                    }, _ref11[_constants.POST_MESSAGE.HIDE] = function() {
                        this.hide();
                    }, _ref11[_constants.POST_MESSAGE.SHOW] = function() {
                        this.show();
                    }, _ref11[_constants.POST_MESSAGE.ERROR] = function(source, data) {
                        this.error(new Error(data.error));
                    }, _ref11;
                };
                ParentComponent.prototype.resize = function(width, height) {
                    var _this21 = this, _ref12$waitForTransit = (arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}).waitForTransition, waitForTransition = void 0 === _ref12$waitForTransit || _ref12$waitForTransit;
                    return _src3.ZalgoPromise.try(function() {
                        _this21.component.log("resize", {
                            height: (0, _lib.stringify)(height),
                            width: (0, _lib.stringify)(width)
                        });
                        _this21.driver.resize.call(_this21, width, height);
                        if (waitForTransition && (_this21.element || _this21.iframe)) {
                            var overflow = void 0;
                            _this21.element && (overflow = (0, _lib.setOverflow)(_this21.element, "hidden"));
                            return (0, _lib.elementStoppedMoving)(_this21.element || _this21.iframe).then(function() {
                                overflow && overflow.reset();
                            });
                        }
                    });
                };
                ParentComponent.prototype.hide = function() {
                    this.container && (0, _lib.hideElement)(this.container);
                    return this.driver.hide.call(this);
                };
                ParentComponent.prototype.show = function() {
                    this.container && (0, _lib.showElement)(this.container);
                    return this.driver.show.call(this);
                };
                ParentComponent.prototype.checkClose = function() {
                    var _this22 = this, closeWindowListener = (0, _src2.onCloseWindow)(this.window, function() {
                        _this22.userClose();
                    }, 50, 500);
                    this.clean.register(closeWindowListener.cancel);
                };
                ParentComponent.prototype.userClose = function() {
                    return this.close(_constants.CLOSE_REASONS.USER_CLOSED);
                };
                ParentComponent.prototype.close = function() {
                    var _this23 = this, reason = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _constants.CLOSE_REASONS.PARENT_CALL;
                    return _src3.ZalgoPromise.try(function() {
                        _this23.component.log("close", {
                            reason: reason
                        });
                        _this23.event.triggerOnce(_constants.EVENTS.CLOSE);
                        return _this23.props.onClose(reason);
                    }).then(function() {
                        return _src3.ZalgoPromise.all([ _this23.closeComponent(), _this23.closeContainer() ]);
                    }).then(function() {
                        return _this23.destroy();
                    });
                };
                ParentComponent.prototype.closeContainer = function() {
                    var _this24 = this, reason = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _constants.CLOSE_REASONS.PARENT_CALL;
                    return _src3.ZalgoPromise.try(function() {
                        _this24.event.triggerOnce(_constants.EVENTS.CLOSE);
                        return _this24.props.onClose(reason);
                    }).then(function() {
                        return _src3.ZalgoPromise.all([ _this24.closeComponent(reason), _this24.hideContainer() ]);
                    }).then(function() {
                        return _this24.destroyContainer();
                    });
                };
                ParentComponent.prototype.destroyContainer = function() {
                    var _this25 = this;
                    return _src3.ZalgoPromise.try(function() {
                        _this25.clean.run("destroyContainerEvents");
                        _this25.clean.run("destroyContainerTemplate");
                    });
                };
                ParentComponent.prototype.closeComponent = function() {
                    var _this26 = this, reason = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _constants.CLOSE_REASONS.PARENT_CALL, win = this.window;
                    return _src3.ZalgoPromise.try(function() {
                        return _this26.cancelContainerEvents();
                    }).then(function() {
                        _this26.event.triggerOnce(_constants.EVENTS.CLOSE);
                        return _this26.props.onClose(reason);
                    }).then(function() {
                        return _this26.hideComponent();
                    }).then(function() {
                        return _this26.destroyComponent();
                    }).then(function() {
                        _this26.childExports && _this26.context === _constants.CONTEXT_TYPES.POPUP && !(0, 
                        _src2.isWindowClosed)(win) && _this26.childExports.close().catch(_lib.noop);
                    });
                };
                ParentComponent.prototype.destroyComponent = function() {
                    this.clean.run("destroyUnloadWindowListener");
                    this.clean.run("destroyCloseWindowListener");
                    this.clean.run("destroyContainerEvents");
                    this.clean.run("destroyWindow");
                };
                ParentComponent.prototype.showContainer = function() {
                    var _this27 = this;
                    return _src3.ZalgoPromise.try(function() {
                        if (_this27.props.onDisplay) return _this27.props.onDisplay();
                    }).then(function() {
                        if (_this27.container) return (0, _lib.showAndAnimate)(_this27.container, _constants.ANIMATION_NAMES.SHOW_CONTAINER, _this27.clean.register);
                    });
                };
                ParentComponent.prototype.showComponent = function() {
                    var _this28 = this;
                    return _src3.ZalgoPromise.try(function() {
                        if (_this28.props.onDisplay) return _this28.props.onDisplay();
                    }).then(function() {
                        if (_this28.element) return (0, _lib.showAndAnimate)(_this28.element, _constants.ANIMATION_NAMES.SHOW_COMPONENT, _this28.clean.register);
                    });
                };
                ParentComponent.prototype.hideContainer = function() {
                    var _this29 = this;
                    return _src3.ZalgoPromise.try(function() {
                        return _this29.container ? (0, _lib.animateAndHide)(_this29.container, _constants.ANIMATION_NAMES.HIDE_CONTAINER, _this29.clean.register) : _src3.ZalgoPromise.resolve();
                    });
                };
                ParentComponent.prototype.hideComponent = function() {
                    var _this30 = this;
                    return _src3.ZalgoPromise.try(function() {
                        return _this30.element ? (0, _lib.animateAndHide)(_this30.element, _constants.ANIMATION_NAMES.HIDE_COMPONENT, _this30.clean.register) : _src3.ZalgoPromise.resolve();
                    });
                };
                ParentComponent.prototype.focus = function() {
                    if (!this.window || (0, _src2.isWindowClosed)(this.window)) throw new Error("No window to focus");
                    this.component.log("focus");
                    this.window.focus();
                };
                ParentComponent.prototype.createPrerenderTemplate = function() {
                    var _this31 = this;
                    return _src3.ZalgoPromise.try(function() {
                        return _this31.component.prerenderTemplate ? _src3.ZalgoPromise.try(function() {
                            return _this31.prerenderIframe ? (0, _lib.awaitFrameLoad)(_this31.prerenderIframe).then(function() {
                                return _this31.prerenderWindow;
                            }) : _this31.prerenderWindow;
                        }).then(function(win) {
                            var doc = void 0;
                            try {
                                doc = win.document;
                            } catch (err) {
                                return;
                            }
                            var el = _this31.renderTemplate(_this31.component.prerenderTemplate, {
                                jsxDom: _lib.jsxDom.bind(doc),
                                document: doc
                            });
                            try {
                                (0, _lib.writeElementToWindow)(win, el);
                            } catch (err) {}
                        }) : _src3.ZalgoPromise.resolve();
                    });
                };
                ParentComponent.prototype.renderTemplate = function(renderer) {
                    var _this32 = this, options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, _ref13 = this.component.dimensions || {}, _ref13$width = _ref13.width, width = void 0 === _ref13$width ? _constants.DEFAULT_DIMENSIONS.WIDTH + "px" : _ref13$width, _ref13$height = _ref13.height, height = void 0 === _ref13$height ? _constants.DEFAULT_DIMENSIONS.HEIGHT + "px" : _ref13$height;
                    return renderer.call(this, _extends({
                        id: _constants.CLASS_NAMES.ZOID + "-" + this.component.tag + "-" + this.props.uid,
                        props: renderer.__xdomain__ ? null : this.props,
                        tag: this.component.tag,
                        context: this.context,
                        outlet: this.getOutlet(),
                        CLASS: _constants.CLASS_NAMES,
                        ANIMATION: _constants.ANIMATION_NAMES,
                        CONTEXT: _constants.CONTEXT_TYPES,
                        EVENT: _constants.EVENTS,
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
                        jsxDom: _lib.jsxDom,
                        document: document,
                        dimensions: {
                            width: width,
                            height: height
                        }
                    }, options));
                };
                ParentComponent.prototype.openContainer = function(element) {
                    var _this33 = this;
                    return _src3.ZalgoPromise.try(function() {
                        var el = void 0;
                        if (!(el = element ? (0, _lib.getElement)(element) : document.body)) throw new Error("Could not find element to open container into");
                        if (_this33.component.containerTemplate) {
                            var container = _this33.renderTemplate(_this33.component.containerTemplate, {
                                container: el
                            });
                            _this33.container = container;
                            (0, _lib.hideElement)(_this33.container);
                            (0, _lib.appendChild)(el, _this33.container);
                            if (_this33.driver.renderedIntoContainerTemplate) {
                                _this33.element = _this33.getOutlet();
                                (0, _lib.hideElement)(_this33.element);
                                if (!_this33.element) throw new Error("Could not find element to render component into");
                                (0, _lib.hideElement)(_this33.element);
                            }
                            _this33.clean.register("destroyContainerTemplate", function() {
                                _this33.container && _this33.container.parentNode && _this33.container.parentNode.removeChild(_this33.container);
                                delete _this33.container;
                            });
                        } else if (_this33.driver.renderedIntoContainerTemplate) throw new Error("containerTemplate needed to render " + _this33.context);
                    });
                };
                ParentComponent.prototype.cancelContainerEvents = function() {
                    this.clean.run("destroyContainerEvents");
                };
                ParentComponent.prototype.destroy = function() {
                    var _this34 = this;
                    return _src3.ZalgoPromise.try(function() {
                        if (_this34.clean.hasTasks()) {
                            _this34.component.log("destroy");
                            (0, _client.flush)();
                            return _this34.clean.all();
                        }
                    });
                };
                ParentComponent.prototype.tryInit = function(method) {
                    var _this35 = this;
                    return _src3.ZalgoPromise.try(method).catch(function(err) {
                        _this35.onInit.reject(err);
                    }).then(function() {
                        return _this35.onInit;
                    });
                };
                ParentComponent.prototype.error = function(err) {
                    var _this36 = this;
                    return _src3.ZalgoPromise.try(function() {
                        _this36.handledErrors = _this36.handledErrors || [];
                        if (-1 === _this36.handledErrors.indexOf(err)) {
                            _this36.handledErrors.push(err);
                            _this36.onInit.reject(err);
                            return _this36.destroy();
                        }
                    }).then(function() {
                        if (_this36.props.onError) return _this36.props.onError(err);
                    }).catch(function(errErr) {
                        throw new Error("An error was encountered while handling error:\n\n " + (0, _lib.stringifyError)(err) + "\n\n" + (0, 
                        _lib.stringifyError)(errErr));
                    }).then(function() {
                        if (!_this36.props.onError) throw err;
                    });
                };
                ParentComponent.destroyAll = function() {
                    for (var results = []; ParentComponent.activeComponents.length; ) results.push(ParentComponent.activeComponents[0].destroy());
                    return _src3.ZalgoPromise.all(results).then(_lib.noop);
                };
                _createClass(ParentComponent, [ {
                    key: "driver",
                    get: function() {
                        if (!this.context) throw new Error("Context not set");
                        return _drivers.RENDER_DRIVERS[this.context];
                    }
                } ]);
                return ParentComponent;
            }(_base.BaseComponent)).prototype, "getOutlet", [ _lib.memoized ], Object.getOwnPropertyDescriptor(_class.prototype, "getOutlet"), _class.prototype), 
            _applyDecoratedDescriptor(_class.prototype, "prefetch", [ _lib.memoized ], Object.getOwnPropertyDescriptor(_class.prototype, "prefetch"), _class.prototype), 
            _applyDecoratedDescriptor(_class.prototype, "loadHTML", [ _lib.memoized ], Object.getOwnPropertyDescriptor(_class.prototype, "loadHTML"), _class.prototype), 
            _applyDecoratedDescriptor(_class.prototype, "buildUrl", [ _lib.memoized ], Object.getOwnPropertyDescriptor(_class.prototype, "buildUrl"), _class.prototype), 
            _applyDecoratedDescriptor(_class.prototype, "open", [ _lib.memoized ], Object.getOwnPropertyDescriptor(_class.prototype, "open"), _class.prototype), 
            _applyDecoratedDescriptor(_class.prototype, "openPrerender", [ _lib.memoized ], Object.getOwnPropertyDescriptor(_class.prototype, "openPrerender"), _class.prototype), 
            _applyDecoratedDescriptor(_class.prototype, "switchPrerender", [ _lib.memoized ], Object.getOwnPropertyDescriptor(_class.prototype, "switchPrerender"), _class.prototype), 
            _applyDecoratedDescriptor(_class.prototype, "close", [ _lib.memoized ], Object.getOwnPropertyDescriptor(_class.prototype, "close"), _class.prototype), 
            _applyDecoratedDescriptor(_class.prototype, "closeContainer", [ _lib.memoized ], Object.getOwnPropertyDescriptor(_class.prototype, "closeContainer"), _class.prototype), 
            _applyDecoratedDescriptor(_class.prototype, "destroyContainer", [ _lib.memoized ], Object.getOwnPropertyDescriptor(_class.prototype, "destroyContainer"), _class.prototype), 
            _applyDecoratedDescriptor(_class.prototype, "closeComponent", [ _lib.memoized ], Object.getOwnPropertyDescriptor(_class.prototype, "closeComponent"), _class.prototype), 
            _applyDecoratedDescriptor(_class.prototype, "showContainer", [ _lib.memoized ], Object.getOwnPropertyDescriptor(_class.prototype, "showContainer"), _class.prototype), 
            _applyDecoratedDescriptor(_class.prototype, "showComponent", [ _lib.memoized ], Object.getOwnPropertyDescriptor(_class.prototype, "showComponent"), _class.prototype), 
            _applyDecoratedDescriptor(_class.prototype, "hideContainer", [ _lib.memoized ], Object.getOwnPropertyDescriptor(_class.prototype, "hideContainer"), _class.prototype), 
            _applyDecoratedDescriptor(_class.prototype, "hideComponent", [ _lib.memoized ], Object.getOwnPropertyDescriptor(_class.prototype, "hideComponent"), _class.prototype), 
            _applyDecoratedDescriptor(_class.prototype, "createPrerenderTemplate", [ _lib.memoized ], Object.getOwnPropertyDescriptor(_class.prototype, "createPrerenderTemplate"), _class.prototype), 
            _applyDecoratedDescriptor(_class.prototype, "openContainer", [ _lib.memoized ], Object.getOwnPropertyDescriptor(_class.prototype, "openContainer"), _class.prototype), 
            _class)).activeComponents = [];
        },
        "./src/component/parent/props.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            exports.normalizeProps = function(component, instance, props) {
                var isUpdate = arguments.length > 3 && void 0 !== arguments[3] && arguments[3], result = {};
                props = props || {};
                for (var propNames = isUpdate ? [] : component.getPropNames(), _iterator = Object.keys(props), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                    var _ref;
                    if (_isArray) {
                        if (_i >= _iterator.length) break;
                        _ref = _iterator[_i++];
                    } else {
                        if ((_i = _iterator.next()).done) break;
                        _ref = _i.value;
                    }
                    var key = _ref;
                    -1 === propNames.indexOf(key) && propNames.push(key);
                }
                for (var _iterator2 = propNames, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                    var _ref2;
                    if (_isArray2) {
                        if (_i2 >= _iterator2.length) break;
                        _ref2 = _iterator2[_i2++];
                    } else {
                        if ((_i2 = _iterator2.next()).done) break;
                        _ref2 = _i2.value;
                    }
                    var _key = _ref2, propDef = component.getProp(_key), value = props[_key];
                    if (!propDef) {
                        if (component.looseProps) {
                            result[_key] = value;
                            continue;
                        }
                        throw new Error("Unrecognized prop: " + _key);
                    }
                    !(0, _lib.isDefined)(value) && propDef.alias && (value = props[propDef.alias]);
                    !(0, _lib.isDefined)(value) && propDef.value && (value = propDef.value());
                    !(0, _lib.isDefined)(value) && propDef.def && (value = propDef.def(props, component));
                    if ((0, _lib.isDefined)(value)) {
                        if ("array" === propDef.type ? !Array.isArray(value) : (void 0 === value ? "undefined" : _typeof(value)) !== propDef.type) throw new TypeError("Prop is not of type " + propDef.type + ": " + _key);
                    } else if (!1 !== propDef.required) throw new Error("Expected prop " + _key + " to be passed");
                    result[_key] = value;
                }
                for (var _iterator3 = Object.keys(result), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                    var _ref3;
                    if (_isArray3) {
                        if (_i3 >= _iterator3.length) break;
                        _ref3 = _iterator3[_i3++];
                    } else {
                        if ((_i3 = _iterator3.next()).done) break;
                        _ref3 = _i3.value;
                    }
                    var _key2 = _ref3, _propDef = component.getProp(_key2), _value = result[_key2];
                    if (_propDef) {
                        _propDef.validate && _propDef.validate(_value, result);
                        _propDef.decorate && (result[_key2] = _propDef.decorate(_value, result));
                        result[_key2] && "function" === _propDef.type && (result[_key2] = result[_key2].bind(instance));
                    }
                }
                return result;
            };
            exports.propsToQuery = function(propsDef, props) {
                var params = {};
                return _src.ZalgoPromise.all(Object.keys(props).map(function(key) {
                    var prop = propsDef[key];
                    if (prop) return _src.ZalgoPromise.resolve().then(function() {
                        var value = props[key];
                        if (value && prop.queryParam) return value;
                    }).then(function(value) {
                        if (value) return _src.ZalgoPromise.all([ function(prop, key, value) {
                            return _src.ZalgoPromise.try(function() {
                                return "function" == typeof prop.queryParam ? prop.queryParam(value) : "string" == typeof prop.queryParam ? prop.queryParam : key;
                            });
                        }(prop, key, value), function(prop, key, value) {
                            return _src.ZalgoPromise.try(function() {
                                return "function" == typeof prop.queryValue ? prop.queryValue(value) : value;
                            });
                        }(prop, 0, value) ]).then(function(_ref4) {
                            var queryParam = _ref4[0], queryValue = _ref4[1], result = void 0;
                            if ("boolean" == typeof queryValue) result = "1"; else if ("string" == typeof queryValue) result = queryValue.toString(); else {
                                if ("function" == typeof queryValue) return;
                                if ("object" === (void 0 === queryValue ? "undefined" : _typeof(queryValue)) && null !== queryValue) {
                                    if ("json" !== prop.serialization) {
                                        result = (0, _lib.dotify)(queryValue, key);
                                        for (var _iterator4 = Object.keys(result), _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator](); ;) {
                                            var _ref5;
                                            if (_isArray4) {
                                                if (_i4 >= _iterator4.length) break;
                                                _ref5 = _iterator4[_i4++];
                                            } else {
                                                if ((_i4 = _iterator4.next()).done) break;
                                                _ref5 = _i4.value;
                                            }
                                            var dotkey = _ref5;
                                            params[dotkey] = result[dotkey];
                                        }
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
            };
            var _src = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), _lib = __webpack_require__("./src/lib/index.js");
        },
        "./src/component/window.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.getParentRenderWindow = exports.getParentComponentWindow = exports.getComponentMeta = exports.isZoidComponentWindow = void 0;
            exports.buildChildWindowName = function(name, version) {
                var options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                options.id = (0, _lib.uniqueID)();
                options.domain = (0, _src.getDomain)(window);
                var encodedName = normalize(name), encodedVersion = normalize(version), encodedOptions = (str = JSON.stringify(options), 
                _hiBase2.default.encode(str).replace(/\=/g, "").toLowerCase());
                var str;
                if (!encodedName) throw new Error("Invalid name: " + name + " - must contain alphanumeric characters");
                if (!encodedVersion) throw new Error("Invalid version: " + version + " - must contain alphanumeric characters");
                return [ "xcomponent", encodedName, encodedVersion, encodedOptions, "" ].join("__");
            };
            exports.getParentDomain = function() {
                return getComponentMeta().domain;
            };
            exports.getPosition = function(_ref3) {
                var width = _ref3.width, height = _ref3.height, x = 0, y = 0;
                width && (window.outerWidth ? x = Math.round((window.outerWidth - width) / 2) + window.screenX : window.screen.width && (x = Math.round((window.screen.width - width) / 2)));
                height && (window.outerHeight ? y = Math.round((window.outerHeight - height) / 2) + window.screenY : window.screen.height && (y = Math.round((window.screen.height - height) / 2)));
                return {
                    x: x,
                    y: y
                };
            };
            var obj, _src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), _hiBase = __webpack_require__("./node_modules/hi-base32/src/base32.js"), _hiBase2 = (obj = _hiBase) && obj.__esModule ? obj : {
                default: obj
            }, _lib = __webpack_require__("./src/lib/index.js"), _constants = __webpack_require__("./src/constants.js");
            function normalize(str) {
                return str.replace(/^[^a-z0-9A-Z]+|[^a-z0-9A-Z]+$/g, "").replace(/[^a-z0-9A-Z]+/g, "_");
            }
            exports.isZoidComponentWindow = (0, _lib.memoize)(function() {
                return !!window.name && "xcomponent" === window.name.split("__")[0];
            });
            var getComponentMeta = exports.getComponentMeta = (0, _lib.memoize)(function() {
                if (!window.name) throw new Error("Can not get component meta without window name");
                var _window$name$split2 = window.name.split("__"), zoidcomp = _window$name$split2[0], name = _window$name$split2[1], version = _window$name$split2[2], encodedOptions = _window$name$split2[3];
                if ("xcomponent" !== zoidcomp) throw new Error("Window not rendered by zoid - got " + zoidcomp);
                var str, componentMeta = void 0;
                try {
                    componentMeta = JSON.parse((str = encodedOptions, _hiBase2.default.decode(str.toUpperCase())));
                } catch (err) {
                    throw new Error("Can not decode component-meta: " + encodedOptions + " " + (0, _lib.stringifyError)(err));
                }
                componentMeta.name = name;
                componentMeta.version = version.replace(/_/g, ".");
                return componentMeta;
            });
            function getWindowByRef(_ref) {
                var ref = _ref.ref, uid = _ref.uid, distance = _ref.distance, result = void 0;
                ref === _constants.WINDOW_REFERENCES.OPENER ? result = (0, _src.getOpener)(window) : ref === _constants.WINDOW_REFERENCES.TOP ? result = (0, 
                _src.getTop)(window) : ref === _constants.WINDOW_REFERENCES.PARENT && (result = distance ? (0, 
                _src.getNthParentFromTop)(window, distance) : (0, _src.getParent)(window));
                if (ref === _constants.WINDOW_REFERENCES.GLOBAL) {
                    var ancestor = (0, _src.getAncestor)(window);
                    if (ancestor) {
                        var _iterator = (0, _src.getAllFramesInWindow)(ancestor), _isArray = Array.isArray(_iterator), _i = 0;
                        for (_iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                            var _ref2;
                            if (_isArray) {
                                if (_i >= _iterator.length) break;
                                _ref2 = _iterator[_i++];
                            } else {
                                if ((_i = _iterator.next()).done) break;
                                _ref2 = _i.value;
                            }
                            var frame = _ref2, global = (0, _lib.globalFor)(frame);
                            if (global && global.windows && global.windows[uid]) {
                                result = global.windows[uid];
                                break;
                            }
                        }
                    }
                }
                if (!result) throw new Error("Unable to find window by ref");
                return result;
            }
            exports.getParentComponentWindow = (0, _lib.memoize)(function() {
                var componentMeta = getComponentMeta();
                if (!componentMeta) throw new Error("Can not get parent component window - window not rendered by zoid");
                return getWindowByRef(componentMeta.componentParent);
            }), exports.getParentRenderWindow = (0, _lib.memoize)(function() {
                var componentMeta = getComponentMeta();
                if (!componentMeta) throw new Error("Can not get parent component window - window not rendered by zoid");
                return getWindowByRef(componentMeta.renderParent);
            });
        },
        "./src/constants.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            var ZOID = exports.ZOID = "zoid", PROP_TYPES = (exports.__ZOID__ = "__" + ZOID + "__", 
            exports.POST_MESSAGE = {
                INIT: ZOID + "_init",
                PROPS: ZOID + "_props",
                PROP_CALLBACK: ZOID + "_prop_callback",
                CLOSE: ZOID + "_close",
                CHECK_CLOSE: ZOID + "_check_close",
                REDIRECT: ZOID + "_redirect",
                RESIZE: ZOID + "_resize",
                ONRESIZE: ZOID + "_onresize",
                DELEGATE: ZOID + "_delegate",
                ALLOW_DELEGATE: ZOID + "_allow_delegate",
                ERROR: ZOID + "_error",
                HIDE: ZOID + "_hide",
                SHOW: ZOID + "_show"
            }, exports.PROP_TYPES = {
                STRING: "string",
                OBJECT: "object",
                FUNCTION: "function",
                BOOLEAN: "boolean",
                NUMBER: "number",
                ARRAY: "array"
            }), CONTEXT_TYPES = (exports.INITIAL_PROPS = {
                RAW: "raw",
                UID: "uid"
            }, exports.WINDOW_REFERENCES = {
                OPENER: "opener",
                TOP: "top",
                PARENT: "parent",
                GLOBAL: "global"
            }, exports.PROP_TYPES_LIST = Object.keys(PROP_TYPES).map(function(key) {
                return PROP_TYPES[key];
            }), exports.CONTEXT_TYPES = {
                IFRAME: "iframe",
                POPUP: "popup"
            });
            exports.CLASS_NAMES = {
                ZOID: "" + ZOID,
                OUTLET: ZOID + "-outlet",
                COMPONENT_FRAME: ZOID + "-component-frame",
                PRERENDER_FRAME: ZOID + "-prerender-frame",
                VISIBLE: ZOID + "-visible",
                INVISIBLE: ZOID + "-invisible"
            }, exports.EVENTS = {
                CLOSE: ZOID + "-close"
            }, exports.ATTRIBUTES = {
                IFRAME_PLACEHOLDER: "data-zoid-" + ZOID + "-placeholder"
            }, exports.ANIMATION_NAMES = {
                SHOW_CONTAINER: ZOID + "-show-container",
                SHOW_COMPONENT: ZOID + "-show-component",
                HIDE_CONTAINER: ZOID + "-hide-container",
                HIDE_COMPONENT: ZOID + "-hide-component"
            }, exports.EVENT_NAMES = {
                CLICK: "click"
            }, exports.CLOSE_REASONS = {
                PARENT_CALL: "parent_call",
                CHILD_CALL: "child_call",
                CLOSE_DETECTED: "close_detected",
                USER_CLOSED: "user_closed",
                PARENT_CLOSE_DETECTED: "parent_close_detected"
            }, exports.CONTEXT_TYPES_LIST = Object.keys(CONTEXT_TYPES).map(function(key) {
                return CONTEXT_TYPES[key];
            }), exports.DELEGATE = {
                CALL_ORIGINAL: "call_original",
                CALL_DELEGATE: "call_delegate"
            }, exports.WILDCARD = "*", exports.DEFAULT_DIMENSIONS = {
                WIDTH: 300,
                HEIGHT: 150
            };
        },
        "./src/drivers/angular.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.angular = void 0;
            var _lib = __webpack_require__("./src/lib/index.js");
            exports.angular = {
                global: function() {
                    return window.angular;
                },
                register: function(component, ng) {
                    return ng.module(component.tag, []).directive((0, _lib.dasherizeToCamel)(component.tag), function() {
                        var scope = {}, _iterator = component.getPropNames(), _isArray = Array.isArray(_iterator), _i = 0;
                        for (_iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                            var _ref;
                            if (_isArray) {
                                if (_i >= _iterator.length) break;
                                _ref = _iterator[_i++];
                            } else {
                                if ((_i = _iterator.next()).done) break;
                                _ref = _i.value;
                            }
                            scope[_ref] = "=";
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
                                        var _iterator2 = Object.keys(scope), _isArray2 = Array.isArray(_iterator2), _i2 = 0;
                                        for (_iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                                            var _ref2;
                                            if (_isArray2) {
                                                if (_i2 >= _iterator2.length) break;
                                                _ref2 = _iterator2[_i2++];
                                            } else {
                                                if ((_i2 = _iterator2.next()).done) break;
                                                _ref2 = _i2.value;
                                            }
                                            var key = _ref2;
                                            void 0 !== $scope[key] && (scopeProps[key] = $scope[key]);
                                        }
                                    }
                                    return scopeProps = (0, _lib.replaceObject)(scopeProps, {
                                        function: function(value) {
                                            return function() {
                                                var result = value.apply(this, arguments);
                                                !function() {
                                                    if ("$apply" !== $scope.$root.$$phase && "$digest" !== $scope.$root.$$phase) try {
                                                        $scope.$apply();
                                                    } catch (err) {}
                                                }();
                                                return result;
                                            };
                                        }
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
        "./src/drivers/angular2.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.angular2 = void 0;
            var _extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            }, _lib = __webpack_require__("./src/lib/index.js");
            exports.angular2 = {
                global: function() {},
                register: function(zoid, _ref) {
                    var AngularComponent = _ref.Component, NgModule = _ref.NgModule, ElementRef = _ref.ElementRef, NgZone = _ref.NgZone;
                    zoid.log("initializing angular2 component");
                    var getProps = function(component) {
                        return (0, _lib.replaceObject)(_extends({}, component.internalProps, component.props), {
                            function: function(value) {
                                if ("function" == typeof value) return function() {
                                    var _this = this, _arguments = arguments;
                                    return component.zone.run(function() {
                                        return value.apply(_this, _arguments);
                                    });
                                };
                            }
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
        "./src/drivers/ember.js": function(module, exports, __webpack_require__) {
            "use strict";
        },
        "./src/drivers/glimmer.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            var _extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            };
            exports.glimmer = {
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
                                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                            }(this, _class);
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
        "./src/drivers/index.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            var _script = __webpack_require__("./src/drivers/script.js");
            Object.keys(_script).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _script[key];
                    }
                });
            });
            var _react = __webpack_require__("./src/drivers/react.js");
            Object.keys(_react).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _react[key];
                    }
                });
            });
            var _vue = __webpack_require__("./src/drivers/vue.js");
            Object.keys(_vue).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _vue[key];
                    }
                });
            });
            var _angular = __webpack_require__("./src/drivers/angular.js");
            Object.keys(_angular).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _angular[key];
                    }
                });
            });
            var _ember = __webpack_require__("./src/drivers/ember.js");
            Object.keys(_ember).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _ember[key];
                    }
                });
            });
            var _glimmer = __webpack_require__("./src/drivers/glimmer.js");
            Object.keys(_glimmer).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _glimmer[key];
                    }
                });
            });
            var _angular2 = __webpack_require__("./src/drivers/angular2.js");
            Object.keys(_angular2).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _angular2[key];
                    }
                });
            });
        },
        "./src/drivers/react.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.react = void 0;
            var _lib = __webpack_require__("./src/lib/index.js");
            exports.react = {
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
                            var el = ReactDOM.findDOMNode(this), parent = component.init((0, _lib.extend)({}, this.props), null, el);
                            this.setState({
                                parent: parent
                            });
                            parent.render(el);
                        },
                        componentDidUpdate: function() {
                            this.state && this.state.parent && this.state.parent.updateProps((0, _lib.extend)({}, this.props));
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
                                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                            }(this, _class);
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
                            var el = ReactDOM.findDOMNode(this), parent = component.init((0, _lib.extend)({}, this.props), null, el);
                            this.setState({
                                parent: parent
                            });
                            parent.render(el);
                        };
                        _class.prototype.componentDidUpdate = function() {
                            this.state && this.state.parent && this.state.parent.updateProps((0, _lib.extend)({}, this.props));
                        };
                        return _class;
                    }(React.Component);
                    return component.react;
                }
            };
        },
        "./src/drivers/script.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            var script = exports.script = {
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
                        var _iterator = Array.prototype.slice.call(document.getElementsByTagName("script")), _isArray = Array.isArray(_iterator), _i = 0;
                        for (_iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                            var _ref;
                            if (_isArray) {
                                if (_i >= _iterator.length) break;
                                _ref = _iterator[_i++];
                            } else {
                                if ((_i = _iterator.next()).done) break;
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
        },
        "./src/drivers/vue.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.vue = void 0;
            var _lib = __webpack_require__("./src/lib/index.js");
            exports.vue = {
                global: function() {},
                register: function(component) {
                    return {
                        render: function(createElement) {
                            return createElement("div");
                        },
                        inheritAttrs: !1,
                        mounted: function() {
                            var el = this.$el;
                            this.parent = component.init((0, _lib.extend)({}, this.$attrs), null, el);
                            this.parent.render(el);
                        },
                        beforeUpdate: function() {
                            this.parent && this.$attrs && this.parent.updateProps((0, _lib.extend)({}, this.$attrs));
                        }
                    };
                }
            };
        },
        "./src/error.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.PopupOpenError = PopupOpenError;
            exports.IntegrationError = IntegrationError;
            exports.RenderError = RenderError;
            function PopupOpenError(message) {
                this.message = message;
            }
            PopupOpenError.prototype = Object.create(Error.prototype);
            function IntegrationError(message) {
                this.message = message;
            }
            IntegrationError.prototype = Object.create(Error.prototype);
            function RenderError(message) {
                this.message = message;
            }
            RenderError.prototype = Object.create(Error.prototype);
        },
        "./src/index.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            var _interface = __webpack_require__("./src/interface.js");
            Object.keys(_interface).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _interface[key];
                    }
                });
            });
            var INTERFACE = function(obj) {
                if (obj && obj.__esModule) return obj;
                var newObj = {};
                if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                newObj.default = obj;
                return newObj;
            }(_interface);
            exports.default = INTERFACE;
        },
        "./src/interface.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.CONSTANTS = exports.postRobot = exports.getCurrentScriptDir = void 0;
            exports.create = function(options) {
                return new _component.Component(options);
            };
            exports.getByTag = function(tag) {
                return _component.Component.getByTag(tag);
            };
            var _lib = __webpack_require__("./src/lib/index.js");
            Object.defineProperty(exports, "getCurrentScriptDir", {
                enumerable: !0,
                get: function() {
                    return _lib.getCurrentScriptDir;
                }
            });
            exports.destroyAll = function() {
                return _parent.ParentComponent.destroyAll();
            };
            var _error = __webpack_require__("./src/error.js");
            Object.keys(_error).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _error[key];
                    }
                });
            });
            __webpack_require__("./node_modules/zalgo-promise/src/index.js");
            var _postRobot = _interopRequireWildcard(__webpack_require__("./node_modules/post-robot/src/index.js")), _component = __webpack_require__("./src/component/index.js"), _parent = __webpack_require__("./src/component/parent/index.js"), _CONSTANTS = _interopRequireWildcard(__webpack_require__("./src/constants.js"));
            function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) return obj;
                var newObj = {};
                if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                newObj.default = obj;
                return newObj;
            }
            exports.postRobot = _postRobot, exports.CONSTANTS = _CONSTANTS;
        },
        "./src/lib/css.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.isPerc = isPerc;
            exports.isPx = isPx;
            exports.toNum = toNum;
            exports.toPx = toPx;
            exports.toCSS = function(val) {
                if ("number" == typeof val) return toPx(val);
                return isPerc(val) ? val : toPx(val);
            };
            exports.percOf = percOf;
            exports.normalizeDimension = function(dim, max) {
                if ("number" == typeof dim) return dim;
                if (isPerc(dim)) return percOf(max, dim);
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
            function percOf(num, perc) {
                return parseInt(num * toNum(perc) / 100, 10);
            }
        },
        "./src/lib/decorators.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.memoized = function(target, name, descriptor) {
                var method = descriptor.value;
                descriptor.value = function() {
                    this.__memoized__ = this.__memoized__ || {};
                    this.__memoized__.hasOwnProperty(name) || (this.__memoized__[name] = method.apply(this, arguments));
                    return this.__memoized__[name];
                };
                descriptor.value.displayName = name + ":memoized";
            };
            exports.promise = function(target, name, descriptor) {
                var method = descriptor.value;
                descriptor.value = function() {
                    return _src.ZalgoPromise.try(method, this, arguments);
                };
                descriptor.value.displayName = name + ":promisified";
            };
            var _src = __webpack_require__("./node_modules/zalgo-promise/src/index.js");
        },
        "./src/lib/dom.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.parseQuery = exports.documentReady = void 0;
            var _extends = Object.assign || function(target) {
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
            exports.appendChild = appendChild;
            exports.querySelectorAll = querySelectorAll;
            exports.getElementSafe = getElementSafe;
            exports.getElement = getElement;
            exports.isDocumentReady = isDocumentReady;
            exports.elementReady = function(id) {
                return new _src2.ZalgoPromise(function(resolve, reject) {
                    var name = (0, _util.stringify)(id), el = getElementSafe(id);
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
            exports.popup = function(url, options) {
                var params = Object.keys(options).map(function(key) {
                    if (options[key]) return key + "=" + (0, _util.stringify)(options[key]);
                }).filter(Boolean).join(","), win = void 0;
                try {
                    win = window.open(url, options.name, params, !0);
                } catch (err) {
                    throw new _error.PopupOpenError("Can not open popup window - " + (err.stack || err.message));
                }
                if ((0, _src.isWindowClosed)(win)) {
                    var err = new _error.PopupOpenError("Can not open popup window - blocked");
                    throw err;
                }
                return win;
            };
            exports.writeToWindow = writeToWindow;
            exports.writeElementToWindow = writeElementToWindow;
            exports.setStyle = setStyle;
            exports.createElement = createElement;
            exports.awaitFrameLoad = awaitFrameLoad;
            exports.awaitFrameWindow = function(frame) {
                if (frame.contentWindow) return _src2.ZalgoPromise.resolve(frame.contentWindow);
                return awaitFrameLoad(frame).then(function(loadedFrame) {
                    if (!loadedFrame.contentWindow) throw new Error("Could not find window in iframe");
                    return loadedFrame.contentWindow;
                });
            };
            exports.iframe = function() {
                var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, el = getElement(arguments[1]), attributes = options.attributes || {}, style = options.style || {}, frame = createElement("iframe", {
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
            exports.addEventListener = function(obj, event, handler) {
                obj.addEventListener(event, handler);
                return {
                    cancel: function() {
                        obj.removeEventListener(event, handler);
                    }
                };
            };
            exports.formatQuery = formatQuery;
            exports.extendQuery = extendQuery;
            exports.extendUrl = function(url) {
                var options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, query = options.query || {}, hash = options.hash || {}, originalUrl = void 0, originalHash = void 0, _url$split = url.split("#");
                originalUrl = _url$split[0];
                originalHash = _url$split[1];
                var _originalUrl$split = originalUrl.split("?");
                originalUrl = _originalUrl$split[0];
                var queryString = extendQuery(_originalUrl$split[1], query), hashString = extendQuery(originalHash, hash);
                queryString && (originalUrl = originalUrl + "?" + queryString);
                hashString && (originalUrl = originalUrl + "#" + hashString);
                return originalUrl;
            };
            exports.elementStoppedMoving = function(element) {
                var timeout = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 5e3;
                return new _src2.ZalgoPromise(function(resolve, reject) {
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
            exports.getCurrentDimensions = getCurrentDimensions;
            exports.changeStyle = function(el, styles) {
                return new _src2.ZalgoPromise(function(resolve) {
                    for (var _iterator3 = Object.keys(styles), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                        var _ref3;
                        if (_isArray3) {
                            if (_i3 >= _iterator3.length) break;
                            _ref3 = _iterator3[_i3++];
                        } else {
                            if ((_i3 = _iterator3.next()).done) break;
                            _ref3 = _i3.value;
                        }
                        var key = _ref3;
                        el.style[key] = styles[key];
                    }
                    setTimeout(resolve, 1);
                });
            };
            exports.setOverflow = function(el) {
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
            exports.trackDimensions = trackDimensions;
            exports.onDimensionsChange = function(el, _ref6) {
                var _ref6$width = _ref6.width, width = void 0 === _ref6$width || _ref6$width, _ref6$height = _ref6.height, height = void 0 === _ref6$height || _ref6$height, _ref6$delay = _ref6.delay, delay = void 0 === _ref6$delay ? 50 : _ref6$delay, _ref6$threshold = _ref6.threshold, threshold = void 0 === _ref6$threshold ? 0 : _ref6$threshold;
                return new _src2.ZalgoPromise(function(resolve) {
                    var tracker = trackDimensions(el, {
                        width: width,
                        height: height,
                        threshold: threshold
                    }), interval = void 0, resolver = (0, _fn.debounce)(function(dimensions) {
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
            exports.dimensionsMatchViewport = function(el, _ref7) {
                var width = _ref7.width, height = _ref7.height, dimensions = getCurrentDimensions(el);
                if (width && dimensions.width !== window.innerWidth) return !1;
                if (height && dimensions.height !== window.innerHeight) return !1;
                return !0;
            };
            exports.bindEvents = bindEvents;
            exports.setVendorCSS = setVendorCSS;
            exports.animate = animate;
            exports.makeElementVisible = function(element) {
                element.style.setProperty("visibility", "");
            };
            exports.makeElementInvisible = function(element) {
                element.style.setProperty("visibility", STYLE.VISIBILITY.HIDDEN, STYLE.IMPORTANT);
            };
            exports.showElement = showElement;
            exports.hideElement = hideElement;
            exports.destroyElement = function(element) {
                element.parentNode && element.parentNode.removeChild(element);
            };
            exports.showAndAnimate = function(element, name, clean) {
                var animation = animate(element, name, clean);
                showElement(element);
                return animation;
            };
            exports.animateAndHide = function(element, name, clean) {
                return animate(element, name, clean).then(function() {
                    hideElement(element);
                });
            };
            exports.addClass = function(element, name) {
                element.classList ? element.classList.add(name) : -1 === element.className.split(/\s+/).indexOf(name) && (element.className += " " + name);
            };
            exports.removeClass = function(element, name) {
                element.classList ? element.classList.remove(name) : -1 !== element.className.split(/\s+/).indexOf(name) && (element.className = element.className.replace(name, ""));
            };
            exports.getCurrentScriptDir = function() {
                console.warn("Do not use zoid.getCurrentScriptDir() in production -- browser support is limited");
                if (document.currentScript) return document.currentScript.src.split("/").slice(0, -1).join("/");
                return ".";
            };
            exports.getElementName = function(element) {
                if ("string" == typeof element) return element;
                if (!element || !element.tagName) return "<unknown>";
                var name = element.tagName.toLowerCase();
                element.id ? name += "#" + element.id : element.className && (name += "." + element.className.split(" ").join("."));
                return name;
            };
            exports.isElementClosed = isElementClosed;
            exports.watchElementForClose = function(element, handler) {
                handler = (0, _fn.once)(handler);
                var interval = void 0;
                isElementClosed(element) ? handler() : interval = (0, _util.safeInterval)(function() {
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
            exports.getHttpType = getHttpType;
            exports.getHTML = getHTML;
            exports.getCSS = function(url) {
                return getHttpType("text/css", url);
            };
            exports.getScript = function(url) {
                return getHttpType("*/*", url);
            };
            exports.prefetchPage = function(url) {
                return getHTML(url);
            };
            exports.fixScripts = fixScripts;
            exports.jsxDom = function(element, props) {
                for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) children[_key - 2] = arguments[_key];
                if ("function" == typeof element) return element(props, children);
                var name = element.toLowerCase(), doc = this && this.createElement ? this : window.document, el = doc.createElement(name);
                for (var prop in props) if (prop in JSX_EVENTS) el.addEventListener(JSX_EVENTS[prop], props[prop]); else if ("innerHTML" === prop) {
                    el.innerHTML = props[prop];
                    fixScripts(el, doc);
                } else el.setAttribute(prop, props[prop]);
                var content = children[0], remaining = children.slice(1);
                if ("style" === name) {
                    if ("string" != typeof content) throw new TypeError("Expected " + name + " tag content to be string, got " + (void 0 === content ? "undefined" : _typeof(content)));
                    if (remaining.length) throw new Error("Expected only text content for " + name + " tag");
                    setStyle(el, content, doc);
                } else if ("iframe" === name) {
                    if (remaining.length) throw new Error("Expected only single child node for iframe");
                    el.addEventListener("load", function() {
                        var win = el.contentWindow;
                        if (!win) throw new Error("Expected frame to have contentWindow");
                        "string" == typeof content ? writeToWindow(win, content) : writeElementToWindow(win, content);
                    });
                } else if ("script" === name) {
                    if ("string" != typeof content) throw new TypeError("Expected " + name + " tag content to be string, got " + (void 0 === content ? "undefined" : _typeof(content)));
                    if (remaining.length) throw new Error("Expected only text content for " + name + " tag");
                    el.text = content;
                } else for (var i = 0; i < children.length; i++) if ("string" == typeof children[i]) {
                    var textNode = document.createTextNode(children[i]);
                    appendChild(el, textNode);
                } else appendChild(el, children[i]);
                return el;
            };
            var _src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), _src2 = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), _src3 = __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/index.js"), _error = __webpack_require__("./src/error.js"), _fn = __webpack_require__("./src/lib/fn.js"), _util = __webpack_require__("./src/lib/util.js");
            function appendChild(container, child) {
                container.appendChild(child);
            }
            function querySelectorAll(el, selector) {
                return Array.prototype.slice.call(el.querySelectorAll(selector));
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
                throw new Error("Can not find element: " + (0, _util.stringify)(id));
            }
            exports.documentReady = new _src2.ZalgoPromise(function(resolve) {
                if ("complete" === window.document.readyState) return resolve(window.document);
                var interval = setInterval(function() {
                    if ("complete" === window.document.readyState) {
                        clearInterval(interval);
                        return resolve(window.document);
                    }
                }, 10);
            });
            function isDocumentReady() {
                return "complete" === window.document.readyState;
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
                options.style && (0, _util.extend)(element.style, options.style);
                options.class && (element.className = options.class.join(" "));
                if (options.attributes) {
                    var _iterator = Object.keys(options.attributes), _isArray = Array.isArray(_iterator), _i = 0;
                    for (_iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                        var _ref;
                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref = _iterator[_i++];
                        } else {
                            if ((_i = _iterator.next()).done) break;
                            _ref = _i.value;
                        }
                        var key = _ref;
                        element.setAttribute(key, options.attributes[key]);
                    }
                }
                options.styleSheet && setStyle(element, options.styleSheet);
                container && appendChild(container, element);
                if (options.html) if ("iframe" === tag) {
                    if (!container || !element.contentWindow) throw new Error("Iframe html can not be written unless container provided and iframe in DOM");
                    writeToWindow(element.contentWindow, options.html);
                } else element.innerHTML = options.html;
                return element;
            }
            var awaitFrameLoadPromises = new _src3.WeakMap();
            function awaitFrameLoad(frame) {
                if (awaitFrameLoadPromises.has(frame)) {
                    var _promise = awaitFrameLoadPromises.get(frame);
                    if (_promise) return _promise;
                }
                var promise = new _src2.ZalgoPromise(function(resolve, reject) {
                    frame.addEventListener("load", function() {
                        (0, _src.linkFrameWindow)(frame);
                        resolve(frame);
                    });
                    frame.addEventListener("error", function(err) {
                        frame.contentWindow ? resolve(frame) : reject(err);
                    });
                });
                awaitFrameLoadPromises.set(frame, promise);
                return promise;
            }
            var parseQuery = exports.parseQuery = (0, _fn.memoize)(function(queryString) {
                var params = {};
                if (!queryString) return params;
                if (-1 === queryString.indexOf("=")) throw new Error("Can not parse query string params: " + queryString);
                var _iterator2 = queryString.split("&"), _isArray2 = Array.isArray(_iterator2), _i2 = 0;
                for (_iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                    var _ref2;
                    if (_isArray2) {
                        if (_i2 >= _iterator2.length) break;
                        _ref2 = _iterator2[_i2++];
                    } else {
                        if ((_i2 = _iterator2.next()).done) break;
                        _ref2 = _i2.value;
                    }
                    var pair = _ref2;
                    (pair = pair.split("="))[0] && pair[1] && (params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]));
                }
                return params;
            });
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
            function getCurrentDimensions(el) {
                return {
                    width: el.offsetWidth,
                    height: el.offsetHeight
                };
            }
            function trackDimensions(el, _ref5) {
                var _ref5$width = _ref5.width, width = void 0 === _ref5$width || _ref5$width, _ref5$height = _ref5.height, height = void 0 === _ref5$height || _ref5$height, _ref5$threshold = _ref5.threshold, threshold = void 0 === _ref5$threshold ? 0 : _ref5$threshold, currentDimensions = getCurrentDimensions(el);
                return {
                    check: function() {
                        var newDimensions = getCurrentDimensions(el);
                        return {
                            changed: function(one, two, _ref4) {
                                var _ref4$width = _ref4.width, width = void 0 === _ref4$width || _ref4$width, _ref4$height = _ref4.height, height = void 0 === _ref4$height || _ref4$height, _ref4$threshold = _ref4.threshold, threshold = void 0 === _ref4$threshold ? 0 : _ref4$threshold;
                                return !!(width && Math.abs(one.width - two.width) > threshold) || !!(height && Math.abs(one.height - two.height) > threshold);
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
                handler = (0, _fn.once)(handler);
                var _iterator4 = eventNames, _isArray4 = Array.isArray(_iterator4), _i4 = 0;
                for (_iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator](); ;) {
                    var _ref8;
                    if (_isArray4) {
                        if (_i4 >= _iterator4.length) break;
                        _ref8 = _iterator4[_i4++];
                    } else {
                        if ((_i4 = _iterator4.next()).done) break;
                        _ref8 = _i4.value;
                    }
                    var eventName = _ref8;
                    element.addEventListener(eventName, handler);
                }
                return {
                    cancel: (0, _fn.once)(function() {
                        var _iterator5 = eventNames, _isArray5 = Array.isArray(_iterator5), _i5 = 0;
                        for (_iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator](); ;) {
                            var _ref9;
                            if (_isArray5) {
                                if (_i5 >= _iterator5.length) break;
                                _ref9 = _iterator5[_i5++];
                            } else {
                                if ((_i5 = _iterator5.next()).done) break;
                                _ref9 = _i5.value;
                            }
                            var eventName = _ref9;
                            element.removeEventListener(eventName, handler);
                        }
                    })
                };
            }
            var VENDOR_PREFIXES = [ "webkit", "moz", "ms", "o" ];
            function setVendorCSS(element, name, value) {
                element.style[name] = value;
                var capitalizedName = (0, _util.capitalizeFirstLetter)(name), _iterator6 = VENDOR_PREFIXES, _isArray6 = Array.isArray(_iterator6), _i6 = 0;
                for (_iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator](); ;) {
                    var _ref10;
                    if (_isArray6) {
                        if (_i6 >= _iterator6.length) break;
                        _ref10 = _iterator6[_i6++];
                    } else {
                        if ((_i6 = _iterator6.next()).done) break;
                        _ref10 = _i6.value;
                    }
                    var prefix = _ref10;
                    element.style["" + prefix + capitalizedName] = value;
                }
            }
            var CSSRule = window.CSSRule, KEYFRAMES_RULE = CSSRule.KEYFRAMES_RULE || CSSRule.WEBKIT_KEYFRAMES_RULE || CSSRule.MOZ_KEYFRAMES_RULE || CSSRule.O_KEYFRAMES_RULE || CSSRule.MS_KEYFRAMES_RULE;
            var ANIMATION_START_EVENTS = [ "animationstart", "webkitAnimationStart", "oAnimationStart", "MSAnimationStart" ], ANIMATION_END_EVENTS = [ "animationend", "webkitAnimationEnd", "oAnimationEnd", "MSAnimationEnd" ];
            function animate(element, name, clean) {
                var timeout = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1e3;
                return new _src2.ZalgoPromise(function(resolve, reject) {
                    var el = getElement(element);
                    if (!el || !function(element, name) {
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
            function getHttpType(contentType, url) {
                return new _src2.ZalgoPromise(function(resolve, reject) {
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
            var JSX_EVENTS = {
                onClick: "click"
            };
            function fixScripts(el) {
                var doc = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window.document, _iterator7 = querySelectorAll(el, "script"), _isArray7 = Array.isArray(_iterator7), _i7 = 0;
                for (_iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator](); ;) {
                    var _ref11;
                    if (_isArray7) {
                        if (_i7 >= _iterator7.length) break;
                        _ref11 = _iterator7[_i7++];
                    } else {
                        if ((_i7 = _iterator7.next()).done) break;
                        _ref11 = _i7.value;
                    }
                    var script = _ref11, newScript = doc.createElement("script");
                    newScript.text = script.textContent;
                    script.parentNode.replaceChild(newScript, script);
                }
            }
        },
        "./src/lib/fn.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.noop = function() {};
            exports.once = function(method) {
                var called = !1, result = void 0;
                return function() {
                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                    if (called) return result;
                    called = !0;
                    return result = method.apply(this, arguments);
                };
            };
            exports.memoize = function(method) {
                var results = {};
                return function() {
                    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
                    var cacheKey = void 0;
                    try {
                        cacheKey = JSON.stringify(Array.prototype.slice.call(arguments), function(key, val) {
                            return "function" == typeof val ? "zoid:memoize[" + (0, _util.getObjectID)(val) + "]" : val;
                        });
                    } catch (err) {
                        throw new Error("Arguments not serializable -- can not be used to memoize");
                    }
                    results.hasOwnProperty(cacheKey) || (results[cacheKey] = method.apply(this, arguments));
                    return results[cacheKey];
                };
            };
            exports.debounce = function(method) {
                var time = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100, timeout = void 0;
                return function() {
                    var _this = this, _arguments = arguments;
                    clearTimeout(timeout);
                    timeout = setTimeout(function() {
                        return method.apply(_this, _arguments);
                    }, time);
                };
            };
            exports.serializeFunctions = function(obj) {
                return (0, _util.replaceObject)(obj, {
                    function: function() {
                        return {
                            __type__: "__function__"
                        };
                    }
                });
            };
            exports.deserializeFunctions = function(obj, handler) {
                return (0, _util.replaceObject)(obj, {
                    object: function(value, key, fullKey) {
                        if (value && "__function__" === value.__type__) return function() {
                            return handler({
                                key: key,
                                fullKey: fullKey,
                                self: this,
                                args: arguments
                            });
                        };
                    }
                });
            };
            var _util = __webpack_require__("./src/lib/util.js");
        },
        "./src/lib/global.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.global = void 0;
            exports.globalFor = globalFor;
            exports.localGlobal = localGlobal;
            var _src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), _constants = __webpack_require__("./src/constants.js");
            function globalFor(win) {
                if ((0, _src.isSameDomain)(win)) {
                    win[_constants.__ZOID__] || (win[_constants.__ZOID__] = {});
                    return win[_constants.__ZOID__];
                }
            }
            function localGlobal() {
                var global = globalFor(window);
                if (!global) throw new Error("Could not get local global");
                return global;
            }
            exports.global = localGlobal();
        },
        "./src/lib/index.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            var _dom = __webpack_require__("./src/lib/dom.js");
            Object.keys(_dom).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _dom[key];
                    }
                });
            });
            var _fn = __webpack_require__("./src/lib/fn.js");
            Object.keys(_fn).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _fn[key];
                    }
                });
            });
            var _util = __webpack_require__("./src/lib/util.js");
            Object.keys(_util).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _util[key];
                    }
                });
            });
            var _css = __webpack_require__("./src/lib/css.js");
            Object.keys(_css).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _css[key];
                    }
                });
            });
            var _decorators = __webpack_require__("./src/lib/decorators.js");
            Object.keys(_decorators).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _decorators[key];
                    }
                });
            });
            var _logger = __webpack_require__("./src/lib/logger.js");
            Object.keys(_logger).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _logger[key];
                    }
                });
            });
            var _global = __webpack_require__("./src/lib/global.js");
            Object.keys(_global).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _global[key];
                    }
                });
            });
        },
        "./src/lib/logger.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            exports.setLogLevel = function(logLevel) {
                if (-1 === _client.logLevels.indexOf(logLevel)) throw new Error("Invalid logLevel: " + logLevel);
                _client.config.logLevel = logLevel;
                _src.CONFIG.LOG_LEVEL = logLevel;
                window.LOG_LEVEL = logLevel;
            };
            exports.info = function(name, event) {
                var payload = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                (0, _client.info)("xc_" + name + "_" + event, payload);
            };
            exports.warn = function(name, event) {
                var payload = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                (0, _client.warn)("xc_" + name + "_" + event, payload);
            };
            exports.error = function(name, event) {
                var payload = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                (0, _client.error)("xc_" + name + "_" + event, payload);
            };
            var _src = __webpack_require__("./node_modules/post-robot/src/index.js"), _client = __webpack_require__("./node_modules/beaver-logger/client/index.js");
        },
        "./src/lib/util.js": function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = !0;
            var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            exports.urlEncode = function(str) {
                return str.replace(/\?/g, "%3F").replace(/&/g, "%26").replace(/#/g, "%23").replace(/\+/g, "%2B");
            };
            exports.camelToDasherize = function(string) {
                return string.replace(/([A-Z])/g, function(g) {
                    return "-" + g.toLowerCase();
                });
            };
            exports.dasherizeToCamel = function(string) {
                return string.replace(/-([a-z])/g, function(g) {
                    return g[1].toUpperCase();
                });
            };
            exports.extend = function(obj, source) {
                if (!source) return obj;
                for (var key in source) source.hasOwnProperty(key) && (obj[key] = source[key]);
                return obj;
            };
            exports.values = function(obj) {
                var results = [];
                for (var key in obj) obj.hasOwnProperty(key) && results.push(obj[key]);
                return results;
            };
            exports.uniqueID = uniqueID;
            exports.stringifyWithFunctions = function(obj) {
                return JSON.stringify(obj, function(key, val) {
                    return "function" == typeof val ? val.toString() : val;
                });
            };
            exports.safeGet = function(obj, prop) {
                var result = void 0;
                try {
                    result = obj[prop];
                } catch (err) {}
                return result;
            };
            exports.capitalizeFirstLetter = function(string) {
                return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
            };
            exports.get = function(item, path, def) {
                if (!path) return def;
                for (var pathParts = path.split("."), i = 0; i < pathParts.length; i++) {
                    if ("object" !== (void 0 === item ? "undefined" : _typeof(item)) || null === item) return def;
                    item = item[pathParts[i]];
                }
                return void 0 === item ? def : item;
            };
            exports.safeInterval = safeInterval;
            exports.safeTimeout = function(method, time) {
                var interval = safeInterval(function() {
                    if ((time -= 100) <= 0) {
                        interval.cancel();
                        method();
                    }
                }, 100);
            };
            exports.each = function(item, callback) {
                if (!item) return;
                if (Array.isArray(item)) for (var len = item.length, i = 0; i < len; i++) callback(item[i], i); else if ("object" === (void 0 === item ? "undefined" : _typeof(item))) for (var keys = Object.keys(item), _len = keys.length, _i = 0; _i < _len; _i++) {
                    var key = keys[_i];
                    callback(item[key], key);
                }
            };
            exports.replaceObject = function replaceObject(item, replacers) {
                var fullKey = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
                if (Array.isArray(item)) {
                    var _ret = function() {
                        for (var length = item.length, result = [], _loop = function(i) {
                            Object.defineProperty(result, i, {
                                configurable: !0,
                                enumerable: !0,
                                get: function() {
                                    var itemKey = fullKey ? fullKey + "." + i : "" + i, child = item[i], type = void 0 === child ? "undefined" : _typeof(child), replacer = replacers[type];
                                    if (replacer) {
                                        var replaced = replacer(child, i, itemKey);
                                        if (void 0 !== replaced) {
                                            result[i] = replaced;
                                            return result[i];
                                        }
                                    }
                                    if ("object" === (void 0 === child ? "undefined" : _typeof(child)) && null !== child) {
                                        result[i] = replaceObject(child, replacers, itemKey);
                                        return result[i];
                                    }
                                    result[i] = child;
                                    return result[i];
                                },
                                set: function(value) {
                                    delete result[i];
                                    result[i] = value;
                                }
                            });
                        }, i = 0; i < length; i++) _loop(i);
                        return {
                            v: result
                        };
                    }();
                    if ("object" === (void 0 === _ret ? "undefined" : _typeof(_ret))) return _ret.v;
                } else {
                    if ("object" !== (void 0 === item ? "undefined" : _typeof(item)) || null === item) throw new Error("Pass an object or array");
                    var _ret3 = function() {
                        var result = {}, _loop2 = function(key) {
                            if (!item.hasOwnProperty(key)) return "continue";
                            Object.defineProperty(result, key, {
                                configurable: !0,
                                enumerable: !0,
                                get: function() {
                                    var itemKey = fullKey ? fullKey + "." + key : "" + key, child = item[key], type = void 0 === child ? "undefined" : _typeof(child), replacer = replacers[type];
                                    if (replacer) {
                                        var replaced = replacer(child, key, itemKey);
                                        if (void 0 !== replaced) {
                                            result[key] = replaced;
                                            return result[key];
                                        }
                                    }
                                    if ("object" === (void 0 === child ? "undefined" : _typeof(child)) && null !== child) {
                                        result[key] = replaceObject(child, replacers, itemKey);
                                        return result[key];
                                    }
                                    result[key] = child;
                                    return result[key];
                                },
                                set: function(value) {
                                    delete result[key];
                                    result[key] = value;
                                }
                            });
                        };
                        for (var key in item) _loop2(key);
                        return {
                            v: result
                        };
                    }();
                    if ("object" === (void 0 === _ret3 ? "undefined" : _typeof(_ret3))) return _ret3.v;
                }
            };
            exports.copyProp = function(source, target, name, def) {
                if (source.hasOwnProperty(name)) {
                    var descriptor = Object.getOwnPropertyDescriptor(source, name);
                    Object.defineProperty(target, name, descriptor);
                } else target[name] = def;
            };
            exports.dotify = function dotify(obj) {
                var prefix = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
                var newobj = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                prefix = prefix ? prefix + "." : prefix;
                for (var key in obj) void 0 !== obj[key] && null !== obj[key] && "function" != typeof obj[key] && (obj[key] && Array.isArray(obj[key]) && obj[key].length && obj[key].every(function(val) {
                    return "object" !== (void 0 === val ? "undefined" : _typeof(val));
                }) ? newobj["" + prefix + key] = obj[key].join(",") : obj[key] && "object" === _typeof(obj[key]) ? newobj = dotify(obj[key], "" + prefix + key, newobj) : newobj["" + prefix + key] = obj[key].toString());
                return newobj;
            };
            exports.getObjectID = function(obj) {
                if (null === obj || void 0 === obj || "object" !== (void 0 === obj ? "undefined" : _typeof(obj)) && "function" != typeof obj) throw new Error("Invalid object");
                var uid = objectIDs.get(obj);
                if (!uid) {
                    uid = (void 0 === obj ? "undefined" : _typeof(obj)) + ":" + uniqueID();
                    objectIDs.set(obj, uid);
                }
                return uid;
            };
            exports.regex = regex;
            exports.regexAll = function(pattern, string) {
                var matches = [], start = 0;
                for (;;) {
                    var match = regex(pattern, string, start);
                    if (!match) break;
                    matches.push(match);
                    start = match.end;
                }
                return matches;
            };
            exports.count = function(str, substr) {
                var startIndex = 0, itemCount = 0;
                for (;;) {
                    var index = str.indexOf(substr, startIndex);
                    if (-1 === index) break;
                    startIndex = index;
                    itemCount += 1;
                }
                return itemCount;
            };
            exports.stringify = stringify;
            exports.stringifyError = function(err) {
                if (err) {
                    var stack = err.stack, message = err.message;
                    if ("string" == typeof stack) return stack;
                    if ("string" == typeof message) return message;
                }
                return stringify(err);
            };
            exports.eventEmitter = function() {
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
                                if ((_i2 = _iterator.next()).done) break;
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
            };
            exports.isDefined = function(value) {
                return null !== value && void 0 !== value;
            };
            exports.cycle = function cycle(method) {
                return _src.ZalgoPromise.try(method).then(function() {
                    return cycle(method);
                });
            };
            exports.promisify = function(method) {
                return function() {
                    var _this = this, _arguments = arguments;
                    return _src.ZalgoPromise.try(function() {
                        return method.apply(_this, _arguments);
                    });
                };
            };
            var _src = __webpack_require__("./node_modules/zalgo-promise/src/index.js");
            function uniqueID() {
                var chars = "0123456789abcdef";
                return "xxxxxxxxxx".replace(/./g, function() {
                    return chars.charAt(Math.floor(Math.random() * chars.length));
                });
            }
            function safeInterval(method, time) {
                var timeout = void 0;
                timeout = setTimeout(function runInterval() {
                    timeout = setTimeout(runInterval, time);
                    method.call();
                }, time);
                return {
                    cancel: function() {
                        clearTimeout(timeout);
                    }
                };
            }
            var objectIDs = new (__webpack_require__("./node_modules/cross-domain-safe-weakmap/src/index.js").WeakMap)();
            function regex(pattern, string) {
                var start = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
                "string" == typeof pattern && (pattern = new RegExp(pattern));
                var result = string.slice(start).match(pattern);
                if (result) {
                    var index = result.index, match = result[0];
                    return {
                        text: match,
                        groups: result.slice(1),
                        start: start + index,
                        end: start + index + match.length,
                        length: match.length,
                        replace: function(text) {
                            return match ? "" + match.slice(0, start + index) + text + match.slice(index + match.length) : "";
                        }
                    };
                }
            }
            function stringify(item) {
                return "string" == typeof item ? item : item && "function" == typeof item.toString ? item.toString() : Object.prototype.toString.call(item);
            }
        },
        "./src/types.js": function(module, exports, __webpack_require__) {
            "use strict";
        }
    });
});
//# sourceMappingURL=zoid.js.map
//# sourceMappingURL=zoid.js.map