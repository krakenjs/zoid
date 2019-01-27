/* @flow */

import './tests';

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
    window.addEventListener('error', () => {
        // pass
    });
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
    return window.zoid.destroyAll().then(() => done());
});
