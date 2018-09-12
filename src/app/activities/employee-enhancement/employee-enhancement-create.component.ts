import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService} from '../../toster.service';
import { EmployeeEnhancementService } from './employee-enhancement.service';

declare var $: any;

@Component({
  selector    : 'app-employee-enhancement-create',
  templateUrl : 'employee-enhancement-create.component.html'
})
export class EmployeeEnhancementCreateComponent implements OnInit {
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
    private _service: EmployeeEnhancementService,
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
      enhancement_type     : ['', Validators.required],
      outcome      : ['', Validators.required],
      remarks      : ['', Validators.requiredTrue],
      type         : ['', Validators.requiredTrue],
    });
  }
  public onFormSubmit() {
    const createFormData = this.formData.value;
    const postString  =  'enhancement_type=' + createFormData.enhancement_type
      + '&outcome=' + createFormData.outcome
      + '&remarks=' + createFormData.remarks
      + '&type=' + createFormData.type
    this._service.create(postString, this.authorizationKey, 'activity/employeeenhancement/create').subscribe( response => {
        this._toasterService.success('Data has been successfully created.');
        this.router.navigate(['employee-enhancement-list']);
      },
      error => {
        const error_response  = error;
        this.responseError  = error_response.error;
      }
    );
  }
}
