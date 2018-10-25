import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import { TosterService } from '../../toster.service';
import { GuestEntertainmentService } from './guest-entertainment.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
  selector    : 'app-guest-entertainment-update',
  templateUrl : 'guest-entertainment-update.component.html'
})
export class GuestEntertainmentUpdateComponent implements OnInit {
  editId;
  editData;
  inputFields;
  formData;
  authorizationKey;
  feedbackData;
  responseError;
  total_number  = '';
  purpose = '';
  outcome = '';
  type = '';
  date;
  constructor(
    private _activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _service: GuestEntertainmentService,
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
      total_number                : ['', Validators.required],
      purpose                 : ['', Validators.required],
      outcome                 : ['', Validators.required],
      type                    : ['', Validators.required]
    });
    this._activateRoute.paramMap
      .subscribe( params => {
        this.editId = params.get('guest_entertainment_id')
        this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
        const getDetailsParam  = {
          editId        : this.editId,
          authorizationKey  : this.authorizationKey.toString()
        };

        this._service.getDetailsById(getDetailsParam, 'activity/gestentertainment/details/').subscribe( Details => {
          this.editData = Details;
          this.total_number           = this.editData.total_number;
          this.purpose            = this.editData.purpose;
          this.outcome            = this.editData.outcome;
          this.type               = this.editData.type;
          this.date               = this.editData.date;
        });
      });
  }
  public update(form: NgForm, e) {
    e.preventDefault();
    const updateParam = 'total_number='
      + ((form.value.total_number === undefined)    ? ''  :  form.value.total_number)
      + '&purpose=' + ((form.value.purpose === undefined)    ? ''  :  form.value.purpose)
      + '&date=' + ((form.value.date === undefined)    ? ''  :  form.value.date);
    this._service.update(updateParam, this.authorizationKey, 'activity/gestentertainment/update/', this.editId).subscribe( response => {
        this._toasterService.success('Data has been successfully updated.');
        this.router.navigate(['guest-entertainment-list/' + this.type]);
      },
      error => {
        const error_response  = error;
        this.responseError  = error_response.error;
      }
    );
  }
}

