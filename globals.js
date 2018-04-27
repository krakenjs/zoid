/* @flow */
/* eslint import/no-commonjs: off */

let postRobotGlobals = require('post-robot/globals');

module.exports = Object.assign({}, postRobotGlobals, {
    __XCOMPONENT__: {
        __POPUP_SUPPORT__:                  true,
        __CHILD_WINDOW_ENFORCE_LOG_LEVEL__: false
    }
});
