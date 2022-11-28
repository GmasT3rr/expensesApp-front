import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { tap, of, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = environment.config.API_URL

  constructor(private http:HttpClient, private router:Router) { }



  async singIn(email:string,password:string){
    const url = `${this.URL}/auth/signin`;
    const body = {email,password};
    const res = this.http.post(url,body);

    return res.subscribe({
      error:(err) =>{
        console.log(err.error.message)
        alert(err.error.message)
      },
      next:(res:any) =>{
        localStorage.setItem('actualDate',Number(new Date()).toString() )
        localStorage.setItem('expiresIn',new Date().setSeconds(res.expiresIn).toString() )
        localStorage.setItem('x-access-token',res.token)
        localStorage.setItem('email',email)
        localStorage.setItem('userID', res.userID)
        this.router.navigateByUrl('/main')

      }
    })
  }

  async singUp(username:string,email:string,password:string){
    const url = `${this.URL}/auth/signup`;
    const body = {email,password,username};
    const res = this.http.post(url,body);

    return res.pipe(
      tap((res) => {
        return of (res)
      }),
      catchError((err) => {
          return throwError(()=> err);
      })
    );

  }

  signOut(){
    localStorage.clear()
    window.location.reload()
  }

  isTokenExpired(){
    if(localStorage.getItem('x-access-token') != null || ''){
      const expiresIn = localStorage.getItem('expiresIn') ||''
      if(Number(new Date()).toString()  >= expiresIn){
        setTimeout(() => {
          alert('Se ha agotado el tiempo de su sesion, vuelva a ingresar')
          this.signOut()
        }, 1000);
      }
    }
  }

  get token(){
    return localStorage.getItem('x-access-token') || ''
  }
  get email(){
    return localStorage.getItem('email') || ''
  }


}
