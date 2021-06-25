/* @flow */
/** @jsx node */

import { wrapPromise } from 'belter/src';

import { zoid } from '../zoid';
import { getBody } from '../common';

describe('zoid eligible cases', () => {

    it('should initialize a component, with no eligibility and check it is eligible', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-iframe-eligible-undefined',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const component = window.__component__();

            const instance = component({
                onRendered: expect('onRendered')
            });

            if (!instance.isEligible()) {
                throw new Error(`Expected component to be eligible`);
            }

            return instance.render(getBody());
        });
    });

    it('should initialize a component, with true eligibility and check it is eligible', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:      'test-render-iframe-eligible-true',
                    url:      'mock://www.child.com/base/test/windows/child/index.htm',
                    domain:   'mock://www.child.com',
                    eligible: () => ({ eligible: true })
                });
            };

            const component = window.__component__();

            const instance = component({
                onRendered: expect('onRendered')
            });

            if (!instance.isEligible()) {
                throw new Error(`Expected component to be eligible`);
            }

            return instance.render(getBody());
        });
    });

    it('should initialize a component, with true eligibility based on a prop and check it is eligible', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:      'test-render-iframe-eligible-true-prop',
                    url:      'mock://www.child.com/base/test/windows/child/index.htm',
                    domain:   'mock://www.child.com',
                    eligible: ({ props }) => ({ eligible: (props.foo === 'bar') })
                });
            };

            const component = window.__component__();

            const instance = component({
                foo:        'bar',
                onRendered: expect('onRendered')
            });

            if (!instance.isEligible()) {
                throw new Error(`Expected component to be eligible`);
            }

            return instance.render(getBody());
        });
    });

    it('should initialize a component, with false eligibility and check it is eligible', () => {
        return wrapPromise(({ expect, avoid }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:      'test-render-iframe-eligible-false',
                    url:      'mock://www.child.com/base/test/windows/child/index.htm',
                    domain:   'mock://www.child.com',
                    eligible: () => ({ eligible: false })
                });
            };

            const component = window.__component__();

            const instance = component({
                onRendered: avoid('onRendered')
            });

            if (instance.isEligible()) {
                throw new Error(`Expected component to be eligible`);
            }

            return instance.render(getBody()).catch(expect('renderError'));
        });
    });

    it('should initialize a component, with true eligibility based on a prop and check it is eligible', () => {
        return wrapPromise(({ expect, avoid }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:      'test-render-iframe-eligible-false-prop',
                    url:      'mock://www.child.com/base/test/windows/child/index.htm',
                    domain:   'mock://www.child.com',
                    eligible: ({ props }) => ({ eligible: (props.foo === 'bar') })
                });
            };

            const component = window.__component__();

            const instance = component({
                foo:        'baz',
                onRendered: avoid('onRendered')
            });

            if (instance.isEligible()) {
                throw new Error(`Expected component to be eligible`);
            }

            return instance.render(getBody()).catch(expect('renderError'));
        });
    });

    it('should initialize a component, with false eligibility and do not validate props', () => {
        return wrapPromise(({ expect, avoid }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:      'test-render-iframe-eligible-false-validate',
                    url:      'mock://www.child.com/base/test/windows/child/index.htm',
                    domain:   'mock://www.child.com',
                    eligible: () => ({ eligible: false }),
                    props:    {
                        foo: {
                            type:     'string',
                            validate: () => {
                                throw new Error(`Value is not valid`);
                            }
                        }
                    }
                });
            };

            const component = window.__component__();

            const instance = component({
                foo:        'blerp',
                onRendered: avoid('onRendered')
            });

            if (instance.isEligible()) {
                throw new Error(`Expected component to be eligible`);
            }

            return instance.render(getBody()).catch(expect('renderError'));
        });
    });
});
