

import xcomponent from 'src/index';

import { testComponent, testComponent5 } from '../component';

describe('xcomponent validation errors', () => {

    function expectError(description, method) {
        try {
            method();
        } catch (err) {
            assert.isTrue(err instanceof Error, `Expected Error for use case: ${description}, got ${typeof err}`);
            return;
        }

        throw new Error(`Expected Error for use case: ${description}`);
    }

    it('should throw validation errors when a component is created without the correct options', () => {

        expectError('Empty options', () => {
            xcomponent.create({});
        });

        expectError('Special chars in tag name', () => {
            xcomponent.create({
                tag: 'special$%&-chars'
            });
        });

        expectError('String passed for dimensions', () => {
            xcomponent.create({
                tag: 'my-component',
                dimensions: 'moo'
            });
        });

        expectError('Empty options passed for dimensions', () => {
            xcomponent.create({
                tag: 'my-component',
                dimensions: {}
            });
        });

        expectError('Strings passed for dimensions', () => {
            xcomponent.create({
                tag: 'my-component',
                dimensions: {
                    height: 'foo',
                    width: 'bar'
                }
            });
        });

        expectError('String passed for height', () => {
            xcomponent.create({
                tag: 'my-component',
                dimensions: {
                    height: 'foo',
                    width: 50
                }
            });
        });

        expectError('No url passed', () => {
            xcomponent.create({
                tag: 'my-component',
                dimensions: {
                    height: '50px',
                    width: '200px'
                }
            });
        });

        expectError('Props passed as string', () => {
            xcomponent.create({
                tag: 'my-component',
                dimensions: {
                    height: '50px',
                    width: '200px'
                },
                url: 'http://zombo.com',
                props: 'foo'
            });
        });

        expectError('Prop passed as string', () => {
            xcomponent.create({
                tag: 'my-component',
                dimensions: {
                    height: '50px',
                    width: '200px'
                },
                url: 'http://zombo.com',
                props: {
                    moo: 'wat'
                }
            });
        });

        expectError('Invalid prop type passed', () => {
            xcomponent.create({
                tag: 'my-component',
                dimensions: {
                    height: '50px',
                    width: '200px'
                },
                url: 'http://zombo.com',
                props: {
                    moo: {
                        type: 'invalid'
                    }
                }
            });
        });

        expectError('Empty prop definition', () => {
            xcomponent.create({
                tag: 'my-component',
                dimensions: {
                    height: '50px',
                    width: '200px'
                },
                url: 'http://zombo.com',
                props: {
                    onSomething: {

                    }
                }
            });
        });

        expectError('Required and default passed', () => {
            xcomponent.create({
                tag: 'my-component',
                dimensions: {
                    height: '50px',
                    width: '200px'
                },
                url: 'http://zombo.com',
                props: {
                    onSomething: {
                        type: 'function',
                        required: true,
                        def() {}
                    }
                }
            });
        });

        expectError('Invalid context passed', () => {
            xcomponent.create({
                tag: 'my-component',
                dimensions: {
                    height: '50px',
                    width: '200px'
                },
                url: 'http://zombo.com',
                contexts: {
                    invalid: true,
                    popup: false
                }
            });
        });

        expectError('No contexts enabled', () => {
            xcomponent.create({
                tag: 'my-component',
                dimensions: {
                    height: '50px',
                    width: '200px'
                },
                url: 'http://zombo.com',
                contexts: {
                    iframe: false,
                    popup: false
                }
            });
        });

        xcomponent.create({
            tag: 'my-component-working-2',
            dimensions: {
                height: '50px',
                width: '200px'
            },
            url: 'http://zombo.com',
            contexts: {
                iframe: true,
                popup: false
            }
        });

        expectError('Invalid default context', () => {
            xcomponent.create({
                tag: 'my-component',
                dimensions: {
                    height: '50px',
                    width: '200px'
                },
                contexts: {
                    iframe: true,
                    popup: false
                },
                url: 'http://zombo.com',
                defaultContext: 'moo'
            });
        });

        expectError('Default context disabled', () => {
            xcomponent.create({
                tag: 'my-component',
                dimensions: {
                    height: '50px',
                    width: '200px'
                },
                url: 'http://zombo.com',
                contexts: {
                    iframe: true,
                    popup: false
                },
                defaultContext: 'popup'
            });
        });

        xcomponent.create({
            tag: 'my-component',
            dimensions: {
                height: '50px',
                width: '200px'
            },
            url: 'http://zombo.com',
            contexts: {
                iframe: true,
                popup: false
            },
            defaultContext: 'iframe'
        });

        expectError('Undefined url', () => {
            xcomponent.create({
                tag: 'my-component',
                dimensions: {
                    height: '50px',
                    width: '200px'
                },
                url: {
                    foo: undefined
                }
            });
        });

        expectError('No default env passed', () => {
            xcomponent.create({
                tag: 'my-component',
                dimensions: {
                    height: '50px',
                    width: '200px'
                },
                url: {
                    foo: 'http://www.zombo.com'
                }
            });
        });

        expectError('Invalid default env passed', () => {
            xcomponent.create({
                tag: 'my-component',
                dimensions: {
                    height: '50px',
                    width: '200px'
                },
                envUrls: {
                    foo: 'http://www.zombo.com'
                },
                defaultEnv: 1234
            });
        });

        expectError('Default env passed with no urls', () => {
            xcomponent.create({
                tag: 'my-component',
                dimensions: {
                    height: '50px',
                    width: '200px'
                },
                defaultEnv: 'moo'
            });
        });

        expectError('Default env passed with empty urls', () => {
            xcomponent.create({
                tag: 'my-component',
                dimensions: {
                    height: '50px',
                    width: '200px'
                },
                url: {

                },
                defaultEnv: 'moo'
            });
        });

        expectError('Invalid url passed', () => {
            xcomponent.create({
                tag: 'my-component',
                dimensions: {
                    height: '50px',
                    width: '200px'
                },
                url: 12345
            });
        });
    });

    it('should throw validation errors when a component is inited without the correct options', () => {

        expectError('String passed for function prop', () => {
            testComponent.init({
                functionProp: 'foobar'
            });
        });

        expectError('Object passed for string prop', () => {
            testComponent.init({
                stringProp() {}
            });
        });

        expectError('Object passed fro number prop', () => {
            testComponent.init({
                numberProp() {}
            });
        });

        expectError('Unserializable object passed for object prop', () => {
            let obj = {};
            obj.obj = obj;

            testComponent.init({
                objectProp: obj
            });
        });

        /*

        expectError('Invalid prop passed', () => {
            testComponent.init({
                invalidProp: 'foobar'
            });
        });

        */

        expectError('No props passed', () => {
            testComponent5.init();
        });
    });
});
