
import { ZalgoPromise } from 'zalgo-promise/src';

import { testComponent } from '../component';

describe('xcomponent options', () => {

    it('should enter a component with a custom url', done => {

        testComponent.renderIframe({
            url: '/base/test/child.htm?foo=xyztest',

            sendUrl(url) {
                assert.isTrue(url.indexOf('/base/test/child.htm') === 0 && url.indexOf('foo=xyztest') > 0, 'Expected url to be custom url passed during init');
                done();
            },

            run: `
                window.xprops.sendUrl(window.location.pathname + window.location.search);
            `
        });
    });

    it('should enter a component with a custom env', done => {

        testComponent.renderIframe({
            env: 'custom',

            sendUrl(url) {
                assert.isTrue(url.indexOf('customenv') !== -1, 'Expected url to be custom env url');
                done();
            },

            run: `
                window.xprops.sendUrl(window.location.pathname + window.location.search);
            `
        });
    });

    it('should enter a component and call a memoized function', done => {

        let x = 0;

        testComponent.renderIframe({

            memoizedFunction() {
                x += 1;
                return x;
            },

            complete(result) {
                assert.equal(result, 1, 'Expected result to have only been incremented once then memoized');
                done();
            },

            run: `

                return window.xprops.memoizedFunction().then(function() {
                    return window.xprops.memoizedFunction().then(function(result) {
                        return window.xprops.complete(result);
                    });
                });
            `
        });
    });

    it('should enter a component and call a once function', done => {

        let x = 0;

        testComponent.renderIframe({

            onceFunction() {
                x += 1;
                return x;
            },

            complete(result) {
                assert.equal(result, undefined, 'Expected result to have only been returned once');
                done();
            },

            run: `

                return window.xprops.onceFunction().then(function() {
                    return window.xprops.onceFunction().then(function(result) {
                        return window.xprops.complete(result);
                    });
                });
            `
        });
    });

    it('should enter a component and call a denodeify function', done => {

        testComponent.renderIframe({

            denodeifyFunction(val, callback) {
                setTimeout(() => {
                    return callback(null, `${val}bar`);
                });
            },

            complete(result) {
                assert.equal(result, 'foobar', 'Expected result to have nodeified');
                done();
            },

            run: `
                return window.xprops.denodeifyFunction('foo').then(function(result) {
                    return window.xprops.complete(result);
                });
            `
        });
    });

    it('should enter a component and call a denodeify function returning a promise', done => {

        testComponent.renderIframe({

            denodeifyFunction(val) {
                return ZalgoPromise.resolve(`${val}bar`);
            },

            complete(result) {
                assert.equal(result, 'foobar', 'Expected result to have nodeified');
                done();
            },

            run: `
                return window.xprops.denodeifyFunction('foo').then(function(result) {
                    return window.xprops.complete(result);
                });
            `

        });
    });

    it('should enter a component and call a denodeify function with an error', done => {

        testComponent.renderIframe({

            denodeifyFunction(val, callback) {
                setTimeout(() => {
                    return callback(new Error('foo'));
                });
            },

            complete(result) {
                assert.equal(result, 'foobar', 'Expected result to have nodeified');
                done();
            },

            run: `
                return window.xprops.denodeifyFunction('foo').catch(function() {
                    return window.xprops.complete('foobar');
                });
            `

        });
    });

    it('should enter a component and call a denodeify function incorrectly', done => {

        testComponent.renderIframe({

            denodeifyFunction(val, callback) {
                setTimeout(() => {
                    try {
                        return callback('something aint right!');
                    } catch (err) {
                        done();
                    }
                });
            },

            complete(result) {
                assert.equal(result, 'foobar', 'Expected result to have nodeified');
                done();
            },

            run: `
                return window.xprops.denodeifyFunction('foo').then(function(result) {
                    return window.xprops.complete(result);
                });
            `

        });
    });
});
