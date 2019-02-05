/* @flow */
/* eslint import/no-commonjs: off */

const postRobotGlobals = require('post-robot/globals');
const { getCurrentVersion } = require('grumbler-scripts/config/webpack.config');

const pkg = require('./package.json');

module.exports = {
    __POST_ROBOT__: {
        ...postRobotGlobals.__POST_ROBOT__
    },
    __ZOID__: {
        __GLOBAL_KEY__:        `__zoid_${ getCurrentVersion(pkg) }__`,
        __POPUP_SUPPORT__:     true,
        __FRAMEWORK_SUPPORT__: false,
        __DEFAULT_CONTAINER__: true,
        __DEFAULT_PRERENDER__: true
    }
};
