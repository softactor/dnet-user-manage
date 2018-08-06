import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class UserListService {

  constructor(private _http: HttpClient) { }
  getData() {
    return this._http.get('http://192.168.3.70:8000/api/user/list/');
  }

  deleteUserData(userDeleteParam) {
    const _headers = new HttpHeaders().set('authorization', userDeleteParam.authorizationKey);
    return this._http.delete('http://192.168.3.70:8000/api/user/delete/' + userDeleteParam.userId, {headers: _headers});
  }

}
