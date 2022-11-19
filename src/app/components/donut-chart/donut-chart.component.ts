import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, ChartEvent, ChartOptions, ChartType } from 'chart.js';
import { ExpensesService } from '../../services/expenses.service';
import { Months } from '../../enums/months';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css']
})
export class DonutChartComponent implements OnInit {

  public dataAvailable = false
  public expensesInfo:any = []
  public months:any = []
  private selectedMonth = ''

  constructor(private expensesService:ExpensesService) {
    this.months = Object.entries(Months)

  }

  ngOnInit() {
    this.getUserExpenses()
  }


  public doughnutChartLabels!: string[]
  public doughnutChartData!: ChartData<'doughnut'>
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartOptions: ChartConfiguration['options'] = {}
  async getUserExpenses(){
    (await this.expensesService.getExpensesFromUser()).subscribe((res:any)=>{
      const filteredByMonth = res.filter((x:any)=>{
        if(this.selectedMonth === '' || null){
          return res
        }else{
          return x.date.slice(5,-17) === this.selectedMonth
          // return x.updatedAt.slice(5,-17) === this.selectedMonth
        }
      })
      // console.log('filtered by month',filteredByMonth);
      const noDuplicates:any[] = filteredByMonth.reduce((acc:any, curr:any) => {
        const categoryExists = acc.find((element:any) => element.category === curr.category );
        if (categoryExists) {
          return acc.map((element:any) => {

            if (element.category === curr.category) {
              return {
                category: curr.category,
                price: element.price + curr.price,
              }
            } else {
              return {
                category: element.category,
                price: element.price,

              }
            }
          });
        }
        return [...acc, curr];
      }, []);
      //  console.log('sin duplicados',noDuplicates);
      const categories:any = []
      const prices:any = []
      noDuplicates.forEach((e:any) => {
        categories.push(e.category)
        prices.push(e.price)
        this.expensesInfo.push({category:e.category,price:e.price})
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
     if(res.length <= 0) this.dataAvailable = false
     else this.dataAvailable = true
    })
  }

  selectMonth(month:any){
    if(month === 'all' || null){
      this.selectedMonth = ''
    }
    else{
      this.selectedMonth = month
    }
    this.expensesInfo = []

      this.getUserExpenses()
  }

//   refresh(): void {
//     window.location.reload();
// }

}
