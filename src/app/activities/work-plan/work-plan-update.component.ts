import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import { TosterService } from '../../toster.service';
import { WorkPlanService } from './work-plan.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
  selector    : 'app-wrokplane-update',
  templateUrl : 'work-plan-update.component.html'
})
export class WorkPlanUpdateComponent implements OnInit {
  editId;
  editData;
  inputFields;
  formData;
  authorizationKey;
  feedbackData;
  responseError;
  name_of_activity  = '';
  path = '';
  description = '';
  type = '';
  date = '';
  constructor(
    private _activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _service: WorkPlanService,
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
      path                : ['', Validators.required],
      name_of_activity    : ['', Validators.required],
      description         : ['', Validators.required],
      type                : ['', Validators.required]
    });
    this._activateRoute.paramMap
      .subscribe( params => {
        this.editId = params.get('work_plan_id')
        this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
        const getDetailsParam  = {
          editId        : this.editId,
          authorizationKey  : this.authorizationKey
        };

        this._service.getDetailsById(getDetailsParam, 'activity/wrokplane/details/').subscribe( Details => {
          this.editData = Details;
          this.name_of_activity           = this.editData.name_of_activity;
          this.path                       = this.editData.path;
          this.description                = this.editData.description;
          this.type                       = this.editData.type;
          this.date                       = this.editData.date;
        });
      });
  }
  public update(form: NgForm, e) {
    e.preventDefault();
    const dateField = $('#date').val();
    const updateParam = 'name_of_activity=' + ((form.value.name_of_activity === undefined)    ? ''  :  form.value.name_of_activity)
      + '&path=' + ((form.value.path === undefined)    ? ''  :  form.value.path)
      + '&description=' + ((form.value.description === undefined)    ? ''  :  form.value.description)
      + '&type=' + this.type
      + '&date=' + ((dateField === undefined)    ? ''  :  dateField)
      + '&authorization=' + this.authorizationKey;
    this._service.update(updateParam, this.authorizationKey, 'activity/wrokplane/update/', this.editId).subscribe( response => {
        this._toasterService.success('Data has been successfully updated.');
        this.router.navigate(['work-plan-list/' + this.type]);
      },
      error => {
        const error_response  = error;
        this.responseError  = error_response.error;
      }
    );
  }
}

