import { onCloseWindow } from 'cross-domain-utils/src';
import { testComponent } from '../component';

describe('xcomponent actions', () => {

    it('should close an xcomponent popup', done => {

        testComponent.renderPopup({

            onEnter() {
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

            onEnter() {
                onCloseWindow(this.window, () => {
                    done();
                }, 50);

                this.close();
            }

        });
    });

    it('should focus an xcomponent popup', done => {

        testComponent.renderPopup({

            onEnter() {
                this.window.focus = done;
                this.focus();
            }

        });
    });
});
