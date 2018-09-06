import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService} from '../../toster.service';
import { BudgetService } from './budget.service';

declare var $: any;

@Component({
  selector    : 'app-conference-create',
  templateUrl : 'budget-create.component.html'
})
export class BudgetCreateComponent implements OnInit {
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
    private _service: BudgetService,
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
      budget_type    : '',
      opening_balance             : '',
      closing_balance             : '',
      total_expenditure                : '',
    };

    this.formData = this.fb.group({
      budget_type     : ['', Validators.required],
      opening_balance      : ['', Validators.required],
      closing_balance         : ['', Validators.requiredTrue],
      total_expenditure         : ['', Validators.requiredTrue],
    });
  }
  public onFormSubmit() {
    const createFormData = this.formData.value;
    const postString  =  'budget_type=' + createFormData.budget_type
      + '&opening_balance=' + createFormData.opening_balance
      + '&closing_balance=' + createFormData.closing_balance
      + '&total_expenditure=' + createFormData.total_expenditure
    this._service.create(postString, this.authorizationKey,
      'finance/budget/create').subscribe( response => {
        this._toasterService.success('Data has been successfully created.');
        this.router.navigate(['budget-list']);
      },
      error => {
        const error_response  = error;
        this.responseError  = error_response.error;
      }
    );
  }
}

