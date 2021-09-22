/* @flow */

import { wrapPromise } from 'belter/src';
import { onCloseWindow } from 'cross-domain-utils/src';

import { zoid } from '../zoid';
import { onWindowOpen, runOnClick, getBody } from '../common';

describe('zoid child cases', () => {
    it('should render a popup component to an iframe and focus from the child', () => {

        return wrapPromise(({ expect }) => {
            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-iframe-focus-from-child',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain:'mock://www.child.com'
                });
            };

            const component = window.__component__();
            const instance = component({
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
            });

            return runOnClick(() => {
                return instance.render(getBody(), zoid.CONTEXT.POPUP);
            });
        });
    });

    it('should render a popup component to an iframe and close from the child', () => {

        return wrapPromise(({ expect }) => {
            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-iframe-close-from-child',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain:'mock://www.child.com'
                });
            };

            onWindowOpen().then(expect('onWindowOpen', ({ win }) => {
                return onCloseWindow(win, expect('onCloseWindow'), 50);
            }));

            const component = window.__component__();
            const instance = component({
                onClose: expect('onClose'),

                run: () => {
                    return `
                        window.xprops.close();
                    `;
                }
            });

            return runOnClick(() => {
                return instance.render(getBody(), zoid.CONTEXT.POPUP);
            });
        }, { timeout: 5000 });
    });

    it('should render a popup component to an iframe and close from the child manually', () => {

        return wrapPromise(({ expect }) => {
            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-iframe-close-manually-from-child',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain:'mock://www.child.com'
                });
            };

            onWindowOpen().then(expect('onWindowOpen', ({ win }) => {
                return onCloseWindow(win, expect('onCloseWindow'), 50);
            }));

            const component = window.__component__();
            const instance = component({
                onClose: expect('onClose'),

                run: () => {
                    return `
                        window.close();
                    `;
                }
            });

            return runOnClick(() => {
                return instance.render(getBody(), zoid.CONTEXT.POPUP);
            });
        }, { timeout: 5000 });
    });

    it('should pass an error up from the child', () => {
        return wrapPromise(({ expect }) => {
            const message = 'Something went wrong';
            const code = 'OH_NO';
            
            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-iframe-error-from-child',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain:'mock://www.child.com'
                });
            };

            const component = window.__component__();
            const instance = component({
                onError: expect('onError', err => {
                    if (!(err instanceof Error)) {
                        throw new TypeError(`Expected an error to be passed up`);
                    }

                    if (err.message !== message) {
                        throw new Error(`Expected error message to be ${ JSON.stringify(message) }, got ${ JSON.stringify(err.message) }`);
                    }

                    // $FlowFixMe
                    const errCode = err.code;
                    
                    if (errCode !== code) {
                        throw new Error(`Expected error code to be ${ JSON.stringify(code) }, got ${ JSON.stringify(errCode) }`);
                    }
                }),

                run: () => {
                    return `
                        const err = new Error(${ JSON.stringify(message) });
                        err.code = ${ JSON.stringify(code) };
                        window.xprops.onError(err);
                    `;
                }
            });

            return runOnClick(() => {
                return instance.render(getBody(), zoid.CONTEXT.POPUP);
            });
        });
    });
});
