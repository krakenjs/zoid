"use strict";

exports.__esModule = true;
exports.normalizeChildProp = normalizeChildProp;
exports.normalizeChildProps = normalizeChildProps;

var _src = require("cross-domain-utils/src");

function normalizeChildProp(component, props, key, value, helpers) {
  // $FlowFixMe
  const prop = component.getPropDefinition(key);

  if (!prop) {
    return value;
  }

  const {
    focus,
    close,
    resize,
    onError,
    onPropsChange
  } = helpers;

  if (typeof prop.childDecorate === 'function') {
    return prop.childDecorate({
      value,
      focus,
      close,
      resize,
      onError,
      onPropsChange
    });
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