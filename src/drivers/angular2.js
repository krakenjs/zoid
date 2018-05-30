/* @flow */
/* eslint new-cap: 0 */

import { replaceObject } from '../lib';
import type { Component, ComponentDriverType } from '../component/component';

type Angular2Injection = {};

type Angular2Component = {};

type Angular2Module = {};

type Angular2 = {
    Component : ({ selector : string, template : string, inputs : Array<string> }) => {
        Class : ({ constructor : Array<Angular2Injection | Function>, ngOnInit : () => void, ngOnChanges : () => void }) => Angular2Component
    },
    NgModule : ({ declarations : Array<Angular2Component>, exports : Array<Angular2Component> }) => {
        Class : ({ constructor : () => void }) => Angular2Module
    },
    ElementRef : Angular2Injection,
    NgZone : Angular2Injection
};


export let angular2 : ComponentDriverType<*, Angular2> = {

    global() {
        // pass
    },

    register(zoid : Component<*>, { Component : AngularComponent, NgModule, ElementRef, NgZone }) : Angular2Module {

        zoid.log('initializing angular2 component');

        let getProps = (component) => {
            return replaceObject({ ...component.internalProps, ...component.props }, {
                'function': (value) => {
                    if (typeof value === 'function') {
                        return function angular2Wrapped() : void {
                            return component.zone.run(() => value.apply(this, arguments));
                        };
                    }
                }
            });
        };

        const ComponentInstance =
            AngularComponent({
                selector: zoid.tag,
                template: '<div></div>',
                inputs:   [ 'props' ]
            }).Class({
                constructor: [ ElementRef, NgZone, function angularConstructor(elementRef, zone) {
                    this.elementRef = elementRef;
                    this.zone = zone;
                } ],
                ngOnInit () {
                    const targetElement = this.elementRef.nativeElement;
                    const parent = zoid.init(getProps(this), null, targetElement);
                    parent.render(targetElement);
                    this.parent = parent;
                },
                ngOnChanges() {
                    if (this.parent) {
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
