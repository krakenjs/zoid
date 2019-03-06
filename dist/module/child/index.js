"use strict";

exports.__esModule = true;
var _exportNames = {
  ChildComponent: true
};
exports.ChildComponent = void 0;

var _src = require("cross-domain-utils/src");

var _src2 = require("post-robot/src");

var _src3 = require("zalgo-promise/src");

var _src4 = require("belter/src");

var _lib = require("../lib");

var _constants = require("../constants");

var _props = require("./props");

var _window = require("./window");

Object.keys(_window).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  exports[key] = _window[key];
});

/* eslint max-lines: 0 */

/*  Child Component
    ---------------

    This is the portion of code which runs inside the frame or popup window containing the component's implementation.

    When the component author calls myComponent.attach(), it creates a new instance of ChildComponent, which is then
    responsible for managing the state and messaging back up to the parent, and providing props for the component to
    utilize.
*/
class ChildComponent {
  // eslint-disable-line flowtype/no-mutable-array
  constructor(component) {
    this.component = void 0;
    this.props = void 0;
    this.context = void 0;
    this.parent = void 0;
    this.parentDomain = void 0;
    this.parentComponentWindow = void 0;
    this.onPropHandlers = void 0;
    this.autoResize = void 0;

    _src3.ZalgoPromise.try(() => {
      this.component = component;
      this.onPropHandlers = [];
      const childPayload = (0, _window.getChildPayload)();

      if (!childPayload) {
        throw new Error(`No child payload found`);
      }

      if (childPayload.version !== __ZOID__.__VERSION__) {
        throw new Error(`Parent window has zoid version ${childPayload.version}, child window has version ${__ZOID__.__VERSION__}`);
      }

      const {
        parent,
        domain,
        exports,
        context,
        props
      } = childPayload;
      this.context = context;
      this.parentComponentWindow = this.getParentComponentWindow(parent);
      this.parentDomain = domain;
      this.parent = (0, _src2.deserializeMessage)(this.parentComponentWindow, domain, exports);
      this.checkParentDomain(domain);
      const initialProps = this.getPropsByRef(this.parentComponentWindow, domain, props);
      this.setProps(initialProps, domain);
      (0, _src2.markWindowKnown)(this.parentComponentWindow);
      this.watchForClose();
      return this.parent.init(this.buildExports());
    }).then(() => {
      return this.watchForResize();
    }).catch(err => {
      this.onError(err);
    });
  }

  getHelpers() {
    return {
      focus: () => this.focus(),
      close: () => this.close(),
      resize: ({
        width,
        height
      }) => this.resize({
        width,
        height
      }),
      onError: err => this.onError(err),
      onProps: handler => this.onProps(handler),
      getParent: () => this.parentComponentWindow,
      getParentDomain: () => this.parentDomain
    };
  }

  checkParentDomain(domain) {
    if (!(0, _src.matchDomain)(this.component.allowedParentDomains, domain)) {
      throw new Error(`Can not be rendered by domain: ${domain}`);
    }
  }

  onProps(handler) {
    this.onPropHandlers.push(handler);
  }

  getPropsByRef(parentComponentWindow, domain, {
    type,
    value,
    uid
  }) {
    let props;

    if (type === _constants.INITIAL_PROPS.RAW) {
      props = value;
    } else if (type === _constants.INITIAL_PROPS.UID) {
      if (!(0, _src.isSameDomain)(parentComponentWindow)) {
        throw new Error(`Parent component window is on a different domain - expected ${(0, _src.getDomain)()} - can not retrieve props`);
      }

      const global = (0, _lib.getGlobal)(parentComponentWindow);
      props = (0, _src4.assertExists)('props', global && global.props[uid]);
    }

    if (!props) {
      throw new Error(`Could not find props`);
    }

    return (0, _src2.deserializeMessage)(parentComponentWindow, domain, props);
  }

  getParentComponentWindow(ref) {
    const {
      type
    } = ref;

    if (type === _constants.WINDOW_REFERENCES.OPENER) {
      return (0, _src4.assertExists)('opener', (0, _src.getOpener)(window));
    } else if (type === _constants.WINDOW_REFERENCES.PARENT) {
      // $FlowFixMe
      const distance = ref.distance;
      return (0, _src4.assertExists)('parent', (0, _src.getNthParentFromTop)(window, distance));
    } else if (type === _constants.WINDOW_REFERENCES.GLOBAL) {
      // $FlowFixMe
      const {
        uid
      } = ref;
      const ancestor = (0, _src.getAncestor)(window);

      if (!ancestor) {
        throw new Error(`Can not find ancestor window`);
      }

      for (const frame of (0, _src.getAllFramesInWindow)(ancestor)) {
        if ((0, _src.isSameDomain)(frame)) {
          const global = (0, _lib.getGlobal)(frame);

          if (global && global.windows && global.windows[uid]) {
            return global.windows[uid];
          }
        }
      }
    }

    throw new Error(`Unable to find ${type} parent component window`);
  }

  getProps() {
    // $FlowFixMe
    this.props = this.props || {};
    return this.props;
  }

  setProps(props, origin, isUpdate = false) {
    const helpers = this.getHelpers();
    const existingProps = this.getProps();
    const normalizedProps = (0, _props.normalizeChildProps)(this.parentComponentWindow, this.component, props, origin, helpers, isUpdate);
    (0, _src4.extend)(existingProps, normalizedProps);

    for (const handler of this.onPropHandlers) {
      handler.call(this, existingProps);
    }
  }

  watchForClose() {
    window.addEventListener('beforeunload', () => {
      this.parent.checkClose.fireAndForget();
    });
    window.addEventListener('unload', () => {
      this.parent.checkClose.fireAndForget();
    });
    (0, _src.onCloseWindow)(this.parentComponentWindow, () => {
      this.destroy();
    });
  }

  getAutoResize() {
    let {
      width = false,
      height = false,
      element = 'body'
    } = this.autoResize || this.component.autoResize || {};
    element = (0, _src4.getElementSafe)(element);
    return {
      width,
      height,
      element
    };
  }

  watchForResize() {
    return (0, _src4.waitForDocumentBody)().then(() => {
      const {
        width,
        height,
        element
      } = this.getAutoResize();

      if (!element || !width && !height || this.context === _constants.CONTEXT.POPUP) {
        return;
      }

      (0, _src4.onResize)(element, ({
        width: newWidth,
        height: newHeight
      }) => {
        this.resize({
          width: width ? newWidth : undefined,
          height: height ? newHeight : undefined
        });
      }, {
        width,
        height
      });
    });
  }

  buildExports() {
    const self = this;
    return {
      updateProps(props) {
        return _src3.ZalgoPromise.try(() => self.setProps(props, this.__origin__, true));
      },

      close() {
        return _src3.ZalgoPromise.try(() => self.destroy());
      }

    };
  }

  resize({
    width,
    height
  }) {
    return this.parent.resize.fireAndForget({
      width,
      height
    });
  }

  close() {
    return this.parent.close();
  }

  destroy() {
    return _src3.ZalgoPromise.try(() => {
      window.close();
    });
  }

  focus() {
    return _src3.ZalgoPromise.try(() => {
      window.focus();
    });
  }

  onError(err) {
    return _src3.ZalgoPromise.try(() => {
      if (this.parent && this.parent.onError) {
        return this.parent.onError(err);
      } else {
        throw err;
      }
    });
  }

}

exports.ChildComponent = ChildComponent;