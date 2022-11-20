import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;

  constructor(private router: Router, private authService:AuthService) {
    this.signInForm = this.createFormGroup();
   }


  expresiones = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}

ngOnInit(): void {
}

  createFormGroup(){
    return new FormGroup({
      email  :new FormControl('',[Validators.required,Validators.pattern(this.expresiones.email)]),
      password  :new FormControl('',[Validators.required,Validators.minLength(5)]),
    })
  }

  async signIn(){
    const email = this.signInForm.value.email
    const password = this.signInForm.value.password

    return (await this.authService.singIn(email,password)).subscribe({
      error:(err) =>{
        console.log(err.error.message)
        alert(err.error.message)
      },
      next:(res:any) =>{
        localStorage.setItem('x-access-token',res.token)
        localStorage.setItem('email',email)
        localStorage.setItem('userID', res.userID)
        this.router.navigateByUrl('/main')
      }
    })
}


  get emailInvalido(){return this.signInForm.get('email')?.invalid && this.signInForm.get('email')?.touched }
  get passwordInvalido(){return this.signInForm.get('password')?.invalid && this.signInForm.get('password')?.touched }
}
