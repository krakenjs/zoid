'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.validate = validate;

var _constants = require('../../constants');

var _lib = require('../../lib');

function validatePropDefinitions(options) {

    if (options.props && !(_typeof(options.props) === 'object')) {
        throw new Error('Expected options.props to be an object');
    }

    if (options.props) {
        for (var _iterator = Object.keys(options.props), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
            var prop = options.props[key];

            if (!prop || !((typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) === 'object')) {
                throw new Error('Expected options.props.' + key + ' to be an object');
            }

            if (!prop.type) {
                throw new Error('Expected prop.type');
            }

            if (_constants.PROP_TYPES_LIST.indexOf(prop.type) === -1) {
                throw new Error('Expected prop.type to be one of ' + _constants.PROP_TYPES_LIST.join(', '));
            }

            if (prop.required && prop.def) {
                throw new Error('Required prop can not have a default value');
            }
        }
    }
}

// eslint-disable-next-line complexity
function validate(options) {
    // eslint-ignore-line

    if (!options) {
        throw new Error('Expecred options to be passed');
    }

    if (!options.tag || !options.tag.match(/^[a-z0-9-]+$/)) {
        throw new Error('Invalid options.tag: ' + options.tag);
    }

    validatePropDefinitions(options);

    if (options.dimensions) {
        if (options.dimensions && !(0, _lib.isPx)(options.dimensions.width) && !(0, _lib.isPerc)(options.dimensions.width)) {
            throw new Error('Expected options.dimensions.width to be a px or % string value');
        }

        if (options.dimensions && !(0, _lib.isPx)(options.dimensions.height) && !(0, _lib.isPerc)(options.dimensions.height)) {
            throw new Error('Expected options.dimensions.height to be a px or % string value');
        }
    }

    if (options.contexts) {

        if (options.contexts.popup && !__POPUP_SUPPORT__) {
            throw new Error('Popups not supported in this build -- please use the full xcomponent.js build');
        }

        var anyEnabled = false;

        for (var _iterator2 = Object.keys(options.contexts), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            var _ref2;

            if (_isArray2) {
                if (_i2 >= _iterator2.length) break;
                _ref2 = _iterator2[_i2++];
            } else {
                _i2 = _iterator2.next();
                if (_i2.done) break;
                _ref2 = _i2.value;
            }

            var context = _ref2;


            if (_constants.CONTEXT_TYPES_LIST.indexOf(context) === -1) {
                throw new Error('Unsupported context type: ' + context);
            }

            if (options.contexts && options.contexts[context] || options.contexts && options.contexts[context] === undefined) {
                anyEnabled = true;
            }
        }

        if (!anyEnabled) {
            throw new Error('No context type is enabled');
        }
    }

    if (options.defaultContext) {
        if (_constants.CONTEXT_TYPES_LIST.indexOf(options.defaultContext) === -1) {
            throw new Error('Unsupported context type: ' + (options.defaultContext || 'unknown'));
        }

        if (options.contexts && options.defaultContext && !options.contexts[options.defaultContext]) {
            throw new Error('Disallowed default context type: ' + (options.defaultContext || 'unknown'));
        }
    }

    if (!options.url && !options.buildUrl) {
        throw new Error('Expected options.url to be passed');
    }

    if (options.url && options.buildUrl) {
        throw new Error('Can not pass options.url and options.buildUrl');
    }

    if (options.defaultEnv) {
        if (typeof options.defaultEnv !== 'string') {
            throw new TypeError('Expected options.defaultEnv to be a string');
        }

        if (!options.buildUrl && _typeof(options.url) !== 'object') {
            throw new Error('Expected options.url to be an object mapping env->url');
        }

        if (options.url && _typeof(options.url) === 'object' && !options.url[options.defaultEnv]) {
            throw new Error('No url found for default env: ' + options.defaultEnv);
        }
    }

    if (options.url && _typeof(options.url) === 'object') {

        if (!options.defaultEnv) {
            throw new Error('Must pass options.defaultEnv with env->url mapping');
        }

        for (var _iterator3 = Object.keys(options.url), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
            var _ref3;

            if (_isArray3) {
                if (_i3 >= _iterator3.length) break;
                _ref3 = _iterator3[_i3++];
            } else {
                _i3 = _iterator3.next();
                if (_i3.done) break;
                _ref3 = _i3.value;
            }

            var env = _ref3;

            if (!options.url[env]) {
                throw new Error('No url specified for env: ' + env);
            }
        }
    }

    if (options.prerenderTemplate && typeof options.prerenderTemplate !== 'function') {
        throw new Error('Expected options.prerenderTemplate to be a function');
    }

    if (options.containerTemplate && typeof options.containerTemplate !== 'function') {
        throw new Error('Expected options.containerTemplate to be a function');
    }
}