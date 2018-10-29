import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import { TosterService } from '../../toster.service';
import { ArrearpayService } from './arrearpay.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
  selector    : 'app-arbitration-disputes-update',
  templateUrl : 'arrearpay-update.component.html'
})
export class ArrearpayUpdateComponent implements OnInit {
  editId;
  editData;
  inputFields;
  formData;
  authorizationKey;
  feedbackData;
  responseError;
  person_concern_type  = '';
  total_number = '';
  number_of_case_resolved = '';
  date = '';
  type = '';
  constructor(
    private _activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _service: ArrearpayService,
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
      person_concern_type                : ['', Validators.required],
      total_number             : ['', Validators.required],
      number_of_case_resolved               : ['', Validators.required]
    });
    this._activateRoute.paramMap
      .subscribe( params => {
        this.editId = params.get('arrearpay_id')
        this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
        const getDetailsParam  = {
          editId        : this.editId,
          authorizationKey  : this.authorizationKey
        };

        this._service.getDetailsById(getDetailsParam, 'resolved/arrearpay/details/').subscribe( Details => {
          this.editData = Details;
          this.person_concern_type               = this.editData.person_concern_type;
          this.number_of_case_resolved            = this.editData.number_of_case_resolved;
          this.total_number              = this.editData.total_number;
          this.date              = this.editData.date;
          this.type              = this.editData.type;
        });
      });
  }
  public update(form: NgForm, e) {
    e.preventDefault();
    const dateField = $('#date').val();
    const updateParam = 'person_concern_type='
      + ((form.value.person_concern_type === undefined) ? '' : form.value.person_concern_type)
      + '&total_number=' + ((form.value.total_number === undefined) ? '' : form.value.total_number)
      + '&number_of_case_resolved=' + ((form.value.number_of_case_resolved === undefined) ? '' : form.value.number_of_case_resolved)
      + '&date=' + ((dateField === undefined) ? ''  :  dateField);
    this._service.update(updateParam, this.authorizationKey,
      'resolved/arrearpay/edit/', this.editId)
      .subscribe( response => {
        this._toasterService.success('Data has been successfully updated.');
        this.router.navigate(['arrearpay-list/' + this.type]);
      },
      error => {
        const error_response  = error;
        this.responseError  = error_response.error;
      }
    );
  }
}

