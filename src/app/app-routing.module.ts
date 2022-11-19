import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAuthenticatedGuard } from './auth/guards/auth-guard.guard';
import { IsLoggedInGuard } from './auth/guards/is-logged-in.guard';

const routes: Routes = [

  {path:'auth',
  canActivate:[IsLoggedInGuard],
  loadChildren: () => import('./auth/auth-routing.module').then((m)=>m.AuthRoutingModule)
},
{path:'main',
canActivate:[isAuthenticatedGuard],
loadChildren: () => import('./pages/pages-routing.module').then((m)=>m.PagesRoutingModule)
},

  {path:'**',redirectTo:'main',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
