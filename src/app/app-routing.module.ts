import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MyExpensesComponent } from './pages/my-expenses/my-expenses.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'my-expenses',component:MyExpensesComponent},

  {path:'**',redirectTo:'home',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
