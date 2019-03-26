"use strict";

exports.__esModule = true;
exports.defaultContainerTemplate = defaultContainerTemplate;

var _src = require("belter/src");

var _constants = require("../../constants");

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
  props,
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

    const div = doc.createElement('div');
    div.setAttribute('id', uid);
    const style = doc.createElement('style');

    if (props.cspNonce) {
      style.setAttribute('nonce', props.cspNonce);
    }

    style.appendChild(doc.createTextNode(`
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
        `));
    div.appendChild(frame);
    div.appendChild(prerenderFrame);
    div.appendChild(style);
    prerenderFrame.classList.add(CLASS.VISIBLE);
    frame.classList.add(CLASS.INVISIBLE);
    event.on(_constants.EVENT.RENDERED, () => {
      prerenderFrame.classList.remove(CLASS.VISIBLE);
      prerenderFrame.classList.add(CLASS.INVISIBLE);
      frame.classList.remove(CLASS.INVISIBLE);
      frame.classList.add(CLASS.VISIBLE);
      setTimeout(() => {
        (0, _src.destroyElement)(prerenderFrame);
      }, 1);
    });
    event.on(_constants.EVENT.RESIZE, ({
      width: newWidth,
      height: newHeight
    }) => {
      if (typeof newWidth === 'number') {
        div.style.width = (0, _src.toCSS)(newWidth);
      }

      if (typeof newHeight === 'number') {
        div.style.height = (0, _src.toCSS)(newHeight);
      }
    });
    return div;
  }
}