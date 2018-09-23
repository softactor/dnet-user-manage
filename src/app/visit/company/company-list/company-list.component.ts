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
  defaultDate;
  assignTo;
  listApi;
  constructor(
    private _companyService: CompanyService,
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _service: CompanyService,
    private router: Router,
  ) {
    setTimeout(function(){
      $(function() {
        if (!$.fn.DataTable.isDataTable('#company_list')) {
        $('#company_list').DataTable({
          'lengthMenu': [[25, 50, -1], [25, 50, 'All']]
        });
      }
        $('#defaultDate').datepicker({
          dateFormat: 'yy-mm'
        });
        $('#defaultDate').datepicker('setDate', new Date());
    });
    }, 1000);
    this.assignTo = localStorage.getItem('assign_to');
    // this.defaultDate  = $('#defaultDate').val();
    this.defaultDate        =   new Date();
    this.authorizationKey   =   localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
    this.listApi  = 'visit/company/list?type=company';
    this._service.getCompanyListData(this.authorizationKey, this.listApi)
      .subscribe( response => {
        this.tableListData = response;
        this.feedbackData = this.tableListData.results;
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    // to solve the left menu hide problem;
    $(document).ready(() => {
      const trees: any = $('[data-widget="tree"]');
      trees.tree();
    });
  }
  delete(deleteId) {
    const deleteParam  = {
      id                : deleteId,
      authorizationKey  : this.authorizationKey.toString()
    };
    this._service.delete(deleteParam).subscribe( response => {
      this.tableDeleteData = response;
      this._toasterService.success(this.tableDeleteData.message);
      this._service.getCompanyListData(this.authorizationKey, this.listApi).subscribe( listResponse => {
          this.tableListData = listResponse;
          this.feedbackData = this.tableListData.results;
        },
        error => {
          console.log(error);
        }
      );
    });
  }

  dateWiseListData(e) {
     console.log('Check');
     this.defaultDate  =  new Date();
     console.log(this.defaultDate.toString('yyyy-MM-dd'));
     this.defaultDate  = $('#defaultDate').val();
     this._service.getCompanyListData(this.authorizationKey, this.listApi).subscribe( response => {
        this.tableListData = response;
        this.feedbackData = this.tableListData.results;
      },
      error => {
        console.log(error);
      }
    );
  }
}
