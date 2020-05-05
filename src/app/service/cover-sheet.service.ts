import { Injectable } from "@angular/core";
import { Guid } from "guid-typescript";
import { catchError, map } from "rxjs/operators";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CoverSheetService {
  constructor(private http: HttpClient) {}

  getCoverSheets(): any[] {
    return [
      {
        coversheetID: "62684dae-5ec4-499a-8187-6b8edf639f99",
        clientID: "2322",
        clientName: "Wells fargo bank, N.A. - 138028",
        reportType: "Piechart",
        productID: "245",
        productName: "abc products",
      },
      {
        coversheetID: "82684rae-5ec4-4999-8187-6b8ed4e4r39f22",
        clientID: "2322",
        clientName: "Wells fargo bank, N.A. - 138035",
        reportType: "OC coversheet CU",
        productID: "245",
        productName: "1004 Corrections",
      },
    ];
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
      // "Content-Type": "text/plain; charset=utf-8",
    };
    const body = data;
    return this.http
      .post(
        "https://servicelinkcoversheetserviceapi.azurewebsites.net/api/ServiceLink/CoverSheet/CoverSheetService",
        body,
        { headers: headers, responseType: "text" }
        // { responseType: "text" }
      )
      .pipe(
        // map((item) => item.text()),
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessgae = "";
    if (err.error instanceof ErrorEvent) {
      //A client-side or network error occured
      errorMessgae = `An error occurred: ${err.error.message}`;
    } else {
      //The backend return an unsuccessful response code.
      errorMessgae = `Server returned code: ${err.status}, error message is ${err.message}`;
    }

    console.error(errorMessgae);
    return throwError(errorMessgae);
  }
}
