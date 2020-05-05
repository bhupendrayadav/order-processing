import { Injectable } from "@angular/core";
import { Guid } from "guid-typescript";
import { catchError, map } from "rxjs/operators";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError, Subject, Observable } from "rxjs";

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

  deleteCoverSheet(record: any) {
    return this.http
      .request("delete", this.coverSheetEndPoint, {
        body: record,
        responseType: "text",
      })
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
      .get<any>(
        "https://tph-productsservice.azurewebsites.net/api/products/productgroups"
      )
      .pipe(catchError(this.handleError));
  }

  createCoverSheet(data: any) {
    const headers = {
      Created: `${new Date()}`,
      BodId: `${Guid.create()}`,
      "Access-Control-Allow-Origin": "*",
    };
    const body = data;
    return this.http
      .post(this.coverSheetEndPoint, body, {
        headers: {},
        responseType: "text",
      })
      .pipe(catchError(this.handleError));
  }

  editCoverSheet(data: any) {
    const headers = {
      Created: `${new Date()}`,
      BodId: `${data.coversheetID}`,
      "Access-Control-Allow-Origin": "*",
    };
    const body = data;
    return this.http
      .put(this.coverSheetEndPoint, body, {
        headers: headers,
        responseType: "text",
      })
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
