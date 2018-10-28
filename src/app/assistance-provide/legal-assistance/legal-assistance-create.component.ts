import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService} from '../../toster.service';
import { LegalAssistanceService } from './legal-assistance.service';
import { LegallAssistanceModel } from './legall-assistance.model';

declare var $: any;

@Component({
  selector    : 'app-legal-assistance-create',
  templateUrl : 'legal-assistance-create.component.html'
})
export class LegalAssistanceCreateComponent implements OnInit {
  legallAssistance: LegallAssistanceModel[] = [];
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
    private _service: LegalAssistanceService,
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
    const residenceObj = new LegallAssistanceModel();
    // @ts-ignore
    this.legallAssistance.push(residenceObj);
    this.assignTo = localStorage.getItem('assign_to');
    this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
    this.inputFields = {
      name            : '',
      address         : '',
      leagal_issue    : '',
      assistance_provided    : '',
      type            : '',
    };

    this.formData = this.fb.group({
      name                  : ['', Validators.required],
      address               : ['', Validators.required],
      leagal_issue          : ['', Validators.requiredTrue],
      assistance_provided   : ['', Validators.requiredTrue],
      type                  : ['', Validators.requiredTrue],
    });
  }
  public onFormSubmit(fields, type) {
    if (this.form_type) {
      this.defaultDate = $('#defaultDate').val();
      if (this.defaultDate) {
        const createFormData = this.formData.value;
    const postString  =  'name=' + ((fields.name === undefined) ? '' : fields.name)
      + '&address=' + ((fields.address === undefined) ? '' : fields.address)
      + '&legal_issue=' + ((fields.leagal_issue === undefined) ? '' : fields.leagal_issue)
      + '&assistance_provided=' + ((fields.assistance_provided === undefined) ? '' : fields.assistance_provided)
      + '&date=' + this.defaultDate
      + '&assign_to=' + this.assignTo
      + '&type=' + this.form_type
    this._service.create(postString, this.authorizationKey, 'assistanceprovidation/legalassistance/create').subscribe( response => {
        // menu ceate
        const postMenuString = 'name=' + this.form_type
          + '&module_name=' + this.form_type
          + '&parent_id=' + 2
          + '&url=legal-assistance-list/' + this.form_type
          + '&type=' + this.form_type
        this._service.create(postMenuString, this.authorizationKey, 'menumanagment/leftmenu/create').subscribe(menu_response => {
            this._toasterService.success('Entry have successfully done.');
            this.router.navigate(['legal-assistance-list/' + this.form_type]);
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
      } else {
        this._toasterService.warning('Please select a date');
      }
    } else {
      this._toasterService.warning('Please type a similar form name');
    }
  }
  public copyForm(e) {
    if (this.form_type) {
      if (this.similarTypes.indexOf(this.form_type) === -1) {
        this.legallAssistance  = [];
        this.similarTypes.push(this.form_type);
        const companyObj = new LegallAssistanceModel();
        // @ts-ignore
        this.legallAssistance.push(companyObj);
      } else {
        this._toasterService.warning('Type is already there');
      }
    } else {
      this._toasterService.warning('Please type a similar form name');
    }
  }
}

