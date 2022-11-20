import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-table',
  templateUrl: './home-table.component.html',
  styleUrls: ['./home-table.component.css']
})
export class HomeTableComponent implements OnInit {
  @Input() expensesInfo:any
  public totalSpent:any

  constructor() { }

  ngOnInit(): void {
    this.expenseSum()
  }

  expenseSum(){
    const valuesArray:any = []
    this.expensesInfo.forEach((expense:any) => {
      valuesArray.push(expense.price)
    });
    let sum = valuesArray.reduce((a:any,b:any)=>a+b,0)
    this.totalSpent = sum
    console.log(this.totalSpent);
  }

}
