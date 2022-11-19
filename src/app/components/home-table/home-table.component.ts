import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-table',
  templateUrl: './home-table.component.html',
  styleUrls: ['./home-table.component.css']
})
export class HomeTableComponent implements OnInit {
  @Input() expensesInfo:any

  constructor() { }

  ngOnInit(): void {
  }

}
