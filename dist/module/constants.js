'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var XCOMPONENT = exports.XCOMPONENT = 'xcomponent';

var __XCOMPONENT__ = exports.__XCOMPONENT__ = '__' + XCOMPONENT + '__';

var POST_MESSAGE = exports.POST_MESSAGE = {
    INIT: XCOMPONENT + '_init',
    PROPS: XCOMPONENT + '_props',
    PROP_CALLBACK: XCOMPONENT + '_prop_callback',
    CLOSE: XCOMPONENT + '_close',
    CHECK_CLOSE: XCOMPONENT + '_check_close',
    REDIRECT: XCOMPONENT + '_redirect',
    RESIZE: XCOMPONENT + '_resize',
    ONRESIZE: XCOMPONENT + '_onresize',
    DELEGATE: XCOMPONENT + '_delegate',
    ALLOW_DELEGATE: XCOMPONENT + '_allow_delegate',
    ERROR: XCOMPONENT + '_error',
    HIDE: XCOMPONENT + '_hide',
    SHOW: XCOMPONENT + '_show'
};

var PROP_TYPES = exports.PROP_TYPES = {
    STRING: 'string',
    OBJECT: 'object',
    FUNCTION: 'function',
    BOOLEAN: 'boolean',
    NUMBER: 'number'
};

var INITIAL_PROPS = exports.INITIAL_PROPS = {
    RAW: 'raw',
    UID: 'uid'
};

var WINDOW_REFERENCES = exports.WINDOW_REFERENCES = {
    OPENER: 'opener',
    TOP: 'top',
    PARENT: 'parent',
    GLOBAL: 'global'
};

var PROP_TYPES_LIST = exports.PROP_TYPES_LIST = Object.keys(PROP_TYPES).map(function (key) {
    return PROP_TYPES[key];
});

var CONTEXT_TYPES = exports.CONTEXT_TYPES = {
    IFRAME: 'iframe',
    POPUP: 'popup'
};

var CLASS_NAMES = exports.CLASS_NAMES = {
    XCOMPONENT: '' + XCOMPONENT,
    OUTLET: XCOMPONENT + '-outlet',
    COMPONENT_FRAME: XCOMPONENT + '-component-frame',
    PRERENDER_FRAME: XCOMPONENT + '-prerender-frame',
    VISIBLE: XCOMPONENT + '-visible',
    INVISIBLE: XCOMPONENT + '-invisible'
};

var EVENTS = exports.EVENTS = {
    CLOSE: XCOMPONENT + '-close'
};

var ATTRIBUTES = exports.ATTRIBUTES = {
    IFRAME_PLACEHOLDER: 'data-xcomponent-' + XCOMPONENT + '-placeholder'
};

var ANIMATION_NAMES = exports.ANIMATION_NAMES = {
    SHOW_CONTAINER: XCOMPONENT + '-show-container',
    SHOW_COMPONENT: XCOMPONENT + '-show-component',
    HIDE_CONTAINER: XCOMPONENT + '-hide-container',
    HIDE_COMPONENT: XCOMPONENT + '-hide-component'
};

var EVENT_NAMES = exports.EVENT_NAMES = {
    CLICK: 'click'
};

var CLOSE_REASONS = exports.CLOSE_REASONS = {
    PARENT_CALL: 'parent_call',
    CHILD_CALL: 'child_call',
    CLOSE_DETECTED: 'close_detected',
    USER_CLOSED: 'user_closed',
    PARENT_CLOSE_DETECTED: 'parent_close_detected'
};

var CONTEXT_TYPES_LIST = exports.CONTEXT_TYPES_LIST = Object.keys(CONTEXT_TYPES).map(function (key) {
    return CONTEXT_TYPES[key];
});

var DELEGATE = exports.DELEGATE = {
    CALL_ORIGINAL: 'call_original',
    CALL_DELEGATE: 'call_delegate'
};

var WILDCARD = exports.WILDCARD = '*';

var DEFAULT_DIMENSIONS = exports.DEFAULT_DIMENSIONS = {
    WIDTH: 300,
    HEIGHT: 150
};