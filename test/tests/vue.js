/* @flow */

import { assert } from 'chai';
import { ZalgoPromise } from 'zalgo-promise/src';

import { testComponent } from '../component';

describe('vue drivers', () => {

    it('should enter a component rendered with vue and call onEnter', done => {

        if (!document.body) {
            return done(new Error('Can not find document.body'));
        }

        const app = document.createElement('div');
        const vueComponent = testComponent.driver('vue');

        if (!document.body) {
            throw new Error(`Expected document.body to be present`);
        }
        document.body.appendChild(app);

        new window.Vue({
            render(createElement) : Element {
                return createElement(vueComponent, {
                    attrs: {
                        onEnter: this.onEnter
                    }
                });
            },
            computed: {
                onEnter: () => {
                    return function onEnter() : ZalgoPromise<void> {
                        return this.close().then(done);
                    };
                }
            }
        }).$mount(app);
    });


    it('should enter a component rendered with vue and call a prop', done => {

        if (!document.body) {
            return done(new Error('Can not find document.body'));
        }

        const app = document.createElement('div');
        const vueComponent = testComponent.driver('vue');

        if (!document.body) {
            throw new Error(`Expected document.body to be present`);
        }
        document.body.appendChild(app);

        new window.Vue({
            render(createElement) : Element {
                return createElement(vueComponent, {
                    attrs: {
                        foo: this.foo,
                        run: this.run
                    }
                });
            },
            data:     () => {
                return {
                    run: `window.xprops.foo('bar');`
                };
            },
            computed: {
                foo: () => {
                    return function foo(bar) : ZalgoPromise<void> {
                        assert.equal(bar, 'bar');
                        return this.close().then(done);
                    };
                }
            }
        }).$mount(app);
    });
});
