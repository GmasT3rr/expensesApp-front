import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './table/table.component';








@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    TableComponent
  ]

})
export class TableModule { }
