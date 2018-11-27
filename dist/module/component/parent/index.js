var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

import { send, bridge, serializeMessage, ProxyWindow } from 'post-robot/src';
import { isSameDomain, isTop, isSameTopWindow, matchDomain, getDistanceFromTop, onCloseWindow, getDomain } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { addEventListener, uniqueID, elementReady as _elementReady, writeElementToWindow, noop, showAndAnimate, animateAndHide, showElement, hideElement, addClass, extend, extendUrl, setOverflow, elementStoppedMoving, getElement, memoized, appendChild, once, stringify, stringifyError, eventEmitter } from 'belter/src';
import { node, dom, ElementNode } from 'jsx-pragmatic/src';

import { buildChildWindowName as _buildChildWindowName } from '../window';
import { POST_MESSAGE, CONTEXT_TYPES, CLASS_NAMES, ANIMATION_NAMES, CLOSE_REASONS, DELEGATE, INITIAL_PROPS, WINDOW_REFERENCES, EVENTS, DEFAULT_DIMENSIONS } from '../../constants';

import { global, cleanup } from '../../lib';


import { RENDER_DRIVERS } from './drivers';
import { propsToQuery, normalizeProps } from './props';

global.props = global.props || {};
global.windows = global.windows || {};

/*  Parent Component
    ----------------

    This manages the state of the component on the parent window side - i.e. the window the component is being rendered into.

    It handles opening the necessary windows/iframes, launching the component's url, and listening for messages back from the component.
*/

export var ParentComponent = (_class = function () {
    // eslint-disable-line no-undef

    function ParentComponent(component, context, _ref) {
        var _this = this;

        var props = _ref.props;

        _classCallCheck(this, ParentComponent);

        ZalgoPromise['try'](function () {
            _this.onInit = new ZalgoPromise();
            _this.clean = cleanup(_this);
            _this.event = eventEmitter();

            _this.component = component;
            _this.context = context;
            _this.driver = RENDER_DRIVERS[_this.context];

            _this.setProps(props);
            _this.registerActiveComponent();
            _this.watchForUnload();

            return _this.onInit;
        })['catch'](function (err) {
            return _this.error(err, props);
        });
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

            var focus = function focus() {
                return tasks.awaitWindow.then(function (win) {
                    return win.focus();
                });
            };

            tasks.openContainer = tasks.elementReady.then(function () {
                return _this2.openContainer(element, { focus: focus });
            });

            tasks.open = _this2.driver.renderedIntoContainer ? tasks.openContainer.then(function () {
                return _this2.open();
            }) : _this2.open();

            tasks.awaitWindow = tasks.open.then(function (proxyWin) {
                return proxyWin.awaitWindow();
            });

            tasks.showContainer = tasks.openContainer.then(function () {
                return _this2.showContainer();
            });

            tasks.setWindowName = ZalgoPromise.all([tasks.open, tasks.getDomain]).then(function (_ref2) {
                var proxyWin = _ref2[0],
                    domain = _ref2[1];

                return _this2.setWindowName(proxyWin, _this2.buildChildWindowName({ proxyWin: proxyWin, domain: domain, target: target }));
            });

            tasks.watchForClose = ZalgoPromise.all([tasks.awaitWindow, tasks.setWindowName]).then(function (_ref3) {
                var win = _ref3[0];

                return _this2.watchForClose(win);
            });

            tasks.prerender = ZalgoPromise.all([tasks.open, tasks.openContainer]).then(function (_ref4) {
                var proxyWin = _ref4[0];

                return _this2.prerender(proxyWin);
            });

            tasks.showComponent = tasks.prerender.then(function () {
                return _this2.showComponent();
            });

            tasks.openBridge = ZalgoPromise.all([tasks.awaitWindow, tasks.getDomain, tasks.setWindowName]).then(function (_ref5) {
                var win = _ref5[0],
                    domain = _ref5[1];

                return _this2.openBridge(win, domain);
            });

            tasks.buildUrl = _this2.buildUrl();

            tasks.loadUrl = ZalgoPromise.all([tasks.open, tasks.buildUrl, tasks.setWindowName]).then(function (_ref6) {
                var proxyWin = _ref6[0],
                    url = _ref6[1];

                return _this2.loadUrl(proxyWin, url);
            });

            tasks.switchPrerender = ZalgoPromise.all([tasks.prerender, _this2.onInit]).then(function () {
                return _this2.switchPrerender();
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

    ParentComponent.prototype.renderTo = function renderTo(target, element) {
        var _this3 = this;

        return this.tryInit(function () {
            if (target === window) {
                return _this3.render(element);
            }

            if (element && typeof element !== 'string') {
                throw new Error('Element passed to renderTo must be a string selector, got ' + (typeof element === 'undefined' ? 'undefined' : _typeof(element)) + ' ' + element);
            }

            _this3.checkAllowRemoteRender(target);

            _this3.component.log('render_' + _this3.context + '_to_win', { element: stringify(element), context: _this3.context });

            _this3.delegate(target);
            return _this3.render(element, target);
        });
    };

    ParentComponent.prototype.on = function on(eventName, handler) {
        return this.event.on(eventName, handler);
    };

    ParentComponent.prototype.getOutlet = function getOutlet() {
        var outlet = document.createElement('div');
        addClass(outlet, CLASS_NAMES.OUTLET);
        return outlet;
    };

    ParentComponent.prototype.checkAllowRemoteRender = function checkAllowRemoteRender(target) {

        if (!target) {
            throw this.component.createError('Must pass window to renderTo');
        }

        if (!isSameTopWindow(window, target)) {
            throw new Error('Can only renderTo an adjacent frame');
        }

        if (isSameDomain(target)) {
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

    ParentComponent.prototype.buildChildWindowName = function buildChildWindowName() {
        var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            proxyWin = _ref7.proxyWin,
            domain = _ref7.domain,
            _ref7$target = _ref7.target,
            target = _ref7$target === undefined ? window : _ref7$target;

        var uid = uniqueID();
        var tag = this.component.tag;
        var sProps = serializeMessage(proxyWin, domain, this.getPropsForChild());

        var componentParent = this.getComponentParentRef(target);

        var props = isSameDomain(target) ? { type: INITIAL_PROPS.RAW, value: sProps } : { type: INITIAL_PROPS.UID, uid: uid };

        if (props.type === INITIAL_PROPS.UID) {
            global.props[uid] = sProps;

            this.clean.register(function () {
                delete global.props[uid];
            });
        }

        var exports = serializeMessage(proxyWin, domain, this.buildParentExports(proxyWin));
        var id = uniqueID();
        var thisdomain = getDomain(window);
        var context = this.context;

        return _buildChildWindowName(this.component.name, { id: id, context: context, domain: thisdomain, uid: uid, tag: tag, componentParent: componentParent, props: props, exports: exports });
    };

    ParentComponent.prototype.setProps = function setProps(props) {
        var isUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;


        if (this.component.validate) {
            this.component.validate(this.component, props);
        }

        // $FlowFixMe
        this.props = this.props || {};

        extend(this.props, normalizeProps(this.component, this, props, isUpdate));
    };

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

    ParentComponent.prototype.openBridge = function openBridge(win, domain) {
        var _this8 = this;

        return ZalgoPromise['try'](function () {
            if (!bridge || !bridge.needsBridge({ win: win, domain: domain }) || bridge.hasBridge(domain, domain)) {
                return;
            }

            var bridgeUrl = _this8.component.getBridgeUrl(_this8.props.env);
            var bridgeDomain = _this8.component.getBridgeDomain(_this8.props.env);

            if (!bridgeUrl || !bridgeDomain) {
                throw new Error('Bridge url and domain needed to render ' + _this8.context);
            }

            bridge.linkUrl(win, domain);
            return bridge.openBridge(bridgeUrl, bridgeDomain);
        });
    };

    ParentComponent.prototype.open = function open() {
        var _this9 = this;

        return ZalgoPromise['try'](function () {
            _this9.component.log('open_' + _this9.context);
            return _this9.driver.open.call(_this9);
        });
    };

    ParentComponent.prototype.setWindowName = function setWindowName(proxyWin, name) {
        return proxyWin.setName(name);
    };

    ParentComponent.prototype.switchPrerender = function switchPrerender() {
        var _this10 = this;

        return ZalgoPromise['try'](function () {
            if (_this10.component.prerenderTemplate && _this10.driver.switchPrerender) {
                return _this10.driver.switchPrerender.call(_this10);
            }
        });
    };

    ParentComponent.prototype.elementReady = function elementReady(element) {
        return _elementReady(element).then(noop);
    };

    ParentComponent.prototype.delegate = function delegate(target) {
        var _this11 = this;

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

        var delegate = send(target, POST_MESSAGE.DELEGATE + '_' + this.component.name, {

            context: this.context,
            env: this.props.env,

            options: {
                context: this.context,
                props: props,

                overrides: {
                    userClose: function userClose() {
                        return _this11.userClose();
                    },
                    getDomain: function getDomain() {
                        return _this11.getDomain();
                    },

                    error: function error(err) {
                        return _this11.error(err);
                    },
                    on: function on(eventName, handler) {
                        return _this11.on(eventName, handler);
                    }
                }
            }

        }).then(function (_ref8) {
            var data = _ref8.data;

            _this11.clean.register(data.destroy);
            return data;
        })['catch'](function (err) {
            throw new Error('Unable to delegate rendering. Possibly the component is not loaded in the target window.\n\n' + stringifyError(err));
        });

        var overrides = this.driver.delegateOverrides;

        var _loop = function _loop(_i6, _Object$keys4, _length6) {
            var key = _Object$keys4[_i6];
            var val = overrides[key];

            if (val === DELEGATE.CALL_DELEGATE) {
                // $FlowFixMe
                _this11[key] = function overridenFunction() {
                    var _this12 = this,
                        _arguments = arguments;

                    return delegate.then(function (data) {
                        return data.overrides[key].apply(_this12, _arguments);
                    });
                };
            }
        };

        for (var _i6 = 0, _Object$keys4 = Object.keys(overrides), _length6 = _Object$keys4 == null ? 0 : _Object$keys4.length; _i6 < _length6; _i6++) {
            _loop(_i6, _Object$keys4, _length6);
        }
    };

    ParentComponent.prototype.watchForClose = function watchForClose(win) {
        var _this13 = this;

        var closeWindowListener = onCloseWindow(win, function () {
            _this13.component.log('detect_close_child');

            return ZalgoPromise['try'](function () {
                return _this13.props.onClose(CLOSE_REASONS.CLOSE_DETECTED);
            })['finally'](function () {
                return _this13.destroy();
            });
        }, 3000);

        this.clean.register('destroyCloseWindowListener', closeWindowListener.cancel);
    };

    ParentComponent.prototype.watchForUnload = function watchForUnload() {
        var _this14 = this;

        // Our child has no way of knowing if we navigated off the page. So we have to listen for unload
        // and close the child manually if that happens.

        var onunload = once(function () {
            _this14.component.log('navigate_away');
            _this14.destroyComponent();
        });

        var unloadWindowListener = addEventListener(window, 'unload', onunload);

        this.clean.register('destroyUnloadWindowListener', unloadWindowListener.cancel);
    };

    ParentComponent.prototype.loadUrl = function loadUrl(proxyWin, url) {
        this.component.log('load_url');
        return proxyWin.setLocation(url);
    };

    ParentComponent.prototype.runTimeout = function runTimeout() {
        var _this15 = this;

        var timeout = this.props.timeout;

        if (timeout) {
            var _id = this.timeout = setTimeout(function () {
                _this15.component.log('timed_out', { timeout: timeout.toString() });
                _this15.error(_this15.component.createError('Loading component timed out after ' + timeout + ' milliseconds'));
            }, timeout);

            this.clean.register(function () {
                clearTimeout(_id);
                delete _this15.timeout;
            });
        }
    };

    ParentComponent.prototype.initChild = function initChild(childExports) {
        var _this16 = this;

        return ZalgoPromise['try'](function () {
            _this16.childExports = childExports;
            _this16.onInit.resolve(_this16);

            if (_this16.timeout) {
                clearTimeout(_this16.timeout);
            }
        });
    };

    ParentComponent.prototype.buildParentExports = function buildParentExports(win) {
        var _this17 = this;

        return {
            init: function init(childExports) {
                return _this17.initChild(childExports);
            },
            close: function close(reason) {
                return _this17.close(reason);
            },
            checkClose: function checkClose() {
                return _this17.checkClose(win);
            },
            resize: function resize(width, height) {
                return _this17.resize(width, height);
            },
            trigger: function trigger(name) {
                return ZalgoPromise['try'](function () {
                    return _this17.event.trigger(name);
                });
            },
            hide: function hide() {
                return ZalgoPromise['try'](function () {
                    return _this17.hide();
                });
            },
            show: function show() {
                return ZalgoPromise['try'](function () {
                    return _this17.show();
                });
            },
            error: function error(err) {
                return _this17.error(err);
            }
        };
    };

    /*  Resize
        ------
         Resize the child component window
    */

    ParentComponent.prototype.resize = function resize(width, height) {
        var _this18 = this;

        var _ref9 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
            _ref9$waitForTransiti = _ref9.waitForTransition,
            waitForTransition = _ref9$waitForTransiti === undefined ? true : _ref9$waitForTransiti;

        return ZalgoPromise['try'](function () {
            _this18.component.log('resize', { height: stringify(height), width: stringify(width) });
            _this18.driver.resize.call(_this18, width, height);

            if (!waitForTransition) {
                return;
            }

            if (_this18.element) {

                var overflow = void 0;

                if (_this18.element) {
                    overflow = setOverflow(_this18.element, 'hidden');
                }

                return elementStoppedMoving(_this18.element).then(function () {

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

    ParentComponent.prototype.checkClose = function checkClose(win) {
        var _this19 = this;

        return win.isClosed().then(function (closed) {
            if (closed) {
                return _this19.userClose();
            }

            return ZalgoPromise.delay(200).then(function () {
                return win.isClosed();
            }).then(function (secondClosed) {
                if (secondClosed) {
                    return _this19.userClose();
                }
            });
        });
    };

    ParentComponent.prototype.userClose = function userClose() {
        return this.close(CLOSE_REASONS.USER_CLOSED);
    };

    /*  Close
        -----
         Close the child component
    */

    ParentComponent.prototype.close = function close() {
        var _this20 = this;

        var reason = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : CLOSE_REASONS.PARENT_CALL;

        return ZalgoPromise['try'](function () {

            _this20.component.log('close', { reason: reason });

            _this20.event.triggerOnce(EVENTS.CLOSE);
            return _this20.props.onClose(reason);
        }).then(function () {

            return ZalgoPromise.all([_this20.closeComponent(), _this20.closeContainer()]);
        }).then(function () {

            return _this20.destroy();
        });
    };

    ParentComponent.prototype.closeContainer = function closeContainer() {
        var _this21 = this;

        var reason = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : CLOSE_REASONS.PARENT_CALL;

        return ZalgoPromise['try'](function () {

            _this21.event.triggerOnce(EVENTS.CLOSE);
            return _this21.props.onClose(reason);
        }).then(function () {

            return ZalgoPromise.all([_this21.closeComponent(reason), _this21.hideContainer()]);
        }).then(function () {

            return _this21.destroyContainer();
        });
    };

    ParentComponent.prototype.destroyContainer = function destroyContainer() {
        var _this22 = this;

        return ZalgoPromise['try'](function () {
            _this22.clean.run('destroyContainerEvents');
            _this22.clean.run('destroyContainerTemplate');
        });
    };

    ParentComponent.prototype.closeComponent = function closeComponent() {
        var _this23 = this;

        var reason = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : CLOSE_REASONS.PARENT_CALL;

        return ZalgoPromise['try'](function () {
            return _this23.cancelContainerEvents();
        }).then(function () {
            _this23.event.triggerOnce(EVENTS.CLOSE);
            return _this23.props.onClose(reason);
        }).then(function () {
            return _this23.hideComponent();
        }).then(function () {
            return _this23.destroyComponent();
        }).then(function () {
            // IE in metro mode -- child window needs to close itself, or close will hang
            if (_this23.childExports && _this23.context === CONTEXT_TYPES.POPUP) {
                _this23.childExports.close()['catch'](noop);
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
        var _this24 = this;

        return ZalgoPromise['try'](function () {
            if (_this24.props.onDisplay) {
                return _this24.props.onDisplay();
            }
        }).then(function () {
            if (_this24.container) {
                return showAndAnimate(_this24.container, ANIMATION_NAMES.SHOW_CONTAINER, _this24.clean.register);
            }
        });
    };

    ParentComponent.prototype.showComponent = function showComponent() {
        var _this25 = this;

        return ZalgoPromise['try'](function () {
            if (_this25.props.onDisplay) {
                return _this25.props.onDisplay();
            }
        }).then(function () {
            if (_this25.element) {
                return showAndAnimate(_this25.element, ANIMATION_NAMES.SHOW_COMPONENT, _this25.clean.register);
            }
        });
    };

    ParentComponent.prototype.hideContainer = function hideContainer() {
        var _this26 = this;

        return ZalgoPromise['try'](function () {
            if (_this26.container) {
                return animateAndHide(_this26.container, ANIMATION_NAMES.HIDE_CONTAINER, _this26.clean.register);
            }
        });
    };

    ParentComponent.prototype.hideComponent = function hideComponent() {
        var _this27 = this;

        return ZalgoPromise['try'](function () {
            if (_this27.element) {
                return animateAndHide(_this27.element, ANIMATION_NAMES.HIDE_COMPONENT, _this27.clean.register);
            }
        });
    };

    /*  Create Component Template
        -------------------------
         Creates an initial template and stylesheet which are loaded into the child window, to be displayed before the url is loaded
    */

    ParentComponent.prototype.prerender = function prerender(proxyWin) {
        var _this28 = this;

        return ZalgoPromise['try'](function () {
            if (!_this28.component.prerenderTemplate) {
                return;
            }

            return ZalgoPromise['try'](function () {
                return proxyWin.awaitWindow();
            }).then(function (win) {
                return _this28.driver.openPrerender.call(_this28, win);
            }).then(function (prerenderWindow) {
                if (!prerenderWindow) {
                    return;
                }

                var doc = prerenderWindow.document;
                var el = _this28.renderTemplate(_this28.component.prerenderTemplate, { document: doc });

                if (el instanceof ElementNode) {
                    el = el.render(dom({ doc: doc }));
                }

                try {
                    writeElementToWindow(prerenderWindow, el);
                } catch (err) {
                    // pass
                }
            });
        });
    };

    ParentComponent.prototype.renderTemplate = function renderTemplate(renderer, _ref10) {
        var _this29 = this;

        var focus = _ref10.focus,
            container = _ref10.container,
            document = _ref10.document;

        var _ref11 = this.component.dimensions || {},
            _ref11$width = _ref11.width,
            width = _ref11$width === undefined ? DEFAULT_DIMENSIONS.WIDTH + 'px' : _ref11$width,
            _ref11$height = _ref11.height,
            height = _ref11$height === undefined ? DEFAULT_DIMENSIONS.HEIGHT + 'px' : _ref11$height;

        focus = focus || function () {
            return ZalgoPromise.resolve();
        };

        // $FlowFixMe
        return renderer.call(this, {
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
                focus: focus,
                close: function close() {
                    return _this29.userClose();
                }
            },
            on: function on(eventName, handler) {
                return _this29.on(eventName, handler);
            },
            jsxDom: node,
            document: document,
            dimensions: { width: width, height: height },
            container: container
        });
    };

    ParentComponent.prototype.openContainer = function openContainer(element, _ref12) {
        var _this30 = this;

        var focus = _ref12.focus;

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

            if (!_this30.component.containerTemplate) {
                if (_this30.driver.renderedIntoContainer) {
                    throw new Error('containerTemplate needed to render ' + _this30.context);
                }

                return;
            }

            var container = _this30.renderTemplate(_this30.component.containerTemplate, { container: el, focus: focus });

            if (container instanceof ElementNode) {
                container = container.render(dom({ doc: document }));
            }

            _this30.container = container;
            hideElement(_this30.container);
            appendChild(el, _this30.container);

            if (_this30.driver.renderedIntoContainer) {
                _this30.element = _this30.getOutlet();
                hideElement(_this30.element);

                if (!_this30.element) {
                    throw new Error('Could not find element to render component into');
                }

                hideElement(_this30.element);
            }

            _this30.clean.register('destroyContainerTemplate', function () {

                if (_this30.container && _this30.container.parentNode) {
                    _this30.container.parentNode.removeChild(_this30.container);
                }

                delete _this30.container;
            });
        });
    };

    ParentComponent.prototype.cancelContainerEvents = function cancelContainerEvents() {
        this.clean.run('destroyContainerEvents');
    };

    ParentComponent.prototype.destroy = function destroy() {
        var _this31 = this;

        return ZalgoPromise['try'](function () {
            if (_this31.clean.hasTasks()) {
                _this31.component.log('destroy');
                return _this31.clean.all();
            }
        });
    };

    ParentComponent.prototype.tryInit = function tryInit(method) {
        var _this32 = this;

        return ZalgoPromise['try'](method)['catch'](function (err) {
            _this32.onInit.reject(err);
        }).then(function () {
            return _this32.onInit;
        });
    };

    // $FlowFixMe


    ParentComponent.prototype.error = function error(err) {
        var _this33 = this;

        var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props;

        if (this.errored) {
            return;
        }

        this.errored = true;

        // eslint-disable-next-line promise/no-promise-in-callback
        return ZalgoPromise['try'](function () {
            _this33.onInit = _this33.onInit || new ZalgoPromise();
            _this33.onInit.reject(err);

            return _this33.destroy();
        }).then(function () {
            if (props.onError) {
                return props.onError(err);
            }
        })['catch'](function (errErr) {
            // eslint-disable-line unicorn/catch-error-name
            throw new Error('An error was encountered while handling error:\n\n ' + stringifyError(err) + '\n\n' + stringifyError(errErr));
        }).then(function () {
            if (!props.onError) {
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

    return ParentComponent;
}(), (_applyDecoratedDescriptor(_class.prototype, 'getOutlet', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'getOutlet'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'buildUrl', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'buildUrl'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'close', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'close'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'closeContainer', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'closeContainer'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'destroyContainer', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'destroyContainer'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'closeComponent', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'closeComponent'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'showContainer', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'showContainer'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'showComponent', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'showComponent'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'hideContainer', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'hideContainer'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'hideComponent', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'hideComponent'), _class.prototype)), _class);
ParentComponent.activeComponents = [];