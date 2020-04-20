import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { OktaAuthService } from "@okta/okta-angular";
import { Observable } from "rxjs";
import { fromPromise } from "rxjs/internal/observable/fromPromise";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public auth: OktaAuthService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return fromPromise(this.handleAccess(request, next));
  }

  private async handleAccess(request: HttpRequest<any>, next: HttpHandler) {
    const accessToken = await this.auth.getAccessToken();
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return next.handle(request).toPromise();
  }
}
