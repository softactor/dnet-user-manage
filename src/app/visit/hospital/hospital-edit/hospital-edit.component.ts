import { Component, OnInit } from '@angular/core';
import { TosterService } from '../../../toster.service';
import { AuthenticationService } from '../../../authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { HospitalService } from '../hospital.service';

@Component({
  selector: 'app-hospital-edit',
  templateUrl: './hospital-edit.component.html',
  styleUrls: ['./hospital-edit.component.css']
})
export class HospitalEditComponent implements OnInit {

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
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _activateRoute: ActivatedRoute,
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _service: HospitalService,
    private _http: HttpClient) {
  }

  ngOnInit() {
    this.formData = this.fb.group({
      name                    : ['', Validators.required],
      address                 : ['', Validators.required],
      no_of_bangladeshis      : ['', Validators.required],
      type                    : ['', Validators.required],
      outcome                 : ['', Validators.requiredTrue]
    });
    this._activateRoute.paramMap
      .subscribe( params => {
        this.editId = params.get('hospital_id')
        this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
        const getDetailsParam  = {
          editId        : this.editId,
          authorizationKey  : this.authorizationKey.toString()
        };

        this._service.getDetailsById(getDetailsParam).subscribe( Details => {
          this.editData = Details;
          this.name               = this.editData.name;
          this.address            = this.editData.address;
          this.outcome            = this.editData.outcome;
          this.no_of_bangladeshis = this.editData.no_of_bangladeshis;
          this.type               = this.editData.type;
        });
      });
  }

  public update(form: NgForm, e) {
    e.preventDefault();
    const updateParam = {
      name                      : form.value.name,
      address                   : form.value.address,
      outcome                   : form.value.outcome,
      no_of_bangladeshis        : form.value.no_of_bangladeshis,
      type                      : form.value.type,
      editId                    : this.editId,
      authorization             : this.authorizationKey
    };
    this._service.update(updateParam).subscribe( response => {
        this._toasterService.success('Data has been successfully updated.');
        this.router.navigate(['hospital-list']);
      },
      error => {
        const error_response  = error;
        this.responseError  = error_response.error;
      }
    );
  }

}
