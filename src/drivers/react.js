
import { extend } from '../lib';

export let react = {

    isActive() {
        return Boolean(window.React);
    },

    register(component) {

        component.react = window.React.createClass({

            render() {
                return window.React.createElement('div', null);
            },

            componentDidMount() {
                let parent = component.init(extend({}, this.props));

                this.setState({ parent });

                parent.renderIframe(window.ReactDOM.findDOMNode(this));
            },

            componentDidUpdate() {

                if (this.state && this.state.parent) {
                    this.state.parent.updateProps(extend({}, this.props));
                }
            }
        });
    }
};
