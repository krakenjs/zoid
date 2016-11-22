
import { values } from './lib';

export const XCOMPONENT = `xcomponent`;

export const POST_MESSAGE = {
    INIT: `${XCOMPONENT}_init`,
    PROPS: `${XCOMPONENT}_props`,
    PROP_CALLBACK: `${XCOMPONENT}_prop_callback`,
    CLOSE: `${XCOMPONENT}_close`,
    REDIRECT: `${XCOMPONENT}_redirect`,
    RESIZE: `${XCOMPONENT}_resize`,
    DELEGATE: `${XCOMPONENT}_delegate`,
    ERROR: `${XCOMPONENT}_error`,
    HIDE: `${XCOMPONENT}_hide`
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
    DIRECT_PARENT: `__direct_parent__`,
    PARENT_PARENT: `__parent_parent__`
};

export const PROP_TYPES_LIST = values(PROP_TYPES);

export const CONTEXT_TYPES = {
    IFRAME: `iframe`,
    LIGHTBOX: `lightbox`,
    POPUP: `popup`
};

export const CLASS_NAMES = {
    XCOMPONENT: `${XCOMPONENT}`,
    COMPONENT:  `${XCOMPONENT}-component`,
    CLOSE:      `${XCOMPONENT}-close`,
    FOCUS:      `${XCOMPONENT}-focus`,
    ELEMENT:    `${XCOMPONENT}-element`,
    IFRAME:     `${XCOMPONENT}-iframe`,
    LIGHTBOX:   `${XCOMPONENT}-lightbox`,
    POPUP:      `${XCOMPONENT}-popup`,
    LOADING:    `${XCOMPONENT}-loading`,

    SHOW_CONTAINER: `${XCOMPONENT}-show-container`,
    SHOW_COMPONENT: `${XCOMPONENT}-show-component`,
    HIDE_CONTAINER: `${XCOMPONENT}-hide-container`,
    HIDE_COMPONENT: `${XCOMPONENT}-hide-component`
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