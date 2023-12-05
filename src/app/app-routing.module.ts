import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from './guards/auth.guard.ts.guard'
import { AdminGuard } from './guards/admin.guard.ts.guard'
import { NotFoundComponent } from './modules/shared/pages/not-found/not-found.component'

const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./modules/security/security.module').then(module => module.SecurityModule)
  },
  {
    path: 'website',
    //canActivate:[AuthGuard],
    loadChildren: () => import('./modules/website/website.module').then(m => m.WebsiteModule),
    data: {
      preload: true,
    },
  },
  {
    path: 'admin',
    //canActivate:[AuthGuard,AdminGuard],
    loadChildren: () => import('./modules/cms/cms.module').then(m => m.CmsModule),
    data: {
      preload: true,
    },
  },
  {
    path: '**',
    component: NotFoundComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
