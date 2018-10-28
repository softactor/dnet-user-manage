import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService} from '../../toster.service';
import { ArbitrationDisputesService } from './arbitration-disputes.service';
import { ArbitrationDisputesModel } from './arbitration-disputes.model';

declare var $: any;

@Component({
  selector    : 'app-arbitration-disputes-create',
  templateUrl : 'arbitration-disputes-create.component.html'
})
export class ArbitrationDisputesCreateComponent implements OnInit {
  arbitrationDisputes: ArbitrationDisputesModel[] = [];
  similarTypes;
  inputFields;
  formData;
  authorizationKey;
  feedbackData;
  responseError;
  defaultDate;
  assignTo;
  form_type;
  list_param;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _service: ArbitrationDisputesService,
    private _activateRoute: ActivatedRoute,
    private _http: HttpClient) {
    this._activateRoute.paramMap
      .subscribe( params => {
        this.list_param = params.get('create_param');
      });
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
    this.similarTypes = [];
    this.form_type    = this.list_param;
    this.similarTypes.push(this.form_type);
    const residenceObj = new ArbitrationDisputesModel();
    // @ts-ignore
    this.arbitrationDisputes.push(residenceObj);
    this.assignTo = localStorage.getItem('assign_to');
    this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
    this.inputFields = {
      resolved_case   : '',
      total_number    : '',
      type            : '',
    };

    this.formData = this.fb.group({
      resolved_case : ['', Validators.requiredTrue],
      total_number  : ['', Validators.requiredTrue],
      type          : ['', Validators.requiredTrue],
    });
  }
  public onFormSubmit(fields, type) {
    this.defaultDate = $('#defaultDate').val();
    const createFormData = this.formData.value;
    const postString  =  'total_number='
      + ((fields.total_number === undefined) ? '' : fields.total_number)
      + '&resolved_case=' + ((fields.resolved_case === undefined) ? '' : fields.resolved_case)
      + '&date=' + this.defaultDate
      + '&assign_to=' + this.assignTo
      + '&type=' + this.form_type
    this._service.create(postString, this.authorizationKey, 'resolved/arbitrationanddisputes/create').subscribe( response => {
        // menu ceate
        const postMenuString = 'name=' + this.form_type
          + '&module_name=' + this.form_type
          + '&parent_id=' + 6
          + '&url=arbitration-disputes-list/' + this.form_type
          + '&type=' + this.form_type
        this._service.create(postMenuString, this.authorizationKey, 'menumanagment/leftmenu/create').subscribe(menu_response => {
            this._toasterService.success('Entry have successfully done.');
            this.router.navigate(['arbitration-disputes-list/' + this.form_type]);
            // location.reload();
          },
          error => {
            const error_response = error;
            this.responseError = error_response.error;
          }
        );
        // end of menu create
      },
      error => {
        const error_response  = error;
        this.responseError  = error_response.error;
      }
    );
  }
  public copyForm(e) {
    if (this.form_type) {
      if (this.similarTypes.indexOf(this.form_type) === -1) {
        this.arbitrationDisputes  = [];
        this.similarTypes.push(this.form_type);
        const companyObj = new ArbitrationDisputesModel();
        // @ts-ignore
        this.arbitrationDisputes.push(companyObj);
      } else {
        this._toasterService.warning('Type is already there');
      }
    } else {
      this._toasterService.warning('Please type a similar form name');
    }
  }
}

