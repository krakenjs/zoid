/* @flow */

import { onCloseWindow } from 'cross-domain-utils/src';
import { once } from 'belter/src';

import { testComponent } from '../component';
import { onWindowOpen } from '../common';

describe('zoid actions', () => {

    it('should close a zoid iframe', done => {

        let win;
        let close;

        let originalContainerTemplate = testComponent.containerTemplate;
        testComponent.containerTemplate = ({ outlet, actions }) => {
            close = actions.close;
            testComponent.containerTemplate = originalContainerTemplate;
            return outlet;
        };

        onWindowOpen().then(openedWindow => {
            win = openedWindow;
        });

        testComponent.renderIframe({}, document.body).then(() => {
            onCloseWindow(win, () => {
                done();
            }, 50);
            close();
        });
    });

    it('should close a zoid popup', done => {

        let win;
        let close;

        let originalContainerTemplate = testComponent.containerTemplate;
        testComponent.containerTemplate = ({ outlet, actions }) => {
            close = actions.close;
            testComponent.containerTemplate = originalContainerTemplate;
            return outlet;
        };

        onWindowOpen().then(openedWindow => {
            win = openedWindow;
        });

        testComponent.renderPopup({}).then(() => {
            onCloseWindow(win, () => {
                done();
            }, 50);
            close();
        });
    });

    it('should focus a zoid popup', done => {
        done = once(done);

        let win;
        let focus;

        let originalContainerTemplate = testComponent.containerTemplate;
        testComponent.containerTemplate = ({ outlet, actions }) => {
            focus = actions.focus;
            testComponent.containerTemplate = originalContainerTemplate;
            return outlet;
        };

        onWindowOpen().then(openedWindow => {
            win = openedWindow;
        });

        testComponent.renderPopup({}).then(() => {
            win.focus = done;
            focus();
        });
    });
});
