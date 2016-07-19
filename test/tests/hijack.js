
import postRobot from 'post-robot/src';

import { testComponent } from '../component';

let component;

afterEach(() => {
    if (component) {
        component.destroy();
        component = null;
    }
});

describe('xcomponent hijack', () => {

    it('should render a component by hijacking a button to a lightbox', done => {

        let form = document.createElement('form');
        form.method = 'POST';
        form.action = '/base/test/child.htm?foo=xyzhijacktest';

        let button = document.createElement('button');
        button.id = 'hijackButton';

        form.appendChild(button);
        document.body.appendChild(form);

        component = testComponent.init({
            sendUrl(url) {
                assert.isTrue(url.indexOf('xyzhijacktest') !== -1, 'Expected url to be custom url passed during init');
                document.body.removeChild(form);
                done();
            }
        });

        component.hijackButtonToLightbox('#hijackButton');

        postRobot.once('init', () => 'attachTestComponent');

        button.click();
    });

    it('should render a component by hijacking a button to a popup', done => {

        let form = document.createElement('form');
        form.method = 'POST';
        form.action = '/base/test/child.htm?foo=xyzhijacktest';

        let button = document.createElement('button');
        button.id = 'hijackButton';

        form.appendChild(button);
        document.body.appendChild(form);

        component = testComponent.init({
            sendUrl(url) {
                assert.isTrue(url.indexOf('xyzhijacktest') !== -1, 'Expected url to be custom url passed during init');
                document.body.removeChild(form);
                done();
            }
        });

        component.hijackButtonToPopup('#hijackButton');

        postRobot.once('init', () => 'attachTestComponent');

        button.click();
    });

    it('should render a component by hijacking a link to a lightbox', done => {

        let link = document.createElement('a');
        link.id = 'hijackLink';
        link.href = '/base/test/child.htm?foo=xyzhijacktest';

        document.body.appendChild(link);

        component = testComponent.init({
            sendUrl(url) {
                assert.isTrue(url.indexOf('xyzhijacktest') !== -1, 'Expected url to be custom url passed during init');
                document.body.removeChild(link);
                done();
            }
        });

        component.hijackButtonToLightbox('hijackLink');

        postRobot.once('init', () => 'attachTestComponent');

        link.click();
    });

    it('should render a component by hijacking a link to a popup', done => {

        let link = document.createElement('a');
        link.id = 'hijackLink';
        link.href = '/base/test/child.htm?foo=xyzhijacktest';

        document.body.appendChild(link);

        component = testComponent.init({
            sendUrl(url) {
                assert.isTrue(url.indexOf('xyzhijacktest') !== -1, 'Expected url to be custom url passed during init');
                document.body.removeChild(link);
                done();
            }
        });

        component.hijackButtonToPopup('#hijackLink');

        postRobot.once('init', () => 'attachTestComponent');

        link.click();
    });

    it('should render a component by submitting a button from a child component', done => {

        let form = document.createElement('form');
        form.id = 'hijackForm';
        form.method = 'POST';
        form.action = '/base/test/child.htm?foo=xyzhijacktest';

        document.body.appendChild(form);

        component = testComponent.init({
            sendUrl(url) {
                assert.isTrue(url.indexOf('xyzhijacktest') !== -1, 'Expected url to be custom url passed during init');
                document.body.removeChild(form);
                done();
            }
        });

        component.renderIframe('#hijackForm');

        postRobot.once('init', () => 'attachTestComponentAndSubmitParentButton');
    });
});