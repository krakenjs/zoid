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
	exports.PROP_DEFER_TO_URL = undefined;
	exports.create = create;

	var _error = __webpack_require__(/*! ./error */ 1);

	Object.keys(_error).forEach(function (key) {
	    if (key === "default") return;
	    Object.defineProperty(exports, key, {
	        enumerable: true,
	        get: function get() {
	            return _error[key];
	        }
	    });
	});

	var _constants = __webpack_require__(/*! ./constants */ 2);

	Object.defineProperty(exports, 'PROP_DEFER_TO_URL', {
	    enumerable: true,
	    get: function get() {
	        return _constants.PROP_DEFER_TO_URL;
	    }
	});

	var _src = __webpack_require__(/*! post-robot/src */ 9);

	var _src2 = _interopRequireDefault(_src);

	var _component = __webpack_require__(/*! ./component */ 36);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function create(options) {
	    return new _component.Component(options);
	}

	module.exports.postRobot = _src2['default'];
	exports['default'] = module.exports;

/***/ },
/* 1 */
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
/* 2 */
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.PROP_DEFER_TO_URL = exports.MAX_Z_INDEX = exports.CONTEXT_TYPES_LIST = exports.EVENT_NAMES = exports.CLASS_NAMES = exports.CONTEXT_TYPES = exports.PROP_TYPES_LIST = exports.PROP_TYPES = exports.POST_MESSAGE = exports.XCOMPONENT = undefined;

	var _lib = __webpack_require__(/*! ./lib */ 3);

	var XCOMPONENT = exports.XCOMPONENT = 'xcomponent';

	var POST_MESSAGE = exports.POST_MESSAGE = {
	    INIT: XCOMPONENT + '_init',
	    PROPS: XCOMPONENT + '_props',
	    PROP_CALLBACK: XCOMPONENT + '_prop_callback',
	    CLOSE: XCOMPONENT + '_close',
	    REDIRECT: XCOMPONENT + '_redirect',
	    RESIZE: XCOMPONENT + '_resize',
	    RENDER: XCOMPONENT + '_render',
	    ERROR: XCOMPONENT + '_error'
	};

	var PROP_TYPES = exports.PROP_TYPES = {
	    STRING: 'string',
	    OBJECT: 'object',
	    FUNCTION: 'function',
	    BOOLEAN: 'boolean',
	    NUMBER: 'number'
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
	    OVERLAY: XCOMPONENT + '-overlay',
	    ELEMENT: XCOMPONENT + '-element'
	};

	var EVENT_NAMES = exports.EVENT_NAMES = {
	    CLICK: 'click'
	};

	var CONTEXT_TYPES_LIST = exports.CONTEXT_TYPES_LIST = (0, _lib.values)(CONTEXT_TYPES);

	var MAX_Z_INDEX = exports.MAX_Z_INDEX = 2147483647;

	var PROP_DEFER_TO_URL = exports.PROP_DEFER_TO_URL = 'xcomponent_prop_defer_to_url';

/***/ },
/* 3 */
/*!**************************!*\
  !*** ./src/lib/index.js ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _dom = __webpack_require__(/*! ./dom */ 4);

	Object.keys(_dom).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _dom[key];
	    }
	  });
	});

	var _fn = __webpack_require__(/*! ./fn */ 5);

	Object.keys(_fn).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _fn[key];
	    }
	  });
	});

	var _promise = __webpack_require__(/*! ./promise */ 7);

	Object.keys(_promise).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _promise[key];
	    }
	  });
	});

	var _util = __webpack_require__(/*! ./util */ 6);

	Object.keys(_util).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _util[key];
	    }
	  });
	});

/***/ },
/* 4 */
/*!************************!*\
  !*** ./src/lib/dom.js ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getElement = getElement;
	exports.popup = popup;
	exports.iframe = iframe;
	exports.isWindowClosed = isWindowClosed;
	exports.onCloseWindow = onCloseWindow;
	exports.addEventListener = addEventListener;
	exports.getParentWindow = getParentWindow;
	exports.getParentNode = getParentNode;
	exports.scanForJavascript = scanForJavascript;
	exports.createElement = createElement;
	exports.hijackButton = hijackButton;
	exports.addEventToClass = addEventToClass;
	exports.template = template;
	exports.getUrlParams = getUrlParams;
	exports.getUrlParam = getUrlParam;

	var _fn = __webpack_require__(/*! ./fn */ 5);

	var _util = __webpack_require__(/*! ./util */ 6);

	/*  Get Element
	    -----------

	    Gets an element based on

	    - Element id
	    - CSS Query selector
	*/

	function getElement(id) {
	    if (id instanceof window.Element) {
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

	    return win;
	}

	/*  Iframe
	    ------

	    Open an iframe with the specified container, url, and option property map
	*/

	function iframe(container, url, options) {

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

	    container.appendChild(frame);

	    return frame;
	}

	/*  Is Window Closed
	    ----------------

	    Determine if a window is closed
	*/

	function isWindowClosed(win) {
	    try {
	        return !win || win.closed || typeof win.closed === 'undefined' || (0, _util.safeGet)(win, 'mockclosed');
	    } catch (err) {
	        return true;
	    }
	}

	/*  On Close Window
	    ---------------

	    Wait for the specified window to close or cease to exist, then call the callback
	*/

	function onCloseWindow(win, callback) {

	    callback = (0, _fn.once)(callback);

	    var isFunction = win instanceof Function;

	    var interval = void 0;

	    var checkWindowClosed = function checkWindowClosed() {

	        var myWin = void 0;

	        try {
	            myWin = isFunction ? win() : win;
	        } catch (err) {
	            // pass
	        }

	        if (isWindowClosed(myWin)) {
	            clearInterval(interval);
	            return callback();
	        }
	    };

	    interval = (0, _util.safeInterval)(checkWindowClosed, 50);
	    checkWindowClosed();

	    var close = win.close;

	    try {
	        win.close = function () {
	            close.apply(this, arguments);
	            checkWindowClosed();
	        };
	    } catch (err) {
	        // pass
	    }

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

	/*  Get Parent Window
	    -----------------

	    Get the parent window depending on whether we are in an iframe or a popup
	*/

	function getParentWindow(win) {

	    win = win || window;

	    if (win.opener) {
	        return win.opener;
	    }

	    if (win.parent && win.parent !== win) {
	        return win.parent;
	    }
	}

	/*  Get Parent Node
	    ---------------

	    Get the parent element with the specified tag name
	*/

	function getParentNode(el, tag) {
	    tag = tag.toLowerCase();

	    while (el.parentNode) {
	        el = el.parentNode;
	        if (el.tagName.toLowerCase() === tag) {
	            return el;
	        }
	    }
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

	    if (container) {
	        container.appendChild(element);
	    }

	    return element;
	}

	/*  Hijack Button
	    -------------

	    Hijack a button's click event to set a
	*/

	function hijackButton(element, callback) {
	    var el = getElement(element);

	    if (!el) {
	        throw new Error('Can not find element: ' + element);
	    }

	    // For links, we can set the target directly on the link. But for form buttons, we need to set the target on the form itself.

	    var targetElement = el.form ? el.form : el;

	    // Then we wait for the click event

	    el.addEventListener('click', function (event) {
	        callback(event, targetElement);
	    });
	}

	/*  Add Event To Class
	    ------------------

	    Find all elements with a class and add an event handler
	*/

	function addEventToClass(element, className, eventName, handler) {
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

	        el.addEventListener(eventName, function (event) {
	            event.preventDefault();
	            event.stopPropagation();
	            handler();
	        });
	    }
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

	function getUrlParams(queryString) {

	    queryString = queryString || window.location.search.slice(1);

	    var params = {};

	    if (!queryString) {
	        return params;
	    }

	    for (var _iterator4 = queryString.split('&'), _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
	        var _ref4;

	        if (_isArray4) {
	            if (_i4 >= _iterator4.length) break;
	            _ref4 = _iterator4[_i4++];
	        } else {
	            _i4 = _iterator4.next();
	            if (_i4.done) break;
	            _ref4 = _i4.value;
	        }

	        var pair = _ref4;

	        pair = pair.split('=');

	        if (pair[0] && pair[1]) {
	            params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
	        }
	    }

	    return params;
	}

	function getUrlParam(name) {
	    return getUrlParams()[name];
	}

/***/ },
/* 5 */
/*!***********************!*\
  !*** ./src/lib/fn.js ***!
  \***********************/
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.noop = noop;
	exports.once = once;
	exports.memoize = memoize;

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

	        var args = void 0;

	        try {
	            args = JSON.stringify(arguments);
	        } catch (err) {
	            throw new Error('Arguments not serializable -- can not be used to memoize');
	        }

	        if (!results.hasOwnProperty(args)) {
	            results[args] = method.apply(this, arguments);
	        }

	        return results[args];
	    };
	}

/***/ },
/* 6 */
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
	exports.b64encode = b64encode;
	exports.b64decode = b64decode;
	exports.stringifyWithFunctions = stringifyWithFunctions;
	exports.safeGet = safeGet;
	exports.capitalizeFirstLetter = capitalizeFirstLetter;
	exports.get = get;
	exports.safeInterval = safeInterval;
	exports.safeTimeout = safeTimeout;

	/*  Url Encode
	    ----------

	    Replace ? and & with encoded values. Allows other values (to create more readable urls than encodeUriComponent)
	*/

	function urlEncode(str) {
	    return str.replace(/\?/g, '%3F').replace(/\&/g, '%26');
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

	/*  Base 64 Encode
	    --------------

	    Base 64 encode a string
	*/

	function b64encode(str) {
	    return window.btoa(str).replace(/[=]/g, '_');
	}

	/*  Base 64 Decode
	    --------------

	    Base 64 decode a string
	*/

	function b64decode(str) {
	    return window.atob(str.replace(/[_]/g, '='));
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

/***/ },
/* 7 */
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

	var _promise = __webpack_require__(/*! sync-browser-mocks/src/promise */ 8);

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

	            if (result !== undefined) {
	                return resolve(result);
	            }
	        });
	    };
	}

/***/ },
/* 8 */
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
	    var err, res;

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

	var SyncPromise = exports.SyncPromise = function SyncPromise(handler) {

	    this.resolved = false;
	    this.rejected = false;

	    this.handlers = [];

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

	    if (value && value.then) {
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

	    if (result && result.then) {
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

	    if (error && error.then) {
	        throw new Error('Can not reject promise with another promise');
	    }

	    this.rejected = true;
	    this.value = error;
	    this.dispatch();

	    return this;
	};

	SyncPromise.prototype.dispatch = function () {

	    if (!this.resolved && !this.rejected) {
	        return;
	    }

	    while (this.handlers.length) {

	        var handler = this.handlers.shift();

	        var result, error;

	        try {
	            if (this.resolved) {
	                result = handler.onSuccess ? handler.onSuccess(this.value) : this.value;
	            } else {
	                if (handler.onError) {
	                    result = handler.onError(this.value);
	                } else {
	                    error = this.value;
	                }
	            }
	        } catch (err) {
	            error = err;
	        }

	        if (result === this) {
	            throw new Error('Can not return a promise from the the then handler of the same promise');
	        }

	        if (error) {
	            handler.promise.reject(error);
	        } else if (result && result.then) {
	            result.then(function (res) {
	                handler.promise.resolve(res);
	            }, function (err) {
	                handler.promise.reject(err);
	            });
	        } else {
	            handler.promise.resolve(result);
	        }
	    }
	};

	SyncPromise.prototype.then = function (onSuccess, onError) {

	    var promise = new SyncPromise();

	    this.handlers.push({
	        promise: promise,
	        onSuccess: onSuccess,
	        onError: onError
	    });

	    this.dispatch();

	    return promise;
	};

	SyncPromise.prototype['catch'] = function (onError) {
	    return this.then(null, onError);
	};

	SyncPromise.prototype['finally'] = function (handler) {
	    return this.then(function (result) {
	        handler();
	        return result;
	    }, function (error) {
	        handler();
	        throw error;
	    });
	};

	SyncPromise.all = function (promises) {

	    var promise = new SyncPromise();
	    var count = promises.length;
	    var results = [];

	    for (var i = 0; i < promises.length; i++) {
	        promises[i].then(function (result) {
	            results[i] = result;
	            count -= 1;
	            if (count === 0) {
	                promise.resolve(results);
	            }
	        }, function (err) {
	            promise.reject(err);
	        });
	    }

	    return promise;
	};

	function patchPromise() {
	    window.Promise = SyncPromise;
	}

/***/ },
/* 9 */
/*!***********************************!*\
  !*** ./~/post-robot/src/index.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Promise = undefined;

	var _interface = __webpack_require__(/*! ./interface */ 10);

	Object.keys(_interface).forEach(function (key) {
	    if (key === "default") return;
	    Object.defineProperty(exports, key, {
	        enumerable: true,
	        get: function get() {
	            return _interface[key];
	        }
	    });
	});

	var _lib = __webpack_require__(/*! ./lib */ 17);

	Object.defineProperty(exports, 'Promise', {
	    enumerable: true,
	    get: function get() {
	        return _lib.Promise;
	    }
	});

	var _drivers = __webpack_require__(/*! ./drivers */ 15);

	var _compat = __webpack_require__(/*! ./compat */ 25);

	function init() {

	    (0, _compat.registerGlobals)();

	    // Listen for all incoming post-messages
	    _lib.util.listen(window, 'message', _drivers.messageListener);

	    (0, _lib.initOnReady)();
	}

	init();

	exports['default'] = module.exports;

/***/ },
/* 10 */
/*!*********************************************!*\
  !*** ./~/post-robot/src/interface/index.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.util = exports.openBridge = exports.reset = exports.parent = undefined;

	var _client = __webpack_require__(/*! ./client */ 11);

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

	var _proxy = __webpack_require__(/*! ./proxy */ 34);

	Object.keys(_proxy).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _proxy[key];
	    }
	  });
	});

	var _config = __webpack_require__(/*! ./config */ 35);

	Object.keys(_config).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _config[key];
	    }
	  });
	});

	var _drivers = __webpack_require__(/*! ../drivers */ 15);

	Object.defineProperty(exports, 'reset', {
	  enumerable: true,
	  get: function get() {
	    return _drivers.resetListeners;
	  }
	});

	var _bridge = __webpack_require__(/*! ../compat/bridge */ 26);

	Object.defineProperty(exports, 'openBridge', {
	  enumerable: true,
	  get: function get() {
	    return _bridge.openBridge;
	  }
	});

	var _util = __webpack_require__(/*! ../lib/util */ 20);

	Object.defineProperty(exports, 'util', {
	  enumerable: true,
	  get: function get() {
	    return _util.util;
	  }
	});

	var _windows = __webpack_require__(/*! ../lib/windows */ 22);

	var parent = exports.parent = (0, _windows.getParentWindow)();

/***/ },
/* 11 */
/*!**********************************************!*\
  !*** ./~/post-robot/src/interface/client.js ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.request = request;
	exports.send = send;
	exports.sendToParent = sendToParent;

	var _conf = __webpack_require__(/*! ../conf */ 12);

	var _drivers = __webpack_require__(/*! ../drivers */ 15);

	var _lib = __webpack_require__(/*! ../lib */ 17);

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

	        var hash = options.name + '_' + _lib.util.uniqueID();
	        _drivers.listeners.response[hash] = options;

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

	            if ((0, _lib.getParentWindow)(options.window) === window) {
	                return (0, _lib.onWindowReady)(options.window);
	            }
	        }).then(function () {

	            (0, _drivers.sendMessage)(options.window, {
	                hash: hash,
	                type: _conf.CONSTANTS.POST_MESSAGE_TYPE.REQUEST,
	                name: options.name,
	                data: options.data,
	                fireAndForget: options.fireAndForget
	            }, options.domain || '*')['catch'](reject);

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

	function send(window, name, data, options, callback) {

	    if (!callback) {
	        if (!options && data instanceof Function) {
	            callback = data;
	            options = {};
	            data = {};
	        } else if (options instanceof Function) {
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

	function sendToParent(name, data, options, callback) {

	    var win = (0, _lib.getParentWindow)();

	    if (!window) {
	        throw new Error('Window does not have a parent');
	    }

	    return send(win, name, data, options, callback);
	}

/***/ },
/* 12 */
/*!****************************************!*\
  !*** ./~/post-robot/src/conf/index.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _config = __webpack_require__(/*! ./config */ 13);

	Object.keys(_config).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _config[key];
	    }
	  });
	});

	var _constants = __webpack_require__(/*! ./constants */ 14);

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
/* 13 */
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

	var _constants = __webpack_require__(/*! ./constants */ 14);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var CONFIG = exports.CONFIG = {

	    ALLOW_POSTMESSAGE_POPUP: false,

	    LOG_LEVEL: 'info',

	    ACK_TIMEOUT: 500,

	    LOG_TO_PAGE: false,

	    MOCK_MODE: false,

	    ALLOWED_POST_MESSAGE_METHODS: (_ALLOWED_POST_MESSAGE = {}, _defineProperty(_ALLOWED_POST_MESSAGE, _constants.CONSTANTS.SEND_STRATEGIES.POST_MESSAGE, true), _defineProperty(_ALLOWED_POST_MESSAGE, _constants.CONSTANTS.SEND_STRATEGIES.GLOBAL_METHOD, true), _defineProperty(_ALLOWED_POST_MESSAGE, _constants.CONSTANTS.SEND_STRATEGIES.FOREIGN_BRIDGE, true), _defineProperty(_ALLOWED_POST_MESSAGE, _constants.CONSTANTS.SEND_STRATEGIES.LOCAL_BRIDGE, true), _ALLOWED_POST_MESSAGE)
	};

/***/ },
/* 14 */
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
	        READY: 'postrobot_ready'
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
	        METHOD: 'postrobot_method'
	    },

	    SEND_STRATEGIES: {
	        POST_MESSAGE: 'postrobot_post_message',
	        GLOBAL_METHOD: 'postrobot_global_method',
	        FOREIGN_BRIDGE: 'postrobot_foreign_bridge',
	        LOCAL_BRIDGE: 'postrobot_local_bridge'
	    }
	};

	var POST_MESSAGE_NAMES_LIST = exports.POST_MESSAGE_NAMES_LIST = Object.keys(CONSTANTS.POST_MESSAGE_NAMES).map(function (key) {
	    return CONSTANTS.POST_MESSAGE_NAMES[key];
	});

/***/ },
/* 15 */
/*!*******************************************!*\
  !*** ./~/post-robot/src/drivers/index.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _receive = __webpack_require__(/*! ./receive */ 16);

	Object.keys(_receive).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _receive[key];
	    }
	  });
	});

	var _send = __webpack_require__(/*! ./send */ 29);

	Object.keys(_send).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _send[key];
	    }
	  });
	});

	var _listeners = __webpack_require__(/*! ./listeners */ 31);

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
/* 16 */
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

	var _conf = __webpack_require__(/*! ../../conf */ 12);

	var _lib = __webpack_require__(/*! ../../lib */ 17);

	var _compat = __webpack_require__(/*! ../../compat */ 25);

	var _send = __webpack_require__(/*! ../send */ 29);

	var _listeners = __webpack_require__(/*! ../listeners */ 31);

	var _types = __webpack_require__(/*! ./types */ 32);

	var receivedMessages = [];

	function parseMessage(message) {

	    try {
	        message = JSON.parse(message);
	    } catch (err) {
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

	function getWindow(hint, windowID) {

	    var windowTargets = {
	        'window.parent': function windowParent(id) {
	            return window.parent;
	        },
	        'window.opener': function windowOpener(id) {
	            return (0, _lib.getOpener)(window);
	        },
	        'window.parent.opener': function windowParentOpener(id) {
	            return (0, _lib.getOpener)(window.parent);
	        }
	    };

	    var win = void 0;

	    try {
	        win = windowTargets[hint](windowID);
	    } catch (err) {
	        throw new Error('Can not get ' + hint + ': ' + err.message);
	    }

	    if (!win) {
	        throw new Error('Can not get ' + hint + ': not available');
	    }

	    return win;
	}

	function getProxy(source, message) {

	    if (_conf.CONFIG.MOCK_MODE) {
	        return;
	    }

	    if (!message) {
	        return;
	    }

	    var listener = (0, _listeners.getRequestListener)(message.name, source);

	    if (message.type === _conf.CONSTANTS.POST_MESSAGE_TYPE.REQUEST && message.name && listener && listener.proxy === false) {
	        return;
	    }

	    var isResponseOrAck = (message.type === _conf.CONSTANTS.POST_MESSAGE_TYPE.REQUEST || message.type === _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK) && _listeners.listeners.response[message.hash];

	    if (!isResponseOrAck) {
	        for (var i = 0; i < _listeners.listeners.proxies.length; i++) {
	            var proxy = _listeners.listeners.proxies[i];

	            if (source === proxy.from) {
	                return proxy.to;
	            }
	        }
	    }

	    if (message.targetHint) {
	        var win = getWindow(message.targetHint, message.target);
	        delete message.targetHint;
	        return win;
	    }

	    if (message.target && message.target !== (0, _lib.getWindowId)(window)) {

	        var _win = (0, _lib.getWindowById)(message.target);

	        if (!_win) {
	            throw new Error('Unable to find window to proxy message to: ' + message.target);
	        }

	        return _win;
	    }
	}

	function receiveMessage(event) {

	    try {
	        event.source; // eslint-disable-line
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

	    if (receivedMessages.indexOf(message.id) === -1) {
	        receivedMessages.push(message.id);
	    } else {
	        return;
	    }

	    (0, _lib.registerWindow)(message.source, source);

	    var proxyWindow = void 0;

	    try {
	        proxyWindow = getProxy(source, message);
	    } catch (err) {
	        return _lib.log.debug(err.message);
	    }

	    var level = void 0;

	    if (_conf.POST_MESSAGE_NAMES_LIST.indexOf(message.name) !== -1 || message.type === _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK || proxyWindow) {
	        level = 'debug';
	    } else if (message.ack === 'error') {
	        level = 'error';
	    } else {
	        level = 'info';
	    }

	    _lib.log.logLevel(level, [proxyWindow ? '#receiveproxy' : '#receive', message.type, message.name, message]);

	    if (proxyWindow) {

	        if ((0, _lib.isWindowClosed)(proxyWindow)) {
	            return _lib.log.debug('Target window is closed: ' + message.target + ' - can not proxy ' + message.type + ' ' + message.name);
	        }

	        delete message.target;
	        return (0, _send.sendMessage)(proxyWindow, message, message.domain || '*', true);
	    }

	    if (message.originalSource !== message.source) {

	        if (message.sourceHint) {
	            source = getWindow(message.sourceHint, message.originalSource);
	            delete message.sourceHint;
	        } else {
	            var originalSource = (0, _lib.getWindowById)(message.originalSource);
	            if (originalSource) {
	                source = originalSource;
	            } else {
	                throw new Error('Can not find original message source: ' + message.originalSource);
	            }
	        }

	        (0, _lib.registerWindow)(message.originalSource, source);
	    }

	    if ((0, _lib.isWindowClosed)(source)) {
	        return _lib.log.debug('Source window is closed: ' + message.originalSource + ' - can not send ' + message.type + ' ' + message.name);
	    }

	    if (_conf.CONFIG.MOCK_MODE) {
	        return _types.RECEIVE_MESSAGE_TYPES[message.type](source, message, origin);
	    }

	    if (message.data) {
	        message.data = (0, _lib.deserializeMethods)(source, message.data);
	    }

	    _types.RECEIVE_MESSAGE_TYPES[message.type](source, message, origin);
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

/***/ },
/* 17 */
/*!***************************************!*\
  !*** ./~/post-robot/src/lib/index.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _promise = __webpack_require__(/*! ./promise */ 18);

	Object.keys(_promise).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _promise[key];
	    }
	  });
	});

	var _util = __webpack_require__(/*! ./util */ 20);

	Object.keys(_util).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _util[key];
	    }
	  });
	});

	var _log = __webpack_require__(/*! ./log */ 21);

	Object.keys(_log).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _log[key];
	    }
	  });
	});

	var _windows = __webpack_require__(/*! ./windows */ 22);

	Object.keys(_windows).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _windows[key];
	    }
	  });
	});

	var _methods = __webpack_require__(/*! ./methods */ 23);

	Object.keys(_methods).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _methods[key];
	    }
	  });
	});

	var _tick = __webpack_require__(/*! ./tick */ 19);

	Object.keys(_tick).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _tick[key];
	    }
	  });
	});

	var _ready = __webpack_require__(/*! ./ready */ 24);

	Object.keys(_ready).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _ready[key];
	    }
	  });
	});

/***/ },
/* 18 */
/*!*****************************************!*\
  !*** ./~/post-robot/src/lib/promise.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.promise = exports.Promise = undefined;

	var _promise = __webpack_require__(/*! sync-browser-mocks/src/promise */ 8);

	var _tick = __webpack_require__(/*! ./tick */ 19);

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
/* 19 */
/*!**************************************!*\
  !*** ./~/post-robot/src/lib/tick.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.nextTick = nextTick;

	var _util = __webpack_require__(/*! ./util */ 20);

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
/* 20 */
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

	var _conf = __webpack_require__(/*! ../conf */ 12);

	var util = exports.util = {
	    isPopup: function isPopup() {
	        return Boolean(window.opener);
	    },
	    isIframe: function isIframe() {
	        return Boolean(window.parent && window !== window.parent);
	    },
	    isFullpage: function isFullpage() {
	        return Boolean(!util.isIframe() && !util.isPopup());
	    },
	    getType: function getType() {
	        if (util.isPopup()) {
	            return _conf.CONSTANTS.WINDOW_TYPES.POPUP;
	        }
	        if (util.isIframe()) {
	            return _conf.CONSTANTS.WINDOW_TYPES.IFRAME;
	        }
	        return _conf.CONSTANTS.WINDOW_TYPES.FULLPAGE;
	    },
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
	        if (method.apply instanceof Function) {
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
	        if (obj instanceof Array) {
	            for (var i = 0; i < obj.length; i++) {
	                callback(obj[i], i);
	            }
	        } else if (obj instanceof Object && !(obj instanceof Function)) {
	            for (var key in obj) {
	                if (obj.hasOwnProperty(key)) {
	                    callback(obj[key], key);
	                }
	            }
	        }
	    },
	    replaceObject: function replaceObject(obj, callback) {

	        var newobj = obj instanceof Array ? [] : {};

	        util.each(obj, function (item, key) {

	            var result = callback(item, key);

	            if (result !== undefined) {
	                newobj[key] = result;
	            } else if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && item !== null) {
	                newobj[key] = util.replaceObject(item, callback);
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
	        return win.mockDomain || win.location.protocol + '//' + win.location.host;
	    }
	};

/***/ },
/* 21 */
/*!*************************************!*\
  !*** ./~/post-robot/src/lib/log.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.log = undefined;

	var _util = __webpack_require__(/*! ./util */ 20);

	var _conf = __webpack_require__(/*! ../conf */ 12);

	var LOG_LEVELS = ['debug', 'info', 'warn', 'error'];

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
	                    return toString.call(item);
	                }
	                var json = void 0;
	                try {
	                    json = JSON.stringify(item, 0, 2);
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

	        if (LOG_LEVELS.indexOf(level) < LOG_LEVELS.indexOf(_conf.CONFIG.LOG_LEVEL)) {
	            return;
	        }

	        args = Array.prototype.slice.call(args);

	        args.unshift(window.location.host);
	        args.unshift(_util.util.getType().toLowerCase());
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
/* 22 */
/*!*****************************************!*\
  !*** ./~/post-robot/src/lib/windows.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.isSameDomain = isSameDomain;
	exports.isWindowClosed = isWindowClosed;
	exports.getOpener = getOpener;
	exports.getParentWindow = getParentWindow;
	exports.getWindowId = getWindowId;
	exports.getWindowById = getWindowById;
	exports.registerWindow = registerWindow;
	exports.isWindowEqual = isWindowEqual;
	exports.isSameTopWindow = isSameTopWindow;

	var _util = __webpack_require__(/*! ./util */ 20);

	function safeGet(obj, prop) {

	    var result = void 0;

	    try {
	        result = obj[prop];
	    } catch (err) {
	        // pass
	    }

	    return result;
	}

	var domainMatches = [];

	function isSameDomain(win) {

	    for (var _iterator = domainMatches, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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

	            if (!_match.match) {
	                return false;
	            }

	            _match.match = false;

	            try {
	                _match.match = _util.util.getDomain(window) === _util.util.getDomain(win);
	            } catch (err) {
	                return;
	            }

	            return _match.match;
	        }
	    }

	    var match = false;

	    try {
	        if (_util.util.getDomain(window) === _util.util.getDomain(win)) {
	            match = true;
	        }
	    } catch (err) {
	        // pass
	    }

	    domainMatches.push({
	        win: win,
	        match: match
	    });

	    return match;
	}

	function isWindowClosed(win) {
	    try {
	        return !win || win.closed || typeof win.closed === 'undefined' || isSameDomain(win) && safeGet(win, 'mockclosed');
	    } catch (err) {
	        return true;
	    }
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

	function getParentWindow(win) {
	    win = win || window;

	    var opener = getOpener(win);

	    if (opener) {
	        return opener;
	    }

	    if (win.parent !== win) {
	        return win.parent;
	    }
	}

	var windows = [];
	var windowId = window.name || _util.util.getType() + '_' + _util.util.uniqueID();

	function getWindowId(win) {

	    if (win === window) {
	        return windowId;
	    }

	    for (var i = windows.length - 1; i >= 0; i--) {
	        var map = windows[i];

	        try {
	            if (map.win === win) {
	                return map.id;
	            }
	        } catch (err) {
	            continue;
	        }
	    }
	}

	function getWindowById(id) {

	    if (id === window.name || id === windowId) {
	        return window;
	    }

	    if (window.frames && window.frames[id]) {
	        return window.frames[id];
	    }

	    for (var i = windows.length - 1; i >= 0; i--) {
	        var map = windows[i];

	        try {
	            if (map.id === id) {
	                return map.win;
	            }
	        } catch (err) {
	            continue;
	        }
	    }
	}

	function registerWindow(id, win) {

	    for (var _iterator2 = windows, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
	        var _ref2;

	        if (_isArray2) {
	            if (_i2 >= _iterator2.length) break;
	            _ref2 = _iterator2[_i2++];
	        } else {
	            _i2 = _iterator2.next();
	            if (_i2.done) break;
	            _ref2 = _i2.value;
	        }

	        var map = _ref2;

	        try {
	            if (map.id === id && map.win === win) {
	                return;
	            }
	        } catch (err) {
	            continue;
	        }

	        if (map.id === id && map.win !== win) {
	            if (!isWindowClosed(map.win)) {
	                throw new Error('Can not register a duplicate window with name ' + id);
	            }
	        }
	    }

	    windows.push({
	        id: id,
	        win: win
	    });
	}

	function isWindowEqual(win1, win2) {

	    if (win1 === win2) {
	        return true;
	    }

	    var id1 = getWindowId(win1);
	    var id2 = getWindowId(win2);

	    if (id1 && id2 && id1 === id2) {
	        return true;
	    }

	    return false;
	}

	function isSameTopWindow(win1, win2) {
	    try {
	        return win1.top === win2.top;
	    } catch (err) {
	        return false;
	    }
	}

	var openWindow = window.open;

	window.open = function (url, name, x, y) {

	    if (!name) {
	        name = _util.util.uniqueID();
	        arguments[1] = name;
	    }

	    var win = _util.util.apply(openWindow, this, arguments);

	    registerWindow(name, win);

	    return win;
	};

/***/ },
/* 23 */
/*!*****************************************!*\
  !*** ./~/post-robot/src/lib/methods.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.listenForMethods = undefined;
	exports.serializeMethod = serializeMethod;
	exports.serializeMethods = serializeMethods;
	exports.deserializeMethod = deserializeMethod;
	exports.deserializeMethods = deserializeMethods;

	var _conf = __webpack_require__(/*! ../conf */ 12);

	var _util = __webpack_require__(/*! ./util */ 20);

	var _interface = __webpack_require__(/*! ../interface */ 10);

	var _log = __webpack_require__(/*! ./log */ 21);

	var _promise = __webpack_require__(/*! ./promise */ 18);

	var methods = {};

	var listenForMethods = exports.listenForMethods = _util.util.once(function () {
	    (0, _interface.on)(_conf.CONSTANTS.POST_MESSAGE_NAMES.METHOD, function (source, data) {

	        if (!methods[data.id]) {
	            throw new Error('Could not find method with id: ' + data.id);
	        }

	        if (methods[data.id].win !== source) {
	            throw new Error('Method window does not match');
	        }

	        var method = methods[data.id].method;

	        _log.log.debug('Call local method', data.name, data.args);

	        return _promise.promise.run(function () {
	            return method.apply(null, data.args);
	        }).then(function (result) {

	            return {
	                result: result,
	                id: data.id,
	                name: data.name
	            };
	        });
	    });
	});

	function isSerializedMethod(item) {
	    return item instanceof Object && item.__type__ === _conf.CONSTANTS.SERIALIZATION_TYPES.METHOD && item.__id__;
	}

	function serializeMethod(destination, method, name) {

	    var id = _util.util.uniqueID();

	    methods[id] = {
	        win: destination,
	        method: method
	    };

	    return {
	        __type__: _conf.CONSTANTS.SERIALIZATION_TYPES.METHOD,
	        __id__: id,
	        __name__: name
	    };
	}

	function serializeMethods(destination, obj) {

	    listenForMethods();

	    return _util.util.replaceObject({ obj: obj }, function (item, key) {
	        if (item instanceof Function) {
	            return serializeMethod(destination, item, key);
	        }
	    }).obj;
	}

	function deserializeMethod(source, obj) {

	    function wrapper() {
	        var args = Array.prototype.slice.call(arguments);
	        _log.log.debug('Call foreign method', obj.__name__, args);
	        return (0, _interface.send)(source, _conf.CONSTANTS.POST_MESSAGE_NAMES.METHOD, {
	            id: obj.__id__,
	            name: obj.__name__,
	            args: args

	        }).then(function (data) {

	            _log.log.debug('Got foreign method result', obj.__name__, data.result);
	            return data.result;
	        });
	    }

	    wrapper.__name__ = obj.__name__;

	    return wrapper;
	}

	function deserializeMethods(source, obj) {

	    return _util.util.replaceObject({ obj: obj }, function (item, key) {
	        if (isSerializedMethod(item)) {
	            return deserializeMethod(source, item);
	        }
	    }).obj;
	}

/***/ },
/* 24 */
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

	var _conf = __webpack_require__(/*! ../conf */ 12);

	var _windows = __webpack_require__(/*! ./windows */ 22);

	var _interface = __webpack_require__(/*! ../interface */ 10);

	var _log = __webpack_require__(/*! ./log */ 21);

	var _promise = __webpack_require__(/*! ./promise */ 18);

	var readyWindows = [];
	var readyPromises = [];

	function initOnReady() {

	    (0, _interface.on)(_conf.CONSTANTS.POST_MESSAGE_NAMES.READY, function (source, data) {
	        readyWindows.push(source);

	        for (var _iterator = readyPromises, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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

	            if (item.win === source) {
	                item.resolve(item.win);
	            }
	        }
	    });

	    var parent = (0, _windows.getParentWindow)();

	    if (parent) {
	        (0, _interface.send)(parent, _conf.CONSTANTS.POST_MESSAGE_NAMES.READY, {})['catch'](function (err) {
	            _log.log.debug(err.stack || err.toString());
	        });
	    }
	}

	function onWindowReady(win) {
	    return new _promise.promise.Promise(function (resolve) {
	        if (readyWindows.indexOf(win) !== -1) {
	            return resolve(win);
	        } else {
	            readyPromises.push({
	                win: win,
	                resolve: resolve
	            });
	        }
	    });
	}

/***/ },
/* 25 */
/*!******************************************!*\
  !*** ./~/post-robot/src/compat/index.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _bridge = __webpack_require__(/*! ./bridge */ 26);

	Object.keys(_bridge).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _bridge[key];
	    }
	  });
	});

	var _global = __webpack_require__(/*! ./global */ 27);

	Object.keys(_global).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _global[key];
	    }
	  });
	});

	var _ie = __webpack_require__(/*! ./ie */ 28);

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
/* 26 */
/*!*******************************************!*\
  !*** ./~/post-robot/src/compat/bridge.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.openBridge = undefined;
	exports.getBridge = getBridge;
	exports.getBridgeFor = getBridgeFor;

	var _conf = __webpack_require__(/*! ../conf */ 12);

	var _lib = __webpack_require__(/*! ../lib */ 17);

	var BRIDGE_NAME_PREFIX = 'postrobot_bridge';

	var bridge = void 0;

	var openBridge = exports.openBridge = _lib.util.memoize(function (url) {

	    if (bridge) {
	        throw new Error('Only one bridge supported');
	    }

	    var documentReady = new _lib.promise.Promise(function (resolve) {
	        if (window.document.body) {
	            return resolve(window.document);
	        }

	        window.document.addEventListener('DOMContentLoaded', function (event) {
	            return resolve(window.document);
	        });
	    });

	    bridge = documentReady.then(function (document) {

	        _lib.log.debug('Opening bridge:', url);

	        var id = BRIDGE_NAME_PREFIX + '_' + _lib.util.uniqueID();

	        var iframe = document.createElement('iframe');

	        iframe.setAttribute('name', id);
	        iframe.setAttribute('id', id);

	        iframe.setAttribute('style', 'margin: 0; padding: 0; border: 0px none; overflow: hidden;');
	        iframe.setAttribute('frameborder', '0');
	        iframe.setAttribute('border', '0');
	        iframe.setAttribute('scrolling', 'no');
	        iframe.setAttribute('allowTransparency', 'true');

	        iframe.setAttribute('tabindex', '-1');
	        iframe.setAttribute('hidden', 'true');
	        iframe.setAttribute('title', '');
	        iframe.setAttribute('role', 'presentation');

	        iframe.src = url;
	        document.body.appendChild(iframe);

	        return new _lib.promise.Promise(function (resolve, reject) {

	            iframe.onload = resolve;
	            iframe.onerror = reject;
	        }).then(function () {

	            return (0, _lib.onWindowReady)(iframe.contentWindow);
	        });
	    });

	    return bridge;
	});

	function getBridge() {
	    return _lib.promise.Promise.resolve().then(function () {
	        return bridge;
	    });
	}

	function getBridgeFor(win) {

	    try {
	        if (!win || !win.frames || !win.frames.length) {
	            return;
	        }

	        for (var i = 0; i < win.frames.length; i++) {
	            try {
	                var frame = win.frames[i];

	                if (frame && frame !== window && (0, _lib.isSameDomain)(frame) && frame[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT]) {
	                    return frame;
	                }
	            } catch (err) {
	                continue;
	            }
	        }
	    } catch (err) {
	        return;
	    }
	}

/***/ },
/* 27 */
/*!*******************************************!*\
  !*** ./~/post-robot/src/compat/global.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.registerGlobals = registerGlobals;

	var _conf = __webpack_require__(/*! ../conf */ 12);

	var _drivers = __webpack_require__(/*! ../drivers */ 15);

	function registerGlobals() {

	    // Only allow ourselves to be loaded once

	    if (window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT]) {
	        throw new Error('Attempting to load postRobot twice on the same window');
	    }

	    window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT] = {
	        postMessage: function postMessage(event) {
	            (0, _drivers.receiveMessage)(event);
	        }
	    };
	}

/***/ },
/* 28 */
/*!***************************************!*\
  !*** ./~/post-robot/src/compat/ie.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.emulateIERestrictions = emulateIERestrictions;

	var _conf = __webpack_require__(/*! ../conf */ 12);

	var _lib = __webpack_require__(/*! ../lib */ 17);

	function emulateIERestrictions(sourceWindow, targetWindow) {
	    if (!_conf.CONFIG.ALLOW_POSTMESSAGE_POPUP) {

	        if (!(0, _lib.isSameTopWindow)(sourceWindow, targetWindow)) {
	            throw new Error('Can not send and receive post messages between two different windows (disabled to emulate IE)');
	        }
	    }
	}

/***/ },
/* 29 */
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

	var _conf = __webpack_require__(/*! ../../conf */ 12);

	var _lib = __webpack_require__(/*! ../../lib */ 17);

	var _strategies = __webpack_require__(/*! ./strategies */ 30);

	function buildMessage(win, message) {
	    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];


	    var id = _lib.util.uniqueID();
	    var source = (0, _lib.getWindowId)(window);
	    var type = _lib.util.getType();
	    var target = (0, _lib.getWindowId)(win);

	    return _extends({}, message, options, {
	        id: message.id || id,
	        source: source,
	        originalSource: message.originalSource || source,
	        windowType: type,
	        originalWindowType: message.originalWindowType || type,
	        target: message.target || target
	    });
	}

	function sendMessage(win, message, domain, isProxy) {
	    return _lib.promise.run(function () {

	        message = buildMessage(win, message, {
	            data: (0, _lib.serializeMethods)(win, message.data),
	            domain: domain
	        });

	        var level = void 0;

	        if (_conf.POST_MESSAGE_NAMES_LIST.indexOf(message.name) !== -1 || message.type === _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK || isProxy) {
	            level = 'debug';
	        } else if (message.ack === 'error') {
	            level = 'error';
	        } else {
	            level = 'info';
	        }

	        _lib.log.logLevel(level, [isProxy ? '#sendproxy' : '#send', message.type, message.name, message]);

	        if (_conf.CONFIG.MOCK_MODE) {
	            delete message.target;
	            return window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT].postMessage({
	                origin: _lib.util.getDomain(window),
	                source: window,
	                data: JSON.stringify(message)
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

	        return _lib.promise.map(_lib.util.keys(_strategies.SEND_MESSAGE_STRATEGIES), function (strategyName) {

	            return _lib.promise.run(function () {

	                if (!_conf.CONFIG.ALLOWED_POST_MESSAGE_METHODS[strategyName]) {
	                    throw new Error('Strategy disallowed: ' + strategyName);
	                }

	                return _strategies.SEND_MESSAGE_STRATEGIES[strategyName](win, message, domain);
	            }).then(function () {
	                messages.push(strategyName + ': success');
	                return true;
	            }, function (err) {
	                messages.push(strategyName + ': ' + err.message);
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
/* 30 */
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

	var _conf = __webpack_require__(/*! ../../conf */ 12);

	var _lib = __webpack_require__(/*! ../../lib */ 17);

	var _compat = __webpack_require__(/*! ../../compat */ 25);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var SEND_MESSAGE_STRATEGIES = exports.SEND_MESSAGE_STRATEGIES = (_SEND_MESSAGE_STRATEG = {}, _defineProperty(_SEND_MESSAGE_STRATEG, _conf.CONSTANTS.SEND_STRATEGIES.POST_MESSAGE, function (win, message, domain) {

	    (0, _compat.emulateIERestrictions)(window, win);

	    return win.postMessage(JSON.stringify(message, 0, 2), domain);
	}), _defineProperty(_SEND_MESSAGE_STRATEG, _conf.CONSTANTS.SEND_STRATEGIES.GLOBAL_METHOD, function (win, message, domain) {

	    if (!(0, _lib.isSameDomain)(win)) {
	        throw new Error('Window is not on the same domain');
	    }

	    if ((0, _lib.isSameTopWindow)(window, win)) {
	        throw new Error('Can only use global method to communicate between two different windows, not between frames');
	    }

	    var sourceDomain = _lib.util.getDomain(window);
	    var targetDomain = void 0;

	    try {
	        targetDomain = _lib.util.getDomain(win);
	    } catch (err) {
	        throw new Error('Can not read target window domain: ' + err.message);
	    }

	    if (sourceDomain !== targetDomain) {
	        throw new Error('Can not send global message - source ' + sourceDomain + ' does not match target ' + targetDomain);
	    }

	    if (domain !== '*' && targetDomain !== domain) {
	        throw new Error('Can post post through global method - specified domain ' + domain + ' does not match target domain ' + targetDomain);
	    }

	    if (!_lib.util.safeHasProp(win, _conf.CONSTANTS.WINDOW_PROPS.POSTROBOT)) {
	        throw new Error('post-robot not available on target window at ' + targetDomain);
	    }

	    win[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT].postMessage({
	        origin: _lib.util.getDomain(window),
	        source: window,
	        data: JSON.stringify(message, 0, 2)
	    });
	}), _defineProperty(_SEND_MESSAGE_STRATEG, _conf.CONSTANTS.SEND_STRATEGIES.FOREIGN_BRIDGE, function (win, message, domain) {

	    if ((0, _lib.isSameTopWindow)(window, win)) {
	        throw new Error('Can only use bridge to communicate between two different windows, not between frames');
	    }

	    var frame = (0, _compat.getBridgeFor)(win);

	    if (!frame) {
	        throw new Error('No bridge available in window');
	    }

	    if (!(0, _lib.isSameDomain)(frame)) {
	        throw new Error('Bridge is not on the same domain');
	    }

	    var sourceDomain = _lib.util.getDomain(window);
	    var targetDomain = void 0;

	    try {
	        targetDomain = _lib.util.getDomain(frame);
	    } catch (err) {
	        throw new Error('Can not read bridge window domain: ' + err.message);
	    }

	    if (sourceDomain !== targetDomain) {
	        throw new Error('Can not accept global message through bridge - source ' + sourceDomain + ' does not match bridge ' + targetDomain);
	    }

	    if (!_lib.util.safeHasProp(frame, _conf.CONSTANTS.WINDOW_PROPS.POSTROBOT)) {
	        throw new Error('post-robot not available on bridge at ' + targetDomain);
	    }

	    message.targetHint = 'window.parent';

	    // If we're messaging our child

	    if (window === (0, _lib.getOpener)(win)) {
	        message.sourceHint = 'window.opener';
	    }

	    frame[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT].postMessage({
	        origin: _lib.util.getDomain(window),
	        source: window,
	        data: JSON.stringify(message, 0, 2)
	    });
	}), _defineProperty(_SEND_MESSAGE_STRATEG, _conf.CONSTANTS.SEND_STRATEGIES.LOCAL_BRIDGE, function (win, message, domain) {

	    if ((0, _lib.isSameTopWindow)(window, win)) {
	        throw new Error('Can only use bridge to communicate between two different windows, not between frames');
	    }

	    if (!message.target) {
	        throw new Error('Can not post message down through bridge without target');
	    }

	    // If we're messaging our parent

	    if (win === (0, _lib.getOpener)(window)) {
	        message.targetHint = 'window.parent.opener';
	    }

	    // If we're messaging our child

	    if (window === (0, _lib.getOpener)(win)) {
	        message.sourceHint = 'window.opener';
	    }

	    return (0, _compat.getBridge)().then(function (bridge) {

	        if (!bridge) {
	            throw new Error('Bridge not initialized');
	        }

	        if (win === bridge) {
	            throw new Error('Message target is bridge');
	        }

	        bridge.postMessage(JSON.stringify(message, 0, 2), domain);
	    });
	}), _SEND_MESSAGE_STRATEG);

/***/ },
/* 31 */
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

	var _lib = __webpack_require__(/*! ../lib */ 17);

	var listeners = exports.listeners = void 0;

	function resetListeners() {
	    exports.listeners = listeners = {
	        request: [],
	        response: {},
	        proxies: []
	    };
	}

	function getRequestListener(name, win) {
	    for (var _iterator = listeners.request, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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

	        if (!requestListener.win) {
	            return requestListener.options;
	        }

	        if (win && (0, _lib.isWindowEqual)(win, requestListener.win)) {
	            return requestListener.options;
	        }
	    }
	}

	function removeRequestListener(options) {

	    var listener = void 0;

	    for (var _iterator2 = listeners.request, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
	        var _ref2;

	        if (_isArray2) {
	            if (_i2 >= _iterator2.length) break;
	            _ref2 = _iterator2[_i2++];
	        } else {
	            _i2 = _iterator2.next();
	            if (_i2.done) break;
	            _ref2 = _i2.value;
	        }

	        var requestListener = _ref2;

	        if (requestListener.options === options) {
	            listener = requestListener;
	            break;
	        }
	    }

	    if (listener) {
	        listeners.request.splice(listeners.request.indexOf(listener), 1);
	    }
	}

	function addRequestListener(name, win, options, override) {

	    var listener = getRequestListener(name, win);

	    if (listener) {
	        if (override) {
	            removeRequestListener(listener);
	        } else {
	            throw new Error('Request listener already exists for ' + name);
	        }
	    }

	    listeners.request.push({ name: name, win: win, options: options });
	}

	resetListeners();

/***/ },
/* 32 */
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

	var _conf = __webpack_require__(/*! ../../conf */ 12);

	var _lib = __webpack_require__(/*! ../../lib */ 17);

	var _send = __webpack_require__(/*! ../send */ 29);

	var _listeners = __webpack_require__(/*! ../listeners */ 31);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var RECEIVE_MESSAGE_TYPES = exports.RECEIVE_MESSAGE_TYPES = (_RECEIVE_MESSAGE_TYPE = {}, _defineProperty(_RECEIVE_MESSAGE_TYPE, _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK, function (source, message, origin) {

	    var options = _listeners.listeners.response[message.hash];

	    if (!options) {
	        throw new Error('No handler found for post message ack for message: ' + message.name + ' in ' + window.location.href);
	    }

	    options.ack = true;
	}), _defineProperty(_RECEIVE_MESSAGE_TYPE, _conf.CONSTANTS.POST_MESSAGE_TYPE.REQUEST, function (source, message, origin) {

	    var options = (0, _listeners.getRequestListener)(message.name, source);

	    function respond(data) {

	        if (message.fireAndForget || (0, _lib.isWindowClosed)(source)) {
	            return _lib.promise.Promise.resolve();
	        }

	        return (0, _send.sendMessage)(source, _extends({
	            target: message.originalSource,
	            hash: message.hash,
	            name: message.name
	        }, data), '*');
	    }

	    return respond({
	        type: _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK

	    }).then(function () {

	        return _lib.promise.run(function () {

	            if (!options) {
	                throw new Error('No postmessage request handler for ' + message.name + ' in ' + window.location.href);
	            }

	            if (options.domain) {
	                var match = typeof options.domain === 'string' && origin === options.domain || options.domain instanceof RegExp && origin.match(options.domain);

	                if (!match) {
	                    throw new Error('Message origin ' + origin + ' does not match domain ' + options.domain);
	                }
	            }

	            return _lib.promise.deNodeify(options.handler, source, message.data);
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
	        });
	    })['catch'](function (err) {

	        if (options && options.handleError) {
	            return options.handleError(err);
	        } else {
	            _lib.log.error(err.stack || err.toString());
	        }
	    });
	}), _defineProperty(_RECEIVE_MESSAGE_TYPE, _conf.CONSTANTS.POST_MESSAGE_TYPE.RESPONSE, function (source, message, origin) {

	    var options = _listeners.listeners.response[message.hash];

	    if (!options) {
	        throw new Error('No response handler found for post message response ' + message.name + ' in ' + window.location.href);
	    }

	    delete _listeners.listeners.response[message.hash];

	    if (message.ack === _conf.CONSTANTS.POST_MESSAGE_ACK.ERROR) {
	        return options.respond(new Error(message.error));
	    } else if (message.ack === _conf.CONSTANTS.POST_MESSAGE_ACK.SUCCESS) {
	        return options.respond(null, message.data || message.response);
	    }
	}), _RECEIVE_MESSAGE_TYPE);

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
	exports.listen = listen;
	exports.on = on;
	exports.once = once;

	var _conf = __webpack_require__(/*! ../conf */ 12);

	var _lib = __webpack_require__(/*! ../lib */ 17);

	var _drivers = __webpack_require__(/*! ../drivers */ 15);

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

	    (0, _drivers.addRequestListener)(options.name, options.window, options, override);

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

	function on(name, options, handler, errorHandler) {

	    if (options instanceof Function) {
	        errorHandler = handler;
	        handler = options;
	        options = {};
	    }

	    options.name = name;
	    options.handler = handler || options.handler;
	    options.errorHandler = errorHandler || options.errorHandler;

	    return listen(options);
	}

	function once(name, options, handler, errorHandler) {

	    if (options instanceof Function) {
	        errorHandler = handler;
	        handler = options;
	        options = {};
	    }

	    options.name = name;
	    options.handler = handler || options.handler;
	    options.errorHandler = errorHandler || options.errorHandler;
	    options.once = true;

	    var prom = new _lib.promise.Promise(function (resolve, reject) {
	        options.handler = options.handler || resolve;
	        options.errorHandler = options.errorHandler || reject;
	    });

	    var listener = listen(options);

	    _lib.util.extend(prom, listener);

	    return prom;
	}

/***/ },
/* 34 */
/*!*********************************************!*\
  !*** ./~/post-robot/src/interface/proxy.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.proxy = proxy;
	exports.unproxy = unproxy;

	var _drivers = __webpack_require__(/*! ../drivers */ 15);

	function proxy(window1, window2) {

	    _drivers.listeners.proxies.push({
	        from: window1,
	        to: window2
	    });

	    _drivers.listeners.proxies.push({
	        from: window2,
	        to: window1
	    });
	}

	function unproxy(window1, window2) {

	    var toRemove = [];

	    for (var i = 0; i < _drivers.listeners.proxies.length; i++) {
	        var prox = _drivers.listeners.proxies[i];
	        if (prox.to === window1 && prox.from === window2 || prox.to === window2 && prox.from === window1) {
	            toRemove.push(prox);
	        }
	    }

	    for (var _i = 0; _i < toRemove.length; _i++) {
	        _drivers.listeners.proxies.splice(_drivers.listeners.proxies.indexOf(toRemove[_i]), 1);
	    }
	}

/***/ },
/* 35 */
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

	var _conf = __webpack_require__(/*! ../conf */ 12);

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
	function enableMockMode() {
	    _conf.CONFIG.MOCK_MODE = true;
	}

	function disableMockMode() {
	    _conf.CONFIG.MOCK_MODE = false;
	}

/***/ },
/* 36 */
/*!********************************!*\
  !*** ./src/component/index.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _component = __webpack_require__(/*! ./component */ 37);

	Object.keys(_component).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _component[key];
	    }
	  });
	});

	var _parent = __webpack_require__(/*! ./parent */ 53);

	Object.keys(_parent).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _parent[key];
	    }
	  });
	});

	var _child = __webpack_require__(/*! ./child */ 48);

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
/* 37 */
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

	var _client = __webpack_require__(/*! beaver-logger/client */ 38);

	var _client2 = _interopRequireDefault(_client);

	var _child = __webpack_require__(/*! ../child */ 48);

	var _parent = __webpack_require__(/*! ../parent */ 53);

	var _props = __webpack_require__(/*! ./props */ 57);

	var _constants = __webpack_require__(/*! ../../constants */ 2);

	var _validate2 = __webpack_require__(/*! ./validate */ 58);

	var _parent2 = __webpack_require__(/*! ./templates/parent.htm */ 59);

	var _parent3 = _interopRequireDefault(_parent2);

	var _component = __webpack_require__(/*! ./templates/component.htm */ 60);

	var _component2 = _interopRequireDefault(_component);

	var _drivers = __webpack_require__(/*! ../../drivers */ 61);

	var drivers = _interopRequireWildcard(_drivers);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var components = exports.components = {};

	/*  Component
	    ---------

	    This is the spec for the component. The idea is, when I call xcomponent.create(), it will create a new instance
	    of Component with the blueprint needed to set up ParentComponents and ChildComponents.

	    This is the one portion of code which is required by -- and shared to -- both the parent and child windows, and
	    contains all of the configuration needed for them to set themselves up.
	*/

	var Component = exports.Component = function () {
	    function Component() {
	        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	        _classCallCheck(this, Component);

	        this.validate(options);

	        if (options.dimensions) {
	            if (typeof options.dimensions.width !== 'number') {
	                throw new Error('[' + options.tag + '] Expected options.dimensions.width to be a number');
	            }

	            if (typeof options.dimensions.height !== 'number') {
	                throw new Error('[' + options.tag + '] Expected options.dimensions.height to be a number');
	            }
	        }
	        // The tag name of the component. Used by some drivers (e.g. angular) to turn the component into an html element,
	        // e.g. <my-component>

	        this.tag = options.tag;

	        // Name of the component, used for logging. Auto-generated from the tag name by default.

	        this.name = options.name || options.tag.replace(/-/g, '_');

	        // A json based spec describing what kind of props the component accepts. This is used to validate any props before
	        // they are passed down to the child.

	        this.props = _extends({}, options.props, _props.internalProps);

	        // The dimensions of the component, e.g. { width: 500, height: 200 }

	        this.dimensions = options.dimensions || {};

	        // The default environment we should render to if none is specified in the parent

	        this.defaultEnv = options.defaultEnv;

	        // A mapping of env->url, used to determine which url to load for which env

	        this.envUrls = options.envUrls || {};

	        // A url to use by default to render the component, if not using envs

	        this.url = options.url || options.envUrls[options.defaultEnv];

	        // The allowed contexts. For example { iframe: true, lightbox: false, popup: false }. Defaults to true for all.

	        this.contexts = options.contexts || {};
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

	            this.contexts[context] = this.contexts[context] === undefined ? true : Boolean(this.contexts[context]);
	        }

	        // The default context to render to

	        this.defaultContext = options.defaultContext;

	        // Should this be a singleton component? Do I want to allow it to be rendered more than once on the same page?

	        this.singleton = options.singleton;

	        // Templates and styles for the parent page and the initial rendering of the component

	        this.parentTemplate = options.parentTemplate || _parent3['default'];
	        this.componentTemplate = options.componentTemplate || _component2['default'];

	        // A mapping of tag->component so we can reference components by string tag name

	        components[this.tag] = this;

	        // Register all of the drivers for instantiating components. The model used is -- there's a standard javascript
	        // way of rendering a component, then each other technology (e.g. react) needs to hook into that interface.
	        // This makes us a little more pluggable and loosely coupled.

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

	    /*  Parent
	        ------
	         Get an instance of the parent for this component (lives on the parent page which contains the component)
	    */

	    _createClass(Component, [{
	        key: 'parent',
	        value: function parent(options) {
	            return new _parent.ParentComponent(this, options);
	        }

	        /*  Child
	            -----
	             Get an instance of the child for this component (lives on the child component page which lives in the parent)
	        */

	    }, {
	        key: 'child',
	        value: function child(options) {
	            return new _child.ChildComponent(this, options);
	        }

	        /*  Attach
	            ------
	             Shortcut to instantiate a child in a child component window
	        */

	    }, {
	        key: 'attach',
	        value: function attach(options) {
	            var component = this.child(options);
	            component.init();
	            return component;
	        }

	        /*  Init
	            ----
	             Shortcut to instantiate a component on a parent page, with props
	        */

	    }, {
	        key: 'init',
	        value: function init(props) {
	            return new _parent.ParentComponent(this, { props: props });
	        }

	        /*  Render
	            ------
	             Shortcut to render a parent component
	        */

	    }, {
	        key: 'render',
	        value: function render(props, element) {
	            return this.init(props).render(element);
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

	            payload.host = window.location.host;
	            payload.path = window.location.pathname;
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
	}();

/***/ },
/* 38 */
/*!*****************************************!*\
  !*** ./~/beaver-logger/client/index.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _logger = __webpack_require__(/*! ./logger */ 39);

	Object.keys(_logger).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _logger[key];
	    }
	  });
	});

	var _init = __webpack_require__(/*! ./init */ 45);

	Object.keys(_init).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _init[key];
	    }
	  });
	});

	var _transitions = __webpack_require__(/*! ./transitions */ 47);

	Object.keys(_transitions).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _transitions[key];
	    }
	  });
	});

	var _builders = __webpack_require__(/*! ./builders */ 43);

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
/* 39 */
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

	var _util = __webpack_require__(/*! ./util */ 40);

	var _builders = __webpack_require__(/*! ./builders */ 43);

	var _config = __webpack_require__(/*! ./config */ 44);

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
/* 40 */
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

	var _es6PromiseMin = __webpack_require__(/*! es6-promise-min */ 41);

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
/* 41 */
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

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./~/process/browser.js */ 42), (function() { return this; }())))

/***/ },
/* 42 */
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
/* 43 */
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
/* 44 */
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
/* 45 */
/*!****************************************!*\
  !*** ./~/beaver-logger/client/init.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.init = init;

	var _config = __webpack_require__(/*! ./config */ 44);

	var _util = __webpack_require__(/*! ./util */ 40);

	var _performance = __webpack_require__(/*! ./performance */ 46);

	var _logger = __webpack_require__(/*! ./logger */ 39);

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
/* 46 */
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

	var _config = __webpack_require__(/*! ./config */ 44);

	var _logger = __webpack_require__(/*! ./logger */ 39);

	var _builders = __webpack_require__(/*! ./builders */ 43);

	var _util = __webpack_require__(/*! ./util */ 40);

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
/* 47 */
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

	var _performance = __webpack_require__(/*! ./performance */ 46);

	var _logger = __webpack_require__(/*! ./logger */ 39);

	var _builders = __webpack_require__(/*! ./builders */ 43);

	var _util = __webpack_require__(/*! ./util */ 40);

	var _config = __webpack_require__(/*! ./config */ 44);

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
/* 48 */
/*!**************************************!*\
  !*** ./src/component/child/index.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ChildComponent = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _src = __webpack_require__(/*! post-robot/src */ 9);

	var _src2 = _interopRequireDefault(_src);

	var _promise = __webpack_require__(/*! sync-browser-mocks/src/promise */ 8);

	var _base = __webpack_require__(/*! ../base */ 49);

	var _window = __webpack_require__(/*! ../window */ 50);

	var _lib = __webpack_require__(/*! ../../lib */ 3);

	var _constants = __webpack_require__(/*! ../../constants */ 2);

	var _props = __webpack_require__(/*! ../props */ 51);

	var _props2 = __webpack_require__(/*! ./props */ 52);

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
	        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	        _classCallCheck(this, ChildComponent);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ChildComponent).call(this, component, options));

	        _this.component = component;

	        _this.component.log('construct_child');

	        _this.validate(options);

	        // Handlers for various component lifecycle events

	        _this.onEnter = _this.tryCatch(options.onEnter || _lib.noop);
	        _this.onClose = _this.tryCatch(options.onClose || _lib.noop);
	        _this.onProps = _this.tryCatch(options.onProps || _lib.noop, false);
	        _this.onError = _this.tryCatch(options.onError || function (err) {
	            throw err;
	        });

	        // The child can specify some default props if none are passed from the parent. This often makes integrations
	        // a little more seamless, as applicaiton code can call props.foo() without worrying about whether the parent
	        // has provided them or not, and fall-back to some default behavior.

	        _this.setProps((0, _props.normalizeProps)(_this.component, _this, options.defaultProps || {}), false);

	        // We support a 'standalone' mode where the child isn't actually created by xcomponent. This may be because
	        // there's an existing full-page implementation which uses redirects. In this case, the user can specify
	        // standalone: true, and defaultProps, and the child component should continue to function in the same way
	        // as if it were created by xcomponent, with the exception that no post-messages will ever be sent.

	        _this.standalone = options.standalone;
	        return _this;
	    }

	    /*  Init
	        ----
	         Message up to the parent to let them know we've rendered successfully, and get some initial data and props
	    */

	    _createClass(ChildComponent, [{
	        key: 'init',
	        value: function init() {
	            var _this2 = this;

	            this.component.log('init_child');

	            // In standalone mode, we would expect setWindows to fail since there is no parent window and window.name
	            // will not be generated by xcomponent. In this case we can fail silently, whereas normally we'd want to
	            // fail hard here.

	            try {
	                this.setWindows();
	            } catch (err) {

	                if (this.standalone) {
	                    this.component.log('child_standalone');
	                    return;
	                }

	                throw err;
	            }

	            // In standalone mode, there's no point messaging back up to our parent -- because we have none. :'(

	            if (this.standalone && !(0, _lib.getParentWindow)()) {
	                return _promise.SyncPromise.resolve();
	            }

	            // Send an init message to our parent. This gives us an initial set of data to use that we can use to function.
	            //
	            // For example:
	            //
	            // - What context are we
	            // - What props has the parent specified

	            return this.sendToParent(_constants.POST_MESSAGE.INIT, {

	                exports: this.exports()

	            }).then(function (data) {

	                _this2.context = data.context;
	                _this2.setProps(data.props);

	                _this2.onEnter.call(_this2);
	            })['catch'](function (err) {
	                return _this2.onError(err);
	            });
	        }
	    }, {
	        key: 'setProps',
	        value: function setProps() {
	            var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	            var onProps = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

	            this.props = this.props || {};
	            (0, _lib.extend)(this.props, (0, _props2.normalizeChildProps)(this.component, props));

	            if (onProps) {
	                this.onProps.call(this);
	            }
	        }

	        /*  Send to Parent
	            --------------
	             Send a post message to our parent window.
	        */

	    }, {
	        key: 'sendToParent',
	        value: function sendToParent(name, data) {
	            this.component.log('send_to_parent_' + name);
	            return _src2['default'].send((0, _lib.getParentWindow)(), name, data);
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

	            if (!(0, _lib.getParentWindow)()) {
	                throw new Error('[' + this.component.tag + '] Can not find parent window');
	            }

	            var winProps = (0, _window.parseWindowName)(window.name);

	            this.component.log('child_win_props', winProps);

	            if (winProps.tag !== this.component.tag) {
	                throw new Error('[' + this.component.tag + '] Parent is ' + winProps.tag + ' - can not attach ' + this.component.tag);
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

	        /*  Watch For Close
	            ---------------
	             Watch both the parent window and the parent component window, if they close, close this window too.
	        */

	    }, {
	        key: 'watchForClose',
	        value: function watchForClose() {
	            var _this3 = this;

	            (0, _lib.onCloseWindow)(_lib.getParentWindow, function () {

	                _this3.component.log('parent_window_closed');

	                _this3.onClose(new Error('[' + _this3.component.tag + '] parent window was closed'));

	                // We only need to close ourselves if we're a popup -- otherwise our parent window closing will automatically
	                // close us, if we're an iframe

	                if (_this3.context === _constants.CONTEXT_TYPES.POPUP) {
	                    window.close();
	                }
	            });

	            // Only listen for parent component window if it's actually a different window

	            if ((0, _window.getParentComponentWindow)() && (0, _window.getParentComponentWindow)() !== (0, _lib.getParentWindow)()) {
	                (0, _lib.onCloseWindow)((0, _window.getParentComponentWindow)(), function () {

	                    _this3.component.log('parent_component_window_closed');

	                    // We do actually need to close ourselves in this case, even if we're an iframe, because our component
	                    // window is probably a sibling and we'll remain open by default.

	                    _this3.close(new Error('[' + _this3.component.tag + '] parent component window was closed'));
	                });
	            }

	            (0, _lib.addEventListener)(window, 'beforeunload', function () {
	                return _this3.onClose();
	            });
	        }

	        /*  Validate
	            --------
	             Validate any options passed in to ChildComponent
	        */

	    }, {
	        key: 'validate',
	        value: function validate(options) {

	            // TODO: Implement this
	        }
	    }, {
	        key: 'exports',
	        value: function exports() {
	            var _this4 = this;

	            return {
	                updateProps: function updateProps(props) {
	                    return _this4.setProps(props);
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
	                    return window.resizeTo(width, height);
	                }

	                return _this5.sendToParent(_constants.POST_MESSAGE.RESIZE, { width: width, height: height });
	            });
	        }

	        /*  Close
	            -----
	             Close the child window
	        */

	    }, {
	        key: 'close',
	        value: function close(err) {

	            this.component.log('close_child');

	            this.onClose.call(this, err);

	            // Ask our parent window to close us

	            this.sendToParent(_constants.POST_MESSAGE.CLOSE, {}, {
	                fireAndForget: true
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

	            this.component.log('error', { error: err.stack || err.toString() });

	            return this.sendToParent(_constants.POST_MESSAGE.ERROR, {
	                error: err.stack ? err.message + '\n' + err.stack : err.toString()
	            });
	        }
	    }]);

	    return ChildComponent;
	}(_base.BaseComponent);

/***/ },
/* 49 */
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

	var _src = __webpack_require__(/*! post-robot/src */ 9);

	var _src2 = _interopRequireDefault(_src);

	var _lib = __webpack_require__(/*! ../lib */ 3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/*  Base Component
	    --------------

	    Methods that are common between child and parent components, but are not generic or uncoupled enough to live in
	    a separate library.
	*/

	var BaseComponent = exports.BaseComponent = function () {
	    function BaseComponent() {
	        _classCallCheck(this, BaseComponent);
	    }

	    _createClass(BaseComponent, [{
	        key: 'registerForCleanup',


	        /*  Register For Cleanup
	            --------------------
	             Register a method that will be called to do some cleanup whenever this.cleanup() is called
	        */

	        value: function registerForCleanup(task) {
	            this.cleanupTasks = this.cleanupTasks || [];
	            this.cleanupTasks.push(task);
	            return this;
	        }

	        /*  Cleanup
	            -------
	             Call all of the methods registered with this.registerForCleanup
	        */

	    }, {
	        key: 'cleanup',
	        value: function cleanup() {
	            while (this.cleanupTasks && this.cleanupTasks.length) {
	                var task = this.cleanupTasks.pop();
	                task();
	            }
	        }

	        /*  Has Cleanup Tasks
	            -----------------
	             Returns whether or not there is any state to be cleaned up
	        */

	    }, {
	        key: 'hasCleanupTasks',
	        value: function hasCleanupTasks() {
	            return Boolean(this.cleanupTasks.length);
	        }

	        /*  Set For Cleanup
	            ---------------
	             Set a key on this which will be auto-deleted when this.cleanup() is called
	        */

	    }, {
	        key: 'setForCleanup',
	        value: function setForCleanup(key, value) {
	            var _this = this;

	            this[key] = value;
	            this.registerForCleanup(function () {
	                delete _this[key];
	            });
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
	        value: function listen(win) {
	            var _this2 = this;

	            if (!win) {
	                throw new Error('[' + this.component.tag + '] window to listen to not set');
	            }

	            if (!this.listeners) {
	                return;
	            }

	            var listeners = this.listeners();

	            var _loop = function _loop() {
	                if (_isArray) {
	                    if (_i >= _iterator.length) return 'break';
	                    _ref = _iterator[_i++];
	                } else {
	                    _i = _iterator.next();
	                    if (_i.done) return 'break';
	                    _ref = _i.value;
	                }

	                var listenerName = _ref;


	                var listener = _src2['default'].on(listenerName, { window: win, errorHandler: function errorHandler(err) {
	                        return _this2.error(err);
	                    } }, function (source, data) {
	                    _this2.component.log('listener_' + listenerName.replace(/^xcomponent_/, ''));
	                    return listeners[listenerName].call(_this2, source, data);
	                });

	                _this2.registerForCleanup(function () {
	                    listener.cancel();
	                });
	            };

	            for (var _iterator = Object.keys(listeners), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	                var _ref;

	                var _ret = _loop();

	                if (_ret === 'break') break;
	            }
	        }
	    }]);

	    return BaseComponent;
	}();

/***/ },
/* 50 */
/*!*********************************!*\
  !*** ./src/component/window.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getParentComponentWindow = exports.parseWindowName = undefined;
	exports.buildChildWindowName = buildChildWindowName;
	exports.getPosition = getPosition;

	var _lib = __webpack_require__(/*! ../lib */ 3);

	var _constants = __webpack_require__(/*! ../constants */ 2);

	/*  Build Child Window Name
	    -----------------------

	    Build a name for our child window. This should identify the following things to the child:

	    - That the window was created by, and is owned by xcomponent
	    - The name of the child's parent. This is so the child can identify which window created it, even when we do a
	      renderToParent, in which case the true parent may actually be a sibling frame in the window hierarchy

	    We base64 encode the window name so IE doesn't die when it encounters any characters that it doesn't like.
	*/

	function buildChildWindowName(prefix) {
	    var props = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];


	    props.id = (0, _lib.uniqueID)();
	    var name = (0, _lib.b64encode)(JSON.stringify(props));
	    return _constants.XCOMPONENT + '_' + prefix.replace(/_/g, '') + '_' + name;
	}

	/*  Parse Window Name
	    -----------------

	    The inverse of buildChildWindowName. Base64 decodes and json parses the window name to get the original props
	    passed down, including the parent name. Only accepts window names built by xcomponent
	*/

	var parseWindowName = exports.parseWindowName = (0, _lib.memoize)(function (name) {
	    var winProps = void 0;

	    if (!name) {
	        return;
	    }

	    var segments = name.split('_');
	    var props = segments.slice(2).join('_');

	    if (segments[0] !== _constants.XCOMPONENT) {
	        return;
	    }

	    try {
	        winProps = JSON.parse((0, _lib.b64decode)(props));
	    } catch (err) {
	        return;
	    }

	    if (!winProps) {
	        return;
	    }

	    return winProps;
	});

	/*  Get Parent Component Window
	    ---------------------------

	    Get the parent component window, which may be different from the actual parent window
	*/

	var getParentComponentWindow = exports.getParentComponentWindow = (0, _lib.memoize)(function () {

	    // Get properties from the window name, passed down from our parent component

	    var winProps = parseWindowName(window.name);

	    if (!winProps) {
	        throw new Error('Window has not been rendered by xcomponent - can not attach here');
	    }

	    var parentWindow = (0, _lib.getParentWindow)();

	    // Use this to infer which window is our true 'parent component'. This can either be:
	    //
	    // - Our actual parent
	    // - A sibling which rendered us using renderToParent()

	    if (winProps.sibling) {

	        if (parentWindow.frames && parentWindow.frames.length && parentWindow.frames[winProps.parent]) {
	            parentWindow = parentWindow.frames[winProps.parent];
	        } else if (parentWindow.parent !== parentWindow && parentWindow.parent.frames && parentWindow.parent.frames.length && parentWindow.parent.frames[winProps.parent]) {
	            parentWindow = parentWindow.parent.frames[winProps.parent];
	        }
	    }

	    return parentWindow;
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
/* 51 */
/*!********************************!*\
  !*** ./src/component/props.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.normalizeProp = normalizeProp;
	exports.normalizeProps = normalizeProps;

	var _promise = __webpack_require__(/*! sync-browser-mocks/src/promise */ 8);

	var _lib = __webpack_require__(/*! ../lib */ 3);

	var _constants = __webpack_require__(/*! ../constants */ 2);

	/*  Normalize Prop
	    --------------

	    Turn prop into normalized value, using defaults, function options, etc.
	*/

	function normalizeProp(component, instance, props, key) {

	    var prop = component.props[key];
	    var value = props[key];

	    var hasProp = props.hasOwnProperty(key) && value !== null && value !== undefined && value !== '';

	    // Substitute in provided default. If prop.def is a function, we call it to get the default.

	    if (!hasProp && prop.def) {
	        value = prop.def instanceof Function && prop.type !== 'function' ? prop.def() : prop.def;
	    }

	    if (value === _constants.PROP_DEFER_TO_URL) {

	        // pass

	    } else if (prop.type === 'boolean') {

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
	            value = value || '';
	        } else if (prop.type === 'object') {
	            // pass

	        } else if (prop.type === 'number') {
	                value = parseInt(value || 0, 10);
	            }

	    if (prop.getter && value !== _constants.PROP_DEFER_TO_URL) {

	        if (value instanceof Function) {
	            value = (0, _lib.getter)(value.bind(instance));
	        } else {
	            (function () {
	                var val = value;

	                value = function value() {
	                    return _promise.SyncPromise.resolve(val);
	                };
	            })();
	        }

	        value = (0, _lib.memoize)(value);
	    }

	    return value;
	}

	/*  Normalize Props
	    ---------------

	    Turn props into normalized values, using defaults, function options, etc.
	*/

	function normalizeProps(component, instance, props) {

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

	        result[key] = normalizeProp(component, instance, props, key);
	    }

	    return result;
	}

/***/ },
/* 52 */
/*!**************************************!*\
  !*** ./src/component/child/props.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.normalizeChildProps = normalizeChildProps;

	var _promise = __webpack_require__(/*! sync-browser-mocks/src/promise */ 8);

	var _lib = __webpack_require__(/*! ../../lib */ 3);

	var _constants = __webpack_require__(/*! ../../constants */ 2);

	function normalizeChildProps(component, props) {

	    var result = {};

	    for (var _iterator = Object.keys(props), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
	        var value = props[key];

	        if (value === _constants.PROP_DEFER_TO_URL) {

	            var queryParam = key;

	            if (typeof prop.queryParam === 'string') {
	                queryParam = prop.queryParam;
	            }

	            value = (0, _lib.getUrlParam)(queryParam);
	            if (prop.getter) {
	                (function () {
	                    var val = _promise.SyncPromise.resolve(value);
	                    value = function value() {
	                        return val;
	                    };
	                })();
	            }
	        }

	        result[key] = value;
	    }

	    return result;
	}

/***/ },
/* 53 */
/*!***************************************!*\
  !*** ./src/component/parent/index.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ParentComponent = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _client = __webpack_require__(/*! beaver-logger/client */ 38);

	var _client2 = _interopRequireDefault(_client);

	var _src = __webpack_require__(/*! post-robot/src */ 9);

	var _src2 = _interopRequireDefault(_src);

	var _promise = __webpack_require__(/*! sync-browser-mocks/src/promise */ 8);

	var _base = __webpack_require__(/*! ../base */ 49);

	var _window = __webpack_require__(/*! ../window */ 50);

	var _lib = __webpack_require__(/*! ../../lib */ 3);

	var _constants = __webpack_require__(/*! ../../constants */ 2);

	var _drivers = __webpack_require__(/*! ./drivers */ 54);

	var _validate = __webpack_require__(/*! ./validate */ 55);

	var _props = __webpack_require__(/*! ./props */ 56);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var activeComponents = [];

	/*  Parent Component
	    ----------------

	    This manages the state of the component on the parent window side - i.e. the window the component is being rendered into.

	    It handles opening the necessary windows/iframes, launching the component's url, and listening for messages back from the component.
	*/

	var ParentComponent = exports.ParentComponent = function (_BaseComponent) {
	    _inherits(ParentComponent, _BaseComponent);

	    function ParentComponent(component) {
	        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	        _classCallCheck(this, ParentComponent);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ParentComponent).call(this, component, options));

	        (0, _validate.validate)(component, options);

	        _this.component = component;

	        _this.id = (0, _lib.uniqueID)();

	        // Ensure the component is not loaded twice on the same page, if it is a singleton

	        if (component.singleton && activeComponents.some(function (comp) {
	            return comp.component === component;
	        })) {
	            throw new Error(component.tag + ' is a singleton, and an only be instantiated once');
	        }

	        activeComponents.push(_this);

	        _this.registerForCleanup(function () {
	            activeComponents.splice(activeComponents.indexOf(_this), 1);
	        });

	        // Options passed during renderToParent. We would not ordinarily expect a user to pass these, since we depend on
	        // them only when we're trying to render from a sibling to a sibling

	        _this.childWindowName = options.childWindowName || (0, _window.buildChildWindowName)(_this.component.name, {
	            tag: _this.component.tag,
	            parent: window.name
	        });

	        _this.setProps(options.props || {});

	        _this.component.log('construct_parent');

	        // Set up promise for init

	        _this.onInit = new _promise.SyncPromise();
	        return _this;
	    }

	    /*  Set Props
	        ---------
	         Normalize props and generate the url we'll use to render the component
	    */

	    _createClass(ParentComponent, [{
	        key: 'setProps',
	        value: function setProps(props) {
	            (0, _validate.validateProps)(this.component, props);
	            this.props = (0, _props.normalizeParentProps)(this.component, this, props);
	        }

	        /*  Build Url
	            ---------
	             We build the props we're passed into the initial url. This means the component server-side can start rendering
	            itself based on whatever props the merchant provides.
	        */

	    }, {
	        key: 'buildUrl',
	        value: function buildUrl() {
	            var _this2 = this;

	            return (0, _props.propsToQuery)(this.component.props, this.props).then(function (queryString) {

	                var url = void 0;

	                if (_this2.props.url) {
	                    url = _this2.props.url;
	                } else if (_this2.props.env) {
	                    url = _this2.component.envUrls[_this2.props.env];
	                } else {
	                    url = _this2.component.url;
	                }

	                if (queryString) {
	                    url = '' + url + (url.indexOf('?') === -1 ? '?' : '&') + queryString;
	                }

	                return url;
	            });
	        }

	        /*  Update Props
	            ------------
	             Send new props down to the child
	        */

	    }, {
	        key: 'updateProps',
	        value: function updateProps(props) {
	            var _this3 = this;

	            return _promise.SyncPromise.resolve().then(function () {

	                (0, _validate.validateProps)(_this3.component, props);

	                var oldProps = (0, _lib.stringifyWithFunctions)(_this3.props);

	                _this3.setProps(_extends({}, _this3.props, props));

	                if (!_this3.initialPropsSent) {
	                    return;
	                }

	                return _this3.onInit.then(function () {

	                    // Only send down the new props if they do not match the old, and if we have already sent down initial props

	                    if (oldProps !== (0, _lib.stringifyWithFunctions)(_this3.props)) {
	                        _this3.component.log('parent_update_props');

	                        return _this3.childExports.updateProps(_this3.props);
	                    }
	                });
	            });
	        }

	        /*  Get Render Context
	            ------------------
	             Determine the ideal context to render to, if unspecified by the user
	        */

	    }, {
	        key: 'getRenderContext',
	        value: function getRenderContext(el, context) {

	            if (el) {
	                if (context && context !== _constants.CONTEXT_TYPES.IFRAME) {
	                    throw new Error('[' + this.component.tag + '] ' + context + ' context can not be rendered into element');
	                }

	                context = _constants.CONTEXT_TYPES.IFRAME;
	            }

	            if (context) {
	                if (!this.component.contexts[context]) {
	                    throw new Error('[' + this.component.tag + '] ' + context + ' context not allowed by component');
	                }

	                return context;
	            }

	            if (this.component.defaultContext) {
	                return this.component.defaultContext;
	            }

	            var _arr = [_constants.CONTEXT_TYPES.LIGHTBOX, _constants.CONTEXT_TYPES.POPUP];
	            for (var _i = 0; _i < _arr.length; _i++) {
	                var renderContext = _arr[_i];
	                if (this.component.contexts[renderContext]) {
	                    return renderContext;
	                }
	            }

	            throw new Error('[' + this.component.tag + '] No context options available for render');
	        }

	        /*  Validate Render
	            ---------------
	             Ensure there is no reason we can't render
	        */

	    }, {
	        key: 'validateRender',
	        value: function validateRender(context) {

	            if (this.window && !this.preRendered) {
	                throw new Error('[' + this.component.tag + '] Can not render: component is already rendered');
	            }

	            if (context && !this.component.contexts[context]) {
	                throw new Error('Invalid context: ' + context);
	            }
	        }

	        /*  Render
	            ------
	             Kick off the actual rendering of the component:
	             - open the popup/iframe
	            - load the url into it
	            - set up listeners
	        */

	    }, {
	        key: 'render',
	        value: function render(element, context) {
	            var _this4 = this;

	            return _promise.SyncPromise.resolve().then(function () {

	                _this4.validateRender(context);

	                context = _this4.getRenderContext(element, context);

	                _this4.component.log('render_' + context, { context: context, element: element });

	                if (_drivers.RENDER_DRIVERS[context].render) {
	                    _drivers.RENDER_DRIVERS[context].render.call(_this4, element);
	                }

	                _this4.setForCleanup('context', context);

	                _this4.preRender(element, context);

	                _this4.listen(_this4.window);

	                return _this4.buildUrl().then(function (url) {

	                    _this4.loadUrl(context, url);
	                    _this4.runTimeout();
	                    _this4.watchForClose();

	                    return _this4.onInit;
	                });
	            });
	        }

	        /*  Open
	            ----
	             Open a new window in the desired context
	        */

	    }, {
	        key: 'open',
	        value: function open(element, context) {

	            context = this.getRenderContext(element, context);

	            this.component.log('open_' + context, { element: element, windowName: this.childWindowName });

	            _drivers.RENDER_DRIVERS[context].open.call(this, element);

	            this.watchForClose();
	        }

	        /*  Pre Open
	            --------
	             Pre-pen a new window in the desired context
	        */

	    }, {
	        key: 'preRender',
	        value: function preRender(element, context) {

	            if (this.preRendered) {
	                return;
	            }

	            context = this.getRenderContext(element, context);

	            this.component.log('preRender_' + context, { element: element, windowName: this.childWindowName });

	            this.setForCleanup('context', context);

	            this.createParentTemplate(context);
	            this.open(element, context);
	            this.createComponentTemplate();

	            this.setForCleanup('preRendered', true);
	        }

	        /*  Render to Parent
	            ----------------
	             Instruct the parent window to render our component for us -- so, for example, we can have a button component
	            which opens a lightbox on the parent page, with a full overlay. Or, we could use this to render an iframe based
	            modal on top of our existing iframe component, without having to expand out the size of our current iframe.
	        */

	    }, {
	        key: 'renderToParent',
	        value: function renderToParent(element, context) {
	            var _this5 = this;

	            var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	            return _promise.SyncPromise.resolve().then(function () {

	                _this5.validateRender(context);

	                context = _this5.getRenderContext(element, context);

	                if (!(0, _lib.getParentWindow)()) {
	                    throw new Error('[' + _this5.component.tag + '] Can not render to parent - no parent exists');
	                }

	                if (!window.name) {
	                    throw new Error('[' + _this5.component.tag + '] Can not render to parent - not in a child component window');
	                }

	                _this5.component.log('render_' + context + '_to_parent', { element: element, context: context });

	                // Set a new childWindowName to let it know it's going to be a sibling, not a direct child

	                _this5.childWindowName = (0, _window.buildChildWindowName)(_this5.component.name, {
	                    tag: _this5.component.tag,
	                    parent: window.name,
	                    sibling: 1
	                });

	                _this5.setForCleanup('context', context);

	                // Do any specific stuff needed for particular contexts. For example -- for popups, we have no choice but to
	                // open them from the child, since we depend on there being a click event to avoid the popup blocker.

	                if (_drivers.RENDER_DRIVERS[context].renderToParent) {
	                    _drivers.RENDER_DRIVERS[context].renderToParent.call(_this5, element);
	                }

	                // Message the parent to instruct them on what to render and how. Since post-robot supports sending functions
	                // across, we can pretty much just send all of our props over too without any problems

	                return _src2['default'].sendToParent(_constants.POST_MESSAGE.RENDER, _extends({}, options, {

	                    tag: _this5.component.tag,
	                    context: context,
	                    element: element,

	                    options: {
	                        renderedToParent: true,
	                        childWindowName: _this5.childWindowName,
	                        props: _this5.props
	                    }

	                })).then(function (data) {

	                    _this5.childExports = data.childExports;
	                    _this5.close = data.close;

	                    // Luckily we're allowed to access any frames created by our parent window, so we can get a handle on the child component window.

	                    if (!_this5.window) {
	                        _this5.setForCleanup('window', (0, _lib.getParentWindow)().frames[_this5.childWindowName]);
	                    }

	                    // We don't want to proxy all of our messages through the parent window. Instead we'll just listen directly for
	                    // messages on the sibling window, since we have a handle on it.

	                    _this5.listen(_this5.window);

	                    _this5.watchForClose();

	                    return _this5.onInit;
	                });
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
	            var _this6 = this;

	            var closeWindowListener = (0, _lib.onCloseWindow)(this.window, function () {
	                _this6.component.log('detect_close_child');
	                _this6.props.onClose()['finally'](function () {
	                    _this6.destroy();
	                });
	            });

	            // Our child has no way of knowing if we navigated off the page. So we have to listen for beforeunload
	            // and close the child manually if that happens.

	            var unloadListener = (0, _lib.addEventListener)(window, 'beforeunload', function () {
	                _this6.component.log('navigate_away');
	                _client2['default'].flush();
	                _this6.destroy();
	            });

	            this.registerForCleanup(function () {
	                closeWindowListener.cancel();
	                unloadListener.cancel();
	            });
	        }

	        /*  Load Url
	            --------
	             Load url into the child window. This is separated out because it's quite common for us to have situations
	            where opening the child window and loading the url happen at different points.
	        */

	    }, {
	        key: 'loadUrl',
	        value: function loadUrl(context, url) {
	            this.component.log('load_url');
	            return _drivers.RENDER_DRIVERS[context].loadUrl.call(this, url);
	        }

	        /*  Hijack Button
	            -------------
	             In this case, we don't actually know the final url for the component. The parent page might have a link or a form
	            which points directly to our component url, or indirectly via a 302.
	             So here, we listen for a click on the button or link, and hijack the target window. That way, we can be responsible
	            for opening the window, listening for messages, etc. while the parent page is responsible only for generating the url
	            to redirect to.
	             This is necessary because in these cases, there's no way to accurately ascertain the url we're going to before
	            we're redirected there -- so we let the parent redirect, but handle everything else involving the lifecycle of
	            the component.
	             This is a pretty esoteric case -- so if you need it, cool, otherwise you don't need to spend too much time
	            worrying about it.
	        */

	    }, {
	        key: 'hijackButton',
	        value: function hijackButton(button, element, context) {
	            var _this7 = this;

	            context = this.getRenderContext(element, context);

	            this.component.log('hijack_button', { element: element, context: context });

	            return new _promise.SyncPromise(function (resolve, reject) {

	                (0, _lib.hijackButton)(button, function (event, targetElement) {

	                    if (_this7.window && !_this7.preRendered) {
	                        event.preventDefault();
	                        throw new Error('[' + _this7.component.tag + '] Component is already rendered');
	                    }

	                    // Open the window to render into

	                    _this7.renderHijack(targetElement, element, context).then(resolve, reject);
	                });
	            });
	        }

	        /*  Render Hijack
	            -------------
	             Do a normal render, with the exception that we don't load the url into the child since our hijacked link or button will do that for us
	        */

	    }, {
	        key: 'renderHijack',
	        value: function renderHijack(targetElement, element, context) {
	            var _this8 = this;

	            return _promise.SyncPromise.resolve().then(function () {

	                context = _this8.getRenderContext(element, context);

	                _this8.component.log('render_hijack_' + context);

	                _this8.validateRender(context);

	                _this8.setForCleanup('context', context);

	                // Point the element to open in our child window

	                targetElement.target = _this8.childWindowName;

	                // Immediately open the window, but don't try to set the url -- this will be done by the browser using the form action or link href

	                _this8.preRender(element, context);

	                // Do everything else the same way -- listen for events, render the overlay, etc.

	                _this8.listen(_this8.window);
	                _this8.runTimeout();

	                return _this8.onInit;
	            });
	        }

	        /*  Hijack Submit Parent Form
	            -------------------------
	             This takes the 'hijack' case a little further, and allows hijacking to work even when the button is actually
	            in a child component. So if the parent window has a form, and inside that form is a component, and inside that
	            component is a button, this can be used to submit the parent form using the child button and hijack the resulting
	            url into an xcomponent.
	             This is, again, an esoteric case within an esoteric case -- so probably only consider using it if you're sure you want to.
	        */

	    }, {
	        key: 'hijackSubmitParentForm',
	        value: function hijackSubmitParentForm(element, context) {

	            context = this.getRenderContext(element, context);

	            this.component.log('hijack_submit_parent_form_' + context);

	            return this.renderToParent(element, context, {
	                hijackSubmitParentForm: true
	            });
	        }

	        /*  Run Timeout
	            -----------
	             Set a timeout on the initial render, and call this.props.onTimeout if we don't get an init call in time.
	        */

	    }, {
	        key: 'runTimeout',
	        value: function runTimeout() {
	            var _this9 = this;

	            if (this.props.timeout) {
	                setTimeout(function () {

	                    // If this.onInit has been previously resolved, this won't have any effect.

	                    var error = new Error('[' + _this9.component.tag + '] Loading component ' + _this9.component.tag + ' timed out after ' + _this9.props.timeout + ' milliseconds');

	                    _this9.onInit.reject(error)['catch'](function (err) {
	                        return _this9.props.onTimeout(err)['finally'](function () {
	                            _this9.component.log('timed_out', { timeout: _this9.props.timeout });
	                        });
	                    });
	                }, this.props.timeout);
	            }
	        }

	        /*  Listeners
	            ---------
	             Post-robot listeners to the child component window
	        */

	    }, {
	        key: 'listeners',
	        value: function listeners() {
	            var _ref;

	            return _ref = {}, _defineProperty(_ref, _constants.POST_MESSAGE.INIT, function (source, data) {
	                var _this10 = this;

	                this.childExports = data.exports;

	                this.onInit.resolve(this);
	                return this.props.onEnter().then(function () {

	                    _this10.setForCleanup('initialPropsSent', true);

	                    // Let the child know what its context is, and what its initial props are.

	                    return {
	                        context: _this10.context,
	                        props: _this10.props
	                    };
	                });
	            }), _defineProperty(_ref, _constants.POST_MESSAGE.CLOSE, function (source, data) {
	                this.close();
	            }), _defineProperty(_ref, _constants.POST_MESSAGE.RENDER, function (source, data) {
	                var _this11 = this;

	                var component = this.component.getByTag(data.tag);
	                var instance = component.parent(data.options);

	                this.registerForCleanup(function () {
	                    instance.destroy();
	                });

	                // In the case where we're submitting the parent form using hijackSubmitParentForm

	                if (data.hijackSubmitParentForm) {

	                    var form = (0, _lib.getParentNode)(this.iframe, 'form');

	                    // Open the window and do everything except load the url

	                    instance.renderHijack(form, data.element, data.context);

	                    // Submit the form to load the url into the new window

	                    form.submit();
	                }

	                // Otherwise we're just doing a normal render on behalf of the child

	                else {

	                        return instance.render(data.element, data.context).then(function () {

	                            return {
	                                childExports: instance.childExports,
	                                close: function close() {
	                                    return _this11.close();
	                                }
	                            };
	                        });
	                    }
	            }), _defineProperty(_ref, _constants.POST_MESSAGE.RESIZE, function (source, data) {

	                if (this.context === _constants.CONTEXT_TYPES.POPUP) {
	                    return;
	                }

	                return this.resize(data.width, data.height);
	            }), _defineProperty(_ref, _constants.POST_MESSAGE.ERROR, function (source, data) {
	                this.error(new Error(data.error));
	            }), _ref;
	        }

	        /*  Resize
	            ------
	             Resize the child component window
	        */

	    }, {
	        key: 'resize',
	        value: function resize(width, height) {
	            this.component.log('resize', { height: height, width: width });
	            return _drivers.RENDER_DRIVERS[this.context].resize.call(this, width, height);
	        }

	        /*  Restyle
	            -------
	             Restyle the child component window
	        */

	    }, {
	        key: 'restyle',
	        value: function restyle() {
	            return _drivers.RENDER_DRIVERS[this.context].restyle.call(this);
	        }

	        /*  Close
	            -----
	             Close the child component
	        */

	    }, {
	        key: 'close',
	        value: function close() {
	            var _this12 = this;

	            return this.props.onClose().then(function () {
	                _this12.component.log('close');
	                _this12.destroy();
	            });
	        }

	        /*  Focus
	            -----
	             Focus the child component window
	        */

	    }, {
	        key: 'focus',
	        value: function focus() {

	            this.component.log('focus');

	            if (this.window) {
	                this.window.focus();
	            }
	            return this;
	        }

	        /*  Create Component Template
	            -------------------------
	             Creates an initial template and stylesheet which are loaded into the child window, to be displayed before the url is loaded
	        */

	    }, {
	        key: 'createComponentTemplate',
	        value: function createComponentTemplate() {

	            var html = (0, _lib.template)(this.component.componentTemplate, {
	                id: _constants.CLASS_NAMES.XCOMPONENT + '-' + this.id,
	                CLASS: _constants.CLASS_NAMES
	            });

	            try {
	                (0, _lib.createElement)('body', { html: html }, this.window.document.body);
	            } catch (err) {
	                try {
	                    this.window.document.write(html);
	                } catch (err2) {
	                    this.window.location = 'javascript: document.write(JSON.stringify(html))';
	                }
	            }
	        }

	        /*  Create Parent Template
	            ----------------------
	             Create a template and stylesheet for the overlay behind the popup/lightbox
	        */

	    }, {
	        key: 'createParentTemplate',
	        value: function createParentTemplate(context) {
	            var _this13 = this;

	            if (!_drivers.RENDER_DRIVERS[context].overlay) {
	                return;
	            }

	            this.parentTemplate = (0, _lib.createElement)('div', {

	                html: (0, _lib.template)(this.component.parentTemplate, {
	                    id: _constants.CLASS_NAMES.XCOMPONENT + '-' + this.id,
	                    CLASS: _constants.CLASS_NAMES
	                }),

	                attributes: {
	                    id: _constants.CLASS_NAMES.XCOMPONENT + '-' + this.id
	                },

	                'class': [_constants.CLASS_NAMES.XCOMPONENT, _constants.CLASS_NAMES.XCOMPONENT + '-' + this.context],

	                style: {
	                    zIndex: _constants.MAX_Z_INDEX - 1
	                }

	            }, document.body);

	            (0, _lib.addEventToClass)(this.parentTemplate, _constants.CLASS_NAMES.FOCUS, _constants.EVENT_NAMES.CLICK, function (event) {
	                return _this13.focus();
	            });
	            (0, _lib.addEventToClass)(this.parentTemplate, _constants.CLASS_NAMES.CLOSE, _constants.EVENT_NAMES.CLICK, function (event) {
	                return _this13.close();
	            });

	            this.registerForCleanup(function () {
	                document.body.removeChild(_this13.parentTemplate);
	                delete _this13.parentTemplate;
	            });
	        }

	        /*  Destroy
	            -------
	             Close the component and clean up any listeners and state
	        */

	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            if (this.hasCleanupTasks()) {
	                this.component.log('destroy');
	                this.cleanup();
	            }
	        }

	        /*  Error
	            -----
	             Handle an error
	        */

	    }, {
	        key: 'error',
	        value: function error(err) {
	            this.component.logError('error', { error: err.stack || err.toString() });
	            this.onInit.reject(err);
	            return this.props.onError(err);
	        }
	    }]);

	    return ParentComponent;
	}(_base.BaseComponent);

	/*  Generate Render Methods
	    -----------------------

	    Autogenerate methods like renderIframe, renderPopupToParent, hijackButtonToLightbox
	*/

	var _loop = function _loop() {
	    if (_isArray) {
	        if (_i2 >= _iterator.length) return 'break';
	        _ref2 = _iterator[_i2++];
	    } else {
	        _i2 = _iterator.next();
	        if (_i2.done) return 'break';
	        _ref2 = _i2.value;
	    }

	    var context = _ref2;


	    var contextName = (0, _lib.capitalizeFirstLetter)(context);

	    ParentComponent.prototype['render' + contextName] = function (element) {
	        return this.render(element, context);
	    };

	    ParentComponent.prototype['render' + contextName + 'ToParent'] = function (element) {
	        return this.renderToParent(element, context);
	    };

	    ParentComponent.prototype['hijackButtonTo' + contextName] = function (button, element) {
	        return this.hijackButton(button, element, context);
	    };
	};

	for (var _iterator = _constants.CONTEXT_TYPES_LIST, _isArray = Array.isArray(_iterator), _i2 = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	    var _ref2;

	    var _ret = _loop();

	    if (_ret === 'break') break;
	}

/***/ },
/* 54 */
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

	var _error = __webpack_require__(/*! ../../error */ 1);

	var _lib = __webpack_require__(/*! ../../lib */ 3);

	var _constants = __webpack_require__(/*! ../../constants */ 2);

	var _window = __webpack_require__(/*! ../window */ 50);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	/*  Render Drivers
	    --------------

	    There are various differences in how we treat:

	    - Opening frames and windows
	    - Rendering up to the parent
	    - Showing overlays

	    based on the context we're rendering to.

	    These render drivers split this functionality out in a driver pattern, so our component code doesn't bunch up into a
	    series of if-popup-then-else-if-lightbox code.
	*/

	var RENDER_DRIVERS = exports.RENDER_DRIVERS = (_RENDER_DRIVERS = {}, _defineProperty(_RENDER_DRIVERS, _constants.CONTEXT_TYPES.IFRAME, {

	    overlay: false,

	    render: function render(element) {
	        if (!element) {
	            throw new Error('[' + this.component.tag + '] Must specify element to render to iframe');
	        }
	    },
	    open: function open(element) {
	        var _this = this;

	        if (!element) {
	            throw new Error('[' + this.component.tag + '] Must specify element to render to iframe');
	        }

	        this.iframe = (0, _lib.iframe)(element, null, {
	            name: this.childWindowName
	        });

	        var dimensions = this.component.dimensions || {};
	        this.resize(dimensions.width, dimensions.height);
	        this.restyle();

	        this.window = this.iframe.contentWindow;

	        this.registerForCleanup(function () {

	            _this.window.close();
	            delete _this.window;

	            if (_this.iframe) {

	                if (_this.iframe.parentNode) {
	                    _this.iframe.parentNode.removeChild(_this.iframe);
	                }

	                delete _this.iframe;
	            }
	        });

	        return this;
	    },
	    resize: function resize(width, height) {
	        this.iframe.style.width = width + 'px';
	        this.iframe.style.height = height + 'px';
	    },
	    restyle: function restyle() {
	        this.iframe.style.backgroundColor = 'transparent';
	    },
	    renderToParent: function renderToParent(element) {
	        if (!element) {
	            throw new Error('[' + this.component.tag + '] Must specify element to render to iframe');
	        }
	    },
	    loadUrl: function loadUrl(url) {
	        this.iframe.src = url;
	    }
	}), _defineProperty(_RENDER_DRIVERS, _constants.CONTEXT_TYPES.POPUP, {

	    overlay: true,

	    open: function open() {
	        var _this2 = this;

	        var dimensions = this.component.dimensions || {};

	        var pos = (0, _window.getPosition)({
	            x: dimensions.x,
	            y: dimensions.y,
	            width: dimensions.width,
	            height: dimensions.height
	        });

	        this.window = (0, _lib.popup)('', {
	            name: this.childWindowName,
	            width: dimensions.width,
	            height: dimensions.height,
	            top: pos.y,
	            left: pos.x
	        });

	        this.registerForCleanup(function () {
	            if (_this2.window) {
	                _this2.window.close();
	                delete _this2.window;
	            }
	        });

	        // Sometimes we'll be blocked from opening the popup because we're not in a click event.

	        if ((0, _lib.isWindowClosed)(this.window)) {
	            var err = new _error.PopupOpenError('[' + this.component.tag + '] Can not open popup window - blocked');
	            throw err;
	        }

	        return this;
	    },
	    resize: function resize() {
	        // pass
	    },
	    restyle: function restyle() {
	        // pass
	    },
	    renderToParent: function renderToParent() {

	        // Popups are the only case where we need to do anything special to render to parent.
	        // Because we need a click event, we have to open up the popup from the child the moment it's requested,
	        // Then message up and continue the rendering process from the parent as with any other renderToParent.

	        this.open(null, _constants.CONTEXT_TYPES.POPUP);
	        this.createComponentTemplate();
	    },
	    loadUrl: function loadUrl(url) {
	        this.window.location = url;
	    }
	}), _defineProperty(_RENDER_DRIVERS, _constants.CONTEXT_TYPES.LIGHTBOX, {

	    overlay: true,

	    open: function open() {

	        var element = this.parentTemplate.getElementsByClassName(_constants.CLASS_NAMES.ELEMENT)[0] || document.body;

	        RENDER_DRIVERS[_constants.CONTEXT_TYPES.IFRAME].open.call(this, element);

	        this.iframe.style.zIndex = _constants.MAX_Z_INDEX;
	        this.iframe.style.position = 'fixed';

	        return this;
	    },
	    resize: function resize(width, height) {

	        if (width) {
	            this.iframe.style.width = width + 'px';
	            this.iframe.style.left = '50%';
	            this.iframe.style.marginLeft = '-' + Math.floor(width / 2) + 'px';
	        } else {
	            this.iframe.style.left = 0;
	            this.iframe.style.width = '100%';
	            this.iframe.style.marginLeft = '0px';
	            this.iframe.width = '100%';
	        }

	        if (height) {
	            this.iframe.style.height = height + 'px';
	            this.iframe.style.top = '50%';
	            this.iframe.style.marginTop = '-' + Math.floor(height / 2) + 'px';
	        } else {
	            this.iframe.style.top = 0;
	            this.iframe.style.height = '100%';
	            this.iframe.style.marginTop = '0px';
	            this.iframe.height = '100%';
	        }
	    },
	    restyle: function restyle() {
	        // pass
	    },
	    loadUrl: function loadUrl(url) {
	        this.iframe.src = url;
	    }
	}), _RENDER_DRIVERS);

/***/ },
/* 55 */
/*!******************************************!*\
  !*** ./src/component/parent/validate.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.validateProp = validateProp;
	exports.validateProps = validateProps;
	exports.validate = validate;

	var _constants = __webpack_require__(/*! ../../constants */ 2);

	function validateProp(prop, key, value) {

	    var hasProp = value !== null && value !== undefined && value !== '';

	    if (!hasProp) {

	        // Props can either be optional, or specify a default value

	        if (prop.required !== false && !prop.hasOwnProperty('def')) {
	            throw new Error('Prop is required: ' + key);
	        }

	        return;
	    }

	    if (value === _constants.PROP_DEFER_TO_URL) {
	        return;
	    }

	    if (prop.type === 'function') {

	        if (!(value instanceof Function)) {
	            throw new Error('Prop is not of type function: ' + key);
	        }
	    } else if (prop.type === 'string') {

	        if (typeof value !== 'string') {

	            if (!(prop.getter && value instanceof Function)) {
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
	}

	/*  Validate Props
	    --------------

	    Validate user-defined props. Users can pass props down from the parent into the child component, but first we
	    double check the values are what we expect, based on the props spec defined in the original component.
	*/

	function validateProps(component, props) {

	    props = props || {};

	    // First make sure all of the props we were sent are actually valid prop names

	    for (var _iterator = Object.keys(props), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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

	        if (!component.props.hasOwnProperty(key)) {
	            throw new Error('[' + component.tag + '] Invalid prop: ' + key);
	        }
	    }

	    // Then loop over the props we expect, and make sure they're all present and valid

	    for (var _iterator2 = Object.keys(component.props), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
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


	        var prop = component.props[_key];
	        var value = props[_key];

	        validateProp(prop, _key, value);
	    }
	}

	/*  Validate
	    --------

	    Validate parent component options
	*/

	function validate(component, options) {

	    var props = options.props || {};

	    if (props.env && !component.envUrls[props.env]) {
	        throw new Error('Invalid env: ' + props.env);
	    }
	}

/***/ },
/* 56 */
/*!***************************************!*\
  !*** ./src/component/parent/props.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.propsToQuery = propsToQuery;
	exports.normalizeParentProps = normalizeParentProps;

	var _promise = __webpack_require__(/*! sync-browser-mocks/src/promise */ 8);

	var _validate = __webpack_require__(/*! ./validate */ 55);

	var _lib = __webpack_require__(/*! ../../lib */ 3);

	var _props = __webpack_require__(/*! ../props */ 51);

	var _constants = __webpack_require__(/*! ../../constants */ 2);

	/*  Props to Query
	    --------------

	    Turn props into an initial query string to open the component with

	    string -> string
	    bool   -> 1
	    object -> json
	    number -> string
	*/

	function propsToQuery(propsDef, props) {

	    var params = [];

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

	            if (prop.queryParam === false) {
	                return;
	            }

	            if (value === _constants.PROP_DEFER_TO_URL) {
	                return;
	            }

	            if (prop.getter) {
	                return value.call().then(function (result) {
	                    (0, _validate.validateProp)(prop, key, result);
	                    return result;
	                });
	            }
	        }).then(function (value) {

	            if (!value) {
	                return;
	            }

	            var result = void 0;

	            if (typeof value === 'boolean') {
	                result = '1';
	            } else if (typeof value === 'string') {
	                result = value.toString();
	            } else if (typeof value === 'function') {
	                return;
	            } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
	                result = JSON.stringify(value);
	            } else if (typeof value === 'number') {
	                result = value.toString();
	            }

	            params.push((0, _lib.urlEncode)(queryParam) + '=' + (0, _lib.urlEncode)(result));
	        });
	    })).then(function () {
	        return params.join('&');
	    });
	}

	function normalizeParentProps(component, instance, props) {
	    props = (0, _props.normalizeProps)(component, instance, props);

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

	        var value = props[key];

	        if (value) {
	            var prop = component.props[key];

	            if (prop.autoClose) {
	                props[key] = function () {
	                    var _this = this,
	                        _arguments = arguments;

	                    instance.component.log('autoclose', { prop: key });
	                    return instance.close().then(function () {
	                        return value.apply(_this, _arguments);
	                    });
	                };
	            }
	        }
	    };

	    for (var _iterator = Object.keys(props), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	        var _ref;

	        var _ret = _loop();

	        if (_ret === 'break') break;
	    }

	    return props;
	}

/***/ },
/* 57 */
/*!******************************************!*\
  !*** ./src/component/component/props.js ***!
  \******************************************/
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	/*  Internal Props
	    --------------

	    We define and use certain props by default, for configuration and events that are used at the framework level.
	    These follow the same format as regular props, and are classed as reserved words that may not be overriden by users.
	*/

	var internalProps = exports.internalProps = {

	    // A custom url to use to render the component

	    url: {
	        type: 'string',
	        required: false,
	        queryParam: false
	    },

	    // The desired env in which the component is being rendered. Used to determine the correct url to use from envUrls

	    env: {
	        type: 'string',
	        required: false
	    },

	    // A millisecond timeout before onTimeout is called

	    timeout: {
	        type: 'number',
	        required: false,
	        queryParam: false
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
	        memoize: true,
	        promisify: true
	    },

	    // When we time-out before getting an INIT message from the child. Defaults to onError if no handler passed.

	    onTimeout: {
	        type: 'function',
	        required: false,
	        memoize: true,
	        autoClose: true,
	        promisify: true,
	        def: function def(err) {
	            return this.props.onError(err);
	        }
	    },

	    // When the component experiences an error

	    onError: {
	        type: 'function',
	        required: false,
	        autoClose: true,
	        promisify: true,
	        def: function def(err) {
	            console.error(err.message, '\n', err.stack || err.toString());
	        },

	        once: true
	    }
	};

/***/ },
/* 58 */
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

	var _props = __webpack_require__(/*! ./props */ 57);

	var _constants = __webpack_require__(/*! ../../constants */ 2);

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

	            if (_props.internalProps.hasOwnProperty(key)) {
	                throw new Error('[' + options.tag + '] Reserved prop name: ' + key);
	            }

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
	            if (!options.dimensions || !options.dimensions.width || !options.dimensions.height) {
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

	    if (!options.url || !(typeof options.url === 'string')) {
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
/* 59 */
/*!******************************************************!*\
  !*** ./src/component/component/templates/parent.htm ***!
  \******************************************************/
/***/ function(module, exports) {

	module.exports = "<div class=\"{CLASS.OVERLAY} {CLASS.FOCUS}\">\n    <a href=\"#{CLASS.CLOSE}\" class=\"{CLASS.CLOSE}\"></a>\n\n    <div class=\"{CLASS.ELEMENT}\"></div>\n</div>\n\n<style>\n    #{id}.{CLASS.XCOMPONENT} {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n    }\n\n    #{id}.{CLASS.XCOMPONENT} .{CLASS.OVERLAY} {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        background-color: rgba(0, 0, 0, 0.8);\n    }\n\n    #{id}.{CLASS.XCOMPONENT} .{CLASS.OVERLAY}.xcomponent-popup {\n        cursor: pointer;\n    }\n\n    #{id}.{CLASS.XCOMPONENT} .{CLASS.CLOSE} {\n        position: absolute;\n        right: 16px;\n        top: 16px;\n        width: 16px;\n        height: 16px;\n        opacity: 0.6;\n    }\n\n    #{id}.{CLASS.XCOMPONENT} .{CLASS.CLOSE}:hover {\n        opacity: 1;\n    }\n\n    #{id}.{CLASS.XCOMPONENT} .{CLASS.CLOSE}:before, .{CLASS.CLOSE}:after {\n        position: absolute;\n        left: 8px;\n        content: ' ';\n        height: 16px;\n        width: 2px;\n        background-color: white;\n    }\n\n    #{id}.{CLASS.XCOMPONENT} .{CLASS.CLOSE}:before {\n        transform: rotate(45deg);\n    }\n\n    #{id}.{CLASS.XCOMPONENT} .{CLASS.CLOSE}:after {\n        transform: rotate(-45deg);\n    }\n</style>"

/***/ },
/* 60 */
/*!*********************************************************!*\
  !*** ./src/component/component/templates/component.htm ***!
  \*********************************************************/
/***/ function(module, exports) {

	module.exports = ""

/***/ },
/* 61 */
/*!******************************!*\
  !*** ./src/drivers/index.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _script = __webpack_require__(/*! ./script */ 62);

	Object.keys(_script).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _script[key];
	    }
	  });
	});

	var _react = __webpack_require__(/*! ./react */ 63);

	Object.keys(_react).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _react[key];
	    }
	  });
	});

	var _angular = __webpack_require__(/*! ./angular */ 64);

	Object.keys(_angular).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _angular[key];
	    }
	  });
	});

	var _ember = __webpack_require__(/*! ./ember */ 65);

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
/* 62 */
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

	            component.init(props).render(container);
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
/* 63 */
/*!******************************!*\
  !*** ./src/drivers/react.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.react = undefined;

	var _lib = __webpack_require__(/*! ../lib */ 3);

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

	                var parent = component.init((0, _lib.extend)({}, this.props));

	                this.setState({ parent: parent });

	                parent.renderIframe(window.ReactDOM.findDOMNode(this));
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
/* 64 */
/*!********************************!*\
  !*** ./src/drivers/angular.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.angular = undefined;

	var _lib = __webpack_require__(/*! ../lib */ 3);

	var angular = exports.angular = {
	    isActive: function isActive() {
	        return Boolean(window.angular);
	    },
	    register: function register(component) {

	        var register = (0, _lib.once)(function (moduleName) {

	            window.angular.module(moduleName).directive((0, _lib.dasherizeToCamel)(component.tag), function () {

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

	                    var prop = component.props[key];

	                    if (prop.type === 'function' || prop.type === 'object') {
	                        scope[key] = '=';
	                    } else if (prop.type === 'string' || prop.type === 'boolean' || prop.type === 'number') {
	                        scope[key] = '@';
	                    } else {
	                        throw new Error('Unrecognized prop type: ' + prop.type);
	                    }
	                }

	                return {
	                    scope: scope,

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

	                        var parent = component.init(getProps());
	                        parent.render($element[0]);

	                        $scope.$watch(function () {
	                            parent.updateProps(getProps());
	                        });
	                    }
	                };
	            });
	        });

	        var bootstrap = window.angular.bootstrap;

	        window.angular.bootstrap = function (el, modules) {
	            register(modules[0]);
	            return bootstrap.apply(this, arguments);
	        };

	        var module = window.angular.module;

	        window.angular.module = function (moduleName) {
	            var result = module.apply(this, arguments);
	            register(moduleName);
	            return result;
	        };
	    }
	};

/***/ },
/* 65 */
/*!******************************!*\
  !*** ./src/drivers/ember.js ***!
  \******************************/
/***/ function(module, exports) {

	"use strict";

/***/ }
/******/ ])
});
;