import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService } from '../../../toster.service';
import { AuthenticationService } from '../../../authentication.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { CompanyService } from '../company.service';
import { CompanyModel } from '../company.model';
import { LeftMenuComponent } from "../../../layout/left-menu/left-menu.component";

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
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _service: CompanyService,
    private leftMenu: LeftMenuComponent,
    private _http: HttpClient) {
  }
  ngOnInit() {
    // to solve the left menu hide problem;
    $(document).ready(() => {
      const trees: any = $('[data-widget="tree"]');
      trees.tree();
      $('#defaultDate').datepicker({
        dateFormat: 'yy-mm-dd'
      });
      $('#defaultDate').datepicker('setDate', new Date());
    });
    this.similarTypes = [];
    this.form_type    = 'Company';
    this.similarTypes.push(this.form_type);
    const residenceObj = new CompanyModel();
    // @ts-ignore
    this.company.push(residenceObj);
    this.assignTo = localStorage.getItem('assign_to');
    this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
    this.inputFields = {
      name    : '',
      address : '',
      outcome : ''
    };

    this.formData = this.fb.group({
      name         : ['', Validators.required],
      address      : ['', Validators.required],
      outcome      : ['', Validators.requiredTrue]
    });
  }

  public onFormSubmit(fields, type) {
    this.defaultDate = $('#defaultDate').val();
    const postString = 'name=' + fields.name
      + '&address=' + fields.address
      + '&outcome=' + fields.outcome
      + '&date=' + this.defaultDate
      + '&assign_to=' + this.assignTo
      + '&type=' + type
    this._service.create(postString, 'visit/company/create', this.authorizationKey).subscribe( response => {
    },
      error => {
        const error_response  = error;
        this.responseError  = error_response.error;
      }
    );
    // menu ceate
    const postMenuString = 'name=' + type
      + '&module_name=' + type
      + '&parent_id=' + 1
      + '&url=company-list/' + type
      + '&type=' + type
    this._service.create(postMenuString, 'menumanagment/leftmenu/create', this.authorizationKey).subscribe( response => {
        this._toasterService.success('Entry have successfully done.');
        this.router.navigate(['company-list/company']);
        this.leftMenu.childMenuData = response;
        this.leftMenu.childMenu = this.leftMenu.childMenuData.result;
      },
      error => {
        const error_response  = error;
        this.responseError  = error_response.error;
      }
    );
    // end of menu create
  }

  public copyForm(e) {
    if (this.form_type) {
      if (this.similarTypes.indexOf(this.form_type) === -1) {
        this.similarTypes.push(this.form_type);
        const companyObj = new CompanyModel();
        // @ts-ignore
        this.company.push(companyObj);
      }else {
        this._toasterService.warning('Type is already there');
      }
    } else {
      this._toasterService.warning('Please type a similar form name');
    }
  }

}
