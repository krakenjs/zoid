/* @flow */
/* eslint import/no-commonjs: off */

const postRobotGlobals = require("@krakenjs/post-robot/globals");

const pkg = require("./package.json");

const formatVersion = (version) => {
  return version.replace(/[^\d]+/g, "_");
};

module.exports = {
  __POST_ROBOT__: {
    ...postRobotGlobals.__POST_ROBOT__,
    __AUTO_SETUP__: false,
  },
  __ZOID__: {
    __VERSION__: `${formatVersion(pkg.version)}`,
    __LEGACY_GLOBAL_KEY__: "__zoid_10_5_0__",
    __MAJOR_VERSION_GLOBAL_KEY__: `__zoid_${pkg.version.split(".")[0]}__`,
    __IFRAME_SUPPORT__: true,
    __POPUP_SUPPORT__: true,
    __FRAMEWORK_SUPPORT__: false,
    __DEFAULT_CONTAINER__: true,
    __DEFAULT_PRERENDER__: true,
    __SCRIPT_NAMESPACE__: false,
  },
};
