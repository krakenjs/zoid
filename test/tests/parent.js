/* @flow */

import { testComponent } from '../component';

describe('xcomponent render to parent', () => {

    it('should render a component to the parent as an iframe', done => {

        testComponent.renderIframe({
            foo: done,

            run: `
                xcomponent.getByTag('test-component2').renderIframeTo(window.parent, {
                    onEnter: function() {
                        return window.xprops.foo();
                    }
                }, 'body');
            `
        }, document.body);
    });

    it('should render a component to the parent as a popup', done => {

        testComponent.renderIframe({
            foo: done,

            run: `
                xcomponent.getByTag('test-component2').renderPopupTo(window.parent, {
                    onEnter: function() {
                        return window.xprops.foo();
                    }
                });
            `
        }, document.body);
    });

    it('should render a component to the parent as an iframe', done => {

        testComponent.renderIframe({
            foo() {
                done();
            },

            run: `
                xcomponent.getByTag('test-component2').renderIframeTo(window.parent, {
                    onEnter: function() {
                        return window.xprops.foo();
                    }
                }, 'body');
            `
        }, document.body);
    });

    it('should render a component to the parent as an iframe and call a prop', done => {

        testComponent.renderIframe({
            foo: done,

            run: `
                xcomponent.getByTag('test-component2').renderIframeTo(window.parent, {
                    foo: function() {
                        window.xprops.foo();
                    },

                    run: 'window.xprops.foo();'

                }, 'body');
            `
        }, document.body);
    });

    it('should render a component to the parent as an iframe and call a prop', done => {

        testComponent.renderIframe({
            foo: done,

            run: `
                xcomponent.getByTag('test-component2').renderIframeTo(window.parent, {
                    foo: function() {
                        window.xprops.foo();
                    },

                    run: 'window.xprops.foo();'

                }, 'body');
            `
        }, document.body);
    });


    it('should render a component to the parent as a popup and call a prop', done => {

        testComponent.renderIframe({
            foo: done,

            run: `
                xcomponent.getByTag('test-component2').renderPopupTo(window.parent, {
                    foo: function() {
                        window.xprops.foo();
                    },

                    run: 'window.xprops.foo();'

                });
            `
        }, document.body);
    });

    it('should render a component to the parent as an iframe and close on enter', done => {

        testComponent.renderIframe({
            onClose: () => done(),

            run: `
                xcomponent.getByTag('test-component2').renderIframeTo(window.parent, {
                    onEnter: function() {
                        this.close();
                    },

                    onClose: function() {
                        window.xchild.close();
                    }
                }, 'body');
            `
        }, document.body);
    });

    it('should close an xcomponent renderToParent iframe on click of the overlay close button', done => {

        testComponent.renderIframe({
            childEntered: () => {
                let closeButton = document.querySelector('.xcomponent-tag-test-component2 .xcomponent-close');

                if (!closeButton) {
                    return done(new Error(`Expected close button to be present`));
                }

                closeButton.click();
            },

            foo: () => done(),

            run: `
                xcomponent.getByTag('test-component2').renderIframeTo(window.parent, {

                    onEnter: function() {

                        var win = this.window;

                        var interval = setInterval(function() {
                            if (win.closed) {
                                clearInterval(interval);
                                window.xprops.foo();
                            }
                        }, 20);

                        return window.xprops.childEntered();
                    }

                }, 'body');
            `
        }, document.body);
    });

    it('should close an xcomponent renderToParent popup on click of the overlay close button', done => {

        testComponent.renderIframe({

            childEntered: () => {
                let closeButton = document.querySelector('.xcomponent-tag-test-component2 .xcomponent-close');

                if (!closeButton) {
                    return done(new Error(`Expected close button to be present`));
                }

                closeButton.click();
            },

            foo: () => done(),

            run: `
                xcomponent.getByTag('test-component2').renderPopupTo(window.parent, {

                    onEnter: function() {

                        var winClose = this.window.close;
                        this.window.close = function() {
                            winClose.apply(this, arguments);
                            window.xprops.foo();
                        };

                        return window.xprops.childEntered();
                    }

                });
            `
        }, document.body);
    });

    it('should focus an xcomponent renderToParent popup on click of the overlay', done => {

        testComponent.renderIframe({

            childEntered: () => {
                let overlayElement = document.querySelector('.xcomponent-tag-test-component2');

                if (!overlayElement) {
                    return done(new Error(`Expected overlay element to be present`));
                }

                overlayElement.click();
            },

            foo: () => done(),

            run: `
                xcomponent.getByTag('test-component2').renderPopupTo(window.parent, {

                    onEnter: function() {

                        this.window.focus = function() {
                            window.xprops.foo();
                        };

                        return window.xprops.childEntered();
                    }

                });
            `
        }, document.body);
    });
});
