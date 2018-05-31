'use strict';

exports.__esModule = true;
exports.DelegateComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _src = require('cross-domain-utils/src');

var _src2 = require('zalgo-promise/src');

var _base = require('../base');

var _parent = require('../parent');

var _drivers = require('../parent/drivers');

var _lib = require('../../lib');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DelegateComponent = exports.DelegateComponent = function (_BaseComponent) {
    _inherits(DelegateComponent, _BaseComponent);

    function DelegateComponent(component, source, options) {
        _classCallCheck(this, DelegateComponent);

        var _this = _possibleConstructorReturn(this, _BaseComponent.call(this));

        _this.component = component;
        _this.clean.set('source', source);

        _this.context = options.context;

        _this.props = {
            uid: options.props.uid,
            dimensions: options.props.dimensions,
            onClose: options.props.onClose,
            onDisplay: options.props.onDisplay
        };

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

            var propName = _ref;

            // $FlowFixMe
            var prop = _this.component.getProp(propName);

            if (prop.allowDelegate) {
                _this.props[propName] = options.props[propName];
            }
        }

        _this.focus = function () {
            return options.overrides.focus.call(_this);
        };

        _this.clean.register('destroyFocusOverride', function () {
            // $FlowFixMe
            _this.focus = _lib.noop;
        });

        _this.userClose = options.overrides.userClose;
        _this.getDomain = options.overrides.getDomain;
        _this.error = options.overrides.error;
        _this.on = options.overrides.on;

        var delegateOverrides = _drivers.RENDER_DRIVERS[options.context].delegateOverrides;

        for (var _iterator2 = Object.keys(delegateOverrides), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
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

            // $FlowFixMe
            _this[key] = _parent.ParentComponent.prototype[key];
        }

        _this.childWindowName = options.childWindowName;

        _parent.ParentComponent.prototype.registerActiveComponent.call(_this);

        _this.watchForClose();
        return _this;
    }

    DelegateComponent.prototype.watchForClose = function watchForClose() {
        var _this2 = this;

        var closeWindowListener = (0, _src.onCloseWindow)(this.source, function () {
            return _this2.destroy();
        }, 3000);
        this.clean.register('destroyCloseWindowListener', closeWindowListener.cancel);
    };

    DelegateComponent.prototype.getOverrides = function getOverrides(context) {

        var delegateOverrides = _drivers.RENDER_DRIVERS[context].delegateOverrides;

        var overrides = {};

        var self = this;

        var _loop = function _loop() {
            if (_isArray3) {
                if (_i3 >= _iterator3.length) return 'break';
                _ref3 = _iterator3[_i3++];
            } else {
                _i3 = _iterator3.next();
                if (_i3.done) return 'break';
                _ref3 = _i3.value;
            }

            var key = _ref3;

            overrides[key] = function delegateOverride() {
                // $FlowFixMe
                return _parent.ParentComponent.prototype[key].apply(self, arguments);
            };
        };

        for (var _iterator3 = Object.keys(delegateOverrides), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
            var _ref3;

            var _ret = _loop();

            if (_ret === 'break') break;
        }

        return overrides;
    };

    DelegateComponent.prototype.destroy = function destroy() {
        return this.clean.all();
    };

    _createClass(DelegateComponent, [{
        key: 'driver',
        get: function get() {

            if (!this.context) {
                throw new Error('Context not set');
            }

            return _drivers.RENDER_DRIVERS[this.context];
        }
    }]);

    return DelegateComponent;
}(_base.BaseComponent);