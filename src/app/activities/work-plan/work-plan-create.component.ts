import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService} from '../../toster.service';
import { WorkPlanService } from './work-plan.service';

declare var $: any;

@Component({
  selector    : 'app-work-plan-create',
  templateUrl : 'work-plan-create.component.html'
})
export class WorkPlanCreateComponent implements OnInit {
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
    private _service: WorkPlanService,
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
      path               : '',
      name_of_activity   : '',
      description        : '',
      type               : '',
    };

    this.formData = this.fb.group({
      path                : ['', Validators.required],
      name_of_activity    : ['', Validators.required],
      description         : ['', Validators.requiredTrue],
      type                : ['', Validators.requiredTrue],
    });
  }
  public onFormSubmit() {
    const createFormData = this.formData.value;
    const postString  =  'path=' + createFormData.path
      + '&name_of_activity=' + createFormData.name_of_activity
      + '&description=' + createFormData.description
      + '&type=' + createFormData.type
    this._service.create(postString, this.authorizationKey, 'activity/wrokplane/create').subscribe( response => {
        this._toasterService.success('Data has been successfully created.');
        this.router.navigate(['work-plan-list']);
      },
      error => {
        const error_response  = error;
        this.responseError  = error_response.error;
      }
    );
  }
}

