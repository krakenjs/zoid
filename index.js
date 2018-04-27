/* @flow */
/* eslint import/no-commonjs: 0 */

// eslint-disable-next-line no-process-env
if (process.env.XCOMPONENT_FRAME_ONLY) {
    module.exports = require('./dist/xcomponent.frame');
    module.exports.default = module.exports;
} else {
    module.exports = require('./dist/xcomponent');
    module.exports.default = module.exports;
}
