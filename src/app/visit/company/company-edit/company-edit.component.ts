import { Component, OnInit } from '@angular/core';
import { TosterService } from '../../../toster.service';
import { AuthenticationService } from '../../../authentication.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import { CompanyService } from '../company.service';
import {FormBuilder, NgForm} from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {
  editId;
  type;
  authorizationKey;
  editData;
  name  = '';
  address = '';
  outcome = '';
  date;
  updateResponse;
  responseError;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _activateRoute: ActivatedRoute,
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _service: CompanyService,
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
    this._activateRoute.paramMap
      .subscribe( params => {
        this.editId = params.get('company_id')
        this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
        const getDetailsParam  = {
          editId        : this.editId,
          authorizationKey  : this.authorizationKey
        };

        this._service.getDetailsById(getDetailsParam).subscribe( Details => {
          this.editData = Details;
          this.name = this.editData.name;
          this.address = this.editData.address;
          this.outcome = this.editData.outcome;
          this.type = this.editData.type;
          this.date = this.editData.date;
        });
      });
  }
  public update(form: NgForm, e) {
    e.preventDefault();
    const dateField = $('#date').val();
      const updateParam = {
        name           :  ((form.value.name === undefined)    ? ''  :  form.value.name),
        address        :  ((form.value.address === undefined) ? ''  :  form.value.address),
        outcome        :  ((form.value.outcome === undefined) ? ''  :  form.value.outcome),
        date           :  ((dateField) ? dateField  :  ''),
        editId         :  this.editId,
        authorization  :  this.authorizationKey
      };
      this._service.update(updateParam).subscribe( response => {
        this._toasterService.success('Data has been successfully updated.');
          this.router.navigate(['company-list/' + this.type]);
      },
        error => {
          const error_response  = error;
          this.responseError  = error_response.error;
        }
      );
  }

}
