import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService } from '../toster.service';
import { MonthWiseViewService } from './month-wise-view.service';

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
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _service: MonthWiseViewService,
    private _http: HttpClient) {
  }
  ngOnInit() {
    // to solve the left menu hide problem;
    $(document).ready(() => {
      const trees: any = $('[data-widget="tree"]');
      trees.tree();
    });
    this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
    const compoList = [
      {
        component : 'Company',
        api       : 'visit/company/list/'
      },
      {
        component : 'Residence',
        api       : 'visit/residence/list/'
      },
      {
        component : 'Deportation center',
        api       : 'visit/deportationcenter/list/'
      },
      {
        component : 'Jail',
        api       : 'visit/jail/list/'
      },
      {
        component : 'Migrant shelter',
        api       : 'visit/migrantshelter/list/'
      }
    ];
    this.visitData = this._service.getComponetListData(compoList, this.authorizationKey);
  }

  getTabdata(component) {
    let compoList;
    switch(component) {
      case 'visit':
        compoList = [
          {
            component : 'Company',
            api       : 'visit/company/list/'
          },
          {
            component : 'Residence',
            api       : 'visit/residence/list/'
          },
          {
            component : 'Deportation center',
            api       : 'visit/deportationcenter/list/'
          },
          {
            component : 'Jail',
            api       : 'visit/jail/list/'
          },
          {
            component : 'Migrant shelter',
            api       : 'visit/migrantshelter/list/'
          }
        ];
        this.visitData = this._service.getComponetListData(compoList, this.authorizationKey);
        break;
      case 'activity':
        compoList = [
          {
            component : 'Market assessment',
            api       : 'activity/attestation/list/'
          },
          {
            component : 'Employee enhancement',
            api       : 'activity/employeeenhancement/list/'
          },
          {
            component : 'Other activity',
            api       : 'activity/otheractivity/list/'
          },
          {
            component : 'Work plan',
            api       : 'activity/wrokplane/list/'
          },
          {
            component : 'Attestation',
            api       : 'activity/attestation/list/'
          },
          {
            component : 'Guest entertainment',
            api       : 'activity/gestentertainment/list/'
          },
          {
            component : 'Liaison with expatriates',
            api       : 'activity/liaisonwithexpatriates/list/'
          }
        ];
        this.visitData = this._service.getComponetListData(compoList, this.authorizationKey);
        break;
      case 'assistance':
        compoList = [
          {
            component : 'General Assistance',
            api       : 'assistanceprovidation/generalassistance/list/'
          },
          {
            component : 'Legal Assistance',
            api       : 'assistanceprovidation/leagalassistance/list/'
          }
        ];
        this.visitData = this._service.getComponetListData(compoList, this.authorizationKey);
        break;
      case 'complain':
        compoList = [
          {
            component : 'Query received',
            api       : 'querycomplain/queryreceived/list/'
          },
          {
            component : 'Complaints',
            api       : 'querycomplain/complaints/list/'
          },
          {
            component : 'Trade query',
            api       : 'querycomplain/tradequery/list/'
          }
        ];
        this.visitData = this._service.getComponetListData(compoList, this.authorizationKey);
        break;
      case 'issue':
        compoList = [
          {
            component : 'Conference',
            api       : 'activity/attestation/list/'
          },
          {
            component : 'Meeting',
            api       : 'activity/attestation/list/'
          }
        ];
        this.visitData = this._service.getComponetListData(compoList, this.authorizationKey);
        break;
      case 'resolved':
        compoList = [
          {
            component : 'Arbitration Disputes',
            api       : 'resolved/arbitrationanddisputes/list/'
          },
          {
            component : 'Arrear pay',
            api       : 'resolved/arrearpay/list/'
          },
          {
            component : 'Compensation',
            api       : 'resolved/compensation/list/'
          },
          {
            component : 'Deadbody repatriation',
            api       : 'resolved/deadbodyrepatriation/list/'
          },
          {
            component : 'Death disability',
            api       : 'resolved/deathordisability/list/'
          },
          {
            component : 'Monthly problem resolved',
            api       : 'resolved/monthlyproblemresolved/list/'
          },
          {
            component : 'Remit FC',
            api       : 'resolved/remitfc/list/'
          },
          {
            component : 'Terms & Condition Service',
            api       : 'resolved/termsandconditionservice/list/'
          }
        ];
        this.visitData = this._service.getComponetListData(compoList, this.authorizationKey);
        break;
      case 'finance':
        compoList = [
          {
            component : 'Remittance and welfare fund',
            api       : 'finance/remittanceandwelfarefund/list/'
          },
          {
            component : 'Budget',
            api       : 'finance/budget/list/'
          }
        ];
        this.visitData = this._service.getComponetListData(compoList, this.authorizationKey);
        break;
    }
  }
}

