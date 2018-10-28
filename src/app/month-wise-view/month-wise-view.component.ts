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
  companyVisitData;
  residenceVisitData : any;
  deportationcenterVisitData : any;
  jailVisitData : any;
  migrantshelterVisitData : any;
  
  companyVisitDataArray;
  residenceVisitDataArray;
  financeVisitDataArray;
  resolvedVisitDataArray;
  issueVisitDataArray;
  complaintVisitDataArray;
  assistanceVisitDataArray;
  activityVisitDataArray;
  deportationcenterVisitDataArray;
  jailVisitDataArray;
  migrantshelterVisitDataArray;
  employeeenhancementVisitDataArray;
  otheractivityVisitDataArray;
  wrokplaneVisitDataArray;
  gestentertainmentVisitDataArray;
  liaisonwithexpatriatesVisitDataArray;
  attestationVisitDataArray;
  generalassistanceVisitDataArray;
  legalassistanceVisitDataArray;
  queryreceivedVisitDataArray;
  complaintsVisitDataArray;
  tradequeryVisitDataArray;
  meetingVisitDataArray;
  conferanceVisitDataArray;
  arbitrationanddisputesVisitDataArray;
  arrearpayVisitDataArray;
  compensationVisitDataArray;
  deadbodyrepatriationVisitDataArray;
  deathordisabilityVisitDataArray;
  monthlyproblemresolvedVisitDataArray;
  remitfcVisitDataArray;
  termsandconditionserviceVisitDataArray;
  remittanceandwelfarefundVisitDataArray;
  budgetVisitDataArray;
  

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
  activityVisitData;
  employeeenhancementVisitData;
  otheractivityVisitData;
  wrokplaneVisitData;
  gestentertainmentVisitData;
  liaisonwithexpatriatesVisitData;
  attestationVisitData;
  generalassistanceVisitData;
  legalassistanceVisitData;
  queryreceivedVisitData;
  complaintsVisitData;
  tradequeryVisitData;
  meetingVisitData;
  conferanceVisitData;
  arbitrationanddisputesVisitData;
  arrearpayVisitData;
  compensationVisitData;
  deadbodyrepatriationVisitData;
  deathordisabilityVisitData;
  monthlyproblemresolvedVisitData;
  remitfcVisitData;
  termsandconditionserviceVisitData;
  remittanceandwelfarefundVisitData;
  budgetVisitData;

  
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
        
        this._apiProcessService.getReportData(this.authorizationKey, 'visit/company/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date).subscribe( response => {
          this.companyVisitDataArray = response; 
          this.companyVisitData =   this.companyVisitDataArray.results;         
        });   
        this._apiProcessService.getReportData(this.authorizationKey, 'visit/residence/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date).subscribe( response => {
          this.residenceVisitDataArray = response; 
          this.residenceVisitData =   this.residenceVisitDataArray.results;         
        });
        this._apiProcessService.getReportData(this.authorizationKey, 'visit/residence/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date).subscribe( response => {
          this.residenceVisitDataArray = response; 
          this.residenceVisitData =   this.residenceVisitDataArray.results;         
        });
        this._apiProcessService.getReportData(this.authorizationKey, 'visit/deportationcenter/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date).subscribe( response => {
          this.deportationcenterVisitDataArray = response; 
          this.deportationcenterVisitData =   this.deportationcenterVisitDataArray.results;         
        });
        this._apiProcessService.getReportData(this.authorizationKey, 'visit/jail/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date).subscribe( response => {
          this.jailVisitDataArray = response; 
          this.jailVisitData =   this.jailVisitDataArray.results;         
        });
        this._apiProcessService.getReportData(this.authorizationKey, 'visit/migrantshelter/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date).subscribe( response => {
          this.migrantshelterVisitDataArray = response; 
          this.migrantshelterVisitData =   this.migrantshelterVisitDataArray.results;         
        });  
        
         break;
      case 'activity':        
        
        this._apiProcessService.getReportData(this.authorizationKey, 'activity/attestation/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date).subscribe( response => {
          this.attestationVisitDataArray = response; 
          this.attestationVisitData =   this.attestationVisitDataArray.results;         
        });   
        this._apiProcessService.getReportData(this.authorizationKey, 'activity/employeeenhancement/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date).subscribe( response => {
          this.employeeenhancementVisitDataArray = response; 
          this.employeeenhancementVisitData =   this.employeeenhancementVisitDataArray.results;         
        });
        this._apiProcessService.getReportData(this.authorizationKey, 'activity/otheractivity/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date).subscribe( response => {
          this.otheractivityVisitDataArray = response; 
          this.otheractivityVisitData =   this.otheractivityVisitDataArray.results;         
        });
        this._apiProcessService.getReportData(this.authorizationKey, 'activity/wrokplane/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date).subscribe( response => {
          this.wrokplaneVisitDataArray = response; 
          this.wrokplaneVisitData =   this.wrokplaneVisitDataArray.results;         
        });
        this._apiProcessService.getReportData(this.authorizationKey, 'activity/gestentertainment/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date).subscribe( response => {
          this.gestentertainmentVisitDataArray = response; 
          this.gestentertainmentVisitData =   this.gestentertainmentVisitDataArray.results;         
        });
        this._apiProcessService.getReportData(this.authorizationKey, 'activity/liaisonwithexpatriates/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date).subscribe( response => {
          this.liaisonwithexpatriatesVisitDataArray = response; 
          this.liaisonwithexpatriatesVisitData =   this.liaisonwithexpatriatesVisitDataArray.results;         
        }); 
                
        break;
      case 'assistance':
        this._apiProcessService.getReportData(this.authorizationKey, 'assistanceprovidation/generalassistance/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date).subscribe( response => {
          this.generalassistanceVisitDataArray = response; 
          this.generalassistanceVisitData =   this.generalassistanceVisitDataArray.results;         
        });
        this._apiProcessService.getReportData(this.authorizationKey, 'assistanceprovidation/legalassistance/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date).subscribe( response => {
          this.legalassistanceVisitDataArray = response; 
          this.legalassistanceVisitData =   this.legalassistanceVisitDataArray.results;         
        }); 
        
        break;
      case 'complain':
       
        this._apiProcessService.getReportData(this.authorizationKey, 'querycomplain/queryreceived/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date).subscribe( response => {
          this.queryreceivedVisitDataArray = response; 
          this.queryreceivedVisitData =   this.queryreceivedVisitDataArray.results;         
        });   
        this._apiProcessService.getReportData(this.authorizationKey, 'querycomplain/complaints/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date).subscribe( response => {
          this.complaintsVisitDataArray = response; 
          this.complaintsVisitData =   this.complaintsVisitDataArray.results;         
        });
        this._apiProcessService.getReportData(this.authorizationKey, 'querycomplain/tradequery/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date).subscribe( response => {
          this.tradequeryVisitDataArray = response; 
          this.tradequeryVisitData =   this.tradequeryVisitDataArray.results;         
        });
        
        
        break;
      case 'issue':         
        this._apiProcessService.getReportData(this.authorizationKey, 'issues/meeting/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date).subscribe( response => {
          this.meetingVisitDataArray = response; 
          this.meetingVisitData =   this.meetingVisitDataArray.results;         
        });
        this._apiProcessService.getReportData(this.authorizationKey, 'issues/conferance/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date).subscribe( response => {
          this.conferanceVisitDataArray = response; 
          this.conferanceVisitData =   this.conferanceVisitDataArray.results;         
        });        
        
        break;
      case 'resolved':
       
        this._apiProcessService.getReportData(this.authorizationKey, 'resolved/arbitrationanddisputes/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date).subscribe( response => {
          this.arbitrationanddisputesVisitDataArray = response; 
          this.arbitrationanddisputesVisitData =   this.arbitrationanddisputesVisitDataArray.results;         
        });   
        this._apiProcessService.getReportData(this.authorizationKey, 'resolved/arrearpay/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date).subscribe( response => {
          this.arrearpayVisitDataArray = response; 
          this.arrearpayVisitData =   this.arrearpayVisitDataArray.results;         
        });
        this._apiProcessService.getReportData(this.authorizationKey, 'resolved/compensation/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date).subscribe( response => {
          this.compensationVisitDataArray = response; 
          this.compensationVisitData =   this.compensationVisitDataArray.results;         
        });
        this._apiProcessService.getReportData(this.authorizationKey, 'resolved/deadbodyrepatriation/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date).subscribe( response => {
          this.deadbodyrepatriationVisitDataArray = response; 
          this.deadbodyrepatriationVisitData =   this.deadbodyrepatriationVisitDataArray.results;         
        });
        this._apiProcessService.getReportData(this.authorizationKey, 'resolved/deathordisability/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date).subscribe( response => {
          this.deathordisabilityVisitDataArray = response; 
          this.deathordisabilityVisitData =   this.deathordisabilityVisitDataArray.results;         
        });
        this._apiProcessService.getReportData(this.authorizationKey, 'resolved/monthlyproblemresolved/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date).subscribe( response => {
          this.monthlyproblemresolvedVisitDataArray = response; 
          this.monthlyproblemresolvedVisitData =   this.monthlyproblemresolvedVisitDataArray.results;         
        });  
        this._apiProcessService.getReportData(this.authorizationKey, 'resolved/remitfc/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date).subscribe( response => {
          this.remitfcVisitDataArray = response; 
          this.remitfcVisitData =   this.remitfcVisitDataArray.results;         
        }); 

        this._apiProcessService.getReportData(this.authorizationKey, 'resolved/termsandconditionservice/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date).subscribe( response => {
          this.termsandconditionserviceVisitDataArray = response; 
          this.termsandconditionserviceVisitData =   this.termsandconditionserviceVisitDataArray.results;         
        });
         
        break;
      case 'finance':
        
        this._apiProcessService.getReportData(this.authorizationKey, 'finance/remittanceandwelfarefund/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date).subscribe( response => {
          this.remittanceandwelfarefundVisitDataArray = response; 
          this.remittanceandwelfarefundVisitData =   this.remittanceandwelfarefundVisitDataArray.results;         
        }); 

        this._apiProcessService.getReportData(this.authorizationKey, 'finance/budget/list?la='+this.labourattache +'&from_date='+this.from_date+'&to_date='+this.to_date).subscribe( response => {
          this.budgetVisitDataArray = response; 
          this.budgetVisitData =   this.budgetVisitDataArray.results;         
        });
                
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

