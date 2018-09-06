import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import { TosterService } from '../../toster.service';
import { DeadbodyRepatriationService } from './deadbody-repatriation.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
  selector    : 'app-arbitration-disputes-update',
  templateUrl : 'deadbody-repatriation-update.component.html'
})
export class DeadbodyRepatriationUpdateComponent implements OnInit {
  editId;
  editData;
  inputFields;
  formData;
  authorizationKey;
  feedbackData;
  responseError;
  name  = '';
  number = '';
  cause_of_death = '';
  action_taken = '';
  constructor(
    private _activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _service: DeadbodyRepatriationService,
    private _http: HttpClient) {
  }
  ngOnInit() {
    // to solve the left menu hide problem;
    $(document).ready(() => {
      const trees: any = $('[data-widget="tree"]');
      trees.tree();
    });
    this.formData = this.fb.group({
      name                : ['', Validators.required],
      number             : ['', Validators.required],
      cause_of_death               : ['', Validators.required],
      action_taken        : ['', Validators.required]
    });
    this._activateRoute.paramMap
      .subscribe( params => {
        this.editId = params.get('deadbody_repatriation_id')
        this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
        const getDetailsParam  = {
          editId        : this.editId,
          authorizationKey  : this.authorizationKey.toString()
        };

        this._service.getDetailsById(getDetailsParam, 'resolved/deadbodyrepatriation/details/').subscribe( Details => {
          this.editData = Details;
          this.name               = this.editData.name;
          this.number            = this.editData.number;
          this.cause_of_death              = this.editData.cause_of_death;
          this.action_taken       = this.editData.cause_of_death;
        });
      });
  }
  public update(form: NgForm, e) {
    e.preventDefault();
    const updateParam = 'name='
      + form.value.name
      + '&number=' + form.value.number
      + '&cause_of_death=' + form.value.cause_of_death
      + '&action_taken=' + form.value.action_taken
      + '&authorization=' + this.authorizationKey;
    this._service.update(updateParam, this.authorizationKey,
      'resolved/deadbodyrepatriation/update/', this.editId)
      .subscribe( response => {
        this._toasterService.success('Data has been successfully updated.');
        this.router.navigate(['deadbody-repatriation-list']);
      },
      error => {
        const error_response  = error;
        this.responseError  = error_response.error;
      }
    );
  }
}

