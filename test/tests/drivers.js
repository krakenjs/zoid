/* @flow */

import { assert } from 'chai';

import { testComponent } from '../component';

window.angular.module('app', [ 'test-component' ]);
window.angular.bootstrap(document.body, [ 'app' ]);

describe('zoid drivers', () => {

    it('should enter a component rendered with react and call onEnter', done => {

        let Main = class extends window.React.Component {

            render() : Object {

                return window.React.createElement(
                    'div',
                    null,
                    // $FlowFixMe
                    window.React.createElement(testComponent.react, {
                        onEnter() {
                            this.close().then(done);
                        }
                    })
                );
            }
        };

        let container = document.createElement('div');

        if (!document.body) {
            throw new Error(`Expected document.body to be present`);
        }

        document.body.appendChild(container);

        window.ReactDOM.render(window.React.createElement(Main, null), container);
    });

    it('should enter a component rendered with react and call a prop', done => {

        let Main = class extends window.React.Component {

            render() : Object {

                return window.React.createElement(
                    'div',
                    null,
                    // $FlowFixMe
                    window.React.createElement(testComponent.react, {

                        foo(bar) {
                            assert.equal(bar, 'bar');
                            this.close().then(done);
                        },

                        run: `
                            window.xprops.foo('bar');
                        `
                    })
                );
            }
        };

        let container = document.createElement('div');

        if (!document.body) {
            throw new Error(`Expected document.body to be present`);
        }

        document.body.appendChild(container);

        window.ReactDOM.render(window.React.createElement(Main, null), container);
    });

    it('should enter a component rendered with angular and call onEnter', done => {

        let injector = window.angular.element(document.body).injector();
        let $compile = injector.get('$compile');
        let $rootScope = injector.get('$rootScope');

        let $scope = $rootScope.$new();

        $scope.onEnter = function onEnter() {
            this.close().then(done);
        };

        $compile(`
            <test-component on-enter="onEnter"></test-component>
        `)($scope, element => {
            if (!document.body) {
                throw new Error(`Expected document.body to be present`);
            }
            document.body.appendChild(element[0]);
        });
    });

    it('should enter a component rendered with angular and call a prop', done => {

        let injector = window.angular.element(document.body).injector();
        let $compile = injector.get('$compile');
        let $rootScope = injector.get('$rootScope');

        let $scope = $rootScope.$new();

        $scope.foo = function foo(bar) {
            assert.equal(bar, 'bar');
            this.close().then(done);
        };

        $scope.run = `
            window.xprops.foo('bar');
        `;

        $compile(`
            <test-component foo="foo" run="run"></test-component>
        `)($scope, element => {
            if (!document.body) {
                throw new Error(`Expected document.body to be present`);
            }
            document.body.appendChild(element[0]);
        });
    });

    it('should enter a component rendered with a script tag and call onEnter', done => {

        let container = document.createElement('div');
        if (!document.body) {
            throw new Error(`Expected document.body to be present`);
        }
        document.body.appendChild(container);

        window.done = function windowDone() {
            this.close().then(done);
        };

        container.innerHTML = `
            <script type="application/x-component" data-component="test-component">
                {
                    onEnter: window.done
                }
            </script>
        `;
    });

    it('should enter a component rendered with a script tag and call a prop', done => {

        let container = document.createElement('div');
        if (!document.body) {
            throw new Error(`Expected document.body to be present`);
        }
        document.body.appendChild(container);

        window.foo = function foo(bar) {
            assert.equal(bar, 'bar');
            this.close().then(done);
        };

        window.run = `
            window.xprops.foo('bar');
        `;

        container.innerHTML = `
            <script type="application/x-component" data-component="test-component">
                {
                    foo: window.foo,
                    run: window.run
                }
            </script>
        `;
    });
});
