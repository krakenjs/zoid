
import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';

import { testComponent } from '../component';

describe('xcomponent options', () => {

    it('should enter a component with a custom url', done => {

        testComponent.init({
            url: '/base/test/child.htm?foo=xyztest',

            sendUrl(url) {
                assert.isTrue(url.indexOf('/base/test/child.htm') === 0 && url.indexOf('foo=xyztest') > 0, 'Expected url to be custom url passed during init');
                done();
            },

            run: `
                window.xchild.props.sendUrl(window.location.pathname + window.location.search);
            `
        }).renderLightbox();
    });

    it('should enter a component with a custom env', done => {

        testComponent.init({
            env: 'dev',

            sendUrl(url) {
                assert.isTrue(url.indexOf('devenv') !== -1, 'Expected url to be custom env url');
                done();
            },

            run: `
                window.xchild.props.sendUrl(window.location.pathname + window.location.search);
            `
        }).renderLightbox();
    });

    it('should enter a component and call a memoized function', done => {

        let x = 0;

        testComponent.init({

            memoizedFunction() {
                x += 1;
                return x;
            },

            complete(result) {
                assert.equal(result, 1, 'Expected result to have only been incremented once then memoized');
                done();
            },

            run: `

                return window.xchild.props.memoizedFunction().then(function() {
                    return window.xchild.props.memoizedFunction().then(function(result) {
                        return window.xchild.props.complete(result);
                    });
                });
            `
        }).renderLightbox();
    });

    it('should enter a component and call a once function', done => {

        let x = 0;

        testComponent.init({

            onceFunction() {
                x += 1;
                return x;
            },

            complete(result) {
                assert.equal(result, undefined, 'Expected result to have only been returned once');
                done();
            },

            run: `

                return window.xchild.props.onceFunction().then(function() {
                    return window.xchild.props.onceFunction().then(function(result) {
                        return window.xchild.props.complete(result);
                    });
                });
            `
        }).renderLightbox();
    });

    it('should enter a component and call a denodeify function', done => {

        testComponent.init({

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
                return window.xchild.props.denodeifyFunction('foo').then(function(result) {
                    return window.xchild.props.complete(result);
                });
            `
        }).renderLightbox();
    });

    it('should enter a component and call a denodeify function returning a promise', done => {

        testComponent.init({

            denodeifyFunction(val) {
                return Promise.resolve(`${val}bar`);
            },

            complete(result) {
                assert.equal(result, 'foobar', 'Expected result to have nodeified');
                done();
            },

            run: `
                return window.xchild.props.denodeifyFunction('foo').then(function(result) {
                    return window.xchild.props.complete(result);
                });
            `

        }).renderLightbox();
    });

    it('should enter a component and call a denodeify function with an error', done => {

        testComponent.init({

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
                return window.xchild.props.denodeifyFunction('foo').catch(function() {
                    return window.xchild.props.complete('foobar');
                });
            `

        }).renderLightbox();
    });

    it('should enter a component and call a denodeify function incorrectly', done => {

        testComponent.init({

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
                return window.xchild.props.denodeifyFunction('foo').then(function(result) {
                    return window.xchild.props.complete(result);
                });
            `

        }).renderLightbox();
    });
});