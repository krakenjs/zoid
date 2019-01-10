"use strict";

exports.__esModule = true;
exports.validate = validate;

var _src = require("belter/src");

var _constants = require("../constants");

function validatePropDefinitions(options) {
  if (options.props && !(typeof options.props === 'object')) {
    throw new Error(`Expected options.props to be an object`);
  }

  const PROP_TYPE_LIST = (0, _src.values)(_constants.PROP_TYPE);

  if (options.props) {
    for (const key of Object.keys(options.props)) {
      // $FlowFixMe
      const prop = options.props[key];

      if (!prop || !(typeof prop === 'object')) {
        throw new Error(`Expected options.props.${key} to be an object`);
      }

      if (!prop.type) {
        throw new Error(`Expected prop.type`);
      }

      if (PROP_TYPE_LIST.indexOf(prop.type) === -1) {
        throw new Error(`Expected prop.type to be one of ${PROP_TYPE_LIST.join(', ')}`);
      }

      if (prop.required && prop.default) {
        throw new Error(`Required prop can not have a default value`);
      }

      if (prop.type === _constants.PROP_TYPE.FUNCTION && prop.queryParam) {
        throw new Error(`Do not pass queryParam for function prop`);
      }
    }
  }
} // eslint-disable-next-line complexity


function validate(options) {
  // eslint-ignore-line
  if (!options) {
    throw new Error(`Expected options to be passed`);
  } // eslint-disable-next-line security/detect-unsafe-regex, unicorn/no-unsafe-regex


  if (!options.tag || !options.tag.match(/^([a-z0-9]+-)+[a-z0-9]+$/)) {
    throw new Error(`Invalid options.tag: ${options.tag}`);
  }

  validatePropDefinitions(options);

  if (options.dimensions) {
    if (options.dimensions && !(0, _src.isPx)(options.dimensions.width) && !(0, _src.isPerc)(options.dimensions.width)) {
      throw new Error(`Expected options.dimensions.width to be a px or % string value`);
    }

    if (options.dimensions && !(0, _src.isPx)(options.dimensions.height) && !(0, _src.isPerc)(options.dimensions.height)) {
      throw new Error(`Expected options.dimensions.height to be a px or % string value`);
    }
  }

  if (options.defaultContext) {
    if (options.defaultContext !== _constants.CONTEXT.IFRAME && options.defaultContext !== _constants.CONTEXT.POPUP) {
      throw new Error(`Unsupported context type: ${options.defaultContext || 'unknown'}`);
    }
  }

  if (!options.url) {
    throw new Error(`Must pass url`);
  }

  if (typeof options.url !== 'string' && typeof options.url !== 'function') {
    throw new TypeError(`Expected url to be string or function`);
  }

  if (options.prerenderTemplate && typeof options.prerenderTemplate !== 'function') {
    throw new Error(`Expected options.prerenderTemplate to be a function`);
  }

  if (options.containerTemplate && typeof options.containerTemplate !== 'function') {
    throw new Error(`Expected options.containerTemplate to be a function`);
  }
}