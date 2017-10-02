/* @flow */

import { type ZalgoPromise } from 'zalgo-promise/src';

import { Component, type ComponentOptionsType } from './component';
import { ParentComponent } from './component/parent';

export function create<P>(options : ComponentOptionsType<P>) : Component<P> {
    return new Component(options);
}

export function getByTag<P>(tag : string) : Component<P> {
    return Component.getByTag(tag);
}

export { getCurrentScriptDir } from './lib';

export function destroyAll() : ZalgoPromise<void> {
    return ParentComponent.destroyAll();
}

import * as _postRobot from 'post-robot/src';
export let postRobot = _postRobot;

export * from './error';

import * as _CONSTANTS from './constants';

export const CONSTANTS = _CONSTANTS;
