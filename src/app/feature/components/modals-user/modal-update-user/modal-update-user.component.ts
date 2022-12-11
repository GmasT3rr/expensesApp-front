import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-modal-update-user',
  templateUrl: './modal-update-user.component.html',
  styleUrls: ['./modal-update-user.component.css'],
})
export class ModalUpdateUserComponent implements OnInit {
  public currentUser: any;
  public updateUserForm: FormGroup;
  @Input() roles:any

  constructor(private userService: UsersService) {
    this.updateUserForm = new FormGroup({
      role: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getCurrentUser();
  }


  async getCurrentUser() {
    await this.userService.user.subscribe((user: any) => {
      this.currentUser = user;
    });
  }

  async updateUser() {
    let roles = this.updateUserForm.value.role
    const body:any = {
      roles
    };
     (await this.userService.updateUserById(body, this.currentUser._id)).subscribe(
       (res: any) => {
       }
     );
     window.location.reload()
  }
}
