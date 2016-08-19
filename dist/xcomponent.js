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
	exports.registerLogger = undefined;
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

	var _lib = __webpack_require__(/*! ./lib */ 2);

	Object.defineProperty(exports, 'registerLogger', {
	    enumerable: true,
	    get: function get() {
	        return _lib.registerLogger;
	    }
	});

	var _src = __webpack_require__(/*! post-robot/src */ 10);

	var _src2 = _interopRequireDefault(_src);

	var _component = __webpack_require__(/*! ./component */ 37);

	var _constants = __webpack_require__(/*! ./constants */ 42);

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
  !*** ./src/lib/index.js ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _dom = __webpack_require__(/*! ./dom */ 3);

	Object.keys(_dom).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _dom[key];
	    }
	  });
	});

	var _fn = __webpack_require__(/*! ./fn */ 4);

	Object.keys(_fn).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _fn[key];
	    }
	  });
	});

	var _promise = __webpack_require__(/*! ./promise */ 6);

	Object.keys(_promise).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _promise[key];
	    }
	  });
	});

	var _util = __webpack_require__(/*! ./util */ 5);

	Object.keys(_util).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _util[key];
	    }
	  });
	});

	var _base = __webpack_require__(/*! ./base32 */ 8);

	Object.keys(_base).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _base[key];
	    }
	  });
	});

	var _logger = __webpack_require__(/*! ./logger */ 9);

	Object.keys(_logger).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _logger[key];
	    }
	  });
	});

/***/ },
/* 3 */
/*!************************!*\
  !*** ./src/lib/dom.js ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.parseQuery = undefined;

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
	exports.addEventToClass = addEventToClass;
	exports.template = template;
	exports.getQueryParam = getQueryParam;
	exports.getDomain = getDomain;
	exports.formatQuery = formatQuery;
	exports.extendQuery = extendQuery;
	exports.extendUrl = extendUrl;

	var _fn = __webpack_require__(/*! ./fn */ 4);

	var _util = __webpack_require__(/*! ./util */ 5);

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
	        return !win || win.closed || typeof win.closed === 'undefined';
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

	var parseQuery = exports.parseQuery = (0, _fn.memoize)(function (queryString) {

	    var params = {};

	    if (!queryString) {
	        return params;
	    }

	    if (queryString.indexOf('=') === -1) {
	        throw new Error('Can not parse query string params: ' + queryString);
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
	});

	function getQueryParam(name) {
	    return parseQuery(window.location.search.slice(1))[name];
	}

	function getDomain(url) {

	    var domain = void 0;

	    if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
	        domain = url;
	    } else {
	        domain = window.location.href;
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

/***/ },
/* 4 */
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
	exports.throttle = throttle;
	exports.debounce = debounce;

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
	            args = JSON.stringify(Array.prototype.slice.call(arguments));
	        } catch (err) {
	            throw new Error('Arguments not serializable -- can not be used to memoize');
	        }

	        if (!results.hasOwnProperty(args)) {
	            results[args] = method.apply(this, arguments);
	        }

	        return results[args];
	    };
	}

	function throttle(method) {
	    var time = arguments.length <= 1 || arguments[1] === undefined ? 100 : arguments[1];


	    var enabled = true;

	    return function () {

	        if (!enabled) {
	            return;
	        }

	        enabled = false;
	        setTimeout(function () {
	            enabled = true;
	        }, time);

	        return method.apply(this, arguments);
	    };
	}

	function debounce(method) {
	    var time = arguments.length <= 1 || arguments[1] === undefined ? 100 : arguments[1];


	    var timeout = void 0;

	    return function () {
	        var _this = this,
	            _arguments = arguments;

	        clearTimeout(timeout);

	        setTimeout(function () {
	            return method.apply(_this, _arguments);
	        }, time);
	    };
	}

/***/ },
/* 5 */
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

/***/ },
/* 6 */
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

	var _promise = __webpack_require__(/*! sync-browser-mocks/src/promise */ 7);

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
	    var prom = void 0;

	    return function () {
	        var _this2 = this;

	        prom = prom || new _promise.SyncPromise(function (resolve, reject) {
	            var result = method.call(_this2, resolve, reject);

	            if (result && result.then instanceof Function) {
	                return result.then(resolve, reject);
	            }

	            if (result !== undefined) {
	                return resolve(result);
	            }
	        });

	        return prom;
	    };
	}

	function delay(time) {
	    return new _promise.SyncPromise(function (resolve) {
	        setTimeout(resolve, time);
	    });
	}

/***/ },
/* 7 */
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

	var possiblyUnhandledPromises = [];
	var possiblyUnhandledPromiseTimeout;

	function addPossiblyUnhandledPromise(promise) {
	    possiblyUnhandledPromises.push(promise);
	    possiblyUnhandledPromiseTimeout = possiblyUnhandledPromiseTimeout || setTimeout(flushPossiblyUnhandledPromises, 1);
	}

	function flushPossiblyUnhandledPromises() {
	    possiblyUnhandledPromiseTimeout = null;
	    var promises = possiblyUnhandledPromises;
	    possiblyUnhandledPromises = [];
	    for (var i = 0; i < promises.length; i++) {
	        var promise = promises[i];
	        if (!promise.hasHandlers && promise.rejected) {
	            logError(promise.value);
	        }
	    }
	}

	function logError(err) {
	    setTimeout(function () {
	        throw err;
	    }, 1);
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

	var SyncPromise = exports.SyncPromise = function SyncPromise(handler, parent) {

	    this.parent = parent;

	    this.resolved = false;
	    this.rejected = false;

	    this.hasHandlers = false;

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

	SyncPromise.prototype.dispatch = function () {
	    var _this = this;

	    if (!this.resolved && !this.rejected) {
	        return;
	    }

	    var _loop = function _loop() {

	        var handler = _this.handlers.shift();

	        try {
	            if (_this.resolved) {
	                result = handler.onSuccess ? handler.onSuccess(_this.value) : _this.value;
	            } else {
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
	        var result, error;

	        var _ret = _loop();

	        if (_ret === 'continue') continue;
	    }
	};

	SyncPromise.prototype.then = function (onSuccess, onError) {

	    var promise = new SyncPromise(null, this);

	    this.handlers.push({
	        promise: promise,
	        onSuccess: onSuccess,
	        onError: onError
	    });

	    this.hasHandlers = true;

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
/* 8 */
/*!***************************!*\
  !*** ./src/lib/base32.js ***!
  \***************************/
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.b32encode = b32encode;
	exports.b32decode = b32decode;
	/* eslint-disable */

	// This would be the place to edit if you want a different
	// Base32 implementation

	var alphabet = '0123456789abcdefghjkmnpqrtuvwxyz';
	var alias = { o: 0, i: 1, l: 1, s: 5 };

	/**
	 * Build a lookup table and memoize it
	 *
	 * Return an object that maps a character to its
	 * byte value.
	 */

	var _lookup = function lookup() {
	    var table = {};
	    // Invert 'alphabet'
	    for (var i = 0; i < alphabet.length; i++) {
	        table[alphabet[i]] = i;
	    }
	    // Splice in 'alias'
	    for (var key in alias) {
	        if (!alias.hasOwnProperty(key)) continue;
	        table[key] = table['' + alias[key]];
	    }
	    _lookup = function lookup() {
	        return table;
	    };
	    return table;
	};

	/**
	 * A streaming encoder
	 *
	 *     var encoder = new base32.Encoder()
	 *     var output1 = encoder.update(input1)
	 *     var output2 = encoder.update(input2)
	 *     var lastoutput = encode.update(lastinput, true)
	 */

	function Encoder() {
	    var skip = 0; // how many bits we will skip from the first byte
	    var bits = 0; // 5 high bits, carry from one byte to the next

	    this.output = '';

	    // Read one byte of input
	    // Should not really be used except by "update"
	    this.readByte = function (byte) {
	        // coerce the byte to an int
	        if (typeof byte == 'string') byte = byte.charCodeAt(0);

	        if (skip < 0) {
	            // we have a carry from the previous byte
	            bits |= byte >> -skip;
	        } else {
	            // no carry
	            bits = byte << skip & 248;
	        }

	        if (skip > 3) {
	            // not enough data to produce a character, get us another one
	            skip -= 8;
	            return 1;
	        }

	        if (skip < 4) {
	            // produce a character
	            this.output += alphabet[bits >> 3];
	            skip += 5;
	        }

	        return 0;
	    };

	    // Flush any remaining bits left in the stream
	    this.finish = function (check) {
	        var output = this.output + (skip < 0 ? alphabet[bits >> 3] : '') + (check ? '$' : '');
	        this.output = '';
	        return output;
	    };
	}

	/**
	 * Process additional input
	 *
	 * input: string of bytes to convert
	 * flush: boolean, should we flush any trailing bits left
	 *        in the stream
	 * returns: a string of characters representing 'input' in base32
	 */

	Encoder.prototype.update = function (input, flush) {
	    for (var i = 0; i < input.length;) {
	        i += this.readByte(input[i]);
	    }
	    // consume all output
	    var output = this.output;
	    this.output = '';
	    if (flush) {
	        output += this.finish();
	    }
	    return output;
	};

	// Functions analogously to Encoder

	function Decoder() {
	    var skip = 0; // how many bits we have from the previous character
	    var byte = 0; // current byte we're producing

	    this.output = '';

	    // Consume a character from the stream, store
	    // the output in this.output. As before, better
	    // to use update().
	    this.readChar = function (char) {
	        if (typeof char != 'string') {
	            if (typeof char == 'number') {
	                char = String.fromCharCode(char);
	            }
	        }
	        char = char.toLowerCase();
	        var val = _lookup()[char];
	        if (typeof val == 'undefined') {
	            // character does not exist in our lookup table
	            return; // skip silently. An alternative would be:
	            // throw Error('Could not find character "' + char + '" in lookup table.')
	        }
	        val <<= 3; // move to the high bits
	        byte |= val >>> skip;
	        skip += 5;
	        if (skip >= 8) {
	            // we have enough to preduce output
	            this.output += String.fromCharCode(byte);
	            skip -= 8;
	            if (skip > 0) byte = val << 5 - skip & 255;else byte = 0;
	        }
	    };

	    this.finish = function (check) {
	        var output = this.output + (skip < 0 ? alphabet[bits >> 3] : '') + (check ? '$' : '');
	        this.output = '';
	        return output;
	    };
	}

	Decoder.prototype.update = function (input, flush) {
	    for (var i = 0; i < input.length; i++) {
	        this.readChar(input[i]);
	    }
	    var output = this.output;
	    this.output = '';
	    if (flush) {
	        output += this.finish();
	    }
	    return output;
	};

	/** Convenience functions
	 *
	 * These are the ones to use if you just have a string and
	 * want to convert it without dealing with streams and whatnot.
	 */

	// String of data goes in, Base32-encoded string comes out.
	function b32encode(input) {
	    var encoder = new Encoder();
	    var output = encoder.update(input, true);
	    return output;
	}

	// Base32-encoded string goes in, decoded data comes out.
	function b32decode(input) {
	    var decoder = new Decoder();
	    var output = decoder.update(input, true);
	    return output;
	}

/***/ },
/* 9 */
/*!***************************!*\
  !*** ./src/lib/logger.js ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.logger = undefined;
	exports.registerLogger = registerLogger;

	var _promise = __webpack_require__(/*! sync-browser-mocks/src/promise */ 7);

	var customLogger = void 0;

	function registerLogger(newLogger) {
	    customLogger = newLogger;
	}

	var logger = exports.logger = {
	    debug: function debug(event, payload) {
	        return customLogger ? customLogger.debug(event, payload) : window.console && window.console.debug && window.console.debug(event, payload);
	    },
	    info: function info(event, payload) {
	        return customLogger ? customLogger.info(event, payload) : window.console && window.console.info && window.console.info(event, payload);
	    },
	    warn: function warn(event, payload) {
	        return customLogger ? customLogger.warn(event, payload) : window.console && window.console.warn && window.console.warn(event, payload);
	    },
	    error: function error(event, payload) {
	        return customLogger ? customLogger.error(event, payload) : window.console && window.console.error && window.console.error(event, payload);
	    },
	    flush: function flush() {
	        if (customLogger && customLogger.flush) {
	            return customLogger.flush();
	        }
	        return _promise.SyncPromise.resolve();
	    }
	};

/***/ },
/* 10 */
/*!***********************************!*\
  !*** ./~/post-robot/src/index.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Promise = undefined;

	var _interface = __webpack_require__(/*! ./interface */ 11);

	Object.keys(_interface).forEach(function (key) {
	    if (key === "default") return;
	    Object.defineProperty(exports, key, {
	        enumerable: true,
	        get: function get() {
	            return _interface[key];
	        }
	    });
	});

	var _lib = __webpack_require__(/*! ./lib */ 18);

	Object.defineProperty(exports, 'Promise', {
	    enumerable: true,
	    get: function get() {
	        return _lib.Promise;
	    }
	});

	var _drivers = __webpack_require__(/*! ./drivers */ 16);

	var _global = __webpack_require__(/*! ./global */ 24);

	function init() {

	    if (!_global.global.initialized) {

	        _lib.util.listen(window, 'message', _drivers.messageListener);

	        (0, _lib.initOnReady)();
	        (0, _lib.listenForMethods)();
	    }

	    _global.global.initialized = true;
	}

	init();

	exports['default'] = module.exports;

/***/ },
/* 11 */
/*!*********************************************!*\
  !*** ./~/post-robot/src/interface/index.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.linkUrl = exports.util = exports.openBridge = exports.reset = exports.parent = undefined;

	var _client = __webpack_require__(/*! ./client */ 12);

	Object.keys(_client).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _client[key];
	    }
	  });
	});

	var _server = __webpack_require__(/*! ./server */ 35);

	Object.keys(_server).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _server[key];
	    }
	  });
	});

	var _config = __webpack_require__(/*! ./config */ 36);

	Object.keys(_config).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _config[key];
	    }
	  });
	});

	var _drivers = __webpack_require__(/*! ../drivers */ 16);

	Object.defineProperty(exports, 'reset', {
	  enumerable: true,
	  get: function get() {
	    return _drivers.resetListeners;
	  }
	});

	var _bridge = __webpack_require__(/*! ../compat/bridge */ 28);

	Object.defineProperty(exports, 'openBridge', {
	  enumerable: true,
	  get: function get() {
	    return _bridge.openBridge;
	  }
	});

	var _util = __webpack_require__(/*! ../lib/util */ 21);

	Object.defineProperty(exports, 'util', {
	  enumerable: true,
	  get: function get() {
	    return _util.util;
	  }
	});

	var _windows = __webpack_require__(/*! ../lib/windows */ 23);

	Object.defineProperty(exports, 'linkUrl', {
	  enumerable: true,
	  get: function get() {
	    return _windows.linkUrl;
	  }
	});
	var parent = exports.parent = (0, _windows.getParentWindow)();

/***/ },
/* 12 */
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

	var _conf = __webpack_require__(/*! ../conf */ 13);

	var _drivers = __webpack_require__(/*! ../drivers */ 16);

	var _lib = __webpack_require__(/*! ../lib */ 18);

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

	    if (!win) {
	        return new _lib.promise.Promise(function (resolve, reject) {
	            return reject(new Error('Window does not have a parent'));
	        });
	    }

	    return send(win, name, data, options, callback);
	}

/***/ },
/* 13 */
/*!****************************************!*\
  !*** ./~/post-robot/src/conf/index.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _config = __webpack_require__(/*! ./config */ 14);

	Object.keys(_config).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _config[key];
	    }
	  });
	});

	var _constants = __webpack_require__(/*! ./constants */ 15);

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
/* 14 */
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

	var _constants = __webpack_require__(/*! ./constants */ 15);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var CONFIG = exports.CONFIG = {

	    ALLOW_POSTMESSAGE_POPUP: false,

	    LOG_LEVEL: 'info',

	    ACK_TIMEOUT: 500,

	    LOG_TO_PAGE: false,

	    MOCK_MODE: false,

	    ALLOWED_POST_MESSAGE_METHODS: (_ALLOWED_POST_MESSAGE = {}, _defineProperty(_ALLOWED_POST_MESSAGE, _constants.CONSTANTS.SEND_STRATEGIES.POST_MESSAGE, true), _defineProperty(_ALLOWED_POST_MESSAGE, _constants.CONSTANTS.SEND_STRATEGIES.GLOBAL_METHOD, true), _defineProperty(_ALLOWED_POST_MESSAGE, _constants.CONSTANTS.SEND_STRATEGIES.REMOTE_BRIDGE, true), _defineProperty(_ALLOWED_POST_MESSAGE, _constants.CONSTANTS.SEND_STRATEGIES.LOCAL_BRIDGE, true), _ALLOWED_POST_MESSAGE)
	};

/***/ },
/* 15 */
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
	        REMOTE_BRIDGE: 'postrobot_remote_bridge',
	        LOCAL_BRIDGE: 'postrobot_local_bridge'
	    }
	};

	var POST_MESSAGE_NAMES_LIST = exports.POST_MESSAGE_NAMES_LIST = Object.keys(CONSTANTS.POST_MESSAGE_NAMES).map(function (key) {
	    return CONSTANTS.POST_MESSAGE_NAMES[key];
	});

/***/ },
/* 16 */
/*!*******************************************!*\
  !*** ./~/post-robot/src/drivers/index.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _receive = __webpack_require__(/*! ./receive */ 17);

	Object.keys(_receive).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _receive[key];
	    }
	  });
	});

	var _send = __webpack_require__(/*! ./send */ 31);

	Object.keys(_send).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _send[key];
	    }
	  });
	});

	var _listeners = __webpack_require__(/*! ./listeners */ 34);

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
/* 17 */
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

	var _conf = __webpack_require__(/*! ../../conf */ 13);

	var _lib = __webpack_require__(/*! ../../lib */ 18);

	var _compat = __webpack_require__(/*! ../../compat */ 27);

	var _global = __webpack_require__(/*! ../../global */ 24);

	var _send = __webpack_require__(/*! ../send */ 31);

	var _types = __webpack_require__(/*! ./types */ 33);

	_global.global.receivedMessages = _global.global.receivedMessages || [];

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
	        },
	        'window.opener.parent': function windowOpenerParent(id) {
	            return (0, _lib.getOpener)(window).parent;
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

	function getTargetWindow(source, message) {

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


	    if ((0, _lib.isSameDomain)(source, false)) {
	        origin = _lib.util.getDomain(source);
	    }

	    var message = parseMessage(data);

	    if (!message) {
	        return;
	    }

	    if (message.sourceDomain.indexOf('mock://') === 0) {
	        origin = message.sourceDomain;
	    }

	    if (_global.global.receivedMessages.indexOf(message.id) === -1) {
	        _global.global.receivedMessages.push(message.id);
	    } else {
	        return;
	    }

	    if (message.sourceDomain !== origin) {
	        throw new Error('Message source domain ' + message.sourceDomain + ' does not match message origin ' + origin);
	    }

	    (0, _lib.registerWindow)(message.source, source, origin);

	    // Only allow self-certifying original domain when proxying through same domain

	    if (message.originalSourceDomain !== origin) {
	        if (!(0, _lib.isSameDomain)(source)) {
	            throw new Error('Message original source domain ' + message.originalSourceDomain + ' does not match message origin ' + origin);
	        }
	    }

	    var targetWindow = void 0;

	    try {
	        targetWindow = getTargetWindow(source, message);
	    } catch (err) {
	        return _lib.log.debug(err.message);
	    }

	    var level = void 0;

	    if (_conf.POST_MESSAGE_NAMES_LIST.indexOf(message.name) !== -1 || message.type === _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK || targetWindow) {
	        level = 'debug';
	    } else if (message.ack === 'error') {
	        level = 'error';
	    } else {
	        level = 'info';
	    }

	    _lib.log.logLevel(level, [targetWindow ? '#receiveproxy' : '#receive', message.type, message.name, message]);

	    if (targetWindow) {

	        if ((0, _lib.isWindowClosed)(targetWindow)) {
	            return _lib.log.debug('Target window is closed: ' + message.target + ' - can not proxy ' + message.type + ' ' + message.name);
	        }

	        delete message.target;
	        return (0, _send.sendMessage)(targetWindow, message, message.domain || '*', true);
	    }

	    var originalSource = source;

	    if (message.originalSource !== message.source) {

	        if (message.sourceHint) {
	            originalSource = getWindow(message.sourceHint, message.originalSource);
	            delete message.sourceHint;
	        } else {
	            originalSource = (0, _lib.getWindowById)(message.originalSource);
	            if (!originalSource) {
	                throw new Error('Can not find original message source: ' + message.originalSource);
	            }
	        }

	        (0, _lib.registerWindow)(message.originalSource, originalSource, message.originalSourceDomain);
	    }

	    if (originalSource !== source) {
	        (0, _compat.registerBridge)(source, originalSource);
	    }

	    if ((0, _lib.isWindowClosed)(originalSource)) {
	        return _lib.log.debug('Source window is closed: ' + message.originalSource + ' - can not send ' + message.type + ' ' + message.name);
	    }

	    if (_conf.CONFIG.MOCK_MODE) {
	        return _types.RECEIVE_MESSAGE_TYPES[message.type](originalSource, message, origin);
	    }

	    if (message.data) {
	        message.data = (0, _lib.deserializeMethods)(originalSource, message.data);
	    }

	    _types.RECEIVE_MESSAGE_TYPES[message.type](originalSource, message, origin);
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
/* 18 */
/*!***************************************!*\
  !*** ./~/post-robot/src/lib/index.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _promise = __webpack_require__(/*! ./promise */ 19);

	Object.keys(_promise).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _promise[key];
	    }
	  });
	});

	var _util = __webpack_require__(/*! ./util */ 21);

	Object.keys(_util).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _util[key];
	    }
	  });
	});

	var _log = __webpack_require__(/*! ./log */ 22);

	Object.keys(_log).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _log[key];
	    }
	  });
	});

	var _windows = __webpack_require__(/*! ./windows */ 23);

	Object.keys(_windows).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _windows[key];
	    }
	  });
	});

	var _methods = __webpack_require__(/*! ./methods */ 25);

	Object.keys(_methods).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _methods[key];
	    }
	  });
	});

	var _tick = __webpack_require__(/*! ./tick */ 20);

	Object.keys(_tick).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _tick[key];
	    }
	  });
	});

	var _ready = __webpack_require__(/*! ./ready */ 26);

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
/* 19 */
/*!*****************************************!*\
  !*** ./~/post-robot/src/lib/promise.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.promise = exports.Promise = undefined;

	var _promise = __webpack_require__(/*! sync-browser-mocks/src/promise */ 7);

	var _tick = __webpack_require__(/*! ./tick */ 20);

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
/* 20 */
/*!**************************************!*\
  !*** ./~/post-robot/src/lib/tick.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.nextTick = nextTick;

	var _util = __webpack_require__(/*! ./util */ 21);

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
/* 21 */
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

	var _conf = __webpack_require__(/*! ../conf */ 13);

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
	        var allowMockDomain = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];


	        win = win || window;

	        if (win.mockDomain && allowMockDomain && win.mockDomain.indexOf('mock://') === 0) {
	            return win.mockDomain;
	        }

	        return win.location.protocol + '//' + win.location.host;
	    },
	    getDomainFromUrl: function getDomainFromUrl(url) {

	        var domain = void 0;

	        if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
	            domain = url;
	        } else {
	            return this.getDomain();
	        }

	        domain = domain.split('/').slice(0, 3).join('/');

	        return domain;
	    },
	    isFrameOwnedBy: function isFrameOwnedBy(win, frame) {

	        try {
	            if (frame.parent === win) {
	                return true;
	            } else {
	                return false;
	            }
	        } catch (err) {

	            try {
	                for (var i = 0; i < win.frames.length; i++) {
	                    if (win.frames[i] === frame) {
	                        return true;
	                    }
	                }
	            } catch (err2) {
	                return false;
	            }
	        }

	        return false;
	    }
	};

/***/ },
/* 22 */
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

	var _util = __webpack_require__(/*! ./util */ 21);

	var _conf = __webpack_require__(/*! ../conf */ 13);

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

	        args.unshift(window.location.pathname);
	        args.unshift(window.location.host);
	        args.unshift('<' + _util.util.getType().toLowerCase() + '>');
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
/* 23 */
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
	exports.getWindowDomain = getWindowDomain;
	exports.registerWindow = registerWindow;
	exports.isWindowEqual = isWindowEqual;
	exports.isSameTopWindow = isSameTopWindow;
	exports.linkUrl = linkUrl;

	var _util = __webpack_require__(/*! ./util */ 21);

	var _global = __webpack_require__(/*! ../global */ 24);

	function safeGet(obj, prop) {

	    var result = void 0;

	    try {
	        result = obj[prop];
	    } catch (err) {
	        // pass
	    }

	    return result;
	}

	_global.global.domainMatches = _global.global.domainMatches || [];
	var domainMatchTimeout = void 0;

	function isSameDomain(win) {
	    var allowMockDomain = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];


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
	            return allowMockDomain ? _match.match : _match.actualMatch;
	        }
	    }

	    var match = false;
	    var actualMatch = false;

	    try {
	        if (_util.util.getDomain(window) === _util.util.getDomain(win)) {
	            match = true;
	        }

	        if (_util.util.getDomain(window, false) === _util.util.getDomain(win, false)) {
	            actualMatch = true;
	        }
	    } catch (err) {
	        // pass
	    }

	    _global.global.domainMatches.push({
	        win: win,
	        match: match,
	        actualMatch: actualMatch
	    });

	    if (!domainMatchTimeout) {
	        domainMatchTimeout = setTimeout(function () {
	            _global.global.domainMatches = [];
	            domainMatchTimeout = null;
	        }, 1);
	    }

	    return allowMockDomain ? match : actualMatch;
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

	_global.global.windows = _global.global.windows || [];
	var windowId = window.name || _util.util.getType() + '_' + _util.util.uniqueID();

	function getWindowId(win) {

	    if (win === window) {
	        return windowId;
	    }

	    for (var i = _global.global.windows.length - 1; i >= 0; i--) {
	        var map = _global.global.windows[i];

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

	    for (var i = _global.global.windows.length - 1; i >= 0; i--) {
	        var map = _global.global.windows[i];

	        try {
	            if (map.id === id) {
	                return map.win;
	            }
	        } catch (err) {
	            continue;
	        }
	    }
	}

	function getWindowDomain(win) {

	    if (win === window) {
	        return _util.util.getDomain(window);
	    }

	    for (var i = _global.global.windows.length - 1; i >= 0; i--) {
	        var map = _global.global.windows[i];

	        try {
	            if (map.win === win && map.domain) {
	                return map.domain;
	            }
	        } catch (err) {
	            continue;
	        }
	    }
	}

	function registerWindow(id, win, domain) {

	    for (var _iterator2 = _global.global.windows, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
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
	                map.domain = domain;
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

	    _global.global.windows.push({
	        id: id,
	        win: win,
	        domain: domain
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

	function linkUrl(name, win, url) {

	    var domain = _util.util.getDomainFromUrl(url);

	    registerWindow(name, win, domain);

	    _global.global.domainMatches.push({
	        win: win,
	        match: _util.util.getDomain() === domain
	    });
	}

	var openWindow = window.open;

	window.open = function (url, name, x, y) {

	    if (!name) {
	        name = _util.util.uniqueID();
	        arguments[1] = name;
	    }

	    var win = _util.util.apply(openWindow, this, arguments);

	    if (url) {
	        linkUrl(name, win, url);
	    } else {
	        registerWindow(name, win);
	    }

	    return win;
	};

/***/ },
/* 24 */
/*!************************************!*\
  !*** ./~/post-robot/src/global.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.global = undefined;

	var _conf = __webpack_require__(/*! ./conf */ 13);

	var global = exports.global = window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT] = window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT] || {};

/***/ },
/* 25 */
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

	var _conf = __webpack_require__(/*! ../conf */ 13);

	var _util = __webpack_require__(/*! ./util */ 21);

	var _interface = __webpack_require__(/*! ../interface */ 11);

	var _log = __webpack_require__(/*! ./log */ 22);

	var _promise = __webpack_require__(/*! ./promise */ 19);

	var _global = __webpack_require__(/*! ../global */ 24);

	_global.global.methods = _global.global.methods || {};

	var listenForMethods = exports.listenForMethods = _util.util.once(function () {
	    (0, _interface.on)(_conf.CONSTANTS.POST_MESSAGE_NAMES.METHOD, function (source, data) {

	        if (!_global.global.methods[data.id]) {
	            throw new Error('Could not find method with id: ' + data.id);
	        }

	        if (_global.global.methods[data.id].win !== source) {
	            throw new Error('Method window does not match');
	        }

	        var method = _global.global.methods[data.id].method;

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

	    _global.global.methods[id] = {
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
/* 26 */
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

	var _conf = __webpack_require__(/*! ../conf */ 13);

	var _windows = __webpack_require__(/*! ./windows */ 23);

	var _interface = __webpack_require__(/*! ../interface */ 11);

	var _log = __webpack_require__(/*! ./log */ 22);

	var _promise = __webpack_require__(/*! sync-browser-mocks/src/promise */ 7);

	var _global = __webpack_require__(/*! ../global */ 24);

	_global.global.readyPromises = _global.global.readyPromises || [];

	function initOnReady() {

	    (0, _interface.on)(_conf.CONSTANTS.POST_MESSAGE_NAMES.READY, function (win, data) {

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

	            if (item.win === win) {
	                item.promise.resolve(win);
	                return;
	            }
	        }

	        _global.global.readyPromises.push({
	            win: win,
	            promise: new _promise.SyncPromise().resolve(win)
	        });
	    });

	    var parent = (0, _windows.getParentWindow)();

	    if (parent) {
	        (0, _interface.send)(parent, _conf.CONSTANTS.POST_MESSAGE_NAMES.READY, {})['catch'](function (err) {
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

	    _global.global.readyPromises.push({
	        win: win,
	        promise: promise
	    });

	    setTimeout(function () {
	        return promise.reject(new Error(name + ' did not load after ' + timeout + 'ms'));
	    }, timeout);

	    return promise;
	}

/***/ },
/* 27 */
/*!******************************************!*\
  !*** ./~/post-robot/src/compat/index.js ***!
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

	var _post = __webpack_require__(/*! ./post */ 29);

	Object.keys(_post).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _post[key];
	    }
	  });
	});

	var _ie = __webpack_require__(/*! ./ie */ 30);

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
/* 28 */
/*!*******************************************!*\
  !*** ./~/post-robot/src/compat/bridge.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getLocalBridgeForDomain = getLocalBridgeForDomain;
	exports.getLocalBridgeForWindow = getLocalBridgeForWindow;
	exports.getRemoteBridgeForDomain = getRemoteBridgeForDomain;
	exports.getRemoteBridgeForWindow = getRemoteBridgeForWindow;
	exports.registerBridge = registerBridge;
	exports.openBridge = openBridge;

	var _conf = __webpack_require__(/*! ../conf */ 13);

	var _lib = __webpack_require__(/*! ../lib */ 18);

	var BRIDGE_NAME_PREFIX = '__postrobot_bridge__';

	var pendingBridges = {};
	var bridges = [];

	var ZONES = {
	    LOCAL: 'local',
	    REMOTE: 'remote'
	};

	function documentReady() {
	    return new _lib.promise.Promise(function (resolve) {
	        if (window.document && window.document.body) {
	            return resolve(window.document);
	        }

	        window.document.addEventListener('DOMContentLoaded', function (event) {
	            return resolve(window.document);
	        });
	    });
	}

	function getBridgeForDomain(domain) {
	    var zone = arguments.length <= 1 || arguments[1] === undefined ? ZONES.LOCAL : arguments[1];

	    return _lib.promise.run(function () {

	        if (zone === ZONES.LOCAL && pendingBridges[domain]) {
	            return pendingBridges[domain];
	        }

	        for (var _iterator = bridges, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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

	            if (item.domain === domain && item.zone === zone) {
	                return item.bridge;
	            }
	        }
	    }).then(function (bridge) {

	        if (bridge && zone === ZONES.LOCAL) {
	            return (0, _lib.onWindowReady)(bridge);
	        }

	        return bridge;
	    });
	}

	function getBridgeForWindow(win) {
	    var zone = arguments.length <= 1 || arguments[1] === undefined ? ZONES.LOCAL : arguments[1];

	    return _lib.promise.run(function () {

	        if ((0, _lib.getOpener)(win) === window) {
	            return (0, _lib.onWindowReady)(win);
	        }
	    }).then(function () {

	        for (var _iterator2 = bridges, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
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

	            if (item.win === win && item.zone === zone) {
	                return item.bridge;
	            }
	        }

	        var domain = (0, _lib.getWindowDomain)(win);

	        if (domain) {
	            return getBridgeForDomain(domain, zone);
	        }
	    }).then(function (bridge) {

	        if (bridge && zone === ZONES.LOCAL) {
	            return (0, _lib.onWindowReady)(bridge);
	        }

	        return bridge;
	    });
	}

	function getLocalBridgeForDomain(domain) {
	    return getBridgeForDomain(domain, ZONES.LOCAL);
	}

	function getLocalBridgeForWindow(win) {
	    return getBridgeForWindow(win, ZONES.LOCAL);
	}

	function getRemoteBridgeForDomain(domain) {
	    return getBridgeForDomain(domain, ZONES.REMOTE);
	}

	function getRemoteBridgeForWindow(win) {
	    return _lib.promise.run(function () {

	        return getBridgeForWindow(win, ZONES.REMOTE);
	    }).then(function (bridge) {

	        if (bridge) {
	            return bridge;
	        }

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
	    });
	}

	function registerBridge(bridge, win) {

	    var result = void 0;

	    for (var _iterator3 = bridges, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
	        var _ref3;

	        if (_isArray3) {
	            if (_i3 >= _iterator3.length) break;
	            _ref3 = _iterator3[_i3++];
	        } else {
	            _i3 = _iterator3.next();
	            if (_i3.done) break;
	            _ref3 = _i3.value;
	        }

	        var item = _ref3;

	        if (item.bridge === bridge) {
	            result = item;
	            break;
	        }
	    }

	    if (!result) {
	        var zone = _lib.util.isFrameOwnedBy(window, bridge) ? ZONES.LOCAL : ZONES.REMOTE;

	        result = {
	            bridge: bridge,
	            domain: (0, _lib.getWindowDomain)(bridge),
	            windows: [],
	            zone: zone
	        };

	        bridges.push(result);
	    }

	    if (win && result.windows.indexOf(win) === -1) {
	        result.windows.push(win);
	    }
	}

	function openBridge(url, domain) {

	    domain = domain || _lib.util.getDomainFromUrl(url);

	    var bridgePromise = _lib.promise.run(function () {

	        return getLocalBridgeForDomain(domain);
	    }).then(function (existingBridge) {

	        if (existingBridge) {
	            return existingBridge;
	        }

	        if (_lib.util.getDomain() === domain) {
	            return;
	        }

	        var sanitizedDomain = domain.replace(/[^a-zA-Z0-9]+/g, '_');

	        var id = BRIDGE_NAME_PREFIX + '_' + sanitizedDomain;

	        if (window.frames[id]) {
	            return (0, _lib.onWindowReady)(window.frames[id], 5000, 'Bridge ' + url);
	        }

	        _lib.log.debug('Opening bridge:', url);

	        var iframe = document.createElement('iframe');

	        iframe.setAttribute('name', id);
	        iframe.setAttribute('id', id);

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

	        return documentReady().then(function (document) {
	            document.body.appendChild(iframe);

	            var bridge = iframe.contentWindow;

	            (0, _lib.registerWindow)(id, bridge, domain);
	            registerBridge(bridge);

	            delete pendingBridges[domain];

	            return new _lib.promise.Promise(function (resolve, reject) {

	                iframe.onload = resolve;
	                iframe.onerror = reject;
	            }).then(function () {

	                return (0, _lib.onWindowReady)(bridge, 5000, 'Bridge ' + url);
	            }).then(function () {

	                return bridge;
	            });
	        });
	    });

	    pendingBridges[domain] = bridgePromise;

	    return bridgePromise;
	}

/***/ },
/* 29 */
/*!*****************************************!*\
  !*** ./~/post-robot/src/compat/post.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _global = __webpack_require__(/*! ../global */ 24);

	var _drivers = __webpack_require__(/*! ../drivers */ 16);

	_global.global.postMessage = _global.global.postMessage || function postMessage(event) {
	    (0, _drivers.receiveMessage)(event);
	};

/***/ },
/* 30 */
/*!***************************************!*\
  !*** ./~/post-robot/src/compat/ie.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.emulateIERestrictions = emulateIERestrictions;

	var _conf = __webpack_require__(/*! ../conf */ 13);

	var _lib = __webpack_require__(/*! ../lib */ 18);

	function emulateIERestrictions(sourceWindow, targetWindow) {
	    if (!_conf.CONFIG.ALLOW_POSTMESSAGE_POPUP) {

	        if ((0, _lib.isSameDomain)(sourceWindow) && (0, _lib.isSameDomain)(targetWindow)) {
	            return;
	        }

	        if (!(0, _lib.isSameTopWindow)(sourceWindow, targetWindow)) {
	            throw new Error('Can not send and receive post messages between two different windows (disabled to emulate IE)');
	        }
	    }
	}

/***/ },
/* 31 */
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

	var _conf = __webpack_require__(/*! ../../conf */ 13);

	var _lib = __webpack_require__(/*! ../../lib */ 18);

	var _strategies = __webpack_require__(/*! ./strategies */ 32);

	function buildMessage(win, message) {
	    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];


	    var id = _lib.util.uniqueID();
	    var source = (0, _lib.getWindowId)(window);
	    var type = _lib.util.getType();
	    var target = (0, _lib.getWindowId)(win);
	    var sourceDomain = _lib.util.getDomain(window);

	    return _extends({}, message, options, {
	        id: message.id || id,
	        source: source,
	        originalSource: message.originalSource || source,
	        sourceDomain: sourceDomain,
	        originalSourceDomain: message.originalSourceDomain || sourceDomain,
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
/* 32 */
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

	var _conf = __webpack_require__(/*! ../../conf */ 13);

	var _lib = __webpack_require__(/*! ../../lib */ 18);

	var _compat = __webpack_require__(/*! ../../compat */ 27);

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
	}), _defineProperty(_SEND_MESSAGE_STRATEG, _conf.CONSTANTS.SEND_STRATEGIES.REMOTE_BRIDGE, function (win, message, domain) {

	    if ((0, _lib.isSameTopWindow)(window, win)) {
	        throw new Error('Can only use bridge to communicate between two different windows, not between frames');
	    }

	    return (0, _compat.getRemoteBridgeForWindow)(win).then(function (bridge) {

	        if (!bridge) {
	            throw new Error('No bridge available in window');
	        }

	        var sourceDomain = _lib.util.getDomain(window);
	        var targetDomain = void 0;

	        try {
	            targetDomain = _lib.util.getDomain(bridge);
	        } catch (err) {
	            throw new Error('Can not read bridge window domain: ' + err.message);
	        }

	        if (sourceDomain !== targetDomain) {
	            throw new Error('Can not accept global message through bridge - source ' + sourceDomain + ' does not match bridge ' + targetDomain);
	        }

	        if (!_lib.util.safeHasProp(bridge, _conf.CONSTANTS.WINDOW_PROPS.POSTROBOT)) {
	            throw new Error('post-robot not available on bridge at ' + targetDomain);
	        }

	        message.targetHint = 'window.parent';

	        // If we're messaging our child

	        if (window === (0, _lib.getOpener)(win)) {
	            message.sourceHint = 'window.opener';
	        }

	        bridge[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT].postMessage({
	            origin: _lib.util.getDomain(window),
	            source: window,
	            data: JSON.stringify(message, 0, 2)
	        });
	    });
	}), _defineProperty(_SEND_MESSAGE_STRATEG, _conf.CONSTANTS.SEND_STRATEGIES.LOCAL_BRIDGE, function (win, message, domain) {

	    if ((0, _lib.isSameTopWindow)(window, win)) {
	        throw new Error('Can only use bridge to communicate between two different windows, not between frames');
	    }

	    // If we're messaging our parent

	    if (win === (0, _lib.getOpener)(window)) {
	        message.targetHint = 'window.parent.opener';
	    }

	    if (!message.target && !message.targetHint) {
	        throw new Error('Can not post message down through bridge without target or targetHint');
	    }

	    // If we're messaging our child

	    var opener = (0, _lib.getOpener)(win);

	    if (opener && window === opener) {
	        message.sourceHint = 'window.opener';
	    }

	    if (opener && window === opener.parent) {
	        message.sourceHint = 'window.opener.parent';
	    }

	    return (0, _compat.getLocalBridgeForWindow)(win).then(function (bridge) {

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
/* 33 */
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

	var _conf = __webpack_require__(/*! ../../conf */ 13);

	var _lib = __webpack_require__(/*! ../../lib */ 18);

	var _send = __webpack_require__(/*! ../send */ 31);

	var _listeners = __webpack_require__(/*! ../listeners */ 34);

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

	    return _lib.promise.Promise.all([respond({
	        type: _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK
	    }), _lib.promise.run(function () {

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
	    })])['catch'](function (err) {

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
/* 34 */
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

	var _lib = __webpack_require__(/*! ../lib */ 18);

	var _global = __webpack_require__(/*! ../global */ 24);

	_global.global.listeners = _global.global.listeners || {
	    request: [],
	    response: []
	};

	var listeners = exports.listeners = _global.global.listeners;

	function resetListeners() {
	    _global.global.listeners.request = [];
	    _global.global.listeners.response = [];
	}

	function getRequestListener(name, win) {
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

	        var requestListener = _ref2;

	        if (requestListener.options === options) {
	            listener = requestListener;
	            break;
	        }
	    }

	    if (listener) {
	        _global.global.listeners.request.splice(_global.global.listeners.request.indexOf(listener), 1);
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

/***/ },
/* 35 */
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

	var _conf = __webpack_require__(/*! ../conf */ 13);

	var _lib = __webpack_require__(/*! ../lib */ 18);

	var _drivers = __webpack_require__(/*! ../drivers */ 16);

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

	    options = options || {};

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

	    options = options || {};

	    options.name = name;
	    options.handler = handler || options.handler;
	    options.errorHandler = errorHandler || options.errorHandler;
	    options.once = true;

	    var prom = new _lib.promise.Promise(function (resolve, reject) {
	        options.handler = options.handler || function (source, data) {
	            return resolve(data);
	        };
	        options.errorHandler = options.errorHandler || reject;
	    });

	    var listener = listen(options);

	    _lib.util.extend(prom, listener);

	    return prom;
	}

/***/ },
/* 36 */
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

	var _conf = __webpack_require__(/*! ../conf */ 13);

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

	var _drivers = __webpack_require__(/*! ../drivers */ 16);

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
/* 37 */
/*!********************************!*\
  !*** ./src/component/index.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _component = __webpack_require__(/*! ./component */ 38);

	Object.keys(_component).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _component[key];
	    }
	  });
	});

	var _parent = __webpack_require__(/*! ./parent */ 45);

	Object.keys(_parent).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _parent[key];
	    }
	  });
	});

	var _child = __webpack_require__(/*! ./child */ 40);

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
/* 38 */
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

	var _base = __webpack_require__(/*! ../base */ 39);

	var _child = __webpack_require__(/*! ../child */ 40);

	var _parent = __webpack_require__(/*! ../parent */ 45);

	var _props = __webpack_require__(/*! ./props */ 49);

	var _window = __webpack_require__(/*! ../window */ 41);

	var _constants = __webpack_require__(/*! ../../constants */ 42);

	var _validate2 = __webpack_require__(/*! ./validate */ 50);

	var _parent2 = __webpack_require__(/*! ./templates/parent.htm */ 51);

	var _parent3 = _interopRequireDefault(_parent2);

	var _component = __webpack_require__(/*! ./templates/component.htm */ 52);

	var _component2 = _interopRequireDefault(_component);

	var _drivers = __webpack_require__(/*! ../../drivers */ 53);

	var drivers = _interopRequireWildcard(_drivers);

	var _lib = __webpack_require__(/*! ../../lib */ 2);

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

	        _this.addProp(options, 'version', 'latest');

	        // The default environment we should render to if none is specified in the parent

	        _this.addProp(options, 'defaultEnv');

	        // A mapping of env->url, used to determine which url to load for which env

	        _this.addProp(options, 'envUrls', {});

	        // A url to use by default to render the component, if not using envs

	        _this.addProp(options, 'url', _this.envUrls[_this.defaultEnv]);

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

	        _this.addProp(options, 'closeDelay');

	        // The default context to render to

	        _this.addProp(options, 'defaultContext');

	        // Should this be a singleton component? Do I want to allow it to be rendered more than once on the same page?

	        _this.addProp(options, 'singleton');

	        // Auto Resize option

	        _this.addProp(options, 'autoResize', false);

	        _this.addProp(options, 'autocloseParentTemplate', true);

	        // Templates and styles for the parent page and the initial rendering of the component

	        _this.addProp(options, 'parentTemplate', _parent3['default']);
	        _this.addProp(options, 'componentTemplate', _component2['default']);

	        // A mapping of tag->component so we can reference components by string tag name

	        components[_this.tag] = _this;

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
	                driver.register(_this);
	            }
	        }
	        return _this;
	    }

	    _createClass(Component, [{
	        key: 'isXComponent',
	        value: function isXComponent() {
	            return (0, _window.isXComponentWindow)();
	        }

	        /*  Parent
	            ------
	             Get an instance of the parent for this component (lives on the parent page which contains the component)
	        */

	    }, {
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

	            _lib.logger.info('xc_' + this.name + '_' + event, payload);
	        }

	        /*  Log Warning
	            -----------
	             Log a warning
	        */

	    }, {
	        key: 'logWarning',
	        value: function logWarning(event, payload) {
	            _lib.logger.warn('xc_' + this.name + '_' + event, payload);
	        }

	        /*  Log Error
	            ---------
	             Log an error
	        */

	    }, {
	        key: 'logError',
	        value: function logError(event, payload) {
	            _lib.logger.error('xc_' + this.name + '_' + event, payload);
	        }
	    }]);

	    return Component;
	}(_base.BaseComponent);

/***/ },
/* 39 */
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

	var _src = __webpack_require__(/*! post-robot/src */ 10);

	var _src2 = _interopRequireDefault(_src);

	var _lib = __webpack_require__(/*! ../lib */ 2);

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
	        key: 'addProp',
	        value: function addProp(options, name, def) {

	            if (options.hasOwnProperty(name)) {
	                var descriptor = Object.getOwnPropertyDescriptor(options, name);
	                Object.defineProperty(this, name, descriptor);
	            } else {
	                this[name] = def;
	            }
	        }

	        /*  Register For Cleanup
	            --------------------
	             Register a method that will be called to do some cleanup whenever this.cleanup() is called
	        */

	    }, {
	        key: 'registerForCleanup',
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
/* 40 */
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

	var _lib = __webpack_require__(/*! ../../lib */ 2);

	var _src = __webpack_require__(/*! post-robot/src */ 10);

	var _src2 = _interopRequireDefault(_src);

	var _promise = __webpack_require__(/*! sync-browser-mocks/src/promise */ 7);

	var _base = __webpack_require__(/*! ../base */ 39);

	var _window = __webpack_require__(/*! ../window */ 41);

	var _constants = __webpack_require__(/*! ../../constants */ 42);

	var _props = __webpack_require__(/*! ../props */ 43);

	var _props2 = __webpack_require__(/*! ./props */ 44);

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

	        _this.onInit = new _promise.SyncPromise();

	        // The child can specify some default props if none are passed from the parent. This often makes integrations
	        // a little more seamless, as applicaiton code can call props.foo() without worrying about whether the parent
	        // has provided them or not, and fall-back to some default behavior.

	        _this.setProps((0, _props.normalizeProps)(_this.component, _this, options.defaultProps || {}), false);
	        _this.setProps(_this.getInitialProps());

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

	            if (!(0, _window.isXComponentWindow)() && this.standalone) {
	                this.component.log('child_standalone');
	                return;
	            }

	            this.setWindows();

	            // In standalone mode, there's no point messaging back up to our parent -- because we have none. :'(

	            if (this.standalone && !(0, _window.getParentWindow)()) {
	                return _promise.SyncPromise.resolve();
	            }

	            if (this.component.autoResize) {
	                this.watchForResize();
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

	                _this2.onInit.resolve(_this2);

	                _this2.onEnter.call(_this2);
	            })['catch'](function (err) {

	                _this2.onInit.reject(err);
	                _this2.onError(err);
	            });
	        }
	    }, {
	        key: 'getInitialProps',
	        value: function getInitialProps() {
	            var componentMeta = (0, _window.getComponentMeta)();
	            var self = this;

	            if (componentMeta) {
	                return (0, _lib.replaceObject)(componentMeta.props, function (value, key, fullKey) {
	                    if (value && value.__type__ === '__function__') {
	                        return function () {
	                            var _this3 = this,
	                                _arguments = arguments;

	                            return self.onInit.then(function () {
	                                var original = (0, _lib.get)(self.props, fullKey);
	                                return original.apply(_this3, _arguments);
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
	            return _src2['default'].send((0, _window.getParentWindow)(), name, data);
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

	            if (!(0, _window.getParentWindow)()) {
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

	        /*  Watch For Close
	            ---------------
	             Watch both the parent window and the parent component window, if they close, close this window too.
	        */

	    }, {
	        key: 'watchForClose',
	        value: function watchForClose() {
	            var _this4 = this;

	            (0, _lib.onCloseWindow)(_window.getParentWindow, function () {

	                _this4.component.log('parent_window_closed');

	                _this4.onClose(_constants.CLOSE_REASONS.PARENT_CLOSE_DETECTED);

	                // We only need to close ourselves if we're a popup -- otherwise our parent window closing will automatically
	                // close us, if we're an iframe

	                if (_this4.context === _constants.CONTEXT_TYPES.POPUP) {
	                    _this4.destroy();
	                }
	            });

	            // Only listen for parent component window if it's actually a different window

	            if ((0, _window.getParentComponentWindow)() && (0, _window.getParentComponentWindow)() !== (0, _window.getParentWindow)()) {
	                (0, _lib.onCloseWindow)((0, _window.getParentComponentWindow)(), function () {

	                    _this4.component.log('parent_component_window_closed');

	                    // We do actually need to close ourselves in this case, even if we're an iframe, because our component
	                    // window is probably a sibling and we'll remain open by default.

	                    _this4.close(_constants.CLOSE_REASONS.PARENT_CLOSE_DETECTED);
	                });
	            }

	            (0, _lib.addEventListener)(window, 'beforeunload', function () {
	                return _this4.onClose();
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
	        key: 'watchForResize',
	        value: function watchForResize() {
	            var _this5 = this;

	            if (!this.component.dimensions) {
	                return;
	            }

	            var el = document.documentElement;

	            var dimensions = {
	                width: el.scrollWidth,
	                height: el.scrollHeight
	            };

	            var resize = (0, _lib.debounce)(function (width, height) {
	                return _this5.sendToParent(_constants.POST_MESSAGE.RESIZE, { width: width, height: height });
	            }, 200);

	            setInterval(function () {

	                var newDimensions = {
	                    width: el.scrollWidth,
	                    height: el.scrollHeight
	                };

	                if (Math.abs(newDimensions.height - dimensions.height) >= 10) {
	                    resize(_this5.component.dimensions.width, newDimensions.height);
	                }

	                dimensions = newDimensions;
	            }, 50);
	        }
	    }, {
	        key: 'exports',
	        value: function exports() {
	            var _this6 = this;

	            return {
	                updateProps: function updateProps(props) {
	                    return _this6.setProps(props);
	                },
	                close: function close() {
	                    return _this6.destroy();
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

	            return _promise.SyncPromise.resolve().then(function () {

	                _this7.component.log('resize', { width: width, height: height });

	                if (_this7.context === _constants.CONTEXT_TYPES.POPUP) {
	                    return window.resizeTo(width, height);
	                }

	                return _this7.sendToParent(_constants.POST_MESSAGE.RESIZE, { width: width, height: height });
	            });
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

	            this.onClose.call(this, reason);

	            // Ask our parent window to close us

	            this.sendToParent(_constants.POST_MESSAGE.CLOSE, { reason: reason }, {
	                fireAndForget: true
	            });
	        }
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            _lib.logger.flush().then(function () {
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

	            this.component.log('error', { error: err.stack || err.toString() });

	            return this.sendToParent(_constants.POST_MESSAGE.ERROR, {
	                error: err.stack ? err.message + '\n' + err.stack : err.toString()
	            });
	        }
	    }]);

	    return ChildComponent;
	}(_base.BaseComponent);

/***/ },
/* 41 */
/*!*********************************!*\
  !*** ./src/component/window.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getParentComponentWindow = exports.getParentWindow = exports.isXComponentWindow = exports.getComponentMeta = undefined;

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	exports.buildChildWindowName = buildChildWindowName;
	exports.getPosition = getPosition;

	var _lib = __webpack_require__(/*! ../lib */ 2);

	var _constants = __webpack_require__(/*! ../constants */ 42);

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
	    options.parent = window.name;
	    options.parentDomain = window.location.protocol + '//' + window.location.host;

	    var encodedName = normalize(name);
	    var encodedVersion = normalize(version);
	    var encodedOptions = (0, _lib.b32encode)(JSON.stringify(options));

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
	        componentMeta = JSON.parse((0, _lib.b32decode)(encodedOptions));
	    } catch (err) {
	        return;
	    }

	    componentMeta.name = name;
	    componentMeta.version = version.replace(/_/g, '.');

	    return componentMeta;
	});

	var isXComponentWindow = exports.isXComponentWindow = (0, _lib.memoize)(function () {
	    return Boolean(getComponentMeta());
	});

	var getParentWindow = exports.getParentWindow = (0, _lib.memoize)(function () {

	    if (window.opener) {
	        return window.opener;
	    } else if (window.parent && window.parent !== window) {
	        return window.parent;
	    }

	    throw new Error('Can not find parent window');
	});

	/*  Get Parent Component Window
	    ---------------------------

	    Get the parent component window, which may be different from the actual parent window
	*/

	var getParentComponentWindow = exports.getParentComponentWindow = (0, _lib.memoize)(function () {

	    // Get properties from the window name, passed down from our parent component

	    var componentMeta = getComponentMeta();

	    if (!componentMeta) {
	        throw new Error('Can not get parent component window - window not rendered by xcomponent');
	    }

	    var parentWindow = getParentWindow();

	    // Use this to infer which window is our true 'parent component'. This can either be:
	    //
	    // - Our actual parent
	    // - A sibling which rendered us using renderToParent()

	    if (parentWindow && componentMeta.parent && parentWindow.frames && parentWindow.frames.length) {

	        // Make sure we don't error out by trying to access a property of the parent window that is not a frame

	        try {
	            if (parentWindow.frames[componentMeta.parent]) {
	                return parentWindow.frames[componentMeta.parent];
	            }
	        } catch (err) {
	            // pass
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
/* 42 */
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.PROP_DEFER_TO_URL = exports.MAX_Z_INDEX = exports.CONTEXT_TYPES_LIST = exports.CLOSE_REASONS = exports.EVENT_NAMES = exports.CLASS_NAMES = exports.CONTEXT_TYPES = exports.PROP_TYPES_LIST = exports.PROP_TYPES = exports.POST_MESSAGE = exports.XCOMPONENT = undefined;

	var _lib = __webpack_require__(/*! ./lib */ 2);

	var XCOMPONENT = exports.XCOMPONENT = 'xcomponent';

	var POST_MESSAGE = exports.POST_MESSAGE = {
	    INIT: XCOMPONENT + '_init',
	    PROPS: XCOMPONENT + '_props',
	    PROP_CALLBACK: XCOMPONENT + '_prop_callback',
	    CLOSE: XCOMPONENT + '_close',
	    REDIRECT: XCOMPONENT + '_redirect',
	    RESIZE: XCOMPONENT + '_resize',
	    RENDER_REMOTE: XCOMPONENT + '_render_remote',
	    RENDER_LOCAL: XCOMPONENT + '_render_local',
	    ERROR: XCOMPONENT + '_error',
	    HIDE: XCOMPONENT + '_hide'
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
	    ELEMENT: XCOMPONENT + '-element',
	    IFRAME: XCOMPONENT + '-iframe',
	    LIGHTBOX: XCOMPONENT + '-lightbox',
	    POPUP: XCOMPONENT + '-popup',
	    CLOSING: XCOMPONENT + '-closing',
	    AUTOCLOSE: XCOMPONENT + '-autoclose'
	};

	var EVENT_NAMES = exports.EVENT_NAMES = {
	    CLICK: 'click'
	};

	var CLOSE_REASONS = exports.CLOSE_REASONS = {
	    PARENT_CALL: 'parent_call',
	    CHILD_CALL: 'child_call',
	    AUTOCLOSE: 'autoclose',
	    CLOSE_DETECTED: 'close_detected',
	    USER_CLOSED: 'user_closed',
	    PARENT_CLOSE_DETECTED: 'parent_close_detected'
	};

	var CONTEXT_TYPES_LIST = exports.CONTEXT_TYPES_LIST = (0, _lib.values)(CONTEXT_TYPES);

	var MAX_Z_INDEX = exports.MAX_Z_INDEX = 2147483647;

	var PROP_DEFER_TO_URL = exports.PROP_DEFER_TO_URL = 'xcomponent_prop_defer_to_url';

/***/ },
/* 43 */
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

	var _promise = __webpack_require__(/*! sync-browser-mocks/src/promise */ 7);

	var _lib = __webpack_require__(/*! ../lib */ 2);

	var _constants = __webpack_require__(/*! ../constants */ 42);

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

	                value = (0, _lib.memoize)(function () {
	                    return _promise.SyncPromise.resolve(val);
	                });
	            })();
	        }
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
/* 44 */
/*!**************************************!*\
  !*** ./src/component/child/props.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.normalizeChildProps = normalizeChildProps;

	var _promise = __webpack_require__(/*! sync-browser-mocks/src/promise */ 7);

	var _lib = __webpack_require__(/*! ../../lib */ 2);

	var _constants = __webpack_require__(/*! ../../constants */ 42);

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

	            value = (0, _lib.getQueryParam)(queryParam);
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
/* 45 */
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

	var _lib = __webpack_require__(/*! ../../lib */ 2);

	var _src = __webpack_require__(/*! post-robot/src */ 10);

	var _src2 = _interopRequireDefault(_src);

	var _promise = __webpack_require__(/*! sync-browser-mocks/src/promise */ 7);

	var _base = __webpack_require__(/*! ../base */ 39);

	var _window = __webpack_require__(/*! ../window */ 41);

	var _constants = __webpack_require__(/*! ../../constants */ 42);

	var _drivers = __webpack_require__(/*! ./drivers */ 46);

	var _validate = __webpack_require__(/*! ./validate */ 47);

	var _props = __webpack_require__(/*! ./props */ 48);

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

	        _this.setProps(options.props || {});

	        // Options passed during renderToParent. We would not ordinarily expect a user to pass these, since we depend on
	        // them only when we're trying to render from a sibling to a sibling

	        _this.childWindowName = options.childWindowName || _this.buildChildWindowName();

	        _this.component.log('construct_parent');
	        return _this;
	    }

	    _createClass(ParentComponent, [{
	        key: 'init',
	        value: function init() {
	            var _this2 = this;

	            if (this.onInit) {
	                return;
	            }

	            // Set up promise for init

	            this.setForCleanup('onInit', new _promise.SyncPromise());

	            this.onInit['catch'](function (err) {
	                _this2.destroy();
	                _this2.props.onError(err);
	            });
	        }
	    }, {
	        key: 'buildChildWindowName',
	        value: function buildChildWindowName() {

	            var props = (0, _lib.replaceObject)(this.props, function (value, key, fullKey) {
	                if (value instanceof Function) {
	                    return {
	                        __type__: '__function__'
	                    };
	                }
	            });

	            return (0, _window.buildChildWindowName)(this.component.name, this.component.version, {
	                tag: this.component.tag,
	                parent: window.name,
	                props: props
	            });
	        }

	        /*  Set Props
	            ---------
	             Normalize props and generate the url we'll use to render the component
	        */

	    }, {
	        key: 'setProps',
	        value: function setProps(props) {
	            props.version = this.component.version;
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
	            var _this3 = this;

	            return (0, _props.propsToQuery)(this.component.props, this.props).then(function (queryProps) {

	                queryProps[_constants.XCOMPONENT] = '1';

	                var url = void 0;

	                if (_this3.props.url) {
	                    url = _this3.props.url;
	                } else if (_this3.props.env) {
	                    url = _this3.component.envUrls[_this3.props.env];
	                } else {
	                    url = _this3.component.url;
	                }

	                return (0, _lib.extendUrl)(url, { query: queryProps });
	            });
	        }

	        /*  Update Props
	            ------------
	             Send new props down to the child
	        */

	    }, {
	        key: 'updateProps',
	        value: function updateProps(props) {
	            var _this4 = this;

	            return _promise.SyncPromise.resolve().then(function () {
	                _this4.init();

	                var oldProps = (0, _lib.stringifyWithFunctions)(_this4.props);

	                _this4.setProps(_extends({}, _this4.props, props));

	                if (!_this4.initialPropsSent) {
	                    return;
	                }

	                return _this4.onInit.then(function () {

	                    // Only send down the new props if they do not match the old, and if we have already sent down initial props

	                    if (oldProps !== (0, _lib.stringifyWithFunctions)(_this4.props)) {
	                        _this4.component.log('parent_update_props');

	                        return _this4.childExports.updateProps(_this4.props);
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
	        value: function validateRender() {

	            if (this.window) {
	                throw new Error('[' + this.component.tag + '] Can not render: component is already rendered');
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
	            var _this5 = this;

	            return _promise.SyncPromise.resolve().then(function () {

	                _this5.init();

	                context = _this5.getRenderContext(element, context);
	                _this5.component.log('render_' + context, { context: context, element: element });

	                _this5.preRender(element, context);

	                return _this5.initUrl(context);
	            })['catch'](function (err) {

	                _this5.onInit.reject(err);
	                throw err;
	            }).then(function () {

	                return _this5.onInit;
	            });
	        }
	    }, {
	        key: 'initUrl',
	        value: function initUrl(context) {
	            var _this6 = this;

	            return this.buildUrl().then(function (url) {
	                _this6.loadUrl(context, url);
	                _this6.runTimeout();
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
	        }

	        /*  Pre Open
	            --------
	             Pre-pen a new window in the desired context
	        */

	    }, {
	        key: 'preRender',
	        value: function preRender(element, context) {

	            this.validateRender();
	            context = this.getRenderContext(element, context);

	            _drivers.RENDER_DRIVERS[context].render.call(this, element);
	            this.setForCleanup('context', context);

	            this.createParentTemplate(context);

	            this.open(element, context);

	            this.watchForClose();
	            this.createComponentTemplate();

	            this.listen(this.window);
	        }
	    }, {
	        key: 'renderToParentRemote',
	        value: function renderToParentRemote(element, context) {
	            var _this7 = this;

	            var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];


	            return _src2['default'].sendToParent(_constants.POST_MESSAGE.RENDER_REMOTE, _extends({}, options, {

	                tag: this.component.tag,
	                context: context,
	                element: element,

	                options: {
	                    props: this.props,
	                    childWindowName: this.childWindowName
	                }

	            })).then(function (data) {

	                (0, _lib.extend)(_this7, data.overrides);

	                _this7.setForCleanup('window', (0, _lib.getParentWindow)().frames[data.childWindowName]);
	            });
	        }
	    }, {
	        key: 'renderToParentLocal',
	        value: function renderToParentLocal(element, context) {
	            var _this8 = this;

	            var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];


	            var renderPromise = this.render(element, _constants.CONTEXT_TYPES.POPUP);

	            var renderParentPromise = _src2['default'].sendToParent(_constants.POST_MESSAGE.RENDER_LOCAL, _extends({}, options, {

	                tag: this.component.tag,
	                context: context,
	                element: element,

	                overrides: {
	                    close: function close(reason) {
	                        return _this8.close(reason);
	                    },
	                    focus: function focus() {
	                        return _this8.focus();
	                    }
	                },

	                options: {
	                    props: this.props
	                }

	            })).then(function (data) {

	                _this8.registerForCleanup(data.destroy);
	                (0, _lib.extend)(_this8, data.overrides);
	            });

	            return _promise.SyncPromise.all([renderPromise, renderParentPromise]).then(function () {
	                return renderPromise;
	            });
	        }

	        /*  Render to Parent
	            ----------------
	             Instruct the parent window to render our component for us -- so, for example, we can have a button component
	            which opens a lightbox on the parent page, with a full template. Or, we could use this to render an iframe based
	            modal on top of our existing iframe component, without having to expand out the size of our current iframe.
	        */

	    }, {
	        key: 'renderToParent',
	        value: function renderToParent(element, context) {
	            var _this9 = this;

	            var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	            return _promise.SyncPromise.resolve().then(function () {
	                _this9.init();

	                _this9.validateRender();

	                context = _this9.getRenderContext(element, context);

	                var parentWindow = (0, _lib.getParentWindow)();

	                if (!parentWindow) {
	                    throw new Error('[' + _this9.component.tag + '] Can not render to parent - no parent exists');
	                }

	                if (!(0, _window.isXComponentWindow)()) {
	                    throw new Error('[' + _this9.component.tag + '] Can not render to parent - not in a child component window');
	                }

	                _this9.component.log('render_' + context + '_to_parent', { element: element, context: context });

	                _this9.setForCleanup('context', context);

	                return _drivers.RENDER_DRIVERS[context].renderToParent.call(_this9, element, options);
	            })['catch'](function (err) {

	                _this9.onInit.reject(err);
	                throw err;
	            }).then(function () {

	                return _this9.onInit;
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
	            var _this10 = this;

	            this.closeWindowListener = (0, _lib.onCloseWindow)(this.window, function () {
	                _this10.component.log('detect_close_child');
	                _this10.props.onClose(_constants.CLOSE_REASONS.CLOSE_DETECTED)['finally'](function () {
	                    _this10.destroy();
	                });
	            });

	            // Our child has no way of knowing if we navigated off the page. So we have to listen for beforeunload
	            // and close the child manually if that happens.

	            this.unloadListener = (0, _lib.addEventListener)(window, 'beforeunload', function () {
	                _this10.component.log('navigate_away');
	                _lib.logger.flush();

	                if (_this10.context === _constants.CONTEXT_TYPES.POPUP) {
	                    _this10.destroy();
	                }
	            });

	            this.registerForCleanup(function () {

	                if (_this10.closeWindowListener) {
	                    _this10.closeWindowListener.cancel();
	                    delete _this10.closeWindowListener;
	                }

	                if (_this10.unloadListener) {
	                    _this10.unloadListener.cancel();
	                    delete _this10.unloadListener;
	                }
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

	            if (window.location.href.split('#')[0] === url.split('#')[0]) {
	                url = (0, _lib.extendUrl)(url, {
	                    query: _defineProperty({}, (0, _lib.uniqueID)(), '1')
	                });
	            }

	            _src2['default'].linkUrl(this.childWindowName, this.window, url);
	            return _drivers.RENDER_DRIVERS[context].loadUrl.call(this, url);
	        }

	        /*  Render Hijack
	            -------------
	             Do a normal render, with the exception that we don't load the url into the child since our hijacked link or button will do that for us
	        */

	    }, {
	        key: 'renderHijack',
	        value: function renderHijack(targetElement, element, context) {
	            var _this11 = this;

	            return _promise.SyncPromise.resolve().then(function () {
	                _this11.init();

	                context = _this11.getRenderContext(element, context);

	                _this11.component.log('render_hijack_' + context);

	                targetElement.target = _this11.childWindowName;
	                _this11.preRender(element, context);

	                _this11.runTimeout();
	            })['catch'](function (err) {

	                _this11.onInit.reject(err);
	                throw err;
	            }).then(function () {

	                return _this11.onInit;
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
	            var _this12 = this;

	            if (this.props.timeout) {
	                setTimeout(function () {

	                    // If this.onInit has been previously resolved, this won't have any effect.

	                    var error = new Error('[' + _this12.component.tag + '] Loading component ' + _this12.component.tag + ' timed out after ' + _this12.props.timeout + ' milliseconds');

	                    _this12.onInit.reject(error)['catch'](function (err) {
	                        return _this12.props.onTimeout(err)['finally'](function () {
	                            _this12.component.log('timed_out', { timeout: _this12.props.timeout });
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
	                var _this13 = this;

	                this.childExports = data.exports;

	                this.onInit.resolve(this);
	                return this.props.onEnter().then(function () {

	                    _this13.setForCleanup('initialPropsSent', true);

	                    // Let the child know what its context is, and what its initial props are.

	                    _lib.logger.flush();

	                    return {
	                        context: _this13.context,
	                        props: _this13.props
	                    };
	                });
	            }), _defineProperty(_ref, _constants.POST_MESSAGE.CLOSE, function (source, data) {
	                this.close(data.reason);
	            }), _defineProperty(_ref, _constants.POST_MESSAGE.RENDER_REMOTE, function (source, data) {
	                var _this14 = this;

	                var component = this.component.getByTag(data.tag);
	                var instance = component.parent(data.options);

	                (0, _lib.extend)(instance, data.overrides);

	                this.registerForCleanup(function () {
	                    instance.destroy();
	                });

	                return _promise.SyncPromise.resolve().then(function () {

	                    if (data.hijackSubmitParentForm) {

	                        var form = (0, _lib.getParentNode)(_this14.iframe, 'form');

	                        // Open the window and do everything except load the url

	                        var promise = instance.renderHijack(form, data.element, data.context);

	                        // Submit the form to load the url into the new window

	                        form.submit();

	                        return promise;
	                    } else {

	                        return instance.render(data.element, data.context);
	                    }
	                }).then(function () {

	                    return {
	                        childWindowName: _this14.childWindowName,

	                        overrides: {
	                            childExports: instance.childExports,
	                            close: function close(reason) {
	                                return instance.close(reason);
	                            }
	                        }
	                    };
	                });
	            }), _defineProperty(_ref, _constants.POST_MESSAGE.RENDER_LOCAL, function (source, data) {

	                var component = this.component.getByTag(data.tag);
	                var instance = component.parent(data.options);

	                this.registerForCleanup(function () {
	                    instance.destroy();
	                });

	                instance.setForCleanup('context', data.context);

	                (0, _lib.extend)(instance, data.overrides);

	                instance.createParentTemplate(data.context);

	                return {
	                    destroy: function destroy() {
	                        return instance.destroy();
	                    },
	                    overrides: {
	                        addCloseClasses: function addCloseClasses() {
	                            return instance.addCloseClasses();
	                        }
	                    }
	                };
	            }), _defineProperty(_ref, _constants.POST_MESSAGE.RESIZE, function (source, data) {

	                if (this.context === _constants.CONTEXT_TYPES.POPUP) {
	                    return;
	                }

	                return this.resize(data.width, data.height);
	            }), _defineProperty(_ref, _constants.POST_MESSAGE.HIDE, function (source, data) {
	                this.hide();
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

	            return _drivers.RENDER_DRIVERS[this.context].hide.call(this);
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
	            var _this15 = this;

	            var reason = arguments.length <= 0 || arguments[0] === undefined ? _constants.CLOSE_REASONS.PARENT_CALL : arguments[0];


	            if (this.closePromise) {
	                return this.closePromise;
	            }

	            this.component.log('close', { reason: reason });

	            if (this.closeWindowListener) {
	                this.closeWindowListener.cancel();
	            }

	            if (this.unloadListener) {
	                this.unloadListener.cancel();
	            }

	            this.addCloseClasses();

	            var closePromise = _promise.SyncPromise.resolve().then(function () {

	                if (_this15.component.closeDelay && _this15.context !== _constants.CONTEXT_TYPES.POPUP) {
	                    return (0, _lib.delay)(_this15.component.closeDelay);
	                }
	            }).then(function () {

	                if (_this15.childExports && !(0, _lib.isWindowClosed)(_this15.window)) {
	                    _this15.childExports.close()['catch'](_lib.noop);
	                }

	                _this15.destroy();

	                return _this15.props.onClose(reason);
	            });

	            this.setForCleanup('closePromise', closePromise);

	            return closePromise;
	        }
	    }, {
	        key: 'addCloseClasses',
	        value: function addCloseClasses() {
	            if (this.parentTemplate) {
	                this.parentTemplate.className += ' ' + _constants.CLASS_NAMES.CLOSING;

	                if (this.component.autocloseParentTemplate) {
	                    this.parentTemplate.className += ' ' + _constants.CLASS_NAMES.AUTOCLOSE;
	                }
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
	                CLASS: _constants.CLASS_NAMES
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

	        /*  Create Parent Template
	            ----------------------
	             Create a template and stylesheet for the parent template behind the popup/lightbox
	        */

	    }, {
	        key: 'createParentTemplate',
	        value: function createParentTemplate(context) {
	            var _this16 = this;

	            if (!_drivers.RENDER_DRIVERS[context].parentTemplate) {
	                return;
	            }

	            var parentTemplate = this.component.parentTemplate instanceof Function ? this.component.parentTemplate() : this.component.parentTemplate;

	            this.parentTemplate = (0, _lib.createElement)('div', {

	                html: (0, _lib.template)(parentTemplate, {
	                    id: _constants.CLASS_NAMES.XCOMPONENT + '-' + this.props.uid,
	                    CLASS: _constants.CLASS_NAMES
	                }),

	                attributes: {
	                    id: _constants.CLASS_NAMES.XCOMPONENT + '-' + this.props.uid
	                },

	                'class': [_constants.CLASS_NAMES.XCOMPONENT, _constants.CLASS_NAMES.XCOMPONENT + '-' + this.context]

	            }, document.body);

	            if (_drivers.RENDER_DRIVERS[context].focusable) {
	                (0, _lib.addEventToClass)(this.parentTemplate, _constants.CLASS_NAMES.FOCUS, _constants.EVENT_NAMES.CLICK, function (event) {
	                    return _this16.focus();
	                });
	            }

	            (0, _lib.addEventToClass)(this.parentTemplate, _constants.CLASS_NAMES.CLOSE, _constants.EVENT_NAMES.CLICK, function (event) {
	                return _this16.userClose();
	            });

	            this.registerForCleanup(function () {
	                if (_this16.component.autocloseParentTemplate && _this16.parentTemplate) {
	                    _this16.closeParentTemplate();
	                }
	            });
	        }
	    }, {
	        key: 'closeParentTemplate',
	        value: function closeParentTemplate() {
	            if (this.parentTemplate) {
	                document.body.removeChild(this.parentTemplate);
	                delete this.parentTemplate;
	            }
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
	                _lib.logger.flush();
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
	            this.destroy();
	            return this.props.onError(err);
	        }
	    }]);

	    return ParentComponent;
	}(_base.BaseComponent);

	/*  Generate Render Methods
	    -----------------------

	    Autogenerate methods like renderIframe, renderPopupToParent
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
	};

	for (var _iterator = _constants.CONTEXT_TYPES_LIST, _isArray = Array.isArray(_iterator), _i2 = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	    var _ref2;

	    var _ret = _loop();

	    if (_ret === 'break') break;
	}

/***/ },
/* 46 */
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

	var _lib = __webpack_require__(/*! ../../lib */ 2);

	var _constants = __webpack_require__(/*! ../../constants */ 42);

	var _window = __webpack_require__(/*! ../window */ 41);

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
	    hide: function hide() {
	        this.iframe.style.display = 'none';
	    },
	    restyle: function restyle() {
	        this.iframe.style.backgroundColor = 'transparent';
	    },
	    renderToParent: function renderToParent(element, options) {

	        if (!element) {
	            throw new Error('[' + this.component.tag + '] Must specify element to render to iframe');
	        }

	        return this.renderToParentRemote(element, _constants.CONTEXT_TYPES.IFRAME, options);
	    },
	    loadUrl: function loadUrl(url) {
	        this.iframe.src = url;
	    }
	}), _defineProperty(_RENDER_DRIVERS, _constants.CONTEXT_TYPES.POPUP, {

	    parentTemplate: true,
	    focusable: true,

	    render: function render() {
	        // pass
	    },
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

	        this.resize(dimensions.width, dimensions.height);

	        return this;
	    },
	    resize: function resize(width, height) {

	        this.parentTemplate.style.position = 'fixed';
	        this.parentTemplate.style.zIndex = _constants.MAX_Z_INDEX;
	        this.parentTemplate.style.top = 0;
	        this.parentTemplate.style.left = 0;
	        this.parentTemplate.style.width = '100%';
	        this.parentTemplate.style.height = '100%';

	        if (width && height) {
	            width = Math.min(width, window.innerWidth);
	            height = Math.min(height, window.innerHeight);

	            this.window.resizeTo(width, height);
	        }
	    },
	    hide: function hide() {
	        throw new Error('Can not hide popup');
	    },
	    restyle: function restyle() {
	        // pass
	    },
	    renderToParent: function renderToParent(element, options) {

	        return this.renderToParentLocal(element, _constants.CONTEXT_TYPES.POPUP, options);
	    },
	    loadUrl: function loadUrl(url) {
	        this.window.location = url;
	    }
	}), _defineProperty(_RENDER_DRIVERS, _constants.CONTEXT_TYPES.LIGHTBOX, {

	    parentTemplate: true,

	    render: function render() {
	        // pass
	    },
	    renderToParent: function renderToParent(element, options) {

	        return this.renderToParentRemote(element, _constants.CONTEXT_TYPES.LIGHTBOX, options);
	    },
	    open: function open() {

	        var element = this.parentTemplate.getElementsByClassName(_constants.CLASS_NAMES.ELEMENT)[0] || document.body;

	        RENDER_DRIVERS[_constants.CONTEXT_TYPES.IFRAME].open.call(this, element);

	        return this;
	    },
	    resize: function resize(width, height) {

	        width = Math.min(width, window.innerWidth - 20);
	        height = Math.min(height, window.innerHeight - 20);

	        var container = this.parentTemplate.getElementsByClassName(_constants.CLASS_NAMES.ELEMENT)[0] || this.iframe;

	        this.parentTemplate.style.position = 'fixed';
	        this.parentTemplate.style.zIndex = _constants.MAX_Z_INDEX;
	        this.parentTemplate.style.top = 0;
	        this.parentTemplate.style.left = 0;
	        this.parentTemplate.style.width = '100%';
	        this.parentTemplate.style.height = '100%';

	        container.style.position = 'fixed';

	        this.iframe.style.width = '100%';
	        this.iframe.style.height = '100%';

	        if (width) {
	            this.parentTemplate.className += ' set-width';
	            container.style.width = width + 'px';
	            container.style.left = '50%';
	            container.style.marginLeft = '-' + Math.floor(width / 2) + 'px';
	        } else {
	            this.parentTemplate.className += ' max-width';
	            container.style.width = '100%';
	            container.style.left = 0;
	            container.style.marginLeft = 0;
	            container.width = '100%';
	        }

	        if (height) {
	            this.parentTemplate.className += ' set-height';
	            container.style.height = height + 'px';
	            container.style.top = '50%';
	            container.style.marginTop = '-' + Math.floor(height / 2) + 'px';
	        } else {
	            this.parentTemplate.className += ' max-height';
	            container.style.height = '100%';
	            container.style.top = 0;
	            container.style.marginTop = 0;
	            container.height = '100%';
	        }
	    },
	    hide: function hide() {
	        this.iframe.style.display = 'none';
	    },
	    restyle: function restyle() {
	        // pass
	    },
	    loadUrl: function loadUrl(url) {
	        this.iframe.src = url;
	    }
	}), _RENDER_DRIVERS);

/***/ },
/* 47 */
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

	var _constants = __webpack_require__(/*! ../../constants */ 42);

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
/* 48 */
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

	var _promise = __webpack_require__(/*! sync-browser-mocks/src/promise */ 7);

	var _validate = __webpack_require__(/*! ./validate */ 47);

	var _props = __webpack_require__(/*! ../props */ 43);

	var _constants = __webpack_require__(/*! ../../constants */ 42);

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

	            return value;
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

	            params[queryParam] = result;
	        });
	    })).then(function () {
	        return params;
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
	                    instance.component.log('autoclose', { prop: key });

	                    var result = _promise.SyncPromise.resolve(value.apply(this, arguments));

	                    return _promise.SyncPromise.all([result, instance.close(_constants.CLOSE_REASONS.AUTOCLOSE)]).then(function () {
	                        return result;
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
/* 49 */
/*!******************************************!*\
  !*** ./src/component/component/props.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.internalProps = undefined;

	var _lib = __webpack_require__(/*! ../../lib */ 2);

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
	        }
	    },

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

	    version: {
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
	        promisify: true,
	        def: function def(err) {
	            console.error(err.message, '\n', err.stack || err.toString());
	        },

	        once: true
	    }
	};

/***/ },
/* 50 */
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

	var _constants = __webpack_require__(/*! ../../constants */ 42);

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
	        if (typeof options.dimensions.width !== 'number') {
	            throw new Error('[' + options.tag + '] Expected options.dimensions.width to be a number');
	        }

	        if (typeof options.dimensions.height !== 'number') {
	            throw new Error('[' + options.tag + '] Expected options.dimensions.height to be a number');
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
/* 51 */
/*!******************************************************!*\
  !*** ./src/component/component/templates/parent.htm ***!
  \******************************************************/
/***/ function(module, exports) {

	module.exports = "<div class=\"{CLASS.XCOMPONENT}-overlay {CLASS.FOCUS}\">\n    <a href=\"#{CLASS.CLOSE}\" class=\"{CLASS.CLOSE}\"></a>\n\n    <div class=\"{CLASS.ELEMENT}\"></div>\n</div>\n\n<style>\n    #{id} .{CLASS.XCOMPONENT}-overlay {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        background-color: rgba(0, 0, 0, 0.8);\n    }\n\n    #{id}.{CLASS.POPUP} .{CLASS.XCOMPONENT}-overlay {\n        cursor: pointer;\n    }\n\n    #{id} .{CLASS.CLOSE} {\n        position: absolute;\n        right: 16px;\n        top: 16px;\n        width: 16px;\n        height: 16px;\n        opacity: 0.6;\n    }\n\n    #{id} .{CLASS.CLOSE}:hover {\n        opacity: 1;\n    }\n\n    #{id} .{CLASS.CLOSE}:before, .{CLASS.CLOSE}:after {\n        position: absolute;\n        left: 8px;\n        content: ' ';\n        height: 16px;\n        width: 2px;\n        background-color: white;\n    }\n\n    #{id} .{CLASS.CLOSE}:before {\n        transform: rotate(45deg);\n    }\n\n    #{id} .{CLASS.CLOSE}:after {\n        transform: rotate(-45deg);\n    }\n</style>"

/***/ },
/* 52 */
/*!*********************************************************!*\
  !*** ./src/component/component/templates/component.htm ***!
  \*********************************************************/
/***/ function(module, exports) {

	module.exports = ""

/***/ },
/* 53 */
/*!******************************!*\
  !*** ./src/drivers/index.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _script = __webpack_require__(/*! ./script */ 54);

	Object.keys(_script).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _script[key];
	    }
	  });
	});

	var _react = __webpack_require__(/*! ./react */ 55);

	Object.keys(_react).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _react[key];
	    }
	  });
	});

	var _angular = __webpack_require__(/*! ./angular */ 56);

	Object.keys(_angular).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _angular[key];
	    }
	  });
	});

	var _ember = __webpack_require__(/*! ./ember */ 57);

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
/* 54 */
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
/* 55 */
/*!******************************!*\
  !*** ./src/drivers/react.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.react = undefined;

	var _lib = __webpack_require__(/*! ../lib */ 2);

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
/* 56 */
/*!********************************!*\
  !*** ./src/drivers/angular.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.angular = undefined;

	var _lib = __webpack_require__(/*! ../lib */ 2);

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
/* 57 */
/*!******************************!*\
  !*** ./src/drivers/ember.js ***!
  \******************************/
/***/ function(module, exports) {

	"use strict";

/***/ }
/******/ ])
});
;