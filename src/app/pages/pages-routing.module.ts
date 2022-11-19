import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MyExpensesComponent } from './my-expenses/my-expenses.component';

const routes: Routes = [

  {path:'home',component:HomeComponent},
  {path:'my-expenses',component:MyExpensesComponent},

  {path:'**',redirectTo:'home',pathMatch:'full'}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
