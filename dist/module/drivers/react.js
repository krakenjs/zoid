'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.react = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lib = require('../lib');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var react = exports.react = {
    global: function global() {
        if (window.React && window.ReactDOM) {
            return {
                React: window.React,
                ReactDOM: window.ReactDOM
            };
        }
    },
    register: function register(component, _ref) {
        var React = _ref.React,
            ReactDOM = _ref.ReactDOM;


        if (React.createClass) {

            // $FlowFixMe
            component.react = React.createClass({
                render: function render() {
                    return React.createElement('div', null);
                },
                componentDidMount: function componentDidMount() {
                    component.log('instantiate_react_component');

                    var el = ReactDOM.findDOMNode(this);

                    var parent = component.init((0, _lib.extend)({}, this.props), null, el);

                    this.setState({ parent: parent });

                    parent.render(el);
                },
                componentDidUpdate: function componentDidUpdate() {

                    if (this.state && this.state.parent) {
                        this.state.parent.updateProps((0, _lib.extend)({}, this.props));
                    }
                }
            });
        } else {
            // $FlowFixMe
            component.react = function (_React$Component) {
                _inherits(_class, _React$Component);

                function _class() {
                    _classCallCheck(this, _class);

                    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
                }

                _createClass(_class, [{
                    key: 'render',
                    value: function render() {
                        return React.createElement('div', null);
                    }
                }, {
                    key: 'componentDidMount',
                    value: function componentDidMount() {
                        component.log('instantiate_react_component');

                        var el = ReactDOM.findDOMNode(this);

                        var parent = component.init((0, _lib.extend)({}, this.props), null, el);

                        this.setState({ parent: parent });

                        parent.render(el);
                    }
                }, {
                    key: 'componentDidUpdate',
                    value: function componentDidUpdate() {

                        if (this.state && this.state.parent) {
                            this.state.parent.updateProps((0, _lib.extend)({}, this.props));
                        }
                    }
                }]);

                return _class;
            }(React.Component);
        }

        return component.react;
    }
};