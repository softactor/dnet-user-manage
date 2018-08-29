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
  protected searchStr: string;
  protected captain: string;
  // protected dataService: CompleterData;
  protected searchData = [
    { color: 'red', value: '#f00' },
    { color: 'green', value: '#0f0' },
    { color: 'blue', value: '#00f' },
    { color: 'cyan', value: '#0ff' },
    { color: 'magenta', value: '#f0f' },
    { color: 'yellow', value: '#ff0' },
    { color: 'black', value: '#000' }
  ];
  protected captains = [
    'James T. Kirk',
    'Benjamin Sisko',
    'Jean-Luc Picard',
    'Spock',
    'Jonathan Archer',
    'Hikaru Sulu',
    'Christopher Pike',
    'Rachel Garrett'
  ];

  residences: ResidenceModel[] = [];
  similarTypes;
  inputFields;
  formData;
  authorizationKey;
  feedbackData: any;
  responseError;
  tableListData;
  form_type;
  form_type_value;
  availableTags;
  showDropDown;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _service: ResidenceService,
    // private completerService: CompleterService,
    private _http: HttpClient) {
    this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
    this._service.getListData(this.authorizationKey).subscribe( response => {
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
    });
    this.similarTypes = [];
    this.form_type = 'Residdence';
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
      name: ['', Validators.required],
      address: ['', Validators.required],
      form_type: ['', ''],
      outcome: ['', Validators.requiredTrue]
    });
  }

  public onFormSubmit(fields, type) {
    this._service.create(fields, this.authorizationKey, type).subscribe( response => {
        this._toasterService.success('Data has been successfully created.');
        this._service.getListData(this.authorizationKey.toString()).subscribe( listResponse => {
            this.tableListData = listResponse;
            this.feedbackData = this.tableListData.results;
          },
          error => {
            console.log(error);
          }
        );
      },
      error => {
        const error_response  = error;
        this.responseError  = error_response.error;
      }
    );
  }

  public copyForm(e) {
    if (this.form_type) {
      if(this.similarTypes.indexOf(this.form_type) === -1) {
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
