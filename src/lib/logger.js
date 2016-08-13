
import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';

let customLogger;

export function registerLogger(newLogger) {
    customLogger = newLogger;
}

export let logger = {

    debug(event, payload) {
        return customLogger ? customLogger.debug(event, payload) : window.console && window.console.debug && window.console.debug(event, payload);
    },

    info(event, payload) {
        return customLogger ? customLogger.info(event, payload) : window.console && window.console.info && window.console.info(event, payload);
    },

    warn(event, payload) {
        return customLogger ? customLogger.warn(event, payload) : window.console && window.console.warn && window.console.warn(event, payload);
    },

    error(event, payload) {
        return customLogger ? customLogger.error(event, payload) : window.console && window.console.error && window.console.error(event, payload);
    },

    flush() {
        if (customLogger && customLogger.flush) {
            return customLogger.flush();
        }
        return Promise.resolve();
    }
};