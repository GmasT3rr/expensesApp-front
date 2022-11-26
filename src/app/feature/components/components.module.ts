import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterComponent } from './dummy/filter/filter.component';
import { HomeTableComponent } from './dummy/home-table/home-table.component';
import { HomeBtnsComponent } from './dummy/home-btns/home-btns.component';






@NgModule({
  declarations: [
    HomeTableComponent,
    FilterComponent,
    HomeBtnsComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    FilterComponent,
    HomeTableComponent,
    HomeBtnsComponent
  ]

})
export class ComponentsModule { }
