import { Component, OnInit } from '@angular/core';
import { TosterService } from '../../../toster.service';
import { AuthenticationService } from '../../../authentication.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { JailService } from '../jail.service';
declare var $: any;
@Component({
  selector: 'app-jail-edit',
  templateUrl: './jail-edit.component.html',
  styleUrls: ['./jail-edit.component.css']
})
export class JailEditComponent implements OnInit {
  editId;
  authorizationKey;
  editData;
  name  = '';
  address = '';
  outcome = '';
  no_of_bangladeshis = '';
  type = '';
  updateResponse;
  responseError;
  formData;
  date;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _activateRoute: ActivatedRoute,
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _service: JailService,
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
      name                    : ['', Validators.required],
      address                 : ['', Validators.required],
      no_of_bangladeshis      : ['', Validators.required],
      type                    : ['', Validators.required],
      outcome                 : ['', Validators.requiredTrue]
    });
    this._activateRoute.paramMap
      .subscribe( params => {
        this.editId = params.get('jail_id')
        this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
        const getDetailsParam  = {
          editId        : this.editId,
          authorizationKey  : this.authorizationKey
        };

        this._service.getDetailsById(getDetailsParam).subscribe( Details => {
          this.editData = Details;
          this.name               = this.editData.name;
          this.address            = this.editData.address;
          this.outcome            = this.editData.outcome;
          this.no_of_bangladeshis = this.editData.no_of_bangladeshis;
          this.type               = this.editData.type;
          this.date               = this.editData.date;
        });
      });
  }
  public update(form: NgForm, e) {
    e.preventDefault();
    const dateField = $('#date').val();
    const updateParam = 'name=' + ((form.value.name === undefined)    ? ''  :  form.value.name)
      + '&address=' + ((form.value.address === undefined) ? ''  :  form.value.address)
      + '&outcome=' + ((form.value.outcome === undefined) ? ''  :  form.value.outcome)
      + '&date=' + ((dateField === undefined) ? ''  :  dateField)
      + '&no_of_bangladeshis=' + ((form.value.no_of_bangladeshis === undefined) ? ''  :  form.value.no_of_bangladeshis)
      + '&type=' + this.type
    this._service.update(updateParam, this.authorizationKey, 'visit/jail/update/', this.editId).subscribe( response => {
        this._toasterService.success('Data has been successfully updated.');
        this.router.navigate(['jail-list/' + this.type]);
      },
      error => {
        const error_response  = error;
        this.responseError  = error_response.error;
      }
    );
  }
}
