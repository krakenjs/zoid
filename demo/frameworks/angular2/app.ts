//our root app component
import {Component, NgModule, VERSION, ElementRef, NgZone, EventEmitter} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

declare const xcomponent:any;
declare const MyLoginXComponent:any;
const MyLoginXComponentInfo = MyLoginXComponent
  .driver('angular2', { Component, NgModule, ElementRef, BrowserModule, NgZone, EventEmitter})
  .driverResults;


@Component({
  selector: 'my-app',
  template: `
    <div>
      <h3>Log in on xyz.com</h3>
      <my-login-component (onLogin)="onLogin($event)" [prefilledEmail]="prefilledEmail"></my-login-component>
      <span *ngIf="email">User logged in with email: {{email}}</span>
    </div>
  `,
})
export class App {
  prefilledEmail:string;
  email:string;
  constructor() {
    this.prefilledEmail = 'ahmed@yahoo.com';
  }
  public onLogin (email){
    console.log('User logged in with email:', email);
    this.email = email;
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