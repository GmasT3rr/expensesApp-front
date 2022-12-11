import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-current-user-card',
  templateUrl: './current-user-card.component.html',
  styleUrls: ['./current-user-card.component.css']
})
export class CurrentUserCardComponent implements OnInit {

  @Input() currentUser:any = []

  constructor(private userService:UsersService) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }
  async getCurrentUser() {
    const userId = localStorage.getItem('userID');
    (await this.userService.getCurrentUser(userId)).subscribe((res: any) => {
      this.currentUser = res[0]
      console.log(this.currentUser);
    });
  }

}
