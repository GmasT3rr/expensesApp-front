import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Months } from 'src/app/core/enums/months';
import { ExpensesService } from '../../../core/services/expenses.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  public filterBy:any = 'Most recent'
  public dataAvailable = false
  public userExpenses:any[] = []
  public isInSummary:boolean = false
  public totalPages = 0
  public currentPage = 1
  public offset = 0
  @Input() limit = 8
  private userExpensesLength = 0
  public selectedMonth:any = 'firstTime'
  public currentMonth:any = ''
  public months:any
  public filterDate:any = ''

  constructor(private expensesService:ExpensesService,private router:Router) {
    this.months = Object.entries(Months);

   }

  //Añadir el filtro que otorga summary en general mediante el servicio de emiter
  //Creo que por el momento no lo quiero poner

  ngOnInit(): void {
  this.getUserExpenses()
  // this.getGlobalFilter()
  this.checkPath()
  this.getCurrentMonth()
  this.getGlobalFilter();
  }
  checkPath(){
    const ruta = this.router.url
    if(ruta.includes('summary')){
      this.isInSummary = true
    } else this.isInSummary = false
  }
  getGlobalFilter(){
    this.expensesService.expense.subscribe((res:any)=>{
      this.selectedMonth = res
      this.getUserExpenses()
      for (let index = 0; index < this.months.length; index++) {
        const month = this.months[index];
        if (month[1] === this.selectedMonth) {
          this.filterDate = month[0]
        }
      }
    })
   }

  getCurrentMonth() {
    const currentMonth = new Date().getMonth() + 1 + '';
    for (let index = 0; index < this.months.length; index++) {
      const month = this.months[index];
      if (month[1] === currentMonth && month[1] != this.selectedMonth) {
        this.currentMonth = month;
        this.filterDate = month[0]
      }
    }
  }



  async getUserExpenses(){
    (await this.expensesService.getExpensesFromUser()).subscribe((res:any)=>{
      const filteredByMonth = res.filter((x: any) => {
        if (this.selectedMonth === '' || null || this.selectedMonth === 'all') {
          return res;
        } else {
          if (this.selectedMonth === 'firstTime' || null) {
            return x.date.slice(5, -17) === this.currentMonth[1];
          } else {
            return x.date.slice(5, -17) === this.selectedMonth;
          }
        }
      });

      this.userExpensesLength = filteredByMonth.length
        switch (this.filterBy) {
          case 'None':
            this.userExpenses = filteredByMonth
            break;
          case 'Max price':
            this.userExpenses = filteredByMonth.sort((a:any,b:any)=>b.price - a.price)

            break;
          case 'Min price':
            this.userExpenses = filteredByMonth.sort((a:any,b:any)=>a.price - b.price)
            break;
          case 'Most recent':
            this.userExpenses = filteredByMonth.sort((a:any,b:any)=>new Date(b.date).getTime()- new Date(a.date).getTime())

            break;
          case 'Least recent':
            this.userExpenses = filteredByMonth.sort((a:any,b:any)=>new Date(a.date).getTime()- new Date(b.date).getTime())
            break;
          default:
            break;
        }
        this.getPaginationNumber()
      this.dataAvailable = true
    })
  }

  getPaginationNumber(){
    let div = this.userExpensesLength / this.limit
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
