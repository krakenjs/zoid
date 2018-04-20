'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.validateProp = validateProp;
exports.validateProps = validateProps;


// $FlowFixMe
function validateProp(prop, key, value, props) {
    var required = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;


    var hasProp = value !== null && value !== undefined && value !== '';

    if (!hasProp) {
        if (required && prop.required !== false && !prop.hasOwnProperty('def')) {
            throw new Error('Prop is required: ' + key);
        }

        return;
    }

    if (value && typeof value.then === 'function' && prop.promise) {
        return;
    }

    if (prop.type === 'function') {

        if (!(typeof value === 'function')) {
            throw new TypeError('Prop is not of type function: ' + key);
        }
    } else if (prop.type === 'string') {

        if (typeof value !== 'string') {
            throw new TypeError('Prop is not of type string: ' + key);
        }
    } else if (prop.type === 'object') {

        // Since we're sending everything by post-message, everything must be json serializable

        try {
            JSON.stringify(value);
        } catch (err) {
            throw new Error('Unable to serialize prop: ' + key);
        }
    } else if (prop.type === 'number') {

        if (isNaN(parseInt(value, 10))) {
            throw new TypeError('Prop is not a number: ' + key);
        }
    }

    if (typeof prop.validate === 'function' && value) {
        prop.validate(value, props);
    }
}

/*  Validate Props
    --------------

    Validate user-defined props. Users can pass props down from the parent into the child component, but first we
    double check the values are what we expect, based on the props spec defined in the original component.
*/

function validateProps(component, props) {
    var required = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;


    props = props || {};

    if (props.env && _typeof(component.url) === 'object' && !component.url[props.env]) {
        throw new Error('Invalid env: ' + props.env);
    }

    // Set aliases

    for (var _iterator = component.getPropNames(), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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


        // $FlowFixMe
        var prop = component.getProp(key);

        if (prop.alias && props.hasOwnProperty(prop.alias)) {

            var value = props[prop.alias];
            delete props[prop.alias];

            if (!props[key]) {
                props[key] = value;
            }
        }
    }

    // First make sure all of the props we were sent are actually valid prop names

    /*
     if (!component.looseProps) {
        for (let key of Object.keys(props)) {
            if (component.getPropNames().indexOf(key) === -1) {
                throw component.error(`Invalid prop: ${key}`);
            }
        }
    }
     */

    // Then loop over the props we expect, and make sure they're all present and valid

    for (var _iterator2 = Object.keys(props), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
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


        // $FlowFixMe
        var _prop = component.getProp(_key);
        var _value = props[_key];

        if (_prop) {
            // $FlowFixMe
            validateProp(_prop, _key, _value, props, required);
        }
    }

    for (var _iterator3 = component.getPropNames(), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
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


        // $FlowFixMe
        var _prop2 = component.getProp(_key2);
        var _value2 = props[_key2];

        if (_prop2 && !props.hasOwnProperty(_key2)) {
            validateProp(_prop2, _key2, _value2, props, required);
        }
    }
}