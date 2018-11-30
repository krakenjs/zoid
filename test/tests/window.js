/* @flow */
/* eslint max-nested-callbacks: off */

import { send } from 'post-robot/src';
import { uniqueID, wrapPromise } from 'belter/src';

import { testComponent } from '../component';

describe('zoid window prop cases', () => {

    it('should pass a custom iframe to a component', () => {
        return wrapPromise(({ expect }) => {

            let body = document.body;
            if (!body) {
                throw new Error(`Can not find body`);
            }

            let frame = document.createElement('iframe');
            body.appendChild(frame);
            let win = frame.contentWindow;
            let uid = uniqueID();
    
            return testComponent.renderIframe({
                window: win,
    
                passUIDGetter: expect(getUID => {
                    return send(win, 'eval', {
                        code: `
                            window.uid = ${ JSON.stringify(uid) };
                        `
                    }).then(() => {
                        return getUID();
                    }).then(childUID => {
                        if (childUID !== uid) {
                            throw new Error(`Expected uid to match`);
                        }
                    });
                }),
    
                run: `
                    window.xprops.passUIDGetter(() => window.uid);
                `
            }, document.body);
        });
    });

    it('should pass a custom popup to a component', () => {
        return wrapPromise(({ expect }) => {

            let win = window.open('', '');
            let uid = uniqueID();
    
            return testComponent.renderIframe({
                window: win,
    
                passUIDGetter: expect(getUID => {
                    return send(win, 'eval', {
                        code: `
                            window.uid = ${ JSON.stringify(uid) };
                        `
                    }).then(() => {
                        return getUID();
                    }).then(childUID => {
                        if (childUID !== uid) {
                            throw new Error(`Expected uid to match`);
                        }
                    });
                }),
    
                run: `
                    window.xprops.passUIDGetter(() => window.uid);
                `
            }, document.body);
        });
    });

    it('should renderTo with a custom iframe passed through an iframe', () => {
        return wrapPromise(({ expect }) => {

            let body = document.body;
            if (!body) {
                throw new Error(`Can not find body`);
            }

            let frame = document.createElement('iframe');
            body.appendChild(frame);
            let win = frame.contentWindow;
            let uid = uniqueID();

            return testComponent.renderIframe({
                myCustomWindow: win,

                passUIDGetter: expect(getUID => {
                    return send(win, 'eval', {
                        code: `
                            window.uid = ${ JSON.stringify(uid) };
                        `
                    }).then(() => {
                        return getUID();
                    }).then(childUID => {
                        if (childUID !== uid) {
                            throw new Error(`Expected uid to match`);
                        }
                    });
                }),
    
                run: `
                    zoid.getByTag('test-component2').renderIframeTo(window.parent, {
                        window: window.xprops.myCustomWindow,

                        passUIDGetter: window.xprops.passUIDGetter,
                        
                        run: \`
                            window.xprops.passUIDGetter(() => window.uid);
                        \`
                    }, 'body');
                `
            }, document.body);
        });
    });

    it('should renderTo with a custom popup passed through an iframe', () => {
        return wrapPromise(({ expect }) => {

            let win = window.open('', '');
            let uid = uniqueID();

            return testComponent.renderIframe({
                myCustomWindow: win,

                passUIDGetter: expect(getUID => {
                    return send(win, 'eval', {
                        code: `
                            window.uid = ${ JSON.stringify(uid) };
                        `
                    }).then(() => {
                        return getUID();
                    }).then(childUID => {
                        if (childUID !== uid) {
                            throw new Error(`Expected uid to match`);
                        }
                    });
                }),
    
                run: `
                    zoid.getByTag('test-component2').renderIframeTo(window.parent, {
                        window: window.xprops.myCustomWindow,

                        passUIDGetter: window.xprops.passUIDGetter,
                        
                        run: \`
                            window.xprops.passUIDGetter(() => window.uid);
                        \`
                    }, 'body');
                `
            }, document.body);
        });
    });
});
