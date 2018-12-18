/* @flow */
/* eslint import/no-commonjs: off */

const postRobotGlobals = require('post-robot/globals');

module.exports = { ...postRobotGlobals, __ZOID__: {
    __POPUP_SUPPORT__:     true,
    __FRAMEWORK_SUPPORT__: false
} };
