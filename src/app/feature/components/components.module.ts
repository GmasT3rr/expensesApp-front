import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterComponent } from './dummy/filter/filter.component';
import { HomeTableComponent } from './dummy/home-table/home-table.component';
import { HomeBtnsComponent } from './dummy/home-btns/home-btns.component';
import { MyExpensesBtnsComponent } from './dummy/my-expenses-btns/my-expenses-btns.component';
import { ModalDeleteExpenseComponent } from './modals/modal-delete-expense/modal-delete-expense.component';
import { ModalUpdateExpenseComponent } from './modals/modal-update-expense/modal-update-expense.component';
import { ModalNewExpenseComponent } from './modals/modal-new-expense/modal-new-expense.component';
import { TableComponent } from './table/table.component';
import { PipesModule } from 'src/app/core/pipes/pipes.module';
import { TableFiltersComponent } from './dummy/table-filters/table-filters.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';






@NgModule({
  declarations: [
    HomeTableComponent,
    FilterComponent,
    HomeBtnsComponent,
    MyExpensesBtnsComponent,
    ModalDeleteExpenseComponent,
    ModalUpdateExpenseComponent,
    ModalNewExpenseComponent,
    TableComponent,
    TableFiltersComponent,
    BarChartComponent,

  ],
  imports: [
    CommonModule,
    NgChartsModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ],
  exports:[
    FilterComponent,
    HomeTableComponent,
    HomeBtnsComponent,
    MyExpensesBtnsComponent,
    ModalDeleteExpenseComponent,
    ModalUpdateExpenseComponent,
    ModalNewExpenseComponent,
    TableComponent,
    BarChartComponent
  ]

})
export class ComponentsModule { }
