import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import { TosterService } from '../../toster.service';
import { BudgetService } from './budget.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
  selector    : 'app-conference-update',
  templateUrl : 'budget-update.component.html'
})
export class BudgetUpdateComponent implements OnInit {
  editId;
  editData;
  inputFields;
  formData;
  authorizationKey;
  feedbackData;
  responseError;
  budget_type  = '';
  opening_balance = '';
  closing_balance = '';
  total_expenditure = '';
  constructor(
    private _activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _service: BudgetService,
    private _http: HttpClient) {
  }
  ngOnInit() {
    // to solve the left menu hide problem;
    $(document).ready(() => {
      const trees: any = $('[data-widget="tree"]');
      trees.tree();
    });
    this.formData = this.fb.group({
      budget_type                : ['', Validators.required],
      opening_balance                 : ['', Validators.required],
      closing_balance                 : ['', Validators.required],
      total_expenditure                    : ['', Validators.required]
    });
    this._activateRoute.paramMap
      .subscribe( params => {
        this.editId = params.get('budget_id')
        this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
        const getDetailsParam  = {
          editId        : this.editId,
          authorizationKey  : this.authorizationKey.toString()
        };

        this._service.getDetailsById(getDetailsParam, 'finance/budget/details/').subscribe( Details => {
          this.editData = Details;
          this.budget_type           = this.editData.budget_type;
          this.opening_balance            = this.editData.opening_balance;
          this.closing_balance               = this.editData.closing_balance;
          this.total_expenditure               = this.editData.total_expenditure;
        });
      });
  }
  public update(form: NgForm, e) {
    e.preventDefault();
    const updateParam = 'budget_type=' + form.value.budget_type
      + '&opening_balance=' + form.value.opening_balance
      + '&total_expenditure=' + form.value.total_expenditure
      + '&closing_balance=' + form.value.closing_balance
      + '&authorization=' + this.authorizationKey;
    this._service.update(updateParam, this.authorizationKey,
      'finance/budget/update/', this.editId).subscribe( response => {
        this._toasterService.success('Data has been successfully updated.');
        this.router.navigate(['budget-list']);
      },
      error => {
        const error_response  = error;
        this.responseError  = error_response.error;
      }
    );
  }
}

