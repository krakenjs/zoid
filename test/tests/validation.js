
import xcomponent from 'src/index';

import { testComponent, testComponent5 } from '../component';

describe('xcomponent validation errors', () => {

    function expectError(method) {
        try {
            method();
        } catch (err) {
            assert.isTrue(err instanceof Error, 'Expected Error object to be thrown');
            return;
        }

        throw new Error('Expected error to be thrown');
    }

    it('should throw validation errors when a component is created without the correct options', () => {

        expectError(() => {
            xcomponent.create({});
        });

        expectError(() => {
            xcomponent.create({
                tag: 'special$%&-chars'
            });
        });

        expectError(() => {
            xcomponent.create({
                tag: 'my-component',
                dimensions: 'moo'
            });
        });

        expectError(() => {
            xcomponent.create({
                tag: 'my-component',
                dimensions: {}
            });
        });

        expectError(() => {
            xcomponent.create({
                tag: 'my-component',
                dimensions: {
                    height: 'foo',
                    width: 'bar'
                }
            });
        });

        expectError(() => {
            xcomponent.create({
                tag: 'my-component',
                dimensions: {
                    height: 'foo',
                    width: 50
                }
            });
        });

        expectError(() => {
            xcomponent.create({
                tag: 'my-component',
                dimensions: {
                    height: 50,
                    width: 200
                }
            });
        });

        xcomponent.create({
            tag: 'my-component-working-1',
            dimensions: {
                height: 50,
                width: 200
            },
            url: 'http://zombo.com'
        });

        expectError(() => {
            xcomponent.create({
                tag: 'my-component',
                dimensions: {
                    height: 50,
                    width: 200
                },
                url: 'http://zombo.com',
                props: 'foo'
            });
        });

        expectError(() => {
            xcomponent.create({
                tag: 'my-component',
                dimensions: {
                    height: 50,
                    width: 200
                },
                url: 'http://zombo.com',
                props: {
                    moo: 'wat'
                }
            });
        });

        expectError(() => {
            xcomponent.create({
                tag: 'my-component',
                dimensions: {
                    height: 50,
                    width: 200
                },
                url: 'http://zombo.com',
                props: {
                    moo: {
                        type: 'invalid'
                    }
                }
            });
        });

        expectError(() => {
            xcomponent.create({
                tag: 'my-component',
                dimensions: {
                    height: 50,
                    width: 200
                },
                url: 'http://zombo.com',
                props: {
                    onSomething: {

                    }
                }
            });
        });

        expectError(() => {
            xcomponent.create({
                tag: 'my-component',
                dimensions: {
                    height: 50,
                    width: 200
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

        expectError(() => {
            xcomponent.create({
                tag: 'my-component',
                dimensions: {
                    height: 50,
                    width: 200
                },
                url: 'http://zombo.com',
                contexts: {
                    invalid: true,
                    lightbox: false,
                    popup: false
                }
            });
        });

        expectError(() => {
            xcomponent.create({
                tag: 'my-component',
                dimensions: {
                    height: 50,
                    width: 200
                },
                url: 'http://zombo.com',
                contexts: {
                    iframe: false,
                    lightbox: false,
                    popup: false
                }
            });
        });

        xcomponent.create({
            tag: 'my-component-working-2',
            dimensions: {
                height: 50,
                width: 200
            },
            url: 'http://zombo.com',
            contexts: {
                iframe: true,
                lightbox: false,
                popup: false
            }
        });

        expectError(() => {
            xcomponent.create({
                tag: 'my-component',
                dimensions: {
                    height: 50,
                    width: 200
                },
                contexts: {
                    iframe: true,
                    lightbox: false,
                    popup: false
                },
                url: 'http://zombo.com',
                defaultContext: 'moo'
            });
        });

        expectError(() => {
            xcomponent.create({
                tag: 'my-component',
                dimensions: {
                    height: 50,
                    width: 200
                },
                url: 'http://zombo.com',
                contexts: {
                    iframe: true,
                    lightbox: false,
                    popup: false
                },
                defaultContext: 'popup'
            });
        });

        xcomponent.create({
            tag: 'my-component',
            dimensions: {
                height: 50,
                width: 200
            },
            url: 'http://zombo.com',
            contexts: {
                iframe: true,
                lightbox: false,
                popup: false
            },
            defaultContext: 'iframe'
        });

        expectError(() => {
            xcomponent.create({
                tag: 'my-component',
                dimensions: {
                    height: 50,
                    width: 200
                },
                envUrls: {
                    foo: undefined
                }
            });
        });

        expectError(() => {
            xcomponent.create({
                tag: 'my-component',
                dimensions: {
                    height: 50,
                    width: 200
                },
                envUrls: {
                    foo: 'http://www.zombo.com'
                }
            });
        });

        expectError(() => {
            xcomponent.create({
                tag: 'my-component',
                dimensions: {
                    height: 50,
                    width: 200
                },
                envUrls: {
                    foo: 'http://www.zombo.com'
                },
                defaultUrl: 1234
            });
        });

        expectError(() => {
            xcomponent.create({
                tag: 'my-component',
                dimensions: {
                    height: 50,
                    width: 200
                },
                defaultEnv: 'moo'
            });
        });

        expectError(() => {
            xcomponent.create({
                tag: 'my-component',
                dimensions: {
                    height: 50,
                    width: 200
                },
                envUrls: {

                },
                defaultEnv: 'moo'
            });
        });

        expectError(() => {
            xcomponent.create({
                tag: 'my-component',
                dimensions: {
                    height: 50,
                    width: 200
                },
                url: 12345
            });
        });
    });

    it('should throw validation errors when a component is inited without the correct options', () => {

        expectError(() => {
            testComponent.init({
                functionProp: 'foobar'
            });
        });

        expectError(() => {
            testComponent.init({
                stringProp() {}
            });
        });

        expectError(() => {
            testComponent.init({
                numberProp() {}
            });
        });

        expectError(() => {
            let obj = {};
            obj.obj = obj;

            testComponent.init({
                objectProp: obj
            });
        });

        expectError(() => {
            testComponent.init({
                invalidProp: 'foobar'
            });
        });

        expectError(() => {
            testComponent5.init();
        });
    });
});