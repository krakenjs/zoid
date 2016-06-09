
import { once } from './fn';
import { extend } from './util';


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

    let win = window.open(url, options.name, Object.keys(options).map((key) => {
        return `${key}=${options[key]}`;
    }).join(', '), true);

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

    frame.style.backgroundColor = 'transparent';
    frame.frameBorder = '0';
    frame.allowTransparency = 'true';

    container.appendChild(frame);

    return frame;
}


/*  On Close Window
    ---------------

    Wait for the specified window to close or cease to exist, then call the callback
*/

export function onCloseWindow(win, callback) {

    callback = once(callback);

    let interval;

    function checkWindowClosed() {
        if (!win || win.closed || typeof win.closed === 'undefined') {
            clearInterval(interval);
            callback();
        }
    }

    interval = setInterval(checkWindowClosed, 50);
    setTimeout(checkWindowClosed);

    try {
        let close = win.close;
        win.close = function() {
            close.apply(this, arguments);
            setTimeout(checkWindowClosed);
        };
    } catch (err) {
        // pass
    }
}


/*  Get Parent Window
    -----------------

    Get the parent window depending on whether we are in an iframe or a popup
*/

export function getParentWindow() {
    if (window.opener) {
        return window.opener;
    }

    if (window.parent && window.parent !== window) {
        return window.parent;
    }
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

    if (options.events) {
        for (let key of Object.keys(options.events)) {
            element.addEventListener(key, options.events[key]);
        }
    }

    if (container) {
        container.appendChild(element);
    }

    return element;
}


/*  Create Stylesheet
    -----------------

    Create a stylesheet with the specified css, and append it to a a container
*/

export function createStyleSheet(styleSheet, container) {

    return createElement('style', {

        styleSheet: styleSheet,

        attributes: {
            type: 'text/css'
        }

    }, container);
}