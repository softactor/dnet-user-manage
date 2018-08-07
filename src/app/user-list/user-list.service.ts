import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class UserListService {

  constructor(private _http: HttpClient) { }
  getData() {
    return this._http.get(environment.baseApi + 'user/list/');
  }

  deleteUserData(userDeleteParam) {
    const _headers = new HttpHeaders().set('authorization', userDeleteParam.authorizationKey);
    return this._http.delete(environment.baseApi + 'user/delete/' + userDeleteParam.userId, {headers: _headers});
  }

}
