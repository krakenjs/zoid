/* @flow */
/** @jsx node */

import { onCloseWindow } from 'cross-domain-utils/src';
import { wrapPromise } from 'belter/src';
import { node, dom } from 'jsx-pragmatic/src';

import { onWindowOpen, runOnClick } from '../common';

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
                    containerTemplate: ({ doc, close, frame, prerenderFrame }) => {
                        closeComponent = close;

                        return (
                            <div>
                                <node el={ frame } />
                                <node el={ prerenderFrame } />
                            </div>
                        ).render(dom({ doc }));
                    }
                });
            };

            onWindowOpen().then(expect('onWindowOpen', ({ win: openedWindow }) => {
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
                    containerTemplate: ({ doc, close }) => {
                        closeComponent = close;

                        return (
                            <div />
                        ).render(dom({ doc }));
                    }
                });
            };

            onWindowOpen().then(expect('onWindowOpen', ({ win: openedWindow }) => {
                win = openedWindow;
            }));

            const component = window.__component__();
            const instance = component();

            return runOnClick(() => {
                return instance.render(document.body, window.zoid.CONTEXT.POPUP);
            }).then(() => {
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
                    containerTemplate: ({ doc, close }) => {
                        closeComponent = close;

                        return (
                            <div />
                        ).render(dom({ doc }));
                    }
                });
            };

            onWindowOpen().then(expect('onWindowOpen', ({ win: openedWindow }) => {
                win = openedWindow;
            }));

            const component = window.__component__();
            const instance = component();

            return runOnClick(() => {
                return instance.render(document.body, window.zoid.CONTEXT.POPUP);
            }).then(() => {
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
                    containerTemplate: ({ doc, focus }) => {
                        focusComponent = focus;

                        return (
                            <div />
                        ).render(dom({ doc }));
                    }
                });
            };

            onWindowOpen().then(expect('onWindowOpen', ({ win: openedWindow }) => {
                win = openedWindow;
            }));

            const component = window.__component__();
            const instance = component();

            return runOnClick(() => {
                return instance.render(document.body, window.zoid.CONTEXT.POPUP);
            }).then(() => {
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

            onWindowOpen().then(expect('onWindowOpen', ({ win: openedWindow }) => {
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

            onWindowOpen().then(expect('onWindowOpen', ({ win: openedWindow }) => {
                win = openedWindow;
            }));

            const component = window.__component__();
            const instance = component();

            return runOnClick(() => {
                return instance.render(document.body, window.zoid.CONTEXT.POPUP);
            }).then(() => {
                win.focus = expect('windowFocus');
                return instance.focus();
            });
        });
    });
});
