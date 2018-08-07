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
    SignupFormComponent
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
    SignupFormService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule)
