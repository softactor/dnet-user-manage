import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService} from '../../toster.service';
import { RemittanceWelfareFundService } from './remittance-welfare-fund.service';

declare var $: any;

@Component({
  selector    : 'app-conference-create',
  templateUrl : 'remittance-welfare-fund-create.component.html'
})
export class RemittanceWelfareFundCreateComponent implements OnInit {
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
    private _service: RemittanceWelfareFundService,
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
  public onFormSubmit() {
    const createFormData = this.formData.value;
    const postString  =  'previous_balance=' + createFormData.previous_balance
      + '&lastmonth_income=' + createFormData.lastmonth_income
      + '&amount_of_remittance=' + createFormData.amount_of_remittance
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
}

