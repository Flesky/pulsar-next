import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      login works!
    </p>
  `
})
export class LoginComponent {

  constructor(private App:AppComponent) {}

  ngOnInit() {
    this.App.redirectToKeycloakLogin;
  }


}
