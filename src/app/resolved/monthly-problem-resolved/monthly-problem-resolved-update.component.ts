import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import { TosterService } from '../../toster.service';
import { MonthlyProblemResolvedService } from './monthly-problem-resolved.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
  selector    : 'app-monthly-problem-resolved-update',
  templateUrl : 'monthly-problem-resolved-update.component.html'
})
export class MonthlyProblemResolvedUpdateComponent implements OnInit {
  editId;
  editData;
  inputFields;
  formData;
  authorizationKey;
  feedbackData;
  responseError;
  type_of_problem = '';
  total_number = '';
  type = '';
  date = '';
  constructor(
    private _activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _service: MonthlyProblemResolvedService,
    private _http: HttpClient) {
  }
  ngOnInit() {
    // to solve the left menu hide problem;
    $(document).ready(() => {
      const trees: any = $('[data-widget="tree"]');
      trees.tree();
    });
    this.formData = this.fb.group({
      type_of_problem                : ['', Validators.required],
      total_number             : ['', Validators.required]
    });
    this._activateRoute.paramMap
      .subscribe( params => {
        this.editId = params.get('monthly_problem_resolved_id')
        this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
        const getDetailsParam  = {
          editId        : this.editId,
          authorizationKey  : this.authorizationKey
        };

        this._service.getDetailsById(getDetailsParam, 'resolved/monthlyproblemresolved/details/').subscribe( Details => {
          this.editData = Details;
          this.type_of_problem         = this.editData.type_of_problem;
          this.total_number            = this.editData.total_number;
          this.type         = this.editData.type;
          this.date         = this.editData.date;
        });
      });
  }
  public update(form: NgForm, e) {
    e.preventDefault();
    const updateParam = 'type_of_problem='
      + ((form.value.type_of_problem === undefined)    ? ''  :  form.value.type_of_problem)
      + '&total_number=' + ((form.value.total_number === undefined)    ? ''  :  form.value.total_number);
    this._service.update(updateParam, this.authorizationKey,
      'resolved/monthlyproblemresolved/edit/', this.editId)
      .subscribe( response => {
        this._toasterService.success('Data has been successfully updated.');
        this.router.navigate(['monthly-problem-resolved-list']);
      },
      error => {
        const error_response  = error;
        this.responseError  = error_response.error;
      }
    );
  }
}

