import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table-filters',
  templateUrl: './table-filters.component.html',
  styleUrls: ['./table-filters.component.css']
})
export class TableFiltersComponent implements OnInit {

  public filterBy:any = 'Most recent'
  @Input() btnName:any = ''
  @Input() btnIcon:any = ''
  @Input() title:any = ''
  @Output() emitFilters = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }
  aplicarFiltro(filtro: string) {
    this.filterBy = filtro;
    this.emitFilters.emit(filtro)
  }

}
