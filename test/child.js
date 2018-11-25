/* @flow */

import './component';

if (window.xprops.run) {
    // eslint-disable-next-line no-unused-vars
    let zoid = require('../src');
    // eslint-disable-next-line no-unused-vars
    let { onWindowOpen } = require('./common');
    eval(`(function() { ${ window.xprops.run } }).call(this);`); // eslint-disable-line no-eval, security/detect-eval-with-expression
}
