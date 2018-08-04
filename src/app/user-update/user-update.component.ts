import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TosterService } from '../toster.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent {
  first_name        = 'Tanveer';
  last_name         = 'Qureshee';
  email             = 'tanvir.qureshee@gmail.com';
  mobile            = '01716600843';
  country           = 'Bangladesh';
  assigned_country  = 'Dhaka';
  address           = 'Dhaka';
  constructor(private _toasterService: TosterService, private _authentication: AuthenticationService) {
  }

  updateUser(form: NgForm, e) {
    e.preventDefault();
    if (form.valid) {
      const userCreateParam = {
        address           : form.value.address,
        assigned_country  : form.value.assigned_country,
        country           : form.value.country,
        email             : form.value.email,
        first_name        : form.value.first_name,
        last_name         : form.value.last_name,
        mobile            : form.value.mobile
      };
      this._toasterService.success('User has been updated successfully.');
    }else {
      this._toasterService.error('All fields are required');
    }
  }

}
