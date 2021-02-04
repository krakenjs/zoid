/* @flow */
/* eslint react/no-deprecated: off, react/no-find-dom-node: off, react/display-name: off, react/no-did-mount-set-state: off, react/destructuring-assignment: off, react/prop-types: off */

import { extend, noop } from 'belter/src';

import type { ComponentDriverType, ZoidComponentInstance } from '../component';
import { CONTEXT } from '../constants';

// eslint-disable-next-line flowtype/require-exact-type
declare class ReactClassType {}

// eslint-disable-next-line flowtype/require-exact-type
declare class _ReactComponentType {
    state : {| parent? : ZoidComponentInstance<*> |},
    props : mixed,
    setState : (newStateOrFn : mixed) => void
}

// eslint-disable-next-line flowtype/require-exact-type
type Class<T> = { new(): T };

type ReactElementType = {|

|};

type ReactType = {|
    Component : typeof _ReactComponentType,
    createClass : ({| render : () => ReactElementType, componentDidMount : () => void, componentDidUpdate : () => void |}) => (typeof ReactClassType),
    createElement : (string, ?{ [string] : mixed }, ...children : $ReadOnlyArray<ReactElementType>) => ReactElementType
|};

type ReactDomType = {|
    findDOMNode : (_ReactComponentType) => HTMLElement
|};

type ReactLibraryType = {|
    React : ReactType,
    ReactDOM : ReactDomType
|};


/**
 * Util to check if component is currently mounted
 */
function isMounted(component : _ReactComponentType, ReactDOM : ReactDomType) : boolean {
    try {
        return Boolean(ReactDOM.findDOMNode(component));
    }
    catch (error) {
        // Error: Unable to find node on an unmounted component
        return false;
    }
}

export const react : ComponentDriverType<*, ReactLibraryType, Class<_ReactComponentType>> = {

    register: (tag, propsDef, init, { React, ReactDOM }) : Class<_ReactComponentType> => {

        return class ZoidReactComponent extends React.Component {
            render() : ReactElementType {
                return React.createElement('div', null);
            }

            componentDidMount() {
                const el = ReactDOM.findDOMNode(this);
                const parent = init(extend({}, this.props));
                parent.render(el, CONTEXT.IFRAME)
                    .catch(error => {
                        // component failed to render, possibly because it was closed or destroyed.
                        if (!isMounted(this, ReactDOM)) {
                            // not mounted anymore, we can safely ignore the error
                            return;
                        }
                        // still mounted, throw error inside react to allow a parent component or ErrorBoundary to handle it
                        this.setState(() => {
                            throw error;
                        });
                    });
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
