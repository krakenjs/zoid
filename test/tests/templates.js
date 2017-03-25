
import { testComponent } from '../component';

describe('xcomponent templates and styles', () => {

    it('should focus an xcomponent popup on click of the overlay', done => {
        testComponent.renderPopup({

            onRender() {

                this.window.focus = function() {
                    done();
                };

                this.container.querySelector('.xcomponent-overlay').click();
            }

        });
    });

    it('should close an xcomponent popup on click of the overlay close button', done => {

        testComponent.renderPopup({

            onRender() {
                let close = this.window.close;

                this.window.close = function() {
                    close.apply(this, arguments);
                    done();
                };

                this.container.querySelector('.xcomponent-close').click();
            }

        });
    });


    it('should close an xcomponent iframe on click of the overlay close button', done => {

        testComponent.renderIframe({

            onRender() {
                let close = this.window.close;

                this.window.close = function() {
                    close.apply(this, arguments);
                    done();
                };

                this.container.querySelector('.xcomponent-close').click();
            }

        });
    });
});