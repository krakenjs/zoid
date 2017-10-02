/* @flow */

import * as postRobot from 'post-robot/src';
import * as $logger from 'beaver-logger/client';

export function setLogLevel(logLevel : string) {
    if ($logger.logLevels.indexOf(logLevel) === -1) {
        throw new Error(`Invalid logLevel: ${logLevel}`);
    }
    $logger.config.logLevel = logLevel;
    postRobot.CONFIG.LOG_LEVEL = logLevel;
    window.LOG_LEVEL = logLevel;
}

export function info(name : string, event : string, payload : Object = {}) {
    $logger.info(`xc_${name}_${event}`, payload);
}


/*  Log Warning
    -----------

    Log a warning
*/

export function warn(name : string, event : string, payload : Object = {}) {
    $logger.warn(`xc_${name}_${event}`, payload);
}


/*  Log Error
    ---------

    Log an error
*/

export function error(name : string, event : string, payload : Object = {}) {
    $logger.error(`xc_${name}_${event}`, payload);
}
