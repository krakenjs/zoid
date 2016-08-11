
import postRobot from 'post-robot/src';
import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';

import { testComponent } from '../component';

let component;

afterEach(() => {
    if (component) {
        component.destroy();
        component = null;
    }
});

describe('xcomponent options', () => {

    it('should enter a component with a custom url', done => {

        component = testComponent.init({
            url: '/base/test/child.htm?foo=xyztest',

            sendUrl(url) {
                assert.isTrue(url.indexOf('/base/test/child.htm') === 0 && url.indexOf('foo=xyztest') > 0, 'Expected url to be custom url passed during init');
                done();
            }
        });

        component.renderLightbox();

        postRobot.once('init', () => 'attachTestComponent');
    });

    it('should enter a component with a custom env', done => {

        component = testComponent.init({
            env: 'dev',

            sendUrl(url) {
                assert.isTrue(url.indexOf('devenv') !== -1, 'Expected url to be custom env url');
                done();
            }
        });

        component.renderLightbox();

        postRobot.once('init', () => 'attachTestComponent');
    });

    it('should enter a component and call a memoized function', done => {

        let x = 0;

        component = testComponent.init({

            memoizedFunction() {
                x += 1;
                return x;
            },

            complete(result) {
                assert.equal(result, 1, 'Expected result to have only been incremented once then memoized');
                done();
            }

        });


        component.renderLightbox();

        postRobot.once('init', () => 'attachTestComponentAndCallMemoizedFunction');
    });

    it('should enter a component and call a once function', done => {

        let x = 0;

        component = testComponent.init({

            onceFunction() {
                x += 1;
                return x;
            },

            complete(result) {
                assert.equal(result, undefined, 'Expected result to have only been returned once');
                done();
            }

        });


        component.renderLightbox();

        postRobot.once('init', () => 'attachTestComponentAndCallOnceFunction');
    });

    it('should enter a component and call a denodeify function', done => {

        component = testComponent.init({

            denodeifyFunction(val, callback) {
                setTimeout(() => {
                    return callback(null, `${val}bar`);
                });
            },

            complete(result) {
                assert.equal(result, 'foobar', 'Expected result to have nodeified');
                done();
            }

        });


        component.renderLightbox();

        postRobot.once('init', () => 'attachTestComponentAndCallDenodeifyFunction');
    });

    it('should enter a component and call a denodeify function returning a promise', done => {

        component = testComponent.init({

            denodeifyFunction(val) {
                return Promise.resolve(`${val}bar`);
            },

            complete(result) {
                assert.equal(result, 'foobar', 'Expected result to have nodeified');
                done();
            }

        });

        component.renderLightbox();

        postRobot.once('init', () => 'attachTestComponentAndCallDenodeifyFunction');
    });

    it('should enter a component and call a denodeify function with an error', done => {

        component = testComponent.init({

            denodeifyFunction(val, callback) {
                setTimeout(() => {
                    return callback(new Error('foo'));
                });
            },

            complete(result) {
                assert.equal(result, 'foobar', 'Expected result to have nodeified');
                done();
            }

        });

        component.renderLightbox();

        postRobot.once('init', () => 'attachTestComponentAndCallDenodeifyFunctionWithError');
    });

    it('should enter a component and call a denodeify function incorrectly', done => {

        component = testComponent.init({

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
            }

        });


        component.renderLightbox();

        postRobot.once('init', () => 'attachTestComponentAndCallDenodeifyFunction');
    });
});