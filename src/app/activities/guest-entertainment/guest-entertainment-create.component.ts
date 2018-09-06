import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService} from '../../toster.service';
import { GuestEntertainmentService } from './guest-entertainment.service';

declare var $: any;

@Component({
  selector    : 'app-guest-entertainment-create',
  templateUrl : 'guest-entertainment-create.component.html'
})
export class GuestEntertainmentCreateComponent implements OnInit {
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
    private _service: GuestEntertainmentService,
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
  public onFormSubmit() {
    const createFormData = this.formData.value;
    const postString  =  'total_number='
      + createFormData.total_number
      + '&purpose=' + createFormData.purpose
      + '&type=' + createFormData.type
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
}

