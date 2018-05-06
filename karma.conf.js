/* @flow */

import { getKarmaConfig } from 'grumbler-scripts/config/karma.conf';

import { WEBPACK_CONFIG_TEST } from './webpack.config';

export default function configKarma(karma : Object) {

    let karmaConfig = getKarmaConfig(karma, {
        basePath: __dirname,
        webpack:  WEBPACK_CONFIG_TEST
    });

    karmaConfig.files = [
        'test/lib/react_v16.0.0.js',
        'test/lib/react-dom_v16.0.0.js',
        'test/lib/angular.min.js',
        'test/lib/vue_v2.5.16.runtime.min.js',

        ...karmaConfig.files
    ];

    karma.set(karmaConfig);
}
