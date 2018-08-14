'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.normalizeProps = normalizeProps;
exports.propsToQuery = propsToQuery;

var _src = require('zalgo-promise/src');

var _lib = require('../../lib');

/*  Normalize Props
    ---------------

    Turn props into normalized values, using defaults, function options, etc.
*/

function normalizeProps(component, instance, props) {
    var isUpdate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    // eslint-disable-line complexity

    var result = {};
    props = props || {};

    var propNames = isUpdate ? [] : component.getPropNames();

    // $FlowFixMe
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

        if (propNames.indexOf(key) === -1) {
            propNames.push(key);
        }
    }

    for (var _iterator2 = propNames, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
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

        var propDef = component.getProp(_key);
        var value = props[_key];

        if (!propDef) {
            if (component.looseProps) {
                result[_key] = value;
                continue;
            } else {
                throw new Error('Unrecognized prop: ' + _key);
            }
        }

        if (!(0, _lib.isDefined)(value) && propDef.alias) {
            value = props[propDef.alias];
        }

        if (!(0, _lib.isDefined)(value) && propDef.value) {
            value = propDef.value();
        }

        if (!(0, _lib.isDefined)(value) && propDef.def) {
            value = propDef.def(props, component);
        }

        if ((0, _lib.isDefined)(value)) {
            if (propDef.type === 'array' ? !Array.isArray(value) : (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== propDef.type) {
                throw new TypeError('Prop is not of type ' + propDef.type + ': ' + _key);
            }
        } else if (propDef.required !== false) {
            throw new Error('Expected prop ' + _key + ' to be passed');
        }

        result[_key] = value;
    }

    for (var _iterator3 = Object.keys(result), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
        var _ref3;

        if (_isArray3) {
            if (_i3 >= _iterator3.length) break;
            _ref3 = _iterator3[_i3++];
        } else {
            _i3 = _iterator3.next();
            if (_i3.done) break;
            _ref3 = _i3.value;
        }

        var _key2 = _ref3;

        var _propDef = component.getProp(_key2);
        var _value = result[_key2];

        if (!_propDef) {
            continue;
        }

        if (_propDef.validate) {
            // $FlowFixMe
            _propDef.validate(_value, result);
        }

        if (_propDef.decorate) {
            // $FlowFixMe
            result[_key2] = _propDef.decorate(_value, result);
        }

        if (result[_key2] && _propDef.type === 'function') {
            result[_key2] = result[_key2].bind(instance);
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
            getQueryValue(prop, key, value)]).then(function (_ref4) {
                var queryParam = _ref4[0],
                    queryValue = _ref4[1];


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

                        for (var _iterator4 = Object.keys(result), _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
                            var _ref5;

                            if (_isArray4) {
                                if (_i4 >= _iterator4.length) break;
                                _ref5 = _iterator4[_i4++];
                            } else {
                                _i4 = _iterator4.next();
                                if (_i4.done) break;
                                _ref5 = _i4.value;
                            }

                            var dotkey = _ref5;

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