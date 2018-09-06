import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService} from '../../toster.service';
import { RemitFcService } from './remit-fc.service';

declare var $: any;

@Component({
  selector    : 'app-remit-fc-create',
  templateUrl : 'remit-fc-create.component.html'
})
export class RemitFcCreateComponent implements OnInit {
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
    private _service: RemitFcService,
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
  public onFormSubmit() {
    const createFormData = this.formData.value;
    const postString  =  'remit_type=' + createFormData.remit_type
      + '&no=' + createFormData.no
      + '&outcome=' + createFormData.outcome
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
}

