/* @flow */

import { onCloseWindow } from 'cross-domain-utils/src';

import { testComponent } from '../component';

describe('zoid actions', () => {

    it('should close a zoid popup', done => {

        testComponent.renderPopup({

            onEnter() {
                let close = this.window.close;

                this.window.close = function windowClose() {
                    close.apply(this, arguments);
                    done();
                };

                this.close();
            }

        });
    });

    it('should close a zoid iframe', done => {

        testComponent.renderIframe({

            onEnter() {
                onCloseWindow(this.window, () => {
                    done();
                }, 50);

                this.close();
            }

        }, document.body);
    });

    it('should focus a zoid popup', done => {

        testComponent.renderPopup({

            onEnter() {
                this.window.focus = done;
                this.focus();
            }

        });
    });
});
