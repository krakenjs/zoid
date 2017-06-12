
import { testComponent } from '../component';

angular.module('app', ['test-component']);
angular.bootstrap(document.body, ['app']);

describe('xcomponent drivers', () => {

    it('should enter a component rendered with react and call onEnter', done => {

        let Main = window.React.createClass({

            render() {

                return window.React.createElement(
                    'div',
                    null,
                    React.createElement(testComponent.react, {
                        onEnter() {
                            this.close().then(done);
                        }
                    })
                );
            }
        });

        let container = document.createElement('div');
        document.body.appendChild(container);

        ReactDOM.render(React.createElement(Main, null), container);
    });

    it('should enter a component rendered with react and call a prop', done => {

        let Main = window.React.createClass({

            render() {

                return window.React.createElement(
                    'div',
                    null,
                    React.createElement(testComponent.react, {

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
        });

        let container = document.createElement('div');
        document.body.appendChild(container);

        ReactDOM.render(React.createElement(Main, null), container);
    });

    it('should enter a component rendered with angular and call onEnter', done => {

        let injector = angular.element(document.body).injector();
        let $compile = injector.get('$compile');
        let $rootScope = injector.get('$rootScope');

        let $scope = $rootScope.$new();

        $scope.onEnter = function() {
            this.close().then(done);
        };

        $compile(`
            <test-component on-enter="onEnter"></test-component>
        `)($scope, element => {
            document.body.appendChild(element[0]);
        });
    });

    it('should enter a component rendered with angular and call a prop', done => {

        let injector = angular.element(document.body).injector();
        let $compile = injector.get('$compile');
        let $rootScope = injector.get('$rootScope');

        let $scope = $rootScope.$new();

        $scope.foo = function(bar) {
            assert.equal(bar, 'bar');
            this.close().then(done);
        };

        $scope.run = `
            window.xprops.foo('bar');
        `;

        $compile(`
            <test-component foo="foo" run="run"></test-component>
        `)($scope, element => {
            document.body.appendChild(element[0]);
        });
    });

    it('should enter a component rendered with a script tag and call onEnter', done => {

        let container = document.createElement('div');
        document.body.appendChild(container);

        window.done = function() {
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
        document.body.appendChild(container);

        window.foo = function(bar) {
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
