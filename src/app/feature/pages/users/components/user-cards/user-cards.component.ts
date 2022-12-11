import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-user-cards',
  templateUrl: './user-cards.component.html',
  styleUrls: ['./user-cards.component.css'],
})
export class UserCardsComponent implements OnInit {
  public allUsers: any = [];
  public allRoles: any = [];
  public currentUser:any
  public dataAvailable = false;

  public offset = 0;
  public limit = 6
  private usersLength:any

  constructor(private userService: UsersService) {}



  ngOnInit(): void {
    this.getAllUsers();
    this.getRoles();
  }

  async getRoles() {
    (await this.userService.getAllRoles()).subscribe((res: any) => {
      this.allRoles = res;
    });
  }

  async getAllUsers() {
    (await this.userService.getAllUsers()).subscribe((res: any) => {
      this.usersLength = res.length
      this.compareRoles(res);
    });
    this.dataAvailable = true;
  }

  compareRoles(array: any) {
    array.forEach((e: any) => {
      const filter: any = this.allRoles.find((x: any) => x._id === e.roles);
      if (filter) {
        this.allUsers.push({
          email: e.email,
          _id: e._id,
          roles: filter['name'],
        });
      }
    });
  }


  paginationNext() {
    if (this.limit >= this.usersLength) {
      return;
    } else {
      this.offset += 6;
      this.limit += 6;
    }
  }
  paginationPrevious() {
    if (this.offset <= 0) {
      return;
    } else {
      this.offset -= 6;
      this.limit -= 6;
    }
  }
}
