'use strict';

exports.__esModule = true;

var _interface = require('./interface');

Object.keys(_interface).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _interface[key];
    }
  });
});

var INTERFACE = _interopRequireWildcard(_interface);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

// eslint-disable-next-line import/no-namespace
exports['default'] = INTERFACE;