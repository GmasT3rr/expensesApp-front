import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType, ChartData } from 'chart.js';
import { Months } from 'src/app/enums/months';
import { ExpensesService } from '../../services/expenses.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  public dataAvailable = false
  private selectedMonth = ''
  public months:any = []
  public expensesInfo:any = []


  constructor(private expensesService:ExpensesService) {
    this.months = Object.entries(Months)

  }

  ngOnInit() {
    this.getUserExpenses()
  }

  public barChartLabels!: string[]
  public barChartData!: ChartData<'bar'>
  public barChartType: ChartType = 'bar';
  public barChartOptions: ChartConfiguration['options'] = {}


  async getUserExpenses(){
    (await this.expensesService.getExpensesFromUser()).subscribe((res:any)=>{

      const filteredByMonth = res.filter((x:any)=>{
        if(this.selectedMonth === '' || null){
          return res
        }else{
          return x.date.slice(5,-17) === this.selectedMonth
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
      // console.log('sin duplicados',noDuplicates);
      const categories:any = []
      const prices:any = []
      noDuplicates.forEach((e:any) => {
        categories.push(e.category)
        prices.push(e.price)
        this.expensesInfo.push({category:e.category,price:e.price})

      });

      this.barChartLabels = categories;
      this.barChartData= {
       labels: this.barChartLabels,
       datasets: [
         { data: prices, label:'Expenses' },
       ]
     };
     this.barChartOptions ={
      backgroundColor: 'rgba(28,163,129, 1)',
      responsive:true,
      scales: {
        x: {},
        y: {
          min: 10
        }
      },
      plugins:{
      legend: {
        display: true,
      },
        tooltip:{
          callbacks:{
            label: function (tooltipItem) {
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


  // public barChartOptions: ChartConfiguration['options'] = {
  //   responsive: true,
  //   // We use these empty structures as placeholders for dynamic theming.
  //   scales: {
  //     x: {},
  //     y: {
  //       min: 10
  //     }
  //   },
  //   plugins: {
  //     legend: {
  //       display: true,
  //     }

  //   }
  // };
  // public barChartType: ChartType = 'bar';


  // public barChartData: ChartData<'bar'> = {
  //   labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
  //   datasets: [
  //     { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
  //     { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
  //   ]
  // };

  // // events

}
