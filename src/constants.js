/* @flow */

import { WINDOW_TYPE } from 'cross-domain-utils/src';

export const ZOID = `zoid`;

export const __ZOID__ = `__${ ZOID }__`;

export const POST_MESSAGE = {
    DELEGATE:       `${ ZOID }_delegate`,
    ALLOW_DELEGATE: `${ ZOID }_allow_delegate`
};

export const PROP_TYPE = {
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

export const CONTEXT = WINDOW_TYPE;

export const CLASS = {
    OUTLET:            `${ ZOID }-outlet`,
    COMPONENT_FRAME:   `${ ZOID }-component-frame`,
    PRERENDER_FRAME:   `${ ZOID }-prerender-frame`,
    VISIBLE:           `${ ZOID }-visible`,
    INVISIBLE:         `${ ZOID }-invisible`
};

export const WILDCARD = '*';

export const DEFAULT_DIMENSIONS = {
    WIDTH:  '300px',
    HEIGHT: '150px'
};
