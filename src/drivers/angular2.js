import { replaceObject } from '../lib';
/* eslint-disable new-cap, object-shorthand */


export let angular2 = {

    global() {
        return (window.ng && window.ng.core && window.ng.platformBrowser) ? 
        {
            Component: window.ng.core.Component,
            NgModule: window.ng.core.NgModule,
            ElementRef: window.ng.core.ElementRef,
            NgZone: window.ng.core.NgZone,
            BrowserModule: window.ng.platformBrowser.BrowserModule
        } 
        : false;
    },

    register(xcomponent, { Component, NgModule, ElementRef, NgZone, BrowserModule }) {

        xcomponent.log('initializing angular2 component');
        
        function getProps(component) {
            return replaceObject(component.props, (value, key, fullKey) => {
                if (typeof value === 'function') {
                    return function () {
                        let result;
                        component.zone.run(() => {
                            result = value.apply(this, arguments);
                        });
                        return result;
                    };
                }
            });
        }

        const Angular2Component = 
            Component({
                selector: xcomponent.tag,
                template: `
                    <div></div>
                `,
                inputs: ['props']
            })
            .Class({
                constructor: [ElementRef, NgZone, function(elementRef, zone) { 
                    this.elementRef = elementRef;
                    this.zone = zone;
                }],
                ngOnInit: function () {
                    const targetElement = this.elementRef.nativeElement;
                    const parent = xcomponent.init(getProps(this), null, targetElement);
                    parent.render(targetElement);
                    this.parent = parent;
                },
                ngOnChanges: function() {
                    if (this.parent) {
                        this.parent.updateProps(getProps(this));
                    }
                }
            });


        const Angular2Module = NgModule({
            imports: [BrowserModule],
            declarations: [Angular2Component],
            exports: [Angular2Component]
        })
        .Class({
            constructor: function () {
                
            }
        });
        
        xcomponent.driverResults.angular2 = {
            module: Angular2Module
        };

        return xcomponent;
    }
};
