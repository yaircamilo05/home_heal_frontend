import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsRoutingModule } from './cms-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { RolComponent } from './pages/rol/rol.component';
import { InitComponent } from './pages/init/init.component';
import { SharedModule } from '../shared/shared.module';
import { MenuComponent } from './pages/menu/menu.component';



@NgModule({
  declarations: [
    HomeAdminComponent,
    RolComponent,
    InitComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CmsRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers:
  [

  ],
})
export class CmsModule { }
