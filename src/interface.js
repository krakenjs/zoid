/* @flow */

import { type ZalgoPromise } from 'zalgo-promise/src';
// eslint-disable-next-line import/no-namespace
import * as _postRobot from 'post-robot/src';

import { Component, type ComponentOptionsType } from './component';
import { ParentComponent } from './component/parent';
// eslint-disable-next-line import/no-namespace
import * as _CONSTANTS from './constants';

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
export let postRobot = _postRobot;

export * from './error';

export const CONSTANTS = _CONSTANTS;

export type ZoidComponent<P> = Component<P>;
