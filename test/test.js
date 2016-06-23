
import xcomponent from 'src/index';
import postRobot from 'post-robot/src';
import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';

import { testComponent, testComponent3, testComponent4, testComponent5 } from './component';
import { loadScript, once, b64encode } from 'src/lib';
import { CONTEXT_TYPES } from 'src/constants';

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

    it('should enter a component rendered as a lightbox with the correct dimensions', function(done) {

        component = testComponent.init({
            onEnter: function() {
                if (!(this.window.innerWidth === this.component.dimensions.width && this.window.innerHeight === this.component.dimensions.height)) {
                    throw new Error('The parent and child window dimensions do not match'+'|'+ window.innerWidth);
                } else {
                    done();
                }
            }
        }).renderLightbox();

        postRobot.once('init', () => 'attachTestComponent');
    });

    it('should enter a component rendered as a popup with the correct dimensions', function(done) {

        let open = window.open;
        window.open = function(url, name, options) {
            assert.isTrue(options.indexOf(`width=${testComponent.dimensions.width}`) !== -1, 'Expected width passed to window.open to be correct');
            assert.isTrue(options.indexOf(`height=${testComponent.dimensions.height}`) !== -1, 'Expected height passed to window.open to be correct');
            return open.apply(this, arguments);
        }

        component = testComponent.init({
            onEnter: function() {
                done();

                /* For some reason karma/phantomjs don't respect the passed dimensions, so can't check them this way

                if (!(this.window.innerWidth === this.component.dimensions.width && this.window.innerHeight === this.component.dimensions.height)) {
                    throw new Error('The parent and child window dimensions do not match'+'|'+ window.innerWidth);
                } else {
                    done();
                }

                */
            }
        }).renderPopup();

        window.open = open;

        postRobot.once('init', () => 'attachTestComponent');
    });

    it('should enter a component rendered as a lightbox with no dimensions', function(done) {

        component = testComponent4.init({
            onEnter: function() {
                if (!(window.innerWidth === this.window.innerWidth && window.innerHeight === this.window.innerHeight)) {
                    throw new Error('The parent and child window dimensions do not match'+'|'+ window.innerWidth);
                } else {
                    done();
                }
            }
        }).renderLightbox();

        postRobot.once('init', () => 'attachTestComponent4');
    });

    it('should enter a component rendered as a popup with no dimensions', function(done) {

        let open = window.open;
        window.open = function(url, name, options) {
            assert.isTrue(options.indexOf(`width=`) === -1, 'Expected width not to be passed to window.open');
            assert.isTrue(options.indexOf(`height=`) === -1, 'Expected height not to be passed to window.open');
            return open.apply(this, arguments);
        }

        component = testComponent4.init({
            onEnter: function() {
                done();

                /* Chrome opens up a new window with different dimensions to the parent, so this doesn't work

                if (!(window.top.innerWidth === this.window.innerWidth && window.top.innerHeight === this.window.innerHeight)) {
                    throw new Error('The parent and child window dimensions do not match'+'|'+ window.innerWidth);
                } else {
                    done();
                }

                */
            }
        }).renderPopup();

        window.open = open;

        postRobot.once('init', () => 'attachTestComponent4');
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

    it('should try to render by passing in an element', function(done) {

        component = testComponent.init({
            onEnter: done
        }).render(document.body);

        postRobot.once('init', () => 'attachTestComponent');
    });

    it('should try to render to defaultContext lightbox', function(done) {

        let originalDefaultContext = testComponent.defaultContext;
        testComponent.defaultContext = 'lightbox';

        component = testComponent.init({
            onEnter() {
                testComponent.defaultContext = originalDefaultContext;
                done();
            }
        }).render();

        postRobot.once('init', () => 'attachTestComponent');
    });

    it('should try to render to defaultContext popup', function(done) {

        let originalDefaultContext = testComponent.defaultContext;
        testComponent.defaultContext = 'popup';

        component = testComponent.init({
            onEnter: function() {
                testComponent.defaultContext = originalDefaultContext;
                done();
            }
        }).render();

        postRobot.once('init', () => 'attachTestComponent');
    });

    it('should try to render to when popup is the only available option', function(done) {

        let originalDefaultContext = testComponent.defaultContext;
        let originalContexts = testComponent.contexts;

        delete testComponent.defaultContext;
        testComponent.contexts = {
            popup: true,
            lightbox: false,
            iframe: false
        };

        component = testComponent.init({
            onEnter() {
                testComponent.defaultContext = originalDefaultContext;
                testComponent.contexts = originalContexts;
                done();
            }
        }).render();

        postRobot.once('init', () => 'attachTestComponent');
    });

    it('should try to render to when lightbox is the only available option', function(done) {

        let originalDefaultContext = testComponent.defaultContext;
        let originalContexts = testComponent.contexts;

        delete testComponent.defaultContext;
        testComponent.contexts = {
            popup: false,
            lightbox: true,
            iframe: false
        };

        component = testComponent.init({
            onEnter() {
                testComponent.defaultContext = originalDefaultContext;
                testComponent.contexts = originalContexts;
                done();
            }
        }).render();

        postRobot.once('init', () => 'attachTestComponent');
    });

    it('should enter a component and call back with a string prop', function(done) {

        component = testComponent.init({

            stringProp: 'bar',

            foo: function(result) {
                assert.equal(result, 'bar');
                done();
            }

        }).renderLightbox();

        postRobot.once('init', () => 'attachTestComponentAndCallFooWithStringProp');
    });

    it('should enter a component and call back with a number prop', function(done) {

        component = testComponent.init({

            numberProp: 123,

            foo: function(result) {
                assert.equal(result, 123);
                done();
            }

        }).renderLightbox();

        postRobot.once('init', () => 'attachTestComponentAndCallFooWithNumberProp');
    });

    it('should enter a component and call back with a parseInted number prop', function(done) {

        component = testComponent.init({

            numberProp: '123',

            foo: function(result) {
                assert.equal(result, 123);
                done();
            }

        }).renderLightbox();

        postRobot.once('init', () => 'attachTestComponentAndCallFooWithNumberProp');
    });

    it('should enter a component and call back with a boolean prop', function(done) {

        component = testComponent.init({

            booleanProp: true,

            foo: function(result) {
                assert.equal(result, true);
                done();
            }

        }).renderLightbox();

        postRobot.once('init', () => 'attachTestComponentAndCallFooWithBooleanProp');
    });

    it('should enter a component and call back with a truthy boolean prop', function(done) {

        component = testComponent.init({

            booleanProp: 1,

            foo: function(result) {
                assert.equal(result, true);
                done();
            }

        }).renderLightbox();

        postRobot.once('init', () => 'attachTestComponentAndCallFooWithBooleanProp');
    });

    it('should enter a component and call back with a falsy boolean prop', function(done) {

        component = testComponent.init({

            booleanProp: 0,

            foo: function(result) {
                assert.equal(result, false);
                done();
            }

        }).renderLightbox();

        postRobot.once('init', () => 'attachTestComponentAndCallFooWithBooleanProp');
    });

    it('should enter a component and call back with an object prop', function(done) {

        component = testComponent.init({

            objectProp: { foo: 'bar', x: 12345, fn: function() { done(); }, obj: { bar: 'baz' } },

            foo: function(result) {
                assert.equal(result.foo, 'bar');
                assert.equal(result.obj.bar, 'baz');
                assert.equal(result.x, 12345);
                assert.isTrue(result.fn instanceof Function);
                result.fn();
            }

        }).renderLightbox();

        postRobot.once('init', () => 'attachTestComponentAndCallFooWithObjectProp');
    });

    it('should enter a component and call back with a function prop', function(done) {

        component = testComponent.init({

            functionProp: done,

            foo: function(result) {
                assert.isTrue(result instanceof Function);
                result();
            }

        }).renderLightbox();

        postRobot.once('init', () => 'attachTestComponentAndCallFooWithFunctionProp');
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

    it('should enter a component and timeout, then call onTimeout', function(done) {

        testComponent.init({
            timeout: 1,
            onTimeout() {
                done();
            }
        }).renderLightbox();
    });

    it('should enter a component and timeout, then call onError in the absense of onTimeout', function(done) {

        testComponent.init({
            timeout: 1,
            onError() {
                done();
            }
        }).renderLightbox();
    });

    it('should enter a component and timeout, then log an error in the absense of onTimeout and onError', function(done) {

        let console = window.console;

        window.console = {
            error() {
                window.console = console;
                done();
            }
        };

        testComponent.init({
            timeout: 1
        }).renderLightbox();
    });

    it('should enter a component and error out when the page name is not valid', function(done) {

        window.open('/base/test/child.htm', 'INVALIDNAME');

        postRobot.once('init', () => 'attachTestComponentWithInvalidName');
        postRobot.once('complete', () => done());
    });

    it('should enter a component and error out when the page name is not generated by xcomponent', function(done) {

        window.open('/base/test/child.htm', b64encode('{}'));

        postRobot.once('init', () => 'attachTestComponentWithInvalidName');
        postRobot.once('complete', () => done());
    });

    it('should try to enter a singleton component twice and error out', function(done) {

        component = testComponent.init({
            onEnter() {
                try {
                    testComponent.init();
                } catch (err) {
                    done();
                }
            }
        }).renderLightbox();

        postRobot.once('init', () => 'attachTestComponent');
    });

    it('should try to render a component twice and error out', function(done) {

        component = testComponent.init();

        component.render();

        try {
            component.render();
        } catch (err) {
            done();
        }
    });

    it('should try to render a component to an unsupported context and error out', function(done) {

        component = testComponent3.init();

        try {
            component.render(null, CONTEXT_TYPES.POPUP);
        } catch (err) {
            done();
        }
    });

    it('should try to render a component with a specified element when iframe mode is not supported', function(done) {

        component = testComponent3.init();

        try {
            component.render(document.body);
        } catch (err) {
            done();
        }
    });

    it('should try to render to when iframe is the only available option but no element is passed', function(done) {

        let originalDefaultContext = testComponent.defaultContext;
        let originalContexts = testComponent.contexts;

        delete testComponent.defaultContext;
        testComponent.contexts = {
            popup: false,
            lightbox: false,
            iframe: true
        };

        component = testComponent.init();

        try {
            component.render();
        } catch (err) {
            testComponent.defaultContext = originalDefaultContext;
            testComponent.contexts = originalContexts;
            done();
        }
    });

    it('should render a child component then close the parent window', function(done) {

        component = testComponent.init({
            foo: function() {
                window.mockclosed = false;
                done();
            },

            onEnter() {
                window.mockclosed = true;
            }
        });

        component.renderPopup();

        postRobot.once('init', () => 'attachTestComponentAndCallFooOnClose');
    });

    it('should call onclose when a popup is closed by someone other than xcomponent', function(done) {

        component = testComponent.init({

            onEnter() {
                setTimeout(() => {
                    this.window.close();
                });
            },

            onClose() {
                done();
            }
        });

        component.renderPopup();

        postRobot.once('init', () => 'attachTestComponent');
    });

    it('should call onclose when a lightbox is closed by someone other than xcomponent', function(done) {

        component = testComponent.init({

            onEnter() {
                setTimeout(() => {
                    this.iframe.parentNode.removeChild(this.iframe);
                });
            },

            onClose() {
                done();
            }
        });

        component.renderLightbox();

        postRobot.once('init', () => 'attachTestComponent');
    });

    it('should error on the child when trying to attach a different component to that which was rendered', function(done) {

        component = testComponent.init({
            onEnter() {
                done();
            }
        });

        component.renderLightbox();

        postRobot.once('init', () => 'attachTestComponent4AndCallCompleteOnError');
        postRobot.once('complete', () => done());
    });
});

describe('xcomponent options', function() {

    it('should enter a component with a custom url', function(done) {

        component = testComponent.init({
            url: '/base/test/child.htm?foo=xyztest',

            sendUrl: function(url) {
                assert.isTrue(url === '/base/test/child.htm?foo=xyztest', 'Expected url to be custom url passed during init');
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

    it('should enter a component and call a denodeify function returning a promise', function(done) {

        var x = 0;

        component = testComponent.init({

            denodeifyFunction(val) {
                return Promise.resolve(`${val}bar`);
            },

            complete(result) {
                assert.equal(result, 'foobar', 'Expected result to have nodeified');
                done();
            }

        }).renderLightbox();

        postRobot.once('init', () => 'attachTestComponentAndCallDenodeifyFunction');
    });

    it('should enter a component and call a denodeify function with an error', function(done) {

        var x = 0;

        component = testComponent.init({

            denodeifyFunction(val, callback) {
                setTimeout(function() {
                    return callback(new Error('foo'));
                });
            },

            complete(result) {
                assert.equal(result, 'foobar', 'Expected result to have nodeified');
                done();
            }

        }).renderLightbox();

        postRobot.once('init', () => 'attachTestComponentAndCallDenodeifyFunctionWithError');
    });

    it('should enter a component and call a denodeify function incorrectly', function(done) {

        var x = 0;

        component = testComponent.init({

            denodeifyFunction(val, callback) {
                setTimeout(function() {
                    try {
                        return callback('something aint right!');
                    } catch (err) {
                        done();
                    }
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
        }).hijackButtonToLightbox('hijackLink');

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
                    React.createElement(testComponent.react, {
                        onEnter() {
                            this.close().then(done);
                        }
                    })
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
                    this.close().then(done);
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
        $scope.onEnter = function() {
            this.close().then(done);
        };

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
            this.close().then(done);
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

        window.done = function() {
            this.close().then(done);
        };

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

        window.done = function() {
            this.close().then(done);
        };

        container.innerHTML = `
            <script type="application/x-component" data-component="test-component">
                {
                    foo: window.done
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
                envUrls: {
                    foo: 'http://www.zombo.com'
                },
                defaultUrl: 1234
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

    it('should throw validation errors when a component is inited without the correct options', function() {

        expectError(function() {
            testComponent.init({
                functionProp: 'foobar'
            });
        });

        expectError(function() {
            testComponent.init({
                stringProp: function() {}
            });
        });

        expectError(function() {
            testComponent.init({
                numberProp: function() {}
            });
        });

        expectError(function() {
            var obj = {};
            obj.obj = obj;

            testComponent.init({
                objectProp: obj
            });
        });

        expectError(function() {
            testComponent.init({
                invalidProp: 'foobar'
            });
        });

        expectError(function() {
            testComponent5.init();
        });
    });
});