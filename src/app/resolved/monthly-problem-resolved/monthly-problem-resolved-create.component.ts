import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService} from '../../toster.service';
import { MonthlyProblemResolvedService } from './monthly-problem-resolved.service';

declare var $: any;

@Component({
  selector    : 'app-arbitration-disputes-create',
  templateUrl : 'monthly-problem-resolved-create.component.html'
})
export class MonthlyProblemResolvedCreateComponent implements OnInit {
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
    private _service: MonthlyProblemResolvedService,
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
      type_of_problem      : '',
      total_number         : '',
    };

    this.formData = this.fb.group({
      type_of_problem          : ['', Validators.required],
      total_number       : ['', Validators.required],
    });
  }
  public onFormSubmit() {
    const createFormData = this.formData.value;
    const postString  =  'type_of_problem=' + createFormData.type_of_problem
      + '&total_number=' + createFormData.total_number
    this._service.create(postString, this.authorizationKey, 'resolved/monthlyproblemresolved/create').subscribe( response => {
        this._toasterService.success('Data has been successfully created.');
        this.router.navigate(['monthly-problem-resolved-list']);
      },
      error => {
        const error_response  = error;
        this.responseError  = error_response.error;
      }
    );
  }
}

