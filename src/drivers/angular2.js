import { omit, replaceObject } from '../lib';
import { CONTEXT_TYPES } from './../constants';

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

    register(xcomponent, { Component, NgModule, ElementRef, NgZone, BrowserModule }, isRegisteredAutomatically = false) {
        
        try {
            xcomponent.validateRenderContext(CONTEXT_TYPES.IFRAME);
        } 
        catch (error) {
            if (!isRegisteredAutomatically) {
                throw error;
            } else {
                xcomponent.log('skipping initializing angular2 component as IFrame is not supported context');
            }
            return xcomponent;
        }

        xcomponent.log('initializing angular2 component');
        
        const getBindingMetadata = () => {
            const inputs = [];
            if (xcomponent.looseProps) {
                inputs.push('props');
            } else {
                for (let key of Object.keys(xcomponent.props)) {
                    inputs.push(key);
                }
            }
            return { inputs };
        };


        function getProps(component) {
            const props = component.props || omit(component, ['$xContext']);
            return replaceObject(props, (value, key, fullKey) => {
                if (typeof value === 'function') {
                    return function () {
                        let result;
                        component.$xContext.zone.run(() => {
                            result = value.apply(this, arguments);
                        });
                        return result;
                    };
                }
            });
        }

        const bindingMetadata = getBindingMetadata();

        const Angular2Component = 
            Component({
                selector: xcomponent.tag,
                template: `
                    <div></div>
                `,
                inputs: bindingMetadata.inputs
            })
            .Class({
                constructor: [ElementRef, NgZone, function(elementRef, zone) { 
                    this.$xContext = {
                        elementRef,
                        zone
                    };
                }],
                ngOnInit: function () {
                    const targetElement = this.$xContext.elementRef.nativeElement;
                    const parent = xcomponent.init(getProps(this), null, targetElement);
                    parent.render(targetElement);
                    this.$xContext.parent = parent;
                },
                ngOnChanges: function() {
                    if (this.$xContext.parent) {
                        this.$xContext.parent.updateProps(getProps(this));
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
