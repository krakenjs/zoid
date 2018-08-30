var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

import { ZalgoPromise } from 'zalgo-promise/src';

import { dotify, isDefined } from '../../lib';


/*  Normalize Props
    ---------------

    Turn props into normalized values, using defaults, function options, etc.
*/

export function normalizeProps(component, instance, props) {
    var isUpdate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    // eslint-disable-line complexity

    var result = {};
    props = props || {};

    var propNames = isUpdate ? [] : component.getPropNames();

    // $FlowFixMe

    for (var _i2 = 0, _Object$keys2 = Object.keys(props), _length2 = _Object$keys2 == null ? 0 : _Object$keys2.length; _i2 < _length2; _i2++) {
        var key = _Object$keys2[_i2];
        if (propNames.indexOf(key) === -1) {
            propNames.push(key);
        }
    }

    for (var _i4 = 0, _length4 = propNames == null ? 0 : propNames.length; _i4 < _length4; _i4++) {
        var _key = propNames[_i4];
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

        if (!isDefined(value) && propDef.alias) {
            value = props[propDef.alias];
        }

        if (!isDefined(value) && propDef.value) {
            value = propDef.value();
        }

        if (!isDefined(value) && propDef.def) {
            value = propDef.def(props, component);
        }

        if (isDefined(value)) {
            if (propDef.type === 'array' ? !Array.isArray(value) : (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== propDef.type) {
                throw new TypeError('Prop is not of type ' + propDef.type + ': ' + _key);
            }
        } else if (propDef.required !== false) {
            throw new Error('Expected prop ' + _key + ' to be passed');
        }

        result[_key] = value;
    }

    for (var _i6 = 0, _Object$keys4 = Object.keys(result), _length6 = _Object$keys4 == null ? 0 : _Object$keys4.length; _i6 < _length6; _i6++) {
        var _key2 = _Object$keys4[_i6];
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
    return ZalgoPromise['try'](function () {
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
    return ZalgoPromise['try'](function () {
        if (typeof prop.queryValue === 'function') {
            return prop.queryValue(value);
        } else {
            return value;
        }
    });
}

export function propsToQuery(propsDef, props) {

    var params = {};

    return ZalgoPromise.all(Object.keys(props).map(function (key) {

        var prop = propsDef[key];

        if (!prop) {
            return; // eslint-disable-line array-callback-return
        }

        return ZalgoPromise.resolve().then(function () {

            var value = props[key];

            if (!value) {
                return;
            }

            if (!prop.queryParam) {
                return;
            }

            return value;
        }).then(function (value) {

            if (value === null || typeof value === 'undefined') {
                return;
            }

            return ZalgoPromise.all([
            // $FlowFixMe
            getQueryParam(prop, key, value),
            // $FlowFixMe
            getQueryValue(prop, key, value)]).then(function (_ref) {
                var queryParam = _ref[0],
                    queryValue = _ref[1];


                var result = void 0;

                if (typeof queryValue === 'boolean') {
                    result = queryValue.toString();
                } else if (typeof queryValue === 'string') {
                    result = queryValue.toString();
                } else if (typeof queryValue === 'function') {
                    return;
                } else if ((typeof queryValue === 'undefined' ? 'undefined' : _typeof(queryValue)) === 'object' && queryValue !== null) {

                    if (prop.serialization === 'json') {
                        result = JSON.stringify(queryValue);
                    } else {
                        result = dotify(queryValue, key);

                        for (var _i8 = 0, _Object$keys6 = Object.keys(result), _length8 = _Object$keys6 == null ? 0 : _Object$keys6.length; _i8 < _length8; _i8++) {
                            var dotkey = _Object$keys6[_i8];
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