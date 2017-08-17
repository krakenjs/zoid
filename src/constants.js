
import { values } from './lib';

export const XCOMPONENT = `xcomponent`;

export const __XCOMPONENT__ = `__${XCOMPONENT}__`;

export const POST_MESSAGE = {
    INIT: `${XCOMPONENT}_init`,
    PROPS: `${XCOMPONENT}_props`,
    PROP_CALLBACK: `${XCOMPONENT}_prop_callback`,
    CLOSE: `${XCOMPONENT}_close`,
    CHECK_CLOSE: `${XCOMPONENT}_check_close`,
    REDIRECT: `${XCOMPONENT}_redirect`,
    RESIZE: `${XCOMPONENT}_resize`,
    DELEGATE: `${XCOMPONENT}_delegate`,
    ERROR: `${XCOMPONENT}_error`,
    HIDE: `${XCOMPONENT}_hide`,
    SHOW: `${XCOMPONENT}_show`
};

export const PROP_TYPES = {
    STRING: `string`,
    OBJECT: `object`,
    FUNCTION: `function`,
    BOOLEAN: `boolean`,
    NUMBER: `number`
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

export const PROP_TYPES_LIST = values(PROP_TYPES);

export const CONTEXT_TYPES = {
    IFRAME: `iframe`,
    POPUP: `popup`
};

export const CLASS_NAMES = {
    XCOMPONENT:        `${XCOMPONENT}`,
    OUTLET:            `${XCOMPONENT}-outlet`,
    SACRIFICIAL_FRAME: `${XCOMPONENT}-sacrificial-frame`
};

export const EVENTS = {
    CLOSE: `${XCOMPONENT}-close`
};

export const ATTRIBUTES = {
    IFRAME_PLACEHOLDER: `data-xcomponent-${XCOMPONENT}-placeholder`
};

export const ANIMATION_NAMES = {
    SHOW_CONTAINER: `${XCOMPONENT}-show-container`,
    SHOW_COMPONENT: `${XCOMPONENT}-show-component`,
    HIDE_CONTAINER: `${XCOMPONENT}-hide-container`,
    HIDE_COMPONENT: `${XCOMPONENT}-hide-component`
};

export const EVENT_NAMES = {
    CLICK: 'click'
};

export const CLOSE_REASONS = {
    PARENT_CALL: 'parent_call',
    CHILD_CALL: 'child_call',
    CLOSE_DETECTED: 'close_detected',
    USER_CLOSED: 'user_closed',
    PARENT_CLOSE_DETECTED: 'parent_close_detected'
};

export const CONTEXT_TYPES_LIST = values(CONTEXT_TYPES);

export const DELEGATE = {
    CALL_ORIGINAL: 'call_original',
    CALL_DELEGATE: 'call_delegate'
};

export const WILDCARD = '*';
