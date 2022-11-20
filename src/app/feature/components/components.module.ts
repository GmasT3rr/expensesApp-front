import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterComponent } from './dummy/filter/filter.component';
import { HomeTableComponent } from './dummy/home-table/home-table.component';






@NgModule({
  declarations: [
    HomeTableComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    FilterComponent,
    HomeTableComponent
  ]

})
export class ComponentsModule { }
