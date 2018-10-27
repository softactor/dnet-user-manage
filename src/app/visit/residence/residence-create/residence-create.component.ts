import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService } from '../../../toster.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
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
  no_of_bangladeshis;
  assignTo;
  showDropDown;
  list_param;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _activateRoute: ActivatedRoute,
    private _service: ResidenceService,
    // private completerService: CompleterService,
    private _http: HttpClient) {
    this._activateRoute.paramMap
      .subscribe( params => {
        this.list_param = params.get('create_param');
      });
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
    this.form_type    = this.list_param;
    this.similarTypes.push(this.form_type);
    const residenceObj = new ResidenceModel();
    // @ts-ignore
    this.residences.push(residenceObj);
    this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
    this.inputFields = {
      name: '',
      address: '',
      form_type: '',
      no_of_bangladeshis : '',
      outcome: ''
    };

    this.formData = this.fb.group({
      name:       ['', Validators.required],
      address:    ['', Validators.required],
      form_type:  ['', ''],
      no_of_bangladeshis      : ['', Validators.requiredTrue],
      outcome:    ['', Validators.requiredTrue]
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
          + '&no_of_bangladeshis=' + ((fields.no_of_bangladeshis === undefined) ? '' : fields.no_of_bangladeshis)
          + '&assign_to=' + this.assignTo
          + '&type=' + this.form_type
        this._service.create(postString, 'visit/residence/create', this.authorizationKey).subscribe(response => {
            // menu ceate
            let formType  = this.form_type.toLowerCase();
            const postMenuString = 'name=' + formType
              + '&module_name=' + formType
              + '&parent_id=' + 1
              + '&url=residence-list/' + formType
              + '&type=' + formType
            this._service.create(postMenuString, 'menumanagment/leftmenu/create', this.authorizationKey).subscribe(menu_response => {
                this._toasterService.success('Entry have successfully done.');
                this.router.navigate(['residence-list/' + formType]);
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
