'use strict';

exports.__esModule = true;
var ZOID = exports.ZOID = 'zoid';

var __ZOID__ = exports.__ZOID__ = '__' + ZOID + '__';

var POST_MESSAGE = exports.POST_MESSAGE = {
    INIT: ZOID + '_init',
    PROPS: ZOID + '_props',
    PROP_CALLBACK: ZOID + '_prop_callback',
    CLOSE: ZOID + '_close',
    CHECK_CLOSE: ZOID + '_check_close',
    REDIRECT: ZOID + '_redirect',
    RESIZE: ZOID + '_resize',
    ONRESIZE: ZOID + '_onresize',
    DELEGATE: ZOID + '_delegate',
    ALLOW_DELEGATE: ZOID + '_allow_delegate',
    ERROR: ZOID + '_error',
    HIDE: ZOID + '_hide',
    SHOW: ZOID + '_show'
};

var PROP_TYPES = exports.PROP_TYPES = {
    STRING: 'string',
    OBJECT: 'object',
    FUNCTION: 'function',
    BOOLEAN: 'boolean',
    NUMBER: 'number',
    ARRAY: 'array'
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
    ZOID: '' + ZOID,
    OUTLET: ZOID + '-outlet',
    COMPONENT_FRAME: ZOID + '-component-frame',
    PRERENDER_FRAME: ZOID + '-prerender-frame',
    VISIBLE: ZOID + '-visible',
    INVISIBLE: ZOID + '-invisible'
};

var EVENTS = exports.EVENTS = {
    CLOSE: ZOID + '-close'
};

var ATTRIBUTES = exports.ATTRIBUTES = {
    IFRAME_PLACEHOLDER: 'data-zoid-' + ZOID + '-placeholder'
};

var ANIMATION_NAMES = exports.ANIMATION_NAMES = {
    SHOW_CONTAINER: ZOID + '-show-container',
    SHOW_COMPONENT: ZOID + '-show-component',
    HIDE_CONTAINER: ZOID + '-hide-container',
    HIDE_COMPONENT: ZOID + '-hide-component'
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