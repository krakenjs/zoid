
import xcomponent from 'src/index';

import { testComponent } from '../component';

describe('xcomponent hijack', () => {

    it('should render a component by hijacking a button to a lightbox', done => {

        let form = document.createElement('form');
        form.method = 'POST';
        form.action = '/base/test/child.htm?foo=xyzhijacktest';

        let button = document.createElement('button');
        button.id = 'hijackButton';

        form.appendChild(button);
        document.body.appendChild(form);

        let component = testComponent.init({
            sendUrl(url) {
                assert.isTrue(url.indexOf('xyzhijacktest') !== -1, 'Expected url to be custom url passed during init');
                document.body.removeChild(form);
                done();
            },

            run: `
                window.xprops.sendUrl(window.location.pathname + window.location.search);
            `
        });

        document.getElementById('hijackButton').addEventListener('click', event => {
            let target = event.target.form ? event.target.form : event.target;
            component.renderHijack(target, null, xcomponent.CONSTANTS.CONTEXT_TYPES.LIGHTBOX);
        });

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

        let component = testComponent.init({
            sendUrl(url) {
                assert.isTrue(url.indexOf('xyzhijacktest') !== -1, 'Expected url to be custom url passed during init');
                document.body.removeChild(form);
                done();
            },

            run: `
                window.xprops.sendUrl(window.location.pathname + window.location.search);
            `
        });

        document.getElementById('hijackButton').addEventListener('click', event => {
            let target = event.target.form ? event.target.form : event.target;
            component.renderHijack(target, null, xcomponent.CONSTANTS.CONTEXT_TYPES.POPUP);
        });

        button.click();
    });

    it('should render a component by hijacking a link to a lightbox', done => {

        let link = document.createElement('a');
        link.id = 'hijackLink';
        link.href = '/base/test/child.htm?foo=xyzhijacktest';

        document.body.appendChild(link);

        let component = testComponent.init({
            sendUrl(url) {
                assert.isTrue(url.indexOf('xyzhijacktest') !== -1, 'Expected url to be custom url passed during init');
                document.body.removeChild(link);
                done();
            },

            run: `
                window.xprops.sendUrl(window.location.pathname + window.location.search);
            `
        });

        document.getElementById('hijackLink').addEventListener('click', event => {
            let target = event.target.form ? event.target.form : event.target;
            component.renderHijack(target, null, xcomponent.CONSTANTS.CONTEXT_TYPES.LIGHTBOX);
        });

        link.click();
    });

    it('should render a component by hijacking a link to a popup', done => {

        let link = document.createElement('a');
        link.id = 'hijackLink';
        link.href = '/base/test/child.htm?foo=xyzhijacktest';

        document.body.appendChild(link);

        let component = testComponent.init({
            sendUrl(url) {
                assert.isTrue(url.indexOf('xyzhijacktest') !== -1, 'Expected url to be custom url passed during init');
                document.body.removeChild(link);
                done();
            },

            run: `
                window.xprops.sendUrl(window.location.pathname + window.location.search);
            `
        });

        document.getElementById('hijackLink').addEventListener('click', event => {
            let target = event.target.form ? event.target.form : event.target;
            component.renderHijack(target, null, xcomponent.CONSTANTS.CONTEXT_TYPES.LIGHTBOX);
        });

        link.click();
    });
});