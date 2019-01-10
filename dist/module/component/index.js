"use strict";

exports.__esModule = true;

var _component = require("./component");

Object.keys(_component).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  exports[key] = _component[key];
});

var _props = require("./props");

Object.keys(_props).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  exports[key] = _props[key];
});