import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService } from '../../toster.service';
import { LiaisonWithExpatriatesService } from './liaison-with-expatriates.service';

declare var $: any;

@Component({
  selector    : 'app-liaison-with-expatriates-create',
  templateUrl : 'liaison-with-expatriates-create.component.html'
})
export class LiaisonWithExpatriatesCreateComponent implements OnInit {
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
    private _service: LiaisonWithExpatriatesService,
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
  public onFormSubmit() {
    const createFormData = this.formData.value;
    const postString  =  'number_of_meeting_held='
      + createFormData.number_of_meeting_held
      + '&outcome=' + createFormData.outcome
      + '&type=' + createFormData.type
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
}
