/* @flow */

import { CONFIG } from 'post-robot/src';

import xcomponent from '../src';

import './tests';

CONFIG.ALLOW_POSTMESSAGE_POPUP = false;

window.console.karma = (...args) => {
    let karma = window.karma || (window.top && window.top.karma) || (window.parent && window.parent.karma) || (window.opener && window.opener.karma);
    if (karma) {
        karma.log('debug', args);
    }
    // eslint-disable-next-line no-console
    console.log(...args);
};

beforeEach(() => {
    window.onerror = () => {
        // pass
    };
});

window.name = '__xcomponent_test_parent_window__';

let body = document.body;

if (!body) {
    throw new Error(`Expected document.body to be present`);
}

body.style.width = '1000px';
body.style.height = '1000px';

afterEach((done) => {
    return xcomponent.destroyAll().then(() => done());
});
