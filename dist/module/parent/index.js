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

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

class ParentComponent {
  // eslint-disable-line flowtype/no-mutable-array
  constructor(component, props) {
    this.component = void 0;
    this.driver = void 0;
    this.clean = void 0;
    this.event = void 0;
    this.initPromise = void 0;
    this.handledErrors = void 0;
    this.props = void 0;
    this.state = void 0;
    this.child = void 0;
    this.proxyWin = void 0;
    this.proxyContainer = void 0;
    this.initPromise = new _src3.ZalgoPromise();
    this.handledErrors = [];
    this.clean = (0, _src4.cleanup)(this);
    this.state = {};
    this.component = component;
    this.setupEvents(props.onError);
    this.setProps(props);
    this.component.registerActiveComponent(this);
    this.clean.register(() => this.component.destroyActiveComponent(this));
    this.watchForUnload();
  }

  setupEvents(onError) {
    this.event = (0, _src4.eventEmitter)();
    this.event.on(_constants.EVENT.RENDER, () => this.props.onRender());
    this.event.on(_constants.EVENT.DISPLAY, () => this.props.onDisplay());
    this.event.on(_constants.EVENT.RENDERED, () => this.props.onRendered());
    this.event.on(_constants.EVENT.CLOSE, () => this.props.onClose());
    this.event.on(_constants.EVENT.PROPS, props => this.props.onProps(props));
    this.event.on(_constants.EVENT.ERROR, err => {
      if (this.props && this.props.onError) {
        return this.props.onError(err);
      } else if (onError) {
        return onError(err);
      } else {
        return this.initPromise.reject(err).then(() => {
          setTimeout(() => {
            throw err;
          }, 1);
        });
      }
    });
  }

  render(target, container, context) {
    return _src3.ZalgoPromise.try(() => {
      this.component.log(`render`);
      this.driver = _drivers.RENDER_DRIVERS[context];
      const uid = `${_constants.ZOID}-${this.component.tag}-${(0, _src4.uniqueID)()}`;
      const domain = this.getDomain();
      const initialDomain = this.getInitialDomain();
      this.component.checkAllowRender(target, domain, container);

      if (target !== window) {
        this.delegate(context, target);
      }

      const tasks = {};
      tasks.init = this.initPromise;
      tasks.buildUrl = this.buildUrl();
      tasks.onRender = this.event.trigger(_constants.EVENT.RENDER);
      tasks.getProxyContainer = this.getProxyContainer(container);
      tasks.openFrame = this.openFrame();
      tasks.openPrerenderFrame = this.openPrerenderFrame();
      tasks.renderContainer = _src3.ZalgoPromise.all([tasks.getProxyContainer, tasks.openFrame, tasks.openPrerenderFrame]).then(([proxyContainer, proxyFrame, proxyPrerenderFrame]) => {
        return this.renderContainer(proxyContainer, {
          context,
          uid,
          proxyFrame,
          proxyPrerenderFrame
        });
      });
      tasks.open = this.driver.openOnClick ? this.open() : tasks.openFrame.then(proxyFrame => this.open(proxyFrame));
      tasks.openPrerender = _src3.ZalgoPromise.all([tasks.open, tasks.openPrerenderFrame]).then(([proxyWin, proxyPrerenderFrame]) => {
        return this.openPrerender(proxyWin, proxyPrerenderFrame);
      });
      tasks.setState = _src3.ZalgoPromise.all([tasks.open.then(proxyWin => {
        this.proxyWin = proxyWin;
        return this.setProxyWin(proxyWin);
      }), tasks.renderContainer.then(proxyContainer => {
        this.proxyContainer = proxyContainer;
      })]);
      tasks.prerender = _src3.ZalgoPromise.all([tasks.openPrerender, tasks.setState]).then(([proxyPrerenderWin]) => {
        return this.prerender(proxyPrerenderWin, {
          context,
          uid
        });
      });
      tasks.loadUrl = _src3.ZalgoPromise.all([tasks.open, tasks.buildUrl, tasks.setWindowName, tasks.prerender]).then(([proxyWin, url]) => {
        return proxyWin.setLocation(url);
      });
      tasks.buildWindowName = tasks.open.then(proxyWin => {
        return this.buildWindowName({
          proxyWin,
          initialDomain,
          domain,
          target,
          context,
          uid
        });
      });
      tasks.setWindowName = _src3.ZalgoPromise.all([tasks.open, tasks.buildWindowName]).then(([proxyWin, windowName]) => {
        return proxyWin.setName(windowName);
      });
      tasks.watchForClose = tasks.open.then(proxyWin => {
        return this.watchForClose(proxyWin);
      });
      tasks.onDisplay = tasks.prerender.then(() => {
        return this.event.trigger(_constants.EVENT.DISPLAY);
      });
      tasks.openBridge = tasks.open.then(proxyWin => {
        return this.openBridge(proxyWin, initialDomain, context);
      });
      tasks.runTimeout = tasks.loadUrl.then(() => {
        return this.runTimeout();
      });
      tasks.onRender = tasks.init.then(() => {
        return this.event.trigger(_constants.EVENT.RENDERED);
      });
      return _src3.ZalgoPromise.hash(tasks);
    }).catch(err => {
      return _src3.ZalgoPromise.all([this.onError(err), this.destroy(err)]).then(() => {
        throw err;
      });
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
    const childPayload = this.buildChildPayload({
      proxyWin,
      initialDomain,
      domain,
      target,
      context,
      uid
    });
    return `__${_constants.ZOID}__${this.component.name}__${(0, _src4.base64encode)(JSON.stringify(childPayload))}__`;
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
      const global = (0, _lib.globalFor)(window);
      global.props = global.props || {};
      global.props[uid] = value;
      this.clean.register(() => {
        delete global.props[uid];
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

  setProxyWin(proxyWin) {
    return _src3.ZalgoPromise.try(() => {
      this.proxyWin = proxyWin;
    });
  }

  getHelpers() {
    return {
      state: this.state,
      event: this.event,
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

  openFrame() {
    return _src3.ZalgoPromise.try(() => {
      if (this.driver.openFrame) {
        return this.driver.openFrame.call(this);
      }
    });
  }

  openPrerenderFrame() {
    return _src3.ZalgoPromise.try(() => {
      if (this.driver.openPrerenderFrame) {
        return this.driver.openPrerenderFrame.call(this);
      }
    });
  }

  open(proxyFrame) {
    return _src3.ZalgoPromise.try(() => {
      this.component.log(`open`);
      const windowProp = this.props.window;

      if (windowProp) {
        this.clean.register(() => windowProp.close());
        return (0, _src.toProxyWindow)(windowProp);
      }

      return this.driver.open.call(this, proxyFrame);
    }).then(proxyWin => {
      this.proxyWin = proxyWin;
      return proxyWin;
    });
  }

  openPrerender(proxyWin, proxyPrerenderFrame) {
    return _src3.ZalgoPromise.try(() => {
      return this.driver.openPrerender.call(this, proxyWin, proxyPrerenderFrame);
    });
  }

  focus() {
    return _src3.ZalgoPromise.try(() => {
      if (this.proxyWin) {
        return this.proxyWin.focus().then(_src4.noop);
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
        event: this.event,
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
      const global = (0, _lib.globalFor)(window);
      global.windows = global.windows || {};
      global.windows[uid] = window;
      this.clean.register(() => {
        delete global.windows[uid];
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
      return this.event.trigger(_constants.EVENT.CLOSE);
    }).then(() => {
      if (this.child) {
        this.child.close.fireAndForget().catch(_src4.noop);
      }

      return this.destroy(new Error(`Window closed`), false);
    });
  }

  prerender(proxyPrerenderWin, {
    context,
    uid
  }) {
    return _src3.ZalgoPromise.try(() => {
      const prerenderTemplate = this.component.prerenderTemplate;

      if (!prerenderTemplate) {
        return;
      }

      let prerenderWindow = proxyPrerenderWin.getWindow();

      if (!prerenderWindow || !(0, _src2.isSameDomain)(prerenderWindow) || !(0, _src2.isBlankDomain)(prerenderWindow)) {
        return;
      }

      prerenderWindow = (0, _src2.assertSameDomain)(prerenderWindow);
      const doc = prerenderWindow.document;
      const el = this.renderTemplate(prerenderTemplate, {
        context,
        uid,
        doc
      });

      if (!el) {
        return;
      }

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
    });
  }

  renderTemplate(renderer, {
    context,
    uid,
    container,
    doc,
    frame,
    prerenderFrame
  }) {
    // $FlowFixMe
    return renderer.call(this, {
      container,
      context,
      uid,
      doc,
      frame,
      prerenderFrame,
      focus: () => this.focus(),
      close: () => this.close(),
      state: this.state,
      props: this.props,
      tag: this.component.tag,
      dimensions: this.component.dimensions,
      event: this.event
    });
  }

  renderContainer(proxyContainer, {
    proxyFrame,
    proxyPrerenderFrame,
    context,
    uid
  }) {
    return _src3.ZalgoPromise.all([proxyContainer.getElement().then(_src4.elementReady), // $FlowFixMe
    proxyFrame ? proxyFrame.getElement() : null, // $FlowFixMe
    proxyPrerenderFrame ? proxyPrerenderFrame.getElement() : null]).then(([container, frame, prerenderFrame]) => {
      const innerContainer = this.renderTemplate(this.component.containerTemplate, {
        context,
        uid,
        container,
        frame,
        prerenderFrame,
        doc: document
      });

      if (innerContainer) {
        (0, _src4.appendChild)(container, innerContainer);
        this.clean.register(() => (0, _src4.destroyElement)(innerContainer));
        this.proxyContainer = (0, _lib.getProxyElement)(innerContainer);
        return this.proxyContainer;
      }
    });
  }

  destroy(err, trigger = true) {
    return _src3.ZalgoPromise.try(() => {
      if (!err) {
        trigger = false;
        err = new Error('Component destroyed');
      }

      this.component.log(`destroy`);
      return this.onError(err, trigger);
    }).then(() => {
      return this.clean.all();
    });
  }

  onError(err, trigger = true) {
    return _src3.ZalgoPromise.try(() => {
      if (this.handledErrors.indexOf(err) !== -1) {
        return;
      }

      this.handledErrors.push(err);
      this.initPromise.asyncReject(err);

      if (trigger) {
        return this.event.trigger(_constants.EVENT.ERROR, err);
      }
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

}

exports.ParentComponent = ParentComponent;