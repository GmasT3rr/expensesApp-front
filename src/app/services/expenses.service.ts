import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  
  private URL = environment.config.API_URL

  constructor(private http:HttpClient) { }

  getAllExpenses(){
    return this.http.get(`${this.URL}/expenses`)
  }
}
