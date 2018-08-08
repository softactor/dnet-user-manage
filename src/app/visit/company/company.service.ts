import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class CompanyService {

  constructor(private _http: HttpClient) { }
  // get company list
  getCompanyListData(authorizationKey) {
    const _headers = new HttpHeaders().set('authorization', authorizationKey);
    return this._http.get(environment.baseApi + 'visit/company/list/', {headers: _headers});
  }
}
