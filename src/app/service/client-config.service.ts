import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

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
  private clientBaseUrl =
    'https://servicelinkclientserviceapi.azurewebsites.net/api/ServiceLink/ClientService/ClientService';

  constructor(private http: HttpClient) {}
  searchClient(data: Object) {
    const query = covertToQueryString(data);
    return this.http
      .get(`${this.clientBaseUrl}/ClientSearch?${query}`, { headers: {} })
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

  addNewConfigClient(data: Object) {
    const query = covertToQueryString(data);
    return this.http
      .post(`${this.clientBaseUrl}/AddClientConfig?${query}`,{body:data},{ headers: {} })
      .pipe(catchError(this.handleError));
  }

}
