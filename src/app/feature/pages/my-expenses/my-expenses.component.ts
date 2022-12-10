import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-expenses',
  templateUrl: './my-expenses.component.html',
  styleUrls: ['./my-expenses.component.css']
})
export class MyExpensesComponent implements OnInit {
  public now: any = new Date().toDateString();

  constructor() { }

  ngOnInit(): void {
  }

}
