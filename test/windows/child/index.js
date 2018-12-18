/* @flow */

import { on } from 'post-robot/src';
import { memoize } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';

if (window.__component__) {
    window.__component__ = memoize(window.__component__);
    window.__component__();
}

if (!window.xprops) {
    setTimeout(() => {
        window.close();
        if (window.frameElement) {
            window.frameElement.parentNode.removeChild(window.frameElement);
        }
    }, 1);
    throw new Error(`No xprops found`);
}

const xEval = (code) => {
    return ZalgoPromise.try(() => {
        return eval(`(function() { ${ code } })()`); // eslint-disable-line no-eval, security/detect-eval-with-expression
    });
};

on('eval', ({ data: { code } }) => {
    return xEval(code);
});

if (window.xprops.run) {
    if (typeof window.xprops.run === 'function') {
        window.xprops.run({ run: xEval }).then(code => {
            eval(`(function() { ${ code } }).call(this);`); // eslint-disable-line no-eval, security/detect-eval-with-expression
        });
    } else if (typeof window.xprops.run === 'string') {
        eval(`(function() { ${ window.xprops.run } }).call(this);`); // eslint-disable-line no-eval, security/detect-eval-with-expression
    } else {
        throw new TypeError(`Can not run ${ typeof window.xprops.run }`);
    }
}
