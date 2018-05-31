'use strict';

exports.__esModule = true;
exports.setLogLevel = setLogLevel;
exports.info = info;
exports.warn = warn;
exports.error = error;

var _src = require('post-robot/src');

var _client = require('beaver-logger/client');

function setLogLevel(logLevel) {
    if (_client.logLevels.indexOf(logLevel) === -1) {
        throw new Error('Invalid logLevel: ' + logLevel);
    }
    _client.config.logLevel = logLevel;
    _src.CONFIG.LOG_LEVEL = logLevel;
    window.LOG_LEVEL = logLevel;
}

function info(name, event) {
    var payload = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    (0, _client.info)('xc_' + name + '_' + event, payload);
}

/*  Log Warning
    -----------

    Log a warning
*/

function warn(name, event) {
    var payload = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    (0, _client.warn)('xc_' + name + '_' + event, payload);
}

/*  Log Error
    ---------

    Log an error
*/

function error(name, event) {
    var payload = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    (0, _client.error)('xc_' + name + '_' + event, payload);
}