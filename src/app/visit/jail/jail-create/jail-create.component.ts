import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService } from '../../../toster.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../authentication.service';
import { JailService } from '../jail.service';

@Component({
  selector: 'app-jail-create',
  templateUrl: './jail-create.component.html',
  styleUrls: ['./jail-create.component.css']
})
export class JailCreateComponent implements OnInit {

  inputFields;
  formData;
  authorizationKey;
  feedbackData;
  responseError;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _service: JailService,
    private _http: HttpClient) {
  }

  ngOnInit() {
    this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
    this.inputFields = {
      name    : '',
      address : '',
      outcome : '',
      no_of_bangladeshis : '',
      type : '',
    };

    this.formData = this.fb.group({
      name         : ['', Validators.required],
      address      : ['', Validators.required],
      outcome      : ['', Validators.requiredTrue],
      no_of_bangladeshis      : ['', Validators.requiredTrue],
      type      : ['', Validators.requiredTrue],
    });
  }
  public onFormSubmit() {
    this._service.create(this.formData.value, this.authorizationKey).subscribe( response => {
      this._toasterService.success('Data has been successfully created.');
      this.router.navigate(['jail-list']);
    },
      error => {
        const error_response  = error;
        this.responseError  = error_response.error;
      }
    );
  }

}
