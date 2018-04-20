/* @flow */

import './component';

if (window.xprops.run) {
    eval(`(function() { ${ window.xprops.run } }).call(this);`); // eslint-disable-line no-eval, security/detect-eval-with-expression
}
