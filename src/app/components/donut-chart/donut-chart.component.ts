import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, ChartEvent, ChartOptions, ChartType } from 'chart.js';
import { ExpensesService } from '../../services/expenses.service';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css']
})
export class DonutChartComponent implements OnInit {

  public dataAvailable = false

  constructor(private expensesService:ExpensesService) { }

  ngOnInit() {
    this.getAllexpenses()
  }
  
  
  public doughnutChartLabels!: string[]
  public doughnutChartData!: ChartData<'doughnut'>
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartOptions: ChartConfiguration['options'] = {}
  async getAllexpenses(){
    (await this.expensesService.getAllExpenses()).subscribe((res:any)=>{
      const noDuplicates:any[] = res.reduce((acc:any, curr:any) => {
        const categoryExists = acc.find((element:any) => element.category === curr.category);        
        if (categoryExists) {
          return acc.map((element:any) => {
            if (element.category === curr.category) {
              return {
                category: curr.category,
                price: element.price + curr.price
              }
            } else {
              return {
                category: element.category,
                price: element.price
              }
            }
          });
        }
        return [...acc, curr];
      }, []);
      // console.log('sin duplicados',noDuplicates);
      const categories:any = []
      const prices:any = [] 
      noDuplicates.forEach((e:any) => {
        categories.push(e.category)
        prices.push(e.price)
      });

      // Doughnut
      this.doughnutChartLabels = categories;
      this.doughnutChartData= {
       labels: this.doughnutChartLabels,
       datasets: [
         { data: prices },
       ]
     };
     this.doughnutChartOptions ={
      responsive:true,
      plugins:{
        legend:{
          display:true,
        },
        tooltip:{
          callbacks:{
            label: function (tooltipItem) {
              let category = tooltipItem.label
              return category 
            },
            afterLabel: function (tooltipItem) {
              let index = tooltipItem.dataIndex
              let price = tooltipItem.dataset.data[index]
              return '$' + price 
            }
          }
        }
      }
     }
     this.dataAvailable = true
    })
  }
  

  
    // // events
    // public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    //   console.log(event, active);
    // }
  
    // public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    //   console.log(event, active);
    // }
}
