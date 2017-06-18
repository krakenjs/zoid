//our root app component
import {Component, NgModule, VERSION, ElementRef, NgZone} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

declare const xcomponent:any;
declare const MyLoginXComponent:any;
const MyLoginXComponentInfo = MyLoginXComponent
  .driver('angular2', { Component, NgModule, ElementRef, BrowserModule, NgZone})
  .driverResults;


@Component({
  selector: 'my-app',
  template: `
    <div>
      <h2>Hello</h2>
      <my-login-component [prefilledEmail]="prefilledEmail"></my-login-component>
    </div>
  `,
})
export class App {
  prefilledEmail:string;
  constructor() {
    this.prefilledEmail = 'ahmed@yahoo.com';
  }
  public onLogin (){
    window.alert('logged in!');
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