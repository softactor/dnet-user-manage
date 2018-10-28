import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  list_param;
  form_type;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _service: QueryReceivedService,
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
    if (this.form_type) {
      this.defaultDate = $('#defaultDate').val();
      if (this.defaultDate) {
        const createFormData = this.formData.value;
        const postString = 'details_of_person='
          + ((fields.details_of_person === undefined) ? '' : fields.details_of_person)
          + '&nature_of_query=' + ((fields.nature_of_query === undefined) ? '' : fields.nature_of_query)
          + '&action_taken=' + ((fields.action_taken === undefined) ? '' : fields.action_taken)
          + '&date=' + this.defaultDate
          + '&assign_to=' + this.assignTo
          + '&type=' + this.form_type
        this._service.create(postString, this.authorizationKey, 'querycomplain/queryreceived/create').subscribe(response => {
            // menu ceate
            const postMenuString = 'name=' + this.form_type
              + '&module_name=' + this.form_type
              + '&parent_id=' + 4
              + '&url=query-received-list/' + this.form_type
              + '&type=' + this.form_type
            this._service.create(postMenuString, this.authorizationKey, 'menumanagment/leftmenu/create').subscribe(menu_response => {
                this._toasterService.success('Entry have successfully done.');
                this.router.navigate(['query-received-list/' + this.form_type]);
                // location.reload();
              },
              error => {
                const error_response = error;
                this.responseError = error_response.error;
              }
            );
            // end of menu create
          },
          error => {
            const error_response = error;
            this.responseError = error_response.error;
          }
        );
      } else {
        this._toasterService.warning('Please select a date');
      }
    } else {
      this._toasterService.warning('Please type a similar form name');
    }
  }
  public copyForm(e) {
    if (this.form_type) {
      if (this.similarTypes.indexOf(this.form_type) === -1) {
        this.queryReceived = [];
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

