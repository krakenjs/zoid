
if (process.env.XCOMPONENT_EXCLUDE_IE_BRIDGE) {
  module.exports = require('./dist/xcomponent.frame');
  module.exports.default = module.exports;
} else {
  module.exports = require('./dist/xcomponent');
  module.exports.default = module.exports;
}
