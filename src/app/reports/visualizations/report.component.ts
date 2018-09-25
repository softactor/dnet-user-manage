import { Component, OnInit } from '@angular/core';
import {GoogleChartComponent} from '../../google-chart/google-chart.component';
import { ApiProcessService } from '../../api-process.service';
import {AuthenticationService} from '../../authentication.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

declare var $: any;

@Component({
  selector: 'app-report-visualization',
  templateUrl: './report.component.html',
})
export class VisualizationReportComponent implements OnInit {
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
  employeeenhancement_ActivityData:any;
  employeeenhancement_ActivityOptions:any;
  CompanyReportResponse;
  from_date;
  ChartData: any;
  ChartContainer: any;

  constructor(private _apiProcessService: ApiProcessService,
              private _authentication: AuthenticationService,
              private _http: HttpClient) {
                  this.employeeenhancement_ActivityData='';
                  this.employeeenhancement_ActivityOptions='';
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
    this.ChartData  = [];
    this.ChartContainer  = [];
    this.from_date  = $('#from_date').val();
    console.log(this.from_date);
    this._apiProcessService.getListData(this.authorizationKey, 'visit/company/report').subscribe( response => {
      this.employeeenhancement_ActivityData = response;
      this.ChartData = ['Task', 'Hours per Day'];
      this.ChartContainer.push(this.ChartData);
      for (const testData of this.employeeenhancement_ActivityData) {
        this.ChartData = [testData.assign_to__country_name, testData.total];
        this.ChartContainer.push(this.ChartData);
      } // end of for
      this.employeeenhancement_ActivityData = this.ChartContainer;
      this.employeeenhancement_ActivityOptions  = {
        title: 'Employee Enhancement',
      };
      console.log('data report');
      console.log(this.ChartContainer);
    });
   }

      // Data Filtering Form Submit
  onDataFilterFormSubmit() {
        this.ChartData  = [];
        this.ChartContainer  = [];
        this.from_date  = $('#from_date').val();
        console.log(this.from_date);
        this._apiProcessService.getListData(this.authorizationKey, 'visit/company/report').subscribe( response => {
        this.employeeenhancement_ActivityData = response;
          this.ChartData = ['Task', 'Hours per Day'];
          this.ChartContainer.push(this.ChartData);

          this.ChartData = ['Canada', 10];
          this.ChartContainer.push(this.ChartData);

          this.ChartData = ['Australia', 11];
          this.ChartContainer.push(this.ChartData);

          this.ChartData = ['Singapore', 15];
          this.ChartContainer.push(this.ChartData);
          this.employeeenhancement_ActivityData = this.ChartContainer;
          this.employeeenhancement_ActivityOptions  = {
            title: 'Employee Enhancement',
          };
          console.log('Check data custome');
          console.log(this.employeeenhancement_ActivityData);
      });
       }


}
