import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TosterService } from '../toster.service';
import { AuthenticationService } from '../authentication.service';
import { ActivatedRoute } from '@angular/router';
import { LogoutService } from './logout.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  authorizationKey;
  responseMessage;
  constructor(private _toasterService: TosterService,
              private _authentication: AuthenticationService,
              private _activateRoute: ActivatedRoute,
              private router: Router,
              private _userLogoutService: LogoutService,
  ) {}

  ngOnInit() {
    this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
    const userLogoutParam  = {
          authorizationKey  : this.authorizationKey.toString()
    };
    this._userLogoutService.userLogout(userLogoutParam).subscribe( response => {
      this.responseMessage  = response;
      this._toasterService.success(this.responseMessage.message);
      localStorage.removeItem('access_token')
      localStorage.removeItem('token_type')
      this.router.navigate(['login']);
    });
  }

}
