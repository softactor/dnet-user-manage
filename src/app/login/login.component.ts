import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginDataResponse;
  constructor(private router: Router, private _loginService: LoginService) {
  }
  loginUser(e) {
    e.preventDefault();
    const loginParam  = {
      username : e.target.elements[0].value,
      password : e.target.elements[1].value,
    };
    this._loginService.postLoginData(loginParam).subscribe(response => {
      this.loginDataResponse  =  response;
      console.log('Access Token')
      console.log(this.loginDataResponse.access_token);
    });
    // if ( 1 === 1 ) {
    //   this.router.navigate(['user-dashboard']);
    // }
  }
}
