import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { Expense } from 'src/app/core/models/expense';
import { ExpensesService } from '../../../../core/services/expenses.service';
import { CategoriesService } from '../../../../core/services/categories.service';

@Component({
  selector: 'app-modal-new-expense',
  templateUrl: './modal-new-expense.component.html',
  styleUrls: ['./modal-new-expense.component.css']
})
export class ModalNewExpenseComponent implements OnInit {

  public newExpenseForm:FormGroup
  public categories!:any

  constructor(private expensesService:ExpensesService, private categoriesService:CategoriesService) {
    this.newExpenseForm = new FormGroup({
      name: new FormControl('',[Validators.required,Validators.maxLength(30)]),
      category: new FormControl('',[Validators.required]),
      price: new FormControl('',[Validators.required]),
      date: new FormControl('',[Validators.required]),
      imgUrl: new FormControl(''),
    })
  }

  ngOnInit(): void {
    this.getCategories()
  }

  async getCategories(){
    (await this.categoriesService.getAllCategories()).subscribe((res:any)=>{
      this.categories = res
      // console.log(res);
    })
  }

  async createNewExpense(){
     const name = this.newExpenseForm.value.name
     const date = this.newExpenseForm.value.date
     const price = this.newExpenseForm.value.price
     const category = this.newExpenseForm.value.category
     const imgUrl = this.newExpenseForm.value.imgUrl
     const userID = localStorage.getItem('userID') || ''

     const newExpense:Expense = {
       name,price,category,imgUrl,date,userID
     };
      (await this.expensesService.createNewExpense(newExpense)).subscribe((res:any)=>{
        // console.log(res);
      })
    // console.log('form:',this.newExpenseForm.value);
    window.location.reload();
  }

  get invalidPrice(){return this.newExpenseForm.get('price')?.invalid && this.newExpenseForm.get('price')?.touched }
  get invalidName(){return this.newExpenseForm.get('name')?.invalid && this.newExpenseForm.get('name')?.touched }
  get invalidDate(){return this.newExpenseForm.get('date')?.invalid && this.newExpenseForm.get('date')?.touched }
  get invalidCategory(){return this.newExpenseForm.get('category')?.invalid && this.newExpenseForm.get('category')?.touched }
}
