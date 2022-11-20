import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { tap, of, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = environment.config.API_URL

  constructor(private http:HttpClient) { }

  async singIn(email:string,password:string){
    const url = `${this.URL}/auth/signin`;
    const body = {email,password};
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


  get token(){
    return localStorage.getItem('x-access-token') || ''
  }
  get email(){
    return localStorage.getItem('email') || ''
  }

}
