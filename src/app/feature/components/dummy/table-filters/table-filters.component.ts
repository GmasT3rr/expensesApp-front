import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-filters',
  templateUrl: './table-filters.component.html',
  styleUrls: ['./table-filters.component.css']
})
export class TableFiltersComponent implements OnInit {

  public filtrarPor:any
  @Input() btnStylesRef:any = ''
  @Input() btnName:any = ''
  @Input() btnIcon:any = ''

  constructor() { }

  ngOnInit(): void {
  }
  aplicarFiltro(filtro: string) {
    this.filtrarPor = filtro;
    console.log(filtro);

  }

}
