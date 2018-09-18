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
  roomsFilter;
  getData;
  company_VisitData;
  company_VisitOptions;
  jail_VisitData;
  jail_VisitOptions;
  hostpital_VisitData;
  hostpital_VisitOptions;
  migrationshelter_VisitData;
  migrationshelter_VisitOptions;
  remittance_FincaneData;
  remittance_FincaneOptions;
  budget_FincaneData;
  budget_FincaneOptions;
  marketassessment_ActivityData;
  marketassessment_ActivityOptions;
  employeeenhancement_ActivityData;
  employeeenhancement_ActivityOptions;
  CompanyReportResponse;

  constructor(private _apiProcessService: ApiProcessService,
              private _authentication: AuthenticationService,
              private _http: HttpClient) {

               }

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

      // get company reports;
      this._apiProcessService.getListData(this.authorizationKey, 'user/labourattache').subscribe( response => {
      this.CompanyReportResponse = response;
      });

       /* Module Visit */
      /*
      * Company Visit
      */

      this.company_VisitData = [
      ['Task', 'Hours per Day'],
        ['Work',     11],
        ['Eat',      2],
        ['Commute',  2],
        ['Watch TV', 2],
        ['Sleep',    7] ];

      this.company_VisitOptions  = {
        title: 'Company Visit ',
      };

      /*
      * Jail Visit
      */
       this.jail_VisitData = [
        ['Task', 'Hours per Day'],
        ['Work',     11],
        ['Eat',      2],
        ['Commute',  2],
        ['Watch TV', 2],
        ['Sleep',    7] ];
      this.jail_VisitOptions  = {
        title: 'Jail Visit',
      };

      /*
      * Hostpital Visit
      */
      this.hostpital_VisitData = [
        ['Task', 'Hours per Day'],
        ['Work',     11],
        ['Eat',      2],
        ['Commute',  2],
        ['Watch TV', 2],
        ['Sleep',    7] ];
      this.hostpital_VisitOptions  = {
        title: 'Hostpital Visit ',
      };

      /*
      * Migration Shelter Visit
      */
      this.migrationshelter_VisitData = [
        ['Task', 'Hours per Day'],
        ['Work',     11],
        ['Eat',      2],
        ['Commute',  2],
        ['Watch TV', 2],
        ['Sleep',    7] ];
      this.migrationshelter_VisitOptions  = {
        title: 'Migration Shelter Visit',
      };

      /* Module Finance */
      /*
      * Remittance & WelfareFund
      */
      this.remittance_FincaneData = [
        ['Task', 'Hours per Day'],
        ['Work',     11],
        ['Eat',      2],
        ['Commute',  2],
        ['Watch TV', 2],
        ['Sleep',    7] ];
      this.remittance_FincaneOptions  = {
        title: 'Remittance & WelfareFund',
      };

      /*
      * Budget
      */
      this.budget_FincaneData = [
        ['Task', 'Hours per Day'],
        ['Work',     11],
        ['Eat',      2],
        ['Commute',  2],
        ['Watch TV', 2],
        ['Sleep',    7] ];

      this.budget_FincaneOptions  = {
        title: 'Jail Visit',
      };
  /* Module Activity */
      /*
      * Market Assessment
      */
      this.marketassessment_ActivityData = [
        ['Task', 'Hours per Day'],
        ['Work',     11],
        ['Eat',      2],
        ['Commute',  2],
        ['Watch TV', 2],
        ['Sleep',    7] ];
      this.marketassessment_ActivityOptions  = {
        title: 'Market Assessment Activity ',
      };

      /*
      * Employee Enhancement
      */
      this.employeeenhancement_ActivityData = [
        ['Task', 'Hours per Day'],
        ['Work',     11],
        ['Eat',      2],
        ['Commute',  2],
        ['Watch TV', 2],
        ['Sleep',    7] ];
      this.employeeenhancement_ActivityOptions  = {
        title: 'Employee Enhancement',
      };








   }

}
