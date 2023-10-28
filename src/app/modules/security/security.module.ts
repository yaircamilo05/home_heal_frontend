import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityRoutingModule } from './security-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/interceptors/token.interceptor';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers:
  [

  ],
})
export class SecurityModule { }
