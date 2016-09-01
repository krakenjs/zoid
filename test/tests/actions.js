
import { testComponent } from '../component';

describe('xcomponent actions', () => {

    it('should close an xcomponent popup', done => {

        testComponent.init({

            onEnter() {
                let close = this.window.close;

                this.window.close = function() {
                    close.apply(this, arguments);
                    done();
                };

                this.close();
            }

        }).renderPopup();
    });

    it('should close an xcomponent lightbox', done => {

        testComponent.init({

            onEnter() {
                let close = this.window.close;

                this.window.close = function() {
                    close.apply(this, arguments);
                    done();
                };

                this.close();
            }

        }).renderLightbox();
    });

    it('should focus an xcomponent popup', done => {

        testComponent.init({

            onEnter() {
                this.window.focus = done;
                this.focus();
            }

        }).renderPopup();
    });
});