import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../authentication.service';
import { TosterService } from '../../../toster.service';
import { Router } from '@angular/router';
import { MigrantShelterService } from '../migrant-shelter.service';
declare var $: any;
@Component({
  selector: 'app-migrant-shelter-list',
  templateUrl: './migrant-shelter-list.component.html',
  styleUrls: ['./migrant-shelter-list.component.css']
})
export class MigrantShelterListComponent implements OnInit {

  editId;
  authorizationKey;
  tableListData;
  tableDeleteData;
  tableFeedbackData: any;
  constructor(
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _service: MigrantShelterService,
    private router: Router,
  ) {
    setTimeout(function(){
      $(function() {
        if(!$.fn.DataTable.isDataTable('#migrant_shelter_list')){
          $('#migrant_shelter_list').DataTable({
            'lengthMenu': [[25, 50, -1], [25, 50, 'All']]
          });
        }
      });
    }, 1000)
    this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
    this._service.getListData(this.authorizationKey).subscribe( response => {
        this.tableListData = response;
        this.tableFeedbackData = this.tableListData.results;
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
  }

}
