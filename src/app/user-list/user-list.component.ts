import { Component, OnInit } from '@angular/core';
import { UserListService } from './user-list.service';
import { AuthenticationService } from '../authentication.service';
declare var $: any;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userListData;
  feedbackData;
  constructor(private _authentication: AuthenticationService, private _service: UserListService) {

    setTimeout(function(){
      $(function(){
        $('#example').DataTable({
          'lengthMenu': [[25, 50, -1], [25, 50, 'All']]
        });
      });
    }, 1000)
    _service.getData().subscribe( response => {
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
    console.log('Hello User Data');
    console.log(deleteUserId);
  }

}
