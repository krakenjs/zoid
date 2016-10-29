
import { testComponent, testComponent4 } from '../component';

describe('xcomponent happy cases', () => {

    it('should enter a component rendered as a lightbox', done => {

        testComponent.renderLightbox({
            onEnter: done
        });
    });

    it.skip('should enter a component rendered as a lightbox with the correct dimensions', done => {

        testComponent.renderLightbox({
            onEnter() {
                if (!(this.window.innerWidth === this.component.dimensions.width && this.window.innerHeight === this.component.dimensions.height)) {
                    throw new Error(`The parent and child window dimensions do not match ${window.innerWidth}`);
                } else {
                    done();
                }
            }
        });
    });

    it.skip('should enter a component rendered as a popup with the correct dimensions', done => {

        let open = window.open;
        window.open = function(url, name, options) {
            assert.isTrue(options.indexOf(`width=${testComponent.dimensions.width}`) !== -1, 'Expected width passed to window.open to be correct');
            assert.isTrue(options.indexOf(`height=${testComponent.dimensions.height}`) !== -1, 'Expected height passed to window.open to be correct');
            return open.apply(this, arguments);
        };

        testComponent.renderPopup({
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

        window.open = open;
    });

    it.skip('should enter a component rendered as a lightbox with no dimensions', done => {

        testComponent4.renderLightbox({
            onEnter() {
                if (!(window.innerWidth === this.window.innerWidth && window.innerHeight === this.window.innerHeight)) {
                    throw new Error(`The parent and child window dimensions do not match ${window.innerWidth}`);
                } else {
                    done();
                }
            }
        });
    });

    it.skip('should enter a component rendered as a popup with no dimensions', done => {

        let open = window.open;
        window.open = function(url, name, options) {
            assert.isTrue(options.indexOf(`width=`) === -1, 'Expected width not to be passed to window.open');
            assert.isTrue(options.indexOf(`height=`) === -1, 'Expected height not to be passed to window.open');
            return open.apply(this, arguments);
        };

        testComponent4.renderPopup({
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

        window.open = open;
    });

    it('should enter a component rendered as a lightbox and call a prop', done => {

        testComponent.renderLightbox({

            foo(bar) {
                assert.equal(bar, 'bar');
                done();
            },

            run: `
                window.xprops.foo('bar');
            `
        });
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

        testComponent.renderLightbox({

            foo() {
                return this.updateProps({
                    foo(bar) {
                        assert.equal(bar, 'bar');
                        done();
                    }
                });
            },

            run: `
                window.xprops.foo();

                window.xchild.onProps(function() {
                    window.xprops.foo('bar');
                });
            `
        });
    });

    it('should try to render by passing in an element', done => {

        testComponent.render({
            onEnter: done
        }, document.body);
    });

    it('should try to render to defaultContext lightbox', done => {

        let originalDefaultContext = testComponent.defaultContext;
        testComponent.defaultContext = 'lightbox';

        testComponent.render({
            onEnter() {
                testComponent.defaultContext = originalDefaultContext;
                done();
            }
        });
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
            popup: true,
            lightbox: false,
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

    it('should try to render to when lightbox is the only available option', done => {

        let originalDefaultContext = testComponent.defaultContext;
        let originalContexts = testComponent.contexts;

        delete testComponent.defaultContext;
        testComponent.contexts = {
            popup: false,
            lightbox: true,
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

    it('should enter a component and call back with a string prop', done => {

        testComponent.renderLightbox({

            stringProp: 'bar',

            foo(result) {
                assert.equal(result, 'bar');
                done();
            },

            run: `
                window.xprops.foo(window.xprops.stringProp);
            `
        });
    });

    it('should enter a component and call back with a number prop', done => {

        testComponent.renderLightbox({

            numberProp: 123,

            foo(result) {
                assert.equal(result, 123);
                done();
            },

            run: `
                window.xprops.foo(window.xprops.numberProp);
            `
        });
    });

    it('should enter a component and call back with a parseInted number prop', done => {

        testComponent.renderLightbox({

            numberProp: '123',

            foo(result) {
                assert.equal(result, 123);
                done();
            },

            run: `
                window.xprops.foo(window.xprops.numberProp);
            `
        });
    });

    it('should enter a component and call back with a boolean prop', done => {

        testComponent.renderLightbox({

            booleanProp: true,

            foo(result) {
                assert.equal(result, true);
                done();
            },

            run: `
                window.xprops.foo(window.xprops.booleanProp);
            `
        });
    });

    it('should enter a component and call back with a truthy boolean prop', done => {

        testComponent.renderLightbox({

            booleanProp: 1,

            foo(result) {
                assert.equal(result, true);
                done();
            },

            run: `
                window.xprops.foo(window.xprops.booleanProp);
            `
        });
    });

    it('should enter a component and call back with a falsy boolean prop', done => {

        testComponent.renderLightbox({

            booleanProp: 0,

            foo(result) {
                assert.equal(result, false);
                done();
            },

            run: `
                window.xprops.foo(window.xprops.booleanProp);
            `
        });
    });

    it('should enter a component and call back with an object prop', done => {

        testComponent.renderLightbox({

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
        });
    });

    it('should enter a component and call back with a function prop', done => {

        testComponent.renderLightbox({

            functionProp: done,

            foo(result) {
                assert.isTrue(result instanceof Function);
                result();
            },

            run: `
                window.xprops.foo(window.xprops.functionProp);
            `
        });
    });
});