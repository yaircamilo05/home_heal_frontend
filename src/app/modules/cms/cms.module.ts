import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsRoutingModule } from './cms-routing.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';

import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { RolComponent } from './pages/rol/rol.component';
import { InitComponent } from './pages/init/init.component';
import { SharedModule } from '../shared/shared.module';
import { MenuComponent } from './pages/menu/menu.component';
import { UserComponent } from './pages/user/user.component';
import { MenuRolesComponent } from './pages/menu-roles/menu-roles.component';
import { TestSocketComponent } from './pages/test-socket/test-socket.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomeAdminComponent,
    RolComponent,
    InitComponent,
    MenuComponent,
    UserComponent,
    MenuRolesComponent,
    TestSocketComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CmsRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers:
    [

    ],
})
export class CmsModule { }
