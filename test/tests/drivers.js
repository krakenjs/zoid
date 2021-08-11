/* @flow */

import { wrapPromise } from 'belter/src';

import { zoid } from '../zoid';
import { getBody, loadScript } from '../common';

describe('zoid drivers', () => {

    before(() => {
        window.__angular_component__ = () => {
            return zoid.create({
                tag:    'test-render-angular',
                url:    'mock://www.child.com/base/test/windows/child/index.htm',
                domain: 'mock://www.child.com'
            });
        };
        
        window.angular.module('app', [ window.__angular_component__().driver('angular', window.angular).name ]);
        window.angular.bootstrap(getBody(), [ 'app' ]);
    });

    it('should enter a component rendered with react and call a prop', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-react-props',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const ReactZoidComponent = window.__component__().driver('react', { React: window.React, ReactDOM: window.ReactDOM });

            const Main = class extends window.React.Component {
                render() : Object {
                    return window.React.createElement(
                        'div',
                        null,
                        window.React.createElement(ReactZoidComponent, {

                            foo: expect('foo', bar => {
                                if (bar !== 'bar') {
                                    throw new Error(`Expected bar to be 'bar', got ${ bar }`);
                                }
                            }),

                            run: () => `
                                window.xprops.foo('bar');
                            `
                        })
                    );
                }
            };

            const container = document.createElement('div');

            if (!getBody()) {
                throw new Error(`Expected getBody() to be present`);
            }

            getBody().appendChild(container);
            window.ReactDOM.render(window.React.createElement(Main, null), container);
        });
    });

    it('should enter a component rendered with react and update a prop', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-react-update-prop',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const ReactZoidComponent = window.__component__().driver('react', { React: window.React, ReactDOM: window.ReactDOM });

            const Main = class extends window.React.Component {
                constructor() {
                    super();
                    this.state = {
                        onLoad: expect('onLoad', () => {
                            this.setState({
                                foo: expect('foo', bar => {
                                    if (bar !== 'bar') {
                                        throw new Error(`Expected bar to be 'bar', got ${ bar }`);
                                    }
                                })
                            });
                        })
                    };
                }

                render() : Object {
                    return window.React.createElement('div', null, window.React.createElement(ReactZoidComponent, {
                        foo:    this.state.foo,
                        onLoad: this.state.onLoad,

                        run: () => `
                                window.xprops.onLoad().then(() => {
                                    window.xprops.foo('bar');
                                });
                            `
                    }));
                }
            };

            const container = document.createElement('div');

            if (!getBody()) {
                throw new Error(`Expected getBody() to be present`);
            }

            getBody().appendChild(container);
            window.ReactDOM.render(window.React.createElement(Main, null), container);
        });
    });

    it('should enter a component rendered with angular and call a prop', () => {
        return wrapPromise(({ expect }) => {
            window.__component__ = window.__angular_component__;

            const injector = window.angular.element(getBody()).injector();
            const $compile = injector.get('$compile');
            const $rootScope = injector.get('$rootScope');
            const $scope = $rootScope.$new();

            $scope.testProps = {
                foo: expect('foo', bar => {
                    if (bar !== 'bar') {
                        throw new Error(`Expected bar to be 'bar', got ${ bar }`);
                    }
                }),

                run: () => `
                    window.xprops.foo('bar');
                `
            };

            $compile(`
                <test-render-angular props="testProps"></test-render-angular>
            `)($scope, expect('compile', expect('angularCompile', element => {
                if (!getBody()) {
                    throw new Error(`Expected getBody() to be present`);
                }
                getBody().appendChild(element[0]);
            })));
        });
    });

    it('should enter a component rendered with angular and update a prop', () => {
        return wrapPromise(({ expect }) => {
            window.__component__ = window.__angular_component__;
            
            const injector = window.angular.element(getBody()).injector();
            const $compile = injector.get('$compile');
            const $rootScope = injector.get('$rootScope');
            const $scope = $rootScope.$new();

            $scope.testProps = {
                onLoad: expect('onLoad', () => {
                    $scope.testProps.foo = expect('foo', bar => {
                        if (bar !== 'bar') {
                            throw new Error(`Expected bar to be 'bar', got ${ bar }`);
                        }
                    });
                }),

                run: () => `
                    window.xprops.onLoad().then(() => {
                        window.xprops.foo('bar');
                    });
                `
            };

            $compile(`
                <test-render-angular props="testProps"></test-render-angular>
            `)($scope, expect('compile', expect('angularCompile', element => {
                if (!getBody()) {
                    throw new Error(`Expected getBody() to be present`);
                }
                getBody().appendChild(element[0]);
            })));
        });
    });

    it('should enter a component rendered with vue and call a prop', () => {
        
        return wrapPromise(async ({ expect }) => {
            await loadScript('base/test/lib/vue_v2.5.16.runtime.min.js');
            
            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-vue',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            if (!getBody()) {
                throw new Error('Can not find getBody()');
            }

            const app = document.createElement('div');
            const vueComponent = window.__component__().driver('vue', window.Vue);

            if (!getBody()) {
                throw new Error(`Expected getBody() to be present`);
            }

            getBody().appendChild(app);

            new window.Vue({
                render: expect('render', createElement => {
                    return createElement(vueComponent, {
                        attrs: {
                            foo: expect('foo', bar => {
                                if (bar !== 'bar') {
                                    throw new Error(`Expected bar to be 'bar', got ${ bar }`);
                                }
                            }),
                            run: () => `window.xprops.foo('bar');`
                        }
                    });
                })
            }).$mount(app);
        });
    });

    it('should enter a component rendered with vue and update/call props with camel-case and kebab-case', () => {
        return wrapPromise(async ({ expect }) => {
            await loadScript('base/test/lib/vue_v2.5.16.runtime.min.js');


            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-vue-update-prop',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            if (!getBody()) {
                throw new Error('Can not find getBody()');
            }

            const app = document.createElement('div');
            const vueComponent = window.__component__().driver('vue', window.Vue);

            if (!getBody()) {
                throw new Error(`Expected getBody() to be present`);
            }

            getBody().appendChild(app);

            new window.Vue({
                render: expect('render', function render(createElement) : Object {
                    return createElement(vueComponent, {
                        attrs: {
                            'foo':       this.state.foo,
                            'onLoad':    this.state.onLoad,
                            'baz':       this.state.baz,
                            'on-test':   this.state.onTest,
                            'run':       this.state.run
                        }
                    });
                }),
                data() : Object {
                    return {
                        state: {
                            onLoad: expect('onLoad', () => {
                                // $FlowFixMe[object-this-reference]
                                window.Vue.set(this.state, 'foo', expect('foo', bar => {
                                    if (bar !== 'bar') {
                                        throw new Error(`Expected foo to be 'bar', got ${ bar }`);
                                    }
                                }));
                            }),
                            onTest: expect('onTest', () => {
                                // $FlowFixMe[object-this-reference]
                                window.Vue.set(this.state, 'baz', expect('baz', bar => {
                                    if (bar !== 'bar') {
                                        throw new Error(`Expected baz to be 'bar', got ${ bar }`);
                                    }
                                }));
                            }),
                            run: expect('run', () => {
                                return `
                                    return window.xprops.onLoad().then(() => {
                                        return window.xprops.onTest().then(() => {
                                            window.xprops.onProps(() => {
                                                window.xprops.foo('bar');
                                            });
                                            window.xprops.onProps(() => {
                                                window.xprops.baz('bar');
                                            });
                                        });
                                    });
                                `;
                            })
                        }
                    };
                }
            }).$mount(app);
        });
    });

    it('should enter a component rendered with vue3 and call a prop', () => {
        return wrapPromise(async ({ expect }) => {
            await loadScript('base/test/lib/vue_v3.2.1.js');

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-vue3',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const zoidComponent = window.__component__().driver('vue3');

            const container = document.createElement('div');
            container.setAttribute('id', 'container');

            getBody().appendChild(container);
            
            const vueAppp = window.Vue.createApp({
                render: expect('render', () => {
                    const createElement = window.Vue.h;
                    return createElement(zoidComponent, {
                        foo: expect('foo', bar => {
                            if (bar !== 'bar') {
                                throw new Error(`Expected bar to be 'bar', got ${ bar }`);
                            }
                        }),
                        run: () => `window.xprops.foo('bar');`
                    });
                })
            });

            vueAppp.mount('#container');
        });
    });

    it('should enter a component rendered with vue3 and update/call props with camel-case and kebab-case', () => {
        return wrapPromise(async ({ expect }) => {
            await loadScript('base/test/lib/vue_v3.2.1.js');

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-vue3-update-prop',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const zoidComponent = window.__component__().driver('vue3');

            const container = document.createElement('div');
            container.setAttribute('id', 'container');

            getBody().appendChild(container);

            const vueAppp = window.Vue.createApp({
                render: expect('render', () => {
                    const createElement = window.Vue.h;
                    return createElement(zoidComponent, {
                        'bar-value': 'bar',
                        'test-bar':  expect('foo', bar => {
                            if (bar !== 'bar') {
                                throw new Error(`Expected bar to be 'bar', got ${ bar }`);
                            }
                        }),
                        'run': () => 'window.xprops.testBar(window.xprops.barValue);'

                    });
                })
            });
            vueAppp.mount('#container');
        });
    });

    it('should enter a component rendered with angular 2 and call a prop', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-angular2',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const component = window.__component__();

            const props = {
                foo: expect('foo', bar => {
                    if (bar !== 'bar') {
                        throw new Error(`Expected bar to be 'bar', got ${ bar }`);
                    }
                }),

                run: () => `
                    window.xprops.foo('bar');
                `
            };

            const Angular2Component = component.driver('angular2', window.ng.core);

            const appComponent = window.ng.core.Component({
                selector: 'body',
                template: `
                    <test-render-angular2 [props]="testProps"></test-render-angular2>
                `
            }).Class({
                constructor() {
                    // $FlowFixMe[object-this-reference]
                    this.testProps = props;
                }
            });

            const appModule = window.ng.core.NgModule({
                imports:      [ window.ng.platformBrowser.BrowserModule, Angular2Component ],
                declarations: [ appComponent ],
                bootstrap:    [ appComponent ]
            }).Class({
                constructor() {
                    // pass
                }
            });

            window.ng.platformBrowserDynamic
                .platformBrowserDynamic()
                .bootstrapModule(appModule);
        });
    });

    it('should enter a component rendered with angular 2 and update a prop', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-angular2-update-prop',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const component = window.__component__();

            const Angular2Component = component.driver('angular2', window.ng.core);

            const appComponent = window.ng.core.Component({
                selector: 'body',
                template: `
                    <test-render-angular2-update-prop [props]="testProps"></test-render-angular2-update-prop>
                `
            }).Class({
                constructor: expect('constructor', function constructor() {
                    this.testProps = {
                        onLoad: expect('onLoad', () => {
                            this.testProps.foo = expect('foo', bar => {
                                if (bar !== 'bar') {
                                    throw new Error(`Expected bar to be 'bar', got ${ bar }`);
                                }
                            });
                        }),

                        run: () => `
                            window.xprops.onLoad().then(() => {
                                window.xprops.foo('bar');
                            });
                        `
                    };
                })
            });

            const appModule = window.ng.core.NgModule({
                imports:      [ window.ng.platformBrowser.BrowserModule, Angular2Component ],
                declarations: [ appComponent ],
                bootstrap:    [ appComponent ]
            }).Class({
                constructor() {
                    // pass
                }
            });

            window.ng.platformBrowserDynamic
                .platformBrowserDynamic()
                .bootstrapModule(appModule);
        });
    });
});
