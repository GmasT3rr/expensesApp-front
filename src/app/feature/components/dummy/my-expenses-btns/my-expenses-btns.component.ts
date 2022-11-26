import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-my-expenses-btns',
  templateUrl: './my-expenses-btns.component.html',
  styleUrls: ['./my-expenses-btns.component.css']
})
export class MyExpensesBtnsComponent implements OnInit {

  @Input() btnStylesRef:any = ''
  @Input() btnName:any = ''
  @Input() btnIcon:any = ''

  constructor() { }

  ngOnInit(): void {
  }

}
