
import { values } from './util';

export const CONSTANTS = {

    CONTEXT: {
        IFRAME: 'xcomponent_context_iframe',
        POPUP: 'xcomponent_context_popup'
    },

    POST_MESSAGE: {
        INIT: 'xcomponent_init',
        PROPS: 'xcomponent_props',
        PROP_CALLBACK: 'xcomponent_prop_callback',
        CLOSE: 'xcomponent_close',
        FOCUS: 'xcomponent_focus',
        REDIRECT: 'xcomponent_redirect',
        RESIZE: 'xcomponent_resize',
        RENDER: 'xcomponent_render'
    }
}

export const PROP_TYPES = {
    STRING: 'string',
    OBJECT: 'object',
    FUNCTION: 'function',
    BOOLEAN: 'boolean',
    NUMBER: 'number'
};

export let PROP_TYPES_LIST = values(PROP_TYPES);

export const CONTEXT_TYPES = {
    IFRAME: 'iframe',
    LIGHTBOX: 'lightbox',
    POPUP: 'popup'
};

export let CONTEXT_TYPES_LIST = values(CONTEXT_TYPES);