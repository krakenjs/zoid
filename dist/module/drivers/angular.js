"use strict";

exports.__esModule = true;
exports.angular = void 0;

var _src = require("belter/src");

var _constants = require("../constants");

const angular = {
  register(component, ng) {
    const module = ng.module(component.tag, []).directive((0, _src.dasherizeToCamel)(component.tag), () => {
      const scope = {};

      for (const key of component.getPropNames()) {
        scope[key] = '=';
      }

      scope.props = '=';
      return {
        scope,
        restrict: 'E',
        controller: ['$scope', '$element', ($scope, $element) => {
          component.log(`instantiate_angular_component`);

          function safeApply() {
            if ($scope.$root.$$phase !== '$apply' && $scope.$root.$$phase !== '$digest') {
              try {
                $scope.$apply();
              } catch (err) {// pass
              }
            }
          }

          const getProps = () => {
            return (0, _src.replaceObject)($scope.props, item => {
              if (typeof item === 'function') {
                return function angularWrapped() {
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
          instance.render($element[0], _constants.CONTEXT.IFRAME);
          $scope.$watch(() => {
            instance.updateProps(getProps()).catch(_src.noop);
          });
        }]
      };
    });
    return module;
  }

};
exports.angular = angular;