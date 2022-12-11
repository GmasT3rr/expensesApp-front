import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-user-cards-info',
  templateUrl: './user-cards-info.component.html',
  styleUrls: ['./user-cards-info.component.css']
})
export class UserCardsInfoComponent implements OnInit {

  @Input() userInfo:any = ''

  constructor(private userService:UsersService) { }

  ngOnInit(): void {
    this.userService.user.emit(this.userInfo)
  }

}
