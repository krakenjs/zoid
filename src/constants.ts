import { WINDOW_TYPE } from 'cross-domain-utils/src';

export const ZOID = `zoid`;
export const POST_MESSAGE = {
    DELEGATE:      `${ ZOID }_delegate`,
    ALLOW_DELEGATE:`${ ZOID }_allow_delegate`
};
export const PROP_TYPE = {
    STRING:  `string`,
    OBJECT:  `object`,
    FUNCTION:`function`,
    BOOLEAN: `boolean`,
    NUMBER:  `number`,
    ARRAY:   `array`
};
export const INITIAL_PROPS = {
    RAW:'raw',
    UID:'uid'
};
export const WINDOW_REFERENCES = {
    OPENER:'opener' as const,
    PARENT:'parent' as const,
    GLOBAL:'global' as const
};
export const PROP_SERIALIZATION = {
    JSON:  'json' as const,
    DOTIFY:'dotify' as const,
    BASE64:'base64' as const
};
export const CONTEXT = WINDOW_TYPE;
export const WILDCARD = '*';
export const DEFAULT_DIMENSIONS = {
    WIDTH: '300px',
    HEIGHT:'150px'
};
export const EVENT = {
    RENDER:  'zoid-render',
    RENDERED:'zoid-rendered',
    DISPLAY: 'zoid-display',
    ERROR:   'zoid-error',
    CLOSE:   'zoid-close',
    DESTROY: 'zoid-destroy',
    PROPS:   'zoid-props',
    RESIZE:  'zoid-resize',
    FOCUS:   'zoid-focus'
};
export const METHOD = {
    GET: 'get' as const,
    POST:'post' as const
};
