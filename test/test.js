
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

    it('should close an xcomponent popup', function(done) {

        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!');

        component = testComponent.init({

            onEnter() {
                let win = component.window;

                component.close().then(() => {
                    assert.isTrue(win.closed, 'Expected component window to be closed');
                    done();
                });
            }

        }).renderPopup();

        postRobot.once('init', () => 'attachTestComponent');
    });

    it('should close an xcomponent lightbox', function(done) {

        component = testComponent.init({

            onEnter() {
                let win = component.window;

                component.close().then(() => {
                    assert.isTrue(win.closed, 'Expected component window to be closed');
                    done();
                });
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