import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService} from '../../toster.service';
import { GuestEntertainmentService } from './guest-entertainment.service';
import { GuestEntertainmentModel } from './guest-entertainment.model';

declare var $: any;

@Component({
  selector    : 'app-guest-entertainment-create',
  templateUrl : 'guest-entertainment-create.component.html'
})
export class GuestEntertainmentCreateComponent implements OnInit {
  guestEntertainment: GuestEntertainmentModel[] = [];
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
    private _service: GuestEntertainmentService,
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
    this.form_type    = 'Guest entertainment';
    this.similarTypes.push(this.form_type);
    const residenceObj = new GuestEntertainmentModel();
    // @ts-ignore
    this.guestEntertainment.push(residenceObj);
    this.assignTo = localStorage.getItem('assign_to');
    this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
    this.inputFields = {
      total_number    : '',
      purpose             : '',
      type                : '',
    };

    this.formData = this.fb.group({
      total_number     : ['', Validators.required],
      purpose      : ['', Validators.required],
      type         : ['', Validators.requiredTrue],
    });
  }
  public onFormSubmit(fields, type) {
    this.defaultDate = $('#defaultDate').val();
    const createFormData = this.formData.value;
    const postString  =  'total_number='
      + fields.total_number
      + '&purpose=' + fields.purpose
      + '&date=' + this.defaultDate
      + '&assign_to=' + this.assignTo
      + '&type=' + type
    this._service.create(postString, this.authorizationKey,
      'activity/gestentertainment/create').subscribe( response => {
        this._toasterService.success('Data has been successfully created.');
        this.router.navigate(['guest-entertainment-list']);
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
        const companyObj = new GuestEntertainmentModel();
        // @ts-ignore
        this.guestEntertainment.push(companyObj);
      }else {
        this._toasterService.warning('Type is already there');
      }
    } else {
      this._toasterService.warning('Please type a similar form name');
    }
  }
}

