import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginGuard } from 'src/app/guards/login.guard.ts.guard';
import { NotFoundComponent } from '../shared/pages/not-found/not-found.component';
import { RecoveryPasswordComponent } from './pages/recovery-password/recovery-password.component';
import { SendEmailComponent } from '../shared/pages/send-email/send-email.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';

const routes: Routes = [
  {
    path:'',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {

        path:'login',
        canActivate: [LoginGuard],
        component: LoginComponent
      },
      {

        path:'recovery-password',
        component: RecoveryPasswordComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path:'send-email',
        component:SendEmailComponent
      },
      {
        path:'change-password',
        component: ChangePasswordComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
