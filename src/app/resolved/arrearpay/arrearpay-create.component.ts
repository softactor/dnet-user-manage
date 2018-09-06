import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService} from '../../toster.service';
import { ArrearpayService } from './arrearpay.service';

declare var $: any;

@Component({
  selector    : 'app-arrearpay-create',
  templateUrl : 'arrearpay-create.component.html'
})
export class ArrearpayCreateComponent implements OnInit {
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
    private _service: ArrearpayService,
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
      person_concern_type  : '',
      total_number         : '',
      number_of_case_resolved: '',
    };

    this.formData = this.fb.group({
      person_concern_type          : ['', Validators.required],
      total_number       : ['', Validators.required],
      number_of_case_resolved         : ['', Validators.requiredTrue]
    });
  }
  public onFormSubmit() {
    const createFormData = this.formData.value;
    const postString  =  'person_concern_type=' + createFormData.person_concern_type
      + '&total_number=' + createFormData.total_number
      + '&number_of_case_resolved=' + createFormData.number_of_case_resolved
    this._service.create(postString, this.authorizationKey, 'resolved/arrearpay/create').subscribe( response => {
        this._toasterService.success('Data has been successfully created.');
        this.router.navigate(['arrearpay-list']);
      },
      error => {
        const error_response  = error;
        this.responseError  = error_response.error;
      }
    );
  }
}

