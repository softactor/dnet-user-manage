import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService} from '../../toster.service';
import { QueryReceivedService } from './query-received.service';

declare var $: any;

@Component({
  selector    : 'app-query-received-create',
  templateUrl : 'query-received-create.component.html'
})
export class QueryReceivedCreateComponent implements OnInit {
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
    private _service: QueryReceivedService,
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
      details_of_person : '',
      nature_of_query   : '',
      action_taken      : '',
    };

    this.formData = this.fb.group({
      details_of_person          : ['', Validators.required],
      nature_of_query       : ['', Validators.required],
      action_taken  : ['', Validators.requiredTrue],
    });
  }
  public onFormSubmit() {
    const createFormData = this.formData.value;
    const postString  =  'details_of_person='
      + createFormData.details_of_person
      + '&nature_of_query=' + createFormData.nature_of_query
      + '&action_taken=' + createFormData.action_taken
    this._service.create(postString, this.authorizationKey, 'querycomplain/queryreceived/create').subscribe( response => {
        this._toasterService.success('Data has been successfully created.');
        this.router.navigate(['query-received-list']);
      },
      error => {
        const error_response  = error;
        this.responseError  = error_response.error;
      }
    );
  }
}

