/* @flow */
/* eslint import/no-default-export: off */

import { getKarmaConfig } from "@krakenjs/karma-config-grumbler";

import { WEBPACK_CONFIG_TEST } from "./webpack.config";

// List libs that can be dynamically loaded
// Those files should be available(served), but not included as default
const serveWithoutInclude = [
  "test/lib/angular-4.js",
  "test/lib/angular-12/zone_v0.8.12.js",
  "test/lib/angular-12/rxjs_v6.2.0.js",
  "test/lib/angular-12/angular-12-core.js",
  "test/lib/angular-12/angular-12-common.js",
  "test/lib/angular-12/angular-12-compiler.js",
  "test/lib/angular-12/angular-12-platform-browser.js",
  "test/lib/angular-12/angular-12-platform-browser-dynamic.js",
  "test/lib/vue_v2.5.16.runtime.min.js",
  "test/lib/vue_v3.2.1.js",
].map((file) => ({
  pattern: file,
  included: false,
  served: true,
}));

export default function configKarma(karma: Object) {
  const karmaConfig = getKarmaConfig(karma, {
    basePath: __dirname,
    webpack: WEBPACK_CONFIG_TEST,
  });

  karmaConfig.client.useIframe = false;

  karma.set({
    ...karmaConfig,

    files: [
      "test/lib/react_v16.0.0.js",
      "test/lib/react-dom_v16.0.0.js",
      "test/lib/angular.min.js",
      {
        pattern: "test/zoid.global.js",
        included: true,
        served: true,
      },
      ...serveWithoutInclude,
      ...karmaConfig.files,
    ],

    preprocessors: {
      ...karmaConfig.preprocessors,

      "src/index.js": ["webpack", "sourcemap"],
      "src/**/*.js": ["sourcemap"],
    },
  });
}
