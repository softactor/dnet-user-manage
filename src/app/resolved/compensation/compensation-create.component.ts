import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService} from '../../toster.service';
import { CompensationService } from './compensation.service';
import { CompensationModel } from './compensation.model';

declare var $: any;

@Component({
  selector    : 'app-compensation-create',
  templateUrl : 'compensation-create.component.html'
})
export class CompensationCreateComponent implements OnInit {
  compensation: CompensationModel[] = [];
  defaultDate;
  assignTo;
  action_taken;
  amount;
  compensation_type;
  details;
  number;
  pending_since;
  form_type;
  similarTypes;
  inputFields;
  formData;
  authorizationKey;
  feedbackData;
  responseError;
  list_param;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _service: CompensationService,
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
    const residenceObj = new CompensationModel();
    // @ts-ignore
    this.compensation.push(residenceObj);
    this.assignTo = localStorage.getItem('assign_to');
    this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
    this.inputFields = {
      action_taken            : '',
      amount         : '',
      compensation_type           : '',
      details           : '',
      number           : '',
      pending_since           : '',
    };
    this.formData = this.fb.group({
      action_taken          : ['', Validators.required],
      amount       : ['', Validators.required],
      compensation_type       : ['', Validators.required],
      details       : ['', Validators.required],
      number       : ['', Validators.required],
      pending_since         : ['', Validators.requiredTrue]
    });
  }

  public onFormSubmit(fields, type) {
    if (this.form_type) {
      this.defaultDate = $('#defaultDate').val();
      if (this.defaultDate) {
        const postString = 'action_taken=' + ((fields.action_taken === undefined) ? '' : fields.action_taken)
          + '&amount=' + ((fields.amount === undefined) ? '' : fields.amount)
          + '&compensation_type=' + ((fields.compensation_type === undefined) ? '' : fields.compensation_type)
          + '&details=' + ((fields.details === undefined) ? '' : fields.details)
          + '&number=' + ((fields.number === undefined) ? '' : fields.number)
          + '&pending_since=' + ((fields.pending_since === undefined) ? '' : fields.pending_since)
          + '&date=' + this.defaultDate
          + '&assign_to=' + this.assignTo
          + '&type=' + this.form_type.toLowerCase()
        this._service.create(postString, this.authorizationKey, 'resolved/compensation/create').subscribe(response => {
            // menu ceate
            const postMenuString = 'name=' + this.form_type
              + '&module_name=' + this.form_type
              + '&parent_id=' + 6
              + '&url=compensation-list/' + this.form_type
              + '&type=' + this.form_type.toLowerCase()
            this._service.create(postMenuString, this.authorizationKey, 'menumanagment/leftmenu/create').subscribe(menu_response => {
                this._toasterService.success('Entry have successfully done.');
                this.router.navigate(['compensation-list/' + this.form_type.toLowerCase()]);
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
        this.compensation = [];
        this.similarTypes.push(this.form_type);
        const companyObj = new CompensationModel();
        // @ts-ignore
        this.compensation.push(companyObj);
      }else {
        this._toasterService.warning('Type is already there');
      }
    } else {
      this._toasterService.warning('Please type a similar form name');
    }
  }
}

