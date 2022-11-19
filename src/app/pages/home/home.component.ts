import { Component, OnInit } from '@angular/core';
import { ExpensesService } from 'src/app/services/expenses.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isSelected = false

  constructor(private expensesService:ExpensesService){
  }
  ngOnInit(): void {
    this.getUserExpenses()
  }

  // Solo para ver que funciona el metodo correctamente
  // BORRAR

  async getUserExpenses(){
    (await this.expensesService.getExpensesFromUser()).subscribe((res:any)=>{
      console.log('Current user expenses',res);
    })
  }

}
