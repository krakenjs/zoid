'use strict';

exports.__esModule = true;
exports.normalizeChildProp = normalizeChildProp;
exports.normalizeChildProps = normalizeChildProps;

var _src = require('cross-domain-utils/src');

function normalizeChildProp(component, props, key, value) {

    // $FlowFixMe
    var prop = component.getProp(key);

    if (!prop) {
        if (component.looseProps) {
            return value;
        } else {
            return;
        }
    }

    if (typeof prop.childDecorate === 'function') {
        return prop.childDecorate(value);
    }

    return value;
}

function normalizeChildProps(component, props, origin) {
    var required = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;


    var result = {};

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

        var _key = _ref;


        var prop = component.getProp(_key);
        var value = props[_key];

        if (prop && prop.sameDomain && origin !== (0, _src.getDomain)(window)) {
            continue;
        }

        result[_key] = normalizeChildProp(component, props, _key, value);

        if (prop && prop.alias && !result[prop.alias]) {
            result[prop.alias] = value;
        }
    }

    if (required) {
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

            var key = _ref2;

            if (!props.hasOwnProperty(key)) {
                result[key] = normalizeChildProp(component, props, key, props[key]);
            }
        }
    }

    // $FlowFixMe
    return result;
}