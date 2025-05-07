/* @flow */
/* eslint react/no-deprecated: off, react/display-name: off, react/no-did-mount-set-state: off, react/destructuring-assignment: off, react/prop-types: off */

import { extend, noop } from "@krakenjs/belter/src";

import type { ComponentDriverType } from "../component";
import { CONTEXT } from "../constants";

declare class ReactClassType {}
declare class __ReactComponent {}

type ReactElementType = {||};

type ReactType = {|
  Component: __ReactComponent,
  createClass: ({|
    render: () => ReactElementType,
    componentDidMount: () => void,
    componentDidUpdate: () => void,
  |}) => typeof ReactClassType,
  createElement: (
    string,
    ?{ [string]: mixed },
    ...children: $ReadOnlyArray<ReactElementType>
  ) => ReactElementType,
  createRef?: () => {| current: HTMLElement |},
|};

type ReactDomType = {|
  findDOMNode: (Object) => HTMLElement,
|};

type ReactLibraryType = {|
  React: ReactType,
  ReactDOM: ReactDomType,
|};

export const react: ComponentDriverType<
  *,
  ReactLibraryType,
  typeof ReactClassType,
  *,
  *
> = {
  register: (tag, propsDef, init, { React, ReactDOM }) => {
    // $FlowFixMe
    return class extends React.Component {
      constructor(props) {
        super(props);
        this.state = {};

        // Support React 16.3+ with createRef API
        if (typeof React.createRef === "function") {
          this.containerRef = React.createRef();
        }
      }

      render(): ReactElementType {
        // For React 16.3+, use the ref created in constructor
        if (this.containerRef) {
          return React.createElement("div", { ref: this.containerRef });
        }

        // For older React versions, use callback ref pattern
        return React.createElement("div", {
          ref: (element) => {
            this.containerElement = element;
          },
        });
      }

      componentDidMount() {
        // Use the appropriate ref depending on React version
        let el = null;

        if (this.containerRef) {
          el = this.containerRef.current;
        } else if (this.containerElement) {
          el = this.containerElement;
        } else if (ReactDOM && ReactDOM.findDOMNode) {
          // Fallback to findDOMNode only if needed (for older React in tests)
          // eslint-disable-next-line react/no-find-dom-node
          el = ReactDOM.findDOMNode(this);
        }

        if (!el) {
          throw new Error("Could not find DOM element for React component");
        }

        const parent = init(extend({}, this.props));
        parent.render(el, CONTEXT.IFRAME);
        this.setState({ parent });
      }

      componentDidUpdate() {
        if (this.state && this.state.parent) {
          this.state.parent.updateProps(extend({}, this.props)).catch(noop);
        }
      }
    };
  },
};
