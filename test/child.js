/* @flow */

import { on } from 'post-robot/src';

import './component';

on('eval', ({ data: { code } }) => {
    eval(code); // eslint-disable-line no-eval, security/detect-eval-with-expression
});

if (window.xprops.run) {
    // eslint-disable-next-line no-unused-vars
    let zoid = require('../src');
    // eslint-disable-next-line no-unused-vars
    let { onWindowOpen } = require('./common');
    eval(`(function() { ${ window.xprops.run } }).call(this);`); // eslint-disable-line no-eval, security/detect-eval-with-expression
}
