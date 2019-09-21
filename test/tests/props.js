/* @flow */
/* eslint max-lines: off */

import { wrapPromise, noop, parseQuery, destroyElement } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import { onWindowOpen } from '../common';

describe('zoid props cases', () => {

    it('should enter a component, update a prop, and call a prop', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return window.zoid.create({
                    tag:    'test-update-prop',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const component = window.__component__();
            const instance = component({
                run: `
                    window.xprops.onProps(function() {
                        window.xprops.foo('bar');
                    });
                `
            });
            
            instance.render(document.body).then(expect('postRender', () => {
    
                instance.updateProps({
                    foo: expect('foo', bar => {
                        if (bar !== 'bar') {
                            throw new Error(`Expected bar to be 'bar', got ${ bar }`);
                        }
                    })
                });
            }));
        });
    });

    it('should enter a component, update a prop, and call a different prop', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return window.zoid.create({
                    tag:    'test-update-different-prop',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const component = window.__component__();
            const instance = component({
                foo: expect('foo', bar => {
                    if (bar !== 'bar') {
                        throw new Error(`Expected bar to be 'bar', got ${ bar }`);
                    }
                }),

                run: `
                    window.xprops.onProps(function() {
                        window.xprops.foo('bar');
                    });
                `
            });
            
            instance.render(document.body).then(expect('postRender', () => {
    
                instance.updateProps({
                    bar: 'helloworld'
                });
            }));
        });
    });

    it('should enter a component, decorate a prop, update a prop, and call a different prop', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return window.zoid.create({
                    tag:    'test-update-decorated-different-prop',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com',

                    props: {
                        baz: {
                            type:     'function',
                            required: false,
                            decorate: ({ props }) => {
                                return () => {
                                    if (!props.foo) {
                                        throw new Error(`Expected props.foo to be defined`);
                                    }

                                    return props.foo('bar');
                                };
                            }
                        }
                    }
                });
            };

            const component = window.__component__();
            const instance = component({
                foo: expect('foo', bar => {
                    if (bar !== 'bar') {
                        throw new Error(`Expected bar to be 'bar', got ${ bar }`);
                    }
                }),

                run: `
                    window.xprops.onProps(function() {
                        window.xprops.baz('bar');
                    });
                `
            });
            
            instance.render(document.body).then(expect('postRender', () => {
    
                instance.updateProps({
                    baz: noop
                });
            }));
        });
    });

    it('should enter a component, update a prop with a default, then call the prop', () => {
        return wrapPromise(({ expect, error }) => {

            window.__component__ = () => {
                return window.zoid.create({
                    tag:    'test-update-default-prop',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com',
                    props:  {
                        meep: {
                            type:    'function',
                            default: () => {
                                return error('meepv1');
                            }
                        }
                    }
                });
            };

            const component = window.__component__();
            const instance = component({
                run: `
                    window.xprops.onProps(function() {
                        window.xprops.meep();
                    });
                `
            });
            
            return instance.render(document.body).then(expect('postRender', () => {
    
                instance.updateProps({
                    meep: expect('meepv2')
                });
            }));
        });
    });

    it('should enter a component, update a prop with a value, then call the prop', () => {
        return wrapPromise(({ expect, error }) => {
            let doExpect = false;

            window.__component__ = () => {
                return window.zoid.create({
                    tag:    'test-update-value-prop',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com',
                    props:  {
                        meep: {
                            type:    'function',
                            value: () => {
                                return doExpect ? expect('meepv1') : noop;
                            }
                        }
                    }
                });
            };

            const component = window.__component__();
            const instance = component({
                run: `
                    window.xprops.onProps(function() {
                        window.xprops.meep();
                    });
                `
            });
            
            return instance.render(document.body).then(expect('postRender', () => {
                doExpect = true;
    
                instance.updateProps({
                    meep: error('meepv2')
                });
            }));
        });
    });

    it('should enter a component and call back with a string prop', () => {
        return wrapPromise(({ expect }) => {
            const expectedResult = 'bar';

            window.__component__ = () => {
                return window.zoid.create({
                    tag:    'test-string-prop',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const component = window.__component__();
            return component({

                customProp: expectedResult,
    
                foo: expect('foo', bar => {
                    if (bar !== expectedResult) {
                        throw new Error(`Expected bar to be 'bar', got ${ bar }`);
                    }
                }),
    
                run: `
                    window.xprops.foo(window.xprops.customProp);
                `
            }).render(document.body);
        });
    });

    it('should enter a component and call back with a number prop', () => {
        return wrapPromise(({ expect }) => {
            const expectedResult = 123;

            window.__component__ = () => {
                return window.zoid.create({
                    tag:    'test-number-prop',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const component = window.__component__();
            return component({

                customProp: expectedResult,
    
                foo: expect('foo', bar => {
                    if (bar !== expectedResult) {
                        throw new Error(`Expected bar to be 'bar', got ${ bar }`);
                    }
                }),
    
                run: `
                    window.xprops.foo(window.xprops.customProp);
                `
            }).render(document.body);
        });
    });

    it('should enter a component and call back with a boolean prop', () => {
        return wrapPromise(({ expect }) => {
            const expectedResult = true;

            window.__component__ = () => {
                return window.zoid.create({
                    tag:    'test-boolean-prop',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const component = window.__component__();
            return component({

                customProp: expectedResult,
    
                foo: expect('foo', bar => {
                    if (bar !== expectedResult) {
                        throw new Error(`Expected bar to be 'bar', got ${ bar }`);
                    }
                }),
    
                run: `
                    window.xprops.foo(window.xprops.customProp);
                `
            }).render(document.body);
        });
    });

    it('should enter a component and call back with an array prop', () => {
        return wrapPromise(({ expect }) => {

            const expectedResult = [
                'bar',
                12345,
                {
                    bar: 'baz'
                },
                expect('fn')
            ];

            window.__component__ = () => {
                return window.zoid.create({
                    tag:    'test-array-prop',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const component = window.__component__();
            return component({

                objectProp: expectedResult,

                foo: expect('foo', (result) => {
                    if (result[0] !== expectedResult[0]) {
                        throw new Error(`Object ${ JSON.stringify(result) } does not match expected ${ JSON.stringify(expectedResult) }`);
                    }

                    if (result[1] !== expectedResult[1]) {
                        throw new Error(`Object ${ JSON.stringify(result) } does not match expected ${ JSON.stringify(expectedResult) }`);
                    }

                    if (result[2].bar !== expectedResult[2].bar) {
                        throw new Error(`Object ${ JSON.stringify(result) } does not match expected ${ JSON.stringify(expectedResult) }`);
                    }

                    if (typeof result[3] !== 'function') {
                        throw new TypeError(`Object ${ JSON.stringify(result) } does not match expected ${ JSON.stringify(expectedResult) }`);
                    }
                    
                    result[3]();
                }),

                run: `
                    window.xprops.foo(window.xprops.objectProp);
                `
            }).render(document.body);
        });
    });

    it('should enter a component and call back with an object prop', () => {
        return wrapPromise(({ expect }) => {

            const expectedResult = {
                foo: 'bar',
                x:   12345,
                fn:  expect('fn'),
                obj: {
                    bar: 'baz'
                }
            };

            window.__component__ = () => {
                return window.zoid.create({
                    tag:    'test-object-prop',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const component = window.__component__();
            return component({

                objectProp: expectedResult,

                foo: expect('foo', (result) => {
                    if (result.foo !== expectedResult.foo) {
                        throw new Error(`Object ${ JSON.stringify(result) } does not match expected ${ JSON.stringify(expectedResult) }`);
                    }

                    if (result.obj.bar !== expectedResult.obj.bar) {
                        throw new Error(`Object ${ JSON.stringify(result) } does not match expected ${ JSON.stringify(expectedResult) }`);
                    }

                    if (result.x !== expectedResult.x) {
                        throw new Error(`Object ${ JSON.stringify(result) } does not match expected ${ JSON.stringify(expectedResult) }`);
                    }

                    if (typeof result.fn !== 'function') {
                        throw new TypeError(`Object ${ JSON.stringify(result) } does not match expected ${ JSON.stringify(expectedResult) }`);
                    }
                    
                    result.fn();
                }),

                run: `
                    window.xprops.foo(window.xprops.objectProp);
                `
            }).render(document.body);
        });
    });

    it('should enter a component and call back with a function prop', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return window.zoid.create({
                    tag:    'test-function-prop',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const component = window.__component__();
            return component({

                functionProp: expect('functionProp'),

                foo: expect('foo', (fn) => {
                    if (typeof fn !== 'function') {
                        throw new TypeError(`Expected a function prop, got ${ typeof fn }`);
                    }
                    fn();
                }),

                run: `
                    window.xprops.foo(window.xprops.functionProp);
                `
            }).render(document.body);
        });
    });

    it('should error out if not passed a required prop', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return window.zoid.create({
                    tag:    'test-required-prop',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com',
                    props:  {
                        foo: {
                            type: 'string'
                        }
                    }
                });
            };

            const component = window.__component__();

            return ZalgoPromise.try(() => {
                component();
            }).catch(expect('catch'));
        });
    });

    it('should not pass a sameDomain prop to the child', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return window.zoid.create({
                    tag:    'test-samedomain-prop',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com',
                    props:  {
                        foo: {
                            type:       'string',
                            sameDomain: true
                        }
                    }
                });
            };

            const component = window.__component__();
            const instance = component({
                foo:      'bar',
                passProp: expect('passProp', (val) => {
                    if (val) {
                        throw new Error(`Expected val to not be passed`);
                    }
                }),
                run: `
                    window.xprops.passProp(window.xprops.foo);
                `
            });
            
            return instance.render(document.body);
        });
    });

    it('should pass a sameDomain prop and not have it populate on the child', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = (sameDomain = true) => {
                return window.zoid.create({
                    tag:    'test-samedomain-prop-passed',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com',
                    props:  {
                        foo: {
                            type:       'string',
                            sameDomain
                        }
                    }
                });
            };

            const component = window.__component__(false);
            const instance = component({
                foo:      'bar',
                passProp: expect('passProp', (val) => {
                    if (val) {
                        throw new Error(`Expected val to not be passed`);
                    }
                }),
                run: `
                    window.xprops.passProp(window.xprops.foo);
                `
            });
            
            return instance.render(document.body);
        });
    });

    it('should alias a prop and have it copy correctly', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return window.zoid.create({
                    tag:    'test-alias-prop',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com',
                    props:  {
                        foo: {
                            type:  'function',
                            alias: 'bar'
                        }
                    }
                });
            };

            const component = window.__component__();
            const instance = component({
                foo: expect('foo'),
                run: `
                    window.xprops.bar();
                `
            });
            
            return instance.render(document.body);
        });
    });

    it('should alias a prop and have it copy correctly in reverse', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return window.zoid.create({
                    tag:    'test-alias-reverse-prop',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com',
                    props:  {
                        foo: {
                            type:  'function',
                            alias: 'bar'
                        }
                    }
                });
            };

            const component = window.__component__();
            const instance = component({
                bar: expect('bar'),
                run: `
                    window.xprops.foo();
                `
            });
            
            return instance.render(document.body);
        });
    });

    it('should pass props in the url correctly', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return window.zoid.create({
                    tag:    'test-props-query-param',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com',
                    props:  {
                        fooProp: {
                            type:       'string',
                            queryParam: true
                        },

                        barProp: {
                            type:       'boolean',
                            queryParam: 'myBooleanProp'
                        },

                        bazProp: {
                            type:       'object',
                            queryParam: () => 'myBazProp',
                            queryValue: (val) => {
                                return {
                                    ...val,
                                    meep: 'beep'
                                };
                            }
                        },

                        bingProp: {
                            type:       'number',
                            queryParam: true
                        },

                        zomgProp: {
                            type:          'object',
                            queryParam:    true,
                            serialization: 'json'
                        },

                        lolProp: {
                            type:          'object',
                            queryParam:    true,
                            serialization: 'base64'
                        }
                    }
                });
            };

            const component = window.__component__();
            const instance = component({
                fooProp: 'hello world',
                barProp: true,
                bazProp: {
                    woot:   'boot',
                    foobar: [
                        1,
                        'wat',
                        { woop: 'doop' }
                    ]
                },
                bingProp: 54321,
                zomgProp: {
                    flerp: 'blerp'
                },
                lolProp: {
                    bleep: [ 1, 2, 3 ]
                },
                bloopProp: 'floop',

                getQuery: expect('getQuery', rawQuery => {
                    const query = JSON.stringify(parseQuery(rawQuery), null, 4);

                    const expected = JSON.stringify({
                        'fooProp':                     'hello world',
                        'myBooleanProp':               'true',
                        'bazProp.value.woot':          'boot',
                        'bazProp.value.foobar.0':      '1',
                        'bazProp.value.foobar.1':      'wat',
                        'bazProp.value.foobar.2.woop': 'doop',
                        'bazProp.meep':                'beep',
                        'bingProp':                    '54321',
                        'zomgProp':                    '{"flerp":"blerp"}',
                        'lolProp':                     btoa('{"bleep":[1,2,3]}').replace(/[=]/g, '')
                    }, null, 4);

                    if (query !== expected) {
                        throw new Error(`Expected query string to be:\n\n${ expected }\n\nbut got:\n\n${ query }`);
                    }
                }),
                run: `
                    window.xprops.getQuery(window.location.search.slice(1));
                `
            });
            
            return instance.render(document.body);
        });
    });

    it('should pass promise props in the url correctly', () => {
        return wrapPromise(({ expect }) => {

            const promiseValue = 'helloworld';

            window.__component__ = () => {
                return window.zoid.create({
                    tag:    'test-promise-props-query-param',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com',
                    props:  {
                        promiseProp: {
                            type:       'function',
                            queryParam: true,
                            queryValue: ({ value }) => {
                                return ZalgoPromise.delay(50).then(() => value());
                            }
                        }
                    }
                });
            };

            const component = window.__component__();
            const instance = component({
                promiseProp: expect('promiseProp', () => promiseValue),
                getQuery:    expect('getQuery', rawQuery => {
                    const query = JSON.stringify(parseQuery(rawQuery), null, 4);

                    const expected = JSON.stringify({
                        'promiseProp': promiseValue
                    }, null, 4);

                    if (query !== expected) {
                        throw new Error(`Expected query string to be:\n\n${ expected }\n\nbut got:\n\n${ query }`);
                    }
                }),
                run: `
                    window.xprops.getQuery(window.location.search.slice(1));
                `
            });
            
            return instance.render(document.body);
        });
    });

    it('should enter a component, update a prop, destroy the component, and not error out', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return window.zoid.create({
                    tag:    'test-update-prop-destroy-component',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const component = window.__component__();
            const instance = component();

            instance.render(document.body).then(expect('postRender', () => {
                const updatePromise = instance.updateProps({
                    foo: 'bar'
                });

                instance.close();

                return updatePromise;
            }));
        });
    });

    it('should enter a component, update a prop, close the window, and not error out', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return window.zoid.create({
                    tag:    'test-update-prop-close-window',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const component = window.__component__();
            const instance = component();

            let openedWindow;

            onWindowOpen().then(expect('onWindowOpen', win => {
                openedWindow = win;
            }));

            instance.render(document.body).then(expect('postRender', () => {
                const updatePromise = instance.updateProps({
                    foo: 'bar'
                });

                destroyElement(openedWindow.frameElement);

                return updatePromise;
            }));
        });
    });
});
