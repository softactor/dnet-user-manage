import { Component, OnInit } from '@angular/core';
import { TosterService } from '../../../toster.service';
import { AuthenticationService } from '../../../authentication.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import { CompanyService } from '../company.service';
import {FormBuilder, NgForm} from '@angular/forms';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {
  editCompanyId;
  authorizationKey;
  companyEditData;
  name  = '';
  address = '';
  outcome = '';
  companyUpdateResponse;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _activateRoute: ActivatedRoute,
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _companyService: CompanyService,
    private _http: HttpClient) {
  }

  ngOnInit() {
    this._activateRoute.paramMap
      .subscribe( params => {
        let companyId  = params.get('company_id')
        this.editCompanyId = companyId;
        this.authorizationKey = this._authentication.token_type + ' ' + this._authentication.access_token;
        const getCompanyDetailsParam  = {
          editCompanyId        : companyId,
          authorizationKey  : this.authorizationKey.toString()
        };

        this._companyService.getCompanyDetailsById(getCompanyDetailsParam).subscribe( companyDetails => {
          this.companyEditData = companyDetails;
          this.name = this.companyEditData.name;
          this.address = this.companyEditData.address;
          this.outcome = this.companyEditData.outcome;
        });
      });
  }
  public updateCompany(form: NgForm, e) {
    e.preventDefault();
    if (form.valid) {
      const companyUpdateParam = {
        name           : form.value.name,
        address        : form.value.address,
        outcome        : form.value.outcome,
        editCompanyId     : this.editCompanyId,
        authorization  : this.authorizationKey
      };
      this._companyService.updateCompanyData(companyUpdateParam).subscribe( response => {
        this._toasterService.success('Company has been successfully updated.');
        this.router.navigate(['company-list']);
      });
    }else {
      this._toasterService.error('All fields are required');
    }
  }

}
