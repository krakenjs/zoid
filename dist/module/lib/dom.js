'use strict';

exports.__esModule = true;
exports.parseQuery = exports.documentReady = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
/* eslint max-lines: 0 */

exports.appendChild = appendChild;
exports.querySelectorAll = querySelectorAll;
exports.getElementSafe = getElementSafe;
exports.getElement = getElement;
exports.isDocumentReady = isDocumentReady;
exports.elementReady = elementReady;
exports.popup = popup;
exports.writeToWindow = writeToWindow;
exports.writeElementToWindow = writeElementToWindow;
exports.setStyle = setStyle;
exports.createElement = createElement;
exports.awaitFrameLoad = awaitFrameLoad;
exports.awaitFrameWindow = awaitFrameWindow;
exports.iframe = iframe;
exports.addEventListener = addEventListener;
exports.scanForJavascript = scanForJavascript;
exports.getQueryParam = getQueryParam;
exports.formatQuery = formatQuery;
exports.extendQuery = extendQuery;
exports.extendUrl = extendUrl;
exports.elementStoppedMoving = elementStoppedMoving;
exports.getCurrentDimensions = getCurrentDimensions;
exports.changeStyle = changeStyle;
exports.setOverflow = setOverflow;
exports.trackDimensions = trackDimensions;
exports.onDimensionsChange = onDimensionsChange;
exports.dimensionsMatchViewport = dimensionsMatchViewport;
exports.bindEvents = bindEvents;
exports.setVendorCSS = setVendorCSS;
exports.animate = animate;
exports.makeElementVisible = makeElementVisible;
exports.makeElementInvisible = makeElementInvisible;
exports.showElement = showElement;
exports.hideElement = hideElement;
exports.destroyElement = destroyElement;
exports.showAndAnimate = showAndAnimate;
exports.animateAndHide = animateAndHide;
exports.addClass = addClass;
exports.removeClass = removeClass;
exports.getCurrentScriptDir = getCurrentScriptDir;
exports.getElementName = getElementName;
exports.isElementClosed = isElementClosed;
exports.watchElementForClose = watchElementForClose;
exports.getHttpType = getHttpType;
exports.getHTML = getHTML;
exports.getCSS = getCSS;
exports.getScript = getScript;
exports.prefetchPage = prefetchPage;
exports.fixScripts = fixScripts;
exports.jsxDom = jsxDom;

var _src = require('cross-domain-utils/src');

var _src2 = require('zalgo-promise/src');

var _src3 = require('cross-domain-safe-weakmap/src');

var _error = require('../error');

var _fn = require('./fn');

var _util = require('./util');

function appendChild(container, child) {
    container.appendChild(child);
}

function isElement(element) {

    if (element instanceof window.Element) {
        return true;
    }

    if (element !== null && (typeof element === 'undefined' ? 'undefined' : _typeof(element)) === 'object' && element.nodeType === 1 && _typeof(element.style) === 'object' && _typeof(element.ownerDocument) === 'object') {
        return true;
    }

    return false;
}

function querySelectorAll(el, selector) {
    return Array.prototype.slice.call(el.querySelectorAll(selector));
}

/*  Get Element
    -----------

    Gets an element based on

    - Element id
    - CSS Query selector
*/

function getElementSafe(id) {

    if (isElement(id)) {
        // $FlowFixMe
        return id;
    }

    if (typeof id === 'string') {
        var element = document.getElementById(id);

        if (element) {
            return element;
        }

        if (document.querySelector) {
            element = document.querySelector(id);
        }

        if (element) {
            return element;
        }
    }
}

function getElement(id) {

    var element = getElementSafe(id);

    if (element) {
        return element;
    }

    throw new Error('Can not find element: ' + (0, _util.stringify)(id));
}

var documentReady = exports.documentReady = new _src2.ZalgoPromise(function (resolve) {

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

function isDocumentReady() {
    return window.document.readyState === 'complete';
}

function elementReady(id) {
    return new _src2.ZalgoPromise(function (resolve, reject) {

        var name = (0, _util.stringify)(id);
        var el = getElementSafe(id);

        if (el) {
            return resolve(el);
        }

        if (isDocumentReady()) {
            return reject(new Error('Document is ready and element ' + name + ' does not exist'));
        }

        var interval = setInterval(function () {

            el = getElementSafe(id);

            if (el) {
                clearInterval(interval);
                return resolve(el);
            }

            if (isDocumentReady()) {
                clearInterval(interval);
                return reject(new Error('Document is ready and element ' + name + ' does not exist'));
            }
        }, 10);
    });
}

/*  Popup
    -----

    Open a popup window with the specified option map
*/

function popup(url, options) {

    // eslint-disable-next-line array-callback-return
    var params = Object.keys(options).map(function (key) {
        if (options[key]) {
            return key + '=' + (0, _util.stringify)(options[key]);
        }
    }).filter(Boolean).join(',');

    var win = void 0;

    try {
        win = window.open(url, options.name, params, true);
    } catch (err) {
        throw new _error.PopupOpenError('Can not open popup window - ' + (err.stack || err.message));
    }

    if ((0, _src.isWindowClosed)(win)) {
        var err = new _error.PopupOpenError('Can not open popup window - blocked');
        throw err;
    }

    return win;
}

function writeToWindow(win, html) {
    try {
        win.document.open();
        win.document.write(html);
        win.document.close();
    } catch (err) {
        try {
            win.location = 'javascript: document.open(); document.write(' + JSON.stringify(html) + '); document.close();';
        } catch (err2) {
            // pass
        }
    }
}

function writeElementToWindow(win, el) {

    var tag = el.tagName.toLowerCase();

    if (tag !== 'html') {
        throw new Error('Expected element to be html, got ' + tag);
    }

    var documentElement = win.document.documentElement;

    while (documentElement.children && documentElement.children.length) {
        documentElement.removeChild(documentElement.children[0]);
    }

    while (el.children.length) {
        documentElement.appendChild(el.children[0]);
    }
}

function setStyle(el, styleText) {
    var doc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window.document;

    // $FlowFixMe
    if (el.styleSheet) {
        // $FlowFixMe
        el.styleSheet.cssText = styleText;
    } else {
        el.appendChild(doc.createTextNode(styleText));
    }
}

/*  Create Element
    --------------

    Create an element with style, html, classes, attributes etc. and append it to the specified container
*/

function createElement() {
    var tag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var container = arguments[2];


    tag = tag.toLowerCase();
    var element = document.createElement(tag);

    if (options.style) {
        (0, _util.extend)(element.style, options.style);
    }

    if (options['class']) {
        element.className = options['class'].join(' ');
    }

    if (options.attributes) {
        for (var _iterator = Object.keys(options.attributes), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
    }

    if (options.styleSheet) {
        setStyle(element, options.styleSheet);
    }

    if (container) {
        appendChild(container, element);
    }

    if (options.html) {
        if (tag === 'iframe') {
            // $FlowFixMe
            if (!container || !element.contentWindow) {
                throw new Error('Iframe html can not be written unless container provided and iframe in DOM');
            }

            // $FlowFixMe
            writeToWindow(element.contentWindow, options.html);
        } else {
            element.innerHTML = options.html;
        }
    }

    return element;
}

var awaitFrameLoadPromises = new _src3.WeakMap();

function awaitFrameLoad(frame) {

    if (awaitFrameLoadPromises.has(frame)) {
        var _promise = awaitFrameLoadPromises.get(frame);
        if (_promise) {
            return _promise;
        }
    }

    var promise = new _src2.ZalgoPromise(function (resolve, reject) {
        frame.addEventListener('load', function () {
            (0, _src.linkFrameWindow)(frame);
            resolve(frame);
        });

        frame.addEventListener('error', function (err) {
            if (frame.contentWindow) {
                resolve(frame);
            } else {
                reject(err);
            }
        });
    });

    awaitFrameLoadPromises.set(frame, promise);

    return promise;
}

function awaitFrameWindow(frame) {

    if (frame.contentWindow) {
        return _src2.ZalgoPromise.resolve(frame.contentWindow);
    }

    return awaitFrameLoad(frame).then(function (loadedFrame) {

        if (!loadedFrame.contentWindow) {
            throw new Error('Could not find window in iframe');
        }

        return loadedFrame.contentWindow;
    });
}

/*  Iframe
    ------

    Open an iframe with the specified container, url, and option property map
*/

function iframe() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var container = arguments[1];


    var el = getElement(container);

    var attributes = options.attributes || {};
    var style = options.style || {};

    var frame = createElement('iframe', {
        attributes: _extends({
            frameBorder: '0',
            allowTransparency: 'true'
        }, attributes),
        style: _extends({
            backgroundColor: 'transparent'
        }, style),
        html: options.html,
        'class': options['class']
    });

    // $FlowFixMe
    awaitFrameLoad(frame);

    el.appendChild(frame);

    if (options.url || window.navigator.userAgent.match(/MSIE|Edge/i)) {
        frame.setAttribute('src', options.url || 'about:blank');
    }

    // $FlowFixMe
    return frame;
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

var parseQuery = exports.parseQuery = (0, _fn.memoize)(function (queryString) {

    var params = {};

    if (!queryString) {
        return params;
    }

    if (queryString.indexOf('=') === -1) {
        throw new Error('Can not parse query string params: ' + queryString);
    }

    for (var _iterator2 = queryString.split('&'), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
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

function formatQuery() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


    return Object.keys(obj).filter(function (key) {
        return typeof obj[key] === 'string';
    }).map(function (key) {
        return (0, _util.urlEncode)(key) + '=' + (0, _util.urlEncode)(obj[key]);
    }).join('&');
}

function extendQuery(originalQuery) {
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


    if (!props || !Object.keys(props).length) {
        return originalQuery;
    }

    return formatQuery(_extends({}, parseQuery(originalQuery), props));
}

function extendUrl(url) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


    var query = options.query || {};
    var hash = options.hash || {};

    var originalUrl = void 0;
    var originalQuery = void 0;
    var originalHash = void 0;

    var _url$split = url.split('#');

    originalUrl = _url$split[0];
    originalHash = _url$split[1];

    var _originalUrl$split = originalUrl.split('?');

    originalUrl = _originalUrl$split[0];
    originalQuery = _originalUrl$split[1];


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
    var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5000;

    return new _src2.ZalgoPromise(function (resolve, reject) {
        var el = getElement(element);

        var start = el.getBoundingClientRect();

        var interval = void 0;
        var timer = void 0;

        interval = setInterval(function () {
            var end = el.getBoundingClientRect();

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

function getCurrentDimensions(el) {
    return {
        width: el.offsetWidth,
        height: el.offsetHeight
    };
}

function changeStyle(el, styles) {
    return new _src2.ZalgoPromise(function (resolve) {

        for (var _iterator3 = Object.keys(styles), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
            var _ref3;

            if (_isArray3) {
                if (_i3 >= _iterator3.length) break;
                _ref3 = _iterator3[_i3++];
            } else {
                _i3 = _iterator3.next();
                if (_i3.done) break;
                _ref3 = _i3.value;
            }

            var key = _ref3;

            // $FlowFixMe
            el.style[key] = styles[key];
        }

        setTimeout(resolve, 1);
    });
}

function setOverflow(el) {
    var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'auto';
    var _el$style = el.style,
        overflow = _el$style.overflow,
        overflowX = _el$style.overflowX,
        overflowY = _el$style.overflowY;


    el.style.overflow = el.style.overflowX = el.style.overflowY = value;

    return {
        reset: function reset() {
            el.style.overflow = overflow;
            el.style.overflowX = overflowX;
            el.style.overflowY = overflowY;
        }
    };
}

function dimensionsDiff(one, two, _ref4) {
    var _ref4$width = _ref4.width,
        width = _ref4$width === undefined ? true : _ref4$width,
        _ref4$height = _ref4.height,
        height = _ref4$height === undefined ? true : _ref4$height,
        _ref4$threshold = _ref4.threshold,
        threshold = _ref4$threshold === undefined ? 0 : _ref4$threshold;


    if (width && Math.abs(one.width - two.width) > threshold) {
        return true;
    }

    if (height && Math.abs(one.height - two.height) > threshold) {
        return true;
    }

    return false;
}

function trackDimensions(el, _ref5) {
    var _ref5$width = _ref5.width,
        width = _ref5$width === undefined ? true : _ref5$width,
        _ref5$height = _ref5.height,
        height = _ref5$height === undefined ? true : _ref5$height,
        _ref5$threshold = _ref5.threshold,
        threshold = _ref5$threshold === undefined ? 0 : _ref5$threshold;


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

function onDimensionsChange(el, _ref6) {
    var _ref6$width = _ref6.width,
        width = _ref6$width === undefined ? true : _ref6$width,
        _ref6$height = _ref6.height,
        height = _ref6$height === undefined ? true : _ref6$height,
        _ref6$delay = _ref6.delay,
        delay = _ref6$delay === undefined ? 50 : _ref6$delay,
        _ref6$threshold = _ref6.threshold,
        threshold = _ref6$threshold === undefined ? 0 : _ref6$threshold;


    return new _src2.ZalgoPromise(function (resolve) {

        var tracker = trackDimensions(el, { width: width, height: height, threshold: threshold });

        var interval = void 0;

        var resolver = (0, _fn.debounce)(function (dimensions) {
            clearInterval(interval);
            return resolve(dimensions);
        }, delay * 4);

        interval = setInterval(function () {
            var _tracker$check = tracker.check(),
                changed = _tracker$check.changed,
                dimensions = _tracker$check.dimensions;

            if (changed) {
                tracker.reset();
                return resolver(dimensions);
            }
        }, delay);

        function onWindowResize() {
            var _tracker$check2 = tracker.check(),
                changed = _tracker$check2.changed,
                dimensions = _tracker$check2.dimensions;

            if (changed) {
                tracker.reset();
                window.removeEventListener('resize', onWindowResize);
                resolver(dimensions);
            }
        }

        window.addEventListener('resize', onWindowResize);
    });
}

function dimensionsMatchViewport(el, _ref7) {
    var width = _ref7.width,
        height = _ref7.height;


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

    for (var _iterator4 = eventNames, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
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
        cancel: (0, _fn.once)(function () {
            for (var _iterator5 = eventNames, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
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

var VENDOR_PREFIXES = ['webkit', 'moz', 'ms', 'o'];

function setVendorCSS(element, name, value) {

    // $FlowFixMe
    element.style[name] = value;

    var capitalizedName = (0, _util.capitalizeFirstLetter)(name);

    for (var _iterator6 = VENDOR_PREFIXES, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
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

        // $FlowFixMe
        element.style['' + prefix + capitalizedName] = value;
    }
}

var CSSRule = window.CSSRule;

var KEYFRAMES_RULE = CSSRule.KEYFRAMES_RULE || CSSRule.WEBKIT_KEYFRAMES_RULE || CSSRule.MOZ_KEYFRAMES_RULE || CSSRule.O_KEYFRAMES_RULE || CSSRule.MS_KEYFRAMES_RULE;

function isValidAnimation(element, name) {

    var stylesheets = element.ownerDocument.styleSheets;

    try {
        for (var i = 0; i < stylesheets.length; i++) {

            // $FlowFixMe
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

function animate(element, name, clean) {
    var timeout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1000;

    return new _src2.ZalgoPromise(function (resolve, reject) {

        var el = getElement(element);

        if (!el || !isValidAnimation(el, name)) {
            return resolve();
        }

        var hasStarted = false;

        var startTimeout = void 0;
        var endTimeout = void 0;
        var startEvent = void 0;
        var endEvent = void 0;

        function cleanUp() {
            setVendorCSS(el, 'animationName', '');
            clearTimeout(startTimeout);
            clearTimeout(endTimeout);
            startEvent.cancel();
            endEvent.cancel();
        }

        startEvent = bindEvents(el, ANIMATION_START_EVENTS, function (event) {

            // $FlowFixMe
            if (event.target !== el || event.animationName !== name) {
                return;
            }

            clearTimeout(startTimeout);

            event.stopPropagation();

            startEvent.cancel();
            hasStarted = true;

            endTimeout = setTimeout(function () {
                cleanUp();
                resolve();
            }, timeout);
        });

        endEvent = bindEvents(el, ANIMATION_END_EVENTS, function (event) {

            // $FlowFixMe
            if (event.target !== el || event.animationName !== name) {
                return;
            }

            cleanUp();

            // $FlowFixMe
            if (typeof event.animationName === 'string' && event.animationName !== name) {
                return reject('Expected animation name to be ' + name + ', found ' + event.animationName);
            }

            return resolve();
        });

        setVendorCSS(el, 'animationName', name);

        startTimeout = setTimeout(function () {
            if (!hasStarted) {
                cleanUp();
                return resolve();
            }
        }, 200);

        if (clean) {
            clean(cleanUp);
        }
    });
}

var STYLE = {

    DISPLAY: {
        NONE: 'none',
        BLOCK: 'block'
    },

    VISIBILITY: {
        VISIBLE: 'visible',
        HIDDEN: 'hidden'
    },

    IMPORTANT: 'important'
};

function makeElementVisible(element) {
    element.style.setProperty('visibility', '');
}

function makeElementInvisible(element) {
    element.style.setProperty('visibility', STYLE.VISIBILITY.HIDDEN, STYLE.IMPORTANT);
}

function showElement(element) {
    element.style.setProperty('display', '');
}

function hideElement(element) {
    element.style.setProperty('display', STYLE.DISPLAY.NONE, STYLE.IMPORTANT);
}

function destroyElement(element) {
    if (element.parentNode) {
        element.parentNode.removeChild(element);
    }
}

function showAndAnimate(element, name, clean) {
    var animation = animate(element, name, clean);
    showElement(element);
    return animation;
}

function animateAndHide(element, name, clean) {
    return animate(element, name, clean).then(function () {
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

function removeClass(element, name) {
    if (element.classList) {
        element.classList.remove(name);
    } else if (element.className.split(/\s+/).indexOf(name) !== -1) {
        element.className = element.className.replace(name, '');
    }
}

function getCurrentScriptDir() {
    // eslint-disable-next-line no-console
    console.warn('Do not use zoid.getCurrentScriptDir() in production -- browser support is limited');

    // eslint-disable-next-line compat/compat
    if (document.currentScript) {
        // eslint-disable-next-line compat/compat
        return document.currentScript.src.split('/').slice(0, -1).join('/');
    }

    return '.';
}

function getElementName(element) {

    if (typeof element === 'string') {
        return element;
    }

    if (!element || !element.tagName) {
        return '<unknown>';
    }

    var name = element.tagName.toLowerCase();

    if (element.id) {
        name += '#' + element.id;
    } else if (element.className) {
        name += '.' + element.className.split(' ').join('.');
    }

    return name;
}

function isElementClosed(el) {
    if (!el || !el.parentNode) {
        return true;
    }
    return false;
}

function watchElementForClose(element, handler) {
    handler = (0, _fn.once)(handler);

    var interval = void 0;

    if (isElementClosed(element)) {
        handler();
    } else {
        interval = (0, _util.safeInterval)(function () {
            if (isElementClosed(element)) {
                interval.cancel();
                handler();
            }
        }, 50);
    }

    return {
        cancel: function cancel() {
            if (interval) {
                interval.cancel();
            }
        }
    };
}

function getHttpType(contentType, url) {
    return new _src2.ZalgoPromise(function (resolve, reject) {

        var req = new window.XMLHttpRequest();

        req.open('GET', url);
        req.setRequestHeader('Accept', contentType);
        req.send(null);

        req.onload = function () {
            resolve(req.responseText);
        };

        req.onerror = function () {
            return reject(new Error('prefetch failed'));
        };
    });
}

function getHTML(url) {
    return getHttpType('text/html', url);
}

function getCSS(url) {
    return getHttpType('text/css', url);
}

function getScript(url) {
    return getHttpType('*/*', url);
}

function prefetchPage(url) {
    return getHTML(url);
}

var JSX_EVENTS = {
    onClick: 'click'
};

function fixScripts(el) {
    var doc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.document;

    for (var _iterator7 = querySelectorAll(el, 'script'), _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator]();;) {
        var _ref11;

        if (_isArray7) {
            if (_i7 >= _iterator7.length) break;
            _ref11 = _iterator7[_i7++];
        } else {
            _i7 = _iterator7.next();
            if (_i7.done) break;
            _ref11 = _i7.value;
        }

        var script = _ref11;

        var newScript = doc.createElement('script');
        newScript.text = script.textContent;
        script.parentNode.replaceChild(newScript, script);
    }
}

function jsxDom(name, props, content) {

    name = name.toLowerCase();

    var doc = this && this.createElement ? this : window.document;

    var el = doc.createElement(name);

    for (var prop in props) {
        if (prop in JSX_EVENTS) {
            el.addEventListener(JSX_EVENTS[prop], props[prop]);
        } else if (prop === 'innerHTML') {
            el.innerHTML = props[prop];
            fixScripts(el, doc);
        } else {
            el.setAttribute(prop, props[prop]);
        }
    }

    if (name === 'style') {

        if (typeof content !== 'string') {
            throw new TypeError('Expected ' + name + ' tag content to be string, got ' + (typeof content === 'undefined' ? 'undefined' : _typeof(content)));
        }

        if (arguments.length > 3) {
            throw new Error('Expected only text content for ' + name + ' tag');
        }

        setStyle(el, content, doc);
    } else if (name === 'iframe') {

        if (arguments.length > 3) {
            throw new Error('Expected only single child node for iframe');
        }

        el.addEventListener('load', function () {
            var win = el.contentWindow;

            if (!win) {
                throw new Error('Expected frame to have contentWindow');
            }

            if (typeof content === 'string') {
                writeToWindow(win, content);
            } else {
                writeElementToWindow(win, content);
            }
        });
    } else if (name === 'script') {

        if (typeof content !== 'string') {
            throw new TypeError('Expected ' + name + ' tag content to be string, got ' + (typeof content === 'undefined' ? 'undefined' : _typeof(content)));
        }

        if (arguments.length > 3) {
            throw new Error('Expected only text content for ' + name + ' tag');
        }

        el.text = content;
    } else {
        for (var i = 2; i < arguments.length; i++) {
            if (typeof arguments[i] === 'string') {
                var textNode = document.createTextNode(arguments[i]);
                appendChild(el, textNode);
            } else {
                appendChild(el, arguments[i]);
            }
        }
    }

    return el;
}