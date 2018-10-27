import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import { TosterService} from '../../toster.service';
import { OtherActivityService } from './other-activity.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
  selector    : 'app-other-activity-update',
  templateUrl : 'other-activity-update.component.html'
})
export class OtherActivityUpdateComponent implements OnInit {
  editId;
  editData;
  inputFields;
  formData;
  authorizationKey;
  feedbackData;
  responseError;
  activity  = '';
  remarks = '';
  outcome = '';
  type = '';
  date = '';
  constructor(
    private _activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _service: OtherActivityService,
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
      activity                : ['', Validators.required],
      remarks                 : ['', Validators.required],
      outcome                 : ['', Validators.required],
      type                    : ['', Validators.required]
    });
    this._activateRoute.paramMap
      .subscribe( params => {
        this.editId = params.get('other_activity_id')
        this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
        const getDetailsParam  = {
          editId        : this.editId,
          authorizationKey  : this.authorizationKey
        };

        this._service.getDetailsById(getDetailsParam, 'activity/otheractivity/details/').subscribe( Details => {
          this.editData = Details;
          this.activity           = this.editData.activity;
          this.remarks            = this.editData.remarks;
          this.type               = this.editData.type;
          this.date               = this.editData.date;
        });
      });
  }
  public update(form: NgForm, e) {
    e.preventDefault();
    const dateField = $('#date').val();
    const updateParam = 'activity=' + ((form.value.activity === undefined)    ? ''  :  form.value.activity)
      + '&remarks=' + ((form.value.remarks === undefined)    ? ''  :  form.value.remarks)
      + '&date=' + ((dateField === undefined)    ? ''  :  dateField)
      + '&type=' + this.type
    this._service.update(updateParam, this.authorizationKey, 'activity/otheractivity/update/', this.editId).subscribe( response => {
        this._toasterService.success('Data has been successfully updated.');
        this.router.navigate(['other-activity-list/' + this.type]);
      },
      error => {
        const error_response  = error;
        this.responseError  = error_response.error;
      }
    );
  }
}

