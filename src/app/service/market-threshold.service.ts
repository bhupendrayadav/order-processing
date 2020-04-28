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

  editThreshold(data: any) {
    data['updated_By'] = 'Test';

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
      return result;
    }));
    /*  return this._http.get('../../json-api/market-threshold.json').pipe(map(result => {
       return result;
     })); */
  }
}
