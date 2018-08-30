/* @flow */

type Logger = {
    debug : (event : string, payload? : { [string] : ?string }) => void,
    info : (event : string, payload? : { [string] : ?string }) => void,
    warn : (event : string, payload? : { [string] : ?string }) => void,
    error : (event : string, payload? : { [string] : ?string }) => void
};

let logger : ?Logger;

export function useLogger(newLogger : Logger) {
    logger = newLogger;
}

export function info(name : string, event : string, payload : Object = {}) {
    if (logger) {
        logger.info(`xc_${ name }_${ event }`, payload);
    }
}


/*  Log Warning
    -----------

    Log a warning
*/

export function warn(name : string, event : string, payload : Object = {}) {
    if (logger) {
        logger.warn(`xc_${ name }_${ event }`, payload);
    }
}


/*  Log Error
    ---------

    Log an error
*/

export function error(name : string, event : string, payload : Object = {}) {
    if (logger) {
        logger.error(`xc_${ name }_${ event }`, payload);
    }
}
