"use strict";

exports.__esModule = true;
exports.angular2 = void 0;

var _src = require("belter/src");

var _constants = require("../constants");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const equals = (obj1, obj2) => {
  const checked = {};

  for (const key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      checked[key] = true;

      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
  }

  for (const key in obj2) {
    if (!checked[key]) {
      return false;
    }
  }

  return true;
};

const angular2 = {
  register(zoid, {
    Component: AngularComponent,
    NgModule,
    ElementRef,
    NgZone
  }) {
    zoid.log('initializing angular2 component');

    const getProps = component => {
      return (0, _src.replaceObject)(_extends({}, component.internalProps, component.props), item => {
        if (typeof item === 'function') {
          return function angular2Wrapped() {
            return component.zone.run(() => item.apply(this, arguments));
          };
        }

        return item;
      });
    };

    const ComponentInstance = AngularComponent({
      selector: zoid.tag,
      template: '<div></div>',
      inputs: ['props']
    }).Class({
      constructor: [ElementRef, NgZone, function angularConstructor(elementRef, zone) {
        this._props = {};
        this.elementRef = elementRef;
        this.zone = zone;
      }],

      ngOnInit() {
        const targetElement = this.elementRef.nativeElement;
        this.parent = zoid.init(getProps(this));
        this.parent.render(targetElement, _constants.CONTEXT.IFRAME);
      },

      ngDoCheck() {
        if (this.parent && !equals(this._props, this.props)) {
          this._props = _extends({}, this.props);
          this.parent.updateProps(getProps(this));
        }
      }

    });
    const ModuleInstance = NgModule({
      declarations: [ComponentInstance],
      exports: [ComponentInstance]
    }).Class({
      constructor() {// pass
      }

    });
    return ModuleInstance;
  }

};
exports.angular2 = angular2;