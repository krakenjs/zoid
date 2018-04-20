/* @flow */

import { CONFIG } from 'post-robot/src';
import { config, logLevels, info as logInfo, warn as logWarn, error as logError } from 'beaver-logger/client';

export function setLogLevel(logLevel : string) {
    if (logLevels.indexOf(logLevel) === -1) {
        throw new Error(`Invalid logLevel: ${ logLevel }`);
    }
    config.logLevel = logLevel;
    CONFIG.LOG_LEVEL = logLevel;
    window.LOG_LEVEL = logLevel;
}

export function info(name : string, event : string, payload : Object = {}) {
    logInfo(`xc_${ name }_${ event }`, payload);
}


/*  Log Warning
    -----------

    Log a warning
*/

export function warn(name : string, event : string, payload : Object = {}) {
    logWarn(`xc_${ name }_${ event }`, payload);
}


/*  Log Error
    ---------

    Log an error
*/

export function error(name : string, event : string, payload : Object = {}) {
    logError(`xc_${ name }_${ event }`, payload);
}
