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

import { isSameDomain, matchDomain, getDomain, getOpener, getTop, getParent, getNthParentFromTop, getAncestor, getAllFramesInWindow } from 'cross-domain-utils/src';
import { markWindowKnown, deserializeMessage } from 'post-robot/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { extend, getElement, noop, memoized, waitForDocumentBody, onResize } from 'belter/src';

import { parseChildWindowName } from '../window';
import { globalFor } from '../../lib';
import { CONTEXT, CLOSE_REASONS, INITIAL_PROPS, WINDOW_REFERENCES } from '../../constants';


import { normalizeChildProps } from './props';

/*  Child Component
    ---------------

    This is the portion of code which runs inside the frame or popup window containing the component's implementation.

    When the component author calls myComponent.attach(), it creates a new instance of ChildComponent, which is then
    responsible for managing the state and messaging back up to the parent, and providing props for the component to
    utilize.
*/

export var ChildComponent = (_class = function () {
    function ChildComponent(component) {
        var _this = this;

        _classCallCheck(this, ChildComponent);

        ZalgoPromise['try'](function () {
            if (window.xchild || window.xprops) {
                throw _this.component.createError('Can not attach multiple components to the same window');
            }

            _this.component = component;
            _this.onPropHandlers = [];

            var _parseChildWindowName = parseChildWindowName(),
                parent = _parseChildWindowName.parent,
                domain = _parseChildWindowName.domain,
                exports = _parseChildWindowName.exports,
                context = _parseChildWindowName.context,
                props = _parseChildWindowName.props;

            _this.context = context;
            _this.parentComponentWindow = _this.getWindowByRef(parent);
            _this.parentExports = deserializeMessage(_this.parentComponentWindow, domain, exports);

            _this.checkParentDomain(domain);

            window.xchild = _this.component.xchild = _this;
            var initialProps = _this.getPropsByRef(_this.parentComponentWindow, domain, props);
            _this.setProps(initialProps, domain);
            markWindowKnown(_this.parentComponentWindow);

            _this.watchForClose();

            return _this.parentExports.init(_this.buildExports());
        }).then(function () {
            return _this.watchForResize();
        })['catch'](function (err) {
            _this.error(err);
        });
    }

    ChildComponent.prototype.checkParentDomain = function checkParentDomain(domain) {
        if (!matchDomain(this.component.allowedParentDomains, domain)) {
            throw new Error('Can not be rendered by domain: ' + domain);
        }
    };

    ChildComponent.prototype.onProps = function onProps(handler) {
        this.onPropHandlers.push(handler);
    };

    ChildComponent.prototype.getPropsByRef = function getPropsByRef(parentComponentWindow, domain, _ref) {
        var type = _ref.type,
            value = _ref.value,
            uid = _ref.uid;

        var props = void 0;

        if (type === INITIAL_PROPS.RAW) {
            props = value;
        } else if (type === INITIAL_PROPS.UID) {

            if (!isSameDomain(parentComponentWindow)) {
                if (window.location.protocol === 'file:') {
                    throw new Error('Can not get props from file:// domain');
                }

                throw new Error('Parent component window is on a different domain - expected ' + getDomain() + ' - can not retrieve props');
            }

            var global = globalFor(parentComponentWindow);

            if (!global) {
                throw new Error('Can not find global for parent component - can not retrieve props');
            }

            props = global.props[uid];
        }

        if (!props) {
            throw new Error('Initial props not found');
        }

        return deserializeMessage(parentComponentWindow, domain, props);
    };

    ChildComponent.prototype.getWindowByRef = function getWindowByRef(ref) {
        var type = ref.type;

        var result = void 0;

        if (type === WINDOW_REFERENCES.OPENER) {
            result = getOpener(window);
        } else if (type === WINDOW_REFERENCES.TOP) {
            result = getTop(window);
        } else if (type === WINDOW_REFERENCES.PARENT) {
            // $FlowFixMe
            var distance = ref.distance;


            if (distance) {
                result = getNthParentFromTop(window, distance);
            } else {
                result = getParent(window);
            }
        }

        if (type === WINDOW_REFERENCES.GLOBAL) {
            // $FlowFixMe
            var uid = ref.uid;

            var ancestor = getAncestor(window);

            if (ancestor) {
                for (var _i2 = 0, _getAllFramesInWindow2 = getAllFramesInWindow(ancestor), _length2 = _getAllFramesInWindow2 == null ? 0 : _getAllFramesInWindow2.length; _i2 < _length2; _i2++) {
                    var frame = _getAllFramesInWindow2[_i2];
                    var global = globalFor(frame);

                    if (global && global.windows && global.windows[uid]) {
                        result = global.windows[uid];
                        break;
                    }
                }
            }
        }

        if (!result) {
            throw new Error('Unable to find ' + type + ' window');
        }

        return result;
    };

    ChildComponent.prototype.setProps = function setProps(props, origin) {
        var required = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        // $FlowFixMe
        this.props = this.props || {};
        var normalizedProps = normalizeChildProps(this.parentComponentWindow, this.component, props, origin, required);
        extend(this.props, normalizedProps);

        for (var _i4 = 0, _onPropHandlers2 = this.onPropHandlers, _length4 = _onPropHandlers2 == null ? 0 : _onPropHandlers2.length; _i4 < _length4; _i4++) {
            var handler = _onPropHandlers2[_i4];
            handler.call(this, this.props);
        }

        window.xprops = this.component.xprops = this.props;
    };

    ChildComponent.prototype.watchForClose = function watchForClose() {
        var _this2 = this;

        window.addEventListener('unload', function () {
            return _this2.parentExports.checkClose.fireAndForget();
        });
    };

    ChildComponent.prototype.enableAutoResize = function enableAutoResize() {
        var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref2$width = _ref2.width,
            width = _ref2$width === undefined ? false : _ref2$width,
            _ref2$height = _ref2.height,
            height = _ref2$height === undefined ? true : _ref2$height,
            _ref2$element = _ref2.element,
            element = _ref2$element === undefined ? 'body' : _ref2$element;

        this.autoResize = { width: width, height: height, element: element };
        this.watchForResize();
    };

    ChildComponent.prototype.getAutoResize = function getAutoResize() {
        var _ref3 = this.autoResize || this.component.autoResize || {},
            _ref3$width = _ref3.width,
            width = _ref3$width === undefined ? false : _ref3$width,
            _ref3$height = _ref3.height,
            height = _ref3$height === undefined ? false : _ref3$height,
            _ref3$element = _ref3.element,
            element = _ref3$element === undefined ? 'body' : _ref3$element;

        element = getElement(element);
        return { width: width, height: height, element: element };
    };

    ChildComponent.prototype.watchForResize = function watchForResize() {
        var _this3 = this;

        return waitForDocumentBody().then(function () {
            var _getAutoResize = _this3.getAutoResize(),
                width = _getAutoResize.width,
                height = _getAutoResize.height,
                element = _getAutoResize.element;

            if (!width && !height) {
                return;
            }

            if (_this3.context === CONTEXT.POPUP) {
                return;
            }

            onResize(element, function (_ref4) {
                var newWidth = _ref4.width,
                    newHeight = _ref4.height;

                _this3.resize({
                    width: width ? newWidth : undefined,
                    height: height ? newHeight : undefined
                });
            }, { width: width, height: height });
        });
    };

    ChildComponent.prototype.buildExports = function buildExports() {

        var self = this;

        return {
            updateProps: function updateProps(props) {
                var _this4 = this;

                return ZalgoPromise['try'](function () {
                    return self.setProps(props, _this4.origin, false);
                });
            },
            close: function close() {
                return ZalgoPromise['try'](function () {
                    return self.destroy();
                });
            }
        };
    };

    ChildComponent.prototype.resize = function resize(_ref5) {
        var width = _ref5.width,
            height = _ref5.height;

        return this.parentExports.resize.fireAndForget({ width: width, height: height });
    };

    ChildComponent.prototype.hide = function hide() {
        return this.parentExports.hide();
    };

    ChildComponent.prototype.show = function show() {
        return this.parentExports.show();
    };

    ChildComponent.prototype.userClose = function userClose() {
        return this.close(CLOSE_REASONS.USER_CLOSED);
    };

    ChildComponent.prototype.close = function close() {
        var reason = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : CLOSE_REASONS.CHILD_CALL;

        return this.parentExports.close(reason);
    };

    ChildComponent.prototype.destroy = function destroy() {
        return ZalgoPromise['try'](function () {
            window.close();
        });
    };

    ChildComponent.prototype.focus = function focus() {
        window.focus();
    };

    ChildComponent.prototype.error = function error(err) {
        var _this5 = this;

        // eslint-disable-next-line promise/no-promise-in-callback
        return ZalgoPromise['try'](function () {
            if (_this5.parentExports.error) {
                return _this5.parentExports.error(err);
            }
        })['catch'](noop).then(function () {
            throw err;
        });
    };

    return ChildComponent;
}(), (_applyDecoratedDescriptor(_class.prototype, 'watchForResize', [memoized], Object.getOwnPropertyDescriptor(_class.prototype, 'watchForResize'), _class.prototype)), _class);