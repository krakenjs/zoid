/* @flow */
/** @jsx node */

import { ZalgoPromise } from 'zalgo-promise/src';
import { wrapPromise } from 'belter/src';
import { getParent, getOpener } from '@krakenjs/cross-domain-utils/src';
import { node, dom } from 'jsx-pragmatic/src';

import { onWindowOpen, runOnClick, getContainer, getBody } from '../common';
import { zoid } from '../zoid';

describe('zoid happy cases', () => {

    it('should render a component where the url is a function', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-url-function',
                    url:    () => 'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            onWindowOpen().then(expect('onWindowOpen', ({ win }) => {
                if (getParent(win) !== window) {
                    throw new Error(`Expected window parent to be current window`);
                }
            }));

            const component = window.__component__();
            return component({
                onRendered: expect('onRendered')
            }).render(getBody());
        });
    });

    it('should render a component with default context', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-default',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            onWindowOpen().then(expect('onWindowOpen', ({ win }) => {
                if (getParent(win) !== window) {
                    throw new Error(`Expected window parent to be current window`);
                }
            }));

            const component = window.__component__();
            return component({
                onRendered: expect('onRendered')
            }).render(getBody());
        });
    });

    it('should render a component with iframe context', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-iframe',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            onWindowOpen().then(expect('onWindowOpen', ({ win }) => {
                if (getParent(win) !== window) {
                    throw new Error(`Expected window parent to be current window`);
                }
            }));

            const component = window.__component__();
            return component({
                onRendered: expect('onRendered')
            }).render(getBody(), zoid.CONTEXT.IFRAME);
        });
    });

    it('should render a component with popup context', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-popup',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            onWindowOpen().then(expect('onWindowOpen', ({ win }) => {
                if (getOpener(win) !== window) {
                    throw new Error(`Expected window parent to be current window`);
                }
            }));

            const component = window.__component__();
            const instance = component({
                onRendered: expect('onRendered')
            });

            return runOnClick(() => {
                return instance.render(getBody(), zoid.CONTEXT.POPUP);
            });
        });
    });

    it('should render a component with popup context and no element', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:            'test-render-popup-no-element',
                    url:            'mock://www.child.com/base/test/windows/child/index.htm',
                    domain:         'mock://www.child.com',
                    defaultContext: 'popup'
                });
            };

            onWindowOpen().then(expect('onWindowOpen', ({ win }) => {
                if (getOpener(win) !== window) {
                    throw new Error(`Expected window parent to be current window`);
                }
            }));

            const component = window.__component__();
            const instance = component({
                onRendered: expect('onRendered')
            });

            return runOnClick(() => {
                return instance.render();
            });
        });
    });

    it('should render a component to a string element selector', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-string-selector',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            onWindowOpen().then(expect('onWindowOpen', ({ win }) => {
                if (getParent(win) !== window) {
                    throw new Error(`Expected window parent to be current window`);
                }
            }));

            const component = window.__component__();
            return component({
                onRendered: expect('onRendered')
            }).render('body');
        });
    });

    it('should enter a component rendered as an iframe and call a prop', () => {
        return wrapPromise(({ expect }) => {
            const expectedValue = 'bar';

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-iframe-with-prop',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const component = window.__component__();
            return component({

                foo: expect('foo', bar => {
                    if (bar !== expectedValue) {
                        throw new Error(`Expected bar to be ${ JSON.stringify(expectedValue) }, got ${ JSON.stringify(bar) }`);
                    }
                }),

                run: () => `
                    window.xprops.foo(${ JSON.stringify(expectedValue) });
                `
            }).render(getBody());
        });
    });

    it('should enter a component rendered as a popup and call a prop', () => {
        return wrapPromise(({ expect }) => {
            const expectedValue = 'bar';

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-popup-with-prop',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const component = window.__component__();
            const instance = component({

                foo: expect('foo', bar => {
                    if (bar !== expectedValue) {
                        throw new Error(`Expected bar to be ${ JSON.stringify(expectedValue) }, got ${ JSON.stringify(bar) }`);
                    }
                }),

                run: () => `
                    window.xprops.foo(${ JSON.stringify(expectedValue) });
                `
            });

            return runOnClick(() => {
                return instance.render(getBody(), zoid.CONTEXT.POPUP);
            });
        });
    });

    it('should render a component where the domain is a regex', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-domain-regex',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: /^mock:\/\/www\.child\.com$/
                });
            };

            onWindowOpen().then(expect('onWindowOpen', ({ win }) => {
                if (getParent(win) !== window) {
                    throw new Error(`Expected window parent to be current window`);
                }
            }));

            const component = window.__component__();
            return component({
                onRendered: expect('onRendered')
            }).render(getBody());
        });
    });

    it('should correctly identify the component as being the child', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-ischild',
                    url:    () => 'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const component = window.__component__();
            return component({
                isChildResult: expect('isChildResult', result => {
                    if (result !== true) {
                        throw new Error(`Expected result to be true`);
                    }
                }),
                run: () => {
                    return `
                        window.xprops.isChildResult(window.__component__().isChild());
                    `;
                }
            }).render(getBody());
        });
    });

    it('should correctly identify the component as not being the child', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-ischild-negative',
                    url:    () => 'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const component = window.__component__();
            return component({
                isChildResult: expect('isChildResult', result => {
                    if (result !== false) {
                        throw new Error(`Expected result to be false`);
                    }
                }),
                run: () => {
                    return `
                        const component = zoid.create({
                            tag:    'test-render-ischild-negative-second',
                            url:    () => 'mock://www.child.com/base/test/windows/child/index.htm',
                            domain: 'mock://www.child.com'
                        });

                        window.xprops.isChildResult(component.isChild());
                    `;
                }
            }).render(getBody());
        });
    });

    it('should enter a component rendered as an iframe inside another iframe and call a prop', () => {
        return wrapPromise(({ expect, avoid }) => {
            const expectedValue = 'bar';

            window.__component__ = () => {
                return zoid.create({
                    tag:               'test-render-iframe-in-iframe-with-prop',
                    url:               'mock://www.child.com/base/test/windows/child/index.htm',
                    domain:            'mock://www.child.com',
                    containerTemplate: ({ doc, frame, prerenderFrame }) => {
                        return (
                            <div>
                                <iframe>
                                    <html>
                                        <body>
                                            <node el={ frame } />
                                            <node el={ prerenderFrame } />
                                        </body>
                                    </html>
                                </iframe>
                            </div>
                        ).render(dom({ doc }));
                    }
                });
            };

            const component = window.__component__();

            return component({

                foo: expect('foo', bar => {
                    if (bar !== expectedValue) {
                        throw new Error(`Expected bar to be ${ JSON.stringify(expectedValue) }, got ${ JSON.stringify(bar) }`);
                    }
                }),

                onClose: avoid('onClose'),

                run: () => `
                    window.xprops.foo(${ JSON.stringify(expectedValue) });
                `
            }).render(getBody());
        });
    });

    it('should prerender to an iframe', () => {
        return wrapPromise(({ expect }) => {
            window.__component__ = () => {
                return zoid.create({
                    tag:               'test-render-prerender-iframe',
                    url:               'mock://www.child.com/base/test/windows/child/index.htm',
                    domain:            'mock://www.child.com',
                    prerenderTemplate: ({ doc }) => {
                        const html = doc.createElement('html');
                        const body = doc.createElement('body');
                        const script = doc.createElement('script');
                        script.text = `
                            window.parent.prerenderScriptLoaded();
                        `;
                        html.appendChild(body);
                        body.appendChild(script);
                        return html;
                    }
                });
            };

            window.prerenderScriptLoaded = expect('prerenderScriptLoaded');

            const component = window.__component__();
            return component().render(getBody());
        });
    });

    it('should prerender to a popup', () => {
        return wrapPromise(({ expect }) => {
            window.__component__ = () => {
                return zoid.create({
                    tag:               'test-render-prerender-popup',
                    url:               'mock://www.child.com/base/test/windows/child/index.htm',
                    domain:            'mock://www.child.com',
                    prerenderTemplate: ({ doc }) => {
                        const html = doc.createElement('html');
                        const body = doc.createElement('body');
                        const script = doc.createElement('script');
                        script.text = `
                            window.opener.prerenderScriptLoaded();
                        `;
                        html.appendChild(body);
                        body.appendChild(script);
                        return html;
                    }
                });
            };

            window.prerenderScriptLoaded = expect('prerenderScriptLoaded');

            const component = window.__component__();
            const instance = component();

            return runOnClick(() => {
                return instance.render(getBody(), zoid.CONTEXT.POPUP);
            });
        });
    });

    it('should render a component into the shadow dom', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-shadow-dom',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            onWindowOpen().then(expect('onWindowOpen', ({ win }) => {
                if (getParent(win) !== window) {
                    throw new Error(`Expected window parent to be current window`);
                }
            }));

            const { container, destroy } = getContainer({ shadow: true });

            const component = window.__component__();
            return component({
                onRendered: expect('onRendered', () => {
                    destroy();
                })
            }).render(container);
        });
    });

    it('should render a component into a nested shadow dom', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-nested-shadow-dom',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            onWindowOpen().then(expect('onWindowOpen', ({ win }) => {
                if (getParent(win) !== window) {
                    throw new Error(`Expected window parent to be current window`);
                }
            }));

            const { container, destroy } = getContainer({ shadow: true, nested: true });
            const component = window.__component__();
            return component({
                onRendered: expect('onRendered', () => {
                    destroy();
                })
            }).render(container);
        });
    });

    it('should render a component into the shadow dom with slots', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-shadow-dom-slots',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            onWindowOpen().then(expect('onWindowOpen', ({ win }) => {
                if (getParent(win) !== window) {
                    throw new Error(`Expected window parent to be current window`);
                }
            }));

            const { container, destroy } = getContainer({ shadow: true, slots: true });

            const component = window.__component__();
            return component({
                onRendered: expect('onRendered', () => {
                    destroy();
                })
            }).render(container);
        });
    });

    it('should render a component with iframe context', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-iframe-window-name',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            onWindowOpen().then(expect('onWindowOpen', ({ win, iframe }) => {
                if (!iframe) {
                    throw new Error(`Expected iframe to be opened`);
                }

                const { element } = iframe;
                const name = element.getAttribute('name');

                if (!name || name === 'about:blank' || name.indexOf('__zoid__') !== 0) {
                    throw new Error(`Expected window name to be set when calling window.open`);
                }

                if (getParent(win) !== window) {
                    throw new Error(`Expected window parent to be current window`);
                }
            }));

            const component = window.__component__();
            return component({
                onRendered: expect('onRendered')
            }).render(getBody(), zoid.CONTEXT.IFRAME);
        });
    });

    it('should render a component with popup context', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-popup-window-name',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            onWindowOpen().then(expect('onWindowOpen', ({ win, popup }) => {
                if (!popup) {
                    throw new Error(`Expected popup to be rendered`);
                }

                const { args } = popup;
                const [ , name ] = args;

                if (!name || name === 'about:blank' || name.indexOf('__zoid__') !== 0) {
                    throw new Error(`Expected window name to be set when calling window.open`);
                }

                if (getOpener(win) !== window) {
                    throw new Error(`Expected window parent to be current window`);
                }
            }));

            const component = window.__component__();
            const instance = component({
                onRendered: expect('onRendered')
            });

            return runOnClick(() => {
                return instance.render(getBody(), zoid.CONTEXT.POPUP);
            });
        });
    });

    it('should enter a component rendered as an iframe and call a promise prop', () => {
        return wrapPromise(({ expect }) => {
            const expectedValue = 'bar';

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-iframe-with-promise-prop',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const component = window.__component__();
            return component({

                foo: ZalgoPromise.resolve(expect('foo', bar => {
                    if (bar !== expectedValue) {
                        throw new Error(`Expected bar to be ${ JSON.stringify(expectedValue) }, got ${ JSON.stringify(bar) }`);
                    }
                })),

                run: () => `
                    window.xprops.foo(${ JSON.stringify(expectedValue) });
                `
            }).render(getBody());
        });
    });

    it('should enter a component rendered as a popup and call a promise prop', () => {
        return wrapPromise(({ expect }) => {
            const expectedValue = 'bar';

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-popup-with-promise-prop',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const component = window.__component__();
            const instance = component({

                foo: ZalgoPromise.resolve(expect('foo', bar => {
                    if (bar !== expectedValue) {
                        throw new Error(`Expected bar to be ${ JSON.stringify(expectedValue) }, got ${ JSON.stringify(bar) }`);
                    }
                })),

                run: () => `
                    window.xprops.foo(${ JSON.stringify(expectedValue) });
                `
            });

            return runOnClick(() => {
                return instance.render(getBody(), zoid.CONTEXT.POPUP);
            });
        });
    });

    it('should render an iframe component on the same domain and call a prop', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-iframe-samedomain',
                    url:    'mock://www.parent.com/base/test/windows/child/index.htm?mockDomain=mock://www.parent.com&firstLoad',
                    domain: 'mock://www.parent.com'
                });
            };

            const component = window.__component__();
            return component({
                callProp:  expect('callProp', mockDomain => {
                    if (mockDomain !== 'mock://www.parent.com') {
                        throw new Error(`Expected domain to be 'mock://www.parent.com', got '${ mockDomain }'`);
                    }
                }),

                run: () => `
                    window.xprops.callProp(window.mockDomain);
                `
            }).render(getBody());
        });
    });

    it('should render a popup component on the same domain and call a prop', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-popup-samedomain',
                    url:    'mock://www.parent.com/base/test/windows/child/index.htm?mockDomain=mock://www.parent.com&firstLoad',
                    domain: 'mock://www.parent.com'
                });
            };

            const component = window.__component__();
            const instance = component({
                callProp:  expect('callProp', mockDomain => {
                    if (mockDomain !== 'mock://www.parent.com') {
                        throw new Error(`Expected domain to be 'mock://www.parent.com', got '${ mockDomain }'`);
                    }
                }),

                run: () => `
                    window.xprops.callProp(window.mockDomain);
                `
            });

            return runOnClick(() => {
                return instance.render(getBody(), zoid.CONTEXT.POPUP);
            });
        });
    });

    it('should render an iframe component, change url, and complete', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-iframe-url-change',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm?firstLoad',
                    domain: 'mock://www.child.com'
                });
            };

            const component = window.__component__();
            return component({
                firstLoad:  expect('firstLoad'),
                secondLoad: expect('secondLoad'),

                run: () => `
                    if (location.href.indexOf('firstLoad') !== -1) {
                        window.xprops.firstLoad().then(() => {
                            window.location = '/base/test/windows/child/index.htm?secondLoad';
                        });
                    }

                    if (location.href.indexOf('secondLoad') !== -1) {
                        window.xprops.secondLoad();
                    }
                `
            }).render(getBody());
        });
    });

    it('should render a popup component, change url, and complete', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-popup-url-change',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm?firstLoad',
                    domain: 'mock://www.child.com'
                });
            };

            const component = window.__component__();
            const instance = component({
                firstLoad:  expect('firstLoad'),
                secondLoad: expect('secondLoad'),

                run: () => `
                    if (location.href.indexOf('firstLoad') !== -1) {
                        window.xprops.firstLoad().then(() => {
                            window.location = '/base/test/windows/child/index.htm?secondLoad';
                        });
                    }

                    if (location.href.indexOf('secondLoad') !== -1) {
                        window.xprops.secondLoad();
                    }
                `
            });
            
            return runOnClick(() => {
                return instance.render(getBody(), zoid.CONTEXT.POPUP);
            });
        });
    });

    it('should render an iframe component on the same domain, change url, and complete', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-iframe-samedomain-url-change',
                    url:    'mock://www.parent.com/base/test/windows/child/index.htm?mockDomain=mock://www.parent.com&firstLoad',
                    domain: 'mock://www.parent.com'
                });
            };

            const component = window.__component__();
            return component({
                firstLoad:  expect('firstLoad'),
                secondLoad: expect('secondLoad'),

                run: () => `
                    if (location.href.indexOf('firstLoad') !== -1) {
                        window.xprops.firstLoad().then(() => {
                            window.location = '/base/test/windows/child/index.htm?mockDomain=mock://www.parent.com&secondLoad';
                        });
                    }

                    if (location.href.indexOf('secondLoad') !== -1) {
                        window.xprops.secondLoad();
                    }
                `
            }).render(getBody());
        });
    });

    it('should render a popup component on the same domain, change url, and complete', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-popup-samedomain-url-change',
                    url:    'mock://www.parent.com/base/test/windows/child/index.htm?mockDomain=mock://www.parent.com&firstLoad',
                    domain: 'mock://www.parent.com'
                });
            };

            const component = window.__component__();
            const instance = component({
                firstLoad:  expect('firstLoad'),
                secondLoad: expect('secondLoad'),

                run: () => `
                    if (location.href.indexOf('firstLoad') !== -1) {
                        window.xprops.firstLoad().then(() => {
                            window.location = '/base/test/windows/child/index.htm?mockDomain=mock://www.parent.com&secondLoad';
                        });
                    }

                    if (location.href.indexOf('secondLoad') !== -1) {
                        window.xprops.secondLoad();
                    }
                `
            });
            
            return runOnClick(() => {
                return instance.render(getBody(), zoid.CONTEXT.POPUP);
            });
        });
    });

    it('should render an iframe component, change url to a different domain, and complete', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-iframe-url-change-diffdomain',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm?firstLoad',
                    domain: [ 'mock://www.child.com', 'mock://www.child-redirect.com' ]
                });
            };

            const component = window.__component__();
            return component({
                firstLoad:  expect('firstLoad'),
                secondLoad: expect('secondLoad'),

                run: () => `
                    if (location.href.indexOf('firstLoad') !== -1) {
                        window.xprops.firstLoad().then(() => {
                            window.location = '/base/test/windows/child/index.htm?mockDomain=mock://www.child-redirect.com&secondLoad';
                        });
                    }

                    if (location.href.indexOf('secondLoad') !== -1) {
                        window.xprops.secondLoad();
                    }
                `
            }).render(getBody());
        });
    });

    it('should render a popup component, change url to a different domain, and complete', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-popup-url-change-diffdomain',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm?firstLoad',
                    domain: [ 'mock://www.child.com', 'mock://www.child-redirect.com' ]
                });
            };

            const component = window.__component__();
            const instance = component({
                firstLoad:  expect('firstLoad'),
                secondLoad: expect('secondLoad'),

                run: () => `
                    if (location.href.indexOf('firstLoad') !== -1) {
                        window.xprops.firstLoad().then(() => {
                            window.location = '/base/test/windows/child/index.htm?mockDomain=mock://www.child-redirect.com&secondLoad';
                        });
                    }

                    if (location.href.indexOf('secondLoad') !== -1) {
                        window.xprops.secondLoad();
                    }
                `
            });
            
            return runOnClick(() => {
                return instance.render(getBody(), zoid.CONTEXT.POPUP);
            });
        });
    });

    it('should render an iframe component on the same domain, change url to a different domain, and complete', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-iframe-samedomain-url-change-diffdomain',
                    url:    'mock://www.parent.com/base/test/windows/child/index.htm?mockDomain=mock://www.parent.com&firstLoad',
                    domain: [ 'mock://www.parent.com', 'mock://www.child-redirect.com' ]
                });
            };

            const component = window.__component__();
            return component({
                firstLoad:  expect('firstLoad'),
                secondLoad: expect('secondLoad'),

                run: () => `
                    if (location.href.indexOf('firstLoad') !== -1) {
                        window.xprops.firstLoad().then(() => {
                            window.location = '/base/test/windows/child/index.htm?mockDomain=mock://www.child-redirect.com&secondLoad';
                        });
                    }

                    if (location.href.indexOf('secondLoad') !== -1) {
                        window.xprops.secondLoad();
                    }
                `
            }).render(getBody());
        });
    });

    it('should render a popup component on the same domain, change url to a different domain, and complete', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-popup-samedomain-url-change-diffdomain',
                    url:    'mock://www.parent.com/base/test/windows/child/index.htm?mockDomain=mock://www.parent.com&firstLoad',
                    domain: [ 'mock://www.parent.com', 'mock://www.child-redirect.com' ]
                });
            };

            const component = window.__component__();
            const instance = component({
                firstLoad:  expect('firstLoad'),
                secondLoad: expect('secondLoad'),

                run: () => `
                    if (location.href.indexOf('firstLoad') !== -1) {
                        window.xprops.firstLoad().then(() => {
                            window.location = '/base/test/windows/child/index.htm?mockDomain=mock://www.child-redirect.com&secondLoad';
                        });
                    }

                    if (location.href.indexOf('secondLoad') !== -1) {
                        window.xprops.secondLoad();
                    }
                `
            });
            
            return runOnClick(() => {
                return instance.render(getBody(), zoid.CONTEXT.POPUP);
            });
        });
    });
});
