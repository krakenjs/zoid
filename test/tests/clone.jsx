/* @flow */
/** @jsx node */

import { wrapPromise } from '@krakenjs/belter/src';
import { getParent } from '@krakenjs/cross-domain-utils/src';
import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';

import { zoid } from '../zoid';
import { onWindowOpen, getBody } from '../common';

describe('zoid clone cases', () => {

    it('should initialize a component, and clone it', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-iframe-clone',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
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
                onRendered: expect('onRendered')
            }).clone().render(getBody());
        });
    });

    it('should initialize a component, and clone it with different props', () => {
        return wrapPromise(({ expect, avoid }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-iframe-clone-props',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
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
                onRendered: avoid('onRenderedOriginal')
            }).clone({
                decorate: () => {
                    return {
                        onRendered: expect('onRendered')
                    };
                }
            }).render(getBody());
        });
    });

    it('should initialize a component, and clone it from instances', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-iframe-clone-instances',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            onWindowOpen().then(expect('onWindowOpen', ({ win }) => {
                if (getParent(win) !== window) {
                    throw new Error(`Expected window parent to be current window`);
                }
            }));

            const component = window.__component__();
            component({
                onRendered: expect('onRendered')
            });

            if (component.instances.length !== 1) {
                throw new Error(`Expected 1 instance, got ${ component.instances.length }`);
            }
            
            const clone = component.instances[0].clone();

            if (component.instances.length !== 2) {
                throw new Error(`Expected 2 instances, got ${ component.instances.length }`);
            }
            
            return clone.render(getBody()).then(() => {
                return ZalgoPromise.all([
                    component.instances[0].close(),
                    clone.close()
                ]);
            }).then(() => {
                if (component.instances.length !== 0) {
                    throw new Error(`Expected 0 instances, got ${ component.instances.length }`);
                }
            });
        });
    });

    it('should initialize a component, and clone it from instances with different props', () => {
        return wrapPromise(({ expect, avoid }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-iframe-clone-instances-props',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            onWindowOpen().then(expect('onWindowOpen', ({ win }) => {
                if (getParent(win) !== window) {
                    throw new Error(`Expected window parent to be current window`);
                }
            }));

            const component = window.__component__();
            component({
                onRendered: avoid('onRenderedOriginal')
            });

            if (component.instances.length !== 1) {
                throw new Error(`Expected 1 instance, got ${ component.instances.length }`);
            }

            const clone = component.instances[0].clone({
                decorate: () => {
                    return {
                        onRendered: expect('onRendered')
                    };
                }
            });

            if (component.instances.length !== 2) {
                throw new Error(`Expected 2 instances, got ${ component.instances.length }`);
            }
            
            return clone.render(getBody()).then(() => {
                return ZalgoPromise.all([
                    component.instances[0].close(),
                    clone.close()
                ]);
            }).then(() => {
                if (component.instances.length !== 0) {
                    throw new Error(`Expected 0 instances, got ${ component.instances.length }`);
                }
            });
        });
    });

    it('should initialize an ineligible component, clone it, and make sure both instances are destroyed', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:      'test-render-iframe-clone-ineligible',
                    url:      'mock://www.child.com/base/test/windows/child/index.htm',
                    domain:   'mock://www.child.com',
                    eligible: () => ({ eligible: false })
                });
            };

            const component = window.__component__();
            return component({
                onDestroy: expect('onDestroy')
            }).clone({
                decorate: () => {
                    return {
                        onDestroy: expect('onDestroy2')
                    };
                }
            }).render(getBody()).catch(expect('catch')).then(() => {
                if (component.instances.length !== 0) {
                    throw new Error(`Expected 0 instances, got ${ component.instances.length }`);
                }
            });
        });
    });
});
