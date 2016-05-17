
export function urlEncode(str) {
    return str.replace(/\?/g, '%3F').replace(/\&/g, '%26');
}

export function camelToDasherize(string) {
    return string.replace(/([A-Z])/g, function (g) {
        return `-${g.toLowerCase()}`;
    });
}

export function dasherizeToCamel(string) {
    return string.replace(/-([a-z])/g, function (g) {
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

export function popup(url, options, callback) {

    callback = once(callback || noop);

    let win = window.open(url, options.name, Object.keys(options).map(function(key) {
        return `${key}=${options[key]}`;
    }).join(', '));

    let interval;

    function checkWindowClosed() {
        if (win.closed) {
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
            checkWindowClosed();
        };
    } catch (err) {
        // pass
    }

    return win;
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

window.addEventListener('load', function() {
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
    return result
}