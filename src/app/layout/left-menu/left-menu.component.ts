import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {
  loggedInUserName;
  constructor() {
    this.loggedInUserName = localStorage.getItem('logged_user_name');
  }

  ngOnInit() {
  }

}
