import { Component, OnInit } from '@angular/core';
import { ExpensesService } from '../../services/expenses.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  
  public dataAvailable = false
  public expenses:any = []

  constructor(private expensesService:ExpensesService) { }
  
  ngOnInit(): void {
  this.getAllExpenses()
  }
  
  async getAllExpenses(){
    (await this.expensesService.getAllExpenses()).subscribe((res:any)=>{
      this.expenses = res
      // console.log(res);
      this.dataAvailable = true
    })
  }
  
  getExpense(expense:any){
    this.expensesService.expense.emit(expense)
  }

  deleteExpense(){
    console.log('delete');
  }
}
