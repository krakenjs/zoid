/* @flow */

import { onCloseWindow } from 'cross-domain-utils/src';

import { testComponent } from '../component';
import { onWindowOpen } from '../common';

describe('zoid templates and styles', () => {

    it('should focus a zoid popup on click of the overlay', done => {
        let win;

        onWindowOpen().then(openedWindow => {
            win = openedWindow;
        });

        testComponent.renderPopup({

            onEnter() {
                win.focus = () => {
                    done();
                };

                this.container.click();
            }
        });
    });

    it('should close a zoid popup on click of the overlay close button', done => {
        let win;

        onWindowOpen().then(openedWindow => {
            win = openedWindow;
        });

        testComponent.renderPopup({

            onEnter() {
                onCloseWindow(win, () => {
                    done();
                }, 50);

                this.container.querySelector('.zoid-close').click();
            }
        });
    });


    it('should close a zoid iframe on click of the overlay close button', done => {
        let win;

        onWindowOpen().then(openedWindow => {
            win = openedWindow;
        });

        testComponent.renderIframe({

            onEnter() {
                onCloseWindow(win, () => {
                    done();
                }, 50);

                this.container.querySelector('.zoid-close').click();
            }
        }, document.body);
    });
});
