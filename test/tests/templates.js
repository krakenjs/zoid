
import postRobot from 'post-robot/src';

import { testComponent } from '../component';

let component;

afterEach(() => {
    if (component) {
        component.destroy();
        component = null;
    }
});

describe('xcomponent templates and styles', () => {

    it('should focus an xcomponent popup on click of the overlay', done => {
        component = testComponent.init({

            onEnter() {

                component.window.focus = function() {
                    done();
                };

                document.querySelector('.xcomponent-overlay').click();
            }

        });

        component.renderPopup();

        postRobot.once('init', () => 'attachTestComponent');
    });

    it('should close an xcomponent popup on click of the overlay close button', done => {

        component = testComponent.init({

            onEnter() {
                let close = component.window.close;

                component.window.close = function() {
                    close.apply(this, arguments);
                    done();
                };

                document.querySelector('.xcomponent-close').click();
            }

        });


        component.renderPopup();

        postRobot.once('init', () => 'attachTestComponent');
    });


    it('should close an xcomponent lightbox on click of the overlay close button', done => {

        component = testComponent.init({

            onEnter() {
                let close = component.window.close;

                component.window.close = function() {
                    close.apply(this, arguments);
                    done();
                };

                document.querySelector('.xcomponent-close').click();
            }

        });


        component.renderLightbox();

        postRobot.once('init', () => 'attachTestComponent');
    });
});