import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginGuard } from 'src/app/guards/login.guard.ts.guard';
import { NotFoundComponent } from '../shared/pages/not-found/not-found.component';

const routes: Routes = [
  {
    path:'',
    component: LayoutComponent,
    pathMatch: 'full',
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        canActivate: [LoginGuard],
        path:'login',
        component: LoginComponent
      },
      {
        path: 'register',  // Agrega la nueva ruta para tu componente de registro
        component: RegisterComponent
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
