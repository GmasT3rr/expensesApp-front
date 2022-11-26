import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  selectedChartName:any = ''

  selectChart(selectedChart:any){
    this.selectedChartName = selectedChart
  }

  constructor(){
  }
  ngOnInit(): void {
  }

}
