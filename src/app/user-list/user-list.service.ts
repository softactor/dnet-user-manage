import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable()
export class UserListService {

  constructor(private _http: HttpClient) { }
  getData() {
    return this._http.get('http://labourattache.com.bd/api/user/list/');
  }

}
