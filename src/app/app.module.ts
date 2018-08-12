import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './layout/header/header.component';
import { LeftMenuComponent } from './layout/left-menu/left-menu.component';
import { FooterComponent } from './layout/footer/footer.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserListService } from './user-list/user-list.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './login/login.service';
import { UserCreateComponent } from './user-create/user-create.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FormsModule } from '@angular/forms';
import { TosterService } from './toster.service';
import { UserUpdateComponent } from './user-update/user-update.component';
import { AuthenticationService } from './authentication.service';
import { AuthGuard } from './auth.guard';
import { UserCreateService } from './user-create/user-create.service';
import { UserUpdateService } from './user-update/user-update.service';
import { LogoutComponent } from './logout/logout.component';
import { LogoutService } from './logout/logout.service';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { SignupFormService } from './signup-form/signup-form.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CompanyCreateComponent } from './visit/company/company-create/company-create.component';
import { CompanyListComponent } from './visit/company/company-list/company-list.component';
import { CompanyEditComponent } from './visit/company/company-edit/company-edit.component';
import { CompanyUpdateComponent } from './visit/company/company-update/company-update.component';
import { CompanyDeleteComponent } from './visit/company/company-delete/company-delete.component';
import { CompanyService } from './visit/company/company.service';
import { ResidenceCreateComponent } from './visit/residence/residence-create/residence-create.component';
import { ResidenceEditComponent } from './visit/residence/residence-edit/residence-edit.component';
import { ResidenceListComponent } from './visit/residence/residence-list/residence-list.component';
import { ResidenceDeleteComponent } from './visit/residence/residence-delete/residence-delete.component';
import { ResidenceService } from './visit/residence/residence.service';
import { DeportationCenterCreateComponent } from './visit/deportation-center/deportation-center-create/deportation-center-create.component';
import { DeportationCenterListComponent } from './visit/deportation-center/deportation-center-list/deportation-center-list.component';
import { DeportationCenterEditComponent } from './visit/deportation-center/deportation-center-edit/deportation-center-edit.component';
import { DeportationCenterService } from './visit/deportation-center/deportation-center.service';
import { JailCreateComponent } from './visit/jail/jail-create/jail-create.component';
import { JailListComponent } from './visit/jail/jail-list/jail-list.component';
import { JailEditComponent } from './visit/jail/jail-edit/jail-edit.component';
import { JailService } from './visit/jail/jail.service';
import { HospitalCreateComponent } from './visit/hospital/hospital-create/hospital-create.component';
import { HospitalListComponent } from './visit/hospital/hospital-list/hospital-list.component';
import { HospitalEditComponent } from './visit/hospital/hospital-edit/hospital-edit.component';
import { HospitalService } from './visit/hospital/hospital.service';
import { MigrantShelterCreateComponent } from './visit/migrant-shelter/migrant-shelter-create/migrant-shelter-create.component';
import { MigrantShelterListComponent } from './visit/migrant-shelter/migrant-shelter-list/migrant-shelter-list.component';
import { MigrantShelterEditComponent } from './visit/migrant-shelter/migrant-shelter-edit/migrant-shelter-edit.component';
import { MigrantShelterService } from './visit/migrant-shelter/migrant-shelter.service';

const appRoutes: Routes  = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'user-dashboard',
    canActivate: [AuthGuard],
    component: UserDashboardComponent
  },
  {
    path: 'user-list',
    canActivate: [AuthGuard],
    component: UserListComponent
  },
  {
    path: 'user-create',
    canActivate: [AuthGuard],
    component: UserCreateComponent
  },
  {
    path: 'user-update/:user_id',
    canActivate: [AuthGuard],
    component: UserUpdateComponent
  },
  {
    path: 'user-signup',
    component: SignupFormComponent
  },
  {
    path: 'company-create',
    canActivate: [AuthGuard],
    component: CompanyCreateComponent
  },
  {
    path: 'company-list',
    canActivate: [AuthGuard],
    component: CompanyListComponent
  },
  {
    path: 'company-update/:company_id',
    canActivate: [AuthGuard],
    component: CompanyEditComponent
  },
  {
    path: 'residence-list',
    canActivate: [AuthGuard],
    component: ResidenceListComponent
  },
  {
    path: 'residence-create',
    canActivate: [AuthGuard],
    component: ResidenceCreateComponent
  },
  {
    path: 'residence-update/:residence_id',
    canActivate: [AuthGuard],
    component: ResidenceEditComponent
  },
  {
    path: 'deportation-center-create',
    canActivate: [AuthGuard],
    component: DeportationCenterCreateComponent
  },
  {
    path: 'deportation-center-list',
    canActivate: [AuthGuard],
    component: DeportationCenterListComponent
  },
  {
    path: 'deportation-center-update/:deportation_center_id',
    canActivate: [AuthGuard],
    component: DeportationCenterEditComponent
  },
  {
    path: 'hospital-create',
    canActivate: [AuthGuard],
    component: HospitalCreateComponent
  },
  {
    path: 'hospital-list',
    canActivate: [AuthGuard],
    component: HospitalListComponent
  },
  {
    path: 'hospital-update/:hospital_id',
    canActivate: [AuthGuard],
    component: HospitalEditComponent
  },
  {
    path: 'jail-create',
    canActivate: [AuthGuard],
    component: JailCreateComponent
  },
  {
    path: 'jail-list',
    canActivate: [AuthGuard],
    component: JailListComponent
  },
  {
    path: 'jail-update/:jail_id',
    canActivate: [AuthGuard],
    component: JailEditComponent
  },
  {
    path: 'migrant-shelter-create',
    canActivate: [AuthGuard],
    component: MigrantShelterCreateComponent
  },
  {
    path: 'migrant-shelter-list',
    canActivate: [AuthGuard],
    component: MigrantShelterListComponent
  },
  {
    path: 'migrant-shelter-update/:migrant_shelter_id',
    canActivate: [AuthGuard],
    component: MigrantShelterEditComponent
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: LoginComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    LeftMenuComponent,
    FooterComponent,
    UserDashboardComponent,
    UserListComponent,
    UserCreateComponent,
    UserUpdateComponent,
    LogoutComponent,
    SignupFormComponent,
    CompanyCreateComponent,
    CompanyListComponent,
    CompanyEditComponent,
    CompanyUpdateComponent,
    CompanyDeleteComponent,
    ResidenceCreateComponent,
    ResidenceEditComponent,
    ResidenceListComponent,
    ResidenceDeleteComponent,
    DeportationCenterCreateComponent,
    DeportationCenterListComponent,
    DeportationCenterEditComponent,
    JailCreateComponent,
    JailListComponent,
    JailEditComponent,
    HospitalCreateComponent,
    HospitalListComponent,
    HospitalEditComponent,
    MigrantShelterCreateComponent,
    MigrantShelterListComponent,
    MigrantShelterEditComponent,
  ],
  imports: [
    SweetAlert2Module.forRoot(),
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    UserListService,
    LoginService,
    TosterService,
    AuthenticationService,
    AuthGuard,
    UserCreateService,
    UserUpdateService,
    LogoutService,
    SignupFormService,
    CompanyService,
    ResidenceService,
    DeportationCenterService,
    JailService,
    HospitalService,
    MigrantShelterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule)
