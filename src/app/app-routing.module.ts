import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/security/security.module').then(module => module.SecurityModule)
  },
  {
    path: 'website',
    //canActivate:[AuthGuard],
    loadChildren: () => import('./modules/website/website.module').then(m => m.WebsiteModule),
    data:{
      preload:true,
    },
  },
  {
    path: 'admin',
    //canActivate:[AuthGuard],
    loadChildren: () => import('./modules/cms/cms.module').then(m => m.CmsModule),
    data:{
      preload:true,
    },
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
