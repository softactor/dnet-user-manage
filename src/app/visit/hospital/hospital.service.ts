import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable()
export class HospitalService {

  constructor(
    private _http: HttpClient) { }
  // get list
  getListData(authorizationKey) {
    const _headers = new HttpHeaders().set('authorization', authorizationKey);
    return this._http.get(environment.baseApi + 'visit/hosptal/list/', {headers: _headers});
  }

}
