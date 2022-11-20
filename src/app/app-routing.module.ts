import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAuthenticatedGuard } from './core/auth/guards/auth-guard.guard';
import { IsLoggedInGuard } from './core/auth/guards/is-logged-in.guard';

const routes: Routes = [

  {path:'auth',
  canActivate:[IsLoggedInGuard],
  loadChildren: () => import('./core/auth/auth-routing.module').then((m)=>m.AuthRoutingModule)
},
{path:'main',
canActivate:[isAuthenticatedGuard],
loadChildren: () => import('./feature/pages/pages-routing.module').then((m)=>m.PagesRoutingModule)
},

  {path:'**',redirectTo:'main',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
