import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService } from '../../../toster.service';
import { AuthenticationService } from '../../../authentication.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import { CompanyService } from '../company.service';
import { CompanyModel } from '../company.model';
import { Location } from '@angular/common';

declare var $: any;
@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.css']
})
export class CompanyCreateComponent implements OnInit {
  company: CompanyModel[] = [];
  similarTypes;
  inputFields;
  formData;
  authorizationKey;
  feedbackData;
  responseError;
  defaultDate;
  assignTo;
  form_type;
  list_param;
  no_of_bangladeshis;
  constructor(
    private _location: Location,
    private fb: FormBuilder,
    private router: Router,
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _service: CompanyService,
    private _activateRoute: ActivatedRoute,
    private _http: HttpClient) {
    this._activateRoute.paramMap
      .subscribe( params => {
        this.list_param = params.get('create_param');
      });
  }
  ngOnInit() {
    // to solve the left menu hide problem;
    $(document).ready(() => {
      const trees: any = $('[data-widget="tree"]');
      trees.tree();
      $('#defaultDate').datepicker({
        dateFormat  : 'yy-mm-dd',
        maxDate     : '0'
      });
      $('#defaultDate').datepicker('setDate', new Date());
    });
    this.similarTypes = [];
    this.form_type    = this.list_param;
    this.similarTypes.push(this.form_type);
    const residenceObj = new CompanyModel();
    // @ts-ignore
    this.company.push(residenceObj);
    this.assignTo = localStorage.getItem('assign_to');
    this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
    this.inputFields = {
      name    : '',
      address : '',
      outcome : '',
      date    : '',
      no_of_bangladeshis : ''
    };

    this.formData = this.fb.group({
      name                  : ['', Validators.required],
      address               : ['', Validators.required],
      outcome               : ['', Validators.requiredTrue],
      date                  : ['', Validators.requiredTrue],
      no_of_bangladeshis    : ['', Validators.requiredTrue]
    });
  }

  public onFormSubmit(fields, type) {
    if (this.form_type) {
      this.defaultDate = $('#defaultDate').val();
      if (this.defaultDate) {
        const postString = 'name=' + ((fields.name === undefined) ? '' : fields.name)
          + '&address=' + ((fields.address === undefined) ? '' : fields.address)
          + '&outcome=' + ((fields.outcome === undefined) ? '' : fields.outcome)
          + '&date=' + this.defaultDate
          + '&assign_to=' + this.assignTo
          + '&type=' + type
          + '&no_of_bangladeshis=' + ((fields.no_of_bangladeshis === undefined) ? '' : fields.no_of_bangladeshis)
        this._service.create(postString, 'visit/company/create', this.authorizationKey).subscribe(response => {
            // menu ceate
            let formType  = this.form_type.toLowerCase();
            const postMenuString = 'name=' + formType
              + '&module_name=' + formType
              + '&parent_id=' + 1
              + '&url=/company-list/' + formType
              + '&type=' + formType
            this._service.create(postMenuString, 'menumanagment/leftmenu/create', this.authorizationKey).subscribe(response => {
                this._toasterService.success('Entry have successfully done.');
                this.router.navigate(['company-list/' + formType]);
                // location.reload();
              },
              error => {
                const error_response = error;
                this.responseError = error_response.error;
              }
            );
            // end of menu create
          },
          error => {
            const error_response = error;
            this.responseError = error_response.error;
          }
        );
      } else {
        this._toasterService.warning('Please select a date');
      }
    } else {
      this._toasterService.warning('Please type a similar form name');
    }
  }

  public copyForm(e) {
    if (this.form_type) {
      if (this.similarTypes.indexOf(this.form_type) === -1) {
        this.company  = [];
        this.similarTypes = this.form_type;
        const companyObj = new CompanyModel();
        // @ts-ignore
        this.company.push(companyObj);
      } else {
        this._toasterService.warning('Type is already there');
      }
    } else {
      this._toasterService.warning('Please type a similar form name');
    }
  }

}
