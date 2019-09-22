/* @flow */

import { on } from 'post-robot/src';
import { memoize, destroyElement } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';

if (window.__component__) {
    window.__component__ = memoize(window.__component__);
    window.__component__();
}

if (!window.xprops) {
    setTimeout(() => {
        window.close();
        if (window.frameElement) {
            destroyElement(window.frameElement);
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
    window.xprops.run().then(code => {
        eval(`(function() { ${ code } }).call(this);`); // eslint-disable-line no-eval, security/detect-eval-with-expression
    }).then(() => {
        if (window.xprops.postRun) {
            return window.xprops.postRun();
        }
    });
}
