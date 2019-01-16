"use strict";

exports.__esModule = true;
exports.ParentComponent = void 0;

var _src = require("post-robot/src");

var _src2 = require("cross-domain-utils/src");

var _src3 = require("zalgo-promise/src");

var _src4 = require("belter/src");

var _constants = require("../constants");

var _lib = require("../lib");

var _drivers = require("./drivers");

var _props = require("./props");

var _class, _temp;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

_lib.global.props = _lib.global.props || {};
_lib.global.windows = _lib.global.windows || {};
let ParentComponent = (_class = (_temp = class ParentComponent {
  constructor(component, props) {
    this.component = void 0;
    this.driver = void 0;
    this.clean = void 0;
    this.initPromise = void 0;
    this.props = void 0;
    this.state = void 0;
    this.child = void 0;
    this.proxyWin = void 0;
    this.proxyOutlet = void 0;

    try {
      this.initPromise = new _src3.ZalgoPromise();
      this.clean = (0, _src4.cleanup)(this);
      this.state = {};
      this.component = component;
      this.setProps(props);
      this.component.registerActiveComponent(this);
      this.clean.register(() => this.component.destroyActiveComponent(this));
    } catch (err) {
      this.onError(err, props.onError).catch(_src4.noop);
      throw err;
    }
  }

  render(target, container, context) {
    return _src3.ZalgoPromise.try(() => {
      this.component.log(`render`);
      this.driver = _drivers.RENDER_DRIVERS[context];
      const uid = `${this.component.tag}-${(0, _src4.uniqueID)()}`;
      const domain = this.getDomain();
      const initialDomain = this.getInitialDomain();
      this.component.checkAllowRender(target, domain, container);

      if (target !== window) {
        this.delegate(context, target);
      }

      const tasks = {};
      tasks.init = this.initPromise;
      tasks.buildUrl = this.buildUrl();
      tasks.onRender = this.props.onRender();
      this.watchForUnload();
      tasks.getProxyContainer = this.getProxyContainer(container);
      tasks.renderContainer = tasks.getProxyContainer.then(proxyContainer => {
        return this.renderContainer(proxyContainer, {
          context,
          uid
        });
      });
      tasks.open = this.driver.renderedIntoContainer ? tasks.renderContainer.then(proxyOutlet => this.open(proxyOutlet)) : this.open();
      tasks.buildWindowName = tasks.open.then(({
        proxyWin
      }) => {
        return this.buildWindowName({
          proxyWin,
          initialDomain,
          domain,
          target,
          context,
          uid
        });
      });
      tasks.setWindowName = _src3.ZalgoPromise.all([tasks.open, tasks.buildWindowName]).then(([{
        proxyWin
      }, windowName]) => {
        return proxyWin.setName(windowName);
      });
      tasks.watchForClose = tasks.open.then(({
        proxyWin
      }) => {
        return this.watchForClose(proxyWin);
      });
      tasks.prerender = _src3.ZalgoPromise.all([tasks.open, tasks.renderContainer]).then(([{
        proxyWin
      }, proxyOutlet]) => {
        return this.prerender(proxyWin, proxyOutlet, {
          context,
          uid
        });
      });
      tasks.onDisplay = tasks.prerender.then(() => {
        return this.props.onDisplay();
      });
      tasks.openBridge = tasks.open.then(({
        proxyWin
      }) => {
        return this.openBridge(proxyWin, initialDomain, context);
      });
      tasks.loadUrl = _src3.ZalgoPromise.all([tasks.open, tasks.buildUrl, tasks.setWindowName]).then(([{
        proxyWin
      }, url]) => {
        return proxyWin.setLocation(url);
      });
      tasks.switchPrerender = _src3.ZalgoPromise.all([tasks.open, tasks.prerender, tasks.init]).then(([{
        proxyFrame
      }, {
        proxyPrerenderFrame
      }]) => {
        return this.switchPrerender({
          proxyFrame,
          proxyPrerenderFrame
        });
      });
      tasks.runTimeout = tasks.loadUrl.then(() => {
        return this.runTimeout();
      });
      tasks.onRender = tasks.init.then(() => {
        return this.props.onRendered();
      });
      return _src3.ZalgoPromise.hash(tasks);
    }).catch(err => {
      return _src3.ZalgoPromise.all([this.onError(err), this.destroy(err)]);
    }).then(_src4.noop);
  }

  getProxyContainer(container) {
    return _src3.ZalgoPromise.try(() => {
      return (0, _src4.elementReady)(container);
    }).then(containerElement => {
      return (0, _lib.getProxyElement)(containerElement);
    });
  }

  buildWindowName({
    proxyWin,
    initialDomain,
    domain,
    target,
    uid,
    context
  }) {
    return (0, _lib.buildChildWindowName)(this.component.name, this.buildChildPayload({
      proxyWin,
      initialDomain,
      domain,
      target,
      context,
      uid
    }));
  }

  getPropsRef(proxyWin, target, domain, uid) {
    const value = (0, _src.serializeMessage)(proxyWin, domain, this.getPropsForChild(domain));
    const propRef = (0, _src2.isSameDomain)(target) ? {
      type: _constants.INITIAL_PROPS.RAW,
      value
    } : {
      type: _constants.INITIAL_PROPS.UID,
      uid
    };

    if (propRef.type === _constants.INITIAL_PROPS.UID) {
      _lib.global.props[uid] = value;
      this.clean.register(() => {
        delete _lib.global.props[uid];
      });
    }

    return propRef;
  }

  buildChildPayload({
    proxyWin,
    initialDomain,
    domain,
    target = window,
    context,
    uid
  } = {}) {
    return {
      uid,
      context,
      domain: (0, _src2.getDomain)(window),
      tag: this.component.tag,
      parent: this.getWindowRef(target, initialDomain, uid, context),
      props: this.getPropsRef(proxyWin, target, domain, uid),
      exports: (0, _src.serializeMessage)(proxyWin, domain, this.buildParentExports(proxyWin))
    };
  }

  getHelpers() {
    return {
      state: this.state,
      close: () => this.close(),
      focus: () => this.focus(),
      resize: ({
        width,
        height
      }) => this.resize({
        width,
        height
      }),
      onError: err => this.onError(err),
      updateProps: props => this.updateProps(props)
    };
  }

  setProps(props, isUpdate = false) {
    if (this.component.validate) {
      this.component.validate({
        props
      });
    }

    const helpers = this.getHelpers(); // $FlowFixMe

    this.props = this.props || {};
    (0, _src4.extend)(this.props, (0, _props.normalizeProps)(this.component, this, props, helpers, isUpdate));

    for (const key of this.component.getPropNames()) {
      const propDef = this.component.getPropDefinition(key);

      if (propDef.required !== false && !(0, _src4.isDefined)(this.props[key])) {
        throw new Error(`Expected prop "${key}" to be defined`);
      }
    }
  }

  buildUrl() {
    return (0, _props.propsToQuery)(_extends({}, this.component.props, this.component.builtinProps), this.props).then(query => {
      return (0, _src4.extendUrl)((0, _src2.normalizeMockUrl)(this.component.getUrl(this.props)), {
        query
      });
    });
  }

  getDomain() {
    return this.component.getDomain(this.props);
  }

  getInitialDomain() {
    return this.component.getInitialDomain(this.props);
  }

  getPropsForChild(domain) {
    const result = {};

    for (const key of Object.keys(this.props)) {
      const prop = this.component.getPropDefinition(key);

      if (prop && prop.sendToChild === false) {
        continue;
      }

      if (prop && prop.sameDomain && !(0, _src2.matchDomain)(domain, (0, _src2.getDomain)(window))) {
        continue;
      } // $FlowFixMe


      result[key] = this.props[key];
    } // $FlowFixMe


    return result;
  }

  updateProps(props) {
    this.setProps(props, true);
    return this.initPromise.then(() => {
      if (this.child) {
        return this.child.updateProps(this.getPropsForChild(this.getDomain()));
      }
    });
  }

  open(proxyElement) {
    return _src3.ZalgoPromise.try(() => {
      this.component.log(`open`);
      const windowProp = this.props.window;

      if (windowProp) {
        this.clean.register(() => windowProp.close()); // $FlowFixMe

        return {
          proxyWin: _src.ProxyWindow.toProxyWindow(windowProp)
        };
      }

      return this.driver.open.call(this, proxyElement);
    }).then(({
      proxyWin,
      proxyFrame
    }) => {
      this.proxyWin = proxyWin;
      return {
        proxyWin,
        proxyFrame
      };
    });
  }

  focus() {
    return _src3.ZalgoPromise.try(() => {
      if (this.proxyWin) {
        return this.proxyWin.focus().then(_src4.noop);
      }
    });
  }

  switchPrerender({
    proxyFrame,
    proxyPrerenderFrame
  }) {
    return _src3.ZalgoPromise.try(() => {
      if (this.driver.switchPrerender) {
        if (this.props.window) {
          return;
        }

        if (!proxyFrame || !proxyPrerenderFrame) {
          throw new Error(`Expected to have both proxy frame and proxy prerender frame to switch`);
        }

        return this.driver.switchPrerender.call(this, {
          proxyFrame,
          proxyPrerenderFrame
        });
      }
    });
  }

  delegate(context, target) {
    this.component.log(`delegate`);
    const props = {};

    for (const propName of this.component.getPropNames()) {
      if (this.component.getPropDefinition(propName).allowDelegate) {
        props[propName] = this.props[propName];
      }
    }

    const overridesPromise = (0, _src.send)(target, `${_constants.POST_MESSAGE.DELEGATE}_${this.component.name}`, {
      context,
      props,
      overrides: {
        close: () => this.close(),
        onError: err => this.onError(err)
      }
    }).then(({
      data
    }) => {
      this.clean.register(data.destroy);
      return data.overrides;
    }).catch(err => {
      throw new Error(`Unable to delegate rendering. Possibly the component is not loaded in the target window.\n\n${(0, _src4.stringifyError)(err)}`);
    });

    for (const key of this.driver.delegate) {
      // $FlowFixMe
      this[key] = function overriddenFunction() {
        return overridesPromise.then(overrides => {
          return overrides[key].apply(this, arguments);
        });
      };
    }
  }

  getWindowRef(target, domain, uid, context) {
    if (domain === (0, _src2.getDomain)(window)) {
      _lib.global.windows[uid] = window;
      this.clean.register(() => {
        delete _lib.global.windows[uid];
      });
      return {
        type: _constants.WINDOW_REFERENCES.GLOBAL,
        uid
      };
    }

    if (context === _constants.CONTEXT.POPUP) {
      return {
        type: _constants.WINDOW_REFERENCES.OPENER
      };
    }

    if ((0, _src2.isTop)(window)) {
      return {
        type: _constants.WINDOW_REFERENCES.TOP
      };
    }

    return {
      type: _constants.WINDOW_REFERENCES.PARENT,
      distance: (0, _src2.getDistanceFromTop)(window)
    };
  }

  watchForClose(proxyWin) {
    return proxyWin.awaitWindow().then(win => {
      const closeWindowListener = (0, _src2.onCloseWindow)(win, () => {
        this.component.log(`detect_close_child`);
        return this.close();
      }, 2000);
      this.clean.register(closeWindowListener.cancel);
    });
  }

  watchForUnload() {
    const unloadWindowListener = (0, _src4.addEventListener)(window, 'unload', (0, _src4.once)(() => {
      this.component.log(`navigate_away`);
      this.destroy(new Error(`Window navigated away`));
    }));
    this.clean.register(unloadWindowListener.cancel);
  }

  runTimeout() {
    return _src3.ZalgoPromise.try(() => {
      const timeout = this.props.timeout;

      if (timeout) {
        return this.initPromise.timeout(timeout, new Error(`Loading component timed out after ${timeout} milliseconds`));
      }
    });
  }

  initChild(child) {
    return _src3.ZalgoPromise.try(() => {
      this.clean.set('child', child);
      this.initPromise.resolve();
    });
  }

  buildParentExports(win) {
    const onError = err => this.onError(err);

    const init = child => this.initChild(child);

    const close = () => this.close();

    const checkClose = () => this.checkClose(win);

    const resize = ({
      width,
      height
    }) => this.resize({
      width,
      height
    });

    init.onError = onError;
    return {
      init,
      close,
      checkClose,
      resize,
      onError
    };
  }

  resize({
    width,
    height
  }) {
    return _src3.ZalgoPromise.try(() => {
      if (this.driver.resize) {
        return this.driver.resize.call(this, {
          width,
          height
        });
      }
    });
  }

  checkClose(win) {
    return win.isClosed().then(closed => {
      if (closed) {
        return this.close();
      }

      return _src3.ZalgoPromise.delay(200).then(() => win.isClosed()).then(secondClosed => {
        if (secondClosed) {
          return this.close();
        }
      });
    });
  }

  close() {
    return _src3.ZalgoPromise.try(() => {
      this.component.log(`close`);
      return this.props.onClose();
    }).then(() => {
      if (this.child && this.driver.callChildToClose) {
        this.child.close.fireAndForget().catch(_src4.noop);
      }

      return this.destroy(new Error(`Window closed`));
    });
  }

  prerender(proxyWin, proxyElement, {
    context,
    uid
  }) {
    return _src3.ZalgoPromise.try(() => {
      return this.driver.openPrerender.call(this, proxyWin, proxyElement);
    }).then(({
      proxyPrerenderWin,
      proxyPrerenderFrame
    }) => {
      return proxyPrerenderWin.awaitWindow().then(prerenderWindow => {
        if (!(0, _src2.isSameDomain)(prerenderWindow) || !(0, _src2.isBlankDomain)(prerenderWindow)) {
          return {
            proxyPrerenderWin,
            proxyPrerenderFrame
          };
        }

        prerenderWindow = (0, _src2.assertSameDomain)(prerenderWindow);
        const doc = prerenderWindow.document;
        const el = this.renderTemplate(this.component.prerenderTemplate, {
          context,
          uid,
          document: doc
        });

        if (el.ownerDocument !== doc) {
          throw new Error(`Expected prerender template to have been created with document from child window`);
        }

        (0, _src4.writeElementToWindow)(prerenderWindow, el);
        let {
          width = false,
          height = false,
          element = 'body'
        } = this.component.autoResize || {};
        element = (0, _src4.getElementSafe)(element, doc);

        if (element && (width || height)) {
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
            height,
            win: prerenderWindow
          });
        }

        return {
          proxyPrerenderWin,
          proxyPrerenderFrame
        };
      });
    });
  }

  renderTemplate(renderer, {
    context,
    uid,
    container,
    document,
    outlet
  }) {
    // $FlowFixMe
    return renderer.call(this, {
      container,
      outlet,
      context,
      uid,
      focus: () => this.focus(),
      close: () => this.close(),
      state: this.state,
      props: this.props,
      tag: this.component.tag,
      doc: document,
      dimensions: this.component.dimensions
    });
  }

  renderContainer(proxyContainer, {
    context,
    uid
  }) {
    return _src3.ZalgoPromise.try(() => {
      return proxyContainer.getElement();
    }).then(element => {
      return (0, _src4.elementReady)(element);
    }).then(container => {
      const outlet = (0, _src4.createElement)('div', {
        class: [_constants.CLASS.OUTLET]
      });
      const innerContainer = this.renderTemplate(this.component.containerTemplate, {
        context,
        uid,
        container,
        outlet
      });
      (0, _src4.appendChild)(container, innerContainer);
      this.clean.register(() => (0, _src4.destroyElement)(outlet));
      this.clean.register(() => (0, _src4.destroyElement)(innerContainer));
      this.proxyOutlet = (0, _lib.getProxyElement)(outlet);
      return this.proxyOutlet;
    });
  }

  destroy(err = new Error(`Component destroyed before render complete`)) {
    return _src3.ZalgoPromise.try(() => {
      this.component.log(`destroy`);
      this.initPromise.asyncReject(err);
      return this.clean.all();
    });
  }

  onError(err, onError) {
    // eslint-disable-next-line promise/no-promise-in-callback
    return _src3.ZalgoPromise.try(() => {
      this.initPromise.asyncReject(err);

      if (!onError && this.props && this.props.onError) {
        onError = this.props.onError;
      }

      if (onError) {
        return onError(err);
      }
    }).then(() => {
      return this.initPromise;
    }).then(() => {
      throw err;
    });
  }

  openBridge(proxyWin, domain, context) {
    if (__POST_ROBOT__.__IE_POPUP_SUPPORT__) {
      return _src3.ZalgoPromise.try(() => {
        return proxyWin.awaitWindow();
      }).then(win => {
        if (!_src.bridge || !_src.bridge.needsBridge({
          win,
          domain
        }) || _src.bridge.hasBridge(domain, domain)) {
          return;
        }

        const bridgeUrl = this.component.getBridgeUrl();

        if (!bridgeUrl) {
          throw new Error(`Bridge needed to render ${context}`);
        }

        const bridgeDomain = (0, _src2.getDomainFromUrl)(bridgeUrl);

        _src.bridge.linkUrl(win, domain);

        return _src.bridge.openBridge((0, _src2.normalizeMockUrl)(bridgeUrl), bridgeDomain);
      });
    }
  }

}, _temp), (_applyDecoratedDescriptor(_class.prototype, "close", [_src4.memoized], Object.getOwnPropertyDescriptor(_class.prototype, "close"), _class.prototype)), _class);
exports.ParentComponent = ParentComponent;