import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService} from '../../toster.service';
import { TradeQueryService } from './trade-query.service';

declare var $: any;

@Component({
  selector    : 'app-trade-query-create',
  templateUrl : 'trade-query-create.component.html'
})
export class TradeQueryCreateComponent implements OnInit {
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
    private _service: TradeQueryService,
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
  public onFormSubmit() {
    const createFormData = this.formData.value;
    const postString  =  'number_of_trade=' + createFormData.number_of_trade
      + '&Type_of_query=' + createFormData.Type_of_query
      + '&remarks=' + createFormData.remarks
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
}

