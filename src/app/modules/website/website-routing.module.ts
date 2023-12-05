import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InitComponent } from './pages/init/init.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PatientComponent } from './pages/patient/patient.component';
import { AppointmentComponent } from './pages/appointment/appointment.component';



const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'init',
        pathMatch: 'full'
      },
      {
        path: 'dashboard/:patient_id',
        component: DashboardComponent
      },
      {
        path:'init',
        component: InitComponent
      },
      {
        path: 'mypatients',
        component: PatientComponent
      },
      {
        path: 'myappointments',
        component: AppointmentComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
