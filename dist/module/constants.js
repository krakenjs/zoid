export var XCOMPONENT = 'xcomponent';

export var __XCOMPONENT__ = '__' + XCOMPONENT + '__';

export var POST_MESSAGE = {
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

export var PROP_TYPES = {
    STRING: 'string',
    OBJECT: 'object',
    FUNCTION: 'function',
    BOOLEAN: 'boolean',
    NUMBER: 'number'
};

export var INITIAL_PROPS = {
    RAW: 'raw',
    UID: 'uid'
};

export var WINDOW_REFERENCES = {
    OPENER: 'opener',
    TOP: 'top',
    PARENT: 'parent',
    GLOBAL: 'global'
};

export var PROP_TYPES_LIST = Object.keys(PROP_TYPES).map(function (key) {
    return PROP_TYPES[key];
});

export var CONTEXT_TYPES = {
    IFRAME: 'iframe',
    POPUP: 'popup'
};

export var CLASS_NAMES = {
    XCOMPONENT: '' + XCOMPONENT,
    OUTLET: XCOMPONENT + '-outlet',
    COMPONENT_FRAME: XCOMPONENT + '-component-frame',
    PRERENDER_FRAME: XCOMPONENT + '-prerender-frame',
    VISIBLE: XCOMPONENT + '-visible',
    INVISIBLE: XCOMPONENT + '-invisible'
};

export var EVENTS = {
    CLOSE: XCOMPONENT + '-close'
};

export var ATTRIBUTES = {
    IFRAME_PLACEHOLDER: 'data-xcomponent-' + XCOMPONENT + '-placeholder'
};

export var ANIMATION_NAMES = {
    SHOW_CONTAINER: XCOMPONENT + '-show-container',
    SHOW_COMPONENT: XCOMPONENT + '-show-component',
    HIDE_CONTAINER: XCOMPONENT + '-hide-container',
    HIDE_COMPONENT: XCOMPONENT + '-hide-component'
};

export var EVENT_NAMES = {
    CLICK: 'click'
};

export var CLOSE_REASONS = {
    PARENT_CALL: 'parent_call',
    CHILD_CALL: 'child_call',
    CLOSE_DETECTED: 'close_detected',
    USER_CLOSED: 'user_closed',
    PARENT_CLOSE_DETECTED: 'parent_close_detected'
};

export var CONTEXT_TYPES_LIST = Object.keys(CONTEXT_TYPES).map(function (key) {
    return CONTEXT_TYPES[key];
});

export var DELEGATE = {
    CALL_ORIGINAL: 'call_original',
    CALL_DELEGATE: 'call_delegate'
};

export var WILDCARD = '*';

export var DEFAULT_DIMENSIONS = {
    WIDTH: 300,
    HEIGHT: 150
};