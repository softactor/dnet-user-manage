import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class LoginService {

  constructor(private _http: HttpClient) {
  }

  postLoginData(loginParam) {
    const _headers    =  new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const postString  =  'username=' + loginParam.username + '&password=' + loginParam.password;
    return this._http.post('http://192.168.3.70:8000/api/user/login', postString, {headers: _headers});
  }
}
