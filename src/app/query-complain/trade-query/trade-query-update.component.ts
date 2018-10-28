import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import { TosterService } from '../../toster.service';
import { TradeQueryService } from './trade-query.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
  selector    : 'app-trade-query-update',
  templateUrl : 'trade-query-update.component.html'
})
export class TradeQueryUpdateComponent implements OnInit {
  editId;
  editData;
  inputFields;
  formData;
  authorizationKey;
  feedbackData;
  responseError;
  Type_of_query  = '';
  remarks = '';
  number_of_trade = '';
  date;
  constructor(
    private _activateRoute: ActivatedRoute,
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
      $('#date').datepicker({
        dateFormat: 'yy-mm-dd'
      });
    });
    this.formData = this.fb.group({
      number_of_trade               : ['', Validators.required],
      Type_of_query        : ['', Validators.required],
      remarks                : ['', Validators.required]
    });
    this._activateRoute.paramMap
      .subscribe( params => {
        this.editId = params.get('trade_query_id')
        this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
        const getDetailsParam  = {
          editId        : this.editId,
          authorizationKey  : this.authorizationKey
        };

        this._service.getDetailsById(getDetailsParam, 'querycomplain/tradequery/details/').subscribe( Details => {
          this.editData = Details;
          this.Type_of_query        = this.editData.Type_of_query;
          this.number_of_trade      = this.editData.number_of_trade;
          this.remarks              = this.editData.remarks;
          this.date               = this.editData.date;
        });
      });
  }
  public update(form: NgForm, e) {
    e.preventDefault();
    const dateField = $('#date').val();
    const updateParam = 'Type_of_query='
      + ((form.value.name === undefined)    ? ''  :  form.value.name)
      + '&remarks=' + ((form.value.remarks === undefined)    ? ''  :  form.value.remarks)
      + '&number_of_trade=' + ((form.value.number_of_trade === undefined)    ? ''  :  form.value.number_of_trade)
      + '&date=' + ((dateField === undefined)    ? ''  :  dateField)
    this._service.update(updateParam, this.authorizationKey,
      'querycomplain/tradequery/update/', this.editId)
      .subscribe( response => {
        this._toasterService.success('Data has been successfully updated.');
        this.router.navigate(['trade-query-list/']);
      },
      error => {
        const error_response  = error;
        this.responseError  = error_response.error;
      }
    );
  }
}

