/* @flow */

export const ZOID = `zoid`;

export const __ZOID__ = `__${ ZOID }__`;

export const POST_MESSAGE = {
    INIT:           `${ ZOID }_init`,
    PROPS:          `${ ZOID }_props`,
    PROP_CALLBACK:  `${ ZOID }_prop_callback`,
    CLOSE:          `${ ZOID }_close`,
    CHECK_CLOSE:    `${ ZOID }_check_close`,
    REDIRECT:       `${ ZOID }_redirect`,
    RESIZE:         `${ ZOID }_resize`,
    DELEGATE:       `${ ZOID }_delegate`,
    ALLOW_DELEGATE: `${ ZOID }_allow_delegate`,
    ERROR:          `${ ZOID }_error`,
    HIDE:           `${ ZOID }_hide`,
    SHOW:           `${ ZOID }_show`
};

export const PROP_TYPES = {
    STRING:   `string`,
    OBJECT:   `object`,
    FUNCTION: `function`,
    BOOLEAN:  `boolean`,
    NUMBER:   `number`
};

export const INITIAL_PROPS = {
    RAW: 'raw',
    UID: 'uid'
};

export const WINDOW_REFERENCES = {
    OPENER: `opener`,
    TOP:    `top`,
    PARENT: `parent`,
    GLOBAL: `global`
};

export const PROP_TYPES_LIST : Array<string> = Object.keys(PROP_TYPES).map(key => PROP_TYPES[key]);

export const CONTEXT_TYPES = {
    IFRAME: `iframe`,
    POPUP:  `popup`
};

export const CLASS_NAMES = {
    ZOID:              `${ ZOID }`,
    OUTLET:            `${ ZOID }-outlet`,
    COMPONENT_FRAME:   `${ ZOID }-component-frame`,
    PRERENDER_FRAME:   `${ ZOID }-prerender-frame`,
    VISIBLE:           `${ ZOID }-visible`,
    INVISIBLE:         `${ ZOID }-invisible`
};

export const EVENTS = {
    CLOSE: `${ ZOID }-close`
};

export const ATTRIBUTES = {
    IFRAME_PLACEHOLDER: `data-zoid-${ ZOID }-placeholder`
};

export const ANIMATION_NAMES = {
    SHOW_CONTAINER: `${ ZOID }-show-container`,
    SHOW_COMPONENT: `${ ZOID }-show-component`,
    HIDE_CONTAINER: `${ ZOID }-hide-container`,
    HIDE_COMPONENT: `${ ZOID }-hide-component`
};

export const EVENT_NAMES = {
    CLICK: 'click'
};

export const CLOSE_REASONS = {
    PARENT_CALL:           'parent_call',
    CHILD_CALL:            'child_call',
    CLOSE_DETECTED:        'close_detected',
    USER_CLOSED:           'user_closed',
    PARENT_CLOSE_DETECTED: 'parent_close_detected'
};

export const CONTEXT_TYPES_LIST : Array<string> = Object.keys(CONTEXT_TYPES).map(key => CONTEXT_TYPES[key]);

export const DELEGATE = {
    CALL_ORIGINAL: 'call_original',
    CALL_DELEGATE: 'call_delegate'
};

export const WILDCARD = '*';

export const DEFAULT_DIMENSIONS = {
    WIDTH:  300,
    HEIGHT: 150
};
