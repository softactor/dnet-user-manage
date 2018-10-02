import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService} from '../../toster.service';
import { QueryReceivedService } from './query-received.service';
import { QueryReceivedModel } from './query-received.model';

declare var $: any;

@Component({
  selector    : 'app-query-received-create',
  templateUrl : 'query-received-create.component.html'
})
export class QueryReceivedCreateComponent implements OnInit {
  queryReceived: QueryReceivedModel[] = [];
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
    private _service: QueryReceivedService,
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
    this.form_type    = 'Query received';
    this.similarTypes.push(this.form_type);
    const residenceObj = new QueryReceivedModel();
    // @ts-ignore
    this.queryReceived.push(residenceObj);
    this.assignTo = localStorage.getItem('assign_to');
    this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
    this.inputFields = {
      details_of_person : '',
      nature_of_query   : '',
      action_taken      : '',
    };

    this.formData = this.fb.group({
      details_of_person          : ['', Validators.required],
      nature_of_query       : ['', Validators.required],
      action_taken  : ['', Validators.requiredTrue],
    });
  }
  public onFormSubmit(fields, type) {
    this.defaultDate = $('#defaultDate').val();
    const createFormData = this.formData.value;
    const postString  =  'details_of_person='
      + fields.details_of_person
      + '&nature_of_query=' + fields.nature_of_query
      + '&action_taken=' + fields.action_taken
      + '&date=' + this.defaultDate
      + '&assign_to=' + this.assignTo
      + '&type=' + type
    this._service.create(postString, this.authorizationKey, 'querycomplain/queryreceived/create').subscribe( response => {
        this._toasterService.success('Data has been successfully created.');
        this.router.navigate(['query-received-list']);
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
        const companyObj = new QueryReceivedModel();
        // @ts-ignore
        this.queryReceived.push(companyObj);
      }else {
        this._toasterService.warning('Type is already there');
      }
    } else {
      this._toasterService.warning('Please type a similar form name');
    }
  }
}
