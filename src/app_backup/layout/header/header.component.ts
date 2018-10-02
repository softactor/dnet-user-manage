import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedInUserName;
  constructor() {
    this.loggedInUserName = localStorage.getItem('logged_user_name');
  }

  ngOnInit() {
  }

}
