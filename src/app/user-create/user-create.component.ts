import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TosterService } from '../toster.service';
import { UserCreateService } from './user-create.service';
import {AuthenticationService} from '../authentication.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  authorizationKey;
  userAccessLevelResponse;
  userAccessLevel;
  constructor(private _userCreateService: UserCreateService,
              private router: Router,
              private _toasterService: TosterService,
              private _authentication: AuthenticationService,
              private _http: HttpClient) {
  }
  ngOnInit() {
    // get user access level;
    this.authorizationKey = this._authentication.token_type + ' ' + this._authentication.access_token;
    this._userCreateService.getUserAccessLevel(this.authorizationKey.toString()).subscribe( response => {
      this.userAccessLevelResponse = response;
      this.userAccessLevel = this.userAccessLevelResponse.results;
    });
  }
  createUser(form: NgForm, e) {
    e.preventDefault();
    if (form.valid) {
      const userCreateParam = {
        address           : form.value.address,
        assigned_country  : form.value.assigned_country,
        country           : form.value.country,
        email             : form.value.email,
        first_name        : form.value.first_name,
        last_name         : form.value.last_name,
        mobile            : form.value.mobile,
        password          : 'dead',
        is_superuser      : '',
        access            : form.value.access
      };
      this._userCreateService.creteUserData(userCreateParam).subscribe(response => {
        this._toasterService.success('User has been successfully created.');
        this.router.navigate(['user-list']);
      });
    }else {
      this._toasterService.error('All fields are required');
    }
  }
}
