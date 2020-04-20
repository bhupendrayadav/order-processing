import { Component } from "@angular/core";
import { OktaAuthService } from "@okta/okta-angular";

@Component({
  selector: "app-login-logout",
  template: `
    <button class="btn btn-light" *ngIf="!isAuthenticated" (click)="login()">
      Login
    </button>
    <button class="btn btn-light" *ngIf="isAuthenticated" (click)="logout()">
      Logout
    </button>
  `
})
export class LoginLogoutButtonComponent {
  isAuthenticated: boolean;

  constructor(public oktaAuth: OktaAuthService) {
    // Subscribe to authentication state changes
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean) => (this.isAuthenticated = isAuthenticated)
    );
  }

  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
  }

  login() {
    this.oktaAuth.loginRedirect("/order-list");
  }

  logout() {
    this.oktaAuth.logout();
  }
}
