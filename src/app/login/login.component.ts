import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { AuthenticationService } from '../authentication.service';
import { TosterService } from '../toster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginDataResponse;
  errorResponse;
  constructor(
    private router: Router,
    private _loginService: LoginService,
    private _toasterService: TosterService,
    private _authentication: AuthenticationService
  ) {
  }
  loginUser(e) {
    e.preventDefault();
    const loginParam  = {
      username : e.target.elements[0].value,
      password : e.target.elements[1].value,
    };
    this._loginService.postLoginData(loginParam).subscribe(response => {
      this.loginDataResponse  =  response;
      if (this.loginDataResponse.access_token) {
        this._authentication.access_token = this.loginDataResponse.access_token;
        this._authentication.token_type = this.loginDataResponse.token_type;
        this._authentication.setUserLoggedIn();
        localStorage.setItem('access_token', this.loginDataResponse.access_token);
        localStorage.setItem('token_type', this.loginDataResponse.token_type);
        this.router.navigate(['user-dashboard']);
      }
    },
      error => {
        console.log(error);
        this.errorResponse  = error;
        this._toasterService.error(this.errorResponse.error.message);
      }
    );

  }
}
