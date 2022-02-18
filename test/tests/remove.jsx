/* @flow */
/** @jsx node */

import { ZalgoPromise } from 'zalgo-promise/src';
import { wrapPromise } from 'belter/src';
import { getParent } from '@krakenjs/cross-domain-utils/src';

import { onWindowOpen, getContainer } from '../common';
import { zoid } from '../zoid';

describe('zoid remove cases', () => {

    it('should render a component, remove it from the dom, and immediately destroy the component', () => {
        return wrapPromise(({ expect }) => {
            let closed = false;

            const { container, destroy } = getContainer();

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-remove-destroy',
                    url:    () => 'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            onWindowOpen().then(expect('onWindowOpen', ({ win }) => {
                if (getParent(win) !== window) {
                    throw new Error(`Expected window parent to be current window`);
                }
            }));

            const component = window.__component__();
            return component({

                onRendered: expect('onRendered'),
                onClose:    expect('onClose', () => {
                    closed = true;
                })

            }).render(container).then(() => {

                if (closed) {
                    throw new Error(`Expected element to not be closed`);
                }

                destroy();

                return ZalgoPromise.delay(5);

            }).then(() => {
                
                if (!closed) {
                    throw new Error(`Expected element to be closed`);
                }
            });
        });
    });

    it('should render a component into the shadow dom, remove it from the dom, and immediately destroy the component', () => {
        return wrapPromise(({ expect }) => {
            let closed = false;

            const { container, destroy } = getContainer({ shadow: true });

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-remove-destroy-shadow',
                    url:    () => 'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            onWindowOpen().then(expect('onWindowOpen', ({ win }) => {
                if (getParent(win) !== window) {
                    throw new Error(`Expected window parent to be current window`);
                }
            }));

            const component = window.__component__();
            return component({

                onRendered: expect('onRendered'),
                onClose:    expect('onClose', () => {
                    closed = true;
                })

            }).render(container).then(() => {

                if (closed) {
                    throw new Error(`Expected element to not be closed`);
                }

                destroy();

                return ZalgoPromise.delay(5);

            }).then(() => {
                
                if (!closed) {
                    throw new Error(`Expected element to be closed`);
                }
            });
        });
    });
});
