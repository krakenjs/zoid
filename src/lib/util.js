/* @flow */

import { WeakMap } from 'cross-domain-safe-weakmap/src';

/*  Url Encode
    ----------

    Replace ? and & with encoded values. Allows other values (to create more readable urls than encodeUriComponent)
*/

export function urlEncode(str : string) : string {
    return str.replace(/\?/g, '%3F').replace(/\&/g, '%26').replace(/#/g, '%23').replace(/\+/g, '%2B');
}


/*  Camel To Dasherize
    ------------------

    Convert camelCaseText to dasherized-text
*/

export function camelToDasherize(string : string) : string {
    return string.replace(/([A-Z])/g, (g) => {
        return `-${g.toLowerCase()}`;
    });
}


/*  Dasherize to Camel
    ------------------

    Convert dasherized-text to camelCaseText
*/

export function dasherizeToCamel(string : string) : string {
    return string.replace(/-([a-z])/g, (g) => {
        return g[1].toUpperCase();
    });
}


/*  Extend
    ------

    Extend one object with another
*/

export function extend(obj : Object, source : ?Object) : Object {
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

export function values(obj : Object) : Array<mixed> {
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

export function uniqueID() : string {

    let chars = '0123456789abcdef';

    return 'xxxxxxxxxx'.replace(/./g, () => {
        return chars.charAt(Math.floor(Math.random() * chars.length));
    });
}

/*  Stringify with Functions
    ------------------------

    JSON Stringify with added support for functions
*/

export function stringifyWithFunctions(obj : Object) : string {
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

export function safeGet(obj : Object, prop : string) : mixed {

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

export function capitalizeFirstLetter(string : string) : string {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}


/*  Get
    ---

    Recursively gets a deep path from an object, returning a default value if any level is not found
*/

export function get(item : Object, path : string, def : mixed) : mixed {

    if (!path) {
        return def;
    }

    let pathParts = path.split('.');

    // Loop through each section of our key path

    for (let i = 0; i < pathParts.length; i++) {

        // If we have an object, we can get the key

        if (typeof item === 'object' && item !== null) {
            item = item[pathParts[i]];

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

export function safeInterval(method : Function, time : number) : CancelableType {

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

export function safeTimeout(method : Function, time : number) {

    let interval = safeInterval(() => {
        time -= 100;
        if (time <= 0) {
            interval.cancel();
            method();
        }
    }, 100);
}


export function each(item : Array<mixed> | Object, callback : Function) {

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



export function replaceObject<T : Object | Array<mixed>>(obj : T, callback : Function, parentKey : string = '') : T {

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

    // $FlowFixMe
    return newobj;
}



export function copyProp(source : Object, target : Object, name : string, def : mixed) {
    if (source.hasOwnProperty(name)) {
        let descriptor = Object.getOwnPropertyDescriptor(source, name);
        Object.defineProperty(target, name, descriptor);

    } else {
        target[name] = def;
    }
}

export function dotify(obj : Object, prefix : string = '', newobj : Object = {}) : { [string] : string } {
    prefix = prefix ? `${prefix}.` : prefix;
    for (let key in obj) {
        if (obj[key] === undefined || obj[key] === null || typeof obj[key] === 'function') {
            continue;
        } else if (obj[key] && Array.isArray(obj[key]) && obj[key].length && obj[key].every(val => typeof val !== 'object')) {
            newobj[`${prefix}${key}`] = obj[key].join(',');
        } else if (obj[key] && typeof obj[key] === 'object') {
            newobj = dotify(obj[key], `${prefix}${key}`, newobj);
        } else {
            newobj[`${prefix}${key}`] = obj[key].toString();
        }
    }
    return newobj;
}

let objectIDs = new WeakMap();

export function getObjectID(obj : Object) : string {

    if (obj === null || obj === undefined || (typeof obj !== 'object' && typeof obj !== 'function')) {
        throw new Error(`Invalid object`);
    }

    let uid = objectIDs.get(obj);

    if (!uid) {
        uid = `${typeof obj}:${uniqueID()}`;
        objectIDs.set(obj, uid);
    }

    return uid;
}

type RegexResultType = {
    text : string,
    groups : Array<string>,
    start : number,
    end : number,
    length : number,
    replace : (text : string) => string
};

export function regex(pattern : string | RegExp, string : string, start : number = 0) : ?RegexResultType {

    if (typeof pattern === 'string') {
        pattern = new RegExp(pattern);
    }

    let result = string.slice(start).match(pattern);

    if (!result) {
        return;
    }

    // $FlowFixMe
    let index : number = result.index;
    let match = result[0];

    return {
        text: match,
        groups: result.slice(1),
        start: start + index,
        end: start + index + match.length,
        length: match.length,

        replace(text : string) : string {

            if (!match) {
                return '';
            }

            return `${ match.slice(0, start + index) }${ text }${ match.slice(index + match.length) }`;
        }
    };
}

export function regexAll(pattern : string | RegExp, string : string) : Array<RegexResultType> {

    let matches = [];
    let start = 0;

    while (true) {
        let match = regex(pattern, string, start);

        if (!match) {
            break;
        }

        matches.push(match);
        start = match.end;
    }

    return matches;
}

export function count(str : string, substr : string) : number {

    let startIndex = 0;
    let itemCount = 0;

    while (true) {
        let index = str.indexOf(substr, startIndex);

        if (index === -1) {
            break;
        }

        startIndex = index;
        itemCount += 1;
    }

    return itemCount;
}

export function stringify(item : mixed) : string {
    if (typeof item === 'string') {
        return item;
    }

    if (item && typeof item.toString === 'function') {
        return item.toString();
    }

    return Object.prototype.toString.call(item);
}

export function stringifyError(err : mixed) : string {
    if (err) {
        // $FlowFixMe
        let { stack, message } = err;

        if (typeof stack === 'string') {
            return stack;
        }

        if (typeof message === 'string') {
            return message;
        }
    }

    return stringify(err);
}

export type EventEmitterType = {
    on : (eventName : string, handler : Function) => CancelableType,
    once : (eventName : string, handler : Function) => CancelableType,
    trigger : (eventName : string) => void,
    triggerOnce : (eventName : string) => void
};

export function eventEmitter() : EventEmitterType {

    let triggered = {};
    let handlers = {};

    return {

        on(eventName : string, handler : Function) : CancelableType {

            let handlerList = handlers[eventName] = handlers[eventName] || [];

            handlerList.push(handler);

            let cancelled = false;

            return {
                cancel() {
                    if (!cancelled) {
                        cancelled = true;
                        handlerList.splice(handlerList.indexOf(handler), 1);
                    }

                }
            };
        },

        once(eventName : string, handler : Function) : CancelableType {

            let listener = this.on(eventName, () => {
                listener.cancel();
                handler();
            });

            return listener;
        },

        trigger(eventName : string) {

            let handlerList = handlers[eventName];

            if (handlerList) {
                for (let handler of handlerList) {
                    handler();
                }
            }
        },

        triggerOnce(eventName : string) {

            if (triggered[eventName]) {
                return;
            }

            triggered[eventName] = true;
            this.trigger(eventName);
        }
    };
}
