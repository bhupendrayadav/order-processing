import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarketThresholdService {

  constructor(private http: HttpClient) { }

  getMarketThreshold() {
    //https://jsonplaceholder.typicode.com/todos
    return this.http
      .get<any>("../../json-api/market-threshold.json")
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
