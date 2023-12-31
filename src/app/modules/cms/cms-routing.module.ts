import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { RolComponent } from './pages/rol/rol.component';
import { InitComponent } from './pages/init/init.component';
import { MenuComponent } from './pages/menu/menu.component';
import { UserComponent } from './pages/user/user.component';
import { MenuRolesComponent } from './pages/menu-roles/menu-roles.component';
import { TestSocketComponent } from './pages/test-socket/test-socket.component';
import { RequierementsComponent } from './pages/requierements/requierements.component';


const routes: Routes = [
  {
    path: '',
    component: HomeAdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'init-admin',
        pathMatch: 'full'
      },
      {
        path: 'init-admin',
        component: InitComponent
      },
      {
        path: 'roles',
        component: RolComponent
      },
      {
        path: 'menus',
        component: MenuComponent
      },
      {
        path: 'users',
        component: UserComponent
      },
      {
        path: 'menusroles',
        component: MenuRolesComponent
      },
      {
        path: 'requirements',
        component: RequierementsComponent
      },
      {
        path: 'skt',
        component: TestSocketComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsRoutingModule { }
