/* @flow */

import { onCloseWindow } from 'cross-domain-utils/src';

import { testComponent } from '../component';

describe('zoid templates and styles', () => {

    it('should focus an zoid popup on click of the overlay', done => {
        testComponent.renderPopup({

            onEnter() {

                this.window.focus = () => {
                    done();
                };

                this.container.click();
            }

        });
    });

    it('should close an zoid popup on click of the overlay close button', done => {

        testComponent.renderPopup({

            onEnter() {
                let close = this.window.close;

                this.window.close = function windowClose() {
                    close.apply(this, arguments);
                    done();
                };

                this.container.querySelector('.zoid-close').click();
            }

        });
    });


    it('should close an zoid iframe on click of the overlay close button', done => {

        testComponent.renderIframe({

            onEnter() {
                onCloseWindow(this.window, () => {
                    done();
                }, 50);

                this.container.querySelector('.zoid-close').click();
            }

        }, document.body);
    });
});
