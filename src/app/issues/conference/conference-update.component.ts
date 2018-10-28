import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import { TosterService } from '../../toster.service';
import { ConferenceService } from './conference.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
  selector    : 'app-conference-update',
  templateUrl : 'conference-update.component.html'
})
export class ConferenceUpdateComponent implements OnInit {
  editId;
  editData;
  inputFields;
  formData;
  authorizationKey;
  feedbackData;
  responseError;
  details_conferance  = '';
  outcome = '';
  topic = '';
  type = '';
  date = '';
  constructor(
    private _activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _service: ConferenceService,
    private _http: HttpClient) {
  }
  ngOnInit() {
    // to solve the left menu hide problem;
    $(document).ready(() => {
      const trees: any = $('[data-widget="tree"]');
      trees.tree();
      $('#date').datepicker({
        dateFormat: 'yy-mm-dd'
      });
    });
    this.formData = this.fb.group({
      details_conferance                : ['', Validators.required],
      outcome                 : ['', Validators.required],
      date                 : ['', Validators.required],
      topic                 : ['', Validators.required]
    });
    this._activateRoute.paramMap
      .subscribe( params => {
        this.editId = params.get('conference_id')
        this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
        const getDetailsParam  = {
          editId        : this.editId,
          authorizationKey  : this.authorizationKey
        };

        this._service.getDetailsById(getDetailsParam, 'issues/conferance/details/').subscribe( Details => {
          this.editData = Details;
          this.details_conferance           = this.editData.details_conferance;
          this.outcome                      = this.editData.outcome;
          this.date                         = this.editData.date;
          this.topic                        = this.editData.topic;
          this.type                         = this.editData.type;
        });
      });
  }
  public update(form: NgForm, e) {
    e.preventDefault();
    const dateField = $('#date').val();
    const updateParam = 'details_conferance=' + ((form.value.details_conferance === undefined)    ? ''  :  form.value.details_conferance)
      + '&outcome=' + ((form.value.outcome === undefined)    ? ''  :  form.value.outcome)
      + '&topic=' + ((form.value.topic === undefined)    ? ''  :  form.value.topic)
      + '&date=' + ((dateField === undefined)    ? ''  :  dateField)
      + '&type=' + this.type
      + '&authorization=' + this.authorizationKey;
    this._service.update(updateParam, this.authorizationKey,
      'issues/conferance/update/', this.editId).subscribe( response => {
        this._toasterService.success('Data has been successfully updated.');
        this.router.navigate(['conference-list/' + this.type]);
      },
      error => {
        const error_response  = error;
        this.responseError  = error_response.error;
      }
    );
  }
}

