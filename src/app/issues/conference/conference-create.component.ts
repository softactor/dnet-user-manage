import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService} from '../../toster.service';
import { ConferenceService } from './conference.service';
import { ConferenceModel } from './conference.model';

declare var $: any;

@Component({
  selector    : 'app-conference-create',
  templateUrl : 'conference-create.component.html'
})
export class ConferenceCreateComponent implements OnInit {
  conference: ConferenceModel[] = [];
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
    private _activateRoute: ActivatedRoute,
    private _service: ConferenceService,
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
    this.form_type    = this.list_param
    this.similarTypes.push(this.form_type);
    const residenceObj = new ConferenceModel();
    // @ts-ignore
    this.conference.push(residenceObj);
    this.assignTo = localStorage.getItem('assign_to');
    this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
    this.inputFields = {
      details_conferance    : '',
      outcome               : '',
      topic                 : '',
      type                  : '',
    };

    this.formData = this.fb.group({
      details_conferance      : ['', Validators.required],
      outcome                 : ['', Validators.required],
      topic                   : ['', Validators.requiredTrue],
      type                    : ['', Validators.requiredTrue],
    });
  }
  public onFormSubmit(fields, type) {
    if (this.form_type) {
      this.defaultDate = $('#defaultDate').val();
      if (this.defaultDate) {
        const createFormData = this.formData.value;
    const postString  =  'details_conferance=' + ((fields.details_conferance === undefined) ? '' : fields.details_conferance)
      + '&outcome=' + ((fields.outcome === undefined) ? '' : fields.outcome)
      + '&topic=' + ((fields.topic === undefined) ? '' : fields.topic)
      + '&date=' + this.defaultDate
      + '&assign_to=' + this.assignTo
      + '&type=' + this.form_type
    this._service.create(postString, this.authorizationKey,
      'issues/conferance/create').subscribe( response => {
        // menu ceate
        const postMenuString = 'name=' + this.form_type
          + '&module_name=' + this.form_type
          + '&parent_id=' + 5
          + '&url=conference-list/' + this.form_type
          + '&type=' + this.form_type
        this._service.create(postMenuString, this.authorizationKey, 'menumanagment/leftmenu/create').subscribe(menu_response => {
            this._toasterService.success('Entry have successfully done.');
            this.router.navigate(['conference-list/' + this.form_type]);
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
        this.conference = [];
        this.similarTypes.push(this.form_type);
        const companyObj = new ConferenceModel();
        // @ts-ignore
        this.conference.push(companyObj);
      } else {
        this._toasterService.warning('Type is already there');
      }
    } else {
      this._toasterService.warning('Please type a similar form name');
    }
  }
}

