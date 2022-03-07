/* @flow */
/* eslint react/no-deprecated: off, react/no-find-dom-node: off, react/display-name: off, react/no-did-mount-set-state: off, react/destructuring-assignment: off, react/prop-types: off */

import { extend, noop } from 'belter/src';

import type { ComponentDriverType } from '../component';

declare class ReactClassType {}
declare class __ReactComponent {}

type ReactElementType = {|

|};

type ReactType = {|
    Component : __ReactComponent,
    createClass : ({| render : () => ReactElementType, componentDidMount : () => void, componentDidUpdate : () => void |}) => (typeof ReactClassType),
    createElement : (string, ?{ [string] : mixed }, ...children : $ReadOnlyArray<ReactElementType>) => ReactElementType
|};

type ReactDomType = {|
    findDOMNode : (typeof ReactClassType) => HTMLElement
|};

type ReactLibraryType = {|
    React : ReactType,
    ReactDOM : ReactDomType
|};

export const react : ComponentDriverType<*, ReactLibraryType, typeof ReactClassType, *, *> = {

    register: (tag, propsDef, init, { React, ReactDOM }) => {

        // $FlowFixMe
        return class extends React.Component {
            render() : ReactElementType {
                return React.createElement('div', null);
            }

            componentDidMount() {
                // $FlowFixMe
                const el = ReactDOM.findDOMNode(this);
                const parent = init(extend({}, this.props));
                parent.render(el, this.props.context);
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
