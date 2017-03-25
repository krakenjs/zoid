import * as _postRobot from 'post-robot/src';
import { Component } from './component';

export function create(options) {
    return new Component(options);
}

export { getByTag, destroyAll, componentTemplate, containerTemplate } from './component';

export * from './error';

import * as _CONSTANTS from './constants';

export let postRobot = _postRobot;
export const CONSTANTS = _CONSTANTS;
