/* @flow */

import { onCloseWindow } from 'cross-domain-utils/src';
import { wrapPromise } from 'belter/src';

import { onWindowOpen } from '../common';

describe('zoid actions', () => {

    it('should close a zoid iframe', () => {
        return wrapPromise(({ expect }) => {
            let win;
            let closeComponent;

            window.__component__ = () => {
                return window.zoid.create({
                    tag:               'test-container-close-iframe',
                    url:               '/base/test/windows/child/index.htm',
                    domain:            'mock://www.child.com',
                    containerTemplate: ({ close, outlet }) => {
                        closeComponent = close;
                        return outlet;
                    }
                });
            };

            onWindowOpen().then(expect('onWindowOpen', openedWindow => {
                win = openedWindow;
            }));

            const component = window.__component__();
            return component().render(document.body, window.zoid.CONTEXT.IFRAME).then(() => {
                onCloseWindow(win, expect('onCloseWindow'), 50);
                return closeComponent();
            });
        });
    });

    it('should close a zoid popup', () => {
        return wrapPromise(({ expect }) => {
            let win;
            let closeComponent;

            window.__component__ = () => {
                return window.zoid.create({
                    tag:               'test-container-close-popup',
                    url:               '/base/test/windows/child/index.htm',
                    domain:            'mock://www.child.com',
                    containerTemplate: ({ close, outlet }) => {
                        closeComponent = close;
                        return outlet;
                    }
                });
            };

            onWindowOpen().then(expect('onWindowOpen', openedWindow => {
                win = openedWindow;
            }));

            const component = window.__component__();
            return component().render(document.body, window.zoid.CONTEXT.POPUP).then(() => {
                onCloseWindow(win, expect('onCloseWindow'), 50);
                return closeComponent();
            });
        });
    });

    it('should focus a zoid popup', () => {
        return wrapPromise(({ expect }) => {
            let win;
            let focusComponent;

            window.__component__ = () => {
                return window.zoid.create({
                    tag:               'test-container-focus-popup',
                    url:               '/base/test/windows/child/index.htm',
                    domain:            'mock://www.child.com',
                    containerTemplate: ({ focus, outlet }) => {
                        focusComponent = focus;
                        return outlet;
                    }
                });
            };

            onWindowOpen().then(expect('onWindowOpen', openedWindow => {
                win = openedWindow;
            }));

            const component = window.__component__();
            return component().render(document.body, window.zoid.CONTEXT.POPUP).then(() => {
                win.focus = expect('windowFocus');
                return focusComponent();
            });
        });
    });
});
