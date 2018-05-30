/* @flow */
/* eslint import/no-commonjs: off */

let postRobotGlobals = require('post-robot/globals');

module.exports = Object.assign({}, postRobotGlobals, {
    __ZOID__: {
        __POPUP_SUPPORT__: true
    }
});
