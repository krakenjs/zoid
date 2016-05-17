
import { extend } from '../util';

export var react = {

    isActive() {
        return Boolean(window.React);
    },

    register(component) {
        component.ReactComponent = window.React.createClass({
            render: function render() {
                return window.React.createElement('div');
            },

            componentDidMount: function() {
                component.initFromProps(extend({}, this.props)).renderIframe(window.ReactDOM.findDOMNode(this));
            }
       });
    }
}