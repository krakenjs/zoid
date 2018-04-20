/* @flow */

module.exports = {
    'extends': './node_modules/grumbler-scripts/config/.eslintrc.js',

    'globals': {
        __IE_POPUP_SUPPORT__: true,
        __ALLOW_POSTMESSAGE_POPUP__: true,
        __POPUP_SUPPORT__: true,
        __CHILD_WINDOW_ENFORCE_LOG_LEVEL__: true,
        __SEND_POPUP_LOGS_TO_OPENER__: true
    }
};