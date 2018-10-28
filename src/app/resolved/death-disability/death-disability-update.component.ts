import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import { TosterService } from '../../toster.service';
import { DeathDisabilityService } from './death-disability.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
  selector    : 'app-arbitration-disputes-update',
  templateUrl : 'death-disability-update.component.html'
})
export class DeathDisabilityUpdateComponent implements OnInit {
  editId;
  editData;
  inputFields;
  formData;
  authorizationKey;
  feedbackData;
  responseError;
  category  = '';
  number = '';
  present_status = '';
  remarks = '';
  type;
  date;
  constructor(
    private _activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _service: DeathDisabilityService,
    private _http: HttpClient) {
  }
  ngOnInit() {
    // to solve the left menu hide problem;
    $(document).ready(() => {
      const trees: any = $('[data-widget="tree"]');
      trees.tree();
    });
    this.formData = this.fb.group({
      category             : ['', Validators.required],
      number               : ['', Validators.required],
      present_status        : ['', Validators.required],
      remarks                : ['', Validators.required]
    });
    this._activateRoute.paramMap
      .subscribe( params => {
        this.editId = params.get('death_disability_id')
        this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
        const getDetailsParam  = {
          editId        : this.editId,
          authorizationKey  : this.authorizationKey
        };

        this._service.getDetailsById(getDetailsParam, 'resolved/deathordisability/details/').subscribe( Details => {
          this.editData = Details;
          this.category               = this.editData.category;
          this.number              = this.editData.number;
          this.present_status       = this.editData.present_status;
          this.remarks               = this.editData.remarks;
          this.date               = this.editData.date;
          this.type               = this.editData.type;
        });
      });
  }
  public update(form: NgForm, e) {
    e.preventDefault();
    const updateParam = 'category='
      + ((form.value.category === undefined) ? '' : form.value.category)
      + '&number=' + ((form.value.number === undefined) ? '' : form.value.number)
      + '&present_status=' + ((form.value.present_status === undefined) ? '' : form.value.present_status)
      + '&remarks=' + ((form.value.remarks === undefined) ? '' : form.value.remarks)
    this._service.update(updateParam, this.authorizationKey,
      'resolved/deathordisability/edit/', this.editId)
      .subscribe( response => {
        this._toasterService.success('Data has been successfully updated.');
        this.router.navigate(['death-disability-list/' + this.type]);
      },
      error => {
        const error_response  = error;
        this.responseError  = error_response.error;
      }
    );
  }
}

