import { Component, OnInit } from '@angular/core';
import { TosterService } from '../../../toster.service';
import { AuthenticationService } from '../../../authentication.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, NgForm} from '@angular/forms';
import { ResidenceService } from '../residence.service';

@Component({
  selector: 'app-residence-edit',
  templateUrl: './residence-edit.component.html',
  styleUrls: ['./residence-edit.component.css']
})
export class ResidenceEditComponent implements OnInit {

  editId;
  authorizationKey;
  editData;
  name  = '';
  address = '';
  outcome = '';
  updateResponse;
  responseError;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _activateRoute: ActivatedRoute,
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _service: ResidenceService,
    private _http: HttpClient) {
  }

  ngOnInit() {
    this._activateRoute.paramMap
      .subscribe( params => {
        this.editId = params.get('residence_id')
        this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
        const getDetailsParam  = {
          editId        : this.editId,
          authorizationKey  : this.authorizationKey.toString()
        };

        this._service.getDetailsById(getDetailsParam).subscribe( Details => {
          this.editData = Details;
          this.name = this.editData.name;
          this.address = this.editData.address;
          this.outcome = this.editData.outcome;
        });
      });
  }

  public update(form: NgForm, e) {
    e.preventDefault();
      const updateParam = {
        name           : form.value.name,
        address        : form.value.address,
        outcome        : form.value.outcome,
        editId         : this.editId,
        authorization  : this.authorizationKey
      };
      this._service.update(updateParam).subscribe( response => {
        this._toasterService.success('Data has been successfully updated.');
        this.router.navigate(['residence-list']);
      },
        error => {
          const error_response  = error;
          this.responseError  = error_response.error;
        }
      );
  }

}
