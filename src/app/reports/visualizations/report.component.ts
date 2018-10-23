import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import {GoogleChartComponent} from '../../google-chart/google-chart.component';
import { ApiProcessService } from '../../api-process.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService } from '../../toster.service';
import { BaseChartDirective } from 'ng2-charts';
import {DatePipe} from '@angular/common';

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
  to_date;
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
  budgetReportDataInit;
  budgetReportData;
  remittanceReportDataInit;
  remittanceReportData;



//Chart Lebels
  public companyPieChartLabels: string[] = [];
  public jailPieChartLabels: string[] = [];
  public hospitalPieChartLabels: string[] = [];
  public migrantshelterPieChartLabels: string[] = [];
  public budgetPieChartLabels: string[] = [];
  public remittancePieChartLabels: string[] = [];

  // public testData1: number[] =[];
  // public testData2: number[] =[];

  //Chart Data
  public companyPieChartData: number[] = [];
  public jailPieChartData: number[] = [];
  public hospitalPieChartData: number[] = [];
  public migrantshelterPieChartData: number[] =[];
  public budgetPieChartData: number[] = [];
  public remittancePieChartData:number[] =[];
  public testData1: number[] =  [];
  public testData2: number[] =  [];
  public companyData1: number[] = [];
  public companyData2: number[] = [];
  public migrantshelterData1 : number[] =[];
  public migrantshelterData2 : number[] =[];
  public hospitalData1 : number[] =[];
  public hospitalData2 : number[] =[];

  //Chart Type
  public pieChartType: string ='pie';
  public lineChartType: string ='line';
  public doughnutChartType: string ='doughnut';
  public barChartType: string ='bar';
  public polarAreaChartType: string ='polarArea';
  public radarChartType: string ='radar';

  public jailChartLabels : string[] = [];
  public companyChartLabels : string[] = [];
  public migrantshelterChartLabels : string[] = [];
  public hospitalChartLabels : string[] = [];
  canvas:any;


  jailChartData;
  companyChartData;
  migrantshelterChartData;
  hospitalChartData;

  chartOptions = {
    responsive:true
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  constructor(private _apiProcessService: ApiProcessService,
              private _authentication: AuthenticationService,
              private _datePipe:DatePipe,
              public _http: HttpClient) {
    this.companyReportData=[];
    this.jailReportData=[];
    this.hospitalReportData=[];
    this.ChartData  = [];
    this.ChartContainer  = [];
    this.jailChartLabels = [];
    this.companyChartLabels = [];
    this.migrantshelterChartLabels = [];
  }



  ngOnInit() {

    // to solve the left menu hide problem;
    this.jailChartLabels = [];
    this.companyChartLabels =[];
    this.migrantshelterChartLabels = [];

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
      this.companyReportData = response;
      this.companyData1.length =0;
      this.companyData2.length =0;
      this.companyChartLabels.length =0;
      this.companyChartLabels =[];

      for (const companyData of this.companyReportData) {
        this.companyData1.push(companyData.total);
        this.companyData2.push(companyData.no_of_bd);
        this.companyChartLabels.push(companyData.assign_to__country_name);
      }

      this.companyChartData = [
        { data: this.companyData1, label: 'Total Count' },
        { data: this.companyData2, label: 'No Of Bangladeshi'}
      ];
      // end of for
      this.refresh_chart();
    });

    // Jail Visit

    this._apiProcessService.getListData(this.authorizationKey, 'visit/jail/report').subscribe( response => {
      this.jailReportData = response;

      this.testData1.length =0;
      this.testData2.length =0;
      this.jailChartLabels.length =0;


      for (const jailData of this.jailReportData) {
        this.testData1.push(jailData.total);
        this.testData2.push(jailData.no_of_bd);
        this.jailChartLabels.push(jailData.assign_to__country_name);
      }

      this.jailChartData = [
        { data: this.testData1, label: 'Total Count' },
        { data: this.testData2, label: 'No Of Bangladeshi'}
      ];
      // end of for
      this.refresh_chart();
    });

    // get hospital visit reports;
    this._apiProcessService.getReportData(this.authorizationKey, 'visit/hospital/report').subscribe( response => {
      this.hospitalReportData = response;
      this.hospitalData1.length =0;
      this.hospitalData2.length =0;
      this.hospitalChartLabels.length =0;
      this.hospitalChartLabels = [];

      for (const hospitalData of this.hospitalReportData) {
        this.hospitalData1.push(hospitalData.total);
        this.hospitalData2.push(hospitalData.no_of_bd);
        this.hospitalChartLabels.push(hospitalData.assign_to__country_name);
      }

      this.hospitalChartData = [
        { data: this.hospitalData1, label: 'Total Count' },
        { data: this.hospitalData2, label: 'No Of Bangladeshi'}
      ];
      // end of for
      this.refresh_chart();
    });

    // get Migration Shelter visit reports;
    this._apiProcessService.getReportData(this.authorizationKey, 'visit/migrantshelter/report').subscribe( response => {
      this.migrantshelterReportDataInit = response;

      this.migrantshelterData1.length =0;
      this.migrantshelterData2.length =0;
      this.migrantshelterChartLabels.length =0;
      this.migrantshelterChartLabels = [];


      for (const migrantshelterData of this.migrantshelterReportDataInit) {
        this.migrantshelterData1.push(migrantshelterData.total);
        this.migrantshelterData2.push(migrantshelterData.no_of_bd);
        this.migrantshelterChartLabels.push(migrantshelterData.assign_to__country_name);
      }

      this.migrantshelterChartData = [
        { data: this.migrantshelterData1, label: 'Total Count' },
        { data: this.migrantshelterData2, label: 'No Of Bangladeshi'}
      ];
      // end of for
      this.refresh_chart();
    });

    // get Finance budget reports;
    this._apiProcessService.getReportData(this.authorizationKey, 'finance/budget/report').subscribe( response => {
      this.budgetReportDataInit = response;
      this.budgetPieChartData  =  [];

      for (const budgetDataInit of this.budgetReportDataInit) {
        this.budgetPieChartLabels.push(budgetDataInit.assign_to__country_name);
        this.budgetPieChartData.push(budgetDataInit.expenditure);
      }

      //  this.refresh_chart();
    });
    // get Finance Remittance reports;
    this._apiProcessService.getReportData(this.authorizationKey, 'finance/remittanceandwelfarefund/report').subscribe( response => {
      this.remittanceReportDataInit = response;
      this.remittancePieChartData  =  [];

      for (const remittanceDataInit of this.remittanceReportDataInit) {
        this.remittancePieChartLabels.push(remittanceDataInit.assign_to__country_name);
        this.remittancePieChartData.push(remittanceDataInit.remittance);
      }

      //  this.refresh_chart();
    });

  }

  public onDataFilterFormSubmit():void {

    this.jailChartLabels =   [];
    this.companyChartLabels =  [];
    this.migrantshelterChartLabels = [];

    // const date = new Date();
    this.from_date  = $('#from_date').val();
    this.to_date  = $('#to_date').val();

    this.from_date = this._datePipe.transform(this.from_date,"yyy-MM-dd");
    this.to_date = this._datePipe.transform(this.to_date,"yyyy-MM-dd");

    this.labourattache  = $('#labourattache').val()

    //Company Visit
    this._apiProcessService.getReportData(this.authorizationKey, 'visit/company/report?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date).subscribe( response => {
      this.companyReportData = response;
      // this.jailPieChartData.length=0;
      this.companyData1.length =0;
      this.companyData2.length =0;
      this.companyChartLabels.length =0;

      for (const companyData of this.companyReportData) {
        this.companyPieChartLabels.push(companyData.assign_to__country_name);
        // this.jailPieChartData.push(jailData.total);
        this.companyData1.push(companyData.total);
        this.companyData2.push(companyData.no_of_bd);
        this.companyChartLabels.push(companyData.assign_to__country_name);
      }

      this.companyChartData = [
        { data: this.companyData1, label: 'Total Count' },
        { data: this.companyData2, label: 'No Of Bangladeshi'}
      ];
      // end of for
      this.refresh_chart();
    });

    //Jail Visit
    this._apiProcessService.getListData(this.authorizationKey, 'visit/jail/report?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date).subscribe( response => {
      this.jailReportData = response;

      this.testData1.length =0;
      this.testData2.length =0;
      this.jailChartLabels.length =0;
      this.jailChartLabels = [];

      for (const jailData of this.jailReportData) {
        this.jailPieChartLabels.push(jailData.assign_to__country_name);
        // this.jailPieChartData.push(jailData.total);
        this.testData1.push(jailData.total);
        this.testData2.push(jailData.no_of_bd);
        this.jailChartLabels.push(jailData.assign_to__country_name);
      }

      this.jailChartData = [
        { data: this.testData1, label: 'Total Count' },
        { data: this.testData2, label: 'No Of Bangladeshi'}
      ];
      // end of for
      this.refresh_chart();
    });

    //Hospital Visit
    this._apiProcessService.getListData(this.authorizationKey, 'visit/hospital/report?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date).subscribe( response => {
      this.hospitalReportData = response;
      this.hospitalData1.length =0;
      this.hospitalData2.length =0;
      this.hospitalChartLabels.length =0;
      this.hospitalChartLabels = [];

      for (const hospitalData of this.hospitalReportData) {
        this.hospitalData1.push(hospitalData.total);
        this.hospitalData2.push(hospitalData.no_of_bd);
        this.hospitalChartLabels.push(hospitalData.assign_to__country_name);
      }

      this.hospitalChartData = [
        { data: this.hospitalData1, label: 'Total Count' },
        { data: this.hospitalData2, label: 'No Of Bangladeshi'}
      ];
      // end of for
      this.refresh_chart();
    });

    // Migrantshelter Visit
    this._apiProcessService.getListData(this.authorizationKey, 'visit/migrantshelter/report?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date).subscribe( response => {
      this.migrantshelterReportDataInit = response;

      this.migrantshelterData1.length =0;
      this.migrantshelterData2.length =0;
      this.migrantshelterChartLabels.length =0;
      this.migrantshelterChartLabels = [];


      for (const migrantshelterData of this.migrantshelterReportDataInit) {
        this.migrantshelterData1.push(migrantshelterData.total);
        this.migrantshelterData2.push(migrantshelterData.no_of_bd);
        this.migrantshelterChartLabels.push(migrantshelterData.assign_to__country_name);
      }

      this.migrantshelterChartData = [
        { data: this.migrantshelterData1, label: 'Total Count' },
        { data: this.migrantshelterData2, label: 'No Of Bangladeshi'}
      ];
      // end of for
      this.refresh_chart();
    });


    // get Finance budget reports;
    this._apiProcessService.getReportData(this.authorizationKey, 'finance/budget/report?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date).subscribe( response => {
      this.budgetReportData = response;
      this.budgetPieChartLabels.length  = 0;
      this.budgetPieChartLabels  =  [];
      this.budgetPieChartData.length=0;

      for (const budgetData of this.budgetReportData) {
        this.budgetPieChartLabels.push(budgetData.assign_to__country_name);
        this.budgetPieChartData.push(budgetData.expenditure);
      }

      this.refresh_chart();
    });
    // get Finance Remittance reports;
    this._apiProcessService.getReportData(this.authorizationKey, 'finance/remittanceandwelfarefund/report?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date).subscribe( response => {
      this.remittanceReportData = response;
      this.remittancePieChartLabels.length  =  0;
      this.remittancePieChartData.length=0;
      this.remittancePieChartLabels  =  [];


      for (const remittanceData of this.remittanceReportData) {
        this.remittancePieChartLabels.push(remittanceData.assign_to__country_name);
        this.remittancePieChartData.push(remittanceData.remittance);
      }
      this.refresh_chart();
    });
  }

  refresh_chart() {

    setTimeout(() => {
      this._chartRef.refresh();
    }, 100);




  }
}
