import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService} from '../../toster.service';
import { DeadbodyRepatriationService } from './deadbody-repatriation.service';

declare var $: any;

@Component({
  selector    : 'app-deadbody-repatriation-create',
  templateUrl : 'deadbody-repatriation-create.component.html'
})
export class DeadbodyRepatriationCreateComponent implements OnInit {
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
    private _service: DeadbodyRepatriationService,
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
      name            : '',
      number           : '',
      cause_of_death    : '',
      action_taken            : '',
    };

    this.formData = this.fb.group({
      name          : ['', Validators.required],
      number         : ['', Validators.requiredTrue],
      cause_of_death  : ['', Validators.requiredTrue],
      action_taken          : ['', Validators.requiredTrue],
    });
  }
  public onFormSubmit() {
    const createFormData = this.formData.value;
    const postString  =  'name=' + createFormData.name
      + '&number=' + createFormData.number
      + '&cause_of_death=' + createFormData.cause_of_death
      + '&action_taken=' + createFormData.action_taken
    this._service.create(postString, this.authorizationKey, 'resolved/deadbodyrepatriation/create').subscribe( response => {
        this._toasterService.success('Data has been successfully created.');
        this.router.navigate(['deadbody-repatriation-list']);
      },
      error => {
        const error_response  = error;
        this.responseError  = error_response.error;
      }
    );
  }
}

