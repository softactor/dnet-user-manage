import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import { TosterService } from '../../toster.service';
import { LiaisonWithExpatriatesService } from './liaison-with-expatriates.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
  selector    : 'app-guest-entertainment-update',
  templateUrl : 'liaison-with-expatriates-update.component.html'
})
export class LiaisonWithExpatriatesUpdateComponent implements OnInit {
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
  constructor(
    private _activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _service: LiaisonWithExpatriatesService,
    private _http: HttpClient) {
  }
  ngOnInit() {
    // to solve the left menu hide problem;
    $(document).ready(() => {
      const trees: any = $('[data-widget="tree"]');
      trees.tree();
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
          authorizationKey  : this.authorizationKey.toString()
        };

        this._service.getDetailsById(getDetailsParam, 'activity/gestentertainment/details/').subscribe( Details => {
          this.editData = Details;
          this.activity           = this.editData.activity;
          this.remarks            = this.editData.remarks;
          this.outcome            = this.editData.outcome;
          this.type               = this.editData.type;
        });
      });
  }
  public update(form: NgForm, e) {
    e.preventDefault();
    const updateParam = 'activity=' + form.value.activity
      + '&remarks=' + form.value.remarks
      + '&outcome=' + form.value.outcome
      + '&type=' + form.value.type
      + '&authorization=' + this.authorizationKey;
    this._service.update(updateParam, this.authorizationKey, 'activity/gestentertainment/update/', this.editId).subscribe( response => {
        this._toasterService.success('Data has been successfully updated.');
        this.router.navigate(['gestentertainment-list']);
      },
      error => {
        const error_response  = error;
        this.responseError  = error_response.error;
      }
    );
  }
}

