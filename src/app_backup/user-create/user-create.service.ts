import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class UserCreateService {

  constructor(private _http: HttpClient) {}
  creteUserData(postString, authorizationKey) {
    const _headers    =  new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('authorization', authorizationKey);
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
