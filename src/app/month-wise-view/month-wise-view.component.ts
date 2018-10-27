import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService } from '../toster.service';
import { MonthWiseViewService } from './month-wise-view.service';
import { ApiProcessService } from '../api-process.service';
import {DatePipe} from '@angular/common';

declare var $: any;

@Component({
  selector    : 'app-month-wise-view',
  templateUrl : 'month-wise-view.component.html'
})
export class MonthWiseViewComponent implements OnInit {
  inputFields;
  formData;
  authorizationKey;
  feedbackData;
  responseError;
  visitData: any;
  financeData:any;
  resolvedData: any;
  issueData: any;
  complaintData: any;
  assistanceData: any;
  activityData:any;
  labourattacheListResponse;
  from_date;
  to_date;
  labourattache;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _service: MonthWiseViewService,
    private _apiProcessService: ApiProcessService,
    private _datePipe:DatePipe,
    private _http: HttpClient) {
  }
  ngOnInit() {
    
    // to solve the left menu hide problem;
    $(document).ready(() => {
      const trees: any = $('[data-widget="tree"]');
      trees.tree();
      
    });
    // get labourattache list;
    
    this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
    this._apiProcessService.getListData(this.authorizationKey, 'user/labourattache').subscribe( response => {
      this.labourattacheListResponse = response;
    });
    
    
    this.getTabdata('visit')
  }

  getTabdata(component,from_date='',to_date='',labourattache='') {
    // const date = new Date();
    this.from_date  = from_date;
    this.to_date  = to_date;

    this.from_date = this._datePipe.transform(this.from_date,"yyy-MM-dd");
    this.to_date = this._datePipe.transform(this.to_date,"yyyy-MM-dd");
        
    this.labourattache  = labourattache;
    let compoList;
   
    switch(component) {
      case 'visit':
        compoList = [
          {
            component : 'Company',
            api       : 'visit/company/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date
          },
          {
            component : 'Residence',
            api       : 'visit/residence/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date
          },
          {
            component : 'Deportation center',
            api       : 'visit/deportationcenter/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date
          },
          {
            component : 'Jail',
            api       : 'visit/jail/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date
          },
          {
            component : 'Migrant shelter',
            api       : 'visit/migrantshelter/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date
          }
        ];
        this.visitData = this._service.getComponetListData(compoList, this.authorizationKey);
        break;
      case 'activity':
        compoList = [
          {
            component : 'Market assessment',
            api       : 'activity/attestation/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date
          },
          {
            component : 'Employee enhancement',
            api       : 'activity/employeeenhancement/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date
          },
          {
            component : 'Other activity',
            api       : 'activity/otheractivity/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date
          },
          {
            component : 'Work plan',
            api       : 'activity/wrokplane/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date
          },
          {
            component : 'Attestation',
            api       : 'activity/attestation/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date
          },
          {
            component : 'Guest entertainment',
            api       : 'activity/gestentertainment/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date
          },
          {
            component : 'Liaison with expatriates',
            api       : 'activity/liaisonwithexpatriates/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date
          }
        ];
        this.activityData = this._service.getComponetListData(compoList, this.authorizationKey);
        break;
      case 'assistance':
        compoList = [
          {
            component : 'General Assistance',
            api       : 'assistanceprovidation/generalassistance/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date
          },
          {
            component : 'Legal Assistance',
            api       : 'assistanceprovidation/legalassistance/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date
          }
        ];
        this.assistanceData = this._service.getComponetListData(compoList, this.authorizationKey);
        break;
      case 'complain':
        compoList = [
          {
            component : 'Query received',
            api       : 'querycomplain/queryreceived/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date
          },
          {
            component : 'Complaints',
            api       : 'querycomplain/complaints/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date
          },
          {
            component : 'Trade query',
            api       : 'querycomplain/tradequery/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date
          }
        ];
        this.complaintData = this._service.getComponetListData(compoList, this.authorizationKey);
        break;
      case 'issue':
        compoList = [
          {
            component : 'Conference',
            api       : 'activity/attestation/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date
          },
          {
            component : 'Meeting',
            api       : 'activity/attestation/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date
          }
        ];
        this.issueData = this._service.getComponetListData(compoList, this.authorizationKey);
        break;
      case 'resolved':
        compoList = [
          {
            component : 'Arbitration Disputes',
            api       : 'resolved/arbitrationanddisputes/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date
          },
          {
            component : 'Arrear pay',
            api       : 'resolved/arrearpay/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date
          },
          {
            component : 'Compensation',
            api       : 'resolved/compensation/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date
          },
          {
            component : 'Deadbody repatriation',
            api       : 'resolved/deadbodyrepatriation/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date
          },
          {
            component : 'Death disability',
            api       : 'resolved/deathordisability/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date
          },
          {
            component : 'Monthly problem resolved',
            api       : 'resolved/monthlyproblemresolved/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date
          },
          {
            component : 'Remit FC',
            api       : 'resolved/remitfc/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date
          },
          {
            component : 'Terms & Condition Service',
            api       : 'resolved/termsandconditionservice/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date
          }
        ];
        this.resolvedData = this._service.getComponetListData(compoList, this.authorizationKey);
        break;
      case 'finance':
        compoList = [
          {
            component : 'Remittance and welfare fund',
            api       : 'finance/remittanceandwelfarefund/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date
          },
          {
            component : 'Budget',
            api       : 'finance/budget/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date
          }
        ];
        this.financeData = this._service.getComponetListData(compoList, this.authorizationKey);
        break;
    }
  }
  public onDataFilterFormSubmit():void {
                
    // const date = new Date();
    this.from_date  = $('#from_date').val();
    this.to_date  = $('#to_date').val();

    this.from_date = this._datePipe.transform(this.from_date,"yyy-MM-dd");
    this.to_date = this._datePipe.transform(this.to_date,"yyyy-MM-dd");
    
    this.labourattache  = $('#labourattache').val()
    // this.getContent(this.labourattache, this.from_date, this.to_date)
    this.getTabdata('visit', this.labourattache, this.from_date, this.to_date)
  }
  // getContent(labourattache='', from_date='',to_date=''){
  //   const compoList = [
  //     {
  //       component : 'Company',
  //       api       : 'visit/company/list?la='+labourattache +'&from_date='+from_date+'&to_date='+to_date
  //     },
  //     {
  //       component : 'Residence',
  //       api       : 'visit/residence/list?la='+labourattache +'&from_date='+from_date+'&to_date='+to_date
  //     },
  //     {
  //       component : 'Deportation center',
  //       api       : 'visit/deportationcenter/list?la='+labourattache +'&from_date='+from_date+'&to_date='+to_date
  //     },
  //     {
  //       component : 'Jail',
  //       api       : 'visit/jail/list?la='+labourattache +'&from_date='+from_date+'&to_date='+to_date
  //     },
  //     {
  //       component : 'Migrant shelter',
  //       api       : 'visit/migrantshelter/list?la='+labourattache +'&from_date='+from_date+'&to_date='+to_date
  //     }
  //   ];
  //   this.visitData = this._service.getComponetListData(compoList, this.authorizationKey);
  // }
}

