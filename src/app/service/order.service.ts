import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { of, Observable, throwError, Subject } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  private subject = new Subject<any>();

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

  constructor(private http: HttpClient) {}

  sendOrderNumber(orderSearch: any) {
    this.subject.next(orderSearch);
  }

  getOrderNumber(): Observable<any> {
    return this.subject.asObservable();
  }

  orderSearch() {
    return this.http
      .get<any>("../../json-api/order-list.json")
      .pipe(catchError(this.handleError));
  }

  getOrderList(): Observable<any> {
    return this.http
      .get<any>("../../json-api/order-list.json")
      .pipe(catchError(this.handleError));
  }

  orderDetail(orderId: number) {
    return this.http
      .get<any>(`../../json-api/order-detail.json?orderId=${orderId}`)
      .pipe(catchError(this.handleError));
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
