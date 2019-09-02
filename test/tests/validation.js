/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';

describe('zoid validation errors', () => {

    function expectError(description, method) : ZalgoPromise<void> {
        let error;

        return ZalgoPromise.try(method).catch(err => {
            error = err;
        }).then(() => {
            if (!(error instanceof Error)) {
                throw new TypeError(`Expected Error for use case: ${ description }`);
            }
        });
    }

    it('should throw validation errors when a component is created with no options', () => {
        return expectError('Empty options', () => {
            window.zoid.create();
        });
    });

    it('should throw validation errors when a component is created with Empty options', () => {
        return expectError('Empty options', () => {
            window.zoid.create({});
        });
    });

    it('should throw validation errors when a component is created with no tag', () => {
        return expectError('Empty options', () => {
            window.zoid.create({
                url: 'http://foo.com/bar'
            });
        });
    });

    it('should throw validation errors when a component is created with no url', () => {
        return expectError('Empty options', () => {
            window.zoid.create({
                tag: 'my-component-no-url'
            });
        });
    });

    it('should throw validation errors when a component is created with trailing dash in tag name', () => {
        return expectError('Malformed tag name', () => {
            window.zoid.create({
                url: 'http://foo.com/bar',
                tag: 'my-component-'
            });
        });
    });

    it('should throw validation errors when a component is created with leading dash in tag name', () => {
        return expectError('Malformed tag name', () => {
            window.zoid.create({
                url: 'http://foo.com/bar',
                tag: '-my-component'
            });
        });
    });

    it('should NOT throw validation errors when a component is created NO dash in tag name', () => {
        return window.zoid.create({
            url: 'http://foo.com/bar',
            tag: 'component'
        });
    });

    it('should throw validation errors when a component is created with Special chars in tag name', () => {
        return expectError('Special chars in tag name', () => {
            window.zoid.create({
                url: 'http://foo.com/bar',
                tag: 'special$%&-chars'
            });
        });
    });

    it('should throw validation errors when a component is created with String passed for dimensions', () => {
        return expectError('String passed for dimensions', () => {
            window.zoid.create({
                url:        'http://foo.com/bar',
                tag:        'my-component-string-dimensions',
                dimensions: 'moo'
            });
        });
    });

    it('should throw validation errors when a component is created with Empty options passed for dimensions', () => {
        return expectError('Empty options passed for dimensions', () => {
            window.zoid.create({
                url:        'http://foo.com/bar',
                tag:        'my-component-empty-dimensions',
                dimensions: {}
            });
        });
    });

    it('should throw validation errors when a component is created with Strings passed for dimensions', () => {
        return expectError('Strings passed for dimensions', () => {
            window.zoid.create({
                url:        'http://foo.com/bar',
                tag:        'my-component-string-dimensions-object',
                dimensions: {
                    height: 'foo',
                    width:  'bar'
                }
            });
        });
    });

    it('should throw validation errors when a component is created with String passed for height', () => {
        return expectError('String passed for height', () => {
            window.zoid.create({
                url:        'http://foo.com/bar',
                tag:        'my-component-string-height',
                dimensions: {
                    height: 'foo',
                    width:  '50px'
                }
            });
        });
    });

    it('should throw validation errors when a component is created with String passed for width', () => {
        return expectError('String passed for height', () => {
            window.zoid.create({
                url:        'http://foo.com/bar',
                tag:        'my-component-string-width',
                dimensions: {
                    height: '50px',
                    width:  'foo'
                }
            });
        });
    });

    it('should throw validation errors when a component is created with Props passed as string', () => {
        return expectError('Props passed as string', () => {
            window.zoid.create({
                url:   'http://foo.com/bar',
                tag:   'my-component-props-string',
                props: 'foo'
            });
        });
    });

    it('should throw validation errors when a component is created with Prop passed as string', () => {
        return expectError('Prop passed as string', () => {
            window.zoid.create({
                tag:   'my-component-prop-string',
                url:   'http://zombo.com',
                props: {
                    moo: 'wat'
                }
            });
        });
    });

    it('should throw validation errors when a component is created with Invalid prop type passed', () => {
        return expectError('Invalid prop type passed', () => {
            window.zoid.create({
                tag:   'my-component-invalid-prop-type',
                url:   'http://zombo.com',
                props: {
                    moo: {
                        type: 'invalid'
                    }
                }
            });
        });
    });

    it('should throw validation errors when a component is created with Empty prop definition', () => {
        return expectError('Empty prop definition', () => {
            window.zoid.create({
                tag:   'my-component-no-prop-type',
                url:   'http://zombo.com',
                props: {
                    onSomething: {

                    }
                }
            });
        });
    });

    it('should throw validation errors when a component is created with Required and default passed', () => {
        return expectError('Required and default passed', () => {
            window.zoid.create({
                tag:   'my-component-required-and-default',
                url:   'http://zombo.com',
                props: {
                    onSomething: {
                        type:     'function',
                        required: true,
                        default:  () => {
                            return () => {
                                // pass
                            };
                        }
                    }
                }
            });
        });
    });

    it('should throw validation errors when a component is created with non-function passed for prerenderTemplate', () => {
        return expectError('String passed for height', () => {
            window.zoid.create({
                url:               'http://foo.com/bar',
                tag:               'my-component-prerender-non-function',
                prerenderTemplate: 'foo'
            });
        });
    });

    it('should throw validation errors when a component is created with non-function passed for containerTemplate', () => {
        return expectError('String passed for height', () => {
            window.zoid.create({
                url:               'http://foo.com/bar',
                tag:               'my-component-container-non-function',
                containerTemplate: 'foo'
            });
        });
    });

    it('should throw validation errors when a component is created with Invalid default context', () => {
        return expectError('Invalid default context', () => {
            window.zoid.create({
                tag:            'my-component-invalid-default-context',
                url:            'http://zombo.com',
                defaultContext: 'moo'
            });
        });
    });

    it('should throw validation errors when a component is created with Invalid url passed', () => {
        return expectError('Invalid url passed', () => {
            window.zoid.create({
                tag: 'my-component-invalid-url',
                url: 12345
            });
        });
    });

    it('should throw validation errors when a component is rendered with String passed for function prop', () => {
        return expectError('String passed for function prop', () => {
            window.__component__ = () => {
                return window.zoid.create({
                    tag:    'test-render-string-passed-as-function-prop',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com',
                    props:  {
                        functionProp: {
                            type: 'function'
                        }
                    }
                });
            };

            const component = window.__component__();
            return component({
                functionProp: 'foobar'
            });
        });
    });

    it('should throw validation errors when a component is rendered with Object passed for string prop', () => {
        return expectError('Object passed for string prop', () => {
            window.__component__ = () => {
                return window.zoid.create({
                    tag:    'test-render-object-passed-as-string-prop',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com',
                    props:  {
                        stringProp: {
                            type: 'string'
                        }
                    }
                });
            };

            const component = window.__component__();
            return component({
                stringProp() { /* pass */ }
            });
        });
    });

    it('should throw validation errors when a component is rendered with Object passed as number prop', () => {
        return expectError('Object passed as number prop', () => {
            window.__component__ = () => {
                return window.zoid.create({
                    tag:    'test-render-object-passed-as-number-prop',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com',
                    props:  {
                        numberProp: {
                            type: 'number'
                        }
                    }
                });
            };

            const component = window.__component__();
            return component({
                numberProp() { /* pass */ }
            });
        });
    });

    it('should throw validation errors when a component is rendered with Unserializable object passed for object prop', () => {
        return expectError('Unserializable object passed for object prop', () => {
            window.__component__ = () => {
                return window.zoid.create({
                    tag:    'test-render-unserializable-object',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com',
                    props:  {
                        objectProp: {
                            type: 'object'
                        }
                    }
                });
            };

            const obj = {};
            obj.obj = obj;

            const component = window.__component__();
            return component({
                objectProp: obj
            }).render(document.body);
        });
    });

    it('should throw validation errors when a component is rendered with object passed for array prop', () => {
        return expectError('Object passed for array', () => {
            window.__component__ = () => {
                return window.zoid.create({
                    tag:    'test-render-object-passed-for-array',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com',
                    props:  {
                        arrayProp: {
                            type: 'array'
                        }
                    }
                });
            };

            const component = window.__component__();
            return component({
                arrayProp: {}
            });
        });
    });

    it('should throw validation errors when a component is rendered with no props passed', () => {
        return expectError('No props passed', () => {
            window.__component__ = () => {
                return window.zoid.create({
                    tag:    'test-render-no-props-passed-when-required',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com',
                    props:  {
                        functionProp: {
                            type: 'function'
                        }
                    }
                });
            };

            return window.__component__().render();
        });
    });

    it('should throw validation errors when a component is created with a function prop with queryParam true', () => {
        return expectError('Function queryParam true', () => {
            return window.zoid.create({
                tag:    'test-render-function-queryparam-true',
                url:    'mock://www.child.com/base/test/windows/child/index.htm',
                domain: 'mock://www.child.com',
                props:  {
                    functionProp: {
                        type:       'function',
                        queryParam: true
                    }
                }
            });
        });
    });
});
