'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Component = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class;
/* eslint max-lines: 0 */

var _src = require('post-robot/src');

var _src2 = require('zalgo-promise/src');

var _src3 = require('cross-domain-utils/src');

var _base = require('../base');

var _child = require('../child');

var _parent = require('../parent');

var _delegate = require('../delegate');

var _window = require('../window');

var _constants = require('../../constants');

var _index = require('../../drivers/index');

var _lib = require('../../lib');

var _validate = require('./validate');

var _templates = require('./templates');

var _props = require('./props');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

var drivers = { angular: _index.angular, angular2: _index.angular2, glimmer: _index.glimmer, react: _index.react, vue: _index.vue, script: _index.script };

/*  Component
    ---------

    This is the spec for the component. The idea is, when I call xcomponent.create(), it will create a new instance
    of Component with the blueprint needed to set up ParentComponents and ChildComponents.

    This is the one portion of code which is required by -- and shared to -- both the parent and child windows, and
    contains all of the configuration needed for them to set themselves up.
*/

var Component = exports.Component = (_class = function (_BaseComponent) {
    _inherits(Component, _BaseComponent);

    function Component(options) {
        _classCallCheck(this, Component);

        var _this = _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).call(this));

        (0, _validate.validate)(options);

        // The tag name of the component. Used by some drivers (e.g. angular) to turn the component into an html element,
        // e.g. <my-component>

        _this.addProp(options, 'tag');

        _this.addProp(options, 'defaultLogLevel', 'info');

        _this.addProp(options, 'allowedParentDomains', _constants.WILDCARD);

        // initially set log level to default log level configured when creating component
        (0, _lib.setLogLevel)(_this.defaultLogLevel);

        if (Component.components[_this.tag]) {
            throw new Error('Can not register multiple components with the same tag');
        }

        // Name of the component, used for logging. Auto-generated from the tag name by default.

        _this.addProp(options, 'name', _this.tag.replace(/-/g, '_'));

        // A json based spec describing what kind of props the component accepts. This is used to validate any props before
        // they are passed down to the child.

        _this.builtinProps = (0, _props.getInternalProps)();
        _this.props = options.props || {};

        if (!options.props) {
            _this.looseProps = true;
        }

        // The dimensions of the component, e.g. { width: '300px', height: '150px' }

        _this.addProp(options, 'dimensions');
        _this.addProp(options, 'scrolling');
        _this.addProp(options, 'listenForResize');

        _this.addProp(options, 'version', 'latest');

        // The default environment we should render to if none is specified in the parent

        _this.addProp(options, 'defaultEnv');

        // A mapping of env->url, used to determine which url to load for which env

        _this.addProp(options, 'buildUrl');

        _this.addProp(options, 'url');
        _this.addProp(options, 'domain');

        _this.addProp(options, 'bridgeUrl');
        _this.addProp(options, 'bridgeDomain');

        _this.addProp(options, 'attributes', {});

        // A url to use by default to render the component, if not using envs


        // The allowed contexts. For example { iframe: true, popup: false }

        _this.addProp(options, 'contexts', { iframe: true, popup: false });

        // The default context to render to

        _this.addProp(options, 'defaultContext');

        // Auto Resize option

        _this.addProp(options, 'autoResize', false);

        // Templates and styles for the parent page and the initial rendering of the component

        _this.addProp(options, 'containerTemplate', _templates.defaultContainerTemplate);
        _this.addProp(options, 'prerenderTemplate', _templates.defaultPrerenderTemplate);

        // Validation

        _this.addProp(options, 'validate');

        // Security

        _this.addProp(options, 'unsafeRenderTo', false);

        // A mapping of tag->component so we can reference components by string tag name

        Component.components[_this.tag] = _this;

        // Register all of the drivers for instantiating components. The model used is -- there's a standard javascript
        // way of rendering a component, then each other technology (e.g. react) needs to hook into that interface.
        // This makes us a little more pluggable and loosely coupled.
        _this.registerDrivers();
        _this.registerChild();
        _this.listenDelegate();
        return _this;
    }

    _createClass(Component, [{
        key: 'getPropNames',
        value: function getPropNames() {
            var props = Object.keys(this.props);

            for (var _iterator = Object.keys(this.builtinProps), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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

                if (props.indexOf(key) === -1) {
                    props.push(key);
                }
            }

            return props;
        }

        // $FlowFixMe

    }, {
        key: 'getProp',
        value: function getProp(name) {
            // $FlowFixMe
            return this.props[name] || this.builtinProps[name];
        }
    }, {
        key: 'registerDrivers',
        value: function registerDrivers() {
            this.driverCache = {};

            for (var _iterator2 = Object.keys(drivers), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
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

                if (driverName.indexOf('_') === 0) {
                    continue;
                }

                var driver = drivers[driverName];
                var glob = driver.global();
                if (glob) {
                    this.driver(driverName, glob);
                }
            }
        }
    }, {
        key: 'driver',
        value: function driver(name, dep) {
            if (!drivers[name]) {
                throw new Error('Could not find driver for framework: ' + name);
            }

            if (!this.driverCache[name]) {
                this.driverCache[name] = drivers[name].register(this, dep);
            }

            return this.driverCache[name];
        }
    }, {
        key: 'registerChild',
        value: function registerChild() {
            var _this2 = this;

            return _src2.ZalgoPromise['try'](function () {
                if (_this2.isChild()) {
                    return new _child.ChildComponent(_this2);
                }
            });
        }
    }, {
        key: 'listenDelegate',
        value: function listenDelegate() {
            var _this3 = this;

            (0, _src.on)(_constants.POST_MESSAGE.ALLOW_DELEGATE + '_' + this.name, function () {
                return true;
            });

            (0, _src.on)(_constants.POST_MESSAGE.DELEGATE + '_' + this.name, function (_ref3) {
                var source = _ref3.source,
                    origin = _ref3.origin,
                    data = _ref3.data;


                var domain = _this3.getDomain(null, data.env || _this3.defaultEnv);

                if (!domain) {
                    throw new Error('Could not determine domain to allow remote render');
                }

                if (!(0, _src3.matchDomain)(domain, origin)) {
                    throw new Error('Can not render from ' + origin + ' - expected ' + domain.toString());
                }

                var delegate = _this3.delegate(source, data.options);

                return {
                    overrides: delegate.getOverrides(data.context),
                    destroy: function destroy() {
                        return delegate.destroy();
                    }
                };
            });
        }
    }, {
        key: 'canRenderTo',
        value: function canRenderTo(win) {
            return (0, _src.send)(win, _constants.POST_MESSAGE.ALLOW_DELEGATE + '_' + this.name).then(function (_ref4) {
                var data = _ref4.data;

                return data;
            })['catch'](function () {
                return false;
            });
        }
    }, {
        key: 'getValidDomain',
        value: function getValidDomain(url) {

            if (!url) {
                return;
            }

            var domain = (0, _src3.getDomainFromUrl)(url);

            if (typeof this.domain === 'string' && domain === this.domain) {
                return domain;
            }

            var domains = this.domain;

            if (domains && (typeof domains === 'undefined' ? 'undefined' : _typeof(domains)) === 'object' && !(domains instanceof RegExp)) {
                for (var _iterator3 = Object.keys(domains), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
                    var _ref5;

                    if (_isArray3) {
                        if (_i3 >= _iterator3.length) break;
                        _ref5 = _iterator3[_i3++];
                    } else {
                        _i3 = _iterator3.next();
                        if (_i3.done) break;
                        _ref5 = _i3.value;
                    }

                    var env = _ref5;


                    if (env === 'test') {
                        continue;
                    }

                    if (domain === domains[env]) {
                        return domain;
                    }
                }
            }
        }
    }, {
        key: 'getDomain',
        value: function getDomain(url, env) {

            var domain = this.getForEnv(this.domain, env);

            if (domain) {
                return domain;
            }

            domain = this.getValidDomain(url);

            if (domain) {
                return domain;
            }

            // $FlowFixMe
            var envUrl = this.getForEnv(this.url, env);

            if (envUrl) {
                // $FlowFixMe
                return (0, _src3.getDomainFromUrl)(envUrl);
            }

            if (url) {
                return (0, _src3.getDomainFromUrl)(url);
            }
        }
    }, {
        key: 'getBridgeUrl',
        value: function getBridgeUrl(env) {
            // $FlowFixMe
            return this.getForEnv(this.bridgeUrl, env);
        }
    }, {
        key: 'getForEnv',
        value: function getForEnv(item, env) {

            if (!item) {
                return;
            }

            if (typeof item === 'string' || item instanceof RegExp) {
                return item;
            }

            if (!env) {
                env = this.defaultEnv;
            }

            if (!env) {
                return;
            }

            if (env && (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && item[env]) {
                return item[env];
            }
        }
    }, {
        key: 'getBridgeDomain',
        value: function getBridgeDomain(env) {

            // $FlowFixMe
            var bridgeDomain = this.getForEnv(this.bridgeDomain, env);

            if (bridgeDomain) {
                // $FlowFixMe
                return bridgeDomain;
            }

            var bridgeUrl = this.getBridgeUrl(env);

            if (bridgeUrl) {
                return (0, _src3.getDomainFromUrl)(bridgeUrl);
            }
        }
    }, {
        key: 'getUrl',
        value: function getUrl(env, props) {

            // $FlowFixMe
            var url = this.getForEnv(this.url, env);

            if (url) {
                // $FlowFixMe
                return url;
            }

            if (this.buildUrl) {
                return this.buildUrl(props);
            }

            throw new Error('Unable to get url');
        }
    }, {
        key: 'isXComponent',
        value: function isXComponent() {
            return (0, _window.isXComponentWindow)();
        }
    }, {
        key: 'isChild',
        value: function isChild() {
            return (0, _window.isXComponentWindow)() && (0, _window.getComponentMeta)().tag === this.tag;
        }
    }, {
        key: 'createError',
        value: function createError(message, tag) {
            return new Error('[' + (tag || this.tag) + '] ' + message);
        }

        /*  Init
            ----
             Shortcut to instantiate a component on a parent page, with props
        */

    }, {
        key: 'init',
        value: function init(props, context, element) {
            return new _parent.ParentComponent(this, this.getRenderContext(context, element), { props: props });
        }
    }, {
        key: 'delegate',
        value: function delegate(source, options) {
            return new _delegate.DelegateComponent(this, source, options);
        }
    }, {
        key: 'validateRenderContext',
        value: function validateRenderContext(context, element) {
            if (context && !this.contexts[context]) {
                throw new Error('[' + this.tag + '] Can not render to ' + context);
            }

            if (!element && context === _constants.CONTEXT_TYPES.IFRAME) {
                throw new Error('[' + this.tag + '] Context type ' + _constants.CONTEXT_TYPES.IFRAME + ' requires an element selector');
            }
        }
    }, {
        key: 'getDefaultContext',
        value: function getDefaultContext() {
            if (this.defaultContext) {
                return this.defaultContext;
            } else if (this.contexts[_constants.CONTEXT_TYPES.IFRAME]) {
                return _constants.CONTEXT_TYPES.IFRAME;
            } else if (this.contexts[_constants.CONTEXT_TYPES.POPUP]) {
                return _constants.CONTEXT_TYPES.POPUP;
            }

            throw new Error('Can not determine default context');
        }
    }, {
        key: 'getRenderContext',
        value: function getRenderContext(context, element) {
            context = context || this.getDefaultContext();
            this.validateRenderContext(context, element);
            return context;
        }

        /*  Render
            ------
             Shortcut to render a parent component
        */

    }, {
        key: 'render',
        value: function render(props, element) {
            var _this4 = this;

            return _src2.ZalgoPromise['try'](function () {
                return new _parent.ParentComponent(_this4, _this4.getRenderContext(null, element), { props: props }).render(element);
            });
        }
    }, {
        key: 'renderIframe',
        value: function renderIframe(props, element) {
            var _this5 = this;

            return _src2.ZalgoPromise['try'](function () {
                return new _parent.ParentComponent(_this5, _this5.getRenderContext(_constants.CONTEXT_TYPES.IFRAME, element), { props: props }).render(element);
            });
        }
    }, {
        key: 'renderPopup',
        value: function renderPopup(props) {
            var _this6 = this;

            return _src2.ZalgoPromise['try'](function () {
                return new _parent.ParentComponent(_this6, _this6.getRenderContext(_constants.CONTEXT_TYPES.POPUP), { props: props }).render();
            });
        }
    }, {
        key: 'renderTo',
        value: function renderTo(win, props, element) {
            var _this7 = this;

            return _src2.ZalgoPromise['try'](function () {
                return new _parent.ParentComponent(_this7, _this7.getRenderContext(null, element), { props: props }).renderTo(win, element);
            });
        }
    }, {
        key: 'renderIframeTo',
        value: function renderIframeTo(win, props, element) {
            var _this8 = this;

            return _src2.ZalgoPromise['try'](function () {
                return new _parent.ParentComponent(_this8, _this8.getRenderContext(_constants.CONTEXT_TYPES.IFRAME, element), { props: props }).renderTo(win, element);
            });
        }
    }, {
        key: 'renderPopupTo',
        value: function renderPopupTo(win, props) {
            var _this9 = this;

            return _src2.ZalgoPromise['try'](function () {
                return new _parent.ParentComponent(_this9, _this9.getRenderContext(_constants.CONTEXT_TYPES.POPUP), { props: props }).renderTo(win);
            });
        }
    }, {
        key: 'prerender',
        value: function prerender(props, element) {
            var instance = new _parent.ParentComponent(this, this.getRenderContext(null, element), { props: props });
            instance.prefetch();

            return {
                render: function render(innerProps, innerElement) {
                    if (innerProps) {
                        instance.updateProps(innerProps);
                    }

                    return instance.render(innerElement);
                },
                renderTo: function renderTo(win, innerProps, innerElement) {
                    if (innerProps) {
                        instance.updateProps(innerProps);
                    }

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

        /*  Log
            ---
             Log an event using the component name
        */

    }, {
        key: 'log',
        value: function log(event) {
            var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            (0, _lib.info)(this.name, event, payload);
        }

        /*  Log Warning
            -----------
             Log a warning
        */

    }, {
        key: 'logWarning',
        value: function logWarning(event, payload) {
            (0, _lib.warn)(this.name, event, payload);
        }

        /*  Log Error
            ---------
             Log an error
        */

    }, {
        key: 'logError',
        value: function logError(event, payload) {
            (0, _lib.error)(this.name, event, payload);
        }
    }], [{
        key: 'getByTag',
        value: function getByTag(tag) {
            return Component.components[tag];
        }
    }]);

    return Component;
}(_base.BaseComponent), (_applyDecoratedDescriptor(_class.prototype, 'getPropNames', [_lib.memoize], Object.getOwnPropertyDescriptor(_class.prototype, 'getPropNames'), _class.prototype)), _class);
Component.components = {};