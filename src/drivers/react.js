/* @flow */

import { extend } from '../lib';
import type { Component, ComponentDriverType } from '../component/component';

declare class ReactClassType {

}

type ReactElementType = {

};

type ReactType = {
    createClass : ({ render : ReactElementType, componentDidMount : () => void, componentDidUpdate : () => void }) => (typeof ReactClassType),
    createElement : (string, ?{ [string] : mixed }, ...children : Array<ReactElementType>) => ReactElementType
};

type ReactDomType = {
    findDOMNode : (ReactElementType) => HTMLElement
};

type ReactLibraryType = { React : ReactType, ReactDOM : ReactDomType };

export let react : ComponentDriverType<*, ReactLibraryType> = {

    global() : ?ReactLibraryType {
        if (window.React && window.ReactDOM) {
            return {
                React:    window.React,
                ReactDOM: window.ReactDOM
            };
        }
    },

    register(component : Component<*>, { React, ReactDOM } : ReactLibraryType) : (typeof ReactClassType) {

        if (React.createClass) {

            // $FlowFixMe
            component.react = React.createClass({

                render() : ReactElementType {
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
                },

                componentWillUnmount() {
                    if (this.state && this.state.parent) {
                        this.state.parent.destroy();
                    }
                }
            });
        } else {
            // $FlowFixMe
            component.react = class extends React.Component {
                render() : ReactElementType {
                    return React.createElement('div', null);
                }

                componentDidMount() {
                    component.log(`instantiate_react_component`);

                    let el = ReactDOM.findDOMNode(this);

                    let parent = component.init(extend({}, this.props), null, el);

                    this.setState({ parent });

                    parent.render(el);
                }

                componentDidUpdate() {

                    if (this.state && this.state.parent) {
                        this.state.parent.updateProps(extend({}, this.props));
                    }
                }

                componentWillUnmount() {
                    if (this.state && this.state.parent) {
                        this.state.parent.destroy();
                    }
                }
            };
        }

        return component.react;
    }
};
