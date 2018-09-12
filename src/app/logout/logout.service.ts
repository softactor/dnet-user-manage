import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class LogoutService {
  constructor(private _http: HttpClient) {
  }
  userLogout(userLogoutParam){
    const _headers = new HttpHeaders().set('authorization', userLogoutParam.authorizationKey);
    return this._http.get(environment.baseApi + 'user/logout', {headers: _headers});
  }
}
