/* eslint-disable */
import { dasherizeToCamel, replaceObject } from '../lib';

export let angular2 = {

    global() {
        return (window.ng && window.ng.core && window.ng.platformBrowser) ? 
        {
            Component: window.ng.core.Component,
            NgModule: window.ng.core.NgModule,
            ViewChild: window.ng.core.ViewChild,
            BrowserModule: window.ng.platformBrowser.BrowserModule
        } 
        : false;
    },

    register(xcomponent, configs) {
        const { Component, NgModule, ViewChild, BrowserModule } = configs;
        // const camelCaseTag = dasherizeToCamel(xcomponent.tag);
        
        const Angular2Component = 
            Component({
                    selector: xcomponent.tag,
                    template: `
                        <div #domAccessor>
                            inside ng2 xcomponent
                        </div>
                    `
            })
            .Class({
                constructor: function() {

                },
                ngOnInit: function () {
                },
                ngAfterViewInit: function () {
                    const dom = ViewChild('domAccessor');
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
