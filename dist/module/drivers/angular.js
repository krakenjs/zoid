'use strict';

exports.__esModule = true;
exports.angular = undefined;

var _lib = require('../lib');

var angular = exports.angular = {
    global: function global() {
        return window.angular;
    },
    register: function register(component, ng) {

        var module = ng.module(component.tag, []).directive((0, _lib.dasherizeToCamel)(component.tag), function () {

            var scope = {};

            for (var _iterator = component.getPropNames(), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                var _ref;

                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }

                var key = _ref;

                scope[key] = '=';
            }

            if (component.looseProps) {
                scope.props = '=';
            }

            return {
                scope: scope,

                restrict: 'E',

                controller: ['$scope', '$element', function ($scope, $element) {

                    if (component.looseProps && !$scope.props) {
                        throw new Error('For angular bindings to work, prop definitions must be passed to zoid.create');
                    }

                    component.log('instantiate_angular_component');

                    function safeApply() {
                        if ($scope.$root.$$phase !== '$apply' && $scope.$root.$$phase !== '$digest') {
                            try {
                                $scope.$apply();
                            } catch (err) {
                                // pass
                            }
                        }
                    }

                    var getProps = function getProps() {

                        var scopeProps = void 0;

                        if ($scope.props) {
                            scopeProps = $scope.props;
                        } else {
                            scopeProps = {};
                            for (var _iterator2 = Object.keys(scope), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                                var _ref2;

                                if (_isArray2) {
                                    if (_i2 >= _iterator2.length) break;
                                    _ref2 = _iterator2[_i2++];
                                } else {
                                    _i2 = _iterator2.next();
                                    if (_i2.done) break;
                                    _ref2 = _i2.value;
                                }

                                var key = _ref2;

                                if ($scope[key] !== undefined) {
                                    scopeProps[key] = $scope[key];
                                }
                            }
                        }

                        scopeProps = (0, _lib.replaceObject)(scopeProps, {
                            'function': function _function(value) {
                                return function angularWrapped() {
                                    var result = value.apply(this, arguments);
                                    safeApply();
                                    return result;
                                };
                            }
                        });

                        return scopeProps;
                    };

                    var parent = component.init(getProps(), null, $element[0]);
                    parent.render($element[0]);

                    $scope.$watch(function () {
                        parent.updateProps(getProps());
                    });
                }]
            };
        });

        return module;
    }
};