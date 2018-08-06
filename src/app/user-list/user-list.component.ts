import { Component, OnInit } from '@angular/core';
import { UserListService } from './user-list.service';
import { AuthenticationService } from '../authentication.service';
import {TosterService} from '../toster.service';
import {Router} from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  authorizationKey;
  userListData;
  userDeleteData;
  feedbackData;
  constructor(
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _service: UserListService,
    private router: Router,
  ) {

    setTimeout(function(){
      $(function(){
        $('#example').DataTable({
          'lengthMenu': [[25, 50, -1], [25, 50, 'All']]
        });
      });
    }, 1000)
    this._service.getData().subscribe( response => {
        this.userListData = response;
        this.feedbackData = this.userListData.results;
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {

  }

  deleteUser(deleteUserId) {
    this.authorizationKey = this._authentication.token_type + ' ' + this._authentication.access_token;
    const userDeleteParam  = {
      userId        : deleteUserId,
      authorizationKey  : this.authorizationKey.toString()
    };
    this._service.deleteUserData(userDeleteParam).subscribe( response => {
      this.userDeleteData = response;
      $('row_id_' + deleteUserId).hide();
      this._toasterService.success(this.userDeleteData.message);
      // this.router.navigate(['user-list']);
      this._service.getData().subscribe( response => {
          this.userListData = response;
          this.feedbackData = this.userListData.results;
        },
        error => {
          console.log(error);
        }
      );
    });
  }

}
