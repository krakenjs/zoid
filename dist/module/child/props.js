"use strict";

exports.__esModule = true;
exports.normalizeChildProp = normalizeChildProp;
exports.normalizeChildProps = normalizeChildProps;

var _src = require("cross-domain-utils/src");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function normalizeChildProp(component, props, key, value, helpers) {
  // $FlowFixMe
  const prop = component.getPropDefinition(key);

  if (!prop) {
    return value;
  }

  if (typeof prop.childDecorate === 'function') {
    return prop.childDecorate(_extends({
      value
    }, helpers));
  }

  return value;
} // eslint-disable-next-line max-params


function normalizeChildProps(parentComponentWindow, component, props, origin, helpers, isUpdate = false) {
  const result = {}; // $FlowFixMe

  for (const key of Object.keys(props)) {
    const prop = component.getPropDefinition(key);

    if (prop && prop.sameDomain && (origin !== (0, _src.getDomain)(window) || !(0, _src.isSameDomain)(parentComponentWindow))) {
      continue;
    }

    const value = normalizeChildProp(component, props, key, props[key], helpers);
    result[key] = value;

    if (prop && prop.alias && !result[prop.alias]) {
      result[prop.alias] = value;
    }
  }

  if (!isUpdate) {
    for (const key of component.getPropNames()) {
      if (!props.hasOwnProperty(key)) {
        result[key] = normalizeChildProp(component, props, key, props[key], helpers);
      }
    }
  } // $FlowFixMe


  return result;
}