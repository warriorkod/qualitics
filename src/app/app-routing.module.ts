import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsAdmin } from './guards/is_admin';
import { AppGuard } from './guards/is_authentificated';



export const routes: Routes = [
  {  
    path: '',
    redirectTo: '/sign_in',
    pathMatch: 'full'
  },
  {
    path: 'sign_in',
    loadChildren: () => import('./modules/auth/auth.module').then(mod => mod.AuthModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(mod => mod.HomeModule),
    canActivate: [AppGuard, IsAdmin],
  },
  {  
    path: '**',
    redirectTo: '/sign_in',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
