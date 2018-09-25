import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService} from '../../toster.service';
import { RemittanceWelfareFundService } from './remittance-welfare-fund.service';
import { RemittanceWelfareModel } from './remittance-welfare.model';

declare var $: any;

@Component({
  selector    : 'app-conference-create',
  templateUrl : 'remittance-welfare-fund-create.component.html'
})
export class RemittanceWelfareFundCreateComponent implements OnInit {
  remittanceWelfare: RemittanceWelfareModel[] = [];
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
    private _service: RemittanceWelfareFundService,
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
    this.form_type    = 'Remittance';
    this.similarTypes.push(this.form_type);
    const residenceObj = new RemittanceWelfareModel();
    // @ts-ignore
    this.remittanceWelfare.push(residenceObj);
    this.assignTo = localStorage.getItem('assign_to');
    this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
    this.inputFields = {
      previous_balance    : '',
      lastmonth_income             : '',
      amount_of_remittance             : '',
    };

    this.formData = this.fb.group({
      previous_balance     : ['', Validators.required],
      lastmonth_income      : ['', Validators.required],
      amount_of_remittance         : ['', Validators.requiredTrue],
    });
  }
  public onFormSubmit(fields, type) {
    this.defaultDate = $('#defaultDate').val();
    const postString  =  'previous_balance=' + fields.previous_balance
      + '&lastmonth_income=' + fields.lastmonth_income
      + '&amount_of_remittance=' + fields.amount_of_remittance
      + '&date=' + this.defaultDate
      + '&assign_to=' + this.assignTo
      + '&type=' + type
    this._service.create(postString, this.authorizationKey,
      'finance/remittanceandwelfarefund/create').subscribe( response => {
        this._toasterService.success('Data has been successfully created.');
        this.router.navigate(['remittance-welfare-fund-list']);
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
        const companyObj = new RemittanceWelfareModel();
        // @ts-ignore
        this.remittanceWelfare.push(companyObj);
      }else {
        this._toasterService.warning('Type is already there');
      }
    } else {
      this._toasterService.warning('Please type a similar form name');
    }
  }
}

