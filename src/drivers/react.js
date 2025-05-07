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
  createRef: () => {| current: HTMLElement |},
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
  register: (tag, propsDef, init, { React }) => {
    if (typeof React.createRef !== "function") {
      throw new TypeError(
        "React version 16.3 or higher is required. createRef API is not available in this version of React."
      );
    }

    // $FlowFixMe
    return class extends React.Component {
      constructor(props) {
        super(props);
        this.state = {};
        this.containerRef = React.createRef();
      }

      render(): ReactElementType {
        return React.createElement("div", { ref: this.containerRef });
      }

      componentDidMount() {
        const el = this.containerRef.current;

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
