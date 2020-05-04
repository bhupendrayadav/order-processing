import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CoverSheetService {
  private coverSheetEndPoint =
    "https://servicelinkcoversheetserviceapi.azurewebsites.net/api/ServiceLink/CoverSheet/CoverSheetService";

  constructor(private http: HttpClient) {}

  getCoverSheets() {
    return this.http
      .get<any[]>(this.coverSheetEndPoint)
      .pipe(catchError(this.handleError));
  }

  deleteCoverSheet(id: string) {
    return this.http
    .delete<any>(this.coverSheetEndPoint)
    .pipe(catchError(this.handleError));
  }

  getClients() {
    return this.http
      .get<any>(
        "https://servicelinkclientserviceapi.azurewebsites.net/api/ServiceLink/ClientService/ClientService"
      )
      .pipe(catchError(this.handleError));
  }

  getProducts() {
    return this.http
      .get<any>("assets/cover-sheet-product.json")
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage: string = "";
    if (err.error instanceof ErrorEvent) {
      //A client-side or network error occured
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      //The backend return an unsuccessful response code.
      errorMessage = `Server returned code: ${err.status}, error message is ${err.message}`;
    }

    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
