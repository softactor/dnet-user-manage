import { Component, OnInit } from '@angular/core';
import {GoogleChartComponent} from '../../google-chart/google-chart.component';
import { ApiProcessService } from '../../api-process.service';
import {AuthenticationService} from '../../authentication.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Chart } from 'angular-highcharts';

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
  chart;
  first_data;
  companyReportData;

  constructor(private _apiProcessService: ApiProcessService,
              private _authentication: AuthenticationService,
              private _http: HttpClient) {
                  this.employeeenhancement_ActivityData='';
                  this.employeeenhancement_ActivityOptions='';
                  this.companyReportData=[];
               }





  // add point to chart serie
  //add() {
    //this.chart.addPoint(Math.floor(Math.random() * 10));
  //}








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

      this.companyReportData = this._apiProcessService.getListData(this.authorizationKey, 'visit/company/report').subscribe( response => {
         this.companyReportData = response;
         console.log(this.companyReportData)

      });


      this.chart = new Chart({
       chart: {
            type: 'bar'
        },
        title: {
            text: 'Stacked bar chart'
        },
        xAxis: {
            categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total fruit consumption'
            }
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series:this.first_data,
  });

   }

      //Data Filtering Form Submit
  onDataFilterFormSubmit() {
        this.from_date  = $('#from_date').val();
        console.log(this.from_date);
        this._apiProcessService.getListData(this.authorizationKey, 'visit/company/report').subscribe( response => {
        console.log(response);
      });
  }








}
