import { Component, OnInit } from '@angular/core';
import {GoogleChartComponent} from '../../../google-chart/google-chart.component';
import { ApiProcessService } from '../../../api-process.service';
import {AuthenticationService} from '../../../authentication.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-company-report',
  templateUrl: './company-report.component.html',
})
export class CompanyReportComponent implements OnInit {
  authorizationKey;
  countryListResponse;
  labourattacheListResponse: any;

  constructor(private _apiProcessService: ApiProcessService,
              private _authentication: AuthenticationService,
              private _http: HttpClient) { }


  /* Module Visit */
      /*
      * Company Visit
      */
      public company_VisitData = [
        ['Task', 'Hours per Day'],
        ['Work',     11],
        ['Eat',      2],
        ['Commute',  2],
        ['Watch TV', 2],
        ['Sleep',    7] ];
      public company_VisitOptions  = {
        title: 'Company Visit ',
      };

      /*
      * Jail Visit
      */
      public jail_VisitData = [
        ['Task', 'Hours per Day'],
        ['Work',     11],
        ['Eat',      2],
        ['Commute',  2],
        ['Watch TV', 2],
        ['Sleep',    7] ];
      public jail_VisitOptions  = {
        title: 'Jail Visit',
      };

      /*
      * Hostpital Visit
      */
      public hostpital_VisitData = [
        ['Task', 'Hours per Day'],
        ['Work',     11],
        ['Eat',      2],
        ['Commute',  2],
        ['Watch TV', 2],
        ['Sleep',    7] ];
      public hostpital_VisitOptions  = {
        title: 'Hostpital Visit ',
      };

      /*
      * Migration Shelter Visit
      */
      public migrationshelter_VisitData = [
        ['Task', 'Hours per Day'],
        ['Work',     11],
        ['Eat',      2],
        ['Commute',  2],
        ['Watch TV', 2],
        ['Sleep',    7] ];
      public migrationshelter_VisitOptions  = {
        title: 'Migration Shelter Visit',
      };

  /* Module Finance */
      /*
      * Remittance & WelfareFund
      */
      public remittance_FincaneData = [
        ['Task', 'Hours per Day'],
        ['Work',     11],
        ['Eat',      2],
        ['Commute',  2],
        ['Watch TV', 2],
        ['Sleep',    7] ];
      public remittance_FincaneOptions  = {
        title: 'Remittance & WelfareFund',
      };

      /*
      * Budget
      */
      public budget_FincaneData = [
        ['Task', 'Hours per Day'],
        ['Work',     11],
        ['Eat',      2],
        ['Commute',  2],
        ['Watch TV', 2],
        ['Sleep',    7] ];
      public budget_FincaneOptions  = {
        title: 'Jail Visit',
      };
  /* Module Activity */
      /*
      * Market Assessment
      */
      public marketassessment_ActivityData = [
        ['Task', 'Hours per Day'],
        ['Work',     11],
        ['Eat',      2],
        ['Commute',  2],
        ['Watch TV', 2],
        ['Sleep',    7] ];
      public marketassessment_ActivityOptions  = {
        title: 'Market Assessment Activity ',
      };

      /*
      * Employee Enhancement
      */
      public employeeenhancement_ActivityData = [
        ['Task', 'Hours per Day'],
        ['Work',     11],
        ['Eat',      2],
        ['Commute',  2],
        ['Watch TV', 2],
        ['Sleep',    7] ];
      public employeeenhancement_ActivityOptions  = {
        title: 'Employee Enhancement',
      };

  ngOnInit() {
      // to solve the left menu hide problem;
      $(document).ready(() => {
      const trees: any = $('[data-widget="tree"]');
      trees.tree();
      });

      this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
      // get country list;
      this._apiProcessService.getListData(this.authorizationKey, 'locations/countries/list').subscribe( response => {
      this.countryListResponse = response;
       });

      // get labourattache list;
      this._apiProcessService.getListData(this.authorizationKey, 'user/labourattache').subscribe( response => {
      this.labourattacheListResponse = response;
      });

   }
}
