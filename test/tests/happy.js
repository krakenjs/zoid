/* @flow */

import { assert } from 'chai';

import { testComponent } from '../component';
import { onWindowOpen } from '../common';

describe('zoid happy cases', () => {

    it('should enter a component rendered as an iframe', done => {

        testComponent.renderIframe({
            onEnter: done
        }, document.body);
    });

    it('should enter a component rendered as an iframe and call a prop', done => {

        testComponent.renderIframe({

            foo(bar) {
                assert.equal(bar, 'bar');
                done();
            },

            run: `
                window.xprops.foo('bar');
            `
        }, document.body);
    });

    it('should enter a component rendered as an iframe', done => {

        testComponent.renderIframe({
            onEnter: done
        }, document.body);
    });

    it('should enter a component rendered as an iframe and call a prop', done => {

        testComponent.renderIframe({

            foo(bar) {
                assert.equal(bar, 'bar');
                done();
            },

            run: `
                window.xprops.foo('bar');
            `
        }, document.body);
    });

    it('should enter a component rendered as a popup', done => {

        testComponent.renderPopup({
            onEnter: done
        });
    });

    it('should enter a component rendered as a popup and call a prop', done => {

        testComponent.renderPopup({

            foo(bar) {
                assert.equal(bar, 'bar');
                done();
            },

            run: `
                window.xprops.foo('bar');
            `
        });
    });

    it('should enter a component, update a prop, and call a prop', done => {

        let isDone = false;

        testComponent.renderIframe({

            foo() {
                this.updateProps({
                    foo(bar) {
                        if (!isDone) {
                            isDone = true;
                            assert.equal(bar, 'bar');
                            done();
                        }
                    }
                });
            },

            run: `
                window.xprops.foo();

                window.xchild.onProps(function() {
                    window.xprops.foo('bar');
                });
            `
        }, document.body);
    });

    it('should try to render by passing in an element', done => {

        testComponent.render({
            onEnter: done
        }, document.body);
    });

    it('should try to render to defaultContext iframe', done => {

        let originalDefaultContext = testComponent.defaultContext;
        testComponent.defaultContext = 'iframe';

        testComponent.render({
            onEnter() {
                testComponent.defaultContext = originalDefaultContext;
                done();
            }
        }, document.body);
    });

    it('should try to render to defaultContext iframe using renderTo', done => {
        
        let originalDefaultContext = testComponent.defaultContext;
        testComponent.defaultContext = 'iframe';

        testComponent.renderTo(window, {
            onEnter() {
                testComponent.defaultContext = originalDefaultContext;
                done();
            }
        }, 'body');
    });

    it('should try to render to defaultContext popup', done => {

        let originalDefaultContext = testComponent.defaultContext;
        testComponent.defaultContext = 'popup';

        testComponent.render({
            onEnter() {
                testComponent.defaultContext = originalDefaultContext;
                done();
            }
        });
    });

    it('should try to render to when popup is the only available option', done => {

        let originalDefaultContext = testComponent.defaultContext;
        let originalContexts = testComponent.contexts;

        delete testComponent.defaultContext;
        testComponent.contexts = {
            popup:  true,
            iframe: false
        };

        testComponent.render({
            onEnter() {
                testComponent.defaultContext = originalDefaultContext;
                testComponent.contexts = originalContexts;
                done();
            }
        });
    });

    it('should try to render to when iframe is the only available option', done => {

        let originalDefaultContext = testComponent.defaultContext;
        let originalContexts = testComponent.contexts;

        delete testComponent.defaultContext;
        testComponent.contexts = {
            popup:  false,
            iframe: true
        };

        testComponent.render({
            onEnter() {
                testComponent.defaultContext = originalDefaultContext;
                testComponent.contexts = originalContexts;
                done();
            }
        }, document.body);
    });

    it('should try to render to iframe, when both iframe and popup are supported contexts', () => {
        
        let originalDefaultContext = testComponent.defaultContext;
        let originalContexts = testComponent.contexts;

        delete testComponent.defaultContext;
        testComponent.contexts = {
            popup:  true,
            iframe: true
        };

        let promise = onWindowOpen().then(openedWindow => {
            if (openedWindow.parent === openedWindow) {
                throw new Error(`Expected opened window to be iframe`);
            }
        });

        testComponent.render({
            onEnter() {
                testComponent.defaultContext = originalDefaultContext;
                testComponent.contexts = originalContexts;
            }
        }, document.body);

        return promise;
    });

    it('should enter a component and call back with a string prop', done => {

        testComponent.renderIframe({

            stringProp: 'bar',

            foo(result) {
                assert.equal(result, 'bar');
                done();
            },

            run: `
                window.xprops.foo(window.xprops.stringProp);
            `
        }, document.body);
    });

    it('should enter a component and call back with a number prop', done => {

        testComponent.renderIframe({

            numberProp: 123,

            foo(result) {
                assert.equal(result, 123);
                done();
            },

            run: `
                window.xprops.foo(window.xprops.numberProp);
            `
        }, document.body);
    });

    it('should enter a component and call back with a boolean prop', done => {

        testComponent.renderIframe({

            booleanProp: true,

            foo(result) {
                assert.equal(result, true);
                done();
            },

            run: `
                window.xprops.foo(window.xprops.booleanProp);
            `
        }, document.body);
    });

    it('should enter a component and call back with an object prop', done => {

        testComponent.renderIframe({

            objectProp: { foo: 'bar', x: 12345, fn() { done(); }, obj: { bar: 'baz' } },

            foo(result) {
                assert.equal(result.foo, 'bar');
                assert.equal(result.obj.bar, 'baz');
                assert.equal(result.x, 12345);
                assert.isTrue(result.fn instanceof Function);
                result.fn();
            },

            run: `
                window.xprops.foo(window.xprops.objectProp);
            `
        }, document.body);
    });

    it('should enter a component and call back with a function prop', done => {

        testComponent.renderIframe({

            functionProp: done,

            foo(result) {
                assert.isTrue(result instanceof Function);
                result();
            },

            run: `
                window.xprops.foo(window.xprops.functionProp);
            `
        }, document.body);
    });
});
