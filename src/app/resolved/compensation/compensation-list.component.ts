import { Component, OnInit } from '@angular/core';
import { CompensationService } from './compensation.service';
import { AuthenticationService } from '../../authentication.service';
import { TosterService } from '../../toster.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-arbitration-disputes-list',
  templateUrl: './compensation-list.component.html'
})
export class CompensationListComponent implements OnInit {
  editId;
  authorizationKey;
  tableListData;
  tableDeleteData;
  feedbackData: any;
  tableFeedbackData;
  responseError;
  defaultDate;
  assignTo;
  list_param;
  listApi;
  listTitle;
  constructor(
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _service: CompensationService,
    private router: Router,
    private _activateRoute: ActivatedRoute,
  ) {
    setTimeout(function(){
      $(function() {
        if (!$.fn.DataTable.isDataTable('#data_list')){
        $('#data_list').DataTable({
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
    this._activateRoute.paramMap
      .subscribe( params => {
        this.list_param = params.get('list_param');
        this.listTitle = this.list_param;
        this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
        this.listApi  = 'resolved/compensation/list?type=' + this.list_param;
        this._service.getListData(this.authorizationKey, this.listApi)
          .subscribe( response => {
              this.tableListData  = response;
              this.feedbackData   = this.tableListData.results;
            },
            error => {
              console.log(error);
            }
          );
      });
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
      authorizationKey  : this.authorizationKey
    };
    this._service.delete(deleteParam, 'resolved/compensation/delete/').subscribe( response => {
      this.tableDeleteData = response;
      this._toasterService.success('Data have been successfully deleted.');
      this._service.getListData(this.authorizationKey, this.listApi).subscribe( listResponse => {
          this.tableListData = listResponse;
          this.feedbackData = this.tableListData.results;
        },
        error => {
          const error_response  = error;
          this.responseError  = error_response.error;
        }
      );
    });
  }

}
