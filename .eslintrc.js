/* @flow */

module.exports = {
  extends:
    "./node_modules/@krakenjs/grumbler-scripts/config/.eslintrc-browser.js",

  globals: {
    __ZOID__: true,
    __POST_ROBOT__: true,
  },

  rules: {
    "react/display-name": "off",
    "react/prop-types": "off",
  },
};
