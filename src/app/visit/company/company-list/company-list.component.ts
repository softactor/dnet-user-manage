import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { AuthenticationService } from '../../../authentication.service';
import { TosterService } from '../../../toster.service';
import {Router} from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  editCompanyId;
  authorizationKey;
  companyListData;
  companyDeleteData;
  companyFeedbackData: any;
  constructor(
    private _companyService: CompanyService,
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _service: CompanyService,
    private router: Router,
  ) {
    setTimeout(function(){
      $(function(){
        $('#company_list').DataTable({
          'lengthMenu': [[25, 50, -1], [25, 50, 'All']]
        });
      });
    }, 1000)
    this.authorizationKey = this._authentication.token_type + ' ' + this._authentication.access_token;
    this._companyService.getCompanyListData(this.authorizationKey).subscribe( response => {
        this.companyListData = response;
        this.companyFeedbackData = this.companyListData.results;
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit() {

  }
  deleteCompany(deleteCompanyId) {
    const companyDeleteParam  = {
      companyId        : deleteCompanyId,
      authorizationKey  : this.authorizationKey.toString()
    };
    this._service.deleteCompany(companyDeleteParam).subscribe( response => {
      this.companyDeleteData = response;
      this._toasterService.success(this.companyDeleteData.message);
      this._service.getCompanyListData(this.authorizationKey.toString()).subscribe( response => {
          this.companyListData = response;
          this.companyFeedbackData = this.companyListData.results;
        },
        error => {
          console.log(error);
        }
      );
    });
  }

}
