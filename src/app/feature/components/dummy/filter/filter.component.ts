import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Input() months:any = []
  @Input() currentMonth:any
  @Output() selectedMonth:any = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }

  selectMonth(month:any){
    this.selectedMonth.emit(month)
  }
}
