import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AppHttpService } from '../utils/app-http.service';

@Injectable({
  providedIn: 'root'
})
export class MarketThresholdService {

  constructor(private http: HttpClient,
    private _http: AppHttpService) { }

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

  /**
   * @description Service to get Market Threshold List
   * @author Krunal
   * @date 2020-04-28
   * @param {*} payload
   * @memberof MarketThresholdService
   */
  /* getMarketThresholdList(payload) {
    return this._http.get('api/marketthresholdvalues').pipe(map(result => {
      return result;
    }));
  } */

  getMarketThresholdList(payload) {
    return this._http.get('api/marketthresholdvalues?' + payload).pipe(map(result => {
      return result;
    }));
    /*  return this._http.get('../../json-api/market-threshold.json').pipe(map(result => {
       return result;
     })); */
  }
}
