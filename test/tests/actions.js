
import postRobot from 'post-robot/src';

import { testComponent } from '../component';

let component;

afterEach(() => {
    if (component) {
        component.destroy();
        component = null;
    }
});

describe('xcomponent actions', () => {

    it('should close an xcomponent popup', done => {

        component = testComponent.init({

            onEnter() {
                let close = component.window.close;

                component.window.close = function() {
                    close.apply(this, arguments);
                    done();
                };

                component.close();
            }

        });

        component.renderPopup();

        postRobot.once('init', () => 'attachTestComponent');
    });

    it('should close an xcomponent lightbox', done => {

        component = testComponent.init({

            onEnter() {
                let close = component.window.close;

                component.window.close = function() {
                    close.apply(this, arguments);
                    done();
                };

                component.close();
            }

        });


        component.renderLightbox();

        postRobot.once('init', () => 'attachTestComponent');
    });

    it('should focus an xcomponent popup', done => {

        component = testComponent.init({

            onEnter() {
                component.window.focus = done;
                component.focus();
            }

        });


        component.renderPopup();

        postRobot.once('init', () => 'attachTestComponent');
    });
});