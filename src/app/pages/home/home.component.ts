import { Component, OnInit } from '@angular/core';
import { ExpensesService } from '../../services/expenses.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  public dataAvailable = false
  public expenses:any = []

  constructor(private expensesService:ExpensesService) { }
  
  ngOnInit(): void {
    this.expensesService.getAllExpenses().subscribe((res:any)=>{
      this.expenses = res
      this.dataAvailable = true
      console.log(res);
    })
  }

}
