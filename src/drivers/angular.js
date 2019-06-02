/* @flow */

import { dasherizeToCamel, replaceObject, noop } from 'belter/src';

import type { Component, ComponentDriverType } from '../component';
import { CONTEXT } from '../constants';

type AngularModule = {|
    directive : (string, () => {
        scope : { [string] : '=' | '@' },
        restrict : string,
        controller : $ReadOnlyArray<string | Function>
    }) => AngularModule
|};

type Angular = {|
    module : (string, $ReadOnlyArray<string>) => AngularModule
|};

export const angular : ComponentDriverType<*, Angular> = {

    register(component : Component<*>, ng : Angular) : AngularModule {

        const module = ng.module(component.tag, []).directive(dasherizeToCamel(component.tag), () => {

            const scope = {};

            for (const key of component.getPropNames()) {
                scope[key] = '=';
            }

            scope.props = '=';

            return {
                scope,

                restrict: 'E',

                controller: [ '$scope', '$element', ($scope, $element) => {
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

                    const getProps = () => {
                        return replaceObject($scope.props, item => {
                            if (typeof item === 'function') {
                                return function angularWrapped() : mixed {
                                    // $FlowFixMe
                                    const result = item.apply(this, arguments);
                                    safeApply();
                                    return result;
                                };
                            }
                            return item;
                        });
                    };

                    const instance = component.init(getProps());
                    instance.render($element[0], CONTEXT.IFRAME);

                    $scope.$watch(() => {
                        instance.updateProps(getProps()).catch(noop);
                    });
                } ]
            };
        });

        return module;
    }
};
