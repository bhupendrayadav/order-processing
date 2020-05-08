import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { ToastrService } from "ngx-toastr";

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
    "https://servicelinkclientserviceapi.azurewebsites.net/api/ServiceLink/ClientService/ClientService";

  constructor(private http: HttpClient, private toastr: ToastrService) {}
  searchClient(data: Object) {
    const query = covertToQueryString(data);
    return this.http
      .get(`${this.clientBaseUrl}/ClientSearch?${query}`, {
        headers: {},
      })
      .pipe(catchError(this.handleError.bind(this)));
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage: string = "";
    console.log("err", err);
    if (err.error instanceof ErrorEvent) {
      //A client-side or network error occurred
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      //The backend return an unsuccessful response code.
      errorMessage = `Server returned code: ${err.status}, error message is ${err.message}`;
    }
    this.toastr.error(err.error);
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  addNewConfigClient(data: Object) {
    return this.http
      .post(`${this.clientBaseUrl}/AddClientConfig`, data, {
        headers: {},
        responseType: "text",
      })
      .pipe(catchError(this.handleError));
  }
}
