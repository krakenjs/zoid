/* @flow */

import { assert } from 'chai';

import { testComponent } from '../component';

describe('zoid window cases', () => {
    it('should enter a component rendered as a popup with a custom window and call a prop', done => {

        const win = window.open('/base/test/basicchild.htm?devenv=true', 'foobar');

        const windowOpen = window.open;
        window.open = () => {
            throw new Error(`Expected no window open`);
        };

        setTimeout(() => {
            testComponent.renderPopup({

                win,
    
                foo(bar) {
                    assert.equal(bar, 'bar');
                    window.open = windowOpen;
                    done();
                },
    
                run: `
                    window.xprops.foo('bar');
                `
            });
        }, 1000);
    });
});
