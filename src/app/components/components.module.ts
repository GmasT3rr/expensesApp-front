import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { DonutChartComponent } from './donut-chart/donut-chart.component';
import { TableComponent } from './table/table.component';
import { ModalNewExpenseComponent } from './modal-new-expense/modal-new-expense.component';
import { ModalUpdateExpenseComponent } from './modal-update-expense/modal-update-expense.component';
import { ModalDeleteExpenseComponent } from './modal-delete-expense/modal-delete-expense.component';



@NgModule({
  declarations: [
    DonutChartComponent,
    TableComponent,
    ModalNewExpenseComponent,
    ModalUpdateExpenseComponent,
    ModalDeleteExpenseComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    DonutChartComponent,
    TableComponent,
    ModalNewExpenseComponent,
    ModalUpdateExpenseComponent,
    ModalDeleteExpenseComponent
  ]
})
export class ComponentsModule { }
