import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class RemitFcService {
  constructor(
    private _http: HttpClient) { }

  create(createParam, authorizationKey, apiUrl) {
    const _headers    =  new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('authorization', authorizationKey);
    return this._http.post(environment.baseApi + apiUrl, createParam, {headers: _headers});
  }
  getListData(authorizationKey, apiUrl){
    const _headers = new HttpHeaders().set('authorization', authorizationKey);
    return this._http.get(environment.baseApi + apiUrl, {headers: _headers});
  }
  delete(deleteParam , apiUrl) {
    const _headers = new HttpHeaders().set('authorization', deleteParam.authorizationKey);
    return this._http.delete(environment.baseApi + apiUrl + deleteParam.id, {headers: _headers});
  }
  getDetailsById(detailsParam, apiUrl) {
    const _headers = new HttpHeaders().set('authorization', detailsParam.authorizationKey);
    return this._http.get(environment.baseApi + apiUrl + detailsParam.editId, {headers: _headers});
  }
  update(updateParam, authorizationKey, apiUrl, editId) {
    const _headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('authorization', authorizationKey)
    ;
    return this._http.put(
      environment.baseApi + apiUrl + editId,
      updateParam,
      {
        headers: _headers
      }
    );
  }
}
