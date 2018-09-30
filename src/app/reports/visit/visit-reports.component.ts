import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService } from '../../toster.service';
import { ApiProcessService } from '../../api-process.service';
import { BaseChartDirective } from 'ng2-charts';
declare var $: any;
@Component({
  selector: 'app-visit-report',
  templateUrl: 'visit-report.component.html'
})

export class VisitReportsComponent implements OnInit {
  @ViewChild(BaseChartDirective) private _chartRef;
  assignTo;
  authorizationKey;
  visitReportData;
  // Pie
  public pieChartLabels: string[] = ['Bangladesh', 'India', 'Pakisthan'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType: string = 'pie';
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _apiProcessService: ApiProcessService,
    private _http: HttpClient) {
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
  }  
  public randomize(): void {
    this._apiProcessService.getListData(this.authorizationKey, 'visit/company/report').subscribe( response => {
      this.visitReportData = response;
      this.pieChartLabels.length = 0;
      this.pieChartLabels  =  [];
      this.pieChartData  =  [];
      for (const testData of this.visitReportData) {
        this.pieChartLabels.push(testData.assign_to__country_name);
        this.pieChartData.push(testData.total);
      } // end of for
      this.refresh_chart();
    });
  }
  refresh_chart() {
    setTimeout(() => {
      this._chartRef.refresh();
    }, 100);
  }
}
