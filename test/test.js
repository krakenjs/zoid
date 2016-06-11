
import xcomponent from 'src/index';
import postRobot from 'post-robot/src';

import { testComponent } from './component';

let component;

afterEach(function() {
    component.destroy();
});

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

describe('xcomponent misc', function() {

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
        form.action = 'base/test/child.htm?foo=xyzhijacktest';

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
        form.action = 'base/test/child.htm?foo=xyzhijacktest';

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
        link.href = 'base/test/child.htm?foo=xyzhijacktest';

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
        link.href = 'base/test/child.htm?foo=xyzhijacktest';

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
});