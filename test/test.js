
import xcomponent from 'src/index';
import postRobot from 'post-robot/src';
import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';

import { testComponent } from './component';
import { loadScript, once } from 'src/lib';

postRobot.CONFIG.ALLOWED_POST_MESSAGE_METHODS[postRobot.CONSTANTS.SEND_STRATEGIES.POST_MESSAGE_GLOBAL_METHOD] = false;

let component;

afterEach(function() {
    if (component) {
        component.destroy();
        component = null;
    }
});

angular.bootstrap = once(angular.bootstrap);

describe('basic xcomponent rendering', function() {

    it('should enter a component rendered as a lightbox', function(done) {

        component = testComponent.init({
            onEnter: done
        }).renderLightbox();

        postRobot.once('init', () => 'attachTestComponent');
    });

    it('should enter a component rendered as a lightbox and call a prop', function(done) {

        component = testComponent.init({
            foo: function(bar) {
                assert.equal(bar, 'bar');
                done();
            }
        }).renderLightbox();

        postRobot.once('init', () => 'attachTestComponentAndCallFoo');
    });

    it('should enter a component rendered as an iframe', function(done) {

        component = testComponent.init({
            onEnter: done
        }).renderIframe(document.body);

        postRobot.once('init', () => 'attachTestComponent');
    });

    it('should enter a component rendered as an iframe and call a prop', function(done) {

        component = testComponent.init({
            foo: function(bar) {
                assert.equal(bar, 'bar');
                done();
            }
        }).renderIframe(document.body);

        postRobot.once('init', () => 'attachTestComponentAndCallFoo');
    });

    it('should enter a component rendered as a popup', function(done) {

        component = testComponent.init({
            onEnter: done
        }).renderPopup();

        postRobot.once('init', () => 'attachTestComponent');
    });

    it('should enter a component rendered as a popup and call a prop', function(done) {

        component = testComponent.init({
            foo: function(bar) {
                assert.equal(bar, 'bar');
                done();
            }
        }).renderPopup();

        postRobot.once('init', () => 'attachTestComponentAndCallFoo');
    });

    it('should enter a component, update a prop, and call a prop', function(done) {

        component = testComponent.init({

            onEnter() {
                component.updateProps({
                    foo: function(bar) {
                        assert.equal(bar, 'bar');
                        done();
                    }
                });
            },

            foo: function(bar) {
                throw new Error('Expected foo to not be called yet');
            }
        }).renderLightbox();

        postRobot.once('init', () => 'attachTestComponentAndCallFooOnProps');
    });
});

describe('xcomponent error cases', function() {

    it('should error out when window.open returns a closed window', function(done) {

        let windowOpen = window.open;

        window.open = function() {
            return {
                closed: true,
                close: function() {}
            };
        };

        component = testComponent.init({
            onEnter: done
        });

        try {
            component.renderPopup();
        } catch (err) {
            assert.isTrue(err instanceof xcomponent.PopupOpenError, 'Expected PopupOpenError when popup is not opened');
        }

        window.open = windowOpen;

        done();
    });

    it('should enter a component, throw an error, and return a new error to the parent without the original stack', function(done) {

        component = testComponent.init({

            onError(err) {
                assert.isTrue(err.message.indexOf('xxxxx') === -1, 'Expected error to not contain original error');
                done();
            }

        }).renderLightbox();

        postRobot.once('init', () => 'attachTestComponentAndThrowRegularError');
    });

    it('should enter a component, throw an integration error, and return the error to the parent with the original stack', function(done) {

        component = testComponent.init({

            onError(err) {
                assert.isTrue(err.message.indexOf('xxxxx') !== -1, 'Expected error to contain original error');
                done();
            }

        }).renderLightbox();

        postRobot.once('init', () => 'attachTestComponentAndThrowIntegrationError');
    });
});

describe('xcomponent options', function() {

    it('should enter a component with a custom url', function(done) {

        component = testComponent.init({
            url: 'base/test/child.htm?foo=xyztest',

            sendUrl: function(url) {
                assert.isTrue(url.indexOf('xyztest') !== -1, 'Expected url to be custom url passed during init');
                done();
            }
        }).renderLightbox();

        postRobot.once('init', () => 'attachTestComponent');
    });

    it('should enter a component with a custom env', function(done) {

        component = testComponent.init({
            env: 'dev',

            sendUrl: function(url) {
                assert.isTrue(url.indexOf('devenv') !== -1, 'Expected url to be custom env url');
                done();
            }
        }).renderLightbox();

        postRobot.once('init', () => 'attachTestComponent');
    });

    it('should enter a component and call a memoized function', function(done) {

        var x = 0;

        component = testComponent.init({

            memoizedFunction() {
                x += 1;
                return x;
            },

            complete(result) {
                assert.equal(result, 1, 'Expected result to have only been incremented once then memoized');
                done();
            }

        }).renderLightbox();

        postRobot.once('init', () => 'attachTestComponentAndCallMemoizedFunction');
    });

    it('should enter a component and call a once function', function(done) {

        var x = 0;

        component = testComponent.init({

            onceFunction() {
                x += 1;
                return x;
            },

            complete(result) {
                assert.equal(result, undefined, 'Expected result to have only been returned once');
                done();
            }

        }).renderLightbox();

        postRobot.once('init', () => 'attachTestComponentAndCallOnceFunction');
    });

    it('should enter a component and call a denodeify function', function(done) {

        var x = 0;

        component = testComponent.init({

            denodeifyFunction(val, callback) {
                setTimeout(function() {
                    return callback(null, `${val}bar`);
                });
            },

            complete(result) {
                assert.equal(result, 'foobar', 'Expected result to have nodeified');
                done();
            }

        }).renderLightbox();

        postRobot.once('init', () => 'attachTestComponentAndCallDenodeifyFunction');
    });
});


describe('xcomponent actions', function() {

    it('should close an xcomponent popup', function(done) {

        component = testComponent.init({

            onEnter() {
                let close = component.window.close;

                component.window.close = function() {
                    close.apply(this, arguments);
                    done();
                };

                component.close();
            }

        }).renderPopup();

        postRobot.once('init', () => 'attachTestComponent');
    });

    it('should close an xcomponent lightbox', function(done) {

        component = testComponent.init({

            onEnter() {
                let close = component.window.close;

                component.window.close = function() {
                    close.apply(this, arguments);
                    done();
                };

                component.close();
            }

        }).renderLightbox();

        postRobot.once('init', () => 'attachTestComponent');
    });

    it('should focus an xcomponent popup', function(done) {

        component = testComponent.init({

            onEnter() {
                component.window.focus = done;
                component.focus();
            }

        }).renderPopup();

        postRobot.once('init', () => 'attachTestComponent');
    });
});


describe('xcomponent templates and styles', function() {

    it('should focus an xcomponent popup on click of the overlay', function(done) {

        component = testComponent.init({

            onEnter() {
                component.window.focus = done;
                document.querySelector('.xcomponent-overlay').click();
            }

        }).renderPopup();

        postRobot.once('init', () => 'attachTestComponent');
    });

    it('should close an xcomponent popup on click of the overlay close button', function(done) {

        component = testComponent.init({

            onEnter() {
                let close = component.window.close;

                component.window.close = function() {
                    close.apply(this, arguments);
                    done();
                };

                document.querySelector('.xcomponent-close').click();
            }

        }).renderPopup();

        postRobot.once('init', () => 'attachTestComponent');
    });


    it('should close an xcomponent lightbox on click of the overlay close button', function(done) {

        component = testComponent.init({

            onEnter() {
                let close = component.window.close;

                component.window.close = function() {
                    close.apply(this, arguments);
                    done();
                };

                document.querySelector('.xcomponent-close').click();
            }

        }).renderLightbox();

        postRobot.once('init', () => 'attachTestComponent');
    });
});

describe('xcomponent render to parent', function() {

    it('should render a component to the parent as a lightbox', function(done) {

        component = testComponent.init({
            foo: done
        }).renderIframe(document.body);

        postRobot.once('init', () => 'renderTestComponent2ToParentLightbox');
    });

    it('should render a component to the parent as a popup', function(done) {

        component = testComponent.init({
            foo: done
        }).renderIframe(document.body);

        postRobot.once('init', () => 'renderTestComponent2ToParentPopup');
    });

    it('should render a component to the parent as an iframe', function(done) {

        component = testComponent.init({
            foo: done
        }).renderIframe(document.body);

        postRobot.once('init', () => 'renderTestComponent2ToParentIframe');
    });

    it('should render a component to the parent and call a prop', function(done) {

        component = testComponent.init({
            foo: done
        }).renderIframe(document.body);

        postRobot.once('init', () => 'renderTestComponent2ToParentLightboxAndPassFoo');
    });

    it('should render a component to the parent as a lightbox and close on enter', function(done) {

        component = testComponent.init({
            foo: done
        }).renderIframe(document.body);

        postRobot.once('init', () => 'renderTestComponent2ToParentLightboxAndClose');
    });

    it('should close an xcomponent renderToParent popup on click of the overlay close button', function(done) {

        component = testComponent.init({
            childEntered() {
                document.querySelector('.xcomponent-close').click();
            },

            foo: done
        }).renderIframe(document.body);

        postRobot.once('init', () => 'renderTestComponent2ToParentLightboxAndCallFooOnClose');
    });

    it('should close an xcomponent renderToParent popup on click of the overlay close button', function(done) {

        component = testComponent.init({
            childEntered() {
                document.querySelector('.xcomponent-close').click();
            },

            foo: done
        }).renderIframe(document.body);

        postRobot.once('init', () => 'renderTestComponent2ToParentPopupAndCallFooOnClose');
    });

    it('should focus an xcomponent renderToParent popup on click of the overlay', function(done) {

        component = testComponent.init({
            childEntered() {
                document.querySelector('.xcomponent-overlay').click();
            },

            foo: done
        }).renderIframe(document.body);

        postRobot.once('init', () => 'renderTestComponent2ToParentPopupAndCallFooOnFocus');
    });
});

describe('xcomponent hijack', function() {

    it('should render a component by hijacking a button to a lightbox', function(done) {

        var form = document.createElement('form');
        form.method = 'POST';
        form.action = '/base/test/child.htm?foo=xyzhijacktest';

        var button = document.createElement('button');
        button.id = 'hijackButton';

        form.appendChild(button);
        document.body.appendChild(form);

        component = testComponent.init({
            sendUrl: function(url) {
                assert.isTrue(url.indexOf('xyzhijacktest') !== -1, 'Expected url to be custom url passed during init');
                document.body.removeChild(form);
                done();
            }
        }).hijackButtonToLightbox('#hijackButton');

        postRobot.once('init', () => 'attachTestComponent');

        button.click();
    });

    it('should render a component by hijacking a button to a popup', function(done) {

        var form = document.createElement('form');
        form.method = 'POST';
        form.action = '/base/test/child.htm?foo=xyzhijacktest';

        var button = document.createElement('button');
        button.id = 'hijackButton';

        form.appendChild(button);
        document.body.appendChild(form);

        component = testComponent.init({
            sendUrl: function(url) {
                assert.isTrue(url.indexOf('xyzhijacktest') !== -1, 'Expected url to be custom url passed during init');
                document.body.removeChild(form);
                done();
            }
        }).hijackButtonToPopup('#hijackButton');

        postRobot.once('init', () => 'attachTestComponent');

        button.click();
    });

    it('should render a component by hijacking a link to a lightbox', function(done) {

        var link = document.createElement('a');
        link.id = 'hijackLink';
        link.href = '/base/test/child.htm?foo=xyzhijacktest';

        document.body.appendChild(link);

        component = testComponent.init({
            sendUrl: function(url) {
                assert.isTrue(url.indexOf('xyzhijacktest') !== -1, 'Expected url to be custom url passed during init');
                document.body.removeChild(link);
                done();
            }
        }).hijackButtonToLightbox('#hijackLink');

        postRobot.once('init', () => 'attachTestComponent');

        link.click();
    });

    it('should render a component by hijacking a link to a popup', function(done) {

        var link = document.createElement('a');
        link.id = 'hijackLink';
        link.href = '/base/test/child.htm?foo=xyzhijacktest';

        document.body.appendChild(link);

        component = testComponent.init({
            sendUrl: function(url) {
                assert.isTrue(url.indexOf('xyzhijacktest') !== -1, 'Expected url to be custom url passed during init');
                document.body.removeChild(link);
                done();
            }
        }).hijackButtonToPopup('#hijackLink');

        postRobot.once('init', () => 'attachTestComponent');

        link.click();
    });

    it('should render a component by submitting a button from a child component', function(done) {

        var form = document.createElement('form');
        form.id = 'hijackForm'
        form.method = 'POST';
        form.action = '/base/test/child.htm?foo=xyzhijacktest';

        document.body.appendChild(form);

        component = testComponent.init({
            sendUrl: function(url) {
                assert.isTrue(url.indexOf('xyzhijacktest') !== -1, 'Expected url to be custom url passed during init');
                document.body.removeChild(form);
                done();
            }
        }).renderIframe('#hijackForm');

        postRobot.once('init', () => 'attachTestComponentAndSubmitParentButton');
    });
});

describe('xcomponent drivers', function() {

    it('should enter a component rendered with react and call onEnter', function(done) {

        let Main = window.React.createClass({

            render: function() {

                return window.React.createElement(
                    'div',
                    null,
                    React.createElement(testComponent.react, { onEnter: done })
                );
            }
        });

        let container = document.createElement('div');
        document.body.appendChild(container);

        ReactDOM.render(React.createElement(Main, null), container);

        postRobot.once('init', () => 'attachTestComponent');
    });

    it('should enter a component rendered with react and call a prop', function(done) {

        let Main = window.React.createClass({

            render: function() {

                function foo(bar) {
                    assert.equal(bar, 'bar');
                    done();
                }

                return window.React.createElement(
                    'div',
                    null,
                    React.createElement(testComponent.react, { foo: foo })
                );
            }
        });

        let container = document.createElement('div');
        document.body.appendChild(container);

        ReactDOM.render(React.createElement(Main, null), container);

        postRobot.once('init', () => 'attachTestComponentAndCallFoo');
    });

    it('should enter a component rendered with angular and call onEnter', function(done) {

        angular.module('app', []);
        angular.bootstrap(document.body, ['app']);

        let injector = angular.element(document.body).injector();
        let $compile = injector.get('$compile');
        let $rootScope = injector.get('$rootScope');

        let $scope = $rootScope.$new();
        $scope.onEnter = done;

        let element = $compile(`
            <test-component on-enter="onEnter"></test-component>
        `)($scope, function(element) {
            document.body.appendChild(element[0]);
        });

        postRobot.once('init', () => 'attachTestComponent');
    });

    it('should enter a component rendered with angular and call a prop', function(done) {

        angular.module('app', []);
        angular.bootstrap(document.body, ['app']);

        let injector = angular.element(document.body).injector();
        let $compile = injector.get('$compile');
        let $rootScope = injector.get('$rootScope');

        let $scope = $rootScope.$new();
        $scope.foo = function() {
            return done();
        };

        let element = $compile(`
            <test-component foo="foo"></test-component>
        `)($scope, function(element) {
            document.body.appendChild(element[0]);
        });

        postRobot.once('init', () => 'attachTestComponentAndCallFoo');
    });

    it('should enter a component rendered with a script tag and call onEnter', function(done) {

        let container = document.createElement('div');
        document.body.appendChild(container);

        window.done = done;

        container.innerHTML = `
            <script type="application/x-component" data-component="test-component">
                {
                    onEnter: window.done
                }
            </script>
        `;

        postRobot.once('init', () => 'attachTestComponent');
    });

    it('should enter a component rendered with a script tag and call a prop', function(done) {

        let container = document.createElement('div');
        document.body.appendChild(container);

        window.done = done;

        container.innerHTML = `
            <script type="application/x-component" data-component="test-component">
                {
                    foo: function() {
                        window.done();
                    }
                }
            </script>
        `;

        postRobot.once('init', () => 'attachTestComponentAndCallFoo');
    });
});


describe('xcomponent validation errors', function() {

    function expectError(method) {
        try {
            method();
        } catch (err) {
            assert.isTrue(err instanceof Error, 'Expected Error object to be thrown');
            return;
        }

        throw new Error('Expected error to be thrown');
    }

    it('should throw validation errors when a component is created without the correct options', function() {

        expectError(function() {
            xcomponent.create({});
        });

        expectError(function() {
            xcomponent.create({
                tag: 'special$%&-chars'
            });
        });

        expectError(function() {
            xcomponent.create({
                tag: 'my-component',
                dimensions: 'moo'
            });
        });

        expectError(function() {
            xcomponent.create({
                tag: 'my-component',
                dimensions: {}
            });
        });

        expectError(function() {
            xcomponent.create({
                tag: 'my-component',
                dimensions: {
                    height: 'foo',
                    width: 'bar'
                }
            });
        });

        expectError(function() {
            xcomponent.create({
                tag: 'my-component',
                dimensions: {
                    height: 'foo',
                    width: 50
                }
            });
        });

        expectError(function() {
            xcomponent.create({
                tag: 'my-component',
                dimensions: {
                    height: 50,
                    width: 200
                }
            });
        });

        xcomponent.create({
            tag: 'my-component',
            dimensions: {
                height: 50,
                width: 200
            },
            url: 'http://zombo.com'
        });

        expectError(function() {
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

        expectError(function() {
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

        expectError(function() {
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

        expectError(function() {
            xcomponent.create({
                tag: 'my-component',
                dimensions: {
                    height: 50,
                    width: 200
                },
                url: 'http://zombo.com',
                props: {
                    onEnter: {
                        type: 'function'
                    }
                }
            });
        });

        expectError(function() {
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

        expectError(function() {
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
                        def: function() {}
                    }
                }
            });
        });

        expectError(function() {
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

        expectError(function() {
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
            }
        });

        expectError(function() {
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

        expectError(function() {
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

        expectError(function() {
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

        expectError(function() {
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

        expectError(function() {
            xcomponent.create({
                tag: 'my-component',
                dimensions: {
                    height: 50,
                    width: 200
                },
                defaultEnv: 'moo'
            });
        });

        expectError(function() {
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

        expectError(function() {
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
});