'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.normalizeProp = normalizeProp;
exports.normalizeProps = normalizeProps;
exports.propsToQuery = propsToQuery;

var _src = require('zalgo-promise/src');

var _lib = require('../../lib');

function isDefined(value) {
    return value !== null && value !== undefined && value !== '';
}

/*  Normalize Prop
    --------------

    Turn prop into normalized value, using defaults, function options, etc.
*/

// $FlowFixMe
function normalizeProp(component, instance, props, key, value) {
    // eslint-disable-line complexity

    var prop = component.getProp(key);

    var resultValue = void 0;

    if (prop.value) {
        resultValue = prop.value;
    } else if (prop.def && (!props.hasOwnProperty(key) || !isDefined(value))) {
        resultValue = prop.def.call(component, props);
    } else {
        resultValue = value;
    }

    if (!resultValue && prop.alias && props[prop.alias]) {
        resultValue = props[prop.alias];
    }

    var decorated = false;

    if (prop.decorate && resultValue !== null && resultValue !== undefined) {
        resultValue = prop.decorate.call(instance, resultValue, props);
        decorated = true;
    }

    var type = prop.type;

    if (type === 'boolean') {
        // $FlowFixMe
        resultValue = Boolean(resultValue);
    } else if (type === 'function') {

        if (!resultValue && prop.noop) {
            // $FlowFixMe
            resultValue = _lib.noop;

            if (!decorated && prop.decorate) {
                // $FlowFixMe
                resultValue = prop.decorate.call(instance, _lib.noop, props);
            }
        }

        if (resultValue && typeof resultValue === 'function') {

            resultValue = resultValue.bind(instance);

            // If prop.denodeify is set, denodeify the function (accepts callback -> returns promise)

            if (prop.denodeify) {
                // $FlowFixMe
                resultValue = (0, _lib.denodeify)(resultValue);
            }

            if (prop.promisify) {
                // $FlowFixMe
                resultValue = (0, _lib.promisify)(resultValue);
            }

            // Wrap the function in order to log when it is called

            var original = resultValue;
            // $FlowFixMe
            resultValue = function resultValue() {
                component.log('call_prop_' + key);
                return original.apply(this, arguments);
            };

            // If prop.once is set, ensure the function can only be called once

            if (prop.once) {
                // $FlowFixMe
                resultValue = (0, _lib.once)(resultValue);
            }

            // If prop.memoize is set, ensure the function is memoized (first return resultValue is cached and returned for any future calls)

            if (prop.memoize) {
                // $FlowFixMe
                resultValue = (0, _lib.memoize)(resultValue);
            }
        }
    } else if (type === 'string') {
        // pass

    } else if (type === 'object') {
        // pass

    } else if (type === 'number') {
        if (resultValue !== undefined) {
            // $FlowFixMe
            resultValue = parseInt(resultValue, 10);
        }
    }

    // $FlowFixMe
    return resultValue;
}

/*  Normalize Props
    ---------------

    Turn props into normalized values, using defaults, function options, etc.
*/

function normalizeProps(component, instance, props) {

    var result = {};

    // $FlowFixMe
    props = props || {};

    for (var _iterator = Object.keys(props), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var key = _ref;

        if (component.getPropNames().indexOf(key) !== -1) {
            // $FlowFixMe
            result[key] = normalizeProp(component, instance, props, key, props[key]);
        } else {
            result[key] = props[key];
        }
    }

    for (var _iterator2 = component.getPropNames(), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
            if (_i2 >= _iterator2.length) break;
            _ref2 = _iterator2[_i2++];
        } else {
            _i2 = _iterator2.next();
            if (_i2.done) break;
            _ref2 = _i2.value;
        }

        var _key = _ref2;

        if (!props.hasOwnProperty(_key) && (!instance.props || !instance.props.hasOwnProperty(_key))) {

            // $FlowFixMe
            var normalizedProp = normalizeProp(component, instance, props, _key, props[_key]);

            if (normalizedProp !== undefined) {
                result[_key] = normalizedProp;
            }
        }
    }

    // $FlowFixMe
    return result;
}

/*  Props to Query
    --------------

    Turn props into an initial query string to open the component with

    string -> string
    bool   -> 1
    object -> json
    number -> string
*/

// $FlowFixMe
function getQueryParam(prop, key, value) {
    return _src.ZalgoPromise['try'](function () {
        if (typeof prop.queryParam === 'function') {
            return prop.queryParam(value);
        } else if (typeof prop.queryParam === 'string') {
            return prop.queryParam;
        } else {
            return key;
        }
    });
}

// $FlowFixMe
function getQueryValue(prop, key, value) {
    return _src.ZalgoPromise['try'](function () {
        if (typeof prop.queryValue === 'function') {
            return prop.queryValue(value);
        } else {
            return value;
        }
    });
}

function propsToQuery(propsDef, props) {

    var params = {};

    return _src.ZalgoPromise.all(Object.keys(props).map(function (key) {

        var prop = propsDef[key];

        if (!prop) {
            return; // eslint-disable-line array-callback-return
        }

        return _src.ZalgoPromise.resolve().then(function () {

            var value = props[key];

            if (!value) {
                return;
            }

            if (!prop.queryParam) {
                return;
            }

            return value;
        }).then(function (value) {

            if (!value) {
                return;
            }

            return _src.ZalgoPromise.all([
            // $FlowFixMe
            getQueryParam(prop, key, value),
            // $FlowFixMe
            getQueryValue(prop, key, value)]).then(function (_ref3) {
                var queryParam = _ref3[0],
                    queryValue = _ref3[1];


                var result = void 0;

                if (typeof queryValue === 'boolean') {
                    result = '1';
                } else if (typeof queryValue === 'string') {
                    result = queryValue.toString();
                } else if (typeof queryValue === 'function') {
                    return;
                } else if ((typeof queryValue === 'undefined' ? 'undefined' : _typeof(queryValue)) === 'object' && queryValue !== null) {

                    if (prop.serialization === 'json') {
                        result = JSON.stringify(queryValue);
                    } else {
                        result = (0, _lib.dotify)(queryValue, key);

                        for (var _iterator3 = Object.keys(result), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
                            var _ref4;

                            if (_isArray3) {
                                if (_i3 >= _iterator3.length) break;
                                _ref4 = _iterator3[_i3++];
                            } else {
                                _i3 = _iterator3.next();
                                if (_i3.done) break;
                                _ref4 = _i3.value;
                            }

                            var dotkey = _ref4;

                            params[dotkey] = result[dotkey];
                        }

                        return;
                    }
                } else if (typeof queryValue === 'number') {
                    result = queryValue.toString();
                }

                params[queryParam] = result;
            });
        });
    })).then(function () {
        return params;
    });
}