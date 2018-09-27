/* @flow */

import { assert } from 'chai';

import { testComponent } from '../component';

describe('zoid options', () => {
    
    it('should enter a component with a custom env', done => {

        testComponent.renderIframe({
            env: 'custom',

            sendUrl(url) {
                assert.isTrue(url.indexOf('customenv') !== -1, `Expected url to be custom env url, got ${ url }`);
                done();
            },

            run: `
                window.xprops.sendUrl(window.location.pathname + window.location.search);
            `
        }, document.body);
    });
});
