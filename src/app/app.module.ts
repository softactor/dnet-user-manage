import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpModule} from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; // this includes the core NgIdleModule;
import { MomentModule } from 'angular2-moment'; // optional, provides moment-style pipes for date formatting
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
import { MarketAssessmentCreateComponent } from './activities/market-assessment/market-assessment-create.component';
import { MarketAssessmentService } from './activities/market-assessment/market-assessment.service';
import { MarketAssessmentListComponent } from './activities/market-assessment/market-assessment-list.component';
import { MarketAssessmentUpdateComponent } from './activities/market-assessment/market-assessment-update.component';
import { EmployeeEnhancementListComponent } from './activities/employee-enhancement/employee-enhancement-list.component';
import { EmployeeEnhancementService } from './activities/employee-enhancement/employee-enhancement.service';
import { EmployeeEnhancementCreateComponent} from './activities/employee-enhancement/employee-enhancement-create.component';
import { EmployeeEnhancementUpdateComponent } from './activities/employee-enhancement/employee-enhancement-update.component';
import { OtherActivityCreateComponent } from './activities/other-activity/other-activity-create.component';
import { OtherActivityService } from './activities/other-activity/other-activity.service';
import { OtherActivityListComponent } from './activities/other-activity/other-activity-list.component';
import { OtherActivityUpdateComponent } from './activities/other-activity/other-activity-update.component';
import { WorkPlanCreateComponent } from './activities/work-plan/work-plan-create.component';
import { WorkPlanService } from './activities/work-plan/work-plan.service';
import { WorkPlanListComponent  } from './activities/work-plan/work-plan-list.component';
import { WorkPlanUpdateComponent } from './activities/work-plan/work-plan-update.component';
import { AttestationListComponent } from './activities/attestation/attestation-list.component';
import { AttestationCreateComponent } from './activities/attestation/attestation-create.component';
import { AttestationUpdateComponent } from './activities/attestation/attestation-update.component';
import { AttestationService } from './activities/attestation/attestation.service';
import { GuestEntertainmentCreateComponent } from './activities/guest-entertainment/guest-entertainment-create.component';
import { GuestEntertainmentService } from './activities/guest-entertainment/guest-entertainment.service';
import { GuestEntertainmentListComponent } from './activities/guest-entertainment/guest-entertainment-list.component';
import { GuestEntertainmentUpdateComponent } from './activities/guest-entertainment/guest-entertainment-update.component';
import { LiaisonWithExpatriatesCreateComponent } from './activities/liaison-with-expatriates/liaison-with-expatriates-create.component';
import { LiaisonWithExpatriatesService } from './activities/liaison-with-expatriates/liaison-with-expatriates.service';
import { LiaisonWithExpatriatesListComponent } from './activities/liaison-with-expatriates/liaison-with-expatriates-list.component';
import { LiaisonWithExpatriatesUpdateComponent } from './activities/liaison-with-expatriates/liaison-with-expatriates-update.component';
import { GeneralAssistanceService } from './assistance-provide/general-assistance/general-assistance.service';
import { GeneralAssistanceCreateComponent } from './assistance-provide/general-assistance/general-assistance-create.component';
import { GeneralAssistanceListComponent } from './assistance-provide/general-assistance/general-assistance-list.component';
import { GeneralAssistanceUpdateComponent  } from './assistance-provide/general-assistance/general-assistance-update.component';
import { LegalAssistanceService } from './assistance-provide/legal-assistance/legal-assistance.service';
import { LegalAssistanceCreateComponent } from './assistance-provide/legal-assistance/legal-assistance-create.component';
import { LegalAssistanceListComponent } from './assistance-provide/legal-assistance/legal-assistance-list.component';
import { LegalAssistanceUpdateComponent } from './assistance-provide/legal-assistance/legal-assistance-update.component';
import { QueryReceivedService } from './query-complain/query-received/query-received.service';
import { QueryReceivedListComponent } from './query-complain/query-received/query-received-list.component';
import { QueryReceivedCreateComponent } from './query-complain/query-received/query-received-create.component';
import { QueryReceivedUpdateComponent } from './query-complain/query-received/query-received-update.component';
import { ComplaintService } from './query-complain/complaint/complaint.service';
import { ComplaintCreateComponent } from './query-complain/complaint/complaint-create.component';
import { ComplaintListComponent } from './query-complain/complaint/complaint-list.component';
import { ComplaintUpdateComponent } from './query-complain/complaint/complaint-update.component';
import { TradeQueryService } from './query-complain/trade-query/trade-query.service';
import { TradeQueryCreateComponent } from './query-complain/trade-query/trade-query-create.component';
import { TradeQueryListComponent } from './query-complain/trade-query/trade-query-list.component';
import { TradeQueryUpdateComponent } from './query-complain/trade-query/trade-query-update.component';
import {MeetingService} from './issues/meeting/meeting.service';
import {MeetingCreateComponent} from './issues/meeting/meeting-create.component';
import {MeetingListComponent} from './issues/meeting/meeting-list.component';
import {MeetingUpdateComponent} from './issues/meeting/meeting-update.component';
import {ConferenceService} from './issues/conference/conference.service';
import {ConferenceCreateComponent} from './issues/conference/conference-create.component';
import {ConferenceListComponent} from './issues/conference/conference-list.component';
import {ConferenceUpdateComponent} from './issues/conference/conference-update.component';
import {ArbitrationDisputesService} from './resolved/arbitration-disputes/arbitration-disputes.service';
import {ArbitrationDisputesCreateComponent} from './resolved/arbitration-disputes/arbitration-disputes-create.component';
import {ArbitrationDisputesListComponent} from './resolved/arbitration-disputes/arbitration-disputes-list.component';
import {ArbitrationDisputesUpdateComponent} from './resolved/arbitration-disputes/arbitration-disputes-update.component';
import {ArrearpayService} from './resolved/arrearpay/arrearpay.service';
import {ArrearpayCreateComponent} from './resolved/arrearpay/arrearpay-create.component';
import {ArrearpayListComponent} from './resolved/arrearpay/arrearpay-list.component';
import {ArrearpayUpdateComponent} from './resolved/arrearpay/arrearpay-update.component';
import {CompensationService} from './resolved/compensation/compensation.service';
import {CompensationCreateComponent} from './resolved/compensation/compensation-create.component';
import {CompensationListComponent} from './resolved/compensation/compensation-list.component';
import {CompensationUpdateComponent} from './resolved/compensation/compensation-update.component';
import {DeadbodyRepatriationService} from './resolved/deadbody-repatriation/deadbody-repatriation.service';
import {DeadbodyRepatriationCreateComponent} from './resolved/deadbody-repatriation/deadbody-repatriation-create.component';
import {DeadbodyRepatriationListComponent} from './resolved/deadbody-repatriation/deadbody-repatriation-list.component';
import {DeadbodyRepatriationUpdateComponent} from './resolved/deadbody-repatriation/deadbody-repatriation-update.component';
import {DeathDisabilityService} from './resolved/death-disability/death-disability.service';
import {DeathDisabilityCreateComponent} from './resolved/death-disability/death-disability-create.component';
import {DeathDisabilityListComponent} from './resolved/death-disability/death-disability-list.component';
import {DeathDisabilityUpdateComponent} from './resolved/death-disability/death-disability-update.component';
import {MonthlyProblemResolvedService} from './resolved/monthly-problem-resolved/monthly-problem-resolved.service';
import {MonthlyProblemResolvedCreateComponent} from './resolved/monthly-problem-resolved/monthly-problem-resolved-create.component';
import {MonthlyProblemResolvedListComponent} from './resolved/monthly-problem-resolved/monthly-problem-resolved-list.component';
import {MonthlyProblemResolvedUpdateComponent} from './resolved/monthly-problem-resolved/monthly-problem-resolved-update.component';
import {RemitFcService} from './resolved/remit-fc/remit-fc.service';
import {RemitFcCreateComponent} from './resolved/remit-fc/remit-fc-create.component';
import {RemitFcListComponent} from './resolved/remit-fc/remit-fc-list.component';
import {RemitFcUpdateComponent} from './resolved/remit-fc/remit-fc-update.component';
import {TermsConditionServiceService} from './resolved/terms-condition-service/terms-condition-service.service';
import {TermsConditionServiceCreateComponent} from './resolved/terms-condition-service/terms-condition-service-create.component';
import {TermsConditionServiceListComponent} from './resolved/terms-condition-service/terms-condition-service-list.component';
import {TermsConditionServiceUpdateComponent} from './resolved/terms-condition-service/terms-condition-service-update.component';
import {BudgetService} from './finance/budget/budget.service';
import {BudgetCreateComponent} from './finance/budget/budget-create.component';
import {BudgetListComponent} from './finance/budget/budget-list.component';
import {BudgetUpdateComponent} from './finance/budget/budget-update.component';
import {RemittanceWelfareFundService} from './finance/remittance-welfare-fund/remittance-welfare-fund.service';
import {RemittanceWelfareFundCreateComponent} from './finance/remittance-welfare-fund/remittance-welfare-fund-create.component';
import {RemittanceWelfareFundListComponent} from './finance/remittance-welfare-fund/remittance-welfare-fund-list.component';
import {RemittanceWelfareFundUpdateComponent} from './finance/remittance-welfare-fund/remittance-welfare-fund-update.component';
import { MonthWiseViewService } from './month-wise-view/month-wise-view.service';
import {MonthWiseViewComponent} from './month-wise-view/month-wise-view.component';
import { GoogleChartComponent } from './google-chart/google-chart.component';
import { ApiProcessService } from './api-process.service';
import { LeftMenuService } from './layout/left-menu/left-menu.service';
import { ChartsModule } from 'ng2-charts';
import { VisitReportsComponent } from './reports/visit/visit-reports.component';
import { VisualizationReportComponent } from './reports/visualizations/report.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';
// import { CompatibilityModule } from '@angular/material';
// import {NoConflictStyleCompatibilityMode} from '@angular/material';
import { MatDateFormats, MAT_DATE_FORMATS, NativeDateAdapter, DateAdapter } from '@angular/material';

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
    path: 'company-create/:create_param',
    canActivate: [AuthGuard],
    component: CompanyCreateComponent
  },
  {
    path: 'company-list/:list_param',
    canActivate: [AuthGuard],
    component: CompanyListComponent
  },
  {
    path: 'company-update/:company_id',
    canActivate: [AuthGuard],
    component: CompanyEditComponent
  },
  {
    path: 'residence-list/:list_param',
    canActivate: [AuthGuard],
    component: ResidenceListComponent
  },
  {
    path: 'residence-create/:create_param',
    canActivate: [AuthGuard],
    component: ResidenceCreateComponent
  },
  {
    path: 'residence-update/:residence_id',
    canActivate: [AuthGuard],
    component: ResidenceEditComponent
  },
  {
    path: 'deportation-center-create/:create_param',
    canActivate: [AuthGuard],
    component: DeportationCenterCreateComponent
  },
  {
    path: 'deportation-center-list/:list_param',
    canActivate: [AuthGuard],
    component: DeportationCenterListComponent
  },
  {
    path: 'deportation-center-update/:deportation_center_id',
    canActivate: [AuthGuard],
    component: DeportationCenterEditComponent
  },
  {
    path: 'hospital-create/:create_param',
    canActivate: [AuthGuard],
    component: HospitalCreateComponent
  },
  {
    path: 'hospital-list/:list_param',
    canActivate: [AuthGuard],
    component: HospitalListComponent
  },
  {
    path: 'hospital-update/:hospital_id',
    canActivate: [AuthGuard],
    component: HospitalEditComponent
  },
  {
    path: 'jail-create/:create_param',
    canActivate: [AuthGuard],
    component: JailCreateComponent
  },
  {
    path: 'jail-list/:list_param',
    canActivate: [AuthGuard],
    component: JailListComponent
  },
  {
    path: 'jail-update/:jail_id',
    canActivate: [AuthGuard],
    component: JailEditComponent
  },
  {
    path: 'migrant-shelter-create/:create_param',
    canActivate: [AuthGuard],
    component: MigrantShelterCreateComponent
  },
  {
    path: 'migrant-shelter-list/:list_param',
    canActivate: [AuthGuard],
    component: MigrantShelterListComponent
  },
  {
    path: 'migrant-shelter-update/:migrant_shelter_id',
    canActivate: [AuthGuard],
    component: MigrantShelterEditComponent
  },
  {
    path: 'market-assessment-create',
    canActivate: [AuthGuard],
    component: MarketAssessmentCreateComponent
  },
  {
    path: 'market-assessment-list',
    canActivate: [AuthGuard],
    component: MarketAssessmentListComponent
  },
  {
    path: 'market-assessment-update/:market_assessment_id',
    canActivate: [AuthGuard],
    component: MarketAssessmentUpdateComponent
  },
  {
    path: 'employee-enhancement-list',
    canActivate: [AuthGuard],
    component: EmployeeEnhancementListComponent
  },
  {
    path: 'employee-enhancement-create',
    canActivate: [AuthGuard],
    component: EmployeeEnhancementCreateComponent
  },
  {
    path: 'employee-enhancement-update/:employee_enhancement_id',
    canActivate: [AuthGuard],
    component: EmployeeEnhancementUpdateComponent
  },
  {
    path: 'other-activity-list/:list_param',
    canActivate: [AuthGuard],
    component: OtherActivityListComponent
  },
  {
    path: 'other-activity-create/:create_param',
    canActivate: [AuthGuard],
    component: OtherActivityCreateComponent
  },
  {
    path: 'other-activity-update/:other_activity_id',
    canActivate: [AuthGuard],
    component: OtherActivityUpdateComponent
  },
  {
    path: 'work-plan-list/:list_param',
    canActivate: [AuthGuard],
    component: WorkPlanListComponent
  },
  {
    path: 'work-plan-create/:create_param',
    canActivate: [AuthGuard],
    component: WorkPlanCreateComponent
  },
  {
    path: 'work-plan-update/:work_plan_id',
    canActivate: [AuthGuard],
    component: WorkPlanUpdateComponent
  },
  {
    path: 'attestation-list/:list_param',
    canActivate: [AuthGuard],
    component: AttestationListComponent
  },
  {
    path: 'attestation-create/:create_param',
    canActivate: [AuthGuard],
    component: AttestationCreateComponent
  },
  {
    path: 'attestation-update/:attestation_id',
    canActivate: [AuthGuard],
    component: AttestationUpdateComponent
  },
  {
    path: 'guest-entertainment-list/:list_param',
    canActivate: [AuthGuard],
    component: GuestEntertainmentListComponent
  },
  {
    path: 'guest-entertainment-create/:create_param',
    canActivate: [AuthGuard],
    component: GuestEntertainmentCreateComponent
  },
  {
    path: 'guest-entertainment-update/:guest_entertainment_id',
    canActivate: [AuthGuard],
    component: GuestEntertainmentUpdateComponent
  },
  {
    path: 'liaison-with-expatriates-list/:list_param',
    canActivate: [AuthGuard],
    component: LiaisonWithExpatriatesListComponent
  },
  {
    path: 'liaison-with-expatriates-create/:create_param',
    canActivate: [AuthGuard],
    component: LiaisonWithExpatriatesCreateComponent
  },
  {
    path: 'liaison-with-expatriates-update/:liaison_with_expatriates_id',
    canActivate: [AuthGuard],
    component: LiaisonWithExpatriatesUpdateComponent
  },
  {
    path: 'general-assistance-list/:list_param',
    canActivate: [AuthGuard],
    component: GeneralAssistanceListComponent
  },
  {
    path: 'general-assistance-create/:create_param',
    canActivate: [AuthGuard],
    component: GeneralAssistanceCreateComponent
  },
  {
    path: 'general-assistance-update/:general_assistance_id',
    canActivate: [AuthGuard],
    component: GeneralAssistanceUpdateComponent
  },
  {
    path: 'legal-assistance-list/:list_param',
    canActivate: [AuthGuard],
    component: LegalAssistanceListComponent
  },
  {
    path: 'legal-assistance-create/:create_param',
    canActivate: [AuthGuard],
    component: LegalAssistanceCreateComponent
  },
  {
    path: 'legal-assistance-update/:legal_assistance_id',
    canActivate: [AuthGuard],
    component: LegalAssistanceUpdateComponent
  },
  {
    path: 'query-received-list/:list_param',
    canActivate: [AuthGuard],
    component: QueryReceivedListComponent
  },
  {
    path: 'query-received-create/:create_param',
    canActivate: [AuthGuard],
    component: QueryReceivedCreateComponent
  },
  {
    path: 'query-received-update/:query_received_id',
    canActivate: [AuthGuard],
    component: QueryReceivedUpdateComponent
  },
  {
    path: 'complaint-list/:list_param',
    canActivate: [AuthGuard],
    component: ComplaintListComponent
  },
  {
    path: 'complaint-create/:create_param',
    canActivate: [AuthGuard],
    component: ComplaintCreateComponent
  },
  {
    path: 'complaint-update/:complaint_id',
    canActivate: [AuthGuard],
    component: ComplaintUpdateComponent
  },
  {
    path: 'trade-query-list/:list_param',
    canActivate: [AuthGuard],
    component: TradeQueryListComponent
  },
  {
    path: 'trade-query-create/:create_param',
    canActivate: [AuthGuard],
    component: TradeQueryCreateComponent
  },
  {
    path: 'trade-query-update/:trade_query_id',
    canActivate: [AuthGuard],
    component: TradeQueryUpdateComponent
  },
  {
    path: 'meeting-list/:list_param',
    canActivate: [AuthGuard],
    component: MeetingListComponent
  },
  {
    path: 'meeting-create/:create_param',
    canActivate: [AuthGuard],
    component: MeetingCreateComponent
  },
  {
    path: 'meeting-update/:meeting_id',
    canActivate: [AuthGuard],
    component: MeetingUpdateComponent
  },
  {
    path: 'conference-list/:list_param',
    canActivate: [AuthGuard],
    component: ConferenceListComponent
  },
  {
    path: 'conference-create/:create_param',
    canActivate: [AuthGuard],
    component: ConferenceCreateComponent
  },
  {
    path: 'conference-update/:conference_id',
    canActivate: [AuthGuard],
    component: ConferenceUpdateComponent
  },
  {
    path: 'arbitration-disputes-list',
    canActivate: [AuthGuard],
    component: ArbitrationDisputesListComponent
  },
  {
    path: 'arbitration-disputes-create',
    canActivate: [AuthGuard],
    component: ArbitrationDisputesCreateComponent
  },
  {
    path: 'arbitration-disputes-update/:arbitration_disputes_id',
    canActivate: [AuthGuard],
    component: ArbitrationDisputesUpdateComponent
  },
  {
    path: 'arrearpay-list',
    canActivate: [AuthGuard],
    component: ArrearpayListComponent
  },
  {
    path: 'arrearpay-create',
    canActivate: [AuthGuard],
    component: ArrearpayCreateComponent
  },
  {
    path: 'arrearpay-update/:arrearpay_id',
    canActivate: [AuthGuard],
    component: ArrearpayUpdateComponent
  },
  {
    path: 'compensation-list',
    canActivate: [AuthGuard],
    component: CompensationListComponent
  },
  {
    path: 'compensation-create',
    canActivate: [AuthGuard],
    component: CompensationCreateComponent
  },
  {
    path: 'compensation-update/:compensation_id',
    canActivate: [AuthGuard],
    component: CompensationUpdateComponent
  },
  {
    path: 'deadbody-repatriation-list',
    canActivate: [AuthGuard],
    component: DeadbodyRepatriationListComponent
  },
  {
    path: 'deadbody-repatriation-create',
    canActivate: [AuthGuard],
    component: DeadbodyRepatriationCreateComponent
  },
  {
    path: 'deadbody-repatriation-update/:deadbody_repatriation_id',
    canActivate: [AuthGuard],
    component: DeadbodyRepatriationUpdateComponent
  },
  {
    path: 'death-disability-list',
    canActivate: [AuthGuard],
    component: DeathDisabilityListComponent
  },
  {
    path: 'death-disability-create',
    canActivate: [AuthGuard],
    component: DeathDisabilityCreateComponent
  },
  {
    path: 'death-disability-update/:death_disability_id',
    canActivate: [AuthGuard],
    component: DeathDisabilityUpdateComponent
  },
  {
    path: 'monthly-problem-resolved-list',
    canActivate: [AuthGuard],
    component: MonthlyProblemResolvedListComponent
  },
  {
    path: 'monthly-problem-resolved-create',
    canActivate: [AuthGuard],
    component: MonthlyProblemResolvedCreateComponent
  },
  {
    path: 'monthly-problem-resolved-update/:monthly_problem_resolved_id',
    canActivate: [AuthGuard],
    component: MonthlyProblemResolvedUpdateComponent
  },
  {
    path: 'remit-fc-list',
    canActivate: [AuthGuard],
    component: RemitFcListComponent
  },
  {
    path: 'remit-fc-create',
    canActivate: [AuthGuard],
    component: RemitFcCreateComponent
  },
  {
    path: 'remit-fc-update/:remit_fc_id',
    canActivate: [AuthGuard],
    component: RemitFcUpdateComponent
  },
  {
    path: 'terms-condition-list',
    canActivate: [AuthGuard],
    component: TermsConditionServiceListComponent
  },
  {
    path: 'terms-condition-create',
    canActivate: [AuthGuard],
    component: TermsConditionServiceCreateComponent
  },
  {
    path: 'terms-condition-update/:terms_condition_id',
    canActivate: [AuthGuard],
    component: TermsConditionServiceUpdateComponent
  },
  {
    path: 'budget-list/:list_param',
    canActivate: [AuthGuard],
    component: BudgetListComponent
  },
  {
    path: 'budget-create/:create_param',
    canActivate: [AuthGuard],
    component: BudgetCreateComponent
  },
  {
    path: 'budget-update/:budget_id',
    canActivate: [AuthGuard],
    component: BudgetUpdateComponent
  },
  {
    path: 'remittance-welfare-fund-list/:list_param',
    canActivate: [AuthGuard],
    component: RemittanceWelfareFundListComponent
  },
  {
    path: 'remittance-welfare-fund-create/:create_param',
    canActivate: [AuthGuard],
    component: RemittanceWelfareFundCreateComponent
  },
  {
    path: 'remittance-welfare-fund-update/:remittance_welfare_fund_id',
    canActivate: [AuthGuard],
    component: RemittanceWelfareFundUpdateComponent
  },
  {
    path: 'month-wise-view',
    canActivate: [AuthGuard],
    component: MonthWiseViewComponent
  },
  {
    path: 'visit-reports',
    canActivate: [AuthGuard],
    component: VisitReportsComponent
  },
  {
    path:'reports',
    canActivate:[AuthGuard],
    component:VisualizationReportComponent,
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: LoginComponent },
];

const MY_DATE_FORMATS = {
    parse: {
        dateInput: { day: 'numeric', month: 'numeric', year: 'numeric' }
    },
    display: {
        dateInput: 'input',
        monthYearLabel: { year: 'numeric', month: 'short' },
        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
        monthYearA11yLabel: { year: 'numeric', month: 'long' },
    }
 };


// arbitration-disputes
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
    MarketAssessmentCreateComponent,
    MarketAssessmentListComponent,
    MarketAssessmentUpdateComponent,
    EmployeeEnhancementListComponent,
    EmployeeEnhancementCreateComponent,
    EmployeeEnhancementUpdateComponent,
    OtherActivityCreateComponent,
    OtherActivityListComponent,
    OtherActivityUpdateComponent,
    WorkPlanCreateComponent,
    WorkPlanListComponent,
    WorkPlanUpdateComponent,
    AttestationListComponent,
    AttestationCreateComponent,
    AttestationUpdateComponent,
    GuestEntertainmentCreateComponent,
    GuestEntertainmentListComponent,
    GuestEntertainmentUpdateComponent,
    LiaisonWithExpatriatesCreateComponent,
    LiaisonWithExpatriatesListComponent,
    LiaisonWithExpatriatesUpdateComponent,
    GeneralAssistanceCreateComponent,
    GeneralAssistanceListComponent,
    GeneralAssistanceUpdateComponent,
    LegalAssistanceCreateComponent,
    LegalAssistanceListComponent,
    LegalAssistanceUpdateComponent,
    QueryReceivedListComponent,
    QueryReceivedCreateComponent,
    QueryReceivedUpdateComponent,
    ComplaintCreateComponent,
    ComplaintListComponent,
    ComplaintUpdateComponent,
    TradeQueryCreateComponent,
    TradeQueryListComponent,
    TradeQueryUpdateComponent,
    MeetingCreateComponent,
    MeetingListComponent,
    MeetingUpdateComponent,
    ConferenceCreateComponent,
    ConferenceListComponent,
    ConferenceUpdateComponent,
    ArbitrationDisputesCreateComponent,
    ArbitrationDisputesListComponent,
    ArbitrationDisputesUpdateComponent,
    ArrearpayCreateComponent,
    ArrearpayListComponent,
    ArrearpayUpdateComponent,
    CompensationCreateComponent,
    CompensationListComponent,
    CompensationUpdateComponent,
    DeadbodyRepatriationCreateComponent,
    DeadbodyRepatriationListComponent,
    DeadbodyRepatriationUpdateComponent,
    DeathDisabilityCreateComponent,
    DeathDisabilityListComponent,
    DeathDisabilityUpdateComponent,
    MonthlyProblemResolvedCreateComponent,
    MonthlyProblemResolvedListComponent,
    MonthlyProblemResolvedUpdateComponent,
    RemitFcCreateComponent,
    RemitFcListComponent,
    RemitFcUpdateComponent,
    TermsConditionServiceCreateComponent,
    TermsConditionServiceListComponent,
    TermsConditionServiceUpdateComponent,
    BudgetCreateComponent,
    BudgetListComponent,
    BudgetUpdateComponent,
    RemittanceWelfareFundCreateComponent,
    RemittanceWelfareFundListComponent,
    RemittanceWelfareFundUpdateComponent,
    MonthWiseViewComponent,
    GoogleChartComponent,
    VisitReportsComponent,
    VisualizationReportComponent,

  ],
  imports: [
    SweetAlert2Module.forRoot(),
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MomentModule,
    NgIdleKeepaliveModule.forRoot(),
    ChartsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    //CompatibilityModule,
    //NoConflictStyleCompatibilityMode
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
    MigrantShelterService,
    MarketAssessmentService,
    EmployeeEnhancementService,
    OtherActivityService,
    WorkPlanService,
    AttestationService,
    GuestEntertainmentService,
    LiaisonWithExpatriatesService,
    GeneralAssistanceService,
    LegalAssistanceService,
    QueryReceivedService,
    ComplaintService,
    TradeQueryService,
    MeetingService,
    ConferenceService,
    ArbitrationDisputesService,
    ArrearpayService,
    CompensationService,
    DeadbodyRepatriationService,
    DeathDisabilityService,
    MonthlyProblemResolvedService,
    RemitFcService,
    TermsConditionServiceService,
    BudgetService,
    RemittanceWelfareFundService,
    MonthWiseViewService,
    ApiProcessService,
    LeftMenuComponent,
    LeftMenuService,
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule)
