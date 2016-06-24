
import { values } from './lib';

export const XCOMPONENT = `xcomponent`;

export const CONTEXT = {
    IFRAME: `${XCOMPONENT}_context_iframe`,
    POPUP: `${XCOMPONENT}_context_popup`
};

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
    OVERLAY: `${XCOMPONENT}-overlay`,
    ELEMENT: `${XCOMPONENT}-element`
};

export const CONTEXT_TYPES_LIST = values(CONTEXT_TYPES);

export const MAX_Z_INDEX = 2147483647;