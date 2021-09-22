/* eslint react/no-deprecated: off, react/no-find-dom-node: off, react/display-name: off, react/no-did-mount-set-state: off, react/destructuring-assignment: off, react/prop-types: off */
import { extend, noop } from 'belter/src';

import type { ComponentDriverType } from '../component';
import { CONTEXT } from '../constants';

// eslint-disable-next-line flowtype/require-exact-type
declare class ReactClassType {}

// eslint-disable-next-line flowtype/require-exact-type
declare class __ReactComponent {}

type ReactElementType = {}
type ReactType = {
    Component: __ReactComponent
    createClass: (arg0: {
        render: () => ReactElementType
        componentDidMount: () => void
        componentDidUpdate: () => void
    }) => typeof ReactClassType
    createElement: (
        arg0: string,
        arg1: Record<string, unknown> | null | undefined,
        ...children: ReadonlyArray<ReactElementType>
    ) => ReactElementType
}
type ReactDomType = {
    findDOMNode: (arg0: typeof ReactClassType) => HTMLElement
}
type ReactLibraryType = {
    React: ReactType
    ReactDOM: ReactDomType
}
export const react: ComponentDriverType<
    any,
    ReactLibraryType,
    typeof ReactClassType,
    any
> = {
    register: (tag, propsDef, init, { React, ReactDOM }) => {
        // $FlowFixMe
        return class extends React.Component {
            render(): ReactElementType {
                return React.createElement('div', null);
            }

            componentDidMount() {
                // $FlowFixMe
                const el = ReactDOM.findDOMNode(this);
                const parent = init(extend({}, this.props));
                parent.render(el, CONTEXT.IFRAME);
                this.setState({
                    parent
                });
            }

            componentDidUpdate() {
                if (this.state && this.state.parent) {
                    this.state.parent
                        .updateProps(extend({}, this.props))
                        .catch(noop);
                }
            }
        };
    }
};
