import * as ngCore from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { AppComponent } from './app-component';

declare const xcomponent:any;
declare const MyLoginXComponent:any;

const MyLoginXComponentModule = MyLoginXComponent.driver('angular2', ngCore);

@ngCore.NgModule({
  imports: [ BrowserModule, MyLoginXComponentModule ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor () {
  }
}