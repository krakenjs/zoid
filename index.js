/* @flow */
/* eslint import/no-commonjs: 0 */

// eslint-disable-next-line no-process-env
if (process.env.ZOID_FRAME_ONLY) {
    module.exports = require('./dist/zoid.frame');
    module.exports.default = module.exports;
} else {
    module.exports = require('./dist/zoid');
    module.exports.default = module.exports;
}
