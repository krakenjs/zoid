
/*  Url Encode
    ----------

    Replace ? and & with encoded values. Allows other values (to create more readable urls than encodeUriComponent)
*/

export function urlEncode(str) {
    return str.replace(/\?/g, '%3F').replace(/\&/g, '%26').replace(/#/g, '%23');
}


/*  Camel To Dasherize
    ------------------

    Convert camelCaseText to dasherized-text
*/

export function camelToDasherize(string) {
    return string.replace(/([A-Z])/g, (g) => {
        return `-${g.toLowerCase()}`;
    });
}


/*  Dasherize to Camel
    ------------------

    Convert dasherized-text to camelCaseText
*/

export function dasherizeToCamel(string) {
    return string.replace(/-([a-z])/g, (g) => {
        return g[1].toUpperCase();
    });
}


/*  Extend
    ------

    Extend one object with another
*/

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


/*  Values
    ------

    Get all of the values from an object as an array
*/

export function values(obj) {
    let results = [];

    for (let key in obj) {
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

export function uniqueID() {

    let chars = '0123456789abcdef';

    return 'xxxxxxxxxx'.replace(/./g, () => {
        return chars.charAt(Math.floor(Math.random() * chars.length));
    });
}

/*  Stringify with Functions
    ------------------------

    JSON Stringify with added support for functions
*/

export function stringifyWithFunctions(obj) {
    return JSON.stringify(obj, (key, val) => {
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

export function safeGet(obj, prop) {

    let result;

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

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}


/*  Get
    ---

    Recursively gets a deep path from an object, returning a default value if any level is not found
*/

export function get(item, path, def) {

    if (!path) {
        return def;
    }

    path = path.split('.');

    // Loop through each section of our key path

    for (let i = 0; i < path.length; i++) {

        // If we have an object, we can get the key

        if (typeof item === 'object' && item !== null) {
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

export function safeInterval(method, time) {

    let timeout;

    function runInterval() {
        timeout = setTimeout(runInterval, time);
        method.call();
    }

    timeout = setTimeout(runInterval, time);

    return {
        cancel() {
            clearTimeout(timeout);
        }
    };
}

/*  Safe Interval
    -------------

    Run timeouts at 100ms intervals so we can account for busy browsers
*/

export function safeTimeout(method, time) {

    let interval = safeInterval(() => {
        time -= 100;
        if (time <= 0) {
            interval.cancel();
            method();
        }
    }, 100);
}


export function each(item, callback) {

    if (!item) {
        return;
    }

    if (item instanceof Array) {
        let len = item.length;
        for (let i = 0; i < len; i++) {
            callback(item[i], i);
        }

    } else if (typeof item === 'object') {
        let keys = Object.keys(item);
        let len = keys.length;
        for (let i = 0; i < len; i++) {
            let key = keys[i];
            callback(item[key], key);
        }
    }
}



export function replaceObject(obj, callback, parentKey = '') {

    let newobj = obj instanceof Array ? [] : {};

    each(obj, (item, key) => {

        let fullKey = parentKey ? `${parentKey}.${key}` : key;

        let result = callback(item, key, fullKey);

        if (result !== undefined) {
            newobj[key] = result;
        } else if (typeof item === 'object' && item !== null) {
            newobj[key] = replaceObject(item, callback, fullKey);
        } else {
            newobj[key] = item;
        }
    });

    return newobj;
}



export function copyProp(source, target, name, def) {
    if (source.hasOwnProperty(name)) {
        let descriptor = Object.getOwnPropertyDescriptor(source, name);
        Object.defineProperty(target, name, descriptor);

    } else {
        target[name] = def;
    }
}

export function dotify(obj, prefix = '', newobj = {}) {
    prefix = prefix ? `${prefix}.` : prefix;
    for (let key in obj) {
        if (obj[key] === undefined || obj[key] === null) {
            continue;
        } else if (obj[key] && typeof obj[key] === 'object') {
            newobj = dotify(obj[key], `${prefix}${key}`, newobj);
        } else {
            newobj[`${prefix}${key}`] = obj[key].toString();
        }
    }
    return newobj;
}


function WeakMap() {
    this.id = `__weakmap_${uniqueID()}__`;
}

WeakMap.prototype = {

    set(item, value) {

        if (item === null || item === undefined || typeof item !== 'object' && typeof item !== 'function') {
            throw new Error(`Invalid key for WeakMap`);
        }

        let entry = item[this.id];

        if (entry && entry[0] === item) {
            entry[1] = value;
        } else {
            Object.defineProperty(item, this.id, { value: [ item, value ], writable: true });
        }
    },

    get(item) {
        let entry = item[this.id];

        if (entry && entry[0] === item) {
            return entry[1];
        }
    },

    delete(item) {
        let entry = item[this.id];

        if (entry && entry[0] === item) {
            entry[0] = entry[1] = undefined;
        }
    },

    has(item) {
        let entry = item[this.id];

        return entry && entry[0] === item;
    }
};

let objectIDs = new WeakMap();

export function getObjectID(obj) {

    if (obj === null || obj === undefined || typeof obj !== 'object' && typeof obj !== 'function') {
        throw new Error(`Invalid object`);
    }

    let uid = objectIDs.get(obj);

    if (!uid) {
        uid = `${typeof obj}:${uniqueID()}`;
        objectIDs.set(obj, uid);
    }

    return uid;
}
