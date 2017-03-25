
import { testComponent } from '../component';

describe('xcomponent actions', () => {

    it('should close an xcomponent popup', done => {

        testComponent.renderPopup({

            onRender() {
                let close = this.window.close;

                this.window.close = function() {
                    close.apply(this, arguments);
                    done();
                };

                this.close();
            }

        });
    });

    it('should close an xcomponent iframe', done => {

        testComponent.renderIframe({

            onRender() {
                let close = this.window.close;

                this.window.close = function() {
                    close.apply(this, arguments);
                    done();
                };

                this.close();
            }

        });
    });

    it('should focus an xcomponent popup', done => {

        testComponent.renderPopup({

            onRender() {
                this.window.focus = done;
                this.focus();
            }

        });
    });
});