import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-home-btns',
  templateUrl: './home-btns.component.html',
  styleUrls: ['./home-btns.component.css']
})
export class HomeBtnsComponent implements OnInit {
  @Input() btnStylesRef:any = ''
  @Input() chartName:any = ''
  @Input() chartValue:any = ''
  @Input() chartIcon:any = ''
  @Output() selectedChart:any = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }

  selectChart(ChartValue:any){
    this.selectedChart.emit(ChartValue)
  }
}
