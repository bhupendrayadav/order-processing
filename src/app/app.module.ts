import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { OktaAuthModule } from "@okta/okta-angular";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { AuthInterceptor } from "./auth.interceptor";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { OrderDetailComponent } from "./order-detail/order-detail.component";
import { OrderListComponent } from "./order-list/order-list.component";
import { OrderSearchComponent } from "./order-search/order-search.component";
import { HeaderComponent } from "./header/header.component";
import { LoginLogoutButtonComponent } from "./login-logout-button.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    OrderDetailComponent,
    OrderListComponent,
    OrderSearchComponent,
    HeaderComponent,
    LoginLogoutButtonComponent
  ],
  imports: [
    BrowserModule,
    OktaAuthModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
