/* @flow */

import { assert } from 'chai';

import zoid from '../../src';
import { testComponent } from '../component';

describe('zoid hijack', () => {

    it('should render a component by hijacking a button to an iframe', done => {

        let form = document.createElement('form');
        form.method = 'POST';
        form.action = '/base/test/child.htm?foo=xyzhijacktest';

        let button = document.createElement('button');
        button.id = 'hijackButton';

        form.appendChild(button);
        if (!document.body) {
            throw new Error(`Expected document.body to be present`);
        }
        document.body.appendChild(form);

        let component = testComponent.init({
            sendUrl(url) {
                assert.isTrue(url.indexOf('xyzhijacktest') !== -1, 'Expected url to be custom url passed during init');
                if (!document.body) {
                    throw new Error(`Expected document.body to be present`);
                }
                document.body.removeChild(form);
                done();
            },

            run: `
                window.xprops.sendUrl(window.location.pathname + window.location.search);
            `
        }, zoid.CONSTANTS.CONTEXT_TYPES.IFRAME, document.body);

        button.addEventListener('click', (event : Event) => {
            // $FlowFixMe
            let target = event.target.form ? event.target.form : event.target;
            // $FlowFixMe
            component.hijack(target);
            component.render(null, false);
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
        if (!document.body) {
            throw new Error(`Expected document.body to be present`);
        }
        document.body.appendChild(form);

        let component = testComponent.init({
            sendUrl(url) {
                assert.isTrue(url.indexOf('xyzhijacktest') !== -1, 'Expected url to be custom url passed during init');
                if (!document.body) {
                    throw new Error(`Expected document.body to be present`);
                }
                document.body.removeChild(form);
                done();
            },

            run: `
                window.xprops.sendUrl(window.location.pathname + window.location.search);
            `
        }, zoid.CONSTANTS.CONTEXT_TYPES.POPUP);

        button.addEventListener('click', (event : Event) => {
            // $FlowFixMe
            let target = event.target.form ? event.target.form : event.target;
            // $FlowFixMe
            component.hijack(target);
            component.render(null, false);
        });

        button.click();
    });

    it('should render a component by hijacking a link to an iframe', done => {

        let link = document.createElement('a');
        link.id = 'hijackLink';
        link.href = '/base/test/child.htm?foo=xyzhijacktest';

        if (!document.body) {
            throw new Error(`Expected document.body to be present`);
        }

        document.body.appendChild(link);

        let component = testComponent.init({
            sendUrl(url) {
                assert.isTrue(url.indexOf('xyzhijacktest') !== -1, 'Expected url to be custom url passed during init');
                
                if (!document.body) {
                    throw new Error(`Expected document.body to be present`);
                }
                document.body.removeChild(link);
                done();
            },

            run: `
                window.xprops.sendUrl(window.location.pathname + window.location.search);
            `
        }, zoid.CONSTANTS.CONTEXT_TYPES.IFRAME, document.body);

        link.addEventListener('click', (event : Event) => {
            // $FlowFixMe
            let target = event.target.form ? event.target.form : event.target;
            // $FlowFixMe
            component.hijack(target);
            component.render(null, false);
        });

        link.click();
    });

    it('should render a component by hijacking a link to a popup', done => {

        let link = document.createElement('a');
        link.id = 'hijackLink';
        link.href = '/base/test/child.htm?foo=xyzhijacktest';

        if (!document.body) {
            throw new Error(`Expected document.body to be present`);
        }

        document.body.appendChild(link);

        let component = testComponent.init({
            sendUrl(url) {
                assert.isTrue(url.indexOf('xyzhijacktest') !== -1, 'Expected url to be custom url passed during init');
                if (!document.body) {
                    throw new Error(`Expected document.body to be present`);
                }
                document.body.removeChild(link);
                done();
            },

            run: `
                window.xprops.sendUrl(window.location.pathname + window.location.search);
            `
        }, zoid.CONSTANTS.CONTEXT_TYPES.POPUP);

        link.addEventListener('click', (event : Event) => {
            // $FlowFixMe
            let target = event.target.form ? event.target.form : event.target;
            // $FlowFixMe
            component.hijack(target);
            component.render(null, false);
        });

        link.click();
    });
});
