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
  activityMenuData;
  activityMenu;
  visitMenuData;
  visitMenu;
  assistanceprovideMenuData;
  assistanceprovideMenu;
  querycomplainMenuData;
  querycomplainMenu;
  issueMenuData;
  issueMenu;
  resolvedMenuData;
  resolvedMenu;
  financeMenuData;
  financeMenu;

  constructor(private _service: LeftMenuService) {
  }
  selectIndex: number;

  ngOnInit() {
    this.loggedInUserName   =   localStorage.getItem('logged_user_name');
    this.authorizationKey   =   localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
    this._service.getListData(this.authorizationKey, 'menumanagment/leftmenu/list?parent_id=0').subscribe( parentresponse => {
        this.tableListData = parentresponse;
        this.feedbackData = this.tableListData.results;
      },
      error => {
        console.log(error);
      }
    );
    this._service.getListData(this.authorizationKey, 'menumanagment/leftmenu/list?parent_id=1').subscribe( visitresponse => {
        this.visitMenuData = visitresponse;
        this.visitMenu = this.visitMenuData.results;
      },
      error => {
        console.log(error);
      }
    );
    this._service.getListData(this.authorizationKey, 'menumanagment/leftmenu/list?parent_id=3').subscribe( activityresponse => {
        this.activityMenuData = activityresponse;
        this.activityMenu = this.activityMenuData.results;
      },
      error => {
        console.log(error);
      }
    );
    this._service.getListData(this.authorizationKey, 'menumanagment/leftmenu/list?parent_id=2').subscribe( assistanceprovideresponse => {
        this.assistanceprovideMenuData = assistanceprovideresponse;
        this.assistanceprovideMenu = this.assistanceprovideMenuData.results;
      },
      error => {
        console.log(error);
      }
    );
    this._service.getListData(this.authorizationKey, 'menumanagment/leftmenu/list?parent_id=4').subscribe( querycomplainresponse => {
        this.querycomplainMenuData = querycomplainresponse;
        this.querycomplainMenu = this.querycomplainMenuData.results;
      },
      error => {
        console.log(error);
      }
    );
    this._service.getListData(this.authorizationKey, 'menumanagment/leftmenu/list?parent_id=5').subscribe( issueresponse => {
        this.issueMenuData = issueresponse;
        this.issueMenu = this.issueMenuData.results;
      },
      error => {
        console.log(error);
      }
    );
    this._service.getListData(this.authorizationKey, 'menumanagment/leftmenu/list?parent_id=6').subscribe( resolvedresponse => {
        this.resolvedMenuData = resolvedresponse;
        this.resolvedMenu = this.resolvedMenuData.results;
      },
      error => {
        console.log(error);
      }
    );
    this._service.getListData(this.authorizationKey, 'menumanagment/leftmenu/list?parent_id=7').subscribe( financeresponse => {
        this.financeMenuData = financeresponse;
        this.financeMenu = this.financeMenuData.results;
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
  }

}
