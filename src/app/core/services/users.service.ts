import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  @Output() user:EventEmitter<any> = new EventEmitter();


  private URL = environment.config.API_URL

  constructor(private http:HttpClient) { }

  async getAllRoles(){
    return this.http.get(`${this.URL}/roles`)

  }

  async getAllUsers(){
    return this.http.get(`${this.URL}/users`)
  }
  async getCurrentUser(user:any){
    return this.http.get(`${this.URL}/users/current/${user}`)
  }

  async updateUserById(roles:any,id:any){
    const url = `${this.URL}/users/${id}`
    return this.http.put(url,roles)
  }
  async deleteUserById(id:any){
    const url = `${this.URL}/users/${id}`
    return this.http.delete(url)
  }
}
