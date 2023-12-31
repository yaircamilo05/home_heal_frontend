import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsiteRoutingModule } from './website-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SharedModule } from '../shared/shared.module';
import { InitComponent } from './pages/init/init.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientComponent } from './pages/patient/patient.component';
import { AppointmentComponent } from './pages/appointment/appointment.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatSliderModule } from '@angular/material/slider';
import { CalendarComponent } from '../shared/components/calendar/calendar.component';
import { DiagnosticsComponent } from './pages/diagnostics/diagnostics.component';



@NgModule({
  declarations: [
    HomeComponent,
    InitComponent,
    DashboardComponent,
    PatientComponent,
    AppointmentComponent,
    CalendarComponent,
    DiagnosticsComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    WebsiteRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSliderModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    FullCalendarModule,
    FormsModule
  ],
  exports: [
    HomeComponent,
    InitComponent,
    DashboardComponent,
    PatientComponent,
    AppointmentComponent,
    FormsModule
  ]
})
export class WebsiteModule { }
