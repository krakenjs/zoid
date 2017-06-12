//our root app component
import {Component, NgModule, VERSION, ElementRef} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

declare const xcomponent:any;
declare const MyLoginXComponent:any;
const MyLoginXComponentInfo = MyLoginXComponent
  .driver('angular2', { Component, NgModule, ElementRef ,BrowserModule})
  .driverResults;


@Component({
  selector: 'my-app',
  template: `
    <div>
      <h2>Hello {{name}}</h2>
      <my-login-component></my-login-component>
    </div>
  `,
})
export class App {
  name:string;
  constructor() {
    this.name = `Angular! v${VERSION.full} and ${xcomponent.CONSTANTS.XCOMPONENT}`;
  }
}

@NgModule({
  imports: [ BrowserModule, MyLoginXComponentInfo.module ],
  declarations: [ App ],
  bootstrap: [ App ]
})
export class AppModule {
  constructor () {
  }
}