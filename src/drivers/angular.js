
import { dasherizeToCamel, replaceObject } from '../lib';

export let angular = {

    global() {
        return window.angular;
    },

    register(component, ng) {

        ng.module(component.tag, []).directive(dasherizeToCamel(component.tag), () => {

            let scope = {};

            for (let key of Object.keys(component.props)) {
                scope[key] = '=';
            }

            if (component.looseProps) {
                scope.props = '=';
            }

            return {
                scope,

                restrict: 'E',

                controller: ['$scope', '$element', ($scope, $element) => {

                    if (component.looseProps && !$scope.props) {
                        throw new Error(`For angular bindings to work, prop definitions must be passed to xcomponent.create`);
                    }

                    component.log(`instantiate_angular_component`);

                    function safeApply(fn) {
                        if ($scope.$root.$$phase !== '$apply' && $scope.$root.$$phase !== '$digest') {
                            try {
                                $scope.$apply();
                            } catch (err) {
                                console.warn('Error trying to scope.apply on prop function call:', err);
                            }
                        }
                    }

                    function getProps() {

                        let scopeProps;

                        if ($scope.props) {
                            scopeProps = $scope.props;
                        } else {
                            scopeProps = {};
                            for (let key of Object.keys(scope)) {
                                scopeProps[key] = $scope[key];
                            }
                        }

                        scopeProps = replaceObject(scopeProps, (value, key, fullKey) => {
                            if (typeof value === 'function') {
                                return function() {
                                    let result = value.apply(this, arguments);
                                    safeApply();
                                    return result;
                                };
                            }
                        });

                        return scopeProps;
                    }

                    let parent = component.init(getProps(), null, $element[0]);
                    parent.render($element[0]);

                    $scope.$watch(() => {
                        parent.updateProps(getProps());
                    });
                }]
            };
        });

        return component;
    }
};
