import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import { TosterService } from '../../toster.service';
import { ComplaintService } from './complaint.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
  selector    : 'app-query-received-update',
  templateUrl : 'complaint-update.component.html'
})
export class ComplaintUpdateComponent implements OnInit {
  editId;
  editData;
  inputFields;
  formData;
  authorizationKey;
  feedbackData;
  responseError;
  total_number  = '';
  action_taken = '';
  date;
  type;
  constructor(
    private _activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _service: ComplaintService,
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
      total_number               : ['', Validators.required],
      action_taken        : ['', Validators.required]
    });
    this._activateRoute.paramMap
      .subscribe( params => {
        this.editId = params.get('complaint_id')
        this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
        const getDetailsParam  = {
          editId        : this.editId,
          authorizationKey  : this.authorizationKey
        };

        this._service.getDetailsById(getDetailsParam, 'querycomplain/complaints/details/').subscribe( Details => {
          this.editData = Details;
          this.total_number       = this.editData.total_number;
          this.action_taken       = this.editData.action_taken;
          this.date       = this.editData.date;
          this.type       = this.editData.type;
        });
      });
  }
  public update(form: NgForm, e) {
    e.preventDefault();
    const dateField = $('#date').val();
    const updateParam = 'total_number='
      + ((form.value.total_number === undefined)    ? ''  :  form.value.total_number)
      + '&action_taken=' + ((form.value.action_taken === undefined)    ? ''  :  form.value.action_taken)
      + '&date=' + ((dateField === undefined)    ? ''  :  dateField)
    this._service.update(updateParam, this.authorizationKey,
      'querycomplain/complaints/update/', this.editId)
      .subscribe( response => {
        this._toasterService.success('Data has been successfully updated.');
        this.router.navigate(['complaint-list/' + this.type.toLowerCase()]);
      },
      error => {
        const error_response  = error;
        this.responseError  = error_response.error;
      }
    );
  }
}

