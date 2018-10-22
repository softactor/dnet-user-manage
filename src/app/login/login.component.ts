import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { AuthenticationService } from '../authentication.service';
import { TosterService } from '../toster.service';
import { UserUpdateService } from '../user-update/user-update.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginPage;
  loginDataResponse;
  errorResponse;
  userDetailsDataContainer;
  constructor(
    private router: Router,
    private _loginService: LoginService,
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _userUpdateService: UserUpdateService,
  ) {
    this.loginPage  = true;
    localStorage.removeItem('access_token');
    localStorage.removeItem('token_type');
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
        this._authentication.access_token = localStorage.getItem('token_type');
        this._authentication.token_type   = this.loginDataResponse.token_type;
        this._authentication.setUserLoggedIn();
        localStorage.setItem('access_token', this.loginDataResponse.access_token);
        localStorage.setItem('token_type', this.loginDataResponse.token_type);
        localStorage.setItem('logged_in_id', this.loginDataResponse.user_id);
        localStorage.setItem('expires_in', this.loginDataResponse.expires_in);
        const authorizationKey  = this.loginDataResponse.token_type + ' ' + this.loginDataResponse.access_token;
        const getUserDetailsParam  = {
          editUserId        : this.loginDataResponse.user_id,
          authorizationKey  : authorizationKey.toString()
        };
        this._userUpdateService.getUserDetailsById(getUserDetailsParam).subscribe( getUserDetails => {
          this.userDetailsDataContainer = getUserDetails;
          localStorage.setItem(
            'logged_user_name', this.userDetailsDataContainer.first_name
            + ' ' + this.userDetailsDataContainer.last_name);
          localStorage.setItem('assign_to', this.userDetailsDataContainer.assigned_country.id);
        });
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
