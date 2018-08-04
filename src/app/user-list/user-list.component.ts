import { Component, OnInit } from '@angular/core';
import { UserListService } from './user-list.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userListData;
  feedbackData;
  constructor(private _authentication: AuthenticationService, private _service: UserListService) {
    _service.getData().subscribe( response => {
      this.userListData = response;
      this.feedbackData = this.userListData.results;
    },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
  }

}
