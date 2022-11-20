import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalDeleteExpenseComponent } from './modal-delete-expense/modal-delete-expense.component';
import { ModalNewExpenseComponent } from './modal-new-expense/modal-new-expense.component';
import { ModalUpdateExpenseComponent } from './modal-update-expense/modal-update-expense.component';








@NgModule({
  declarations: [
    ModalDeleteExpenseComponent,
    ModalNewExpenseComponent,
    ModalUpdateExpenseComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    ModalDeleteExpenseComponent,
    ModalNewExpenseComponent,
    ModalUpdateExpenseComponent
  ]

})
export class ModalsModule { }
