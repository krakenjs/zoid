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

    it('should close a zoid popup even when win.close does not work', () => {
        return wrapPromise(({ expect }) => {
            let win;
            let closeComponent;

            window.__component__ = () => {
                return window.zoid.create({
                    tag:               'test-container-close-popup-from-child',
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
                const winClose = win.close;
                win.close = expect('close', () => {
                    win.close = winClose;
                });
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

    it('should close a zoid iframe using the helper', () => {
        return wrapPromise(({ expect }) => {
            let win;

            window.__component__ = () => {
                return window.zoid.create({
                    tag:               'test-container-helper-close-iframe',
                    url:               '/base/test/windows/child/index.htm',
                    domain:            'mock://www.child.com'
                });
            };

            onWindowOpen().then(expect('onWindowOpen', openedWindow => {
                win = openedWindow;
            }));

            const component = window.__component__();
            const instance = component();
            return instance.render(document.body, window.zoid.CONTEXT.IFRAME).then(() => {
                onCloseWindow(win, expect('onCloseWindow'), 50);
                return instance.close();
            });
        });
    });

    it('should focus a zoid popup using the helper', () => {
        return wrapPromise(({ expect }) => {
            let win;

            window.__component__ = () => {
                return window.zoid.create({
                    tag:               'test-container-helper-focus-popup',
                    url:               '/base/test/windows/child/index.htm',
                    domain:            'mock://www.child.com'
                });
            };

            onWindowOpen().then(expect('onWindowOpen', openedWindow => {
                win = openedWindow;
            }));

            const component = window.__component__();
            const instance = component();
            return instance.render(document.body, window.zoid.CONTEXT.POPUP).then(() => {
                win.focus = expect('windowFocus');
                return instance.focus();
            });
        });
    });
});
