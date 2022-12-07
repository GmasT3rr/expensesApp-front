import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MyExpensesComponent } from './my-expenses/my-expenses.component';
import { ComponentsModule } from '../components/components.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { PagesRoutingModule } from './pages-routing.module';
import { ChartsModule } from '../charts/charts.module';
import { SummaryComponent } from './summary/summary.component';
import { CardsComponent } from './summary/components/cards/cards.component';
import { CardsInfoComponent } from './summary/components/dummy/cards-info/cards-info.component';



@NgModule({
  declarations: [
    HomeComponent,
    MyExpensesComponent,
    SummaryComponent,
    CardsComponent,
    CardsInfoComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    RouterModule,
    ComponentsModule,
    SharedModule,
    ChartsModule
  ]
})
export class PagesModule { }
