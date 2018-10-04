import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import { TosterService } from '../../toster.service';
import { RemittanceWelfareFundService } from './remittance-welfare-fund.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
  selector    : 'app-conference-update',
  templateUrl : 'remittance-welfare-fund-update.component.html'
})
export class RemittanceWelfareFundUpdateComponent implements OnInit {
  editId;
  editData;
  inputFields;
  formData;
  authorizationKey;
  feedbackData;
  responseError;
  previous_balance  = '';
  lastmonth_income = '';
  amount_of_remittance = '';
  constructor(
    private _activateRoute: ActivatedRoute,
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
    this.formData = this.fb.group({
      previous_balance                : ['', Validators.required],
      lastmonth_income                 : ['', Validators.required],
      amount_of_remittance                    : ['', Validators.required]
    });
    this._activateRoute.paramMap
      .subscribe( params => {
        this.editId = params.get('remittance_welfare_fund_id')
        this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
        const getDetailsParam  = {
          editId        : this.editId,
          authorizationKey  : this.authorizationKey.toString()
        };

        this._service.getDetailsById(getDetailsParam, 'finance/remittanceandwelfarefund/details/').subscribe( Details => {
          this.editData = Details;
          this.previous_balance           = this.editData.previous_balance;
          this.lastmonth_income            = this.editData.lastmonth_income;
          this.amount_of_remittance               = this.editData.amount_of_remittance;
        });
      });
  }
  public update(form: NgForm, e) {
    e.preventDefault();
    const updateParam = 'previous_balance=' + form.value.previous_balance
      + '&lastmonth_income=' + form.value.lastmonth_income
      + '&amount_of_remittance=' + form.value.amount_of_remittance
      + '&authorization=' + this.authorizationKey;
    this._service.update(updateParam, this.authorizationKey,
      'finance/remittanceandwelfarefund/update/', this.editId).subscribe( response => {
        this._toasterService.success('Data has been successfully updated.');
        this.router.navigate(['remittance-welfare-fund-list']);
      },
      error => {
        const error_response  = error;
        this.responseError  = error_response.error;
      }
    );
  }
}

