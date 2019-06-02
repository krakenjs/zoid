/* @flow */
/* eslint react/no-deprecated: off, react/no-find-dom-node: off, react/display-name: off, react/no-did-mount-set-state: off, react/destructuring-assignment: off, react/prop-types: off */

import { extend, noop } from 'belter/src';

import type { Component, ComponentDriverType } from '../component';
import { CONTEXT } from '../constants';

declare class ReactClassType {

}

type ReactElementType = {|

|};

declare class __ReactComponent {

}

type ReactType = {|
    Component : __ReactComponent,
    createClass : ({ render : () => ReactElementType, componentDidMount : () => void, componentDidUpdate : () => void }) => (typeof ReactClassType),
    createElement : (string, ?{ [string] : mixed }, ...children : $ReadOnlyArray<ReactElementType>) => ReactElementType
|};

type ReactDomType = {|
    findDOMNode : (typeof ReactClassType) => HTMLElement
|};

type ReactLibraryType = {|
    React : ReactType,
    ReactDOM : ReactDomType
|};

export const react : ComponentDriverType<*, ReactLibraryType> = {

    register(component : Component<*>, { React, ReactDOM } : ReactLibraryType) : (typeof ReactClassType) {

        // $FlowFixMe
        return class extends React.Component {
            render() : ReactElementType {
                return React.createElement('div', null);
            }

            componentDidMount() {
                component.log(`instantiate_react_component`);
                
                const el = ReactDOM.findDOMNode(this);

                const parent = component.init(extend({}, this.props));
                parent.render(el, CONTEXT.IFRAME);
                this.setState({ parent });
            }

            componentDidUpdate() {

                if (this.state && this.state.parent) {
                    this.state.parent.updateProps(extend({}, this.props)).catch(noop);
                }
            }
        };
    }
};
