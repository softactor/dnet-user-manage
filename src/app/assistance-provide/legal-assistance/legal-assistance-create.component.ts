import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService} from '../../toster.service';
import { LegalAssistanceService } from './legal-assistance.service';

declare var $: any;

@Component({
  selector    : 'app-legal-assistance-create',
  templateUrl : 'legal-assistance-create.component.html'
})
export class LegalAssistanceCreateComponent implements OnInit {
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
    private _service: LegalAssistanceService,
    private _http: HttpClient) {
  }
  ngOnInit() {
    // to solve the left menu hide problem;
    $(document).ready(() => {
      const trees: any = $('[data-widget="tree"]');
      trees.tree();
    });
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
  public onFormSubmit() {
    const createFormData = this.formData.value;
    const postString  =  'name=' + createFormData.name
      + '&address=' + createFormData.address
      + '&leagal_issue=' + createFormData.leagal_issue
      + '&assistance_provided=' + createFormData.assistance_provided
      + '&type=' + createFormData.type
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
}

