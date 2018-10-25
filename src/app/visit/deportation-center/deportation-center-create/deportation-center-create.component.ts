import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService } from '../../../toster.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthenticationService } from '../../../authentication.service';
import { DeportationCenterService } from '../deportation-center.service';
import { DeportationModel } from '../deportation.model';

declare var $: any;
@Component({
  selector: 'app-deportation-center-create',
  templateUrl: './deportation-center-create.component.html',
  styleUrls: ['./deportation-center-create.component.css']
})
export class DeportationCenterCreateComponent implements OnInit {
  deportation: DeportationModel[] = [];
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
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _toasterService: TosterService,
    private _authentication: AuthenticationService,
    private _activateRoute: ActivatedRoute,
    private _service: DeportationCenterService,
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
    const dataModelObj = new DeportationModel();
    // @ts-ignore
    this.deportation.push(dataModelObj);
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
    if (this.form_type) {
      this.defaultDate = $('#defaultDate').val();
      if (this.defaultDate) {
      const postString = 'name=' + ((fields.name === undefined) ? '' : fields.name)
        + '&address=' + ((fields.address === undefined) ? '' : fields.address)
        + '&outcome=' + ((fields.outcome === undefined) ? '' : fields.outcome)
        + '&no_of_bangladeshis=' + ((fields.no_of_bangladeshis === undefined) ? '' : fields.no_of_bangladeshis)
        + '&date=' + this.defaultDate
        + '&assign_to=' + this.assignTo
        + '&type=' + type
      this._service.create(postString, 'visit/deportationcenter/create', this.authorizationKey).subscribe(response => {
          // menu ceate
          const postMenuString = 'name=' + type
            + '&module_name=' + type
            + '&parent_id=' + 1
            + '&url=company-list/' + type
            + '&type=' + type
          this._service.create(postMenuString, 'menumanagment/leftmenu/create', this.authorizationKey).subscribe(response => {
              this._toasterService.success('Entry have successfully done.');
              this.router.navigate(['deportation-center-list/' + type]);
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
        const dataModelObj = new DeportationModel();
        // @ts-ignore
        this.deportation.push(dataModelObj);
      } else {
        this._toasterService.warning('Type is already there');
      }
    } else {
      this._toasterService.warning('Please type a similar form name');
    }
  }
}
