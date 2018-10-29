import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService } from '../../toster.service';
import { LiaisonWithExpatriatesService } from './liaison-with-expatriates.service';
import { LiaisonWithExpatriatesModel } from './liaison-with-expatriates.model';

declare var $: any;

@Component({
  selector    : 'app-liaison-with-expatriates-create',
  templateUrl : 'liaison-with-expatriates-create.component.html'
})
export class LiaisonWithExpatriatesCreateComponent implements OnInit {
  liaisonWithExpatriates: LiaisonWithExpatriatesModel[] = [];
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
    private _service: LiaisonWithExpatriatesService,
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
    const residenceObj = new LiaisonWithExpatriatesModel();
    // @ts-ignore
    this.liaisonWithExpatriates.push(residenceObj);
    this.assignTo = localStorage.getItem('assign_to');
    this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
    this.inputFields = {
      number_of_meeting_held    : '',
      outcome             : '',
      remarks             : '',
      type                : '',
    };

    this.formData = this.fb.group({
      number_of_meeting_held     : ['', Validators.required],
      outcome      : ['', Validators.required],
      remarks      : ['', Validators.requiredTrue],
      type         : ['', Validators.requiredTrue],
    });
  }

  public onFormSubmit(fields, type) {
    if (this.form_type) {
      this.defaultDate = $('#defaultDate').val();
      if (this.defaultDate) {
        const postString = 'number_of_meeting_held='
          + ((fields.number_of_meeting_held === undefined) ? '' : fields.number_of_meeting_held)
          + '&outcome=' + ((fields.outcome === undefined) ? '' : fields.outcome)
          + '&date=' + this.defaultDate
          + '&assign_to=' + this.assignTo
          + '&type=' + this.form_type.toLowerCase()
        this._service.create(postString, this.authorizationKey, 'activity/liaisonwithexpatriates/create').subscribe(response => {
            // menu ceate
            const postMenuString = 'name=' + this.form_type
              + '&module_name=' + this.form_type
              + '&parent_id=' + 3
              + '&url=liaison-with-expatriates-list/' + this.form_type
              + '&type=' + this.form_type.toLowerCase()
            this._service.create(postMenuString, this.authorizationKey, 'menumanagment/leftmenu/create').subscribe(menu_response => {
                console.log('i am success ');
                console.log(menu_response);
                this._toasterService.success('Entry have successfully done.');
                this.router.navigate(['liaison-with-expatriates-list/' + this.form_type.toLowerCase()]);
                // location.reload();
              },
              menu_error => {
                console.log('i am error ');
                console.log(menu_error);
                const error_response = menu_error;
                this.responseError = error_response.error;
              }
            );
            // end of menu create
          },
          error => {
            const error_response = error;
            this.responseError = error_response.error;
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
        this.liaisonWithExpatriates  = [];
        this.similarTypes = this.form_type;
        const companyObj = new LiaisonWithExpatriatesModel();
        // @ts-ignore
        this.liaisonWithExpatriates.push(companyObj);
      } else {
        this._toasterService.warning('Type is already there');
      }
    } else {
      this._toasterService.warning('Please type a similar form name');
    }
  }
}

