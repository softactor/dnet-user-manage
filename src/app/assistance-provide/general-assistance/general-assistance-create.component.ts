import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService} from '../../toster.service';
import { GeneralAssistanceService } from './general-assistance.service';

declare var $: any;

@Component({
  selector    : 'app-general-assistance-create',
  templateUrl : 'general-assistance-create.component.html'
})
export class GeneralAssistanceCreateComponent implements OnInit {
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
    private _service: GeneralAssistanceService,
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
  public onFormSubmit() {
    const createFormData = this.formData.value;
    const postString  =  'name=' + createFormData.name
      + '&address=' + createFormData.address
      + '&issue=' + createFormData.issue
      + '&action_taken=' + createFormData.action_taken
      + '&type=' + createFormData.type
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
}

