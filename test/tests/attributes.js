/* @flow */

import { wrapPromise } from 'belter/src';

import { zoid } from '../zoid';
import { onWindowOpen, getBody } from '../common';

describe('zoid attributes cases', () => {
    it('should render a component to an iframe with specified static attributes', () => {
        return wrapPromise(({ expect }) => {
            const expectedScrolling = 'no';

            window.__component__ = () => {
                return zoid.create({
                    tag:        'test-render-iframe-static-attributes',
                    url:        '/base/test/windows/child/index.htm',
                    domain:     'mock://www.child.com',
                    attributes:{
                        iframe: {
                            scrolling: 'no'
                        }
                    }
                });
            };

            const componentWindowPromise = onWindowOpen().then(expect('onWindowOpen', ({ win }) => win));

            const component = window.__component__();
            return component({
                onRendered: expect('onRendered')
            }).render(getBody()).then(() => {
                return componentWindowPromise;
            }).then(componentWindow => {
                const scrolling = componentWindow.frameElement.getAttribute('scrolling');

                if (scrolling !== expectedScrolling) {
                    throw new Error(`Expected scrolling attribute to be ${ expectedScrolling }, got ${ scrolling }`);
                }
            });
        });
    });

    it('should render a component to an iframe with specified dynamic attributes', () => {
        return wrapPromise(({ expect }) => {
            const expectedScrolling = 'no';

            window.__component__ = () => {
                return zoid.create({
                    tag:        'test-render-iframe-dynamic-attributes',
                    url:        '/base/test/windows/child/index.htm',
                    domain:     'mock://www.child.com',
                    attributes:({ props }) => ({
                        iframe: {
                            scrolling: props.scrolling
                        }
                    }),
                    props: {
                        scrolling: {
                            type: 'string'
                        }
                    }
                });
            };

            const componentWindowPromise = onWindowOpen().then(expect('onWindowOpen', ({ win }) => win));

            const component = window.__component__();
            return component({
                scrolling:  'no',
                onRendered:expect('onRendered')
            }).render(getBody()).then(() => {
                return componentWindowPromise;
            }).then(componentWindow => {
                const scrolling = componentWindow.frameElement.getAttribute('scrolling');

                if (scrolling !== expectedScrolling) {
                    throw new Error(`Expected scrolling attribute to be ${ expectedScrolling }, got ${ scrolling }`);
                }
            });
        });
    });
});
