import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import { TosterService } from '../../toster.service';
import { TermsConditionServiceService } from './terms-condition-service.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
  selector    : 'app-arbitration-disputes-update',
  templateUrl : 'terms-condition-service-update.component.html'
})
export class TermsConditionServiceUpdateComponent implements OnInit {
  editId;
  editData;
  inputFields;
  formData;
  authorizationKey;
  feedbackData;
  responseError;
  places_visited  = '';
  number_of_verified = '';
  action_taken = '';
  constructor(
    private _activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _service: TermsConditionServiceService,
    private _http: HttpClient) {
  }
  ngOnInit() {
    // to solve the left menu hide problem;
    $(document).ready(() => {
      const trees: any = $('[data-widget="tree"]');
      trees.tree();
    });
    this.formData = this.fb.group({
      places_visited             : ['', Validators.required],
      number_of_verified               : ['', Validators.required],
      action_taken        : ['', Validators.required]
    });
    this._activateRoute.paramMap
      .subscribe( params => {
        this.editId = params.get('terms_condition_id')
        this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
        const getDetailsParam  = {
          editId        : this.editId,
          authorizationKey  : this.authorizationKey.toString()
        };

        this._service.getDetailsById(getDetailsParam, 'resolved/termsandconditionservice/details/').subscribe( Details => {
          this.editData = Details;
          this.places_visited               = this.editData.places_visited;
          this.number_of_verified            = this.editData.number_of_verified;
          this.action_taken       = this.editData.action_taken;
        });
      });
  }
  public update(form: NgForm, e) {
    e.preventDefault();
    const updateParam = 'places_visited='
      + form.value.places_visited
      + '&number_of_verified=' + form.value.number_of_verified
      + '&action_taken=' + form.value.action_taken
      + '&authorization=' + this.authorizationKey;
    this._service.update(updateParam, this.authorizationKey,
      'resolved/termsandconditionservice/update/', this.editId)
      .subscribe( response => {
        this._toasterService.success('Data has been successfully updated.');
        this.router.navigate(['terms-condition-list']);
      },
      error => {
        const error_response  = error;
        this.responseError  = error_response.error;
      }
    );
  }
}

