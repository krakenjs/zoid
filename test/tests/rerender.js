/* @flow */
/** @jsx node */

import { ZalgoPromise } from 'zalgo-promise/src';
import { wrapPromise } from 'belter/src';

import { getBody } from '../common';
import { zoid } from '../zoid';

describe('zoid rerender cases', () => {

    it('should re-render a component when the container is removed and immediately re-added to the dom', () => {
        return wrapPromise(({ expect, avoid }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:     'test-rerender',
                    url:     'mock://www.child.com/base/test/windows/child/index.htm',
                    domain:  'mock://www.child.com',
                    exports: ({ getExports }) => {
                        return {
                            exec: (...args) => {
                                return getExports().then(exports => {
                                    return exports.exec(...args);
                                });
                            }
                        };
                    }
                });
            };

            const container = document.createElement('div');
            getBody().appendChild(container);

            const component = window.__component__();
            const instance = component({
                onRendered: expect('onRendered'),
                onClose:    avoid('onClose'),
                onDestroy:  avoid('onDestroy'),
                onError:    avoid('onError'),
                foo:        expect('foo'),
                run:        () => `
                    window.xprops.export({
                        exec: (code) => eval(code)
                    });
                `
            });

            return instance.render(container).then(() => {
                return ZalgoPromise.delay(50);
            }).then(() => {
                getBody().removeChild(container);
                getBody().appendChild(container);
            }).then(() => {
                return ZalgoPromise.delay(50);
            }).then(() => {
                instance.exec(`
                    window.xprops.foo();
                `);
            });
        });
    });

    it('should re-render a component when the container is removed and immediately re-added to the dom during render', () => {
        return wrapPromise(({ expect, avoid }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:     'test-rerender-during-render',
                    url:     'mock://www.child.com/base/test/windows/child/index.htm',
                    domain:  'mock://www.child.com',
                    exports: ({ getExports }) => {
                        return {
                            exec: (...args) => {
                                return getExports().then(exports => {
                                    return exports.exec(...args);
                                });
                            }
                        };
                    }
                });
            };

            const container = document.createElement('div');
            getBody().appendChild(container);

            const component = window.__component__();
            const instance = component({
                onRendered: expect('onRendered'),
                onClose:    avoid('onClose'),
                onDestroy:  avoid('onDestroy'),
                onError:    avoid('onError'),
                foo:        expect('foo'),
                run:        () => `
                    window.xprops.export({
                        exec: (code) => eval(code)
                    });
                `
            });

            const renderPromise = instance.render(container);
            getBody().removeChild(container);
            getBody().appendChild(container);

            return renderPromise.then(() => {
                return ZalgoPromise.delay(50);
            }).then(() => {
                instance.exec(`
                    window.xprops.foo();
                `);
            });
        });
    });

    it('should render a component to the parent as an iframe and re-render when the container is removed and immediately re-added to the dom', () => {
        return wrapPromise(({ expect, avoid }) => {

            window.__component__ = () => {
                return {
                    simple: zoid.create({
                        tag:    'test-rerender-renderto-iframe-simple',
                        url:    'mock://www.child.com/base/test/windows/child/index.htm',
                        domain: 'mock://www.child.com'
                    }),

                    remote: zoid.create({
                        tag:     'test-rerender-renderto-iframe-remote',
                        url:     'mock://www.child.com/base/test/windows/child/index.htm',
                        domain:  'mock://www.child.com',
                        exports: ({ getExports }) => {
                            return {
                                exec: (...args) => {
                                    return getExports().then(exports => {
                                        return exports.exec(...args);
                                    });
                                }
                            };
                        }
                    })
                };
            };

            const container = document.createElement('div');
            container.id = 'remote-element-id';
            getBody().appendChild(container);

            return window.__component__().simple({
                onRendered: expect('onRendered'),
                onClose:    avoid('onClose'),
                onDestroy:  avoid('onDestroy'),
                onError:    avoid('onError'),
                foo:        expect('foo'),
                delay:      ZalgoPromise.delay,
                rerender:   () => {
                    getBody().removeChild(container);
                    getBody().appendChild(container);
                },

                run: () => {
                    return `
                        const instance = window.__component__().remote({
                            foo: window.xprops.foo,
                            run: () => \`
                                window.xprops.export({
                                    exec: (code) => eval(code)
                                });
                            \`
                        });
                        
                        instance.renderTo(window.parent, '#remote-element-id').then(() => {
                            return window.xprops.delay(50);
                        }).then(() => {
                            return window.xprops.rerender();
                        }).then(() => {
                            return window.xprops.delay(50);
                        }).then(() => {
                            return instance.exec(\`
                                window.xprops.foo();
                            \`);
                        }).catch(window.xprops.onError);
                    `;
                }
            }).render(getBody());
        });
    });

    it('should render a component to the parent as an iframe and re-render when the container is removed and immediately re-added to the dom during render', () => {
        return wrapPromise(({ expect, avoid }) => {

            window.__component__ = () => {
                return {
                    simple: zoid.create({
                        tag:    'test-rerender-during-render-renderto-iframe-simple',
                        url:    'mock://www.child.com/base/test/windows/child/index.htm',
                        domain: 'mock://www.child.com'
                    }),

                    remote: zoid.create({
                        tag:     'test-rerender-during-render-renderto-iframe-remote',
                        url:     'mock://www.child.com/base/test/windows/child/index.htm',
                        domain:  'mock://www.child.com',
                        exports: ({ getExports }) => {
                            return {
                                exec: (...args) => {
                                    return getExports().then(exports => {
                                        return exports.exec(...args);
                                    });
                                }
                            };
                        }
                    })
                };
            };

            const container = document.createElement('div');
            container.id = 'remote-element-id';
            getBody().appendChild(container);

            return window.__component__().simple({
                onRendered: expect('onRendered'),
                onClose:    avoid('onClose'),
                onDestroy:  avoid('onDestroy'),
                onError:    avoid('onError'),
                foo:        expect('foo'),
                delay:      ZalgoPromise.delay,
                rerender:   () => {
                    getBody().removeChild(container);
                    getBody().appendChild(container);
                },

                run: () => {
                    return `
                        const instance = window.__component__().remote({
                            foo: window.xprops.foo,
                            run: () => \`
                                window.xprops.export({
                                    exec: (code) => eval(code)
                                });
                            \`
                        });

                        const renderPromise = instance.renderTo(window.parent, '#remote-element-id');

                        return window.xprops.rerender().then(() => {
                            return renderPromise;
                        }).then(() => {
                            return window.xprops.delay(500);
                        }).then(() => {
                            return instance.exec(\`
                                window.xprops.foo();
                            \`);
                        }).catch(window.xprops.onError);
                    `;
                }
            }).render(getBody());
        });
    });
});
