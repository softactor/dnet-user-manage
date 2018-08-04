import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class UserCreateService {

  constructor(private _http: HttpClient) {}
  creteUserData(userCreateParam) {
    const _headers    =  new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const postString  =  'first_name=' + userCreateParam.first_name
      + '&last_name=' + userCreateParam.last_name
      + '&mobile=' + userCreateParam.mobile
      + '&email=' + userCreateParam.email
      + '&country=' + userCreateParam.country
      + '&assigned_country=' + userCreateParam.assigned_country
      + '&is_superuser=' + false
      + '&password=' + userCreateParam.password
      + '&address=' + userCreateParam.address;
    return this._http.post('http://192.168.3.70:8000/api/user/create', postString, {headers: _headers});
  }
}
