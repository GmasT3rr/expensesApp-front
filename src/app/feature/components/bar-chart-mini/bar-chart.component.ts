import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChartConfiguration, ChartType, ChartData } from 'chart.js';
import { Months } from 'src/app/core/enums/months';
import { ExpensesService } from '../../../core/services/expenses.service';

@Component({
  selector: 'app-bar-chart-mini',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent implements OnInit {
  @Input() title: any = '';
  @Input() typeOfChart: any = '';
  @Output() spentThisMonth: any = new EventEmitter<any>();
  @Output() spentPreviousMonth: any = new EventEmitter<any>();

  private totalSpentThisMonth: any;
  private totalSpentLastMonth: any;
  public dataAvailable = false;
  private selectedMonth = 'firstTime';
  public months: any = [];
  public currentMonth: any;
  public expensesInfo: any = [];
  private previousMonthExpenses: any;

  constructor(private expensesService: ExpensesService) {
    this.months = Object.entries(Months);
  }

  ngOnInit() {
    this.getCurrentMonth();
    this.getUserExpenses();
  }

  // emitSpentPreviousMonth() {
  //   this.spentPreviousMonth.emit(this.totalSpentLastMonth);
  // }
  // emitSpentThisMonth() {
  //   this.spentThisMonth.emit(this.totalSpentThisMonth);
  // }

  public barChartLabels!: string[];
  public barChartData!: ChartData<'bar'>;
  public barChartType: ChartType = 'bar';
  public barChartOptions: ChartConfiguration['options'] = {};

   getCurrentMonth() {
     const currentMonth = new Date().getMonth() + 1 + '';
     for (let index = 0; index < this.months.length; index++) {
       const month = this.months[index];
       if (month[1] === currentMonth) {
         this.currentMonth = month;
       }
     }
   }

  async getUserExpenses() {
    (await this.expensesService.getExpensesFromUser()).subscribe((res: any) => {
      // const previousMonth = res.filter((x: any) => {
      //   return x.date.slice(5, -17) === this.currentMonth[1] - 1 + '';
      // });
      // this.previousMonthExpenses = previousMonth;

      const filteredByMonth = res.filter((x: any) => {
        if (this.selectedMonth === '' || null) {
          return res;
        } else {
          if (this.selectedMonth === 'firstTime' || null) {
            return x.date.slice(5, -17) === this.currentMonth[1];
          } else {
            return x.date.slice(5, -17) === this.selectedMonth;
          }
        }
      });
      const counter: any = [];
      filteredByMonth.forEach((expense: any) => {
        counter.push(expense.category);
      });
      const repeatedCategories = counter.reduce((prev: any, cur: any) => {
        prev[cur] = (prev[cur] || 0) + 1;
        return prev;
      }, {});
      const noDuplicates: any[] = filteredByMonth.reduce(
        (acc: any, curr: any) => {
          const categoryExists = acc.find(
            (element: any) => element.category === curr.category
          );
          if (categoryExists) {
            return acc.map((element: any) => {
              if (element.category === curr.category) {
                return {
                  category: curr.category,
                  price: element.price + curr.price,
                };
              } else {
                return {
                  category: element.category,
                  price: element.price,
                };
              }
            });
          }
          return [...acc, curr];
        },
        []
      );
      // console.log('sin duplicados',noDuplicates);
      const amountPerCategory: any = Object.values(repeatedCategories);
      const categories: any = [];
      const prices: any = [];
      noDuplicates.forEach((e: any) => {
        categories.push(e.category);
        prices.push(e.price);
        this.expensesInfo.push({ category: e.category, price: e.price });
      });

      let dataToUse: any = '';

      if (this.typeOfChart === 'prices') {
        dataToUse = prices;
      } else {
        this.typeOfChart === 'amount';
        dataToUse = amountPerCategory;
      }

      this.barChartLabels = categories;
      this.barChartData = {
        labels: this.barChartLabels,
        datasets: [{ data: dataToUse, label: 'Expenses' }],
      };
      this.barChartOptions = {
        backgroundColor: '#ff7bac',
        responsive: true,
        scales: {
          x: {},
          y: {
            min: 0,
          },
        },
        plugins: {
          legend: {
            display: true,
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                let index = tooltipItem.dataIndex;
                let price = tooltipItem.dataset.data[index];
                return '$' + price;
              },
            },
          },
        },
      };
      if (res.length <= 0) this.dataAvailable = false;
      else this.dataAvailable = true;
      // this.expenseSum();
    });
  }

  selectMonth(month: any) {
    if (month === 'all' || null) {
      this.selectedMonth = '';
    } else {
      this.selectedMonth = month;
    }
    this.expensesInfo = [];

    this.getUserExpenses();
  }

  // expenseSum() {
  //   const thisMonth: any = [];
  //   const previousMonth: any = [];
  //   this.expensesInfo.forEach((expense: any) => {
  //     thisMonth.push(expense.price);
  //   });
  //   let sum1 = thisMonth.reduce((a: any, b: any) => a + b, 0);
  //   this.totalSpentThisMonth = sum1;

  //   this.previousMonthExpenses.forEach((expense: any) => {
  //     previousMonth.push(expense.price);
  //   });
  //   let sum2 = previousMonth.reduce((a: any, b: any) => a + b, 0);
  //   this.totalSpentLastMonth = sum2;

  //   this.emitSpentThisMonth();
  //   this.emitSpentPreviousMonth();
  // }
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
