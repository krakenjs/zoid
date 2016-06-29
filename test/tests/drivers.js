
import postRobot from 'post-robot/src';
import { once } from 'src/lib';
import { testComponent } from '../component';

let component;

afterEach(() => {
    if (component) {
        component.destroy();
        component = null;
    }
});

angular.bootstrap = once(angular.bootstrap);

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

        postRobot.once('init', () => 'attachTestComponent');
    });

    it('should enter a component rendered with react and call a prop', done => {

        let Main = window.React.createClass({

            render() {

                function foo(bar) {
                    assert.equal(bar, 'bar');
                    this.close().then(done);
                }

                return window.React.createElement(
                    'div',
                    null,
                    React.createElement(testComponent.react, { foo })
                );
            }
        });

        let container = document.createElement('div');
        document.body.appendChild(container);

        ReactDOM.render(React.createElement(Main, null), container);

        postRobot.once('init', () => 'attachTestComponentAndCallFoo');
    });

    it('should enter a component rendered with angular and call onEnter', done => {

        angular.module('app', []);
        angular.bootstrap(document.body, ['app']);

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

        postRobot.once('init', () => 'attachTestComponent');
    });

    it('should enter a component rendered with angular and call a prop', done => {

        angular.module('app', []);
        angular.bootstrap(document.body, ['app']);

        let injector = angular.element(document.body).injector();
        let $compile = injector.get('$compile');
        let $rootScope = injector.get('$rootScope');

        let $scope = $rootScope.$new();
        $scope.foo = function() {
            this.close().then(done);
        };

        $compile(`
            <test-component foo="foo"></test-component>
        `)($scope, element => {
            document.body.appendChild(element[0]);
        });

        postRobot.once('init', () => 'attachTestComponentAndCallFoo');
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

        postRobot.once('init', () => 'attachTestComponent');
    });

    it('should enter a component rendered with a script tag and call a prop', done => {

        let container = document.createElement('div');
        document.body.appendChild(container);

        window.done = function() {
            this.close().then(done);
        };

        container.innerHTML = `
            <script type="application/x-component" data-component="test-component">
                {
                    foo: window.done
                }
            </script>
        `;

        postRobot.once('init', () => 'attachTestComponentAndCallFoo');
    });
});