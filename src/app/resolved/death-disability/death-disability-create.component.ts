import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService} from '../../toster.service';
import { DeathDisabilityService } from './death-disability.service';

declare var $: any;

@Component({
  selector    : 'app-arbitration-disputes-create',
  templateUrl : 'death-disability-create.component.html'
})
export class DeathDisabilityCreateComponent implements OnInit {
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
    private _service: DeathDisabilityService,
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
      category            : '',
      number         : '',
      present_status           : '',
      remarks    : '',
    };

    this.formData = this.fb.group({
      category          : ['', Validators.required],
      number       : ['', Validators.required],
      present_status         : ['', Validators.requiredTrue],
      remarks  : ['', Validators.requiredTrue],
    });
  }
  public onFormSubmit() {
    const createFormData = this.formData.value;
    const postString  =  'category=' + createFormData.category
      + '&number=' + createFormData.number
      + '&present_status=' + createFormData.present_status
      + '&remarks=' + createFormData.remarks
    this._service.create(postString, this.authorizationKey, 'resolved/deathordisability/create').subscribe( response => {
        this._toasterService.success('Data has been successfully created.');
        this.router.navigate(['death-disability-list']);
      },
      error => {
        const error_response  = error;
        this.responseError  = error_response.error;
      }
    );
  }
}

