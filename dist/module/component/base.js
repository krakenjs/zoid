'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BaseComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _src = require('zalgo-promise/src');

var _src2 = require('post-robot/src');

require('cross-domain-utils/src');

var _lib = require('../lib');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function cleanup(obj) {

    var tasks = [];
    var cleaned = false;

    return {
        set: function set(name, item) {

            if (cleaned) {
                return item;
            }

            obj[name] = item;
            this.register(function () {
                delete obj[name];
            });
            return item;
        },
        register: function register(name, method) {

            if (typeof name === 'function') {
                method = name;
                name = '<anonymous-cleanup-handler>';
            }

            if (typeof method !== 'function') {
                throw new TypeError('Expected to be passed function to clean.register');
            }

            if (cleaned) {
                method();
                return;
            }

            tasks.push({
                complete: false,

                name: name,

                run: function run() {

                    if (this.complete) {
                        return;
                    }

                    this.complete = true;

                    if (method) {
                        method();
                    }
                }
            });
        },
        hasTasks: function hasTasks() {
            return Boolean(tasks.filter(function (item) {
                return !item.complete;
            }).length);
        },
        all: function all() {
            var results = [];

            cleaned = true;

            while (tasks.length) {
                results.push(tasks.pop().run());
            }

            return _src.ZalgoPromise.all(results).then(function () {/* pass */});
        },
        run: function run(name) {
            var results = [];

            for (var _iterator = tasks, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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

                if (item.name === name) {
                    results.push(item.run());
                }
            }

            return _src.ZalgoPromise.all(results).then(_lib.noop);
        }
    };
}

/*  Base Component
    --------------

    Methods that are common between child and parent components, but are not generic or uncoupled enough to live in
    a separate library.
*/

var BaseComponent = exports.BaseComponent = function () {
    function BaseComponent() {
        _classCallCheck(this, BaseComponent);

        this.clean = cleanup(this);
        this.event = (0, _lib.eventEmitter)();
    }

    _createClass(BaseComponent, [{
        key: 'addProp',
        value: function addProp(options, name, def) {
            (0, _lib.copyProp)(options, this, name, def);
        }
    }, {
        key: 'on',
        value: function on(eventName, handler) {
            return this.event.on(eventName, handler);
        }
    }, {
        key: 'listeners',
        value: function listeners() {
            throw new Error('Expected listeners to be implemented');
        }
    }, {
        key: 'error',
        value: function error(err) {
            throw new Error('Expected error to be implemented - got ' + (0, _lib.stringifyError)(err));
        }

        /*  Listen
            ------
             Listen for any post messages defined in this.listeners(). All (most) of our communication is done via
            post-messages, so this sets up an easy way to create a collection of listeners in one go.
             All post-messaging is done using post-robot.
        */

    }, {
        key: 'listen',
        value: function listen(win, domain) {
            var _this = this;

            if (!win) {
                throw this.component.createError('window to listen to not set');
            }

            if (!domain) {
                throw new Error('Must pass domain to listen to');
            }

            if (!this.listeners) {
                return;
            }

            var listeners = this.listeners();

            var _loop = function _loop() {
                if (_isArray2) {
                    if (_i2 >= _iterator2.length) return 'break';
                    _ref2 = _iterator2[_i2++];
                } else {
                    _i2 = _iterator2.next();
                    if (_i2.done) return 'break';
                    _ref2 = _i2.value;
                }

                var listenerName = _ref2;


                var name = listenerName.replace(/^zoid_/, '');

                var errorHandler = function errorHandler(err) {
                    _this.error(err);
                };

                var listener = (0, _src2.on)(listenerName, { window: win, domain: domain, errorHandler: errorHandler }, function (_ref3) {
                    var source = _ref3.source,
                        data = _ref3.data;

                    _this.component.log('listener_' + name);
                    return listeners[listenerName].call(_this, source, data);
                });

                var errorListener = (0, _src2.on)(listenerName, { window: win, errorHandler: errorHandler }, function (_ref4) {
                    var origin = _ref4.origin;

                    _this.component.logError('unexpected_listener_' + name, { origin: origin, domain: domain.toString() });
                    _this.error(new Error('Unexpected ' + name + ' message from domain ' + origin + ' -- expected message from ' + domain.toString()));
                });

                _this.clean.register(function () {
                    listener.cancel();
                    errorListener.cancel();
                });
            };

            for (var _iterator2 = Object.keys(listeners), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                var _ref2;

                var _ret = _loop();

                if (_ret === 'break') break;
            }
        }
    }]);

    return BaseComponent;
}();