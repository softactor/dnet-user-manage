import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService } from '../../../toster.service';
import { AuthenticationService } from '../../../authentication.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.css']
})
export class CompanyCreateComponent implements OnInit {
  companyFields;
  companyFormData;
  authorizationKey;
  feedbackData;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _companyService: CompanyService,
    private _http: HttpClient) {
  }
  ngOnInit() {
    this.authorizationKey = this._authentication.token_type + ' ' + this._authentication.access_token;
    this.companyFields = {
      name    : '',
      address : '',
      outcome : ''
    };

    this.companyFormData = this.fb.group({
      name         : ['', Validators.required],
      address      : ['', Validators.required],
      outcome      : ['', Validators.requiredTrue]
    });
  }

  public onCompanyFormSubmit() {
    this._companyService.createComapany(this.companyFormData.value, this.authorizationKey).subscribe( response => {
      this._toasterService.success('Company has been successfully created.');
      this.router.navigate(['company-list']);
    });
  }

}
