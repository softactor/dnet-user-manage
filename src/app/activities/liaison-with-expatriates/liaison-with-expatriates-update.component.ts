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
  number_of_meeting_held  = '';
  outcome = '';
  type = '';
  date;
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
      $('#date').datepicker({
        dateFormat: 'yy-mm-dd'
      });
    });
    this.formData = this.fb.group({
      number_of_meeting_held                : ['', Validators.required],
      outcome                 : ['', Validators.required],
      date                 : ['', Validators.required],
      type                    : ['', Validators.required]
    });
    this._activateRoute.paramMap
      .subscribe( params => {
        this.editId = params.get('liaison_with_expatriates_id')
        this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
        const getDetailsParam  = {
          editId        : this.editId,
          authorizationKey  : this.authorizationKey.toString()
        };

        this._service.getDetailsById(getDetailsParam, 'activity/liaisonwithexpatriates/details/').subscribe( Details => {
          this.editData = Details;
          this.number_of_meeting_held           = this.editData.number_of_meeting_held;
          this.outcome            = this.editData.outcome;
          this.type               = this.editData.type;
          this.date               = this.editData.date;
        });
      });
  }
  public update(form: NgForm, e) {
    e.preventDefault();
    const dateField = $('#date').val();
    const updateParam = 'number_of_meeting_held='
      + ((form.value.number_of_meeting_held === undefined)    ? ''  :  form.value.number_of_meeting_held)
      + '&outcome=' + ((form.value.outcome === undefined)    ? ''  :  form.value.outcome)
      + '&date=' + ((dateField === undefined) ? ''  :  dateField)
    this._service.update(updateParam, this.authorizationKey,
      'activity/liaisonwithexpatriates/update/', this.editId).subscribe( response => {
        this._toasterService.success('Data has been successfully updated.');
        this.router.navigate(['liaison-with-expatriates-list/' + this.type]);
      },
      error => {
        const error_response  = error;
        this.responseError  = error_response.error;
      }
    );
  }
}

