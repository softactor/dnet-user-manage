import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService} from '../../toster.service';
import { MonthlyProblemResolvedService } from './monthly-problem-resolved.service';
import { MonthlyProblemResolvedModel } from './monthly-problem-resolved.model';

declare var $: any;

@Component({
  selector    : 'app-arbitration-disputes-create',
  templateUrl : 'monthly-problem-resolved-create.component.html'
})
export class MonthlyProblemResolvedCreateComponent implements OnInit {
  monthlyProblemResolved: MonthlyProblemResolvedModel[] = [];
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
    private _service: MonthlyProblemResolvedService,
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
    this.form_type    = 'Monthly problem resolved';
    this.similarTypes.push(this.form_type);
    const residenceObj = new MonthlyProblemResolvedModel();
    // @ts-ignore
    this.monthlyProblemResolved.push(residenceObj);
    this.assignTo = localStorage.getItem('assign_to');
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
  public onFormSubmit(fields, type) {
    this.defaultDate = $('#defaultDate').val();
    const createFormData = this.formData.value;
    const postString  =  'type_of_problem=' + fields.type_of_problem
      + '&total_number=' + fields.total_number
      + '&date=' + this.defaultDate
      + '&assign_to=' + this.assignTo
      + '&type=' + type
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
  public copyForm(e) {
    if (this.form_type) {
      if (this.similarTypes.indexOf(this.form_type) === -1) {
        this.similarTypes.push(this.form_type);
        const companyObj = new MonthlyProblemResolvedModel();
        // @ts-ignore
        this.monthlyProblemResolved.push(companyObj);
      }else {
        this._toasterService.warning('Type is already there');
      }
    } else {
      this._toasterService.warning('Please type a similar form name');
    }
  }
}

