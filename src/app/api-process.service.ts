import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable()
export class ApiProcessService {

  constructor(private _http: HttpClient) {}

  getListData(authorizationKey, apiUrl) {
    const _headers = new HttpHeaders().set('authorization', authorizationKey);
    return this._http.get(environment.baseApi + apiUrl, {headers: _headers});
  }
}
