/* @flow */
/* eslint new-cap: 0 */

import { replaceObject } from 'belter/src';

import type { ComponentDriverType } from '../component';
import { CONTEXT } from '../constants';

type Angular2Injection = {||};

type Angular2Component = {||};

type Angular2Module = {||};

type Angular2 = {|
    Component : ({| selector : string, template : string, inputs : $ReadOnlyArray<string> |}) => {|
        Class : ({| constructor : $ReadOnlyArray<Angular2Injection | Function>, ngOnInit : () => void, ngDoCheck : () => void |}) => Angular2Component
    |},
    NgModule : ({| declarations : $ReadOnlyArray<Angular2Component>, exports : $ReadOnlyArray<Angular2Component> |}) => {|
        Class : ({| constructor : () => void |}) => Angular2Module
    |},
    ElementRef : Angular2Injection,
    NgZone : Angular2Injection
|};

const equals = (obj1, obj2) => {
    const checked = {};

    for (const key in obj1) {
        if (obj1.hasOwnProperty(key)) {
            checked[key] = true;

            if (obj1[key] !== obj2[key]) {
                return false;
            }
        }
    }

    for (const key in obj2) {
        if (!checked[key]) {
            return false;
        }
    }

    return true;
};

export const angular2 : ComponentDriverType<*, Angular2, Angular2Module> = {

    register: (tag, propsDef, init, { Component : AngularComponent, NgModule, ElementRef, NgZone }) => {
        const getProps = (component) => {
            return replaceObject({ ...component.internalProps, ...component.props }, item => {
                if (typeof item === 'function') {
                    return function angular2Wrapped() : void {
                        // $FlowFixMe
                        return component.zone.run(() => item.apply(this, arguments));
                    };
                }
                return item;
            });
        };

        const ComponentInstance =
            AngularComponent({
                selector: tag,
                template: '<div></div>',
                inputs:   [ 'props' ]
            }).Class({
                constructor: [ ElementRef, NgZone, function angularConstructor(elementRef, zone) {
                    this._props = {};
                    this.elementRef = elementRef;
                    this.zone = zone;
                } ],
                ngOnInit () {
                    const targetElement = this.elementRef.nativeElement;
                    
                    this.parent = init(getProps(this));
                    this.parent.render(targetElement, CONTEXT.IFRAME);
                },
                ngDoCheck() {
                    if (this.parent && !equals(this._props, this.props)) {
                        this._props = { ...this.props };
                        this.parent.updateProps(getProps(this));
                    }
                }
            });


        const ModuleInstance = NgModule({
            declarations: [ ComponentInstance ],
            exports:      [ ComponentInstance ]
        }).Class({
            constructor () {
                // pass
            }
        });

        return ModuleInstance;
    }
};
