/* eslint-disable new-cap, object-shorthand */

export let angular2 = {

    global() {
        return (window.ng && window.ng.core && window.ng.platformBrowser) ? 
        {
            Component: window.ng.core.Component,
            NgModule: window.ng.core.NgModule,
            ElementRef: window.ng.core.ElementRef,
            BrowserModule: window.ng.platformBrowser.BrowserModule,
            NgZone: window.ng.core.NgZone,
            EventEmitter:  window.ng.core.EventEmitter
        } 
        : false;
    },

    register(xcomponent, configs) {
        const { Component, NgModule, BrowserModule, ElementRef, NgZone, EventEmitter } = configs;
        
        const getBindingMetadata = () => {
            const inputs = [];
            const outputs = [];
            for (let key of Object.keys(xcomponent.props)) {
                const prop = xcomponent.props[key];
                if (typeof prop.type === 'string' && prop.type.toLowerCase() === 'function') {
                    outputs.push(key);
                }
                else {
                    inputs.push(key);
                }
            }
            return { inputs, outputs };
        };

        const bindingMetadata = getBindingMetadata();

        function getProps(component) {
            const inputProps = bindingMetadata.inputs.reduce((accumulator, propKey) => {
                const addition = { };
                addition[propKey] = component[propKey];
                return Object.assign({}, accumulator, addition);
            }, {});

            const outputProps = bindingMetadata.outputs.reduce((accumulator, propKey) => {
                const addition = { };
                addition[propKey] = function () {
                    component.zone.run(() => {
                        component[propKey].emit(...arguments);
                    });
                };
                return Object.assign({}, accumulator, addition);
            }, {});
            return Object.assign({}, outputProps, inputProps);
        }


        const Angular2Component = 
            Component({
                selector: xcomponent.tag,
                template: `
                    <div></div>
                `,
                inputs: bindingMetadata.inputs,
                outputs: bindingMetadata.outputs
            })
            .Class({
                constructor: [ElementRef, NgZone, function(elementRef, zone) { 
                    this.elementRef = elementRef;
                    this.zone = zone;
                    bindingMetadata.outputs.forEach((outputKey) => {
                        this[outputKey] = new EventEmitter();
                    });
                }],
                ngOnInit: function () {
                    const parent = xcomponent.init(getProps(this), null, this.elementRef.nativeElement);
                    parent.render(this.elementRef.nativeElement);
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
        
        xcomponent.driverResults = {
            module: Angular2Module
        };

        return xcomponent;
    }
};
