import { replaceObject } from '../lib';
/* eslint-disable new-cap, object-shorthand */


export let angular2 = {

    global() {
        return false;
    },

    register(xcomponent, { Component, NgModule, ElementRef, NgZone }) {

        xcomponent.log('initializing angular2 component');
        
        function getProps(component) {
            return replaceObject(component.props, (value, key, fullKey) => {
                if (typeof value === 'function') {
                    return function () {
                        return component.zone.run(() => value.apply(this, arguments));
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
            declarations: [Angular2Component],
            exports: [Angular2Component]
        })
        .Class({
            constructor: function () {
                
            }
        });

        return Angular2Module;
    }
};
