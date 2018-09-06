import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class LoginService {

  constructor(private _http: HttpClient) {
  }

  postLoginData(loginParam) {
    // const _headers    =  new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const _headers    =  new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const postString  =  'username=' + loginParam.username + '&password=' + loginParam.password;
    return this._http.post(environment.baseApi + 'user/login', postString, {headers: _headers});
  }
}
