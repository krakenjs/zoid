/* @flow */

export const ZOID = `zoid`;

export const __ZOID__ = `__${ ZOID }__`;

export const POST_MESSAGE = {
    DELEGATE:       `${ ZOID }_delegate`,
    ALLOW_DELEGATE: `${ ZOID }_allow_delegate`
};

export const PROP_TYPES = {
    STRING:   `string`,
    OBJECT:   `object`,
    FUNCTION: `function`,
    BOOLEAN:  `boolean`,
    NUMBER:   `number`,
    ARRAY:    `array`
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

export const PROP_SERIALIZATION = {
    JSON:   ('json' : 'json'),
    DOTIFY: ('dotify' : 'dotify'),
    BASE64: ('base64' : 'base64')
};

export const PROP_TYPES_LIST : Array<string> = Object.keys(PROP_TYPES).map(key => PROP_TYPES[key]);

export const CONTEXT = {
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
    PARENT_CALL:           ('parent_call' : 'parent_call'),
    CHILD_CALL:            ('child_call' : 'child_call'),
    CLOSE_DETECTED:        ('close_detected' : 'close_detected'),
    USER_CLOSED:           ('user_closed' : 'user_closed'),
    PARENT_CLOSE_DETECTED: ('parent_close_detected' : 'parent_close_detected')
};

export const CONTEXT_LIST : Array<string> = Object.keys(CONTEXT).map(key => CONTEXT[key]);

export const DELEGATE = {
    CALL_ORIGINAL: 'call_original',
    CALL_DELEGATE: 'call_delegate'
};

export const WILDCARD = '*';

export const DEFAULT_DIMENSIONS = {
    WIDTH:  300,
    HEIGHT: 150
};
