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
  editId;
  authorizationKey;
  tableListData;
  tableDeleteData;
  feedbackData: any;
  constructor(
    private _companyService: CompanyService,
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _service: CompanyService,
    private router: Router,
  ) {
    setTimeout(function(){
      $(function() {
        if(!$.fn.DataTable.isDataTable('#company_list')){
        $('#company_list').DataTable({
          'lengthMenu': [[25, 50, -1], [25, 50, 'All']]
        });
      }
    });
    }, 1000)
    this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
    this._service.getCompanyListData(this.authorizationKey).subscribe( response => {
        this.tableListData = response;
        this.feedbackData = this.tableListData.results;
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit() {

  }
  delete(deleteId) {
    const deleteParam  = {
      id                : deleteId,
      authorizationKey  : this.authorizationKey.toString()
    };
    this._service.delete(deleteParam).subscribe( response => {
      this.tableDeleteData = response;
      this._toasterService.success(this.tableDeleteData.message);
      this._service.getCompanyListData(this.authorizationKey.toString()).subscribe( listResponse => {
          this.tableListData = listResponse;
          this.feedbackData = this.tableListData.results;
        },
        error => {
          console.log(error);
        }
      );
    });
  }

}
