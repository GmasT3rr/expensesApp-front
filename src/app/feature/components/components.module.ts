import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterComponent } from './dummy/filter/filter.component';
import { MyExpensesBtnsComponent } from './dummy/my-expenses-btns/my-expenses-btns.component';

import { TableComponent } from './table/table.component';
import { PipesModule } from 'src/app/core/pipes/pipes.module';
import { TableFiltersComponent } from './dummy/table-filters/table-filters.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { ModalTableComponent } from './dummy/modal-table/modal-table.component';
import { ModalDeleteExpenseComponent } from './modals-expense/modal-delete-expense/modal-delete-expense.component';
import { ModalUpdateExpenseComponent } from './modals-expense/modal-update-expense/modal-update-expense.component';
import { ModalNewExpenseComponent } from './modals-expense/modal-new-expense/modal-new-expense.component';
import { ModalDeleteUserComponent } from './modals-user/modal-delete-user/modal-delete-user.component';
import { ModalUpdateUserComponent } from './modals-user/modal-update-user/modal-update-user.component';






@NgModule({
  declarations: [
    FilterComponent,
    MyExpensesBtnsComponent,
    ModalDeleteExpenseComponent,
    ModalUpdateExpenseComponent,
    ModalNewExpenseComponent,
    TableComponent,
    TableFiltersComponent,
    BarChartComponent,
    ModalTableComponent,
    ModalDeleteUserComponent,
    ModalUpdateUserComponent,

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
    MyExpensesBtnsComponent,
    ModalDeleteExpenseComponent,
    ModalUpdateExpenseComponent,
    ModalNewExpenseComponent,
    TableComponent,
    BarChartComponent,
    ModalDeleteUserComponent,
    ModalUpdateUserComponent,
  ]

})
export class ComponentsModule { }
