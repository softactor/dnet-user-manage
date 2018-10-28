import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService} from '../../toster.service';
import { TermsConditionServiceService } from './terms-condition-service.service';
import { TermsConditionModel } from './terms-condition.model';

declare var $: any;

@Component({
  selector    : 'app-terms-condition-service-create',
  templateUrl : 'terms-condition-service-create.component.html'
})
export class TermsConditionServiceCreateComponent implements OnInit {
  termsCondition: TermsConditionModel[] = [];
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
    private _service: TermsConditionServiceService,
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
    const residenceObj = new TermsConditionModel();
    // @ts-ignore
    this.termsCondition.push(residenceObj);
    this.assignTo = localStorage.getItem('assign_to');
    this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
    this.inputFields = {
      places_visited           : '',
      action_taken    : '',
      number_of_verified            : '',
    };

    this.formData = this.fb.group({
      places_visited          : ['', Validators.required],
      action_taken  : ['', Validators.requiredTrue],
      number_of_verified          : ['', Validators.requiredTrue],
    });
  }
  public onFormSubmit(fields, type) {
    this.defaultDate = $('#defaultDate').val();
    const createFormData = this.formData.value;
    const postString  =  'places_visited=' + ((fields.places_visited === undefined) ? '' : fields.places_visited)
      + '&number_of_verified=' + ((fields.number_of_verified === undefined) ? '' : fields.number_of_verified)
      + '&action_taken=' + createFormData.action_taken
    this._service.create(postString, this.authorizationKey, 'resolved/termsandconditionservice/create').subscribe( response => {
        // menu ceate
        const postMenuString = 'name=' + this.form_type
            + '&module_name=' + this.form_type
            + '&parent_id=' + 6
            + '&url=terms-condition-list/' + this.form_type
            + '&type=' + this.form_type
        this._service.create(postMenuString, this.authorizationKey, 'menumanagment/leftmenu/create').subscribe(menu_response => {
                this._toasterService.success('Entry have successfully done.');
                this.router.navigate(['terms-condition-list/' + this.form_type]);
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
        this.termsCondition = [];
        this.similarTypes.push(this.form_type);
        const termsConditionObj = new TermsConditionModel();
        // @ts-ignore
        this.termsCondition.push(termsConditionObj);
      }else {
        this._toasterService.warning('Type is already there');
      }
    } else {
      this._toasterService.warning('Please type a similar form name');
    }
  }
}

