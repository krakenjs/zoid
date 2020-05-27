/* @flow */
/* eslint import/no-nodejs-modules: off, import/no-default-export: off */

import { getWebpackConfig, getNextVersion } from 'grumbler-scripts/config/webpack.config';
import { argv } from 'yargs';

import pkg from './package.json';
import globals from './globals';

const __NEXT_VERSION__ = getNextVersion(pkg, argv.level);

const zoidGlobals = {
    ...globals,

    __ZOID__: {
        ...globals.__ZOID__,
        __VERSION__:    __NEXT_VERSION__,
        __GLOBAL_KEY__: `__zoid_${ __NEXT_VERSION__ }__`
    }
};

export const FILE_NAME = 'zoid';
export const MODULE_NAME = 'zoid';

export const WEBPACK_CONFIG = getWebpackConfig({
    filename:   `${ FILE_NAME }.js`,
    modulename: MODULE_NAME,
    vars:       zoidGlobals,
    minify:     false
});

export const WEBPACK_CONFIG_MIN = getWebpackConfig({
    filename:   `${ FILE_NAME }.min.js`,
    modulename: MODULE_NAME,
    minify:     true,
    vars:       zoidGlobals
});

export const WEBPACK_CONFIG_FRAME = getWebpackConfig({
    filename:   `${ FILE_NAME }.frame.js`,
    modulename: MODULE_NAME,
    minify:     false,
    vars:       {
        ...zoidGlobals,

        __POST_ROBOT__: {
            ...zoidGlobals.__POST_ROBOT__,
            __IE_POPUP_SUPPORT__: false
        },

        __ZOID__: {
            ...zoidGlobals.__ZOID__,
            __DEFAULT_PRERENDER__: false,
            __POPUP_SUPPORT__:     false
        }
    }
});

export const WEBPACK_CONFIG_FRAME_MIN = getWebpackConfig({
    filename:   `${ FILE_NAME }.frame.min.js`,
    modulename: MODULE_NAME,
    minify:     true,
    vars:       {
        ...zoidGlobals,

        __POST_ROBOT__: {
            ...zoidGlobals.__POST_ROBOT__,
            __IE_POPUP_SUPPORT__: false
        },

        __ZOID__: {
            ...zoidGlobals.__ZOID__,
            __DEFAULT_PRERENDER__: false,
            __POPUP_SUPPORT__:     false
        }
    }
});

export const WEBPACK_CONFIG_FRAMEWORK = getWebpackConfig({
    filename:   `${ FILE_NAME }.frameworks.js`,
    modulename: MODULE_NAME,
    minify:     false,
    vars:       {
        ...zoidGlobals,

        __POST_ROBOT__: {
            ...zoidGlobals.__POST_ROBOT__,
            __IE_POPUP_SUPPORT__: true
        },

        __ZOID__: {
            ...zoidGlobals.__ZOID__,
            __POPUP_SUPPORT__:     true,
            __FRAMEWORK_SUPPORT__: true
        }
    }
});

export const WEBPACK_CONFIG_FRAMEWORK_MIN = getWebpackConfig({
    filename:   `${ FILE_NAME }.frameworks.min.js`,
    modulename: MODULE_NAME,
    minify:     true,
    vars:       {
        ...zoidGlobals,

        __POST_ROBOT__: {
            ...zoidGlobals.__POST_ROBOT__,
            __IE_POPUP_SUPPORT__: true
        },

        __ZOID__: {
            ...zoidGlobals.__ZOID__,
            __POPUP_SUPPORT__:     true,
            __FRAMEWORK_SUPPORT__: true
        }
    }
});

export const WEBPACK_CONFIG_FRAMEWORK_FRAME = getWebpackConfig({
    filename:   `${ FILE_NAME }.frameworks.frame.js`,
    modulename: MODULE_NAME,
    minify:     false,
    vars:       {
        ...zoidGlobals,

        __POST_ROBOT__: {
            ...zoidGlobals.__POST_ROBOT__,
            __IE_POPUP_SUPPORT__: false
        },

        __ZOID__: {
            ...zoidGlobals.__ZOID__,
            __POPUP_SUPPORT__:     false,
            __FRAMEWORK_SUPPORT__: true
        }
    }
});

export const WEBPACK_CONFIG_FRAMEWORK_FRAME_MIN = getWebpackConfig({
    filename:   `${ FILE_NAME }.frameworks.frame.min.js`,
    modulename: MODULE_NAME,
    minify:     true,
    vars:       {
        ...zoidGlobals,

        __POST_ROBOT__: {
            ...zoidGlobals.__POST_ROBOT__,
            __IE_POPUP_SUPPORT__: false
        },

        __ZOID__: {
            ...zoidGlobals.__ZOID__,
            __POPUP_SUPPORT__:     false,
            __FRAMEWORK_SUPPORT__: true
        }
    }
});

export const WEBPACK_CONFIG_TEST = getWebpackConfig({
    test:           true,
    entry:          './test/zoid.js',
    libraryTarget:  undefined,
    vars:           {
        ...zoidGlobals,

        __ZOID__: {
            ...zoidGlobals.__ZOID__,
            __POPUP_SUPPORT__:     true,
            __FRAMEWORK_SUPPORT__: true
        }
    }
});

export default [
    WEBPACK_CONFIG, WEBPACK_CONFIG_MIN,
    WEBPACK_CONFIG_FRAME, WEBPACK_CONFIG_FRAME_MIN,
    WEBPACK_CONFIG_FRAMEWORK, WEBPACK_CONFIG_FRAMEWORK_MIN,
    WEBPACK_CONFIG_FRAMEWORK_FRAME, WEBPACK_CONFIG_FRAMEWORK_FRAME_MIN
];
