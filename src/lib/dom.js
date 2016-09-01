
import { once, noop, memoize } from './fn';
import { extend, get, safeInterval, urlEncode } from './util';


/*  Get Element
    -----------

    Gets an element based on

    - Element id
    - CSS Query selector
*/

export function getElement(id) {
    if (id instanceof window.Element) {
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

    return win;
}



/*  Iframe
    ------

    Open an iframe with the specified container, url, and option property map
*/

export function iframe(container, url, options) {

    container = getElement(container);

    let frame = document.createElement('iframe');

    for (let key of Object.keys(options)) {
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

export function isWindowClosed(win) {
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

export function onCloseWindow(win, callback) {

    callback = once(callback);

    let isFunction = (win instanceof Function);

    let interval;

    let checkWindowClosed = () => {

        let myWin;

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

    interval = safeInterval(checkWindowClosed, 50);
    checkWindowClosed();

    return {
        cancel() {
            interval.cancel();
            callback = noop;
        }
    };
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


/*  Get Parent Node
    ---------------

    Get the parent element with the specified tag name
*/

export function getParentNode(el, tag) {
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

export function scanForJavascript(str) {

    if (!str) {
        return str;
    }

    if (str.match(/<script|on\w+\s*=|javascript:|expression\s*\(|eval\(|new\s*Function/)) {
        throw new Error(`HTML contains potential javascript: ${str}`);
    }

    return str;
}


/*  Create Element
    --------------

    Create an element with style, html, classes, attributes etc. and append it to the specified container
*/

export function createElement(tag = 'div', options = {}, container = null) {
    let element = document.createElement(tag);

    if (options.style) {
        extend(element.style, options.style);
    }

    if (options.html) {
        element.innerHTML = options.html;
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

export function addEventToClass(element, className, eventName, handler) {
    for (let el of Array.prototype.slice.call(element.getElementsByClassName(className))) {
        el.addEventListener(eventName, event => {
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

export function template(html, context) {
    return html.replace(/\{([\w_\.]+)\}/g, variable => {
        return get(context, variable.slice(1, variable.length - 1), '');
    });
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


export function getDomain(url) {

    let domain;

    if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
        domain = url;
    } else {
        domain = window.location.href;
    }

    domain = domain.split('/').slice(0, 3).join('/');

    return domain;
}

export function formatQuery(obj = {}) {

    return Object.keys(obj).map(key => {
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

export function getParentWindow(win) {
    win = win || window;

    let opener = getOpener(win);

    if (opener) {
        return opener;
    }

    let parent = getParent(win);

    if (parent) {
        return parent;
    }
}

export function getFrames(win) {

    if (!win) {
        return;
    }

    try {
        if (win.frames && typeof win.frames === 'number') {
            return win.frames;
        }
    } catch (err) {
        // pass
    }

    if (win.length && typeof win.length === 'number') {
        return win;
    }
}

export function getFrame(win, name) {
    let frames = getFrames(win);

    if (frames) {
        try {
            return frames[name];
        } catch (err) {
            return;
        }
    }
}