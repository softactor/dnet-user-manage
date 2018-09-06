import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService} from '../../toster.service';
import { ComplaintService } from './complaint.service';

declare var $: any;

@Component({
  selector    : 'app-complaint-create',
  templateUrl : 'complaint-create.component.html'
})
export class ComplaintCreateComponent implements OnInit {
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
    private _service: ComplaintService,
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
      total_number           : '',
      action_taken    : '',
    };

    this.formData = this.fb.group({
      total_number          : ['', Validators.required],
      action_taken  : ['', Validators.requiredTrue],
    });
  }
  public onFormSubmit() {
    const createFormData = this.formData.value;
    const postString  =  'total_number='
      + createFormData.total_number
      + '&action_taken=' + createFormData.action_taken
    this._service.create(postString, this.authorizationKey, 'querycomplain/complaints/create').subscribe( response => {
        this._toasterService.success('Data has been successfully created.');
        this.router.navigate(['complaint-list']);
      },
      error => {
        const error_response  = error;
        this.responseError  = error_response.error;
      }
    );
  }
}

