import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class MonthWiseViewService {
  tableListData;
  monthWiseDataInint;
  monthWiseData;
  feedbackData: any;
  constructor(
    private _http: HttpClient) { }

  getComponetListData(ComponentlistParam, authorizationKey) {
    const feedbackDataArray = [];
    for (const apiData of ComponentlistParam){
      const _headers = new HttpHeaders().set('authorization', authorizationKey);
      this._http.get(environment.baseApi + apiData.api, {headers: _headers}).subscribe( response => {
        this.tableListData = response;
        const tempData  = {
          component: apiData.component,
          apiData: this.tableListData.results
        };
        feedbackDataArray.push(tempData);
      });
    }
    return feedbackDataArray;
  };
}
