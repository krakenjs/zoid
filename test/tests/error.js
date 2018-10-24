/* @flow */

import { assert } from 'chai';

import zoid from '../../src';
import { testComponent, testComponent3 } from '../component';

describe('zoid error cases', () => {

    it('should error out when window.open returns a closed window', done => {

        let windowOpen = window.open;

        window.open = () => {
            return {
                closed: true,
                close() { /* pass */ }
            };
        };

        testComponent.renderPopup({
            onEnter: done

        }).catch(err => {
            assert.isTrue(err instanceof zoid.PopupOpenError, 'Expected PopupOpenError when popup is not opened');
            window.open = windowOpen;
            done();
        });
    });

    it('should enter a component, throw an integration error, and return the error to the parent with the original stack', done => {

        testComponent.renderIframe({

            onError(err) {
                // $FlowFixMe
                assert.isTrue(err && err.message.indexOf('xxxxx') !== -1, 'Expected error to contain original error');
                done();
            },

            run: `
                window.xchild.error(new Error('xxxxx'));
            `
        }, document.body);
    });

    it('should enter a component and timeout, then call onTimeout', done => {

        testComponent.renderIframe({
            timeout: 1,
            onTimeout() {
                done();
            }
        }, document.body);
    });

    it('should enter a component and timeout, then call onError in the absense of onTimeout', done => {

        testComponent.renderIframe({
            timeout: 1,
            onError() {
                done();
            }
        }, document.body);
    });

    it.skip('should enter a component and error out when the page name is not valid', () => {

        window.open('/base/test/child.htm', 'INVALIDNAME');
    });

    it('should try to render a component to an unsupported context and error out', done => {

        // $FlowFixMe
        testComponent3.render(null, 'moo').catch(() => {
            done();
        });
    });

    it('should try to render to when iframe is the only available option but no element is passed', done => {

        let originalDefaultContext = testComponent.defaultContext;
        let originalContexts = testComponent.contexts;

        delete testComponent.defaultContext;
        testComponent.contexts = {
            popup:  false,
            iframe: true
        };

        // $FlowFixMe
        testComponent.render().catch(() => {
            testComponent.defaultContext = originalDefaultContext;
            testComponent.contexts = originalContexts;
            done();
        });
    });

    it('should try to render a popup when an element selector is specified', done => {
        let originalDefaultContext = testComponent.defaultContext;
        let originalContexts = testComponent.contexts;

        delete testComponent.defaultContext;
        testComponent.contexts = {
            popup:  true,
            iframe: false
        };

        // $FlowFixMe
        testComponent.render(null, 'moo').then(() => {
            done('Expected an error to be thrown');
        }).catch(() => {
            testComponent.defaultContext = originalDefaultContext;
            testComponent.contexts = originalContexts;

            done();
        });
    });

    it('should try to render a popup when an element selector is specified using renderTo', done => {
        let originalDefaultContext = testComponent.defaultContext;
        let originalContexts = testComponent.contexts;

        delete testComponent.defaultContext;
        testComponent.contexts = {
            popup:  true,
            iframe: false
        };

        // $FlowFixMe
        testComponent.renderTo(window, null, 'moo').then(() => {
            done('Expected an error to be thrown');
        }).catch(() => {
            testComponent.defaultContext = originalDefaultContext;
            testComponent.contexts = originalContexts;

            done();
        });
    });

    it('should throw an error if the component does not have a suitable context configured', done => {
        let originalDefaultContext = testComponent.defaultContext;
        let originalContexts = testComponent.contexts;

        delete testComponent.defaultContext;
        testComponent.contexts = {
            popup:  false,
            iframe: false
        };

        // $FlowFixMe
        testComponent.render(null).then(() => {
            done('Expected an error to be thrown');
        }).catch(() => {
            testComponent.defaultContext = originalDefaultContext;
            testComponent.contexts = originalContexts;

            done();
        });
    });

    it('should throw an error if the context specified is not accepted by the component config', done => {
        let originalDefaultContext = testComponent.defaultContext;
        let originalContexts = testComponent.contexts;

        delete testComponent.defaultContext;
        testComponent.contexts = {
            popup:  false,
            iframe: true
        };

        try {
            // $FlowFixMe
            testComponent.init(null, 'popup', 'moo');
            done('expected error to be thrown');
        } catch (err) {
            testComponent.defaultContext = originalDefaultContext;
            testComponent.contexts = originalContexts;

            done();
        }
    });

    it('should run validate function on props, and pass up error when thrown', done => {
        testComponent.renderPopup({
            validateProp: 'foo'
        }).catch(() => {
            done();
        });
    });

    it('should run validate function on props, and call onError when error is thrown', done => {
        testComponent.renderPopup({
            validateProp: 'foo',

            onError() {
                done();
            }
        });
    });

    it('should run validate function on component, and pass up error when thrown', done => {
        testComponent.renderPopup({
            invalidate: true
        }).catch(() => {
            done();
        });
    });

    it('should run validate function on props, and call onError when error is thrown', done => {
        testComponent.renderPopup({
            invalidate: true,

            onError() {
                done();
            }
        });
    });

    it('should call onclose when a popup is closed by someone other tha zoid', done => {

        testComponent.renderPopup({

            onEnter() {
                setTimeout(() => {
                    this.window.close();
                });
            },

            onClose() {
                done();
            }
        });
    });

    it('should call onclose when an iframe is closed by someone other tha zoid', done => {

        testComponent.renderIframe({

            onEnter() {
                setTimeout(() => {
                    this.iframe.parentNode.removeChild(this.iframe);
                }, 10);
            },

            onClose() {
                done();
            }
        }, document.body);
    });
});
