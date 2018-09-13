import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class UserCreateService {

  constructor(private _http: HttpClient) {}
  creteUserData(userCreateParam) {
    const _headers    =  new HttpHeaders().set('content-type', 'application/x-www-form-urlencoded');
    _headers.set('content-type', 'application/x-www-form-urlencoded');
    _headers.set('Access-Control-Allow-Origin', '*');
    const postString  =  'first_name=' + userCreateParam.first_name
      + '&last_name=' + userCreateParam.last_name
      + '&mobile=' + userCreateParam.mobile
      + '&email=' + userCreateParam.email
      + '&country=' + userCreateParam.country
      + '&assigned_country=' + userCreateParam.assigned_country
      + '&is_superuser=' + false
      + '&password=' + userCreateParam.password
      + '&access=' + userCreateParam.access
      + '&address=' + userCreateParam.address;
    return this._http.post(environment.baseApi + 'user/create', postString, {headers: _headers});
  }
  getUserAccessLevel(authorizationKey) {
    const _headers = new HttpHeaders().set('authorization', authorizationKey);
    return this._http.get(environment.baseApi + 'user/accesslevel/list', {headers: _headers});
  }

  getListData(authorizationKey, apiUrl) {
    const _headers = new HttpHeaders().set('authorization', authorizationKey);
    return this._http.get(environment.baseApi + apiUrl, {headers: _headers});
  }
}
