import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { of, Observable, throwError, Subject } from "rxjs";
import { catchError } from "rxjs/operators";
import { OktaAuthService } from "@okta/okta-angular";
import { Guid } from "guid-typescript";
import { environment } from "./../../environments/environment";

const BASE_URL =
  "https://servicelinkorderprocessing.azurewebsites.net/api/ServiceLink/";

async function getOktaToken(auth: any) {
  return await auth.getAccessToken();
}

@Injectable({
  providedIn: "root",
})
export class OrderService {
  private subject = new Subject<any>();
  public currentDate: any = Date();
  public id: any;

  searchResult: any = [
    [
      {
        orderNumber: 1,
        workOrder: 10098519,
        workOrderStatus: "Pending",
        borrower: "Cassidy",
        address: "144 Pitssburg",
        state: "California",
        country: "US",
        loanNumber: "3654",
        lastTask: "Completed",
      },
    ],
  ];

  constructor(
    // private https: HttpsClient,
    private http: HttpClient,
    private oktaAuth: OktaAuthService
  ) {}

  sendOrderNumber(orderSearch: any) {
    this.subject.next(orderSearch);
  }

  getOrderNumber(): Observable<any> {
    return this.subject.asObservable();
  }

  getOrderList(orderId: number): Observable<any> {
    return this.http.get(
      BASE_URL + "OrderProcessing/Orders/GetOrderSearchByID/" + orderId
    );
  }

  getOrderDetails(orderNo: number) {
    return this.http.get(
      BASE_URL + "OrderProcessing/Orders?OrderNumber=" + orderNo
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessgae = "";
    if (err.error instanceof ErrorEvent) {
      //A client-side or network error occured
      errorMessgae = `An error occured: ${err.error.message}`;
    } else {
      //The backend return an unsuccessful response code.
      errorMessgae = `Server returned code: ${err.status}, error message is ${err.message}`;
    }

    console.error(errorMessgae);
    return throwError(errorMessgae);
  }
}
