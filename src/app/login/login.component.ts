import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private _loginService: LoginService) {
  }

  ngOnInit() {
  }
  loginUser(e) {
    e.preventDefault();
    var loginParam  = {
      username : e.target.elements[0].value,
      password : e.target.elements[1].value,
    };
    // this._loginService.postLoginData().subscribe( response => {
    //   console.log(response);
    // });
    if ( 1 === 1 ) {
      this.router.navigate(['user-dashboard']);
    }
  }
}
