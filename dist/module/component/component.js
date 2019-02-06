"use strict";

exports.__esModule = true;
exports.create = create;
exports.destroyAll = destroyAll;
exports.Component = void 0;

var _src = require("post-robot/src");

var _src2 = require("zalgo-promise/src");

var _src3 = require("cross-domain-utils/src");

var _src4 = require("belter/src");

var _child = require("../child");

var _parent = require("../parent");

var _delegate = require("../delegate");

var _constants = require("../constants");

var _drivers = require("../drivers");

var _validate = require("./validate");

var _templates = require("./templates");

var _props = require("./props");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

class Component {
  constructor(options) {
    this.tag = void 0;
    this.name = void 0;
    this.url = void 0;
    this.domain = void 0;
    this.bridgeUrl = void 0;
    this.props = void 0;
    this.builtinProps = void 0;
    this.dimensions = void 0;
    this.autoResize = void 0;
    this.allowedParentDomains = void 0;
    this.defaultContext = void 0;
    this.attributes = void 0;
    this.containerTemplate = void 0;
    this.prerenderTemplate = void 0;
    this.validate = void 0;
    this.driverCache = void 0;
    this.xprops = void 0;
    this.logger = void 0;
    this.propNames = void 0;
    (0, _validate.validate)(options); // The tag name of the component. Used by some drivers (e.g. angular) to turn the component into an html element,
    // e.g. <my-component>

    this.tag = options.tag;
    this.name = this.tag.replace(/-/g, '_');
    this.allowedParentDomains = options.allowedParentDomains || _constants.WILDCARD;

    if (Component.components[this.tag]) {
      throw new Error(`Can not register multiple components with the same tag: ${this.tag}`);
    } // A json based spec describing what kind of props the component accepts. This is used to validate any props before
    // they are passed down to the child.


    this.builtinProps = (0, _props.getBuiltInProps)();
    this.props = options.props || {}; // The dimensions of the component, e.g. { width: '300px', height: '150px' }

    const {
      width = _constants.DEFAULT_DIMENSIONS.WIDTH,
      height = _constants.DEFAULT_DIMENSIONS.HEIGHT
    } = options.dimensions || {};
    this.dimensions = {
      width,
      height
    };
    this.url = options.url;
    this.domain = options.domain;
    this.bridgeUrl = options.bridgeUrl;
    this.attributes = options.attributes || {};
    this.attributes.iframe = this.attributes.iframe || {};
    this.attributes.popup = this.attributes.popup || {};
    this.defaultContext = options.defaultContext || _constants.CONTEXT.IFRAME;
    this.autoResize = options.autoResize;

    if (options.containerTemplate) {
      this.containerTemplate = options.containerTemplate;
    } else if (__ZOID__.__DEFAULT_CONTAINER__) {
      this.containerTemplate = _templates.defaultContainerTemplate;
    }

    if (options.prerenderTemplate) {
      this.prerenderTemplate = options.prerenderTemplate;
    } else if (__ZOID__.__DEFAULT_PRERENDER__) {
      this.prerenderTemplate = _templates.defaultPrerenderTemplate;
    }

    this.validate = options.validate;
    this.logger = options.logger || {
      debug: _src4.noop,
      info: _src4.noop,
      warn: _src4.noop,
      error: _src4.noop
    };
    this.registerChild();
    this.listenDelegate();
    Component.components[this.tag] = this;
  }

  getPropNames() {
    if (this.propNames) {
      return this.propNames;
    }

    const propNames = Object.keys(this.props);

    for (const key of Object.keys(this.builtinProps)) {
      if (propNames.indexOf(key) === -1) {
        propNames.push(key);
      }
    }

    this.propNames = propNames;
    return propNames;
  } // $FlowFixMe


  getPropDefinition(name) {
    // $FlowFixMe
    return this.props[name] || this.builtinProps[name];
  }

  driver(name, dep) {
    if (__ZOID__.__FRAMEWORK_SUPPORT__) {
      const drivers = {
        react: _drivers.react,
        angular: _drivers.angular,
        vue: _drivers.vue,
        angular2: _drivers.angular2
      };

      if (!drivers[name]) {
        throw new Error(`Could not find driver for framework: ${name}`);
      }

      this.driverCache = this.driverCache || {};

      if (!this.driverCache[name]) {
        this.driverCache[name] = drivers[name].register(this, dep);
      }

      return this.driverCache[name];
    } else {
      throw new Error(`Driver support not enabled`);
    }
  }

  registerChild() {
    if (this.isChild()) {
      if (window.xprops) {
        throw new Error(`Can not register ${this.name} as child - can not attach multiple components to the same window`);
      }

      const child = new _child.ChildComponent(this);
      window.xprops = this.xprops = child.getProps();
    }
  }

  listenDelegate() {
    (0, _src.on)(`${_constants.POST_MESSAGE.ALLOW_DELEGATE}_${this.name}`, () => {
      return true;
    });
    (0, _src.on)(`${_constants.POST_MESSAGE.DELEGATE}_${this.name}`, ({
      source,
      data: {
        context,
        props,
        overrides
      }
    }) => {
      const delegate = new _delegate.DelegateComponent(this, source, {
        context,
        props,
        overrides
      });
      return delegate.getDelegate();
    });
  }

  canRenderTo(win) {
    return (0, _src.send)(win, `${_constants.POST_MESSAGE.ALLOW_DELEGATE}_${this.name}`).then(({
      data
    }) => {
      return data;
    }).catch(() => {
      return false;
    });
  }

  getUrl(props) {
    if (typeof this.url === 'function') {
      return this.url({
        props
      });
    }

    return this.url;
  }

  getInitialDomain(props) {
    if (this.domain && typeof this.domain === 'string') {
      return this.domain;
    }

    return (0, _src3.getDomainFromUrl)(this.getUrl(props));
  }

  getDomain(props) {
    if ((0, _src4.isRegex)(this.domain)) {
      // $FlowFixMe
      return this.domain;
    }

    return this.getInitialDomain(props);
  }

  getBridgeUrl() {
    if (this.bridgeUrl) {
      return this.bridgeUrl;
    }
  }

  isChild() {
    const payload = (0, _child.getChildPayload)();
    return Boolean(payload && payload.tag === this.tag);
  }

  getDefaultContainer(context, container) {
    if (container) {
      if (typeof container !== 'string' && !(0, _src4.isElement)(container)) {
        throw new TypeError(`Expected string or element selector to be passed`);
      }

      return container;
    }

    if (context === _constants.CONTEXT.POPUP) {
      // $FlowFixMe
      return 'body';
    }

    throw new Error(`Expected element to be passed to render iframe`);
  }

  getDefaultContext(context, props) {
    if (props.window) {
      return (0, _src.toProxyWindow)(props.window).getType();
    }

    if (context) {
      if (context !== _constants.CONTEXT.IFRAME && context !== _constants.CONTEXT.POPUP) {
        throw new Error(`Unrecognized context: ${context}`);
      }

      return context;
    }

    return this.defaultContext;
  }

  init(props) {
    // $FlowFixMe
    props = props || {};
    const parent = new _parent.ParentComponent(this, props);

    const render = (target, container, context) => _src2.ZalgoPromise.try(() => {
      if (!(0, _src3.isWindow)(target)) {
        throw new Error(`Must pass window to renderTo`);
      }

      context = this.getDefaultContext(context, props);
      container = this.getDefaultContainer(context, container);
      return parent.render(target, container, context);
    });

    return _extends({}, parent.getHelpers(), {
      render: (container, context) => render(window, container, context),
      renderTo: (target, container, context) => render(target, container, context)
    });
  }

  checkAllowRender(target, domain, container) {
    if (target === window) {
      return;
    }

    if (!(0, _src3.isSameTopWindow)(window, target)) {
      throw new Error(`Can only renderTo an adjacent frame`);
    }

    const origin = (0, _src3.getDomain)();

    if (!(0, _src3.matchDomain)(domain, origin) && !(0, _src3.isSameDomain)(target)) {
      throw new Error(`Can not render remotely to ${domain.toString()} - can only render to ${origin}`);
    }

    if (container && typeof container !== 'string') {
      throw new Error(`Container passed to renderTo must be a string selector, got ${typeof container} }`);
    }
  }

  log(event, payload) {
    this.logger.info(`${this.name}_${event}`, payload);
  }

  // eslint-disable-line flowtype/no-mutable-array
  registerActiveComponent(instance) {
    Component.activeComponents.push(instance);
  }

  destroyActiveComponent(instance) {
    Component.activeComponents.splice(Component.activeComponents.indexOf(instance), 1);
  }

  static destroyAll() {
    if (_src.bridge) {
      _src.bridge.destroyBridges();
    }

    const results = [];

    while (Component.activeComponents.length) {
      results.push(Component.activeComponents[0].destroy());
    }

    return _src2.ZalgoPromise.all(results).then(_src4.noop);
  }

}

exports.Component = Component;
Component.components = {};
Component.activeComponents = [];

function create(options) {
  const component = new Component(options);

  const init = props => component.init(props);

  init.driver = (name, dep) => component.driver(name, dep);

  init.isChild = () => component.isChild();

  init.canRenderTo = win => component.canRenderTo(win);

  init.xprops = component.xprops; // $FlowFixMe

  return init;
}

function destroyAll() {
  return Component.destroyAll();
}