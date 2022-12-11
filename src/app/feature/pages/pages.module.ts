import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyExpensesComponent } from './my-expenses/my-expenses.component';
import { ComponentsModule } from '../components/components.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { PagesRoutingModule } from './pages-routing.module';
import { SummaryComponent } from './summary/summary.component';
import { CardsComponent } from './summary/components/cards/cards.component';
import { CardsInfoComponent } from './summary/components/cards-info/cards-info.component';
import { UsersComponent } from './users/users.component';
import { UserCardsComponent } from './users/components/user-cards/user-cards.component';
import { UserCardsInfoComponent } from './users/components/user-cards-info/user-cards-info.component';
import { CurrentUserCardComponent } from './users/components/current-user-card/current-user-card.component';



@NgModule({
  declarations: [
    MyExpensesComponent,
    SummaryComponent,
    CardsComponent,
    CardsInfoComponent,
    UsersComponent,
    UserCardsComponent,
    UserCardsInfoComponent,
    CurrentUserCardComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    RouterModule,
    ComponentsModule,
    SharedModule,
  ]
})
export class PagesModule { }
