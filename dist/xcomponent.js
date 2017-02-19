(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("xcomponent", [], factory);
	else if(typeof exports === 'object')
		exports["xcomponent"] = factory();
	else
		root["xcomponent"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.destroyAll = exports.getByTag = undefined;
	exports.create = create;

	var _component = __webpack_require__(/*! ./component */ 1);

	Object.defineProperty(exports, 'getByTag', {
	    enumerable: true,
	    get: function get() {
	        return _component.getByTag;
	    }
	});
	Object.defineProperty(exports, 'destroyAll', {
	    enumerable: true,
	    get: function get() {
	        return _component.destroyAll;
	    }
	});

	var _error = __webpack_require__(/*! ./error */ 50);

	Object.keys(_error).forEach(function (key) {
	    if (key === "default") return;
	    Object.defineProperty(exports, key, {
	        enumerable: true,
	        get: function get() {
	            return _error[key];
	        }
	    });
	});

	var _src = __webpack_require__(/*! post-robot/src */ 3);

	var _src2 = _interopRequireDefault(_src);

	var _constants = __webpack_require__(/*! ./constants */ 56);

	var CONSTANTS = _interopRequireWildcard(_constants);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function create(options) {
	    return new _component.Component(options);
	}

	module.exports.CONSTANTS = CONSTANTS;

	module.exports.postRobot = _src2['default'];
	exports['default'] = module.exports;

/***/ },
/* 1 */
/*!********************************!*\
  !*** ./src/component/index.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _component = __webpack_require__(/*! ./component */ 2);

	Object.keys(_component).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _component[key];
	    }
	  });
	});

	var _parent = __webpack_require__(/*! ./parent */ 58);

	Object.keys(_parent).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _parent[key];
	    }
	  });
	});

	var _child = __webpack_require__(/*! ./child */ 53);

	Object.keys(_child).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _child[key];
	    }
	  });
	});

/***/ },
/* 2 */
/*!******************************************!*\
  !*** ./src/component/component/index.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Component = exports.components = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.getByTag = getByTag;

	var _src = __webpack_require__(/*! post-robot/src */ 3);

	var _src2 = _interopRequireDefault(_src);

	var _client = __webpack_require__(/*! beaver-logger/client */ 35);

	var _client2 = _interopRequireDefault(_client);

	var _promise = __webpack_require__(/*! sync-browser-mocks/src/promise */ 13);

	var _base = __webpack_require__(/*! ../base */ 45);

	var _child = __webpack_require__(/*! ../child */ 53);

	var _parent = __webpack_require__(/*! ../parent */ 58);

	var _delegate = __webpack_require__(/*! ../delegate */ 62);

	var _props = __webpack_require__(/*! ./props */ 63);

	var _window = __webpack_require__(/*! ../window */ 54);

	var _constants = __webpack_require__(/*! ../../constants */ 56);

	var _drivers = __webpack_require__(/*! ../parent/drivers */ 59);

	var _validate2 = __webpack_require__(/*! ./validate */ 64);

	var _parent2 = __webpack_require__(/*! ./templates/parent.htm */ 65);

	var _parent3 = _interopRequireDefault(_parent2);

	var _component = __webpack_require__(/*! ./templates/component.htm */ 66);

	var _component2 = _interopRequireDefault(_component);

	var _drivers2 = __webpack_require__(/*! ../../drivers */ 67);

	var drivers = _interopRequireWildcard(_drivers2);

	var _lib = __webpack_require__(/*! ../../lib */ 46);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var components = exports.components = {};

	/*  Component
	    ---------

	    This is the spec for the component. The idea is, when I call xcomponent.create(), it will create a new instance
	    of Component with the blueprint needed to set up ParentComponents and ChildComponents.

	    This is the one portion of code which is required by -- and shared to -- both the parent and child windows, and
	    contains all of the configuration needed for them to set themselves up.
	*/

	var Component = exports.Component = function (_BaseComponent) {
	    _inherits(Component, _BaseComponent);

	    function Component() {
	        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	        _classCallCheck(this, Component);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Component).call(this, options));

	        _this.validate(options);

	        // The tag name of the component. Used by some drivers (e.g. angular) to turn the component into an html element,
	        // e.g. <my-component>

	        _this.addProp(options, 'tag');

	        // Name of the component, used for logging. Auto-generated from the tag name by default.

	        _this.addProp(options, 'name', _this.tag.replace(/-/g, '_'));

	        // A json based spec describing what kind of props the component accepts. This is used to validate any props before
	        // they are passed down to the child.

	        _this.props = _extends({}, _props.internalProps, options.props);

	        // The dimensions of the component, e.g. { width: 500, height: 200 }

	        _this.addProp(options, 'dimensions');
	        _this.addProp(options, 'scrolling');

	        _this.addProp(options, 'version', 'latest');

	        // The default environment we should render to if none is specified in the parent

	        _this.addProp(options, 'defaultEnv');

	        // A mapping of env->url, used to determine which url to load for which env

	        _this.addProp(options, 'envUrls');

	        _this.addProp(options, 'buildUrl');

	        _this.addProp(options, 'bridgeUrl');
	        _this.addProp(options, 'bridgeUrls');

	        _this.addProp(options, 'bridgeDomain');
	        _this.addProp(options, 'bridgeDomains');

	        // A url to use by default to render the component, if not using envs

	        _this.addProp(options, 'url');

	        // The allowed contexts. For example { iframe: true, lightbox: false, popup: false }. Defaults to true for all.

	        _this.addProp(options, 'contexts', {});
	        for (var _iterator = _constants.CONTEXT_TYPES_LIST, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	            var _ref;

	            if (_isArray) {
	                if (_i >= _iterator.length) break;
	                _ref = _iterator[_i++];
	            } else {
	                _i = _iterator.next();
	                if (_i.done) break;
	                _ref = _i.value;
	            }

	            var context = _ref;

	            _this.contexts[context] = _this.contexts[context] === undefined ? true : Boolean(_this.contexts[context]);
	        }

	        // The default context to render to

	        _this.addProp(options, 'defaultContext');

	        // Should this be a singleton component? Do I want to allow it to be rendered more than once on the same page?

	        _this.addProp(options, 'singleton');

	        // Auto Resize option

	        _this.addProp(options, 'autoResize', false);

	        // Templates and styles for the parent page and the initial rendering of the component

	        _this.addProp(options, 'parentTemplate', _parent3['default']);
	        _this.addProp(options, 'componentTemplate', _component2['default']);

	        _this.addProp(options, 'validateProps');

	        _this.addProp(options, 'domain');
	        _this.addProp(options, 'domains');
	        _this.addProp(options, 'remoteRenderDomain');

	        // A mapping of tag->component so we can reference components by string tag name

	        components[_this.tag] = _this;

	        // Register all of the drivers for instantiating components. The model used is -- there's a standard javascript
	        // way of rendering a component, then each other technology (e.g. react) needs to hook into that interface.
	        // This makes us a little more pluggable and loosely coupled.

	        _this.registerDrivers();
	        _this.registerChild();
	        _this.listenDelegate();
	        return _this;
	    }

	    _createClass(Component, [{
	        key: 'registerDrivers',
	        value: function registerDrivers() {
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

	                var driver = drivers[driverName];
	                if (driver.isActive()) {
	                    driver.register(this);
	                }
	            }
	        }
	    }, {
	        key: 'registerChild',
	        value: function registerChild() {
	            if ((0, _window.isXComponentWindow)()) {
	                var componentMeta = (0, _window.getComponentMeta)();

	                if (componentMeta.tag === this.tag) {
	                    window.xchild = new _child.ChildComponent(this);
	                    window.xprops = window.xchild.props;
	                }
	            }
	        }
	    }, {
	        key: 'listenDelegate',
	        value: function listenDelegate() {
	            var _this2 = this;

	            if (this.remoteRenderDomain) {
	                _src2['default'].on(_constants.POST_MESSAGE.DELEGATE + '_' + this.name, { domain: this.remoteRenderDomain }, function (_ref3) {
	                    var source = _ref3.source;
	                    var data = _ref3.data;


	                    var delegate = _this2.delegate(source, data.options);

	                    return {
	                        overrides: delegate.getOverrides(data.context),
	                        destroy: function destroy() {
	                            return delegate.destroy();
	                        }
	                    };
	                });
	            }
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

	        /*  Parent
	            ------
	             Get an instance of the parent for this component (lives on the parent page which contains the component)
	        */

	    }, {
	        key: 'parent',
	        value: function parent(options) {
	            return new _parent.ParentComponent(this, null, options);
	        }

	        /*  Child
	            -----
	             Get an instance of the child for this component (lives on the child component page which lives in the parent)
	        */

	    }, {
	        key: 'child',
	        value: function child(options) {

	            if (!window.xchild) {
	                throw new Error('Child not instantiated');
	            }

	            if (window.xchild.component !== this) {
	                // throw new Error(`Child instantiated from a different component: ${window.xchild.tag}`);
	            }

	            if (options && options.onEnter) {
	                options.onEnter.call(window.xchild);
	            }

	            return window.xchild;
	        }

	        /*  Attach
	            ------
	             Shortcut to instantiate a child in a child component window
	        */

	    }, {
	        key: 'attach',
	        value: function attach(options) {
	            return this.child(options);
	        }

	        /*  Init
	            ----
	             Shortcut to instantiate a component on a parent page, with props
	        */

	    }, {
	        key: 'init',
	        value: function init(props, context, element) {
	            context = this.getRenderContext(element, context);
	            return new _parent.ParentComponent(this, context, { props: props });
	        }
	    }, {
	        key: 'delegate',
	        value: function delegate(source) {
	            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	            return new _delegate.DelegateComponent(this, source, options);
	        }
	    }, {
	        key: 'getRenderContext',
	        value: function getRenderContext(element, context) {

	            var tag = this.tag;
	            var defaultContext = this.defaultContext;
	            var contexts = this.contexts;

	            if (element) {
	                if (context && !_drivers.RENDER_DRIVERS[context].requiresElement) {
	                    throw new Error('[' + tag + '] ' + context + ' context can not be rendered into element');
	                }

	                context = _constants.CONTEXT_TYPES.IFRAME;
	            }

	            if (context) {

	                if (!contexts[context]) {
	                    throw new Error('[' + tag + '] ' + context + ' context not allowed by component');
	                }

	                if (_drivers.RENDER_DRIVERS[context].requiresElement && !element) {
	                    throw new Error('[' + tag + '] Must specify element to render to iframe');
	                }

	                return context;
	            }

	            if (defaultContext) {
	                return defaultContext;
	            }

	            var _arr = [_constants.CONTEXT_TYPES.LIGHTBOX, _constants.CONTEXT_TYPES.POPUP];
	            for (var _i3 = 0; _i3 < _arr.length; _i3++) {
	                var renderContext = _arr[_i3];
	                if (contexts[renderContext]) {
	                    return renderContext;
	                }
	            }

	            throw new Error('[' + tag + '] No context options available for render');
	        }

	        /*  Render
	            ------
	             Shortcut to render a parent component
	        */

	    }, {
	        key: 'render',
	        value: function render(props, element, context) {
	            var _this3 = this;

	            return _promise.SyncPromise['try'](function () {
	                context = _this3.getRenderContext(element, context);
	                return new _parent.ParentComponent(_this3, context, { props: props }).render(element);
	            });
	        }
	    }, {
	        key: 'renderTo',
	        value: function renderTo(win, props, element, context) {
	            var _this4 = this;

	            return _promise.SyncPromise['try'](function () {
	                context = _this4.getRenderContext(element, context);
	                return new _parent.ParentComponent(_this4, context, { props: props }).renderTo(win, element);
	            });
	        }

	        /*  Get By Tag
	            ----------
	             Get a component instance by tag name
	        */

	    }, {
	        key: 'getByTag',
	        value: function getByTag(tag) {
	            return components[tag];
	        }

	        /*  Validate
	            --------
	             Validate any options passed into Component
	        */

	    }, {
	        key: 'validate',
	        value: function validate(options) {
	            return (0, _validate2.validate)(options);
	        }

	        /*  Log
	            ---
	             Log an event using the component name
	        */

	    }, {
	        key: 'log',
	        value: function log(event) {
	            var payload = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	            _client2['default'].info('xc_' + this.name + '_' + event, payload);
	        }

	        /*  Log Warning
	            -----------
	             Log a warning
	        */

	    }, {
	        key: 'logWarning',
	        value: function logWarning(event, payload) {
	            _client2['default'].warn('xc_' + this.name + '_' + event, payload);
	        }

	        /*  Log Error
	            ---------
	             Log an error
	        */

	    }, {
	        key: 'logError',
	        value: function logError(event, payload) {
	            _client2['default'].error('xc_' + this.name + '_' + event, payload);
	        }
	    }]);

	    return Component;
	}(_base.BaseComponent);

	function getByTag(tag) {
	    return components[tag];
	}

	/*  Generate Render Methods
	 -----------------------

	 Autogenerate methods like renderIframe, renderPopupToParent
	 */

	var _loop = function _loop() {
	    if (_isArray3) {
	        if (_i4 >= _iterator3.length) return 'break';
	        _ref4 = _iterator3[_i4++];
	    } else {
	        _i4 = _iterator3.next();
	        if (_i4.done) return 'break';
	        _ref4 = _i4.value;
	    }

	    var context = _ref4;


	    var contextName = (0, _lib.capitalizeFirstLetter)(context);

	    Component.prototype['render' + contextName] = function (props, element) {
	        return this.render(props, element, context);
	    };

	    Component.prototype['render' + contextName + 'To'] = function (win, props, element) {
	        return this.renderTo(win, props, element, context);
	    };
	};

	for (var _iterator3 = _constants.CONTEXT_TYPES_LIST, _isArray3 = Array.isArray(_iterator3), _i4 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
	    var _ref4;

	    var _ret = _loop();

	    if (_ret === 'break') break;
	}

/***/ },
/* 3 */
/*!***********************************!*\
  !*** ./~/post-robot/src/index.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Promise = undefined;
	exports.init = init;
	exports.reset = reset;

	var _interface = __webpack_require__(/*! ./interface */ 4);

	Object.keys(_interface).forEach(function (key) {
	    if (key === "default") return;
	    Object.defineProperty(exports, key, {
	        enumerable: true,
	        get: function get() {
	            return _interface[key];
	        }
	    });
	});

	var _lib = __webpack_require__(/*! ./lib */ 11);

	Object.defineProperty(exports, 'Promise', {
	    enumerable: true,
	    get: function get() {
	        return _lib.Promise;
	    }
	});

	var _drivers = __webpack_require__(/*! ./drivers */ 9);

	var _global = __webpack_require__(/*! ./global */ 18);

	var _bridge = __webpack_require__(/*! ./bridge */ 27);

	function init() {

	    if (!_global.global.initialized) {
	        (0, _drivers.listenForMessages)();
	        (0, _bridge.openTunnelToOpener)();
	        (0, _lib.initOnReady)();
	        (0, _lib.listenForMethods)();
	    }

	    _global.global.initialized = true;
	}

	init();

	function reset() {
	    return _global.global.clean.all().then(function () {
	        _global.global.initialized = false;
	        return init();
	    });
	}

	exports['default'] = module.exports;

/***/ },
/* 4 */
/*!*********************************************!*\
  !*** ./~/post-robot/src/interface/index.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.winutil = exports.util = exports.destroyBridges = exports.openTunnelToOpener = exports.needsBridgeForDomain = exports.needsBridgeForWin = exports.needsBridgeForBrowser = exports.needsBridge = exports.isBridge = exports.linkUrl = exports.openBridge = exports.parent = undefined;

	var _client = __webpack_require__(/*! ./client */ 5);

	Object.keys(_client).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _client[key];
	    }
	  });
	});

	var _server = __webpack_require__(/*! ./server */ 33);

	Object.keys(_server).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _server[key];
	    }
	  });
	});

	var _config = __webpack_require__(/*! ./config */ 34);

	Object.keys(_config).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _config[key];
	    }
	  });
	});

	var _bridge = __webpack_require__(/*! ../bridge */ 27);

	Object.defineProperty(exports, 'openBridge', {
	  enumerable: true,
	  get: function get() {
	    return _bridge.openBridge;
	  }
	});
	Object.defineProperty(exports, 'linkUrl', {
	  enumerable: true,
	  get: function get() {
	    return _bridge.linkUrl;
	  }
	});
	Object.defineProperty(exports, 'isBridge', {
	  enumerable: true,
	  get: function get() {
	    return _bridge.isBridge;
	  }
	});
	Object.defineProperty(exports, 'needsBridge', {
	  enumerable: true,
	  get: function get() {
	    return _bridge.needsBridge;
	  }
	});
	Object.defineProperty(exports, 'needsBridgeForBrowser', {
	  enumerable: true,
	  get: function get() {
	    return _bridge.needsBridgeForBrowser;
	  }
	});
	Object.defineProperty(exports, 'needsBridgeForWin', {
	  enumerable: true,
	  get: function get() {
	    return _bridge.needsBridgeForWin;
	  }
	});
	Object.defineProperty(exports, 'needsBridgeForDomain', {
	  enumerable: true,
	  get: function get() {
	    return _bridge.needsBridgeForDomain;
	  }
	});
	Object.defineProperty(exports, 'openTunnelToOpener', {
	  enumerable: true,
	  get: function get() {
	    return _bridge.openTunnelToOpener;
	  }
	});
	Object.defineProperty(exports, 'destroyBridges', {
	  enumerable: true,
	  get: function get() {
	    return _bridge.destroyBridges;
	  }
	});

	var _util = __webpack_require__(/*! ../lib/util */ 15);

	Object.defineProperty(exports, 'util', {
	  enumerable: true,
	  get: function get() {
	    return _util.util;
	  }
	});

	var _windows = __webpack_require__(/*! ../lib/windows */ 17);

	var windowUtil = _interopRequireWildcard(_windows);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	var parent = exports.parent = (0, _windows.getAncestor)();

	var winutil = exports.winutil = windowUtil;

/***/ },
/* 5 */
/*!**********************************************!*\
  !*** ./~/post-robot/src/interface/client.js ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.send = undefined;
	exports.request = request;
	exports.sendToParent = sendToParent;
	exports.client = client;

	var _conf = __webpack_require__(/*! ../conf */ 6);

	var _drivers = __webpack_require__(/*! ../drivers */ 9);

	var _global = __webpack_require__(/*! ../global */ 18);

	var _lib = __webpack_require__(/*! ../lib */ 11);

	function request(options) {

	    return _lib.promise.nodeify(new _lib.promise.Promise(function (resolve, reject) {

	        if (!options.name) {
	            throw new Error('Expected options.name');
	        }

	        if (!options.window) {
	            throw new Error('Expected options.window');
	        }

	        if (_conf.CONFIG.MOCK_MODE) {
	            options.window = window;
	        } else if (typeof options.window === 'string') {
	            var el = document.getElementById(options.window);

	            if (!el) {
	                throw new Error('Expected options.window ' + options.window + ' to be a valid element id');
	            }

	            if (el.tagName.toLowerCase() !== 'iframe') {
	                throw new Error('Expected options.window ' + options.window + ' to be an iframe');
	            }

	            options.window = el.contentWindow;

	            if (!options.window) {
	                throw new Error('Expected options.window');
	            }
	        }

	        options.domain = options.domain || '*';

	        var hash = options.name + '_' + _lib.util.uniqueID();
	        _global.global.clean.setItem(_global.global.listeners.response, hash, options);

	        if ((0, _lib.isWindowClosed)(options.window)) {
	            throw new Error('Target window is closed');
	        }

	        var hasResult = false;

	        options.respond = function (err, result) {
	            if (!err) {
	                hasResult = true;
	            }

	            return err ? reject(err) : resolve(result);
	        };

	        return _lib.promise.run(function () {

	            if ((0, _lib.isAncestor)(window, options.window)) {
	                return (0, _lib.onWindowReady)(options.window);
	            }
	        }).then(function () {

	            (0, _drivers.sendMessage)(options.window, {
	                hash: hash,
	                type: _conf.CONSTANTS.POST_MESSAGE_TYPE.REQUEST,
	                name: options.name,
	                data: options.data,
	                fireAndForget: options.fireAndForget
	            }, options.domain)['catch'](reject);

	            if (options.fireAndForget) {
	                return resolve();
	            }

	            var ackTimeout = _lib.util.intervalTimeout(_conf.CONFIG.ACK_TIMEOUT, 100, function (remaining) {

	                if (options.ack || (0, _lib.isWindowClosed)(options.window)) {
	                    return ackTimeout.cancel();
	                }

	                if (!remaining) {
	                    return reject(new Error('No ack for postMessage ' + options.name + ' in ' + _conf.CONFIG.ACK_TIMEOUT + 'ms'));
	                }
	            });

	            if (options.timeout) {
	                (function () {
	                    var timeout = _lib.util.intervalTimeout(options.timeout, 100, function (remaining) {

	                        if (hasResult || (0, _lib.isWindowClosed)(options.window)) {
	                            return timeout.cancel();
	                        }

	                        if (!remaining) {
	                            return reject(new Error('Post message response timed out after ' + options.timeout + ' ms'));
	                        }
	                    }, options.timeout);
	                })();
	            }
	        })['catch'](reject);
	    }), options.callback);
	}

	function _send(window, name, data, options, callback) {

	    if (!callback) {
	        if (!options && typeof data === 'function') {
	            callback = data;
	            options = {};
	            data = {};
	        } else if (typeof options === 'function') {
	            callback = options;
	            options = {};
	        }
	    }

	    options = options || {};
	    options.window = window;
	    options.name = name;
	    options.data = data;
	    options.callback = callback;

	    return request(options);
	}

	exports.send = _send;
	function sendToParent(name, data, options, callback) {

	    var win = (0, _lib.getAncestor)();

	    if (!win) {
	        return new _lib.promise.Promise(function (resolve, reject) {
	            return reject(new Error('Window does not have a parent'));
	        });
	    }

	    return _send(win, name, data, options, callback);
	}

	function client() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];


	    if (!options.window) {
	        throw new Error('Expected options.window');
	    }

	    return {
	        send: function send(name, data, callback) {
	            return _send(options.window, name, data, options, callback);
	        }
	    };
	}

/***/ },
/* 6 */
/*!****************************************!*\
  !*** ./~/post-robot/src/conf/index.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _config = __webpack_require__(/*! ./config */ 7);

	Object.keys(_config).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _config[key];
	    }
	  });
	});

	var _constants = __webpack_require__(/*! ./constants */ 8);

	Object.keys(_constants).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _constants[key];
	    }
	  });
	});

/***/ },
/* 7 */
/*!*****************************************!*\
  !*** ./~/post-robot/src/conf/config.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.CONFIG = undefined;

	var _ALLOWED_POST_MESSAGE;

	var _constants = __webpack_require__(/*! ./constants */ 8);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var CONFIG = exports.CONFIG = {

	    ALLOW_POSTMESSAGE_POPUP:  false ? false : true,

	    LOG_LEVEL: 'info',

	    BRIDGE_TIMEOUT: 5000,
	    ACK_TIMEOUT: 1000,

	    LOG_TO_PAGE: false,

	    MOCK_MODE: false,

	    ALLOWED_POST_MESSAGE_METHODS: (_ALLOWED_POST_MESSAGE = {}, _defineProperty(_ALLOWED_POST_MESSAGE, _constants.CONSTANTS.SEND_STRATEGIES.POST_MESSAGE, true), _defineProperty(_ALLOWED_POST_MESSAGE, _constants.CONSTANTS.SEND_STRATEGIES.BRIDGE, true), _defineProperty(_ALLOWED_POST_MESSAGE, _constants.CONSTANTS.SEND_STRATEGIES.GLOBAL, true), _ALLOWED_POST_MESSAGE)
	};

	if (window.location.href.indexOf(_constants.CONSTANTS.FILE_PROTOCOL) === 0) {
	    CONFIG.ALLOW_POSTMESSAGE_POPUP = true;
	}

/***/ },
/* 8 */
/*!********************************************!*\
  !*** ./~/post-robot/src/conf/constants.js ***!
  \********************************************/
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var CONSTANTS = exports.CONSTANTS = {

	    POST_MESSAGE_TYPE: {
	        REQUEST: 'postrobot_message_request',
	        RESPONSE: 'postrobot_message_response',
	        ACK: 'postrobot_message_ack'
	    },

	    POST_MESSAGE_ACK: {
	        SUCCESS: 'success',
	        ERROR: 'error'
	    },

	    POST_MESSAGE_NAMES: {
	        METHOD: 'postrobot_method',
	        READY: 'postrobot_ready',
	        OPEN_TUNNEL: 'postrobot_open_tunnel'
	    },

	    WINDOW_TYPES: {
	        FULLPAGE: 'fullpage',
	        POPUP: 'popup',
	        IFRAME: 'iframe'
	    },

	    WINDOW_PROPS: {
	        POSTROBOT: '__postRobot__'
	    },

	    SERIALIZATION_TYPES: {
	        METHOD: 'postrobot_method',
	        ERROR: 'postrobot_error'
	    },

	    SEND_STRATEGIES: {
	        POST_MESSAGE: 'postrobot_post_message',
	        BRIDGE: 'postrobot_bridge',
	        GLOBAL: 'postrobot_global'
	    },

	    MOCK_PROTOCOL: 'mock:',
	    FILE_PROTOCOL: 'file:',

	    BRIDGE_NAME_PREFIX: '__postrobot_bridge__',
	    POSTROBOT_PROXY: '__postrobot_proxy__'
	};

	var POST_MESSAGE_NAMES_LIST = exports.POST_MESSAGE_NAMES_LIST = Object.keys(CONSTANTS.POST_MESSAGE_NAMES).map(function (key) {
	    return CONSTANTS.POST_MESSAGE_NAMES[key];
	});

/***/ },
/* 9 */
/*!*******************************************!*\
  !*** ./~/post-robot/src/drivers/index.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _receive = __webpack_require__(/*! ./receive */ 10);

	Object.keys(_receive).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _receive[key];
	    }
	  });
	});

	var _send = __webpack_require__(/*! ./send */ 25);

	Object.keys(_send).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _send[key];
	    }
	  });
	});

	var _listeners = __webpack_require__(/*! ./listeners */ 32);

	Object.keys(_listeners).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _listeners[key];
	    }
	  });
	});

/***/ },
/* 10 */
/*!***************************************************!*\
  !*** ./~/post-robot/src/drivers/receive/index.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.receiveMessage = receiveMessage;
	exports.messageListener = messageListener;
	exports.listenForMessages = listenForMessages;

	var _conf = __webpack_require__(/*! ../../conf */ 6);

	var _lib = __webpack_require__(/*! ../../lib */ 11);

	var _compat = __webpack_require__(/*! ../../compat */ 22);

	var _global = __webpack_require__(/*! ../../global */ 18);

	var _types = __webpack_require__(/*! ./types */ 24);

	_global.global.receivedMessages = _global.global.receivedMessages || [];

	function parseMessage(message) {

	    try {
	        message = (0, _lib.jsonParse)(message);
	    } catch (err) {
	        return;
	    }

	    if (!message) {
	        return;
	    }

	    message = message[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT];

	    if (!message) {
	        return;
	    }

	    if (!message.type) {
	        return;
	    }

	    if (!_types.RECEIVE_MESSAGE_TYPES[message.type]) {
	        return;
	    }

	    return message;
	}

	function receiveMessage(event) {

	    if (!window || window.closed) {
	        throw new Error('Message recieved in closed window');
	    }

	    try {
	        if (!event.source) {
	            return;
	        }
	    } catch (err) {
	        return;
	    }

	    var source = event.source;
	    var origin = event.origin;
	    var data = event.data;


	    var message = parseMessage(data);

	    if (!message) {
	        return;
	    }

	    if (message.sourceDomain.indexOf(_conf.CONSTANTS.MOCK_PROTOCOL) === 0 || message.sourceDomain.indexOf(_conf.CONSTANTS.FILE_PROTOCOL) === 0) {
	        origin = message.sourceDomain;
	    }

	    if (_global.global.receivedMessages.indexOf(message.id) === -1) {
	        _global.global.clean.push(_global.global.receivedMessages, message.id);
	    } else {
	        return;
	    }

	    var level = void 0;

	    if (_conf.POST_MESSAGE_NAMES_LIST.indexOf(message.name) !== -1 || message.type === _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK) {
	        level = 'debug';
	    } else if (message.ack === 'error') {
	        level = 'error';
	    } else {
	        level = 'info';
	    }

	    _lib.log.logLevel(level, ['\n\n\t', '#receive', message.type.replace(/^postrobot_message_/, ''), '::', message.name, '::', origin, '\n\n', message]);

	    if ((0, _lib.isWindowClosed)(source)) {
	        return _lib.log.debug('Source window is closed - can not send ' + message.type + ' ' + message.name);
	    }

	    if (message.data) {
	        message.data = (0, _lib.deserializeMethods)(source, origin, message.data);
	    }

	    _types.RECEIVE_MESSAGE_TYPES[message.type](source, origin, message);
	}

	function messageListener(event) {

	    try {
	        event.source; // eslint-disable-line
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
	    var listener = _lib.util.listen(window, 'message', messageListener);

	    _global.global.clean.register('listener', function () {
	        listener.cancel();
	    });
	}

/***/ },
/* 11 */
/*!***************************************!*\
  !*** ./~/post-robot/src/lib/index.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _promise = __webpack_require__(/*! ./promise */ 12);

	Object.keys(_promise).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _promise[key];
	    }
	  });
	});

	var _util = __webpack_require__(/*! ./util */ 15);

	Object.keys(_util).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _util[key];
	    }
	  });
	});

	var _log = __webpack_require__(/*! ./log */ 16);

	Object.keys(_log).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _log[key];
	    }
	  });
	});

	var _windows = __webpack_require__(/*! ./windows */ 17);

	Object.keys(_windows).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _windows[key];
	    }
	  });
	});

	var _methods = __webpack_require__(/*! ./methods */ 20);

	Object.keys(_methods).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _methods[key];
	    }
	  });
	});

	var _tick = __webpack_require__(/*! ./tick */ 14);

	Object.keys(_tick).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _tick[key];
	    }
	  });
	});

	var _ready = __webpack_require__(/*! ./ready */ 21);

	Object.keys(_ready).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _ready[key];
	    }
	  });
	});

	var _cleanup = __webpack_require__(/*! ./cleanup */ 19);

	Object.keys(_cleanup).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _cleanup[key];
	    }
	  });
	});

/***/ },
/* 12 */
/*!*****************************************!*\
  !*** ./~/post-robot/src/lib/promise.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.promise = exports.Promise = undefined;

	var _promise = __webpack_require__(/*! sync-browser-mocks/src/promise */ 13);

	var _tick = __webpack_require__(/*! ./tick */ 14);

	var Promise = exports.Promise = _promise.SyncPromise;

	var promise = exports.promise = {

	    Promise: Promise,

	    run: function run(method) {
	        return Promise.resolve().then(method);
	    },
	    nextTick: function nextTick(method) {
	        return new Promise(function (resolve, reject) {
	            (0, _tick.nextTick)(function () {
	                return promise.run(method).then(resolve, reject);
	            });
	        });
	    },
	    method: function method(_method) {
	        return function promiseWrapper() {
	            var _this = this,
	                _arguments = arguments;

	            return Promise.resolve().then(function () {
	                return _method.apply(_this, _arguments);
	            });
	        };
	    },
	    nodeify: function nodeify(prom, callback) {
	        if (!callback) {
	            return prom;
	        }
	        prom.then(function (result) {
	            callback(null, result);
	        }, function (err) {
	            callback(err);
	        });
	    },
	    deNodeify: function deNodeify(method) {
	        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	            args[_key - 1] = arguments[_key];
	        }

	        return new Promise(function (resolve, reject) {
	            try {
	                if (args.length < method.length) {
	                    return method.apply(undefined, args.concat([function (err, result) {
	                        return err ? reject(err) : resolve(result);
	                    }]));
	                }

	                return promise.run(function () {
	                    return method.apply(undefined, args);
	                }).then(resolve, reject);
	            } catch (err) {
	                return reject(err);
	            }
	        });
	    },
	    map: function map(items, method) {

	        var results = [];

	        var _loop = function _loop(i) {
	            results.push(promise.run(function () {
	                return method(items[i]);
	            }));
	        };

	        for (var i = 0; i < items.length; i++) {
	            _loop(i);
	        }
	        return Promise.all(results);
	    }
	};

/***/ },
/* 13 */
/*!*********************************************!*\
  !*** ./~/sync-browser-mocks/src/promise.js ***!
  \*********************************************/
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.patchPromise = patchPromise;

	function trycatch(method, successHandler, errorHandler) {

	    var isCalled = false;
	    var isSuccess = false;
	    var isError = false;
	    var err = void 0,
	        res = void 0;

	    function flush() {
	        if (isCalled) {
	            if (isError) {
	                return errorHandler(err);
	            } else if (isSuccess) {
	                return successHandler(res);
	            }
	        }
	    }

	    try {
	        method(function (result) {
	            res = result;
	            isSuccess = true;
	            flush();
	        }, function (error) {
	            err = error;
	            isError = true;
	            flush();
	        });
	    } catch (error) {
	        return errorHandler(error);
	    }

	    isCalled = true;
	    flush();
	}

	var possiblyUnhandledPromiseHandlers = [];
	var possiblyUnhandledPromises = [];
	var possiblyUnhandledPromiseTimeout = void 0;

	function addPossiblyUnhandledPromise(promise) {
	    possiblyUnhandledPromises.push(promise);
	    possiblyUnhandledPromiseTimeout = possiblyUnhandledPromiseTimeout || setTimeout(flushPossiblyUnhandledPromises, 1);
	}

	function flushPossiblyUnhandledPromises() {

	    possiblyUnhandledPromiseTimeout = null;
	    var promises = possiblyUnhandledPromises;
	    possiblyUnhandledPromises = [];

	    var _loop = function _loop(i) {
	        var promise = promises[i];

	        if (promise.silentReject) {
	            return 'continue';
	        }

	        promise.handlers.push({
	            onError: function onError(err) {
	                if (promise.silentReject) {
	                    return;
	                }

	                dispatchError(err);
	            }
	        });

	        promise.dispatch();
	    };

	    for (var i = 0; i < promises.length; i++) {
	        var _ret = _loop(i);

	        if (_ret === 'continue') continue;
	    }
	}

	var dispatchedErrors = [];

	function dispatchError(err) {

	    if (dispatchedErrors.indexOf(err) !== -1) {
	        return;
	    }

	    dispatchedErrors.push(err);

	    setTimeout(function () {
	        throw err;
	    }, 1);

	    for (var j = 0; j < possiblyUnhandledPromiseHandlers.length; j++) {
	        possiblyUnhandledPromiseHandlers[j](err);
	    }
	}

	var toString = {}.toString;

	function isPromise(item) {
	    try {
	        if (!item) {
	            return false;
	        }

	        if (window.Window && item instanceof window.Window) {
	            return false;
	        }

	        if (window.constructor && item instanceof window.constructor) {
	            return false;
	        }

	        if (toString) {
	            var name = toString.call(item);

	            if (name === '[object Window]' || name === '[object global]' || name === '[object DOMWindow]') {
	                return false;
	            }
	        }

	        if (item && item.then instanceof Function) {
	            return true;
	        }
	    } catch (err) {
	        return false;
	    }

	    return false;
	}

	var SyncPromise = exports.SyncPromise = function SyncPromise(handler) {

	    this.resolved = false;
	    this.rejected = false;

	    this.silentReject = false;

	    this.handlers = [];

	    addPossiblyUnhandledPromise(this);

	    if (!handler) {
	        return;
	    }

	    var self = this;

	    trycatch(handler, function (res) {
	        return self.resolve(res);
	    }, function (err) {
	        return self.reject(err);
	    });
	};

	SyncPromise.resolve = function SyncPromiseResolve(value) {

	    if (isPromise(value)) {
	        return value;
	    }

	    return new SyncPromise().resolve(value);
	};

	SyncPromise.reject = function SyncPromiseResolve(error) {
	    return new SyncPromise().reject(error);
	};

	SyncPromise.prototype.resolve = function (result) {
	    if (this.resolved || this.rejected) {
	        return this;
	    }

	    if (isPromise(result)) {
	        throw new Error('Can not resolve promise with another promise');
	    }

	    this.resolved = true;
	    this.value = result;
	    this.dispatch();

	    return this;
	};

	SyncPromise.prototype.reject = function (error) {
	    if (this.resolved || this.rejected) {
	        return this;
	    }

	    if (isPromise(error)) {
	        throw new Error('Can not reject promise with another promise');
	    }

	    this.rejected = true;
	    this.value = error;
	    this.dispatch();

	    return this;
	};

	SyncPromise.prototype.asyncReject = function (error) {
	    this.silentReject = true;
	    this.reject(error);
	};

	SyncPromise.prototype.dispatch = function () {
	    var _this = this;

	    if (!this.resolved && !this.rejected) {
	        return;
	    }

	    var _loop2 = function _loop2() {

	        var handler = _this.handlers.shift();

	        var result = void 0,
	            error = void 0;

	        try {
	            if (_this.resolved) {
	                result = handler.onSuccess ? handler.onSuccess(_this.value) : _this.value;
	            } else if (_this.rejected) {
	                if (handler.onError) {
	                    result = handler.onError(_this.value);
	                } else {
	                    error = _this.value;
	                }
	            }
	        } catch (err) {
	            error = err;
	        }

	        if (result === _this) {
	            throw new Error('Can not return a promise from the the then handler of the same promise');
	        }

	        if (!handler.promise) {
	            return 'continue';
	        }

	        if (error) {
	            handler.promise.reject(error);
	        } else if (isPromise(result)) {
	            result.then(function (res) {
	                handler.promise.resolve(res);
	            }, function (err) {
	                handler.promise.reject(err);
	            });
	        } else {
	            handler.promise.resolve(result);
	        }
	    };

	    while (this.handlers.length) {
	        var _ret2 = _loop2();

	        if (_ret2 === 'continue') continue;
	    }
	};

	SyncPromise.prototype.then = function (onSuccess, onError) {

	    if (onSuccess && typeof onSuccess !== 'function' && !onSuccess.call) {
	        throw new Error('Promise.then expected a function for success handler');
	    }

	    if (onError && typeof onError !== 'function' && !onError.call) {
	        throw new Error('Promise.then expected a function for error handler');
	    }

	    var promise = new SyncPromise(null, this);

	    this.handlers.push({
	        promise: promise,
	        onSuccess: onSuccess,
	        onError: onError
	    });

	    this.silentReject = true;

	    this.dispatch();

	    return promise;
	};

	SyncPromise.prototype['catch'] = function (onError) {
	    return this.then(null, onError);
	};

	SyncPromise.prototype['finally'] = function (handler) {
	    return this.then(function (result) {
	        return SyncPromise['try'](handler).then(function () {
	            return result;
	        });
	    }, function (err) {
	        return SyncPromise['try'](handler).then(function () {
	            throw err;
	        });
	    });
	};

	SyncPromise.all = function (promises) {

	    var promise = new SyncPromise();
	    var count = promises.length;
	    var results = [];

	    var _loop3 = function _loop3(i) {

	        var prom = isPromise(promises[i]) ? promises[i] : SyncPromise.resolve(promises[i]);

	        prom.then(function (result) {
	            results[i] = result;
	            count -= 1;
	            if (count === 0) {
	                promise.resolve(results);
	            }
	        }, function (err) {
	            promise.reject(err);
	        });
	    };

	    for (var i = 0; i < promises.length; i++) {
	        _loop3(i);
	    }

	    if (!count) {
	        promise.resolve(results);
	    }

	    return promise;
	};

	SyncPromise.onPossiblyUnhandledException = function syncPromiseOnPossiblyUnhandledException(handler) {
	    possiblyUnhandledPromiseHandlers.push(handler);
	};

	SyncPromise['try'] = function syncPromiseTry(method) {
	    return SyncPromise.resolve().then(method);
	};

	SyncPromise.delay = function syncPromiseDelay(delay) {
	    return new SyncPromise(function (resolve) {
	        setTimeout(resolve, delay);
	    });
	};

	SyncPromise.hash = function (obj) {

	    var results = {};
	    var promises = [];

	    var _loop4 = function _loop4(key) {
	        if (obj.hasOwnProperty(key)) {
	            promises.push(SyncPromise.resolve(obj[key]).then(function (result) {
	                results[key] = result;
	            }));
	        }
	    };

	    for (var key in obj) {
	        _loop4(key);
	    }

	    return SyncPromise.all(promises).then(function () {
	        return results;
	    });
	};

	SyncPromise.promisifyCall = function () {

	    var args = Array.prototype.slice.call(arguments);
	    var method = args.shift();

	    if (typeof method !== 'function') {
	        throw new Error('Expected promisifyCall to be called with a function');
	    }

	    return new SyncPromise(function (resolve, reject) {

	        args.push(function (err, result) {
	            return err ? reject(err) : resolve(result);
	        });

	        return method.apply(null, args);
	    });
	};

	function patchPromise() {
	    window.Promise = SyncPromise;
	}

/***/ },
/* 14 */
/*!**************************************!*\
  !*** ./~/post-robot/src/lib/tick.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.nextTick = nextTick;

	var _util = __webpack_require__(/*! ./util */ 15);

	var tickMessageName = '__nextTick__postRobot__' + _util.util.uniqueID();
	var queue = [];

	window.addEventListener('message', function (event) {
	    if (event.data === tickMessageName) {
	        var method = queue.shift();
	        method.call();
	    }
	});

	function nextTick(method) {

	    queue.push(method);
	    window.postMessage(tickMessageName, '*');
	}

/***/ },
/* 15 */
/*!**************************************!*\
  !*** ./~/post-robot/src/lib/util.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.util = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _conf = __webpack_require__(/*! ../conf */ 6);

	var util = exports.util = {
	    once: function once(method) {
	        if (!method) {
	            return method;
	        }
	        var called = false;
	        return function onceWrapper() {
	            if (!called) {
	                called = true;
	                return method.apply(this, arguments);
	            }
	        };
	    },
	    noop: function noop() {},
	    // eslint-disable-line no-empty-function

	    safeHasProp: function safeHasProp(obj, name) {
	        try {
	            if (obj[name]) {
	                return true;
	            } else {
	                return false;
	            }
	        } catch (err) {
	            return false;
	        }
	    },
	    safeGetProp: function safeGetProp(obj, name) {
	        try {
	            return obj[name];
	        } catch (err) {
	            return;
	        }
	    },
	    listen: function listen(win, event, handler) {
	        if (win.addEventListener) {
	            win.addEventListener(event, handler);
	        } else {
	            win.attachEvent('on' + event, handler);
	        }

	        return {
	            cancel: function cancel() {
	                if (win.removeEventListener) {
	                    win.removeEventListener(event, handler);
	                } else {
	                    win.detachEvent('on' + event, handler);
	                }
	            }
	        };
	    },
	    apply: function apply(method, context, args) {
	        if (typeof method.apply === 'function') {
	            return method.apply(context, args);
	        }
	        return method(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9]);
	    },
	    find: function find(collection, method, def) {
	        if (!collection) {
	            return def;
	        }
	        for (var i = 0; i < collection.length; i++) {
	            if (method(collection[i])) {
	                return collection[i];
	            }
	        }
	        return def;
	    },
	    map: function map(collection, method) {
	        var results = [];
	        for (var i = 0; i < collection.length; i++) {
	            results.push(method(collection[i]));
	        }
	        return results;
	    },
	    some: function some(collection, method) {
	        method = method || Boolean;
	        for (var i = 0; i < collection.length; i++) {
	            if (method(collection[i])) {
	                return true;
	            }
	        }
	        return false;
	    },
	    keys: function keys(mapping) {
	        var result = [];
	        for (var key in mapping) {
	            if (mapping.hasOwnProperty(key)) {
	                result.push(key);
	            }
	        }
	        return result;
	    },
	    values: function values(mapping) {
	        var result = [];
	        for (var key in mapping) {
	            if (mapping.hasOwnProperty(key)) {
	                result.push(mapping[key]);
	            }
	        }
	        return result;
	    },
	    getByValue: function getByValue(mapping, value) {
	        for (var key in mapping) {
	            if (mapping.hasOwnProperty(key) && mapping[key] === value) {
	                return key;
	            }
	        }
	    },
	    uniqueID: function uniqueID() {

	        var chars = '0123456789abcdef';

	        return 'xxxxxxxxxx'.replace(/./g, function () {
	            return chars.charAt(Math.floor(Math.random() * chars.length));
	        });
	    },
	    memoize: function memoize(method) {

	        var results = {};

	        return function memoized() {
	            var args = JSON.stringify(Array.prototype.slice.call(arguments));
	            if (!results.hasOwnProperty(args)) {
	                results[args] = method.apply(this, arguments);
	            }
	            return results[args];
	        };
	    },
	    extend: function extend(obj, source) {
	        if (!source) {
	            return obj;
	        }

	        for (var key in source) {
	            if (source.hasOwnProperty(key)) {
	                obj[key] = source[key];
	            }
	        }

	        return obj;
	    },
	    each: function each(obj, callback) {
	        if (Array.isArray(obj)) {
	            for (var i = 0; i < obj.length; i++) {
	                callback(obj[i], i);
	            }
	        } else if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null) {
	            for (var key in obj) {
	                if (obj.hasOwnProperty(key)) {
	                    callback(obj[key], key);
	                }
	            }
	        }
	    },
	    replaceObject: function replaceObject(obj, callback) {
	        var depth = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];


	        if (depth >= 100) {
	            throw new Error('Self-referential object passed, or object contained too many layers');
	        }

	        var newobj = Array.isArray(obj) ? [] : {};

	        util.each(obj, function (item, key) {

	            var result = callback(item, key);

	            if (result !== undefined) {
	                newobj[key] = result;
	            } else if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && item !== null) {
	                newobj[key] = util.replaceObject(item, callback, depth + 1);
	            } else {
	                newobj[key] = item;
	            }
	        });

	        return newobj;
	    },
	    safeInterval: function safeInterval(method, time) {
	        var timeout = void 0;

	        function runInterval() {
	            timeout = setTimeout(runInterval, time);
	            method.call();
	        }

	        timeout = setTimeout(runInterval, time);

	        return {
	            cancel: function cancel() {
	                clearTimeout(timeout);
	            }
	        };
	    },
	    intervalTimeout: function intervalTimeout(time, interval, method) {

	        var safeInterval = util.safeInterval(function () {
	            time -= interval;

	            time = time <= 0 ? 0 : time;

	            if (time === 0) {
	                safeInterval.cancel();
	            }

	            method(time);
	        }, interval);

	        return safeInterval;
	    },
	    getDomain: function getDomain(win) {

	        win = win || window;

	        if (win.mockDomain && win.mockDomain.indexOf(_conf.CONSTANTS.MOCK_PROTOCOL) === 0) {
	            return win.mockDomain;
	        }

	        if (!win.location.protocol) {
	            throw new Error('Can not read window protocol');
	        }

	        if (win.location.protocol === _conf.CONSTANTS.FILE_PROTOCOL) {
	            return win.location.protocol + '//' + win.location.host;
	        }

	        if (!win.location.host) {
	            throw new Error('Can not read window host');
	        }

	        return win.location.protocol + '//' + win.location.host;
	    },
	    getDomainFromUrl: function getDomainFromUrl(url) {

	        var domain = void 0;

	        if (url.match(/^(https?|mock|file):\/\//)) {
	            domain = url;
	        } else {
	            return this.getDomain();
	        }

	        domain = domain.split('/').slice(0, 3).join('/');

	        return domain;
	    },
	    safeGet: function safeGet(obj, prop) {

	        var result = void 0;

	        try {
	            result = obj[prop];
	        } catch (err) {
	            // pass
	        }

	        return result;
	    }
	};

/***/ },
/* 16 */
/*!*************************************!*\
  !*** ./~/post-robot/src/lib/log.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.log = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _util = __webpack_require__(/*! ./util */ 15);

	var _windows = __webpack_require__(/*! ./windows */ 17);

	var _conf = __webpack_require__(/*! ../conf */ 6);

	var LOG_LEVELS = ['debug', 'info', 'warn', 'error'];

	if (Function.prototype.bind && window.console && _typeof(console.log) === 'object') {
	    ['log', 'info', 'warn', 'error'].forEach(function (method) {
	        console[method] = this.bind(console[method], console);
	    }, Function.prototype.call);
	}

	var log = exports.log = {
	    clearLogs: function clearLogs() {

	        if (window.console && window.console.clear) {
	            window.console.clear();
	        }

	        if (_conf.CONFIG.LOG_TO_PAGE) {
	            var container = document.getElementById('postRobotLogs');

	            if (container) {
	                container.parentNode.removeChild(container);
	            }
	        }
	    },
	    writeToPage: function writeToPage(level, args) {
	        setTimeout(function () {
	            var container = document.getElementById('postRobotLogs');

	            if (!container) {
	                container = document.createElement('div');
	                container.id = 'postRobotLogs';
	                container.style.cssText = 'width: 800px; font-family: monospace; white-space: pre-wrap;';
	                document.body.appendChild(container);
	            }

	            var el = document.createElement('div');

	            var date = new Date().toString().split(' ')[4];

	            var payload = _util.util.map(args, function (item) {
	                if (typeof item === 'string') {
	                    return item;
	                }
	                if (!item) {
	                    return Object.prototype.toString.call(item);
	                }
	                var json = void 0;
	                try {
	                    json = (0, _windows.jsonStringify)(item, 0, 2);
	                } catch (e) {
	                    json = '[object]';
	                }

	                return '\n\n' + json + '\n\n';
	            }).join(' ');

	            var msg = date + ' ' + level + ' ' + payload;
	            el.innerHTML = msg;

	            var color = {
	                log: '#ddd',
	                warn: 'orange',
	                error: 'red',
	                info: 'blue',
	                debug: '#aaa'
	            }[level];

	            el.style.cssText = 'margin-top: 10px; color: ' + color + ';';

	            if (!container.childNodes.length) {
	                container.appendChild(el);
	            } else {
	                container.insertBefore(el, container.childNodes[0]);
	            }
	        });
	    },
	    logLevel: function logLevel(level, args) {

	        try {
	            if (LOG_LEVELS.indexOf(level) < LOG_LEVELS.indexOf(_conf.CONFIG.LOG_LEVEL)) {
	                return;
	            }

	            args = Array.prototype.slice.call(args);

	            args.unshift('' + window.location.host + window.location.pathname);
	            args.unshift('::');
	            args.unshift('' + (0, _windows.getWindowType)().toLowerCase());
	            args.unshift('[post-robot]');

	            if (_conf.CONFIG.LOG_TO_PAGE) {
	                log.writeToPage(level, args);
	            }

	            if (!window.console) {
	                return;
	            }

	            if (!window.console[level]) {
	                level = 'log';
	            }

	            if (!window.console[level]) {
	                return;
	            }

	            window.console[level].apply(window.console, args);
	        } catch (err) {
	            // pass
	        }
	    },
	    debug: function debug() {
	        log.logLevel('debug', arguments);
	    },
	    info: function info() {
	        log.logLevel('info', arguments);
	    },
	    warn: function warn() {
	        log.logLevel('warn', arguments);
	    },
	    error: function error() {
	        log.logLevel('error', arguments);
	    }
	};

/***/ },
/* 17 */
/*!*****************************************!*\
  !*** ./~/post-robot/src/lib/windows.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.isSameDomain = isSameDomain;
	exports.getOpener = getOpener;
	exports.getParent = getParent;
	exports.getParents = getParents;
	exports.isAncestorParent = isAncestorParent;
	exports.getFrames = getFrames;
	exports.getAllChildFrames = getAllChildFrames;
	exports.getAllFramesInWindow = getAllFramesInWindow;
	exports.getTop = getTop;
	exports.isWindowClosed = isWindowClosed;
	exports.getUserAgent = getUserAgent;
	exports.getFrameByName = getFrameByName;
	exports.findChildFrameByName = findChildFrameByName;
	exports.findFrameByName = findFrameByName;
	exports.isParent = isParent;
	exports.isOpener = isOpener;
	exports.getAncestor = getAncestor;
	exports.getAncestors = getAncestors;
	exports.isAncestor = isAncestor;
	exports.isPopup = isPopup;
	exports.isIframe = isIframe;
	exports.isFullpage = isFullpage;
	exports.getWindowType = getWindowType;
	exports.isSameTopWindow = isSameTopWindow;
	exports.jsonStringify = jsonStringify;
	exports.jsonParse = jsonParse;

	var _util = __webpack_require__(/*! ./util */ 15);

	var _global = __webpack_require__(/*! ../global */ 18);

	var _conf = __webpack_require__(/*! ../conf */ 6);

	_global.global.domainMatches = _global.global.domainMatches || [];

	var domainMatchTimeout = void 0;

	function isSameDomain(win) {

	    for (var _iterator = _global.global.domainMatches, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	        var _ref;

	        if (_isArray) {
	            if (_i >= _iterator.length) break;
	            _ref = _iterator[_i++];
	        } else {
	            _i = _iterator.next();
	            if (_i.done) break;
	            _ref = _i.value;
	        }

	        var _match = _ref;

	        if (_match.win === win) {
	            return _match.match;
	        }
	    }

	    var match = void 0;

	    try {
	        if (_util.util.getDomain(window) === _util.util.getDomain(win)) {
	            match = true;
	        } else {
	            match = false;
	        }
	    } catch (err) {
	        match = false;
	    }

	    _global.global.clean.push(_global.global.domainMatches, { win: win, match: match });

	    if (!domainMatchTimeout) {
	        domainMatchTimeout = setTimeout(function () {
	            _global.global.domainMatches = [];
	            domainMatchTimeout = null;
	        }, 1);
	    }

	    return match;
	}

	function getOpener(win) {

	    if (!win) {
	        return;
	    }

	    try {
	        return win.opener;
	    } catch (err) {
	        return;
	    }
	}

	function getParent(win) {

	    if (!win) {
	        return;
	    }

	    try {
	        if (win.parent && win.parent !== win) {
	            return win.parent;
	        }
	    } catch (err) {
	        return;
	    }
	}

	function getParents(win) {

	    var result = [];

	    try {

	        while (win.parent !== win) {
	            result.push(win.parent);
	            win = win.parent;
	        }
	    } catch (err) {
	        // pass
	    }

	    return result;
	}

	function isAncestorParent(parent, child) {

	    if (!parent || !child) {
	        return false;
	    }

	    var childParent = getParent(child);

	    if (childParent) {
	        return childParent === parent;
	    }

	    if (getParents(child).indexOf(parent) !== -1) {
	        return true;
	    }

	    return false;
	}

	function getFrames(win) {

	    var result = [];

	    var frames = void 0;

	    try {
	        frames = win.frames;
	    } catch (err) {
	        frames = win;
	    }

	    var len = void 0;

	    try {
	        len = frames.length;
	    } catch (err) {
	        // pass
	    }

	    if (len === 0) {
	        return result;
	    }

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

	        if (!_frame) {
	            return result;
	        }

	        result.push(_frame);
	    }

	    return result;
	}

	function getAllChildFrames(win) {

	    var result = [];

	    for (var _iterator2 = getFrames(win), _isArray2 = Array.isArray(_iterator2), _i3 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
	        var _ref2;

	        if (_isArray2) {
	            if (_i3 >= _iterator2.length) break;
	            _ref2 = _iterator2[_i3++];
	        } else {
	            _i3 = _iterator2.next();
	            if (_i3.done) break;
	            _ref2 = _i3.value;
	        }

	        var frame = _ref2;

	        result.push(frame);

	        for (var _iterator3 = getAllChildFrames(frame), _isArray3 = Array.isArray(_iterator3), _i4 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
	            var _ref3;

	            if (_isArray3) {
	                if (_i4 >= _iterator3.length) break;
	                _ref3 = _iterator3[_i4++];
	            } else {
	                _i4 = _iterator3.next();
	                if (_i4.done) break;
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

	    for (var _iterator4 = getParents(win), _isArray4 = Array.isArray(_iterator4), _i5 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
	        var _ref4;

	        if (_isArray4) {
	            if (_i5 >= _iterator4.length) break;
	            _ref4 = _iterator4[_i5++];
	        } else {
	            _i5 = _iterator4.next();
	            if (_i5.done) break;
	            _ref4 = _i5.value;
	        }

	        var parent = _ref4;


	        result.push(parent);

	        for (var _iterator5 = getFrames(parent), _isArray5 = Array.isArray(_iterator5), _i6 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
	            var _ref5;

	            if (_isArray5) {
	                if (_i6 >= _iterator5.length) break;
	                _ref5 = _iterator5[_i6++];
	            } else {
	                _i6 = _iterator5.next();
	                if (_i6.done) break;
	                _ref5 = _i6.value;
	            }

	            var frame = _ref5;


	            if (result.indexOf(frame) === -1) {
	                result.push(frame);
	            }
	        }
	    }

	    return result;
	}

	function getTop(win) {

	    if (!win) {
	        return;
	    }

	    try {
	        if (win.top) {
	            return win.top;
	        }
	    } catch (err) {
	        // pass
	    }

	    if (getParent(win) === win) {
	        return win;
	    }

	    try {
	        if (isAncestorParent(window, win)) {
	            return window.top;
	        }
	    } catch (err) {
	        // pass
	    }

	    try {
	        if (isAncestorParent(win, window)) {
	            return window.top;
	        }
	    } catch (err) {
	        // pass
	    }

	    for (var _iterator6 = getAllChildFrames(win), _isArray6 = Array.isArray(_iterator6), _i7 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
	        var _ref6;

	        if (_isArray6) {
	            if (_i7 >= _iterator6.length) break;
	            _ref6 = _iterator6[_i7++];
	        } else {
	            _i7 = _iterator6.next();
	            if (_i7.done) break;
	            _ref6 = _i7.value;
	        }

	        var frame = _ref6;

	        try {
	            if (frame.top) {
	                return frame.top;
	            }
	        } catch (err) {
	            // pass
	        }

	        if (getParent(frame) === frame) {
	            return frame;
	        }
	    }
	}

	function isWindowClosed(win) {
	    var allowMock = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];


	    if (win === window) {
	        return false;
	    }

	    try {
	        if (!win) {
	            return true;
	        }
	    } catch (err) {
	        return true;
	    }

	    try {
	        if (win.closed) {
	            return true;
	        }
	    } catch (err) {

	        // I love you so much IE

	        if (err && err.message === 'Call was rejected by callee.\r\n') {
	            return false;
	        }

	        return true;
	    }

	    if (allowMock && isSameDomain(win) && _util.util.safeGet(win, 'mockclosed')) {
	        return true;
	    }

	    /*
	     // IE9... don't even ask. If an iframe is removed from the parent page, .closed does not get set to true
	     try {
	        if (win.parent === win && !getOpener(win) && win !== getTop(window)) {
	            // return true;
	        }
	    } catch (err) {
	        // pass
	    }
	     */

	    return false;
	}

	function getUserAgent(win) {
	    win = win || window;
	    return win.navigator.mockUserAgent || win.navigator.userAgent;
	}

	function getFrameByName(win, name) {

	    var winFrames = getFrames(win);

	    for (var _iterator7 = winFrames, _isArray7 = Array.isArray(_iterator7), _i8 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator]();;) {
	        var _ref7;

	        if (_isArray7) {
	            if (_i8 >= _iterator7.length) break;
	            _ref7 = _iterator7[_i8++];
	        } else {
	            _i8 = _iterator7.next();
	            if (_i8.done) break;
	            _ref7 = _i8.value;
	        }

	        var childFrame = _ref7;

	        try {
	            if (isSameDomain(childFrame) && childFrame.name === name && winFrames.indexOf(childFrame) !== -1) {
	                return childFrame;
	            }
	        } catch (err) {
	            // pass
	        }
	    }

	    try {
	        if (winFrames.indexOf(win.frames[name]) !== -1) {
	            return win.frames[name];
	        }
	    } catch (err) {
	        // pass
	    }

	    try {
	        if (winFrames.indexOf(win[name]) !== -1) {
	            return win[name];
	        }
	    } catch (err) {
	        // pass
	    }
	}

	function findChildFrameByName(win, name) {

	    var frame = getFrameByName(win, name);

	    if (frame) {
	        return frame;
	    }

	    for (var _iterator8 = getFrames(win), _isArray8 = Array.isArray(_iterator8), _i9 = 0, _iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator]();;) {
	        var _ref8;

	        if (_isArray8) {
	            if (_i9 >= _iterator8.length) break;
	            _ref8 = _iterator8[_i9++];
	        } else {
	            _i9 = _iterator8.next();
	            if (_i9.done) break;
	            _ref8 = _i9.value;
	        }

	        var childFrame = _ref8;

	        var namedFrame = findChildFrameByName(childFrame, name);

	        if (namedFrame) {
	            return namedFrame;
	        }
	    }
	}

	function findFrameByName(win, name) {

	    var frame = void 0;

	    frame = getFrameByName(win, name);

	    if (frame) {
	        return frame;
	    }

	    return findChildFrameByName(getTop(win), name);
	}

	function isParent(win, frame) {

	    var frameParent = getParent(frame);

	    if (frameParent) {
	        return frameParent === win;
	    }

	    for (var _iterator9 = getFrames(win), _isArray9 = Array.isArray(_iterator9), _i10 = 0, _iterator9 = _isArray9 ? _iterator9 : _iterator9[Symbol.iterator]();;) {
	        var _ref9;

	        if (_isArray9) {
	            if (_i10 >= _iterator9.length) break;
	            _ref9 = _iterator9[_i10++];
	        } else {
	            _i10 = _iterator9.next();
	            if (_i10.done) break;
	            _ref9 = _i10.value;
	        }

	        var childFrame = _ref9;

	        if (childFrame === frame) {
	            return true;
	        }
	    }

	    return false;
	}

	function isOpener(parent, child) {

	    return parent === getOpener(child);
	}

	function getAncestor(win) {
	    win = win || window;

	    var opener = getOpener(win);

	    if (opener) {
	        return opener;
	    }

	    var parent = getParent(win);

	    if (parent) {
	        return parent;
	    }
	}

	function getAncestors(win) {

	    var results = [];

	    var ancestor = win;

	    while (ancestor) {
	        ancestor = getAncestor(ancestor);
	        if (ancestor) {
	            results.push(ancestor);
	        }
	    }

	    return results;
	}

	function isAncestor(parent, child) {

	    var actualParent = getAncestor(child);

	    if (actualParent) {
	        if (actualParent === parent) {
	            return true;
	        }

	        return false;
	    }

	    if (child === parent) {
	        return false;
	    }

	    if (getTop(child) === child) {
	        return false;
	    }

	    for (var _iterator10 = getFrames(parent), _isArray10 = Array.isArray(_iterator10), _i11 = 0, _iterator10 = _isArray10 ? _iterator10 : _iterator10[Symbol.iterator]();;) {
	        var _ref10;

	        if (_isArray10) {
	            if (_i11 >= _iterator10.length) break;
	            _ref10 = _iterator10[_i11++];
	        } else {
	            _i11 = _iterator10.next();
	            if (_i11.done) break;
	            _ref10 = _i11.value;
	        }

	        var frame = _ref10;

	        if (frame === child) {
	            return true;
	        }
	    }

	    return false;
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
	    if (isPopup()) {
	        return _conf.CONSTANTS.WINDOW_TYPES.POPUP;
	    }
	    if (isIframe()) {
	        return _conf.CONSTANTS.WINDOW_TYPES.IFRAME;
	    }
	    return _conf.CONSTANTS.WINDOW_TYPES.FULLPAGE;
	}

	function anyMatch(collection1, collection2) {

	    for (var _iterator11 = collection1, _isArray11 = Array.isArray(_iterator11), _i12 = 0, _iterator11 = _isArray11 ? _iterator11 : _iterator11[Symbol.iterator]();;) {
	        var _ref11;

	        if (_isArray11) {
	            if (_i12 >= _iterator11.length) break;
	            _ref11 = _iterator11[_i12++];
	        } else {
	            _i12 = _iterator11.next();
	            if (_i12.done) break;
	            _ref11 = _i12.value;
	        }

	        var item1 = _ref11;

	        for (var _iterator12 = collection2, _isArray12 = Array.isArray(_iterator12), _i13 = 0, _iterator12 = _isArray12 ? _iterator12 : _iterator12[Symbol.iterator]();;) {
	            var _ref12;

	            if (_isArray12) {
	                if (_i13 >= _iterator12.length) break;
	                _ref12 = _iterator12[_i13++];
	            } else {
	                _i13 = _iterator12.next();
	                if (_i13.done) break;
	                _ref12 = _i13.value;
	            }

	            var item2 = _ref12;

	            if (item1 === item2) {
	                return true;
	            }
	        }
	    }
	}

	function isSameTopWindow(win1, win2) {

	    var top1 = getTop(win1);
	    var top2 = getTop(win2);

	    try {
	        if (top1 && top2) {
	            if (top1 === top2) {
	                return true;
	            }

	            return false;
	        }
	    } catch (err) {
	        // pass
	    }

	    var allFrames1 = getAllFramesInWindow(win1);
	    var allFrames2 = getAllFramesInWindow(win2);

	    if (anyMatch(allFrames1, allFrames2)) {
	        return true;
	    }

	    var opener1 = getOpener(top1);
	    var opener2 = getOpener(top2);

	    if (opener1 && anyMatch(getAllFramesInWindow(opener1), allFrames2)) {
	        return false;
	    }

	    if (opener2 && anyMatch(getAllFramesInWindow(opener2), allFrames1)) {
	        return false;
	    }
	}

	function jsonStringify() {

	    var objectToJSON = void 0;
	    var arrayToJSON = void 0;

	    try {
	        if (JSON.stringify({}) !== '{}') {
	            objectToJSON = Object.prototype.toJSON;
	            delete Object.prototype.toJSON;
	        }

	        if (JSON.stringify({}) !== '{}') {
	            throw new Error('Can not correctly serialize JSON objects');
	        }

	        if (JSON.stringify([]) !== '[]') {
	            arrayToJSON = Array.prototype.toJSON;
	            delete Array.prototype.toJSON;
	        }

	        if (JSON.stringify([]) !== '[]') {
	            throw new Error('Can not correctly serialize JSON objects');
	        }
	    } catch (err) {
	        throw new Error('Can not repair JSON.stringify: ' + err.message);
	    }

	    var result = JSON.stringify.apply(this, arguments);

	    try {
	        if (objectToJSON) {
	            Object.prototype.toJSON = objectToJSON; // eslint-disable-line
	        }

	        if (arrayToJSON) {
	            Array.prototype.toJSON = arrayToJSON; // eslint-disable-line
	        }
	    } catch (err) {
	        throw new Error('Can not repair JSON.stringify: ' + err.message);
	    }

	    return result;
	}

	function jsonParse() {
	    return JSON.parse.apply(this, arguments);
	}

/***/ },
/* 18 */
/*!************************************!*\
  !*** ./~/post-robot/src/global.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.global = undefined;

	var _conf = __webpack_require__(/*! ./conf */ 6);

	var _cleanup = __webpack_require__(/*! ./lib/cleanup */ 19);

	var global = exports.global = window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT] = window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT] || {};

	global.clean = global.clean || (0, _cleanup.cleanup)(global);

	// Backwards compatibility

	global.registerSelf = function () {
	    // pass
	};

/***/ },
/* 19 */
/*!*****************************************!*\
  !*** ./~/post-robot/src/lib/cleanup.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.cleanup = cleanup;

	var _promise = __webpack_require__(/*! sync-browser-mocks/src/promise */ 13);

	function cleanup(obj) {

	    var tasks = [];

	    return {

	        getters: {
	            array: function array() {
	                return [];
	            },
	            object: function object() {
	                return {};
	            }
	        },

	        set: function set(name, item) {
	            obj[name] = item;
	            this.register(function () {
	                delete obj[name];
	            });
	            return item;
	        },
	        push: function push(collection, item) {
	            collection.push(item);
	            this.register(function () {
	                var index = collection.indexOf(item);
	                if (index !== -1) {
	                    collection.splice(index, 1);
	                }
	            });
	            return item;
	        },
	        setItem: function setItem(mapping, key, item) {
	            mapping[key] = item;
	            this.register(function () {
	                delete mapping[key];
	            });
	            return item;
	        },
	        register: function register(name, method) {

	            if (!method) {
	                method = name;
	                name = undefined;
	            }

	            tasks.push({
	                complete: false,

	                name: name,

	                run: function run() {

	                    if (this.complete) {
	                        return;
	                    }

	                    this.complete = true;

	                    return method();
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

	            while (tasks.length) {
	                results.push(tasks.pop().run());
	            }

	            return _promise.SyncPromise.all(results).then(function () {
	                return;
	            });
	        },
	        run: function run(name) {
	            var results = [];
	            var toClean = [];

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
	                    toClean.push(item);
	                    results.push(item.run());
	                }
	            }

	            for (var _iterator2 = toClean, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
	                var _ref2;

	                if (_isArray2) {
	                    if (_i2 >= _iterator2.length) break;
	                    _ref2 = _iterator2[_i2++];
	                } else {
	                    _i2 = _iterator2.next();
	                    if (_i2.done) break;
	                    _ref2 = _i2.value;
	                }

	                var _item = _ref2;

	                tasks.splice(tasks.indexOf(_item), 1);
	            }

	            return _promise.SyncPromise.all(results).then(function () {
	                return;
	            });
	        }
	    };
	}

/***/ },
/* 20 */
/*!*****************************************!*\
  !*** ./~/post-robot/src/lib/methods.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.listenForMethods = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.serializeMethod = serializeMethod;
	exports.serializeMethods = serializeMethods;
	exports.deserializeMethod = deserializeMethod;
	exports.deserializeError = deserializeError;
	exports.deserializeMethods = deserializeMethods;

	var _conf = __webpack_require__(/*! ../conf */ 6);

	var _util = __webpack_require__(/*! ./util */ 15);

	var _interface = __webpack_require__(/*! ../interface */ 4);

	var _log = __webpack_require__(/*! ./log */ 16);

	var _promise = __webpack_require__(/*! ./promise */ 12);

	var _global = __webpack_require__(/*! ../global */ 18);

	_global.global.methods = _global.global.methods || {};

	var listenForMethods = exports.listenForMethods = _util.util.once(function () {
	    (0, _interface.on)(_conf.CONSTANTS.POST_MESSAGE_NAMES.METHOD, { window: '*', origin: '*' }, function (_ref) {
	        var source = _ref.source;
	        var origin = _ref.origin;
	        var data = _ref.data;


	        var meth = _global.global.methods[data.id];

	        if (!meth) {
	            throw new Error('Could not find method with id: ' + data.id);
	        }

	        if (meth.destination !== source) {
	            throw new Error('Method window does not match');
	        }

	        if (meth.domain && meth.domain !== '*' && origin !== meth.domain) {
	            throw new Error('Method domain ' + meth.domain + ' does not match origin ' + origin);
	        }

	        _log.log.debug('Call local method', data.name, data.args);

	        return _promise.promise.run(function () {
	            return meth.method.apply({ source: source, origin: origin, data: data }, data.args);
	        }).then(function (result) {

	            return {
	                result: result,
	                id: data.id,
	                name: data.name
	            };
	        });
	    });
	});

	function isSerialized(item, type) {
	    return (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && item !== null && item.__type__ === type;
	}

	function serializeMethod(destination, domain, method, name) {

	    var id = _util.util.uniqueID();

	    _global.global.clean.setItem(_global.global.methods, id, { destination: destination, domain: domain, method: method });

	    return {
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

	    return _util.util.replaceObject({ obj: obj }, function (item, key) {
	        if (typeof item === 'function') {
	            return serializeMethod(destination, domain, item, key);
	        }

	        if (item instanceof Error) {
	            return serializeError(item);
	        }
	    }).obj;
	}

	function deserializeMethod(source, origin, obj) {

	    function wrapper() {
	        var args = Array.prototype.slice.call(arguments);
	        _log.log.debug('Call foreign method', obj.__name__, args);
	        return (0, _interface.send)(source, _conf.CONSTANTS.POST_MESSAGE_NAMES.METHOD, {
	            id: obj.__id__,
	            name: obj.__name__,
	            args: args

	        }, { domain: origin }).then(function (_ref2) {
	            var data = _ref2.data;


	            _log.log.debug('Got foreign method result', obj.__name__, data.result);
	            return data.result;
	        });
	    }

	    wrapper.__name__ = obj.__name__;
	    wrapper.source = source;
	    wrapper.origin = origin;

	    return wrapper;
	}

	function deserializeError(source, origin, obj) {
	    return new Error(obj.__message__);
	}

	function deserializeMethods(source, origin, obj) {

	    return _util.util.replaceObject({ obj: obj }, function (item, key) {

	        if (isSerialized(item, _conf.CONSTANTS.SERIALIZATION_TYPES.METHOD)) {
	            return deserializeMethod(source, origin, item);
	        }

	        if (isSerialized(item, _conf.CONSTANTS.SERIALIZATION_TYPES.ERROR)) {
	            return deserializeError(source, origin, item);
	        }
	    }).obj;
	}

/***/ },
/* 21 */
/*!***************************************!*\
  !*** ./~/post-robot/src/lib/ready.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.initOnReady = initOnReady;
	exports.onWindowReady = onWindowReady;

	var _conf = __webpack_require__(/*! ../conf */ 6);

	var _windows = __webpack_require__(/*! ./windows */ 17);

	var _interface = __webpack_require__(/*! ../interface */ 4);

	var _log = __webpack_require__(/*! ./log */ 16);

	var _promise = __webpack_require__(/*! sync-browser-mocks/src/promise */ 13);

	var _global = __webpack_require__(/*! ../global */ 18);

	_global.global.readyPromises = _global.global.readyPromises || [];

	function initOnReady() {

	    (0, _interface.on)(_conf.CONSTANTS.POST_MESSAGE_NAMES.READY, { window: '*', domain: '*' }, function (event) {

	        for (var _iterator = _global.global.readyPromises, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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

	            if (item.win === event.source) {
	                item.promise.resolve(event);
	                return;
	            }
	        }

	        _global.global.clean.push(_global.global.readyPromises, {
	            win: event.source,
	            promise: new _promise.SyncPromise().resolve(event)
	        });
	    });

	    var parent = (0, _windows.getAncestor)();

	    if (parent) {
	        (0, _interface.send)(parent, _conf.CONSTANTS.POST_MESSAGE_NAMES.READY, {}, { domain: '*' })['catch'](function (err) {
	            _log.log.debug(err.stack || err.toString());
	        });
	    }
	}

	function onWindowReady(win) {
	    var timeout = arguments.length <= 1 || arguments[1] === undefined ? 5000 : arguments[1];
	    var name = arguments.length <= 2 || arguments[2] === undefined ? 'Window' : arguments[2];


	    for (var _iterator2 = _global.global.readyPromises, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
	        var _ref2;

	        if (_isArray2) {
	            if (_i2 >= _iterator2.length) break;
	            _ref2 = _iterator2[_i2++];
	        } else {
	            _i2 = _iterator2.next();
	            if (_i2.done) break;
	            _ref2 = _i2.value;
	        }

	        var item = _ref2;

	        if (item.win === win) {
	            return item.promise;
	        }
	    }

	    var promise = new _promise.SyncPromise();

	    _global.global.clean.push(_global.global.readyPromises, { win: win, promise: promise });

	    setTimeout(function () {
	        return promise.reject(new Error(name + ' did not load after ' + timeout + 'ms'));
	    }, timeout);

	    return promise;
	}

/***/ },
/* 22 */
/*!******************************************!*\
  !*** ./~/post-robot/src/compat/index.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ie = __webpack_require__(/*! ./ie */ 23);

	Object.keys(_ie).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _ie[key];
	    }
	  });
	});

/***/ },
/* 23 */
/*!***************************************!*\
  !*** ./~/post-robot/src/compat/ie.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.emulateIERestrictions = emulateIERestrictions;

	var _conf = __webpack_require__(/*! ../conf */ 6);

	var _lib = __webpack_require__(/*! ../lib */ 11);

	function emulateIERestrictions(sourceWindow, targetWindow) {
	    if (!_conf.CONFIG.ALLOW_POSTMESSAGE_POPUP) {

	        if ((0, _lib.isSameTopWindow)(sourceWindow, targetWindow) === false) {
	            throw new Error('Can not send and receive post messages between two different windows (disabled to emulate IE)');
	        }
	    }
	}

/***/ },
/* 24 */
/*!***************************************************!*\
  !*** ./~/post-robot/src/drivers/receive/types.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.RECEIVE_MESSAGE_TYPES = undefined;

	var _RECEIVE_MESSAGE_TYPE;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _conf = __webpack_require__(/*! ../../conf */ 6);

	var _lib = __webpack_require__(/*! ../../lib */ 11);

	var _send = __webpack_require__(/*! ../send */ 25);

	var _listeners = __webpack_require__(/*! ../listeners */ 32);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function matchDomain(domain, origin) {

	    if (typeof domain === 'string') {
	        return domain === '*' || origin === domain;
	    }

	    if (Object.prototype.toString.call(domain) === '[object RegExp]') {
	        return origin.match(domain);
	    }

	    if (Array.isArray(domain)) {
	        return domain.indexOf(origin) !== -1;
	    }

	    return false;
	}

	var RECEIVE_MESSAGE_TYPES = exports.RECEIVE_MESSAGE_TYPES = (_RECEIVE_MESSAGE_TYPE = {}, _defineProperty(_RECEIVE_MESSAGE_TYPE, _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK, function (source, origin, message) {

	    var options = _listeners.listeners.response[message.hash];

	    if (!options) {
	        throw new Error('No handler found for post message ack for message: ' + message.name + ' from ' + origin + ' in ' + window.location.protocol + '//' + window.location.host + window.location.pathname);
	    }

	    if (!matchDomain(options.domain, origin)) {
	        throw new Error('Ack origin ' + origin + ' does not match domain ' + options.domain);
	    }

	    options.ack = true;
	}), _defineProperty(_RECEIVE_MESSAGE_TYPE, _conf.CONSTANTS.POST_MESSAGE_TYPE.REQUEST, function (source, origin, message) {

	    var options = (0, _listeners.getRequestListener)(message.name, source, origin);

	    function respond(data) {

	        if (message.fireAndForget || (0, _lib.isWindowClosed)(source)) {
	            return _lib.promise.Promise.resolve();
	        }

	        return (0, _send.sendMessage)(source, _extends({
	            target: message.originalSource,
	            hash: message.hash,
	            name: message.name
	        }, data), origin);
	    }

	    return _lib.promise.Promise.all([respond({
	        type: _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK
	    }), _lib.promise.run(function () {

	        if (!options) {
	            throw new Error('No handler found for post message: ' + message.name + ' from ' + origin + ' in ' + window.location.protocol + '//' + window.location.host + window.location.pathname);
	        }

	        if (!matchDomain(options.domain, origin)) {
	            throw new Error('Request origin ' + origin + ' does not match domain ' + options.domain);
	        }

	        var data = message.data;

	        return _lib.promise.deNodeify(options.handler, { source: source, origin: origin, data: data });
	    }).then(function (data) {

	        return respond({
	            type: _conf.CONSTANTS.POST_MESSAGE_TYPE.RESPONSE,
	            ack: _conf.CONSTANTS.POST_MESSAGE_ACK.SUCCESS,
	            data: data
	        });
	    }, function (err) {

	        return respond({
	            type: _conf.CONSTANTS.POST_MESSAGE_TYPE.RESPONSE,
	            ack: _conf.CONSTANTS.POST_MESSAGE_ACK.ERROR,
	            error: err.stack ? err.message + '\n' + err.stack : err.toString()
	        });
	    })])['catch'](function (err) {

	        if (options && options.handleError) {
	            return options.handleError(err);
	        } else {
	            _lib.log.error(err.stack || err.toString());
	        }
	    });
	}), _defineProperty(_RECEIVE_MESSAGE_TYPE, _conf.CONSTANTS.POST_MESSAGE_TYPE.RESPONSE, function (source, origin, message) {

	    var options = _listeners.listeners.response[message.hash];

	    if (!options) {
	        throw new Error('No handler found for post message response for message: ' + message.name + ' from ' + origin + ' in ' + window.location.protocol + '//' + window.location.host + window.location.pathname);
	    }

	    if (!matchDomain(options.domain, origin)) {
	        throw new Error('Response origin ' + origin + ' does not match domain ' + options.domain);
	    }

	    delete _listeners.listeners.response[message.hash];

	    if (message.ack === _conf.CONSTANTS.POST_MESSAGE_ACK.ERROR) {
	        return options.respond(new Error(message.error));
	    } else if (message.ack === _conf.CONSTANTS.POST_MESSAGE_ACK.SUCCESS) {
	        var data = message.data || message.response;

	        return options.respond(null, { source: source, origin: origin, data: data });
	    }
	}), _RECEIVE_MESSAGE_TYPE);

/***/ },
/* 25 */
/*!************************************************!*\
  !*** ./~/post-robot/src/drivers/send/index.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.buildMessage = buildMessage;
	exports.sendMessage = sendMessage;

	var _conf = __webpack_require__(/*! ../../conf */ 6);

	var _lib = __webpack_require__(/*! ../../lib */ 11);

	var _strategies = __webpack_require__(/*! ./strategies */ 26);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function buildMessage(win, message) {
	    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];


	    var id = _lib.util.uniqueID();
	    var type = (0, _lib.getWindowType)();
	    var sourceDomain = _lib.util.getDomain(window);

	    return _extends({}, message, options, {
	        sourceDomain: sourceDomain,
	        id: message.id || id,
	        windowType: type
	    });
	}

	function sendMessage(win, message, domain) {
	    return _lib.promise.run(function () {

	        message = buildMessage(win, message, {
	            data: (0, _lib.serializeMethods)(win, domain, message.data),
	            domain: domain
	        });

	        var level = void 0;

	        if (_conf.POST_MESSAGE_NAMES_LIST.indexOf(message.name) !== -1 || message.type === _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK) {
	            level = 'debug';
	        } else if (message.ack === 'error') {
	            level = 'error';
	        } else {
	            level = 'info';
	        }

	        _lib.log.logLevel(level, ['\n\n\t', '#send', message.type.replace(/^postrobot_message_/, ''), '::', message.name, '::', domain || '*', '\n\n', message]);

	        if (_conf.CONFIG.MOCK_MODE) {
	            delete message.target;
	            return window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT].postMessage({
	                origin: _lib.util.getDomain(window),
	                source: window,
	                data: (0, _lib.jsonStringify)(message, 0, 2)
	            });
	        }

	        if (win === window) {
	            throw new Error('Attemping to send message to self');
	        }

	        if ((0, _lib.isWindowClosed)(win)) {
	            throw new Error('Window is closed');
	        }

	        _lib.log.debug('Running send message strategies', message);

	        var messages = [];

	        var serializedMessage = (0, _lib.jsonStringify)(_defineProperty({}, _conf.CONSTANTS.WINDOW_PROPS.POSTROBOT, message), 0, 2);

	        return _lib.promise.map(Object.keys(_strategies.SEND_MESSAGE_STRATEGIES), function (strategyName) {

	            return _lib.promise.run(function () {

	                if (!_conf.CONFIG.ALLOWED_POST_MESSAGE_METHODS[strategyName]) {
	                    throw new Error('Strategy disallowed: ' + strategyName);
	                }

	                return _strategies.SEND_MESSAGE_STRATEGIES[strategyName](win, serializedMessage, domain);
	            }).then(function () {
	                messages.push(strategyName + ': success');
	                return true;
	            }, function (err) {
	                messages.push(strategyName + ': ' + (err.stack || err.toString()) + '\n');
	                return false;
	            });
	        }).then(function (results) {

	            var success = _lib.util.some(results);
	            var status = message.type + ' ' + message.name + ' ' + (success ? 'success' : 'error') + ':\n  - ' + messages.join('\n  - ') + '\n';

	            _lib.log.debug(status);

	            if (!success) {
	                throw new Error(status);
	            }
	        });
	    });
	}

/***/ },
/* 26 */
/*!*****************************************************!*\
  !*** ./~/post-robot/src/drivers/send/strategies.js ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SEND_MESSAGE_STRATEGIES = undefined;

	var _SEND_MESSAGE_STRATEG;

	var _conf = __webpack_require__(/*! ../../conf */ 6);

	var _lib = __webpack_require__(/*! ../../lib */ 11);

	var _compat = __webpack_require__(/*! ../../compat */ 22);

	var _bridge = __webpack_require__(/*! ../../bridge */ 27);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var SEND_MESSAGE_STRATEGIES = exports.SEND_MESSAGE_STRATEGIES = (_SEND_MESSAGE_STRATEG = {}, _defineProperty(_SEND_MESSAGE_STRATEG, _conf.CONSTANTS.SEND_STRATEGIES.POST_MESSAGE, function (win, serializedMessage, domain) {

	    (0, _compat.emulateIERestrictions)(window, win);

	    if (domain && domain.indexOf(_conf.CONSTANTS.MOCK_PROTOCOL) === 0) {
	        domain = win.location.protocol + '//' + win.location.host;
	    }

	    if (domain && domain.indexOf(_conf.CONSTANTS.FILE_PROTOCOL) === 0) {
	        domain = '*';
	    }

	    return win.postMessage(serializedMessage, domain);
	}), _defineProperty(_SEND_MESSAGE_STRATEG, _conf.CONSTANTS.SEND_STRATEGIES.BRIDGE, function (win, serializedMessage, domain) {

	    if ((0, _lib.isSameDomain)(win)) {
	        throw new Error('Post message through bridge disabled between same domain windows');
	    }

	    if ((0, _lib.isSameTopWindow)(window, win) !== false) {
	        throw new Error('Can only use bridge to communicate between two different windows, not between frames');
	    }

	    return (0, _bridge.sendBridgeMessage)(win, serializedMessage, domain);
	}), _defineProperty(_SEND_MESSAGE_STRATEG, _conf.CONSTANTS.SEND_STRATEGIES.GLOBAL, function (win, serializedMessage, domain) {

	    if (!(0, _lib.isSameDomain)(win)) {
	        throw new Error('Post message through global disabled between different domain windows');
	    }

	    if ((0, _lib.isSameTopWindow)(window, win) !== false) {
	        throw new Error('Can only use global to communicate between two different windows, not between frames');
	    }

	    var foreignGlobal = win[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT];

	    if (!foreignGlobal) {
	        throw new Error('Can not find postRobot global on foreign window');
	    }

	    return foreignGlobal.receiveMessage({
	        source: window,
	        origin: domain,
	        data: serializedMessage
	    });
	}), _SEND_MESSAGE_STRATEG);

/***/ },
/* 27 */
/*!******************************************!*\
  !*** ./~/post-robot/src/bridge/index.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _bridge = __webpack_require__(/*! ./bridge */ 28);

	Object.keys(_bridge).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _bridge[key];
	    }
	  });
	});

	var _child = __webpack_require__(/*! ./child */ 29);

	Object.keys(_child).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _child[key];
	    }
	  });
	});

	var _common = __webpack_require__(/*! ./common */ 30);

	Object.keys(_common).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _common[key];
	    }
	  });
	});

	var _parent = __webpack_require__(/*! ./parent */ 31);

	Object.keys(_parent).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _parent[key];
	    }
	  });
	});

/***/ },
/* 28 */
/*!*******************************************!*\
  !*** ./~/post-robot/src/bridge/bridge.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _conf = __webpack_require__(/*! ../conf */ 6);

	var _lib = __webpack_require__(/*! ../lib */ 11);

	var _global = __webpack_require__(/*! ../global */ 18);

	var _interface = __webpack_require__(/*! ../interface */ 4);

	_global.global.openTunnelToParent = function openTunnelToParent(_ref) {
	    var name = _ref.name;
	    var source = _ref.source;
	    var canary = _ref.canary;
	    var _sendMessage = _ref.sendMessage;


	    var remoteWindow = (0, _lib.getParent)(window);

	    if (!remoteWindow) {
	        throw new Error('No parent window found to open tunnel to');
	    }

	    return (0, _interface.send)(remoteWindow, _conf.CONSTANTS.POST_MESSAGE_NAMES.OPEN_TUNNEL, {
	        name: name,
	        sendMessage: function sendMessage() {

	            if ((0, _lib.isWindowClosed)(source)) {
	                return;
	            }

	            try {
	                canary();
	            } catch (err) {
	                return;
	            }

	            _sendMessage.apply(this, arguments);
	        }
	    }, { domain: '*' });
	};

/***/ },
/* 29 */
/*!******************************************!*\
  !*** ./~/post-robot/src/bridge/child.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.openTunnelToOpener = openTunnelToOpener;

	var _promise = __webpack_require__(/*! sync-browser-mocks/src/promise */ 13);

	var _conf = __webpack_require__(/*! ../conf */ 6);

	var _lib = __webpack_require__(/*! ../lib */ 11);

	var _drivers = __webpack_require__(/*! ../drivers */ 9);

	var _common = __webpack_require__(/*! ./common */ 30);

	function getRemoteBridgeForWindow(win) {
	    return _promise.SyncPromise['try'](function () {
	        for (var _iterator = (0, _lib.getFrames)(win), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	            var _ref;

	            if (_isArray) {
	                if (_i >= _iterator.length) break;
	                _ref = _iterator[_i++];
	            } else {
	                _i = _iterator.next();
	                if (_i.done) break;
	                _ref = _i.value;
	            }

	            var _frame = _ref;

	            try {
	                if (_frame && _frame !== window && (0, _lib.isSameDomain)(_frame) && _frame[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT]) {
	                    return _frame;
	                }
	            } catch (err) {
	                continue;
	            }
	        }

	        try {
	            var _ret = function () {
	                var frame = (0, _lib.getFrameByName)(win, (0, _common.getBridgeName)(_lib.util.getDomain()));

	                if (!frame) {
	                    return {
	                        v: void 0
	                    };
	                }

	                if ((0, _lib.isSameDomain)(frame) && frame[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT]) {
	                    return {
	                        v: frame
	                    };
	                }

	                return {
	                    v: new _promise.SyncPromise(function (resolve) {

	                        var interval = void 0;
	                        var timeout = void 0;

	                        interval = setInterval(function () {
	                            if ((0, _lib.isSameDomain)(frame) && frame[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT]) {
	                                clearInterval(interval);
	                                clearTimeout(timeout);
	                                return resolve(frame);
	                            }

	                            setTimeout(function () {
	                                clearInterval(interval);
	                                return resolve();
	                            }, 2000);
	                        }, 100);
	                    })
	                };
	            }();

	            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	        } catch (err) {
	            return;
	        }
	    });
	}

	function openTunnelToOpener() {
	    return _promise.SyncPromise['try'](function () {

	        var opener = (0, _lib.getOpener)(window);

	        if (!opener) {
	            return;
	        }

	        if (!(0, _common.needsBridge)({ win: opener })) {
	            return;
	        }

	        (0, _common.registerRemoteWindow)(opener);

	        return getRemoteBridgeForWindow(opener).then(function (bridge) {

	            if (!bridge) {
	                return (0, _common.rejectRemoteSendMessage)(opener, new Error('Can not register with opener: no bridge found in opener'));
	            }

	            if (!window.name) {
	                return (0, _common.rejectRemoteSendMessage)(opener, new Error('Can not register with opener: window does not have a name'));
	            }

	            return bridge[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT].openTunnelToParent({

	                name: window.name,

	                source: window,

	                canary: function canary() {
	                    // pass
	                },
	                sendMessage: function sendMessage(message) {

	                    if (!window || window.closed) {
	                        return;
	                    }

	                    (0, _drivers.receiveMessage)({
	                        data: message,
	                        origin: this.origin,
	                        source: this.source
	                    });
	                }
	            }).then(function (_ref2) {
	                var source = _ref2.source;
	                var origin = _ref2.origin;
	                var data = _ref2.data;


	                if (source !== opener) {
	                    throw new Error('Source does not match opener');
	                }

	                (0, _common.registerRemoteSendMessage)(source, origin, data.sendMessage);
	            })['catch'](function (err) {

	                (0, _common.rejectRemoteSendMessage)(opener, err);
	                throw err;
	            });
	        });
	    });
	}

/***/ },
/* 30 */
/*!*******************************************!*\
  !*** ./~/post-robot/src/bridge/common.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.documentBodyReady = undefined;
	exports.needsBridgeForBrowser = needsBridgeForBrowser;
	exports.needsBridgeForWin = needsBridgeForWin;
	exports.needsBridgeForDomain = needsBridgeForDomain;
	exports.needsBridge = needsBridge;
	exports.getBridgeName = getBridgeName;
	exports.isBridge = isBridge;
	exports.registerRemoteWindow = registerRemoteWindow;
	exports.findRemoteWindow = findRemoteWindow;
	exports.registerRemoteSendMessage = registerRemoteSendMessage;
	exports.rejectRemoteSendMessage = rejectRemoteSendMessage;
	exports.sendBridgeMessage = sendBridgeMessage;

	var _conf = __webpack_require__(/*! ../conf */ 6);

	var _lib = __webpack_require__(/*! ../lib */ 11);

	var _global = __webpack_require__(/*! ../global */ 18);

	var _drivers = __webpack_require__(/*! ../drivers */ 9);

	function needsBridgeForBrowser() {

	    if ((0, _lib.getUserAgent)(window).match(/MSIE|trident|edge/i)) {
	        return true;
	    }

	    if (!_conf.CONFIG.ALLOW_POSTMESSAGE_POPUP) {
	        return true;
	    }

	    return false;
	}

	function needsBridgeForWin(win) {

	    if (win && (0, _lib.isSameTopWindow)(window, win)) {
	        return false;
	    }

	    if (win && (0, _lib.isSameDomain)(win)) {
	        return false;
	    }

	    return true;
	}

	function needsBridgeForDomain(domain) {

	    if (domain && _lib.util.getDomain() === _lib.util.getDomainFromUrl(domain)) {
	        return false;
	    }

	    return true;
	}

	function needsBridge(_ref) {
	    var win = _ref.win;
	    var domain = _ref.domain;

	    return needsBridgeForBrowser() && needsBridgeForWin(win) && needsBridgeForDomain(domain);
	}

	function getBridgeName(domain) {

	    domain = domain || _lib.util.getDomainFromUrl(domain);

	    var sanitizedDomain = domain.replace(/[^a-zA-Z0-9]+/g, '_');

	    var id = _conf.CONSTANTS.BRIDGE_NAME_PREFIX + '_' + sanitizedDomain;

	    return id;
	}

	function isBridge() {
	    return window.name && window.name === getBridgeName(_lib.util.getDomain());
	}

	var documentBodyReady = exports.documentBodyReady = new _lib.promise.Promise(function (resolve) {

	    if (window.document && window.document.body) {
	        return resolve(window.document.body);
	    }

	    var interval = setInterval(function () {
	        if (window.document && window.document.body) {
	            clearInterval(interval);
	            return resolve(window.document.body);
	        }
	    }, 10);
	});

	_global.global.remoteWindows = _global.global.remoteWindows || [];

	function registerRemoteWindow(win) {
	    var timeout = arguments.length <= 1 || arguments[1] === undefined ? _conf.CONFIG.BRIDGE_TIMEOUT : arguments[1];

	    var sendMessagePromise = new _lib.promise.Promise();
	    _global.global.clean.push(_global.global.remoteWindows, { win: win, sendMessagePromise: sendMessagePromise });
	}

	function findRemoteWindow(win) {
	    for (var i = 0; i < _global.global.remoteWindows.length; i++) {
	        if (_global.global.remoteWindows[i].win === win) {
	            return _global.global.remoteWindows[i];
	        }
	    }
	}

	function registerRemoteSendMessage(win, domain, sendMessage) {

	    var remoteWindow = findRemoteWindow(win);

	    if (!remoteWindow) {
	        throw new Error('Window not found to register sendMessage to');
	    }

	    var sendMessageWrapper = function sendMessageWrapper(remoteWin, message, remoteDomain) {

	        if (remoteWin !== win) {
	            throw new Error('Remote window does not match window');
	        }

	        if (remoteDomain !== '*' && remoteDomain !== domain) {
	            throw new Error('Remote domain ' + remoteDomain + ' does not match domain ' + domain);
	        }

	        sendMessage(message);
	    };

	    remoteWindow.sendMessagePromise.resolve(sendMessageWrapper);
	    remoteWindow.sendMessagePromise = _lib.promise.Promise.resolve(sendMessageWrapper);
	}

	function rejectRemoteSendMessage(win, err) {

	    var remoteWindow = findRemoteWindow(win);

	    if (!remoteWindow) {
	        throw new Error('Window not found on which to reject sendMessage');
	    }

	    remoteWindow.sendMessagePromise.asyncReject(err);
	}

	function sendBridgeMessage(win, message, domain) {

	    var messagingChild = (0, _lib.isOpener)(window, win);
	    var messagingParent = (0, _lib.isOpener)(win, window);

	    if (!messagingChild && !messagingParent) {
	        throw new Error('Can only send messages to and from parent and popup windows');
	    }

	    var remoteWindow = findRemoteWindow(win);

	    if (!remoteWindow) {
	        throw new Error('Window not found to send message to');
	    }

	    return remoteWindow.sendMessagePromise.then(function (sendMessage) {
	        return sendMessage(win, message, domain);
	    });
	}

	_global.global.receiveMessage = function (event) {
	    return (0, _drivers.receiveMessage)(event);
	};

/***/ },
/* 31 */
/*!*******************************************!*\
  !*** ./~/post-robot/src/bridge/parent.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	exports.openBridge = openBridge;
	exports.destroyBridges = destroyBridges;
	exports.linkUrl = linkUrl;

	var _conf = __webpack_require__(/*! ../conf */ 6);

	var _lib = __webpack_require__(/*! ../lib */ 11);

	var _global = __webpack_require__(/*! ../global */ 18);

	var _interface = __webpack_require__(/*! ../interface */ 4);

	var _drivers = __webpack_require__(/*! ../drivers */ 9);

	var _common = __webpack_require__(/*! ./common */ 30);

	_global.global.bridges = _global.global.bridges || {};

	function listenForRegister(source, domain) {
	    (0, _interface.on)(_conf.CONSTANTS.POST_MESSAGE_NAMES.OPEN_TUNNEL, { source: source, domain: domain }, function (_ref) {
	        var origin = _ref.origin;
	        var data = _ref.data;


	        if (origin !== domain) {
	            throw new Error('Domain ' + domain + ' does not match origin ' + origin);
	        }

	        if (!data.name) {
	            throw new Error('Register window expected to be passed window name');
	        }

	        if (!data.sendMessage) {
	            throw new Error('Register window expected to be passed sendMessage method');
	        }

	        var winDetails = _global.global.popupWindows[data.name];

	        if (!winDetails) {
	            throw new Error('Window with name ' + data.name + ' does not exist, or was not opened by this window');
	        }

	        if (!winDetails.domain) {
	            throw new Error('We do not have a registered domain for window ' + data.name);
	        }

	        if (winDetails.domain !== origin) {
	            throw new Error('Message origin ' + origin + ' does not matched registered window origin ' + winDetails.domain);
	        }

	        (0, _common.registerRemoteSendMessage)(winDetails.win, domain, data.sendMessage);

	        return {
	            sendMessage: function sendMessage(message) {

	                if (!window || window.closed) {
	                    return;
	                }

	                (0, _drivers.receiveMessage)({
	                    data: message,
	                    origin: winDetails.domain,
	                    source: winDetails.win
	                });
	            }
	        };
	    });
	}

	function openBridgeFrame(name, url) {

	    _lib.log.debug('Opening bridge:', name, url);

	    var iframe = document.createElement('iframe');

	    iframe.setAttribute('name', name);
	    iframe.setAttribute('id', name);

	    iframe.setAttribute('style', 'display: none; margin: 0; padding: 0; border: 0px none; overflow: hidden;');
	    iframe.setAttribute('frameborder', '0');
	    iframe.setAttribute('border', '0');
	    iframe.setAttribute('scrolling', 'no');
	    iframe.setAttribute('allowTransparency', 'true');

	    iframe.setAttribute('tabindex', '-1');
	    iframe.setAttribute('hidden', 'true');
	    iframe.setAttribute('title', '');
	    iframe.setAttribute('role', 'presentation');

	    iframe.src = url;

	    return iframe;
	}

	function openBridge(url, domain) {

	    domain = domain || _lib.util.getDomainFromUrl(url);

	    if (_global.global.bridges[domain]) {
	        return _global.global.bridges[domain];
	    }

	    return _global.global.clean.setItem(_global.global.bridges, domain, _lib.promise.run(function () {

	        if (_lib.util.getDomain() === domain) {
	            throw new Error('Can not open bridge on the same domain as current domain: ' + domain);
	        }

	        var name = (0, _common.getBridgeName)(domain);
	        var frame = (0, _lib.getFrameByName)(window, name);

	        if (frame) {
	            throw new Error('Frame with name ' + name + ' already exists on page');
	        }

	        var iframe = openBridgeFrame(name, url);

	        return _common.documentBodyReady.then(function (body) {

	            return new _lib.promise.Promise(function (resolve, reject) {

	                setTimeout(resolve, 1);
	            }).then(function () {

	                body.appendChild(iframe);

	                _global.global.clean.register('bridgeFrames', function () {
	                    body.removeChild(iframe);
	                    delete _global.global.bridges[domain];
	                });

	                var bridge = iframe.contentWindow;

	                listenForRegister(bridge, domain);

	                return new _lib.promise.Promise(function (resolve, reject) {

	                    iframe.onload = resolve;
	                    iframe.onerror = reject;
	                }).then(function () {

	                    return (0, _lib.onWindowReady)(bridge, _conf.CONFIG.BRIDGE_TIMEOUT, 'Bridge ' + url);
	                }).then(function () {

	                    return bridge;
	                });
	            });
	        });
	    }));
	}

	function destroyBridges() {
	    return _global.global.clean.run('bridgeFrames');
	}

	_global.global.popupWindows = _global.global.popupWindows || {};

	var windowOpen = window.open;

	window.open = function (url, name, options, last) {

	    var domain = url;

	    if (url && url.indexOf(_conf.CONSTANTS.MOCK_PROTOCOL) === 0) {
	        var _url$split = url.split('|');

	        var _url$split2 = _slicedToArray(_url$split, 2);

	        domain = _url$split2[0];
	        url = _url$split2[1];
	    }

	    if (domain) {
	        domain = _lib.util.getDomainFromUrl(domain);
	    }

	    var win = windowOpen.call(this, url, name, options, last);

	    if (url) {
	        (0, _common.registerRemoteWindow)(win);
	    }

	    if (name) {
	        _global.global.clean.setItem(_global.global.popupWindows, name, { win: win, domain: domain });
	    }

	    return win;
	};

	function linkUrl(win, url) {

	    for (var _iterator = Object.keys(_global.global.popupWindows), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	        var _ref2;

	        if (_isArray) {
	            if (_i >= _iterator.length) break;
	            _ref2 = _iterator[_i++];
	        } else {
	            _i = _iterator.next();
	            if (_i.done) break;
	            _ref2 = _i.value;
	        }

	        var name = _ref2;

	        var winOptions = _global.global.popupWindows[name];

	        if (winOptions.win === win) {
	            winOptions.domain = _lib.util.getDomainFromUrl(url);

	            (0, _common.registerRemoteWindow)(win);

	            break;
	        }
	    }
	}

/***/ },
/* 32 */
/*!***********************************************!*\
  !*** ./~/post-robot/src/drivers/listeners.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.listeners = undefined;
	exports.resetListeners = resetListeners;
	exports.getRequestListener = getRequestListener;
	exports.removeRequestListener = removeRequestListener;
	exports.addRequestListener = addRequestListener;

	var _global = __webpack_require__(/*! ../global */ 18);

	_global.global.listeners = _global.global.listeners || {
	    request: [],
	    response: []
	};

	var listeners = exports.listeners = _global.global.listeners;

	function resetListeners() {
	    _global.global.listeners.request = [];
	    _global.global.listeners.response = [];
	}

	function isRegex(item) {
	    return Object.prototype.toString.call(item) === '[object RegExp]';
	}

	function matchDomain(domain, origin) {

	    if (typeof domain === 'string') {

	        if (isRegex(origin)) {
	            return false;
	        }

	        if (Array.isArray(origin)) {
	            return false;
	        }

	        return domain === '*' || origin === domain;
	    }

	    if (isRegex(domain)) {

	        if (isRegex(origin)) {
	            return domain.toString() === origin.toString();
	        }

	        if (Array.isArray(origin)) {
	            return false;
	        }

	        return origin.match(domain);
	    }

	    if (Array.isArray(domain)) {

	        if (isRegex(origin)) {
	            return false;
	        }

	        if (Array.isArray(origin)) {
	            return JSON.stringify(domain) === JSON.stringify(origin);
	        }

	        return domain.indexOf(origin) !== -1;
	    }

	    return false;
	}

	function getRequestListener(name, win, domain) {

	    var result = {};

	    for (var _iterator = _global.global.listeners.request, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	        var _ref;

	        if (_isArray) {
	            if (_i >= _iterator.length) break;
	            _ref = _iterator[_i++];
	        } else {
	            _i = _iterator.next();
	            if (_i.done) break;
	            _ref = _i.value;
	        }

	        var requestListener = _ref;


	        if (requestListener.name !== name) {
	            continue;
	        }

	        var specifiedWin = requestListener.win && requestListener.win !== '*';
	        var specifiedDomain = requestListener.domain && requestListener.domain !== '*';

	        var matchedWin = specifiedWin && requestListener.win === win;
	        var matchedDomain = specifiedDomain && matchDomain(requestListener.domain, domain);

	        if (specifiedWin && specifiedDomain) {
	            if (matchedWin && matchedDomain) {
	                result.all = result.all || requestListener.options;
	            }
	        } else if (specifiedDomain) {
	            if (matchedDomain) {
	                result.domain = result.domain || requestListener.options;
	            }
	        } else if (specifiedWin) {
	            if (matchedWin) {
	                result.win = result.win || requestListener.options;
	            }
	        } else {
	            result.name = result.name || requestListener.options;
	        }
	    }

	    return result.all || result.domain || result.win || result.name;
	}

	function removeRequestListener(options) {

	    for (var _iterator2 = _global.global.listeners.request, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
	        var _ref2;

	        if (_isArray2) {
	            if (_i2 >= _iterator2.length) break;
	            _ref2 = _iterator2[_i2++];
	        } else {
	            _i2 = _iterator2.next();
	            if (_i2.done) break;
	            _ref2 = _i2.value;
	        }

	        var listener = _ref2;

	        if (listener.options === options) {
	            _global.global.listeners.request.splice(_global.global.listeners.request.indexOf(listener), 1);
	        }
	    }
	}

	function addRequestListener(name, win, domain, options, override) {

	    var listener = getRequestListener(name, win, domain);

	    if (listener) {
	        if (override) {
	            removeRequestListener(listener);
	        } else {

	            if (win) {
	                throw new Error('Request listener already exists for ' + name + ' on domain ' + domain + ' for specified window: ' + (listener.win === win));
	            }

	            throw new Error('Request listener already exists for ' + name + ' on domain ' + domain);
	        }
	    }

	    _global.global.clean.push(_global.global.listeners.request, { name: name, win: win, domain: domain, options: options });
	}

/***/ },
/* 33 */
/*!**********************************************!*\
  !*** ./~/post-robot/src/interface/server.js ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.on = undefined;
	exports.listen = listen;
	exports.once = once;
	exports.listener = listener;

	var _conf = __webpack_require__(/*! ../conf */ 6);

	var _lib = __webpack_require__(/*! ../lib */ 11);

	var _drivers = __webpack_require__(/*! ../drivers */ 9);

	function listen(options) {

	    if (!options.name) {
	        throw new Error('Expected options.name');
	    }

	    options.handler = options.handler || _lib.util.noop;

	    options.errorHandler = options.errorHandler || function (err) {
	        throw err;
	    };

	    if (options.once) {
	        (function () {
	            var handler = options.handler;
	            options.handler = _lib.util.once(function () {
	                (0, _drivers.removeRequestListener)(options);
	                return handler.apply(this, arguments);
	            });
	        })();
	    }

	    var override = options.override || _conf.CONFIG.MOCK_MODE;

	    if (options.source) {
	        options.window = options.source;
	    }

	    options.domain = options.domain || '*';

	    (0, _drivers.addRequestListener)(options.name, options.window, options.domain, options, override);

	    options.handleError = function (err) {
	        // removeRequestListener(options);
	        options.errorHandler(err);
	    };

	    if (options.window && options.errorOnClose) {
	        (function () {
	            var interval = _lib.util.safeInterval(function () {
	                if ((0, _lib.isWindowClosed)(options.window)) {
	                    interval.cancel();
	                    options.handleError(new Error('Post message target window is closed'));
	                }
	            }, 50);
	        })();
	    }

	    return {
	        cancel: function cancel() {
	            (0, _drivers.removeRequestListener)(options);
	        }
	    };
	}

	function _on(name, options, handler, errorHandler) {

	    if (typeof options === 'function') {
	        errorHandler = handler;
	        handler = options;
	        options = {};
	    }

	    options = options || {};

	    options.name = name;
	    options.handler = handler || options.handler;
	    options.errorHandler = errorHandler || options.errorHandler;

	    return listen(options);
	}

	exports.on = _on;
	function once(name, options, handler, errorHandler) {

	    if (typeof options === 'function') {
	        errorHandler = handler;
	        handler = options;
	        options = {};
	    }

	    options = options || {};

	    options.name = name;
	    options.handler = handler || options.handler;
	    options.errorHandler = errorHandler || options.errorHandler;
	    options.once = true;

	    var prom = new _lib.promise.Promise(function (resolve, reject) {
	        options.handler = options.handler || function (event) {
	            return resolve(event);
	        };
	        options.errorHandler = options.errorHandler || reject;
	    });

	    var myListener = listen(options);

	    _lib.util.extend(prom, myListener);

	    return prom;
	}

	function listener() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];


	    return {
	        on: function on(name, handler, errorHandler) {
	            return _on(name, options, handler, errorHandler);
	        }
	    };
	}

/***/ },
/* 34 */
/*!**********************************************!*\
  !*** ./~/post-robot/src/interface/config.js ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.CONSTANTS = exports.CONFIG = undefined;
	exports.enableMockMode = enableMockMode;
	exports.disableMockMode = disableMockMode;

	var _conf = __webpack_require__(/*! ../conf */ 6);

	Object.defineProperty(exports, 'CONFIG', {
	    enumerable: true,
	    get: function get() {
	        return _conf.CONFIG;
	    }
	});
	Object.defineProperty(exports, 'CONSTANTS', {
	    enumerable: true,
	    get: function get() {
	        return _conf.CONSTANTS;
	    }
	});
	exports.disable = disable;

	var _drivers = __webpack_require__(/*! ../drivers */ 9);

	function enableMockMode() {
	    _conf.CONFIG.MOCK_MODE = true;
	}

	function disableMockMode() {
	    _conf.CONFIG.MOCK_MODE = false;
	}

	function disable() {
	    delete window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT];
	    window.removeEventListener('message', _drivers.messageListener);
	}

/***/ },
/* 35 */
/*!*****************************************!*\
  !*** ./~/beaver-logger/client/index.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _logger = __webpack_require__(/*! ./logger */ 36);

	Object.keys(_logger).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _logger[key];
	    }
	  });
	});

	var _init = __webpack_require__(/*! ./init */ 42);

	Object.keys(_init).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _init[key];
	    }
	  });
	});

	var _transitions = __webpack_require__(/*! ./transitions */ 44);

	Object.keys(_transitions).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _transitions[key];
	    }
	  });
	});

	var _builders = __webpack_require__(/*! ./builders */ 40);

	Object.keys(_builders).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _builders[key];
	    }
	  });
	});
	exports['default'] = module.exports;

/***/ },
/* 36 */
/*!******************************************!*\
  !*** ./~/beaver-logger/client/logger.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.flush = exports.tracking = exports.buffer = undefined;
	exports.print = print;
	exports.immediateFlush = immediateFlush;
	exports.log = log;
	exports.debug = debug;
	exports.info = info;
	exports.warn = warn;
	exports.error = error;
	exports.track = track;

	var _util = __webpack_require__(/*! ./util */ 37);

	var _builders = __webpack_require__(/*! ./builders */ 40);

	var _config = __webpack_require__(/*! ./config */ 41);

	var buffer = exports.buffer = [];
	var tracking = exports.tracking = {};

	function print(level, event, payload) {

	    if (!window.console || !window.console.log) {
	        return;
	    }

	    payload = payload || {};

	    var args = [event];

	    args.push(payload);

	    if (payload.error || payload.warning) {
	        args.push('\n\n', payload.error || payload.warning);
	    }

	    (window.console[level] || window.console.log).apply(window.console, args);
	}

	function immediateFlush() {
	    var async = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];


	    if (!_config.config.uri) {
	        return;
	    }

	    var hasBuffer = buffer.length;
	    var hasTracking = Object.keys(tracking).length;

	    if (!hasBuffer && !hasTracking) {
	        return;
	    }

	    if (hasTracking) {
	        print('info', 'tracking', tracking);
	    }

	    var meta = {};

	    for (var _iterator = _builders.metaBuilders, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	        var _ref;

	        if (_isArray) {
	            if (_i >= _iterator.length) break;
	            _ref = _iterator[_i++];
	        } else {
	            _i = _iterator.next();
	            if (_i.done) break;
	            _ref = _i.value;
	        }

	        var builder = _ref;

	        try {
	            (0, _util.extend)(meta, builder(), false);
	        } catch (err) {
	            console.error('Error in custom meta builder:', err.stack || err.toString());
	        }
	    }

	    for (var _iterator2 = _builders.trackingBuilders, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
	        var _ref2;

	        if (_isArray2) {
	            if (_i2 >= _iterator2.length) break;
	            _ref2 = _iterator2[_i2++];
	        } else {
	            _i2 = _iterator2.next();
	            if (_i2.done) break;
	            _ref2 = _i2.value;
	        }

	        var _builder = _ref2;

	        try {
	            (0, _util.extend)(tracking, _builder(), false);
	        } catch (err) {
	            console.error('Error in custom tracking builder:', err.stack || err.toString());
	        }
	    }

	    var headers = {};

	    for (var _iterator3 = _builders.headerBuilders, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
	        var _ref3;

	        if (_isArray3) {
	            if (_i3 >= _iterator3.length) break;
	            _ref3 = _iterator3[_i3++];
	        } else {
	            _i3 = _iterator3.next();
	            if (_i3.done) break;
	            _ref3 = _i3.value;
	        }

	        var _builder2 = _ref3;

	        try {
	            (0, _util.extend)(headers, _builder2(), false);
	        } catch (err) {
	            console.error('Error in custom header builder:', err.stack || err.toString());
	        }
	    }

	    var events = buffer;

	    var req = (0, _util.ajax)('post', _config.config.uri, headers, {
	        events: events,
	        meta: meta,
	        tracking: tracking
	    }, async);

	    exports.buffer = buffer = [];
	    exports.tracking = tracking = {};

	    return req;
	}

	var flush = exports.flush = (0, _util.promiseDebounce)(immediateFlush, _config.config.debounceInterval);

	function enqueue(level, event, payload) {

	    buffer.push({
	        level: level,
	        event: event,
	        payload: payload
	    });

	    if (_config.config.autoLog.indexOf(level) > -1) {
	        flush();
	    }
	}

	function log(level, event, payload) {

	    payload = payload || {};

	    if (typeof payload === 'string') {
	        payload = {
	            message: payload
	        };
	    } else if (payload instanceof Error) {
	        payload = {
	            error: payload.stack || payload.toString()
	        };
	    }

	    payload.timestamp = Date.now();

	    for (var _iterator4 = _builders.payloadBuilders, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
	        var _ref4;

	        if (_isArray4) {
	            if (_i4 >= _iterator4.length) break;
	            _ref4 = _iterator4[_i4++];
	        } else {
	            _i4 = _iterator4.next();
	            if (_i4.done) break;
	            _ref4 = _i4.value;
	        }

	        var builder = _ref4;

	        try {
	            (0, _util.extend)(payload, builder(), false);
	        } catch (err) {
	            console.error('Error in custom payload builder:', err.stack || err.toString());
	        }
	    }

	    print(level, event, payload);

	    if (buffer.length === _config.config.sizeLimit) {
	        enqueue('info', 'logger_max_buffer_length');
	    } else if (buffer.length < _config.config.sizeLimit) {
	        enqueue(level, event, payload);
	    }
	}

	function debug(event, payload) {
	    return log('debug', event, payload);
	}

	function info(event, payload) {
	    return log('info', event, payload);
	}

	function warn(event, payload) {
	    return log('warn', event, payload);
	}

	function error(event, payload) {
	    return log('error', event, payload);
	}

	function track(payload) {
	    (0, _util.extend)(tracking, payload || {}, false);
	}

/***/ },
/* 37 */
/*!****************************************!*\
  !*** ./~/beaver-logger/client/util.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.windowReady = undefined;
	exports.extend = extend;
	exports.isSameDomain = isSameDomain;
	exports.ajax = ajax;
	exports.promiseDebounce = promiseDebounce;
	exports.safeInterval = safeInterval;
	exports.uniqueID = uniqueID;

	var _es6PromiseMin = __webpack_require__(/*! es6-promise-min */ 38);

	function extend(dest, src) {
	    var over = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

	    dest = dest || {};
	    src = src || {};

	    for (var i in src) {
	        if (src.hasOwnProperty(i)) {
	            if (over || !dest.hasOwnProperty(i)) {
	                dest[i] = src[i];
	            }
	        }
	    }

	    return dest;
	}

	function isSameDomain(url) {
	    var match = url.match(/https?:\/\/[^/]+/);

	    if (!match) {
	        return true;
	    }

	    return match[0] === window.location.protocol + '//' + window.location.host;
	}

	function ajax(method, url) {
	    var headers = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	    var data = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	    var async = arguments.length <= 4 || arguments[4] === undefined ? true : arguments[4];


	    return new _es6PromiseMin.Promise(function (resolve) {
	        var XRequest = window.XMLHttpRequest || window.ActiveXObject;

	        if (window.XDomainRequest && !isSameDomain(url)) {
	            XRequest = window.XDomainRequest;
	        }

	        var req = new XRequest('MSXML2.XMLHTTP.3.0');
	        req.open(method.toUpperCase(), url, async);

	        req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	        req.setRequestHeader('Content-type', 'application/json');

	        for (var headerName in headers) {
	            if (headers.hasOwnProperty(headerName)) {
	                req.setRequestHeader(headerName, headers[headerName]);
	            }
	        }

	        req.onreadystatechange = function () {
	            if (req.readyState > 3) {
	                resolve();
	            }
	        };
	        req.send(JSON.stringify(data).replace(/&/g, '%26'));
	    });
	}

	function promiseDebounce(method, interval) {

	    var debounce = {};

	    return function () {
	        var args = arguments;

	        if (debounce.timeout) {
	            clearTimeout(debounce.timeout);
	            delete debounce.timeout;
	        }

	        debounce.timeout = setTimeout(function () {

	            var resolver = debounce.resolver;
	            var rejector = debounce.rejector;

	            delete debounce.promise;
	            delete debounce.resolver;
	            delete debounce.rejector;
	            delete debounce.timeout;

	            return _es6PromiseMin.Promise.resolve().then(function () {
	                return method.apply(null, args);
	            }).then(resolver, rejector);
	        }, interval);

	        debounce.promise = debounce.promise || new _es6PromiseMin.Promise(function (resolver, rejector) {
	            debounce.resolver = resolver;
	            debounce.rejector = rejector;
	        });

	        return debounce.promise;
	    };
	}

	var windowReady = exports.windowReady = new _es6PromiseMin.Promise(function (resolve) {
	    if (document.readyState === 'complete') {
	        resolve();
	    }

	    window.addEventListener('load', resolve);
	});

	function safeInterval(method, time) {

	    var timeout = void 0;

	    function loop() {
	        timeout = setTimeout(function () {
	            method();
	            loop();
	        }, time);
	    }

	    loop();

	    return {
	        cancel: function cancel() {
	            clearTimeout(timeout);
	        }
	    };
	}

	function uniqueID() {
	    var chars = '0123456789abcdef';

	    return 'xxxxxxxxxx'.replace(/./g, function () {
	        return chars.charAt(Math.floor(Math.random() * chars.length));
	    });
	}

/***/ },
/* 38 */
/*!***************************************************!*\
  !*** ./~/es6-promise-min/dist/es6-promise.min.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process, global) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
	 * @version   2.0.1
	 */

	(function(){function r(a,b){n[l]=a;n[l+1]=b;l+=2;2===l&&A()}function s(a){return"function"===typeof a}function F(){return function(){process.nextTick(t)}}function G(){var a=0,b=new B(t),c=document.createTextNode("");b.observe(c,{characterData:!0});return function(){c.data=a=++a%2}}function H(){var a=new MessageChannel;a.port1.onmessage=t;return function(){a.port2.postMessage(0)}}function I(){return function(){setTimeout(t,1)}}function t(){for(var a=0;a<l;a+=2)(0,n[a])(n[a+1]),n[a]=void 0,n[a+1]=void 0;
	l=0}function p(){}function J(a,b,c,d){try{a.call(b,c,d)}catch(e){return e}}function K(a,b,c){r(function(a){var e=!1,f=J(c,b,function(c){e||(e=!0,b!==c?q(a,c):m(a,c))},function(b){e||(e=!0,g(a,b))});!e&&f&&(e=!0,g(a,f))},a)}function L(a,b){1===b.a?m(a,b.b):2===a.a?g(a,b.b):u(b,void 0,function(b){q(a,b)},function(b){g(a,b)})}function q(a,b){if(a===b)g(a,new TypeError("You cannot resolve a promise with itself"));else if("function"===typeof b||"object"===typeof b&&null!==b)if(b.constructor===a.constructor)L(a,
	b);else{var c;try{c=b.then}catch(d){v.error=d,c=v}c===v?g(a,v.error):void 0===c?m(a,b):s(c)?K(a,b,c):m(a,b)}else m(a,b)}function M(a){a.f&&a.f(a.b);x(a)}function m(a,b){void 0===a.a&&(a.b=b,a.a=1,0!==a.e.length&&r(x,a))}function g(a,b){void 0===a.a&&(a.a=2,a.b=b,r(M,a))}function u(a,b,c,d){var e=a.e,f=e.length;a.f=null;e[f]=b;e[f+1]=c;e[f+2]=d;0===f&&a.a&&r(x,a)}function x(a){var b=a.e,c=a.a;if(0!==b.length){for(var d,e,f=a.b,g=0;g<b.length;g+=3)d=b[g],e=b[g+c],d?C(c,d,e,f):e(f);a.e.length=0}}function D(){this.error=
	null}function C(a,b,c,d){var e=s(c),f,k,h,l;if(e){try{f=c(d)}catch(n){y.error=n,f=y}f===y?(l=!0,k=f.error,f=null):h=!0;if(b===f){g(b,new TypeError("A promises callback cannot return that same promise."));return}}else f=d,h=!0;void 0===b.a&&(e&&h?q(b,f):l?g(b,k):1===a?m(b,f):2===a&&g(b,f))}function N(a,b){try{b(function(b){q(a,b)},function(b){g(a,b)})}catch(c){g(a,c)}}function k(a,b,c,d){this.n=a;this.c=new a(p,d);this.i=c;this.o(b)?(this.m=b,this.d=this.length=b.length,this.l(),0===this.length?m(this.c,
	this.b):(this.length=this.length||0,this.k(),0===this.d&&m(this.c,this.b))):g(this.c,this.p())}function h(a){O++;this.b=this.a=void 0;this.e=[];if(p!==a){if(!s(a))throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");if(!(this instanceof h))throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");N(this,a)}}var E=Array.isArray?Array.isArray:function(a){return"[object Array]"===
	Object.prototype.toString.call(a)},l=0,w="undefined"!==typeof window?window:{},B=w.MutationObserver||w.WebKitMutationObserver,w="undefined"!==typeof Uint8ClampedArray&&"undefined"!==typeof importScripts&&"undefined"!==typeof MessageChannel,n=Array(1E3),A;A="undefined"!==typeof process&&"[object process]"==={}.toString.call(process)?F():B?G():w?H():I();var v=new D,y=new D;k.prototype.o=function(a){return E(a)};k.prototype.p=function(){return Error("Array Methods must be provided an Array")};k.prototype.l=
	function(){this.b=Array(this.length)};k.prototype.k=function(){for(var a=this.length,b=this.c,c=this.m,d=0;void 0===b.a&&d<a;d++)this.j(c[d],d)};k.prototype.j=function(a,b){var c=this.n;"object"===typeof a&&null!==a?a.constructor===c&&void 0!==a.a?(a.f=null,this.g(a.a,b,a.b)):this.q(c.resolve(a),b):(this.d--,this.b[b]=this.h(a))};k.prototype.g=function(a,b,c){var d=this.c;void 0===d.a&&(this.d--,this.i&&2===a?g(d,c):this.b[b]=this.h(c));0===this.d&&m(d,this.b)};k.prototype.h=function(a){return a};
	k.prototype.q=function(a,b){var c=this;u(a,void 0,function(a){c.g(1,b,a)},function(a){c.g(2,b,a)})};var O=0;h.all=function(a,b){return(new k(this,a,!0,b)).c};h.race=function(a,b){function c(a){q(e,a)}function d(a){g(e,a)}var e=new this(p,b);if(!E(a))return (g(e,new TypeError("You must pass an array to race.")), e);for(var f=a.length,h=0;void 0===e.a&&h<f;h++)u(this.resolve(a[h]),void 0,c,d);return e};h.resolve=function(a,b){if(a&&"object"===typeof a&&a.constructor===this)return a;var c=new this(p,b);
	q(c,a);return c};h.reject=function(a,b){var c=new this(p,b);g(c,a);return c};h.prototype={constructor:h,then:function(a,b){var c=this.a;if(1===c&&!a||2===c&&!b)return this;var d=new this.constructor(p),e=this.b;if(c){var f=arguments[c-1];r(function(){C(c,d,f,e)})}else u(this,d,a,b);return d},"catch":function(a){return this.then(null,a)}};var z={Promise:h,polyfill:function(){var a;a="undefined"!==typeof global?global:"undefined"!==typeof window&&window.document?window:self;"Promise"in a&&"resolve"in
	a.Promise&&"reject"in a.Promise&&"all"in a.Promise&&"race"in a.Promise&&function(){var b;new a.Promise(function(a){b=a});return s(b)}()||(a.Promise=h)}}; true?!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return z}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"undefined"!==typeof module&&module.exports?module.exports=z:"undefined"!==typeof this&&(this.ES6Promise=z)}).call(this);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./~/process/browser.js */ 39), (function() { return this; }())))

/***/ },
/* 39 */
/*!******************************!*\
  !*** ./~/process/browser.js ***!
  \******************************/
/***/ function(module, exports) {

	'use strict';

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while (len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ },
/* 40 */
/*!********************************************!*\
  !*** ./~/beaver-logger/client/builders.js ***!
  \********************************************/
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.addPayloadBuilder = addPayloadBuilder;
	exports.addMetaBuilder = addMetaBuilder;
	exports.addTrackingBuilder = addTrackingBuilder;
	exports.addHeaderBuilder = addHeaderBuilder;
	var payloadBuilders = exports.payloadBuilders = [];
	var metaBuilders = exports.metaBuilders = [];
	var trackingBuilders = exports.trackingBuilders = [];
	var headerBuilders = exports.headerBuilders = [];

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

/***/ },
/* 41 */
/*!******************************************!*\
  !*** ./~/beaver-logger/client/config.js ***!
  \******************************************/
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var config = exports.config = {

	    uri: '',

	    initial_state_name: 'init',

	    flushInterval: 10 * 60 * 1000,
	    debounceInterval: 10,

	    sizeLimit: 300,

	    heartbeat: true,
	    heartbeatConsoleLog: true,
	    heartbeatInterval: 5000,
	    hearbeatMaxThreshold: 50,
	    heartbeatTooBusyThreshold: 10000,

	    autoLog: ['warn', 'error'],

	    logUnload: true,
	    logUnloadSync: false,
	    logPerformance: true
	};

/***/ },
/* 42 */
/*!****************************************!*\
  !*** ./~/beaver-logger/client/init.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.init = init;

	var _config = __webpack_require__(/*! ./config */ 41);

	var _util = __webpack_require__(/*! ./util */ 37);

	var _performance = __webpack_require__(/*! ./performance */ 43);

	var _logger = __webpack_require__(/*! ./logger */ 36);

	var initiated = false;

	function init(conf) {
	    (0, _util.extend)(_config.config, conf || {});

	    if (initiated) {
	        return;
	    }

	    initiated = true;

	    if (_config.config.logPerformance) {
	        (0, _performance.initPerformance)();
	    }

	    if (_config.config.heartbeat) {
	        (0, _performance.initHeartBeat)();
	    }

	    if (_config.config.logUnload) {
	        (function () {
	            var async = !_config.config.logUnloadSync;

	            window.addEventListener('beforeunload', function () {
	                (0, _logger.info)('window_beforeunload');
	                (0, _logger.immediateFlush)(async);
	            });

	            window.addEventListener('unload', function () {
	                (0, _logger.info)('window_unload');
	                (0, _logger.immediateFlush)(async);
	            });
	        })();
	    }

	    if (_config.config.flushInterval) {
	        setInterval(_logger.flush, _config.config.flushInterval);
	    }

	    if (window.beaverLogQueue) {
	        window.beaverLogQueue.forEach(function (payload) {
	            (0, _logger.log)(payload.level, payload.event, payload);
	        });
	        delete window.beaverLogQueue;
	    }
	}

/***/ },
/* 43 */
/*!***********************************************!*\
  !*** ./~/beaver-logger/client/performance.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.reqTimer = exports.clientTimer = undefined;
	exports.now = now;
	exports.reqStartElapsed = reqStartElapsed;
	exports.initHeartBeat = initHeartBeat;
	exports.initPerformance = initPerformance;

	var _config = __webpack_require__(/*! ./config */ 41);

	var _logger = __webpack_require__(/*! ./logger */ 36);

	var _builders = __webpack_require__(/*! ./builders */ 40);

	var _util = __webpack_require__(/*! ./util */ 37);

	var enablePerformance = window && window.performance && performance.now && performance.timing && performance.timing.connectEnd && performance.timing.navigationStart && Math.abs(performance.now() - Date.now()) > 1000 && performance.now() - (performance.timing.connectEnd - performance.timing.navigationStart) > 0;

	function now() {
	    if (enablePerformance) {
	        return performance.now();
	    } else {
	        return Date.now();
	    }
	}

	function timer(startTime) {
	    startTime = startTime !== undefined ? startTime : now();

	    return {
	        startTime: startTime,

	        elapsed: function elapsed() {
	            return parseInt(now() - startTime, 10);
	        },
	        reset: function reset() {
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

	var clientTimer = exports.clientTimer = timer();
	var reqTimer = exports.reqTimer = timer(reqStartElapsed());

	function initHeartBeat() {

	    var heartBeatTimer = timer();
	    var heartbeatCount = 0;

	    (0, _util.safeInterval)(function () {

	        if (!_logger.buffer.length || _logger.buffer[_logger.buffer.length - 1].event !== 'heartbeat') {
	            heartbeatCount = 0;
	        }

	        if (!_logger.buffer.length || heartbeatCount > _config.config.hearbeatMaxThreshold) {
	            return;
	        }

	        heartbeatCount += 1;

	        var elapsed = heartBeatTimer.elapsed();
	        var lag = elapsed - _config.config.heartbeatInterval;

	        if (lag >= _config.config.heartbeatTooBusyThreshold) {
	            (0, _logger.info)('toobusy', {
	                count: heartbeatCount,
	                elapsed: elapsed,
	                lag: lag
	            }, {
	                noConsole: !_config.config.heartbeatConsoleLog
	            });
	        }

	        (0, _logger.info)('heartbeat', {
	            count: heartbeatCount,
	            elapsed: elapsed,
	            lag: lag
	        }, {
	            noConsole: !_config.config.heartbeatConsoleLog
	        });
	    }, _config.config.heartbeatInterval);
	}

	function initPerformance() {

	    if (!enablePerformance) {
	        return (0, _logger.info)('no_performance_data');
	    }

	    (0, _builders.addPayloadBuilder)(function () {

	        var payload = {};

	        payload.client_elapsed = clientTimer.elapsed();

	        if (enablePerformance) {
	            payload.req_elapsed = reqTimer.elapsed();
	        }

	        return payload;
	    });

	    _util.windowReady.then(function () {

	        var keys = ['connectEnd', 'connectStart', 'domComplete', 'domContentLoadedEventEnd', 'domContentLoadedEventStart', 'domInteractive', 'domLoading', 'domainLookupEnd', 'domainLookupStart', 'fetchStart', 'loadEventEnd', 'loadEventStart', 'navigationStart', 'redirectEnd', 'redirectStart', 'requestStart', 'responseEnd', 'responseStart', 'secureConnectionStart', 'unloadEventEnd', 'unloadEventStart'];

	        var timing = {};

	        keys.forEach(function (key) {
	            timing[key] = parseInt(window.performance.timing[key], 10) || 0;
	        });

	        var offset = timing.connectEnd - timing.navigationStart;

	        if (timing.connectEnd) {
	            Object.keys(timing).forEach(function (name) {
	                var time = timing[name];
	                if (time) {
	                    (0, _logger.info)('timing_' + name, {
	                        client_elapsed: parseInt(time - timing.connectEnd - (clientTimer.startTime - offset), 10),
	                        req_elapsed: parseInt(time - timing.connectEnd, 10)
	                    });
	                }
	            });
	        }

	        (0, _logger.info)('timing', timing);
	        (0, _logger.info)('memory', window.performance.memory);
	        (0, _logger.info)('navigation', window.performance.navigation);

	        if (window.performance.getEntries) {
	            window.performance.getEntries().forEach(function (resource) {
	                if (['link', 'script', 'img', 'css'].indexOf(resource.initiatorType) > -1) {
	                    (0, _logger.info)(resource.initiatorType, resource);
	                }
	            });
	        }
	    });
	}

/***/ },
/* 44 */
/*!***********************************************!*\
  !*** ./~/beaver-logger/client/transitions.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.startTransition = startTransition;
	exports.endTransition = endTransition;
	exports.transition = transition;

	var _performance = __webpack_require__(/*! ./performance */ 43);

	var _logger = __webpack_require__(/*! ./logger */ 36);

	var _builders = __webpack_require__(/*! ./builders */ 40);

	var _util = __webpack_require__(/*! ./util */ 37);

	var _config = __webpack_require__(/*! ./config */ 41);

	var windowID = (0, _util.uniqueID)();
	var pageID = (0, _util.uniqueID)();

	var currentState = _config.config.initial_state_name;
	var startTime = void 0;

	function startTransition() {
	    startTime = (0, _performance.now)();
	}

	function endTransition(toState) {
	    startTime = startTime || (0, _performance.reqStartElapsed)();

	    var currentTime = (0, _performance.now)();
	    var elapsedTime = void 0;

	    if (startTime !== undefined) {
	        elapsedTime = parseInt(currentTime - startTime, 0);
	    }

	    var transitionName = 'transition_' + currentState + '_to_' + toState;

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

	function transition(toState) {
	    startTransition();
	    endTransition(toState);
	}

	(0, _builders.addPayloadBuilder)(function () {
	    return {
	        windowID: windowID,
	        pageID: pageID
	    };
	});

	(0, _builders.addMetaBuilder)(function () {
	    return {
	        state: 'ui_' + currentState
	    };
	});

/***/ },
/* 45 */
/*!*******************************!*\
  !*** ./src/component/base.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.BaseComponent = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _promise = __webpack_require__(/*! sync-browser-mocks/src/promise */ 13);

	var _src = __webpack_require__(/*! post-robot/src */ 3);

	var _src2 = _interopRequireDefault(_src);

	var _lib = __webpack_require__(/*! ../lib */ 46);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function cleanup(obj) {

	    var tasks = [];

	    return {
	        set: function set(name, item) {
	            obj[name] = item;
	            this.register(function () {
	                delete obj[name];
	            });
	            return item;
	        },
	        register: function register(name, method) {

	            if (!method) {
	                method = name;
	                name = undefined;
	            }

	            tasks.push({
	                complete: false,

	                name: name,

	                run: function run() {

	                    if (this.complete) {
	                        return;
	                    }

	                    this.complete = true;

	                    return method();
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

	            while (tasks.length) {
	                results.push(tasks.pop().run());
	            }

	            return _promise.SyncPromise.all(results).then(function () {
	                return;
	            });
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

	            return _promise.SyncPromise.all(results).then(function () {
	                return;
	            });
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
	    }

	    _createClass(BaseComponent, [{
	        key: 'addProp',
	        value: function addProp(options, name, def) {
	            (0, _lib.copyProp)(options, this, name, def);
	        }

	        /*  Try Catch
	            ---------
	             Returns a new method which wraps the original call in a try/catch, otherwise delegates to this.onError
	        */

	    }, {
	        key: 'tryCatch',
	        value: function tryCatch(method, doOnce) {

	            var self = this;
	            var errored = false;

	            var wrapper = function wrapper() {

	                if (errored) {
	                    return;
	                }

	                try {
	                    return method.apply(this, arguments);
	                } catch (err) {
	                    errored = true;
	                    return self.error(err);
	                }
	            };

	            if (doOnce !== false) {
	                wrapper = (0, _lib.once)(wrapper);
	            }

	            return wrapper;
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
	                throw new Error('[' + this.component.tag + '] window to listen to not set');
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


	                var name = listenerName.replace(/^xcomponent_/, '');

	                var listener = _src2['default'].on(listenerName, { window: win, domain: domain, errorHandler: function errorHandler(err) {
	                        return _this.error(err);
	                    } }, function (_ref3) {
	                    var source = _ref3.source;
	                    var data = _ref3.data;

	                    _this.component.log('listener_' + name);
	                    return listeners[listenerName].call(_this, source, data);
	                });

	                var errorListener = _src2['default'].on(listenerName, { window: win, errorHandler: function errorHandler(err) {
	                        return _this.error(err);
	                    } }, function (_ref4) {
	                    var origin = _ref4.origin;
	                    var data = _ref4.data;

	                    _this.component.logError('unexpected_listener_' + name, { origin: origin, domain: domain });
	                    _this.error(new Error('Unexpected ' + name + ' message from domain ' + origin + ' -- expected message from ' + domain));
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

/***/ },
/* 46 */
/*!**************************!*\
  !*** ./src/lib/index.js ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _dom = __webpack_require__(/*! ./dom */ 47);

	Object.keys(_dom).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _dom[key];
	    }
	  });
	});

	var _fn = __webpack_require__(/*! ./fn */ 48);

	Object.keys(_fn).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _fn[key];
	    }
	  });
	});

	var _promise = __webpack_require__(/*! ./promise */ 51);

	Object.keys(_promise).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _promise[key];
	    }
	  });
	});

	var _util = __webpack_require__(/*! ./util */ 49);

	Object.keys(_util).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _util[key];
	    }
	  });
	});

	var _css = __webpack_require__(/*! ./css */ 52);

	Object.keys(_css).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _css[key];
	    }
	  });
	});

/***/ },
/* 47 */
/*!************************!*\
  !*** ./src/lib/dom.js ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.parseQuery = exports.documentReady = undefined;

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.getElement = getElement;
	exports.elementReady = elementReady;
	exports.popup = popup;
	exports.iframe = iframe;
	exports.onCloseWindow = onCloseWindow;
	exports.addEventListener = addEventListener;
	exports.scanForJavascript = scanForJavascript;
	exports.createElement = createElement;
	exports.addEventToClass = addEventToClass;
	exports.template = template;
	exports.getQueryParam = getQueryParam;
	exports.getDomain = getDomain;
	exports.getDomainFromUrl = getDomainFromUrl;
	exports.formatQuery = formatQuery;
	exports.extendQuery = extendQuery;
	exports.extendUrl = extendUrl;
	exports.elementStoppedMoving = elementStoppedMoving;
	exports.getOpener = getOpener;
	exports.getParent = getParent;
	exports.getCurrentDimensions = getCurrentDimensions;
	exports.changeStyle = changeStyle;
	exports.setOverflow = setOverflow;
	exports.trackDimensions = trackDimensions;
	exports.onDimensionsChange = onDimensionsChange;
	exports.dimensionsMatchViewport = dimensionsMatchViewport;
	exports.bindEvents = bindEvents;
	exports.setVendorCSS = setVendorCSS;
	exports.animate = animate;
	exports.showElement = showElement;
	exports.hideElement = hideElement;
	exports.showAndAnimate = showAndAnimate;
	exports.animateAndHide = animateAndHide;
	exports.addClass = addClass;

	var _src = __webpack_require__(/*! post-robot/src */ 3);

	var _src2 = _interopRequireDefault(_src);

	var _promise = __webpack_require__(/*! sync-browser-mocks/src/promise */ 13);

	var _fn = __webpack_require__(/*! ./fn */ 48);

	var _util = __webpack_require__(/*! ./util */ 49);

	var _error = __webpack_require__(/*! ../error */ 50);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function isElement(element) {

	    if (element instanceof window.Element) {
	        return true;
	    }

	    if ((typeof element === 'undefined' ? 'undefined' : _typeof(element)) === 'object' && element.nodeType === 1 && _typeof(element.style) === 'object' && _typeof(element.ownerDocument) === 'object') {
	        return true;
	    }

	    return false;
	}

	/*  Get Element
	    -----------

	    Gets an element based on

	    - Element id
	    - CSS Query selector
	*/

	function getElement(id) {

	    if (isElement(id)) {
	        return id;
	    }

	    if (typeof id === 'string') {
	        var element = document.getElementById(id);

	        if (element) {
	            return element;
	        }

	        if (document.querySelector) {
	            return document.querySelector(id);
	        }
	    }
	}

	var documentReady = exports.documentReady = new _promise.SyncPromise(function (resolve) {

	    if (window.document.readyState === 'complete') {
	        return resolve(window.document);
	    }

	    var interval = setInterval(function () {
	        if (window.document.readyState === 'complete') {
	            clearInterval(interval);
	            return resolve(window.document);
	        }
	    }, 10);
	});

	function elementReady(id) {
	    return new _promise.SyncPromise(function (resolve, reject) {

	        var el = getElement(id);

	        if (el) {
	            return resolve(el);
	        }

	        if (window.document.readyState === 'complete') {
	            return reject(new Error('Document is ready and element ' + id + ' does not exist'));
	        }

	        var interval = setInterval(function () {

	            el = getElement(id);

	            if (el) {
	                clearInterval(interval);
	                return resolve(el);
	            }

	            if (window.document.readyState === 'complete') {
	                clearInterval(interval);
	                return reject(new Error('Document is ready and element ' + id + ' does not exist'));
	            }
	        }, 10);
	    });
	}

	/*  Popup
	    -----

	    Open a popup window with the specified option map
	*/

	function popup(url, options) {

	    var params = Object.keys(options).map(function (key) {
	        if (options[key]) {
	            return key + '=' + options[key];
	        }
	    }).filter(Boolean).join(',');

	    var win = window.open(url, options.name, params, true);

	    if (_src2['default'].winutil.isWindowClosed(win)) {
	        var err = new _error.PopupOpenError('Can not open popup window - blocked');
	        throw err;
	    }

	    return win;
	}

	/*  Iframe
	    ------

	    Open an iframe with the specified container, url, and option property map
	*/

	function iframe(url, options, container) {

	    container = getElement(container);

	    var frame = document.createElement('iframe');

	    for (var _iterator = Object.keys(options), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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

	        frame[key] = options[key];
	    }

	    frame.frameBorder = '0';
	    frame.allowTransparency = 'true';

	    if (container) {
	        container.appendChild(frame);
	    }

	    return frame;
	}

	/*  On Close Window
	    ---------------

	    Wait for the specified window to close or cease to exist, then call the callback
	*/

	function onCloseWindow(win, callback) {

	    callback = (0, _fn.once)(callback);

	    var interval = void 0;

	    var checkWindowClosed = function checkWindowClosed() {

	        if (_src2['default'].winutil.isWindowClosed(win, false)) {
	            clearInterval(interval);
	            return callback();
	        }
	    };

	    interval = (0, _util.safeInterval)(checkWindowClosed, 50);
	    checkWindowClosed();

	    return {
	        cancel: function cancel() {
	            interval.cancel();
	            callback = _fn.noop;
	        }
	    };
	}

	/*  Add Event Listener
	    ------------------

	    Add DOM Event listener with cancel
	*/

	function addEventListener(obj, event, handler) {
	    obj.addEventListener(event, handler);
	    return {
	        cancel: function cancel() {
	            obj.removeEventListener(event, handler);
	        }
	    };
	}

	/*  Scan For Javascript
	    -------------------

	    Check if the string contains anything which could conceivably be run as javascript if the string is set to innerHTML
	*/

	function scanForJavascript(str) {

	    if (!str) {
	        return str;
	    }

	    if (str.match(/<script|on\w+\s*=|javascript:|expression\s*\(|eval\(|new\s*Function/)) {
	        throw new Error('HTML contains potential javascript: ' + str);
	    }

	    return str;
	}

	/*  Create Element
	    --------------

	    Create an element with style, html, classes, attributes etc. and append it to the specified container
	*/

	function createElement() {
	    var tag = arguments.length <= 0 || arguments[0] === undefined ? 'div' : arguments[0];
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	    var container = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

	    var element = document.createElement(tag);

	    if (options.style) {
	        (0, _util.extend)(element.style, options.style);
	    }

	    if (options.html) {
	        element.innerHTML = options.html;
	    }

	    if (options['class']) {
	        element.className = options['class'].join(' ');
	    }

	    if (options.attributes) {
	        for (var _iterator2 = Object.keys(options.attributes), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
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

	            element.setAttribute(key, options.attributes[key]);
	        }
	    }

	    if (options.styleSheet) {
	        if (element.styleSheet) {
	            element.styleSheet.cssText = options.styleSheet;
	        } else {
	            element.appendChild(document.createTextNode(options.styleSheet));
	        }
	    }

	    return element;
	}

	/*  Add Event To Class
	    ------------------

	    Find all elements with a class and add an event handler
	*/

	function addEventToClass(element, className, eventName, handler) {

	    var handlers = [];

	    for (var _iterator3 = Array.prototype.slice.call(element.getElementsByClassName(className)), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
	        var _ref3;

	        if (_isArray3) {
	            if (_i3 >= _iterator3.length) break;
	            _ref3 = _iterator3[_i3++];
	        } else {
	            _i3 = _iterator3.next();
	            if (_i3.done) break;
	            _ref3 = _i3.value;
	        }

	        var el = _ref3;


	        var eventHandler = function eventHandler(event) {
	            event.preventDefault();
	            event.stopPropagation();
	            handler();
	        };

	        handlers.push({ el: el, eventHandler: eventHandler });

	        el.addEventListener(eventName, eventHandler);
	    }

	    return {
	        cancel: function cancel() {
	            for (var _iterator4 = handlers, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
	                var _ref4;

	                if (_isArray4) {
	                    if (_i4 >= _iterator4.length) break;
	                    _ref4 = _iterator4[_i4++];
	                } else {
	                    _i4 = _iterator4.next();
	                    if (_i4.done) break;
	                    _ref4 = _i4.value;
	                }

	                var _ref5 = _ref4;
	                var el = _ref5.el;
	                var eventHandler = _ref5.eventHandler;

	                el.removeEventListener(eventName, eventHandler);
	            }
	        }
	    };
	}

	/*  Template
	    --------

	    Render a simple template with [[substitutions]]
	*/

	function template(html, context) {
	    return html.replace(/\{([\w_\.]+)\}/g, function (variable) {
	        return (0, _util.get)(context, variable.slice(1, variable.length - 1), '');
	    });
	}

	var parseQuery = exports.parseQuery = (0, _fn.memoize)(function (queryString) {

	    var params = {};

	    if (!queryString) {
	        return params;
	    }

	    if (queryString.indexOf('=') === -1) {
	        throw new Error('Can not parse query string params: ' + queryString);
	    }

	    for (var _iterator5 = queryString.split('&'), _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
	        var _ref6;

	        if (_isArray5) {
	            if (_i5 >= _iterator5.length) break;
	            _ref6 = _iterator5[_i5++];
	        } else {
	            _i5 = _iterator5.next();
	            if (_i5.done) break;
	            _ref6 = _i5.value;
	        }

	        var pair = _ref6;

	        pair = pair.split('=');

	        if (pair[0] && pair[1]) {
	            params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
	        }
	    }

	    return params;
	});

	function getQueryParam(name) {
	    return parseQuery(window.location.search.slice(1))[name];
	}

	function getDomain(win) {

	    win = win || window;

	    if (win.mockDomain && win.mockDomain.indexOf('mock://') === 0) {
	        return win.mockDomain;
	    }

	    return win.location.protocol + '//' + win.location.host;
	}

	function getDomainFromUrl(url) {

	    var domain = void 0;

	    if (url.match(/^(https?|mock|file):\/\//)) {
	        domain = url;
	    } else {
	        return getDomain(window);
	    }

	    domain = domain.split('/').slice(0, 3).join('/');

	    return domain;
	}

	function formatQuery() {
	    var obj = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];


	    return Object.keys(obj).map(function (key) {
	        return (0, _util.urlEncode)(key) + '=' + (0, _util.urlEncode)(obj[key]);
	    }).join('&');
	}

	function extendQuery(originalQuery) {
	    var props = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];


	    if (!props || !Object.keys(props).length) {
	        return originalQuery;
	    }

	    return formatQuery(_extends({}, parseQuery(originalQuery), props));
	}

	function extendUrl(url) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];


	    var query = options.query || {};
	    var hash = options.hash || {};

	    var originalUrl = void 0;
	    var originalQuery = void 0;
	    var originalHash = void 0;

	    var _url$split = url.split('#');

	    var _url$split2 = _slicedToArray(_url$split, 2);

	    originalUrl = _url$split2[0];
	    originalHash = _url$split2[1];

	    var _originalUrl$split = originalUrl.split('?');

	    var _originalUrl$split2 = _slicedToArray(_originalUrl$split, 2);

	    originalUrl = _originalUrl$split2[0];
	    originalQuery = _originalUrl$split2[1];


	    var queryString = extendQuery(originalQuery, query);
	    var hashString = extendQuery(originalHash, hash);

	    if (queryString) {
	        originalUrl = originalUrl + '?' + queryString;
	    }

	    if (hashString) {
	        originalUrl = originalUrl + '#' + hashString;
	    }

	    return originalUrl;
	}

	function elementStoppedMoving(element) {
	    var timeout = arguments.length <= 1 || arguments[1] === undefined ? 5000 : arguments[1];

	    return new _promise.SyncPromise(function (resolve, reject) {
	        element = getElement(element);

	        var start = element.getBoundingClientRect();

	        var interval = void 0;
	        var timer = void 0;

	        interval = setInterval(function () {
	            var end = element.getBoundingClientRect();

	            if (start.top === end.top && start.bottom === end.bottom && start.left === end.left && start.right === end.right && start.width === end.width && start.height === end.height) {
	                clearTimeout(timer);
	                clearInterval(interval);
	                return resolve();
	            }

	            start = end;
	        }, 50);

	        timer = setTimeout(function () {
	            clearInterval(interval);
	            reject(new Error('Timed out waiting for element to stop animating after ' + timeout + 'ms'));
	        }, timeout);
	    });
	}

	function getOpener(win) {

	    if (!win) {
	        return;
	    }

	    try {
	        return win.opener;
	    } catch (err) {
	        return;
	    }
	}

	function getParent(win) {

	    if (!win) {
	        return;
	    }

	    try {
	        if (win.parent && win.parent !== win) {
	            return win.parent;
	        }
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
	    return new _promise.SyncPromise(function (resolve) {

	        for (var _iterator6 = Object.keys(styles), _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
	            var _ref7;

	            if (_isArray6) {
	                if (_i6 >= _iterator6.length) break;
	                _ref7 = _iterator6[_i6++];
	            } else {
	                _i6 = _iterator6.next();
	                if (_i6.done) break;
	                _ref7 = _i6.value;
	            }

	            var key = _ref7;

	            el.style[key] = styles[key];
	        }

	        setTimeout(resolve, 1);
	    });
	}

	function setOverflow(el) {
	    var value = arguments.length <= 1 || arguments[1] === undefined ? 'auto' : arguments[1];
	    var _el$style = el.style;
	    var overflow = _el$style.overflow;
	    var overflowX = _el$style.overflowX;
	    var overflowY = _el$style.overflowY;


	    el.style.overflow = el.style.overflowX = el.overflowY = value;

	    return {
	        reset: function reset() {
	            el.style.overflow = overflow;
	            el.style.overflowX = overflowX;
	            el.style.overflowY = overflowY;
	        }
	    };
	}

	function dimensionsDiff(one, two, _ref8) {
	    var _ref8$width = _ref8.width;
	    var width = _ref8$width === undefined ? true : _ref8$width;
	    var _ref8$height = _ref8.height;
	    var height = _ref8$height === undefined ? true : _ref8$height;
	    var _ref8$threshold = _ref8.threshold;
	    var threshold = _ref8$threshold === undefined ? 0 : _ref8$threshold;


	    if (width && Math.abs(one.width - two.width) > threshold) {
	        return true;
	    }

	    if (height && Math.abs(one.height - two.height) > threshold) {
	        return true;
	    }

	    return false;
	}

	function trackDimensions(el, _ref9) {
	    var _ref9$width = _ref9.width;
	    var width = _ref9$width === undefined ? true : _ref9$width;
	    var _ref9$height = _ref9.height;
	    var height = _ref9$height === undefined ? true : _ref9$height;
	    var _ref9$threshold = _ref9.threshold;
	    var threshold = _ref9$threshold === undefined ? 0 : _ref9$threshold;


	    var currentDimensions = getCurrentDimensions(el);

	    return {
	        check: function check() {
	            var newDimensions = getCurrentDimensions(el);

	            return {
	                changed: dimensionsDiff(currentDimensions, newDimensions, { width: width, height: height, threshold: threshold }),
	                dimensions: newDimensions
	            };
	        },
	        reset: function reset() {
	            currentDimensions = getCurrentDimensions(el);
	        }
	    };
	}

	function onDimensionsChange(el, _ref10) {
	    var _ref10$width = _ref10.width;
	    var width = _ref10$width === undefined ? true : _ref10$width;
	    var _ref10$height = _ref10.height;
	    var height = _ref10$height === undefined ? true : _ref10$height;
	    var _ref10$delay = _ref10.delay;
	    var delay = _ref10$delay === undefined ? 50 : _ref10$delay;
	    var _ref10$threshold = _ref10.threshold;
	    var threshold = _ref10$threshold === undefined ? 0 : _ref10$threshold;


	    return new _promise.SyncPromise(function (resolve) {

	        var tracker = trackDimensions(el, { width: width, height: height, threshold: threshold });

	        var interval = void 0;

	        var resolver = (0, _fn.debounce)(function (dimensions) {
	            clearInterval(interval);
	            return resolve(dimensions);
	        }, delay * 4);

	        interval = setInterval(function () {
	            var _tracker$check = tracker.check();

	            var changed = _tracker$check.changed;
	            var dimensions = _tracker$check.dimensions;

	            if (changed) {
	                tracker.reset();
	                return resolver(dimensions);
	            }
	        }, delay);
	    });
	}

	function dimensionsMatchViewport(el, _ref11) {
	    var width = _ref11.width;
	    var height = _ref11.height;


	    var dimensions = getCurrentDimensions(el);

	    if (width && dimensions.width !== window.innerWidth) {
	        return false;
	    }

	    if (height && dimensions.height !== window.innerHeight) {
	        return false;
	    }

	    return true;
	}

	function bindEvents(element, eventNames, handler) {

	    handler = (0, _fn.once)(handler);

	    for (var _iterator7 = eventNames, _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator]();;) {
	        var _ref12;

	        if (_isArray7) {
	            if (_i7 >= _iterator7.length) break;
	            _ref12 = _iterator7[_i7++];
	        } else {
	            _i7 = _iterator7.next();
	            if (_i7.done) break;
	            _ref12 = _i7.value;
	        }

	        var eventName = _ref12;

	        element.addEventListener(eventName, handler);
	    }

	    return {
	        cancel: (0, _fn.once)(function () {
	            for (var _iterator8 = eventNames, _isArray8 = Array.isArray(_iterator8), _i8 = 0, _iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator]();;) {
	                var _ref13;

	                if (_isArray8) {
	                    if (_i8 >= _iterator8.length) break;
	                    _ref13 = _iterator8[_i8++];
	                } else {
	                    _i8 = _iterator8.next();
	                    if (_i8.done) break;
	                    _ref13 = _i8.value;
	                }

	                var eventName = _ref13;

	                element.removeEventListener(eventName, handler);
	            }
	        })
	    };
	}

	var VENDOR_PREFIXES = ['webkit', 'moz', 'ms', 'o'];

	function setVendorCSS(element, name, value) {

	    element.style[name] = value;

	    var capitalizedName = (0, _util.capitalizeFirstLetter)(name);

	    for (var _iterator9 = VENDOR_PREFIXES, _isArray9 = Array.isArray(_iterator9), _i9 = 0, _iterator9 = _isArray9 ? _iterator9 : _iterator9[Symbol.iterator]();;) {
	        var _ref14;

	        if (_isArray9) {
	            if (_i9 >= _iterator9.length) break;
	            _ref14 = _iterator9[_i9++];
	        } else {
	            _i9 = _iterator9.next();
	            if (_i9.done) break;
	            _ref14 = _i9.value;
	        }

	        var prefix = _ref14;

	        element.style['' + prefix + capitalizedName] = value;
	    }
	}

	var CSSRule = window.CSSRule;

	var KEYFRAMES_RULE = CSSRule.KEYFRAMES_RULE || CSSRule.WEBKIT_KEYFRAMES_RULE || CSSRule.MOZ_KEYFRAMES_RULE || CSSRule.O_KEYFRAMES_RULE || CSSRule.MS_KEYFRAMES_RULE;

	function isValidAnimation(element, name) {

	    var stylesheets = element.ownerDocument.styleSheets;

	    try {
	        for (var i = 0; i < stylesheets.length; i++) {

	            var cssRules = stylesheets[i].cssRules;

	            if (!cssRules) {
	                continue;
	            }

	            for (var j = 0; j < cssRules.length; j++) {

	                var cssRule = cssRules[j];

	                if (!cssRule) {
	                    continue;
	                }

	                if (cssRule.type === KEYFRAMES_RULE && cssRule.name === name) {
	                    return true;
	                }
	            }
	        }
	    } catch (err) {

	        return false;
	    }

	    return false;
	}

	var ANIMATION_START_EVENTS = ['animationstart', 'webkitAnimationStart', 'oAnimationStart', 'MSAnimationStart'];
	var ANIMATION_END_EVENTS = ['animationend', 'webkitAnimationEnd', 'oAnimationEnd', 'MSAnimationEnd'];

	function animate(element, name) {
	    var timeout = arguments.length <= 2 || arguments[2] === undefined ? 1000 : arguments[2];

	    return new _promise.SyncPromise(function (resolve, reject) {

	        element = getElement(element);

	        if (!element || !isValidAnimation(element, name)) {
	            return resolve();
	        }

	        var hasStarted = false;

	        var timer = void 0;

	        var startEvent = bindEvents(element, ANIMATION_START_EVENTS, function (event) {

	            if (event.target !== element || event.animationName !== name) {
	                return;
	            }

	            event.stopPropagation();

	            startEvent.cancel();
	            hasStarted = true;

	            timer = setTimeout(function () {
	                resolve();
	            }, timeout);
	        });

	        var endEvent = bindEvents(element, ANIMATION_END_EVENTS, function (event) {

	            if (event.target !== element || event.animationName !== name) {
	                return;
	            }

	            event.stopPropagation();

	            startEvent.cancel();
	            endEvent.cancel();

	            if (event.animationName !== name) {
	                return reject('Expected animation name to be ' + name + ', found ' + event.animationName);
	            }

	            clearTimeout(timer);

	            setVendorCSS(element, 'animationName', 'none');

	            return resolve();
	        });

	        setVendorCSS(element, 'animationName', name);

	        setTimeout(function () {
	            setTimeout(function () {
	                if (!hasStarted) {
	                    startEvent.cancel();
	                    endEvent.cancel();
	                    return resolve();
	                }
	            }, 200);
	        }, 200);
	    });
	}

	var STYLE = {

	    VISIBILITY: {
	        VISIBLE: 'visible',
	        HIDDEN: 'hidden'
	    },

	    DISPLAY: {
	        NONE: 'none',
	        BLOCK: 'block'
	    }
	};

	function showElement(element) {
	    element.style.display = STYLE.DISPLAY.BLOCK;
	    // element.style.visibility = STYLE.VISIBILITY.VISIBLE;
	    // element.style.opacity = '1';
	}

	function hideElement(element) {
	    element.style.display = STYLE.DISPLAY.NONE;
	    // element.style.visibility = STYLE.VISIBILITY.HIDDEN;
	    // element.style.opacity = '0';
	}

	function showAndAnimate(element, name) {
	    var animation = animate(element, name);
	    showElement(element);
	    return animation;
	}

	function animateAndHide(element, name) {
	    return animate(element, name).then(function () {
	        hideElement(element);
	    });
	}

	function addClass(element, name) {
	    if (element.classList) {
	        element.classList.add(name);
	    } else if (element.className.split(/\s+/).indexOf(name) === -1) {
	        element.className += ' ' + name;
	    }
	}

/***/ },
/* 48 */
/*!***********************!*\
  !*** ./src/lib/fn.js ***!
  \***********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.noop = noop;
	exports.once = once;
	exports.memoize = memoize;
	exports.debounce = debounce;

	var _util = __webpack_require__(/*! ./util */ 49);

	/*  Noop
	    ----

	    Do nothing, zilch, nada, zip
	*/

	function noop() {}
	// pass


	/*  Once
	    ----

	    Create a wrapper function which only allows the inner function to run once, otherwise is a noop
	*/

	function once(method) {
	    var called = false;

	    return function () {
	        if (!called) {
	            called = true;
	            return method.apply(this, arguments);
	        }
	    };
	}

	/*  Memoize
	    -------

	    Create a wrapper function which caches the result of the first call, then for subsequent calls returns the cached value
	*/

	function memoize(method) {

	    var results = {};

	    return function () {

	        var cacheKey = void 0;

	        try {
	            cacheKey = JSON.stringify(Array.prototype.slice.call(arguments), function (key, val) {

	                if (typeof val === 'function') {
	                    return 'xcomponent:memoize[' + (0, _util.getObjectID)(val) + ']';
	                }

	                return val;
	            });
	        } catch (err) {
	            throw new Error('Arguments not serializable -- can not be used to memoize');
	        }

	        if (!results.hasOwnProperty(cacheKey)) {
	            results[cacheKey] = method.apply(this, arguments);
	        }

	        return results[cacheKey];
	    };
	}

	function debounce(method) {
	    var time = arguments.length <= 1 || arguments[1] === undefined ? 100 : arguments[1];


	    var timeout = void 0;

	    return function () {
	        var _this = this,
	            _arguments = arguments;

	        clearTimeout(timeout);

	        timeout = setTimeout(function () {
	            return method.apply(_this, _arguments);
	        }, time);
	    };
	}

/***/ },
/* 49 */
/*!*************************!*\
  !*** ./src/lib/util.js ***!
  \*************************/
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.urlEncode = urlEncode;
	exports.camelToDasherize = camelToDasherize;
	exports.dasherizeToCamel = dasherizeToCamel;
	exports.extend = extend;
	exports.values = values;
	exports.uniqueID = uniqueID;
	exports.stringifyWithFunctions = stringifyWithFunctions;
	exports.safeGet = safeGet;
	exports.capitalizeFirstLetter = capitalizeFirstLetter;
	exports.get = get;
	exports.safeInterval = safeInterval;
	exports.safeTimeout = safeTimeout;
	exports.each = each;
	exports.replaceObject = replaceObject;
	exports.copyProp = copyProp;
	exports.dotify = dotify;
	exports.getObjectID = getObjectID;

	/*  Url Encode
	    ----------

	    Replace ? and & with encoded values. Allows other values (to create more readable urls than encodeUriComponent)
	*/

	function urlEncode(str) {
	    return str.replace(/\?/g, '%3F').replace(/\&/g, '%26').replace(/#/g, '%23');
	}

	/*  Camel To Dasherize
	    ------------------

	    Convert camelCaseText to dasherized-text
	*/

	function camelToDasherize(string) {
	    return string.replace(/([A-Z])/g, function (g) {
	        return '-' + g.toLowerCase();
	    });
	}

	/*  Dasherize to Camel
	    ------------------

	    Convert dasherized-text to camelCaseText
	*/

	function dasherizeToCamel(string) {
	    return string.replace(/-([a-z])/g, function (g) {
	        return g[1].toUpperCase();
	    });
	}

	/*  Extend
	    ------

	    Extend one object with another
	*/

	function extend(obj, source) {
	    if (!source) {
	        return obj;
	    }

	    for (var key in source) {
	        if (source.hasOwnProperty(key)) {
	            obj[key] = source[key];
	        }
	    }

	    return obj;
	}

	/*  Values
	    ------

	    Get all of the values from an object as an array
	*/

	function values(obj) {
	    var results = [];

	    for (var key in obj) {
	        if (obj.hasOwnProperty(key)) {
	            results.push(obj[key]);
	        }
	    }

	    return results;
	}

	/*  Unique ID
	    ---------

	    Generate a unique, random hex id
	*/

	function uniqueID() {

	    var chars = '0123456789abcdef';

	    return 'xxxxxxxxxx'.replace(/./g, function () {
	        return chars.charAt(Math.floor(Math.random() * chars.length));
	    });
	}

	/*  Stringify with Functions
	    ------------------------

	    JSON Stringify with added support for functions
	*/

	function stringifyWithFunctions(obj) {
	    return JSON.stringify(obj, function (key, val) {
	        if (typeof val === 'function') {
	            return val.toString();
	        }
	        return val;
	    });
	}

	/*  Safe Get
	    --------

	    Get a property without throwing error
	*/

	function safeGet(obj, prop) {

	    var result = void 0;

	    try {
	        result = obj[prop];
	    } catch (err) {
	        // pass
	    }

	    return result;
	}

	/* Capitalize First Letter
	   -----------------------
	*/

	function capitalizeFirstLetter(string) {
	    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
	}

	/*  Get
	    ---

	    Recursively gets a deep path from an object, returning a default value if any level is not found
	*/

	function get(item, path, def) {

	    if (!path) {
	        return def;
	    }

	    path = path.split('.');

	    // Loop through each section of our key path

	    for (var i = 0; i < path.length; i++) {

	        // If we have an object, we can get the key

	        if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && item !== null) {
	            item = item[path[i]];

	            // Otherwise, we should return the default (undefined if not provided)
	        } else {
	                return def;
	            }
	    }

	    // If our final result is undefined, we should return the default

	    return item === undefined ? def : item;
	}

	/*  Safe Interval
	    -------------

	    Implement setInterval using setTimeout, to avoid stacking up calls from setInterval
	*/

	function safeInterval(method, time) {

	    var timeout = void 0;

	    function runInterval() {
	        timeout = setTimeout(runInterval, time);
	        method.call();
	    }

	    timeout = setTimeout(runInterval, time);

	    return {
	        cancel: function cancel() {
	            clearTimeout(timeout);
	        }
	    };
	}

	/*  Safe Interval
	    -------------

	    Run timeouts at 100ms intervals so we can account for busy browsers
	*/

	function safeTimeout(method, time) {

	    var interval = safeInterval(function () {
	        time -= 100;
	        if (time <= 0) {
	            interval.cancel();
	            method();
	        }
	    }, 100);
	}

	function each(item, callback) {

	    if (!item) {
	        return;
	    }

	    if (item instanceof Array) {
	        var len = item.length;
	        for (var i = 0; i < len; i++) {
	            callback(item[i], i);
	        }
	    } else if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object') {
	        var keys = Object.keys(item);
	        var _len = keys.length;
	        for (var _i = 0; _i < _len; _i++) {
	            var key = keys[_i];
	            callback(item[key], key);
	        }
	    }
	}

	function replaceObject(obj, callback) {
	    var parentKey = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];


	    var newobj = obj instanceof Array ? [] : {};

	    each(obj, function (item, key) {

	        var fullKey = parentKey ? parentKey + '.' + key : key;

	        var result = callback(item, key, fullKey);

	        if (result !== undefined) {
	            newobj[key] = result;
	        } else if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && item !== null) {
	            newobj[key] = replaceObject(item, callback, fullKey);
	        } else {
	            newobj[key] = item;
	        }
	    });

	    return newobj;
	}

	function copyProp(source, target, name, def) {
	    if (source.hasOwnProperty(name)) {
	        var descriptor = Object.getOwnPropertyDescriptor(source, name);
	        Object.defineProperty(target, name, descriptor);
	    } else {
	        target[name] = def;
	    }
	}

	function dotify(obj) {
	    var prefix = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
	    var newobj = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	    prefix = prefix ? prefix + '.' : prefix;
	    for (var key in obj) {
	        if (obj[key] && _typeof(obj[key]) === 'object') {
	            newobj = dotify(obj[key], '' + prefix + key, newobj);
	        } else {
	            newobj['' + prefix + key] = obj[key];
	        }
	    }
	    return newobj;
	}

	function WeakMap() {
	    this.id = '__weakmap_' + uniqueID() + '__';
	}

	WeakMap.prototype = {
	    set: function set(item, value) {

	        if (item === null || item === undefined || (typeof item === 'undefined' ? 'undefined' : _typeof(item)) !== 'object' && typeof item !== 'function') {
	            throw new Error('Invalid key for WeakMap');
	        }

	        var entry = item[this.id];

	        if (entry && entry[0] === item) {
	            entry[1] = value;
	        } else {
	            Object.defineProperty(item, this.id, { value: [item, value], writable: true });
	        }
	    },
	    get: function get(item) {
	        var entry = item[this.id];

	        if (entry && entry[0] === item) {
	            return entry[1];
	        }
	    },
	    'delete': function _delete(item) {
	        var entry = item[this.id];

	        if (entry && entry[0] === item) {
	            entry[0] = entry[1] = undefined;
	        }
	    },
	    has: function has(item) {
	        var entry = item[this.id];

	        return entry && entry[0] === item;
	    }
	};

	var objectIDs = new WeakMap();

	function getObjectID(obj) {

	    if (obj === null || obj === undefined || (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' && typeof obj !== 'function') {
	        throw new Error('Invalid object');
	    }

	    var uid = objectIDs.get(obj);

	    if (!uid) {
	        uid = (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) + ':' + uniqueID();
	        objectIDs.set(obj, uid);
	    }

	    return uid;
	}

/***/ },
/* 50 */
/*!**********************!*\
  !*** ./src/error.js ***!
  \**********************/
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.PopupOpenError = PopupOpenError;
	exports.IntegrationError = IntegrationError;
	function PopupOpenError(message) {
	    this.message = message;
	}

	PopupOpenError.prototype = Object.create(Error.prototype);

	function IntegrationError(message) {
	    this.message = message;
	}

	IntegrationError.prototype = Object.create(Error.prototype);

/***/ },
/* 51 */
/*!****************************!*\
  !*** ./src/lib/promise.js ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.denodeify = denodeify;
	exports.promisify = promisify;
	exports.getter = getter;
	exports.delay = delay;
	exports.cycle = cycle;

	var _promise = __webpack_require__(/*! sync-browser-mocks/src/promise */ 13);

	/*  DeNodeify
	    ---------

	    Turns a method from a function which accepts a callback, into a function which returns a promise.
	*/

	function denodeify(method) {

	    return function () {

	        var self = this;
	        var args = Array.prototype.slice.call(arguments);

	        if (args.length >= method.length) {
	            return _promise.SyncPromise.resolve(method.apply(self, args));
	        }

	        return new _promise.SyncPromise(function (resolve, reject) {
	            args.push(function (err, result) {

	                if (err && !(err instanceof Error)) {
	                    throw new Error('Passed non-Error object in callback: [ ' + err + ' ] -- callbacks should either be called with callback(new Error(...)) or callback(null, result).');
	                }

	                return err ? reject(err) : resolve(result);
	            });
	            return method.apply(self, args);
	        });
	    };
	}

	function promisify(method) {
	    var prom = _promise.SyncPromise.resolve();

	    return function () {
	        var _this = this,
	            _arguments = arguments;

	        return prom.then(function () {
	            return method.apply(_this, _arguments);
	        });
	    };
	}

	function getter(method) {

	    return function () {
	        var _this2 = this;

	        return new _promise.SyncPromise(function (resolve, reject) {
	            var result = method.call(_this2, resolve, reject);

	            if (result && result.then instanceof Function) {
	                return result.then(resolve, reject);
	            }

	            if (method.length === 0 || result !== undefined) {
	                return resolve(result);
	            }
	        });
	    };
	}

	function delay(time) {
	    return new _promise.SyncPromise(function (resolve) {
	        setTimeout(resolve, time);
	    });
	}

	function cycle(method) {
	    return _promise.SyncPromise['try'](method).then(function () {
	        return cycle(method);
	    });
	}

/***/ },
/* 52 */
/*!************************!*\
  !*** ./src/lib/css.js ***!
  \************************/
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.isPerc = isPerc;
	exports.isPx = isPx;
	exports.isCSS = isCSS;
	exports.isNum = isNum;
	exports.toNum = toNum;
	exports.toPx = toPx;
	exports.toPerc = toPerc;
	exports.toCSS = toCSS;
	exports.mathCSS = mathCSS;
	function isPerc(str) {
	    return typeof str === 'string' && /^[0-9]+%$/.test(str);
	}

	function isPx(str) {
	    return typeof str === 'string' && /^[0-9]+px$/.test(str);
	}

	function isCSS(str) {
	    return isPerc(str) || isPx(str);
	}

	function isNum(num) {
	    return typeof num === 'number';
	}

	function toNum(str) {
	    return isNum(str) ? str : parseInt(str.match(/^([0-9]+)(px|%)$/)[1], 10);
	}

	function toPx(num) {
	    return toNum(num) + 'px';
	}

	function toPerc(num) {
	    return toNum(num) + '%';
	}

	function toCSS(num) {
	    return isPerc(num) ? num : toPx(num);
	}

	function mathCSS(num, action) {
	    return isPerc(num) ? toPerc(action(toNum(num))) : toPx(Math.floor(action(toNum(num))));
	}

/***/ },
/* 53 */
/*!**************************************!*\
  !*** ./src/component/child/index.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ChildComponent = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _client = __webpack_require__(/*! beaver-logger/client */ 35);

	var _client2 = _interopRequireDefault(_client);

	var _src = __webpack_require__(/*! post-robot/src */ 3);

	var _src2 = _interopRequireDefault(_src);

	var _promise = __webpack_require__(/*! sync-browser-mocks/src/promise */ 13);

	var _base = __webpack_require__(/*! ../base */ 45);

	var _window = __webpack_require__(/*! ../window */ 54);

	var _lib = __webpack_require__(/*! ../../lib */ 46);

	var _constants = __webpack_require__(/*! ../../constants */ 56);

	var _props = __webpack_require__(/*! ./props */ 57);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ChildComponent).call(this, component));

	        _this.component = component;

	        _this.sendLogsToOpener();

	        _this.component.log('construct_child');

	        // The child can specify some default props if none are passed from the parent. This often makes integrations
	        // a little more seamless, as applicaiton code can call props.foo() without worrying about whether the parent
	        // has provided them or not, and fall-back to some default behavior.

	        _this.onPropHandlers = [];

	        _this.setProps(_this.getInitialProps(), (0, _window.getParentDomain)());

	        _this.component.log('init_child');

	        _this.setWindows();

	        // Send an init message to our parent. This gives us an initial set of data to use that we can use to function.
	        //
	        // For example:
	        //
	        // - What context are we
	        // - What props has the parent specified

	        _this.onInit = _this.sendToParent(_constants.POST_MESSAGE.INIT, {

	            exports: _this.exports()

	        }).then(function (_ref) {
	            var origin = _ref.origin;
	            var data = _ref.data;


	            _this.context = data.context;

	            window.xprops = _this.props = {};
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
	        key: 'init',
	        value: function init() {
	            return this.onInit;
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
	            var componentMeta = (0, _window.getComponentMeta)();
	            var self = this;

	            if (componentMeta) {
	                var props = componentMeta.props;

	                if (props.type === _constants.INITIAL_PROPS.RAW) {
	                    props = props.value;
	                } else if (props.type === _constants.INITIAL_PROPS.UID) {
	                    props = (0, _window.getParentComponentWindow)().__xcomponent__.props[componentMeta.uid];
	                } else {
	                    throw new Error('Unrecognized props type: ' + props.type);
	                }

	                if (!props) {
	                    throw new Error('Initial props not found');
	                }

	                return (0, _lib.replaceObject)(props, function (value, key, fullKey) {
	                    if (value && value.__type__ === '__function__') {
	                        return function () {
	                            var _this2 = this,
	                                _arguments = arguments;

	                            return self.onInit.then(function () {
	                                var original = (0, _lib.get)(self.props, fullKey);
	                                return original.apply(_this2, _arguments);
	                            });
	                        };
	                    }
	                });
	            }
	        }
	    }, {
	        key: 'setProps',
	        value: function setProps() {
	            var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	            var origin = arguments[1];
	            var required = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

	            window.xprops = this.props = this.props || {};
	            (0, _lib.extend)(this.props, (0, _props.normalizeChildProps)(this.component, props, origin, required));
	            for (var _iterator = this.onPropHandlers, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	                var _ref2;

	                if (_isArray) {
	                    if (_i >= _iterator.length) break;
	                    _ref2 = _iterator[_i++];
	                } else {
	                    _i = _iterator.next();
	                    if (_i.done) break;
	                    _ref2 = _i.value;
	                }

	                var handler = _ref2;

	                handler.call(this, this.props);
	            }
	        }

	        /*  Send to Parent
	            --------------
	             Send a post message to our parent window.
	        */

	    }, {
	        key: 'sendToParent',
	        value: function sendToParent(name, data) {
	            var parentWindow = (0, _window.getParentComponentWindow)();

	            if (!parentWindow) {
	                throw new Error('Can not find parent component window to message');
	            }

	            this.component.log('send_to_parent_' + name);

	            return _src2['default'].send((0, _window.getParentComponentWindow)(), name, data, { domain: (0, _window.getParentDomain)() });
	        }

	        /*  Set Windows
	            -----------
	             Determine the parent window, and the parent component window. Note -- these may be different, if we were
	            rendered using renderToParent.
	        */

	    }, {
	        key: 'setWindows',
	        value: function setWindows() {

	            // Ensure we do not try to .attach() multiple times for the same component on the same page

	            if (window.__activeXComponent__) {
	                throw new Error('[' + this.component.tag + '] Can not attach multiple components to the same window');
	            }

	            window.__activeXComponent__ = this;

	            // Get the direct parent window

	            if (!(0, _window.getParentComponentWindow)()) {
	                throw new Error('[' + this.component.tag + '] Can not find parent window');
	            }

	            var componentMeta = (0, _window.getComponentMeta)();

	            if (componentMeta.tag !== this.component.tag) {
	                throw new Error('[' + this.component.tag + '] Parent is ' + componentMeta.tag + ' - can not attach ' + this.component.tag);
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
	        key: 'sendLogsToOpener',
	        value: function sendLogsToOpener() {
	            try {
	                var opener = _src2['default'].winutil.getOpener(window);

	                if (!opener || !window.console) {
	                    return;
	                }

	                var _loop = function _loop() {
	                    if (_isArray2) {
	                        if (_i2 >= _iterator2.length) return 'break';
	                        _ref3 = _iterator2[_i2++];
	                    } else {
	                        _i2 = _iterator2.next();
	                        if (_i2.done) return 'break';
	                        _ref3 = _i2.value;
	                    }

	                    var frame = _ref3;


	                    if (!_src2['default'].winutil.isSameDomain(frame) || !frame.console || frame === window) {
	                        return 'continue';
	                    }

	                    var _arr = ['log', 'debug', 'info', 'warn', 'error'];

	                    var _loop3 = function _loop3() {
	                        var level = _arr[_i3];
	                        var original = window.console[level];

	                        if (!original) {
	                            return 'continue';
	                        }

	                        try {

	                            window.console[level] = function () {

	                                try {
	                                    return frame.console[level].apply(frame, arguments);
	                                } catch (err3) {
	                                    // pass
	                                }

	                                return original.apply(this, arguments);
	                            };
	                        } catch (err2) {
	                            // pass
	                        }
	                    };

	                    for (var _i3 = 0; _i3 < _arr.length; _i3++) {
	                        var _ret2 = _loop3();

	                        if (_ret2 === 'continue') continue;
	                    }

	                    return {
	                        v: void 0
	                    };
	                };

	                _loop2: for (var _iterator2 = _src2['default'].winutil.getAllFramesInWindow(opener), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
	                    var _ref3;

	                    var _ret = _loop();

	                    switch (_ret) {
	                        case 'break':
	                            break _loop2;

	                        case 'continue':
	                            continue;

	                        default:
	                            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	                    }
	                }
	            } catch (err) {
	                // pass
	            }
	        }

	        /*  Watch For Close
	            ---------------
	             Watch both the parent window and the parent component window, if they close, close this window too.
	        */

	    }, {
	        key: 'watchForClose',
	        value: function watchForClose() {
	            var _this3 = this;

	            (0, _lib.onCloseWindow)((0, _window.getParentComponentWindow)(), function () {

	                _this3.component.log('parent_window_closed');

	                // We only need to close ourselves if we're a popup -- otherwise our parent window closing will automatically
	                // close us, if we're an iframe

	                if (_this3.context === _constants.CONTEXT_TYPES.POPUP) {
	                    return _this3.destroy();
	                }
	            });
	        }
	    }, {
	        key: 'autoResize',
	        value: function autoResize() {

	            var width = false;
	            var height = false;

	            var autoResize = this.component.autoResize;

	            if ((typeof autoResize === 'undefined' ? 'undefined' : _typeof(autoResize)) === 'object') {
	                width = Boolean(autoResize.width);
	                height = Boolean(autoResize.height);
	            } else if (autoResize) {
	                width = true;
	                height = true;
	            }

	            return { width: width, height: height };
	        }
	    }, {
	        key: 'watchForResize',
	        value: function watchForResize() {
	            var _this4 = this;

	            var _autoResize = this.autoResize();

	            var width = _autoResize.width;
	            var height = _autoResize.height;


	            if (!width && !height) {
	                return;
	            }

	            if (!this.component.dimensions) {
	                return;
	            }

	            if (this.context === _constants.CONTEXT_TYPES.POPUP) {
	                return;
	            }

	            var el = document.documentElement;

	            // Believe me, I struggled. There's no other way.
	            if (window.navigator.userAgent.match(/MSIE (9|10)\./)) {
	                el = document.body;
	            }

	            return _promise.SyncPromise['try'](function () {

	                if (!(0, _lib.dimensionsMatchViewport)(el, { width: width, height: height })) {
	                    return _this4.resizeToElement(el, { width: width, height: height });
	                }
	            }).then(function () {

	                return (0, _lib.cycle)(function () {
	                    return (0, _lib.onDimensionsChange)(el, { width: width, height: height }).then(function (dimensions) {
	                        return _this4.resizeToElement(el, { width: width, height: height });
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
	                    return self.setProps(props, this.origin, false);
	                },
	                close: function close() {
	                    return self.destroy();
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
	            var _this5 = this;

	            return _promise.SyncPromise.resolve().then(function () {

	                _this5.component.log('resize', { width: width, height: height });

	                if (_this5.context === _constants.CONTEXT_TYPES.POPUP) {
	                    return; // window.resizeTo(width, height);
	                }

	                return _this5.sendToParent(_constants.POST_MESSAGE.RESIZE, { width: width, height: height });
	            });
	        }
	    }, {
	        key: 'resizeToElement',
	        value: function resizeToElement(el, _ref4) {
	            var _this6 = this;

	            var width = _ref4.width;
	            var height = _ref4.height;


	            var history = [];

	            var resize = function resize() {
	                return _promise.SyncPromise['try'](function () {

	                    var tracker = (0, _lib.trackDimensions)(el, { width: width, height: height });

	                    var _tracker$check = tracker.check();

	                    var dimensions = _tracker$check.dimensions;


	                    for (var _iterator3 = history, _isArray3 = Array.isArray(_iterator3), _i4 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
	                        var _ref5;

	                        if (_isArray3) {
	                            if (_i4 >= _iterator3.length) break;
	                            _ref5 = _iterator3[_i4++];
	                        } else {
	                            _i4 = _iterator3.next();
	                            if (_i4.done) break;
	                            _ref5 = _i4.value;
	                        }

	                        var size = _ref5;


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
	        }

	        /*  Hide
	            ----
	             Hide the window and any parent template
	        */

	    }, {
	        key: 'hide',
	        value: function hide() {
	            return this.sendToParent(_constants.POST_MESSAGE.HIDE);
	        }
	    }, {
	        key: 'show',
	        value: function show() {
	            return this.sendToParent(_constants.POST_MESSAGE.SHOW);
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
	            var reason = arguments.length <= 0 || arguments[0] === undefined ? _constants.CLOSE_REASONS.CHILD_CALL : arguments[0];


	            this.component.log('close_child');

	            // Ask our parent window to close us

	            this.sendToParent(_constants.POST_MESSAGE.CLOSE, { reason: reason }, {
	                fireAndForget: true
	            });
	        }
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            _client2['default'].flush().then(function () {
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

	            this.component.logError('error', { error: err.stack || err.toString() });

	            return this.sendToParent(_constants.POST_MESSAGE.ERROR, {
	                error: err.stack || err.toString()
	            });
	        }
	    }]);

	    return ChildComponent;
	}(_base.BaseComponent);

/***/ },
/* 54 */
/*!*********************************!*\
  !*** ./src/component/window.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getParentRenderWindow = exports.getParentComponentWindow = exports.isXComponentWindow = exports.getComponentMeta = undefined;

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	exports.buildChildWindowName = buildChildWindowName;
	exports.getParentDomain = getParentDomain;
	exports.getPosition = getPosition;

	var _src = __webpack_require__(/*! post-robot/src */ 3);

	var _src2 = _interopRequireDefault(_src);

	var _hiBase = __webpack_require__(/*! hi-base32 */ 55);

	var _hiBase2 = _interopRequireDefault(_hiBase);

	var _lib = __webpack_require__(/*! ../lib */ 46);

	var _constants = __webpack_require__(/*! ../constants */ 56);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function normalize(str) {
	    return str && str.replace(/^[^a-z0-9A-Z]+|[^a-z0-9A-Z]+$/g, '').replace(/[^a-z0-9A-Z]+/g, '_');
	}

	/*  Build Child Window Name
	    -----------------------

	    Build a name for our child window. This should identify the following things to the child:

	    - That the window was created by, and is owned by xcomponent
	    - The name of the child's parent. This is so the child can identify which window created it, even when we do a
	      renderToParent, in which case the true parent may actually be a sibling frame in the window hierarchy

	    We base64 encode the window name so IE doesn't die when it encounters any characters that it doesn't like.
	*/

	function buildChildWindowName(name, version) {
	    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];


	    options.id = (0, _lib.uniqueID)();
	    options.domain = (0, _lib.getDomain)(window);

	    var encodedName = normalize(name);
	    var encodedVersion = normalize(version);
	    var encodedOptions = _hiBase2['default'].encode(JSON.stringify(options)).replace(/\=/g, '').toLowerCase();

	    if (!encodedName) {
	        throw new Error('Invalid name: ' + name + ' - must contain alphanumeric characters');
	    }

	    if (!encodedVersion) {
	        throw new Error('Invalid version: ' + version + ' - must contain alphanumeric characters');
	    }

	    return [_constants.XCOMPONENT, encodedName, encodedVersion, encodedOptions].join('__');
	}

	/*  Parse Window Name
	    -----------------

	    The inverse of buildChildWindowName. Base64 decodes and json parses the window name to get the original props
	    passed down, including the parent name. Only accepts window names built by xcomponent
	*/

	var getComponentMeta = exports.getComponentMeta = (0, _lib.memoize)(function () {

	    if (!window.name) {
	        return;
	    }

	    var _window$name$split = window.name.split('__');

	    var _window$name$split2 = _slicedToArray(_window$name$split, 4);

	    var xcomp = _window$name$split2[0];
	    var name = _window$name$split2[1];
	    var version = _window$name$split2[2];
	    var encodedOptions = _window$name$split2[3];


	    if (xcomp !== _constants.XCOMPONENT) {
	        return;
	    }

	    var componentMeta = void 0;

	    try {
	        componentMeta = JSON.parse(_hiBase2['default'].decode(encodedOptions.toUpperCase()));
	    } catch (err) {
	        return;
	    }

	    componentMeta.name = name;
	    componentMeta.version = version.replace(/_/g, '.');

	    return componentMeta;
	});

	function getParentDomain() {
	    return getComponentMeta().domain; // How does this work for renderToParent..?
	}

	var isXComponentWindow = exports.isXComponentWindow = (0, _lib.memoize)(function () {
	    return Boolean(getComponentMeta());
	});

	/*  Get Parent Component Window
	    ---------------------------

	    Get the parent component window, which may be different from the actual parent window
	*/

	var getParentComponentWindow = exports.getParentComponentWindow = (0, _lib.memoize)(function () {

	    var componentMeta = getComponentMeta();

	    if (!componentMeta) {
	        throw new Error('Can not get parent component window - window not rendered by xcomponent');
	    }

	    var parentWindow = _src2['default'].winutil.getAncestor(window);

	    if (!parentWindow) {
	        throw new Error('Can not find parent window');
	    }

	    if (componentMeta.parent === _constants.WINDOW_REFERENCES.DIRECT_PARENT) {
	        return parentWindow;
	    } else if (componentMeta.parent === _constants.WINDOW_REFERENCES.PARENT_PARENT) {
	        parentWindow = _src2['default'].winutil.getAncestor(parentWindow);

	        if (!parentWindow) {
	            throw new Error('Can not find parent component window');
	        }

	        return parentWindow;
	    }

	    var parentFrame = _src2['default'].winutil.findFrameByName(parentWindow, componentMeta.parent);

	    if (!parentFrame) {
	        throw new Error('Can not find frame with name: ' + componentMeta.parent);
	    }

	    return parentFrame;
	});

	var getParentRenderWindow = exports.getParentRenderWindow = (0, _lib.memoize)(function () {

	    var componentMeta = getComponentMeta();

	    if (!componentMeta) {
	        throw new Error('Can not get parent component window - window not rendered by xcomponent');
	    }

	    var parentWindow = _src2['default'].winutil.getAncestor(window);

	    if (!parentWindow) {
	        throw new Error('Can not find parent window');
	    }

	    if (componentMeta.renderParent === _constants.WINDOW_REFERENCES.DIRECT_PARENT) {
	        return parentWindow;
	    } else if (componentMeta.renderParent === _constants.WINDOW_REFERENCES.PARENT_PARENT) {
	        parentWindow = _src2['default'].winutil.getAncestor(parentWindow);

	        if (!parentWindow) {
	            throw new Error('Can not find parent render window');
	        }

	        return parentWindow;
	    } else if (componentMeta.renderParent === _constants.WINDOW_REFERENCES.PARENT_UID) {

	        parentWindow = getParentComponentWindow()[_constants.__XCOMPONENT__].windows[componentMeta.uid];

	        if (!parentWindow) {
	            throw new Error('Can not find parent render window');
	        }

	        return parentWindow;
	    }

	    throw new Error('Unrecognized renderParent reference: ' + componentMeta.renderParent);
	});

	/*  Get Position
	    ------------

	    Calculate the position for the popup / lightbox

	    This is either
	    - Specified by the user
	    - The center of the screen

	    I'd love to do this with pure css, but alas... popup windows :(
	*/

	function getPosition(options) {

	    var left = void 0;
	    var top = void 0;
	    var width = options.width;
	    var height = options.height;

	    if (window.outerWidth) {
	        left = Math.round((window.outerWidth - width) / 2) + window.screenX;
	        top = Math.round((window.outerHeight - height) / 2) + window.screenY;
	    } else if (window.screen.width) {
	        left = Math.round((window.screen.width - width) / 2);
	        top = Math.round((window.screen.height - height) / 2);
	    }

	    return {
	        x: left,
	        y: top
	    };
	}

/***/ },
/* 55 */
/*!***********************************!*\
  !*** ./~/hi-base32/src/base32.js ***!
  \***********************************/
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	/*
	 * hi-base32 v0.1.1
	 * https://github.com/emn178/hi-base32
	 *
	 * Copyright 2015, emn178@gmail.com
	 *
	 * Licensed under the MIT license:
	 * http://www.opensource.org/licenses/MIT
	 */
	;(function (root, undefined) {
	  'use strict';

	  var NODE_JS = typeof module != 'undefined';
	  if (NODE_JS) {
	    root = global;
	  }

	  var BASE32_ENCODE_CHAR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'.split('');
	  var BASE32_DECODE_CHAR = {
	    'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'H': 7, 'I': 8,
	    'J': 9, 'K': 10, 'L': 11, 'M': 12, 'N': 13, 'O': 14, 'P': 15, 'Q': 16,
	    'R': 17, 'S': 18, 'T': 19, 'U': 20, 'V': 21, 'W': 22, 'X': 23, 'Y': 24,
	    'Z': 25, '2': 26, '3': 27, '4': 28, '5': 29, '6': 30, '7': 31
	  };

	  var blocks = [0, 0, 0, 0, 0, 0, 0, 0];

	  var toUtf8String = function toUtf8String(bytes) {
	    var str = '',
	        length = bytes.length,
	        i = 0,
	        followingChars = 0,
	        b,
	        c;
	    while (i < length) {
	      b = bytes[i++];
	      if (b <= 0x7F) {
	        str += String.fromCharCode(b);
	        continue;
	      } else if (b > 0xBF && b <= 0xDF) {
	        c = b & 0x1F;
	        followingChars = 1;
	      } else if (b <= 0xEF) {
	        c = b & 0x0F;
	        followingChars = 2;
	      } else if (b <= 0xF7) {
	        c = b & 0x07;
	        followingChars = 3;
	      } else {
	        throw 'not a UTF-8 string';
	      }

	      for (var j = 0; j < followingChars; ++j) {
	        b = bytes[i++];
	        if (b < 0x80 || b > 0xBF) {
	          throw 'not a UTF-8 string';
	        }
	        c <<= 6;
	        c += b & 0x3F;
	      }
	      if (c >= 0xD800 && c <= 0xDFFF) {
	        throw 'not a UTF-8 string';
	      }
	      if (c > 0x10FFFF) {
	        throw 'not a UTF-8 string';
	      }

	      if (c <= 0xFFFF) {
	        str += String.fromCharCode(c);
	      } else {
	        c -= 0x10000;
	        str += String.fromCharCode((c >> 10) + 0xD800);
	        str += String.fromCharCode((c & 0x3FF) + 0xDC00);
	      }
	    }
	    return str;
	  };

	  var decodeAsBytes = function decodeAsBytes(base32Str) {
	    base32Str = base32Str.replace(/=/g, '');
	    var v1,
	        v2,
	        v3,
	        v4,
	        v5,
	        v6,
	        v7,
	        v8,
	        bytes = [],
	        index = 0,
	        length = base32Str.length;

	    // 4 char to 3 bytes
	    for (var i = 0, count = length >> 3 << 3; i < count;) {
	      v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      v6 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      v7 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      v8 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      bytes[index++] = (v1 << 3 | v2 >>> 2) & 255;
	      bytes[index++] = (v2 << 6 | v3 << 1 | v4 >>> 4) & 255;
	      bytes[index++] = (v4 << 4 | v5 >>> 1) & 255;
	      bytes[index++] = (v5 << 7 | v6 << 2 | v7 >>> 3) & 255;
	      bytes[index++] = (v7 << 5 | v8) & 255;
	    }

	    // remain bytes
	    var remain = length - count;
	    if (remain == 2) {
	      v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      bytes[index++] = (v1 << 3 | v2 >>> 2) & 255;
	    } else if (remain == 4) {
	      v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      bytes[index++] = (v1 << 3 | v2 >>> 2) & 255;
	      bytes[index++] = (v2 << 6 | v3 << 1 | v4 >>> 4) & 255;
	    } else if (remain == 5) {
	      v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      bytes[index++] = (v1 << 3 | v2 >>> 2) & 255;
	      bytes[index++] = (v2 << 6 | v3 << 1 | v4 >>> 4) & 255;
	      bytes[index++] = (v4 << 4 | v5 >>> 1) & 255;
	    } else if (remain == 7) {
	      v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      v6 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      v7 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      bytes[index++] = (v1 << 3 | v2 >>> 2) & 255;
	      bytes[index++] = (v2 << 6 | v3 << 1 | v4 >>> 4) & 255;
	      bytes[index++] = (v4 << 4 | v5 >>> 1) & 255;
	      bytes[index++] = (v5 << 7 | v6 << 2 | v7 >>> 3) & 255;
	    }
	    return bytes;
	  };

	  var encodeAscii = function encodeAscii(str) {
	    var v1,
	        v2,
	        v3,
	        v4,
	        v5,
	        base32Str = '',
	        length = str.length;
	    for (var i = 0, count = parseInt(length / 5) * 5; i < count;) {
	      v1 = str.charCodeAt(i++);
	      v2 = str.charCodeAt(i++);
	      v3 = str.charCodeAt(i++);
	      v4 = str.charCodeAt(i++);
	      v5 = str.charCodeAt(i++);
	      base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] + BASE32_ENCODE_CHAR[(v3 << 1 | v4 >>> 7) & 31] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[(v4 << 3 | v5 >>> 5) & 31] + BASE32_ENCODE_CHAR[v5 & 31];
	    }

	    // remain char
	    var remain = length - count;
	    if (remain == 1) {
	      v1 = str.charCodeAt(i);
	      base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[v1 << 2 & 31] + '======';
	    } else if (remain == 2) {
	      v1 = str.charCodeAt(i++);
	      v2 = str.charCodeAt(i);
	      base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[v2 << 4 & 31] + '====';
	    } else if (remain == 3) {
	      v1 = str.charCodeAt(i++);
	      v2 = str.charCodeAt(i++);
	      v3 = str.charCodeAt(i);
	      base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] + BASE32_ENCODE_CHAR[v3 << 1 & 31] + '===';
	    } else if (remain == 4) {
	      v1 = str.charCodeAt(i++);
	      v2 = str.charCodeAt(i++);
	      v3 = str.charCodeAt(i++);
	      v4 = str.charCodeAt(i);
	      base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] + BASE32_ENCODE_CHAR[(v3 << 1 | v4 >>> 7) & 31] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[v4 << 3 & 31] + '=';
	    }
	    return base32Str;
	  };

	  var encodeUtf8 = function encodeUtf8(str) {
	    var v1,
	        v2,
	        v3,
	        v4,
	        v5,
	        code,
	        end = false,
	        base32Str = '',
	        index = 0,
	        i,
	        start = 0,
	        bytes = 0,
	        length = str.length;
	    do {
	      blocks[0] = blocks[5];
	      blocks[1] = blocks[6];
	      blocks[2] = blocks[7];
	      for (i = start; index < length && i < 5; ++index) {
	        code = str.charCodeAt(index);
	        if (code < 0x80) {
	          blocks[i++] = code;
	        } else if (code < 0x800) {
	          blocks[i++] = 0xc0 | code >> 6;
	          blocks[i++] = 0x80 | code & 0x3f;
	        } else if (code < 0xd800 || code >= 0xe000) {
	          blocks[i++] = 0xe0 | code >> 12;
	          blocks[i++] = 0x80 | code >> 6 & 0x3f;
	          blocks[i++] = 0x80 | code & 0x3f;
	        } else {
	          code = 0x10000 + ((code & 0x3ff) << 10 | str.charCodeAt(++index) & 0x3ff);
	          blocks[i++] = 0xf0 | code >> 18;
	          blocks[i++] = 0x80 | code >> 12 & 0x3f;
	          blocks[i++] = 0x80 | code >> 6 & 0x3f;
	          blocks[i++] = 0x80 | code & 0x3f;
	        }
	      }
	      bytes += i - start;
	      start = i - 5;
	      if (index == length) {
	        ++index;
	      }
	      if (index > length && i < 6) {
	        end = true;
	      }
	      v1 = blocks[0];
	      if (i > 4) {
	        v2 = blocks[1];
	        v3 = blocks[2];
	        v4 = blocks[3];
	        v5 = blocks[4];
	        base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] + BASE32_ENCODE_CHAR[(v3 << 1 | v4 >>> 7) & 31] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[(v4 << 3 | v5 >>> 5) & 31] + BASE32_ENCODE_CHAR[v5 & 31];
	      } else if (i == 1) {
	        base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[v1 << 2 & 31] + '======';
	      } else if (i == 2) {
	        v2 = blocks[1];
	        base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[v2 << 4 & 31] + '====';
	      } else if (i == 3) {
	        v2 = blocks[1];
	        v3 = blocks[2];
	        base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] + BASE32_ENCODE_CHAR[v3 << 1 & 31] + '===';
	      } else if (i == 4) {
	        v2 = blocks[1];
	        v3 = blocks[2];
	        v4 = blocks[3];
	        base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] + BASE32_ENCODE_CHAR[(v3 << 1 | v4 >>> 7) & 31] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[v4 << 3 & 31] + '=';
	      }
	    } while (!end);
	    return base32Str;
	  };

	  var encodeBytes = function encodeBytes(bytes) {
	    var v1,
	        v2,
	        v3,
	        v4,
	        v5,
	        base32Str = '',
	        length = bytes.length;
	    for (var i = 0, count = parseInt(length / 5) * 5; i < count;) {
	      v1 = bytes[i++];
	      v2 = bytes[i++];
	      v3 = bytes[i++];
	      v4 = bytes[i++];
	      v5 = bytes[i++];
	      base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] + BASE32_ENCODE_CHAR[(v3 << 1 | v4 >>> 7) & 31] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[(v4 << 3 | v5 >>> 5) & 31] + BASE32_ENCODE_CHAR[v5 & 31];
	    }

	    // remain char
	    var remain = length - count;
	    if (remain == 1) {
	      v1 = bytes[i];
	      base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[v1 << 2 & 31] + '======';
	    } else if (remain == 2) {
	      v1 = bytes[i++];
	      v2 = bytes[i];
	      base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[v2 << 4 & 31] + '====';
	    } else if (remain == 3) {
	      v1 = bytes[i++];
	      v2 = bytes[i++];
	      v3 = bytes[i];
	      base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] + BASE32_ENCODE_CHAR[v3 << 1 & 31] + '===';
	    } else if (remain == 4) {
	      v1 = bytes[i++];
	      v2 = bytes[i++];
	      v3 = bytes[i++];
	      v4 = bytes[i];
	      base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] + BASE32_ENCODE_CHAR[(v3 << 1 | v4 >>> 7) & 31] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[v4 << 3 & 31] + '=';
	    }
	    return base32Str;
	  };

	  var encode = function encode(input, asciiOnly) {
	    var notString = typeof input != 'string';
	    if (notString && input.constructor == ArrayBuffer) {
	      input = new Uint8Array(input);
	    }
	    if (notString) {
	      return encodeBytes(input);
	    } else if (asciiOnly) {
	      return encodeAscii(input);
	    } else {
	      return encodeUtf8(input);
	    }
	  };

	  var decode = function decode(base32Str, asciiOnly) {
	    if (!asciiOnly) {
	      return toUtf8String(decodeAsBytes(base32Str));
	    }
	    var v1,
	        v2,
	        v3,
	        v4,
	        v5,
	        v6,
	        v7,
	        v8,
	        str = '',
	        length = base32Str.indexOf('=');
	    if (length == -1) {
	      length = base32Str.length;
	    }

	    // 8 char to 5 bytes
	    for (var i = 0, count = length >> 3 << 3; i < count;) {
	      v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      v6 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      v7 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      v8 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      str += String.fromCharCode((v1 << 3 | v2 >>> 2) & 255) + String.fromCharCode((v2 << 6 | v3 << 1 | v4 >>> 4) & 255) + String.fromCharCode((v4 << 4 | v5 >>> 1) & 255) + String.fromCharCode((v5 << 7 | v6 << 2 | v7 >>> 3) & 255) + String.fromCharCode((v7 << 5 | v8) & 255);
	    }

	    // remain bytes
	    var remain = length - count;
	    if (remain == 2) {
	      v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      str += String.fromCharCode((v1 << 3 | v2 >>> 2) & 255);
	    } else if (remain == 4) {
	      v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      str += String.fromCharCode((v1 << 3 | v2 >>> 2) & 255) + String.fromCharCode((v2 << 6 | v3 << 1 | v4 >>> 4) & 255);
	    } else if (remain == 5) {
	      v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      str += String.fromCharCode((v1 << 3 | v2 >>> 2) & 255) + String.fromCharCode((v2 << 6 | v3 << 1 | v4 >>> 4) & 255) + String.fromCharCode((v4 << 4 | v5 >>> 1) & 255);
	    } else if (remain == 7) {
	      v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      v6 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      v7 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
	      str += String.fromCharCode((v1 << 3 | v2 >>> 2) & 255) + String.fromCharCode((v2 << 6 | v3 << 1 | v4 >>> 4) & 255) + String.fromCharCode((v4 << 4 | v5 >>> 1) & 255) + String.fromCharCode((v5 << 7 | v6 << 2 | v7 >>> 3) & 255);
	    }
	    return str;
	  };

	  decode.asBytes = decodeAsBytes;
	  var exports = {
	    encode: encode,
	    decode: decode
	  };
	  if (root.HI_BASE32_TEST) {
	    exports.toUtf8String = toUtf8String;
	  }

	  if (!root.HI_BASE32_TEST && NODE_JS) {
	    module.exports = exports;
	  } else if (root) {
	    root.base32 = exports;
	  }
	})(undefined);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 56 */
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DELEGATE = exports.CONTEXT_TYPES_LIST = exports.CLOSE_REASONS = exports.EVENT_NAMES = exports.ANIMATION_NAMES = exports.CLASS_NAMES = exports.CONTEXT_TYPES = exports.PROP_TYPES_LIST = exports.WINDOW_REFERENCES = exports.INITIAL_PROPS = exports.PROP_TYPES = exports.POST_MESSAGE = exports.__XCOMPONENT__ = exports.XCOMPONENT = undefined;

	var _lib = __webpack_require__(/*! ./lib */ 46);

	var XCOMPONENT = exports.XCOMPONENT = 'xcomponent';

	var __XCOMPONENT__ = exports.__XCOMPONENT__ = '__' + XCOMPONENT + '__';

	var POST_MESSAGE = exports.POST_MESSAGE = {
	    INIT: XCOMPONENT + '_init',
	    PROPS: XCOMPONENT + '_props',
	    PROP_CALLBACK: XCOMPONENT + '_prop_callback',
	    CLOSE: XCOMPONENT + '_close',
	    REDIRECT: XCOMPONENT + '_redirect',
	    RESIZE: XCOMPONENT + '_resize',
	    DELEGATE: XCOMPONENT + '_delegate',
	    ERROR: XCOMPONENT + '_error',
	    HIDE: XCOMPONENT + '_hide',
	    SHOW: XCOMPONENT + '_show'
	};

	var PROP_TYPES = exports.PROP_TYPES = {
	    STRING: 'string',
	    OBJECT: 'object',
	    FUNCTION: 'function',
	    BOOLEAN: 'boolean',
	    NUMBER: 'number'
	};

	var INITIAL_PROPS = exports.INITIAL_PROPS = {
	    RAW: 'raw',
	    UID: 'uid'
	};

	var WINDOW_REFERENCES = exports.WINDOW_REFERENCES = {
	    DIRECT_PARENT: '__direct_parent__',
	    PARENT_PARENT: '__parent_parent__',
	    PARENT_UID: '__parent_uid__'
	};

	var PROP_TYPES_LIST = exports.PROP_TYPES_LIST = (0, _lib.values)(PROP_TYPES);

	var CONTEXT_TYPES = exports.CONTEXT_TYPES = {
	    IFRAME: 'iframe',
	    LIGHTBOX: 'lightbox',
	    POPUP: 'popup'
	};

	var CLASS_NAMES = exports.CLASS_NAMES = {
	    XCOMPONENT: '' + XCOMPONENT,
	    COMPONENT: XCOMPONENT + '-component',
	    CLOSE: XCOMPONENT + '-close',
	    FOCUS: XCOMPONENT + '-focus',
	    ELEMENT: XCOMPONENT + '-element',
	    IFRAME: XCOMPONENT + '-iframe',
	    LIGHTBOX: XCOMPONENT + '-lightbox',
	    POPUP: XCOMPONENT + '-popup',
	    LOADING: XCOMPONENT + '-loading',

	    SHOW_CONTAINER: XCOMPONENT + '-show-container',
	    SHOW_COMPONENT: XCOMPONENT + '-show-component',
	    HIDE_CONTAINER: XCOMPONENT + '-hide-container',
	    HIDE_COMPONENT: XCOMPONENT + '-hide-component'
	};

	var ANIMATION_NAMES = exports.ANIMATION_NAMES = {
	    SHOW_CONTAINER: XCOMPONENT + '-show-container',
	    SHOW_COMPONENT: XCOMPONENT + '-show-component',
	    HIDE_CONTAINER: XCOMPONENT + '-hide-container',
	    HIDE_COMPONENT: XCOMPONENT + '-hide-component'
	};

	var EVENT_NAMES = exports.EVENT_NAMES = {
	    CLICK: 'click'
	};

	var CLOSE_REASONS = exports.CLOSE_REASONS = {
	    PARENT_CALL: 'parent_call',
	    CHILD_CALL: 'child_call',
	    CLOSE_DETECTED: 'close_detected',
	    USER_CLOSED: 'user_closed',
	    PARENT_CLOSE_DETECTED: 'parent_close_detected'
	};

	var CONTEXT_TYPES_LIST = exports.CONTEXT_TYPES_LIST = (0, _lib.values)(CONTEXT_TYPES);

	var DELEGATE = exports.DELEGATE = {
	    CALL_ORIGINAL: 'call_original',
	    CALL_DELEGATE: 'call_delegate'
	};

/***/ },
/* 57 */
/*!**************************************!*\
  !*** ./src/component/child/props.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.normalizeChildProps = normalizeChildProps;

	var _lib = __webpack_require__(/*! ../../lib */ 46);

	function normalizeChildProps(component, props, origin) {
	    var required = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];


	    var result = {};

	    var _loop = function _loop() {
	        if (_isArray) {
	            if (_i >= _iterator.length) return 'break';
	            _ref = _iterator[_i++];
	        } else {
	            _i = _iterator.next();
	            if (_i.done) return 'break';
	            _ref = _i.value;
	        }

	        var key = _ref;


	        if (!props.hasOwnProperty(key) && !required) {
	            return 'continue';
	        }

	        var prop = component.props[key];
	        var value = props[key];

	        if (typeof prop.childDef === 'function') {
	            if (!value) {
	                if (prop.getter) {
	                    value = function value() {
	                        return Promise.resolve(prop.childDef.call());
	                    };
	                } else {
	                    value = prop.childDef.call();
	                }
	            } else if (prop.getter) {
	                (function () {
	                    var val = value;
	                    value = function value() {
	                        return val.apply(this, arguments).then(function (res) {
	                            return res ? res : prop.childDef.call();
	                        });
	                    };
	                })();
	            }
	        }

	        if (value && prop.sameDomain && origin !== (0, _lib.getDomain)(window)) {
	            value = null;
	        }

	        result[key] = value;

	        if (prop.alias && !result[prop.alias]) {
	            result[prop.alias] = value;
	        }
	    };

	    _loop2: for (var _iterator = Object.keys(component.props), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	        var _ref;

	        var _ret = _loop();

	        switch (_ret) {
	            case 'break':
	                break _loop2;

	            case 'continue':
	                continue;}
	    }

	    return result;
	}

/***/ },
/* 58 */
/*!***************************************!*\
  !*** ./src/component/parent/index.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ParentComponent = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _desc, _value, _class;

	exports.destroyAll = destroyAll;

	var _client = __webpack_require__(/*! beaver-logger/client */ 35);

	var _client2 = _interopRequireDefault(_client);

	var _src = __webpack_require__(/*! post-robot/src */ 3);

	var _src2 = _interopRequireDefault(_src);

	var _promise = __webpack_require__(/*! sync-browser-mocks/src/promise */ 13);

	var _base = __webpack_require__(/*! ../base */ 45);

	var _window = __webpack_require__(/*! ../window */ 54);

	var _lib = __webpack_require__(/*! ../../lib */ 46);

	var _constants = __webpack_require__(/*! ../../constants */ 56);

	var _drivers = __webpack_require__(/*! ./drivers */ 59);

	var _validate = __webpack_require__(/*! ./validate */ 60);

	var _props = __webpack_require__(/*! ./props */ 61);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

	var activeComponents = [];

	function memoize(target, name, descriptor) {
	    var method = descriptor.value;

	    descriptor.value = function () {

	        this.__memoized__ = this.__memoized__ || {};

	        if (!this.__memoized__.hasOwnProperty(name)) {
	            this.__memoized__[name] = method.apply(this, arguments);
	        }

	        return this.__memoized__[name];
	    };
	}

	function promise(target, name, descriptor) {
	    var method = descriptor.value;

	    descriptor.value = function () {
	        var _this = this,
	            _arguments = arguments;

	        return _promise.SyncPromise['try'](function () {
	            return method.apply(_this, _arguments);
	        });
	    };
	}

	var global = window[_constants.__XCOMPONENT__] = window[_constants.__XCOMPONENT__] || {};

	global.props = global.props || {};
	global.windows = global.windows || {};

	/*  Parent Component
	    ----------------

	    This manages the state of the component on the parent window side - i.e. the window the component is being rendered into.

	    It handles opening the necessary windows/iframes, launching the component's url, and listening for messages back from the component.
	*/

	var ParentComponent = exports.ParentComponent = (_class = function (_BaseComponent) {
	    _inherits(ParentComponent, _BaseComponent);

	    function ParentComponent(component, context) {
	        var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	        _classCallCheck(this, ParentComponent);

	        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(ParentComponent).call(this, component, options));

	        (0, _validate.validate)(component, options);

	        _this2.rawProps = _extends({}, options.props || {});

	        _this2.component = component;
	        _this2.context = context;
	        _this2.setProps(options.props || {});

	        _this2.childWindowName = _this2.buildChildWindowName({ renderTo: window });

	        // Ensure the component is not loaded twice on the same page, if it is a singleton

	        if (component.singleton && activeComponents.some(function (comp) {
	            return comp.component === component;
	        })) {
	            throw new Error(component.tag + ' is a singleton, and an only be instantiated once');
	        }

	        _this2.registerActiveComponent();

	        // Options passed during renderToParent. We would not ordinarily expect a user to pass these, since we depend on
	        // them only when we're trying to render from a sibling to a sibling

	        _this2.component.log('construct_parent');

	        _this2.onInit = new _promise.SyncPromise();

	        _this2.clean.register(function () {
	            _this2.onInit = new _promise.SyncPromise();
	        });

	        _this2.onInit['catch'](function (err) {
	            return _this2.error(err);
	        });
	        return _this2;
	    }

	    _createClass(ParentComponent, [{
	        key: 'registerActiveComponent',
	        value: function registerActiveComponent() {
	            var _this3 = this;

	            activeComponents.push(this);

	            this.clean.register(function () {
	                activeComponents.splice(activeComponents.indexOf(_this3), 1);
	            });
	        }
	    }, {
	        key: 'buildChildWindowName',
	        value: function buildChildWindowName() {
	            var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	            var _ref$renderTo = _ref.renderTo;
	            var renderTo = _ref$renderTo === undefined ? window : _ref$renderTo;
	            var _ref$secureProps = _ref.secureProps;
	            var secureProps = _ref$secureProps === undefined ? false : _ref$secureProps;


	            var sameWindow = renderTo === window;
	            var isLightbox = this.context === _constants.CONTEXT_TYPES.LIGHTBOX;

	            var uid = (0, _lib.uniqueID)();
	            var tag = this.component.tag;
	            var sProps = this.getSerializedPropsForChild();

	            var defaultParent = isLightbox ? _constants.WINDOW_REFERENCES.PARENT_PARENT : _constants.WINDOW_REFERENCES.DIRECT_PARENT;

	            var parent = sameWindow ? defaultParent : window.name;

	            var renderParent = sameWindow ? defaultParent : _constants.WINDOW_REFERENCES.PARENT_UID;

	            var props = secureProps ? { type: _constants.INITIAL_PROPS.UID } : { type: _constants.INITIAL_PROPS.RAW, value: sProps };

	            if (props.type === _constants.INITIAL_PROPS.UID) {
	                global.props[uid] = sProps;
	            }

	            if (renderParent === _constants.WINDOW_REFERENCES.PARENT_UID) {
	                global.windows[uid] = renderTo;
	            }

	            return (0, _window.buildChildWindowName)(this.component.name, this.component.version, { uid: uid, tag: tag, parent: parent, renderParent: renderParent, props: props });
	        }

	        /*  Send to Parent
	            --------------
	             Send a post message to our parent window.
	        */

	    }, {
	        key: 'sendToParent',
	        value: function sendToParent(name, data) {
	            var parentWindow = (0, _window.getParentComponentWindow)();

	            if (!parentWindow) {
	                throw new Error('Can not find parent component window to message');
	            }

	            this.component.log('send_to_parent_' + name);

	            return _src2['default'].send((0, _window.getParentComponentWindow)(), name, data, { domain: (0, _window.getParentDomain)() });
	        }

	        /*  Set Props
	            ---------
	             Normalize props and generate the url we'll use to render the component
	        */

	    }, {
	        key: 'setProps',
	        value: function setProps() {
	            var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	            var required = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

	            this.props = this.props || {};
	            props.version = this.component.version;
	            (0, _validate.validateProps)(this.component, props, required);
	            if (this.component.validateProps) {
	                this.component.validateProps(this.component, props, required);
	            }
	            (0, _lib.extend)(this.props, (0, _props.normalizeProps)(this.component, this, props, required));
	        }

	        /*  Build Url
	            ---------
	             We build the props we're passed into the initial url. This means the component server-side can start rendering
	            itself based on whatever props the merchant provides.
	        */

	    }, {
	        key: 'buildUrl',
	        value: function buildUrl() {
	            var _this4 = this;

	            return _promise.SyncPromise.hash({
	                url: this.props.url,
	                query: (0, _props.propsToQuery)(this.component.props, this.props)

	            }).then(function (_ref2) {
	                var url = _ref2.url;
	                var query = _ref2.query;


	                // Do not extend the url if it is for a different domain

	                if (url && !_this4.getValidDomain(url)) {
	                    return url;
	                }

	                return _promise.SyncPromise['try'](function () {

	                    if (url) {
	                        return url;
	                    } else if (_this4.props.env && _this4.component.envUrls) {
	                        return _this4.component.envUrls[_this4.props.env];
	                    } else if (_this4.component.defaultEnv && _this4.component.envUrls) {
	                        return _this4.component.envUrls[_this4.component.defaultEnv];
	                    } else if (_this4.component.buildUrl) {
	                        return _this4.component.buildUrl(_this4, _this4.props);
	                    } else {
	                        return _this4.component.url;
	                    }
	                }).then(function (finalUrl) {

	                    query[_constants.XCOMPONENT] = '1';
	                    return (0, _lib.extendUrl)(finalUrl, { query: query });
	                });
	            });
	        }
	    }, {
	        key: 'getValidDomain',
	        value: function getValidDomain(url) {

	            if (!url) {
	                return;
	            }

	            var domain = (0, _lib.getDomainFromUrl)(url);

	            if (this.component.domain) {
	                if (domain === this.component.domain) {
	                    return domain;
	                }
	            }

	            if (this.component.domains) {
	                for (var _iterator = Object.keys(this.component.domains), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	                    var _ref3;

	                    if (_isArray) {
	                        if (_i >= _iterator.length) break;
	                        _ref3 = _iterator[_i++];
	                    } else {
	                        _i = _iterator.next();
	                        if (_i.done) break;
	                        _ref3 = _i.value;
	                    }

	                    var env = _ref3;


	                    if (env === 'test') {
	                        continue;
	                    }

	                    if (domain === this.component.domains[env]) {
	                        return domain;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'getDomain',
	        value: function getDomain() {
	            var _this5 = this;

	            return _promise.SyncPromise['try'](function () {

	                return _this5.props.url;
	            }).then(function (url) {

	                var domain = _this5.getValidDomain(url);

	                if (domain) {
	                    return domain;
	                }

	                if (_this5.component.domain) {
	                    return _this5.component.domain;
	                }

	                if (_this5.component.domains && _this5.props.env && _this5.component.domains[_this5.props.env]) {
	                    return _this5.component.domains[_this5.props.env];
	                }

	                if (_this5.component.envUrls && _this5.props.env && _this5.component.envUrls[_this5.props.env]) {
	                    return (0, _lib.getDomainFromUrl)(_this5.component.envUrls[_this5.props.env]);
	                }

	                if (_this5.component.envUrls && _this5.component.defaultEnv && _this5.component.envUrls[_this5.component.defaultEnv]) {
	                    return (0, _lib.getDomainFromUrl)(_this5.component.envUrls[_this5.component.defaultEnv]);
	                }

	                if (_this5.component.buildUrl) {
	                    return (0, _lib.getDomainFromUrl)(_this5.component.buildUrl(_this5));
	                }

	                if (_this5.component.url) {
	                    return (0, _lib.getDomainFromUrl)(_this5.component.url);
	                }

	                throw new Error('Can not determine domain for component');
	            });
	        }
	    }, {
	        key: 'getBridgeDomain',
	        value: function getBridgeDomain(url) {
	            var _this6 = this;

	            return _promise.SyncPromise['try'](function () {

	                if (_this6.component.bridgeDomain) {
	                    return _this6.component.bridgeDomain;
	                }

	                if (_this6.component.bridgeDomains && _this6.props.env && _this6.component.bridgeDomains[_this6.props.env]) {
	                    return _this6.component.bridgeDomains[_this6.props.env];
	                }

	                if (url) {
	                    return (0, _lib.getDomainFromUrl)(url);
	                }

	                throw new Error('Can not determine domain for bridge');
	            });
	        }
	    }, {
	        key: 'getPropsForChild',
	        value: function getPropsForChild() {

	            var result = {};

	            for (var _iterator2 = Object.keys(this.props), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
	                var _ref4;

	                if (_isArray2) {
	                    if (_i2 >= _iterator2.length) break;
	                    _ref4 = _iterator2[_i2++];
	                } else {
	                    _i2 = _iterator2.next();
	                    if (_i2.done) break;
	                    _ref4 = _i2.value;
	                }

	                var key = _ref4;

	                if (this.component.props[key].sendToChild !== false) {
	                    result[key] = this.props[key];
	                }
	            }

	            return result;
	        }
	    }, {
	        key: 'getSerializedPropsForChild',
	        value: function getSerializedPropsForChild() {

	            return (0, _lib.replaceObject)(this.getPropsForChild(), function (value, key, fullKey) {
	                if (value instanceof Function) {
	                    return {
	                        __type__: '__function__'
	                    };
	                }
	            });
	        }

	        /*  Update Props
	            ------------
	             Send new props down to the child
	        */

	    }, {
	        key: 'updateProps',
	        value: function updateProps() {
	            var _this7 = this;

	            var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	            var changed = false;

	            for (var _iterator3 = Object.keys(props), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
	                var _ref5;

	                if (_isArray3) {
	                    if (_i3 >= _iterator3.length) break;
	                    _ref5 = _iterator3[_i3++];
	                } else {
	                    _i3 = _iterator3.next();
	                    if (_i3.done) break;
	                    _ref5 = _i3.value;
	                }

	                var key = _ref5;

	                if (props[key] !== this.rawProps[key]) {
	                    changed = true;
	                    break;
	                }
	            }

	            if (!changed) {
	                return;
	            }

	            this.rawProps = _extends({}, this.rawProps, props);
	            this.setProps(props, false);

	            if (this.propUpdater) {
	                return this.propUpdater;
	            }

	            this.propUpdater = this.onInit.then(function () {
	                delete _this7.propUpdater;
	                return _this7.childExports.updateProps(_this7.getPropsForChild());
	            });

	            return this.propUpdater;
	        }
	    }, {
	        key: 'openBridge',
	        value: function openBridge() {
	            var _this8 = this;

	            var bridgeUrl = this.component.bridgeUrl;

	            if (!bridgeUrl && this.component.bridgeUrls && this.props.env) {
	                bridgeUrl = this.component.bridgeUrls[this.props.env];
	            }

	            if (!bridgeUrl) {
	                return;
	            }

	            return this.getBridgeDomain(bridgeUrl).then(function (bridgeDomain) {
	                if (_src2['default'].needsBridge({ window: _this8.window, domain: bridgeDomain })) {
	                    return _src2['default'].openBridge(bridgeUrl, bridgeDomain);
	                }
	            });
	        }

	        /*  Open
	            ----
	             Open a new window in the desired context
	        */

	    }, {
	        key: 'open',
	        value: function open(element) {
	            this.component.log('open_' + this.context, { element: element, windowName: this.childWindowName });

	            this.driver.open.call(this, element);
	        }
	    }, {
	        key: 'elementReady',
	        value: function elementReady(element) {
	            return (0, _lib.elementReady)(element).then(_lib.noop);
	        }

	        /*  Pre Render
	            ----------
	             Pre-render a new window in the desired context
	        */

	    }, {
	        key: 'render',
	        value: function render(element) {
	            var _this9 = this;

	            var loadUrl = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

	            return this.tryInit(function () {

	                _this9.component.log('render_' + _this9.context, { context: _this9.context, element: element, loadUrl: loadUrl });

	                var tasks = {
	                    openContainer: _this9.openContainer(_this9.context),
	                    getDomain: _this9.getDomain()
	                };

	                tasks.elementReady = _promise.SyncPromise['try'](function () {
	                    if (element) {
	                        return _this9.elementReady(element);
	                    } else {
	                        return tasks.openContainer;
	                    }
	                });

	                if (_this9.driver.openOnClick) {
	                    tasks.open = _this9.open(element, _this9.context);
	                } else {
	                    tasks.open = tasks.elementReady.then(function () {
	                        return _this9.open(element, _this9.context);
	                    });
	                }

	                tasks.openBridge = tasks.open.then(function () {
	                    return _this9.openBridge(_this9.context);
	                });

	                tasks.showContainer = tasks.openContainer.then(function () {
	                    return _this9.showContainer();
	                });

	                tasks.createComponentTemplate = tasks.open.then(function () {
	                    return _this9.createComponentTemplate();
	                });

	                tasks.showComponent = tasks.createComponentTemplate.then(function () {
	                    return _this9.showComponent();
	                });

	                tasks.linkDomain = _promise.SyncPromise.all([tasks.getDomain, tasks.open]).then(function (_ref6) {
	                    var _ref7 = _slicedToArray(_ref6, 1);

	                    var domain = _ref7[0];

	                    return _src2['default'].linkUrl(_this9.window, domain);
	                });

	                tasks.listen = _promise.SyncPromise.all([tasks.getDomain, tasks.open]).then(function (_ref8) {
	                    var _ref9 = _slicedToArray(_ref8, 1);

	                    var domain = _ref9[0];

	                    _this9.listen(_this9.window, domain);
	                });

	                tasks.watchForClose = tasks.open.then(function () {
	                    return _this9.watchForClose();
	                });

	                if (loadUrl) {
	                    tasks.buildUrl = _this9.buildUrl();

	                    tasks.loadUrl = _promise.SyncPromise.all([tasks.buildUrl, tasks.linkDomain, tasks.listen, tasks.openBridge, tasks.createComponentTemplate]).then(function (_ref10) {
	                        var _ref11 = _slicedToArray(_ref10, 1);

	                        var url = _ref11[0];

	                        return _this9.loadUrl(url);
	                    });

	                    tasks.runTimeout = tasks.loadUrl.then(function () {
	                        return _this9.runTimeout();
	                    });
	                }

	                return _promise.SyncPromise.hash(tasks);
	            });
	        }
	    }, {
	        key: 'validateRenderToParent',
	        value: function validateRenderToParent(element) {

	            var parentWindow = (0, _window.getParentComponentWindow)();

	            if (!parentWindow) {
	                throw new Error('[' + this.component.tag + '] Can not render to parent - no parent exists');
	            }

	            if (!(0, _window.isXComponentWindow)()) {
	                throw new Error('[' + this.component.tag + '] Can not render to parent - not in a child component window');
	            }
	        }
	    }, {
	        key: 'delegate',
	        value: function delegate(win) {
	            var _this10 = this;

	            this.delegateWindow = win;

	            this.component.log('delegate_' + this.context);

	            this.childWindowName = this.buildChildWindowName({ renderTo: win, secureProps: true });

	            var delegate = _src2['default'].send(win, _constants.POST_MESSAGE.DELEGATE + '_' + this.component.name, {

	                context: this.context,

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
	                        focus: function focus() {
	                            return _this10.focus();
	                        },
	                        userClose: function userClose() {
	                            return _this10.userClose();
	                        },
	                        getDomain: function getDomain() {
	                            return _this10.getDomain();
	                        },
	                        getParentTemplate: function getParentTemplate() {
	                            return _this10.getParentTemplate();
	                        }
	                    }
	                }

	            }).then(function (_ref12) {
	                var data = _ref12.data;


	                _this10.clean.register(data.destroy);
	                return data;
	            })['catch'](function (err) {

	                throw new Error('Unable to delegate rendering. Possibly the component is not loaded in the target window.\n\n' + err.stack);
	            });

	            var overrides = this.driver.renderToParentOverrides;

	            var _loop = function _loop() {
	                if (_isArray4) {
	                    if (_i4 >= _iterator4.length) return 'break';
	                    _ref13 = _iterator4[_i4++];
	                } else {
	                    _i4 = _iterator4.next();
	                    if (_i4.done) return 'break';
	                    _ref13 = _i4.value;
	                }

	                var key = _ref13;

	                var val = overrides[key];

	                if (val === _constants.DELEGATE.CALL_ORIGINAL) {
	                    return 'continue';
	                }

	                var original = _this10[key];

	                _this10[key] = function () {
	                    var _this11 = this,
	                        _arguments2 = arguments;

	                    return delegate.then(function (data) {

	                        var override = data.overrides[key];

	                        if (val === _constants.DELEGATE.CALL_DELEGATE) {
	                            return override.apply(_this11, _arguments2);
	                        }

	                        if (val instanceof Function) {
	                            return val(original, override).apply(_this11, _arguments2);
	                        }

	                        throw new Error('Expected delgate to be CALL_ORIGINAL, CALL_DELEGATE, or factory method');
	                    });
	                };
	            };

	            _loop2: for (var _iterator4 = Object.keys(overrides), _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
	                var _ref13;

	                var _ret = _loop();

	                switch (_ret) {
	                    case 'break':
	                        break _loop2;

	                    case 'continue':
	                        continue;}
	            }
	        }
	    }, {
	        key: 'renderTo',
	        value: function renderTo(win, element, context) {
	            var _this12 = this;

	            var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

	            return this.tryInit(function () {
	                _this12.context = _this12.context || _this12.component.getRenderContext(element, context);

	                _this12.validateRenderToParent(element, _this12.context);

	                _this12.component.log('render_' + _this12.context + '_to_win', { element: element, context: _this12.context });

	                _this12.delegate(win, _this12.context);

	                return _this12.render(element, _this12.context);
	            });
	        }

	        /*  Watch For Close
	            ---------------
	             Watch for the child window closing, so we can cleanup.
	            Also watch for this window changing location, so we can close the component.
	        */

	    }, {
	        key: 'watchForClose',
	        value: function watchForClose() {
	            var _this13 = this;

	            var closeWindowListener = (0, _lib.onCloseWindow)(this.window, function () {
	                _this13.component.log('detect_close_child');

	                if (_this13.driver.errorOnCloseDuringInit) {
	                    _this13.onInit.reject(new Error('Detected close during init'));
	                }

	                return _promise.SyncPromise['try'](function () {
	                    return _this13.props.onClose(_constants.CLOSE_REASONS.CLOSE_DETECTED);
	                })['finally'](function () {
	                    return _this13.destroy();
	                });
	            });

	            this.clean.register('destroyCloseWindowListener', closeWindowListener.cancel);

	            // Our child has no way of knowing if we navigated off the page. So we have to listen for beforeunload
	            // and close the child manually if that happens.

	            var unloadWindowListener = (0, _lib.addEventListener)(window, 'beforeunload', function () {
	                _this13.component.log('navigate_away');
	                _client2['default'].flush();

	                closeWindowListener.cancel();

	                if (_this13.driver.destroyOnUnload) {
	                    return _this13.destroyComponent();
	                }
	            });

	            this.clean.register('destroyUnloadWindowListener', unloadWindowListener.cancel);
	        }

	        /*  Load Url
	            --------
	             Load url into the child window. This is separated out because it's quite common for us to have situations
	            where opening the child window and loading the url happen at different points.
	        */

	    }, {
	        key: 'loadUrl',
	        value: function loadUrl(url) {
	            this.component.log('load_url');

	            if (window.location.href.split('#')[0] === url.split('#')[0]) {
	                url = (0, _lib.extendUrl)(url, {
	                    query: _defineProperty({}, (0, _lib.uniqueID)(), '1')
	                });
	            }

	            return this.driver.loadUrl.call(this, url);
	        }
	    }, {
	        key: 'hijack',
	        value: function hijack(targetElement) {
	            targetElement.target = this.childWindowName;
	        }

	        /*  Run Timeout
	            -----------
	             Set a timeout on the initial render, and call this.props.onTimeout if we don't get an init call in time.
	        */

	    }, {
	        key: 'runTimeout',
	        value: function runTimeout() {
	            var _this14 = this;

	            if (this.props.timeout) {
	                this.timeout = setTimeout(function () {

	                    _this14.component.log('timed_out', { timeout: _this14.props.timeout });

	                    var error = new Error('[' + _this14.component.tag + '] Loading component ' + _this14.component.tag + ' timed out after ' + _this14.props.timeout + ' milliseconds');

	                    _this14.onInit.reject(error);
	                    _this14.props.onTimeout(error);
	                }, this.props.timeout);

	                this.clean.register(function () {
	                    clearTimeout(_this14.timeout);
	                    delete _this14.timeout;
	                });
	            }
	        }

	        /*  Listeners
	            ---------
	             Post-robot listeners to the child component window
	        */

	    }, {
	        key: 'listeners',
	        value: function listeners() {
	            var _ref14;

	            return _ref14 = {}, _defineProperty(_ref14, _constants.POST_MESSAGE.INIT, function (source, data) {
	                var _this15 = this;

	                this.childExports = data.exports;

	                this.onInit.resolve(this);

	                if (this.timeout) {
	                    clearTimeout(this.timeout);
	                }

	                return this.props.onEnter().then(function () {

	                    // Let the child know what its context is, and what its initial props are.

	                    _client2['default'].flush();

	                    return {
	                        props: _this15.getPropsForChild(),
	                        context: _this15.context
	                    };
	                });
	            }), _defineProperty(_ref14, _constants.POST_MESSAGE.CLOSE, function (source, data) {
	                this.close(data.reason);
	            }), _defineProperty(_ref14, _constants.POST_MESSAGE.RESIZE, function (source, data) {

	                if (this.driver.allowResize && this.component.autoResize) {
	                    return this.resize(data.width, data.height);
	                }
	            }), _defineProperty(_ref14, _constants.POST_MESSAGE.HIDE, function (source, data) {
	                this.hide();
	            }), _defineProperty(_ref14, _constants.POST_MESSAGE.SHOW, function (source, data) {
	                this.show();
	            }), _defineProperty(_ref14, _constants.POST_MESSAGE.ERROR, function (source, data) {
	                this.error(new Error(data.error));
	            }), _ref14;
	        }

	        /*  Resize
	            ------
	             Resize the child component window
	        */

	    }, {
	        key: 'resize',
	        value: function resize(width, height) {
	            var _this16 = this;

	            this.component.log('resize', { height: height, width: width });
	            this.driver.resize.call(this, width, height);

	            if (this.elementTemplate || this.iframe) {
	                var _ret2 = function () {

	                    var overflow = void 0;

	                    if (_this16.elementTemplate) {
	                        overflow = (0, _lib.setOverflow)(_this16.elementTemplate, 'hidden');
	                    }

	                    return {
	                        v: (0, _lib.elementStoppedMoving)(_this16.elementTemplate || _this16.iframe).then(function () {

	                            if (overflow) {
	                                overflow.reset();
	                            }
	                        })
	                    };
	                }();

	                if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
	            }
	        }

	        /*  Restyle
	            -------
	             Restyle the child component window
	        */

	    }, {
	        key: 'restyle',
	        value: function restyle() {
	            return this.driver.restyle.call(this);
	        }

	        /*  Hide
	            ----
	             Hide the component and any parent template
	        */

	    }, {
	        key: 'hide',
	        value: function hide() {

	            if (this.parentTemplate) {
	                this.parentTemplate.style.display = 'none';
	            }

	            return this.driver.hide.call(this);
	        }
	    }, {
	        key: 'show',
	        value: function show() {

	            if (this.parentTemplate) {
	                this.parentTemplate.style.display = 'block';
	            }

	            return this.driver.show.call(this);
	        }
	    }, {
	        key: 'userClose',
	        value: function userClose() {
	            return this.close(_constants.CLOSE_REASONS.USER_CLOSED);
	        }

	        /*  Close
	            -----
	             Close the child component
	        */

	    }, {
	        key: 'close',
	        value: function close() {
	            var _this17 = this;

	            var reason = arguments.length <= 0 || arguments[0] === undefined ? _constants.CLOSE_REASONS.PARENT_CALL : arguments[0];

	            return _promise.SyncPromise['try'](function () {

	                _this17.component.log('close', { reason: reason });

	                return _this17.props.onClose(reason);
	            }).then(function () {

	                return _promise.SyncPromise.all([_this17.closeComponent(), _this17.closeContainer()]);
	            }).then(function () {

	                return _this17.destroy();
	            });
	        }
	    }, {
	        key: 'closeContainer',
	        value: function closeContainer() {
	            var _this18 = this;

	            var reason = arguments.length <= 0 || arguments[0] === undefined ? _constants.CLOSE_REASONS.PARENT_CALL : arguments[0];

	            return _promise.SyncPromise['try'](function () {

	                return _this18.props.onClose(reason);
	            }).then(function () {

	                return _promise.SyncPromise.all([_this18.closeComponent(reason), _this18.hideContainer()]);
	            }).then(function () {

	                return _this18.destroyContainer();
	            });
	        }
	    }, {
	        key: 'destroyContainer',
	        value: function destroyContainer() {
	            this.clean.run('destroyContainerEvents');
	            this.clean.run('destroyParentTemplate');
	        }
	    }, {
	        key: 'closeComponent',
	        value: function closeComponent() {
	            var _this19 = this;

	            var reason = arguments.length <= 0 || arguments[0] === undefined ? _constants.CLOSE_REASONS.PARENT_CALL : arguments[0];


	            this.clean.run('destroyCloseWindowListener');
	            this.clean.run('destroyUnloadWindowListener');

	            var win = this.window;

	            return _promise.SyncPromise['try'](function () {

	                return _this19.cancelContainerEvents();
	            }).then(function () {

	                return _this19.props.onClose(reason);
	            }).then(function () {

	                return _this19.hideComponent();
	            }).then(function () {

	                return _this19.destroyComponent();
	            }).then(function () {

	                // IE in metro mode -- child window needs to close itself, or close will hang

	                if (_this19.childExports && _this19.context === _constants.CONTEXT_TYPES.POPUP && !_src2['default'].winutil.isWindowClosed(win)) {
	                    _this19.childExports.close()['catch'](_lib.noop);
	                }
	            });
	        }
	    }, {
	        key: 'destroyComponent',
	        value: function destroyComponent() {
	            this.clean.run('destroyCloseWindowListener');
	            this.clean.run('destroyContainerEvents');
	            this.clean.run('destroyWindow');
	        }
	    }, {
	        key: 'showContainer',
	        value: function showContainer() {
	            if (this.parentTemplate) {
	                (0, _lib.addClass)(this.parentTemplate, _constants.CLASS_NAMES.SHOW_CONTAINER);
	                return (0, _lib.showAndAnimate)(this.parentTemplate, _constants.ANIMATION_NAMES.SHOW_CONTAINER);
	            }
	        }
	    }, {
	        key: 'showComponent',
	        value: function showComponent() {
	            var _this20 = this;

	            return _promise.SyncPromise['try'](function () {
	                if (_this20.props.onDisplay) {
	                    return _this20.props.onDisplay();
	                }
	            }).then(function () {
	                if (_this20.elementTemplate) {
	                    (0, _lib.addClass)(_this20.elementTemplate, _constants.CLASS_NAMES.SHOW_COMPONENT);
	                    (0, _lib.showAndAnimate)(_this20.elementTemplate, _constants.ANIMATION_NAMES.SHOW_COMPONENT);
	                }
	            });
	        }
	    }, {
	        key: 'hideContainer',
	        value: function hideContainer() {
	            if (this.parentTemplate) {

	                (0, _lib.addClass)(this.parentTemplate, _constants.CLASS_NAMES.HIDE_CONTAINER);
	                (0, _lib.addClass)(this.parentTemplate, _constants.CLASS_NAMES.LOADING);

	                return (0, _lib.animateAndHide)(this.parentTemplate, _constants.ANIMATION_NAMES.HIDE_CONTAINER);
	            }
	        }
	    }, {
	        key: 'hideComponent',
	        value: function hideComponent() {

	            if (this.parentTemplate) {
	                (0, _lib.addClass)(this.parentTemplate, _constants.CLASS_NAMES.LOADING);
	            }

	            if (this.elementTemplate) {
	                (0, _lib.addClass)(this.elementTemplate, _constants.CLASS_NAMES.HIDE_COMPONENT);
	                return (0, _lib.animateAndHide)(this.elementTemplate, _constants.ANIMATION_NAMES.HIDE_COMPONENT);
	            }
	        }

	        /*  Focus
	            -----
	             Focus the child component window
	        */

	    }, {
	        key: 'focus',
	        value: function focus() {

	            if (this.window) {

	                this.component.log('focus');
	                this.window.focus();
	            } else {

	                throw new Error('No window to focus');
	            }
	        }

	        /*  Create Component Template
	            -------------------------
	             Creates an initial template and stylesheet which are loaded into the child window, to be displayed before the url is loaded
	        */

	    }, {
	        key: 'createComponentTemplate',
	        value: function createComponentTemplate() {

	            var componentTemplate = this.component.componentTemplate instanceof Function ? this.component.componentTemplate() : this.component.componentTemplate;

	            var html = (0, _lib.template)(componentTemplate, {
	                id: _constants.CLASS_NAMES.XCOMPONENT + '-' + this.props.uid,
	                CLASS: _constants.CLASS_NAMES,
	                ANIMATION: _constants.ANIMATION_NAMES
	            });

	            try {
	                this.window.document.open();
	                this.window.document.write(html);
	                this.window.document.close();
	            } catch (err) {
	                try {
	                    this.window.location = 'javascript: document.open(); document.write(' + JSON.stringify(html) + '); document.close();';
	                } catch (err2) {
	                    // pass
	                }
	            }
	        }
	    }, {
	        key: 'getParentTemplate',
	        value: function getParentTemplate() {
	            return this.component.parentTemplate;
	        }

	        /*  Create Parent Template
	            ----------------------
	             Create a template and stylesheet for the parent template behind the popup/lightbox
	        */

	    }, {
	        key: 'openContainer',
	        value: function openContainer() {
	            var _this21 = this;

	            return _promise.SyncPromise['try'](function () {

	                if (!_this21.driver.parentTemplate) {
	                    return;
	                }

	                return _this21.getParentTemplate();
	            }).then(function (parentTemplate) {

	                if (!parentTemplate) {
	                    return;
	                }

	                if (window.top !== window) {
	                    // throw new Error(`Can only render parent template to top level window`);
	                }

	                _this21.parentTemplateFrame = (0, _lib.iframe)(null, {
	                    name: '__lightbox_container__' + (0, _lib.uniqueID)() + '__',
	                    scrolling: 'no'
	                }, document.body);

	                _this21.parentTemplateFrame.style.display = 'block';
	                _this21.parentTemplateFrame.style.position = 'fixed';
	                _this21.parentTemplateFrame.style.top = '0';
	                _this21.parentTemplateFrame.style.left = '0';
	                _this21.parentTemplateFrame.style.width = '100%';
	                _this21.parentTemplateFrame.style.height = '100%';
	                _this21.parentTemplateFrame.style.zIndex = '2147483647';

	                _this21.parentTemplateFrame.contentWindow.document.open();
	                _this21.parentTemplateFrame.contentWindow.document.write('<body></body>');
	                _this21.parentTemplateFrame.contentWindow.document.close();

	                _this21.parentTemplate = (0, _lib.createElement)('div', {

	                    html: (0, _lib.template)(parentTemplate, {
	                        id: _constants.CLASS_NAMES.XCOMPONENT + '-' + _this21.props.uid,
	                        CLASS: _constants.CLASS_NAMES,
	                        ANIMATION: _constants.ANIMATION_NAMES
	                    }),

	                    attributes: {
	                        id: _constants.CLASS_NAMES.XCOMPONENT + '-' + _this21.props.uid
	                    },

	                    'class': [_constants.CLASS_NAMES.XCOMPONENT, _constants.CLASS_NAMES.XCOMPONENT + '-' + _this21.context]
	                });

	                (0, _lib.hideElement)(_this21.parentTemplate);

	                _this21.parentTemplateFrame.contentWindow.document.body.appendChild(_this21.parentTemplate);

	                if (_this21.driver.renderedIntoParentTemplate) {
	                    _this21.elementTemplate = _this21.parentTemplate.getElementsByClassName(_constants.CLASS_NAMES.ELEMENT)[0];

	                    if (!_this21.elementTemplate) {
	                        throw new Error('Could not find element to render component into');
	                    }

	                    (0, _lib.hideElement)(_this21.elementTemplate);
	                }

	                var eventHandlers = [];

	                if (_this21.driver.focusable) {
	                    eventHandlers.push((0, _lib.addEventToClass)(_this21.parentTemplate, _constants.CLASS_NAMES.FOCUS, _constants.EVENT_NAMES.CLICK, function (event) {
	                        return _this21.focus();
	                    }));
	                }

	                eventHandlers.push((0, _lib.addEventToClass)(_this21.parentTemplate, _constants.CLASS_NAMES.CLOSE, _constants.EVENT_NAMES.CLICK, function (event) {
	                    return _this21.userClose();
	                }));

	                _this21.clean.register('destroyContainerEvents', function () {
	                    for (var _iterator5 = eventHandlers, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
	                        var _ref15;

	                        if (_isArray5) {
	                            if (_i5 >= _iterator5.length) break;
	                            _ref15 = _iterator5[_i5++];
	                        } else {
	                            _i5 = _iterator5.next();
	                            if (_i5.done) break;
	                            _ref15 = _i5.value;
	                        }

	                        var eventHandler = _ref15;

	                        eventHandler.cancel();
	                    }
	                });

	                // let overflow = setOverflow(document.documentElement, 'hidden');

	                _this21.clean.register('destroyParentTemplate', function () {

	                    document.body.removeChild(_this21.parentTemplateFrame);

	                    delete _this21.parentTemplateFrame;
	                    delete _this21.parentTemplate;

	                    // overflow.reset();
	                });
	            });
	        }
	    }, {
	        key: 'cancelContainerEvents',
	        value: function cancelContainerEvents() {
	            this.clean.run('destroyContainerEvents');
	        }

	        /*  Destroy
	            -------
	             Close the component and clean up any listeners and state
	        */

	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            var _this22 = this;

	            return _promise.SyncPromise['try'](function () {
	                if (_this22.clean.hasTasks()) {
	                    _this22.component.log('destroy');
	                    _client2['default'].flush();
	                    return _this22.clean.all();
	                }
	            });
	        }
	    }, {
	        key: 'tryInit',
	        value: function tryInit(method) {
	            var _this23 = this;

	            return _promise.SyncPromise['try'](method)['catch'](function (err) {

	                _this23.onInit.reject(err);
	                throw err;
	            }).then(function () {

	                return _this23.onInit;
	            });
	        }

	        /*  Error
	            -----
	             Handle an error
	        */

	    }, {
	        key: 'error',
	        value: function error(err) {
	            var _this24 = this;

	            this.handledErrors = this.handledErrors || [];

	            if (this.handledErrors.indexOf(err) !== -1) {
	                return;
	            }

	            this.handledErrors.push(err);

	            return _promise.SyncPromise['try'](function () {

	                _this24.component.logError('error', { error: err.stack || err.toString() });
	                _this24.onInit.reject(err);

	                return _this24.props.onError(err);
	            }).then(function () {

	                return _this24.destroy();
	            })['catch'](function (err2) {

	                throw new Error('An error was encountered while handling error:\n\n ' + err.stack + '\n\n' + err2.stack);
	            }).then(function () {

	                throw err;
	            });
	        }
	    }, {
	        key: 'driver',
	        get: function get() {

	            if (!this.context) {
	                throw new Error('Context not set');
	            }

	            return _drivers.RENDER_DRIVERS[this.context];
	        }
	    }]);

	    return ParentComponent;
	}(_base.BaseComponent), (_applyDecoratedDescriptor(_class.prototype, 'getDomain', [promise], Object.getOwnPropertyDescriptor(_class.prototype, 'getDomain'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'getBridgeDomain', [promise], Object.getOwnPropertyDescriptor(_class.prototype, 'getBridgeDomain'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'updateProps', [promise], Object.getOwnPropertyDescriptor(_class.prototype, 'updateProps'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'openBridge', [promise], Object.getOwnPropertyDescriptor(_class.prototype, 'openBridge'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'open', [memoize, promise], Object.getOwnPropertyDescriptor(_class.prototype, 'open'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'render', [promise], Object.getOwnPropertyDescriptor(_class.prototype, 'render'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'loadUrl', [promise], Object.getOwnPropertyDescriptor(_class.prototype, 'loadUrl'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'resize', [promise], Object.getOwnPropertyDescriptor(_class.prototype, 'resize'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'close', [memoize], Object.getOwnPropertyDescriptor(_class.prototype, 'close'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'closeContainer', [memoize], Object.getOwnPropertyDescriptor(_class.prototype, 'closeContainer'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'destroyContainer', [memoize, promise], Object.getOwnPropertyDescriptor(_class.prototype, 'destroyContainer'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'closeComponent', [memoize], Object.getOwnPropertyDescriptor(_class.prototype, 'closeComponent'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'showContainer', [memoize, promise], Object.getOwnPropertyDescriptor(_class.prototype, 'showContainer'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'showComponent', [memoize, promise], Object.getOwnPropertyDescriptor(_class.prototype, 'showComponent'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'hideContainer', [memoize, promise], Object.getOwnPropertyDescriptor(_class.prototype, 'hideContainer'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'hideComponent', [memoize, promise], Object.getOwnPropertyDescriptor(_class.prototype, 'hideComponent'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'createComponentTemplate', [memoize], Object.getOwnPropertyDescriptor(_class.prototype, 'createComponentTemplate'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'getParentTemplate', [promise], Object.getOwnPropertyDescriptor(_class.prototype, 'getParentTemplate'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'openContainer', [memoize, promise], Object.getOwnPropertyDescriptor(_class.prototype, 'openContainer'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'error', [promise], Object.getOwnPropertyDescriptor(_class.prototype, 'error'), _class.prototype)), _class);
	function destroyAll() {
	    var results = [];

	    while (activeComponents.length) {
	        results.push(activeComponents[0].destroy());
	    }

	    return _promise.SyncPromise.all(results);
	}

/***/ },
/* 59 */
/*!*****************************************!*\
  !*** ./src/component/parent/drivers.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.RENDER_DRIVERS = undefined;

	var _RENDER_DRIVERS;

	var _src = __webpack_require__(/*! post-robot/src */ 3);

	var _src2 = _interopRequireDefault(_src);

	var _lib = __webpack_require__(/*! ../../lib */ 46);

	var _constants = __webpack_require__(/*! ../../constants */ 56);

	var _window = __webpack_require__(/*! ../window */ 54);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	/*  Render Drivers
	    --------------

	    There are various differences in how we treat:

	    - Opening frames and windows
	    - Rendering up to the parent
	    - Resizing
	    - etc.

	    based on the context we're rendering to.

	    These render drivers split this functionality out in a driver pattern, so our component code doesn't bunch up into a
	    series of if-popup-then-else-if-lightbox code.
	*/

	var RENDER_DRIVERS = exports.RENDER_DRIVERS = (_RENDER_DRIVERS = {}, _defineProperty(_RENDER_DRIVERS, _constants.CONTEXT_TYPES.IFRAME, {

	    parentTemplate: false,
	    requiresElement: true,
	    renderedIntoParentTemplate: false,
	    destroyOnUnload: false,
	    allowResize: true,
	    openOnClick: false,
	    errorOnCloseDuringInit: true,

	    open: function open(element) {
	        var _this = this;

	        if (!element) {
	            throw new Error('[' + this.component.tag + '] Must specify element to render to iframe');
	        }

	        if (!(0, _lib.getElement)(element)) {
	            throw new Error('[' + this.component.tag + '] Can not find element ' + element);
	        }

	        this.iframe = (0, _lib.iframe)(null, {
	            name: this.childWindowName,
	            scrolling: this.component.scrolling === false ? 'no' : 'yes'
	        }, element);

	        this.elementTemplate = this.elementTemplate || this.iframe;

	        (0, _lib.hideElement)(this.elementTemplate);

	        var dimensions = this.props.dimensions || this.component.dimensions || {};
	        this.resize(dimensions.width, dimensions.height);
	        this.restyle();

	        this.window = this.iframe.contentWindow;

	        this.clean.register('destroyWindow', function () {

	            _this.window.close();
	            delete _this.window;

	            if (_this.iframe) {

	                if (_this.iframe.parentNode) {
	                    _this.iframe.parentNode.removeChild(_this.iframe);
	                }

	                delete _this.iframe;
	            }
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

	        open: function open(original, override) {
	            return function () {
	                var _this2 = this;

	                return override.apply(this, arguments).then(function () {
	                    _this2.window = _src2['default'].winutil.findFrameByName((0, _window.getParentComponentWindow)(), _this2.childWindowName);

	                    if (!_this2.window) {
	                        throw new Error('Unable to find parent component iframe window');
	                    }
	                });
	            };
	        }
	    },

	    resize: function resize(width, height) {

	        if (width) {
	            this.iframe.style.width = (0, _lib.toCSS)(width);
	        }

	        if (height) {
	            this.iframe.style.height = (0, _lib.toCSS)(height);
	        }
	    },
	    hide: function hide() {
	        this.iframe.style.display = 'none';
	    },
	    show: function show() {
	        this.iframe.style.display = 'block';
	    },
	    restyle: function restyle() {
	        this.iframe.style.backgroundColor = 'transparent';
	    },
	    loadUrl: function loadUrl(url) {
	        this.iframe.src = url;
	    }
	}), _defineProperty(_RENDER_DRIVERS, _constants.CONTEXT_TYPES.POPUP, {

	    parentTemplate: true,
	    focusable: true,
	    requiresElement: false,
	    renderedIntoParentTemplate: false,
	    destroyOnUnload: true,
	    allowResize: false,
	    openOnClick: true,
	    errorOnCloseDuringInit: false,

	    open: function open() {
	        var _this3 = this;

	        var _ref = this.props.dimensions || this.component.dimensions || {};

	        var width = _ref.width;
	        var height = _ref.height;
	        var x = _ref.x;
	        var y = _ref.y;


	        width = (0, _lib.isPerc)(width) ? parseInt(window.innerWidth * (0, _lib.toNum)(width) / 100, 10) : (0, _lib.toNum)(width);
	        height = (0, _lib.isPerc)(height) ? parseInt(window.innerHeight * (0, _lib.toNum)(height) / 100, 10) : (0, _lib.toNum)(height);

	        var pos = (0, _window.getPosition)({ width: width, height: height, x: x, y: y });

	        this.window = (0, _lib.popup)('', {
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
	        });

	        this.clean.register('destroyWindow', function () {
	            if (_this3.window) {
	                _this3.window.close();
	                delete _this3.window;
	            }
	        });

	        this.resize(width, height);
	    },
	    resize: function resize(width, height) {

	        if (width && height) {
	            // this.window.resizeTo(width, height);
	        }
	    },
	    hide: function hide() {
	        throw new Error('Can not hide popup');
	    },
	    show: function show() {
	        throw new Error('Can not show popup');
	    },
	    restyle: function restyle() {
	        // pass
	    },


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

	    loadUrl: function loadUrl(url) {
	        this.window.location = url;
	    }
	}), _defineProperty(_RENDER_DRIVERS, _constants.CONTEXT_TYPES.LIGHTBOX, {

	    parentTemplate: true,
	    requiresElement: false,
	    renderedIntoParentTemplate: true,
	    destroyOnUnload: false,
	    allowResize: true,
	    openOnClick: false,
	    errorOnCloseDuringInit: true,

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

	        open: function open(original, override) {
	            return function () {
	                var _this4 = this;

	                return override.apply(this, arguments).then(function () {
	                    _this4.window = _src2['default'].winutil.findFrameByName(_this4.delegateWindow, _this4.childWindowName);

	                    if (!_this4.window) {
	                        throw new Error('Unable to find parent component iframe window');
	                    }
	                });
	            };
	        }
	    },

	    open: function open() {

	        var element = this.parentTemplate.getElementsByClassName(_constants.CLASS_NAMES.ELEMENT)[0] || document.body;

	        return RENDER_DRIVERS[_constants.CONTEXT_TYPES.IFRAME].open.call(this, element);
	    },
	    resize: function resize(width, height) {

	        var container = this.parentTemplate.getElementsByClassName(_constants.CLASS_NAMES.ELEMENT)[0] || this.iframe;

	        if (width) {
	            container.style.width = (0, _lib.toCSS)(width);
	        }

	        if (height) {
	            container.style.height = (0, _lib.toCSS)(height);
	        }
	    },
	    hide: function hide() {
	        this.iframe.style.display = 'none';
	    },
	    show: function show() {
	        this.iframe.style.display = 'block';
	    },
	    restyle: function restyle() {
	        // pass
	    },
	    loadUrl: function loadUrl(url) {
	        this.iframe.src = url;
	    }
	}), _RENDER_DRIVERS);

/***/ },
/* 60 */
/*!******************************************!*\
  !*** ./src/component/parent/validate.js ***!
  \******************************************/
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.validateProp = validateProp;
	exports.validateProps = validateProps;
	exports.validate = validate;
	function validateProp(prop, key, value) {
	    var required = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];


	    var hasProp = value !== null && value !== undefined && value !== '';

	    if (!hasProp) {
	        if (required && prop.required !== false && !prop.hasOwnProperty('def')) {
	            throw new Error('Prop is required: ' + key);
	        }

	        return;
	    }

	    if (value.then && prop.promise) {
	        return;
	    }

	    if (prop.type === 'function') {

	        if (!(value instanceof Function)) {
	            throw new Error('Prop is not of type function: ' + key);
	        }
	    } else if (prop.type === 'string') {

	        if (typeof value !== 'string') {

	            if (!(prop.getter && (value instanceof Function || value && value.then))) {
	                throw new Error('Prop is not of type string: ' + key);
	            }
	        }
	    } else if (prop.type === 'object') {

	        // Since we're sending everything by post-message, everything must be json serializable

	        try {
	            JSON.stringify(value);
	        } catch (err) {
	            throw new Error('Unable to serialize prop: ' + key);
	        }
	    } else if (prop.type === 'number') {

	        if (isNaN(parseInt(value, 10))) {
	            throw new Error('Prop is not a number: ' + key);
	        }
	    }

	    if (typeof prop.validate === 'function') {
	        prop.validate(value);
	    }
	}

	/*  Validate Props
	    --------------

	    Validate user-defined props. Users can pass props down from the parent into the child component, but first we
	    double check the values are what we expect, based on the props spec defined in the original component.
	*/

	function validateProps(component, props) {
	    var required = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];


	    props = props || {};

	    // Set aliases

	    for (var _iterator = Object.keys(component.props), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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

	        var prop = component.props[key];

	        if (prop.alias && props.hasOwnProperty(prop.alias)) {

	            var value = props[prop.alias];
	            delete props[prop.alias];

	            if (!props[key]) {
	                props[key] = value;
	            }
	        }
	    }

	    // First make sure all of the props we were sent are actually valid prop names

	    for (var _iterator2 = Object.keys(props), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
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

	        if (!component.props.hasOwnProperty(_key)) {
	            throw new Error('[' + component.tag + '] Invalid prop: ' + _key);
	        }
	    }

	    // Then loop over the props we expect, and make sure they're all present and valid

	    for (var _iterator3 = Object.keys(component.props), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
	        var _ref3;

	        if (_isArray3) {
	            if (_i3 >= _iterator3.length) break;
	            _ref3 = _iterator3[_i3++];
	        } else {
	            _i3 = _iterator3.next();
	            if (_i3.done) break;
	            _ref3 = _i3.value;
	        }

	        var _key2 = _ref3;


	        var _prop = component.props[_key2];
	        var _value = props[_key2];

	        validateProp(_prop, _key2, _value, required);
	    }
	}

	/*  Validate
	    --------

	    Validate parent component options
	*/

	function validate(component, options) {

	    var props = options.props || {};

	    if (props.env && component.envUrls && !component.envUrls[props.env]) {
	        throw new Error('Invalid env: ' + props.env);
	    }
	}

/***/ },
/* 61 */
/*!***************************************!*\
  !*** ./src/component/parent/props.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.normalizeProp = normalizeProp;
	exports.normalizeProps = normalizeProps;
	exports.propsToQuery = propsToQuery;

	var _promise = __webpack_require__(/*! sync-browser-mocks/src/promise */ 13);

	var _validate = __webpack_require__(/*! ./validate */ 60);

	var _lib = __webpack_require__(/*! ../../lib */ 46);

	/*  Normalize Prop
	    --------------

	    Turn prop into normalized value, using defaults, function options, etc.
	*/

	function normalizeProp(component, instance, props, key, value) {

	    var prop = component.props[key];

	    var hasProp = props.hasOwnProperty(key) && value !== null && value !== undefined && value !== '';

	    if (!hasProp && prop.def) {
	        value = prop.def instanceof Function ? prop.def.call(component, props) : prop.def;
	    }

	    if (!value && prop.alias && props[prop.alias]) {
	        value = props[prop.alias];
	    }

	    if (prop.decorate) {
	        value = prop.decorate(value);
	    }

	    if (prop.value) {
	        value = prop.value;
	    }

	    if (prop.getter) {

	        if (!value) {
	            return;
	        }

	        if (value instanceof Function) {
	            value = value.bind(instance);
	        } else {
	            (function () {
	                var val = value;
	                value = function value() {
	                    return val;
	                };
	            })();
	        }

	        value = (0, _lib.getter)(value);

	        if (prop.memoize) {
	            (function () {
	                var val = (0, _lib.memoize)(value);
	                value = function value() {
	                    return val();
	                };
	            })();
	        }

	        return value;
	    }

	    if (prop.type === 'boolean') {

	        value = Boolean(value);
	    } else if (prop.type === 'function') {

	        if (!value) {

	            // If prop.noop is set, make the function a noop

	            if (!value && prop.noop) {
	                value = _lib.noop;

	                if (prop.denodeify) {
	                    value = (0, _lib.denodeify)(value);
	                }

	                if (prop.promisify) {
	                    value = (0, _lib.promisify)(value);
	                }
	            }
	        } else {
	            (function () {

	                value = value.bind(instance);

	                // If prop.denodeify is set, denodeify the function (accepts callback -> returns promise)

	                if (prop.denodeify) {
	                    value = (0, _lib.denodeify)(value);
	                }

	                if (prop.promisify) {
	                    value = (0, _lib.promisify)(value);
	                }

	                // Wrap the function in order to log when it is called

	                var original = value;
	                value = function value() {
	                    component.log('call_prop_' + key);
	                    return original.apply(this, arguments);
	                };

	                // If prop.once is set, ensure the function can only be called once

	                if (prop.once) {
	                    value = (0, _lib.once)(value);
	                }

	                // If prop.memoize is set, ensure the function is memoized (first return value is cached and returned for any future calls)

	                if (prop.memoize) {
	                    value = (0, _lib.memoize)(value);
	                }
	            })();
	        }
	    } else if (prop.type === 'string') {
	        // pass

	    } else if (prop.type === 'object') {
	            // pass

	        } else if (prop.type === 'number') {
	                if (value !== undefined) {
	                    value = parseInt(value, 10);
	                }
	            }

	    return value;
	}

	/*  Normalize Props
	    ---------------

	    Turn props into normalized values, using defaults, function options, etc.
	*/

	function normalizeProps(component, instance, props) {
	    var required = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];


	    props = props || {};
	    var result = {};

	    for (var _iterator = Object.keys(component.props), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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

	        if (required || props.hasOwnProperty(key)) {
	            result[key] = normalizeProp(component, instance, props, key, props[key]);
	        }
	    }

	    return result;
	}

	/*  Props to Query
	    --------------

	    Turn props into an initial query string to open the component with

	    string -> string
	    bool   -> 1
	    object -> json
	    number -> string
	*/

	function propsToQuery(propsDef, props) {

	    var params = {};

	    return _promise.SyncPromise.all(Object.keys(props).map(function (key) {

	        var prop = propsDef[key];
	        var queryParam = key;

	        if (typeof prop.queryParam === 'string') {
	            queryParam = prop.queryParam;
	        }

	        return _promise.SyncPromise.resolve().then(function () {

	            var value = props[key];

	            if (!value) {
	                return;
	            }

	            if (!prop.queryParam) {
	                return;
	            }

	            if (prop.getter) {
	                return value.call().then(function (result) {
	                    (0, _validate.validateProp)(prop, key, result);
	                    return result;
	                });
	            }

	            return value;
	        }).then(function (value) {

	            if (!value) {
	                return;
	            }

	            if (typeof prop.queryParam === 'function') {
	                queryParam = prop.queryParam(value);
	            }

	            var result = void 0;

	            if (typeof value === 'boolean') {
	                result = '1';
	            } else if (typeof value === 'string') {
	                result = value.toString();
	            } else if (typeof value === 'function') {
	                return;
	            } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {

	                if (prop.serialization === 'json') {
	                    result = JSON.stringify(value);
	                } else {
	                    result = (0, _lib.dotify)(value, key);

	                    for (var dotkey in result) {
	                        params[dotkey] = result[dotkey];
	                    }

	                    return;
	                }
	            } else if (typeof value === 'number') {
	                result = value.toString();
	            }

	            params[queryParam] = result;
	        });
	    })).then(function () {
	        return params;
	    });
	}

/***/ },
/* 62 */
/*!*****************************************!*\
  !*** ./src/component/delegate/index.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DelegateComponent = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _base = __webpack_require__(/*! ../base */ 45);

	var _parent = __webpack_require__(/*! ../parent */ 58);

	var _drivers = __webpack_require__(/*! ../parent/drivers */ 59);

	var _lib = __webpack_require__(/*! ../../lib */ 46);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DelegateComponent = exports.DelegateComponent = function (_BaseComponent) {
	    _inherits(DelegateComponent, _BaseComponent);

	    function DelegateComponent(component, source) {
	        var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	        _classCallCheck(this, DelegateComponent);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DelegateComponent).call(this, component, options));

	        _this.component = component;
	        _this.source = source;

	        _this.context = options.context;

	        _this.props = options.props;

	        _this.props = {
	            uid: options.props.uid,
	            dimensions: options.props.dimensions,
	            onClose: options.props.onClose,
	            onDisplay: options.props.onDisplay
	        };

	        _this.focus = options.overrides.focus;
	        _this.userClose = options.overrides.userClose;
	        _this.getDomain = options.overrides.getDomain;
	        _this.getParentTemplate = options.overrides.getParentTemplate;

	        var renderToParentOverrides = _drivers.RENDER_DRIVERS[options.context].renderToParentOverrides;

	        for (var _iterator = Object.keys(renderToParentOverrides), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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

	            _this[key] = _parent.ParentComponent.prototype[key];
	        }

	        _this.childWindowName = options.childWindowName;

	        _parent.ParentComponent.prototype.registerActiveComponent.call(_this);

	        _this.watchForClose();
	        return _this;
	    }

	    _createClass(DelegateComponent, [{
	        key: 'watchForClose',
	        value: function watchForClose() {
	            var _this2 = this;

	            var closeListener = (0, _lib.onCloseWindow)(this.source, function () {
	                return _this2.destroy();
	            });

	            (0, _lib.addEventListener)(window, 'beforeunload', closeListener.cancel);
	        }
	    }, {
	        key: 'getOverrides',
	        value: function getOverrides(context) {

	            var renderToParentOverrides = _drivers.RENDER_DRIVERS[context].renderToParentOverrides;

	            var overrides = {};

	            var self = this;

	            var _loop = function _loop() {
	                if (_isArray2) {
	                    if (_i2 >= _iterator2.length) return 'break';
	                    _ref2 = _iterator2[_i2++];
	                } else {
	                    _i2 = _iterator2.next();
	                    if (_i2.done) return 'break';
	                    _ref2 = _i2.value;
	                }

	                var key = _ref2;

	                overrides[key] = function () {
	                    return _parent.ParentComponent.prototype[key].apply(self, arguments);
	                };
	            };

	            for (var _iterator2 = Object.keys(renderToParentOverrides), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
	                var _ref2;

	                var _ret = _loop();

	                if (_ret === 'break') break;
	            }

	            return overrides;
	        }
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            return this.clean.all();
	        }
	    }, {
	        key: 'driver',
	        get: function get() {

	            if (!this.context) {
	                throw new Error('Context not set');
	            }

	            return _drivers.RENDER_DRIVERS[this.context];
	        }
	    }]);

	    return DelegateComponent;
	}(_base.BaseComponent);

/***/ },
/* 63 */
/*!******************************************!*\
  !*** ./src/component/component/props.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.internalProps = undefined;

	var _lib = __webpack_require__(/*! ../../lib */ 46);

	/*  Internal Props
	    --------------

	    We define and use certain props by default, for configuration and events that are used at the framework level.
	    These follow the same format as regular props, and are classed as reserved words that may not be overriden by users.
	*/

	var internalProps = exports.internalProps = {

	    uid: {
	        type: 'string',
	        def: function def() {
	            return (0, _lib.uniqueID)();
	        },

	        queryParam: true
	    },

	    // A custom url to use to render the component

	    url: {
	        type: 'string',
	        required: false,
	        promise: true,
	        sendToChild: false
	    },

	    // The desired env in which the component is being rendered. Used to determine the correct url to use from envUrls

	    env: {
	        type: 'string',
	        required: false,
	        queryParam: true,
	        def: function def() {
	            return this.defaultEnv;
	        }
	    },

	    version: {
	        type: 'string',
	        required: false,
	        queryParam: true
	    },

	    dimensions: {
	        type: 'object',
	        required: false
	    },

	    // A millisecond timeout before onTimeout is called

	    timeout: {
	        type: 'number',
	        required: false
	    },

	    onDisplay: {
	        type: 'function',
	        required: false,
	        noop: true,
	        promisify: true
	    },

	    // When we get an INIT message from the child

	    onEnter: {
	        type: 'function',
	        required: false,
	        noop: true,
	        promisify: true
	    },

	    // When the user closes the component. Defaults to onError if no handler passed.

	    onClose: {
	        type: 'function',
	        required: false,
	        noop: true,
	        once: true,
	        promisify: true
	    },

	    // When we time-out before getting an INIT message from the child. Defaults to onError if no handler passed.

	    onTimeout: {
	        type: 'function',
	        required: false,
	        memoize: true,
	        promisify: true,
	        def: function def() {
	            return function (err) {
	                return this.props.onError(err);
	            };
	        }
	    },

	    // When the component experiences an error

	    onError: {
	        type: 'function',
	        required: false,
	        promisify: true,
	        def: function def() {
	            return function () {
	                // pass
	            };
	        },

	        once: true
	    }
	};

/***/ },
/* 64 */
/*!*********************************************!*\
  !*** ./src/component/component/validate.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.validate = validate;

	var _constants = __webpack_require__(/*! ../../constants */ 56);

	function validateProps(options) {

	    if (options.props && !(_typeof(options.props) === 'object')) {
	        throw new Error('[' + options.tag + '] Expected options.props to be an object');
	    }

	    if (options.props) {
	        for (var _iterator = Object.keys(options.props), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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

	            var prop = options.props[key];

	            if (!prop || !((typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) === 'object')) {
	                throw new Error('[' + options.tag + '] Expected options.props.' + key + ' to be an object');
	            }

	            if (!prop.type) {
	                throw new Error('[' + options.tag + '] Expected prop.type');
	            }

	            if (_constants.PROP_TYPES_LIST.indexOf(prop.type) === -1) {
	                throw new Error('[' + options.tag + '] Expected prop.type to be one of ' + _constants.PROP_TYPES_LIST.join(', '));
	            }

	            if (prop.required && prop.def) {
	                throw new Error('[' + options.tag + '] Required prop can not have a default value');
	            }
	        }
	    }
	}

	function validate(options) {
	    // eslint-ignore-line

	    if (!options.tag || !options.tag.match(/^[a-z0-9-]+$/)) {
	        throw new Error('Invalid options.tag: ' + options.tag);
	    }

	    validateProps(options);

	    if (options.dimensions) {
	        if (typeof options.dimensions.width !== 'number' && typeof options.dimensions.width !== 'string') {
	            throw new Error('[' + options.tag + '] Expected options.dimensions.width to be a number or string');
	        }

	        if (typeof options.dimensions.height !== 'number' && typeof options.dimensions.height !== 'string') {
	            throw new Error('[' + options.tag + '] Expected options.dimensions.height to be a number or string');
	        }
	    }

	    if (options.contexts) {
	        var anyEnabled = false;

	        for (var _iterator2 = Object.keys(options.contexts), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
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


	            if (_constants.CONTEXT_TYPES_LIST.indexOf(context) === -1) {
	                throw new Error('[' + options.tag + '] Unsupported context type: ' + context);
	            }

	            if (options.contexts[context] || options.contexts[context] === undefined) {
	                anyEnabled = true;
	            }
	        }

	        if (!anyEnabled) {
	            throw new Error('[' + options.tag + '] No context type is enabled');
	        }

	        if (options.contexts.iframe !== false) {
	            if (!options.dimensions) {
	                throw new Error('[' + options.tag + '] dimesions.width and dimensions.height required for rendering to iframe');
	            }
	        }
	    }

	    if (options.defaultContext) {
	        if (_constants.CONTEXT_TYPES_LIST.indexOf(options.defaultContext) === -1) {
	            throw new Error('[' + options.tag + '] Unsupported context type: ' + options.defaultContext);
	        }

	        if (options.contexts && !options.contexts[options.defaultContext]) {
	            throw new Error('[' + options.tag + '] Disallowed default context type: ' + options.defaultContext);
	        }
	    }

	    if (options.envUrls) {
	        for (var _iterator3 = Object.keys(options.envUrls), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
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

	            if (!options.envUrls[env]) {
	                throw new Error('[' + options.tag + '] No url specified for env: ' + env);
	            }
	        }
	    }

	    if (options.defaultEnv && !options.envUrls) {
	        throw new Error('[' + options.tag + '] options.envUrls must be set if passing in a defaultEnv');
	    }

	    if (options.defaultEnv && !options.envUrls[options.defaultEnv]) {
	        throw new Error('[' + options.tag + '] Invalid default env: ' + options.defaultEnv);
	    }

	    if ((!options.url || !(typeof options.url === 'string')) && !options.buildUrl) {
	        if (!options.defaultEnv || typeof options.defaultEnv !== 'string') {
	            if (options.envUrls) {
	                throw new Error('[' + options.tag + '] Expected options.defaultEnv to be a string');
	            } else {
	                throw new Error('[' + options.tag + '] Expected options.url to be a string');
	            }
	        }
	    }
	}

/***/ },
/* 65 */
/*!******************************************************!*\
  !*** ./src/component/component/templates/parent.htm ***!
  \******************************************************/
/***/ function(module, exports) {

	module.exports = "<div class=\"{CLASS.XCOMPONENT}-overlay {CLASS.FOCUS}\">\n    <a href=\"#{CLASS.CLOSE}\" class=\"{CLASS.CLOSE}\"></a>\n\n    <div class=\"{CLASS.ELEMENT}\"></div>\n</div>\n\n<style>\n    #{id} .{CLASS.XCOMPONENT}-overlay {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        background-color: rgba(0, 0, 0, 0.8);\n    }\n\n    #{id}.{CLASS.POPUP} .{CLASS.XCOMPONENT}-overlay {\n        cursor: pointer;\n    }\n\n    #{id}.{CLASS.LIGHTBOX} .{CLASS.ELEMENT} {\n        box-shadow: 2px 2px 10px 3px rgba(0, 0, 0, 0.4);\n        position: fixed;\n\n        top: 50%;\n        left: 50%;\n\n        transform: translate3d(-50%, -50%, 0);\n        -webkit-transform: translate3d(-50%, -50%, 0);\n        -moz-transform: translate3d(-50%, -50%, 0);\n        -o-transform: translate3d(-50%, -50%, 0);\n        -ms-transform: translate3d(-50%, -50%, 0);\n    }\n\n    #{id}.{CLASS.LIGHTBOX} iframe {\n        height: 100%;\n        width: 100%;\n    }\n\n    #{id} .{CLASS.CLOSE} {\n        position: absolute;\n        right: 16px;\n        top: 16px;\n        width: 16px;\n        height: 16px;\n        opacity: 0.6;\n    }\n\n    #{id} .{CLASS.CLOSE}:hover {\n        opacity: 1;\n    }\n\n    #{id} .{CLASS.CLOSE}:before, .{CLASS.CLOSE}:after {\n        position: absolute;\n        left: 8px;\n        content: ' ';\n        height: 16px;\n        width: 2px;\n        background-color: white;\n    }\n\n    #{id} .{CLASS.CLOSE}:before {\n        transform: rotate(45deg);\n    }\n\n    #{id} .{CLASS.CLOSE}:after {\n        transform: rotate(-45deg);\n    }\n</style>"

/***/ },
/* 66 */
/*!*********************************************************!*\
  !*** ./src/component/component/templates/component.htm ***!
  \*********************************************************/
/***/ function(module, exports) {

	module.exports = ""

/***/ },
/* 67 */
/*!******************************!*\
  !*** ./src/drivers/index.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _script = __webpack_require__(/*! ./script */ 68);

	Object.keys(_script).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _script[key];
	    }
	  });
	});

	var _react = __webpack_require__(/*! ./react */ 69);

	Object.keys(_react).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _react[key];
	    }
	  });
	});

	var _angular = __webpack_require__(/*! ./angular */ 70);

	Object.keys(_angular).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _angular[key];
	    }
	  });
	});

	var _ember = __webpack_require__(/*! ./ember */ 71);

	Object.keys(_ember).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _ember[key];
	    }
	  });
	});

/***/ },
/* 68 */
/*!*******************************!*\
  !*** ./src/drivers/script.js ***!
  \*******************************/
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var htmlComponent = exports.htmlComponent = {
	    isActive: function isActive() {
	        return true;
	    },
	    register: function register(component) {

	        function render(element) {

	            if (!element || !element.tagName || element.tagName.toLowerCase() !== 'script') {
	                return;
	            }

	            if (!element.attributes.type || element.attributes.type.value !== 'application/x-component') {
	                return;
	            }

	            if (!element.attributes['data-component'] || element.attributes['data-component'].value !== component.tag) {
	                return;
	            }

	            component.log('instantiate_script_component');

	            var props = void 0;

	            eval('props = ' + element.innerText); // eslint-disable-line no-eval

	            var container = document.createElement('div');
	            element.parentNode.replaceChild(container, element);

	            component.render(props, container);
	        }

	        function scan() {
	            var scriptTags = Array.prototype.slice.call(document.getElementsByTagName('script'));

	            for (var _iterator = scriptTags, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	                var _ref;

	                if (_isArray) {
	                    if (_i >= _iterator.length) break;
	                    _ref = _iterator[_i++];
	                } else {
	                    _i = _iterator.next();
	                    if (_i.done) break;
	                    _ref = _i.value;
	                }

	                var element = _ref;

	                render(element);
	            }
	        }

	        scan();
	        document.addEventListener('DOMContentLoaded', scan);
	        window.addEventListener('load', scan);

	        document.addEventListener('DOMNodeInserted', function (event) {
	            render(event.target);
	        });
	    }
	};

/***/ },
/* 69 */
/*!******************************!*\
  !*** ./src/drivers/react.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.react = undefined;

	var _lib = __webpack_require__(/*! ../lib */ 46);

	var react = exports.react = {
	    isActive: function isActive() {
	        return Boolean(window.React);
	    },
	    register: function register(component) {

	        component.react = window.React.createClass({
	            render: function render() {
	                return window.React.createElement('div', null);
	            },
	            componentDidMount: function componentDidMount() {
	                component.log('instantiate_react_component');

	                var el = window.ReactDOM.findDOMNode(this);

	                var parent = component.init((0, _lib.extend)({}, this.props), null, el);

	                this.setState({ parent: parent });

	                parent.render(el);
	            },
	            componentDidUpdate: function componentDidUpdate() {

	                if (this.state && this.state.parent) {
	                    this.state.parent.updateProps((0, _lib.extend)({}, this.props));
	                }
	            }
	        });
	    }
	};

/***/ },
/* 70 */
/*!********************************!*\
  !*** ./src/drivers/angular.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.angular = undefined;

	var _lib = __webpack_require__(/*! ../lib */ 46);

	var angular = exports.angular = {
	    isActive: function isActive() {
	        return Boolean(window.angular);
	    },
	    register: function register(component) {

	        window.angular.module(component.tag, []).directive((0, _lib.dasherizeToCamel)(component.tag), function () {

	            var scope = {};

	            for (var _iterator = Object.keys(component.props), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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

	                scope[key] = '=';
	            }

	            return {
	                scope: scope,

	                restrict: 'E',

	                controller: function controller($scope, $element) {

	                    component.log('instantiate_angular_component');

	                    function getProps() {
	                        var instanceProps = {};
	                        for (var _iterator2 = Object.keys(scope), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
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

	                            instanceProps[key] = $scope[key];
	                        }
	                        return instanceProps;
	                    }

	                    var parent = component.init(getProps(), null, $element[0]);
	                    parent.render($element[0]);

	                    $scope.$watch(function () {
	                        parent.updateProps(getProps());
	                    });
	                }
	            };
	        });
	    }
	};

/***/ },
/* 71 */
/*!******************************!*\
  !*** ./src/drivers/ember.js ***!
  \******************************/
/***/ function(module, exports) {

	"use strict";

/***/ }
/******/ ])
});
;