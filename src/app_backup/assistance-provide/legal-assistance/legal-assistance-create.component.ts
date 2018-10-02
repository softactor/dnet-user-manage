import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService} from '../../toster.service';
import { LegalAssistanceService } from './legal-assistance.service';
import { LegallAssistanceModel } from './legall-assistance.model';

declare var $: any;

@Component({
  selector    : 'app-legal-assistance-create',
  templateUrl : 'legal-assistance-create.component.html'
})
export class LegalAssistanceCreateComponent implements OnInit {
  legallAssistance: LegallAssistanceModel[] = [];
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
    private _service: LegalAssistanceService,
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
    this.form_type    = 'Legal assistance';
    this.similarTypes.push(this.form_type);
    const residenceObj = new LegallAssistanceModel();
    // @ts-ignore
    this.legallAssistance.push(residenceObj);
    this.assignTo = localStorage.getItem('assign_to');
    this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
    this.inputFields = {
      name            : '',
      address         : '',
      leagal_issue    : '',
      assistance_provided    : '',
      type            : '',
    };

    this.formData = this.fb.group({
      name                  : ['', Validators.required],
      address               : ['', Validators.required],
      leagal_issue          : ['', Validators.requiredTrue],
      assistance_provided   : ['', Validators.requiredTrue],
      type                  : ['', Validators.requiredTrue],
    });
  }
  public onFormSubmit(fields, type) {
    this.defaultDate = $('#defaultDate').val();
    const createFormData = this.formData.value;
    const postString  =  'name=' + fields.name
      + '&address=' + fields.address
      + '&leagal_issue=' + fields.leagal_issue
      + '&assistance_provided=' + fields.assistance_provided
      + '&date=' + this.defaultDate
      + '&assign_to=' + this.assignTo
      + '&type=' + type
    this._service.create(postString, this.authorizationKey, 'assistanceprovidation/leagalassistance/create').subscribe( response => {
        this._toasterService.success('Data has been successfully created.');
        this.router.navigate(['legal-assistance-list']);
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
        const companyObj = new LegallAssistanceModel();
        // @ts-ignore
        this.legallAssistance.push(companyObj);
      }else {
        this._toasterService.warning('Type is already there');
      }
    } else {
      this._toasterService.warning('Please type a similar form name');
    }
  }
}

