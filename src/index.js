
import { Component } from './component';

let components = {};

export function create(options) {
   let component = new Component(options);
   components[component.options.tag] = component;
   return component;
}