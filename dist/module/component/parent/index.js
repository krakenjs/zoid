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
import { isSameDomain, isSameTopWindow, matchDomain, getDomainFromUrl, isBlankDomain, onCloseWindow, getDomain, getDistanceFromTop, isTop, normalizeMockUrl } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { addEventListener, uniqueID, elementReady as _elementReady, writeElementToWindow, noop, showAndAnimate, animateAndHide, showElement, hideElement, onResize, addClass, extend, extendUrl, getElement, memoized, appendChild, once, stringify, stringifyError, eventEmitter } from 'belter/src';
import { node, dom, ElementNode } from 'jsx-pragmatic/src';

import { buildChildWindowName } from '../window';
import { POST_MESSAGE, CONTEXT, CLASS_NAMES, ANIMATION_NAMES, CLOSE_REASONS, DELEGATE, INITIAL_PROPS, WINDOW_REFERENCES, EVENTS } from '../../constants';

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
            _this.driver = RENDER_DRIVERS[context];

            _this.setProps(props);
            _this.registerActiveComponent();
            _this.watchForUnload();

            return _this.onInit;
        })['catch'](function (err) {
            return _this.error(err, props);
        });
    }

    ParentComponent.prototype.render = function render(context, element) {
        var _this2 = this;

        var target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window;

        return this.tryInit(function () {
            _this2.component.log('render');

            var uid = uniqueID();
            var tasks = {};

            tasks.onRender = _this2.props.onRender();

            var domain = _this2.getDomain();
            var initialDomain = _this2.getInitialDomain();

            tasks.elementReady = ZalgoPromise['try'](function () {
                if (element) {
                    return _this2.elementReady(element);
                }
            });

            var focus = function focus() {
                return tasks.open.then(function (proxyWin) {
                    return proxyWin.focus();
                });
            };

            tasks.openContainer = tasks.elementReady.then(function () {
                return _this2.openContainer(element, { context: context, uid: uid, focus: focus });
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

            tasks.buildWindowName = tasks.open.then(function (proxyWin) {
                return _this2.buildWindowName({ proxyWin: proxyWin, initialDomain: initialDomain, domain: domain, target: target, context: context, uid: uid });
            });

            tasks.setWindowName = ZalgoPromise.all([tasks.open, tasks.buildWindowName]).then(function (_ref2) {
                var proxyWin = _ref2[0],
                    windowName = _ref2[1];

                return _this2.setWindowName(proxyWin, windowName);
            });

            tasks.watchForClose = ZalgoPromise.all([tasks.awaitWindow, tasks.setWindowName]).then(function (_ref3) {
                var win = _ref3[0];

                return _this2.watchForClose(win);
            });

            tasks.prerender = ZalgoPromise.all([tasks.awaitWindow, tasks.openContainer]).then(function (_ref4) {
                var win = _ref4[0];

                return _this2.prerender(win, { context: context, uid: uid });
            });

            tasks.showComponent = tasks.prerender.then(function () {
                return _this2.showComponent();
            });

            tasks.buildUrl = _this2.buildUrl();

            tasks.openBridge = ZalgoPromise.all([tasks.awaitWindow, tasks.buildUrl]).then(function (_ref5) {
                var win = _ref5[0],
                    url = _ref5[1];

                return _this2.openBridge(win, getDomainFromUrl(url), context);
            });

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

    ParentComponent.prototype.renderTo = function renderTo(context, target, element) {
        var _this3 = this;

        return this.tryInit(function () {
            if (target === window) {
                return _this3.render(context, element);
            }

            if (element && typeof element !== 'string') {
                throw new Error('Element passed to renderTo must be a string selector, got ' + (typeof element === 'undefined' ? 'undefined' : _typeof(element)) + ' ' + element);
            }

            _this3.checkAllowRemoteRender(target);

            _this3.component.log('render_' + context + '_to_win', { element: stringify(element), context: context });

            _this3.delegate(context, target);
            return _this3.render(context, element, target);
        });
    };

    ParentComponent.prototype.on = function on(eventName, handler) {
        return this.event.on(eventName, handler);
    };

    ParentComponent.prototype.checkAllowRemoteRender = function checkAllowRemoteRender(target) {

        if (!target) {
            throw this.component.createError('Must pass window to renderTo');
        }

        if (!isSameTopWindow(window, target)) {
            throw new Error('Can only renderTo an adjacent frame');
        }

        var origin = getDomain();
        var domain = this.getDomain();

        if (!matchDomain(domain, origin) && !isSameDomain(target)) {
            throw new Error('Can not render remotely to ' + domain.toString() + ' - can only render to ' + origin);
        }
    };

    ParentComponent.prototype.registerActiveComponent = function registerActiveComponent() {
        var _this4 = this;

        ParentComponent.activeComponents.push(this);

        this.clean.register(function () {
            ParentComponent.activeComponents.splice(ParentComponent.activeComponents.indexOf(_this4), 1);
        });
    };

    ParentComponent.prototype.getWindowRef = function getWindowRef(target, domain, uid, context) {

        if (domain === getDomain(window)) {
            global.windows[uid] = window;
            this.clean.register(function () {
                delete global.windows[uid];
            });

            return { type: WINDOW_REFERENCES.GLOBAL, uid: uid };
        }

        if (target !== window) {
            throw new Error('Can not currently create window reference for different target with a different domain');
        }

        if (context === CONTEXT.POPUP) {
            return { type: WINDOW_REFERENCES.OPENER };
        }

        if (isTop(window)) {
            return { type: WINDOW_REFERENCES.TOP };
        }

        return { type: WINDOW_REFERENCES.PARENT, distance: getDistanceFromTop(window) };
    };

    ParentComponent.prototype.buildWindowName = function buildWindowName(_ref7) {
        var proxyWin = _ref7.proxyWin,
            initialDomain = _ref7.initialDomain,
            domain = _ref7.domain,
            target = _ref7.target,
            uid = _ref7.uid,
            context = _ref7.context;

        return buildChildWindowName(this.component.name, this.buildChildPayload({ proxyWin: proxyWin, initialDomain: initialDomain, domain: domain, target: target, context: context, uid: uid }));
    };

    ParentComponent.prototype.getPropsRef = function getPropsRef(proxyWin, target, domain, uid) {
        var value = serializeMessage(proxyWin, domain, this.getPropsForChild(domain));

        var propRef = isSameDomain(target) ? { type: INITIAL_PROPS.RAW, value: value } : { type: INITIAL_PROPS.UID, uid: uid };

        if (propRef.type === INITIAL_PROPS.UID) {
            global.props[uid] = value;

            this.clean.register(function () {
                delete global.props[uid];
            });
        }

        return propRef;
    };

    ParentComponent.prototype.buildChildPayload = function buildChildPayload() {
        var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            proxyWin = _ref8.proxyWin,
            initialDomain = _ref8.initialDomain,
            domain = _ref8.domain,
            _ref8$target = _ref8.target,
            target = _ref8$target === undefined ? window : _ref8$target,
            context = _ref8.context,
            uid = _ref8.uid;

        var childPayload = {
            uid: uid,
            context: context,
            domain: getDomain(window),
            tag: this.component.tag,
            parent: this.getWindowRef(target, initialDomain, uid, context),
            props: this.getPropsRef(proxyWin, target, domain, uid),
            exports: serializeMessage(proxyWin, domain, this.buildParentExports(proxyWin))
        };

        return childPayload;
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
            var url = normalizeMockUrl(_this5.component.getUrl(_this5.props));
            return extendUrl(url, { query: _extends({}, query) });
        });
    };

    ParentComponent.prototype.getDomain = function getDomain() {
        return this.component.getDomain(this.props);
    };

    ParentComponent.prototype.getInitialDomain = function getInitialDomain() {
        return this.component.getInitialDomain(this.props);
    };

    ParentComponent.prototype.getPropsForChild = function getPropsForChild(domain) {

        var result = {};

        for (var _i2 = 0, _Object$keys2 = Object.keys(this.props), _length2 = _Object$keys2 == null ? 0 : _Object$keys2.length; _i2 < _length2; _i2++) {
            var key = _Object$keys2[_i2];
            var prop = this.component.getProp(key);

            if (prop && prop.sendToChild === false) {
                continue;
            }

            if (prop && prop.sameDomain && !matchDomain(domain, getDomain(window))) {
                continue;
            }

            // $FlowFixMe
            result[key] = this.props[key];
        }

        // $FlowFixMe


        return result;
    };

    ParentComponent.prototype.updateProps = function updateProps(props) {
        var _this6 = this;

        this.setProps(props, true);

        return this.onInit.then(function () {
            if (_this6.childExports) {
                return _this6.childExports.updateProps(_this6.getPropsForChild(_this6.getDomain()));
            } else {
                throw new Error('Child exports were not available');
            }
        });
    };

    ParentComponent.prototype.openBridge = function openBridge(win, domain, context) {
        var _this7 = this;

        return ZalgoPromise['try'](function () {
            if (!bridge || !bridge.needsBridge({ win: win, domain: domain }) || bridge.hasBridge(domain, domain)) {
                return;
            }

            var bridgeUrl = _this7.component.getBridgeUrl(_this7.props);

            if (!bridgeUrl) {
                throw new Error('Bridge url and domain needed to render ' + context);
            }

            var bridgeDomain = getDomainFromUrl(bridgeUrl);
            bridge.linkUrl(win, domain);
            return bridge.openBridge(bridgeUrl, bridgeDomain);
        });
    };

    ParentComponent.prototype.open = function open() {
        var _this8 = this;

        return ZalgoPromise['try'](function () {
            _this8.component.log('open');

            var windowProp = _this8.props.window;

            if (windowProp) {
                _this8.clean.register('destroyProxyWindow', function () {
                    return windowProp.close();
                });

                return windowProp;
            }

            return _this8.driver.open.call(_this8);
        });
    };

    ParentComponent.prototype.setWindowName = function setWindowName(proxyWin, name) {
        return proxyWin.setName(name);
    };

    ParentComponent.prototype.switchPrerender = function switchPrerender() {
        var _this9 = this;

        return ZalgoPromise['try'](function () {
            if (_this9.component.prerenderTemplate && _this9.driver.switchPrerender) {
                return _this9.driver.switchPrerender.call(_this9);
            }
        });
    };

    ParentComponent.prototype.elementReady = function elementReady(element) {
        return _elementReady(element).then(noop);
    };

    ParentComponent.prototype.delegate = function delegate(context, target) {
        var _this10 = this;

        this.component.log('delegate');

        var props = {
            window: this.props.window,
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
            context: context,
            props: props,
            overrides: {
                userClose: function userClose() {
                    return _this10.userClose();
                },
                error: function error(err) {
                    return _this10.error(err);
                },
                on: function on(eventName, handler) {
                    return _this10.on(eventName, handler);
                }
            }

        }).then(function (_ref9) {
            var data = _ref9.data;

            _this10.clean.register(data.destroy);
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
                _this10[key] = function overridenFunction() {
                    var _this11 = this,
                        _arguments = arguments;

                    return delegate.then(function (data) {
                        return data.overrides[key].apply(_this11, _arguments);
                    });
                };
            }
        };

        for (var _i6 = 0, _Object$keys4 = Object.keys(overrides), _length6 = _Object$keys4 == null ? 0 : _Object$keys4.length; _i6 < _length6; _i6++) {
            _loop(_i6, _Object$keys4, _length6);
        }
    };

    ParentComponent.prototype.watchForClose = function watchForClose(win) {
        var _this12 = this;

        var closeWindowListener = onCloseWindow(win, function () {
            _this12.component.log('detect_close_child');

            return ZalgoPromise['try'](function () {
                return _this12.props.onClose(CLOSE_REASONS.CLOSE_DETECTED);
            })['finally'](function () {
                return _this12.destroy();
            });
        }, 3000);

        this.clean.register('destroyCloseWindowListener', closeWindowListener.cancel);
    };

    ParentComponent.prototype.watchForUnload = function watchForUnload() {
        var _this13 = this;

        // Our child has no way of knowing if we navigated off the page. So we have to listen for unload
        // and close the child manually if that happens.

        var onunload = once(function () {
            _this13.component.log('navigate_away');
            _this13.destroyComponent();
        });

        var unloadWindowListener = addEventListener(window, 'unload', onunload);

        this.clean.register('destroyUnloadWindowListener', unloadWindowListener.cancel);
    };

    ParentComponent.prototype.loadUrl = function loadUrl(proxyWin, url) {
        this.component.log('load_url');
        return proxyWin.setLocation(url);
    };

    ParentComponent.prototype.runTimeout = function runTimeout() {
        var _this14 = this;

        var timeout = this.props.timeout;

        if (timeout) {
            var _id = this.timeout = setTimeout(function () {
                _this14.component.log('timed_out', { timeout: timeout.toString() });
                _this14.error(_this14.component.createError('Loading component timed out after ' + timeout + ' milliseconds'));
            }, timeout);

            this.clean.register(function () {
                clearTimeout(_id);
                delete _this14.timeout;
            });
        }
    };

    ParentComponent.prototype.initChild = function initChild(childExports) {
        var _this15 = this;

        return ZalgoPromise['try'](function () {
            _this15.childExports = childExports;
            _this15.onInit.resolve(_this15);

            if (_this15.timeout) {
                clearTimeout(_this15.timeout);
            }
        });
    };

    ParentComponent.prototype.buildParentExports = function buildParentExports(win) {
        var _this16 = this;

        return {
            init: function init(childExports) {
                return _this16.initChild(childExports);
            },
            close: function close(reason) {
                return _this16.close(reason);
            },
            checkClose: function checkClose() {
                return _this16.checkClose(win);
            },
            resize: function resize(_ref10) {
                var width = _ref10.width,
                    height = _ref10.height;
                return _this16.resize({ width: width, height: height });
            },
            trigger: function trigger(name) {
                return ZalgoPromise['try'](function () {
                    return _this16.event.trigger(name);
                });
            },
            hide: function hide() {
                return ZalgoPromise['try'](function () {
                    return _this16.hide();
                });
            },
            show: function show() {
                return ZalgoPromise['try'](function () {
                    return _this16.show();
                });
            },
            error: function error(err) {
                return _this16.error(err);
            }
        };
    };

    ParentComponent.prototype.resize = function resize(_ref11) {
        var _this17 = this;

        var width = _ref11.width,
            height = _ref11.height;

        return ZalgoPromise['try'](function () {
            _this17.driver.resize.call(_this17, { width: width, height: height });
        });
    };

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
        var _this18 = this;

        return win.isClosed().then(function (closed) {
            if (closed) {
                return _this18.userClose();
            }

            return ZalgoPromise.delay(200).then(function () {
                return win.isClosed();
            }).then(function (secondClosed) {
                if (secondClosed) {
                    return _this18.userClose();
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
        var _this19 = this;

        var reason = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : CLOSE_REASONS.PARENT_CALL;

        return ZalgoPromise['try'](function () {

            _this19.component.log('close', { reason: reason });

            _this19.event.triggerOnce(EVENTS.CLOSE);
            return _this19.props.onClose(reason);
        }).then(function () {

            return ZalgoPromise.all([_this19.closeComponent(), _this19.closeContainer()]);
        }).then(function () {

            return _this19.destroy();
        });
    };

    ParentComponent.prototype.closeContainer = function closeContainer() {
        var _this20 = this;

        var reason = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : CLOSE_REASONS.PARENT_CALL;

        return ZalgoPromise['try'](function () {

            _this20.event.triggerOnce(EVENTS.CLOSE);
            return _this20.props.onClose(reason);
        }).then(function () {

            return ZalgoPromise.all([_this20.closeComponent(reason), _this20.hideContainer()]);
        }).then(function () {

            return _this20.destroyContainer();
        });
    };

    ParentComponent.prototype.destroyContainer = function destroyContainer() {
        var _this21 = this;

        return ZalgoPromise['try'](function () {
            _this21.clean.run('destroyContainerEvents');
            _this21.clean.run('destroyContainerTemplate');
        });
    };

    ParentComponent.prototype.closeComponent = function closeComponent() {
        var _this22 = this;

        var reason = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : CLOSE_REASONS.PARENT_CALL;

        return ZalgoPromise['try'](function () {
            return _this22.cancelContainerEvents();
        }).then(function () {
            _this22.event.triggerOnce(EVENTS.CLOSE);
            return _this22.props.onClose(reason);
        }).then(function () {
            return _this22.hideComponent();
        }).then(function () {
            return _this22.destroyComponent();
        }).then(function () {
            // IE in metro mode -- child window needs to close itself, or close will hang
            if (_this22.childExports && _this22.driver.callChildToClose) {
                _this22.childExports.close()['catch'](noop);
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
        var _this23 = this;

        return ZalgoPromise['try'](function () {
            if (_this23.props.onDisplay) {
                return _this23.props.onDisplay();
            }
        }).then(function () {
            if (_this23.container) {
                return showAndAnimate(_this23.container, ANIMATION_NAMES.SHOW_CONTAINER, _this23.clean.register);
            }
        });
    };

    ParentComponent.prototype.showComponent = function showComponent() {
        var _this24 = this;

        return ZalgoPromise['try'](function () {
            if (_this24.props.onDisplay) {
                return _this24.props.onDisplay();
            }
        }).then(function () {
            if (_this24.element) {
                return showAndAnimate(_this24.element, ANIMATION_NAMES.SHOW_COMPONENT, _this24.clean.register);
            }
        });
    };

    ParentComponent.prototype.hideContainer = function hideContainer() {
        var _this25 = this;

        return ZalgoPromise['try'](function () {
            if (_this25.container) {
                return animateAndHide(_this25.container, ANIMATION_NAMES.HIDE_CONTAINER, _this25.clean.register);
            }
        });
    };

    ParentComponent.prototype.hideComponent = function hideComponent() {
        var _this26 = this;

        return ZalgoPromise['try'](function () {
            if (_this26.element) {
                return animateAndHide(_this26.element, ANIMATION_NAMES.HIDE_COMPONENT, _this26.clean.register);
            }
        });
    };

    /*  Create Component Template
        -------------------------
         Creates an initial template and stylesheet which are loaded into the child window, to be displayed before the url is loaded
    */

    ParentComponent.prototype.prerender = function prerender(win, _ref12) {
        var _this27 = this;

        var context = _ref12.context,
            uid = _ref12.uid;

        return ZalgoPromise['try'](function () {
            if (!_this27.component.prerenderTemplate) {
                return;
            }

            return ZalgoPromise['try'](function () {
                return _this27.driver.openPrerender.call(_this27, win);
            }).then(function (prerenderWindow) {
                if (!prerenderWindow || !isSameDomain(prerenderWindow) || !isBlankDomain(prerenderWindow)) {
                    return;
                }

                var doc = prerenderWindow.document;
                var el = _this27.renderTemplate(_this27.component.prerenderTemplate, { context: context, uid: uid, document: doc });

                if (el instanceof ElementNode) {
                    el = el.render(dom({ doc: doc }));
                }

                try {
                    writeElementToWindow(prerenderWindow, el);
                } catch (err) {
                    return;
                }

                var _ref13 = _this27.component.autoResize || {},
                    _ref13$width = _ref13.width,
                    width = _ref13$width === undefined ? false : _ref13$width,
                    _ref13$height = _ref13.height,
                    height = _ref13$height === undefined ? false : _ref13$height,
                    _ref13$element = _ref13.element,
                    element = _ref13$element === undefined ? 'body' : _ref13$element;

                if (width || height) {
                    onResize(getElement(element, prerenderWindow.document), function (_ref14) {
                        var newWidth = _ref14.width,
                            newHeight = _ref14.height;

                        _this27.resize({
                            width: width ? newWidth : undefined,
                            height: height ? newHeight : undefined
                        });
                    }, { width: width, height: height, win: prerenderWindow });
                }
            });
        });
    };

    ParentComponent.prototype.renderTemplate = function renderTemplate(renderer, _ref15) {
        var _this28 = this;

        var context = _ref15.context,
            uid = _ref15.uid,
            focus = _ref15.focus,
            container = _ref15.container,
            document = _ref15.document,
            outlet = _ref15.outlet;

        focus = focus || function () {
            return ZalgoPromise.resolve();
        };

        // $FlowFixMe
        return renderer.call(this, {
            context: context,
            uid: uid,
            id: CLASS_NAMES.ZOID + '-' + this.component.tag + '-' + uid,
            props: renderer.__xdomain__ ? null : this.props,
            tag: this.component.tag,
            CLASS: CLASS_NAMES,
            ANIMATION: ANIMATION_NAMES,
            CONTEXT: CONTEXT,
            EVENT: EVENTS,
            actions: {
                focus: focus,
                close: function close() {
                    return _this28.userClose();
                }
            },
            on: function on(eventName, handler) {
                return _this28.on(eventName, handler);
            },
            jsxDom: node,
            document: document,
            dimensions: this.component.dimensions,
            container: container,
            outlet: outlet
        });
    };

    ParentComponent.prototype.openContainer = function openContainer(element, _ref16) {
        var _this29 = this;

        var context = _ref16.context,
            uid = _ref16.uid,
            focus = _ref16.focus;

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

            if (!_this29.component.containerTemplate) {
                if (_this29.driver.renderedIntoContainer) {
                    throw new Error('containerTemplate needed to render ' + context);
                }

                return;
            }

            var outlet = document.createElement('div');
            addClass(outlet, CLASS_NAMES.OUTLET);

            var container = _this29.renderTemplate(_this29.component.containerTemplate, { context: context, uid: uid, container: el, focus: focus, outlet: outlet });

            if (container instanceof ElementNode) {
                container = container.render(dom({ doc: document }));
            }

            _this29.container = container;
            hideElement(_this29.container);
            appendChild(el, _this29.container);

            if (_this29.driver.renderedIntoContainer) {
                _this29.element = outlet;
                hideElement(_this29.element);

                if (!_this29.element) {
                    throw new Error('Could not find element to render component into');
                }

                hideElement(_this29.element);
            }

            _this29.clean.register('destroyContainerTemplate', function () {

                if (_this29.container && _this29.container.parentNode) {
                    _this29.container.parentNode.removeChild(_this29.container);
                }

                delete _this29.container;
            });
        });
    };

    ParentComponent.prototype.cancelContainerEvents = function cancelContainerEvents() {
        this.clean.run('destroyContainerEvents');
    };

    ParentComponent.prototype.destroy = function destroy() {
        var _this30 = this;

        return ZalgoPromise['try'](function () {
            if (_this30.clean.hasTasks()) {
                _this30.component.log('destroy');
                return _this30.clean.all();
            }
        });
    };

    ParentComponent.prototype.tryInit = function tryInit(method) {
        var _this31 = this;

        return ZalgoPromise['try'](method)['catch'](function (err) {
            _this31.onInit.reject(err);
        }).then(function () {
            return _this31.onInit;
        });
    };

    // $FlowFixMe


    ParentComponent.prototype.error = function error(err) {
        var _this32 = this;

        var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props;

        if (this.errored) {
            return;
        }

        this.errored = true;

        // eslint-disable-next-line promise/no-promise-in-callback
        return ZalgoPromise['try'](function () {
            _this32.onInit = _this32.onInit || new ZalgoPromise();
            _this32.onInit.reject(err);

            return _this32.destroy();
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
}(), (_applyDecoratedDescriptor(_class.prototype, 'close', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'close'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'closeContainer', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'closeContainer'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'destroyContainer', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'destroyContainer'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'closeComponent', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'closeComponent'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'showContainer', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'showContainer'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'showComponent', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'showComponent'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'hideContainer', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'hideContainer'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'hideComponent', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'hideComponent'), _class.prototype)), _class);
ParentComponent.activeComponents = [];