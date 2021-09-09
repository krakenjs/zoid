/* @flow */
/* eslint new-cap: 0 */

import { replaceObject } from 'belter/src';

import type { ComponentDriverType } from '../component';
import { CONTEXT } from '../constants';

type Angular2Injection = {||};

type Angular2Component = {||};

type Angular2Module = {| annotations : Object, name : string |};

type Angular2 = {|
    Component : ({| selector : string, template : string, inputs : $ReadOnlyArray<string> |}) => {|
        Class : ({| constructor : $ReadOnlyArray<Angular2Injection | Function>, ngOnInit : () => void, ngDoCheck : () => void |}) => Angular2Component
    |},
    NgModule : ({| declarations : $ReadOnlyArray<*>, exports : $ReadOnlyArray<*> |}) => {|
        Class : ({| constructor : () => void |}) => Angular2Module
    |},
    ElementRef : Angular2Injection,
    NgZone : Angular2Injection,
    Inject : Function
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

export const angular2 : ComponentDriverType<*, Angular2, Angular2Module, *, *> = {

    register: (tag, propsDef, init, { Component : AngularComponent, NgModule, ElementRef, NgZone, Inject }) => {
        class ComponentInstance {
            elementRef : Object;
            internalProps : Object;
            parent : Object;
            props : Object;
            zone : Object;
            _props : Object;

            static annotations : $ReadOnlyArray<*>;
            static parameters : $ReadOnlyArray<*>;

            constructor (elementRef, zone) {
                this._props = {};
                this.elementRef = elementRef;
                this.zone = zone;
            }

            getProps () : Object {
                return replaceObject({ ...this.internalProps, ...this.props }, item => {
                    if (typeof item === 'function') {
                        const { zone } = this;
                        return function angular2Wrapped() : void {
                            // $FlowFixMe
                            return zone.run(() => item.apply(this, arguments));
                        };
                    }
                    return item;
                });
            }

            ngOnInit() {
                const targetElement = this.elementRef.nativeElement;
                this.parent = init(this.getProps());
                this.parent.render(targetElement, CONTEXT.IFRAME);
            }

            ngDoCheck() {
                if (this.parent && !equals(this._props, this.props)) {
                    this._props = { ...this.props };
                    this.parent.updateProps(this.getProps());
                }
            }
        }

        ComponentInstance.parameters = [
            [ new Inject(ElementRef) ],
            [ new Inject(NgZone) ]
        ];

        ComponentInstance.annotations = [
            new AngularComponent({
                selector: tag,
                template: `<div></div>`,
                inputs:   [ 'props' ]
            })
        ];

        class ModuleInstance {
            static annotations : $ReadOnlyArray<*>;
        }

        ModuleInstance.annotations = [
            new NgModule({
                declarations: [ ComponentInstance ],
                exports:      [ ComponentInstance ]
            })
        ];

        return ModuleInstance;
    }
};
