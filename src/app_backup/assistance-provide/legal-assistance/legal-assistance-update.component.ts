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

        this._service.getDetailsById(getDetailsParam, 'assistanceprovidation/leagalassistance/details/').subscribe( Details => {
          this.editData = Details;
          this.name               = this.editData.name;
          this.address            = this.editData.address;
          this.leagal_issue              = this.editData.leagal_issue;
          this.assistance_provided       = this.editData.assistance_provided;
          this.type               = this.editData.type;
        });
      });
  }
  public update(form: NgForm, e) {
    e.preventDefault();
    const updateParam = 'name='
      + form.value.name
      + '&address=' + form.value.address
      + '&leagal_issue=' + form.value.leagal_issue
      + '&assistance_provided=' + form.value.assistance_provided
      + '&type=' + form.value.type
      + '&authorization=' + this.authorizationKey;
    this._service.update(updateParam, this.authorizationKey,
      'assistanceprovidation/leagalassistance/edit/', this.editId)
      .subscribe( response => {
        this._toasterService.success('Data has been successfully updated.');
        this.router.navigate(['legal-assistance-list']);
      },
      error => {
        const error_response  = error;
        this.responseError  = error_response.error;
      }
    );
  }
}

