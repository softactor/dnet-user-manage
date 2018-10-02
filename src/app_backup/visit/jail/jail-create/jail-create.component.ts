import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService } from '../../../toster.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../authentication.service';
import { JailService } from '../jail.service';
import { JailModel } from '../jail.model';

declare var $: any;
@Component({
  selector: 'app-jail-create',
  templateUrl: './jail-create.component.html',
  styleUrls: ['./jail-create.component.css']
})
export class JailCreateComponent implements OnInit {
  jail: JailModel[] = [];
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
    private _service: JailService,
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
    this.form_type    = 'Jail';
    this.similarTypes.push(this.form_type);
    const dataModelObj = new JailModel();
    // @ts-ignore
    this.jail.push(dataModelObj);
    this.assignTo = localStorage.getItem('assign_to');
    this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
    this.inputFields = {
      name    : '',
      address : '',
      outcome : '',
      no_of_bangladeshis : '',
      type : '',
    };

    this.formData = this.fb.group({
      name         : ['', Validators.required],
      address      : ['', Validators.required],
      outcome      : ['', Validators.requiredTrue],
      no_of_bangladeshis      : ['', Validators.requiredTrue],
      type      : ['', Validators.requiredTrue],
    });
  }
  public onFormSubmit(fields, type) {
  this.defaultDate = $('#defaultDate').val();
  const postString  =  'name=' + fields.name
    + '&address=' + fields.address
    + '&outcome=' + fields.outcome
    + '&no_of_bangladeshis=' + fields.no_of_bangladeshis
    + '&date=' + this.defaultDate
    + '&assign_to=' + this.assignTo
    + '&type=' + type
    this._service.create(postString, 'visit/jail/create', this.authorizationKey).subscribe( response => {
      this._toasterService.success('Data has been successfully created.');
      this.router.navigate(['jail-list']);
    },
      error => {
        const error_response  = error;
        this.responseError  = error_response.error;
      }
    );
  }
  public copyForm(e) {
    if (this.form_type) {
      if (this.similarTypes.indexOf(this.form_type) === -1) {
        this.similarTypes.push(this.form_type);
        const dataModelObj = new JailModel();
        // @ts-ignore
        this.jail.push(dataModelObj);
      }else {
        this._toasterService.warning('Type is already there');
      }
    } else {
      this._toasterService.warning('Please type a similar form name');
    }
  }

}