import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService} from '../../toster.service';
import { DeathDisabilityService } from './death-disability.service';
import { DeadDisabilityModel } from './dead-disability.model';

declare var $: any;

@Component({
  selector    : 'app-arbitration-disputes-create',
  templateUrl : 'death-disability-create.component.html'
})
export class DeathDisabilityCreateComponent implements OnInit {
  deadDisability: DeadDisabilityModel[] = [];
  defaultDate;
  assignTo;
  form_type;
  similarTypes;
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
    private _service: DeathDisabilityService,
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
    this.form_type    = 'Death disability';
    this.similarTypes.push(this.form_type);
    const residenceObj = new DeadDisabilityModel();
    // @ts-ignore
    this.deadDisability.push(residenceObj);
    this.assignTo = localStorage.getItem('assign_to');
    this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
    this.inputFields = {
      category            : '',
      number         : '',
      present_status           : '',
      remarks    : '',
    };

    this.formData = this.fb.group({
      category          : ['', Validators.required],
      number       : ['', Validators.required],
      present_status         : ['', Validators.requiredTrue],
      remarks  : ['', Validators.requiredTrue],
    });
  }
  public onFormSubmit(fields, type) {
    this.defaultDate = $('#defaultDate').val();
    const createFormData = this.formData.value;
    const postString  =  'category=' + fields.category
      + '&number=' + fields.number
      + '&present_status=' + fields.present_status
      + '&remarks=' + fields.remarks
      + '&date=' + this.defaultDate
      + '&assign_to=' + this.assignTo
      + '&type=' + type
    this._service.create(postString, this.authorizationKey, 'resolved/deathordisability/create').subscribe( response => {
        this._toasterService.success('Data has been successfully created.');
        this.router.navigate(['death-disability-list']);
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
        const companyObj = new DeadDisabilityModel();
        // @ts-ignore
        this.deadDisability.push(companyObj);
      }else {
        this._toasterService.warning('Type is already there');
      }
    } else {
      this._toasterService.warning('Please type a similar form name');
    }
  }
}

