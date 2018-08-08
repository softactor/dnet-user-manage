import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { AuthenticationService } from '../../../authentication.service';
import { TosterService } from '../../../toster.service';
import {Router} from '@angular/router';
import {UserListService} from '../../../user-list/user-list.service';
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
  feedbackData;
  constructor(
    private _companyService: CompanyService,
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _service: UserListService,
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
        this.feedbackData = this.companyListData.results;
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit() {

  }

}
