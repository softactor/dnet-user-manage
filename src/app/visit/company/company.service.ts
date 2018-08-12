import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class CompanyService {

  constructor(
    private _http: HttpClient) { }
  // get company list
  getCompanyListData(authorizationKey) {
    const _headers = new HttpHeaders().set('authorization', authorizationKey);
    return this._http.get(environment.baseApi + 'visit/company/list/', {headers: _headers});
  }

  create(createParam, authorizationKey) {
    const _headers    =  new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('authorization', authorizationKey);
    const postString  =  'name=' + createParam.name
      + '&address=' + createParam.address
      + '&outcome=' + createParam.outcome
    return this._http.post(environment.baseApi + 'visit/company/create', postString, {headers: _headers});
  }
  getCompanyDetailsById(detailsParam) {
    const _headers = new HttpHeaders().set('authorization', detailsParam.authorizationKey);
    return this._http.get(environment.baseApi + 'visit/company/details/' + detailsParam.editCompanyId, {headers: _headers});
  }
  updateCompanyData(companyUpdateParam) {
    const _headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('authorization', companyUpdateParam.authorization)
    ;
    const postString = 'name=' + companyUpdateParam.name
      + '&address=' + companyUpdateParam.address
      + '&outcome=' + companyUpdateParam.outcome
      + '&authorization=' + companyUpdateParam.authorization;
    return this._http.put(
      environment.baseApi + 'visit/company/update/' + companyUpdateParam.editCompanyId,
      postString,
      {
        headers: _headers
        }
      );
  }

  deleteCompany(companyDeleteParam) {
    const _headers = new HttpHeaders().set('authorization', companyDeleteParam.authorizationKey);
    return this._http.delete(environment.baseApi + 'visit/company/delete/' + companyDeleteParam.companyId, {headers: _headers});
  }
}
