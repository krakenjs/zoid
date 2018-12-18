/* @flow */
/* eslint max-nested-callbacks: off */

import { send } from 'post-robot/src';
import { uniqueID, wrapPromise } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';

describe('zoid window prop cases', () => {

    it('should pass a custom iframe to a component', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return window.zoid.create({
                    tag:    'test-render-custom-iframe',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const body = document.body;
            if (!body) {
                throw new Error(`Can not find body`);
            }

            const frame = document.createElement('iframe');
            body.appendChild(frame);
            const win = frame.contentWindow;
            const uid = uniqueID();
    
            const component = window.__component__();
            return component({
                window: win,
    
                passUIDGetter: expect(`passUIDGetter`, getUID => {
                    return send(win, 'eval', {
                        code: `
                            window.uid = ${ JSON.stringify(uid) };
                        `
                    }).then(() => {
                        return getUID();
                    }).then(childUID => {
                        if (childUID !== uid) {
                            throw new Error(`Expected uid to match`);
                        }
                    });
                }),
    
                run: `
                    window.xprops.passUIDGetter(() => window.uid);
                `
            }).render(document.body);
        });
    });

    it('should pass a custom popup to a component', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return window.zoid.create({
                    tag:    'test-render-custom-popup',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const win = window.open('', '');
            const uid = uniqueID();
    
            const component = window.__component__();
            return component({
                window: win,
    
                passUIDGetter: expect(`passUIDGetter`, getUID => {
                    return send(win, 'eval', {
                        code: `
                            window.uid = ${ JSON.stringify(uid) };
                        `
                    }).then(() => {
                        return getUID();
                    }).then(childUID => {
                        if (childUID !== uid) {
                            throw new Error(`Expected uid to match`);
                        }
                    });
                }),
    
                run: `
                    window.xprops.passUIDGetter(() => window.uid);
                `
            }).render(document.body);
        });
    });

    it('should renderTo with a custom iframe passed through an iframe', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return {
                    simple: window.zoid.create({
                        tag:    'test-renderto-custom-iframe-simple',
                        url:    'mock://www.child.com/base/test/windows/child/index.htm',
                        domain: 'mock://www.child.com'
                    }),

                    remote: window.zoid.create({
                        tag:    'test-renderto-custom-iframe-remote',
                        url:    'mock://www.child.com/base/test/windows/child/index.htm',
                        domain: 'mock://www.child.com'
                    })
                };
            };

            const body = document.body;
            if (!body) {
                throw new Error(`Can not find body`);
            }

            const frame = document.createElement('iframe');
            body.appendChild(frame);
            const win = frame.contentWindow;
            const uid = uniqueID();

            return window.__component__().simple({
                myCustomWindow: win,

                passUIDGetter: expect(`passUIDGetter`, getUID => {
                    return send(win, 'eval', {
                        code: `
                            window.uid = ${ JSON.stringify(uid) };
                        `
                    }).then(() => {
                        return getUID();
                    }).then(childUID => {
                        if (childUID !== uid) {
                            throw new Error(`Expected uid to match`);
                        }
                    });
                }),
    
                run: `
                    window.__component__().remote({
                        window: window.xprops.myCustomWindow,

                        passUIDGetter: window.xprops.passUIDGetter,
                        
                        run: \`
                            window.xprops.passUIDGetter(() => window.uid);
                        \`
                    }).renderTo(window.parent, 'body');
                `
            }).render(document.body);
        });
    });

    it('should renderTo with a custom popup passed through an iframe', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return {
                    simple: window.zoid.create({
                        tag:    'test-renderto-custom-popup-simple',
                        url:    'mock://www.child.com/base/test/windows/child/index.htm',
                        domain: 'mock://www.child.com'
                    }),

                    remote: window.zoid.create({
                        tag:    'test-renderto-custom-popup-remote',
                        url:    'mock://www.child.com/base/test/windows/child/index.htm',
                        domain: 'mock://www.child.com'
                    })
                };
            };

            const win = window.open('', '');
            const uid = uniqueID();

            return window.__component__().simple({
                myCustomWindow: win,

                passUIDGetter: expect(`passUIDGetter`, getUID => {
                    return send(win, 'eval', {
                        code: `
                            window.uid = ${ JSON.stringify(uid) };
                        `
                    }).then(() => {
                        return getUID();
                    }).then(childUID => {
                        if (childUID !== uid) {
                            throw new Error(`Expected uid to match`);
                        }
                    });
                }),
    
                run: `
                    window.__component__().remote({
                        window: window.xprops.myCustomWindow,

                        passUIDGetter: window.xprops.passUIDGetter,
                        
                        run: \`
                            window.xprops.passUIDGetter(() => window.uid);
                        \`
                    }).renderTo(window.parent, 'body');
                `
            }).render(document.body);
        });
    });

    it('should error when a non-window is passed', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return window.zoid.create({
                    tag:    'test-render-bogus-window',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const component = window.__component__();

            return ZalgoPromise.try(() => {
                component({
                    window: {
                        location: 'meep'
                    }
                });
            }).catch(expect('catch'));
        });
    });
});
