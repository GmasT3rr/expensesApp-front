import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-table',
  templateUrl: './modal-table.component.html',
  styleUrls: ['./modal-table.component.css']
})
export class ModalTableComponent implements OnInit {

  @Input() expense:any = ''

  constructor() { }

  ngOnInit(): void {
  }

}
