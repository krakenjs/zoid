var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

import { send, bridge, serializeMessage } from 'post-robot/src';
import { isSameDomain, isWindowClosed, isTop, isSameTopWindow, matchDomain, getDistanceFromTop, onCloseWindow, getDomain } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { addEventListener, uniqueID, elementReady as _elementReady, writeElementToWindow, noop, showAndAnimate, animateAndHide, showElement, hideElement, addClass, extend, extendUrl, setOverflow, elementStoppedMoving, getElement, memoized, appendChild, once, awaitFrameLoad, stringify, stringifyError } from 'belter/src';
import { node, dom, ElementNode } from 'jsx-pragmatic/src';

import { BaseComponent } from '../base';
import { buildChildWindowName as _buildChildWindowName, getParentDomain, getParentComponentWindow } from '../window';
import { POST_MESSAGE, CONTEXT_TYPES, CLASS_NAMES, ANIMATION_NAMES, CLOSE_REASONS, DELEGATE, INITIAL_PROPS, WINDOW_REFERENCES, EVENTS, DEFAULT_DIMENSIONS } from '../../constants';
import { RenderError } from '../../error';

import { global } from '../../lib';


import { RENDER_DRIVERS } from './drivers';
import { propsToQuery, normalizeProps } from './props';

global.props = global.props || {};
global.windows = global.windows || {};

/*  Parent Component
    ----------------

    This manages the state of the component on the parent window side - i.e. the window the component is being rendered into.

    It handles opening the necessary windows/iframes, launching the component's url, and listening for messages back from the component.
*/

export var ParentComponent = (_class = function (_BaseComponent) {
    _inherits(ParentComponent, _BaseComponent);

    // eslint-disable-line no-undef

    function ParentComponent(component, context, _ref) {
        var props = _ref.props;

        _classCallCheck(this, ParentComponent);

        var _this = _possibleConstructorReturn(this, _BaseComponent.call(this));

        _this.component = component;

        _this.validateParentDomain();

        _this.context = context;

        try {
            _this.setProps(props);
        } catch (err) {
            if (props.onError) {
                props.onError(err);
            }
            throw err;
        }

        _this.registerActiveComponent();

        // Options passed during renderTo. We would not ordinarily expect a user to pass these, since we depend on
        // them only when we're trying to render from a sibling to a sibling

        _this.component.log('construct_parent');

        _this.watchForUnload();

        _this.onInit = new ZalgoPromise();

        _this.onInit['catch'](function (err) {
            return _this.error(err);
        });
        return _this;
    }

    ParentComponent.prototype.render = function render(element) {
        var _this2 = this;

        var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;

        return this.tryInit(function () {

            _this2.component.log('render_' + _this2.context, { context: _this2.context, element: element });

            var tasks = {};

            tasks.onRender = _this2.props.onRender();

            tasks.getDomain = _this2.getDomain();

            tasks.elementReady = ZalgoPromise['try'](function () {
                if (element) {
                    return _this2.elementReady(element);
                }
            });

            tasks.openContainer = tasks.elementReady.then(function () {
                return _this2.openContainer(element);
            });

            tasks.showContainer = tasks.openContainer.then(function () {
                return _this2.showContainer();
            });

            tasks.openPrerender = tasks.openContainer.then(function () {
                return _this2.openPrerender();
            });

            tasks.switchPrerender = ZalgoPromise.all([tasks.openPrerender, _this2.onInit]).then(function () {
                return _this2.switchPrerender();
            });

            tasks.open = _this2.driver.openOnClick ? _this2.open() : tasks.openContainer.then(function () {
                return _this2.open();
            });

            tasks.setWindowName = ZalgoPromise.all([tasks.getDomain, tasks.open]).then(function (_ref2) {
                var domain = _ref2[0];

                return _this2.setWindowName(_this2.buildChildWindowName({ win: _this2.window, domain: domain, renderTo: target }));
            });

            tasks.listen = ZalgoPromise.all([tasks.getDomain, tasks.open, tasks.setWindowName]).then(function (_ref3) {
                var domain = _ref3[0];

                _this2.listen(_this2.window, domain);
            });

            tasks.watchForClose = ZalgoPromise.all([tasks.open, tasks.setWindowName]).then(function () {
                return _this2.watchForClose();
            });

            tasks.linkDomain = ZalgoPromise.all([tasks.getDomain, tasks.open, tasks.setWindowName]).then(function (_ref4) {
                var domain = _ref4[0];

                if (bridge && typeof domain === 'string') {
                    return bridge.linkUrl(_this2.window, domain);
                }
            });

            tasks.createPrerenderTemplate = tasks.openPrerender.then(function () {
                return _this2.createPrerenderTemplate();
            });

            tasks.showComponent = tasks.createPrerenderTemplate.then(function () {
                return _this2.showComponent();
            });

            tasks.openBridge = ZalgoPromise.all([tasks.getDomain, tasks.open, tasks.setWindowName]).then(function (_ref5) {
                var domain = _ref5[0];

                return _this2.openBridge(typeof domain === 'string' ? domain : null);
            });

            tasks.buildUrl = _this2.buildUrl();

            tasks.loadUrl = ZalgoPromise.all([tasks.buildUrl, tasks.open, tasks.setWindowName, tasks.linkDomain, tasks.listen, tasks.open, tasks.openBridge, tasks.createPrerenderTemplate]).then(function (_ref6) {
                var url = _ref6[0];

                return _this2.loadUrl(url);
            });

            tasks.runTimeout = tasks.loadUrl.then(function () {
                return _this2.runTimeout();
            });

            return ZalgoPromise.hash(tasks);
        }).then(function () {
            return _this2.props.onEnter();
        }).then(function () {
            return _this2;
        });
    };

    ParentComponent.prototype.getOutlet = function getOutlet() {
        var outlet = document.createElement('div');
        addClass(outlet, CLASS_NAMES.OUTLET);
        return outlet;
    };

    ParentComponent.prototype.validateParentDomain = function validateParentDomain() {
        var domain = getDomain();
        if (!matchDomain(this.component.allowedParentDomains, domain)) {
            throw new RenderError('Can not be rendered by domain: ' + domain);
        }
    };

    ParentComponent.prototype.renderTo = function renderTo(win, element) {
        var _this3 = this;

        return this.tryInit(function () {

            if (win === window) {
                return _this3.render(element);
            }

            if (!isSameTopWindow(window, win)) {
                throw new Error('Can only renderTo an adjacent frame');
            }

            if (element && typeof element !== 'string') {
                throw new Error('Element passed to renderTo must be a string selector, got ' + (typeof element === 'undefined' ? 'undefined' : _typeof(element)) + ' ' + element);
            }

            _this3.checkAllowRenderTo(win);

            _this3.component.log('render_' + _this3.context + '_to_win', { element: stringify(element), context: _this3.context });

            _this3.delegate(win);

            return _this3.render(element, win);
        });
    };

    ParentComponent.prototype.checkAllowRenderTo = function checkAllowRenderTo(win) {

        if (!win) {
            throw this.component.createError('Must pass window to renderTo');
        }

        if (isSameDomain(win)) {
            return;
        }

        var origin = getDomain();
        var domain = this.component.getDomain(null, this.props.env);

        if (!domain) {
            throw new Error('Could not determine domain to allow remote render');
        }

        if (matchDomain(domain, origin)) {
            return;
        }

        throw new Error('Can not render remotely to ' + domain.toString() + ' - can only render to ' + origin);
    };

    ParentComponent.prototype.registerActiveComponent = function registerActiveComponent() {
        var _this4 = this;

        ParentComponent.activeComponents.push(this);

        this.clean.register(function () {
            ParentComponent.activeComponents.splice(ParentComponent.activeComponents.indexOf(_this4), 1);
        });
    };

    ParentComponent.prototype.getComponentParentRef = function getComponentParentRef() {
        var renderToWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;


        if (this.context === CONTEXT_TYPES.POPUP) {
            return { ref: WINDOW_REFERENCES.OPENER };
        }

        if (renderToWindow === window) {

            if (isTop(window)) {
                return { ref: WINDOW_REFERENCES.TOP };
            }

            return { ref: WINDOW_REFERENCES.PARENT, distance: getDistanceFromTop(window) };
        }

        var uid = uniqueID();
        global.windows[uid] = window;

        this.clean.register(function () {
            delete global.windows[uid];
        });

        return { ref: WINDOW_REFERENCES.GLOBAL, uid: uid };
    };

    ParentComponent.prototype.getRenderParentRef = function getRenderParentRef() {
        var renderToWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;


        if (renderToWindow === window) {
            return this.getComponentParentRef(renderToWindow);
        }

        var uid = uniqueID();
        global.windows[uid] = renderToWindow;

        this.clean.register(function () {
            delete global.windows[uid];
        });

        return { ref: WINDOW_REFERENCES.GLOBAL, uid: uid };
    };

    ParentComponent.prototype.buildChildWindowName = function buildChildWindowName() {
        var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            win = _ref7.win,
            domain = _ref7.domain,
            _ref7$renderTo = _ref7.renderTo,
            renderTo = _ref7$renderTo === undefined ? window : _ref7$renderTo;

        var uid = uniqueID();
        var tag = this.component.tag;
        var sProps = serializeMessage(win, domain, this.getPropsForChild());

        var componentParent = this.getComponentParentRef(renderTo);
        var renderParent = this.getRenderParentRef(renderTo);

        var props = isSameDomain(renderTo) ? { type: INITIAL_PROPS.RAW, value: sProps } : { type: INITIAL_PROPS.UID, uid: uid };

        if (props.type === INITIAL_PROPS.UID) {
            global.props[uid] = sProps;

            this.clean.register(function () {
                delete global.props[uid];
            });
        }

        return _buildChildWindowName(this.component.name, { uid: uid, tag: tag, componentParent: componentParent, renderParent: renderParent, props: props });
    };

    /*  Send to Parent
        --------------
         Send a post message to our parent window.
    */

    ParentComponent.prototype.sendToParent = function sendToParent(name, data) {
        var parentWindow = getParentComponentWindow();

        if (!parentWindow) {
            throw new Error('Can not find parent component window to message');
        }

        this.component.log('send_to_parent_' + name);

        return send(getParentComponentWindow(), name, data, { domain: getParentDomain() });
    };

    /*  Set Props
        ---------
         Normalize props and generate the url we'll use to render the component
    */

    ParentComponent.prototype.setProps = function setProps(props) {
        var isUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;


        if (this.component.validate) {
            this.component.validate(this.component, props);
        }

        // $FlowFixMe
        this.props = this.props || {};

        extend(this.props, normalizeProps(this.component, this, props, isUpdate));
    };

    /*  Build Url
        ---------
         We build the props we're passed into the initial url. This means the component server-side can start rendering
        itself based on whatever props the merchant provides.
    */

    ParentComponent.prototype.buildUrl = function buildUrl() {
        var _this5 = this;

        return propsToQuery(_extends({}, this.component.props, this.component.builtinProps), this.props).then(function (query) {
            var url = _this5.component.getUrl(_this5.props.env, _this5.props);
            return extendUrl(url, { query: _extends({}, query) });
        });
    };

    ParentComponent.prototype.getDomain = function getDomain() {
        var _this6 = this;

        return ZalgoPromise['try'](function () {

            var domain = _this6.component.getDomain(null, _this6.props.env);

            if (domain) {
                return domain;
            }

            if (_this6.component.buildUrl) {
                return ZalgoPromise['try'](function () {
                    return _this6.component.buildUrl(_this6.props);
                }).then(function (builtUrl) {
                    return _this6.component.getDomain(builtUrl, _this6.props.env);
                });
            }
        }).then(function (domain) {

            if (!domain) {
                throw new Error('Could not determine domain');
            }

            return domain;
        });
    };

    ParentComponent.prototype.getPropsForChild = function getPropsForChild() {

        var result = {};

        for (var _i2 = 0, _Object$keys2 = Object.keys(this.props), _length2 = _Object$keys2 == null ? 0 : _Object$keys2.length; _i2 < _length2; _i2++) {
            var key = _Object$keys2[_i2];
            var prop = this.component.getProp(key);

            if (!prop || prop.sendToChild !== false) {
                // $FlowFixMe
                result[key] = this.props[key];
            }
        }

        // $FlowFixMe


        return result;
    };

    /*  Update Props
        ------------
         Send new props down to the child
    */

    ParentComponent.prototype.updateProps = function updateProps(props) {
        var _this7 = this;

        this.setProps(props, true);

        return this.onInit.then(function () {
            if (_this7.childExports) {
                return _this7.childExports.updateProps(_this7.getPropsForChild());
            } else {
                throw new Error('Child exports were not available');
            }
        });
    };

    ParentComponent.prototype.openBridge = function openBridge(domain) {
        var _this8 = this;

        return ZalgoPromise['try'](function () {
            if (!bridge || !_this8.driver.needsBridge) {
                return;
            }

            var needsBridgeParams = { win: _this8.window };
            if (domain) {
                needsBridgeParams.domain = domain;
            }

            var needsBridge = bridge.needsBridge(needsBridgeParams);

            var bridgeUrl = _this8.component.getBridgeUrl(_this8.props.env);

            if (!bridgeUrl) {

                if (needsBridge && domain && !bridge.hasBridge(domain, domain)) {
                    throw new Error('Bridge url needed to render ' + _this8.context);
                }

                return;
            }

            var bridgeDomain = _this8.component.getBridgeDomain(_this8.props.env);

            if (!bridgeDomain) {
                throw new Error('Can not determine domain for bridge');
            }

            if (needsBridge) {
                return bridge.openBridge(bridgeUrl, bridgeDomain).then(function (result) {
                    if (result) {
                        return result;
                    }
                });
            }
        });
    };

    /*  Open
        ----
         Open a new window in the desired context
    */

    ParentComponent.prototype.open = function open() {
        var _this9 = this;

        return ZalgoPromise['try'](function () {
            _this9.component.log('open_' + _this9.context);
            return _this9.driver.open.call(_this9);
        });
    };

    ParentComponent.prototype.setWindowName = function setWindowName(name) {
        var _this10 = this;

        return ZalgoPromise['try'](function () {
            return _this10.driver.setWindowName.call(_this10, name);
        });
    };

    ParentComponent.prototype.openPrerender = function openPrerender() {
        var _this11 = this;

        return ZalgoPromise['try'](function () {
            if (_this11.component.prerenderTemplate) {
                return _this11.driver.openPrerender.call(_this11);
            }
        });
    };

    ParentComponent.prototype.switchPrerender = function switchPrerender() {
        var _this12 = this;

        return ZalgoPromise['try'](function () {
            if (_this12.prerenderWindow && _this12.driver.switchPrerender) {
                return _this12.driver.switchPrerender.call(_this12);
            }
        });
    };

    ParentComponent.prototype.elementReady = function elementReady(element) {
        return _elementReady(element).then(noop);
    };

    ParentComponent.prototype.delegate = function delegate(win) {
        var _this13 = this;

        this.component.log('delegate_' + this.context);

        var props = {
            uid: this.props.uid,
            dimensions: this.props.dimensions,
            onClose: this.props.onClose,
            onDisplay: this.props.onDisplay
        };

        for (var _i4 = 0, _component$getPropNam2 = this.component.getPropNames(), _length4 = _component$getPropNam2 == null ? 0 : _component$getPropNam2.length; _i4 < _length4; _i4++) {
            var propName = _component$getPropNam2[_i4];
            var prop = this.component.getProp(propName);

            if (prop.allowDelegate) {
                props[propName] = this.props[propName];
            }
        }

        var delegate = send(win, POST_MESSAGE.DELEGATE + '_' + this.component.name, {

            context: this.context,
            env: this.props.env,

            options: {
                context: this.context,
                props: props,

                overrides: {
                    focus: function focus() {
                        return _this13.focus();
                    },
                    userClose: function userClose() {
                        return _this13.userClose();
                    },
                    getDomain: function getDomain() {
                        return _this13.getDomain();
                    },

                    error: function error(err) {
                        return _this13.error(err);
                    },
                    on: function on(eventName, handler) {
                        return _this13.on(eventName, handler);
                    }
                }
            }

        }).then(function (_ref8) {
            var data = _ref8.data;


            _this13.clean.register(data.destroy);
            return data;
        })['catch'](function (err) {

            throw new Error('Unable to delegate rendering. Possibly the component is not loaded in the target window.\n\n' + stringifyError(err));
        });

        var overrides = this.driver.delegateOverrides;

        var _loop = function _loop(_i6, _Object$keys4, _length6) {
            var key = _Object$keys4[_i6];
            var val = overrides[key];

            if (val === DELEGATE.CALL_ORIGINAL) {
                return 'continue';
            }

            // $FlowFixMe
            var original = _this13[key];

            // $FlowFixMe
            _this13[key] = function overridenFunction() {
                var _this14 = this,
                    _arguments = arguments;

                return delegate.then(function (data) {

                    var override = data.overrides[key];

                    if (val === DELEGATE.CALL_DELEGATE) {
                        return override.apply(_this14, _arguments);
                    }

                    if (typeof val === 'function') {
                        return val(original, override).apply(_this14, _arguments);
                    }

                    throw new Error('Expected delegate to be CALL_ORIGINAL, CALL_DELEGATE, or factory method');
                });
            };
        };

        for (var _i6 = 0, _Object$keys4 = Object.keys(overrides), _length6 = _Object$keys4 == null ? 0 : _Object$keys4.length; _i6 < _length6; _i6++) {
            var _ret = _loop(_i6, _Object$keys4, _length6);

            if (_ret === 'continue') continue;
        }
    };

    /*  Watch For Close
        ---------------
         Watch for the child window closing, so we can cleanup.
        Also watch for this window changing location, so we can close the component.
    */

    ParentComponent.prototype.watchForClose = function watchForClose() {
        var _this15 = this;

        var closeWindowListener = onCloseWindow(this.window, function () {
            _this15.component.log('detect_close_child');

            return ZalgoPromise['try'](function () {
                return _this15.props.onClose(CLOSE_REASONS.CLOSE_DETECTED);
            })['finally'](function () {
                return _this15.destroy();
            });
        }, 3000);

        this.clean.register('destroyCloseWindowListener', closeWindowListener.cancel);
    };

    ParentComponent.prototype.watchForUnload = function watchForUnload() {
        var _this16 = this;

        // Our child has no way of knowing if we navigated off the page. So we have to listen for unload
        // and close the child manually if that happens.

        var onunload = once(function () {
            _this16.component.log('navigate_away');
            _this16.destroyComponent();
        });

        var unloadWindowListener = addEventListener(window, 'unload', onunload);

        this.clean.register('destroyUnloadWindowListener', unloadWindowListener.cancel);
    };

    /*  Load Url
        --------
         Load url into the child window. This is separated out because it's quite common for us to have situations
        where opening the child window and loading the url happen at different points.
    */

    ParentComponent.prototype.loadUrl = function loadUrl(url) {
        var _this17 = this;

        return ZalgoPromise['try'](function () {
            _this17.component.log('load_url');

            if (window.location.href.split('#')[0] === url.split('#')[0]) {
                var _query;

                url = extendUrl(url, {
                    query: (_query = {}, _query[uniqueID()] = '1', _query)
                });
            }

            return _this17.driver.loadUrl.call(_this17, url);
        });
    };

    /*  Run Timeout
        -----------
         Set a timeout on the initial render, and call this.props.onTimeout if we don't get an init call in time.
    */

    ParentComponent.prototype.runTimeout = function runTimeout() {
        var _this18 = this;

        var timeout = this.props.timeout;

        if (timeout) {
            var _id = this.timeout = setTimeout(function () {

                _this18.component.log('timed_out', { timeout: timeout.toString() });

                var error = _this18.component.createError('Loading component timed out after ' + timeout + ' milliseconds');

                _this18.onInit.reject(error);
                _this18.props.onTimeout(error);
            }, timeout);

            this.clean.register(function () {
                clearTimeout(_id);
                delete _this18.timeout;
            });
        }
    };

    /*  Listeners
        ---------
         Post-robot listeners to the child component window
    */

    ParentComponent.prototype.listeners = function listeners() {
        var _ref9;

        return _ref9 = {}, _ref9[POST_MESSAGE.INIT] = function (source, data) {

            this.childExports = data.exports;

            this.onInit.resolve(this);

            if (this.timeout) {
                clearTimeout(this.timeout);
            }

            return {
                props: this.getPropsForChild(),
                context: this.context
            };
        }, _ref9[POST_MESSAGE.CLOSE] = function (source, data) {
            this.close(data.reason);
        }, _ref9[POST_MESSAGE.CHECK_CLOSE] = function () {
            this.checkClose();
        }, _ref9[POST_MESSAGE.RESIZE] = function (source, data) {
            var _this19 = this;

            return ZalgoPromise['try'](function () {
                if (_this19.driver.allowResize) {
                    return _this19.resize(data.width, data.height);
                }
            });
        }, _ref9[POST_MESSAGE.ONRESIZE] = function () {
            this.event.trigger('resize');
        }, _ref9[POST_MESSAGE.HIDE] = function () {
            this.hide();
        }, _ref9[POST_MESSAGE.SHOW] = function () {
            this.show();
        }, _ref9[POST_MESSAGE.ERROR] = function (source, data) {
            this.error(new Error(data.error));
        }, _ref9;
    };

    /*  Resize
        ------
         Resize the child component window
    */

    ParentComponent.prototype.resize = function resize(width, height) {
        var _this20 = this;

        var _ref10 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
            _ref10$waitForTransit = _ref10.waitForTransition,
            waitForTransition = _ref10$waitForTransit === undefined ? true : _ref10$waitForTransit;

        return ZalgoPromise['try'](function () {
            _this20.component.log('resize', { height: stringify(height), width: stringify(width) });
            _this20.driver.resize.call(_this20, width, height);

            if (!waitForTransition) {
                return;
            }

            if (_this20.element || _this20.iframe) {

                var overflow = void 0;

                if (_this20.element) {
                    overflow = setOverflow(_this20.element, 'hidden');
                }

                return elementStoppedMoving(_this20.element || _this20.iframe).then(function () {

                    if (overflow) {
                        overflow.reset();
                    }
                });
            }
        });
    };

    /*  Hide
        ----
         Hide the component and any parent template
    */

    ParentComponent.prototype.hide = function hide() {

        if (this.container) {
            hideElement(this.container);
        }

        return this.driver.hide.call(this);
    };

    ParentComponent.prototype.show = function show() {

        if (this.container) {
            showElement(this.container);
        }

        return this.driver.show.call(this);
    };

    ParentComponent.prototype.checkClose = function checkClose() {
        var _this21 = this;

        var closeWindowListener = onCloseWindow(this.window, function () {
            _this21.userClose();
        }, 50, 500);

        this.clean.register(closeWindowListener.cancel);
    };

    ParentComponent.prototype.userClose = function userClose() {
        return this.close(CLOSE_REASONS.USER_CLOSED);
    };

    /*  Close
        -----
         Close the child component
    */

    ParentComponent.prototype.close = function close() {
        var _this22 = this;

        var reason = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : CLOSE_REASONS.PARENT_CALL;

        return ZalgoPromise['try'](function () {

            _this22.component.log('close', { reason: reason });

            _this22.event.triggerOnce(EVENTS.CLOSE);
            return _this22.props.onClose(reason);
        }).then(function () {

            return ZalgoPromise.all([_this22.closeComponent(), _this22.closeContainer()]);
        }).then(function () {

            return _this22.destroy();
        });
    };

    ParentComponent.prototype.closeContainer = function closeContainer() {
        var _this23 = this;

        var reason = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : CLOSE_REASONS.PARENT_CALL;

        return ZalgoPromise['try'](function () {

            _this23.event.triggerOnce(EVENTS.CLOSE);
            return _this23.props.onClose(reason);
        }).then(function () {

            return ZalgoPromise.all([_this23.closeComponent(reason), _this23.hideContainer()]);
        }).then(function () {

            return _this23.destroyContainer();
        });
    };

    ParentComponent.prototype.destroyContainer = function destroyContainer() {
        var _this24 = this;

        return ZalgoPromise['try'](function () {
            _this24.clean.run('destroyContainerEvents');
            _this24.clean.run('destroyContainerTemplate');
        });
    };

    ParentComponent.prototype.closeComponent = function closeComponent() {
        var _this25 = this;

        var reason = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : CLOSE_REASONS.PARENT_CALL;


        var win = this.window;

        return ZalgoPromise['try'](function () {

            return _this25.cancelContainerEvents();
        }).then(function () {

            _this25.event.triggerOnce(EVENTS.CLOSE);
            return _this25.props.onClose(reason);
        }).then(function () {

            return _this25.hideComponent();
        }).then(function () {

            return _this25.destroyComponent();
        }).then(function () {

            // IE in metro mode -- child window needs to close itself, or close will hang

            if (_this25.childExports && _this25.context === CONTEXT_TYPES.POPUP && !isWindowClosed(win)) {
                _this25.childExports.close()['catch'](noop);
            }
        });
    };

    ParentComponent.prototype.destroyComponent = function destroyComponent() {
        this.clean.run('destroyUnloadWindowListener');
        this.clean.run('destroyCloseWindowListener');
        this.clean.run('destroyContainerEvents');
        this.clean.run('destroyWindow');
    };

    ParentComponent.prototype.showContainer = function showContainer() {
        var _this26 = this;

        return ZalgoPromise['try'](function () {
            if (_this26.props.onDisplay) {
                return _this26.props.onDisplay();
            }
        }).then(function () {
            if (_this26.container) {
                return showAndAnimate(_this26.container, ANIMATION_NAMES.SHOW_CONTAINER, _this26.clean.register);
            }
        });
    };

    ParentComponent.prototype.showComponent = function showComponent() {
        var _this27 = this;

        return ZalgoPromise['try'](function () {
            if (_this27.props.onDisplay) {
                return _this27.props.onDisplay();
            }
        }).then(function () {
            if (_this27.element) {
                return showAndAnimate(_this27.element, ANIMATION_NAMES.SHOW_COMPONENT, _this27.clean.register);
            }
        });
    };

    ParentComponent.prototype.hideContainer = function hideContainer() {
        var _this28 = this;

        return ZalgoPromise['try'](function () {
            if (_this28.container) {
                return animateAndHide(_this28.container, ANIMATION_NAMES.HIDE_CONTAINER, _this28.clean.register);
            } else {
                return ZalgoPromise.resolve();
            }
        });
    };

    ParentComponent.prototype.hideComponent = function hideComponent() {
        var _this29 = this;

        return ZalgoPromise['try'](function () {
            if (_this29.element) {
                return animateAndHide(_this29.element, ANIMATION_NAMES.HIDE_COMPONENT, _this29.clean.register);
            } else {
                return ZalgoPromise.resolve();
            }
        });
    };

    /*  Focus
        -----
         Focus the child component window
    */

    ParentComponent.prototype.focus = function focus() {

        if (this.window && !isWindowClosed(this.window)) {
            this.component.log('focus');
            this.window.focus();
        } else {

            throw new Error('No window to focus');
        }
    };

    /*  Create Component Template
        -------------------------
         Creates an initial template and stylesheet which are loaded into the child window, to be displayed before the url is loaded
    */

    ParentComponent.prototype.createPrerenderTemplate = function createPrerenderTemplate() {
        var _this30 = this;

        return ZalgoPromise['try'](function () {
            if (!_this30.component.prerenderTemplate) {
                return ZalgoPromise.resolve();
            }

            return ZalgoPromise['try'](function () {

                if (_this30.prerenderIframe) {
                    return awaitFrameLoad(_this30.prerenderIframe).then(function () {
                        return _this30.prerenderWindow;
                    });
                } else {
                    return _this30.prerenderWindow;
                }
            }).then(function (win) {

                var doc = void 0;

                try {
                    doc = win.document;
                } catch (err) {
                    return;
                }

                var el = _this30.renderTemplate(_this30.component.prerenderTemplate, {
                    document: doc
                });

                if (el instanceof ElementNode) {
                    el = el.render(dom({ doc: doc }));
                }

                try {
                    writeElementToWindow(win, el);
                } catch (err) {
                    // pass
                }
            });
        });
    };

    /*  Create Parent Template
        ----------------------
         Create a template and stylesheet for the parent template behind the element
    */

    ParentComponent.prototype.renderTemplate = function renderTemplate(renderer) {
        var _this31 = this;

        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var _ref11 = this.component.dimensions || {},
            _ref11$width = _ref11.width,
            width = _ref11$width === undefined ? DEFAULT_DIMENSIONS.WIDTH + 'px' : _ref11$width,
            _ref11$height = _ref11.height,
            height = _ref11$height === undefined ? DEFAULT_DIMENSIONS.HEIGHT + 'px' : _ref11$height;

        return renderer.call(this, _extends({
            id: CLASS_NAMES.ZOID + '-' + this.component.tag + '-' + this.props.uid,
            props: renderer.__xdomain__ ? null : this.props,
            tag: this.component.tag,
            context: this.context,
            outlet: this.getOutlet(),
            CLASS: CLASS_NAMES,
            ANIMATION: ANIMATION_NAMES,
            CONTEXT: CONTEXT_TYPES,
            EVENT: EVENTS,
            actions: {
                close: function close() {
                    return _this31.userClose();
                },
                focus: function focus() {
                    return _this31.focus();
                }
            },
            on: function on(eventName, handler) {
                return _this31.on(eventName, handler);
            },
            jsxDom: node,
            document: document,
            dimensions: { width: width, height: height }
        }, options));
    };

    ParentComponent.prototype.openContainer = function openContainer(element) {
        var _this32 = this;

        return ZalgoPromise['try'](function () {
            var el = void 0;

            if (element) {
                el = getElement(element);
            } else {
                el = document.body;
            }

            if (!el) {
                throw new Error('Could not find element to open container into');
            }

            if (!_this32.component.containerTemplate) {
                if (_this32.driver.renderedIntoContainerTemplate) {
                    throw new Error('containerTemplate needed to render ' + _this32.context);
                }

                return;
            }

            var container = _this32.renderTemplate(_this32.component.containerTemplate, {
                container: el
            });

            if (container instanceof ElementNode) {
                container = container.render(dom({ doc: document }));
            }

            _this32.container = container;
            hideElement(_this32.container);
            appendChild(el, _this32.container);

            if (_this32.driver.renderedIntoContainerTemplate) {
                _this32.element = _this32.getOutlet();
                hideElement(_this32.element);

                if (!_this32.element) {
                    throw new Error('Could not find element to render component into');
                }

                hideElement(_this32.element);
            }

            _this32.clean.register('destroyContainerTemplate', function () {

                if (_this32.container && _this32.container.parentNode) {
                    _this32.container.parentNode.removeChild(_this32.container);
                }

                delete _this32.container;
            });
        });
    };

    ParentComponent.prototype.cancelContainerEvents = function cancelContainerEvents() {
        this.clean.run('destroyContainerEvents');
    };

    /*  Destroy
        -------
         Close the component and clean up any listeners and state
    */

    ParentComponent.prototype.destroy = function destroy() {
        var _this33 = this;

        return ZalgoPromise['try'](function () {
            if (_this33.clean.hasTasks()) {
                _this33.component.log('destroy');
                return _this33.clean.all();
            }
        });
    };

    ParentComponent.prototype.tryInit = function tryInit(method) {
        var _this34 = this;

        return ZalgoPromise['try'](method)['catch'](function (err) {
            _this34.onInit.reject(err);
        }).then(function () {
            return _this34.onInit;
        });
    };

    /*  Error
        -----
         Handle an error
    */

    ParentComponent.prototype.error = function error(err) {
        var _this35 = this;

        // eslint-disable-next-line promise/no-promise-in-callback
        return ZalgoPromise['try'](function () {

            _this35.handledErrors = _this35.handledErrors || [];

            if (_this35.handledErrors.indexOf(err) !== -1) {
                // $FlowFixMe
                return;
            }

            _this35.handledErrors.push(err);

            _this35.onInit.reject(err);

            return _this35.destroy();
        }).then(function () {

            if (_this35.props.onError) {
                return _this35.props.onError(err);
            }
        })['catch'](function (errErr) {
            // eslint-disable-line unicorn/catch-error-name

            throw new Error('An error was encountered while handling error:\n\n ' + stringifyError(err) + '\n\n' + stringifyError(errErr));
        }).then(function () {

            if (!_this35.props.onError) {
                throw err;
            }
        });
    };

    ParentComponent.destroyAll = function destroyAll() {
        var results = [];

        while (ParentComponent.activeComponents.length) {
            results.push(ParentComponent.activeComponents[0].destroy());
        }

        return ZalgoPromise.all(results).then(noop);
    };

    _createClass(ParentComponent, [{
        key: 'driver',
        get: function get() {

            if (!this.context) {
                throw new Error('Context not set');
            }

            return RENDER_DRIVERS[this.context];
        }
    }]);

    return ParentComponent;
}(BaseComponent), (_applyDecoratedDescriptor(_class.prototype, 'getOutlet', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'getOutlet'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'buildUrl', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'buildUrl'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'open', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'open'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'setWindowName', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'setWindowName'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'openPrerender', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'openPrerender'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'switchPrerender', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'switchPrerender'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'close', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'close'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'closeContainer', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'closeContainer'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'destroyContainer', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'destroyContainer'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'closeComponent', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'closeComponent'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'showContainer', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'showContainer'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'showComponent', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'showComponent'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'hideContainer', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'hideContainer'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'hideComponent', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'hideComponent'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'createPrerenderTemplate', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'createPrerenderTemplate'), _class.prototype)), _class);
ParentComponent.activeComponents = [];