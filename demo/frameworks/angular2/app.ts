//our root app component
import {Component, NgModule, VERSION} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import xcomponent from 'xcomponent';

@Component({
  selector: 'my-app',
  template: `
    <div>
      <h2>Hello {{name}}</h2>
    </div>
  `,
})
export class App {
  name:string;
  constructor() {
    this.name = `Angular! v${VERSION.full} and ${xcomponent.CONSTANTS.XCOMPONENT}`
  }
}

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ App ],
  bootstrap: [ App ]
})
export class AppModule {}