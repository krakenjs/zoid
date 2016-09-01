
import xcomponent from 'src/index';

import { testComponent, testComponent3 } from '../component';

describe('xcomponent error cases', () => {

    it('should error out when window.open returns a closed window', done => {

        let windowOpen = window.open;

        window.open = () => {
            return {
                closed: true,
                close() {}
            };
        };

        testComponent.init({
            onEnter: done

        }).renderPopup().catch(err => {
            assert.isTrue(err instanceof xcomponent.PopupOpenError, 'Expected PopupOpenError when popup is not opened');
            window.open = windowOpen;
            done();
        });
    });

    it('should enter a component, throw an integration error, and return the error to the parent with the original stack', done => {

        testComponent.init({

            onError(err) {
                assert.isTrue(err.message.indexOf('xxxxx') !== -1, 'Expected error to contain original error');
                done();
            },

            run: `
                window.xchild.error(new Error('xxxxx'));
            `
        }).renderLightbox();
    });

    it('should enter a component and timeout, then call onTimeout', done => {

        testComponent.init({
            timeout: 1,
            onTimeout() {
                done();
            }
        }).renderLightbox();
    });

    it('should enter a component and timeout, then call onError in the absense of onTimeout', done => {

        testComponent.init({
            timeout: 1,
            onError() {
                done();
            }
        }).renderLightbox();
    });

    it('should enter a component and timeout, then log an error in the absense of onTimeout and onError', done => {

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

    it.skip('should enter a component and error out when the page name is not valid', done => {

        window.open('/base/test/child.htm', 'INVALIDNAME');
    });

    it('should try to enter a singleton component twice and error out', done => {

        testComponent.init({
            onEnter() {
                try {
                    testComponent.init();
                } catch (err) {
                    done();
                }
            }
        }).renderLightbox();
    });

    it('should try to render a component twice and error out', done => {

        let component = testComponent.init();

        component.render().then(() => {
            component.render().catch(() => {
                done();
            });
        });
    });

    it('should try to render a component to an unsupported context and error out', done => {

        testComponent3.init().render(null, 'moo').catch(() => {
            done();
        });
    });

    it('should try to render a component with a specified element when iframe mode is not supported', done => {

        testComponent3.init().render(document.body).catch(() => {
            done();
        });
    });

    it('should try to render to when iframe is the only available option but no element is passed', done => {

        let originalDefaultContext = testComponent.defaultContext;
        let originalContexts = testComponent.contexts;

        delete testComponent.defaultContext;
        testComponent.contexts = {
            popup: false,
            lightbox: false,
            iframe: true
        };

        testComponent.init().render().catch(err => {
            assert.ok(err);
            testComponent.defaultContext = originalDefaultContext;
            testComponent.contexts = originalContexts;
            done();
        });
    });

    it('should call onclose when a popup is closed by someone other than xcomponent', done => {

        testComponent.init({

            onEnter() {
                setTimeout(() => {
                    this.window.close();
                });
            },

            onClose() {
                done();
            }
        }).renderPopup();
    });

    it('should call onclose when a lightbox is closed by someone other than xcomponent', done => {

        testComponent.init({

            onEnter() {
                setTimeout(() => {
                    this.iframe.parentNode.removeChild(this.iframe);
                });
            },

            onClose() {
                done();
            }
        }).renderLightbox();
    });
});