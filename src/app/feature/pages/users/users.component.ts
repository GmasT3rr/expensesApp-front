import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public now: any = new Date().toDateString();

  constructor() { }

  ngOnInit(): void {
  }

}
