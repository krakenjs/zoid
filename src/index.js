/* @flow */

import typeof { PopupOpenError } from 'belter/src';

import type { CreateZoidComponent } from './component';
// eslint-disable-next-line no-duplicate-imports
import typeof { destroy, destroyComponents, destroyAll } from './component';
import typeof { PROP_TYPE, PROP_SERIALIZATION, CONTEXT, EVENT } from './constants';

export { PopupOpenError } from 'belter/src';

export type { ZoidComponent, ZoidComponentInstance, ZoidProps } from './component';
export type { RenderOptionsType } from './parent';

export { create, destroy, destroyComponents, destroyAll } from './component';
export { PROP_TYPE, PROP_SERIALIZATION, CONTEXT, EVENT } from './constants';

export type Zoid = {|
    create : CreateZoidComponent,
    destroy : destroy,
    destroyComponents : destroyComponents,
    destroyAll : destroyAll,
    PROP_TYPE : PROP_TYPE,
    PROP_SERIALIZATION : PROP_SERIALIZATION,
    CONTEXT : CONTEXT,
    EVENT : EVENT,
    PopupOpenError : PopupOpenError
|};
