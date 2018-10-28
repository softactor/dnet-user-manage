import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import { TosterService } from '../../toster.service';
import { LegalAssistanceService } from './legal-assistance.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
  selector    : 'app-general-assistance-update',
  templateUrl : 'legal-assistance-update.component.html'
})
export class LegalAssistanceUpdateComponent implements OnInit {
  editId;
  editData;
  inputFields;
  formData;
  authorizationKey;
  feedbackData;
  responseError;
  name  = '';
  address = '';
  leagal_issue = '';
  assistance_provided = '';
  type = '';
  date;
  constructor(
    private _activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _service: LegalAssistanceService,
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
      name                : ['', Validators.required],
      address             : ['', Validators.required],
      leagal_issue        : ['', Validators.required],
      assistance_provided : ['', Validators.required],
      type                : ['', Validators.required]
    });
    this._activateRoute.paramMap
      .subscribe( params => {
        this.editId = params.get('legal_assistance_id')
        this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
        const getDetailsParam  = {
          editId        : this.editId,
          authorizationKey  : this.authorizationKey.toString()
        };

        this._service.getDetailsById(getDetailsParam, 'assistanceprovidation/legalassistance/details/').subscribe( Details => {
          this.editData = Details;
          this.name               = this.editData.name;
          this.address            = this.editData.address;
          this.leagal_issue              = this.editData.legal_issue;
          this.assistance_provided       = this.editData.assistance_provided;
          this.type               = this.editData.type;
          this.date               = this.editData.date;
        });
      });
  }
  public update(form: NgForm, e) {
    e.preventDefault();
    const dateField = $('#date').val();
    const updateParam = 'name='
      + ((form.value.name === undefined)    ? ''  :  form.value.name)
      + '&address=' + ((form.value.address === undefined)    ? ''  :  form.value.address)
      + '&legal_issue=' + ((form.value.leagal_issue === undefined)    ? ''  :  form.value.leagal_issue)
      + '&assistance_provided=' + ((form.value.assistance_provided === undefined)    ? ''  :  form.value.assistance_provided)
      + '&type=' + this.type
      + '&date=' + ((dateField === undefined)    ? ''  :  dateField);
    this._service.update(updateParam, this.authorizationKey,
      'assistanceprovidation/legalassistance/edit/', this.editId)
      .subscribe( response => {
        this._toasterService.success('Data has been successfully updated.');
        this.router.navigate(['legal-assistance-list/' + this.type]);
      },
      error => {
        const error_response  = error;
        this.responseError  = error_response.error;
      }
    );
  }
}

