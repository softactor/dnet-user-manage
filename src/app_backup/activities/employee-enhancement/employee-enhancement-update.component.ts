import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import { TosterService} from '../../toster.service';
import { EmployeeEnhancementService } from './employee-enhancement.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
  selector    : 'app-employee-enhancement-update',
  templateUrl : 'employee-enhancement-update.component.html'
})
export class EmployeeEnhancementUpdateComponent implements OnInit {
  editId;
  editData;
  inputFields;
  formData;
  authorizationKey;
  feedbackData;
  responseError;
  enhancement_type  = '';
  remarks = '';
  outcome = '';
  type = '';
  constructor(
    private _activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _service: EmployeeEnhancementService,
    private _http: HttpClient) {
  }
  ngOnInit() {
    // to solve the left menu hide problem;
    $(document).ready(() => {
      const trees: any = $('[data-widget="tree"]');
      trees.tree();
    });
    this.formData = this.fb.group({
      enhancement_type        : ['', Validators.required],
      remarks                 : ['', Validators.required],
      outcome                 : ['', Validators.required],
      type                    : ['', Validators.required]
    });
    this._activateRoute.paramMap
      .subscribe( params => {
        this.editId = params.get('employee_enhancement_id')
        this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
        const getDetailsParam  = {
          editId        : this.editId,
          authorizationKey  : this.authorizationKey.toString()
        };

        this._service.getDetailsById(getDetailsParam, 'activity/employeeenhancement/details/').subscribe( Details => {
          this.editData = Details;
          this.enhancement_type           = this.editData.enhancement_type;
          this.remarks            = this.editData.remarks;
          this.outcome            = this.editData.outcome;
          this.type               = this.editData.type;
        });
      });
  }
  public update(form: NgForm, e) {
    e.preventDefault();
    const updateParam = 'enhancement_type=' + form.value.enhancement_type
      + '&remarks=' + form.value.remarks
      + '&outcome=' + form.value.outcome
      + '&type=' + form.value.type
      + '&authorization=' + this.authorizationKey;
    this._service.update(updateParam, this.authorizationKey, 'activity/employeeenhancement/update/', this.editId).subscribe( response => {
        this._toasterService.success('Data has been successfully updated.');
        this.router.navigate(['employee-enhancement-list']);
      },
      error => {
        const error_response  = error;
        this.responseError  = error_response.error;
      }
    );
  }
}

