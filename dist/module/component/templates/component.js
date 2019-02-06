"use strict";

exports.__esModule = true;
exports.defaultPrerenderTemplate = defaultPrerenderTemplate;

var _src = require("jsx-pragmatic/src");

/** @jsx node */

/* eslint react/react-in-jsx-scope: off */
function defaultPrerenderTemplate({
  doc
}) {
  if (__ZOID__.__DEFAULT_PRERENDER__) {
    return (0, _src.node)("html", null, (0, _src.node)("body", null, (0, _src.node)("style", null, `
                            .spinner {
                                position: fixed;
                                max-height: 60vmin;
                                max-width: 60vmin;
                                height: 40px;
                                width: 40px;
                                top: 50%;
                                left: 50%;
                                box-sizing: border-box;
                                border: 3px solid rgba(0, 0, 0, .2);
                                border-top-color: rgba(33, 128, 192, 0.8);
                                border-radius: 100%;
                                animation: rotation .7s infinite linear;
                            }
    
                            @keyframes rotation {
                                from {
                                    transform: translateX(-50%) translateY(-50%) rotate(0deg);
                                }
                                to {
                                    transform: translateX(-50%) translateY(-50%) rotate(359deg);
                                }
                            }
                        `), (0, _src.node)("div", {
      class: "spinner"
    }))).render((0, _src.dom)({
      doc
    }));
  }
}