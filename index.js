/* @flow */
/* eslint import/no-commonjs: 0 */

// eslint-disable-next-line no-process-env
if (process.env.ZOID_FRAME_ONLY) {
    // $FlowFixMe
    module.exports = require('./dist/zoid.frame'); // eslint-disable-line import/extensions,eslint-comments/no-unused-disable
    module.exports.default = module.exports;
} else {
    // $FlowFixMe
    module.exports = require('./dist/zoid');
    module.exports.default = module.exports;
}
