import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService} from '../../toster.service';
import { BudgetService } from './budget.service';
import { BudgetModel } from './budget.model';

declare var $: any;

@Component({
  selector    : 'app-conference-create',
  templateUrl : 'budget-create.component.html'
})
export class BudgetCreateComponent implements OnInit {
  budget: BudgetModel[] = [];
  similarTypes;
  inputFields;
  formData;
  authorizationKey;
  feedbackData;
  responseError;
  defaultDate;
  assignTo;
  form_type;
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
      $('#defaultDate').datepicker({
        dateFormat: 'yy-mm-dd'
      });
      $('#defaultDate').datepicker('setDate', new Date());
    });
    this.similarTypes = [];
    this.form_type    = 'Budget';
    this.similarTypes.push(this.form_type);
    const residenceObj = new BudgetModel();
    // @ts-ignore
    this.budget.push(residenceObj);
    this.assignTo = localStorage.getItem('assign_to');
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
  public onFormSubmit(fields, type) {
    this.defaultDate = $('#defaultDate').val();
    const postString  =  'budget_type=' + fields.budget_type
      + '&opening_balance=' + fields.opening_balance
      + '&closing_balance=' + fields.closing_balance
      + '&total_expenditure=' + fields.total_expenditure
      + '&date=' + this.defaultDate
      + '&assign_to=' + this.assignTo
      + '&type=' + type
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
  public copyForm(e) {
    if (this.form_type) {
      if (this.similarTypes.indexOf(this.form_type) === -1) {
        this.similarTypes.push(this.form_type);
        const companyObj = new BudgetModel();
        // @ts-ignore
        this.budget.push(companyObj);
      }else {
        this._toasterService.warning('Type is already there');
      }
    } else {
      this._toasterService.warning('Please type a similar form name');
    }
  }
}

