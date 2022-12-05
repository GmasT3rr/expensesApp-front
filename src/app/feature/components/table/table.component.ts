import { Component, OnInit } from '@angular/core';
import { ExpensesService } from '../../../core/services/expenses.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  public dataAvailable = false
  public expenses:any = []
  public filtrarPor:any
  constructor(private expensesService:ExpensesService) { }

  ngOnInit(): void {
  this.getUserExpenses()
  }

  async getUserExpenses(){
    (await this.expensesService.getExpensesFromUser()).subscribe((res:any)=>{
      this.expenses = res
      console.log(res);
      this.dataAvailable = true
    })
  }

  getExpense(expense:any){
    this.expensesService.expense.emit(expense)
  }

  aplicarFiltro(filtro: string) {
    this.filtrarPor = filtro;
    console.log(filtro);
    this.expenses = [];
    this.getUserExpenses();
  }

  //   refresh(): void {
//     window.location.reload();
// }
}
