import {Component, NgModule, VERSION, ElementRef, NgZone, EventEmitter, NO_ERRORS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { AppComponent } from './app-component';

declare const xcomponent:any;
declare const MyLoginXComponent:any;

const MyLoginXComponentModule = MyLoginXComponent
  .driver('angular2', { Component, NgModule, ElementRef, BrowserModule, NgZone, EventEmitter})
  .driverOutput
  .module;

@NgModule({
  imports: [ BrowserModule, MyLoginXComponentModule ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor () {
  }
}