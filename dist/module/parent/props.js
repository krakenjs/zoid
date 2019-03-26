"use strict";

exports.__esModule = true;
exports.extendProps = extendProps;
exports.propsToQuery = propsToQuery;

var _src = require("zalgo-promise/src");

var _src2 = require("belter/src");

var _constants = require("../constants");

/*  Normalize Props
    ---------------

    Turn props into normalized values, using defaults, function options, etc.
*/
function extendProps(component, props, inputProps, helpers, isUpdate = false) {
  // eslint-disable-line complexity
  // $FlowFixMe
  inputProps = inputProps || {};
  (0, _src2.extend)(props, inputProps);
  const propNames = isUpdate ? [] : [...component.getPropNames()]; // $FlowFixMe

  for (const key of Object.keys(inputProps)) {
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

    let value = inputProps[key];

    if (!propDef) {
      continue;
    }

    const alias = propDef.alias;

    if (alias) {
      if (!(0, _src2.isDefined)(value) && (0, _src2.isDefined)(inputProps[alias])) {
        value = inputProps[alias];
      }

      aliases.push(alias);
    }

    if (propDef.value) {
      value = propDef.value({
        props,
        state,
        close,
        focus,
        onError
      });
    }

    if (!(0, _src2.isDefined)(value) && propDef.default) {
      value = propDef.default({
        props,
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


    props[key] = value;
  }

  for (const alias of aliases) {
    // $FlowFixMe
    delete props[alias];
  } // $FlowFixMe


  for (const key of Object.keys(props)) {
    const propDef = component.getPropDefinition(key); // $FlowFixMe

    const value = props[key];

    if (!propDef) {
      continue;
    }

    if ((0, _src2.isDefined)(value) && propDef.validate) {
      // $FlowFixMe
      propDef.validate({
        value,
        props
      });
    }

    if ((0, _src2.isDefined)(value) && propDef.decorate) {
      // $FlowFixMe
      props[key] = propDef.decorate({
        value,
        props,
        state,
        close,
        focus,
        onError
      });
    }
  }

  for (const key of component.getPropNames()) {
    const propDef = component.getPropDefinition(key);

    if (propDef.required !== false && !(0, _src2.isDefined)(props[key])) {
      throw new Error(`Expected prop "${key}" to be defined`);
    }
  }
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
  const params = {}; // $FlowFixMe

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