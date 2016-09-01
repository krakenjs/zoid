
import { testComponent } from '../component';

describe('xcomponent templates and styles', () => {

    it('should focus an xcomponent popup on click of the overlay', done => {
        testComponent.init({

            onEnter() {

                this.window.focus = function() {
                    done();
                };

                document.querySelector('.xcomponent-overlay').click();
            }

        }).renderPopup();
    });

    it('should close an xcomponent popup on click of the overlay close button', done => {

        testComponent.init({

            onEnter() {
                let close = this.window.close;

                this.window.close = function() {
                    close.apply(this, arguments);
                    done();
                };

                document.querySelector('.xcomponent-close').click();
            }

        }).renderPopup();
    });


    it('should close an xcomponent lightbox on click of the overlay close button', done => {

        testComponent.init({

            onEnter() {
                let close = this.window.close;

                this.window.close = function() {
                    close.apply(this, arguments);
                    done();
                };

                document.querySelector('.xcomponent-close').click();
            }

        }).renderLightbox();
    });
});