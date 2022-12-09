import { Component, Input, OnInit } from '@angular/core';
import { Months } from 'src/app/core/enums/months';
import { ExpensesService } from 'src/app/core/services/expenses.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit {

  public allMonths: any = [];
  public currentMonth: any;
  public selectedMonth:any = 'filter'
  private previousMonthExpenses: any = [];
  private currentMonthExpenses: any = [];

  public spentCurrentMonth: any;
  public spentPreviousMonth: any;

  public totalCurrentExpenses:any
  public totalPreviousExpenses:any

  public differenceInExpenses:any
  public differenceInAverage: any;
  public expensesAverage:any
  public expensesPreviousAverage:any

  public difference: any;
  public average: any;

  constructor(private expensesService: ExpensesService) {
    this.allMonths = Object.entries(Months);
  }

  ngOnInit(): void {
    this.getCurrentMonth();
    this.getCurrentMonthExpenses();
    this.getPreviousMonthExpenses();
    this.getPreviousMonthsAverage();
    this.getPreviousMonthsExpensesAverage()
  }



  getCurrentMonth() {
    const currentMonth = new Date().getMonth() + 1 + '';
    for (let index = 0; index < this.allMonths.length; index++) {
      const month = this.allMonths[index];
      if (month[1] === currentMonth) {
        this.currentMonth = month;
        this.selectedMonth = this.currentMonth[1]

      }
    }
  }

  async getCurrentMonthExpenses() {
    (await this.expensesService.getExpensesFromUser()).subscribe((res: any) => {
      const currentMonth = res.filter((x: any) => {
        if(this.selectedMonth === ''){
          return res
        }else{
          return x.date.slice(5, -17) === this.selectedMonth + '';

        }
      });
      this.currentMonthExpenses = currentMonth;

      const counter: any = [];
      currentMonth.forEach((expense: any) => {
        counter.push(expense.category);
      });
      const repeatedCategories = counter.reduce((prev: any, cur: any) => {
        prev[cur] = (prev[cur] || 0) + 1;
        return prev;
      }, {});

      const amountPerCategory: any = Object.values(repeatedCategories);
      const totalExpenses = amountPerCategory.reduce(
        (acc: any, cur: any) => acc + cur,
        0
      );
      this.totalCurrentExpenses = totalExpenses

      this.sumCurrentMonthExpenses();
    });
  }
  async getPreviousMonthExpenses() {
    (await this.expensesService.getExpensesFromUser()).subscribe((res: any) => {
      const previousMonth = res.filter((x: any) => {
        if(this.selectedMonth === ''){
          return res
        }else{
          return x.date.slice(5, -17) === this.selectedMonth - 1 + '';

        }
      });
      this.previousMonthExpenses = previousMonth;
      const counter: any = [];
      previousMonth.forEach((expense: any) => {
        counter.push(expense.category);
      });
      const repeatedCategories = counter.reduce((prev: any, cur: any) => {
        prev[cur] = (prev[cur] || 0) + 1;
        return prev;
      }, {});

      const amountPerCategory: any = Object.values(repeatedCategories);
      const totalExpenses = amountPerCategory.reduce(
        (acc: any, cur: any) => acc + cur,
        0
      );
      this.totalPreviousExpenses = totalExpenses

      this.sumPreviousMonthExpenses();

    });
  }

  async getPreviousMonthsAverage() {
    (await this.expensesService.getExpensesFromUser()).subscribe((res: any) => {
      const previousMonth = res.filter((x: any) => {
        if(this.selectedMonth === ''){
          return res
        }else{
          return x.date.slice(5, -17) === this.selectedMonth - 2 + '';

        }
      });
      const currentMonth = res.filter((x: any) => {
        if(this.selectedMonth === ''){
          return res
        }else{
          return x.date.slice(5, -17) === this.selectedMonth - 1 + '';

        }
      });

      const averagePrev: any = [];
      previousMonth.forEach((expense: any) => {
        averagePrev.push(expense.price);
      });
      let sum1 = averagePrev.reduce((a: any, b: any) => a + b, 0);

      const averageCurr: any = [];
      currentMonth.forEach((expense: any) => {
        averageCurr.push(expense.price);
      });
      let sum2 = averageCurr.reduce((a: any, b: any) => a + b, 0);

      const averageLastTwoMonths: any = (sum1 + sum2) / 2;

      this.differenceInAverage = this.average - averageLastTwoMonths;
    });
  }
  async getPreviousMonthsExpensesAverage() {
    (await this.expensesService.getExpensesFromUser()).subscribe((res: any) => {
      const previousMonth = res.filter((x: any) => {
        if(this.selectedMonth === ''){
          return res
        }else{
          return x.date.slice(5, -17) === this.selectedMonth - 2 + '';

        }
      });
      const currentMonth = res.filter((x: any) => {
        if(this.selectedMonth === ''){
          return res
        }else{
          return x.date.slice(5, -17) === this.selectedMonth - 1 + '';

        }
      });

      const counterCurrent: any = [];
      currentMonth.forEach((expense: any) => {
        counterCurrent.push(expense.category);
      });
      const repeatedCurrent = counterCurrent.reduce((prev: any, cur: any) => {
        prev[cur] = (prev[cur] || 0) + 1;
        return prev;
      }, {});

      const counterPrevious: any = [];
      previousMonth.forEach((expense: any) => {
        counterPrevious.push(expense.category);
      });
      const repeatedPrevious = counterPrevious.reduce((prev: any, cur: any) => {
        prev[cur] = (prev[cur] || 0) + 1;
        return prev;
      }, {});

      const amountPerCategoryCurrent: any = Object.values(repeatedCurrent);
      const amountPerCategoryPrevious: any = Object.values(repeatedPrevious);

      const totalCurrentExpenses = amountPerCategoryCurrent.reduce(
        (acc: any, cur: any) => acc + cur,
        0
      );
      const totalPreviousExpenses = amountPerCategoryPrevious.reduce(
        (acc: any, cur: any) => acc + cur,
        0
      );
      this.expensesPreviousAverage = (totalCurrentExpenses + totalPreviousExpenses) / 2;

    });
  }

  async sumCurrentMonthExpenses() {
    const currentMonth: any = [];
    this.currentMonthExpenses.forEach((expense: any) => {
      currentMonth.push(expense.price);
    });
    let sum = currentMonth.reduce((a: any, b: any) => a + b, 0);
    this.spentCurrentMonth = sum;
    this.calcDifferenceAndAverage();
  }

  async sumPreviousMonthExpenses() {
    const previousMonth: any = [];
    this.previousMonthExpenses.forEach((expense: any) => {
      previousMonth.push(expense.price);
    });
    let sum = previousMonth.reduce((a: any, b: any) => a + b, 0);
    this.spentPreviousMonth = sum;
    this.calcDifferenceAndAverage();
  }

  async calcDifferenceAndAverage() {
    this.difference = this.spentCurrentMonth - this.spentPreviousMonth;
    this.average = (this.spentCurrentMonth + this.spentPreviousMonth) / 2;
    this.differenceInExpenses = this.totalCurrentExpenses - this.totalPreviousExpenses;
    this.expensesAverage = (this.totalCurrentExpenses + this.totalPreviousExpenses) / 2;

  }

  selectMonth(month: any) {
    this.expensesService.expense.emit(month)
    if (month === 'all' || null) {
      this.selectedMonth = '';
    } else {
      this.selectedMonth = month
    }
     this.getCurrentMonthExpenses();
     this.getPreviousMonthExpenses();
     this.getPreviousMonthsAverage();
     this.getPreviousMonthsExpensesAverage()

    }
}
