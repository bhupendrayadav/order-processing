import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import appConfig from './../app.config';

export interface IRequestOptions {
  headers?: HttpHeaders;
  observe?: 'body';
  params?: HttpParams;
  responseType?: 'json';
  body?: any;
}

@Injectable({
  providedIn: 'root'
})
export class AppHttpService {

  constructor(private _http: HttpClient) { }

  public getApiUrl(url) {
    return appConfig.oidc.baseApiUrl + url;
  }

  /**
   * GET request
   * @param {string} url Service URL
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<any>}
   */
  public get(url: string, options?: IRequestOptions): Observable<any> {
    return this._http.get(this.getApiUrl(url), options);
  }

  /**
   * POST request
   * @param {string}  url Service URL
   * @param {Object} params body of the request.
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<any>}
   */
  public post(url: string, params: object, options?: IRequestOptions): Observable<any> {
    return this._http.post(this.getApiUrl(url), params, options);
  }

  /**
   * PUT request
   * @param {string} url Service URL
   * @param {Object} params body of the request.
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public put<T>(url: string, params: object, options?: IRequestOptions): Observable<any> {
    return this._http.put<T>(this.getApiUrl(url), params, options);
  }

  /**
   * PATCH request
   * @param {string} url Service URL
   * @param {Object} params body of the request.
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public patch<T>(url: string, params: object, options?: IRequestOptions): Observable<any> {
    return this._http.patch<T>(this.getApiUrl(url), params, options);
  }

  /**
   * DELETE request
   * @param {string} url Service URL
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public delete<T>(url: string, options?: IRequestOptions): Observable<any> {
    return this._http.delete<T>(this.getApiUrl(url), options);
  }

  /**
   * GET JSON
   * @param {string} url JSON File URL
   */
  public getJsonFile(url): Observable<any> {
    return this._http.get(url);
  }

}
