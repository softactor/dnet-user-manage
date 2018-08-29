import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TosterService } from '../toster.service';
import { AuthenticationService } from '../authentication.service';
import { ActivatedRoute } from '@angular/router';
import { UserUpdateService} from './user-update.service';
declare var $: any;
@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  editUserId;
  authorizationKey;
  userAccessLevel;
  userAccessLevelResponse;
  userDetailsDataContainer;
  first_name        = '';
  last_name         = '';
  email             = '';
  mobile            = '';
  country           = '';
  assigned_country  = '';
  address           = '';
  access           = '';
  constructor(
              private _toasterService: TosterService,
              private _authentication: AuthenticationService,
              private _activateRoute: ActivatedRoute,
              private router: Router,
              private _userUpdateService: UserUpdateService,
  ) {}

  ngOnInit() {
    // to solve the left menu hide problem;
    $(document).ready(() => {
      const trees: any = $('[data-widget="tree"]');
      trees.tree();
    });
      this._activateRoute.paramMap
      .subscribe( params => {
        let userId  = params.get('user_id')
        this.editUserId = userId;
        this.authorizationKey = this._authentication.token_type + ' ' + this._authentication.access_token;
        const getUserDetailsParam  = {
          editUserId        : this.editUserId,
          authorizationKey  : this.authorizationKey.toString()
        };

        this._userUpdateService.getUserDetailsById(getUserDetailsParam).subscribe( getUserDetails => {
          this.userDetailsDataContainer = getUserDetails;
          this.first_name = this.userDetailsDataContainer.first_name;
          this.last_name = this.userDetailsDataContainer.last_name;
          this.country = this.userDetailsDataContainer.country;
          this.assigned_country = this.userDetailsDataContainer.assigned_country;
          this.address = this.userDetailsDataContainer.address;
          this.mobile = this.userDetailsDataContainer.mobile;
          this.access = this.userDetailsDataContainer.access.id;
        });
      });
      // get user access level;
    this._userUpdateService.getUserAccessLevel(this.authorizationKey.toString()).subscribe( response => {
      this.userAccessLevelResponse = response;
      this.userAccessLevel = this.userAccessLevelResponse.results;
    });
  }
  updateUser(form: NgForm, e) {
    e.preventDefault();
    if (form.valid) {
      const userUpdateParam = {
        address           : form.value.address,
        assigned_country  : form.value.assigned_country,
        country           : form.value.country,
        first_name        : form.value.first_name,
        last_name         : form.value.last_name,
        mobile            : form.value.mobile,
        access            : form.value.access,
        is_superuser      : false,
        editUserId        : this.editUserId,
        authorization     : this.authorizationKey
      };
      this._userUpdateService.updateUserData(userUpdateParam).subscribe( respose => {
        this._toasterService.success('User has been successfully updated.');
        this.router.navigate(['user-list']);
      });
    }else {
      this._toasterService.error('All fields are required');
    }
  }

}
