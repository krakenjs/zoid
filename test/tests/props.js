/* @flow */
/* eslint max-lines: off */

import { wrapPromise, noop, parseQuery, destroyElement } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import { onWindowOpen, getBody } from '../common';
import { zoid } from '../zoid';

describe('zoid props cases', () => {

    it('should enter a component, update a prop, and call a prop', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-update-prop',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const component = window.__component__();
            const instance = component({
                run: () => `
                    window.xprops.onProps(function() {
                        console.warn('bleh');
                        window.xprops.foo('bar');
                    });
                `,
                postRun: () => {
                    return instance.updateProps({
                        foo: expect('foo', bar => {
                            if (bar !== 'bar') {
                                throw new Error(`Expected bar to be 'bar', got ${ bar }`);
                            }
                        })
                    });
                }
            });

            return instance.render(getBody());
        });
    });

    it('should enter a component, update a prop, and call a different prop', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
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

                run: () => `
                    window.xprops.onProps(function() {
                        window.xprops.foo('bar');
                    });
                `,

                postRun: () => {
                    return instance.updateProps({
                        bar: 'helloworld'
                    });
                }
            });

            return instance.render(getBody());
        });
    });

    it('should enter a component, decorate a prop, update a prop, and call a different prop', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
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

                run: () => `
                    window.xprops.onProps(function() {
                        window.xprops.baz('bar');
                    });
                `,

                postRun: () => {
                    return instance.updateProps({
                        baz: noop
                    });
                }
            });

            return instance.render(getBody());
        });
    });

    it('should pass the inputProp as a parameter in the value function', () => {
        const expectedAccount = '123';

        return wrapPromise(({ expect }) => {
            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-prop-input-value-passing',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com',
                    props:  {
                        account: {
                            type:       'string',
                            required:   true,
                            value:      ({ props }) => {
                                return props.account;
                            }
                        },
                        passFoo: {
                            type:     'function',
                            required: true
                        }
                    }
                });
            };

            const component = window.__component__();
            const instance = component({
                run: () => `
                    window.xprops.passFoo({ account: window.xprops.account });
                `,
                account: expectedAccount,
                passFoo: expect('passFoo', ({ account }) => {
                    if (account !== expectedAccount) {
                        throw new Error(`Expected account=${ expectedAccount } in the url, but got account=${ account }`);
                    }

                })
            });

            return instance.render(getBody());
        });
    });

    it('should allow decorated functions to change their signature from the original value callback prop', () => {
        return wrapPromise(({ expect, avoid }) => {
            window.__component__ = () => {
                return zoid.create({
                    tag:    'changing-decorated-function-signature',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com',
                    props:  {
                        onSuccess: {
                            type:     'function',
                            decorate: ({ value, onError }) => {
                                return (err, result) => {
                                    if (err || !result) {
                                        return onError(err);
                                    }

                                    return value(true);
                                };
                            }
                        }
                    }
                });
            };

            const component = window.__component__();
            const instance = component({
                run: () => `
                    window.xprops.onSuccess(null, {success: true});
                `,
                onSuccess:   expect('onSuccess', (result) => {
                    if (result !== true) {
                        throw new Error(`Expected onSuccess to have been called with true, but was called with ${ result }`);
                    }
                }),
                onError:     avoid('onError')
            });

            return instance.render(getBody());
        });
    });

    it('should enter a component, update a prop with a default, then call the prop', () => {
        return wrapPromise(({ expect, error }) => {

            window.__component__ = () => {
                return zoid.create({
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
                run: () => `
                    window.xprops.onProps(function() {
                        window.xprops.meep();
                    });
                `,

                postRun: () => {
                    return instance.updateProps({
                        meep: expect('meepv2')
                    });
                }
            });
        });
    });

    it('should enter a component, update a prop with a value, then call the prop', () => {
        return wrapPromise(({ expect, error }) => {
            let doExpect = false;

            window.__component__ = () => {
                return zoid.create({
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
                run: () => `
                    window.xprops.onProps(function() {
                        window.xprops.meep();
                    });
                `,

                postRun: () => {
                    doExpect = true;

                    return instance.updateProps({
                        meep: error('meepv2')
                    });
                }
            });

            return instance.render(getBody());
        });
    });

    it('should enter a component and call back with a string prop', () => {
        return wrapPromise(({ expect }) => {
            const expectedResult = 'bar';

            window.__component__ = () => {
                return zoid.create({
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

                run: () => `
                    window.xprops.foo(window.xprops.customProp);
                `
            }).render(getBody());
        });
    });

    it('should enter a component and call back with a number prop', () => {
        return wrapPromise(({ expect }) => {
            const expectedResult = 123;

            window.__component__ = () => {
                return zoid.create({
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

                run: () => `
                    window.xprops.foo(window.xprops.customProp);
                `
            }).render(getBody());
        });
    });

    it('should enter a component and call back with a boolean prop', () => {
        return wrapPromise(({ expect }) => {
            const expectedResult = true;

            window.__component__ = () => {
                return zoid.create({
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

                run: () => `
                    window.xprops.foo(window.xprops.customProp);
                `
            }).render(getBody());
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
                return zoid.create({
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

                run: () => `
                    window.xprops.foo(window.xprops.objectProp);
                `
            }).render(getBody());
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
                return zoid.create({
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

                run: () => `
                    window.xprops.foo(window.xprops.objectProp);
                `
            }).render(getBody());
        });
    });

    it('should enter a component and call back with a function prop', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
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

                run: () => `
                    window.xprops.foo(window.xprops.functionProp);
                `
            }).render(getBody());
        });
    });

    it('should error out if not passed a required prop', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
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
                return zoid.create({
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
                run: () => `
                    window.xprops.passProp(window.xprops.foo);
                `
            });

            return instance.render(getBody());
        });
    });

    it('should pass a sameDomain prop and not have it populate on the child', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = (sameDomain = true) => {
                return zoid.create({
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
                run: () => `
                    window.xprops.passProp(window.xprops.foo);
                `
            });

            return instance.render(getBody());
        });
    });

    it('should alias a prop and have it copy correctly', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
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
                run: () => `
                    window.xprops.bar();
                `
            });

            return instance.render(getBody());
        });
    });

    it('should alias a prop and have it copy correctly in reverse', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
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
                run: () => `
                    window.xprops.foo();
                `
            });

            return instance.render(getBody());
        });
    });

    it('should pass props in the url correctly', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
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
                                // $FlowFixMe
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
                run: () => `
                    window.xprops.getQuery(window.location.search.slice(1));
                `
            });

            return instance.render(getBody());
        });
    });

    it('should pass boolean props in the url correctly', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-props-boolean-query-param',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com',
                    props:  {
                        trueProp: {
                            type:       'boolean',
                            queryParam: true
                        },

                        falseProp: {
                            type:       'boolean',
                            queryParam: true
                        }
                    }
                });
            };

            const component = window.__component__();
            const instance = component({
                trueProp:   true,
                falseProp:  false,

                getQuery: expect('getQuery', rawQuery => {
                    const query = JSON.stringify(parseQuery(rawQuery), null, 4);

                    const expected = JSON.stringify({
                        'trueProp':                'true',
                        'falseProp':               'false'
                    }, null, 4);

                    if (query !== expected) {
                        throw new Error(`Expected query string to be:\n\n${ expected }\n\nbut got:\n\n${ query }`);
                    }
                }),
                run: () => `
                    window.xprops.getQuery(window.location.search.slice(1));
                `
            });

            return instance.render(getBody());
        });
    });

    it('should pass promise props in the url correctly', () => {
        return wrapPromise(({ expect }) => {

            const promiseValue = 'helloworld';

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-promise-props-query-param',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com',
                    props:  {
                        promiseProp: {
                            type:       'function',
                            queryParam: true,
                            queryValue: <T>({ value } : {| value : () => T |}) : ZalgoPromise<T> => {
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
                run: () => `
                    window.xprops.getQuery(window.location.search.slice(1));
                `
            });

            return instance.render(getBody());
        });
    });

    it('should enter a component, update a prop, destroy the component, and not error out', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-update-prop-destroy-component',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const component = window.__component__();
            const instance = component();

            instance.render(getBody()).then(expect('postRender', () => {
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
                return zoid.create({
                    tag:    'test-update-prop-close-window',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const component = window.__component__();
            const instance = component();

            let openedWindow;

            onWindowOpen().then(expect('onWindowOpen', ({ win }) => {
                openedWindow = win;
            }));

            instance.render(getBody()).then(expect('postRender', () => {
                const updatePromise = instance.updateProps({
                    foo: 'bar'
                });

                destroyElement(openedWindow.frameElement);

                return updatePromise;
            }));
        });
    });

    it('should enter a component, and update a prop after a delay', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-update-prop-delay',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const component = window.__component__();
            const instance = component({
                onFoo: expect('onFoo'),

                run: () => {
                    setTimeout(() => {
                        instance.updateProps({ foo: 'bar' });
                    }, 200);

                    return `
                        window.xprops.onProps(function(props) {
                            if (props.foo === 'bar') {
                                props.onFoo();
                            }
                        });
                    `;
                }
            });

            return instance.render(getBody());
        });
    });

    it('should pass all input props through to value', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-prop-value-derived-from-props',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com',
                    props:  {
                        foo: {
                            type:  'string'
                        },
                        bar: {
                            type:  'string',
                            value: ({ props }) => props.foo
                        },
                        passBar: {
                            type:     'function',
                            required: true
                        }
                    }
                });
            };

            const component = window.__component__();
            const instance = component({
                run: () => `
                    window.xprops.passBar({ bar: xprops.bar });
                `,
                foo:     'foo',
                passBar: expect('passBar', ({ bar }) => {
                    if (bar !== 'foo') {
                        throw new Error(`Expected prop to have the correct value; got ${ bar }`);
                    }
                })
            });
            
            return instance.render(getBody());
        });
    });

    it('should pass all input props through to value, even for the same prop', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-prop-value-derived-from-props-with-same-prop',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com',
                    props:  {
                        bar: {
                            type:  'string',
                            value: ({ props }) => props.bar
                        },
                        passBar: {
                            type:     'function',
                            required: true
                        }
                    }
                });
            };

            const component = window.__component__();
            const instance = component({
                run: () => `
                    window.xprops.passBar({ bar: xprops.bar });
                `,
                bar:     'foo',
                passBar: expect('passBar', ({ bar }) => {
                    if (bar !== 'foo') {
                        throw new Error(`Expected prop to have the correct value; got ${ bar }`);
                    }
                })
            });
            
            return instance.render(getBody());
        });
    });

    it('should error out if a required prop has an value function which returns undefined', () => {
        return wrapPromise(() => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-prop-value-undefined-error',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com',
                    props:  {
                        foo: {
                            type:  'string',
                            value: () => undefined
                        }
                    }
                });
            };

            const component = window.__component__();
            
            let error;

            try {
                component();
            } catch (err) {
                error = err;
            }

            if (!error) {
                throw new Error(`Expected error to be thrown`);
            }
        });
    });

    it('should error out if a required prop has both required:true and a default value', () => {
        return wrapPromise(() => {
            let error;

            try {
                zoid.create({
                    tag:    'test-prop-value-required-default',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com',
                    props:  {
                        foo: {
                            type:     'string',
                            required: true,
                            default:  () => 'foo'
                        }
                    }
                });
            } catch (err) {
                error = err;
            }

            if (!error) {
                throw new Error(`Expected error to be thrown`);
            }
        });
    });
});
