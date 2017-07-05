
import { Component } from './component';

export function create(options) {
    return new Component(options);
}

export { getCurrentScriptDir } from './lib';

export { getByTag, destroyAll } from './component';

import * as _postRobot from 'post-robot/src';
export let postRobot = _postRobot;

export * from './error';

import * as _CONSTANTS from './constants';

export const CONSTANTS = _CONSTANTS;
