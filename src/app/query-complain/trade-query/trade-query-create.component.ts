import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService} from '../../toster.service';
import { TradeQueryService } from './trade-query.service';
import { TradeQueryModel } from './trade-query.model';

declare var $: any;

@Component({
  selector    : 'app-trade-query-create',
  templateUrl : 'trade-query-create.component.html'
})
export class TradeQueryCreateComponent implements OnInit {
  tradeQuery: TradeQueryModel[] = [];
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
    private _service: TradeQueryService,
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
    this.form_type    = 'Trade query';
    this.similarTypes.push(this.form_type);
    const residenceObj = new TradeQueryModel();
    // @ts-ignore
    this.tradeQuery.push(residenceObj);
    this.assignTo = localStorage.getItem('assign_to');
    this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
    this.inputFields = {
      number_of_trade           : '',
      Type_of_query    : '',
      remarks            : '',
    };

    this.formData = this.fb.group({
      number_of_trade         : ['', Validators.requiredTrue],
      Type_of_query  : ['', Validators.requiredTrue],
      remarks          : ['', Validators.requiredTrue],
    });
  }
  public onFormSubmit(fields, type) {
    this.defaultDate = $('#defaultDate').val();
    const createFormData = this.formData.value;
    const postString  =  'number_of_trade=' + fields.number_of_trade
      + '&Type_of_query=' + fields.Type_of_query
      + '&remarks=' + fields.remarks
      + '&date=' + this.defaultDate
      + '&assign_to=' + this.assignTo
      + '&type=' + type
    this._service.create(postString, this.authorizationKey, 'querycomplain/tradequery/create').subscribe( response => {
        this._toasterService.success('Data has been successfully created.');
        this.router.navigate(['trade-query-list']);
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
        const companyObj = new TradeQueryModel();
        // @ts-ignore
        this.tradeQuery.push(companyObj);
      }else {
        this._toasterService.warning('Type is already there');
      }
    } else {
      this._toasterService.warning('Please type a similar form name');
    }
  }
}

