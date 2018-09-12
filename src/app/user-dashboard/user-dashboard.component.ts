import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
declare var $: any;
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  activeComponent: any;
  constructor(private _authentication: AuthenticationService) {
    this.activeComponent = 'dashboard';
  }

  ngOnInit() {
    // to solve the left menu hide problem;
    $(document).ready(() => {
      const trees: any = $('[data-widget="tree"]');
      trees.tree();
    });
  }

}
