import * as ngCore from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { AppComponent } from './app-component';

declare const zoid:any;
declare const MyLoginZoidComponent:any;

const MyLoginZoidComponentModule = MyLoginZoidComponent.driver('angular2', ngCore);

@ngCore.NgModule({
  imports: [ BrowserModule, MyLoginZoidComponentModule ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor () {
  }
}