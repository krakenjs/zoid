/* @flow */

module.exports = {
  extends: "@krakenjs/eslint-config-grumbler/eslintrc-browser",

  globals: {
    __ZOID__: true,
    __POST_ROBOT__: true,
  },

  rules: {
    "react/display-name": "off",
    "react/prop-types": "off",
  },

  overrides: [
    {
      files: ["test/**/*"],
      rules: {
        "max-lines": "off",
        "compat/compat": "off",
      },
    },
  ],
};
