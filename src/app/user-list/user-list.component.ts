import { Component, OnInit } from '@angular/core';
import { UserListService } from './user-list.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userListData;
  constructor(private _service: UserListService) {
    _service.getData().subscribe( response => {
      this.userListData = response;
    });
  }

  ngOnInit() {
  }

}
