import postRobot from 'post-robot/src';
import { Component } from './component';

export function create(options) {
    return new Component(options);
}

export * from './error';

import * as CONSTANTS from './constants';

module.exports.CONSTANTS = CONSTANTS;

module.exports.postRobot = postRobot;
export default module.exports;