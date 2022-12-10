import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MyExpensesComponent } from './my-expenses/my-expenses.component';
import { SummaryComponent } from './summary/summary.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [

  {path:'my-expenses',component:MyExpensesComponent},
  {path:'summary',component:SummaryComponent},
  {path:'users',component:UsersComponent},


  {path:'**',redirectTo:'home',pathMatch:'full'}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
