import * as postRobot from 'post-robot/src';
import * as $logger from 'beaver-logger/client';

export function setLogLevel(logLevel) {
    if ($logger.logLevels.indexOf(logLevel) === -1) {
        throw new Error(`Invalid logLevel: ${logLevel}`);
    }
    $logger.config.logLevel = logLevel;
    postRobot.CONFIG.LOG_LEVEL = logLevel;
    window.LOG_LEVEL = logLevel;
}

export function info(name, event, payload = {}) {
    $logger.info(`xc_${name}_${event}`, payload);
}


/*  Log Warning
    -----------

    Log a warning
*/

export function warn(name, event, payload) {
    $logger.warn(`xc_${name}_${event}`, payload);
}


/*  Log Error
    ---------

    Log an error
*/

export function error(name, event, payload) {
    $logger.error(`xc_${name}_${event}`, payload);
}