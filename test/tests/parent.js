
import postRobot from 'post-robot/src';

import { testComponent } from '../component';

let component;

afterEach(() => {
    if (component) {
        component.destroy();
        component = null;
    }
});

describe('xcomponent render to parent', () => {

    it('should render a component to the parent as a lightbox', done => {

        component = testComponent.init({
            foo: done
        });

        component.renderIframe(document.body);

        postRobot.once('init', () => 'renderTestComponent2ToParentLightbox');
    });

    it('should render a component to the parent as a popup', done => {

        component = testComponent.init({
            foo: done
        });

        component.renderIframe(document.body);

        postRobot.once('init', () => 'renderTestComponent2ToParentPopup');
    });

    it('should render a component to the parent as an iframe', done => {

        component = testComponent.init({
            foo: done
        });

        component.renderIframe(document.body);

        postRobot.once('init', () => 'renderTestComponent2ToParentIframe');
    });

    it('should render a component to the parent and call a prop', done => {

        component = testComponent.init({
            foo: done
        });

        component.renderIframe(document.body);

        postRobot.once('init', () => 'renderTestComponent2ToParentLightboxAndPassFoo');
    });

    it('should render a component to the parent as a lightbox and close on enter', done => {

        component = testComponent.init({
            onClose: done
        });

        component.renderIframe(document.body);

        postRobot.once('init', () => 'renderTestComponent2ToParentLightboxAndClose');
    });

    it('should close an xcomponent renderToParent popup on click of the overlay close button', done => {

        component = testComponent.init({
            childEntered() {
                document.querySelector('.xcomponent-close').click();
            },

            onClose: done
        });

        component.renderIframe(document.body);

        postRobot.once('init', () => 'renderTestComponent2ToParentLightbox');
    });

    it('should close an xcomponent renderToParent popup on click of the overlay close button', done => {

        component = testComponent.init({
            childEntered() {
                document.querySelector('.xcomponent-close').click();
            },

            onClose: done
        });

        component.renderIframe(document.body);

        postRobot.once('init', () => 'renderTestComponent2ToParentPopup');
    });

    it('should focus an xcomponent renderToParent popup on click of the overlay', done => {

        let win;

        component = testComponent.init({

            onEnter() {

                let open = window.open;

                window.open = function() {
                    win = open.apply(this, arguments);
                    return win;
                };
            },

            foo() {

                let focus = win.focus;
                win.focus = function() {
                    focus.apply(this, arguments);
                    done();
                };

                document.querySelector('.xcomponent-overlay').click();
            }
        });

        component.renderIframe(document.body);

        postRobot.once('init', () => 'renderTestComponent2ToParentPopup');
    });
});