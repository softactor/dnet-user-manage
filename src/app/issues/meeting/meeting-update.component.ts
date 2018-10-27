import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import { TosterService } from '../../toster.service';
import { MeetingService } from './meeting.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
  selector    : 'app-meeting-update',
  templateUrl : 'meeting-update.component.html'
})
export class MeetingUpdateComponent implements OnInit {
  editId;
  editData;
  inputFields;
  formData;
  authorizationKey;
  feedbackData;
  responseError;
  issue_discussed  = '';
  organization = '';
  outcome = '';
  date = '';
  type = '';
  name;
  constructor(
    private _activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _service: MeetingService,
    private _http: HttpClient) {
  }
  ngOnInit() {
    // to solve the left menu hide problem;
    $(document).ready(() => {
      const trees: any = $('[data-widget="tree"]');
      trees.tree();
    });
    this.formData = this.fb.group({
      name_of_activity                : ['', Validators.required],
      description                 : ['', Validators.required],
      type                    : ['', Validators.required]
    });
    this._activateRoute.paramMap
      .subscribe( params => {
        this.editId = params.get('meeting_id')
        this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
        const getDetailsParam  = {
          editId        : this.editId,
          authorizationKey  : this.authorizationKey
        };

        this._service.getDetailsById(getDetailsParam, 'issues/meeting/details/').subscribe( Details => {
          this.editData = Details;
          this.issue_discussed           = this.editData.issue_discussed;
          this.name           = this.editData.name;
          this.organization            = this.editData.organization;
          this.outcome               = this.editData.outcome;
          this.date               = this.editData.date;
          this.type               = this.editData.type;
        });
      });
  }
  public update(form: NgForm, e) {
    e.preventDefault();
    const dateField = $('#date').val();
    const updateParam = 'issue_discussed=' + ((form.value.issue_discussed === undefined)    ? ''  :  form.value.issue_discussed)
      + '&name=' + ((form.value.name === undefined)    ? ''  :  form.value.name)
      + '&organization=' + ((form.value.organization === undefined)    ? ''  :  form.value.organization)
      + '&outcome=' + ((form.value.outcome === undefined)    ? ''  :  form.value.outcome)
      + '&date=' + ((dateField === undefined)    ? ''  :  dateField)
      + '&type=' + this.type;
    this._service.update(updateParam, this.authorizationKey,
      'issues/meeting/update/', this.editId).subscribe( response => {
        this._toasterService.success('Data has been successfully updated.');
        this.router.navigate(['meeting-list/' + this.type]);
      },
      error => {
        const error_response  = error;
        this.responseError  = error_response.error;
      }
    );
  }
}

