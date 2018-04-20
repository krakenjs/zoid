/* @flow */
/* eslint import/no-nodejs-modules: off */

import { getWebpackConfig } from 'grumbler-scripts/config/webpack.config';

export let FILE_NAME = 'xcomponent';
export let MODULE_NAME = 'xcomponent';

export let WEBPACK_CONFIG = getWebpackConfig({
    filename:   `${ FILE_NAME }.js`,
    modulename: MODULE_NAME,
    vars:       {
        __IE_POPUP_SUPPORT__:        false,
        __ALLOW_POSTMESSAGE_POPUP__: true
    }
});

export let WEBPACK_CONFIG_MIN = getWebpackConfig({
    filename:   `${ FILE_NAME }.min.js`,
    modulename: MODULE_NAME,
    minify:     true,
    vars:       {
        __MIN__:                            true,
        __POPUP_SUPPORT__:                  true,
        __IE_POPUP_SUPPORT__:               true,
        __CHILD_WINDOW_ENFORCE_LOG_LEVEL__: false,
        __SEND_POPUP_LOGS_TO_OPENER__:      false,
        __ALLOW_POSTMESSAGE_POPUP__:        true
    }
});

export let WEBPACK_CONFIG_FRAME = getWebpackConfig({
    filename:   `${ FILE_NAME }.js`,
    modulename: MODULE_NAME,
    vars:       {
        __POPUP_SUPPORT__:                  false,
        __IE_POPUP_SUPPORT__:               false,
        __CHILD_WINDOW_ENFORCE_LOG_LEVEL__: false,
        __SEND_POPUP_LOGS_TO_OPENER__:      false,
        __ALLOW_POSTMESSAGE_POPUP__:        true
    }
});

export let WEBPACK_CONFIG_FRAME_MIN = getWebpackConfig({
    filename:   `${ FILE_NAME }.min.js`,
    modulename: MODULE_NAME,
    minify:     true,
    vars:       {
        __MIN__:                            true,
        __POPUP_SUPPORT__:                  false,
        __IE_POPUP_SUPPORT__:               false,
        __CHILD_WINDOW_ENFORCE_LOG_LEVEL__: false,
        __SEND_POPUP_LOGS_TO_OPENER__:      false,
        __ALLOW_POSTMESSAGE_POPUP__:        true
    }
});

export let WEBPACK_CONFIG_TEST = getWebpackConfig({
    filename:   `${ FILE_NAME }.js`,
    modulename: MODULE_NAME,
    options:    {
        devtool: 'inline-source-map'
    },
    vars: {
        __TEST__:                           true,
        __POPUP_SUPPORT__:                  true,
        __IE_POPUP_SUPPORT__:               true,
        __CHILD_WINDOW_ENFORCE_LOG_LEVEL__: false,
        __SEND_POPUP_LOGS_TO_OPENER__:      false,
        __ALLOW_POSTMESSAGE_POPUP__:        false
    }
});

export default [ WEBPACK_CONFIG, WEBPACK_CONFIG_MIN, WEBPACK_CONFIG_FRAME, WEBPACK_CONFIG_FRAME_MIN ];
