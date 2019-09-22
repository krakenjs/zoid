/* @flow */
/* eslint no-eval: off, security/detect-eval-with-expression: off */

import { on } from 'post-robot/src';
import { memoize, destroyElement } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import { runOnClick } from '../../common';

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
        return eval(`(function() { ${ code } })()`);
    });
};

on('eval', ({ data: { code } }) => {
    return xEval(code);
});

if (window.xprops.run) {
    window.xprops.run().then(code => {
        const wrappedCode = `(function() { ${ code } }).call(this);`;

        if (window.xprops.runOnClick) {
            runOnClick(() => {
                eval(wrappedCode);
            });
        } else {
            eval(wrappedCode);
        }
    }).then(() => {
        if (window.xprops.postRun) {
            return window.xprops.postRun();
        }
    });
}
