import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {


  ngOnInit(): void {
    
  }

  signUpForm: FormGroup;
  constructor(private authService:AuthService,private router:Router) {
    this.signUpForm = this.createFormGroup();
   }


  expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{5,40}$/, // Letras y espacios, pueden llevar acentos.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    dni: /^\d{8,8}$/, // 7 a 14 numeros.
    numero: /^\d{7,14}$/, // 7 a 14 numeros.
}


  createFormGroup(){
    return new FormGroup({
      username  :new FormControl('',[Validators.required,Validators.minLength(5)]),
      password  :new FormControl('',[Validators.required,Validators.minLength(5)]),
      passwordRepeat  :new FormControl('',[Validators.required,Validators.minLength(5)]),
      email  :new FormControl('',[Validators.required,Validators.pattern(this.expresiones.email)]),
      // nombre  :new FormControl('', [Validators.required,Validators.pattern(this.expresiones.nombre)]),
      // apellido  :new FormControl('',[Validators.required,Validators.pattern(this.expresiones.nombre)]),
      // dni  :new FormControl('',[Validators.required,Validators.pattern(this.expresiones.dni)]),
      // telefono  :new FormControl('',[Validators.required,Validators.pattern(this.expresiones.numero)]),
      // localidad  :new FormControl('',[Validators.minLength(5)]),
  
    })
  }
  
  async signUp(){     
    const username = this.signUpForm.value.username;
    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password
    const passwordRepeat = this.signUpForm.value.passwordRepeat

    if(password != passwordRepeat) return alert('Passwords must be the same')
    
    return (await this.authService.singUp(username,email,password)).subscribe({
      error:(err)=>{
        console.log(err.error.message)
        alert(err.error.message)
            },
      next:(res:any)=>{
        alert('Thanks you for sign up! You willbe redirect to sign in page')
        this.router.navigateByUrl('/auth/signin')
      }
    })
}

get passwordInvalido(){return this.signUpForm.get('password')?.invalid && this.signUpForm.get('password')?.touched }
get passwordRepeatInvalido(){return this.signUpForm.get('passwordRepeat')?.invalid && this.signUpForm.get('passwordRepeat')?.touched}
get emailInvalido(){return this.signUpForm.get('email')?.invalid && this.signUpForm.get('email')?.touched }
get usernameInvalido(){return this.signUpForm.get('username')?.invalid && this.signUpForm.get('username')?.touched }

// get nombreInvalido(){return this.signUpForm.get('nombre')?.invalid && this.signUpForm.get('nombre')?.touched }
// get apellidoInvalido(){return this.signUpForm.get('apellido')?.invalid && this.signUpForm.get('apellido')?.touched }
  // get dniInvalido(){return this.signUpForm.get('dni')?.invalid && this.signUpForm.get('dni')?.touched }
  // get telefonoInvalido(){return this.signUpForm.get('telefono')?.invalid && this.signUpForm.get('telefono')?.touched }
  // get localidadInvalido(){return this.signUpForm.get('localidad')?.invalid && this.signUpForm.get('localidad')?.touched }

}
