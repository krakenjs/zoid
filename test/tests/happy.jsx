/* @flow */
/** @jsx node */

import { wrapPromise } from 'belter/src';
import { getParent, getOpener } from 'cross-domain-utils/src';
import { node, dom } from 'jsx-pragmatic/src';

import { onWindowOpen } from '../common';

describe('zoid happy cases', () => {

    it('should render a component where the url is a function', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return window.zoid.create({
                    tag:    'test-render-url-function',
                    url:    () => '/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            onWindowOpen().then(expect('onWindowOpen', win => {
                if (getParent(win) !== window) {
                    throw new Error(`Expected window parent to be current window`);
                }
            }));

            const component = window.__component__();
            return component({
                onRendered: expect('onRendered')
            }).render(document.body);
        });
    });

    it('should render a component with default context', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return window.zoid.create({
                    tag:    'test-render-default',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            onWindowOpen().then(expect('onWindowOpen', win => {
                if (getParent(win) !== window) {
                    throw new Error(`Expected window parent to be current window`);
                }
            }));

            const component = window.__component__();
            return component({
                onRendered: expect('onRendered')
            }).render(document.body);
        });
    });

    it('should render a component with iframe context', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return window.zoid.create({
                    tag:    'test-render-iframe',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            onWindowOpen().then(expect('onWindowOpen', win => {
                if (getParent(win) !== window) {
                    throw new Error(`Expected window parent to be current window`);
                }
            }));

            const component = window.__component__();
            return component({
                onRendered: expect('onRendered')
            }).render(document.body, window.zoid.CONTEXT.IFRAME);
        });
    });

    it('should render a component with popup context', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return window.zoid.create({
                    tag:    'test-render-popup',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            onWindowOpen().then(expect('onWindowOpen', win => {
                if (getOpener(win) !== window) {
                    throw new Error(`Expected window parent to be current window`);
                }
            }));

            const component = window.__component__();
            return component({
                onRendered: expect('onRendered')
            }).render(document.body, window.zoid.CONTEXT.POPUP);
        });
    });

    it('should render a component with popup context and no element', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return window.zoid.create({
                    tag:            'test-render-popup-no-element',
                    url:            'mock://www.child.com/base/test/windows/child/index.htm',
                    domain:         'mock://www.child.com',
                    defaultContext: 'popup'
                });
            };

            onWindowOpen().then(expect('onWindowOpen', win => {
                if (getOpener(win) !== window) {
                    throw new Error(`Expected window parent to be current window`);
                }
            }));

            const component = window.__component__();
            return component({
                onRendered: expect('onRendered')
            }).render();
        });
    });

    it('should render a component to a string element selector', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return window.zoid.create({
                    tag:    'test-render-string-selector',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            onWindowOpen().then(expect('onWindowOpen', win => {
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
                return window.zoid.create({
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
            }).render(document.body);
        });
    });

    it('should enter a component rendered as an iframe and call a prop', () => {
        return wrapPromise(({ expect }) => {
            const expectedValue = 'bar';

            window.__component__ = () => {
                return window.zoid.create({
                    tag:    'test-render-popup-with-prop',
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
            }).render(document.body, window.zoid.CONTEXT.POPUP);
        });
    });

    it('should render a component where the domain is a regex', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return window.zoid.create({
                    tag:    'test-render-domain-regex',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: /^mock:\/\/www\.child\.com$/
                });
            };

            onWindowOpen().then(expect('onWindowOpen', win => {
                if (getParent(win) !== window) {
                    throw new Error(`Expected window parent to be current window`);
                }
            }));

            const component = window.__component__();
            return component({
                onRendered: expect('onRendered')
            }).render(document.body);
        });
    });

    it('should correctly identify the component as being the child', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return window.zoid.create({
                    tag:    'test-render-ischild',
                    url:    () => '/base/test/windows/child/index.htm',
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
            }).render(document.body);
        });
    });

    it('should correctly identify the component as not being the child', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return window.zoid.create({
                    tag:    'test-render-ischild-negative',
                    url:    () => '/base/test/windows/child/index.htm',
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
                        const component = window.zoid.create({
                            tag:    'test-render-ischild-negative-second',
                            url:    () => '/base/test/windows/child/index.htm',
                            domain: 'mock://www.child.com'
                        });

                        window.xprops.isChildResult(component.isChild());
                    `;
                }
            }).render(document.body);
        });
    });

    it('should enter a component rendered as an iframe inside another iframe and call a prop', () => {
        return wrapPromise(({ expect, avoid }) => {
            const expectedValue = 'bar';

            window.__component__ = () => {
                return window.zoid.create({
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
            }).render(document.body);
        });
    });

    it('should prerender to an iframe', () => {
        return wrapPromise(({ expect }) => {
            window.__component__ = () => {
                return window.zoid.create({
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
            return component().render(document.body);
        });
    });

    it('should prerender to an iframe', () => {
        return wrapPromise(({ expect }) => {
            window.__component__ = () => {
                return window.zoid.create({
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
            return component().render(document.body, window.zoid.CONTEXT.POPUP);
        });
    });
});
