
import { extend } from '../lib';

export let react = {

    global() {
        if (window.React && window.ReactDOM) {
            return {
                React: window.React,
                ReactDOM: window.ReactDOM
            };
        }
    },

    register(component, { React, ReactDOM }) {

        component.react = React.createClass({

            render() {
                return React.createElement('div', null);
            },

            componentDidMount() {
                component.log(`instantiate_react_component`);

                let el = ReactDOM.findDOMNode(this);

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

        return component.react;
    }
};
