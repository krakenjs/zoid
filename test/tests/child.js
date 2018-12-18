/* @flow */

import { wrapPromise } from 'belter/src';
import { onCloseWindow } from 'cross-domain-utils/src';

import { onWindowOpen } from '../common';

describe('zoid child cases', () => {
    it('should render a popup component to an iframe and focus from the child', () => {

        return wrapPromise(({ expect }) => {
            window.__component__ = () => {
                return window.zoid.create({
                    tag:    'test-render-iframe-focus-from-child',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const component = window.__component__();
            return component({
                didFocus: expect('didFocus', (focused) => {
                    if (!focused) {
                        throw new Error(`Expected window to have been focused`);
                    }
                }),

                run: () => {
                    return `
                        let focused = false;
                        window.focus = () => {
                            focused = true;
                        };

                        window.xprops.focus().then(() => {
                            return window.xprops.didFocus(focused);
                        });
                    `;
                }
            }).render(document.body, window.zoid.CONTEXT.POPUP);
        });
    });

    it('should render a popup component to an iframe and close from the child', () => {

        return wrapPromise(({ expect }) => {
            window.__component__ = () => {
                return window.zoid.create({
                    tag:    'test-render-iframe-close-from-child',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            onWindowOpen().then(expect('onWindowOpen', win => {
                return onCloseWindow(win, expect('onCloseWindow'), 50);
            }));

            const component = window.__component__();
            return component({
                onClose: expect('onClose'),

                run: () => {
                    return `
                        window.xprops.close();
                    `;
                }
            }).render(document.body, window.zoid.CONTEXT.POPUP);
        }, { timeout: 5000 });
    });

    it('should render a popup component to an iframe and close from the child manually', () => {

        return wrapPromise(({ expect }) => {
            window.__component__ = () => {
                return window.zoid.create({
                    tag:    'test-render-iframe-close-manually-from-child',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            onWindowOpen().then(expect('onWindowOpen', win => {
                return onCloseWindow(win, expect('onCloseWindow'), 50);
            }));

            const component = window.__component__();
            return component({
                onClose: expect('onClose'),

                run: () => {
                    return `
                        window.close();
                    `;
                }
            }).render(document.body, window.zoid.CONTEXT.POPUP);
        }, { timeout: 5000 });
    });

    it('should pass an error up from the child', () => {
        return wrapPromise(({ expect }) => {
            const message = 'Something went wrong';
            const code = 'OH_NO';
            
            window.__component__ = () => {
                return window.zoid.create({
                    tag:    'test-render-iframe-error-from-child',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const component = window.__component__();
            return component({
                onError: expect('onError', err => {
                    if (!(err instanceof Error)) {
                        throw new TypeError(`Expected an error to be passed up`);
                    }

                    if (err.message !== message) {
                        throw new Error(`Expected error message to be ${ JSON.stringify(message) }, got ${ JSON.stringify(err.message) }`);
                    }

                    if (err.code !== code) {
                        throw new Error(`Expected error code to be ${ JSON.stringify(code) }, got ${ JSON.stringify(err.code) }`);
                    }
                }),

                run: () => {
                    return `
                        const err = new Error(${ JSON.stringify(message) });
                        err.code = ${ JSON.stringify(code) };
                        window.xprops.onError(err);
                    `;
                }
            }).render(document.body, window.zoid.CONTEXT.POPUP);
        });
    });
});
