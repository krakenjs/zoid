
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
                component.log(`instantiate_react_component`);

                let el = window.ReactDOM.findDOMNode(this);

                let parent = component.init(extend({}, this.props), null, el);

                this.setState({ parent });

                parent.render(el);
            },

            componentDidUpdate() {

                if (this.state && this.state.parent) {
                    this.state.parent.updateProps(extend({}, this.props));
                }
            }
        });
    }
};
