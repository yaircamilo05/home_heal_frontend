import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { RolComponent } from './pages/rol/rol.component';
import { InitComponent } from './pages/init/init.component';
import { MenuComponent } from './pages/menu/menu.component';

const routes: Routes = [
  {
    path:'',
    component:HomeAdminComponent,
    children:[
      {
        path:'',
        redirectTo:'init',
        pathMatch:'full'
      },
      {
        path:'init',
        component:InitComponent
      },
      {
        path:'roles',
        component:RolComponent
      },
      {
        path: 'menus',
        component: MenuComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsRoutingModule { }
