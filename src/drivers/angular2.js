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

    register(xcomponent, { Component, NgModule, BrowserModule, ElementRef, NgZone, EventEmitter }) {
        
        // TODO: workout if looseProps is possible
        if (xcomponent.looseProps) {
            xcomponent.logWarning('Angular driver does not yet support looseProps components');
            xcomponent.driverOutput = { };
            return xcomponent;
        }
        
        const getBindingMetadata = () => {
            const inputs = [];
            for (let key of Object.keys(xcomponent.props)) {
                inputs.push(key);
            }
            return { inputs };
        };

        const bindingMetadata = getBindingMetadata();

        function getProps(component) {
            return bindingMetadata.inputs.reduce((accumulator, propKey) => {
                const addition = { };
                if (!component.hasOwnProperty(propKey)) {
                    return accumulator;
                }
                const prop = component[propKey];
                if (typeof prop === 'function') {
                    addition[propKey] = function () {
                        let self = this;
                        let args = arguments;
                        let retValue;
                        component.zone.run(() => {
                            retValue = prop.apply(self, args);
                        });
                        return retValue;
                    };
                } else {
                    addition[propKey] = prop;
                }
                return Object.assign({}, accumulator, addition);
            }, {});
        }


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
                    this.elementRef = elementRef;
                    this.zone = zone;
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
        
        // TODO: workout how to expose Angular2Module in umd mode        
        xcomponent.driverOutput = {
            module: Angular2Module
        };

        return xcomponent;
    }
};
