import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";

function covertToQueryString(obj: Object): string {
  return Object.keys(obj)
    .filter((key) => obj[key])
    .map((key) => key + "=" + obj[key])
    .join("&");
}

@Injectable({
  providedIn: "root",
})
export class ClientConfigService {
  private clientConfigEndPoint =
    "https://servicelinkclientserviceapi.azurewebsites.net/api/ServiceLink/ClientService/ClientService";

  constructor(private http: HttpClient) {}
  searchClient(data: Object): Observable<any> {
    const query: string = covertToQueryString(data);
    const endPoint = `${this.clientConfigEndPoint}/ClientSearch?${query}`;

    return this.http
      .get(endPoint, {
        headers: {},
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage: string = "";
    if (err.error instanceof ErrorEvent) {
      //A client-side or network error occurred
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      //The backend return an unsuccessful response code.
      errorMessage = `Server returned code: ${err.status}, error message is ${err.message}`;
    }

    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
