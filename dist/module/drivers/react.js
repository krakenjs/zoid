"use strict";

exports.__esModule = true;
exports.react = void 0;

var _src = require("belter/src");

var _constants = require("../constants");

/* eslint react/no-deprecated: off, react/no-find-dom-node: off, react/display-name: off, react/no-did-mount-set-state: off, react/destructuring-assignment: off, react/prop-types: off */
const react = {
  register(component, {
    React,
    ReactDOM
  }) {
    // $FlowFixMe
    return class extends React.Component {
      render() {
        return React.createElement('div', null);
      }

      componentDidMount() {
        component.log(`instantiate_react_component`); // $FlowFixMe

        const el = ReactDOM.findDOMNode(this);
        const parent = component.init((0, _src.extend)({}, this.props));
        parent.render(el, _constants.CONTEXT.IFRAME);
        this.setState({
          parent
        });
      }

      componentDidUpdate() {
        if (this.state && this.state.parent) {
          this.state.parent.updateProps((0, _src.extend)({}, this.props)).catch(_src.noop);
        }
      }

    };
  }

};
exports.react = react;