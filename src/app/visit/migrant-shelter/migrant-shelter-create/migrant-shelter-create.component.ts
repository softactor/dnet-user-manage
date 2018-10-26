import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService } from '../../../toster.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthenticationService } from '../../../authentication.service';
import { MigrantShelterService } from '../migrant-shelter.service';
import { MigrantShelterModel } from '../migrant-shelter.model';

declare var $: any;
@Component({
  selector: 'app-migrant-shelter-create',
  templateUrl: './migrant-shelter-create.component.html',
  styleUrls: ['./migrant-shelter-create.component.css']
})
export class MigrantShelterCreateComponent implements OnInit {
  migrantShelter: MigrantShelterModel[] = [];
  similarTypes;
  inputFields;
  formData;
  authorizationKey;
  feedbackData;
  responseError;
  defaultDate;
  assignTo;
  list_param;
  form_type;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _service: MigrantShelterService,
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
        dateFormat: 'yy-mm-dd'
      });
      $('#defaultDate').datepicker('setDate', new Date());
    });
    this.similarTypes = [];
    this.form_type    = this.list_param;
    this.similarTypes.push(this.form_type);
    const dataModelObj = new MigrantShelterModel();
    // @ts-ignore
    this.migrantShelter.push(dataModelObj);
    this.assignTo = localStorage.getItem('assign_to');
    this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
    this.inputFields = {
      name    : '',
      address : '',
      outcome : '',
      no_of_bangladeshis : '',
      type : '',
      remark : '',
    };
    this.formData = this.fb.group({
      name         : ['', Validators.required],
      address      : ['', Validators.required],
      no_of_bangladeshis      : ['', Validators.requiredTrue],
      type      : ['', Validators.requiredTrue],
      remark      : ['', Validators.requiredTrue],
    });
  }
  public onFormSubmit(fields, type) {
    if (this.form_type) {
      this.defaultDate = $('#defaultDate').val();
      if (this.defaultDate) {
        const postString = 'name=' + ((fields.name === undefined) ? '' : fields.name)
          + '&address=' + ((fields.address === undefined) ? '' : fields.address)
          + '&remark=' + ((fields.remark === undefined) ? '' : fields.remark)
          + '&no_of_bangladeshis=' + ((fields.no_of_bangladeshis === undefined) ? '' : fields.no_of_bangladeshis)
          + '&date=' + this.defaultDate
          + '&assign_to=' + this.assignTo
          + '&type=' + this.form_type;
        this._service.create(postString, 'visit/migrantshelter/create', this.authorizationKey).subscribe(response => {
            // menu ceate
            let formType  = this.form_type.toLowerCase();
            const postMenuString = 'name=' + formType
              + '&module_name=' + formType
              + '&parent_id=' + 1
              + '&url=/migrant-shelter-list/' + formType
              + '&type=' + formType
            this._service.create(postMenuString, 'menumanagment/leftmenu/create', this.authorizationKey).subscribe(menu_response => {
                this._toasterService.success('Entry have successfully done.');
                this.router.navigate(['migrant-shelter-list/' + formType]);
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
        const dataModelObj = new MigrantShelterModel();
        // @ts-ignore
        this.migrantShelter.push(dataModelObj);
      }else {
        this._toasterService.warning('Type is already there');
      }
    } else {
      this._toasterService.warning('Please type a similar form name');
    }
  }

}
