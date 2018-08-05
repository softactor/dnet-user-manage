import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class LogoutService {
  constructor(private _http: HttpClient) {
  }
  userLogout(userLogoutParam){
    const _headers = new HttpHeaders().set('authorization', userLogoutParam.authorizationKey);
    return this._http.get('http://192.168.3.70:8000/api/user/logout', {headers: _headers});
  }
}
