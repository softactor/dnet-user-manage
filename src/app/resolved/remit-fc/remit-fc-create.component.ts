import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService} from '../../toster.service';
import { RemitFcService } from './remit-fc.service';
import { RemitFcModel } from './remit-fc.model';

declare var $: any;

@Component({
  selector    : 'app-remit-fc-create',
  templateUrl : 'remit-fc-create.component.html'
})
export class RemitFcCreateComponent implements OnInit {
  remitFc: RemitFcModel[] = [];
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
    private _service: RemitFcService,
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
    const residenceObj = new RemitFcModel();
    // @ts-ignore
    this.remitFc.push(residenceObj);
    this.assignTo = localStorage.getItem('assign_to');
    this.authorizationKey = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
    this.inputFields = {
      remit_type            : '',
      no         : '',
      outcome           : '',
    };

    this.formData = this.fb.group({
      remit_type          : ['', Validators.required],
      no       : ['', Validators.required],
      outcome         : ['', Validators.requiredTrue]
    });
  }

  public onFormSubmit(fields, type) {
    if (this.form_type) {
      this.defaultDate = $('#defaultDate').val();
      if (this.defaultDate) {
        const createFormData = this.formData.value;
        const postString = 'remit_type=' + ((fields.remit_type === undefined) ? '' : fields.remit_type)
          + '&no=' + ((fields.no === undefined) ? '' : fields.no)
          + '&outcome=' + ((fields.outcome === undefined) ? '' : fields.outcome)
          + '&date=' + this.defaultDate
          + '&assign_to=' + this.assignTo
          + '&type=' + this.form_type.toLowerCase()

        this._service.create(postString, this.authorizationKey, 'resolved/remitfc/create').subscribe(response => {
            // menu ceate
            const postMenuString = 'name=' + this.form_type
              + '&module_name=' + this.form_type
              + '&parent_id=' + 6
              + '&url=remit-fc-list/' + this.form_type
              + '&type=' + this.form_type.toLowerCase()
            this._service.create(postMenuString, this.authorizationKey, 'menumanagment/leftmenu/create').subscribe(menu_response => {
                this._toasterService.success('Entry have successfully done.');
                this.router.navigate(['remit-fc-list/' + this.form_type.toLowerCase()]);
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
        this.remitFc = [];
        this.similarTypes.push(this.form_type);
        const remitFcObj = new RemitFcModel();
        // @ts-ignore
        this.remitFc.push(remitFcObj);
      }else {
        this._toasterService.warning('Type is already there');
      }
    } else {
      this._toasterService.warning('Please type a similar form name');
    }
  }
}

