import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService} from '../../toster.service';
import { RemitFcService } from './remit-fc.service';
import { RemitFcModel } from './remit-fc.model';

declare var $: any;

@Component({
  selector    : 'app-remit-fc-create',
  templateUrl : 'remit-fc-create.component.html'
})
export class RemitFcCreateComponent implements OnInit {
  remitFc: RemitFcModel[] = [];
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
    private _service: RemitFcService,
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
    this.form_type    = 'Remit fc';
    this.similarTypes.push(this.form_type);
    const residenceObj = new RemitFcModel();
    // @ts-ignore
    this.remitFc.push(residenceObj);
    this.assignTo = localStorage.getItem('assign_to');
    this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
    this.inputFields = {
      remit_type            : '',
      no         : '',
      outcome           : '',
    };

    this.formData = this.fb.group({
      remit_type          : ['', Validators.required],
      no       : ['', Validators.required],
      outcome         : ['', Validators.requiredTrue]
    });
  }
  public onFormSubmit(fields, type) {
    this.defaultDate = $('#defaultDate').val();
    const createFormData = this.formData.value;
    const postString  =  'remit_type=' + fields.remit_type
      + '&no=' + fields.no
      + '&outcome=' + fields.outcome
      + '&date=' + this.defaultDate
      + '&assign_to=' + this.assignTo
      + '&type=' + type
    this._service.create(postString, this.authorizationKey, 'resolved/remitfc/create').subscribe( response => {
        this._toasterService.success('Data has been successfully created.');
        this.router.navigate(['remit-fc-list']);
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
        const companyObj = new RemitFcModel();
        // @ts-ignore
        this.remitFc.push(companyObj);
      }else {
        this._toasterService.warning('Type is already there');
      }
    } else {
      this._toasterService.warning('Please type a similar form name');
    }
  }
}

