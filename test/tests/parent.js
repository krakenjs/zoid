/* @flow */

import { onCloseWindow } from 'cross-domain-utils/src';
import { once } from 'belter/src';

import { testComponent } from '../component';
import { onWindowOpen } from '../common';

describe('zoid render to parent', () => {

    it('should render a component to the parent as an iframe', done => {

        testComponent.renderIframe({
            foo: done,

            run: `
                zoid.getByTag('test-component2').renderIframeTo(window.parent, {
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
                zoid.getByTag('test-component2').renderPopupTo(window.parent, {
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
                zoid.getByTag('test-component2').renderIframeTo(window.parent, {
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
                zoid.getByTag('test-component2').renderIframeTo(window.parent, {
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
                zoid.getByTag('test-component2').renderIframeTo(window.parent, {
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
                zoid.getByTag('test-component2').renderPopupTo(window.parent, {
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
                zoid.getByTag('test-component2').renderIframeTo(window.parent, {
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

    it('should close a zoid renderToParent iframe on click of the overlay close button', done => {

        let win;

        testComponent.renderIframe({
            foo: () => {
                onWindowOpen().then(openedWin => {
                    win = openedWin;
                });
            },

            childEntered: () => {
                let closeButton = document.querySelector('.zoid-tag-test-component2 .zoid-close');

                if (!closeButton) {
                    return done(new Error(`Expected close button to be present`));
                }

                onCloseWindow(win, () => {
                    done();
                }, 50);

                closeButton.click();
            },

            run: `
                window.xprops.foo().then(function() {
                    zoid.getByTag('test-component2').renderIframeTo(window.parent, {

                        onEnter: function() {
                            return window.xprops.childEntered();
                        }
    
                    }, 'body');
                });
            `
        }, document.body);
    });

    it('should close a zoid renderToParent popup on click of the overlay close button', done => {

        testComponent.renderIframe({

            childEntered: () => {
                let closeButton = document.querySelector('.zoid-tag-test-component2 .zoid-close');

                if (!closeButton) {
                    return done(new Error(`Expected close button to be present`));
                }

                closeButton.click();
            },

            foo: () => done(),

            run: `
                var win;

                onWindowOpen().then(function(openedWindow) {
                    win = openedWindow;
                });

                zoid.getByTag('test-component2').renderPopupTo(window.parent, {

                    onEnter: function() {

                        var winClose = win.close;
                        win.close = function() {
                            winClose.apply(this, arguments);
                            window.xprops.foo();
                        };

                        return window.xprops.childEntered();
                    }

                });
            `
        }, document.body);
    });

    it('should focus a zoid renderToParent popup on click of the overlay', done => {
        done = once(done);

        testComponent.renderIframe({

            childEntered: () => {
                let overlayElement = document.querySelector('.zoid-tag-test-component2');

                if (!overlayElement) {
                    return done(new Error(`Expected overlay element to be present`));
                }

                overlayElement.click();
            },

            foo: () => done(),

            run: `
                var win;

                onWindowOpen().then(function(openedWindow) {
                    win = openedWindow;
                });

                zoid.getByTag('test-component2').renderPopupTo(window.parent, {

                    onEnter: function() {

                        win.focus = function() {
                            window.xprops.foo();
                        };

                        return window.xprops.childEntered();
                    }

                });
            `
        }, document.body);
    });
});
