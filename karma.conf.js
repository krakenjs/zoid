/* @flow */
/* eslint import/no-default-export: off */

import { getKarmaConfig } from 'grumbler-scripts/config/karma.conf';

import { WEBPACK_CONFIG_TEST } from './webpack.config';

export default function configKarma(karma : Object) {

    const karmaConfig = getKarmaConfig(karma, {
        basePath: __dirname,
        webpack:  WEBPACK_CONFIG_TEST
    });

    karma.set({
        ...karmaConfig,

        files: [
            'test/lib/react_v16.0.0.js',
            'test/lib/react-dom_v16.0.0.js',
            'test/lib/angular.min.js',
            'test/lib/vue_v2.5.16.runtime.min.js',
            'test/lib/angular-4.js',
    
            {
                pattern:  'test/zoid.js',
                included: true,
                served:   true
            },
    
            ...karmaConfig.files
        ],

        preprocessors: {
            ...karmaConfig.preprocessors,

            'src/index.js': [ 'webpack', 'sourcemap' ],
            'src/**/*.js':  [ 'sourcemap' ]
        }
    });
}
