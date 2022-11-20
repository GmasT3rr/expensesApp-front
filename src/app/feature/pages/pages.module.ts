import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MyExpensesComponent } from './my-expenses/my-expenses.component';
import { ComponentsModule } from '../components/components.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { PagesRoutingModule } from './pages-routing.module';
import { ModalsModule } from '../modals/modals.module';
import { ChartsModule } from '../charts/charts.module';
import { TableModule } from '../table-info/table.module';



@NgModule({
  declarations: [
    HomeComponent,
    MyExpensesComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    RouterModule,
    ComponentsModule,
    SharedModule,
    ModalsModule,
    ChartsModule,
    TableModule
  ]
})
export class PagesModule { }