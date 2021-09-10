/* @flow */
/* eslint max-nested-callbacks: off */

import { send, once } from 'post-robot/src';
import { uniqueID, wrapPromise } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import { runOnClick, getBody } from '../common';
import { zoid } from '../zoid';

describe('zoid window prop cases', () => {

    it('should pass a custom iframe to a component', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-custom-iframe',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const body = getBody();
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
    
                run: () => `
                    window.xprops.passUIDGetter(() => window.uid);
                `
            }).render(getBody());
        });
    });

    it('should pass a custom iframe to a component, and close the zoid component', () => {
        return wrapPromise(() => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-custom-iframe-close',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const body = getBody();
            if (!body) {
                throw new Error(`Can not find body`);
            }

            const frame = document.createElement('iframe');
            body.appendChild(frame);
            const win = frame.contentWindow;
    
            const component = window.__component__();
            const instance = component({
                window: win
            });
            
            return instance.render(getBody()).then(() => {
                return instance.close();
            }).then(() => {
                if (!win.closed) {
                    throw new Error(`Expected iframe to be closed`);
                }

                if (body.contains(frame)) {
                    throw new Error(`Expected iframe to be removed from dom`);
                }
            });
        });
    });

    it('should pass a custom popup to a component', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-custom-popup',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const win = runOnClick(() => {
                return window.open('', '');
            });
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
    
                run: () => `
                    window.xprops.passUIDGetter(() => window.uid);
                `
            }).render(getBody());
        });
    });

    it('should pass a custom popup to a component, and close the zoid component', () => {
        return wrapPromise(() => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-custom-popup-close',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const win = runOnClick(() => {
                return window.open('', '');
            });
    
            const component = window.__component__();
            const instance = component({
                window: win
            });
            
            return instance.render(getBody()).then(() => {
                return instance.close();
            }).then(() => {
                if (!win.closed) {
                    throw new Error(`Expected popup to be closed`);
                }
            });
        });
    });

    it('should pass a custom popup to a component and close it', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-custom-close-popup',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const win = runOnClick(() => {
                return window.open('', '');
            });

            const component = window.__component__();
            return component({
                window: win,

                onClose: expect('onClose'),

                doClose: expect('doClose', () => {
                    win.close();
                }),

                run: () => `
                    window.xprops.doClose();
                `
            }).render(getBody());
        });
    });

    it('should pass a custom iframe to a component and close it', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-custom-close-iframe',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const body = getBody();
            if (!body) {
                throw new Error(`Can not find body`);
            }

            const frame = document.createElement('iframe');
            body.appendChild(frame);
            const win = frame.contentWindow;

            const component = window.__component__();
            return component({
                window: win,

                onClose: expect('onClose'),

                doClose: expect('doClose', () => {
                    body.removeChild(frame);
                }),

                run: () => `
                    window.xprops.doClose();
                `
            }).render(getBody());
        });
    });

    it('should renderTo with a custom iframe passed through an iframe', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return {
                    simple: zoid.create({
                        tag:    'test-renderto-custom-iframe-simple',
                        url:    'mock://www.child.com/base/test/windows/child/index.htm',
                        domain: 'mock://www.child.com'
                    }),

                    remote: zoid.create({
                        tag:    'test-renderto-custom-iframe-remote',
                        url:    'mock://www.child.com/base/test/windows/child/index.htm',
                        domain: 'mock://www.child.com'
                    })
                };
            };

            const body = getBody();
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
    
                run: () => `
                    window.__component__().remote({
                        window: window.xprops.myCustomWindow,

                        passUIDGetter: window.xprops.passUIDGetter,
                        
                        run: () => \`
                            window.xprops.passUIDGetter(() => window.uid);
                        \`
                    }).renderTo(window.parent, 'body');
                `
            }).render(getBody());
        });
    });

    it('should renderTo with a custom popup passed through an iframe', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return {
                    simple: zoid.create({
                        tag:    'test-renderto-custom-popup-simple',
                        url:    'mock://www.child.com/base/test/windows/child/index.htm',
                        domain: 'mock://www.child.com'
                    }),

                    remote: zoid.create({
                        tag:    'test-renderto-custom-popup-remote',
                        url:    'mock://www.child.com/base/test/windows/child/index.htm',
                        domain: 'mock://www.child.com'
                    })
                };
            };

            const win = runOnClick(() => {
                return window.open('', '');
            });
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
    
                run: () => `
                    window.__component__().remote({
                        window: window.xprops.myCustomWindow,

                        passUIDGetter: window.xprops.passUIDGetter,
                        
                        run: () => \`
                            window.xprops.passUIDGetter(() => window.uid);
                        \`
                    }).renderTo(window.parent, 'body');
                `
            }).render(getBody());
        });
    });

    it('should pass a custom popup to a component with a loaded url', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-custom-popup-loaded-url',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const win = runOnClick(() => {
                return window.open('/base/test/windows/basicchild/index.htm', '__custom_popup_test__');
            });

            return once('initBasicChild', expect('initBasicChild', () => {
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
        
                    run: () => `
                        window.xprops.passUIDGetter(() => window.uid);
                    `
                }).render(getBody());
            }));
        });
    });

    it('should renderTo with a custom popup passed through an iframe, and close the popup', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return {
                    simple: zoid.create({
                        tag:    'test-renderto-custom-popup-close-simple',
                        url:    'mock://www.child.com/base/test/windows/child/index.htm',
                        domain: 'mock://www.child.com'
                    }),

                    remote: zoid.create({
                        tag:    'test-renderto-custom-popup-close-remote',
                        url:    'mock://www.child.com/base/test/windows/child/index.htm',
                        domain: 'mock://www.child.com'
                    })
                };
            };

            const win = runOnClick(() => {
                return window.open('', '');
            });

            return window.__component__().simple({
                myCustomWindow: win,

                customWindowClosed: expect('customWindowClosed'),

                closeCustomWindow: expect('closeCustomWindow', () => {
                    win.close();
                }),

                run: () => `
                    window.__component__().remote({
                        window: window.xprops.myCustomWindow,
                        onClose: window.xprops.customWindowClosed,
                        closeCustomWindow: window.xprops.closeCustomWindow,
                        
                        run: () => \`
                            window.xprops.closeCustomWindow();
                        \`
                    }).renderTo(window.parent, 'body');
                `
            }).render(getBody());
        });
    });

    it('should error when a non-window is passed', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-bogus-window',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const component = window.__component__();

            return ZalgoPromise.try(() => {
                // $FlowFixMe
                component({
                    window: {
                        location: 'meep'
                    }
                });
            }).catch(expect('catch'));
        });
    });
});
