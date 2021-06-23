/* @flow */
/** @jsx node */

import { wrapPromise } from 'belter/src';

describe('zoid export cases', () => {

    it('should render a component with an exported function and call that function directly on the instance', () => {
        return wrapPromise(() => {
            const expectedResult = 'hello world';

            window.__component__ = () => {
                return window.zoid.create({
                    tag:     'test-export-function-instance',
                    url:     () => '/base/test/windows/child/index.htm',
                    domain:  'mock://www.child.com',
                    exports: ({ getExports }) => {
                        return {
                            doSomething: (...args) => {
                                return getExports().then(exports => {
                                    return exports.doSomething(...args);
                                });
                            }
                        };
                    }
                });
            };

            const component = window.__component__();
            const instance = component({
                run: () => `
                    window.xprops.export({
                        doSomething: () => {
                            return ${ JSON.stringify(expectedResult) };
                        }
                    });
                `
            });

            const resultPromise = instance.doSomething();

            return instance.render(document.body).then(() => {
                return resultPromise;
            }).then(result => {
                if (result !== expectedResult) {
                    throw new Error(`Expected component.doSomething to return ${ JSON.stringify(expectedResult) }, got ${ JSON.stringify(result) }`);
                }
            });
        });
    });

    it('should render a component with an exported value and get that value directly on the instance', () => {
        return wrapPromise(() => {
            const expectedResult = 'hello world';

            window.__component__ = () => {
                return window.zoid.create({
                    tag:     'test-export-value-instance',
                    url:     () => '/base/test/windows/child/index.htm',
                    domain:  'mock://www.child.com',
                    exports: ({ getExports }) => {
                        return {
                            get value() : string {
                                return getExports().then(exports => {
                                    return exports.value;
                                });
                            }
                        };
                    }
                });
            };

            const component = window.__component__();
            const instance = component({
                run: () => `
                    window.xprops.export({
                        value: ${ JSON.stringify(expectedResult) }
                    });
                `
            });

            const valuePromise = instance.value;

            return instance.render(document.body).then(() => {
                return valuePromise;
            }).then(result => {
                if (result !== expectedResult) {
                    throw new Error(`Expected component.value to be a promise for ${ JSON.stringify(expectedResult) }, got ${ JSON.stringify(result) }`);
                }
            });
        });
    });
});
