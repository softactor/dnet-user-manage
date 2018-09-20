import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService } from '../../toster.service';
import { LiaisonWithExpatriatesService } from './liaison-with-expatriates.service';
import { LiaisonWithExpatriatesModel } from './liaison-with-expatriates.model';

declare var $: any;

@Component({
  selector    : 'app-liaison-with-expatriates-create',
  templateUrl : 'liaison-with-expatriates-create.component.html'
})
export class LiaisonWithExpatriatesCreateComponent implements OnInit {
  liaisonWithExpatriates: LiaisonWithExpatriatesModel[] = [];
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
    private _service: LiaisonWithExpatriatesService,
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
    this.form_type    = 'Liaison with expatriates';
    this.similarTypes.push(this.form_type);
    const residenceObj = new LiaisonWithExpatriatesModel();
    // @ts-ignore
    this.liaisonWithExpatriates.push(residenceObj);
    this.assignTo = localStorage.getItem('assign_to');
    this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
    this.inputFields = {
      number_of_meeting_held    : '',
      outcome             : '',
      remarks             : '',
      type                : '',
    };

    this.formData = this.fb.group({
      number_of_meeting_held     : ['', Validators.required],
      outcome      : ['', Validators.required],
      remarks      : ['', Validators.requiredTrue],
      type         : ['', Validators.requiredTrue],
    });
  }
  public onFormSubmit(fields, type) {
    this.defaultDate = $('#defaultDate').val();
    const createFormData = this.formData.value;
    const postString  =  'number_of_meeting_held='
      + fields.number_of_meeting_held
      + '&outcome=' + fields.outcome
      + '&date=' + this.defaultDate
      + '&assign_to=' + this.assignTo
      + '&type=' + type
    this._service.create(postString, this.authorizationKey, 'activity/liaisonwithexpatriates/create').subscribe( response => {
        this._toasterService.success('Data has been successfully created.');
        this.router.navigate(['liaison-with-expatriates-list']);
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
        const companyObj = new LiaisonWithExpatriatesModel();
        // @ts-ignore
        this.liaisonWithExpatriates.push(companyObj);
      }else {
        this._toasterService.warning('Type is already there');
      }
    } else {
      this._toasterService.warning('Please type a similar form name');
    }
  }
}

