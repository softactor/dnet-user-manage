import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import { TosterService } from '../../toster.service';
import { RemitFcService } from './remit-fc.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
  selector    : 'app-remit-fc-update',
  templateUrl : 'remit-fc-update.component.html'
})
export class RemitFcUpdateComponent implements OnInit {
  editId;
  editData;
  inputFields;
  formData;
  authorizationKey;
  feedbackData;
  responseError;
  remit_type  = '';
  no = '';
  outcome = '';
  type = '';
  date = '';
  constructor(
    private _activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _service: RemitFcService,
    private _http: HttpClient) {
  }
  ngOnInit() {
    // to solve the left menu hide problem;
    $(document).ready(() => {
      const trees: any = $('[data-widget="tree"]');
      trees.tree();
    });
    this.formData = this.fb.group({
      remit_type                : ['', Validators.required],
      no             : ['', Validators.required],
      outcome               : ['', Validators.required]
    });
    this._activateRoute.paramMap
      .subscribe( params => {
        this.editId = params.get('remit_fc_id')
        this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
        const getDetailsParam  = {
          editId        : this.editId,
          authorizationKey  : this.authorizationKey.toString()
        };

        this._service.getDetailsById(getDetailsParam, 'resolved/remitfc/details/').subscribe( Details => {
          this.editData = Details;
          this.remit_type    = this.editData.remit_type;
          this.no            = this.editData.no;
          this.outcome       = this.editData.outcome;
          this.type         = this.editData.type;
          this.date         = this.editData.date;
        });
      });
  }
  public update(form: NgForm, e) {
    e.preventDefault();
    const updateParam = 'remit_type='
      + ((form.value.remit_type === undefined)    ? ''  :  form.value.remit_type)
      + '&no=' + ((form.value.no === undefined)    ? ''  :  form.value.no)
      + '&outcome=' + ((form.value.outcome === undefined)    ? ''  :  form.value.outcome);
    this._service.update(updateParam, this.authorizationKey,
      'resolved/remitfc/update/', this.editId)
      .subscribe( response => {
        this._toasterService.success('Data has been successfully updated.');
        this.router.navigate(['remit-fc-list']);
      },
      error => {
        const error_response  = error;
        this.responseError  = error_response.error;
      }
    );
  }
}

