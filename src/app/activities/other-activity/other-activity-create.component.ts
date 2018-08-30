import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService} from '../../toster.service';
import { OtherActivityService } from './other-activity.service';

declare var $: any;

@Component({
  selector    : 'app-other-activity-create',
  templateUrl : 'other-activity-create.component.html'
})
export class OtherActivityCreateComponent implements OnInit {
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
    private _service: OtherActivityService,
    private _http: HttpClient) {
  }
  ngOnInit() {
    // to solve the left menu hide problem;
    $(document).ready(() => {
      const trees: any = $('[data-widget="tree"]');
      trees.tree();
    });
    this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
    this.inputFields = {
      enhancement_type    : '',
      outcome             : '',
      remarks             : '',
      type                : '',
    };

    this.formData = this.fb.group({
      activity     : ['', Validators.required],
      outcome      : ['', Validators.required],
      remarks      : ['', Validators.requiredTrue],
      type         : ['', Validators.requiredTrue],
    });
  }
  public onFormSubmit() {
    const createFormData = this.formData.value;
    const postString  =  'activity=' + createFormData.activity
      + '&remarks=' + createFormData.remarks
      + '&type=' + createFormData.type
    this._service.create(postString, this.authorizationKey, 'activity/otheractivity/create').subscribe( response => {
        this._toasterService.success('Data has been successfully created.');
        this.router.navigate(['other-activity-list']);
      },
      error => {
        const error_response  = error;
        this.responseError  = error_response.error;
      }
    );
  }
}

