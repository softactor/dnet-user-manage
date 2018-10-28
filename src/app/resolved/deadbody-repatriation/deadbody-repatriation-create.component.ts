import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService} from '../../toster.service';
import { DeadbodyRepatriationService } from './deadbody-repatriation.service';
import { DeadbodyRepatriationModel } from './deadbody-repatriation.model';

declare var $: any;

@Component({
  selector    : 'app-deadbody-repatriation-create',
  templateUrl : 'deadbody-repatriation-create.component.html'
})
export class DeadbodyRepatriationCreateComponent implements OnInit {
  deadbodyRepatriation: DeadbodyRepatriationModel[] = [];
  defaultDate;
  assignTo;
  form_type;
  similarTypes;
  inputFields;
  formData;
  authorizationKey;
  feedbackData;
  responseError;
  list_param;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _service: DeadbodyRepatriationService,
    private _activateRoute: ActivatedRoute,
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
    this.form_type    = this.list_param;
    this.similarTypes.push(this.form_type);
    const residenceObj = new DeadbodyRepatriationModel();
    // @ts-ignore
    this.deadbodyRepatriation.push(residenceObj);
    this.assignTo = localStorage.getItem('assign_to');
    this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
    this.inputFields = {
      name            : '',
      number           : '',
      cause_of_death    : '',
      action_taken            : '',
    };

    this.formData = this.fb.group({
      name          : ['', Validators.required],
      number         : ['', Validators.requiredTrue],
      cause_of_death  : ['', Validators.requiredTrue],
      action_taken          : ['', Validators.requiredTrue],
    });
  }
  public onFormSubmit(fields, type) {
    this.defaultDate = $('#defaultDate').val();
    const createFormData = this.formData.value;
    const postString  =  'name=' + ((fields.name === undefined) ? '' : fields.name)
      + '&number=' + ((fields.number === undefined) ? '' : fields.number)
      + '&cause_of_death=' + ((fields.cause_of_death === undefined) ? '' : fields.cause_of_death)
      + '&action_taken=' + fields.action_taken
      + '&date=' + this.defaultDate
      + '&assign_to=' + this.assignTo
      + '&type=' + this.form_type
    this._service.create(postString, this.authorizationKey, 'resolved/deadbodyrepatriation/create').subscribe( response => {
        // menu ceate
        const postMenuString = 'name=' + this.form_type
          + '&module_name=' + this.form_type
          + '&parent_id=' + 6
          + '&url=deadbody-repatriation-list/' + this.form_type
          + '&type=' + this.form_type
        this._service.create(postMenuString, this.authorizationKey, 'menumanagment/leftmenu/create').subscribe(menu_response => {
            this._toasterService.success('Entry have successfully done.');
            this.router.navigate(['deadbody-repatriation-list/' + this.form_type]);
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
        const error_response  = error;
        this.responseError  = error_response.error;
      }
    );
  }
  public copyForm(e) {
    if (this.form_type) {
      if (this.similarTypes.indexOf(this.form_type) === -1) {
        this.deadbodyRepatriation = [];
        this.similarTypes.push(this.form_type);
        const companyObj = new DeadbodyRepatriationModel();
        // @ts-ignore
        this.deadbodyRepatriation.push(companyObj);
      }else {
        this._toasterService.warning('Type is already there');
      }
    } else {
      this._toasterService.warning('Please type a similar form name');
    }
  }
}

