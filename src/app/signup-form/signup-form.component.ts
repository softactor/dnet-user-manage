import { Component, OnInit } from '@angular/core';
import { SignupForm } from './signup-form.model';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  genderList: string[];
  signupFormData: FormGroup;
  private _signupFormValue: SignupForm;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this._signupFormValue = {
      email: 'arman@fakibaz.com',
      password: {
        pwd: '',
        confirmPwd: '',
      },
      gender: '',
      terms: false
    };
    this.genderList = ['Male', 'Female'];
    this.signupFormData = this.fb.group({
      email         : ['', [Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password      : this.fb.group({
        pwd         : ['', Validators.required],
        confirmPwd  : ['', Validators.required]
      }),
      gender        : ['', Validators.required],
      terms         : ['', Validators.requiredTrue]
    });
  }
  public onFormSubmit() {
    if(this.signupFormData.valid) {
      this._signupFormValue = this.signupFormData.value;
      console.log(this._signupFormValue);
      /* Any API call logic via services goes here */
    }
  }
}
