
import postRobot from 'post-robot/src';

import { testComponent, testComponent4 } from '../component';

let component;

afterEach(() => {
    if (component) {
        component.destroy();
        component = null;
    }
});

describe('xcomponent happy cases', () => {

    it('should enter a component rendered as a lightbox', done => {

        component = testComponent.init({
            onEnter: done
        });

        component.renderLightbox();

        postRobot.once('init', () => 'attachTestComponent');
    });

    it('should enter a component rendered as a lightbox with the correct dimensions', done => {

        component = testComponent.init({
            onEnter() {
                if (!(this.window.innerWidth === this.component.dimensions.width && this.window.innerHeight === this.component.dimensions.height)) {
                    throw new Error(`The parent and child window dimensions do not match ${window.innerWidth}`);
                } else {
                    done();
                }
            }
        });

        component.renderLightbox();

        postRobot.once('init', () => 'attachTestComponent');
    });

    it('should enter a component rendered as a popup with the correct dimensions', done => {

        let open = window.open;
        window.open = function(url, name, options) {
            assert.isTrue(options.indexOf(`width=${testComponent.dimensions.width}`) !== -1, 'Expected width passed to window.open to be correct');
            assert.isTrue(options.indexOf(`height=${testComponent.dimensions.height}`) !== -1, 'Expected height passed to window.open to be correct');
            return open.apply(this, arguments);
        };

        component = testComponent.init({
            onEnter() {
                done();

                /* For some reason karma/phantomjs don't respect the passed dimensions, so can't check them this way

                if (!(this.window.innerWidth === this.component.dimensions.width && this.window.innerHeight === this.component.dimensions.height)) {
                    throw new Error('The parent and child window dimensions do not match'+'|'+ window.innerWidth);
                } else {
                    done();
                }

                */
            }
        });

        component.renderPopup();

        window.open = open;

        postRobot.once('init', () => 'attachTestComponent');
    });

    it('should enter a component rendered as a lightbox with no dimensions', done => {

        component = testComponent4.init({
            onEnter() {
                if (!(window.innerWidth === this.window.innerWidth && window.innerHeight === this.window.innerHeight)) {
                    throw new Error(`The parent and child window dimensions do not match ${window.innerWidth}`);
                } else {
                    done();
                }
            }
        });

        component.renderLightbox();

        postRobot.once('init', () => 'attachTestComponent4');
    });

    it('should enter a component rendered as a popup with no dimensions', done => {

        let open = window.open;
        window.open = function(url, name, options) {
            assert.isTrue(options.indexOf(`width=`) === -1, 'Expected width not to be passed to window.open');
            assert.isTrue(options.indexOf(`height=`) === -1, 'Expected height not to be passed to window.open');
            return open.apply(this, arguments);
        };

        component = testComponent4.init({
            onEnter() {
                done();

                /* Chrome opens up a new window with different dimensions to the parent, so this doesn't work

                if (!(window.top.innerWidth === this.window.innerWidth && window.top.innerHeight === this.window.innerHeight)) {
                    throw new Error('The parent and child window dimensions do not match'+'|'+ window.innerWidth);
                } else {
                    done();
                }

                */
            }
        });

        component.renderPopup();

        window.open = open;

        postRobot.once('init', () => 'attachTestComponent4');
    });

    it('should enter a component rendered as a lightbox and call a prop', done => {

        component = testComponent.init({
            foo(bar) {
                assert.equal(bar, 'bar');
                done();
            }
        });

        component.renderLightbox();

        postRobot.once('init', () => 'attachTestComponentAndCallFoo');
    });

    it('should enter a component rendered as an iframe', done => {

        component = testComponent.init({
            onEnter: done
        });

        component.renderIframe(document.body);

        postRobot.once('init', () => 'attachTestComponent');
    });

    it('should enter a component rendered as an iframe and call a prop', done => {

        component = testComponent.init({
            foo(bar) {
                assert.equal(bar, 'bar');
                done();
            }
        });

        component.renderIframe(document.body);

        postRobot.once('init', () => 'attachTestComponentAndCallFoo');
    });

    it('should enter a component rendered as a popup', done => {

        component = testComponent.init({
            onEnter: done
        });

        component.renderPopup();

        postRobot.once('init', () => 'attachTestComponent');
    });

    it('should enter a component rendered as a popup and call a prop', done => {

        component = testComponent.init({
            foo(bar) {
                assert.equal(bar, 'bar');
                done();
            }
        });

        component.renderPopup();

        postRobot.once('init', () => 'attachTestComponentAndCallFoo');
    });

    it('should enter a component, update a prop, and call a prop', done => {

        component = testComponent.init({

            onEnter() {
                component.updateProps({
                    foo(bar) {
                        assert.equal(bar, 'bar');
                        done();
                    }
                });
            },

            foo(bar) {
                throw new Error('Expected foo to not be called yet');
            }
        });

        component.renderLightbox();

        postRobot.once('init', () => 'attachTestComponentAndCallFooOnProps');
    });

    it('should try to render by passing in an element', done => {

        component = testComponent.init({
            onEnter: done
        });

        component.render(document.body);

        postRobot.once('init', () => 'attachTestComponent');
    });

    it('should try to render to defaultContext lightbox', done => {

        let originalDefaultContext = testComponent.defaultContext;
        testComponent.defaultContext = 'lightbox';

        component = testComponent.init({
            onEnter() {
                testComponent.defaultContext = originalDefaultContext;
                done();
            }
        });

        component.render();

        postRobot.once('init', () => 'attachTestComponent');
    });

    it('should try to render to defaultContext popup', done => {

        let originalDefaultContext = testComponent.defaultContext;
        testComponent.defaultContext = 'popup';

        component = testComponent.init({
            onEnter() {
                testComponent.defaultContext = originalDefaultContext;
                done();
            }
        });

        component.render();

        postRobot.once('init', () => 'attachTestComponent');
    });

    it('should try to render to when popup is the only available option', done => {

        let originalDefaultContext = testComponent.defaultContext;
        let originalContexts = testComponent.contexts;

        delete testComponent.defaultContext;
        testComponent.contexts = {
            popup: true,
            lightbox: false,
            iframe: false
        };

        component = testComponent.init({
            onEnter() {
                testComponent.defaultContext = originalDefaultContext;
                testComponent.contexts = originalContexts;
                done();
            }
        });

        component.render();

        postRobot.once('init', () => 'attachTestComponent');
    });

    it('should try to render to when lightbox is the only available option', done => {

        let originalDefaultContext = testComponent.defaultContext;
        let originalContexts = testComponent.contexts;

        delete testComponent.defaultContext;
        testComponent.contexts = {
            popup: false,
            lightbox: true,
            iframe: false
        };

        component = testComponent.init({
            onEnter() {
                testComponent.defaultContext = originalDefaultContext;
                testComponent.contexts = originalContexts;
                done();
            }
        });

        component.render();

        postRobot.once('init', () => 'attachTestComponent');
    });

    it('should enter a component and call back with a string prop', done => {

        component = testComponent.init({

            stringProp: 'bar',

            foo(result) {
                assert.equal(result, 'bar');
                done();
            }

        });


        component.renderLightbox();

        postRobot.once('init', () => 'attachTestComponentAndCallFooWithStringProp');
    });

    it('should enter a component and call back with a number prop', done => {

        component = testComponent.init({

            numberProp: 123,

            foo(result) {
                assert.equal(result, 123);
                done();
            }

        });


        component.renderLightbox();

        postRobot.once('init', () => 'attachTestComponentAndCallFooWithNumberProp');
    });

    it('should enter a component and call back with a parseInted number prop', done => {

        component = testComponent.init({

            numberProp: '123',

            foo(result) {
                assert.equal(result, 123);
                done();
            }

        });


        component.renderLightbox();

        postRobot.once('init', () => 'attachTestComponentAndCallFooWithNumberProp');
    });

    it('should enter a component and call back with a boolean prop', done => {

        component = testComponent.init({

            booleanProp: true,

            foo(result) {
                assert.equal(result, true);
                done();
            }

        });


        component.renderLightbox();

        postRobot.once('init', () => 'attachTestComponentAndCallFooWithBooleanProp');
    });

    it('should enter a component and call back with a truthy boolean prop', done => {

        component = testComponent.init({

            booleanProp: 1,

            foo(result) {
                assert.equal(result, true);
                done();
            }

        });


        component.renderLightbox();

        postRobot.once('init', () => 'attachTestComponentAndCallFooWithBooleanProp');
    });

    it('should enter a component and call back with a falsy boolean prop', done => {

        component = testComponent.init({

            booleanProp: 0,

            foo(result) {
                assert.equal(result, false);
                done();
            }

        });


        component.renderLightbox();

        postRobot.once('init', () => 'attachTestComponentAndCallFooWithBooleanProp');
    });

    it('should enter a component and call back with an object prop', done => {

        component = testComponent.init({

            objectProp: { foo: 'bar', x: 12345, fn() { done(); }, obj: { bar: 'baz' } },

            foo(result) {
                assert.equal(result.foo, 'bar');
                assert.equal(result.obj.bar, 'baz');
                assert.equal(result.x, 12345);
                assert.isTrue(result.fn instanceof Function);
                result.fn();
            }

        });


        component.renderLightbox();

        postRobot.once('init', () => 'attachTestComponentAndCallFooWithObjectProp');
    });

    it('should enter a component and call back with a function prop', done => {

        component = testComponent.init({

            functionProp: done,

            foo(result) {
                assert.isTrue(result instanceof Function);
                result();
            }

        });


        component.renderLightbox();

        postRobot.once('init', () => 'attachTestComponentAndCallFooWithFunctionProp');
    });
});