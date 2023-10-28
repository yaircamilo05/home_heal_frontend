import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAdminComponent } from '../cms/pages/home-admin/home-admin.component';
import { HomeComponent } from './pages/home/home.component';
import { InitComponent } from './pages/init/init.component';

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
        path:'init',
        component: InitComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
