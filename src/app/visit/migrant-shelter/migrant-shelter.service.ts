import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable()
export class MigrantShelterService {

  constructor(
    private _http: HttpClient) { }
  // get list
  getListData(authorizationKey) {
    const _headers = new HttpHeaders().set('authorization', authorizationKey);
    return this._http.get(environment.baseApi + 'visit/migrantshelter/list/', {headers: _headers});
  }
  create(createParam, authorizationKey) {
    const _headers    =  new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('authorization', authorizationKey);
    const postString  =  'name=' + createParam.name
      + '&address=' + createParam.address
      + '&outcome=' + createParam.outcome
      + '&no_of_bangladeshis=' + createParam.no_of_bangladeshis
      + '&remark=' + createParam.remark
      + '&type=' + createParam.type
    return this._http.post(environment.baseApi + 'visit/migrantshelter/create', postString, {headers: _headers});
  }
}
