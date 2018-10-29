import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import { TosterService } from '../../toster.service';
import { QueryReceivedService } from './query-received.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
  selector    : 'app-query-received-update',
  templateUrl : 'query-received-update.component.html'
})
export class QueryReceivedUpdateComponent implements OnInit {
  editId;
  editData;
  inputFields;
  formData;
  authorizationKey;
  feedbackData;
  responseError;
  details_of_person = '';
  nature_of_query = '';
  action_taken = '';
  date;
  type;
  constructor(
    private _activateRoute: ActivatedRoute,
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
      $('#date').datepicker({
        dateFormat: 'yy-mm-dd'
      });
    });
    this.formData = this.fb.group({
      details_of_person             : ['', Validators.required],
      nature_of_query               : ['', Validators.required],
      action_taken        : ['', Validators.required]
    });
    this._activateRoute.paramMap
      .subscribe( params => {
        this.editId = params.get('query_received_id')
        this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
        const getDetailsParam  = {
          editId        : this.editId,
          authorizationKey  : this.authorizationKey.toString()
        };

        this._service.getDetailsById(getDetailsParam, 'querycomplain/queryreceived/details/').subscribe( Details => {
          this.editData = Details;
          this.details_of_person            = this.editData.details_of_person;
          this.nature_of_query              = this.editData.nature_of_query;
          this.action_taken       = this.editData.action_taken;
          this.date       = this.editData.date;
          this.type       = this.editData.type;
        });
      });
  }
  public update(form: NgForm, e) {
    e.preventDefault();
    const dateField = $('#date').val();
    const updateParam = 'details_of_person='
      + form.value.details_of_person
      + '&nature_of_query=' + form.value.nature_of_query
      + '&action_taken=' + form.value.action_taken
      + '&date=' + ((dateField === undefined)    ? ''  :  dateField)
    this._service.update(updateParam, this.authorizationKey,
      'querycomplain/queryreceived/update/', this.editId)
      .subscribe( response => {
        this._toasterService.success('Data has been successfully updated.');
        this.router.navigate(['query-received-list/' + this.type]);
      },
      error => {
        const error_response  = error;
        this.responseError  = error_response.error;
      }
    );
  }
}

