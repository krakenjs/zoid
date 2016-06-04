
import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';

export function urlEncode(str) {
    return str.replace(/\?/g, '%3F').replace(/\&/g, '%26');
}

export function camelToDasherize(string) {
    return string.replace(/([A-Z])/g, (g) => {
        return `-${g.toLowerCase()}`;
    });
}

export function dasherizeToCamel(string) {
    return string.replace(/-([a-z])/g, (g) => {
        return g[1].toUpperCase();
    });
}

export function noop() {
    // pass
}

export function once(method) {
    let called = false;

    return function () {
        if (!called) {
            called = true;
            return method.apply(this, arguments);
        }
    };
}

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

export function popup(url, options) {

    let win = window.open(url, options.name, Object.keys(options).map((key) => {
        return `${key}=${options[key]}`;
    }).join(', '));

    return win;
}

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

export function extend(obj, source) {
    if (!source) {
        return obj;
    }

    for (let key in source) {
        if (source.hasOwnProperty(key)) {
            obj[key] = source[key];
        }
    }

    return obj;
}


let clickEventActive = false;

window.addEventListener('load', () => {
    window.document.body.addEventListener('click', () => {
        clickEventActive = true;
        setTimeout(() => {
            clickEventActive = false;
        });
    }, true);
});

export function isClick() {
    return clickEventActive;
}

export function pop(obj, name, def) {
    let result = obj.hasOwnProperty(name) ? obj[name] : def;
    delete obj[name];
    return result;
}

export function values(obj) {
    let results = [];

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            results.push(obj[key]);
        }
    }

    return results;
}

export function uniqueID() {

    let chars = '0123456789abcdef';

    return 'xxxxxxxxxx'.replace(/./g, () => {
        return chars.charAt(Math.floor(Math.random() * chars.length));
    });
}

export function getParentWindow() {
    if (window.opener) {
        return window.opener;
    }

    if (window.parent && window.parent !== window) {
        return window.parent;
    }
}

export function b64encode(str) {
    return window.btoa(str).replace(/[=]/g, '_');
}

export function b64decode(str) {
    return window.atob(str.replace(/[_]/g, '='));
}

export function getParentNode(el, tag) {
    tag = tag.toLowerCase();

    while (el.parentNode) {
        el = el.parentNode;
        if (el.tagName.toLowerCase() === tag) {
            return el;
        }
    }
}

export function scanForJavascript(str) {

    if (!str) {
        return str;
    }

    if (str.match(/<script|on\w+=|javascript:|expression\s*\(/)) {
        throw new Error(`HTML contains potential javascript: ${str}`);
    }

    return str;
}

export function denodeify(method) {

    return function() {

        let self = this;
        let args = Array.prototype.slice.call(arguments);

        if (args.length >= method.length) {
            return Promise.resolve(method.apply(self, args));
        }

        return new Promise((resolve, reject) => {
            args.push(function denodeifyCallback(err, result) {
                return err ? reject(err) : resolve(result);
            });
            return method.apply(self, args);
        });
    };
}