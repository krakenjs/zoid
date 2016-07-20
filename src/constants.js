
import { values } from './lib';

export const XCOMPONENT = `xcomponent`;

export const POST_MESSAGE = {
    INIT: `${XCOMPONENT}_init`,
    PROPS: `${XCOMPONENT}_props`,
    PROP_CALLBACK: `${XCOMPONENT}_prop_callback`,
    CLOSE: `${XCOMPONENT}_close`,
    REDIRECT: `${XCOMPONENT}_redirect`,
    RESIZE: `${XCOMPONENT}_resize`,
    RENDER: `${XCOMPONENT}_render`,
    ERROR: `${XCOMPONENT}_error`
};

export const PROP_TYPES = {
    STRING: `string`,
    OBJECT: `object`,
    FUNCTION: `function`,
    BOOLEAN: `boolean`,
    NUMBER: `number`
};

export const PROP_TYPES_LIST = values(PROP_TYPES);

export const CONTEXT_TYPES = {
    IFRAME: `iframe`,
    LIGHTBOX: `lightbox`,
    POPUP: `popup`
};

export const CLASS_NAMES = {
    XCOMPONENT: `${XCOMPONENT}`,
    COMPONENT: `${XCOMPONENT}-component`,
    CLOSE: `${XCOMPONENT}-close`,
    FOCUS: `${XCOMPONENT}-focus`,
    ELEMENT: `${XCOMPONENT}-element`,
    IFRAME: `${XCOMPONENT}-iframe`,
    LIGHTBOX: `${XCOMPONENT}-lightbox`,
    POPUP: `${XCOMPONENT}-popup`
};

export const EVENT_NAMES = {
    CLICK: 'click'
};

export const CONTEXT_TYPES_LIST = values(CONTEXT_TYPES);

export const MAX_Z_INDEX = 2147483647;

export const PROP_DEFER_TO_URL = `xcomponent_prop_defer_to_url`;