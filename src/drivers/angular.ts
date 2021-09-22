import { dasherizeToCamel, replaceObject, noop } from 'belter/src';

import type { ComponentDriverType } from '../component';
import { CONTEXT } from '../constants';

type AngularModule = {
    directive: (
        arg0: string,
        arg1: () => {
            scope: Record<string, '=' | '@'>
            restrict: string
            controller: ReadonlyArray<string | ((...args: Array<any>) => any)>
        },
    ) => AngularModule
}
type Angular = {
    module: (arg0: string, arg1: ReadonlyArray<string>) => AngularModule
}
export const angular: ComponentDriverType<any, Angular, AngularModule, any> = {
    register: (tag, propsDef, init, ng) => {
        const module = ng
            .module(tag, [])
            .directive(dasherizeToCamel(tag), () => {
                const scope = {};

                for (const key of Object.keys(propsDef)) {
                    scope[key] = '=';
                }

                scope.props = '=';
                return {
                    scope,
                    restrict:  'E',
                    controller:[
                        '$scope',
                        '$element',
                        ($scope, $element) => {
                            function safeApply() {
                                if (
                                    $scope.$root.$$phase !== '$apply' &&
                                    $scope.$root.$$phase !== '$digest'
                                ) {
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
                                        return function angularWrapped(): unknown {
                                            // $FlowFixMe
                                            const result = item.apply(
                                                this,
                                                arguments
                                            );
                                            safeApply();
                                            return result;
                                        };
                                    }

                                    return item;
                                });
                            };

                            const instance = init(getProps());
                            instance.render($element[0], CONTEXT.IFRAME);
                            $scope.$watch(() => {
                                instance.updateProps(getProps()).catch(noop);
                            });
                        }
                    ]
                };
            });
        return module;
    }
};
