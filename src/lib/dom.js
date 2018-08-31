/* @flow */
/* eslint max-lines: 0 */

import { isWindowClosed, linkFrameWindow, type CrossDomainWindowType, type SameDomainWindowType } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { WeakMap } from 'cross-domain-safe-weakmap/src';

import { PopupOpenError } from '../error';
import type { ElementRefType, CancelableType } from '../types';

import { once, memoize, debounce } from './fn';
import { extend, safeInterval, urlEncode, capitalizeFirstLetter, stringify } from './util';

export function appendChild(container : HTMLElement, child : HTMLElement | Text) {
    container.appendChild(child);
}

function isElement(element : mixed) : boolean {

    if (element instanceof window.Element) {
        return true;
    }

    if (element !== null && typeof element === 'object' && element.nodeType === 1 && typeof element.style === 'object' && typeof element.ownerDocument === 'object') {
        return true;
    }

    return false;
}

export function querySelectorAll(el : HTMLElement, selector : string) : Array<window.HTMLElement> {
    return Array.prototype.slice.call(el.querySelectorAll(selector));
}

/*  Get Element
    -----------

    Gets an element based on

    - Element id
    - CSS Query selector
*/

export function getElementSafe(id : ElementRefType) : ?HTMLElement {

    if (isElement(id)) {
        // $FlowFixMe
        return id;
    }

    if (typeof id === 'string') {
        let element = document.getElementById(id);

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

export function getElement(id : ElementRefType) : HTMLElement {

    let element = getElementSafe(id);

    if (element) {
        return element;
    }

    throw new Error(`Can not find element: ${ stringify(id) }`);
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

export function isDocumentReady() : boolean {
    return window.document.readyState === 'complete';
}

export function elementReady(id : ElementRefType) : ZalgoPromise<window.HTMLElement> {
    return new ZalgoPromise((resolve, reject) => {

        let name = stringify(id);
        let el = getElementSafe(id);

        if (el) {
            return resolve(el);
        }

        if (isDocumentReady()) {
            return reject(new Error(`Document is ready and element ${ name } does not exist`));
        }

        let interval = setInterval(() => {

            el = getElementSafe(id);

            if (el) {
                clearInterval(interval);
                return resolve(el);
            }

            if (isDocumentReady()) {
                clearInterval(interval);
                return reject(new Error(`Document is ready and element ${ name } does not exist`));
            }
        }, 10);
    });
}


/*  Popup
    -----

    Open a popup window with the specified option map
*/

export function popup(url : string, options : { [ string ] : mixed }) : CrossDomainWindowType {

    // eslint-disable-next-line array-callback-return
    let params = Object.keys(options).map((key) => {
        if (options[key]) {
            return `${ key }=${ stringify(options[key]) }`;
        }
    }).filter(Boolean).join(',');

    let win;

    try {
        win = window.open(url, options.name, params, true);
    } catch (err) {
        throw new PopupOpenError(`Can not open popup window - ${ err.stack || err.message }`);
    }

    if (isWindowClosed(win)) {
        let err = new PopupOpenError(`Can not open popup window - blocked`);
        throw err;
    }

    return win;
}


export function writeToWindow(win : SameDomainWindowType, html : string) {
    try {
        win.document.open();
        win.document.write(html);
        win.document.close();
    } catch (err) {
        try {
            win.location = `javascript: document.open(); document.write(${ JSON.stringify(html) }); document.close();`;
        } catch (err2) {
            // pass
        }
    }
}

export function writeElementToWindow(win : SameDomainWindowType, el : HTMLElement) {

    let tag = el.tagName.toLowerCase();

    if (tag !== 'html') {
        throw new Error(`Expected element to be html, got ${ tag }`);
    }

    let documentElement = win.document.documentElement;

    while (documentElement.children && documentElement.children.length) {
        documentElement.removeChild(documentElement.children[0]);
    }

    while (el.children.length) {
        documentElement.appendChild(el.children[0]);
    }
}

export function setStyle(el : HTMLElement, styleText : string, doc : Document = window.document) {
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

export type ElementOptionsType = {
    style? : { [ string ] : string },
    class? : ?Array<string>,
    attributes? : { [ string ] : string },
    styleSheet? : ?string,
    html? : ?string
};

export function createElement(tag : string = 'div', options : ElementOptionsType = {}, container : ?HTMLElement) : HTMLElement {

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
            // $FlowFixMe
            if (!container || !element.contentWindow) {
                throw new Error(`Iframe html can not be written unless container provided and iframe in DOM`);
            }

            // $FlowFixMe
            writeToWindow(element.contentWindow, options.html);

        } else {
            element.innerHTML = options.html;
        }
    }

    return element;
}

let awaitFrameLoadPromises : WeakMap<HTMLIFrameElement, ZalgoPromise<HTMLIFrameElement>> = new WeakMap();

export function awaitFrameLoad(frame : HTMLIFrameElement) : ZalgoPromise<HTMLIFrameElement> {

    if (awaitFrameLoadPromises.has(frame)) {
        let promise = awaitFrameLoadPromises.get(frame);
        if (promise) {
            return promise;
        }
    }

    let promise = new ZalgoPromise((resolve, reject) => {
        frame.addEventListener('load', () => {
            linkFrameWindow(frame);
            resolve(frame);
        });

        frame.addEventListener('error', (err : Event) => {
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

export function awaitFrameWindow(frame : HTMLIFrameElement) : ZalgoPromise<HTMLIFrameElement> {

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

export type IframeElementOptionsType = {
    style? : { [ string ] : string },
    class? : ?Array<string>,
    attributes? : { [ string ] : string },
    styleSheet? : ?string,
    html? : ?string,
    url? : ?string
};

export function iframe(options : IframeElementOptionsType = {}, container : HTMLElement) : HTMLIFrameElement {

    let el = getElement(container);

    let attributes = options.attributes || {};
    let style = options.style || {};

    let frame = createElement('iframe', {
        attributes: {
            frameBorder:       '0',
            allowTransparency: 'true',
            ...attributes
        },
        style: {
            backgroundColor: 'transparent',
            ...style
        },
        html:  options.html,
        class: options.class
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

export function addEventListener(obj : HTMLElement, event : string, handler : (event : Event) => void) : CancelableType {
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

export function scanForJavascript(str : string) : string {

    if (!str) {
        return str;
    }

    if (str.match(/<script|on\w+\s*=|javascript:|expression\s*\(|eval\(|new\s*Function/)) {
        throw new Error(`HTML contains potential javascript: ${ str }`);
    }

    return str;
}

export let parseQuery = memoize((queryString : string) : { [ string ] : string } => {

    let params = {};

    if (!queryString) {
        return params;
    }

    if (queryString.indexOf('=') === -1) {
        throw new Error(`Can not parse query string params: ${ queryString }`);
    }

    for (let pair of queryString.split('&')) {
        pair = pair.split('=');

        if (pair[0] && pair[1]) {
            params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        }
    }

    return params;
});


export function getQueryParam(name : string) : ?string {
    return parseQuery(window.location.search.slice(1))[name];
}

export function formatQuery(obj : { [ string ] : string } = {}) : string {

    return Object.keys(obj).filter(key => {
        return typeof obj[key] === 'string';
    }).map(key => {
        return `${ urlEncode(key) }=${ urlEncode(obj[key]) }`;
    }).join('&');
}

export function extendQuery(originalQuery : string, props : { [ string ] : string } = {}) : string {

    if (!props || !Object.keys(props).length) {
        return originalQuery;
    }

    return formatQuery({
        ...parseQuery(originalQuery),
        ...props
    });
}

export function extendUrl(url : string, options : { query? : { [ string ] : string }, hash? : { [ string ] : string } } = {}) : string {

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
        originalUrl = `${ originalUrl }?${ queryString }`;
    }

    if (hashString) {
        originalUrl = `${ originalUrl }#${ hashString }`;
    }

    return originalUrl;
}


export function elementStoppedMoving(element : ElementRefType, timeout : number = 5000) : ZalgoPromise<void> {
    return new ZalgoPromise((resolve, reject) => {
        let el = getElement(element);

        let start = el.getBoundingClientRect();

        let interval;
        let timer;

        interval = setInterval(() => {
            let end = el.getBoundingClientRect();

            if (start.top === end.top && start.bottom === end.bottom && start.left === end.left && start.right === end.right && start.width === end.width && start.height === end.height) {
                clearTimeout(timer);
                clearInterval(interval);
                return resolve();
            }

            start = end;

        }, 50);

        timer = setTimeout(() => {
            clearInterval(interval);
            reject(new Error(`Timed out waiting for element to stop animating after ${ timeout }ms`));
        }, timeout);
    });
}

export function getCurrentDimensions(el : HTMLElement) : { width : number, height : number } {
    return {
        width:  el.offsetWidth,
        height: el.offsetHeight
    };
}

export function changeStyle(el : HTMLElement, styles : { [ string ] : string }) : ZalgoPromise<void> {
    return new ZalgoPromise(resolve => {

        for (let key of Object.keys(styles)) {
            // $FlowFixMe
            el.style[key] = styles[key];
        }

        setTimeout(resolve, 1);
    });
}

export function setOverflow(el : HTMLElement, value : string = 'auto') : { reset : () => void } {

    let { overflow, overflowX, overflowY } = el.style;

    el.style.overflow = el.style.overflowX = el.style.overflowY = value;

    return {
        reset() {
            el.style.overflow = overflow;
            el.style.overflowX = overflowX;
            el.style.overflowY = overflowY;
        }
    };
}

function dimensionsDiff(one : { width : number, height : number }, two : { width : number, height : number }, { width = true, height = true, threshold = 0 } : { width : boolean, height : boolean, threshold : number }) : boolean {

    if (width && Math.abs(one.width - two.width) > threshold) {
        return true;
    }

    if (height && Math.abs(one.height - two.height) > threshold) {
        return true;
    }

    return false;
}

export function trackDimensions(el : HTMLElement, { width = true, height = true, threshold = 0 } : { width : boolean, height : boolean, threshold : number }) : { check : () => { changed : boolean, dimensions : { width : number, height : number } }, reset : () => void } {

    let currentDimensions = getCurrentDimensions(el);

    return {
        check() : { changed : boolean, dimensions : { width : number, height : number } } {
            let newDimensions = getCurrentDimensions(el);

            return {
                changed:    dimensionsDiff(currentDimensions, newDimensions, { width, height, threshold }),
                dimensions: newDimensions
            };
        },

        reset() {
            currentDimensions = getCurrentDimensions(el);
        }
    };
}

export function onDimensionsChange(el : HTMLElement, { width = true, height = true, delay = 50, threshold = 0 } : { width? : boolean, height? : boolean, delay? : number, threshold? : number }) : ZalgoPromise<{ width : number, height : number }> {

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
                resolver(dimensions);
            }
        }

        window.addEventListener('resize', onWindowResize);
    });
}


export function dimensionsMatchViewport(el : HTMLElement, { width, height } : { width : number, height : number }) : boolean {

    let dimensions = getCurrentDimensions(el);

    if (width && dimensions.width !== window.innerWidth) {
        return false;
    }

    if (height && dimensions.height !== window.innerHeight) {
        return false;
    }

    return true;
}


export function bindEvents(element : HTMLElement, eventNames : Array<string>, handler : (event : Event) => void) : CancelableType {

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

export function setVendorCSS(element : HTMLElement, name : string, value : string) {

    // $FlowFixMe
    element.style[name] = value;

    let capitalizedName = capitalizeFirstLetter(name);

    for (let prefix of VENDOR_PREFIXES) {
        // $FlowFixMe
        element.style[`${ prefix }${ capitalizedName }`] = value;
    }
}


let CSSRule = window.CSSRule;

const KEYFRAMES_RULE = CSSRule.KEYFRAMES_RULE || CSSRule.WEBKIT_KEYFRAMES_RULE ||  CSSRule.MOZ_KEYFRAMES_RULE ||
                           CSSRule.O_KEYFRAMES_RULE || CSSRule.MS_KEYFRAMES_RULE;

function isValidAnimation(element : HTMLElement, name : string) : boolean {

    let stylesheets = element.ownerDocument.styleSheets;

    try {
        for (let i = 0; i < stylesheets.length; i++) {

            // $FlowFixMe
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

export function animate(element : ElementRefType, name : string, clean : (Function) => void, timeout : number = 1000) : ZalgoPromise<void> {
    return new ZalgoPromise((resolve, reject) => {

        let el = getElement(element);

        if (!el || !isValidAnimation(el, name)) {
            return resolve();
        }

        let hasStarted = false;

        let startTimeout;
        let endTimeout;
        let startEvent;
        let endEvent;

        function cleanUp() {
            setVendorCSS(el, 'animationName', '');
            clearTimeout(startTimeout);
            clearTimeout(endTimeout);
            startEvent.cancel();
            endEvent.cancel();
        }

        startEvent = bindEvents(el, ANIMATION_START_EVENTS, event => {

            // $FlowFixMe
            if (event.target !== el || event.animationName !== name) {
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

        endEvent = bindEvents(el, ANIMATION_END_EVENTS, event => {

            // $FlowFixMe
            if (event.target !== el || event.animationName !== name) {
                return;
            }

            cleanUp();

            // $FlowFixMe
            if (typeof event.animationName === 'string' && event.animationName !== name) {
                return reject(`Expected animation name to be ${ name }, found ${ event.animationName }`);
            }

            return resolve();
        });

        setVendorCSS(el, 'animationName', name);

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
        NONE:  'none',
        BLOCK: 'block'
    },

    VISIBILITY: {
        VISIBLE: 'visible',
        HIDDEN:  'hidden'
    },

    IMPORTANT: 'important'
};

export function makeElementVisible(element : HTMLElement) {
    element.style.setProperty('visibility', '');
}

export function makeElementInvisible(element : HTMLElement) {
    element.style.setProperty('visibility', STYLE.VISIBILITY.HIDDEN, STYLE.IMPORTANT);
}


export function showElement(element : HTMLElement) {
    element.style.setProperty('display', '');
}

export function hideElement(element : HTMLElement) {
    element.style.setProperty('display', STYLE.DISPLAY.NONE, STYLE.IMPORTANT);
}

export function destroyElement(element : HTMLElement) {
    if (element.parentNode) {
        element.parentNode.removeChild(element);
    }
}

export function showAndAnimate(element : HTMLElement, name : string, clean : (Function) => void) : ZalgoPromise<void> {
    let animation = animate(element, name, clean);
    showElement(element);
    return animation;
}

export function animateAndHide(element : HTMLElement, name : string, clean : (Function) => void) : ZalgoPromise<void> {
    return animate(element, name, clean).then(() => {
        hideElement(element);
    });
}

export function addClass(element : HTMLElement, name : string) {
    if (element.classList) {
        element.classList.add(name);
    } else if (element.className.split(/\s+/).indexOf(name) === -1) {
        element.className += ` ${ name }`;
    }
}

export function removeClass(element : HTMLElement, name : string) {
    if (element.classList) {
        element.classList.remove(name);
    } else if (element.className.split(/\s+/).indexOf(name) !== -1) {
        element.className = element.className.replace(name, '');
    }
}

export function getCurrentScriptDir() : string {
    // eslint-disable-next-line no-console
    console.warn(`Do not use zoid.getCurrentScriptDir() in production -- browser support is limited`);

    // eslint-disable-next-line compat/compat
    if (document.currentScript) {
        // eslint-disable-next-line compat/compat
        return document.currentScript.src.split('/').slice(0, -1).join('/');
    }

    return '.';
}

export function getElementName(element : ElementRefType) : string {

    if (typeof element === 'string') {
        return element;
    }

    if (!element || !element.tagName) {
        return '<unknown>';
    }

    let name = element.tagName.toLowerCase();

    if (element.id) {
        name += `#${ element.id }`;
    } else if (element.className) {
        name += `.${ element.className.split(' ').join('.') }`;
    }

    return name;
}

export function isElementClosed(el : HTMLElement) : boolean {
    if (!el || !el.parentNode) {
        return true;
    }
    return false;
}

export function watchElementForClose(element : HTMLElement, handler : () => mixed) : CancelableType {
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

export function getHttpType(contentType : string, url : string) : ZalgoPromise<string> {
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

export function getHTML(url : string) : ZalgoPromise<string> {
    return getHttpType('text/html', url);
}

export function getCSS(url : string) : ZalgoPromise<string> {
    return getHttpType('text/css', url);
}

export function getScript(url : string) : ZalgoPromise<string> {
    return getHttpType('*/*', url);
}

export function prefetchPage(url : string) : ZalgoPromise<string> {
    return getHTML(url);
}

const JSX_EVENTS = {
    onClick: 'click'
};

export function fixScripts(el : HTMLElement, doc : Document = window.document) {
    for (let script of querySelectorAll(el, 'script')) {
        let newScript = doc.createElement('script');
        newScript.text = script.textContent;
        script.parentNode.replaceChild(newScript, script);
    }
}

export function jsxDom(name : string, props : ?{ [ string ] : mixed }, content : ElementRefType) : HTMLElement {

    name = name.toLowerCase();

    let doc = (this && this.createElement)
        ? this
        : window.document;

    let el = doc.createElement(name);

    for (let prop in props) {
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
            throw new TypeError(`Expected ${ name } tag content to be string, got ${ typeof content }`);
        }

        if (arguments.length > 3) {
            throw new Error(`Expected only text content for ${ name } tag`);
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
            throw new TypeError(`Expected ${ name } tag content to be string, got ${ typeof content }`);
        }

        if (arguments.length > 3) {
            throw new Error(`Expected only text content for ${ name } tag`);
        }

        el.text = content;

    } else {
        for (let i = 2; i < arguments.length; i++) {
            if (typeof arguments[i] === 'string') {
                let textNode = doc.createTextNode(arguments[i]);
                appendChild(el, textNode);
            } else {
                appendChild(el, arguments[i]);
            }
        }
    }

    return el;
}
