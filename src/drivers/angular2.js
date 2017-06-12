/* eslint-disable */
import { dasherizeToCamel, replaceObject } from '../lib';

export let angular2 = {

    global() {
        return (window.ng && window.ng.core && window.ng.platformBrowser) ? 
        {
            Component: window.ng.core.Component,
            NgModule: window.ng.core.NgModule,
            ElementRef: window.ng.core.ElementRef,
            BrowserModule: window.ng.platformBrowser.BrowserModule
        } 
        : false;
    },

    register(xcomponent, configs) {
        const { Component, NgModule, BrowserModule, ElementRef } = configs;
        // const camelCaseTag = dasherizeToCamel(xcomponent.tag);
        
        const Angular2Component = 
            Component({
                    selector: xcomponent.tag,
                    template: `
                        <div></div>
                    `
            })
            .Class({
                constructor: [ElementRef, function(elementRef) {
                    const parent = xcomponent.init({}, null, elementRef.nativeElement);
                    parent.render(elementRef.nativeElement);
                }],
                ngOnInit: function () {

                }
            });


        const Angular2Module = NgModule({
            imports: [BrowserModule],
            declarations: [Angular2Component],
            exports: [Angular2Component]
        })
        .Class({
            constructor: function () {

            },
        });

        xcomponent.driverResults = {
            module: Angular2Module
        };

        return xcomponent;
    }
};
