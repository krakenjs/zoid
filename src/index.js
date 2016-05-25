import {Component} from './component';

let components = {};

export function create(options) {
    let component = new Component(options);
    components[component.tag] = component;
    return component;
}