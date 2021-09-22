/* @flow */

import { WINDOW_TYPE } from 'cross-domain-utils/src';

export const ZOID = `zoid`;

export const POST_MESSAGE = {
    DELEGATE:       `${ ZOID }_delegate`,
    ALLOW_DELEGATE: `${ ZOID }_allow_delegate`
};

export const PROP_TYPE = {
    STRING:   ('string' : 'string'),
    OBJECT:   ('object' : 'object'),
    FUNCTION: ('function' : 'function'),
    BOOLEAN:  ('boolean' : 'boolean'),
    NUMBER:   ('number' : 'number'),
    ARRAY:    ('array' : 'array')
};

export const WINDOW_REFERENCE = {
    OPENER: ('opener' : 'opener'),
    PARENT: ('parent' : 'parent'),
    GLOBAL: ('global' : 'global'),
    NAME:   ('name' : 'name')
};

export const PROP_SERIALIZATION = {
    JSON:   ('json' : 'json'),
    DOTIFY: ('dotify' : 'dotify'),
    BASE64: ('base64' : 'base64')
};

export const CONTEXT = WINDOW_TYPE;

export const WILDCARD = '*';

export const DEFAULT_DIMENSIONS = {
    WIDTH:  '300px',
    HEIGHT: '150px'
};

export const EVENT = {
    RENDER:   'zoid-render',
    RENDERED: 'zoid-rendered',
    DISPLAY:  'zoid-display',
    ERROR:    'zoid-error',
    CLOSE:    'zoid-close',
    DESTROY:  'zoid-destroy',
    PROPS:    'zoid-props',
    RESIZE:   'zoid-resize',
    FOCUS:    'zoid-focus'
};

export const METHOD = {
    GET:  ('get' : 'get'),
    POST: ('post' : 'post')
};
