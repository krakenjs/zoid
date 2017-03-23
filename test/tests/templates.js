
import { testComponent } from '../component';

describe('xcomponent templates and styles', () => {

    it('should focus an xcomponent popup on click of the overlay', done => {
        testComponent.renderPopup({

            onEnter() {

                this.window.focus = function() {
                    done();
                };

                this.containerFrame.contentDocument.querySelector('.xcomponent-overlay').click();
            }

        });
    });

    it('should close an xcomponent popup on click of the overlay close button', done => {

        testComponent.renderPopup({

            onEnter() {
                let close = this.window.close;

                this.window.close = function() {
                    close.apply(this, arguments);
                    done();
                };

                this.containerFrame.contentDocument.querySelector('.xcomponent-close').click();
            }

        });
    });


    it('should close an xcomponent lightbox on click of the overlay close button', done => {

        testComponent.renderLightbox({

            onEnter() {
                let close = this.window.close;

                this.window.close = function() {
                    close.apply(this, arguments);
                    done();
                };

                this.containerFrame.contentDocument.querySelector('.xcomponent-close').click();
            }

        });
    });
});