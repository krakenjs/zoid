var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _desc, _value, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

/* eslint max-lines: 0 */

import { on, send } from 'post-robot/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { getDomainFromUrl } from 'cross-domain-utils/src';
import { memoize, isRegex, toCSS } from 'belter/src';
import 'jsx-pragmatic/src';

import { ChildComponent } from '../child';
import { ParentComponent } from '../parent';
import { DelegateComponent } from '../delegate';
import { isZoidComponentWindow, parseChildWindowName } from '../window';
import { CONTEXT, POST_MESSAGE, WILDCARD, DEFAULT_DIMENSIONS } from '../../constants';
import { angular, angular2, glimmer, react, vue } from '../../drivers/index';
import { info, error, warn } from '../../lib';


import { validate } from './validate';
import { defaultContainerTemplate, defaultPrerenderTemplate } from './templates';
import { getInternalProps } from './props';

var drivers = { angular: angular, angular2: angular2, glimmer: glimmer, react: react, vue: vue };

/*  Component
    ---------

    This is the spec for the component. The idea is, when I call zoid.create(), it will create a new instance
    of Component with the blueprint needed to set up ParentComponents and ChildComponents.

    This is the one portion of code which is required by -- and shared to -- both the parent and child windows, and
    contains all of the configuration needed for them to set themselves up.
*/

export var Component = (_class = function () {
    function Component(options) {
        _classCallCheck(this, Component);

        validate(options);

        // The tag name of the component. Used by some drivers (e.g. angular) to turn the component into an html element,
        // e.g. <my-component>

        this.tag = options.tag;
        this.name = this.tag.replace(/-/g, '_');

        this.allowedParentDomains = options.allowedParentDomains || WILDCARD;

        if (Component.components[this.tag]) {
            throw new Error('Can not register multiple components with the same tag');
        }

        // A json based spec describing what kind of props the component accepts. This is used to validate any props before
        // they are passed down to the child.

        this.builtinProps = getInternalProps();
        this.props = options.props || {};

        // The dimensions of the component, e.g. { width: '300px', height: '150px' }

        var _ref = options.dimensions || {},
            _ref$width = _ref.width,
            width = _ref$width === undefined ? DEFAULT_DIMENSIONS.WIDTH : _ref$width,
            _ref$height = _ref.height,
            height = _ref$height === undefined ? DEFAULT_DIMENSIONS.HEIGHT : _ref$height;

        this.dimensions = { width: toCSS(width), height: toCSS(height) };

        this.defaultEnv = options.defaultEnv;
        this.url = options.url || options.buildUrl;
        this.domain = options.domain;
        this.bridgeUrl = options.bridgeUrl;

        this.attributes = options.attributes || {};
        this.contexts = options.contexts || { iframe: true, popup: false };
        this.defaultContext = options.defaultContext || CONTEXT.IFRAME;

        this.autoResize = _typeof(options.autoResize) === 'object' ? options.autoResize : { width: Boolean(options.autoResize), height: Boolean(options.autoResize), element: 'body' };

        this.containerTemplate = options.containerTemplate || defaultContainerTemplate;
        this.prerenderTemplate = options.prerenderTemplate || defaultPrerenderTemplate;

        this.validate = options.validate;

        Component.components[this.tag] = this;

        // Register all of the drivers for instantiating components. The model used is -- there's a standard javascript
        // way of rendering a component, then each other technology (e.g. react) needs to hook into that interface.
        // This makes us a little more pluggable and loosely coupled.
        this.registerDrivers();
        this.registerChild();
        this.listenDelegate();
    }

    Component.prototype.getPropNames = function getPropNames() {
        var props = Object.keys(this.props);

        for (var _i2 = 0, _Object$keys2 = Object.keys(this.builtinProps), _length2 = _Object$keys2 == null ? 0 : _Object$keys2.length; _i2 < _length2; _i2++) {
            var key = _Object$keys2[_i2];
            if (props.indexOf(key) === -1) {
                props.push(key);
            }
        }

        return props;
    };

    // $FlowFixMe


    Component.prototype.getProp = function getProp(name) {
        // $FlowFixMe
        return this.props[name] || this.builtinProps[name];
    };

    Component.prototype.registerDrivers = function registerDrivers() {
        this.driverCache = {};

        for (var _i4 = 0, _Object$keys4 = Object.keys(drivers), _length4 = _Object$keys4 == null ? 0 : _Object$keys4.length; _i4 < _length4; _i4++) {
            var driverName = _Object$keys4[_i4];
            if (driverName.indexOf('_') === 0) {
                continue;
            }

            var driver = drivers[driverName];
            var glob = driver.global();
            if (glob) {
                this.driver(driverName, glob);
            }
        }
    };

    Component.prototype.driver = function driver(name, dep) {
        if (!drivers[name]) {
            throw new Error('Could not find driver for framework: ' + name);
        }

        if (!this.driverCache[name]) {
            this.driverCache[name] = drivers[name].register(this, dep);
        }

        return this.driverCache[name];
    };

    Component.prototype.registerChild = function registerChild() {
        var _this = this;

        return ZalgoPromise['try'](function () {
            if (_this.isChild()) {
                return new ChildComponent(_this);
            }
        });
    };

    Component.prototype.listenDelegate = function listenDelegate() {
        var _this2 = this;

        on(POST_MESSAGE.ALLOW_DELEGATE + '_' + this.name, function () {
            return true;
        });

        on(POST_MESSAGE.DELEGATE + '_' + this.name, function (_ref2) {
            var source = _ref2.source,
                _ref2$data = _ref2.data,
                context = _ref2$data.context,
                props = _ref2$data.props,
                overrides = _ref2$data.overrides;

            return _this2.delegate(source, { context: context, props: props, overrides: overrides }).getDelegate();
        });
    };

    Component.prototype.canRenderTo = function canRenderTo(win) {
        return send(win, POST_MESSAGE.ALLOW_DELEGATE + '_' + this.name).then(function (_ref3) {
            var data = _ref3.data;

            return data;
        })['catch'](function () {
            return false;
        });
    };

    Component.prototype.getUrl = function getUrl(props) {
        if (typeof this.url === 'function') {
            return this.url(props);
        }

        if (typeof this.url === 'string') {
            return this.url;
        }

        var env = props.env || this.defaultEnv;
        if (env && _typeof(this.url) === 'object' && this.url[env]) {
            return this.url[env];
        }

        throw new Error('Can not find url');
    };

    Component.prototype.getInitialDomain = function getInitialDomain(props) {
        if (typeof this.domain === 'string') {
            // $FlowFixMe
            return this.domain;
        }

        var env = props.env || this.defaultEnv;
        // $FlowFixMe
        if (env && _typeof(this.domain) === 'object' && !isRegex(this.domain) && this.domain[env]) {
            return this.domain[env];
        }

        return getDomainFromUrl(this.getUrl(props));
    };

    Component.prototype.getDomain = function getDomain(props) {
        if (isRegex(this.domain)) {
            // $FlowFixMe
            return this.domain;
        }

        return this.getInitialDomain(props);
    };

    Component.prototype.getBridgeUrl = function getBridgeUrl(props) {
        if (this.bridgeUrl) {
            if (typeof this.bridgeUrl === 'string') {
                return this.bridgeUrl;
            }

            var env = props.env || this.defaultEnv;
            if (env && _typeof(this.bridgeUrl) === 'object' && this.bridgeUrl[env]) {
                return this.bridgeUrl[env];
            }
        }
    };

    Component.prototype.isZoidComponent = function isZoidComponent() {
        return isZoidComponentWindow();
    };

    Component.prototype.isChild = function isChild() {
        return isZoidComponentWindow() && parseChildWindowName().tag === this.tag;
    };

    Component.prototype.createError = function createError(message, tag) {
        return new Error('[' + (tag || this.tag) + '] ' + message);
    };

    /*  Init
        ----
         Shortcut to instantiate a component on a parent page, with props
    */

    Component.prototype.init = function init(props, context, element) {
        return new ParentComponent(this, this.getRenderContext(context, element), { props: props });
    };

    Component.prototype.delegate = function delegate(source, options) {
        return new DelegateComponent(this, source, options);
    };

    Component.prototype.validateRenderContext = function validateRenderContext(context, element) {
        if (context && !this.contexts[context]) {
            throw new Error('[' + this.tag + '] Can not render to ' + context);
        }

        if (!element && context === CONTEXT.IFRAME) {
            throw new Error('[' + this.tag + '] Context type ' + CONTEXT.IFRAME + ' requires an element selector');
        }
    };

    Component.prototype.getDefaultContext = function getDefaultContext() {
        if (this.defaultContext && this.contexts[this.defaultContext]) {
            return this.defaultContext;
        } else if (this.contexts[CONTEXT.IFRAME]) {
            return CONTEXT.IFRAME;
        } else if (this.contexts[CONTEXT.POPUP]) {
            return CONTEXT.POPUP;
        }

        throw new Error('Can not determine default context');
    };

    Component.prototype.getRenderContext = function getRenderContext(context, element) {
        context = context || this.getDefaultContext();
        this.validateRenderContext(context, element);
        return context;
    };

    /*  Render
        ------
         Shortcut to render a parent component
    */

    Component.prototype.render = function render(props, element) {
        var _this3 = this;

        return ZalgoPromise['try'](function () {
            var context = _this3.getRenderContext(null, element);
            return new ParentComponent(_this3, context, { props: props }).render(context, element);
        });
    };

    Component.prototype.renderIframe = function renderIframe(props, element) {
        var _this4 = this;

        return ZalgoPromise['try'](function () {
            var context = _this4.getRenderContext(CONTEXT.IFRAME, element);
            return new ParentComponent(_this4, context, { props: props }).render(context, element);
        });
    };

    Component.prototype.renderPopup = function renderPopup(props) {
        var _this5 = this;

        return ZalgoPromise['try'](function () {
            var context = _this5.getRenderContext(CONTEXT.POPUP);
            return new ParentComponent(_this5, context, { props: props }).render(context);
        });
    };

    Component.prototype.renderTo = function renderTo(win, props, element) {
        var _this6 = this;

        return ZalgoPromise['try'](function () {
            var context = _this6.getRenderContext(null, element);
            return new ParentComponent(_this6, context, { props: props }).renderTo(context, win, element);
        });
    };

    Component.prototype.renderIframeTo = function renderIframeTo(win, props, element) {
        var _this7 = this;

        return ZalgoPromise['try'](function () {
            var context = _this7.getRenderContext(CONTEXT.IFRAME, element);
            return new ParentComponent(_this7, context, { props: props }).renderTo(context, win, element);
        });
    };

    Component.prototype.renderPopupTo = function renderPopupTo(win, props) {
        var _this8 = this;

        return ZalgoPromise['try'](function () {
            var context = _this8.getRenderContext(CONTEXT.POPUP);
            return new ParentComponent(_this8, context, { props: props }).renderTo(context, win);
        });
    };

    /*  Log
        ---
         Log an event using the component name
    */

    Component.prototype.log = function log(event) {
        var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        info(this.name, event, payload);
    };

    /*  Log Warning
        -----------
         Log a warning
    */

    Component.prototype.logWarning = function logWarning(event, payload) {
        warn(this.name, event, payload);
    };

    /*  Log Error
        ---------
         Log an error
    */

    Component.prototype.logError = function logError(event, payload) {
        error(this.name, event, payload);
    };

    Component.getByTag = function getByTag(tag) {
        return Component.components[tag];
    };

    return Component;
}(), (_applyDecoratedDescriptor(_class.prototype, 'getPropNames', [memoize], Object.getOwnPropertyDescriptor(_class.prototype, 'getPropNames'), _class.prototype)), _class);
Component.components = {};