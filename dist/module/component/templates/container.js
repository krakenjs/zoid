"use strict";

exports.__esModule = true;
exports.defaultContainerTemplate = defaultContainerTemplate;

var _src = require("jsx-pragmatic/src");

var _constants = require("../../constants");

/* @jsx node */

/* eslint react/react-in-jsx-scope: off */
function defaultContainerTemplate({
  uid,
  outlet,
  doc,
  dimensions: {
    width,
    height
  }
}) {
  return (0, _src.node)("div", {
    id: uid
  }, (0, _src.node)("style", null, `
                    #${uid} > .${_constants.CLASS.OUTLET} {
                        width: ${width};
                        height: ${height};
                        display: inline-block;
                        position: relative;
                    }

                    #${uid} > .${_constants.CLASS.OUTLET} > iframe {
                        height: 100%;
                        width: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                        transition: opacity .2s ease-in-out;
                    }

                    #${uid} > .${_constants.CLASS.OUTLET} > iframe.${_constants.CLASS.VISIBLE} {
                        opacity: 1;
                    }

                    #${uid} > .${_constants.CLASS.OUTLET} > iframe.${_constants.CLASS.INVISIBLE} {
                        opacity: 0;
                    }
                `), (0, _src.node)("node", {
    el: outlet
  })).render((0, _src.dom)({
    doc
  }));
}