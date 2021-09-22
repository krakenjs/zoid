/* @flow */

import './tests';
import { noop } from 'belter/src';

import { zoid } from './zoid';

window.mockDomain = 'mock://www.parent.com';

window.console.karma = (...args) => {
    const karma = window.karma || (window.top && window.top.karma) || (window.parent && window.parent.karma) || (window.opener && window.opener.karma);
    if (karma) {
        karma.log('debug', args);
    }
    // eslint-disable-next-line no-console
    console.log(...args);
};

beforeEach(() => {
    // eslint-disable-next-line unicorn/prefer-add-event-listener
    window.onerror = noop;

    if (window !== window.top) {
        throw new Error(`Expected to be top window`);
    }
});

window.name = '__zoid_test_parent_window__';

const body = document.body;

if (!body) {
    throw new Error(`Expected document.body to be present`);
}

body.style.width = '1000px';
body.style.height = '1000px';

afterEach((done) => {
    window.name = '';
    delete window.__component__;
    delete window.navigator.mockUserAgent;
    return zoid.destroyAll().then(done);
});
