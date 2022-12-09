import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpensesService } from '../../../core/services/expenses.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  public filterBy:any = 'None'
  public dataAvailable = false
  public userExpenses:any[] = []
  public isInSummary:boolean = false
  public totalPages = 0
  public currentPage = 1
  public offset = 0
  public limit = 10
  private userExpensesLength = 0

  constructor(private expensesService:ExpensesService,private router:Router) { }

  //Añadir el filtro que otorga summary en general mediante el servicio de emiter
  //Creo que por el momento no lo quiero poner

  ngOnInit(): void {
  this.getUserExpenses()
  // this.getGlobalFilter()
  this.checkPath()
  }
  checkPath(){
    const ruta = this.router.url
    if(ruta.includes('summary')){
      this.isInSummary = true
    } else this.isInSummary = false
  }

  // getGlobalFilter(){
  //   this.expensesService.expense.subscribe((res:any)=>console.log(res))

  // }


  async getUserExpenses(){
    (await this.expensesService.getExpensesFromUser()).subscribe((res:any)=>{
      this.userExpensesLength = res.length
        switch (this.filterBy) {
          case 'None':
            this.userExpenses = res
            break;
          case 'Max price':
            this.userExpenses = res.sort((a:any,b:any)=>b.price - a.price)

            break;
          case 'Min price':
            this.userExpenses = res.sort((a:any,b:any)=>a.price - b.price)
            break;
          case 'Most recent':
            this.userExpenses = res.sort((a:any,b:any)=>new Date(b.date).getTime()- new Date(a.date).getTime())

            break;
          case 'Least recent':
            this.userExpenses = res.sort((a:any,b:any)=>new Date(a.date).getTime()- new Date(b.date).getTime())
            break;
          default:
            break;
        }
        this.getPaginationNumber()
      this.dataAvailable = true
    })
  }

  getPaginationNumber(){
    let div = this.userExpensesLength / 10
    this.totalPages = Math.ceil(div)
  }

  paginationNext(){
    if(this.limit >= this.userExpensesLength){
      return
    }else{
      this.offset += 10
      this.limit += 10
      this.currentPage += 1
    }
  }
  paginationPrevious(){
    if(this.offset == 0){
      return
    }else{
      this.offset -= 10
      this.limit -= 10
      this.currentPage -= 1
    }
  }

  getExpense(expense:any){
    this.expensesService.expense.emit(expense)
  }

  aplicarFiltro(filtro: string) {
    this.filterBy = filtro;
    this.userExpenses = [];
    this.getUserExpenses();
  }

}
