import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-modal-delete-user',
  templateUrl: './modal-delete-user.component.html',
  styleUrls: ['./modal-delete-user.component.css']
})
export class ModalDeleteUserComponent implements OnInit {

  public securityCheck = false
  public currentUser: any;

  constructor(private userService: UsersService) {

  }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  async getCurrentUser() {
    await this.userService.user.subscribe((user: any) => {
      this.currentUser = user;
    });
  }

  async deleteUser() {

    (await this.userService.deleteUserById(this.currentUser._id)).subscribe(
      (res: any) => {
      }
    );
  }
}
