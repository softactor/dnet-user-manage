import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import {GoogleChartComponent} from '../../google-chart/google-chart.component';
import { ApiProcessService } from '../../api-process.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService } from '../../toster.service';
import { BaseChartDirective } from 'ng2-charts';

declare var $: any;

@Component({
  selector: 'app-report-visualization',
  templateUrl: './report.component.html',
})

export class VisualizationReportComponent implements OnInit {
  @ViewChild(BaseChartDirective) private _chartRef;
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
  CompanyReportResponse;
  from_date;
  chart;
  first_data;
  companyReportData;
  jailReportData;
  ChartData: any;
  ChartContainer: any;
  test_data:any;
  assignTo;
  visitReportData;
  migrantshelterReportData;
  // Pie
  labourattache;
  companyReportDataInit;
  jailReportDataInit;
  hospitalReportDataInit;
  hospitalReportData;
  migrantshelterReportDataInit;

//Chart Lebels
  public companyPieChartLabels: string[] = [];
  public jailPieChartLabels: string[] = [];
  public hospitalPieChartLabels: string[] = [];
  public migrantshelterPieChartLabels: string[] = [];
  
  //Chart Data
  public companyPieChartData: number[] = [];
  public jailPieChartData: number[] = [];
  public hospitalPieChartData: number[] = [];
  public migrantshelterPieChartData: number[] =[];

  //Chart Type
  public pieChartType: string ='pie';
  public lineChartType: string ='line';
  public doughnutChartType: string ='doughnut';
  public barChartType: string ='bar';
  public polarAreaChartType: string ='polarArea';

  //Color Effect
  public backgroundColor: string = 'fillPattern';
  public borderColor: [
    'rgba(255,99,132,1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
  ];
 

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  constructor(private _apiProcessService: ApiProcessService,
              private _authentication: AuthenticationService,
              public _http: HttpClient) {
                  this.companyReportData=[];
                  this.jailReportData=[];
                  this.hospitalReportData=[];
                  this.ChartData  = [];
                  this.ChartContainer  = [];
               }



  ngOnInit() {
    // to solve the left menu hide problem;
    $(document).ready(() => {
      const trees: any = $('[data-widget="tree"]');
      trees.tree();
      $('#defaultDate').datepicker({
        dateFormat: 'yy-mm-dd'
      });
      $('#defaultDate').datepicker('setDate', new Date());
    });

    // @ts-ignore
    this.assignTo = localStorage.getItem('assign_to');
    this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');

      // get country list;
      this._apiProcessService.getListData(this.authorizationKey, 'locations/countries/list').subscribe( response => {
      this.countryListResponse = response;
       });

      // get labourattache list;
      this._apiProcessService.getListData(this.authorizationKey, 'user/labourattache').subscribe( response => {
      this.labourattacheListResponse = response;
      });

    // get company visit reports;
    this._apiProcessService.getReportData(this.authorizationKey, 'visit/company/report').subscribe( response => {
      this.companyReportDataInit = response;
      this.companyPieChartLabels  =  [];
      this.companyPieChartData  =  [];

      for (const companyData of this.companyReportDataInit) {
        this.companyPieChartLabels.push(companyData.assign_to__country_name);
        this.companyPieChartData.push(companyData.total);
      } // end of for
       this.refresh_chart();
    });

    // get jail visit reports;
    this._apiProcessService.getReportData(this.authorizationKey, 'visit/jail/report').subscribe( response => {
      this.jailReportDataInit = response;
      this.jailPieChartData  =  [];

      for (const jailData of this.jailReportDataInit) {
        this.jailPieChartLabels.push(jailData.assign_to__country_name);
        this.jailPieChartData.push(jailData.total);
      } // end of for
       this.refresh_chart();
    });

    // get hospital visit reports;
    this._apiProcessService.getReportData(this.authorizationKey, 'visit/hospital/report').subscribe( response => {
      this.hospitalReportDataInit = response;
      this.hospitalPieChartData  =  [];
      
      for (const hospitalDataInit of this.hospitalReportDataInit) {
        this.hospitalPieChartLabels.push(hospitalDataInit.assign_to__country_name);
        this.hospitalPieChartData.push(hospitalDataInit.total);
      } // end of for
       this.refresh_chart();
    });

    // get Migration Shelter visit reports;
    this._apiProcessService.getReportData(this.authorizationKey, 'visit/migrantshelter/report').subscribe( response => {
      this.migrantshelterReportDataInit = response;
      this.migrantshelterPieChartData  =  [];
      
      for (const migrantshelterDataInit of this.migrantshelterReportDataInit) {
        this.migrantshelterPieChartLabels.push(migrantshelterDataInit.assign_to__country_name);
        this.migrantshelterPieChartData.push(migrantshelterDataInit.total);
      } // end of for
       this.refresh_chart();
    });

   }

  public onDataFilterFormSubmit():void {
        
        this.from_date  = $('#from_date').val()

        this.labourattache  = $('#labourattache').val()

        //Company Visit
        this._apiProcessService.getListData(this.authorizationKey, 'visit/company/report?la='+this.labourattache).subscribe( response => {
        this.companyReportData = response;
        // console.log(this.companyReportData);
        this.companyPieChartLabels.length = 0;
        this.companyPieChartLabels  =  [];
        this.companyPieChartData  =  [];

        for (const companyFilteredData of this.companyReportData) {
          this.companyPieChartLabels.push(companyFilteredData.assign_to__country_name);
          this.companyPieChartData.push(companyFilteredData.total);
        }
        // end of for
          this.refresh_chart();
        });

        //Jail Visit
        this._apiProcessService.getListData(this.authorizationKey, 'visit/jail/report?la='+this.labourattache).subscribe( response => {
        this.jailReportData = response;
        this.jailPieChartLabels.length = 0;
        this.jailPieChartLabels  =  [];
        this.jailPieChartData  =  [];

        for (const jailData of this.jailReportData) {
          this.jailPieChartLabels.push(jailData.assign_to__country_name);
          this.jailPieChartData.push(jailData.total);
        }

        // end of for
        this.refresh_chart();
      });

      //Hospital Visit
        this._apiProcessService.getListData(this.authorizationKey, 'visit/hospital/report?la='+this.labourattache).subscribe( response => {
        this.hospitalReportData = response;
        this.hospitalPieChartLabels.length = 0;
        this.hospitalPieChartLabels  =  [];
        this.hospitalPieChartData  =  [];

        for (const hospitalData of this.hospitalReportData) {
          this.hospitalPieChartLabels.push(hospitalData.assign_to__country_name);
          this.hospitalPieChartData.push(hospitalData.total);
        }
        // end of for
        this.refresh_chart();
      });

      // Migrantshelter Visit
      this._apiProcessService.getListData(this.authorizationKey, 'visit/hospital/report?la='+this.labourattache).subscribe( response => {
        this.migrantshelterReportData = response;
        this.migrantshelterPieChartLabels.length = 0;
        this.migrantshelterPieChartLabels  =  [];
        this.migrantshelterPieChartData  =  [];

        for (const migrantshelterData of this.migrantshelterReportData) {
          this.hospitalPieChartLabels.push(migrantshelterData.assign_to__country_name);
          this.hospitalPieChartData.push(migrantshelterData.total);
        }
        // end of for
        this.refresh_chart();
      });
    }

  refresh_chart() {
    setTimeout(() => {
      this._chartRef.refresh();
    }, 100);
  }

}
