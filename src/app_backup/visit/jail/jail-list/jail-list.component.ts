import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../authentication.service';
import { TosterService } from '../../../toster.service';
import { Router } from '@angular/router';
import { JailService } from '../jail.service';
declare var $: any;

@Component({
  selector: 'app-jail-list',
  templateUrl: './jail-list.component.html',
  styleUrls: ['./jail-list.component.css']
})
export class JailListComponent implements OnInit {

  editId;
  authorizationKey;
  tableListData;
  tableDeleteData;
  tableFeedbackData: any;
  responseError;
  defaultDate;
  assignTo;
  listApi;
  constructor(
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _service: JailService,
    private router: Router,
  ) {
    setTimeout(function(){
      $(function() {
        if(!$.fn.DataTable.isDataTable('#jail_list')){
          $('#jail_list').DataTable({
            'lengthMenu': [[25, 50, -1], [25, 50, 'All']]
          });
        }
      });
    }, 1000)
    this.assignTo = localStorage.getItem('assign_to');
    // this.defaultDate  = $('#defaultDate').val();
    this.defaultDate        =   new Date();
    this.authorizationKey   =   localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
    this.listApi  = 'visit/jail/list?type=Jail';
    this._service.getListData(this.authorizationKey, this.listApi).subscribe( response => {
        this.tableListData = response;
        this.tableFeedbackData = this.tableListData.results;
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
      this._toasterService.success('Data have been successfully deleted.');
      this._service.getListData(this.authorizationKey, this.listApi).subscribe( listResponse => {
          this.tableListData = listResponse;
          this.tableFeedbackData = this.tableListData.results;
        },
        error => {
          const error_response  = error;
          this.responseError  = error_response.error;
        }
      );
    });
  }
}