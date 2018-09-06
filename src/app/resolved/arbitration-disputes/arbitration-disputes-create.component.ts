import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService} from '../../toster.service';
import { ArbitrationDisputesService } from './arbitration-disputes.service';

declare var $: any;

@Component({
  selector    : 'app-arbitration-disputes-create',
  templateUrl : 'arbitration-disputes-create.component.html'
})
export class ArbitrationDisputesCreateComponent implements OnInit {
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
    private _service: ArbitrationDisputesService,
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
      resolved_case   : '',
      total_number    : '',
      type            : '',
    };

    this.formData = this.fb.group({
      resolved_case : ['', Validators.requiredTrue],
      total_number  : ['', Validators.requiredTrue],
      type          : ['', Validators.requiredTrue],
    });
  }
  public onFormSubmit() {
    const createFormData = this.formData.value;
    const postString  =  'total_number='
      + createFormData.total_number
      + '&resolved_case=' + createFormData.resolved_case
      + '&type=' + createFormData.type
    this._service.create(postString, this.authorizationKey, 'resolved/arbitrationanddisputes/create').subscribe( response => {
        this._toasterService.success('Data has been successfully created.');
        this.router.navigate(['arbitration-disputes-list']);
      },
      error => {
        const error_response  = error;
        this.responseError  = error_response.error;
      }
    );
  }
}

