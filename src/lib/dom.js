
import { isWindowClosed, linkFrameWindow } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { WeakMap } from 'cross-domain-safe-weakmap/src';

import { once, memoize, debounce } from './fn';
import { extend, safeInterval, urlEncode, capitalizeFirstLetter } from './util';
import { PopupOpenError } from '../error';

export function appendChild(container, child) {
    container.appendChild(child);
}

function isElement(element) {

    if (element instanceof window.Element) {
        return true;
    }

    if (typeof element === 'object' && element.nodeType === 1 && typeof element.style === 'object' && typeof element.ownerDocument === 'object') {
        return true;
    }

    return false;
}

export function querySelectorAll(el, selector) {
    return Array.prototype.slice.call(el.querySelectorAll(selector));
}

/*  Get Element
    -----------

    Gets an element based on

    - Element id
    - CSS Query selector
*/

export function getElement(id) {

    if (isElement(id)) {
        return id;
    }

    if (typeof id === 'string') {
        let element = document.getElementById(id);

        if (element) {
            return element;
        }

        if (document.querySelector) {
            return document.querySelector(id);
        }
    }
}


export let documentReady = new ZalgoPromise(resolve => {

    if (window.document.readyState === 'complete') {
        return resolve(window.document);
    }

    let interval = setInterval(() => {
        if (window.document.readyState === 'complete') {
            clearInterval(interval);
            return resolve(window.document);
        }
    }, 10);
});

export function isDocumentReady() {
    return window.document.readyState === 'complete';
}

export function elementReady(id) {
    return new ZalgoPromise((resolve, reject) => {

        let el = getElement(id);

        if (el) {
            return resolve(el);
        }

        if (isDocumentReady()) {
            return reject(new Error(`Document is ready and element ${id} does not exist`));
        }

        let interval = setInterval(() => {

            el = getElement(id);

            if (el) {
                clearInterval(interval);
                return resolve(el);
            }

            if (isDocumentReady()) {
                clearInterval(interval);
                return reject(new Error(`Document is ready and element ${id} does not exist`));
            }
        }, 10);
    });
}


/*  Popup
    -----

    Open a popup window with the specified option map
*/

export function popup(url, options) {

    let params = Object.keys(options).map((key) => {
        if (options[key]) {
            return `${key}=${options[key]}`;
        }
    }).filter(Boolean).join(',');

    let win = window.open(url, options.name, params, true);

    if (isWindowClosed(win)) {
        let err = new PopupOpenError(`Can not open popup window - blocked`);
        throw err;
    }

    return win;
}


export function writeToWindow(win, html) {
    try {
        win.document.open();
        win.document.write(html);
        win.document.close();
    } catch (err) {
        try {
            win.location = `javascript: document.open(); document.write(${JSON.stringify(html)}); document.close();`;
        } catch (err2) {
            // pass
        }
    }
}

export function writeElementToWindow(win, el) {

    let doc        = win.document;
    let docElement = doc.documentElement;
    let body       = doc.body;

    if (!docElement) {
        docElement = doc.createElement('html');
        doc.appendChild(docElement);
    }

    if (!body) {
        body = doc.createElement('body');
        docElement.appendChild(body);
    }

    appendChild(body, el);
}

export function setStyle(el, styleText, doc = window.document) {
    if (el.styleSheet) {
        el.styleSheet.cssText = styleText;
    } else {
        el.appendChild(doc.createTextNode(styleText));
    }
}

/*  Create Element
    --------------

    Create an element with style, html, classes, attributes etc. and append it to the specified container
*/

export function createElement(tag = 'div', options = {}, container = null) {

    tag = tag.toLowerCase();
    let element = document.createElement(tag);

    if (options.style) {
        extend(element.style, options.style);
    }

    if (options.class) {
        element.className = options.class.join(' ');
    }

    if (options.attributes) {
        for (let key of Object.keys(options.attributes)) {
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
            if (!container || !element.contentWindow) {
                throw new Error(`Iframe html can not be written unless container provided and iframe in DOM`);
            }

            writeToWindow(element.contentWindow, options.html);

        } else {
            element.innerHTML = options.html;
        }
    }

    return element;
}

let awaitFrameLoadPromises = new WeakMap();

export function awaitFrameLoad(frame) {

    if (awaitFrameLoadPromises.has(frame)) {
        return awaitFrameLoadPromises.get(frame);
    }

    let promise = new ZalgoPromise((resolve, reject) => {
        frame.addEventListener('load', () => {
            linkFrameWindow(frame);
            resolve(frame);
        });
        frame.addEventListener('error', (err) => {
            return frame.contentWindow ? resolve(frame) : reject(err);
        });
    });

    awaitFrameLoadPromises.set(frame, promise);

    return promise;
}

export function awaitFrameWindow(frame) {

    if (frame.contentWindow) {
        return ZalgoPromise.resolve(frame.contentWindow);
    }

    return awaitFrameLoad(frame).then(loadedFrame => {

        if (!loadedFrame.contentWindow) {
            throw new Error(`Could not find window in iframe`);
        }

        return loadedFrame.contentWindow;
    });
}


/*  Iframe
    ------

    Open an iframe with the specified container, url, and option property map
*/

export function iframe(options = {}, container) {

    container = getElement(container);

    let attributes = options.attributes || {};
    let style = options.style || {};

    let frame = createElement('iframe', {
        attributes: {
            frameBorder: '0',
            allowTransparency: 'true',
            ...attributes
        },
        style: {
            backgroundColor: 'transparent',
            ...style
        },
        html: options.html
    });

    if (options.url) {
        frame.setAttribute('src', options.url);
    }

    awaitFrameLoad(frame);

    container.appendChild(frame);

    linkFrameWindow(frame);

    return frame;
}

/*  Add Event Listener
    ------------------

    Add DOM Event listener with cancel
*/

export function addEventListener(obj, event, handler) {
    obj.addEventListener(event, handler);
    return {
        cancel() {
            obj.removeEventListener(event, handler);
        }
    };
}

/*  Scan For Javascript
    -------------------

    Check if the string contains anything which could conceivably be run as javascript if the string is set to innerHTML
*/

export function scanForJavascript(str) {

    if (!str) {
        return str;
    }

    if (str.match(/<script|on\w+\s*=|javascript:|expression\s*\(|eval\(|new\s*Function/)) {
        throw new Error(`HTML contains potential javascript: ${str}`);
    }

    return str;
}

export let parseQuery = memoize(queryString => {

    let params = {};

    if (!queryString) {
        return params;
    }

    if (queryString.indexOf('=') === -1) {
        throw new Error(`Can not parse query string params: ${queryString}`);
    }

    for (let pair of queryString.split('&')) {
        pair = pair.split('=');

        if (pair[0] && pair[1]) {
            params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        }
    }

    return params;
});


export function getQueryParam(name) {
    return parseQuery(window.location.search.slice(1))[name];
}


export function getDomain(win) {

    win = win || window;

    if (win.mockDomain && win.mockDomain.indexOf('mock://') === 0) {
        return win.mockDomain;
    }

    return `${win.location.protocol}//${win.location.host}`;
}

export function getDomainFromUrl(url) {

    let domain;

    if (url.match(/^(https?|mock|file):\/\//)) {
        domain = url;
    } else {
        return getDomain(window);
    }

    domain = domain.split('/').slice(0, 3).join('/');

    return domain;
}

export function formatQuery(obj = {}) {

    return Object.keys(obj).filter(key => {
        return typeof obj[key] === 'string';
    }).map(key => {
        return `${urlEncode(key)}=${urlEncode(obj[key])}`;
    }).join('&');
}

export function extendQuery(originalQuery, props = {}) {

    if (!props || !Object.keys(props).length) {
        return originalQuery;
    }

    return formatQuery({
        ...parseQuery(originalQuery),
        ...props
    });
}

export function extendUrl(url, options = {}) {

    let query = options.query || {};
    let hash = options.hash || {};

    let originalUrl;
    let originalQuery;
    let originalHash;

    [ originalUrl, originalHash ]  = url.split('#');
    [ originalUrl, originalQuery ] = originalUrl.split('?');

    let queryString = extendQuery(originalQuery, query);
    let hashString  = extendQuery(originalHash, hash);

    if (queryString) {
        originalUrl = `${originalUrl}?${queryString}`;
    }

    if (hashString) {
        originalUrl = `${originalUrl}#${hashString}`;
    }

    return originalUrl;
}


export function elementStoppedMoving(element, timeout = 5000) {
    return new ZalgoPromise((resolve, reject) => {
        element = getElement(element);

        let start = element.getBoundingClientRect();

        let interval;
        let timer;

        interval = setInterval(() => {
            let end = element.getBoundingClientRect();

            if (start.top === end.top && start.bottom === end.bottom && start.left === end.left && start.right === end.right && start.width === end.width && start.height === end.height) {
                clearTimeout(timer);
                clearInterval(interval);
                return resolve();
            }

            start = end;

        }, 50);

        timer = setTimeout(() => {
            clearInterval(interval);
            reject(new Error(`Timed out waiting for element to stop animating after ${timeout}ms`));
        }, timeout);
    });
}


export function getOpener(win) {

    if (!win) {
        return;
    }

    try {
        return win.opener;
    } catch (err) {
        return;
    }
}

export function getParent(win) {

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

export function getCurrentDimensions(el) {
    return {
        width: el.offsetWidth,
        height: el.offsetHeight
    };
}

export function changeStyle(el, styles) {
    return new ZalgoPromise(resolve => {

        for (let key of Object.keys(styles)) {
            el.style[key] = styles[key];
        }

        setTimeout(resolve, 1);
    });
}

export function setOverflow(el, value = 'auto') {

    let { overflow, overflowX, overflowY } = el.style;

    el.style.overflow = el.style.overflowX = el.overflowY = value;

    return {
        reset() {
            el.style.overflow = overflow;
            el.style.overflowX = overflowX;
            el.style.overflowY = overflowY;
        }
    };
}

function dimensionsDiff(one, two, { width = true, height = true, threshold = 0 }) {

    if (width && Math.abs(one.width - two.width) > threshold) {
        return true;
    }

    if (height && Math.abs(one.height - two.height) > threshold) {
        return true;
    }

    return false;
}

export function trackDimensions(el, { width = true, height = true, threshold = 0 }) {

    let currentDimensions = getCurrentDimensions(el);

    return {
        check() {
            let newDimensions = getCurrentDimensions(el);

            return {
                changed: dimensionsDiff(currentDimensions, newDimensions, { width, height, threshold }),
                dimensions: newDimensions
            };
        },

        reset() {
            currentDimensions = getCurrentDimensions(el);
        }
    };
}

export function onDimensionsChange(el, { width = true, height = true, delay = 50, threshold = 0 }) {

    return new ZalgoPromise(resolve => {

        let tracker = trackDimensions(el, { width, height, threshold });

        let interval;

        let resolver = debounce((dimensions) => {
            clearInterval(interval);
            return resolve(dimensions);
        }, delay * 4);

        interval = setInterval(() => {
            let { changed, dimensions } = tracker.check();
            if (changed) {
                tracker.reset();
                return resolver(dimensions);
            }
        }, delay);

        function onWindowResize() {
            let { changed, dimensions } = tracker.check();
            if (changed) {
                tracker.reset();
                window.removeEventListener('resize', onWindowResize);
                return resolver(dimensions);
            }
        }

        window.addEventListener('resize', onWindowResize);
    });
}


export function dimensionsMatchViewport(el, { width, height }) {

    let dimensions = getCurrentDimensions(el);

    if (width && dimensions.width !== window.innerWidth) {
        return false;
    }

    if (height && dimensions.height !== window.innerHeight) {
        return false;
    }

    return true;
}


export function bindEvents(element, eventNames, handler) {

    handler = once(handler);

    for (let eventName of eventNames) {
        element.addEventListener(eventName, handler);
    }

    return {
        cancel: once(() => {
            for (let eventName of eventNames) {
                element.removeEventListener(eventName, handler);
            }
        })
    };
}

const VENDOR_PREFIXES = [ 'webkit', 'moz', 'ms', 'o' ];

export function setVendorCSS(element, name, value) {

    element.style[name] = value;

    let capitalizedName = capitalizeFirstLetter(name);

    for (let prefix of VENDOR_PREFIXES) {
        element.style[`${prefix}${capitalizedName}`] = value;
    }
}


let CSSRule = window.CSSRule;

const KEYFRAMES_RULE = CSSRule.KEYFRAMES_RULE || CSSRule.WEBKIT_KEYFRAMES_RULE ||  CSSRule.MOZ_KEYFRAMES_RULE ||
                           CSSRule.O_KEYFRAMES_RULE || CSSRule.MS_KEYFRAMES_RULE;

function isValidAnimation(element, name) {

    let stylesheets = element.ownerDocument.styleSheets;

    try {
        for (let i = 0; i < stylesheets.length; i++) {

            let cssRules = stylesheets[i].cssRules;

            if (!cssRules) {
                continue;
            }

            for (let j = 0; j < cssRules.length; j++) {

                let cssRule = cssRules[j];

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


const ANIMATION_START_EVENTS = [ 'animationstart', 'webkitAnimationStart', 'oAnimationStart', 'MSAnimationStart' ];
const ANIMATION_END_EVENTS   = [ 'animationend', 'webkitAnimationEnd', 'oAnimationEnd', 'MSAnimationEnd' ];

export function animate(element, name, clean, timeout = 1000) {
    return new ZalgoPromise((resolve, reject) => {

        element = getElement(element);

        if (!element || !isValidAnimation(element, name)) {
            return resolve();
        }

        let hasStarted = false;

        let startTimeout;
        let endTimeout;
        let startEvent;
        let endEvent;

        function cleanUp() {
            setVendorCSS(element, 'animationName', '');
            clearTimeout(startTimeout);
            clearTimeout(endTimeout);
            startEvent.cancel();
            endEvent.cancel();
        }

        startEvent = bindEvents(element, ANIMATION_START_EVENTS, event => {

            if (event.target !== element || event.animationName !== name) {
                return;
            }

            clearTimeout(startTimeout);

            event.stopPropagation();

            startEvent.cancel();
            hasStarted = true;

            endTimeout = setTimeout(() => {
                cleanUp();
                resolve();
            }, timeout);
        });

        endEvent = bindEvents(element, ANIMATION_END_EVENTS, event => {

            if (event.target !== element || event.animationName !== name) {
                return;
            }

            cleanUp();

            if (event.animationName !== name) {
                return reject(`Expected animation name to be ${name}, found ${event.animationName}`);
            }

            return resolve();
        });

        setVendorCSS(element, 'animationName', name);

        startTimeout = setTimeout(() => {
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

const STYLE = {

    DISPLAY: {
        NONE: 'none',
        BLOCK: 'block'
    },

    IMPORTANT: 'important'
};

export function showElement(element) {
    element.style.display = '';
}

export function hideElement(element) {
    element.style.setProperty('display', STYLE.DISPLAY.NONE, STYLE.IMPORTANT);
}

export function destroyElement(element) {
    if (element.parentNode) {
        element.parentNode.removeChild(element);
    }
}

export function showAndAnimate(element, name, clean) {
    let animation = animate(element, name, clean);
    showElement(element);
    return animation;
}

export function animateAndHide(element, name, clean) {
    return animate(element, name, clean).then(() => {
        hideElement(element);
    });
}

export function addClass(element, name) {
    if (element.classList) {
        element.classList.add(name);
    } else if (element.className.split(/\s+/).indexOf(name) === -1) {
        element.className += ` ${name}`;
    }
}

export function getCurrentScriptDir() {
    console.warn(`Do not use xcomponent.getCurrentScriptDir() in production -- browser support is limited`);

    if (document.currentScript) {
        return document.currentScript.src.split('/').slice(0, -1).join('/');
    }

    return '.';
}

export function getElementName(element) {

    if (typeof element === 'string') {
        return element;
    }

    if (!element || !element.tagName) {
        return '<unknown>';
    }

    let name = element.tagName.toLowerCase();

    if (element.id) {
        name += `#${element.id}`;
    } else if (element.className) {
        name += `.${element.className.split(' ').join('.')}`;
    }

    return name;
}

export function isElementClosed(el) {
    if (!el || !el.parentNode) {
        return true;
    }
    return false;
}

export function watchElementForClose(element, handler) {
    handler = once(handler);

    let interval;

    if (isElementClosed(element)) {
        handler();
    } else {
        interval = safeInterval(() => {
            if (isElementClosed(element)) {
                interval.cancel();
                handler();
            }
        }, 50);
    }

    return {
        cancel() {
            if (interval) {
                interval.cancel();
            }
        }
    };
}

export function getHttpType(contentType, url) {
    return new ZalgoPromise((resolve, reject) => {

        let req = new window.XMLHttpRequest();

        req.open('GET', url);
        req.setRequestHeader('Accept', contentType);
        req.send(null);

        req.onload = () => {
            resolve(req.responseText);
        };

        req.onerror = () => {
            return reject(new Error(`prefetch failed`));
        };
    });
}

export function getHTML(url) {
    return getHttpType('text/html', url);
}

export function getCSS(url) {
    return getHttpType('text/css', url);
}

export function getScript(url) {
    return getHttpType('*/*', url);
}

export function prefetchPage(url) {
    return getHTML(url);
}

export function getDOMElement(item, doc = document) {
    if (item && item.ownerDocument) {
        return item;
    } else if (typeof item === 'string') {
        let div = doc.createElement('div');
        div.innerHTML = item;

        if (div.children.length !== 1) {
            throw new Error(`Expected 1 child from html, found ${div.children.length}`);
        }

        let el = div.children[0];

        for (let script of querySelectorAll(el, 'script')) {
            let newScript = doc.createElement('script');
            newScript.text = script.textContent;
            script.parentNode.replaceChild(newScript, script);
        }

        return el;

    } else {
        throw new Error(`Expected HTMLElement or string, got ${typeof item}`);
    }
}

const JSX_EVENTS = {
    onClick: 'click'
};

export function jsxDom(name, props, content) {

    name = name.toLowerCase();

    let doc = (this && this.createElement)
        ? this
        : window.document;

    let el = doc.createElement(name);

    for (let prop in props) {
        if (prop in JSX_EVENTS) {
            el.addEventListener(JSX_EVENTS[prop], props[prop]);
        } else {
            el.setAttribute(prop, props[prop]);
        }
    }

    if (name === 'style') {

        if (typeof content !== 'string') {
            throw new Error(`Expected ${name} tag content to be string, got ${typeof content}`);
        }

        if (arguments.length > 3) {
            throw new Error(`Expected only text content for ${name} tag`);
        }

        setStyle(el, content, doc);

    } else if (name === 'iframe') {

        if (arguments.length > 3) {
            throw new Error(`Expected only single child node for iframe`);
        }

        el.addEventListener('load', () => {
            let win = el.contentWindow;

            if (!win) {
                throw new Error(`Expected frame to have contentWindow`);
            }

            if (typeof content === 'string') {
                writeToWindow(win, content);
            } else {
                writeElementToWindow(win, content);
            }
        });

    } else if (name === 'script') {

        if (typeof content !== 'string') {
            throw new Error(`Expected ${name} tag content to be string, got ${typeof content}`);
        }

        if (arguments.length > 3) {
            throw new Error(`Expected only text content for ${name} tag`);
        }

        // $FlowFixMe
        el.text = content;

    } else {
        for (let i = 2; i < arguments.length; i++) {
            if (typeof arguments[i] === 'string') {
                el.textContent = arguments[i];
            } else {
                appendChild(el, arguments[i]);
            }
        }
    }

    return el;
}
