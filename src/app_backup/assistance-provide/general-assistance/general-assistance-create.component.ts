import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService} from '../../toster.service';
import { GeneralAssistanceService } from './general-assistance.service';
import { GeneralAssistanceModel } from './general-assistance.model';

declare var $: any;

@Component({
  selector    : 'app-general-assistance-create',
  templateUrl : 'general-assistance-create.component.html'
})
export class GeneralAssistanceCreateComponent implements OnInit {
  generalAssistance: GeneralAssistanceModel[] = [];
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
    private _service: GeneralAssistanceService,
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
    this.form_type    = 'General assistance';
    this.similarTypes.push(this.form_type);
    const residenceObj = new GeneralAssistanceModel();
    // @ts-ignore
    this.generalAssistance.push(residenceObj);
    this.assignTo = localStorage.getItem('assign_to');
    this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
    this.inputFields = {
      name            : '',
      address         : '',
      issue           : '',
      action_taken    : '',
      type            : '',
    };

    this.formData = this.fb.group({
      name          : ['', Validators.required],
      address       : ['', Validators.required],
      issue         : ['', Validators.requiredTrue],
      action_taken  : ['', Validators.requiredTrue],
      type          : ['', Validators.requiredTrue],
    });
  }
  public onFormSubmit(fields, type) {
    this.defaultDate = $('#defaultDate').val();
    const createFormData = this.formData.value;
    const postString  =  'name=' + fields.name
      + '&address=' + fields.address
      + '&issue=' + fields.issue
      + '&action_taken=' + fields.action_taken
      + '&date=' + this.defaultDate
      + '&assign_to=' + this.assignTo
      + '&type=' + type
    this._service.create(postString, this.authorizationKey, 'assistanceprovidation/generalassistance/create').subscribe( response => {
        this._toasterService.success('Data has been successfully created.');
        this.router.navigate(['general-assistance-list']);
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
        const companyObj = new GeneralAssistanceModel();
        // @ts-ignore
        this.generalAssistance.push(companyObj);
      }else {
        this._toasterService.warning('Type is already there');
      }
    } else {
      this._toasterService.warning('Please type a similar form name');
    }
  }
}

