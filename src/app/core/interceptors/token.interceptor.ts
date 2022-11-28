import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor{

  constructor(private authService:AuthService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.authService.token
    let email = this.authService.email

    if(token === null || ''){
      token = 'No token provided'
    }

    const headers = new HttpHeaders({
      'x-access-token':token,
      'email':email
    });
    const reqClone = req.clone({
      headers
    });

    this.authService.isTokenExpired()

    return next.handle(reqClone).pipe(
      catchError(this.handleError)
    )
  }

  handleError(error:HttpErrorResponse){
    return throwError(()=> error)
  }

}
