import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import { TosterService } from '../../toster.service';
import { CompensationService } from './compensation.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
  selector    : 'app-arbitration-disputes-update',
  templateUrl : 'compensation-update.component.html'
})
export class CompensationUpdateComponent implements OnInit {
  editId;
  editData;
  inputFields;
  formData;
  authorizationKey;
  feedbackData;
  responseError;
  action_taken;
  amount;
  compensation_type;
  details;
  number;
  pending_since;
  date = '';
  type;
  constructor(
    private _activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _service: CompensationService,
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
      action_taken                : ['', Validators.required],
      amount                : ['', Validators.required],
      compensation_type             : ['', Validators.required],
      details               : ['', Validators.required],
      number               : ['', Validators.required],
      pending_since               : ['', Validators.required],
    });
    this._activateRoute.paramMap
      .subscribe( params => {
        this.editId = params.get('compensation_id')
        this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
        const getDetailsParam  = {
          editId        : this.editId,
          authorizationKey  : this.authorizationKey
        };

        this._service.getDetailsById(getDetailsParam, 'resolved/compensation/details/').subscribe( Details => {
          this.editData = Details;
          this.action_taken               = this.editData.action_taken;
          this.amount            = this.editData.amount;
          this.compensation_type              = this.editData.compensation_type;
          this.details               = this.editData.details;
          this.number            = this.editData.number;
          this.pending_since              = this.editData.pending_since;
          this.type              = this.editData.type;
          this.date              = this.editData.date;
        });
      });
  }
  public update(form: NgForm, e) {
    e.preventDefault();
    const dateField = $('#date').val();
    const updateParam = 'remit_type='
      + ((form.value.remit_type === undefined) ? '' : form.value.remit_type)
      + '&no=' + ((form.value.no === undefined) ? '' : form.value.no)
      + '&date=' + ((dateField === undefined) ? ''  :  dateField)
      + '&outcome=' + ((form.value.outcome === undefined) ? '' : form.value.outcome);
    this._service.update(updateParam, this.authorizationKey,
      'resolved/compensation/update/', this.editId)
      .subscribe( response => {
        this._toasterService.success('Data has been successfully updated.');
        this.router.navigate(['compensation-list/' + this.type]);
      },
      error => {
        const error_response  = error;
        this.responseError  = error_response.error;
      }
    );
  }
}

