import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService} from '../../toster.service';
import { MeetingService } from './meeting.service';
import { MeetingModel } from './meeting.model';

declare var $: any;

@Component({
  selector    : 'app-meeting-create',
  templateUrl : 'meeting-create.component.html'
})
export class MeetingCreateComponent implements OnInit {
  meeting: MeetingModel[] = [];
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
    private _service: MeetingService,
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
    this.form_type    = 'Meeting';
    this.similarTypes.push(this.form_type);
    const residenceObj = new MeetingModel();
    // @ts-ignore
    this.meeting.push(residenceObj);
    this.assignTo = localStorage.getItem('assign_to');
    this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
    this.inputFields = {
      name_of_activity    : '',
      description             : '',
      remarks             : '',
      type                : '',
    };

    this.formData = this.fb.group({
      name_of_activity     : ['', Validators.required],
      description      : ['', Validators.required],
      type         : ['', Validators.requiredTrue],
    });
  }
  public onFormSubmit(fields, type) {
    this.defaultDate = $('#defaultDate').val();
    const createFormData = this.formData.value;
    const postString  =  'name_of_activity=' + fields.name_of_activity
      + '&description=' + fields.description
      + '&date=' + this.defaultDate
      + '&assign_to=' + this.assignTo
      + '&type=' + type
    this._service.create(postString, this.authorizationKey,
      'issues/meeting/create').subscribe( response => {
        this._toasterService.success('Data has been successfully created.');
        this.router.navigate(['attestation-list']);
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
        const companyObj = new MeetingModel();
        // @ts-ignore
        this.meeting.push(companyObj);
      }else {
        this._toasterService.warning('Type is already there');
      }
    } else {
      this._toasterService.warning('Please type a similar form name');
    }
  }
}

