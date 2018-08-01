import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable()
export class LoginService {

  constructor(private _http: HttpClient) { }
  postLoginData() {
    var loginParam  = {
      username : 'mamunur.rashid@dnet.org.bd',
      password : 'a'
    };
    return this._http.post('http://labourattache.com.bd/api/user/login/', loginParam);
  }

}
