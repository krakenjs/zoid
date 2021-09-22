/* eslint new-cap: 0 */
import { replaceObject } from 'belter/src';

import type { ComponentDriverType } from '../component';
import { CONTEXT } from '../constants';

type Angular2Injection = {}
type Angular2Component = {}
type Angular2Module = {}
type Angular2 = {
    Component: (arg0: {
        selector: string
        template: string
        inputs: ReadonlyArray<string>
    }) => {
        Class: (arg0: {
            constructor: ReadonlyArray<
                Angular2Injection | ((...args: Array<any>) => any)
            >
            ngOnInit: () => void
            ngDoCheck: () => void
        }) => Angular2Component
    }
    NgModule: (arg0: {
        declarations: ReadonlyArray<Angular2Component>
        exports: ReadonlyArray<Angular2Component>
    }) => {
        Class: (arg0: {constructor: () => void}) => Angular2Module
    }
    ElementRef: Angular2Injection
    NgZone: Angular2Injection
}

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

export const angular2: ComponentDriverType<
    any,
    Angular2,
    Angular2Module,
    any
> = {
    register: (
        tag,
        propsDef,
        init,
        { Component: AngularComponent, NgModule, ElementRef, NgZone }
    ) => {
        const getProps = component => {
            return replaceObject(
                { ...component.internalProps, ...component.props },
                item => {
                    if (typeof item === 'function') {
                        return function angular2Wrapped(): void {
                            // $FlowFixMe
                            return component.zone.run(() =>
                                item.apply(this, arguments));
                        };
                    }

                    return item;
                }
            );
        };

        const ComponentInstance = AngularComponent({
            selector:tag,
            template:'<div></div>',
            inputs:  [ 'props' ]
        }).Class({
            constructor: [
                ElementRef,
                NgZone,
                function angularConstructor(elementRef, zone) {
                    // $FlowFixMe[object-this-reference]
                    this._props = {};
                    // $FlowFixMe[object-this-reference]
                    this.elementRef = elementRef;
                    // $FlowFixMe[object-this-reference]
                    this.zone = zone;
                }
            ],

            ngOnInit() {
                // $FlowFixMe[object-this-reference]
                const targetElement = this.elementRef.nativeElement;
                // $FlowFixMe[object-this-reference]
                this.parent = init(getProps(this));
                // $FlowFixMe[object-this-reference]
                this.parent.render(targetElement, CONTEXT.IFRAME);
            },

            ngDoCheck() {
                // $FlowFixMe[object-this-reference]
                if (this.parent && !equals(this._props, this.props)) {
                    // $FlowFixMe[object-this-reference]
                    this._props = { ...this.props };
                    // $FlowFixMe[object-this-reference]
                    this.parent.updateProps(getProps(this));
                }
            }
        });
        const ModuleInstance = NgModule({
            declarations:[ ComponentInstance ],
            exports:     [ ComponentInstance ]
        }).Class({
            constructor() {
                // pass
            }
        });
        return ModuleInstance;
    }
};
