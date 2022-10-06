import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  @Output() expense:EventEmitter<any> = new EventEmitter();
  
  private URL = environment.config.API_URL

  constructor(private http:HttpClient) { }

  async getAllExpenses(){
    return this.http.get(`${this.URL}/expenses`)
  }

  async createNewExpense(expense:any){
    const url = `${this.URL}/expenses`
    return this.http.post(url,expense)
  }

  async updateExpenseById(expense:any,id:any){
    const url = `${this.URL}/expenses/${id}`
    return this.http.put(url,expense)
  }
  async deleteExpenseById(id:any){
    const url = `${this.URL}/expenses/${id}`
    return this.http.delete(url)
  }
}
