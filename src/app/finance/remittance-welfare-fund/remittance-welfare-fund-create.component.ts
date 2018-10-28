import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
  list_param;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _service: RemittanceWelfareFundService,
    private _activateRoute: ActivatedRoute,
    private _http: HttpClient) {
    this._activateRoute.paramMap
      .subscribe( params => {
        this.list_param = params.get('create_param');
      });
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
    this.form_type    = this.list_param;
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
    const postString  =  'previous_balance=' + ((fields.previous_balance === undefined) ? '' : fields.previous_balance)
      + '&lastmonth_income=' + ((fields.lastmonth_income === undefined) ? '' : fields.lastmonth_income)
      + '&amount_of_remittance=' + ((fields.amount_of_remittance === undefined) ? '' : fields.amount_of_remittance)
      + '&date=' + this.defaultDate
      + '&assign_to=' + this.assignTo
      + '&type=' + this.form_type
    this._service.create(postString, this.authorizationKey,
      'finance/remittanceandwelfarefund/create').subscribe( response => {
      },
      error => {
        const error_response  = error;
        this.responseError  = error_response.error;
      }
    );
    // menu ceate
    const postMenuString = 'name=' + this.form_type
      + '&module_name=' + this.form_type
      + '&parent_id=' + 7
      + '&url=remittance-welfare-fund-list/' + this.form_type
      + '&type=' + this.form_type
    this._service.create(postMenuString, this.authorizationKey, 'menumanagment/leftmenu/create').subscribe( response => {
        this._toasterService.success('Entry have successfully done.');
        this.router.navigate(['remittance-welfare-fund-list/' + this.form_type]);
        location.reload();
      },
      error => {
        const error_response  = error;
        this.responseError  = error_response.error;
      }
    );
    // end of menu create
  }
  public copyForm(e) {
    if (this.form_type) {
      if (this.similarTypes.indexOf(this.form_type) === -1) {
        this.remittanceWelfare  = [];
        this.similarTypes.push(this.form_type);
        const companyObj = new RemittanceWelfareModel();
        // @ts-ignore
        this.remittanceWelfare.push(companyObj);
      } else {
        this._toasterService.warning('Type is already there');
      }
    } else {
      this._toasterService.warning('Please type a similar form name');
    }
  }
}

