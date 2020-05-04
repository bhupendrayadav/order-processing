import { Observable } from "rxjs";
import { OktaAuthService } from "@okta/okta-angular";
import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { throwError } from "rxjs";
import {
  map,
  catchError,
  tap,
  retryWhen,
  take,
  delay,
  finalize,
} from "rxjs/operators";
import {
  HttpStateService,
  HttpProgressState,
} from "../service/http-state.service";

@Injectable({
  providedIn: "root",
})
export class HttpInterceptorService {
  private exceptions: string[] = ["login"];
  constructor(
    public auth: OktaAuthService,
    private httpStateService: HttpStateService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    /**
     * Intercepts all requests
     * - in case of an error (network errors included) it repeats a request 3 times
     * - all other error can be handled an error specific case
     * and redirects into specific error pages if necessary
     *
     * There is an exception list for specific URL patterns that we don't want the application to act
     * automatically
     *
     * The interceptor also reports back to the httpStateService when a certain requests started and ended
     */

    if (
      !this.exceptions.every((term: string) => request.url.indexOf(term) === -1)
    ) {
      return next.handle(request).pipe(
        tap(
          (response: any) => {},
          (error) => {}
        )
      );
    }
    const accessToken = this.auth.getAccessToken();
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    this.httpStateService.state.next({
      url: request.url,
      state: HttpProgressState.start,
    });

    return next.handle(request).pipe(
      map((event) => {
        return event;
      }),
      catchError((err) => {
        if (err.status === 401) {
          console.log("err.status === 401", err.error.message);
        } else if (err.status === 451) {
          console.log("err.status === 451", err.error.message);
        } else {
          console.log("err.status", err.error.message);
        }
        console.error(err);
        return throwError(err);
      }),
      finalize(() => {
        this.httpStateService.state.next({
          url: request.url,
          state: HttpProgressState.end,
        });
      })
    );
  }
}
