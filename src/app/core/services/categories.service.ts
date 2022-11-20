import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private URL = environment.config.API_URL

  constructor(private http:HttpClient) { }

  async getAllCategories(){
    return this.http.get(`${this.URL}/categories`)
  }

}
