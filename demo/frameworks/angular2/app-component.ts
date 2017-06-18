import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl:'./app-component.html',
})
export class AppComponent {
  
  prefilledEmail:string;
  
  email:string;
  
  constructor() {
    this.prefilledEmail = 'foo@bar.com';
  }

  public onLogin (email){
    console.log('User logged in with email:', email);
    this.email = email;
  }

}