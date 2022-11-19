import { Component, OnInit } from '@angular/core';
import { ExpensesService } from '../../services/expenses.service';
import { CategoriesService } from '../../services/categories.service';
import { Expense } from '../../models/expense';

@Component({
  selector: 'app-modal-delete-expense',
  templateUrl: './modal-delete-expense.component.html',
  styleUrls: ['./modal-delete-expense.component.css']
})
export class ModalDeleteExpenseComponent implements OnInit {

  public expense:any

  constructor(private expensesService:ExpensesService, private categoriesService:CategoriesService) { 

  }

  ngOnInit(): void {
    this.getExpense()
  }
  
  async getExpense(){
    await this.expensesService.expense.subscribe((expense:any)=>{
       this.expense = expense
      // console.log('subscribed expense',this.expense);
    })
  }
  
  async deleteExpense(){
    const id = this.expense._id
    await (await this.expensesService.deleteExpenseById(id)).subscribe((res:any)=>{
       console.log(res);
      })
      window.location.reload();

  }

}
