
import { Component } from './component';

export function create(options) {
    return new Component(options);
}

export { getCurrentScriptDir } from './lib';

export { getByTag, destroyAll, componentTemplate, containerTemplate } from './component';

export * from './error';

import * as _CONSTANTS from './constants';

export const CONSTANTS = _CONSTANTS;
