/* @flow */

import { dasherizeToCamel, replaceObject } from '../lib';
import type { Component, ComponentDriverType } from '../component/component';

type AngularModule = {
    directive : (string, () => {
        scope : { [string] : '=' | '@' },
        restrict : string,
        controller : Array<string | Function>
    }) => AngularModule
};

type Angular = {
    module : (string, Array<string>) => AngularModule
};

export let angular : ComponentDriverType<*, Angular> = {

    global() : ?Angular {
        return window.angular;
    },

    register(component : Component<*>, ng : Angular) : AngularModule {

        let module = ng.module(component.tag, []).directive(dasherizeToCamel(component.tag), () => {

            let scope = {};

            for (let key of component.getPropNames()) {
                scope[key] = '=';
            }

            if (component.looseProps) {
                scope.props = '=';
            }

            return {
                scope,

                restrict: 'E',

                controller: [ '$scope', '$element', ($scope, $element) => {

                    if (component.looseProps && !$scope.props) {
                        throw new Error(`For angular bindings to work, prop definitions must be passed to zoid.create`);
                    }

                    component.log(`instantiate_angular_component`);

                    function safeApply() {
                        if ($scope.$root.$$phase !== '$apply' && $scope.$root.$$phase !== '$digest') {
                            try {
                                $scope.$apply();
                            } catch (err) {
                                // pass
                            }
                        }
                    }

                    let getProps = () => {

                        let scopeProps;

                        if ($scope.props) {
                            scopeProps = $scope.props;
                        } else {
                            scopeProps = {};
                            for (let key of Object.keys(scope)) {
                                if ($scope[key] !== undefined) {
                                    scopeProps[key] = $scope[key];
                                }
                            }
                        }

                        scopeProps = replaceObject(scopeProps, {
                            'function': (value) => {
                                return function angularWrapped() : mixed {
                                    let result = value.apply(this, arguments);
                                    safeApply();
                                    return result;
                                };
                            }
                        });

                        return scopeProps;
                    };

                    let parent = component.init(getProps(), null, $element[0]);
                    parent.render($element[0]);

                    $scope.$watch(() => {
                        parent.updateProps(getProps());
                    });
                } ]
            };
        });

        return module;
    }
};
