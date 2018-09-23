import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService} from '../../toster.service';
import { CompensationService } from './compensation.service';
import { CompensationModel } from './compensation.model';

declare var $: any;

@Component({
  selector    : 'app-compensation-create',
  templateUrl : 'compensation-create.component.html'
})
export class CompensationCreateComponent implements OnInit {
  compensation: CompensationModel[] = [];
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
    private _service: CompensationService,
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
    this.form_type    = 'Compensation';
    this.similarTypes.push(this.form_type);
    const residenceObj = new CompensationModel();
    // @ts-ignore
    this.compensation.push(residenceObj);
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
    this._service.create(postString, this.authorizationKey, 'resolved/compensation/create').subscribe( response => {
        this._toasterService.success('Data has been successfully created.');
        this.router.navigate(['compensation-list']);
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
        const companyObj = new CompensationModel();
        // @ts-ignore
        this.compensation.push(companyObj);
      }else {
        this._toasterService.warning('Type is already there');
      }
    } else {
      this._toasterService.warning('Please type a similar form name');
    }
  }
}

