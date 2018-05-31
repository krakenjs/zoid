'use strict';

exports.__esModule = true;
exports.ParentComponent = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class;
/* eslint max-lines: 0 */

var _client = require('beaver-logger/client');

var _src = require('post-robot/src');

var _src2 = require('cross-domain-utils/src');

var _src3 = require('zalgo-promise/src');

var _base = require('../base');

var _window = require('../window');

var _lib = require('../../lib');

var _constants = require('../../constants');

var _error = require('../../error');

var _drivers = require('./drivers');

var _validate = require('./validate');

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

_lib.global.props = _lib.global.props || {};
_lib.global.windows = _lib.global.windows || {};

/*  Parent Component
    ----------------

    This manages the state of the component on the parent window side - i.e. the window the component is being rendered into.

    It handles opening the necessary windows/iframes, launching the component's url, and listening for messages back from the component.
*/

var ParentComponent = exports.ParentComponent = (_class = function (_BaseComponent) {
    _inherits(ParentComponent, _BaseComponent);

    function ParentComponent(component, context, _ref) {
        var props = _ref.props;

        _classCallCheck(this, ParentComponent);

        var _this = _possibleConstructorReturn(this, _BaseComponent.call(this));

        _this.component = component;

        _this.validateParentDomain();

        _this.context = context;
        _this.setProps(props);

        if (_this.props.logLevel) {
            (0, _lib.setLogLevel)(_this.props.logLevel);
        }

        _this.childWindowName = _this.buildChildWindowName({ renderTo: window });

        _this.registerActiveComponent();

        // Options passed during renderTo. We would not ordinarily expect a user to pass these, since we depend on
        // them only when we're trying to render from a sibling to a sibling

        _this.component.log('construct_parent');

        _this.watchForUnload();

        _this.onInit = new _src3.ZalgoPromise();

        _this.onInit['catch'](function (err) {
            return _this.error(err);
        });
        return _this;
    }

    ParentComponent.prototype.render = function render(element) {
        var _this2 = this;

        var loadUrl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        return this.tryInit(function () {

            _this2.component.log('render_' + _this2.context, { context: _this2.context, element: element, loadUrl: (0, _lib.stringify)(loadUrl) });

            var tasks = {};

            tasks.onRender = _this2.props.onRender();

            tasks.getDomain = _this2.getDomain();

            tasks.elementReady = _src3.ZalgoPromise['try'](function () {
                if (element) {
                    return _this2.elementReady(element);
                }
            });

            tasks.openContainer = tasks.elementReady.then(function () {
                return _this2.openContainer(element);
            });

            tasks.showContainer = tasks.openContainer.then(function () {
                return _this2.showContainer();
            });

            tasks.openPrerender = tasks.openContainer.then(function () {
                return _this2.openPrerender();
            });

            tasks.switchPrerender = _src3.ZalgoPromise.all([tasks.openPrerender, _this2.onInit]).then(function () {
                return _this2.switchPrerender();
            });

            tasks.open = _this2.driver.openOnClick ? _this2.open() : tasks.openContainer.then(function () {
                return _this2.open();
            });

            tasks.listen = _src3.ZalgoPromise.all([tasks.getDomain, tasks.open]).then(function (_ref2) {
                var domain = _ref2[0];

                _this2.listen(_this2.window, domain);
            });

            tasks.watchForClose = tasks.open.then(function () {
                return _this2.watchForClose();
            });

            tasks.linkDomain = _src3.ZalgoPromise.all([tasks.getDomain, tasks.open]).then(function (_ref3) {
                var domain = _ref3[0];

                if (_src.bridge && typeof domain === 'string') {
                    return _src.bridge.linkUrl(_this2.window, domain);
                }
            });

            if (!_this2.html) {
                tasks.createPrerenderTemplate = tasks.openPrerender.then(function () {
                    return _this2.createPrerenderTemplate();
                });

                tasks.showComponent = tasks.createPrerenderTemplate.then(function () {
                    return _this2.showComponent();
                });
            }

            tasks.openBridge = _src3.ZalgoPromise.all([tasks.getDomain, tasks.open]).then(function (_ref4) {
                var domain = _ref4[0];

                return _this2.openBridge(typeof domain === 'string' ? domain : null);
            });

            if (_this2.html) {
                tasks.loadHTML = tasks.open.then(function () {
                    return _this2.loadHTML();
                });
            } else if (loadUrl) {
                tasks.buildUrl = _this2.buildUrl();

                tasks.loadUrl = _src3.ZalgoPromise.all([tasks.buildUrl, tasks.open, tasks.linkDomain, tasks.listen, tasks.open, tasks.openBridge, tasks.createPrerenderTemplate]).then(function (_ref5) {
                    var url = _ref5[0];

                    return _this2.loadUrl(url);
                });

                tasks.runTimeout = tasks.loadUrl.then(function () {
                    return _this2.runTimeout();
                });
            }

            return _src3.ZalgoPromise.hash(tasks);
        }).then(function () {
            return _this2.props.onEnter();
        }).then(function () {
            return _this2;
        });
    };

    ParentComponent.prototype.getOutlet = function getOutlet() {
        var outlet = document.createElement('div');
        (0, _lib.addClass)(outlet, _constants.CLASS_NAMES.OUTLET);
        return outlet;
    };

    ParentComponent.prototype.validateParentDomain = function validateParentDomain() {
        var domain = (0, _src2.getDomain)();
        if (!(0, _src2.matchDomain)(this.component.allowedParentDomains, domain)) {
            throw new _error.RenderError('Can not be rendered by domain: ' + domain);
        }
    };

    ParentComponent.prototype.renderTo = function renderTo(win, element) {
        var _this3 = this;

        return this.tryInit(function () {

            if (win === window) {
                return _this3.render(element);
            }

            if (!(0, _src2.isSameTopWindow)(window, win)) {
                throw new Error('Can only renderTo an adjacent frame');
            }

            if (element && typeof element !== 'string') {
                throw new Error('Element passed to renderTo must be a string selector, got ' + (typeof element === 'undefined' ? 'undefined' : _typeof(element)) + ' ' + element);
            }

            _this3.checkAllowRenderTo(win);

            _this3.component.log('render_' + _this3.context + '_to_win', { element: (0, _lib.stringify)(element), context: _this3.context });

            _this3.childWindowName = _this3.buildChildWindowName({ renderTo: win });

            _this3.delegate(win);

            return _this3.render(element);
        });
    };

    ParentComponent.prototype.prefetch = function prefetch() {
        var _this4 = this;

        return _src3.ZalgoPromise['try'](function () {
            _this4.html = _this4.buildUrl().then(function (url) {
                return (0, _lib.prefetchPage)(url).then(function (html) {

                    var host = '' + url.split('/').slice(0, 3).join('/');
                    var uri = '/' + url.split('/').slice(3).join('/');

                    return '\n                        <base href="' + host + '">\n\n                        ' + html + '\n\n                        <script>\n                            if (window.history && window.history.pushState) {\n                                window.history.pushState({}, \'\', \'' + uri + '\');\n                            }\n                        </script>\n                    ';
                });
            });
        });
    };

    ParentComponent.prototype.loadHTML = function loadHTML() {
        var _this5 = this;

        return _src3.ZalgoPromise['try'](function () {
            if (!_this5.html) {
                throw new Error('Html not prefetched');
            }

            return _this5.html.then(function (html) {
                // $FlowFixMe
                return (0, _lib.writeToWindow)(_this5.window, html);
            });
        });
    };

    ParentComponent.prototype.checkAllowRenderTo = function checkAllowRenderTo(win) {

        if (!win) {
            throw this.component.createError('Must pass window to renderTo');
        }

        if ((0, _src2.isSameDomain)(win)) {
            return;
        }

        var origin = (0, _src2.getDomain)();
        var domain = this.component.getDomain(null, this.props.env);

        if (!domain) {
            throw new Error('Could not determine domain to allow remote render');
        }

        if ((0, _src2.matchDomain)(domain, origin)) {
            return;
        }

        throw new Error('Can not render remotely to ' + domain.toString() + ' - can only render to ' + origin);
    };

    ParentComponent.prototype.registerActiveComponent = function registerActiveComponent() {
        var _this6 = this;

        ParentComponent.activeComponents.push(this);

        this.clean.register(function () {
            ParentComponent.activeComponents.splice(ParentComponent.activeComponents.indexOf(_this6), 1);
        });
    };

    ParentComponent.prototype.getComponentParentRef = function getComponentParentRef() {
        var renderToWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;


        if (this.context === _constants.CONTEXT_TYPES.POPUP) {
            return { ref: _constants.WINDOW_REFERENCES.OPENER };
        }

        if (renderToWindow === window) {

            if ((0, _src2.isTop)(window)) {
                return { ref: _constants.WINDOW_REFERENCES.TOP };
            }

            return { ref: _constants.WINDOW_REFERENCES.PARENT, distance: (0, _src2.getDistanceFromTop)(window) };
        }

        var uid = (0, _lib.uniqueID)();
        _lib.global.windows[uid] = window;

        this.clean.register(function () {
            delete _lib.global.windows[uid];
        });

        return { ref: _constants.WINDOW_REFERENCES.GLOBAL, uid: uid };
    };

    ParentComponent.prototype.getRenderParentRef = function getRenderParentRef() {
        var renderToWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;


        if (renderToWindow === window) {
            return this.getComponentParentRef(renderToWindow);
        }

        var uid = (0, _lib.uniqueID)();
        _lib.global.windows[uid] = renderToWindow;

        this.clean.register(function () {
            delete _lib.global.windows[uid];
        });

        return { ref: _constants.WINDOW_REFERENCES.GLOBAL, uid: uid };
    };

    ParentComponent.prototype.buildChildWindowName = function buildChildWindowName() {
        var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref6$renderTo = _ref6.renderTo,
            renderTo = _ref6$renderTo === undefined ? window : _ref6$renderTo;

        var sameDomain = (0, _src2.isSameDomain)(renderTo);

        var uid = (0, _lib.uniqueID)();
        var tag = this.component.tag;
        var sProps = (0, _lib.serializeFunctions)(this.getPropsForChild());

        var componentParent = this.getComponentParentRef(renderTo);
        var renderParent = this.getRenderParentRef(renderTo);

        var secureProps = !sameDomain && !this.component.unsafeRenderTo;

        var props = secureProps ? { type: _constants.INITIAL_PROPS.UID, uid: uid } : { type: _constants.INITIAL_PROPS.RAW, value: sProps };

        if (props.type === _constants.INITIAL_PROPS.UID) {
            _lib.global.props[uid] = JSON.stringify(sProps);

            this.clean.register(function () {
                delete _lib.global.props[uid];
            });
        }

        return (0, _window.buildChildWindowName)(this.component.name, this.component.version, { uid: uid, tag: tag, componentParent: componentParent, renderParent: renderParent, props: props });
    };

    /*  Send to Parent
        --------------
         Send a post message to our parent window.
    */

    ParentComponent.prototype.sendToParent = function sendToParent(name, data) {
        var parentWindow = (0, _window.getParentComponentWindow)();

        if (!parentWindow) {
            throw new Error('Can not find parent component window to message');
        }

        this.component.log('send_to_parent_' + name);

        return (0, _src.send)((0, _window.getParentComponentWindow)(), name, data, { domain: (0, _window.getParentDomain)() });
    };

    /*  Set Props
        ---------
         Normalize props and generate the url we'll use to render the component
    */

    ParentComponent.prototype.setProps = function setProps(props) {
        var required = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;


        (0, _validate.validateProps)(this.component, props, required);
        if (this.component.validate) {
            this.component.validate(this.component, props);
        }

        // $FlowFixMe
        this.props = this.props || {};

        (0, _lib.extend)(this.props, (0, _props.normalizeProps)(this.component, this, props));
    };

    /*  Build Url
        ---------
         We build the props we're passed into the initial url. This means the component server-side can start rendering
        itself based on whatever props the merchant provides.
    */

    ParentComponent.prototype.buildUrl = function buildUrl() {
        var _this7 = this;

        return _src3.ZalgoPromise.all([this.props.url,
        // $FlowFixMe
        (0, _props.propsToQuery)(_extends({}, this.component.props, this.component.builtinProps), this.props)]).then(function (_ref7) {
            var url = _ref7[0],
                query = _ref7[1];


            // Do not extend the url if it is for a different domain

            if (url && !_this7.component.getValidDomain(url)) {
                return url;
            }

            return _src3.ZalgoPromise['try'](function () {

                return url || _this7.component.getUrl(_this7.props.env, _this7.props);
            }).then(function (finalUrl) {

                query.xcomponent = '1';
                return (0, _lib.extendUrl)(finalUrl, { query: query });
            });
        });
    };

    ParentComponent.prototype.getDomain = function getDomain() {
        var _this8 = this;

        return _src3.ZalgoPromise['try'](function () {
            return _this8.props.url;
        }).then(function (url) {

            var domain = _this8.component.getDomain(url, _this8.props.env);

            if (domain) {
                return domain;
            }

            if (_this8.component.buildUrl) {
                return _src3.ZalgoPromise['try'](function () {
                    return _this8.component.buildUrl(_this8.props);
                }).then(function (builtUrl) {
                    return _this8.component.getDomain(builtUrl, _this8.props.env);
                });
            }
        }).then(function (domain) {

            if (!domain) {
                throw new Error('Could not determine domain');
            }

            return domain;
        });
    };

    ParentComponent.prototype.getPropsForChild = function getPropsForChild() {

        var result = {};

        for (var _iterator = Object.keys(this.props), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref8;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref8 = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref8 = _i.value;
            }

            var key = _ref8;

            var prop = this.component.getProp(key);

            if (!prop || prop.sendToChild !== false) {
                result[key] = this.props[key];
            }
        }

        // $FlowFixMe
        return result;
    };

    /*  Update Props
        ------------
         Send new props down to the child
    */

    ParentComponent.prototype.updateProps = function updateProps(props) {
        var _this9 = this;

        this.setProps(props, false);

        return this.onInit.then(function () {
            if (_this9.childExports) {
                return _this9.childExports.updateProps(_this9.getPropsForChild());
            } else {
                throw new Error('Child exports were not available');
            }
        });
    };

    ParentComponent.prototype.openBridge = function openBridge(domain) {
        var _this10 = this;

        return _src3.ZalgoPromise['try'](function () {
            if (!_src.bridge || !_this10.driver.needsBridge) {
                return;
            }

            var needsBridgeParams = { win: _this10.window };
            if (domain) {
                needsBridgeParams.domain = domain;
            }

            var needsBridge = _src.bridge.needsBridge(needsBridgeParams);

            var bridgeUrl = _this10.component.getBridgeUrl(_this10.props.env);

            if (!bridgeUrl) {

                if (needsBridge && domain && !_src.bridge.hasBridge(domain, domain)) {
                    throw new Error('Bridge url needed to render ' + _this10.context);
                }

                return;
            }

            bridgeUrl = (0, _lib.extendUrl)(bridgeUrl, { query: { version: _this10.component.version } });

            var bridgeDomain = _this10.component.getBridgeDomain(_this10.props.env);

            if (!bridgeDomain) {
                throw new Error('Can not determine domain for bridge');
            }

            if (needsBridge) {
                return _src.bridge.openBridge(bridgeUrl, bridgeDomain).then(function (result) {
                    if (result) {
                        return result;
                    }
                });
            }
        });
    };

    /*  Open
        ----
         Open a new window in the desired context
    */

    ParentComponent.prototype.open = function open() {
        var _this11 = this;

        return _src3.ZalgoPromise['try'](function () {
            _this11.component.log('open_' + _this11.context, { windowName: _this11.childWindowName });
            return _this11.driver.open.call(_this11);
        });
    };

    ParentComponent.prototype.openPrerender = function openPrerender() {
        var _this12 = this;

        return _src3.ZalgoPromise['try'](function () {
            if (_this12.component.prerenderTemplate) {
                return _this12.driver.openPrerender.call(_this12);
            }
        });
    };

    ParentComponent.prototype.switchPrerender = function switchPrerender() {
        var _this13 = this;

        return _src3.ZalgoPromise['try'](function () {
            if (_this13.prerenderWindow && _this13.driver.switchPrerender) {
                return _this13.driver.switchPrerender.call(_this13);
            }
        });
    };

    ParentComponent.prototype.elementReady = function elementReady(element) {
        return (0, _lib.elementReady)(element).then(_lib.noop);
    };

    ParentComponent.prototype.delegate = function delegate(win) {
        var _this14 = this;

        this.component.log('delegate_' + this.context);

        var props = {
            uid: this.props.uid,
            dimensions: this.props.dimensions,
            onClose: this.props.onClose,
            onDisplay: this.props.onDisplay
        };

        for (var _iterator2 = this.component.getPropNames(), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            var _ref9;

            if (_isArray2) {
                if (_i2 >= _iterator2.length) break;
                _ref9 = _iterator2[_i2++];
            } else {
                _i2 = _iterator2.next();
                if (_i2.done) break;
                _ref9 = _i2.value;
            }

            var propName = _ref9;

            var prop = this.component.getProp(propName);

            if (prop.allowDelegate) {
                props[propName] = this.props[propName];
            }
        }

        var delegate = (0, _src.send)(win, _constants.POST_MESSAGE.DELEGATE + '_' + this.component.name, {

            context: this.context,
            env: this.props.env,

            options: {

                context: this.context,

                childWindowName: this.childWindowName,

                props: props,

                overrides: {
                    focus: function focus() {
                        return _this14.focus();
                    },
                    userClose: function userClose() {
                        return _this14.userClose();
                    },
                    getDomain: function getDomain() {
                        return _this14.getDomain();
                    },

                    error: function error(err) {
                        return _this14.error(err);
                    },
                    on: function on(eventName, handler) {
                        return _this14.on(eventName, handler);
                    }
                }
            }

        }).then(function (_ref10) {
            var data = _ref10.data;


            _this14.clean.register(data.destroy);
            return data;
        })['catch'](function (err) {

            throw new Error('Unable to delegate rendering. Possibly the component is not loaded in the target window.\n\n' + (0, _lib.stringifyError)(err));
        });

        var overrides = this.driver.delegateOverrides;

        var _loop = function _loop() {
            if (_isArray3) {
                if (_i3 >= _iterator3.length) return 'break';
                _ref11 = _iterator3[_i3++];
            } else {
                _i3 = _iterator3.next();
                if (_i3.done) return 'break';
                _ref11 = _i3.value;
            }

            var key = _ref11;

            var val = overrides[key];

            if (val === _constants.DELEGATE.CALL_ORIGINAL) {
                return 'continue';
            }

            // $FlowFixMe
            var original = _this14[key];

            // $FlowFixMe
            _this14[key] = function overridenFunction() {
                var _this15 = this,
                    _arguments = arguments;

                return delegate.then(function (data) {

                    var override = data.overrides[key];

                    if (val === _constants.DELEGATE.CALL_DELEGATE) {
                        return override.apply(_this15, _arguments);
                    }

                    if (typeof val === 'function') {
                        return val(original, override).apply(_this15, _arguments);
                    }

                    throw new Error('Expected delgate to be CALL_ORIGINAL, CALL_DELEGATE, or factory method');
                });
            };
        };

        _loop2: for (var _iterator3 = Object.keys(overrides), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
            var _ref11;

            var _ret = _loop();

            switch (_ret) {
                case 'break':
                    break _loop2;

                case 'continue':
                    continue;}
        }
    };

    /*  Watch For Close
        ---------------
         Watch for the child window closing, so we can cleanup.
        Also watch for this window changing location, so we can close the component.
    */

    ParentComponent.prototype.watchForClose = function watchForClose() {
        var _this16 = this;

        var closeWindowListener = (0, _src2.onCloseWindow)(this.window, function () {
            _this16.component.log('detect_close_child');

            return _src3.ZalgoPromise['try'](function () {
                return _this16.props.onClose(_constants.CLOSE_REASONS.CLOSE_DETECTED);
            })['finally'](function () {
                return _this16.destroy();
            });
        }, 3000);

        this.clean.register('destroyCloseWindowListener', closeWindowListener.cancel);
    };

    ParentComponent.prototype.watchForUnload = function watchForUnload() {
        var _this17 = this;

        // Our child has no way of knowing if we navigated off the page. So we have to listen for unload
        // and close the child manually if that happens.

        var onunload = (0, _lib.once)(function () {
            _this17.component.log('navigate_away');
            (0, _client.flush)();
            _this17.destroyComponent();
        });

        var unloadWindowListener = (0, _lib.addEventListener)(window, 'unload', onunload);

        this.clean.register('destroyUnloadWindowListener', unloadWindowListener.cancel);
    };

    /*  Load Url
        --------
         Load url into the child window. This is separated out because it's quite common for us to have situations
        where opening the child window and loading the url happen at different points.
    */

    ParentComponent.prototype.loadUrl = function loadUrl(url) {
        var _this18 = this;

        return _src3.ZalgoPromise['try'](function () {
            _this18.component.log('load_url');

            if (window.location.href.split('#')[0] === url.split('#')[0]) {
                var _query;

                url = (0, _lib.extendUrl)(url, {
                    query: (_query = {}, _query[(0, _lib.uniqueID)()] = '1', _query)
                });
            }

            return _this18.driver.loadUrl.call(_this18, url);
        });
    };

    ParentComponent.prototype.hijack = function hijack(targetElement) {
        targetElement.target = this.childWindowName;
    };

    /*  Run Timeout
        -----------
         Set a timeout on the initial render, and call this.props.onTimeout if we don't get an init call in time.
    */

    ParentComponent.prototype.runTimeout = function runTimeout() {
        var _this19 = this;

        var timeout = this.props.timeout;

        if (timeout) {
            var _id = this.timeout = setTimeout(function () {

                _this19.component.log('timed_out', { timeout: timeout.toString() });

                var error = _this19.component.createError('Loading component timed out after ' + timeout + ' milliseconds');

                _this19.onInit.reject(error);
                _this19.props.onTimeout(error);
            }, timeout);

            this.clean.register(function () {
                clearTimeout(_id);
                delete _this19.timeout;
            });
        }
    };

    /*  Listeners
        ---------
         Post-robot listeners to the child component window
    */

    ParentComponent.prototype.listeners = function listeners() {
        var _ref12;

        return _ref12 = {}, _ref12[_constants.POST_MESSAGE.INIT] = function (source, data) {

            this.childExports = data.exports;

            this.onInit.resolve(this);

            if (this.timeout) {
                clearTimeout(this.timeout);
            }

            return {
                props: this.getPropsForChild(),
                context: this.context
            };
        }, _ref12[_constants.POST_MESSAGE.CLOSE] = function (source, data) {
            this.close(data.reason);
        }, _ref12[_constants.POST_MESSAGE.CHECK_CLOSE] = function () {
            this.checkClose();
        }, _ref12[_constants.POST_MESSAGE.RESIZE] = function (source, data) {
            var _this20 = this;

            return _src3.ZalgoPromise['try'](function () {
                if (_this20.driver.allowResize) {
                    return _this20.resize(data.width, data.height);
                }
            });
        }, _ref12[_constants.POST_MESSAGE.ONRESIZE] = function () {
            this.event.trigger('resize');
        }, _ref12[_constants.POST_MESSAGE.HIDE] = function () {
            this.hide();
        }, _ref12[_constants.POST_MESSAGE.SHOW] = function () {
            this.show();
        }, _ref12[_constants.POST_MESSAGE.ERROR] = function (source, data) {
            this.error(new Error(data.error));
        }, _ref12;
    };

    /*  Resize
        ------
         Resize the child component window
    */

    ParentComponent.prototype.resize = function resize(width, height) {
        var _this21 = this;

        var _ref13 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
            _ref13$waitForTransit = _ref13.waitForTransition,
            waitForTransition = _ref13$waitForTransit === undefined ? true : _ref13$waitForTransit;

        return _src3.ZalgoPromise['try'](function () {
            _this21.component.log('resize', { height: (0, _lib.stringify)(height), width: (0, _lib.stringify)(width) });
            _this21.driver.resize.call(_this21, width, height);

            if (!waitForTransition) {
                return;
            }

            if (_this21.element || _this21.iframe) {

                var overflow = void 0;

                if (_this21.element) {
                    overflow = (0, _lib.setOverflow)(_this21.element, 'hidden');
                }

                return (0, _lib.elementStoppedMoving)(_this21.element || _this21.iframe).then(function () {

                    if (overflow) {
                        overflow.reset();
                    }
                });
            }
        });
    };

    /*  Hide
        ----
         Hide the component and any parent template
    */

    ParentComponent.prototype.hide = function hide() {

        if (this.container) {
            (0, _lib.hideElement)(this.container);
        }

        return this.driver.hide.call(this);
    };

    ParentComponent.prototype.show = function show() {

        if (this.container) {
            (0, _lib.showElement)(this.container);
        }

        return this.driver.show.call(this);
    };

    ParentComponent.prototype.checkClose = function checkClose() {
        var _this22 = this;

        var closeWindowListener = (0, _src2.onCloseWindow)(this.window, function () {
            _this22.userClose();
        }, 50, 500);

        this.clean.register(closeWindowListener.cancel);
    };

    ParentComponent.prototype.userClose = function userClose() {
        return this.close(_constants.CLOSE_REASONS.USER_CLOSED);
    };

    /*  Close
        -----
         Close the child component
    */

    ParentComponent.prototype.close = function close() {
        var _this23 = this;

        var reason = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants.CLOSE_REASONS.PARENT_CALL;

        return _src3.ZalgoPromise['try'](function () {

            _this23.component.log('close', { reason: reason });

            _this23.event.triggerOnce(_constants.EVENTS.CLOSE);
            return _this23.props.onClose(reason);
        }).then(function () {

            return _src3.ZalgoPromise.all([_this23.closeComponent(), _this23.closeContainer()]);
        }).then(function () {

            return _this23.destroy();
        });
    };

    ParentComponent.prototype.closeContainer = function closeContainer() {
        var _this24 = this;

        var reason = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants.CLOSE_REASONS.PARENT_CALL;

        return _src3.ZalgoPromise['try'](function () {

            _this24.event.triggerOnce(_constants.EVENTS.CLOSE);
            return _this24.props.onClose(reason);
        }).then(function () {

            return _src3.ZalgoPromise.all([_this24.closeComponent(reason), _this24.hideContainer()]);
        }).then(function () {

            return _this24.destroyContainer();
        });
    };

    ParentComponent.prototype.destroyContainer = function destroyContainer() {
        var _this25 = this;

        return _src3.ZalgoPromise['try'](function () {
            _this25.clean.run('destroyContainerEvents');
            _this25.clean.run('destroyContainerTemplate');
        });
    };

    ParentComponent.prototype.closeComponent = function closeComponent() {
        var _this26 = this;

        var reason = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants.CLOSE_REASONS.PARENT_CALL;


        var win = this.window;

        return _src3.ZalgoPromise['try'](function () {

            return _this26.cancelContainerEvents();
        }).then(function () {

            _this26.event.triggerOnce(_constants.EVENTS.CLOSE);
            return _this26.props.onClose(reason);
        }).then(function () {

            return _this26.hideComponent();
        }).then(function () {

            return _this26.destroyComponent();
        }).then(function () {

            // IE in metro mode -- child window needs to close itself, or close will hang

            if (_this26.childExports && _this26.context === _constants.CONTEXT_TYPES.POPUP && !(0, _src2.isWindowClosed)(win)) {
                _this26.childExports.close()['catch'](_lib.noop);
            }
        });
    };

    ParentComponent.prototype.destroyComponent = function destroyComponent() {
        this.clean.run('destroyUnloadWindowListener');
        this.clean.run('destroyCloseWindowListener');
        this.clean.run('destroyContainerEvents');
        this.clean.run('destroyWindow');
    };

    ParentComponent.prototype.showContainer = function showContainer() {
        var _this27 = this;

        return _src3.ZalgoPromise['try'](function () {
            if (_this27.props.onDisplay) {
                return _this27.props.onDisplay();
            }
        }).then(function () {
            if (_this27.container) {
                return (0, _lib.showAndAnimate)(_this27.container, _constants.ANIMATION_NAMES.SHOW_CONTAINER, _this27.clean.register);
            }
        });
    };

    ParentComponent.prototype.showComponent = function showComponent() {
        var _this28 = this;

        return _src3.ZalgoPromise['try'](function () {
            if (_this28.props.onDisplay) {
                return _this28.props.onDisplay();
            }
        }).then(function () {
            if (_this28.element) {
                return (0, _lib.showAndAnimate)(_this28.element, _constants.ANIMATION_NAMES.SHOW_COMPONENT, _this28.clean.register);
            }
        });
    };

    ParentComponent.prototype.hideContainer = function hideContainer() {
        var _this29 = this;

        return _src3.ZalgoPromise['try'](function () {
            if (_this29.container) {
                return (0, _lib.animateAndHide)(_this29.container, _constants.ANIMATION_NAMES.HIDE_CONTAINER, _this29.clean.register);
            } else {
                return _src3.ZalgoPromise.resolve();
            }
        });
    };

    ParentComponent.prototype.hideComponent = function hideComponent() {
        var _this30 = this;

        return _src3.ZalgoPromise['try'](function () {
            if (_this30.element) {
                return (0, _lib.animateAndHide)(_this30.element, _constants.ANIMATION_NAMES.HIDE_COMPONENT, _this30.clean.register);
            } else {
                return _src3.ZalgoPromise.resolve();
            }
        });
    };

    /*  Focus
        -----
         Focus the child component window
    */

    ParentComponent.prototype.focus = function focus() {

        if (this.window && !(0, _src2.isWindowClosed)(this.window)) {
            this.component.log('focus');
            this.window.focus();
        } else {

            throw new Error('No window to focus');
        }
    };

    /*  Create Component Template
        -------------------------
         Creates an initial template and stylesheet which are loaded into the child window, to be displayed before the url is loaded
    */

    ParentComponent.prototype.createPrerenderTemplate = function createPrerenderTemplate() {
        var _this31 = this;

        return _src3.ZalgoPromise['try'](function () {
            if (!_this31.component.prerenderTemplate) {
                return _src3.ZalgoPromise.resolve();
            }

            return _src3.ZalgoPromise['try'](function () {

                if (_this31.prerenderIframe) {
                    return (0, _lib.awaitFrameLoad)(_this31.prerenderIframe).then(function () {
                        return _this31.prerenderWindow;
                    });
                } else {
                    return _this31.prerenderWindow;
                }
            }).then(function (win) {

                var doc = void 0;

                try {
                    doc = win.document;
                } catch (err) {
                    return;
                }

                try {
                    (0, _lib.writeElementToWindow)(win, _this31.renderTemplate(_this31.component.prerenderTemplate, {
                        jsxDom: _lib.jsxDom.bind(doc),
                        document: doc
                    }));
                } catch (err) {
                    // pass
                }
            });
        });
    };

    /*  Create Parent Template
        ----------------------
         Create a template and stylesheet for the parent template behind the element
    */

    ParentComponent.prototype.renderTemplate = function renderTemplate(renderer) {
        var _this32 = this;

        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var _ref14 = this.component.dimensions || {},
            _ref14$width = _ref14.width,
            width = _ref14$width === undefined ? _constants.DEFAULT_DIMENSIONS.WIDTH + 'px' : _ref14$width,
            _ref14$height = _ref14.height,
            height = _ref14$height === undefined ? _constants.DEFAULT_DIMENSIONS.HEIGHT + 'px' : _ref14$height;

        return renderer.call(this, _extends({
            id: _constants.CLASS_NAMES.ZOID + '-' + this.component.tag + '-' + this.props.uid,
            props: renderer.__xdomain__ ? null : this.props,
            tag: this.component.tag,
            context: this.context,
            outlet: this.getOutlet(),
            CLASS: _constants.CLASS_NAMES,
            ANIMATION: _constants.ANIMATION_NAMES,
            CONTEXT: _constants.CONTEXT_TYPES,
            EVENT: _constants.EVENTS,
            actions: {
                close: function close() {
                    return _this32.userClose();
                },
                focus: function focus() {
                    return _this32.focus();
                }
            },
            on: function on(eventName, handler) {
                return _this32.on(eventName, handler);
            },
            jsxDom: _lib.jsxDom,
            document: document,
            dimensions: { width: width, height: height }
        }, options));
    };

    ParentComponent.prototype.openContainer = function openContainer(element) {
        var _this33 = this;

        return _src3.ZalgoPromise['try'](function () {
            var el = void 0;

            if (element) {
                el = (0, _lib.getElement)(element);
            } else {
                el = document.body;
            }

            if (!el) {
                throw new Error('Could not find element to open container into');
            }

            if (!_this33.component.containerTemplate) {
                if (_this33.driver.renderedIntoContainerTemplate) {
                    throw new Error('containerTemplate needed to render ' + _this33.context);
                }

                return;
            }

            var container = _this33.renderTemplate(_this33.component.containerTemplate, {
                container: el
            });

            _this33.container = container;
            (0, _lib.hideElement)(_this33.container);
            (0, _lib.appendChild)(el, _this33.container);

            if (_this33.driver.renderedIntoContainerTemplate) {
                _this33.element = _this33.getOutlet();
                (0, _lib.hideElement)(_this33.element);

                if (!_this33.element) {
                    throw new Error('Could not find element to render component into');
                }

                (0, _lib.hideElement)(_this33.element);
            }

            _this33.clean.register('destroyContainerTemplate', function () {

                if (_this33.container && _this33.container.parentNode) {
                    _this33.container.parentNode.removeChild(_this33.container);
                }

                delete _this33.container;
            });
        });
    };

    ParentComponent.prototype.cancelContainerEvents = function cancelContainerEvents() {
        this.clean.run('destroyContainerEvents');
    };

    /*  Destroy
        -------
         Close the component and clean up any listeners and state
    */

    ParentComponent.prototype.destroy = function destroy() {
        var _this34 = this;

        return _src3.ZalgoPromise['try'](function () {
            if (_this34.clean.hasTasks()) {
                _this34.component.log('destroy');
                (0, _client.flush)();
                return _this34.clean.all();
            }
        });
    };

    ParentComponent.prototype.tryInit = function tryInit(method) {
        var _this35 = this;

        return _src3.ZalgoPromise['try'](method)['catch'](function (err) {
            _this35.onInit.reject(err);
        }).then(function () {
            return _this35.onInit;
        });
    };

    /*  Error
        -----
         Handle an error
    */

    ParentComponent.prototype.error = function error(err) {
        var _this36 = this;

        // eslint-disable-next-line promise/no-promise-in-callback
        return _src3.ZalgoPromise['try'](function () {

            _this36.handledErrors = _this36.handledErrors || [];

            if (_this36.handledErrors.indexOf(err) !== -1) {
                // $FlowFixMe
                return;
            }

            _this36.handledErrors.push(err);

            _this36.onInit.reject(err);

            return _this36.destroy();
        }).then(function () {

            if (_this36.props.onError) {
                return _this36.props.onError(err);
            }
        })['catch'](function (errErr) {
            // eslint-disable-line unicorn/catch-error-name

            throw new Error('An error was encountered while handling error:\n\n ' + (0, _lib.stringifyError)(err) + '\n\n' + (0, _lib.stringifyError)(errErr));
        }).then(function () {

            if (!_this36.props.onError) {
                throw err;
            }
        });
    };

    ParentComponent.destroyAll = function destroyAll() {
        var results = [];

        while (ParentComponent.activeComponents.length) {
            results.push(ParentComponent.activeComponents[0].destroy());
        }

        return _src3.ZalgoPromise.all(results).then(_lib.noop);
    };

    _createClass(ParentComponent, [{
        key: 'driver',
        get: function get() {

            if (!this.context) {
                throw new Error('Context not set');
            }

            return _drivers.RENDER_DRIVERS[this.context];
        }
    }]);

    return ParentComponent;
}(_base.BaseComponent), (_applyDecoratedDescriptor(_class.prototype, 'getOutlet', [_lib.memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'getOutlet'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'prefetch', [_lib.memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'prefetch'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'loadHTML', [_lib.memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'loadHTML'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'buildUrl', [_lib.memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'buildUrl'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'open', [_lib.memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'open'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'openPrerender', [_lib.memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'openPrerender'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'switchPrerender', [_lib.memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'switchPrerender'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'close', [_lib.memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'close'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'closeContainer', [_lib.memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'closeContainer'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'destroyContainer', [_lib.memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'destroyContainer'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'closeComponent', [_lib.memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'closeComponent'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'showContainer', [_lib.memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'showContainer'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'showComponent', [_lib.memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'showComponent'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'hideContainer', [_lib.memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'hideContainer'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'hideComponent', [_lib.memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'hideComponent'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'createPrerenderTemplate', [_lib.memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'createPrerenderTemplate'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'openContainer', [_lib.memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'openContainer'), _class.prototype)), _class);
ParentComponent.activeComponents = [];