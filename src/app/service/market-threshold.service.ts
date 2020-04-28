import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AppHttpService } from '../utils/app-http.service';

@Injectable({
  providedIn: 'root'
})
export class MarketThresholdService {

  constructor(private _http: AppHttpService) { }

  addThreshold(data: any) {
    return this._http.post('api/marketthresholdvalues', data);
  }

  editThreshold(data: any, threshold: any) {
    data['mkt_Val_Threshold_Id'] = threshold.mkt_Val_Threshold_Id;
    data['updated_By'] = 'Test';
    data['created_By'] = threshold.created_By;
    data['repdel_Incl'] = threshold.repdel_Incl;
    data['client'] = threshold.client;

    return this._http.put('api/marketthresholdvalues', data);
  }

  deleteThresholdByID(id: number) {
    return this._http.delete('api/marketthresholdvalues/' + id);
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
      return result.data;
    }));
    /*  return this._http.get('../../json-api/market-threshold.json').pipe(map(result => {
       return result;
     })); */
  }
}
