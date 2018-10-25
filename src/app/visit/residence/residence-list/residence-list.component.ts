import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../authentication.service';
import { TosterService } from '../../../toster.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ResidenceService } from '../residence.service';

declare var $: any;

@Component({
  selector: 'app-residence-list',
  templateUrl: './residence-list.component.html',
  styleUrls: ['./residence-list.component.css']
})
export class ResidenceListComponent implements OnInit {

  editId;
  authorizationKey;
  tableListData;
  tableDeleteData;
  feedbackData: any;
  listApi;
  list_param;
  listTitle;
  constructor(
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _service: ResidenceService,
    private _activateRoute: ActivatedRoute,
    private router: Router,
  ) {
    setTimeout(function() {
      $(function() {
        if (!$.fn.DataTable.isDataTable('#residence_list')){
          $('#residence_list').DataTable({
            'lengthMenu': [[25, 50, -1], [25, 50, 'All']]
          });
        }
      });
    }, 1000);
    this._activateRoute.paramMap
      .subscribe( params => {
        this.list_param = params.get('list_param');
        this.listTitle = this.list_param;
        this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
        this.listApi  = 'visit/residence/list?type=' + this.list_param;
        this._service.getListData(this.authorizationKey, this.listApi)
          .subscribe( response => {
              this.tableListData = response;
              this.feedbackData = this.tableListData.results;
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
      id        : deleteId,
      authorizationKey  : this.authorizationKey.toString()
    };
    this._service.delete(deleteParam).subscribe( response => {
      this.tableDeleteData = response;
      this._toasterService.success('Data has been successfully deleted.');
      this._service.getListData(this.authorizationKey, this.listApi).subscribe( listResponse => {
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
