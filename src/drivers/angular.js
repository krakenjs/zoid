
import { dasherizeToCamel } from '../lib';

export let angular = {

    isActive() {
        return Boolean(window.angular);
    },

    register(component) {

        window.angular.module(component.tag, []).directive(dasherizeToCamel(component.tag), () => {

            let scope = {};

            for (let key of Object.keys(component.props)) {
                scope[key] = '=';
            }

            return {
                scope,

                restrict: 'E',

                controller: ($scope, $element) => {

                    component.log(`instantiate_angular_component`);

                    function getProps() {
                        let instanceProps = {};
                        for (let key of Object.keys(scope)) {
                            let prop = component.props[key];

                            let value = prop.type === 'function' ? $scope[key] && function() {
                                let result = $scope[key].apply(this, arguments);
                                $scope.$apply();
                                return result;
                            } : $scope[key];

                            instanceProps[key] = value;
                        }
                        return instanceProps;
                    }

                    let parent = component.init(getProps(), null, $element[0]);
                    parent.render($element[0]);

                    $scope.$watch(() => {
                        parent.updateProps(getProps());
                    });
                }
            };
        });
    }
};
