
import { testComponent } from '../component';

describe('xcomponent render to parent', () => {

    it('should render a component to the parent as a lightbox', done => {

        testComponent.init({
            foo: done,

            run: `
                xcomponent.getByTag('test-component2').init({
                    onEnter: function() {
                        return window.xchild.props.foo();
                    }
                }).renderLightboxToParent();
            `
        }).renderIframe(document.body);
    });

    it('should render a component to the parent as a popup', done => {

        testComponent.init({
            foo: done,

            run: `
                xcomponent.getByTag('test-component2').init({
                    onEnter: function() {
                        return window.xchild.props.foo();
                    }
                }).renderPopupToParent();
            `
        }).renderIframe(document.body);
    });

    it('should render a component to the parent as an iframe', done => {

        testComponent.init({
            foo: done,

            run: `
                xcomponent.getByTag('test-component2').init({
                    onEnter: function() {
                        return window.xchild.props.foo();
                    }
                }).renderIframeToParent('body');
            `
        }).renderIframe(document.body);
    });

    it('should render a component to the parent as a lightbox and call a prop', done => {

        testComponent.init({
            foo: done,

            run: `
                xcomponent.getByTag('test-component2').init({
                    foo: function() {
                        window.xchild.props.foo();
                    },

                    run: 'window.xchild.props.foo();'

                }).renderLightboxToParent();
            `
        }).renderIframe(document.body);
    });

    it('should render a component to the parent as an iframe and call a prop', done => {

        testComponent.init({
            foo: done,

            run: `
                xcomponent.getByTag('test-component2').init({
                    foo: function() {
                        window.xchild.props.foo();
                    },

                    run: 'window.xchild.props.foo();'

                }).renderIframeToParent('body');
            `
        }).renderIframe(document.body);
    });


    it('should render a component to the parent as a popup and call a prop', done => {

        testComponent.init({
            foo: done,

            run: `
                xcomponent.getByTag('test-component2').init({
                    foo: function() {
                        window.xchild.props.foo();
                    },

                    run: 'window.xchild.props.foo();'

                }).renderPopupToParent();
            `
        }).renderIframe(document.body);
    });

    it('should render a component to the parent as a lightbox and close on enter', done => {

        testComponent.init({
            onClose: () => done(),

            run: `
                var comp2 = xcomponent.getByTag('test-component2').init({
                    onEnter: function() {
                        comp2.close();
                    },

                    onClose: function() {
                        window.xchild.close();
                    }
                });

                comp2.renderLightboxToParent();
            `
        }).renderIframe(document.body);
    });

    it('should close an xcomponent renderToParent lightbox on click of the overlay close button', done => {

        testComponent.init({
            childEntered() {
                document.querySelector('.xcomponent-close').click();
            },

            foo: () => done(),

            run: `
                xcomponent.getByTag('test-component2').init({

                    onEnter: function() {

                        var winClose = this.window.close;
                        this.window.close = function() {
                            winClose.apply(this, arguments);
                            window.xchild.props.foo();
                        };

                        return window.xchild.props.childEntered();
                    }

                }).renderLightboxToParent();
            `
        }).renderIframe(document.body);
    });

    it('should close an xcomponent renderToParent popup on click of the overlay close button', done => {

        testComponent.init({
            childEntered() {
                document.querySelector('.xcomponent-close').click();
            },

            foo: () => done(),

            run: `
                xcomponent.getByTag('test-component2').init({

                    onEnter: function() {

                        var winClose = this.window.close;
                        this.window.close = function() {
                            winClose.apply(this, arguments);
                            window.xchild.props.foo();
                        };

                        return window.xchild.props.childEntered();
                    }

                }).renderPopupToParent();
            `
        }).renderIframe(document.body);
    });

    it('should focus an xcomponent renderToParent popup on click of the overlay', done => {

        testComponent.init({

            childEntered() {
                document.querySelector('.xcomponent-focus').click();
            },

            foo: () => done(),

            run: `
                xcomponent.getByTag('test-component2').init({

                    onEnter: function() {

                        this.window.focus = function() {
                            window.xchild.props.foo();
                        };

                        return window.xchild.props.childEntered();
                    }

                }).renderPopupToParent();
            `
        }).renderIframe(document.body);
    });
});