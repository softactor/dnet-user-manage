import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService} from '../../toster.service';
import { TermsConditionServiceService } from './terms-condition-service.service';

declare var $: any;

@Component({
  selector    : 'app-terms-condition-service-create',
  templateUrl : 'terms-condition-service-create.component.html'
})
export class TermsConditionServiceCreateComponent implements OnInit {
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
    private _service: TermsConditionServiceService,
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
      places_visited           : '',
      action_taken    : '',
      number_of_verified            : '',
    };

    this.formData = this.fb.group({
      places_visited          : ['', Validators.required],
      action_taken  : ['', Validators.requiredTrue],
      number_of_verified          : ['', Validators.requiredTrue],
    });
  }
  public onFormSubmit() {
    const createFormData = this.formData.value;
    const postString  =  'places_visited=' + createFormData.places_visited
      + '&number_of_verified=' + createFormData.number_of_verified
      + '&action_taken=' + createFormData.action_taken
    this._service.create(postString, this.authorizationKey, 'resolved/termsandconditionservice/create').subscribe( response => {
        this._toasterService.success('Data has been successfully created.');
        this.router.navigate(['terms-condition-list']);
      },
      error => {
        const error_response  = error;
        this.responseError  = error_response.error;
      }
    );
  }
}

