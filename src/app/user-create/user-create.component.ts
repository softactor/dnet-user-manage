import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TosterService } from '../toster.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {
  constructor(private _toasterService: TosterService) {
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
        mobile            : form.value.mobile
      };
      this._toasterService.success('User has been created successfully.');
    }else {
      this._toasterService.error('All fields are required');
    }
  }
}
