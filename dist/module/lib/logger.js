

var logger = void 0;

export function useLogger(newLogger) {
    logger = newLogger;
}

export function info(name, event) {
    var payload = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (logger) {
        logger.info("xc_" + name + "_" + event, payload);
    }
}

/*  Log Warning
    -----------

    Log a warning
*/

export function warn(name, event) {
    var payload = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (logger) {
        logger.warn("xc_" + name + "_" + event, payload);
    }
}

/*  Log Error
    ---------

    Log an error
*/

export function error(name, event) {
    var payload = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (logger) {
        logger.error("xc_" + name + "_" + event, payload);
    }
}