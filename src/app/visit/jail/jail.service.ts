import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable()
export class JailService {

  constructor(
    private _http: HttpClient) { }
  // get list
  getListData(authorizationKey) {
    const _headers = new HttpHeaders().set('authorization', authorizationKey);
    return this._http.get(environment.baseApi + 'visit/jail/list/', {headers: _headers});
  }
  create(createParam, authorizationKey) {
    const _headers    =  new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('authorization', authorizationKey);
    const postString  =  'name=' + createParam.name
      + '&address=' + createParam.address
      + '&outcome=' + createParam.outcome
    return this._http.post(environment.baseApi + 'visit/jail/create', postString, {headers: _headers});
  }
  delete(deleteParam) {
    const _headers = new HttpHeaders().set('authorization', deleteParam.authorizationKey);
    return this._http.delete(environment.baseApi + 'visit/jail/delete/' + deleteParam.id, {headers: _headers});
  }
  getDetailsById(detailsParam) {
    const _headers = new HttpHeaders().set('authorization', detailsParam.authorizationKey);
    return this._http.get(environment.baseApi + 'visit/jail/details/' + detailsParam.editId, {headers: _headers});
  }
  update(updateParam) {
    const _headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('authorization', updateParam.authorization)
    ;
    const postString = 'name=' + updateParam.name
      + '&address=' + updateParam.address
      + '&outcome=' + updateParam.outcome
      + '&no_of_bangladeshis=' + updateParam.no_of_bangladeshis
      + '&type=' + updateParam.type
      + '&authorization=' + updateParam.authorization;
    return this._http.put(
      environment.baseApi + 'visit/jail/update/' + updateParam.editId,
      postString,
      {
        headers: _headers
      }
    );
  }
}
