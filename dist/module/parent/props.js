"use strict";

exports.__esModule = true;
exports.normalizeProps = normalizeProps;
exports.propsToQuery = propsToQuery;

var _src = require("zalgo-promise/src");

var _src2 = require("belter/src");

var _constants = require("../constants");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/*  Normalize Props
    ---------------

    Turn props into normalized values, using defaults, function options, etc.
*/
function normalizeProps(component, instance, props, helpers, isUpdate = false) {
  // eslint-disable-line complexity
  // $FlowFixMe
  props = props || {};

  const result = _extends({}, props); // eslint-disable-line no-undef


  const propNames = isUpdate ? [] : [...component.getPropNames()]; // $FlowFixMe

  for (const key of Object.keys(props)) {
    if (propNames.indexOf(key) === -1) {
      propNames.push(key);
    }
  }

  const aliases = [];
  const {
    state,
    close,
    focus,
    onError
  } = helpers;

  for (const key of propNames) {
    const propDef = component.getPropDefinition(key); // $FlowFixMe

    let value = props[key];

    if (!propDef) {
      continue;
    }

    const alias = propDef.alias;

    if (alias) {
      if (!(0, _src2.isDefined)(value) && (0, _src2.isDefined)(props[alias])) {
        value = props[alias];
      }

      aliases.push(alias);
    }

    if (propDef.value) {
      value = propDef.value({
        props: result,
        state,
        close,
        focus,
        onError
      });
    }

    if (!(0, _src2.isDefined)(value) && propDef.default) {
      value = propDef.default({
        props: result,
        state,
        close,
        focus,
        onError
      });
    }

    if ((0, _src2.isDefined)(value)) {
      if (propDef.type === 'array' ? !Array.isArray(value) : typeof value !== propDef.type) {
        throw new TypeError(`Prop is not of type ${propDef.type}: ${key}`);
      }
    } // $FlowFixMe


    result[key] = value;
  }

  for (const alias of aliases) {
    // $FlowFixMe
    delete result[alias];
  } // $FlowFixMe


  for (const key of Object.keys(result)) {
    const propDef = component.getPropDefinition(key); // $FlowFixMe

    const value = result[key];

    if (!propDef) {
      continue;
    }

    if ((0, _src2.isDefined)(value) && propDef.validate) {
      // $FlowFixMe
      propDef.validate({
        value,
        props: result
      });
    }

    if ((0, _src2.isDefined)(value) && propDef.decorate) {
      // $FlowFixMe
      result[key] = propDef.decorate({
        value,
        props: result,
        state,
        close,
        focus,
        onError
      });
    }
  } // $FlowFixMe


  return result;
} // $FlowFixMe


function getQueryParam(prop, key, value) {
  return _src.ZalgoPromise.try(() => {
    if (typeof prop.queryParam === 'function') {
      return prop.queryParam({
        value
      });
    } else if (typeof prop.queryParam === 'string') {
      return prop.queryParam;
    } else {
      return key;
    }
  });
} // $FlowFixMe


function getQueryValue(prop, key, value) {
  return _src.ZalgoPromise.try(() => {
    if (typeof prop.queryValue === 'function' && (0, _src2.isDefined)(value)) {
      return prop.queryValue({
        value
      });
    } else {
      return value;
    }
  });
}

function propsToQuery(propsDef, props) {
  const params = {};
  return _src.ZalgoPromise.all(Object.keys(props).map(key => {
    const prop = propsDef[key];

    if (!prop) {
      return; // eslint-disable-line array-callback-return
    }

    return _src.ZalgoPromise.resolve().then(() => {
      const value = props[key];

      if (!value) {
        return;
      }

      if (!prop.queryParam) {
        return;
      }

      return value;
    }).then(value => {
      if (value === null || typeof value === 'undefined') {
        return;
      }

      return _src.ZalgoPromise.all([// $FlowFixMe
      getQueryParam(prop, key, value), // $FlowFixMe
      getQueryValue(prop, key, value)]).then(([queryParam, queryValue]) => {
        let result;

        if (typeof queryValue === 'boolean') {
          result = queryValue.toString();
        } else if (typeof queryValue === 'string') {
          result = queryValue.toString();
        } else if (typeof queryValue === 'object' && queryValue !== null) {
          if (prop.serialization === _constants.PROP_SERIALIZATION.JSON) {
            result = JSON.stringify(queryValue);
          } else if (prop.serialization === _constants.PROP_SERIALIZATION.BASE64) {
            result = btoa(JSON.stringify(queryValue));
          } else if (prop.serialization === _constants.PROP_SERIALIZATION.DOTIFY || !prop.serialization) {
            result = (0, _src2.dotify)(queryValue, key);

            for (const dotkey of Object.keys(result)) {
              params[dotkey] = result[dotkey];
            }

            return;
          }
        } else if (typeof queryValue === 'number') {
          result = queryValue.toString();
        }

        params[queryParam] = result;
      });
    });
  })).then(() => {
    return params;
  });
}