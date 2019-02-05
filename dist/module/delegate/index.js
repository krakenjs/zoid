"use strict";

exports.__esModule = true;
exports.DelegateComponent = void 0;

var _src = require("cross-domain-utils/src");

var _src2 = require("zalgo-promise/src");

var _src3 = require("post-robot/src");

var _src4 = require("belter/src");

var _parent = require("../parent");

var _drivers = require("../parent/drivers");

class DelegateComponent {
  constructor(component, source, options) {
    this.component = void 0;
    this.source = void 0;
    this.context = void 0;
    this.driver = void 0;
    this.props = void 0;
    this.clean = void 0;
    this.focus = void 0;
    this.resize = void 0;
    this.renderTemplate = void 0;
    this.close = void 0;
    this.onError = void 0;
    this.event = void 0;
    this.component = component;
    this.context = options.context;
    this.driver = _drivers.RENDER_DRIVERS[options.context];
    this.clean = (0, _src4.cleanup)(this);
    this.focus = _parent.ParentComponent.prototype.focus;
    this.resize = _parent.ParentComponent.prototype.resize;
    this.renderTemplate = _parent.ParentComponent.prototype.renderTemplate; // $FlowFixMe

    this.props = {};

    for (const propName of Object.keys(options.props)) {
      const propDef = this.component.getPropDefinition(propName);

      if (propDef && propDef.allowDelegate && options.props[propName]) {
        // $FlowFixMe
        this.props[propName] = options.props[propName];
      }
    }

    this.close = options.overrides.close;
    this.onError = options.overrides.onError;
    this.event = options.overrides.event;
    this.component.registerActiveComponent(this);
    this.clean.register(() => this.component.destroyActiveComponent(this));
    this.watchForSourceClose(source);
  }

  getDelegate() {
    return {
      overrides: this.getOverrides(),
      destroy: () => this.destroy()
    };
  }

  watchForSourceClose(source) {
    const closeSourceWindowListener = (0, _src.onCloseWindow)(source, () => this.destroy(), 3000);
    this.clean.register(closeSourceWindowListener.cancel);
  }

  getOverrides() {
    const overrides = {};
    const self = this;

    for (const key of this.driver.delegate) {
      overrides[key] = function delegateOverride() {
        // $FlowFixMe
        return _parent.ParentComponent.prototype[key].apply(self, arguments);
      };

      overrides[key].__name__ = key;
    }

    return overrides;
  }

  destroy() {
    return this.clean.all();
  }

}

exports.DelegateComponent = DelegateComponent;