
import { extend } from '../util';

export var react = {

    isActive() {
        return Boolean(window.React);
    },

    register(component) {


        component.react = window.React.createClass({

            render() {
                return null;
            },

            componentDidMount() {
                let parent = component.initFromProps(extend({}, this.props));

                this.setState({ parent: parent });

                parent.renderIframe(window.ReactDOM.findDOMNode(this));
            },

            componentWillUpdate() {

                if (this.state && this.state.parent) {
                    this.state.parent.updateProps(extend({}, this.props));
                }
            }
        });

        /*

        component.createReactClass = function(options) {

            let props;

            let child = component.attach({

                onProps() {
                    props = this.props;
                }
            });

            window.React.createClass
        }

        */
    }
}