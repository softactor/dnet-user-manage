import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService } from '../../../toster.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../authentication.service';
import { ResidenceService } from '../residence.service';
import { ResidenceModel } from '../residence.model';
declare var $: any;
@Component({
  selector: 'app-residence-create',
  templateUrl: './residence-create.component.html',
  styleUrls: ['./residence-create.component.css']
})
export class ResidenceCreateComponent implements OnInit {
  residences: ResidenceModel[] = [];
  similarTypes;
  inputFields;
  formData;
  authorizationKey;
  feedbackData: any;
  responseError;
  tableListData;
  form_type;
  listApi;
  defaultDate;
  assignTo;
  showDropDown;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _service: ResidenceService,
    // private completerService: CompleterService,
    private _http: HttpClient) {
    this.listApi  = 'visit/residence/list?type=Residence';
    this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
    this.assignTo = localStorage.getItem('assign_to');
    this._service.getListData(this.authorizationKey, this.listApi).subscribe( response => {
        this.tableListData = response;
        this.feedbackData = this.tableListData.results;
      },
      error => {
        console.log(error);
      }
    );
    this.showDropDown = false;
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
      this.defaultDate = $('#defaultDate').val();
    });
    this.similarTypes = [];
    this.form_type    = 'Residence';
    this.similarTypes.push(this.form_type);
    const residenceObj = new ResidenceModel();
    // @ts-ignore
    this.residences.push(residenceObj);
    this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
    this.inputFields = {
      name: '',
      address: '',
      form_type: '',
      outcome: ''
    };

    this.formData = this.fb.group({
      name:       ['', Validators.required],
      address:    ['', Validators.required],
      form_type:  ['', ''],
      outcome:    ['', Validators.requiredTrue]
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
    this._service.create(postString, 'visit/residence/create', this.authorizationKey).subscribe(response => {
        this._toasterService.success('Data has been successfully created.');
        this._service.getListData(this.authorizationKey, this.listApi).subscribe(listResponse => {
            this.tableListData = listResponse;
            this.feedbackData = this.tableListData.results;
          },
          error => {
            console.log(error);
          }
        );
      },
      error => {
        const error_response = error;
        this.responseError = error_response.error;
      }
    );
  }

  public copyForm(e) {
    if (this.form_type) {
      if (this.similarTypes.indexOf(this.form_type) === -1) {
        this.similarTypes.push(this.form_type);
        const residenceObj = new ResidenceModel();
        // @ts-ignore
        this.residences.push(residenceObj);
      }else {
        this._toasterService.warning('Type is already there');
      }
    } else {
      this._toasterService.warning('Please type a similar form name');
    }
  }
  getSuggession(column_name) {
    const valueLength = this.form_type.length;
    if (valueLength >= 3) {
      const suggessionParam = {
        authorizationKey  : this.authorizationKey,
        keywords          : this.form_type,
        column_name       : column_name
      };

      this._service.getfieldValueSuggession(suggessionParam).subscribe( response => {
        console.log(response);
      });
    }
  }
}
