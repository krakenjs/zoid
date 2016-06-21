
import { values } from './lib';

export const XCOMPONENT = 'xcomponent';

export const CONTEXT = {
    IFRAME: 'xcomponent_context_iframe',
    POPUP: 'xcomponent_context_popup'
};

export const POST_MESSAGE = {
    INIT: 'xcomponent_init',
    PROPS: 'xcomponent_props',
    PROP_CALLBACK: 'xcomponent_prop_callback',
    CLOSE: 'xcomponent_close',
    REDIRECT: 'xcomponent_redirect',
    RESIZE: 'xcomponent_resize',
    RENDER: 'xcomponent_render',
    ERROR: 'xcomponent_error'
};

export const PROP_TYPES = {
    STRING: 'string',
    OBJECT: 'object',
    FUNCTION: 'function',
    BOOLEAN: 'boolean',
    NUMBER: 'number'
};

export const PROP_TYPES_LIST = values(PROP_TYPES);

export const CONTEXT_TYPES = {
    IFRAME: 'iframe',
    LIGHTBOX: 'lightbox',
    POPUP: 'popup'
};

export const CONTEXT_TYPES_LIST = values(CONTEXT_TYPES);

export const MAX_Z_INDEX = 2147483647;