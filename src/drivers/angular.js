/* @flow */

import { dasherizeToCamel, replaceObject, noop } from '@krakenjs/belter/src';

import type { ComponentDriverType } from '../component';

type AngularModule = {|
    directive : (string, () => {|
        scope : { [string] : '=' | '@' },
        restrict : string,
        controller : $ReadOnlyArray<string | Function>
    |}) => AngularModule
|};

type Angular = {|
    module : (string, $ReadOnlyArray<string>) => AngularModule
|};

export const angular : ComponentDriverType<*, Angular, AngularModule, *, *> = {

    register: (tag, propsDef, init, ng) => {

        const module = ng.module(tag, []).directive(dasherizeToCamel(tag), () => {

            const scope = {};

            for (const key of Object.keys(propsDef)) {
                scope[key] = '=';
            }

            scope.props = '=';

            return {
                scope,

                restrict: 'E',

                controller: [ '$scope', '$element', ($scope, $element) => {
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

                    const props = getProps();
                    const instance = init(props);
                    instance.render($element[0], props.context);

                    $scope.$watch(() => {
                        instance.updateProps(getProps()).catch(noop);
                    });
                } ]
            };
        });

        return module;
    }
};
