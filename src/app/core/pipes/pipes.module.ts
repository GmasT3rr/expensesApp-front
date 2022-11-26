import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthPipe } from './month-pipe.pipe';



@NgModule({
  declarations: [
    MonthPipe
  ],
  exports:[
    MonthPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
