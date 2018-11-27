var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import { onCloseWindow } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { eventEmitter } from 'belter/src';

import { ParentComponent } from '../parent';
import { RENDER_DRIVERS } from '../parent/drivers';

import { cleanup } from '../../lib';

export var DelegateComponent = function () {
    function DelegateComponent(component, source, options) {
        _classCallCheck(this, DelegateComponent);

        this.component = component;
        this.context = options.context;
        this.clean = cleanup(this);
        this.event = eventEmitter();

        this.props = {
            uid: options.props.uid,
            dimensions: options.props.dimensions,
            onClose: options.props.onClose,
            onDisplay: options.props.onDisplay
        };

        for (var _i2 = 0, _component$getPropNam2 = component.getPropNames(), _length2 = _component$getPropNam2 == null ? 0 : _component$getPropNam2.length; _i2 < _length2; _i2++) {
            var propName = _component$getPropNam2[_i2];
            // $FlowFixMe
            var prop = this.component.getProp(propName);

            if (prop.allowDelegate) {
                this.props[propName] = options.props[propName];
            }
        }

        this.userClose = options.overrides.userClose;
        this.error = options.overrides.error;
        this.on = options.overrides.on;

        var delegateOverrides = RENDER_DRIVERS[options.context].delegateOverrides;

        for (var _i4 = 0, _Object$keys2 = Object.keys(delegateOverrides), _length4 = _Object$keys2 == null ? 0 : _Object$keys2.length; _i4 < _length4; _i4++) {
            var key = _Object$keys2[_i4];
            // $FlowFixMe
            this[key] = ParentComponent.prototype[key];
        }

        ParentComponent.prototype.registerActiveComponent.call(this);

        this.watchForClose(source);
    }

    DelegateComponent.prototype.watchForClose = function watchForClose(source) {
        var _this = this;

        var closeWindowListener = onCloseWindow(source, function () {
            return _this.destroy();
        }, 3000);
        this.clean.register('destroyCloseWindowListener', closeWindowListener.cancel);
    };

    DelegateComponent.prototype.getOverrides = function getOverrides(context) {

        var delegateOverrides = RENDER_DRIVERS[context].delegateOverrides;

        var overrides = {};

        var self = this;

        var _loop = function _loop(_i6, _Object$keys4, _length6) {
            var key = _Object$keys4[_i6];
            overrides[key] = function delegateOverride() {
                // $FlowFixMe
                return ParentComponent.prototype[key].apply(self, arguments);
            };
        };

        for (var _i6 = 0, _Object$keys4 = Object.keys(delegateOverrides), _length6 = _Object$keys4 == null ? 0 : _Object$keys4.length; _i6 < _length6; _i6++) {
            _loop(_i6, _Object$keys4, _length6);
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

            return RENDER_DRIVERS[this.context];
        }
    }]);

    return DelegateComponent;
}();