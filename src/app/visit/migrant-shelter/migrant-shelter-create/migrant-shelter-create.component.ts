import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService } from '../../../toster.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../authentication.service';
import { MigrantShelterService } from '../migrant-shelter.service';

@Component({
  selector: 'app-migrant-shelter-create',
  templateUrl: './migrant-shelter-create.component.html',
  styleUrls: ['./migrant-shelter-create.component.css']
})
export class MigrantShelterCreateComponent implements OnInit {

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
    private _service: MigrantShelterService,
    private _http: HttpClient) {
  }

  ngOnInit() {
    this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
    this.inputFields = {
      name    : '',
      address : '',
      outcome : '',
      no_of_bangladeshis : '',
      type : '',
      remark : '',
    };

    this.formData = this.fb.group({
      name         : ['', Validators.required],
      address      : ['', Validators.required],
      no_of_bangladeshis      : ['', Validators.requiredTrue],
      type      : ['', Validators.requiredTrue],
      remark      : ['', Validators.requiredTrue],
    });
  }
  public onFormSubmit() {
    this._service.create(this.formData.value, this.authorizationKey).subscribe( response => {
      this._toasterService.success('Data has been successfully created.');
      this.router.navigate(['migrant-shelter-list']);
    },
      error => {
        const error_response  = error;
        this.responseError  = error_response.error;
      }
    );
  }

}
