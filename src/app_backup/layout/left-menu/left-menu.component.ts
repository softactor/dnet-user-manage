import { Component, OnInit } from '@angular/core';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { LeftMenuService } from './left-menu.service';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {
  loggedInUserName;
  authorizationKey;
  tableListData;
  tableDeleteData;
  feedbackData: any;
  tableFeedbackData;
  responseError;
  defaultDate;
  assignTo;
  listApi;
  childMenuData;
  childMenu;
  constructor(private _service: LeftMenuService) {
  }
  selectIndex: number;

  ngOnInit() {
    this.loggedInUserName   =   localStorage.getItem('logged_user_name');
    this.authorizationKey   =   localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
    this.listApi  = 'menumanagment/leftmenu/list?parent_id=0';
    this._service.getListData(this.authorizationKey, this.listApi).subscribe( response => {
        this.tableListData = response;
        this.feedbackData = this.tableListData.results;
      },
      error => {
        console.log(error);
      }
    );
    this.listApi  = 'menumanagment/leftmenu/list?parent_id=1';
    this._service.getListData(this.authorizationKey, this.listApi).subscribe( response => {
        this.childMenuData = response;
        this.childMenu = this.childMenuData.results;
      },
      error => {
        console.log(error);
      }
    );
  }
  addActiveClass(index) {
    this.selectIndex  = index;
  }
  getParentMenu() {
    console.log('I am calling');
    return true;
  }

}
