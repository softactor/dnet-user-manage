import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService} from '../../toster.service';
import { ArrearpayService } from './arrearpay.service';
import { ArrearpayModel } from './arrearpay.model';

declare var $: any;

@Component({
  selector    : 'app-arrearpay-create',
  templateUrl : 'arrearpay-create.component.html'
})
export class ArrearpayCreateComponent implements OnInit {
  arrearpay: ArrearpayModel[] = [];
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
    private _service: ArrearpayService,
    private _activateRoute: ActivatedRoute,
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
    this.similarTypes = [];
    this.form_type    = this.list_param;
    this.similarTypes.push(this.form_type);
    const residenceObj = new ArrearpayModel();
    // @ts-ignore
    this.arrearpay.push(residenceObj);
    this.assignTo = localStorage.getItem('assign_to');
    this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
    this.inputFields = {
      person_concern_type  : '',
      total_number         : '',
      number_of_case_resolved: '',
    };

    this.formData = this.fb.group({
      person_concern_type          : ['', Validators.required],
      total_number       : ['', Validators.required],
      number_of_case_resolved         : ['', Validators.requiredTrue]
    });
  }
  public onFormSubmit(fields, type) {
    this.defaultDate = $('#defaultDate').val();
    const createFormData = this.formData.value;
    const postString  =  'person_concern_type=' + ((fields.total_number === undefined) ? '' : fields.total_number)
      + '&total_number=' + ((fields.total_number === undefined) ? '' : fields.total_number)
      + '&number_of_case_resolved=' + ((fields.total_number === undefined) ? '' : fields.total_number)
      + '&date=' + this.defaultDate
      + '&assign_to=' + this.assignTo
      + '&type=' + this.form_type
    this._service.create(postString, this.authorizationKey, 'resolved/arrearpay/create').subscribe( response => {
        // menu ceate
        const postMenuString = 'name=' + this.form_type
          + '&module_name=' + this.form_type
          + '&parent_id=' + 6
          + '&url=arrearpay-list/' + this.form_type
          + '&type=' + this.form_type
        this._service.create(postMenuString, this.authorizationKey, 'menumanagment/leftmenu/create').subscribe(menu_response => {
            this._toasterService.success('Entry have successfully done.');
            this.router.navigate(['arrearpay-list/' + this.form_type]);
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
        this.arrearpay  = [];
        this.similarTypes.push(this.form_type);
        const companyObj = new ArrearpayModel();
        // @ts-ignore
        this.arrearpay.push(companyObj);
      }else {
        this._toasterService.warning('Type is already there');
      }
    } else {
      this._toasterService.warning('Please type a similar form name');
    }
  }
}

