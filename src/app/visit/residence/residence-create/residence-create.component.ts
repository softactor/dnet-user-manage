import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TosterService } from '../../../toster.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../authentication.service';
import {CompanyService} from '../../company/company.service';

@Component({
  selector: 'app-residence-create',
  templateUrl: './residence-create.component.html',
  styleUrls: ['./residence-create.component.css']
})
export class ResidenceCreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private router: Router,
              private _toasterService: TosterService,
              private _authentication: AuthenticationService,
              private _http: HttpClient) {
  }

  ngOnInit() {
  }

}
