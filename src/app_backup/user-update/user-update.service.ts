import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class UserUpdateService {

  constructor(private _http: HttpClient) {
  }

  updateUserData(userUpdateParam) {
    const _headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('authorization', userUpdateParam.authorization)
      ;
    const postString = 'first_name=' + userUpdateParam.first_name
      + '&last_name=' + userUpdateParam.last_name
      + '&country=' + userUpdateParam.country
      + '&assigned_country=' + userUpdateParam.assigned_country
      + '&is_superuser=' + false
      + '&mobile=' + userUpdateParam.mobile
      + '&address=' + userUpdateParam.address
      + '&access=' + userUpdateParam.access
      + '&authorization=' + userUpdateParam.authorization;
    return this._http.put(environment.baseApi + 'user/edit/' + userUpdateParam.editUserId, postString, {headers: _headers});
  }
  getUserDetailsById(detailsParam) {
    const _headers = new HttpHeaders().set('authorization', detailsParam.authorizationKey);
    return this._http.get(environment.baseApi + 'user/details/' + detailsParam.editUserId, {headers: _headers});
  }

  getUserAccessLevel(authorizationKey) {
    const _headers = new HttpHeaders().set('authorization', authorizationKey);
    return this._http.get(environment.baseApi + 'user/accesslevel/list', {headers: _headers});
  }

}
