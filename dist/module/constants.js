"use strict";

exports.__esModule = true;
exports.DEFAULT_DIMENSIONS = exports.WILDCARD = exports.CLASS = exports.CONTEXT = exports.PROP_SERIALIZATION = exports.WINDOW_REFERENCES = exports.INITIAL_PROPS = exports.PROP_TYPE = exports.POST_MESSAGE = exports.__ZOID__ = exports.ZOID = void 0;

var _src = require("cross-domain-utils/src");

const ZOID = `zoid`;
exports.ZOID = ZOID;
const __ZOID__ = `__${ZOID}__`;
exports.__ZOID__ = __ZOID__;
const POST_MESSAGE = {
  DELEGATE: `${ZOID}_delegate`,
  ALLOW_DELEGATE: `${ZOID}_allow_delegate`
};
exports.POST_MESSAGE = POST_MESSAGE;
const PROP_TYPE = {
  STRING: `string`,
  OBJECT: `object`,
  FUNCTION: `function`,
  BOOLEAN: `boolean`,
  NUMBER: `number`,
  ARRAY: `array`
};
exports.PROP_TYPE = PROP_TYPE;
const INITIAL_PROPS = {
  RAW: 'raw',
  UID: 'uid'
};
exports.INITIAL_PROPS = INITIAL_PROPS;
const WINDOW_REFERENCES = {
  OPENER: `opener`,
  TOP: `top`,
  PARENT: `parent`,
  GLOBAL: `global`
};
exports.WINDOW_REFERENCES = WINDOW_REFERENCES;
const PROP_SERIALIZATION = {
  JSON: 'json',
  DOTIFY: 'dotify',
  BASE64: 'base64'
};
exports.PROP_SERIALIZATION = PROP_SERIALIZATION;
const CONTEXT = _src.WINDOW_TYPE;
exports.CONTEXT = CONTEXT;
const CLASS = {
  OUTLET: `${ZOID}-outlet`,
  COMPONENT_FRAME: `${ZOID}-component-frame`,
  PRERENDER_FRAME: `${ZOID}-prerender-frame`,
  VISIBLE: `${ZOID}-visible`,
  INVISIBLE: `${ZOID}-invisible`
};
exports.CLASS = CLASS;
const WILDCARD = '*';
exports.WILDCARD = WILDCARD;
const DEFAULT_DIMENSIONS = {
  WIDTH: '300px',
  HEIGHT: '150px'
};
exports.DEFAULT_DIMENSIONS = DEFAULT_DIMENSIONS;