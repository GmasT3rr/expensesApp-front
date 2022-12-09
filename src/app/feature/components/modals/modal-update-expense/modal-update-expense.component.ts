import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExpensesService } from '../../../../core/services/expenses.service';
import { CategoriesService } from '../../../../core/services/categories.service';
import { Expense } from '../../../../core/models/expense';

@Component({
  selector: 'app-modal-update-expense',
  templateUrl: './modal-update-expense.component.html',
  styleUrls: ['./modal-update-expense.component.css']
})
export class ModalUpdateExpenseComponent implements OnInit {

  public updateExpenseForm:FormGroup
  public categories:any
  public expense:any

  constructor(private expensesService:ExpensesService, private categoriesService:CategoriesService) {
    this.updateExpenseForm = new FormGroup({
      name: new FormControl('',[Validators.maxLength(30)]),
      date: new FormControl(''),
      category: new FormControl(''),
      price: new FormControl(''),
      imgUrl: new FormControl(''),
    })
  }

  ngOnInit(): void {
    this.getCategories();
    this.getExpense()
  }

  async getExpense(){
    await this.expensesService.expense.subscribe((expense:any)=>{
      this.expense = expense
      // console.log('subscribed expense',this.expense);
    })
  }

  async getCategories(){
    (await this.categoriesService.getAllCategories()).subscribe((res:any)=>{
      this.categories = res
      // console.log(res);
    })
  }

  async updateExpense(){
     let name = this.updateExpenseForm.value.name
     let date = this.updateExpenseForm.value.date
     let price = this.updateExpenseForm.value.price
     let category = this.updateExpenseForm.value.category
     let imgUrl = this.updateExpenseForm.value.imgUrl
     let id = this.expense._id
     const userID = localStorage.getItem('userID') || ''

     if (name === '' || null ){
      name = this.expense.name
     }
     if (price === '' || null ){
      price = this.expense.price
     }
     if (category === '' || null ){
      category = this.expense.category
     }
     if (date === '' || null ){
      date = this.expense.date
     }
     const newExpense:Expense = {
       name,price,category,imgUrl,date, userID
     };
      // console.log(newExpense);
       (await this.expensesService.updateExpenseById(newExpense,id)).subscribe((res:any)=>{
        console.log(res);
       })
    // console.log('form:',this.updateExpenseForm.value);
     window.location.reload();
  }

  get invalidName(){return this.updateExpenseForm.get('name')?.invalid && this.updateExpenseForm.get('name')?.touched }

}
