"use strict";

exports.__esModule = true;
exports.defaultContainerTemplate = defaultContainerTemplate;

var _src = require("jsx-pragmatic/src");

var _src2 = require("belter/src");

var _constants = require("../../constants");

/* @jsx node */

/* eslint react/react-in-jsx-scope: off */
const CLASS = {
  VISIBLE: 'visible',
  INVISIBLE: 'invisible'
};

function defaultContainerTemplate({
  uid,
  frame,
  prerenderFrame,
  doc,
  event,
  dimensions: {
    width,
    height
  }
}) {
  if (__ZOID__.__DEFAULT_CONTAINER__) {
    if (!frame || !prerenderFrame) {
      return;
    }

    prerenderFrame.classList.add(CLASS.VISIBLE);
    frame.classList.add(CLASS.INVISIBLE);
    event.on(_constants.EVENT.RENDERED, () => {
      prerenderFrame.classList.remove(CLASS.VISIBLE);
      prerenderFrame.classList.add(CLASS.INVISIBLE);
      frame.classList.remove(CLASS.INVISIBLE);
      frame.classList.add(CLASS.VISIBLE);
      setTimeout(() => {
        (0, _src2.destroyElement)(prerenderFrame);
      }, 1);
    });
    return (0, _src.node)("div", {
      id: uid
    }, (0, _src.node)("style", null, `
                        #${uid} {
                            display: inline-block;
                            position: relative;
                            width: ${width};
                            height: ${height};
                        }
    
                        #${uid} > iframe {
                            display: inline-block;
                            position: absolute;
                            width: 100%;
                            height: 100%;
                            top: 0;
                            left: 0;
                            transition: opacity .2s ease-in-out;
                        }
    
                        #${uid} > iframe.${CLASS.INVISIBLE} {
                            opacity: 0;
                        }
    
                        #${uid} > iframe.${CLASS.VISIBLE} {
                            opacity: 1;
                        }
                    `), (0, _src.node)("node", {
      el: frame
    }), (0, _src.node)("node", {
      el: prerenderFrame
    })).render((0, _src.dom)({
      doc
    }));
  }
}